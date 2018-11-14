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
    //import axios from 'axios';
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
        watch: {

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

                task.on('state_changed', function(snapshot){
                    // Observe state change events such as progress, pause, and resume
                    // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    self.imageUploadState = progress;
                    switch (snapshot.state) {
                        case firebase.storage.TaskState.PAUSED: // or 'paused'
                            console.log('Upload is paused');
                            break;
                        case firebase.storage.TaskState.RUNNING: // or 'running'
                            console.log('Upload is running');
                            break;
                    }
                }, function(error) {
                    // Handle unsuccessful uploads
                }, function() {
                    // Handle successful uploads on complete
                    // For instance, get the download URL: https://firebasestorage.googleapis.com/...
                    task.snapshot.ref.getDownloadURL().then(function(downloadURL) {
                        console.log('File available at', downloadURL);
                        self.newProduct.imageSrc = downloadURL;
                    });
                });

                // task
                //     .then(snapshot => snapshot.ref.getDownloadURL())
                //     .then(
                //         url => {
                //             this.newProduct.imageSrc = url;
                //             console.log(url);
                //         }
                //     )
                //     .catch((error) => {
                //         switch (error.code) {
                //             case 'storage/unauthorized':
                //                 break;
                //             case 'storage/canceled':
                //                 break;
                //             case 'storage/unknown':
                //                 break;
                //         }
                //     });
            },
            onUpload() {
                // const fd = new FormData();
                // fd.append('image', this.selectedFile, this.selectedFile.name);
                // axios.post('https://us-central1-my-awesome-project-id-13a4a.cloudfunctions.net/uploadFile', fd, {
                //   onUploadProgress: uploadEvent => {
                //     console.log(uploadEvent);
                //   }
                // })
                //   .then(res => {
                //     console.log(res);
                //   });


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
