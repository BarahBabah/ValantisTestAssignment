import './SearchForm.css';
const SearchForm = ({ fields, updateFields, handleSubmit }) => {
    const onSubmit = (e) => {
        e.preventDefault();
        handleSubmit(); // Вызываем переданный колбэк
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

export default SearchForm;
