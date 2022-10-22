<template>
    <div>
        <section>
            <base-card>
                <h2>{{ fullName }}</h2>
                <h3>${{ rate }}/hour</h3>
            </base-card>
        </section>
        <section>
            <base-card>
                <header>
                    <h2>Interested? Reach out now!</h2>
                    <base-button link :to="contactLink">Contact</base-button>
                </header>
                <router-view></router-view>
            </base-card>
        </section>
        <section>
            <base-card>
                <base-badge v-for="area in areas" :key="area" :type="area" :title="area">{{ area }}</base-badge>
                <p>{{ description }}</p>
            </base-card>
        </section>
    </div>
</template>


<script>
import { mapGetters } from 'vuex'

export default {
    // Здесь мы можем получить нашу айдишку.
    props: ['id'],
    computed: {
        ...mapGetters({
            coaches: 'coaches/coaches'
        }),
        fullName() {
            return this.selectedCoach.firstName + ' ' + this.selectedCoach.lastName
        },
        contactLink() {
            return '/coaches/' + this.id + '/contact'
        },
        rate() {
            return this.selectedCoach.hourlyRate
        },
        areas() {
            return this.selectedCoach.areas
        },
        description() {
            return this.selectedCoach.description
        }
    },
    data() {
        return {
            selectedCoach: null,
        }
    },
    created() {
        this.selectedCoach = this.coaches.find(el => el.id === this.id)
    }
}
</script>
