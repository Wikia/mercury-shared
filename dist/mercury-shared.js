"use strict";var _typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e};!function(e){e.simpleExtend=function(e,n){var t={},i=void 0;for(i in e)Object.prototype.hasOwnProperty.call(e,i)&&(t[i]=e[i]);for(i in n)Object.prototype.hasOwnProperty.call(n,i)&&(t[i]=n[i]);return t}}(M),function(e){function n(){var n=e.getFromShoebox("wikiVariables");return{c:n.id,x:n.dbName,lc:n.language.content,u:parseInt(e.getFromShoebox("userId"),10)||0,s:"mercury",beacon:"",cb:Math.floor(99999*Math.random())}}function t(e,n){var t=[];return Object.keys(n).forEach(function(e){var i=n[e];if(null!==i){var o=encodeURIComponent(e)+"="+encodeURIComponent(i);t.push(o)}}),""+a+e+"?"+t.join("&")}function i(i,o){var a=e.simpleExtend(o,n());e.loadScript(t(i,a))}function o(n){i("view",e.simpleExtend({ga_category:"view"},n)),console.info("Track pageView: Internal")}var a="https://beacon.wikia-services.com/__track/";e.tracker.Internal={track:i,trackPageView:o,_createRequestURL:t},e.getFromShoebox("runtimeConfig.noExternals")||e.tracker.Internal.trackPageView({a:e.getFromShoebox("wikiPage.data.details.id"),n:e.getFromShoebox("wikiPage.data.ns")})}(window.M),function(e){function n(e,n,t){x.indexOf(e)===-1&&(ga("create",e,"auto",t),ga(n+"require","linker"),x.push(e))}function t(e){return e.prefix?e.prefix+".":""}function i(t){var i=e.getFromShoebox("runtimeConfig.gaUserIdHash")||"",o={name:"",allowLinker:!0,sampleRate:O[t].sampleRate,userId:i.length>0?i:null},a="",r=void 0;t!==j&&(r=O[t].prefix,a=r+".",o.name=r),n(O[t].id,a,o),ga(a+"linker:autoLink",["wikia.com"]),b.push(O[t])}function o(e){var n=w[e];return"function"==typeof n?n():n}function a(){E||(b.forEach(function(e){var n=t(e);Object.keys(w).forEach(function(e){ga(n+"set","dimension"+e,o(e))})}),E=!0)}function r(n,t){if(Object.keys(n).length)if(t===!0)E=!1,w=n;else{var i=e.simpleExtend({},n);w=e.simpleExtend(w,n),E=E&&Object.keys(i).length===Object.keys(w).length,E&&Object.keys(w).forEach(function(e){E=E&&i[e]===w[e]})}}function c(e,n){void 0!==n&&(w[e]=String(n),E=!1)}function l(e,n,i,o,r){S?(a(),b.forEach(function(a){if(a.prefix!==I){var c=t(a);ga(c+"send",{hitType:"event",eventCategory:e,eventAction:n,eventLabel:i,eventValue:o,nonInteraction:r})}})):k.push({category:e,action:n,label:i,value:o,nonInteractive:r})}function s(e,n,t,i,o){a(),ga(O[I].prefix+".send",{hitType:"event",eventCategory:e,eventAction:n,eventLabel:t,eventValue:i,nonInteraction:o})}function f(e){var n=["query"],t=e.replace(/^\?/,"").split("&").filter(function(e){return 0===n.indexOf(e.split("=")[0])}).reduce(function(e,n){return n},"");return t?"?"+t:""}function u(e){var n=document.createElement("a");n.href=e||window.location.href,b.forEach(function(e){var i=t(e);ga(i+"set","page",n.pathname+f(n.search))})}function p(e,n){_.forEach(function(e){c(e,"")}),"object"===(void 0===e?"undefined":_typeof(e))&&Object.keys(e).forEach(function(n){c(n,e[n])}),a(),u(n),b.forEach(function(e){var n=t(e);ga(n+"send","pageview")}),console.info("Track PageView: Universal Analytics")}function m(){var e=function(){var e=window.optimizely;return e&&e.activeExperiments&&Array.isArray(e.activeExperiments)&&e.activeExperiments.length>0&&"object"===_typeof(e.allExperiments)&&Object.keys(e.allExperiments).length>0&&"object"===_typeof(e.variationNamesMap)&&Object.keys(e.variationNamesMap).length>0}()?window.optimizely.activeExperiments:null;e&&e.forEach(function(e){if(optimizely.allExperiments.hasOwnProperty(e)&&"object"===_typeof(optimizely.allExperiments[e].universal_analytics)){var n=optimizely.allExperiments[e].universal_analytics.slot,t=optimizely.allExperiments[e].name,i=optimizely.variationNamesMap[e];w[n]="Optimizely "+t+" ("+e+"): "+i,E=!1}})}function g(){var e=window.Wikia&&window.Wikia.AbTest;if(e)for(var n=e.getExperiments(!0),t=0;t<n.length;t++){var i=n[t],o=e.getGASlot(i.name);if(i&&i.flags&&i.flags.ga_tracking&&o>=40&&o<=49){var a=n.nouuid?"NOBEACON":"NOT_IN_ANY_GROUP";w[o]=i.group?i.group.name:a,E=!1}}}function v(){k.forEach(function(e){l(e.category,e.action,e.label,e.value,e.nonInteractive)}),k=[]}function y(n){return void 0===n?(console.log("Cannot initialize UA; please provide dimensions"),!1):b.length?(console.log("Cannot initialize UA mutltiple times."),!1):(r(n),m(),g(),O=e.getFromShoebox("tracking.ua"),i(j),i(I),e.getFromShoebox("wikiVariables.isGASpecialWiki")&&i(A),S=!0,v(),!0)}function d(){b=[],x=[],E=!1}function h(){return E}var b=[],k=[],x=[],w={},E=!1,O=void 0,S=!1,_=[3,14,19,25],j="primary",A="special",I="ads";e.tracker.UniversalAnalytics={initialize:y,destroy:d,setDimension:c,track:l,trackAds:s,trackPageView:p,_setDimensions:r,_getDimensionsSynced:h,_updateTrackedUrl:u,_filterQueryParams:f,_dimensions:w}}(M),function(e){if(!e.getFromShoebox("runtimeConfig.noExternals")){var n=e.getFromShoebox("trackingDimensionsForFirstPage");if(n){var t=e.tracker.UniversalAnalytics;t.initialize(n)&&t.trackPageView({3:n[3],14:n[14],19:n[19],25:n[25]})}}}(M);