import { createClient } from "redis";

// 레디스
const redisClient = createClient({
    url: `redis://${process.env.REDIS_USER}:${process.env.REDIS_PW}@${process.env.REDIS_HOST}:${process.env.REDIS_PORT}/0`
  });
  
  redisClient.on('connect', () => console.log("레디스 연결 성공"))
  redisClient.on('error', err => console.error('레디스 연결 중 문제 발생:', err))
  
  await redisClient.connect();
  export default redisClient