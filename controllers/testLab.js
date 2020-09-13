const fetch = require('node-fetch');
const redis = require('redis');

const REDIS_PORT = process.env.PORT || 6379;

const client = redis.createClient(REDIS_PORT);

exports.getRepos = async (req, res, next)=>{
    try {
        const { username } = req.query;
        const response = await fetch(`https://api.github.com/users/${username}`);
        const data = await response.json();
        const repos = data.public_repos;
        client.setex(username, 3600, repos);

        res.json({
            reposCount: repos,
            from: "api" 
        })
    } catch (error) {
        res.json({
            message: error
        })
    }
}