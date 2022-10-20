<template>
    <section>
        <base-card>
            <header>
                <h2>Requests Received</h2>
            </header>
            <ul v-if="hasRequiests">
                <request-item
                    v-for="request in receivedRequests"
                    :key="request.id"
                    :email="request.email"
                    :message="request.message"
                ></request-item>
            </ul>
            <h3 v-else>You haven't received any requests yet!</h3>
        </base-card>
    </section>
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
        hasRequiests() {
            return this.getHasRequests
        }
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