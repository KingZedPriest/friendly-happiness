import CryptoJS from "crypto-js";
import { SignJWT, jwtVerify } from 'jose';

// Secret key (should be a Uint8Array)
const secretKey = new TextEncoder().encode(process.env.SECRET_KEY);

// Function to sign and encode the admin details
export async function signSession(adminDetails: object) {
  const jwt = await new SignJWT({ adminDetails })
    .setProtectedHeader({ alg: 'HS256' })
    .sign(secretKey);

  return jwt;
}

// Function to verify and decode the admin details
export async function verifySession(token: string) {
  const { payload } = await jwtVerify(token, secretKey);
  return payload.adminDetails as unknown as Admin;
}

//Encrypt the passwords
export function encryptPassword(text: string): string {
    return CryptoJS.AES.encrypt(text, "extraordinairetalents").toString();
}