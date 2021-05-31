<template>
  <v-container class="pa-10">
    <v-row>
      <v-col>
      </v-col>
      <v-col cols="12" v-for="(file, index) in files" :key="index">
        <p class="display-1 text-center">Encontramos {{countValidMessages(file.phoneMessages)}} mensagens válidas em sua lista &#127881;</p>
        <p class="body-1"><b>File name: {{file.name}}</b></p>
        <template>
          <v-data-table
            dense
            :headers="headers"
            :items="file.phoneMessages"
            item-key="name"
            class="elevation-1 body-1"
          >
            <template v-slot:[`item.valid`]="{ item }">
              <div>
                <span v-if="item.valid">Válida <v-icon class="green--text ml-2">fas fa-check</v-icon></span>
                <div v-if="!item.valid">
                  <v-tooltip v-if="item.invalidReasons" bottom>
                    <template  v-slot:activator="{ on, attrs }">
                      <span v-bind="attrs" v-on="on" >Inválida <v-icon class="red--text ml-2">fas fa-times</v-icon></span>
                    </template>
                    <span>
                      <p v-for="(reason, ixinvrs) in item.invalidReasons" :key="ixinvrs" class="pa-0 ma-0">{{reason}}</p>
                    </span>
                  </v-tooltip>
                  <span v-else>Inválida <v-icon class="red--text ml-2">fas fa-times</v-icon></span>
                </div>
              </div>
            </template>
          </v-data-table>
        </template>
      </v-col>
      <v-col cols="12" class="text-center pt-5">
        <p class="mb-5 display-1">Está pronto para prosseguir? &#129300;</p>
        <v-btn large @click="cancel()">Cancelar<v-icon class="ml-2">fas fa-times</v-icon></v-btn>
        <v-btn :disabled="savingList" large class="ml-5" color="primary" @click="saveLists()">Salvar lista(s)<v-icon class="ml-2">fas fa-check</v-icon></v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "ListOfFileAndPhoneMessages",
  props: {
    files: Array
  },
  data: () => ({
    headers: [
      { text: 'Número', align: 'left', filterable: true, value: 'phone' },
      { text: 'Prévia da mensagem', align: 'left', filterable: true, value: 'message' },
      { text: 'Resultado', align: 'right', filterable: true, value: 'valid', width: '120px' }
    ],
    savingList: false
  }),
  methods: {
    countValidMessages(messages) {
      let counter = 0
      messages.forEach(msg => { counter += msg.valid ? 1 : 0 })
      return counter
    },
    cancel() {
      var vm = this
      vm.$emit('process', false)
    },
    async saveLists() {
      var vm = this
      vm.savingList = true
      await vm.waitSomeTime(2000)
      let phoneMessages = []
      vm.files.forEach(file => {
        file.phoneMessages.forEach(pm => {
          // here, we actually build the phoneMessage object that will be saved in the database
          // Don't worry, it will (should be) revalidated on the server-side
          phoneMessages.push({file_id: file.id, ...pm})
        })
      })
      vm.$API.Request('POST', 'phoneMessage/create', phoneMessages).then(result => {
        console.debug(result)
        vm.$emit('process', result.data || []) // return the json object returned from the API
        vm.savingList = false
      }).catch(error => {
        vm.$snotify.error(error.message)
        console.error(error)
        vm.savingList = false
      })
    },
    waitSomeTime(ms) {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(true)
        }, ms)
      })
    }
  },
};
</script>
