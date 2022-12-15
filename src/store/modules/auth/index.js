let timer

export default {
    state() {
        return {
            userId: null,
            token: null,
            didAutoLogout: false
        }
    },
    mutations: {
        setUser(state, payload) {
            state.userId = payload.userId
            state.token = payload.idToken
            state.didAutoLogout = false
        },
        setDidAutoLogout(state) {
            state.didAutoLogout = true
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

            const expiresIn = +responseData.expiresIn * 1000
            const tokenExpiration = new Date().getTime() + expiresIn

            localStorage.setItem('idToken', responseData.idToken)
            localStorage.setItem('userId', responseData.localId)
            localStorage.setItem('tokenExpiration', tokenExpiration)

            timer = setTimeout(() => {
                context.dispatch('HANDLE_AUTOLOGOUT_ACTION')
            }, expiresIn)

            context.commit('setUser', {
                idToken: responseData.idToken,
                userId: responseData.localId
            })
        },
        HANDLE_TRY_LOGIN_ACTION(context) {
            const idToken = localStorage.getItem('idToken')
            const userId = localStorage.getItem('userId')
            const tokenExpiration = localStorage.getItem('tokenExpiration')
            const expiresIn = +tokenExpiration - new Date().getTime()

            if(expiresIn < 0) return

            timer = setTimeout(() => {
                context.dispatch('HANDLE_AUTOLOGOUT_ACTION')
            }, expiresIn)

            context.commit('setUser', {
                idToken: idToken,
                userId: userId,
            })
        },
        HANDLE_LOGOUT_ACTION(context) {
            localStorage.removeItem('idToken')
            localStorage.removeItem('userId')
            localStorage.removeItem('tokenExpiration')

            clearTimeout(timer)

            context.commit('setUser', {
                userId: null,
                token: null
            })
        },
        HANDLE_AUTOLOGOUT_ACTION(context) {
            context.dispatch('HANDLE_LOGOUT_ACTION')
            context.commit('setDidAutoLogout')
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
        },
        getIsAutoLogout(state) {
            return state.didAutoLogout
        }
    }
}