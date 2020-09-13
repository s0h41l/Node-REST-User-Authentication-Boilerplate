const redis = require('redis');

const REDIS_PORT = process.env.PORT || 6379;
const client = redis.createClient(REDIS_PORT);

exports.cache = (req, res, next) => {
    try {
        const { username } = req.query;
        client.get(username, (err, data) => {
            
            if(err) throw err;

            if(data !== null){
                res.json({
                    reposCount: data,
                    from: "cache" 
                })

            }else{
               
                next();

            }
        })

    } catch (error) {
        res.json({
            message: error
        })
    }
}