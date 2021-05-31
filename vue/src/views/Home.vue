<template>
  <v-container fill-height fluid>
    <v-row style="margin: 10% 50px 10% 50px">
      <v-col lg="6" class="mx-auto" style="border: solid black 1px">
        <component
          v-if="actualStep && steps[actualStep].component"
          :is="steps[actualStep].component.name"
          v-bind="steps[actualStep].component.props"
          @process="nextStep"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import UploadPhoneMessages from "../components/UploadPhoneMessages";
import ListOfFileAndPhoneMessages from "../components/ListOfFileAndPhoneMessages";
import PhoneMessagesCreated from "../components/PhoneMessagesCreated";

export default {
  name: "Home",
  data() {
    return {
      steps: {
        1: {
          component: {
            name: "UploadPhoneMessages",
            props: {},
          },
        },
        2: {
          component: {
            name: "ListOfFileAndPhoneMessages",
            props: {
              files: [],
            },
          },
        },
        3: {
          component: {
            name: "PhoneMessagesCreated",
            props: {},
          },
        },
      },
      actualStep: 1,
    };
  },
  components: {
    UploadPhoneMessages,
    ListOfFileAndPhoneMessages,
    PhoneMessagesCreated,
  },
  created() {
    // var vm = this
    // vm.$snotify.success('Snotify is working')
  },
  methods: {
    uploadFile() {
      var vm = this;
      vm.$API
        .Request("POST", "file/uploadAndValidate", {})
        .then((result) => {
          console.debug(result);
        })
        .catch((error) => {
          console.debug(error);
        });
    },
    nextStep(event) {
      var vm = this;
      // event will contain information depending on the actuall step
      console.debug(event);
      if (!event) {
        // cancel start over
        vm.steps[2].component.props.files = [];
        vm.actualStep = 1;
      } else {
        // prepare to the next step
        switch (vm.actualStep) {
          case 1:
            vm.steps[2].component.props.files = event;
            vm.actualStep += 1;
            break;
          default:
            vm.actualStep += 1;
            break;
        }
      }
    },
  },
};
</script>
