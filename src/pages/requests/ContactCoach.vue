<template>
    <form @submit.prevent="handleSubmit">
        <div class="form-control">
            <label for="email">Your E-Mail</label>
            <input type="email" id="email" v-model.trim="email">
        </div>
        <div class="form-control">
            <label for="message">Your message</label>
            <textarea id="message" rows="5" v-model.trim="message"></textarea>
        </div>
        <div class="actions">
            <base-button>Send message</base-button>
        </div>
        <p v-if="!isFormValid" class="errors">Email adress and message shouldn't and invalid. </p>
    </form>
</template>

<script>
    export default {
        data() {
            return {
                email: '',
                message: '',
                isFormValid: true
            }
        },
        methods: {
            handleSubmit() {
                this.isFormValid = true
                
                if (this.email === '' || !this.email.includes('@') || this.message === '') {
                    this.isFormValid = false
                    return
                }
                
            }
        }
    }
</script>


<style scoped>
form {
    margin: 1rem;
    border: 1px solid #ccc;
    border-radius: 12px;
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

.errors {
    font-weight: bold;
    color: red;
}

.actions {
    text-align: center;
}
</style>