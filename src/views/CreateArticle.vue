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
        <v-select
        :items="categoryNames"
        filled
        label="Select a Category">
        </v-select>
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
import config from '@/config'

export default {
  data: () => ({
    myHTML: "",
    title: "",
    image: null,
    categories: [],
    categoryNames: []
  }),
  components: {
    PictureInput
  },
  mounted(){
      this.getCategories();
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
        form.append('upload_preset', process.env.VUE_APP_CLOUDINARY_PRESET);
        form.append('api_key', process.env.VUE_APP_CLOUDINARY_API_KEY);

        axios.post(process.env.VUE_APP_CLOUDINARY_URL, form)
        .then(response => {
            console.log(response)
        })
    },
    getCategories(){
      const categories = localStorage.getItem('categories');
      
      if(categories){
        this.categoryNames  = JSON.parse(categories)
        return;
      }

      axios.get(`${config.apiUrl}/categories`)
      .then(res => {
        this.categories = res.data.categories;
        this.categories.map(category => {
          return this.categoryNames.push(category.name)
        })
        console.log(this.categoryNames)
        localStorage.setItem('categories', JSON.stringify(this.categoryNames));
        // console.log(this.categories)
      })
    }
  }
};
</script>