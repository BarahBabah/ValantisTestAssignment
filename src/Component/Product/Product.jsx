const Product = ({ product }) => {
    return (
        <li className="product" key={product.id}>
            <p className="product__id">{product.id}</p>
            <p className="product__title">{product.product}</p>
            <p className="product__price">{product.price}</p>
            <p className="product__brand">{product.brand}</p>
        </li>
    );
};

export default Product;
