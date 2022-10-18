<template>
    <base-card>
        <h2>Find Your Coach</h2>
        <span class="filter-option">
            <input type="checkbox" id="frontend" checked @change="handleChange">
            <label for="frontend">Frontend</label>
        </span>
        <span class="filter-option">
            <input type="checkbox" id="backend" checked @change="handleChange">
            <label for="backend">Backend</label>
        </span>
        <span class="filter-option">
            <input type="checkbox" id="career" checked @change="handleChange">
            <label for="career">Career</label>
        </span>
    </base-card>
</template>

<script>
export default {
    emits: ['handleChange'],
    data() {
        return {
            filter: {
                frontend: true,
                backend: true,
                career: true
            }
        }
    },
    methods: {
        handleChange(event) {
            const target = event.target.id
            const isActive = event.target.checked
            
            const updatedFilter = {
                ...this.filter,
                [target]: isActive
            }

            this.filter = updatedFilter

            this.$emit('handleChange', updatedFilter)
        }
    }
}
</script>

<style scoped>
h2 {
    margin: 0.5rem 0;
}

.filter-option {
    margin-right: 1rem;
}

.filter-option label,
.filter-option input {
    vertical-align: middle;
}

.filter-option label {
    margin-left: 0.25rem;
}

.filter-option.active label {
    font-weight: bold;
}
</style>