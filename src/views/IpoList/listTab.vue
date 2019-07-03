<template>
  <!-- ipo列表tab -->
    <el-container class="height">
      <el-header style="height:auto" class="clear-padding">
        <el-menu
          :default-active="activeIndex" class="el-menu-demo tab1"
          mode="horizontal" @select="handleSelect" router
        >
          <el-menu-item class="hk text-center" index="hk">{{ $t("listTab.hk")}}</el-menu-item>
          <el-menu-item class="us text-center" index="us">{{ $t("listTab.us")}}</el-menu-item>
          <el-menu-item class="hs text-center" index="hs">{{ $t("listTab.hs")}}</el-menu-item>
        </el-menu>
      </el-header>
      <el-main class="clear-padding">
        <router-view></router-view>
      </el-main>
    </el-container>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';
@Component
export default class ListTab extends Vue {
  activeIndex: string = "hk";

  mounted() {
    if (this.$route.path.indexOf("hk") > -1) {
      this.activeIndex = "hk";
    } else if (this.$route.path.indexOf("us") > -1) {
      this.activeIndex = "us";
    } else if (this.$route.path.indexOf("hs") > -1) {
      this.activeIndex = "hs";
    }
  }

  handleSelect(key: string, keyPath: string) {
    console.log(key, keyPath);
  }
 
  @Watch('$route')
  changeRouter() {
    // 如果路由有变化，会再次执行该方法
    // '$route': 'fetchData'
  }
};
</script>

<style lang="scss" scoped>
#app {
  .el-header,.el-menu {
    background: $tab1-bg;
    border-bottom: none;
  }
  .el-menu-item {
    height: 0.35rem;
    line-height: 0.35rem;
    color: $color-white;
    border-right: $color-black;
    width:1rem;
    &.is-active,
    &:hover,
    &:focus {
      // color:$color-active;
      background-color: $tab1-bg-active!important;
      border:none;
    }
    &.hk{
      background: url('../../assets/image/hk.png') .05rem .1rem no-repeat;
    }
    &.us{
      background: url('../../assets/image/am.png') .05rem .1rem no-repeat;
    }
    &.hs{
      background: url('../../assets/image/cn.png') .05rem .1rem no-repeat;
    }
  }
}
</style>

