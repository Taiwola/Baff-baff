import { ApiResponse, LocalGovernment, State } from '@index'

const API_BASE_URL = process.env.API_REGION_URL

export class NGA_Api {
  // Fetch all states
  static async fetchStates(): Promise<State[]> {
    try {
      const response = await fetch(`${API_BASE_URL}/fetch`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      })

      if (!response.ok) {
        throw new Error(`Failed to fetch states: ${response.statusText}`)
      }

      const result: ApiResponse<State[]> = await response.json()
      return result.data
    } catch (error) {
      console.error('Error fetching states:', error)
      throw error
    }
  }

  // Fetch LGAs for a specific state
  static async fetchLGAs(state: string): Promise<LocalGovernment[]> {
    try {
      const response = await fetch(`${API_BASE_URL}/?state=${encodeURIComponent(state)}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      })

      if (!response.ok) {
        throw new Error(`Failed to fetch LGAs for ${state}: ${response.statusText}`)
      }

      const result: ApiResponse<LocalGovernment[]> = await response.json()
      return result.data
    } catch (error) {
      console.error(`Error fetching LGAs for ${state}:`, error)
      throw error
    }
  }
}
