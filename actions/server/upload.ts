"use server";

import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

//Libs
import { generateFileName } from "@/lib/generate";

// Environment Variables
const region = process.env.BUCKET_REGION!;
const accessKey = process.env.ACCESS_KEY!;
const secretKey = process.env.SECRET_ACCESS_KEY!;
const bucketName = process.env.BUCKET_NAME!;
const fileSize = process.env.FILE_SIZE!;

//S3 clients
const s3 = new S3Client({
    region,
    credentials: {
        accessKeyId: accessKey,
        secretAccessKey: secretKey,
    },
});

const maxFileSize = 1024 * 1024 * parseInt(fileSize);

export const uploadFiles = async (formData: FormData) => {
    try {
        const uploadTasks: Promise<string>[] = [];

        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        for (const [_, value] of formData.entries()) {
            if (!(value instanceof File)) continue;
            if (value.size > maxFileSize) throw new Error("File too large");

            const fileName = generateFileName(value.name);

            const putObjectCommand = new PutObjectCommand({
                Bucket: bucketName,
                Key: fileName,
                ContentType: value.type,
                ContentLength: value.size,
                Metadata: { userName: "super admin" },
            });

            const uploadTask = getSignedUrl(s3, putObjectCommand, { expiresIn: 3600 })
                .then(signedUrl =>
                    fetch(signedUrl, {
                        method: "PUT",
                        body: value,
                        headers: { "Content-Type": value.type },
                    }).then(() => `https://${bucketName}.s3.${region}.amazonaws.com/${fileName}`)
                );

            uploadTasks.push(uploadTask);
        }

        const uploadedUrls = await Promise.all(uploadTasks);
        return { success: true, imageLinks: uploadedUrls };

    } catch (error) {
        console.error("[Upload Error]:", error instanceof Error ? error.message : error);
        return { success: false, message: "Couldn't upload media now, kindly try again later" };
    }
};
