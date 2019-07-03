<template>
<!-- 发行资料 -->
    <el-container class="height" id="ipoMaterials">
        <el-header class="flex clear-padding" style="height: .35rem;">
            <div class="mouseHand back flex height" @click="goBack()">
                <!-- <router-link to="/list" class="goback"> -->
                    <i class="el-icon-arrow-left text-strong font-20"></i>
                <!-- </router-link> -->
            </div>
            <div v-if="materials">
                <span class="text-strong font-16">{{materials.name}}</span><span>[{{materials.code}}]</span>
            </div>
        </el-header>
        <div v-loading="loading" element-loading-spinner="el-icon-loading" class="loadingWarp">
            
        </div>
    </el-container>
</template>

<script lang="ts">
import { Component, Vue} from 'vue-property-decorator';
import {getMaterials} from '../../sys/request-service';
@Component
export default class IpoMaterials extends Vue {
    loading: boolean = true;
    materials:any = null;
    code: string = this.$route.params.code;
    created() {
        // 组件创建完后获取数据
        getMaterials(this.code).subscribe(res => {
            if(res) {
                this.materials = res;
                this.loading = false;
            }
        })
    }
    goBack() {
        this.$router.go(-1);
    }  

}
</script>

<style lang="scss">
    #ipoMaterials{
        .el-header{
            justify-content: start;
            background-color: $tab1-bg;
            color: $color-white;
            div.back{
                width:.4rem;
                .goback{
                    color:$tab1-text;
                }
            }
        }




    }
</style>

