import Vue from 'vue'
import VueRouter from 'vue-router'
import Notes from '../components/Notes'
// import Note from '../components/Note'


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Notes',
    component: Notes
  },
  {
    path: '/note/:id',
    name: 'Note',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: Notes
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
