class APIRescponce {
    constructor(
        statusecode,
        data,
        message="Success"
    ){
        this.statusCode = statusecode;
        this.data= data;
        this.message=message;
        this.success=true

    }
}

export default APIRescponce