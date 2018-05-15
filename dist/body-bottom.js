"use strict";var _typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e};!function(e){e.cookie={get:function(e){var n=("; "+document.cookie).split("; "+e+"=");return 2===n.length?n.pop().split(";").shift():null}}}(window.M),function(e){e.simpleExtend=function(e,n){var t={},o=void 0;for(o in e)Object.prototype.hasOwnProperty.call(e,o)&&(t[o]=e[o]);for(o in n)Object.prototype.hasOwnProperty.call(n,o)&&(t[o]=n[o]);return t}}(window.M),function(e){function n(){var n=e.getFromHeadDataStore("wikiVariables"),t=e.cookie.get("wikia_beacon_id");return{c:n.id,x:n.dbName,lc:n.language.content,u:parseInt(e.getFromHeadDataStore("userId"),10)||0,s:"mercury",beacon:t,cb:Math.floor(99999*Math.random())}}function t(){return"xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g,function(e){var n=16*Math.random()|0;return("x"===e?n:3&n|8).toString(16)})}function o(e,n){var t=[];return Object.keys(n).forEach(function(e){var o=n[e];if(null!==o){var i=encodeURIComponent(e)+"="+encodeURIComponent(o);t.push(i)}}),""+a+e+"?"+t.join("&")}function i(t,i,r){if(r){var a=e.simpleExtend(i,n());e.loadScript(o(t,a))}}function r(n,o){if(o){var r=e.cookie.get("tracking_session_id"),a=e.cookie.get("pv_number"),c=e.cookie.get("pv_number_global"),u=e.getFromHeadDataStore("cookieDomain"),s=new Date;window.pvUID=t(),window.sessionId=r||t(),window.pvNumber=a?parseInt(a,10)+1:1,window.pvNumberGlobal=c?parseInt(c,10)+1:1,s=new Date(s.getTime()+18e5),document.cookie="tracking_session_id="+window.sessionId+"; expires="+s.toGMTString()+";domain="+u+"; path=/;",document.cookie="pv_number="+window.pvNumber+"; expires="+s.toGMTString()+"; path=/;",document.cookie="pv_number_global="+window.pvNumberGlobal+"; expires="+s.toGMTString()+";domain="+u+"; path=/;",i("view",e.simpleExtend({ga_category:"view",session_id:window.sessionId,pv_unique_id:window.pvUID,pv_number:window.pvNumber,pv_number_global:window.pvNumberGlobal},n)),console.info("Track pageView: Internal")}}var a="https://beacon.wikia-services.com/__track/";void 0===e.tracker&&(e.tracker={}),e.tracker.Internal={track:i,trackPageView:r,_createRequestURL:o}}(window.M),function(e){function n(e,n,t){-1===k.indexOf(e)&&(ga("create",e,"auto",t),ga(n+"require","linker"),k.push(e))}function t(e){return e.prefix?e.prefix+".":""}function o(t){if(_[t]){var o=e.getFromHeadDataStore("gaUserIdHash")||"",i={allowLinker:!0,name:"",sampleRate:_[t].sampleRate,useAmpClientId:!0,userId:o.length>0?o:null},r="",a=void 0;t!==S&&(a=_[t].prefix,r=a+".",i.name=a),n(_[t].id,r,i),ga(r+"linker:autoLink",["wikia.com"]),x.push(_[t])}}function i(e){var n=y[e];return"function"==typeof n?n():n}function r(){h||(x.forEach(function(e){var n=t(e);Object.keys(y).forEach(function(e){ga(n+"set","dimension"+e,i(e))})}),h=!0)}function a(n,t){if(Object.keys(n).length)if(!0===t)h=!1,y=n;else{var o=e.simpleExtend({},n);y=e.simpleExtend(y,n),h=h&&Object.keys(o).length===Object.keys(y).length,h&&Object.keys(y).forEach(function(e){h=h&&o[e]===y[e]})}}function c(e,n){void 0!==n&&(y[e]=String(n),h=!1)}function u(e,n,o,i,a){I?(r(),x.forEach(function(r){if(r.prefix!==O){var c=t(r);ga(c+"send",{hitType:"event",eventCategory:e,eventAction:n,eventLabel:o,eventValue:i,nonInteraction:a})}})):b.push({category:e,action:n,label:o,value:i,nonInteractive:a})}function s(e,n,t,o,i){r(),ga(_[O].prefix+".send",{hitType:"event",eventCategory:e,eventAction:n,eventLabel:t,eventValue:o,nonInteraction:i})}function l(e){var n=["query"],t=e.replace(/^\?/,"").split("&").filter(function(e){return 0===n.indexOf(e.split("=")[0])}).reduce(function(e,n){return n},"");return t?"?"+t:""}function f(e){var n=document.createElement("a");n.href=e||window.location.href,x.forEach(function(e){var o=t(e);ga(o+"set","page",n.pathname+l(n.search))})}function p(e,n){E.forEach(function(e){c(e,"")}),"object"===(void 0===e?"undefined":_typeof(e))&&Object.keys(e).forEach(function(n){c(n,e[n])}),r(),f(n),x.forEach(function(e){var n=t(e);ga(n+"send","pageview")}),console.info("Track PageView: Universal Analytics")}function d(){var e=window.Wikia&&window.Wikia.AbTest;if(e)for(var n=e.getExperiments(!0),t=0;t<n.length;t++){var o=n[t],i=e.getGASlot(o.name);if(o&&o.flags&&o.flags.ga_tracking&&i>=40&&i<=49){var r=n.nouuid?"NOBEACON":"NOT_IN_ANY_GROUP";y[i]=o.group?o.group.name:r,h=!1}}}function v(){b.forEach(function(e){u(e.category,e.action,e.label,e.value,e.nonInteractive)}),b=[]}function m(n,t){return void 0===n?(console.log("Cannot initialize UA; please provide dimensions"),!1):x.length?(console.log("Cannot initialize UA mutltiple times."),!1):(t&&ga("set","anonymizeIp",!0),a(n),d(),_=e.getFromHeadDataStore("tracking.ua"),o(S),o(O),I=!0,v(),!0)}function g(){x=[],k=[],h=!1}function w(){return h}var x=[],b=[],k=[],y={},h=!1,_=void 0,I=!1,E=[3,14,19,25],S="primary",O="ads";void 0===e.tracker&&(e.tracker={}),e.tracker.UniversalAnalytics={initialize:m,destroy:g,setDimension:c,track:u,trackAds:s,trackPageView:p,_setDimensions:a,_getDimensionsSynced:w,_updateTrackedUrl:f,_filterQueryParams:l,_dimensions:y}}(window.M);