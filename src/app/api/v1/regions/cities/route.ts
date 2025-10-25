import dbConnect from '@lib/database'
import { getAllRegions } from '@services/region'
import { sendResponse } from '@utils/api-response'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
    await dbConnect()
  const { searchParams } = new URL(req.url)
  const state = searchParams.get('state')

  if (!state) {
    return NextResponse.json({ error: 'State parameter is required' }, { status: 400 })
  }

  try {
    const regions = await getAllRegions({ state })
    const citites: SelectItem[] = regions.map((region) => ({ key: region.city, label: region.city }))
    return sendResponse('Request was successfull', citites)
  } catch (error) {
    console.error('Error fetching region states:', error)
    console.error('region creation error:', error)
  }
}
