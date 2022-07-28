import React, { useContext, useState } from 'react';
import { Context } from '../index';
import { Container } from 'react-bootstrap';
import { fetchBooks } from '../http/booksApi';
import { observer } from 'mobx-react-lite';
import CreateBook from '../components/create/CreateBook';
import { useNavigate } from 'react-router';
import { BOOKS_ROUTE } from '../utils/const';

const Home = observer(() => {
    const {book} = useContext(Context);
    const [createVisible, setCreateVisible] = useState(false);
    const navigate = useNavigate()

    const bookList = async () => {
        const data = await fetchBooks();
            book.setBooks(data.books);
            navigate(BOOKS_ROUTE)

    }

    return (
        <Container className='table-responsive mt-5'>
            <button
                className="btn-primary m-2"
                variant={"outline-success"}
                style={{
                    cursor: "pointer",
                    borderRadius: "5px",
                }}
                onClick={bookList}
            >
                Books List
            </button>
            <button
                className="btn-primary m-2"
                variant={"outline-success"}
                style={{
                    cursor: "pointer",
                    borderRadius: "5px",
                }}
                onClick={() => setCreateVisible(true)}
            >
                New Book
            </button>
            <CreateBook show={createVisible} onHide={() => setCreateVisible(false)}/>
        </Container>
    );
});

export default Home;