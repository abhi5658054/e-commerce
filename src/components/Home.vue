<template>
    <div class="home-page">
        <h1>Home page with catalog</h1>
        <article v-for="prod in products" :key="prod['.key']">
            <img :src="prod.imageSrc">
            <h1>{{ prod.title }}</h1>
            <h2> {{ prod.subtitle }}</h2>
            <p>{{ prod.desc }}</p>
            <span> {{ prod.price }}</span>
        </article>
    </div>
</template>

<script>
    import { productsCollection } from "../firebaseConfig";

    export default {
        name: "home",
        data () {
            return {
                products : []
            }
        },
        firestore() {
            return {
                products: productsCollection.orderBy('createdAt')
            }
        },
        methods: {

        },
    }
</script>

<style lang="scss" scoped>

</style>
