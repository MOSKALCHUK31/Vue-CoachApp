export default {
    namespaced: true,
    state() {
        return {
            coaches: [
                {
                    id: 'c1',
                    firstName: 'Maximilian',
                    lastName: 'Schwarzmüller',
                    areas: ['frontend', 'backend', 'career'],
                    description:
                    "I'm Maximilian and I've worked as a freelance web developer for years. Let me help you become a developer as well!",
                    hourlyRate: 30
                },
                {
                    id: 'c2',
                    firstName: 'Julie',
                    lastName: 'Jones',
                    areas: ['frontend', 'career'],
                    description:
                    'I am Julie and as a senior developer in a big tech company, I can help you get your first job or progress in your current role.',
                    hourlyRate: 30
                }
            ]
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
        }
    },
    mutations: {
        coachRegistration(state, payload) {
            state.coaches.push(payload)
        },
        setCoaches(state, payload) {
            state.coaches = payload
        }
    },
    actions: {
        async coachRegistration(context, payload) {
            const userId = context.rootGetters.getUserId

            const transformedData = {
                firstName: payload.first,
                lastName: payload.last,
                description: payload.desc,
                hourlyRate: payload.rate,
                areas: payload.areas
            }

            const response = await fetch(`https://coachapp-3d38d-default-rtdb.europe-west1.firebasedatabase.app/coaches/${userId}.json`, {
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
        async loadCoaches({ commit }) {
            const response = await fetch('https://coachapp-3d38d-default-rtdb.europe-west1.firebasedatabase.app/coaches.json')
            const responseData = await response.json()

            if (!response.ok) {
                // error
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
        }
    }
}