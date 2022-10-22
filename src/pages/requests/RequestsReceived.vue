<template>
    <div>
        <base-dialog 
            :show="!!error" 
            title="Opps! Something went wrong" 
            @close="handleCloseModal"
        >
            <p>{{ error }}</p>
        </base-dialog>
        <section>
            <base-card>
                <header>
                    <h2>Requests Received</h2>
                </header>
                <ul v-if="hasRequests && !isLoading">
                    <request-item
                        v-for="request in receivedRequests"
                        :key="request.id"
                        :email="request.email"
                        :message="request.message"
                    ></request-item>
                </ul>
                <base-spinner v-else-if="isLoading"></base-spinner>
                <h3 v-else>You haven't received any requests yet!</h3>
            </base-card>
        </section>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import RequestItem from '../../components/requests/RequestItem.vue'

export default {
    components: {
        RequestItem
    },
    computed: {
        ...mapGetters({
            getRequests: 'requests/getRequests',
            getHasRequests: 'requests/hasRequests'
        }),
        receivedRequests() {
            return this.getRequests
        },
        hasRequests() {
            return this.getHasRequests
        }
    },
    data() {
        return {
            isLoading: false,
            error: null
        }
    },
    methods: {
        async loadRequests() {
            this.isLoading = true
            
            try {
                await this.$store.dispatch('requests/getRequests')
            } catch (error) {
                this.error = error
            }

            this.isLoading = false
        },
        handleCloseModal() {
            this.error = null
        }
    },
    created() {
        this.loadRequests()
    }
}
</script>

<style scoped>
header {
    text-align: center;
}

ul {
    list-style: none;
    margin: 2rem auto;
    padding: 0;
    max-width: 30rem;
}

h3 {
    text-align: center;
}
</style>