<template>
    <base-card>
        <h2>Register as Coach now!</h2>
        <coach-form @save-data="onRegister"></coach-form>
    </base-card>
</template>

<script>
import CoachForm from '../../components/coaches/CoachForm.vue';

export default {
    components: {
        CoachForm
    },
    methods: {
        onRegister(data) {
            this.$store.dispatch('coaches/coachRegistration', data)
            this.$router.push('/coaches')
        }
    }
}
</script>