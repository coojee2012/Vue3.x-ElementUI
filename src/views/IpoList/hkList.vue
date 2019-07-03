<template>
  <!-- 港股列表 -->
  <div id="hkListPage">
      <!-- 今日申购 -->
    <el-card class="box-card unborder">
      <div slot="header" class="clearfix flex header apply unborder">
        <i></i>
        <strong class="textA">{{$t("hkList.apply")}}</strong>
        <!-- <strong  class="textT">{{$t("hkList.toBeListed")}}</strong>
        <strong class="textL">{{$t("hkList.listed")}}</strong> -->
      </div>
      <el-row class="text-center list-h title" align="middle">
        <el-col :span="3"><div class="text-left">　{{$t("hkList.code")}}</div></el-col>
        <el-col :span="3"><div  class="text-left">{{$t("hkList.name")}}</div></el-col>
        <el-col :span="3"><div>{{$t("hkList.price")}}</div></el-col>
        <el-col :span="3"><div>{{$t("hkList.fee")}}</div></el-col>
        <el-col :span="3"><div>{{$t("hkList.date")}}</div></el-col>
        <el-col :span="4"><div>{{$t("hkList.syts")}}</div></el-col>
        <el-col :span="2"><div>{{$t("hkList.prospectus")}}</div></el-col>
        <el-col :span="3"><div></div></el-col>
      </el-row>
      <div v-loading="loading" element-loading-spinner="el-icon-loading" class="loadingWarp">
        <el-row  v-for="(item,index) in toadyApply.applystocks" :key="index" 
        @dblclick.native="details(item.code)"  class="text-center list-h" :class="{'odd':index%2==1}" 
        align="middle">
            <el-col :span="3"><div class="text-left">
                <router-link :to="`/ipoMaterials/${item.code}`">　{{item.code|stockCode}}</router-link>
            </div></el-col>
            <el-col :span="3"><div  class="text-left">
                <router-link  :to="`/ipoMaterials/${item.code}`">{{item.name}}</router-link>
            </div></el-col>
            <el-col :span="3"><div>{{item.ipoprice.floor}}-{{item.ipoprice.ceiling}}</div></el-col>
            <el-col :span="3"><div>{{item.minimumcapital}}</div></el-col>
            <el-col :span="3"><div>{{item.resultdate|formatDate('yyyy-MM-dd',lang)}}</div></el-col>
            <el-col :span="4"><div>
                {{$t('hkList.endLine')}}<i class="remin">{{item.leftdays}}</i>{{$t('hkList.endLineDay')}}
            </div></el-col>
            <el-col :span="2"><div class="zgs">
                <a :href="item.zgsLink" target="_blank" class="active">
                    <el-button type="text">{{$t('hkList.ckqw')}}</el-button>
                    </a>
            </div></el-col>
            <el-col :span="3"><div>
                <el-button type="warning"><i class="el-icon-download"></i>{{$t('hkList.toApply')}}</el-button>
            </div></el-col>
        </el-row>
        <div class="noData text-center" v-if="!loading && (!toadyApply.applystocks || toadyApply.applystocks.length==0)">{{$t('hkList.noData')}}</div>
      </div>
    </el-card>
    <!-- 待上市 -->
    <el-card class="box-card unborder">
      <div slot="header" class="clearfix flex header toBeListed unborder">
        <i></i><strong>{{$t("hkList.toBeListed")}}</strong>
      </div>
      <el-row class="text-center list-h title" align="middle">
        <el-col :span="3"><div  class="text-left">　{{$t("hkList.code")}}</div></el-col>
        <el-col :span="3"><div class="text-left">{{$t("hkList.name")}}</div></el-col>
        <el-col :span="3"><div>{{$t("hkList.price")}}</div></el-col>
        <el-col :span="3"><div>{{$t("hkList.lot")}}</div></el-col>
        <el-col :span="3"><div>{{$t("hkList.date")}}</div></el-col>
        <el-col :span="4"><div>{{$t("hkList.psjg")}}</div></el-col>
        <el-col :span="2"><div>{{$t("hkList.prospectus")}}</div></el-col>
        <el-col :span="3"><div></div></el-col>
      </el-row>
      <div v-loading="loading" element-loading-spinner="el-icon-loading" class="loadingWarp">
        <el-row  v-for="(item,index) in toadyApply.listingstocks" :key="index" 
        @dblclick.native="details(item.code)"  class="text-center list-h" :class="{'odd':index%2==1}" 
        align="middle">
            <el-col :span="3"><div class="text-left">
                    <router-link :to="`/ipoMaterials/${item.code}`">　{{item.code|stockCode}}</router-link>
            </div></el-col>
            <el-col :span="3"><div  class="text-left">
                <router-link  :to="`/ipoMaterials/${item.code}`">{{item.name}}</router-link>
            </div></el-col>
            <el-col :span="3"><div>{{item.ipoprice.floor}}-{{item.ipoprice.ceiling}}</div></el-col>
            <el-col :span="3"><div>{{item.lotsize}}</div></el-col>
            <el-col :span="3"><div>{{item.resultdate|formatDate('yyyy-MM-dd',lang)}}</div></el-col>
            <el-col :span="4"><div>
                <el-button type="warning">{{$t("hkList.psjg")}}</el-button>
                <span style="display:none">{{$t("hkList.nopsjg")}}</span>
            </div></el-col>
            <el-col :span="2"><div class="zgs">
                <a :href="item.zgsLink" target="_blank" class="active">
                    <el-button type="text">{{$t('hkList.ckqw')}}</el-button>
                </a>
            </div></el-col>
            <el-col :span="3"><div>
                <el-button type="warning" v-if="item.isdarkpools"><i class="el-icon-s-marketing"></i>{{$t('hkList.anPan')}}</el-button>
            </div></el-col>
        </el-row>
        <div class="noData text-center" v-if="!loading && (!toadyApply.listingstocks || toadyApply.listingstocks.length==0)">{{$t('hkList.noData')}}</div>
      </div>
    </el-card>
    <!-- 已上市 -->
    <el-card class="box-card unborder">
      <div slot="header" class="clearfix flex header listed unborder">
        <i></i><strong>{{$t("hkList.listed")}}</strong>
      </div>
      <el-row class="text-center list-h title" align="middle">
        <el-col :span="3"><div class="text-left">　{{$t("hkList.code")}}</div></el-col>
        <el-col :span="3"><div class="text-left">{{$t("hkList.name")}}</div></el-col>
        <el-col :span="2"><div>{{$t("hkList.xj")}}</div></el-col>
        <el-col :span="2"><div>{{$t("hkList.zgj")}}</div></el-col>
        <el-col :span="2"><div>{{$t("hkList.cerg")}}</div></el-col>
        <el-col :span="3"><div>{{$t("hkList.listedDate")}}</div></el-col>
        <el-col :span="2"><div>{{$t("hkList.apsdf")}}</div></el-col>
        <el-col :span="2"><div>{{$t("hkList.zrsdf")}}</div></el-col>
        <el-col :span="2"><div>{{$t("hkList.zdf")}}</div></el-col>
        <el-col :span="3"><div>{{$t("hkList.hy")}}</div></el-col>
      </el-row>
      <div v-loading="loading" element-loading-spinner="el-icon-loading" class="loadingWarp">
        <el-row  v-for="(item,index) in toadyApply.listedstocks" :key="index" 
        @dblclick.native="details(item.code)"  class="text-center list-h" :class="{'odd':index%2==1}" 
        align="middle">
            <el-col :span="3"><div class="text-left">
                <router-link :to="`/ipoMaterials/${item.code}`">　{{item.code|stockCode}}</router-link>
            </div></el-col>
            <el-col :span="3"><div  class="text-left">
                <router-link  :to="`/ipoMaterials/${item.code}`">{{item.name}}</router-link>
            </div></el-col>
            <el-col :span="2"><div>{{item.prices}}</div></el-col>
            <el-col :span="2"><div>{{item.ipopricing}}</div></el-col>
            <el-col :span="2"><div></div></el-col>
            <el-col :span="3"><div>{{item.resultdate|formatDate('yyyy-MM-dd',lang)}}</div></el-col>
            <el-col :span="2"><div></div></el-col>
            <el-col :span="2"><div></div></el-col>
            <el-col :span="2"><div></div></el-col>
            <el-col :span="3"><div>{{item.industry}}</div></el-col>
        </el-row>
        <div class="noData text-center" v-if="!loading && (!toadyApply.listedstocks || toadyApply.listedstocks.length==0)">{{$t('hkList.noData')}}</div>
      </div>
    </el-card>

  </div>
</template>

<script lang="ts">
import {ipoList, getMaterials} from '../../sys/request-service';
// import { Observable, Subject,throwError} from 'rxjs'
import { Component, Vue} from 'vue-property-decorator';
import { debuglog } from 'util';
@Component
export default class HkList extends Vue {
    lang: string = this.$store.getters.lang;
    toadyApply = [];
    loading = true;

  mounted() {
      //请求ipo新股数据
     ipoList('mkt_hk').subscribe(res => {
         if(res){
             console.log(res);
             let arr: any = [];
             let resLength = 0;
             for (const key in res) {
                 if (res[key].length > 0) {
                     resLength++;
                 }
             }
             for (const key in res) {
                 if (res.hasOwnProperty(key)) {
                     for(let j=0;j<res[key].length;j++){
                        getMaterials(res[key][j].code).subscribe(pkg => {
                            if(arr.indexOf(key) < 0){
                                arr.push(key);
                            }
                            res[key][j].zgsLink = pkg.link;
                            res[key][j].industry = pkg.industry;
                            if(arr.length === resLength && j === res[key].length-1) {
                                this.toadyApply = res;
                                this.loading = false;
                            }
                            
                        })
                    }
                     
                 }
             }
         } else {
             this.loading = false;
         }
         
    },err => {
        console.error(err);
    })
  }

  details(code: string) {
        //  this.$router.push({name: 'ipoMaterials',params:{ code:code}}); 两种写法
         this.$router.push({path: `/ipoMaterials/${code}`});
    }

}
</script>

<style lang="scss">
#hkListPage {
    min-width: 7.5rem;
    overflow: auto;
    .box-card{
        @include themify($themes) {
            color:themed('font-color');
            background-color: themed('background-color');
        }
        box-shadow: none;
        .el-card__header{
            padding:.05rem .05rem 0;
            border: none;
        }
        .header{
            justify-content: start;
            i{
                display: inline-block;
                height: .2rem;
                width: .04rem;
                background: $color-active;
                margin-right: .05rem;
            }
            &.apply{
                strong.textA{
                    color:$color-active;
                }
                i{
                    background: $color-active;
                }
                .textT,.textL{
                    position: relative;
                    margin-left: .2rem;
                    &:before{
                        content: '';
                        width:.04rem;
                        height:.04rem;;
                        border-radius: .02rem;;
                        position: absolute;
                        top: .08rem;
                        left: -0.07rem;
                    }

                }
                .textT{
                    color:$color-notice;
                    &:before{
                        background: $color-notice;
                    }
                }
                .textL{
                    color:$color-greens;
                    &:before{
                        background: $color-greens;
                    }
                }
            }
            &.toBeListed {
                strong{
                    color:$color-notice;
                }
                i{
                    background: $color-notice;
                }
            }
            
            &.listed{
                strong{
                    color:$color-greens;
                }
                i{
                    background: $color-greens;
                }
            }
            
        }
        .loadingWarp{
            min-height:.28rem;
            .el-row{
                &.odd{
                    @include themify($themes) {
                        background-color:themed('bg-oddList');
                    }
                }
                // &:hover{
                //     @include themify($themes) {
                //         background-color:themed('bg-listHover');
                //     }
                // }

            }
            i.remin{
                @include themify($themes) {
                    color:$color-danger;
                }
            }
            a{
                @include themify($themes) {
                    color:themed('font-color');
                }
                &:hover{
                    color:$color-active;
                }
                &.active{
                    color:$color-active;
                }
            }
            .el-button--warning{
                padding:.02rem .15rem;
            }
            .noData{
                height:.4rem;
                line-height: .4rem;
                color:$text-grey;
            }
        }
        .el-card__body{
            padding:.1rem 0;
        }
        .el-row.title{
            @include themify($themes) {
                background:themed('bg-title');
            }
        }
        // div.zgs a{
        //     color:$color-active;
        //     display: inline-block;
        //     height: .2rem;
        //     width: 50%;
        // }
    }
}

</style>


