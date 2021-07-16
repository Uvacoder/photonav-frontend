<template>
    <div class="status" :class="{ success: success, alert: alert }" v-if="message">{{ message }}</div>
</template>

<script>
export default {
    props: {
        message: {
            type: String,
            default: ""
        },
        variant: {
            type: String,
            default: "success",
            validator: variant => ["", "success", "alert"].includes(variant)
        }
    },
    computed: {
        success() {
            return this.variant == "success";
        },
        alert() {
            return this.variant == "alert";
        }
    }
}
</script>

<style scoped>
.status {
    padding: 10px 20px;
    text-align: center;
}
.success {
    color: var(--text-success);
    background-color: var(--bg-success);
}
.alert {
    color: var(--text-alert);
    background-color: var(--bg-alert);
}
</style>
