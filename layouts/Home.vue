<template lang="pug">
  v-app(toolbar footer)
    main
      v-container(fluid).pa-0
        v-slide-x-transition(mode="out-in")
          router-view
    v-snackbar(
      :value="snackbar"
      :timeout="0"
      top
    )
      div Angular vs React vs Vue - CanariasJS
      v-btn(
        flat
        color="amber"
        href="https://canariasjs.com/"
        target="_blank"
      ) Check it out
      v-btn(flat icon color="white" @click="close").ml-0
        v-icon close
</template>

<script>
  export default {
    data: () => ({
      snackbar: false
    }),

    mounted () {
      this.snackbar = !localStorage.getItem('__vuetify_canarias_snack')
    },

    methods: {
      close () {
        this.snackbar = false
        localStorage.setItem('__vuetify_canarias_snack', false)
      }
    }
  }
</script>
