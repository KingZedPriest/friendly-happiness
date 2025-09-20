// FILE: src/app/actions/signUpload.ts
"use server";

import { PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

//Utils
import { generateFileName } from "@/lib/generate";
import { s3, config } from "@/lib/s3";

const ALLOWED_TYPES = ["video/mp4", "video/webm", "video/ogg"];

export async function signUpload(formData: FormData) {
    try {
        if (!formData || formData.entries().next().done) {
            return { success: false, message: "No files provided" };
        }

        const results: { signedUrl: string; publicUrl: string; fileName: string; contentType: string }[] = [];

        for (const [, value] of formData.entries()) {
            if (!(value instanceof File)) continue;

            if (value.size > config.maxFileSize) {
                return { success: false, message: `File too large. Max allowed: ${config.maxFileSize / 1024 / 1024} MB` }
            }

            if (!ALLOWED_TYPES.includes(value.type)) {
                return { success: false, message: "Unsupported file type" }
            }

            const fileName = generateFileName(value.name);

            const putCommand = new PutObjectCommand({
                Bucket: config.bucket,
                Key: fileName,
                ContentType: value.type,
            });

            const signedUrl = await getSignedUrl(s3, putCommand, { expiresIn: 3600 });
            const publicUrl = `https://${config.bucket}.s3.${config.region}.amazonaws.com/${fileName}`;

            results.push({ signedUrl, publicUrl, fileName, contentType: value.type });
        }

        return { success: true, message: "Presigned Url successfully", results };
    } catch (error) {
        console.error("[SignUpload Error]:", error);
        return { success: false, message: "Couldn't generate upload URL, please try again later" };
    }
}
