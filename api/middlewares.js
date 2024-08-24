import { createClient } from "redis";

const redisClient = createClient();
await redisClient.connect()

export async function rateLimit(req, res, next) {    

    const ip = req.ip;

    const key = `rateLimit:${ip}`;

    let count = await redisClient.get(key)
    if (count === null) {
        await redisClient.set(key, 1, 'EX', 60);
        return next();
    }

    if (count >= 5) {
        setTimeout(() => {
            redisClient.del(key)
        }, 1000 * 60);
        return res.status(429).send('Too many requests');
    }

    await redisClient.incr(key);
    return next();
}
  