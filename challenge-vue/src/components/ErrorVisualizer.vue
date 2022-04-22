<script setup>
    import { defineProps } from "vue";
    defineProps(['error', 'errorNumber']);
</script>


<template>
    <div class="alert alert-danger mb-4 text-left" role="alert">
        <span>Error #{{ errorNumber }}</span>
        <h4 class="alert-heading">{{ error.title }}</h4>
        <p>{{ error.message }}</p>
        <hr v-if="error.subMessage"/>
        <p v-if="error.subMessage" class="mb-0">{{ error.subMessage }}</p>
    </div>
</template>


<style lang="scss" scoped>
</style>
