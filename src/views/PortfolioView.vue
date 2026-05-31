<template>
  <div>
    <!-- NAVBAR -->
    <nav class="navbar">
      <h2>{{ portfolio.name }}</h2>

      <div class="nav-links">
        <div class="home-admin-wrapper">
          <a href="#home" @click="toggleAdminIcon">
            Home
          </a>

          <i
            v-if="showAdminIcon"
            class="fas fa-user-shield secret-admin-icon"
            @click="goToAdmin"
          ></i>
        </div>
        <a href="#about">About</a>
        <a href="#skills">Skills</a>
        <a href="#qualifications">Qualifications</a>
        <a href="#projects">Projects</a>
        <a href="#contact">Contact</a>
      </div>
    </nav>

    <!-- HERO -->
    <section id="home" class="hero">
      <div class="hero-container">
        <div class="hero-image-box">
          <img
            v-if="portfolio.profileImage"
            :src="portfolio.profileImage"
            class="profile-image"
            alt="Profile"
          />

          <div v-else class="profile-placeholder">
            <i class="fas fa-user"></i>
          </div>
        </div>

        <div class="hero-content">
          <p class="hello-text">Hello, I'm</p>

          <h1>{{ portfolio.name }}</h1>

          <h3>{{ portfolio.title }}</h3>

          <p class="hero-description">
            {{ portfolio.shortIntro }}
          </p>

          <div class="hero-buttons">
            <a href="#contact" class="btn">
              Contact Me
            </a>

            <a
              v-if="portfolio.cvFile"
              :href="portfolio.cvFile"
              target="_blank"
              class="btn-outline"
            >
              View CV
            </a>
          </div>

          <div class="social-icons">
            <a
              v-if="portfolio.github"
              :href="portfolio.github"
              target="_blank"
            >
              <i class="fab fa-github"></i>
            </a>

            <a
              v-if="portfolio.whatsapp"
              :href="whatsappLink"
              target="_blank"
            >
              <i class="fab fa-whatsapp"></i>
            </a>

            <a
              v-if="portfolio.email"
              :href="'mailto:' + portfolio.email"
            >
              <i class="fas fa-envelope"></i>
            </a>

            <a
              v-if="portfolio.phone"
              :href="'tel:' + portfolio.phone"
            >
              <i class="fas fa-phone"></i>
            </a>
          </div>
        </div>
      </div>
    </section>

    <!-- ABOUT -->
    <section id="about" class="section">
      <h2>About Me</h2>

      <p>{{ portfolio.about }}</p>
    </section>

    <!-- SKILLS -->
    <section id="skills" class="section gray-section">
      <h2>Skills</h2>

      <div class="content-grid">
        <div
          v-for="skill in portfolio.skills"
          :key="skill.id"
          class="content-card"
        >
          <h3>{{ skill.title }}</h3>

          <p>{{ skill.description }}</p>

          <div class="tag-list" v-if="skill.tags && skill.tags.length">
            <span
              class="tag-pill"
              v-for="(tag, tagIndex) in skill.tags"
              :key="tagIndex"
            >
              <i :class="tag.icon"></i>
              {{ tag.name }}
            </span>
          </div>
        </div>
      </div>
    </section>

    <!-- QUALIFICATIONS -->
    <section id="qualifications" class="section">
      <h2>Qualifications</h2>

      <div class="content-grid">
        <div
          v-for="qualification in portfolio.qualifications"
          :key="qualification.id"
          class="content-card"
        >
          <h3>{{ qualification.title }}</h3>

          <p>{{ qualification.description }}</p>
        </div>
      </div>
    </section>

    <!-- PROJECTS -->
    <section id="projects" class="section gray-section">
      <h2>Projects</h2>

      <div class="content-grid">
        <div
          v-for="project in portfolio.projects"
          :key="project.id"
          class="content-card"
        >
          <h3>{{ project.title }}</h3>

          <p>{{ project.description }}</p>

          <div class="tag-list" v-if="project.tags && project.tags.length">
            <span
              class="tag-pill"
              v-for="(tag, tagIndex) in project.tags"
              :key="tagIndex"
            >
              <i :class="tag.icon"></i>
              {{ tag.name }}
            </span>
          </div>
        </div>
      </div>
    </section>

    <!-- CONTACT -->
    <section id="contact" class="section contact-section">
      <div class="contact-left">
        <h2>Contact Me</h2>

        <p>
          <i class="fas fa-location-dot"></i>
          {{ portfolio.location }}
        </p>

        <p>
          <i class="fas fa-envelope"></i>
          {{ portfolio.email }}
        </p>

        <p>
          <i class="fab fa-whatsapp"></i>
          {{ portfolio.whatsapp }}
        </p>

        <p>
          <i class="fas fa-phone"></i>
          {{ portfolio.phone }}
        </p>
      </div>

      <div class="contact-right">
        <form @submit.prevent="sendEmail">
          <input
            v-model="contactForm.name"
            type="text"
            placeholder="Your Name"
            required
          />

          <input
            v-model="contactForm.email"
            type="email"
            placeholder="Your Email"
            required
          />

          <input
            v-model="contactForm.subject"
            type="text"
            placeholder="Subject"
            required
          />

          <textarea
            v-model="contactForm.message"
            placeholder="Write your message..."
            required
          ></textarea>

          <button type="submit">
            Send Message
          </button>
        </form>
      </div>
    </section>

    <footer>
      <p>
        © {{ new Date().getFullYear() }}
        {{ portfolio.name }}
      </p>
    </footer>
  </div>
</template>

<script setup>
import api from '../services/api.js'
import { ref, computed, onMounted } from 'vue'

import { useRouter } from 'vue-router'

const router = useRouter()

const showAdminIcon = ref(false)

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
  skills: [],
  qualifications: [],
  projects: [],
})

const contactForm = ref({
  name: '',
  email: '',
  subject: '',
  message: '',
})

onMounted(async () => {
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
    console.error('Failed to load portfolio:', error)
  }
})



function toggleAdminIcon() {
  showAdminIcon.value = !showAdminIcon.value
}

function goToAdmin() {
  router.push('/admin-login')
}

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

const whatsappLink = computed(() => {
  let number = portfolio.value.whatsapp || ''

  number = number.replace(/\D/g, '')

  if (number.startsWith('0')) {
    number = '255' + number.substring(1)
  }

  return `https://wa.me/${number}`
})





async function sendEmail() {
  try {
    await api.post('/contact-messages', {
      name: contactForm.value.name,
      email: contactForm.value.email,
      subject: contactForm.value.subject,
      message: contactForm.value.message,
    })

    alert('Message sent successfully')

    contactForm.value = {
      name: '',
      email: '',
      subject: '',
      message: '',
    }
  } catch (error) {
    alert('Failed to send message')
    console.error(error.response?.data || error)
  }
}
</script>