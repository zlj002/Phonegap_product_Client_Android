(function(e){var o=e.define;o("cordova/plugin/xg",function(e,o,r){var g=e("cordova/argscheck"),i=e("cordova/exec");o.register=function(e,o,r){g.checkArgs("AFF","xg.register",arguments);console.log("rigister xg userid>>["+e[0]+"]");if(!e){r&&r("请输入用户信息.")}else{i(o,r,"XG","register",e)}};o.unregister=function(e,o,r){g.checkArgs("AFF","xg.unregister",arguments);console.log("rigister xg userid>>["+e[0]+"]");if(!e){r&&r("请输入用户信息.")}else{i(o,r,"XG","unregister",e)}}});e.addConstructor(function(){if(!window.plugins){window.plugins={}}console.log("将插件注入cordovaXG...");window.plugins.xg=e.require("cordova/plugin/xg");console.log("xg注入结果："+typeof window.plugins.xg)})})(cordova);