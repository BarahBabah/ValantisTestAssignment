import './Product.css';
import valantisImageNotFound from './../../assets/valantisImageNotFound.jpeg';

const Product = ({ product }) => {
    return (
        <li className="product" key={product.id}>
            <p className="product__title">
                {product.product}{' '}
                {product.brand ? `бренд ${product.brand}` : ''}
            </p>
            <p className="product__price">{product.price}₽ </p>
            <img src={valantisImageNotFound} alt={product.product} />
        </li>
    );
};

export default Product;
