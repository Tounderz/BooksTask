import React, { useContext } from 'react';
import { Navbar, Container} from 'react-bootstrap';
import { observer } from 'mobx-react-lite';
import { Link } from 'react-router-dom';
import { HOME_ROUTE } from '../utils/const';
import { Context } from '../index';
import { fetchBooks } from '../http/booksApi';


const NavBar = observer(() => {
    const {book} = useContext(Context)

    const onClick = async () => {
        const data = await fetchBooks();
            book.setBooks(data.books)
    }

    return (
        <Navbar bg="dark" variant="dark">
            <Container>
                <Link 
                    className='navbar-brand'
                    to={HOME_ROUTE}
                    onClick={onClick}
                >
                    Home
                </Link>
            </Container>
        </Navbar>
    );
});

export default NavBar;