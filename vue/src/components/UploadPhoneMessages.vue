<template>
  <v-container class="pa-10">
    <v-row class="text-center">
      <v-col v-if="!uploading" cols="12" class="text-center">
        <p class="display-3 mb-5">Verifique a validade de uma lista de mensagens  <v-icon large style="color: gold; top: -5px;">fas fa-thumbs-up</v-icon></p>
        <template>
          <v-file-input
            v-model="inputFiles"
            class="title"
            label="Selecione uma ou mais listas (*.csv)"
            outlined
            multiple
            counter
            large
            accept=".csv"
          ></v-file-input>
        </template>
        <v-btn v-if="inputFiles && inputFiles.length > 0" class="primary mb-5" large @click="uploadFilesAndReturnTheResult()">Continuar<v-icon class="ml-2">fas fa-check</v-icon>
        </v-btn>
        <p class="headline">Selecione um ou mais arquivos CSV para iniciar a verificação de uma lista com números e mensagens de SMS.</p>
        <p class="subtitle-1 grey--text text--darken-1">Use nosso <a href="#">modelo</a> de arquivo se você tem alguma dúvida.</p>
      </v-col>
      <v-col v-else>
        <p class="display-1 mb-5">Estamos verificando todas as mensagens em seu(s) arquivo(s)...</p>
         <v-icon style="font-size: 50px" class="grey--text text--darken-1">fas fa-cog fa-spin</v-icon>
        <p class="mt-5 subtitle-1 grey--text text--darken-1">Você quer <a href="#">cancelar e voltar ao início</a> ?</p>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "UploadPhoneMessages",

  data: () => ({
    inputFiles: null,
    uploading: false,
  }),
  methods: {
    uploadFilesAndReturnTheResult() {
      var vm = this
      console.debug(vm.inputFiles)
      
      const formData = new FormData()
      vm.inputFiles.forEach(file => {
        formData.append('multiple', file)
      })

      let _headers = {'Content-Type' : 'multipart/form-data'}
      vm.$API.Request('POST', 'file/uploadAndValidate', formData, _headers).then(result => {
        console.debug(result)
        vm.$emit('process', result) // return the json object returned from the API
        vm.inputFiles = null
        vm.uploading = false

      }).catch(error => {
        vm.$snotify.error(error.message)
        console.error(error)
      })
    }
  },
};
</script>
