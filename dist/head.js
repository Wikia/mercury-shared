"use strict";window.Wikia={},window.Mercury={},window.mw={loader:{state:function(){}}},window.wgNow=new Date,void 0===window.M&&(window.M={}),function(e){var o=document.querySelector("#head-data-store"),t=JSON.parse(o.textContent);e.getFromHeadDataStore=function(e){var o=e.split("."),n=t,i=void 0,r=void 0;if(o.length>1){for(r=o.length,i=0;i<r;i++){if(!n.hasOwnProperty(o[i]))return;n=n[o[i]]}return n}return t[e]}}(window.M),function(e){var o="; "+document.cookie,t=o.split("; Geo="),n=void 0;2===t.length&&(n=decodeURIComponent(t.pop().split(";").shift())),n?e.geo=JSON.parse(n):"dev"===e.getFromHeadDataStore("wikiaEnv")?e.geo={country:"wikia-dev-country",continent:"wikia-dev-continent"}:console.debug("Geo cookie is not set")}(window.M),function(e){e.loadScript=function(e,o,t,n){var i=document.getElementsByTagName("script")[0],r=document.createElement("script");r.src=e,r.async=o,"function"==typeof t&&(r.onload=t),void 0!==n&&(r.crossOrigin=n),i.parentNode.insertBefore(r,i)}}(window.M);