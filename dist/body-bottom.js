"use strict";var _typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e};!function(e){e.cookie={get:function(e){var n=("; "+document.cookie).split("; "+e+"=");return 2===n.length?n.pop().split(";").shift():null}}}(window.M),function(e){e.simpleExtend=function(e,n){var t={},o=void 0;for(o in e)Object.prototype.hasOwnProperty.call(e,o)&&(t[o]=e[o]);for(o in n)Object.prototype.hasOwnProperty.call(n,o)&&(t[o]=n[o]);return t}}(window.M),function(e){function n(n){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"mercury",o=e.getFromHeadDataStore("wikiVariables"),i=e.cookie.get("wikia_beacon_id"),a={c:o.id,x:o.dbName,lc:o.language.content,u:-1,s:t,beacon:i,cb:Math.floor(99999*Math.random())};return n&&(a.u=parseInt(e.getFromHeadDataStore("userId"),10)||0),a}function t(){return"xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g,function(e){var n=16*Math.random()|0;return("x"===e?n:3&n|8).toString(16)})}function o(e,n){var t=[];return Object.keys(n).forEach(function(e){var o=n[e];if(null!==o){var i=encodeURIComponent(e)+"="+encodeURIComponent(o);t.push(i)}}),""+r+e+"?"+t.join("&")}function i(t,i,a,r){var c=e.simpleExtend(i,n(a,r));e.loadScript(o(t,c))}function a(n,o){var a=e.cookie.get("tracking_session_id"),r=e.cookie.get("pv_number"),c=e.cookie.get("pv_number_global"),u=e.getFromHeadDataStore("cookieDomain"),s=e.getFromHeadDataStore("wikiVariables.scriptPath"),l=new Date;window.pvUID=t(),window.sessionId=a||t(),window.pvNumber=r?parseInt(r,10)+1:1,window.pvNumberGlobal=c?parseInt(c,10)+1:1,l=new Date(l.getTime()+18e5),document.cookie="tracking_session_id="+window.sessionId+"; expires="+l.toGMTString()+";domain="+u+"; path=/;",document.cookie="pv_number="+window.pvNumber+"; expires="+l.toGMTString()+"; path="+s+";",document.cookie="pv_number_global="+window.pvNumberGlobal+"; expires="+l.toGMTString()+";domain="+u+"; path=/;",i("view",e.simpleExtend({ga_category:"view",session_id:window.sessionId,pv_unique_id:window.pvUID,pv_number:window.pvNumber,pv_number_global:window.pvNumberGlobal},n),o),console.info("Track pageView: Internal")}var r="https://beacon.wikia-services.com/__track/";void 0===e.tracker&&(e.tracker={}),e.tracker.Internal={track:i,trackPageView:a,_createRequestURL:o}}(window.M),function(e){function n(e,n,t){-1===h.indexOf(e)&&(ga("create",e,"auto",t),ga(n+"require","linker"),h.push(e))}function t(e){return e.prefix?e.prefix+".":""}function o(t,o){if(E[t]){var i=E[t],a=e.getFromHeadDataStore("gaUserIdHash")||"",r={allowLinker:!0,name:"",sampleRate:i.sampleRate,useAmpClientId:!0,userId:a.length>0?a:null},c="",u=void 0;t!==D&&(u=i.prefix,c=u+".",r.name=u),n(i.id,c,r),o&&ga(c+"set","anonymizeIp",!0),ga(c+"linker:autoLink",["wikia.com"]),(t===D||i.default)&&b.push(i),k.push(i)}}function i(e){var n=_[e];return"function"==typeof n?n():n}function a(){I||(k.forEach(function(e){var n=t(e);Object.keys(_).forEach(function(e){ga(n+"set","dimension"+e,i(e))})}),I=!0)}function r(n,t){if(Object.keys(n).length)if(!0===t)I=!1,_=n;else{var o=e.simpleExtend({},n);_=e.simpleExtend(_,n),I=I&&Object.keys(o).length===Object.keys(_).length,I&&Object.keys(_).forEach(function(e){I=I&&o[e]===_[e]})}}function c(e,n){void 0!==n&&(_[e]=String(n),I=!1)}function u(e,n,o,i,r){S?(a(),b.forEach(function(a){var c=t(a);ga(c+"send",{hitType:"event",eventCategory:e,eventAction:n,eventLabel:o,eventValue:i,nonInteraction:r})})):y.push({category:e,action:n,label:o,value:i,nonInteractive:r})}function s(e,n,t,o,i,r){S?(a(),ga(e+".send",{hitType:"event",eventCategory:n,eventAction:t,eventLabel:o,eventValue:i,nonInteraction:r})):y.push({prefix:e,category:n,action:t,label:o,value:i,nonInteractive:r})}function l(e,n,t,o,i){s(E[T].prefix,e,n,t,o,i)}function f(e){var n=["query"],t=e.replace(/^\?/,"").split("&").filter(function(e){return 0===n.indexOf(e.split("=")[0])}).reduce(function(e,n){return n},"");return t?"?"+t:""}function p(e){var n=document.createElement("a");n.href=e||window.location.href,k.forEach(function(e){var o=t(e);ga(o+"set","page",n.pathname+f(n.search))})}function d(e,n){O.forEach(function(e){c(e,"")}),"object"===(void 0===e?"undefined":_typeof(e))&&Object.keys(e).forEach(function(n){c(n,e[n])}),a(),p(n),k.forEach(function(e){var n=t(e);e.preventTrackPageView||ga(n+"send","pageview")}),console.info("Track PageView: Universal Analytics")}function v(){var e=window.Wikia&&window.Wikia.AbTest;if(e)for(var n=e.getExperiments(!0),t=0;t<n.length;t++){var o=n[t],i=e.getGASlot(o.name);if(o&&o.flags&&o.flags.ga_tracking&&i>=40&&i<=49){var a=n.nouuid?"NOBEACON":"NOT_IN_ANY_GROUP";_[i]=o.group?o.group.name:a,I=!1}}}function g(){y.forEach(function(e){e.prefix?s(e.prefix,e.category,e.action,e.label,e.value,e.nonInteractive):u(e.category,e.action,e.label,e.value,e.nonInteractive)}),y=[]}function m(n,t){return void 0===n?(console.log("Cannot initialize UA; please provide dimensions"),!1):k.length?(console.log("Cannot initialize UA mutltiple times."),!1):(r(n),v(),E=e.getFromHeadDataStore("tracking.ua.accounts"),Object.keys(E).forEach(function(e){o(e,t)}),S=!0,g(),!0)}function w(){b=[],h=[],I=!1}function x(){return I}var b=[],k=[],y=[],h=[],_={},I=!1,E=void 0,S=!1,O=[3,14,19,25],D="primary",T="ads";void 0===e.tracker&&(e.tracker={}),e.tracker.UniversalAnalytics={initialize:m,destroy:w,setDimension:c,track:u,trackTo:s,trackAds:l,trackPageView:d,_setDimensions:r,_getDimensionsSynced:x,_updateTrackedUrl:p,_filterQueryParams:f,_dimensions:_}}(window.M);