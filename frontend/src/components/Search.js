import React, { useContext } from 'react';
import { Form } from 'react-bootstrap';
import { useNavigate } from 'react-router';
import { searchBooks } from '../http/booksApi';
import { useInput } from '../http/validateApi';
import { Context } from '../index';
import { BOOKS_ROUTE, ERROR_ROUTE } from '../utils/const';

const Search = () => {
    const {book} = useContext(Context);
    const {error} = useContext(Context);
    const navigate = useNavigate();
    const searchParameter = useInput('', {minLength: {value: 1, name: 'Search'}});
    const fieldName = useInput('', {minLength: {value: 2, name: 'Field Name'}});

    const search = async () => {
        try {
            const data = await searchBooks(fieldName.value, searchParameter.value);
                book.setBooks(data.books);
                navigate(BOOKS_ROUTE);
        } catch (e) {
            error.setErrorMessage(e.response.data.message);
                navigate(ERROR_ROUTE);
        }
    }

    function onKeyPress(e) {
        if (e.key === 'Enter' || e.key === 'NumpadEnter') {
            search();
        }
    }

    return (
        <div className="d-flex mt-3">
            <Form.Select 
                    className='mt-3'
                    style={{
                        width: '200px'
                    }}
                    onChange={e => fieldName.onChange(e)}
                    onBlur={e => fieldName.onBlur(e)}
                >
                    <option value=''>
                        Select a Field Name
                    </option>
                    {book.fieldNames.map((item, index) => (
                        <option
                            key={index}
                            value={item}
                        >
                            {item}
                        </option>
                    ))}
                </Form.Select>
            <Form.Control
                onKeyPress={onKeyPress}
                style={{
                    width: '70%'
                }}
                type='search'
                className='mt-3'
                placeholder='Search'
                value={searchParameter.value}
                onChange={e => searchParameter.onChange(e)}
                onBlur={e => searchParameter.onBlur(e)}
            />
            <button
                className="btn btn-outline-success mt-3"
                disabled={!searchParameter.inputValid || !fieldName.inputValid}
                style={{
                    cursor: 'pointer',
                    borderRadius: '5px',
                }}
                onClick={search}
            >
                Search
            </button>
        </div>
    );
};

export default Search;