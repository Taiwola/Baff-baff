import { deleteSession } from '@lib/session'
import { sendResponse } from '@utils/api-response'

export async function DELETE() {
  await deleteSession()
  return sendResponse('Logout successful')
}
