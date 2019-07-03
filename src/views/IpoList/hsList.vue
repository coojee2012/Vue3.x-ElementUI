<template>
<!-- A股列表 -->
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
    <!-- 今日上市 -->
    <el-card class="box-card unborder">
      <div slot="header" class="clearfix flex header apply unborder">
        <i></i>
        <strong class="textA">今日上市</strong>
      </div>
      <el-row class="text-center list-h title" align="middle">
        <el-col :span="3"><div class="text-left">　{{$t("hkList.code")}}</div></el-col>
        <el-col :span="3"><div  class="text-left">{{$t("hkList.name")}}</div></el-col>
        <el-col :span="3"><div>发行价</div></el-col>
        <el-col :span="3"><div>最新价</div></el-col>
        <el-col :span="3"><div>中签率</div></el-col>
        <el-col :span="3"><div>累计涨跌幅</div></el-col>
        <el-col :span="3"><div>发行市盈率</div></el-col>
        <el-col :span="3"><div></div></el-col>
      </el-row>
      <div v-loading="loading" element-loading-spinner="el-icon-loading" class="loadingWarp">
        <el-row  v-for="(item,index) in toadyApply.listedtodaystocks" :key="index" 
        @dblclick.native="details(item.code)"  class="text-center list-h" :class="{'odd':index%2==1}" 
        align="middle">
            <el-col :span="3"><div class="text-left">
                <router-link :to="`/ipoMaterials/${item.code}`">　{{item.code|stockCode}}</router-link>
            </div></el-col>
            <el-col :span="3"><div  class="text-left">
                <router-link  :to="`/ipoMaterials/${item.code}`">{{item.name}}</router-link>
            </div></el-col>
            <el-col :span="3"><div>{{item.issueprice}}</div></el-col>
            <el-col :span="3"><div>{{item.lastprice}}</div></el-col>
            <el-col :span="3"><div>{{item.allocationrate}}</div></el-col>
            <el-col :span="3"><div>{{item.cumulativechg}}</div></el-col>
            <el-col :span="3"><div>{{item.pe}}</div></el-col>
            <el-col :span="3"><div></div></el-col>
        </el-row>
        <div class="noData text-center" v-if="!loading && (!toadyApply.listedtodaystocks || toadyApply.listedtodaystocks.length==0)">{{$t('hkList.noData')}}</div>
      </div>
    </el-card>

    <!-- 待上市 -->
    <el-card class="box-card unborder">
      <div slot="header" class="clearfix flex header toBeListed unborder">
        <i></i><strong>{{$t("hkList.toBeListed")}}</strong>
      </div>
      <el-row class="text-center list-h title" align="middle">
        <el-col :span="3"><div class="text-left">　{{$t("hkList.code")}}</div></el-col>
        <el-col :span="3"><div  class="text-left">{{$t("hkList.name")}}</div></el-col>
        <el-col :span="3"><div>发行价</div></el-col>
        <el-col :span="3"><div>申购上限</div></el-col>
        <el-col :span="3"><div>中签率</div></el-col>
        <el-col :span="3"><div>发行市盈率</div></el-col>
        <el-col :span="3"><div>上市日期</div></el-col>
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
            <el-col :span="3"><div>{{item.issueprice}}</div></el-col>
            <el-col :span="3"><div>{{item.purchaselimit}}</div></el-col>
            <el-col :span="3"><div>{{item.allocationrate}}</div></el-col>
            <el-col :span="3"><div>{{item.pe}}</div></el-col>
            <el-col :span="3"><div>{{item.listdate|formatDate('yyyy-MM-dd',lang)}}</div></el-col>
            <el-col :span="3"><div></div></el-col>
        </el-row>
        <div class="noData text-center" v-if="!loading && (!toadyApply.listingstocks || toadyApply.listingstocks.length==0)">{{$t('hkList.noData')}}</div>
      </div>
    </el-card>

    <!-- 即将发行 -->
    <el-card class="box-card unborder">
      <div slot="header" class="clearfix flex header apply unborder">
        <i></i>
        <strong class="textA">即将发行</strong>
      </div>
      <el-row class="text-center list-h title" align="middle">
        <el-col :span="3"><div class="text-left">　{{$t("hkList.code")}}</div></el-col>
        <el-col :span="3"><div  class="text-left">{{$t("hkList.name")}}</div></el-col>
        <el-col :span="3"><div>发行价</div></el-col>
        <el-col :span="3"><div>发行市盈率</div></el-col>
        <el-col :span="3"><div>申购日期</div></el-col>
        <el-col :span="3"><div></div></el-col>
        <el-col :span="3"><div></div></el-col>
        <el-col :span="3"><div></div></el-col>
      </el-row>
      <div v-loading="loading" element-loading-spinner="el-icon-loading" class="loadingWarp">
        <el-row  v-for="(item,index) in toadyApply.upcomingissuestocks" :key="index" 
        @dblclick.native="details(item.code)"  class="text-center list-h" :class="{'odd':index%2==1}" 
        align="middle">
            <el-col :span="3"><div class="text-left">
                <router-link :to="`/ipoMaterials/${item.code}`">　{{item.code|stockCode}}</router-link>
            </div></el-col>
            <el-col :span="3"><div  class="text-left">
                <router-link  :to="`/ipoMaterials/${item.code}`">{{item.name}}</router-link>
            </div></el-col>
            <el-col :span="3"><div>{{item.issueprice}}</div></el-col>
            <el-col :span="3"><div>{{item.pe}}</div></el-col>
            <el-col :span="3"><div>{{item.purchasedate|formatDate('yyyy-MM-dd',lang)}}</div></el-col>
            <el-col :span="3"><div></div></el-col>
            <el-col :span="3"><div></div></el-col>
            <el-col :span="3"><div></div></el-col>
        </el-row>
        <div class="noData text-center" v-if="!loading && (!toadyApply.upcomingissuestocks || toadyApply.upcomingissuestocks.length==0)">{{$t('hkList.noData')}}</div>
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
        <el-col :span="3"><div>{{$t("hkList.xj")}}</div></el-col>
        <el-col :span="3"><div>昨收价</div></el-col>
        <el-col :span="3"><div>发行价</div></el-col>
        <el-col :span="3"><div>累计涨跌幅</div></el-col>
        <el-col :span="3"><div>上市日期</div></el-col>
        <el-col :span="3"><div>发行市盈率</div></el-col>
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
            <el-col :span="3"><div>{{item.lastprice}}</div></el-col>
            <el-col :span="3"><div>{{item.prevclose}}</div></el-col>
            <el-col :span="3"><div>{{item.issueprice}}</div></el-col>
            <el-col :span="3"><div>{{item.cumulativechg}}</div></el-col>
            <el-col :span="3"><div>{{item.listdate|formatDate('yyyy-MM-dd',lang)}}</div></el-col>
            <el-col :span="3"><div>{{item.pe}}</div></el-col>
        </el-row>
        <div class="noData text-center" v-if="!loading && (!toadyApply.listedstocks || toadyApply.listedstocks.length==0)">{{$t('hkList.noData')}}</div>
      </div>
    </el-card>






  </div>
</template>

<script lang="ts">
import { Component, Vue} from 'vue-property-decorator';
import {ipoList,getMaterials} from '../../sys/request-service';
@Component
export default class HsList extends Vue {
    lang: string = this.$store.getters.lang;
    toadyApply: any = [];
    loading: boolean = true;
      
  
  mounted() {
      //请求ipo新股数据
     ipoList('mkt_hs').subscribe(res => {
         if(res){
           console.log(res);
           this.toadyApply = res;
         }
         this.loading = false;
    },err => {
        console.error(err);
    })
  }    
}
</script>

<style lang="scss">
#hkListPage{
    min-width: 7.5rem;
    overflow: auto;
}
#app .box-card{
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

</style>


