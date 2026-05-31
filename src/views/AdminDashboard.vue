<template>
  <div class="admin-dashboard">
    <div class="admin-header">
      <div>
        <h1>Admin Dashboard</h1>
        <p>Update each portfolio section separately.</p>
      </div>

      <div class="admin-actions">
        <RouterLink to="/" class="preview-btn">
          <i class="fas fa-eye"></i>
          View Portfolio
        </RouterLink>

        <button @click="logout" class="logout-btn">
          <i class="fas fa-right-from-bracket"></i>
          Logout
        </button>
      </div>
    </div>

    <div v-if="loading" class="loading-box">
      Loading portfolio data...
    </div>

    <div v-else class="admin-form">
      <!-- PROFILE PHOTO AND CV -->
      <section class="admin-section">
        <h2>Profile Photo and CV</h2>

        <div class="upload-grid">
          <div class="upload-card">
            <h3>Profile Photo</h3>

            <div class="preview-image-box">
              <img
                v-if="portfolio.profileImage"
                :src="portfolio.profileImage"
                alt="Profile preview"
              />

              <div v-else class="empty-preview">
                <i class="fas fa-user"></i>
              </div>
            </div>

            <input
              type="file"
              accept="image/*"
              @change="handleProfileImageUpload"
            />

            <button
              v-if="portfolio.profileImage"
              type="button"
              class="danger-small"
              @click="removeProfileImage"
            >
              Remove Photo
            </button>
          </div>

          <div class="upload-card">
            <h3>CV Upload</h3>

            <div class="cv-box">
              <i class="fas fa-file-pdf"></i>

              <p v-if="portfolio.cvFileName">
                {{ portfolio.cvFileName }}
              </p>

              <p v-else>No CV uploaded</p>
            </div>

            <input
              type="file"
              accept=".pdf,.doc,.docx"
              @change="handleCvUpload"
            />

            <div class="cv-actions" v-if="portfolio.cvFile">
              <a :href="portfolio.cvFile" target="_blank">View CV</a>

              <a
                :href="portfolio.cvFile"
                :download="portfolio.cvFileName || 'My-CV.pdf'"
              >
                Download CV
              </a>

              <button type="button" class="danger-small" @click="removeCv">
                Remove CV
              </button>
            </div>
          </div>
        </div>

        <button type="button" class="section-save-btn" @click="saveMediaSection">
          <i class="fas fa-save"></i>
          Save Photo and CV
        </button>
      </section>

      <!-- BASIC INFO -->
      <section class="admin-section">
        <h2>Basic Information</h2>

        <label>Name</label>
        <input type="text" v-model="portfolio.name" />

        <label>Title</label>
        <input type="text" v-model="portfolio.title" />

        <label>Short Intro</label>
        <textarea v-model="portfolio.shortIntro"></textarea>

        <label>About Me</label>
        <textarea v-model="portfolio.about"></textarea>

        <label>Location</label>
        <input type="text" v-model="portfolio.location" />

        <label>Email</label>
        <input type="email" v-model="portfolio.email" />

        <label>Phone</label>
        <input type="text" v-model="portfolio.phone" />

        <label>WhatsApp</label>
        <input type="text" v-model="portfolio.whatsapp" />

        <label>GitHub Link</label>
        <input type="text" v-model="portfolio.github" />

        <button type="button" class="section-save-btn" @click="saveBasicSection">
          <i class="fas fa-save"></i>
          Save Basic Information
        </button>
      </section>

      <!-- SKILLS -->
      <section class="admin-section">
        <h2>Skills</h2>

        <p class="help-text">
          Add skill heading, description, and multiple icon tags.
        </p>

        <div
          class="admin-content-card"
          v-for="(skill, index) in portfolio.skills"
          :key="index"
        >
          <label>Skill Heading</label>
          <input type="text" v-model="skill.title" />

          <label>Skill Description</label>
          <textarea v-model="skill.description"></textarea>

          <h4>Skill Tags</h4>

          <div
            class="tag-admin-row"
            v-for="(tag, tagIndex) in skill.tags"
            :key="tagIndex"
          >
            <input
              type="text"
              v-model="tag.name"
              placeholder="Tag name e.g. Vue.js"
            />

            <input
              type="text"
              v-model="tag.icon"
              placeholder="Icon class e.g. fab fa-vuejs"
            />

            <div class="tag-preview">
              <i :class="tag.icon"></i>
              <span>{{ tag.name }}</span>
            </div>

            <button
              type="button"
              class="remove-btn"
              @click="removeTag(skill, tagIndex)"
            >
              Remove Tag
            </button>
          </div>

          <button type="button" class="small-add-btn" @click="addTag(skill)">
            <i class="fas fa-plus"></i>
            Add Tag
          </button>

          <button
            type="button"
            class="remove-main-btn"
            @click="removeSkill(index)"
          >
            Remove Skill
          </button>
        </div>

        <button type="button" class="add-btn" @click="addSkill">
          <i class="fas fa-plus"></i>
          Add Skill
        </button>

        <button type="button" class="section-save-btn" @click="saveSkillsSection">
          <i class="fas fa-save"></i>
          Save Skills Only
        </button>
      </section>

      <!-- QUALIFICATIONS -->
      <section class="admin-section">
        <h2>Qualifications</h2>

        <p class="help-text">
          Add only heading and description.
        </p>

        <div
          class="admin-content-card"
          v-for="(qualification, index) in portfolio.qualifications"
          :key="index"
        >
          <label>Qualification Heading</label>
          <input type="text" v-model="qualification.title" />

          <label>Qualification Description</label>
          <textarea v-model="qualification.description"></textarea>

          <button
            type="button"
            class="remove-main-btn"
            @click="removeQualification(index)"
          >
            Remove Qualification
          </button>
        </div>

        <button type="button" class="add-btn" @click="addQualification">
          <i class="fas fa-plus"></i>
          Add Qualification
        </button>

        <button
          type="button"
          class="section-save-btn"
          @click="saveQualificationsSection"
        >
          <i class="fas fa-save"></i>
          Save Qualifications Only
        </button>
      </section>

      <!-- PROJECTS -->
      <section class="admin-section">
        <h2>Projects</h2>

        <p class="help-text">
          Add project heading, description, and multiple icon tags.
        </p>

        <div
          class="admin-content-card"
          v-for="(project, index) in portfolio.projects"
          :key="index"
        >
          <label>Project Heading</label>
          <input type="text" v-model="project.title" />

          <label>Project Description</label>
          <textarea v-model="project.description"></textarea>

          <h4>Project Tags</h4>

          <div
            class="tag-admin-row"
            v-for="(tag, tagIndex) in project.tags"
            :key="tagIndex"
          >
            <input
              type="text"
              v-model="tag.name"
              placeholder="Tag name e.g. Laravel"
            />

            <input
              type="text"
              v-model="tag.icon"
              placeholder="Icon class e.g. fab fa-laravel"
            />

            <div class="tag-preview">
              <i :class="tag.icon"></i>
              <span>{{ tag.name }}</span>
            </div>

            <button
              type="button"
              class="remove-btn"
              @click="removeTag(project, tagIndex)"
            >
              Remove Tag
            </button>
          </div>

          <button type="button" class="small-add-btn" @click="addTag(project)">
            <i class="fas fa-plus"></i>
            Add Tag
          </button>

          <button
            type="button"
            class="remove-main-btn"
            @click="removeProject(index)"
          >
            Remove Project
          </button>
        </div>

        <button type="button" class="add-btn" @click="addProject">
          <i class="fas fa-plus"></i>
          Add Project
        </button>

        <button
          type="button"
          class="section-save-btn"
          @click="saveProjectsSection"
        >
          <i class="fas fa-save"></i>
          Save Projects Only
        </button>
      </section>


      <!-- CONTACT MESSAGES -->
      <section class="admin-section">
        <h2>Messages Inbox</h2>

        <p class="help-text">
          View messages sent from the contact form.
        </p>

        <button type="button" class="add-btn" @click="fetchMessages">
          <i class="fas fa-rotate"></i>
          Refresh Messages
        </button>

        <div v-if="messages.length === 0" class="empty-inbox">
          No messages yet.
        </div>

        <div v-else class="inbox-layout">
          <!-- LEFT MESSAGE LIST -->
          <div class="message-list">
            <div
              class="message-item"
              v-for="message in messages"
              :key="message.id"
              :class="{ unread: !message.is_read, active: selectedMessage?.id === message.id }"
              @click="openMessage(message)"
            >
              <div class="message-top">
                <strong>{{ message.name }}</strong>
                <small>{{ formatDate(message.created_at) }}</small>
              </div>

              <h4>{{ message.subject || 'No Subject' }}</h4>

              <p>
                {{ message.message }}
              </p>
            </div>
          </div>

          <!-- RIGHT MESSAGE DETAIL -->
          <div class="message-detail" v-if="selectedMessage">
            <div class="message-detail-header">
              <div>
                <h3>{{ selectedMessage.subject || 'No Subject' }}</h3>

                <p>
                  From:
                  <strong>{{ selectedMessage.name }}</strong>
                  &lt;{{ selectedMessage.email }}&gt;
                </p>

                <small>{{ formatDate(selectedMessage.created_at) }}</small>
              </div>

              <button
                type="button"
                class="remove-main-btn"
                @click="deleteMessage(selectedMessage.id)"
              >
                Delete
              </button>
            </div>

            <div class="message-body">
              {{ selectedMessage.message }}
            </div>
            <div class="reply-box">
              <h3>Reply</h3>

              <label>Subject</label>
              <input
                type="text"
                v-model="replyForm.subject"
              />

              <label>Reply Message</label>
              <textarea
                v-model="replyForm.reply_message"
                placeholder="Write your reply..."
              ></textarea>

              <button
                type="button"
                class="section-save-btn"
                @click="sendReply"
                :disabled="sendingReply"
              >
                {{ sendingReply ? 'Sending...' : 'Send Reply' }}
              </button>
            </div>

            <div
              class="reply-history"
              v-if="selectedMessage.replies && selectedMessage.replies.length"
            >
              <h3>Reply History</h3>

              <div
                class="reply-history-card"
                v-for="reply in selectedMessage.replies"
                :key="reply.id"
              >
                <strong>{{ reply.subject }}</strong>
                <p>{{ reply.reply_message }}</p>
              </div>
            </div>
          </div>

          <div class="message-detail empty-detail" v-else>
            Select a message to read.
          </div>
        </div>
      </section>

      <p class="success" v-if="successMessage">
        {{ successMessage }}
      </p>

      <p class="error" v-if="errorMessage">
        {{ errorMessage }}
      </p>
    </div>
  </div>
</template>

<script setup>
import api from '../services/api.js'
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const loading = ref(false)
const successMessage = ref('')
const errorMessage = ref('')
const messages = ref([])
const selectedMessage = ref(null)
const replyForm = ref({
  subject: '',
  reply_message: '',
})

const sendingReply = ref(false)

const portfolio = ref({
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
})

function normalizeItemsWithTags(items) {
  if (!Array.isArray(items)) return []

  return items.map((item) => ({
    ...item,
    title: item.title || '',
    description: item.description || '',
    tags: Array.isArray(item.tags) ? item.tags : [],
  }))
}

function normalizeSimpleItems(items) {
  if (!Array.isArray(items)) return []

  return items.map((item) => ({
    ...item,
    title: item.title || '',
    description: item.description || '',
  }))
}

async function fetchPortfolioData() {
  loading.value = true

  try {
    const response = await api.get('/portfolio')

    portfolio.value = {
      ...portfolio.value,
      ...response.data,
      skills: normalizeItemsWithTags(response.data.skills),
      qualifications: normalizeSimpleItems(response.data.qualifications),
      projects: normalizeItemsWithTags(response.data.projects),
    }
  } catch (error) {
    showError('Failed to load portfolio data.')
  } finally {
    loading.value = false
  }
}

function showSuccess(message) {
  successMessage.value = message
  errorMessage.value = ''

  setTimeout(() => {
    successMessage.value = ''
  }, 3000)
}

function showError(message) {
  errorMessage.value = message
  successMessage.value = ''

  setTimeout(() => {
    errorMessage.value = ''
  }, 4000)
}

async function saveMediaSection() {
  try {
    await api.put('/portfolio/media', {
      profileImage: portfolio.value.profileImage,
      cvFile: portfolio.value.cvFile,
      cvFileName: portfolio.value.cvFileName,
    })

    showSuccess('Photo and CV updated successfully.')
  } catch (error) {
    showError('Failed to update Photo and CV.')
  }
}

async function saveBasicSection() {
  try {
    await api.put('/portfolio/basic', {
      name: portfolio.value.name,
      title: portfolio.value.title,
      shortIntro: portfolio.value.shortIntro,
      about: portfolio.value.about,
      location: portfolio.value.location,
      email: portfolio.value.email,
      phone: portfolio.value.phone,
      whatsapp: portfolio.value.whatsapp,
      github: portfolio.value.github,
    })

    showSuccess('Basic information updated successfully.')
  } catch (error) {
    showError('Failed to update basic information.')
  }
}

async function saveSkillsSection() {
  try {
    const cleanedSkills = portfolio.value.skills
      .filter((skill) => skill.title || skill.description || skill.tags?.length)
      .map((skill) => ({
        title: skill.title || '',
        description: skill.description || '',
        tags: Array.isArray(skill.tags)
          ? skill.tags.filter((tag) => tag.name || tag.icon)
          : [],
      }))

    await api.put('/portfolio/skills', {
      skills: cleanedSkills,
    })

    portfolio.value.skills = cleanedSkills
    showSuccess('Skills updated successfully.')
  } catch (error) {
    showError('Failed to update skills.')
  }
}

async function saveQualificationsSection() {
  try {
    const cleanedQualifications = portfolio.value.qualifications
      .filter((qualification) => qualification.title || qualification.description)
      .map((qualification) => ({
        title: qualification.title || '',
        description: qualification.description || '',
      }))

    await api.put('/portfolio/qualifications', {
      qualifications: cleanedQualifications,
    })

    portfolio.value.qualifications = cleanedQualifications
    showSuccess('Qualifications updated successfully.')
  } catch (error) {
    showError('Failed to update qualifications.')
  }
}

async function saveProjectsSection() {
  try {
    const cleanedProjects = portfolio.value.projects
      .filter((project) => {
        return project.title || project.description || project.tags?.length
      })
      .map((project) => ({
        title: project.title || '',
        description: project.description || '',
        tags: Array.isArray(project.tags)
          ? project.tags.filter((tag) => tag.name || tag.icon)
          : [],
      }))

    const response = await api.put('/portfolio/projects', {
      projects: cleanedProjects,
    })

    portfolio.value.projects = normalizeItemsWithTags(response.data.projects)

    showSuccess('Projects updated successfully.')
  } catch (error) {
    console.log('PROJECT ERROR FULL:', error)
    console.log('PROJECT ERROR STATUS:', error.response?.status)
    console.log('PROJECT ERROR DATA:', error.response?.data)

    showError('Failed to update projects.')
  }
}

function handleProfileImageUpload(event) {
  const file = event.target.files[0]

  if (!file) return

  const reader = new FileReader()

  reader.onload = () => {
    portfolio.value.profileImage = reader.result
  }

  reader.readAsDataURL(file)
}

function removeProfileImage() {
  portfolio.value.profileImage = ''
}

function handleCvUpload(event) {
  const file = event.target.files[0]

  if (!file) return

  const reader = new FileReader()

  reader.onload = () => {
    portfolio.value.cvFile = reader.result
    portfolio.value.cvFileName = file.name
  }

  reader.readAsDataURL(file)
}

function removeCv() {
  portfolio.value.cvFile = ''
  portfolio.value.cvFileName = ''
}

function addSkill() {
  portfolio.value.skills.push({
    title: '',
    description: '',
    tags: [],
  })
}

function removeSkill(index) {
  portfolio.value.skills.splice(index, 1)
}

function addQualification() {
  portfolio.value.qualifications.push({
    title: '',
    description: '',
  })
}

function removeQualification(index) {
  portfolio.value.qualifications.splice(index, 1)
}

function addProject() {
  portfolio.value.projects.push({
    title: '',
    description: '',
    tags: [],
  })
}

function removeProject(index) {
  portfolio.value.projects.splice(index, 1)
}

function addTag(item) {
  if (!Array.isArray(item.tags)) {
    item.tags = []
  }

  item.tags.push({
    name: '',
    icon: 'fas fa-code',
  })
}

function removeTag(item, tagIndex) {
  item.tags.splice(tagIndex, 1)
}

function logout() {
  localStorage.removeItem('token')
  localStorage.removeItem('user')

  router.push('/admin-login')
}

async function fetchMessages() {
  try {
    const response = await api.get('/contact-messages')
    messages.value = response.data
  } catch (error) {
    showError('Failed to load messages.')
  }
}



async function deleteMessage(id) {
  const confirmDelete = confirm('Delete this message?')

  if (!confirmDelete) return

  try {
    await api.delete(`/contact-messages/${id}`)

    messages.value = messages.value.filter((message) => message.id !== id)
    selectedMessage.value = null

    showSuccess('Message deleted successfully.')
  } catch (error) {
    showError('Failed to delete message.')
  }
}

function formatDate(date) {
  if (!date) return ''

  return new Date(date).toLocaleString()
}


async function openMessage(message) {
  try {
    const response = await api.get(`/contact-messages/${message.id}`)

    selectedMessage.value = response.data

    replyForm.value = {
      subject: `Re: ${response.data.subject || 'Portfolio Message'}`,
      reply_message: `Hello ${response.data.name},

Thank you for contacting me.

`,
    }

    const index = messages.value.findIndex((item) => item.id === message.id)

    if (index !== -1) {
      messages.value[index].is_read = true
    }
  } catch (error) {
    showError('Failed to open message.')
  }
}

async function sendReply() {
  if (!selectedMessage.value) return

  sendingReply.value = true

  try {
    const response = await api.post(
      `/contact-messages/${selectedMessage.value.id}/reply`,
      {
        subject: replyForm.value.subject,
        reply_message: replyForm.value.reply_message,
      }
    )

    if (!selectedMessage.value.replies) {
      selectedMessage.value.replies = []
    }

    selectedMessage.value.replies.push(response.data.reply)

    replyForm.value.reply_message = ''

    showSuccess('Reply sent successfully.')
  } catch (error) {
    console.error(error.response?.data || error)
    showError('Failed to send reply.')
  } finally {
    sendingReply.value = false
  }
}

onMounted(() => {
  fetchPortfolioData()
  fetchMessages()
})
</script>