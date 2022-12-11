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
            return await context.dispatch('HANDLE_AUTH_ACTION', {
                ...payload,
                mode: 'signup'
            })
        },
        async HANDLE_SIGNIN_ACTION(context, payload) {
            return await context.dispatch('HANDLE_AUTH_ACTION', {
                ...payload,
                mode: 'signIn'
            })
        },
        async HANDLE_AUTH_ACTION(context, payload) {
            const mode = payload.mode
            const url = mode === 'signIn'
                ? 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDYB5sPFEt7AqmT_aL3VpAR68-0ud0spsc'
                : 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDYB5sPFEt7AqmT_aL3VpAR68-0ud0spsc'
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
                const { error: { message } } = await responseData
                const error = new Error (message || 'Failed to authenticate')
                throw error
            }

            localStorage.setItem('idToken', responseData.idToken)
            localStorage.setItem('userId', responseData.localId)
            localStorage.setItem('expiresIn', responseData.expiresIn)

            context.commit('setUser', {
                idToken: responseData.idToken,
                expiresIn: responseData.expiresIn,
                userId: responseData.localId
            })
        },
        HANDLE_TRY_LOGIN_ACTION(context) {
            const idToken = localStorage.getItem('idToken')
            const userId = localStorage.getItem('userId')
            const expiresIn = localStorage.getItem('expiresIn')

            context.commit('setUser', {
                idToken: idToken,
                userId: userId,
                expiresIn: expiresIn
            })
        },
        HANDLE_LOGOUT_ACTION(context) {
            context.commit('setUser', {
                userId: null,
                expiresIn: null,
                token: null
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