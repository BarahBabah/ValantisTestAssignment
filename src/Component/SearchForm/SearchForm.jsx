import PropTypes from 'prop-types';
import './SearchForm.css';

const SearchForm = ({ fields, updateFields, handleSubmit }) => {
    const onSubmit = (e) => {
        e.preventDefault();
        handleSubmit();
    };
    return (
        <form className="search-form" onSubmit={onSubmit}>
            {Object.keys(fields).map((key) => (
                <input
                    key={key}
                    type="text"
                    name={key}
                    value={fields[key]}
                    placeholder={key}
                    onChange={(e) => updateFields(e)}
                />
            ))}
            <button type="submit">Поиск</button>
        </form>
    );
};

SearchForm.propTypes = {
    fields: PropTypes.object.isRequired,
    updateFields: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired,
};

export default SearchForm;
