import { S3Client, PutObjectCommand, S3ClientConfigType, GetObjectAclCommand } from "@aws-sdk/client-s3"; // ES Modules import


const config:S3ClientConfigType = {
    region:process.env.AWS_S3_BUCKET_REGION,
    credentials : {
        accessKeyId: process.env.AWS_S3_ACCESS_KEY||'',
        secretAccessKey: process.env.AWS_S3_ACCESS_SECRET||'',

    }

}
const client = new S3Client(config);


export const main = async (key:string, imgData:Buffer)=>{

    const command = new PutObjectCommand({
        Bucket:process.env.AWS_S3_BUCKET_NAME||'',         // 버켓 이름
        Key:key,
        Body:imgData,
        ContentType:'image/png'
    })

    try {
        const response = await client.send(command);
        console.log(response)
        return true
    } catch(error){
        console.error("S3 접근 중 문제발생(/src/s3.ts):",error)
        return false
    }
}





