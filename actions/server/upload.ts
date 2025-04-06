"use server";

import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

// libs
import { generateFileName } from "@/lib/generate";

// Environment Variables
const region = process.env.BUCKET_REGION!;
const accessKey = process.env.ACCESS_KEY!;
const secretKey = process.env.SECRET_ACCESS_KEY!;
const bucketName = process.env.BUCKET_NAME!;
const fileSize = process.env.FILE_SIZE!;

// S3 Client
const s3 = new S3Client({
    region: region,
    credentials: {
        accessKeyId: accessKey,
        secretAccessKey: secretKey,
    }
});

const maxFileSize = 1024 * 1024 * parseInt(fileSize);

export const uploadFiles = async (formData: FormData) => {
    try {
        // Extract files from FormData
        const uploadedUrls: string[] = [];

        for (const [key, value] of formData.entries()) {
            if (value instanceof File) {
                if (value.size > maxFileSize) {
                    throw new Error("File too large");
                }

                // Generate unique media name
                const fileName = generateFileName(value.name);

                // Prepare S3 upload command
                const putObjectCommand = new PutObjectCommand({
                    Bucket: bucketName,
                    Key: fileName,
                    ContentType: value.type,
                    ContentLength: value.size,
                    Metadata: { userName: "super admin" },
                });

                // Generate signed URL
                const signedUrl = await getSignedUrl(s3, putObjectCommand, { expiresIn: 3600 });

                // Upload media to S3
                await fetch(signedUrl, {
                    method: "PUT",
                    body: value,
                    headers: { "Content-Type": value.type },
                });

                uploadedUrls.push(`https://${bucketName}.s3.${region}.amazonaws.com/${fileName}`);
            }
        }

        return { success: true, imageLinks: uploadedUrls };

    } catch (error) {
        console.error("Error uploading the user's files", error);
        return { success: false, message: "Couldn't upload media now, kindly try again later" };
    }
};
