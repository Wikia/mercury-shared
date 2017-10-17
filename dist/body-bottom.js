"use strict";var _typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e};!function(e){e.cookie={get:function(e){var n=("; "+document.cookie).split("; "+e+"=");return 2===n.length?n.pop().split(";").shift():null}}}(window.M),function(e){e.simpleExtend=function(e,n){var t={},i=void 0;for(i in e)Object.prototype.hasOwnProperty.call(e,i)&&(t[i]=e[i]);for(i in n)Object.prototype.hasOwnProperty.call(n,i)&&(t[i]=n[i]);return t}}(window.M),function(e){function n(){var n=e.getFromShoebox("applicationData.wikiVariables"),t=e.cookie.get("wikia_beacon_id");return{c:n.id,x:n.dbName,lc:n.language.content,u:parseInt(e.getFromShoebox("userId"),10)||0,s:"mercury",beacon:t,cb:Math.floor(99999*Math.random())}}function t(){return"xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g,function(e){var n=16*Math.random()|0;return("x"===e?n:3&n|8).toString(16)})}function i(e,n){var t=[];return Object.keys(n).forEach(function(e){var i=n[e];if(null!==i){var o=encodeURIComponent(e)+"="+encodeURIComponent(i);t.push(o)}}),""+r+e+"?"+t.join("&")}function o(t,o){var a=e.simpleExtend(o,n());e.loadScript(i(t,a))}function a(n){var i=e.cookie.get("tracking_session_id"),a=e.cookie.get("pv_number"),r=e.cookie.get("pv_number_global"),c=e.getFromShoebox("runtimeConfig.cookieDomain"),l=new Date;window.pvUID=t(),window.sessionId=i||t(),window.pvNumber=a?parseInt(a,10)+1:1,window.pvNumberGlobal=r?parseInt(r,10)+1:1,l=new Date(l.getTime()+18e5),document.cookie="tracking_session_id="+window.sessionId+"; expires="+l.toGMTString()+";domain="+c+"; path=/;",document.cookie="pv_number="+window.pvNumber+"; expires="+l.toGMTString()+"; path=/;",document.cookie="pv_number_global="+window.pvNumberGlobal+"; expires="+l.toGMTString()+";domain="+c+"; path=/;",o("view",e.simpleExtend({ga_category:"view",session_id:window.sessionId,pv_unique_id:window.pvUID,pv_number:window.pvNumber,pv_number_global:window.pvNumberGlobal},n)),console.info("Track pageView: Internal")}var r="https://beacon.wikia-services.com/__track/";void 0===e.tracker&&(e.tracker={}),e.tracker.Internal={track:o,trackPageView:a,_createRequestURL:i}}(window.M),function(e){function n(e,n,t){-1===k.indexOf(e)&&(ga("create",e,"auto",t),ga(n+"require","linker"),k.push(e))}function t(e){return e.prefix?e.prefix+".":""}function i(t){var i=e.getFromShoebox("runtimeConfig.gaUserIdHash")||"",o={allowLinker:!0,name:"",sampleRate:E[t].sampleRate,useAmpClientId:!0,userId:i.length>0?i:null},a="",r=void 0;t!==S&&(r=E[t].prefix,a=r+".",o.name=r),n(E[t].id,a,o),ga(a+"linker:autoLink",["wikia.com"]),b.push(E[t])}function o(e){var n=h[e];return"function"==typeof n?n():n}function a(){_||(b.forEach(function(e){var n=t(e);Object.keys(h).forEach(function(e){ga(n+"set","dimension"+e,o(e))})}),_=!0)}function r(n,t){if(Object.keys(n).length)if(!0===t)_=!1,h=n;else{var i=e.simpleExtend({},n);h=e.simpleExtend(h,n),_=_&&Object.keys(i).length===Object.keys(h).length,_&&Object.keys(h).forEach(function(e){_=_&&i[e]===h[e]})}}function c(e,n){void 0!==n&&(h[e]=String(n),_=!1)}function l(e,n,i,o,r){I?(a(),b.forEach(function(a){if(a.prefix!==A){var c=t(a);ga(c+"send",{hitType:"event",eventCategory:e,eventAction:n,eventLabel:i,eventValue:o,nonInteraction:r})}})):w.push({category:e,action:n,label:i,value:o,nonInteractive:r})}function s(e,n,t,i,o){a(),ga(E[A].prefix+".send",{hitType:"event",eventCategory:e,eventAction:n,eventLabel:t,eventValue:i,nonInteraction:o})}function u(e){var n=["query"],t=e.replace(/^\?/,"").split("&").filter(function(e){return 0===n.indexOf(e.split("=")[0])}).reduce(function(e,n){return n},"");return t?"?"+t:""}function p(e){var n=document.createElement("a");n.href=e||window.location.href,b.forEach(function(e){var i=t(e);ga(i+"set","page",n.pathname+u(n.search))})}function f(e,n){O.forEach(function(e){c(e,"")}),"object"===(void 0===e?"undefined":_typeof(e))&&Object.keys(e).forEach(function(n){c(n,e[n])}),a(),p(n),b.forEach(function(e){var n=t(e);ga(n+"send","pageview")}),console.info("Track PageView: Universal Analytics")}function m(){var e=function(){var e=window.optimizely;return e&&e.activeExperiments&&Array.isArray(e.activeExperiments)&&e.activeExperiments.length>0&&"object"===_typeof(e.allExperiments)&&Object.keys(e.allExperiments).length>0&&"object"===_typeof(e.variationNamesMap)&&Object.keys(e.variationNamesMap).length>0}()?window.optimizely.activeExperiments:null;e&&e.forEach(function(e){if(optimizely.allExperiments.hasOwnProperty(e)&&"object"===_typeof(optimizely.allExperiments[e].universal_analytics)){var n=optimizely.allExperiments[e].universal_analytics.slot,t=optimizely.allExperiments[e].name,i=optimizely.variationNamesMap[e];h[n]="Optimizely "+t+" ("+e+"): "+i,_=!1}})}function v(){var e=window.Wikia&&window.Wikia.AbTest;if(e)for(var n=e.getExperiments(!0),t=0;t<n.length;t++){var i=n[t],o=e.getGASlot(i.name);if(i&&i.flags&&i.flags.ga_tracking&&o>=40&&o<=49){var a=n.nouuid?"NOBEACON":"NOT_IN_ANY_GROUP";h[o]=i.group?i.group.name:a,_=!1}}}function d(){w.forEach(function(e){l(e.category,e.action,e.label,e.value,e.nonInteractive)}),w=[]}function g(n){return void 0===n?(console.log("Cannot initialize UA; please provide dimensions"),!1):b.length?(console.log("Cannot initialize UA mutltiple times."),!1):(r(n),m(),v(),E=e.getFromShoebox("tracking.ua"),i(S),i(A),e.getFromShoebox("applicationData.wikiVariables.isGASpecialWiki")&&i(j),I=!0,d(),!0)}function x(){b=[],k=[],_=!1}function y(){return _}var b=[],w=[],k=[],h={},_=!1,E=void 0,I=!1,O=[3,14,19,25],S="primary",j="special",A="ads";void 0===e.tracker&&(e.tracker={}),e.tracker.UniversalAnalytics={initialize:g,destroy:x,setDimension:c,track:l,trackAds:s,trackPageView:f,_setDimensions:r,_getDimensionsSynced:y,_updateTrackedUrl:p,_filterQueryParams:u,_dimensions:h}}(window.M);