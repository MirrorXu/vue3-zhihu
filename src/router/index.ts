import { createRouter, createWebHistory } from 'vue-router'

import routes from "./routes";
const baseUrl = process.env.BASE_URL
const history = createWebHistory(baseUrl)
const router = createRouter({
  history,
  routes
})

export default router
