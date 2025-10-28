import dbConnect from "@lib/database";
import { sendResponse } from "@utils/api-response";
import {google} from "googleapis"




export async function GET() {
    await dbConnect()
   const oauth2Client = new google.auth.OAuth2(
      process.env.GOOGLE_CLIENT_ID,
      process.env.GOOGLE_CLIENT_SECRET,
      process.env.GOOGLE_REDIRECT_URI
    );

    const authUrl = oauth2Client.generateAuthUrl({
      access_type: 'offline',
      scope: [
        'https://www.googleapis.com/auth/userinfo.email',
        'https://www.googleapis.com/auth/userinfo.profile',
      ],
      prompt: 'consent',
    });
    return sendResponse('User created and logged in successfully', authUrl, 200)
}