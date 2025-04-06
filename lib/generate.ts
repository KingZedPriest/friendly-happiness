import { v4 as uuidv4 } from "uuid";

export function generateFileName(originalName: string): string {
    
    const uniqueId = uuidv4();
    const extension = originalName.split(".").pop();

    return `${uniqueId}.${extension}`;
}