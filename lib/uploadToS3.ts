export async function uploadWithFetch(file: File, signedUrl: string): Promise<{ uploadSuccess: boolean, uploadMessage: string }> {
    const res = await fetch(signedUrl, {
        method: "PUT",
        body: file,
        headers: { "Content-Type": file.type },
    });
    if (!res.ok) return { uploadSuccess: false, uploadMessage: "Could not upload video, kindly try again" }

    return { uploadSuccess: true, uploadMessage: "Video was uploaded successfully." }
}