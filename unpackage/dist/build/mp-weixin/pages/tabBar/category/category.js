(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/tabBar/category/category"],{"074a":function(e,n,i){"use strict";var a,t=function(){var e=this,n=e.$createElement;e._self._c},o=[];i.d(n,"b",(function(){return t})),i.d(n,"c",(function(){return o})),i.d(n,"a",(function(){return a}))},"1f3b":function(e,n,i){"use strict";var a=i("b014"),t=i.n(a);t.a},"3fbd":function(e,n,i){"use strict";i.r(n);var a=i("074a"),t=i("c2e1");for(var o in t)"default"!==o&&function(e){i.d(n,e,(function(){return t[e]}))}(o);i("1f3b");var l,s=i("f0c5"),u=Object(s["a"])(t["default"],a["b"],a["c"],!1,null,null,null,!1,a["a"],l);n["default"]=u.exports},4224:function(e,n,i){"use strict";(function(e){Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var a=t(i("7092"));function t(e){return e&&e.__esModule?e:{default:e}}var o={data:function(){return{showCategoryIndex:0,headerPosition:"fixed",city:"北京",categoryList:[{id:1,title:"家用电器",banner:"/static/img/category/banner.jpg",list:[{name:"冰箱",img:"1.jpg"},{name:"电视",img:"2.jpg"},{name:"空调",img:"3.jpg"},{name:"洗衣机",img:"4.jpg"},{name:"风扇",img:"5.jpg"},{name:"燃气灶",img:"6.jpg"},{name:"热水器",img:"7.jpg"},{name:"电吹风",img:"8.jpg"},{name:"电饭煲",img:"9.jpg"}]},{id:2,title:"办公用品",banner:"/static/img/category/banner.jpg",list:[{name:"打印机",img:"1.jpg"},{name:"路由器",img:"2.jpg"},{name:"扫描仪",img:"3.jpg"},{name:"投影仪",img:"4.jpg"},{name:"墨盒",img:"5.jpg"},{name:"纸类",img:"6.jpg"}]},{id:3,title:"日常用品",banner:"/static/img/category/banner.jpg",list:[{name:"茶具",img:"1.jpg"},{name:"花瓶",img:"2.jpg"},{name:"纸巾",img:"3.jpg"},{name:"毛巾",img:"4.jpg"},{name:"牙膏",img:"5.jpg"},{name:"保鲜膜",img:"6.jpg"},{name:"保鲜袋",img:"7.jpg"}]},{id:4,title:"蔬菜水果",banner:"/static/img/category/banner.jpg",list:[{name:"苹果",img:"1.jpg"},{name:"芒果",img:"2.jpg"},{name:"椰子",img:"3.jpg"},{name:"橙子",img:"4.jpg"},{name:"奇异果",img:"5.jpg"},{name:"玉米",img:"6.jpg"},{name:"百香果",img:"7.jpg"}]}]}},onPageScroll:function(e){e.scrollTop>=0?this.headerPosition="fixed":this.headerPosition="absolute"},onLoad:function(){var e=this;this.amapPlugin=new a.default.AMapWX({key:"7c235a9ac4e25e482614c6b8eac6fd8e"}),this.amapPlugin.getRegeo({success:function(n){e.city=n[0].regeocodeData.addressComponent.city.replace(/市/g,"")}})},methods:{toMsg:function(){e.navigateTo({url:"../../msg/msg"})},showCategory:function(e){this.showCategoryIndex=e},toCategory:function(n){e.setStorageSync("catName",n.name),e.navigateTo({url:"../../goods/goods-list/goods-list?cid="+n.id+"&name="+n.name})},toSearch:function(){e.showToast({title:"建议跳转到新页面做搜索功能"})}}};n.default=o}).call(this,i("543d")["default"])},b014:function(e,n){throw new Error("Module build failed (from ./node_modules/mini-css-extract-plugin/dist/loader.js):\nModuleBuildError: Module build failed (from ./node_modules/sass-loader/dist/cjs.js):\nError: Cannot find module '/Applications/HBuilderX.app/Contents/HBuilderX/plugins/compile-node-sass/node_modules/node-sass-china'\n    at Function.Module._resolveFilename (module.js:547:15)\n    at Function.Module._resolveFilename (/Applications/HBuilderX.app/Contents/HBuilderX/plugins/uniapp-cli/node_modules/module-alias/index.js:49:29)\n    at Function.Module._load (module.js:474:25)\n    at Module.require (module.js:596:17)\n    at require (internal/module.js:11:18)\n    at getDefaultSassImplementation (/Applications/HBuilderX.app/Contents/HBuilderX/plugins/uniapp-cli/node_modules/sass-loader/dist/getDefaultSassImplementation.js:24:10)\n    at getSassImplementation (/Applications/HBuilderX.app/Contents/HBuilderX/plugins/uniapp-cli/node_modules/sass-loader/dist/getSassImplementation.js:19:72)\n    at Object.loader (/Applications/HBuilderX.app/Contents/HBuilderX/plugins/uniapp-cli/node_modules/sass-loader/dist/index.js:40:61)\n    at runLoaders (/Applications/HBuilderX.app/Contents/HBuilderX/plugins/uniapp-cli/node_modules/webpack/lib/NormalModule.js:301:20)\n    at /Applications/HBuilderX.app/Contents/HBuilderX/plugins/uniapp-cli/node_modules/loader-runner/lib/LoaderRunner.js:367:11\n    at /Applications/HBuilderX.app/Contents/HBuilderX/plugins/uniapp-cli/node_modules/loader-runner/lib/LoaderRunner.js:233:18\n    at runSyncOrAsync (/Applications/HBuilderX.app/Contents/HBuilderX/plugins/uniapp-cli/node_modules/loader-runner/lib/LoaderRunner.js:143:3)\n    at iterateNormalLoaders (/Applications/HBuilderX.app/Contents/HBuilderX/plugins/uniapp-cli/node_modules/loader-runner/lib/LoaderRunner.js:232:2)\n    at iterateNormalLoaders (/Applications/HBuilderX.app/Contents/HBuilderX/plugins/uniapp-cli/node_modules/loader-runner/lib/LoaderRunner.js:221:10)\n    at /Applications/HBuilderX.app/Contents/HBuilderX/plugins/uniapp-cli/node_modules/loader-runner/lib/LoaderRunner.js:236:3\n    at Object.context.callback (/Applications/HBuilderX.app/Contents/HBuilderX/plugins/uniapp-cli/node_modules/loader-runner/lib/LoaderRunner.js:111:13)\n    at Object.module.exports (/Applications/HBuilderX.app/Contents/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader/index.js:60:8)")},c2e1:function(e,n,i){"use strict";i.r(n);var a=i("4224"),t=i.n(a);for(var o in a)"default"!==o&&function(e){i.d(n,e,(function(){return a[e]}))}(o);n["default"]=t.a},f3cd:function(e,n,i){"use strict";(function(e){i("7784");a(i("66fd"));var n=a(i("3fbd"));function a(e){return e&&e.__esModule?e:{default:e}}e(n.default)}).call(this,i("543d")["createPage"])}},[["f3cd","common/runtime","common/vendor"]]]);