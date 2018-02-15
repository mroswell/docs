<template lang="pug">
  div.component-example(:id="id")
    codepen(ref="codepen" :pen="parsed")
    v-card
      v-toolbar(v-bind:color="currentColor" flat dense dark)
        v-btn(dark icon :to="{ hash: id }")
          v-icon link
        span.title.white--text.layout.align-end {{ header }}
          span(v-if="newIn").ml-2.body-2.red--text.text--lighten-2 (New in {{ newIn }}+)
        v-spacer
        v-tooltip(bottom)
          v-btn(
            dark
            icon
            tag="a"
            :href="`https://github.com/vuetifyjs/docs/tree/master/examples/${file}.vue`"
            target="_blank"
            slot="activator"
          )
            v-icon fa-github
          span View on Github
        v-tooltip(bottom)
          v-btn(
            dark
            icon
            @click="sendToCodepen"
            slot="activator"
          )
            v-icon fa-codepen
          span Edit in codepen
        v-tooltip(bottom)
          v-btn(
            dark
            icon
            @click.stop="panel = !panel"
            slot="activator"
          )
            v-icon code
          span View source
      v-expansion-panel.elevation-0.component-example__panel
        v-expansion-panel-content(v-model="panel" lazy)
          v-tabs(ref="tabs" :scrollable="false")
            v-tabs-bar(dark :class="[currentColor]" class="darken-4 pl-0")
              v-tabs-slider(:color="currentColor + ' lighten-4'")
              v-tabs-item(
                v-for="tab in tabs"
                :key="tab"
                :href="'#'+tab"
                v-show="parsed[tab]"
              ) {{ tab }}
            v-tabs-items
              v-tabs-content(
                v-for="tab in tabs"
                v-bind:key="tab"
                v-bind:id="tab"
              )
                markup(:lang="getLang(tab)" v-if="parsed[tab]").ma-0
                  | {{ parsed[tab] }}
      v-card-text.subheading.justify
        slot(name="desc")
      v-card-text
        component(:is="component")
    v-divider.my-5
</template>

<script>
  const release = process.env.RELEASE

  export default {
    data () {
      return {
        tabs: ['template', 'script', 'style'],
        component: null,
        panel: false,
        parsed: {
          script: null,
          style: null,
          template: null
        },
        url: release ? `releases/${release}/` : ''
      }
    },

    props: {
      file: String,
      header: String,
      newIn: String,
      id: String
    },

    computed: {
      currentColor () {
        return this.$store.state.currentColor
      }
    },

    beforeDestroy () {
      this.instance.$destroy()
    },

    mounted () {
      import(
        /* webpackChunkName: "examples" */
        /* webpackMode: "lazy-once" */
        `../examples/${this.file}.vue`
      ).then(comp => {
        this.component = comp.default
      })

      import(
        /* webpackChunkName: "examples-source" */
        /* webpackMode: "lazy-once" */
        `!raw-loader!../examples/${this.file}.vue`
      ).then(this.boot)
    },

    methods: {
      getLang (tab) {
        if (tab === 'script') return 'js'
        if (tab === 'style') return 'css'
        return 'html'
      },
      parseTemplate (target, template) {
        const string = `(<${target}(.*)?>[\\w\\W]*<\\/${target}>)`
        const regex = new RegExp(string, 'g')
        const parsed = regex.exec(template) || []

        return parsed[1] || ''
      },
      boot (res) {
        const template = this.parseTemplate('template', res)
        const script = this.parseTemplate('script', res)
        const style = this.parseTemplate('style', res)

        this.parsed = {
          template,
          script,
          style
        }
      },
      toggle () {
        this.active = !this.active
      },
      sendToCodepen () {
        this.$refs.codepen.submit()
      }
    }
  }
</script>

<style lang="stylus">
  .component-example
    .component-example__panel
      .expansion-panel__body
        border: none

      .tabs__item, .markup
        height: 100%

      .tabs__items
        border: none
        max-height: 500px
        overflow-y: auto

      > li
        border: none

    .justify
      text-align: justify

    nav.toolbar
      z-index: 0

    [data-app]
      min-height: 300px
</style>
