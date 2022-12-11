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
        },
        getRequests(state, payload) {
            state.requests = payload
        }
    },
    actions: {
        async contactCoach(context, payload) {
            const coachId = payload.coachId

            const newRequest = {
                email: payload.email,
                message: payload.message
            }

            const response = await fetch(`https://coachapp-3d38d-default-rtdb.europe-west1.firebasedatabase.app/requests/${coachId}.json`, {
                method: 'POST',
                body: JSON.stringify(newRequest)
            })

            const responseData = await response.json()

            if (!response.ok) throw new Error()
            
            newRequest.id = responseData.name
            newRequest.coachId = coachId

            context.commit('contactCoach', newRequest)
        },
        async getRequests(context) {
            const coachId = context.rootGetters.getUserId
            const token = context.rootGetters.geToken
            const response = await fetch(`https://coachapp-3d38d-default-rtdb.europe-west1.firebasedatabase.app/requests/${coachId}.json?auth=${token}`)
            const responseData = await response.json()

            if (!response.ok) {
                const { error } = responseData
                throw new Error(error || 'An error occurred!')
            }

            const requests = []

            for (const key in responseData) {
                const request = {
                    id: key,
                    coachId: coachId,
                    email: responseData[key].email,
                    message: responseData[key].message
                }

                requests.push(request)
            }

            context.commit('getRequests', requests)
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