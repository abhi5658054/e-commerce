<template>
    <div class="create-page">
        <form @submit.prevent="addNewProduct" id="newProductForm">
            <div class="form-body">
                <p>
                    <label for="product-title">Product`s title</label>
                    <input type="text" id="product-title" v-model.trim="newProduct.title" placeholder="Add a title here">
                </p>
                <p>
                    <label for="product-subtitle">Product`s subtitle</label>
                    <input type="text" id="product-subtitle" v-model.trim="newProduct.subtitle" placeholder="Add a subtitle here">
                </p>
                <p>
                    <label for="product-desc">Product`s description</label>
                    <textarea id="product-desc" v-model.trim="newProduct.desc" placeholder="Add some description here"></textarea>
                </p>
                <p>
                    <label for="product-price">Product`s price</label>
                    <input type="number" id="product-price" v-model.trim="newProduct.price" placeholder="Add some price here">
                </p>
               <p>
                   <input v-show="imageUploadState < 100 && selectedFile === null" type="file" @change="onFileSelected($event)">
                   <span v-if="imageUploadState < 100">{{imageUploadState}}</span>
                   <span v-else>Image uploaded successfully</span>
               </p>

            </div>
           <p>
               <button type="submit" :disabled="imageUploadState !== 100">Save new product</button>
           </p>
        </form>

    </div>
</template>

<script>
import firebase from 'firebase/app'
import {productsCollection} from "../firebaseConfig";

export default {
    name: 'admin-create',
    data () {
        return {
            selectedFile: null,
            newProduct: {
                title: '',
                subtitle: '',
                desc: '',
                price: null,
                imageSrc: '',
                createdAt: new Date()
            },
            imageUploadState: null
        }
    },
    methods: {
        onFileSelected(event) {
            this.selectedFile = event.target.files[0];

            const self = this;
            const ref = firebase.storage().ref();
            const file = this.selectedFile;
            const fileName = file.name;
            const metadata = { contentType: file.type };
            const task = ref.child(fileName).put(file, metadata);

            task.on('state_changed',
                snapshot => {
                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    self.imageUploadState = progress;
                    switch (snapshot.state) {
                        case firebase.storage.TaskState.PAUSED:
                            console.log('Upload is paused');
                            break;
                        case firebase.storage.TaskState.RUNNING:
                            console.log('Upload is running');
                            break;
                    }
                },
                error => {
                    console.log('Upload is failed', error.message);
                },
                () => {
                    task.snapshot.ref.getDownloadURL().then(function(downloadURL) {
                        self.newProduct.imageSrc = downloadURL;
                    });
            });
        },
        addNewProduct() {
            const prod = this.newProduct;
            productsCollection.add({ ...prod })
                .then(
                    () => {
                        alert('Product was successfully added!');
                        document.getElementById("newProductForm").reset();
                    },
                    err => {
                        console.error(`Data wasnt add!! Error: ${err}`);
                    },
                );
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
