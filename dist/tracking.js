"use strict";!function(e){e.trackingQueue.push(function(o){if(e.getFromHeadDataStore("noExternals")||!o)return void(window.trackQuantcastPageView=function(){});var t="https:"===document.location.protocol?"https://secure":"http://edge";e.loadScript(t+".quantserve.com/quant.js?"+Math.random(),!0);var n=e.getFromHeadDataStore("tracking.quantcast")||{};window.trackQuantcastPageView=function(){window._qevents=window._qevents||[],window.__qc&&(window.__qc.qpixelsent=[]),window._qevents.push({qacct:n.id,labels:n.labels}),console.info("Track pageView: Quantcast")},window.trackQuantcastPageView()})}(window.M),function(e){e.trackingQueue.push(function(o){if(e.getFromHeadDataStore("noExternals")||!o)return void(window.trackComscorePageView=function(){});var t="https:"===document.location.protocol?"https://sb":"http://b";e.loadScript(t+".scorecardresearch.com/beacon.js",!1),window._comscore=window._comscore||[],window.trackComscorePageView=function(){var o=e.getFromHeadDataStore("tracking.comscore")||{};window._comscore.push({c1:"2",c2:o.id,options:{url_append:o.keyword+"="+o.c7Value}}),window.COMSCORE&&window.COMSCORE.purge&&window.COMSCORE.purge(),console.info("Track pageView: Comscore")},window.trackComscorePageView()})}(window.M),function(e){e.getFromHeadDataStore("noExternals")||function(e,o,t,n,a,c,r){e.GoogleAnalyticsObject=a,e[a]=e[a]||function(){(e[a].q=e[a].q||[]).push(arguments)},e[a].l=1*new Date,c=o.createElement(t),r=o.getElementsByTagName(t)[0],c.async=1,c.src=n,r.parentNode.insertBefore(c,r)}(window,document,"script",e.getFromHeadDataStore("tracking.ua.scriptUrl"),"ga")}(window.M);