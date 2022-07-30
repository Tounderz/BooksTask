import { makeAutoObservable } from 'mobx'

export default class AuthStore {
    constructor() {
        this._errorMessage = ''

        makeAutoObservable(this)
    }

    setErrorMessage(errorMessage) {
        this._errorMessage = errorMessage
    }
    
    get errorMessage() {
        return this._errorMessage
    }
}