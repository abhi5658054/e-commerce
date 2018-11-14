<template>
<div class="admin-page">
    <h1>Welcome to the admin panel</h1>
    <br>
    <router-link :to="{ path: 'create-new-product'}">Add new product</router-link>
    <router-link :to="{ path: '/'}">Home</router-link>
</div>
</template>

<script>
    export default {
        name: "admin"
    }
</script>

<style scoped>

</style>
