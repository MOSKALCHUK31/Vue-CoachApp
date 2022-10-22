import { createStore } from 'vuex'

import coachesModule from './modules/coaches/index'
import requestsModule from './modules/requests/index'

const store = createStore({
    modules: {
        coaches: coachesModule,
        requests: requestsModule
    },
    state() {
        return {
            userId: 'c2'
        }
    },
    getters: {
        getUserId(state) {
            return state.userId
        }
    }
})

export default store