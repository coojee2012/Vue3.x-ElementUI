<template>
  <div id="app" :class="[theme,lang,'height']">
    <router-view></router-view>
  </div>
</template>

<script lang="ts">
import { Component, Vue} from 'vue-property-decorator';
@Component
export default class App extends Vue {
  theme: string = '';
  lang: string = '';

  computed() {
    this.theme =  this.$store.getters.theme;
    this.lang = this.$store.getters.lang;
  }
}
</script>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  @include themify($themes) {
    background: themed('background-color');
    color:themed('font-color');
  }
}
</style>
