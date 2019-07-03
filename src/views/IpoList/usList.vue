<template>
<!-- 美股列表 -->
    <section id="usList">
        <!-- 美股列表 -->
        美股列表
        <el-button v-show="theme=='light'" @click="changeTheme('dark')" type="primary">浅色（点击切换深色主题）</el-button>
        <el-button v-show="theme=='dark'" @click="changeTheme('light')" type="primary">深色（点击切换浅色主题）</el-button>
    </section>
</template>

<script lang="ts">
import { Component, Vue} from 'vue-property-decorator';
@Component
export default class UsList extends Vue {
    theme: string = "light";
    changeTheme(theme: string) {
        this.theme = theme;
        document.getElementsByTagName('body')[0].setAttribute('class', 'theme-' + theme);
    }
        
    }
</script>

<style lang="scss">
#usList{
    @include themify($themes) {
      background: themed('background-color');
    }
  color:$color-danger;
  }
</style>

