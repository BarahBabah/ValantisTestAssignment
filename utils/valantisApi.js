import { authString, API_URL } from "./generateValantisKey";

const headers = {
    "Content-Type": "application/json",
    'X-Auth': authString,
};

const fetchData = async (action, params) => {
    const response = await fetch(API_URL, {
        method: "POST",
        headers,
        body: JSON.stringify({
            action,
            params,
        }),
    });
    if (response.ok) {
        const responseData = await response.json();
        return responseData.result;
    }
    const errorResponse = await response.text();
    throw new Error(`Ошибка: ${response.status}. ${errorResponse}`);
};

const retryRequest = async (action, params, retryCount = 5) => {
    try {
        return await fetchData(action, params);
    } catch (error) {
        if (retryCount === 0) {
            console.error("Превышено количество попыток повтора запроса.");
            throw error;
        }
        console.log(`Ошибка: ${error.message}. Повтор запроса...`);
        return await retryRequest(action, params, retryCount - 1);
    }
};

export const getIds = (params) => retryRequest('get_ids', params);
export const getItems = (ids) => retryRequest('get_items', { ids });
export const getField = (params) => retryRequest('get_fields', params);
export const getFilters = (params) => retryRequest('filter', params);

export const getData = async (page = 1) => {
    try {
        const ids = await getIds({
            offset: page,
            limit: 50,
        });
        const uniqueIds = [...new Set(ids)];
        return await getItems(uniqueIds);
    } catch (error) {
        console.error(error);
        throw error;
    }
};

const isFieldVoid = (responseFields) => {
    return !Object.values(responseFields).some(
        (value) => {
            if (typeof value === 'number') {
                return value !== null && value !== 0;
            }
            return value.trim() !== '';
        }
    );
};

const uniqueCards = (cards) => {
    return Array.from(new Set(cards.map((card) => card.id))).map((id) =>
        cards.find((card) => card.id === id)
    );
};

const uniqueIdsFunction = (ids) => {
    return [...new Set(ids)];
};

export const getCards = async (page, params) => {
    try {
        let uniqueIds, items;
        if (isFieldVoid(params)) {
            const [ids, allIdsForPagination] = await Promise.all([
                getIds({ offset: page, limit: 50 }),
                getIds()
            ]);
            uniqueIds = uniqueIdsFunction(ids);
            items = uniqueCards(await getItems(uniqueIds));
            return { items, allIdsLength: allIdsForPagination.length };
        } else {
            const filters = await getFilters(params);
            uniqueIds = uniqueIdsFunction(filters);
            items = uniqueCards(await getItems(uniqueIds));
            return { items };
        }
    } catch (error) {
        console.error(error);
        throw error;
    }
};
