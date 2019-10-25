<template>
  <div>
    <v-card>
      <form class="pa-4">
        <v-card-title>Create New Article</v-card-title>
        <picture-input
          accept="image/jpeg, image/png"
          size="10"
          button-class="btn btn-danger"
          @change="onChange"
        ></picture-input>
        <v-text-field label="Title" required v-model="title"></v-text-field>
        <wysiwyg v-model="myHTML" />
        <v-btn class="success" @click="createArticle()" type="submit">Create Article</v-btn>
      </form>
    </v-card>
  </div>
</template>

<script>
import PictureInput from "vue-picture-input";
import axios from 'axios'
export default {
  data: () => ({
    myHTML: "",
    title: "",
    image: null
  }),
  components: {
    PictureInput
  },
  mounted(){
      console.log(process.env)
  },
  methods: {
    onChange(image) {
      console.log("New picture selected!");
      this.image = image
      if (image) {
        console.log("Picture loaded.");
        this.image = image;
      } else {
        console.log("FileReader API not supported: use the <form>, Luke!");
      }
    },
    createArticle(){
        const form = new FormData();

        form.append('file', this.image);
        form.append('upload_preset', '');
        form.append('api_key', '');

        axios.post('', form)
        .then(response => {
            console.log(response)
        })
    }
  }
};
</script>