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
    }
}