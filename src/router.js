import { createRouter, createWebHistory } from 'vue-router'

import CoachList from './pages/coaches/CoachList.vue'
import CoachDetails from './pages/coaches/CoachDetails.vue'
import CoachRegistration from './pages/coaches/CoachRegistration.vue'
import ContactCoach from './pages/requests/ContactCoach.vue'
import RequestsReceived from './pages/requests/RequestsReceived.vue'
import UserAuth from './pages/auth/UserAuth.vue'
import NotFound from './pages/NotFound.vue'

const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/', redirect: '/coaches' },
        { path: '/coaches', component: CoachList },
        // Используя динамический сегмент, мы можем получить переменную как пропсы
        // В данном случае, переходя из компонента coaches в CoachDetails, мы не передаем в coaches айдишку
        // как пропсы. Она можна быть передана с помощью роутинга. 

        // Изначально, когда не стоит параметр props: true, то айдишка не передается. 
        // Но когда мы ставить props: true, то параметр id передается в компонент с динамическим сегментом
        { path: '/coaches/:id', component: CoachDetails, props: true, children: [
                { path: 'contact', component: ContactCoach },
            ] 
        },
        { path: '/register', component: CoachRegistration },
        { path: '/requests', component: RequestsReceived },
        { path: '/auth', component: UserAuth },
        { path: '/:notFound(.*)', component: NotFound}
    ]
})

export default router