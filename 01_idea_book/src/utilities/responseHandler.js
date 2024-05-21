class responseHandler extends Response {
    constructor(
        statusCode,
        data,
        message = "Successfully Done !"
    ){
        super(message),
        this.statusCode = statusCode,
        this.success = true
        this.data = data
    }
}

export default responseHandler