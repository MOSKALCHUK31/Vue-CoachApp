<template>
    <div>
        <base-dialog :show="isLoading" fixed title="Authenticating...">
            <p>Authenticating...</p>
            <base-spinner></base-spinner>
        </base-dialog>
        <base-dialog :show="!!error" title="An error occurred" @close="handleClose">
            <p>{{ this.error }}</p>
        </base-dialog>
        <base-card>
            <form @submit.prevent="handleSubmitForm">
                <div class="form-control">
                    <label for="email">Email</label>
                    <input id="email" type="email" v-model.trim="email">
                </div>
                <div class="form-control">
                    <label for="password">Password</label>
                    <input id="password" type="password" v-model.trim="password">
                </div>
                <p v-if="!isValid" class="error">Please enter a valid email and password (must be at least 6 character
                    length)</p>
                <base-button>{{ switchModeButtonCaption }}</base-button>
                <base-button mode="flat" type="button" @click="handleSwitchMode">{{ switchModeCaption }}</base-button>
            </form>
        </base-card>
    </div>
</template>

<script>
export default {
    computed: {
        switchModeCaption() {
            if (this.mode === 'signIn') return 'SignUp instead'
            else return 'SignIn instead'
        },
        switchModeButtonCaption() {
            if (this.mode === 'signIn') return 'Login'
            else return 'SignUp'
        }
    },
    data() {
        return {
            email: '',
            password: '',
            isValid: true,
            mode: 'signIn',
            isLoading: false,
            error: null
        }
    },
    methods: {
        handleSwitchMode() {
            this.mode === 'signIn' ? this.mode = 'signUp' : this.mode = 'signIn'
        },
        async handleSubmitForm() {
            this.isValid = true

            if (this.email === '' || this.password.length < 6) {
                this.isValid = false
                return
            }

            this.isLoading = true

            const payload = {
                email: this.email,
                password: this.password
            }

            try {
                if (this.mode === 'signIn') await this.$store.dispatch('HANDLE_SIGNIN_ACTION', payload)
                else await this.$store.dispatch('HANDLE_SIGNUP_ACTION', payload)

                const currentUrl = '/' + (this.$route.query.redirect || 'coaches')
                this.$router.push(currentUrl)
            } catch (err) {
                this.error = err
            }

            this.isLoading = false
        },
        handleClose() {
            this.error = null
        }
    }
}
</script>

<style scoped>
form {
    margin: 1rem;
    padding: 1rem;
}

.form-control {
    margin: 0.5rem 0;
}

label {
    font-weight: bold;
    margin-bottom: 0.5rem;
    display: block;
}

input,
textarea {
    display: block;
    width: 100%;
    font: inherit;
    border: 1px solid #ccc;
    padding: 0.15rem;
}

input:focus,
textarea:focus {
    border-color: #3d008d;
    background-color: #faf6ff;
    outline: none;
}

.error {
    color: red;
    margin: 20px 0;
}
</style>