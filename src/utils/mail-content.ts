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
      <p style="color: #666; line-height: 1.6;">To log in, reset your password.</p>
  
      
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


/**
 * Generates an order payment confirmation email
 * @param user Object containing the user's email and optional name
 * @param orderId The unique order ID for the completed order
 * @returns HTML string for the order payment confirmation email
 */
export const generateOrderPaymentEmail = (user: { name?: string; email: string }, orderId: string): string => {
  const displayName = user.name || "Valued Customer"

  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9;">
      <h2 style="color: #333; text-align: center;">Payment Confirmation</h2>
      
      <p style="color: #666; line-height: 1.6;">Hi ${displayName},</p>
      <p style="color: #666; line-height: 1.6;">
        We’re excited to let you know that your payment has been successfully received. 
        Your order <strong>#${orderId}</strong> is now being processed.
      </p>

      <div style="background-color: #fff; border: 1px solid #ddd; border-radius: 6px; padding: 15px; margin: 20px 0;">
        <p style="margin: 0; color: #333;"><strong>Order ID:</strong> ${orderId}</p>
        <p style="margin: 0; color: #333;"><strong>Status:</strong> Paid</p>
      </div>

      <p style="color: #666; line-height: 1.6;">
        You will receive another notification once your order has been shipped. 
        Thank you for your purchase and for choosing us!
      </p>

      <hr style="border: none; border-top: 1px solid #ddd; margin: 30px 0;">
      <p style="color: #999; font-size: 12px; text-align: center;">
        This email was sent to ${user.email}. If you have questions about your order, please contact support@yourapp.com.
      </p>
    </div>
  `
}


/**
 * Generates an order status update email
 * @param user Object containing the user's email and optional name
 * @param order Object containing the order ID and new status
 * @returns HTML string for the order status update email
 */
export const generateOrderStatusUpdateEmail = (
  user: { name?: string; email: string },
  order: { id: string; status: string }
): string => {
  const displayName = user.name || "Valued Customer"
  const CLIENT_URL = process.env.CLIENT_BASE_URL || "http://localhost:3000"

  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9;">
      <h2 style="color: #333; text-align: center;">Order Status Update</h2>
      
      <p style="color: #666; line-height: 1.6;">Hi ${displayName},</p>
      <p style="color: #666; line-height: 1.6;">
        We wanted to let you know that the status of your order <strong>#${order.id}</strong> has been updated.
      </p>

      <div style="background-color: #fff; border: 1px solid #ddd; border-radius: 6px; padding: 15px; margin: 20px 0;">
        <p style="margin: 0; color: #333;"><strong>Order ID:</strong> ${order.id}</p>
        <p style="margin: 0; color: #333;"><strong>New Status:</strong> ${order.status}</p>
      </div>

      <p style="color: #666; line-height: 1.6;">
        You can view your order details or track its progress using the link below.
      </p>

      <div style="text-align: center; margin: 30px 0;">
         <a href="${CLIENT_URL}/orders/${order.id}" 
           style="background-color: #007bff; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; font-weight: bold; display: inline-block;">
           View Order
        </a>
      </div>

      <p style="color: #666; line-height: 1.6; font-size: 14px;">
        Thank you for shopping with us. We appreciate your patience as we complete your order.
      </p>

      <hr style="border: none; border-top: 1px solid #ddd; margin: 30px 0;">
      <p style="color: #999; font-size: 12px; text-align: center;">
        This email was sent to ${user.email}. If you have any questions, please contact support@yourapp.com.
      </p>
    </div>
  `
}


/**
 * Generates an order payment failure email
 * @param user Object containing the user's email and optional name
 * @param orderId The unique order ID or reference related to the failed payment
 * @returns HTML string for the payment failure email
 */
export const generatePaymentFailedEmail = (
  user: { name?: string; email: string },
  orderId: string
): string => {
  const displayName = user.name || "Valued Customer"

  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9;">
      <h2 style="color: #d9534f; text-align: center;">Payment Failed</h2>
      
      <p style="color: #666; line-height: 1.6;">Hi ${displayName},</p>
      <p style="color: #666; line-height: 1.6;">
        Unfortunately, your payment for order <strong>#${orderId}</strong> was not successful.
      </p>

      <p style="color: #666; line-height: 1.6;">
        This may have occurred due to an issue with your card, insufficient funds, or a network error.
        Don’t worry — you can try completing your payment again at your convenience.
      </p>

      <p style="color: #666; line-height: 1.6; font-size: 14px;">
        If you believe this was an error, please contact our support team for assistance.
      </p>

      <hr style="border: none; border-top: 1px solid #ddd; margin: 30px 0;">
      <p style="color: #999; font-size: 12px; text-align: center;">
        This email was sent to ${user.email}. If you have any questions, please contact support@yourapp.com.
      </p>
    </div>
  `
}
