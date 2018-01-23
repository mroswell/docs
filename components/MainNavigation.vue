<template lang="pug">
  v-navigation-drawer(
    v-model="isActive"
    fixed
    dark
    app
  )
    v-toolbar(flat dark).transparent
      v-list.pa-0.vuetify
        v-list-tile(avatar tag="div")
          v-list-tile-avatar
            router-link(to="/")
              img(
                src="/static/doc-images/logo.svg"
                v-bind:style="filter"
                alt="Vuetify"
                title="Vuetify"
              )
          v-list-tile-content
            v-list-tile-title Vuetify
            v-list-tile-sub-title
              v-menu
                span(flat slot="activator") Version: {{ release === releases[0] ? `Latest (${release})` : release }}
                  v-icon(dark) arrow_drop_down
                v-list
                  v-list-tile(
                    to="/"
                    v-for="(release, i) in releases"
                    v-if="i === 0"
                    v-bind:key="release"
                  )
                    v-list-tile-title {{ release }}
                  v-list-tile(
                    tag="a"
                    v-else
                    :href="`/releases/${release}`"
                  )
                    v-list-tile-title {{ release }}
    v-divider
    v-layout(justify-center wrap).pt-3
      v-card(flat light).your-logo-here
        v-card-text
          v-layout(justify-center)
            v-flex.text-xs-center
              div.body-2.mb-4 Diamond Sponsors
              a(
                href="https://careers.lmax.com/?utm_source=vuetify&utm_medium=logo-link&utm_campaign=lmax-careers"
                target="_blank"
                rel="noopener"
              )
                img(
                  width="115px"
                  src="/static/doc-images/backers/lmax-exchange.png"
                  alt="LMAX Exchange"
                  title="LMAX Exchange"
                ).mb-3
              br
              a(
                href="http://intygrate.com/?ref=vuetifyjs.com"
                target="_blank"
                rel="noopener"
              )
                img(
                  width="115px"
                  src="/static/doc-images/backers/intygrate.png"
                  alt="intygrate"
                  title="intygrate"
                )
    v-layout(row justify-center wrap).pt-4
      v-btn(
        dark
        to="/vuetify/sponsors-and-backers"
        round
        small
        outline          
        color="blue lighten-2"
      )
        span.caption Become a backer
      v-tooltip(
        v-for="social in socials"
        v-bind:key="social.icon"
        bottom
        v-if="false"
      )
        v-btn(
          icon
          dark
          target="_blank"
          v-bind:href="social.href"
          slot="activator"
        )
          v-icon(v-html="social.icon")
        span(v-text="social.name")
      v-flex(xs12).pt-3.pb-1.text-xs-center
        a(
          href="https://vuejobs.com/?utm_source=vuejobs&utm_medium=banner&utm_campaign=linking"
          target="_blank"
          rel="noopener"
        )
          img(
            src="/static/doc-images/affiliates/vuejobs.png"
            alt="VueJobs"
            title="VueJobs"
          )
    v-list(dense)
      template(v-for="item in items")
        v-list-group(v-if="item.items" v-bind:group="item.group")
          v-list-tile(slot="item" ripple)
            v-list-tile-action
              v-icon(dark) {{ item.action }}
            v-list-tile-content
              v-list-tile-title {{ item.title }}
            v-list-tile-action
              v-icon(dark) keyboard_arrow_down
          v-list-tile(
            v-for="subItem in item.items" v-bind:key="subItem.title"
            v-bind="{ \
              to: !subItem.target ? subItem.href : null, \
              href: subItem.target && subItem.href \
            }"
            ripple
            v-bind:disabled="subItem.disabled"
            v-bind:target="subItem.target"
          )
            v-list-tile-content
              v-list-tile-title {{ subItem.title }}
            v-list-tile-action(v-if="subItem.action")
              v-icon(dark :class="[subItem.actionClass || 'success--text']") {{ subItem.action }}
        v-subheader(v-else-if="item.header" dark) {{ item.header }}
        v-divider(v-else-if="item.divider")
        v-list-tile(
          v-bind="{ \
            to: !item.target ? item.href : null, \
            href: item.target && item.href \
          }"
          ripple
          v-bind:disabled="item.disabled"
          v-bind:target="item.target"
          rel="noopener"
          v-else
        )
          v-list-tile-action
            v-icon(dark) {{ item.action }}
          v-list-tile-content
            v-list-tile-title {{ item.title }}
          v-list-tile-action(v-if="item.subAction")
            v-icon(dark class="success--text") {{ item.subAction }}
          v-chip(
            v-else-if="item.chip"
            label
            small
            color="blue lighten-2"
            text-color="white"
            class="caption mx-0"
          ) {{ item.chip }}
</template>

<script>
  import { mapState } from 'vuex'

  export default {
    data () {
      return {
        socials: [
          { name: 'Github', icon: 'fa-github-square', href: 'https://github.com/vuetifyjs/vuetify' },
          { name: 'Twitter', icon: 'fa-twitter-square', href: 'https://twitter.com/vuetifyjs' },
          { name: 'Facebook', icon: 'fa-facebook-square', href: 'https://www.facebook.com/vuetifyjs' },
          { name: 'Community', icon: 'fa-comment', href: 'https://chat.vuetifyjs.com' }
        ],
        items: [
          { header: 'Core documentation' },
          {
            title: 'Vuetify',
            action: 'apps',
            group: 'vuetify',
            items: [
              { href: '/vuetify/quick-start', title: 'Quick start' },
              { href: '/vuetify/why-vuetify', title: 'Why Vuetify?' },
              { href: '/vuetify/frequently-asked-questions', title: 'Frequently asked questions' },
              { href: '/vuetify/sponsors-and-backers', title: 'Sponsors and backers' },
              { href: '/vuetify/contributing', title: 'Contributing' },
              { href: '/vuetify/roadmap', title: 'Roadmap' },
              { href: '/vuetify/a-la-carte', title: 'A la carte' }
            ]
          },
          {
            title: 'Layout',
            action: 'devices',
            group: 'layout',
            items: [
              { href: '/layout/pre-defined', title: 'Pre-defined', action: 'star', actionClass: 'white--text' },
              { href: '/layout/grid', title: 'Grid & breakpoints' },
              { href: '/layout/spacing', title: 'Spacing' },
              { href: '/layout/alignment', title: 'Alignment' },
              { href: '/layout/display', title: 'Display' },
              { href: '/layout/elevation', title: 'Elevation' },
              { href: '/layout/sandbox', title: 'Sandbox' }
            ]
          },
          {
            title: 'Style',
            action: 'style',
            group: 'style',
            items: [
              { href: '/style/colors', title: 'Colors' },
              { href: '/style/theme', title: 'Theme' },
              { href: '/style/typography', title: 'Typography' },
              { href: '/style/content', title: 'Content' }
            ]
          },
          {
            title: 'Motion',
            action: 'slow_motion_video',
            group: 'motion',
            items: [
              { href: '/motion/transitions', title: 'Transitions' }
            ]
          },
          {
            title: 'Components',
            action: 'widgets',
            group: '/components',
            items: [
              { href: '/components/alerts', title: 'Alerts' },
              { href: '/components/avatars', title: 'Avatars' },
              { href: '/components/badges', title: 'Badges' },
              { href: '/components/breadcrumbs', title: 'Breadcrumbs' },
              { href: '/components/bottom-navigation', title: 'Bottom navigation' },
              { href: '/components/bottom-sheets', title: 'Bottom sheets' },
              { href: '/components/buttons', title: 'Buttons' },
              { href: '/components/floating-action-buttons', title: 'Buttons: Floating Action Buttons' },
              { href: '/components/cards', title: 'Cards' },
              { href: '/components/carousels', title: 'Carousel' },
              { href: '/components/chips', title: 'Chips' },
              { href: '/components/data-tables', title: 'Data tables' },
              { href: '/components/dialogs', title: 'Dialogs' },
              { href: '/components/dividers', title: 'Dividers' },
              { href: '/components/expansion-panels', title: 'Expansion panels' },
              { href: '/components/footer', title: 'Footer' },
              { href: '/components/forms', title: 'Forms' },
              { href: '/components/grid-lists', title: 'Grid Lists' },
              { href: '/components/icons', title: 'Icons' },
              { href: '/components/lists', title: 'Lists' },
              { href: '/components/menus', title: 'Menus' },
              { href: '/components/navigation-drawers', title: 'Navigation drawers' },
              { href: '/components/pagination', title: 'Pagination' },
              { href: '/components/parallax', title: 'Parallax' },
              { href: '/components/pickers', title: 'Pickers' },
              { href: '/components/progress', title: 'Progress & activity' },
              { href: '/components/selects', title: 'Selects' },
              { href: '/components/selection-controls', title: 'Selection controls' },
              { href: '/components/sliders', title: 'Sliders' },
              { href: '/components/snackbars', title: 'Snackbars & toasts' },
              { href: '/components/steppers', title: 'Steppers' },
              { href: '/components/subheaders', title: 'Subheaders' },
              { href: '/components/tabs', title: 'Tabs' },
              { href: '/components/text-fields', title: 'Text fields' },
              { href: '/components/toolbars', title: 'Toolbars' },
              { href: '/components/tooltips', title: 'Tooltips' }
            ]
          },
          {
            title: 'Directives',
            action: 'polymer',
            group: '/directives',
            items: [
              { href: '/directives/resizing', title: 'Resizing' },
              { href: '/directives/ripples', title: 'Ripples' },
              { href: '/directives/scrolling', title: 'Scrolling' },
              { href: '/directives/touch-support', title: 'Touch Support' }
            ]
          },
          {
            title: 'Pre-made themes',
            action: 'color_lens',
            href: '/pre-made-themes'
          },
          {
            href: 'https://next.vuetifyjs.com/store',
            title: 'Shop',
            target: '_blank',
            action: 'shopping_cart'
          },
          { divider: true },
          { header: 'Additional resources' },
          {
            title: 'Community',
            action: 'people',
            items: [
              { href: 'https://github.com/vuetifyjs/awesome-vuetify', title: 'Awesome Vuetify', target: '_blank' },
              {
                href: 'https://chat.vuetifyjs.com',
                target: '_blank',
                title: 'Chat and support'
              },
              {
                href: 'https://github.com/vuetifyjs/vuetify/issues',
                target: '_blank',
                title: 'Issue Board'
              },
              {
                href: 'https://stackoverflow.com/search?q=vuetify',
                target: '_blank',
                title: 'Stack Overflow'
              }
            ]
          },
          {
            title: 'Guides',
            action: 'developer_mode',
            group: '/guides',
            items: [
              {
                href: '/guides/server-side-rendering',
                title: 'Server Side Rendering'
              }
            ]
          }
        ]
      }
    },

    computed: {
      ...mapState([
        'releases',
        'release'
      ]),
      filter () {
        const color = this.$store.state.currentColor
        let hue = 0

        if (color === 'purple') {
          hue = 420
        } else if (color === 'darken-3 pink') {
          hue = 480
        } else if (color === 'indigo') {
          hue = 370
        } else if (color === 'cyan') {
          hue = 337
        } else if (color === 'teal') {
          hue = 315
        }

        return {
          filter: `hue-rotate(${hue}deg)`
        }
      },

      isActive: {
        get () {
          return this.$store.state.sidebar
        },
        set (val) {
          this.$store.commit('vuetify/SIDEBAR', val)
        }
      }
    }
  }
</script>

<style lang="stylus" scoped>
  .vuetify
    .router-link-active
      display: flex
      align-items: center

    .list__tile__avatar img
      border-radius: 0 !important

  .navigation-drawer--mini-variant .your-logo-here
    display: none
</style>
