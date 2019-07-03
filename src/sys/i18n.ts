import Vue from 'vue'
// import VueI18n, { LocaleMessages } from 'vue-i18n'
import VueI18n from 'vue-i18n'
import router from './router'
import store from './store'

Vue.use(VueI18n)

const i18n = new VueI18n({
  locale: store.state.lang || process.env.VUE_APP_I18N_LOCALE, // 语言标识
  // fallbackLocale: 'en',
  // messages: message
  silentTranslationWarn:true
});
   
  function setI18nLanguage(lang: string) {
      i18n.locale = lang;
      store.commit('res_lang',lang);
      document.getElementsByTagName('html')[0].setAttribute('lang', lang);
      return lang;
  }
  
  //////////////////加载语言
function loadLanguageAsync(lang: string) {
    //zh-CN  zh-TW  en-US
    if ( !store.state.loadedLanguages.includes(lang)) {

      return import(`@/assets/locales/${lang}`).then(msgs => {
          i18n.setLocaleMessage(lang, msgs.default)
          store.state.loadedLanguages.push(lang)
          return setI18nLanguage(lang)
      })
  
    }
      return Promise.resolve(lang)
  }
  
  ////////////////////////////加载主题
  function loadTheme(theme: string) {
      if ( !store.state.loadedThemes.includes(theme)) {
        import(`@/assets/scss/theme/${theme}/index.css`).then(msg => {
          store.state.loadedThemes.push(theme);
          store.commit('res_theme', theme);
        })
      }
  }
  
  router.beforeEach((to, from, next) => {
      let lang = to.params.lang || to.query.lang || store.state.lang || 'zh-hk';
      const theme = to.params.theme || to.query.theme || store.state.theme || 'light';
      switch(lang) {
        case 'zh-cn': lang = 'zh-CN';break;
        case 'zh-hk':lang = 'zh-TW';break;
        case 'en-uk':lang = 'en-US';break;
        case 'zh-CN':
        case "zh-TW":
        case "en-US":break;
        default: lang = 'zh-TW';
      }
      loadLanguageAsync(lang).then(() => {next()})
      loadTheme(theme)
      const langs = to.query.lang;
      const themes = to.query.theme;
      if(langs && (langs !== store.state.lang)) {
          store.commit('res_lang', langs);
      }
      if(themes && (themes !== store.state.theme)) {
          store.commit('res_theme', themes);
      }
  })
  
export default i18n;
