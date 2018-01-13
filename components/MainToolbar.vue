<template lang="pug">
  div
    v-toolbar(
      :color="$store.state.currentColor"
      fixed
      dark
      app
    )#main-toolbar
      v-toolbar-side-icon(@click.stop="toggleSidebar")

      v-btn(icon large @click="isSearching = true")
        v-icon search
      transition(name="slide" mode="out-in")
        v-toolbar-title(
          v-html="$store.state.h1"
          style="position: relative"
          v-bind:key="$store.state.h1"
          class="d-flex"
        )
      v-spacer
      v-btn(
        color="white"
        href="https://canariasjs.com/"
        target="_blank"
      ).hidden-xs-only.mr-3.primary--text
        v-icon(left) video_label
        span CanariasJS Stream - 1/13
    v-toolbar(
      :color="$store.state.currentColor"
      fixed
      dark
      app
      :manual-scroll="!isSearching"
      ref="toolbar"
      flat
    )
      v-btn(icon dark large @click="isSearching = false")
        v-icon arrow_back
      v-text-field(
        placeholder="Search"
        prepend-icon="search"
        id="search"
        clearable
        single-line
        solo
        key="search"
        v-model="search"
        ref="search"
        light
      )
</template>

<script>
  export default {
    name: 'toolbar',

    data: () => ({
      docSearch: {},
      isSearching: false,
      search: ''
    }),

    watch: {
      isSearching (val) {
        this.$refs.toolbar.isScrolling = !val

        if (val) {
          this.$nextTick(() => {
            this.$refs.search.focus()
          })
        } else {
          this.search = null
        }
      },
      search (val) {
        if (!val) {
          this.docSearch.autocomplete.autocomplete.close()
        }
      }
    },

    mounted () {
      this.init()
    },

    methods: {
      init () {
        this.initDocSearch()
      },
      initDocSearch () {
        const vm = this

        this.docSearch = docsearch({
          apiKey: '259d4615e283a1bbaa3313b4eff7881c',
          indexName: 'vuetifyjs',
          inputSelector: '#search',
          debug: true, // Set debug to true if you want to inspect the dropdown
          handleSelected (input, event, suggestion) {
            const url = suggestion.url
            const loc = url.split('.com')

            vm.search = ''
            vm.isSearching = false
            vm.$router.push(loc.pop())
          }
        })
      },
      toggleSidebar () {
        this.$store.commit('vuetify/SIDEBAR', !this.$store.state.sidebar)
      }
    }
  }
</script>

<style lang="stylus">
  @import '../node_modules/vuetify/src/stylus/settings/_elevations.styl'

  .algolia-autocomplete
    flex: 1 1 auto

  #search
    width: 100%

    ~ #algolia-autocomplete-listbox-0
      left: -56px !important
      top: calc(100% + 13px) !important
      elevation(6)

      .ds-dataset-1
        border: none !important
</style>
