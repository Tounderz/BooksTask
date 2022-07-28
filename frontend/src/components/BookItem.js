import React, { useContext } from 'react';
import { Context } from '..';
import { buyBook } from '../http/booksApi';

const BookItem = ({item}) => {
    const {book} = useContext(Context)

    const buy = async () => {
        const data = await buyBook(item.id);
            book.setBooks(data.books);
    }
    
    return (
        <tbody>
            <tr key={item.id}>
                <th scope="row">{item.id}</th>
                    <td>{item.title}</td>
                    <td>{item.author}</td>
                    <td>{item.dateOfPublication}</td>
                    <td>
                        <button
                        className="btn-primary m-2"
                        variant={"outline-success"}
                        style={{
                            cursor: "pointer",
                            borderRadius: "5px",
                        }}
                        onClick={buy}
                    >
                        Buy
                    </button>
                </td>
            </tr>
        </tbody>
    );
};

export default BookItem;