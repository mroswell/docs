<template lang="pug">
  v-app
    main-navigation
    main-toolbar
    v-content
      v-container(fluid)
        transition(name="slide" mode="out-in")
          router-view
      v-snackbar(:value="snack" :timeout="0")
        span V1.0 IS COMING SOON!
        v-spacer
        v-btn(
          flat
          color="yellow darken-1"
          href="https://next.vuetifyjs.com"
          target="_blank"
          @click="snack = false"
        ) Check it out
        v-btn(icon dark @click="snack = false").ml-0
          v-icon close
    main-footer
    v-fab-transition
      v-btn(
        fab
        dark
        fixed
        bottom
        right
        color="red"
        v-scroll="onScroll"
        v-show="fab"
        @click="toTop"
      )
        v-icon keyboard_arrow_up
</template>

<script>
  import MainNavigation from 'components/MainNavigation'
  import MainToolbar from 'components/MainToolbar'
  import MainFooter from 'components/MainFooter'

  export default {
    components: {
      MainNavigation,
      MainToolbar,
      MainFooter
    },

    data: () => ({
      fab: false,
      snack: true
    }),

    mounted () {
      this.onScroll()
    },

    methods: {
      onScroll () {
        if (typeof window === 'undefined') return

        const top = window.pageYOffset ||
          document.documentElement.offsetTop ||
          0

        this.fab = top > 300
      },
      toTop () {
        this.$router.push({ hash: '' })
        window.scrollTo(0, 0)
      }
    }
  }
</script>
