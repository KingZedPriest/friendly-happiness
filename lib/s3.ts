import { S3Client } from "@aws-sdk/client-s3";

const requiredEnv = ["BUCKET_REGION", "ACCESS_KEY", "SECRET_ACCESS_KEY", "BUCKET_NAME", "FILE_SIZE"] as const;

for (const key of requiredEnv) {
    if (!process.env[key]) throw new Error(`Missing env var: ${key}`);
}

export const s3 = new S3Client({
    region: process.env.BUCKET_REGION!,
    credentials: {
        accessKeyId: process.env.ACCESS_KEY!,
        secretAccessKey: process.env.SECRET_ACCESS_KEY!,
    },
});

export const config = {
    bucket: process.env.BUCKET_NAME!,
    maxFileSize: 1024 * 1024 * parseInt(process.env.FILE_SIZE!),
    region: process.env.BUCKET_REGION!,
};
