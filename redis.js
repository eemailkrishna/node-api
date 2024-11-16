const redis = require("redis");

const redisClient = redis.createClient({
    url: "redis://red-cssdjrjtq21c739vnp5g:6379", // Use the Redis URL provided by Render or your configuration
});

redisClient.on("connect", () => {
    console.log("Connected to Redis");
});

redisClient.on("error", (err) => {
    console.error("Redis error:", err);
});

redisClient.connect(); // Use async connect() for Redis v4

module.exports = redisClient;
