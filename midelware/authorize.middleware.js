module.exports =  (...allAuthor)=>{
    return (req, res, next)=>{
        if(allAuthor.includes(req.user.role)){
            next()
        }else{
            res.status(401).json({
                status: "fail",
                massage: "you are not authorized to access this route"
            })
        }
    }
}