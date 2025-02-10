class ErrorHandler extends Error{
    constructor(statusCode,message){
        super(message)
        this.statusCode = statusCode;
    }
}


export const errorMiddleware = (err,req,res,next)=>{
    err.message = err.message  || "Internal server Error 😞";
    err.statusCode = err.statusCode  || 500;
    res.status(400).json({
        success:err.statusCode,
        message:err.message,
    })
}

export default ErrorHandler;