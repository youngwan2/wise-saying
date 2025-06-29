import { createClient } from "redis";

// 레디스 (로컬)
const redisClient = createClient({
  url: "redis://localhost:6379/0"
});

redisClient.on('connect', () => console.log("레디스 연결 성공"))
redisClient.on('error', err => console.error('레디스 연결 중 문제 발생:', err))

await redisClient.connect();
export default redisClient