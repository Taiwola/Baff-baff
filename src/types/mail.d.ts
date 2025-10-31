interface BulkRecipient {
  email: string
  name?: string
  content?: string 
}

interface MailOptions {
  from: {
    name: string
    address: string
  }
  to: string
  subject: string
  html: string
  bcc?: string[]
}