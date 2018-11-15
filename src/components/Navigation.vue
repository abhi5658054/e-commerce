<template>
    <header>
        <section>
            <div class="col1">
                <router-link to="/"><h3>LOGO</h3></router-link>
                <ul class="inline">
                    <li><router-link to="/">Dashboard</router-link></li>
                    <li><router-link to="/admin">Add new project</router-link></li>
                    <li><a @click="onSignOut">Sign out</a></li>
                </ul>
            </div>
        </section>
    </header>
</template>

<script>
    //import {auth} from '../firebaseConfig.js'
    export default {
        name: "navigation",
        methods: {
            onSignOut() {
                // auth.signOut().then(() => {
                //     this.$store.dispatch('clearData');
                //     this.$router.push('/login')
                // }).catch(err => {
                //     console.log(err)
                // })
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>
