import React, { useContext, useState } from 'react';
import { Modal, Form, FormControl } from 'react-bootstrap';
import { Context } from '../../index';
import { createBook } from '../../http/booksApi';
import { useInput } from '../../http/validateApi';

const CreateBook = ({show, onHide}) => {
    const {book} = useContext(Context);
    const title = useInput('', {minLength: {value: 3, name: 'Title'}});
    const author = useInput('', {minLength: {value: 3, name: 'Author'}});
    const dateOfPublication = useInput(new Date(), {date: {name: 'Date Of Publication'}});
    const [messageError, setMessageError] = useState('')

    const click = async () => {
        try {
            const data = await createBook(title.value, author.value, dateOfPublication.value);
                book.setBooks(data.books);
                setMessageError('');
                onHide();
        } catch (e) {
            setMessageError(e.response.data.message);
        } finally{
            title.onChange('');
            author.onChange('');
            dateOfPublication.onChange(new Date());
        }
    }

    return (
        <Modal
            show={show}
            onHide={onHide}
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    New book
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <h5 style={{color: 'red'}}>{messageError}</h5>
                <Form>
                    {(title.isDirty && title.minLengthError) && <div className='mt-3' style={{color: 'red'}}>{title.messageError}</div>}
                    <FormControl
                        className='mt-3' 
                        value={title.value}
                        onChange={e => title.onChange(e)}
                        onBlur={e => title.onBlur(e)}
                        placeholder={'Title'}
                    />

                    {(author.isDirty && author.minLengthError) && <div className='mt-3' style={{color: 'red'}}>{author.messageError}</div>}
                    <FormControl
                        className='mt-3'
                        value={author.value}
                        onChange={e => author.onChange(e)}
                        onBlur={e => author.onBlur(e)}
                        placeholder={'Author'}
                    />

                    {(dateOfPublication.isDirty && dateOfPublication.dateError) && <div className='mt-3' style={{color: 'red'}}>{dateOfPublication.messageError}</div>}
                    <FormControl
                        className='mt-3'
                        value={dateOfPublication.value}
                        type='date'
                        onChange={e => dateOfPublication.onChange(e)}
                        onBlur={e => dateOfPublication.onBlur(e)}
                        placeholder={'Date Of Publication'}
                    />
                </Form>
            </Modal.Body>
            <Modal.Footer>
            <button
                    className="btn-primary m-2"
                    variant={'outline-success'}
                    style={{
                        cursor: 'pointer',
                        borderRadius: '5px'
                    }}
                    disabled={!title.inputValid || !author.inputValid || !dateOfPublication.inputValid}
                    onClick={click}
                >
                    Create
                </button>
                <button 
                    className="btn-danger"
                    variant={'outline-success'}
                    style={{
                        cursor: 'pointer',
                        borderRadius: '5px'
                    }}
                    onClick={onHide}
                >
                    Close
                </button>
            </Modal.Footer>
        </Modal>
    );
};

export default CreateBook;