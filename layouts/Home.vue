<template lang="pug">
  v-app(toolbar footer)
    main
      v-container(fluid).pa-0
        v-slide-x-transition(mode="out-in")
          router-view
</template>
