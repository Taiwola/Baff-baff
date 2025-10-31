import { sendMail, verifyTransporter } from '@config/mail.config'

export const sendEmail = async (email: string, content: string, title: string, username: string, bcc?: string | string[]) => {
  let verify: boolean
  try {
    verify = await verifyTransporter()
  } catch (error: unknown) {
    console.log(error)
    return { error: true, errorMessage: (error as Error).message }
  }

  if (!verify) return { error: true, errorMessage: '' }

  let mailOptions: MailOptions

  try {
    mailOptions = {
      from: {
        name: `${username}`,
        address: process.env.MAIL_USERNAME as string
      },
      to: email,
      subject: title,
      html: content
    }
    if (bcc) {
      mailOptions.bcc = Array.isArray(bcc) ? bcc : [bcc]
    }
    await sendMail(mailOptions)
    return { error: false, errorMessage: '' }
  } catch (error) {
    return { error: true, errorMessage: (error as Error).message }
  }
}


export const sendBulkEmail = async (
  recipients: BulkRecipient[],
  subject: string,
  defaultContent: string,
  senderName: string,
  options: {
    maxConcurrent?: number
    useBCC?: boolean
    fallbackToIndividual?: boolean
  } = {}
): Promise<{
  success: string[]
  failed: { email: string; error: string }[]
}> => {
  const {
    maxConcurrent = 5,
    useBCC = true,
    fallbackToIndividual = true,
  } = options

  const validRecipients = recipients.filter(r => r.email && r.email.includes('@'))
  if (validRecipients.length === 0) {
    return { success: [], failed: [] }
  }

  const success: string[] = []
  const failed: { email: string; error: string }[] = []

  // Try BCC first
  if (useBCC && validRecipients.length > 1) {
    try {
      const first = validRecipients[0].email
      const bccList = validRecipients.slice(1).map(r => r.email)

      const { error, errorMessage } = await sendEmail(
        first,
        defaultContent,
        subject,
        senderName,
        bccList
      )

      if (!error) {
        const allEmails = validRecipients.map(r => r.email)
        console.info(`Bulk email sent to ${allEmails.length} recipients via BCC`)
        return { success: allEmails, failed: [] }
      } else {
        console.warn('BCC bulk send failed:', errorMessage)
        if (!fallbackToIndividual) {
          return { 
            success: [], 
            failed: validRecipients.map(r => ({ email: r.email, error: errorMessage }))
          }
        }
      }
    } catch (err) {
      console.warn('BCC send error:', err)
      if (!fallbackToIndividual) {
        return { 
          success: [], 
          failed: validRecipients.map(r => ({ 
            email: r.email, 
            error: (err as Error).message 
          }))
        }
      }
    }
  }

  // Send individual emails with concurrency control
  const chunks: BulkRecipient[][] = []
  for (let i = 0; i < validRecipients.length; i += maxConcurrent) {
    chunks.push(validRecipients.slice(i, i + maxConcurrent))
  }

  for (const chunk of chunks) {
    const promises = chunk.map(async (recipient) => {
      const content = recipient.content || defaultContent
      const { error, errorMessage } = await sendEmail(
        recipient.email,
        content,
        subject,
        senderName
      )

      if (error) {
        failed.push({ email: recipient.email, error: errorMessage })
      } else {
        success.push(recipient.email)
      }
    })

    await Promise.allSettled(promises)
  }

  if (failed.length > 0) {
    console.warn(`Bulk send: ${failed.length} failed`)
  }

  return { success, failed }
}