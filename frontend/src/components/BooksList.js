import React, { useContext, useState } from 'react';
import { Context } from '../index';
import { Container, Table } from 'react-bootstrap';
import { observer } from 'mobx-react-lite';
import BookItem from './BookItem';
import ColumnItem from './ColumnItem';
import CreateBook from './create/CreateBook';
import Search from './Search';

const BooksList = observer(() => {
    const {book} = useContext(Context);
    const [createVisible, setCreateVisible] = useState(false);

    return (
        <Container>
            <Search key='id'/>
            <Table
                className='table table-bordered border-dark'
                style={{
                    marginTop: '15px'
                }}
            >
                <thead>
                    <tr key="id">
                        <ColumnItem nameColumn='Id'/>
                        <ColumnItem nameColumn='Title'/>
                        <ColumnItem nameColumn='Author'/>
                        <ColumnItem nameColumn='Date Of Publication'/>
                        <th scope='col'>Buy</th>
                    </tr>
                </thead>
                {book.books.map(book => 
                    <BookItem key={book.id} item={book}/>
                )}
            </Table>
            <button
                className='btn-primary m-2'
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

export default BooksList;