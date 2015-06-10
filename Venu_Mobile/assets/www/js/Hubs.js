(function(e,n,t){"use strict";if(typeof e.signalR!=="function"){throw new Error("SignalR: SignalR is not loaded. Please ensure jquery.signalR-x.js is referenced before ~/signalr/js.")}var r=e.signalR;function a(n,t){return function(){t.apply(n,e.makeArray(arguments))}}function u(n,t){var r,u,i,o,c;for(r in n){if(n.hasOwnProperty(r)){u=n[r];if(!u.hubName){continue}if(t){c=u.on}else{c=u.off}for(i in u.client){if(u.client.hasOwnProperty(i)){o=u.client[i];if(!e.isFunction(o)){continue}c.call(u,i,a(u,o))}}}}}e.hubConnection.prototype.createHubProxies=function(){var n={};this.starting(function(){u(n,true);this._registerSubscribedHubs()}).disconnected(function(){u(n,false)});n.chatHub=this.createHubProxy("chatHub");n.chatHub.client={};n.chatHub.server={registClientID:function(t,r,a,u,i,o){return n.chatHub.invoke.apply(n.chatHub,e.merge(["RegistClientID"],e.makeArray(arguments)))},registGroupID:function(t){return n.chatHub.invoke.apply(n.chatHub,e.merge(["RegistGroupID"],e.makeArray(arguments)))},sendMessageOneToGroup:function(t,r,a,u){return n.chatHub.invoke.apply(n.chatHub,e.merge(["SendMessageOneToGroup"],e.makeArray(arguments)))},sendMessageOneToOne:function(t,r,a,u){return n.chatHub.invoke.apply(n.chatHub,e.merge(["SendMessageOneToOne"],e.makeArray(arguments)))},sendNotice:function(t,r){return n.chatHub.invoke.apply(n.chatHub,e.merge(["SendNotice"],e.makeArray(arguments)))},sendNoticeToGroup:function(t,r){return n.chatHub.invoke.apply(n.chatHub,e.merge(["SendNoticeToGroup"],e.makeArray(arguments)))},sendNoticeToOne:function(t,r){return n.chatHub.invoke.apply(n.chatHub,e.merge(["SendNoticeToOne"],e.makeArray(arguments)))}};return n};r.hub=e.hubConnection("/signalr",{useDefaultPath:false});e.extend(r,r.hub.createHubProxies())})(window.jQuery,window);