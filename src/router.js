import { defineAsyncComponent } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'

const CoachList = defineAsyncComponent(() => import('./pages/coaches/CoachList.vue'))
const CoachDetails = defineAsyncComponent(() => import('./pages/coaches/CoachDetails.vue'))
const CoachRegistration = defineAsyncComponent(() => import('./pages/coaches/CoachRegistration.vue'))
const ContactCoach = defineAsyncComponent(() => import('./pages/requests/ContactCoach.vue'))
const RequestsReceived = defineAsyncComponent(() => import('./pages/requests/RequestsReceived.vue'))
const UserAuth = defineAsyncComponent(() => import('./pages/auth/UserAuth.vue'))
import NotFound from './pages/NotFound.vue'
import store from './store/store'

const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/', redirect: '/coaches' },
        { path: '/coaches', component: CoachList },
        { path: '/coaches/:id', component: CoachDetails, props: true, children: [
                { path: 'contact', component: ContactCoach },
            ] 
        },
        { path: '/register', component: CoachRegistration, meta: { requiresAuth: true } },
        { path: '/requests', component: RequestsReceived, meta: { requiresAuth: true } },
        { path: '/auth', component: UserAuth, meta: { requiresUnAuth: true } },
        { path: '/:notFound(.*)', component: NotFound}
    ]
})

router.beforeEach((to, from, next) => {
    if (to.meta.requiresAuth && !store.getters.isAuthenticated) {
        next('/auth')
    } else if (to.meta.requiresUnAuth && store.getters.isAuthenticated) {
        next('/coaches')
    } else {
        next()
    }
})

export default router