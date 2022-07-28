import React, { useContext } from 'react';
import { Image } from 'react-bootstrap';
import { Context } from '../index';
import { sortBooks } from '../http/booksApi';
import down from '../img/down.jpg'
import up from '../img/up.jpg'
import { DOWN_SORT_NAME, UP_SORT_NAME } from '../utils/const';

const ColumnItem = ({nameColumn}) => {
    const {book} = useContext(Context);

    const upSort = async () => {
        const data = await sortBooks(nameColumn, UP_SORT_NAME);
            book.setBooks(data.books);
    }

    const downSort = async () => {
        const data = await sortBooks(nameColumn, DOWN_SORT_NAME);
            book.setBooks(data.books);
    }

    return (
        <th scope='col'>
            {nameColumn} 
            <Image
                src={up}
                style={{
                    maxBlockSize: '10px',
                    cursor: 'pointer',
                    margin: '2px'
                }}
                onClick={() => upSort()}
            />
            <Image
                src={down}
                style={{
                    maxBlockSize: '10px',
                    cursor: 'pointer',
                    margin: '2px'
                }} 
                onClick={() => downSort()}
            />
        </th>
    );
};

export default ColumnItem;