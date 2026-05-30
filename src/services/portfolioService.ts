import { Portfolio } from "@/types/portfolio"

const API = process.env.NEXT_PUBLIC_API_BASE_URL

export const getPortfolio = async (): Promise<Portfolio> => {
  const res = await fetch(`${API}/portfolio`, {
    cache: 'no-store'
  })

  if (!res.ok) {
    throw new Error('Failed to fetch portfolio')
  }

  return res.json()
}