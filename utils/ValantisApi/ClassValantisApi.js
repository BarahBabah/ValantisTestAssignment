import { authString, basePath } from "./generateValantisKey";
class ValantisApi {
    constructor({ basePath, headers, authString }) {
        this._basePath = basePath;
        this._headers = headers;
        this._authString = authString;
    }
    _getJson(response) {
        if (response.ok) {
            return response.json();
        }
        return Promise.reject(response);
    }
    _getHeaders() {
        return {
            "Content-Type": "application/json",
            'X-Auth': this._authString,
            ...this._headers,
        };
    }
    getItems(ids) {
        return fetch(this._basePath, {
            headers: this._getHeaders(),
            body: JSON.stringify({
                action: 'get_items',
                params: {
                    "ids": [...ids]
                },
            }),
        });
    }
    getIds(params) {
        return fetch(this._basePath, {
            headers: this._getHeaders(),
            body: JSON.stringify({
                action: 'get_ids',
                params: { params },
            }),
        });
    }
}

const valantisApi = new ValantisApi({
    basePath,
    headers: {
        "Content-Type": "application/json",
        'X-Auth': authString,
    }
})
export default valantisApi;