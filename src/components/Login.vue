<template>
<div class="login-page">
    <transition name="fade">
        <div v-if="performingRequest" class="loading">
            <p>Loading...</p>
        </div>
    </transition>
    <section>
        <div class="col1">
            <form @submit.prevent="onSignIn">
                <h1>Hi, admin!!! Please login</h1>

                <label for="email1">Email</label>
                <input v-model.trim="loginForm.email" type="text" placeholder="you@email.com" id="email1" />

                <label for="password1">Password</label>
                <input v-model="loginForm.password" type="password" placeholder="******" id="password1" />

                <button class="button">Log In</button>

                <div class="extras">
                    <a>Forgot Password</a>
                </div>
            </form>
            <transition name="fade">
            <div v-if="errorMsg !== ''" class="error-msg">
                <p>{{ errorMsg }}</p>
            </div>
            </transition>
        </div>
    </section>
</div>
</template>

<script>
    import {auth} from '../firebaseConfig';
    export default {
        name: "login",
        data() {
            return {
                loginForm: {
                    email: '',
                    password: ''
                },
                performingRequest: true,
                errorMsg: ''
            }
        },
        methods: {
            onSignIn() {
                auth.signInWithEmailAndPassword(this.loginForm.email, this.loginForm.password)
                    .then(user => {
                        this.$store.commit('setCurrentUser', user.user);
                        this.performingRequest = false;
                        this.$router.push('/admin');
                    })
                    .catch(err => {
                        console.log(err);
                        this.performingRequest = false;
                        this.errorMsg = err.message;
                    })
            },
        }
    }
</script>

<style scoped>

</style>
