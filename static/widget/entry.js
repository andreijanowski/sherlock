!function(e){var t={};function n(o){if(t[o])return t[o].exports;var r=t[o]={i:o,l:!1,exports:{}};return e[o].call(r.exports,r,r.exports,n),r.l=!0,r.exports}n.m=e,n.c=t,n.d=function(e,t,o){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:o})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var o=Object.create(null);if(n.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)n.d(o,r,function(t){return e[t]}.bind(null,r));return o},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="https://sherlock.staging.devguru.co/static/widget",n(n.s=115)}({115:function(e,t,n){e.exports=n(116)},116:function(e,t,n){"use strict";var o=n(20);window.foodetectiveWidget={},window.foodetectiveWidget.init=function(e,t,n,r){var i=document.getElementById(n)||document.body,u=document.createElement("iframe");u.style="width:100%;height:100%;min-height:12rem;border:0",u.src="".concat(o.APP_URL,"/index.html?data=").concat(encodeURI(JSON.stringify({language:r||navigator.language,origin:window.location.origin,apiKey:t,widgetId:e}))),i.appendChild(u)}},20:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.NETGURU_DEV_PASSWORD=t.APP_URL=t.API_URL=void 0,t.API_URL="https://611.thefooddetective.integration.devguru.co",t.APP_URL="https://sherlock.staging.devguru.co/static/widget",t.NETGURU_DEV_PASSWORD=""}});