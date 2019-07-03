import Vue from 'vue';
import Vuex from 'vuex';
import {CookieConst, getCookie, setCookie, delCookie} from './cookieUtil';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    lang:getCookie(CookieConst.cookie_lang) || '',//语言  zh-cn  zh-hk  en-uk
    theme: getCookie(CookieConst.cookie_theme) || 'light',//主题   light   dark  
    loadedThemes:[],//已經加載的主题
    loadedLanguages:[],//已經加載的语言包
    settings:(window as any).SystemConfig
  },
  mutations: {
    res_lang(state: any,lang: string) {
      state.lang = lang || 'zh-TW';
      setCookie(CookieConst.cookie_lang,state.lang);
    },
    res_theme(state: any,theme: string) {
        state.theme = theme  || 'light';
        if ( !state.loadedThemes.includes(theme)) {
            require(`@/assets/scss/theme/${theme}/index.css`);
            state.loadedThemes.push(theme);
        }
        setCookie(CookieConst.cookie_theme,state.theme);
        document.getElementsByTagName('body')[0].setAttribute('class', 'theme-' + theme);
    }

  },
  actions: {
    async getLang(context: any,lang?: string,callback?: any) {
      context.commit('res_lang', lang,() => {
          if(callback) {
              callback();
          }
      })
    },
    async getTheme(commit: any, state: any) {
        const theme = state.theme;
        commit('res_theme',theme)
    }
  },
  getters: {
    theme(state: any) {
      return state.theme;
    },
    lang(state: any) {
        return state.lang;
    },
    settings() {
        return (window as any).SystemConfig;
    }
  },
});
