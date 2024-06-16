const globalError = async(err,req,res,next) => {
    console.error(err.stack)
     res.status(err.status || 500).json({
        error: {
            message: err.message,
            ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
        }
    });
}
export default globalError