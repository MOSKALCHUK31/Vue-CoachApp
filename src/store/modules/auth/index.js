export default {
    state() {
        return {
            userId: null,
            expiresIn: null,
            token: null
        }
    },
    mutations: {
        setUser(state, payload) {
            state.userId = payload.userId
            state.expiresIn = payload.expiresIn
            state.token = payload.idToken
        }
    },
    actions: {
        async HANDLE_SIGNUP_ACTION(context, payload) {
            const api_base = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key='
            const api_key = 'AIzaSyDYB5sPFEt7AqmT_aL3VpAR68-0ud0spsc'

            const url = api_base + api_key
            const method = 'POST'
            const body = JSON.stringify({
                email: payload.email,
                password: payload.password,
                returnSecureToken: true
            })

            const response = await fetch(url, {
                method,
                body
            })
            const responseData = await response.json()

            if (!response.ok) {
                console.log(responseData)
                const { error: { message } } = await responseData
                const error = new Error (message || 'Failed to authenticate')
                throw error
            }

            context.commit('setUser', {
                idToken: responseData.idToken,
                expiresIn: responseData.expiresIn,
                userId: responseData.localId
            })
        },
        async HANDLE_SIGNIN_ACTION(context, payload) {
            const api_base = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key='
            const api_key = 'AIzaSyDYB5sPFEt7AqmT_aL3VpAR68-0ud0spsc'

            const url = api_base + api_key
            const method = 'POST'
            const body = JSON.stringify({
                email: payload.email,
                password: payload.password,
                returnSecureToken: true
            })

            const response = await fetch(url, {
                method,
                body
            })
            const responseData = await response.json()

            if (!response.ok) {
                console.log(responseData)
                const { error: { message } } = await responseData
                const error = new Error (message || 'Failed to authenticate')
                throw error
            }

            context.commit('setUser', {
                idToken: responseData.idToken,
                expiresIn: responseData.expiresIn,
                userId: responseData.localId
            })
        },
        HANDLE_LOGOUT_ACTION(context) {
            context.commit('setUser', {
                userId: null,
                expiresIn: null,
                tokenId: null
            })
        }
    },
    getters: {
        getUserId(state) {
            return state.userId
        },
        geToken(state) {
            return state.token
        },
        isAuthenticated(state) {
            return !!state.token
        }
    }
}