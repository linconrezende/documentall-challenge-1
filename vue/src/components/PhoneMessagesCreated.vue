<template>
  <v-container class="pa-10">
    <v-row>
      <v-col cols="12">
        <p class="display-1 text-center blue--text text--darken-3"><b>É isso aí</b> &#128640;</p>
        <p class="display-1 text-center"><b>Sua lista está pronta para entrar em produção!</b></p>
        <p class="body-1 text-center"><b>Já guardamos todas as mensagens válidas para que você possa usá-las em uma campanha no futuro.</b></p>
        <p class="mt-5 subtitle-1 grey--text text--darken-1 text-center"><a href="#" @click="startHover()">Voltar ao início</a> para iniciar outra verificação</p>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "PhoneMessagesCreated",
  props: {},
  data: () => ({}),
  methods: {
    startHover() {
      var vm = this
      vm.$emit('process', false)
    }
  },
};
</script>
