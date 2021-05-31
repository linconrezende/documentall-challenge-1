<template>
   <v-container fill-height fluid>
      <v-row>
        <v-col cols="6" class="mx-auto" style="border: solid black 1px;">
          <component v-if="actualStep && actualStep.component" :is="actualStep.component.name" v-bind="actualStep.component.props" />
        </v-col>
      </v-row>
    </v-container>
</template>

<script>
import HelloWorld from "../components/HelloWorld";
import UploadPhoneMessages from "../components/UploadPhoneMessages";

export default {
  name: "Home",
  data() {
    return {
      steps: {
        1: {
          component: {
            name: 'HelloWorld',
            props: null
          }
        }
      },
      actualStep: {
        component: {
          name: 'UploadPhoneMessages',
          props: null
        }
      }
    }
  },
  components: {
    HelloWorld,
    UploadPhoneMessages
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
