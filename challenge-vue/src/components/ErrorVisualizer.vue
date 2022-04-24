<script setup>
    import { defineProps } from "vue";

    // use props instead of fetching the error store since the 
    // parent component (App.vue) already has the relevant error data
    const props = defineProps(['error', 'errorNumber']);

    // define default error styling
    let _type = "Error";
    let _class = "alert-danger";

    // change styling if error is in reality a warning
    if(props.error.type && props.error.type == "Warning") {
        _type = "Warning";
        _class = "alert-warning";
    }
</script>


<template>
    <div class="alert mb-4 text-left" :class=_class role="alert">
        <span>INTERRUPTION #{{ errorNumber }} - {{ _type }}</span>
        <h4 class="alert-heading">{{ error.title }}</h4>
        <p>{{ error.message }}</p>
        <hr v-if="error.subMessage"/>
        <p v-if="error.subMessage" class="mb-0">{{ error.subMessage }}</p>
    </div>
</template>


<style lang="scss" scoped>
</style>
