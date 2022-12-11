export default {
    namespaced: true,
    state() {
        return {
            lastFetch: null,
            coaches: []
        }
    },
    getters: {
        coaches(state) {
            return state.coaches
        },
        hasCoaches(state) {
            return state.coaches && state.coaches.length > 0
        },
        isCoach(_, getters, _3, rootGetters) {
            const coaches = getters.coaches
            const userId = rootGetters.getUserId

            return coaches.some(el => el.id === userId)
        },
        shouldUpdate(state) {
            if(!state.lastFetch) return true

            const currentTimestamp = new Date().getTime()

            return (currentTimestamp - state.lastFetch) / 1000 > 60
        }
    },
    mutations: {
        coachRegistration(state, payload) {
            state.coaches.push(payload)
        },
        setCoaches(state, payload) {
            state.coaches = payload
        },
        setTimestamp(state) {
            state.lastFetch = new Date().getTime()
        }
    },
    actions: {
        async coachRegistration(context, payload) {
            const userId = context.rootGetters.getUserId
            const token = context.rootGetters.geToken
            const transformedData = {
                firstName: payload.first,
                lastName: payload.last,
                description: payload.desc,
                hourlyRate: payload.rate,
                areas: payload.areas
            }

            const response = await fetch(`https://coachapp-3d38d-default-rtdb.europe-west1.firebasedatabase.app/coaches/${userId}.json?auth=${token}`, {
                method: 'PUT',
                body: JSON.stringify(transformedData)
            })

            if (!response.ok) {
                console.log('error')
            }
            
            context.commit('coachRegistration', {
                ...transformedData,
                id: userId
            })
        },
        async loadCoaches({ commit, getters }, payload) {
            if(!payload.forceRefresh && !getters.shouldUpdate) return

            const response = await fetch('https://coachapp-3d38d-default-rtdb.europe-west1.firebasedatabase.app/coaches.json')
            const responseData = await response.json()

            if (!response.ok) {
                throw new Error()
            }

            const coaches = []

            for (const key in responseData) {
                const coach = {
                    id: key,
                    firstName: responseData[key].firstName,
                    lastName: responseData[key].lastName,
                    areas: responseData[key].areas,
                    hourlyRate: responseData[key].hourlyRate,
                    description: responseData[key].description
                }

                coaches.push(coach)
            }

            commit('setCoaches', coaches)
            commit('setTimestamp')
        }
    }
}