import React, { useContext } from 'react';
import { Context } from '../index';
import { observer } from 'mobx-react-lite';

const ErrorPage = observer(() => {
    const {error} = useContext(Context)
    
    return (
        <h1 
            className='d-flex justify-content-center align-items-center mt-3'
        >
            {error.errorMessage}
        </h1>
    );
});

export default ErrorPage;