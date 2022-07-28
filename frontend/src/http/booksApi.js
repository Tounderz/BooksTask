import axiosApi from './axiosApi'

export const fetchBooks = async () => {
    const {data} = await axiosApi.get(`/books/list`);
    return data;
}

export const createBook = async (title, author, dateOfPublication) => {
    const {data} = await axiosApi.post(`/books/create`, { Title: title, Author: author, DateOfPublication: dateOfPublication});
    return data;
}

export const sortBooks = async (nameColumn, type) => {
    const {data} = await axiosApi.post(`/books/sort`, {FieldName: nameColumn, SortType: type });
    return data;
}

export const searchBooks = async () => {
    const {data} = await axiosApi.post(`/books/search`);
    return data;
}

export const buyBook = async (id) => {
    const {data} = await axiosApi.get(`/books/buy?id=${id}`);
    return data;
}