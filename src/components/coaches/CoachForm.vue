<template>
    <form @submit.prevent="handleSubmit">
        <div class="form-control" :class="{invalid: !firstName.isValid}">
            <label for="firstname">Firstname</label>
            <input type="text" id="firstname" v-model.trim="firstName.value" @blur="clearValidity('firstName')">
            <p v-if="!firstName.isValid">Enter your first name</p>
        </div>
        <div class="form-control" :class="{invalid: !lastName.isValid}">
            <label for="lastname">Lastname</label>
            <input type="text" id="lastname" v-model.trim="lastName.value" @blur="clearValidity('lastName')">
            <p v-if="!lastName.isValid">Enter your last name</p>
        </div>
        <div class="form-control" :class="{invalid: !description.isValid}">
            <label for="description">Description</label>
            <textarea id="description" rows="5" v-model.trim="description.value" @blur="clearValidity('description')"></textarea>
            <p v-if="!description.isValid">Enter your description</p>
        </div>
        <div class="form-control" :class="{invalid: !hourlyRate.isValid}">
            <label for="rate">Hourly rate</label>
            <input type="number" id="rate" v-model.number="hourlyRate.value" @blur="clearValidity('hourlyRate')">
            <p v-if="!hourlyRate.isValid">Enter your rate</p>
        </div>
        <div class="form-control" :class="{invalid: !areas.isValid}">
            <h3>Areas of Expertise</h3>
            <div>
                <input type="checkbox" id="frontend" value="frontend" v-model="areas.value" @blur="clearValidity('areas')">
                <label for="frontend">Frontend</label>
            </div>
              <div>
                <input type="checkbox" id="backend" value="backed" v-model="areas.value" @blur="clearValidity('areas')">
                <label for="backend">Backend</label>
            </div>
              <div>
                <input type="checkbox" id="career" value="career" v-model="areas.value" @blur="clearValidity('areas')">
                <label for="career">Career</label>
            </div>
            <p v-if="!areas.isValid">Choose at lease 1 area of Expertise</p>
        </div>
        <p v-if="!isFormValid">Please check all of the fields and input a correct data.</p>
        <base-button>Submit</base-button>
    </form>
</template>

<script>
export default {
    emits: ['save-data'],
    data() {
        return {
            firstName: {
                value: '',
                isValid: true,
            },
            lastName: {
                value: '',
                isValid: true,
            },
            description: {
                value: '',
                isValid: true,
            },
            hourlyRate: {
                value: null,
                isValid: true,
            },
            areas: {
                value: [],
                isValid: true,
            },
            isFormValid: true
        }
    },
    methods: {
        formValidation() {
            this.isFormValid = true

            if (this.firstName.value === '') {
                this.firstName.isValid = false
                this.isFormValid = false
            }
            if (this.lastName.value === '') {
                this.lastName.isValid = false
                this.isFormValid = false
            }
            if (this.description.value === '') {
                this.description.isValid = false
                this.isFormValid = false
            }
            if (this.hourlyRate.value === null || this.hourlyRate.value < 0) {
                this.hourlyRate.isValid = false
                this.isFormValid = false
            }
            if (this.areas.value.length === 0) {
                this.areas.isValid = false
                this.isFormValid = false
            }

        },
        clearValidity(input) {
            this[input].isValid = true
        },
        handleSubmit() {
            this.formValidation()

            if (!this.isFormValid) return

            const dataSet = {
                first: this.firstName.value,
                last: this.lastName.value,
                desc: this.description.value,
                rate: this.hourlyRate.value,
                areas: this.areas.value
            }

            this.$emit('save-data', dataSet)
        }
    }
}
</script>

<style scoped>
.form-control {
    margin: 0.5rem 0;
}

label {
    font-weight: bold;
    display: block;
    margin-bottom: 0.5rem;
}

input[type='checkbox'] + label {
    font-weight: normal;
    display: inline;
    margin: 0 0 0 0.5rem;
}

input,
textarea {
    display: block;
    width: 100%;
    border: 1px solid #ccc;
    font: inherit;
}

input:focus,
textarea:focus {
    background-color: #f0e6fd;
    outline: none;
    border-color: #3d008d;
}

input[type='checkbox'] {
    display: inline;
    width: auto;
    border: none;
}

input[type='checkbox']:focus {
    outline: #3d008d solid 1px;
}

h3 {
    margin: 0.5rem 0;
    font-size: 1rem;
}

.invalid label {
    color: red;
}

.invalid input,
.invalid textarea {
    border: 1px solid red;
}

p {
    color: red;
}
</style>