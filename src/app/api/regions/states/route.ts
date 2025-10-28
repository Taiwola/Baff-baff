import dbConnect from '@lib/database'
import { getAllRegions } from '@services/region'
import { sendResponse } from '@utils/api-response'


export async function GET() {
    await dbConnect()
  try {
    const regions = await getAllRegions({})
    const set = new Set<string>()

    for (const region of regions) {
      set.add(region.state)
    }

    const states: SelectItem[] = Array.from(set).map((state) => ({ key: state, label: state }))
    return sendResponse('Request was successfull', states)
  } catch (error) {
    console.error('Error fetching region states:', error)
    console.error('region creation error:', error)
  }
}
