import PropTypes from 'prop-types';
import './Pagination.css';
import { returnPaginationRange } from '../../../utils/paginationUtils';

export function Pagination({
    page,
    totalPages,
    limit,
    siblings,
    onPageChange,
}) {
    const array = returnPaginationRange(totalPages, page, limit, siblings);

    function handleKeyDown(evt, value) {
        if (evt.key === 'Enter') {
            onPageChange(value);
        }
    }

    return (
        <nav className="nav-pagination">
            <ul className="pagination">
                <li className="page-item">
                    <button
                        className="page-link_type_arrow page-link_type_larrow"
                        alt="left-arrow"
                        onClick={() => onPageChange('&lsaquo')}
                        onKeyDown={(evt) => handleKeyDown(evt, '&lsaquo')}
                    >
                        {}
                    </button>
                </li>
                <ul className="paginations__list">
                    {array.map((value) => (
                        <li key={value} className="page-item">
                            <button
                                onClick={() => onPageChange(value)}
                                onKeyDown={(evt) => handleKeyDown(evt, value)}
                                className={`page-link ${
                                    page === value
                                        ? 'page-link_type_active'
                                        : ''
                                }`}
                            >
                                {value}
                            </button>
                        </li>
                    ))}
                </ul>
                <li className="page-item">
                    <button
                        className="page-link_type_arrow page-link_type_rarrow"
                        alt="left-arrow"
                        onClick={() => onPageChange('&rsaquo')}
                        onKeyDown={(evt) => handleKeyDown(evt, '&rsaquo')}
                    >
                        {}
                    </button>
                </li>
            </ul>
        </nav>
    );
}
Pagination.propTypes = {
    page: PropTypes.number.isRequired,
    totalPages: PropTypes.number.isRequired,
    limit: PropTypes.number.isRequired,
    onPageChange: PropTypes.func,
    siblings: PropTypes.number.isRequired,
};
Pagination.defaultProps = {
    onPageChange: () => {},
};
