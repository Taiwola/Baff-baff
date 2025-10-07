export const generateResetPasswordEmail = (user: { name?: string; email: string }, resetLink: string): string => {
  const displayName = user.name || user.email

  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9;">
      <h2 style="color: #333; text-align: center;">Reset Your Password</h2>
      <p style="color: #666; line-height: 1.6;">Hi ${displayName},</p>
      <p style="color: #666; line-height: 1.6;">We've received a request to reset your password. If you didn't request this, please ignore this email.</p>
      <p style="color: #666; line-height: 1.6;">To reset your password, click the button below. This link will expire in 1 hour for security reasons.</p>
      
      <div style="text-align: center; margin: 30px 0;">
        <a href="${resetLink}" style="background-color: #007bff; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; font-weight: bold; display: inline-block;">Reset Password</a>
      </div>
      
      <p style="color: #666; line-height: 1.6; font-size: 14px;">
        If the button doesn't work, copy and paste this link into your browser:<br>
        <a href="${resetLink}" style="color: #007bff;">${resetLink}</a>
      </p>
      
      <hr style="border: none; border-top: 1px solid #ddd; margin: 30px 0;">
      <p style="color: #999; font-size: 12px; text-align: center;">
        This email was sent to ${user.email}. If you have questions, contact support@yourapp.com.
      </p>
    </div>
  `
}

/**
 * Generates an admin invitation email
 * @param user Object containing the user's email and optional name
 * @param link The invitation link for the user to accept the admin role
 * @returns HTML string for the admin invitation email
 */
export const generateAdminInvite = (user: { name?: string; email: string }, link: string): string => {
  const displayName = user.name || user.email

  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9;">
      <h2 style="color: #333; text-align: center;">You're Invited to Become an Admin</h2>
      <p style="color: #666; line-height: 1.6;">Hi ${displayName},</p>
      <p style="color: #666; line-height: 1.6;">You've been invited to join our platform as an administrator. As an admin, you'll have access to manage users, and other key features.</p>
      
      <div style="text-align: center; margin: 30px 0;">
        <a href="${link}" style="background-color: #007bff; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; font-weight: bold; display: inline-block;">Accept Invitation</a>
      </div>
      
      <p style="color: #666; line-height: 1.6; font-size: 14px;">
        If the button doesn't work, copy and paste this link into your browser:<br>
        <a href="${link}" style="color: #007bff;">${link}</a>
      </p>
      
      <hr style="border: none; border-top: 1px solid #ddd; margin: 30px 0;">
      <p style="color: #999; font-size: 12px; text-align: center;">
        This email was sent to ${user.email}. If you have questions or did not expect this invitation, contact support@yourapp.com.
      </p>
    </div>
  `
}
