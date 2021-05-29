<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <HelloWorld msg="Welcome to Your Vue.js App" />
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";

export default {
  name: "Home",
  components: {
    HelloWorld,
  },
  created() {
    // var vm = this
  },
  methods: {
    uploadFile() {
      var vm = this
      vm.$API.Request('POST', 'file/uploadAndValidate', {}).then(result => {
        console.debug(result)
      }).catch(error => {
        console.debug(error)
      })
    }
  },
};
</script>
