import { NextRequest } from "next/server"
import { Readable } from "stream"

// Convert NextRequest to Node.js IncomingMessage-like object
export async function convertToNodeRequest(req: NextRequest) {
  const body = await req.arrayBuffer()
  const readable = Readable.from(Buffer.from(body))
  
  // Create a mock IncomingMessage object
  const nodeReq = Object.assign(readable, {
    headers: Object.fromEntries(req.headers.entries()),
    method: req.method,
    url: req.url,
    httpVersion: '1.1',
    httpVersionMajor: 1,
    httpVersionMinor: 1,
  })

  return nodeReq as any
}