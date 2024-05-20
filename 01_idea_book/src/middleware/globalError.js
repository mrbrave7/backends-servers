const globalError = (req,res,next,err) => {
    console.log("passed from here")
    const statusCode = err.statusCode || 500;
    return (res.status(statusCode).json({
        message:err.message,
        errStack:process.env.mode === "development"? err.stack :" "
    }))
}
export default globalError