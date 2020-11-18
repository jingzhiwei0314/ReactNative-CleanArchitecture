export default class BaseResponse {
    requestType;
    displayMessage;
    data;

    constructor(requestType, data = null, displayMessage = null) {
        this.requestType = requestType;
        this.data = data;
        this.displayMessage = displayMessage;
    }

    getRequestType() {
        return this.requestType;
    }

    getData() {
        return this.data;
    }

    getDisplayMessage() {
        return this.displayMessage;
    }
}
