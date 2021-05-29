<template>
  <hello-world />
</template>

<script>
import HelloWorld from "../components/HelloWorld";

export default {
  name: "Home",

  components: {
    HelloWorld,
  },
  created() {
    // var vm = this
    // vm.$snotify.success('Snotify is working')
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
