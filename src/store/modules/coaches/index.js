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
        }
    },
    actions: {
        coachRegistration(context, payload) {
            const transformedData = {
                id: context.rootGetters.getUserId,
                firstName: payload.first,
                lastName: payload.last,
                description: payload.desc,
                hourlyRate: payload.rate,
                areas: payload.areas
            }
            
            context.commit('coachRegistration', transformedData)
        }
    }
}