import PropTypes from 'prop-types';
import Product from '../Product/Product';
import './ProductList.css';

const ProductList = ({ products }) => {
    return (
        <ul className="products">
            {products?.map((product) => {
                return <Product key={product.id} product={product} />;
            })}
        </ul>
    );
};

ProductList.propTypes = {
    products: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
                .isRequired,
            product: PropTypes.string.isRequired,
            brand: PropTypes.string,
            price: PropTypes.number.isRequired,
        })
    ).isRequired,
};

export default ProductList;
