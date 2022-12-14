<template>
    <div>
        <base-dialog 
            :show="!!error" 
            title="An error occured!"
            @close="handleCloseModal"
            >
            <p>{{ error }}</p>
        </base-dialog>
        <section>
            <coach-filter @handleChange="handleSetFilter"></coach-filter>
        </section>
        <section>
            <base-card>
                <div class="controls">
                    <base-button @click="loadCoaches" mode="outline">Refresh</base-button>
                    <base-button v-if="!isCoach && !isLoading && isLoggedIn" link to="/register" mode="flat">Register as Coach</base-button>
                    <base-button v-if="!isLoggedIn && !isLoading" link to="/auth?redirect=register">Login to register as coach</base-button>
                </div>
                <ul v-if="hasCoaches && !isLoading">
                    <coach-item 
                        v-for="coach in filteredCoaches" 
                        :key="coach.id" 
                        :id="coach.id"
                        :firstName="coach.firstName"
                        :lastName="coach.lastName"
                        :rate="coach.hourlyRate"
                        :areas="coach.areas"
                    ></coach-item>
                </ul>
                <div v-else-if="isLoading">
                    <base-spinner></base-spinner>
                </div>
                <h3 v-else>There is no coahes found</h3>
            </base-card>
        </section>
    </div>
</template>


<script>
import { mapGetters } from 'vuex'
import CoachItem from '../../components/coaches/CoachItem.vue'
import CoachFilter from '../../components/coaches/CoachFilter.vue'

export default {
    components: {
        CoachItem,
        CoachFilter
    },
    computed: {
        ...mapGetters({
            coaches: 'coaches/coaches',
            hasCoaches: 'coaches/hasCoaches',
            isCoach: 'coaches/isCoach',
            isLoggedIn: 'isAuthenticated'
        }),
        filteredCoaches() {
            const coaches =  this.coaches

            return coaches.filter(el => {
                if (this.activeFilters.frontend && el.areas.includes('frontend')) {
                    return el
                }
                if (this.activeFilters.backend && el.areas.includes('backend')) {
                    return el
                }
                if (this.activeFilters.career && el.areas.includes('career')) {
                    return el
                }
            })
        }
    },
    data() {
        return {
            activeFilters: {
                frontend: true,
                backend: true,
                career: true
            },
            isLoading: true,
            error: null
        }
    },
    methods: {
        handleSetFilter(updatedFilters) {
            this.activeFilters = updatedFilters
        },
        async loadCoaches(refresh = false) {
            this.isLoading = true
            
            try {
                await this.$store.dispatch('coaches/loadCoaches', {forceRefresh: refresh})
            } catch (error) {
                this.error = error.message || 'Something went wrong!'
            }

            this.isLoading = false
        },
        handleCloseModal() {
            this.error = null
        }
    },
    created() {
        this.loadCoaches()
    }
}
</script>

<style scoped>
ul {
    list-style: none;
    margin: 0;
    padding: 0;
}

.controls {
    display: flex;
    justify-content: space-between;
}
</style>