import React from 'react';
import Product from '../Product/Product';

const ProductList = ({ products }) => {
    return (
        <ul className="products">
            {products?.map((product) => {
                return <Product key={product.id} product={product} />;
            })}
        </ul>
    );
};

export default ProductList;
