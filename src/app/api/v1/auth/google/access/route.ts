import { createSession } from "@lib/session";
import { createUser, getUserByEmail } from "@services/user";
import { sendResponse } from "@utils/api-response";
import { randomBytes } from "crypto";
import { google } from "googleapis";
import { NextRequest } from "next/server";

const generateSecurePassword = () => randomBytes(8).toString('hex')

export async function POST(req:NextRequest) {
    const body = await req.json();
    const { code } = body;

    const oauth2Client = new google.auth.OAuth2(
      process.env.GOOGLE_CLIENT_ID,
      process.env.GOOGLE_CLIENT_SECRET,
      process.env.GOOGLE_REDIRECT_URI
    );
    const { tokens } = await oauth2Client.getToken(code);   
    oauth2Client.setCredentials(tokens);

    const oauth2 = google.oauth2({
      auth: oauth2Client,
      version: 'v2',
    });
    const profile = await oauth2.userinfo.get();
    const email = profile.data.email;
    const firstName = profile.data.given_name;
    const lastName = profile.data.family_name;

    const checkUser = await getUserByEmail(email as string)
    if (checkUser) {
      await createSession({ id: checkUser.id, role: checkUser.role })
      return sendResponse('Login successful', null, 200)
    }

    const password = generateSecurePassword()

    const newUser = await createUser({
      email: email as string,
      firstName: firstName as string, 
      lastName: lastName as string,
      role: 'user',
      termsAndCondition: true,
      password,
      confirmPassword: password,
    })

    await createSession({ id: newUser.id, role: newUser.role })
}