const jwt=require('jsonwebtoken');

module.exports=(req,res,next)=>{
    const authHEader=req.get('Authorization');
    if(!authHEader){
        const error=new Error('Not authenticated');
        error.statusCode=401;
        throw error;
    }
    // const token=req.query.token;
    const token = authHEader;
    let decodedToken;
    try{
        decodedToken=jwt.verify(token,'zeek-key');
    }catch(err){
        error.statusCode=401;
        throw new Error("Invalid Token");
    }
    if(!decodedToken){
        const error=new Error('Not authenticated!');
        error.statusCode=401;
        throw error;
    }
    req.userId=decodedToken.userId;
    next();
}