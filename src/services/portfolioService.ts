import { Portfolio } from "@/types/portfolio"

const API = process.env.NEXT_PUBLIC_API_BASE_URL

export const getPortfolio = async (): Promise<Portfolio> => {
  const [portfolioRes, projectsRes, designsRes, certsRes] = await Promise.all([
    fetch(`${API}/portfolio`, { cache: 'no-store' }),
    fetch(`${API}/portfolio/projects`, { cache: 'no-store' }),
    fetch(`${API}/portfolio/designs`, { cache: 'no-store' }),
    fetch(`${API}/portfolio/certificates`, { cache: 'no-store' })
  ])

  if (!portfolioRes.ok) {
    throw new Error('Failed to fetch base portfolio data')
  }

  const portfolio = await portfolioRes.json()
  
  let projects = []
  let designs = []
  let certificates = []

  try {
    if (projectsRes.ok) {
      const res = await projectsRes.json()
      projects = res.data || []
    }
  } catch (e) {}

  try {
    if (designsRes.ok) {
      const res = await designsRes.json()
      designs = res.data || []
    }
  } catch (e) {}

  try {
    if (certsRes.ok) {
      const res = await certsRes.json()
      certificates = res.data || []
    }
  } catch (e) {}

  return {
    ...portfolio,
    projects: projects || [],
    designs: designs || [],
    certificates: certificates || []
  }
}