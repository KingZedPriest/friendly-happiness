"use server";

import { PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

// Utils
import { generateFileName } from "@/lib/generate";
import { s3, config } from "@/lib/s3";

// Allowed extensions (include iPhone common ones: .mov, .m4v)
const ALLOWED_EXTS = [".mp4", ".webm", ".ogg", ".mov", ".m4v", ".hevc", ".h265"];

export async function signUpload(formData: FormData) {
    try {
        if (!formData || formData.entries().next().done) {
            return { success: false, message: "No files provided" };
        }

        const results: { signedUrl: string; publicUrl: string; fileName: string; contentType: string }[] = [];

        for (const [, value] of formData.entries()) {
            if (!(value instanceof File)) continue;

            if (value.size > config.maxFileSize) {
                return {
                    success: false,
                    message: `File too large. Max allowed: ${config.maxFileSize / 1024 / 1024} MB`,
                };
            }

            // Extension check
            const ext = value.name.toLowerCase().substring(value.name.lastIndexOf("."));
            if (!ALLOWED_EXTS.includes(ext)) {
                return { success: false, message: `Unsupported file type (${ext})` };
            }

            const fileName = generateFileName(value.name);

            const putCommand = new PutObjectCommand({
                Bucket: config.bucket,
                Key: fileName,
                ContentType: value.type || "application/octet-stream",
            });

            const signedUrl = await getSignedUrl(s3, putCommand, { expiresIn: 3600 });
            const publicUrl = `https://${config.bucket}.s3.${config.region}.amazonaws.com/${fileName}`;

            results.push({ signedUrl, publicUrl, fileName, contentType: value.type });
        }

        return { success: true, message: "Presigned URL generated successfully", results };
    } catch (error) {
        console.error("[SignUpload Error]:", error);
        return { success: false, message: "Couldn't generate upload URL, please try again later" };
    }
}