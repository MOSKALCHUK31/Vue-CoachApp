export default {
    namespaced: true,
    state() {
        return {
            requests: []
        }
    },
    mutations: {
        contactCoach(state, payload) {
            state.requests.push(payload)
        }
    },
    actions: {
        contactCoach(_, payload) {
            const newRequest = {
                id: new Date().toISOString(),
                coachId: payload.coachId,
                email: payload.email,
                message: payload.message
            }

            this.commit('requests/contactCoach', newRequest)
        }
    },
    getters: {
        getRequests(state, _getters, _rootState, rootGetters) {
            const coachId = rootGetters.getUserId
            return state.requests.filter(el => el.coachId === coachId)
        },
        hasRequests(_state, getters) {
            return getters.getRequests && getters.getRequests.length > 0
        }
    }
}