import { makeAutoObservable } from 'mobx'

export default class AuthStore {
    constructor() {
        this._books = []
        this._fieldNames = []

        makeAutoObservable(this)
    }

    setBooks(books) {
        this._books = books
    }
    
    get books() {
        return this._books
    }

    setFieldNames(fieldNames) {
        this._fieldNames = fieldNames
    }

    get fieldNames() {
        return this._fieldNames
    }
}