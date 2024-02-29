class APIErrors {
    constructor(
        statusecode,
        message="Somthing Went Wrong",
        errors=[],
    ){
        
        this.statusecode=statusecode;
        this.message=message;
        this.success=false
        this.errors=errors;
        
    
    }
}

export default APIErrors