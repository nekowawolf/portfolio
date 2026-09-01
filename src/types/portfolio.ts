export interface BaseItem {
  id: string
}

export interface Certificate {
  _id: string
  title: string
  image_url: string
}

export interface Design {
  _id: string
  title: string
  description: string
  image_url: string
  link: string
  video_url?: string
  category?: string
  tools?: string[]
  screenshots?: string[]
  ss_desc?: string
  color_palette?: VisualAsset
  typography?: VisualAsset
}

export interface ProjectDetails {
  image_url: string
  description: string
}

export interface VisualAsset {
  image_url: string
  description?: string
}

export interface Project {
  _id: string
  title: string
  description: string
  image_url: string
  link: string
  github_url?: string
  screenshots?: string[]
  ss_desc?: string
  video_url?: string
  use_case?: ProjectDetails
  activity?: ProjectDetails
  erd?: ProjectDetails
  flowchart?: ProjectDetails
  stack?: string[]
}

export interface Experience extends BaseItem {
  title: string
  description: string
  subjects: string[]
  start_year: number
  end_year: number
}

export interface Education extends BaseItem {
  title: string
  description: string
  subjects: string[]
  start_year: number
  end_year: number
}

export interface SkillItem extends BaseItem {
  name: string
  icon_url: string
}

export interface Portfolio {
  hero: {
    name: string
    summary: string
    avatar_url: string
    cv_url: string
    github: string
    twitter: string
    linkedin: string
    email: string
  }
  certificates: Certificate[]
  designs: Design[]
  projects: Project[]
  experience: Experience[]
  education: Education[]
  skills: {
    tech: SkillItem[]
    design: SkillItem[]
  }
}