import { useEffect, useState } from 'react';
import { getField, getCards } from './../../../utils/valantisApi';
import './App.css';
import ProductList from './../ProductList/ProductList';
import SearchForm from './../SearchForm/SearchForm';
import { Pagination } from '../Pagination/Pagination';
import Overlay from '../Overlay/Overlay';

const App = () => {
    const [products, setProducts] = useState([]);
    const [fields, setFields] = useState([]);
    const [totalPages, setTotalPages] = useState(1);
    const [page, setPage] = useState(1);
    const [limit] = useState(50);
    const [responseFields, setResponseFields] = useState([]);
    const [loading, setLoading] = useState(true);

    const updateFields = (e) => {
        const { name, value } = e.target;
        setFields((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handlePageChange = (value) => {
        if (value === '... ') {
            setPage(1);
        } else if (value === '&lsaquo') {
            if (page === 1) {
                console.log('это первая страница, дальше дубли');
            } else {
                setPage(page - 1);
            }
        } else if (value === '&rsaquo') {
            if (page === totalPages) {
                console.log('это последняя страница, дальше дубли');
            } else {
                setPage(page + 1);
            }
        } else if (value === ' ...') {
            setPage(totalPages);
        } else {
            setPage(value);
        }
    };

    function handleSubmit() {
        const nonEmptyFields = {};
        for (const key in fields) {
            if (
                Object.prototype.hasOwnProperty.call(fields, key) &&
                fields[key].trim() !== ''
            ) {
                if (key === 'price') {
                    nonEmptyFields[key] = parseFloat(fields[key]);
                } else {
                    nonEmptyFields[key] = fields[key];
                }
            }
        }
        console.log(nonEmptyFields);
        setResponseFields(nonEmptyFields);
    }

    useEffect(() => {
        (async () => {
            try {
                const fields = await getField();
                setFields(
                    fields.reduce((acc, field) => {
                        acc[field] = '';
                        return acc;
                    }, {})
                );
            } catch (error) {
                console.log(error);
                throw error;
            }
        })();
    }, []);

    useEffect(() => {
        setLoading(true);
        const fetchCards = async (page) => {
            try {
                const products = await getCards(page, responseFields);
                if (products.items && products.allIdsLength) {
                    setTotalPages(Math.ceil(products.allIdsLength / limit));
                    setProducts(products.items);
                } else {
                    setProducts(products.items);
                    setTotalPages(1);
                }
            } catch (error) {
                console.log(error);
                throw error;
            } finally {
                setLoading(false);
            }
        };

        fetchCards(page);
    }, [limit, page, responseFields]);

    return (
        <main className="main">
            {loading && <Overlay />}
            <div>Valantis</div>
            {fields.length !== 0 && (
                <SearchForm
                    fields={fields}
                    updateFields={updateFields}
                    handleSubmit={handleSubmit}
                />
            )}
            <ProductList products={products} />
            {totalPages !== 1 && (
                <Pagination
                    totalPages={totalPages}
                    page={page}
                    limit={limit}
                    siblings={3}
                    onPageChange={handlePageChange}
                />
            )}
        </main>
    );
};

export default App;
