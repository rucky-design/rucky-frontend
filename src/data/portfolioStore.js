import axios from 'axios'

const API_URL = 'http://127.0.0.1:8000/api'

/*
|--------------------------------------------------------------------------
| GET PORTFOLIO
|--------------------------------------------------------------------------
*/

export async function getPortfolioData() {
  try {
    const response = await axios.get(`${API_URL}/portfolio`)

    return response.data
  } catch (error) {
    console.error('Failed to fetch portfolio:', error)

    return {
      name: '',
      title: '',
      shortIntro: '',
      about: '',
      location: '',
      email: '',
      phone: '',
      whatsapp: '',
      github: '',
      profileImage: '',
      cvFile: '',
      cvFileName: '',
      skills: [],
      qualifications: [],
      projects: [],
    }
  }
}

/*
|--------------------------------------------------------------------------
| BASIC INFO
|--------------------------------------------------------------------------
*/

export async function saveBasicInfo(data) {
  return axios.put(`${API_URL}/portfolio/basic`, data)
}

/*
|--------------------------------------------------------------------------
| MEDIA
|--------------------------------------------------------------------------
*/

export async function saveMedia(data) {
  return axios.put(`${API_URL}/portfolio/media`, data)
}

/*
|--------------------------------------------------------------------------
| SKILLS
|--------------------------------------------------------------------------
*/

export async function saveSkills(skills) {
  return axios.put(`${API_URL}/portfolio/skills`, {
    skills,
  })
}

/*
|--------------------------------------------------------------------------
| QUALIFICATIONS
|--------------------------------------------------------------------------
*/

export async function saveQualifications(qualifications) {
  return axios.put(`${API_URL}/portfolio/qualifications`, {
    qualifications,
  })
}

/*
|--------------------------------------------------------------------------
| PROJECTS
|--------------------------------------------------------------------------
*/

export async function saveProjects(projects) {
  return axios.put(`${API_URL}/portfolio/projects`, {
    projects,
  })
}

/*
|--------------------------------------------------------------------------
| DELETE SKILL
|--------------------------------------------------------------------------
*/

export async function deleteSkill(id) {
  return axios.delete(`${API_URL}/portfolio/skills/${id}`)
}

/*
|--------------------------------------------------------------------------
| DELETE QUALIFICATION
|--------------------------------------------------------------------------
*/

export async function deleteQualification(id) {
  return axios.delete(`${API_URL}/portfolio/qualifications/${id}`)
}

/*
|--------------------------------------------------------------------------
| DELETE PROJECT
|--------------------------------------------------------------------------
*/

export async function deleteProject(id) {
  return axios.delete(`${API_URL}/portfolio/projects/${id}`)
}