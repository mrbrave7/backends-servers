const asynchandler = (handlerequest) => async (req,res,next) => {
   try {
    handlerequest(req,res,next)
   } catch (error) {
    throw error
   }
}
export default asynchandler