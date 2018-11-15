<template>
    <div class="home-page">
        <h1>Home page with catalog</h1>
        <section class="product-wrapper">
            <article class="product-item" v-for="prod in products" :key="prod['.key']">
                <img :src="setImgSrc(prod)">
                <h1>{{ prod.title }}</h1>
                <h2> {{ prod.subtitle }}</h2>
                <p>{{ prod.desc }}</p>
                <span> {{ prod.price }}</span>
            </article>
        </section>
    </div>
</template>

<script>
    import { productsCollection } from "../firebaseConfig";
    import noImage from '../assets/noimage.png'
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
            setImgSrc(item) {
                return item && item.imageSrc && item.imageSrc.length > 0 ? item.imageSrc : noImage;
            }
        },
    }
</script>

<style lang="scss" scoped>
    .product-wrapper {
        flex-wrap: wrap;
        .product-item {
            width: 44%;
            padding: 30px;
            box-shadow: 0 1px 2px 0 rgba(0,0,0,.15);
            transition: all .2s ease-in-out;
            position: relative;
            overflow: hidden;
            margin: 3%;
            background: #fff;
            &:hover {
                box-shadow: 0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23);
            }
            img {
                max-width: 70%;
            }
        }
    }
</style>
