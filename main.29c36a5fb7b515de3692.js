!function(e){function t(r){if(n[r])return n[r].exports;var i=n[r]={i:r,l:!1,exports:{}};return e[r].call(i.exports,i,i.exports,t),i.l=!0,i.exports}var n={};t.m=e,t.c=n,t.d=function(e,n,r){t.o(e,n)||Object.defineProperty(e,n,{configurable:!1,enumerable:!0,get:r})},t.n=function(e){var n=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(n,"a",n),n},t.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},t.p="./",t(t.s=0)}([function(e,t,n){"use strict";function r(e,t){e&&(document.getElementById("coding-container").innerHTML=e.template||"","function"==typeof e.created&&e.created())}var i=n(1),o=n(2),a=function(e){return e&&e.__esModule?e:{default:e}}(o);new i.Router([{path:"/waterfall",component:a.default},{path:"/module1",component:{template:"test"}},{path:"/module2/:name"},{path:"*",component:{}}],r)},function(e,t,n){"use strict";function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(t,"__esModule",{value:!0});var i=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}();t.Router=function(){function e(t,n){if(r(this,e),!Array.isArray(t))throw new Error("routerTable must be an Array.");if("function"!=typeof n)throw new Error("render must be a function.");var i=t.findIndex(function(e){return"*"===e.path});-1!==i&&(this.defaultRouter=t[i],t.splice(i,1)),this.routes=t,this.render=n,this.init()}return i(e,[{key:"init",value:function(){if(!("onhashchange"in window))throw new Error("sorry, your browser doesn't support router.");window.onhashchange=this.onChange.bind(this),this.onChange()}},{key:"getRegExp",value:function(e){var t=/\((.*?)\)/g,n=/(\(\?)?:\w+/g,r=/\*\w+/g,i=/[\-{}\[\]+?.,\\\^$|#\s]/g;return e=e.replace(i,"\\$&").replace(t,"(?:$1)?").replace(n,function(e,t){return t?e:"([^/?]+)"}).replace(r,"([^?]*?)"),new RegExp("^"+e+"(?:\\?([\\s\\S]*))?$")}},{key:"onChange",value:function(e){var t=this,n=window.location.hash.replace(/.*#/,"");!(!!n&&this.routes.some(function(e){var r=t.getRegExp(e.path),i=r.exec(n);if(i&&i[0]&&""!=i[0])return t.routerItemCallback(e,i.slice(1,-1)),!0}))&&this.defaultRouter&&this.routerItemCallback(this.defaultRouter)}},{key:"routerItemCallback",value:function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:[],n=e.render||this.render;if("function"!=typeof n)throw new Error("render must be a function.");n(e.component,t)}}]),e}()},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=n(3);t.default={template:'<div id="container" style="height: 100%;"></div>',created:function(){for(var e=new r.Waterfall({container:document.getElementById("container"),grid:5}),t=[],n=0;n<=11;n++)n<10&&(n="0"+n),t.push("./static/P_0"+n+".jpg");e.on("load",function(){console.log("load"),e.append(t)}),window.abc=e}}},function(e,t,n){"use strict";function r(e){if(Array.isArray(e)){for(var t=0,n=Array(e.length);t<e.length;t++)n[t]=e[t];return n}return Array.from(e)}function i(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function o(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function a(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0}),t.Waterfall=void 0;var u=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),c=n(4),l=0,s=0;t.Waterfall=function(e){function t(e){var n=e.container,r=e.grid,a=void 0===r?4:r,u=e.gutter,c=void 0===u?20:u;if(i(this,t),"number"!=typeof a||"number"!=typeof c)throw new Error("grid && gutter must be a number.");if(!n)throw new Error("container must be defined.");if(!n.offsetWidth||!n.offsetHeight)throw new Error("container needs height and width.");var l=o(this,(t.__proto__||Object.getPrototypeOf(t)).call(this));return l.container=n,l.grid=a,l.gridWidth=Math.floor(l.container.offsetWidth/l.grid),l.heightArr=[],l.gutter=c,l.containerInit(),l}return a(t,e),u(t,[{key:"containerInit",value:function(){var e=this;this.container.style.position="relative",this.container.style.overflow="auto",this.container.addEventListener("scroll",function(){e._timer&&clearTimeout(e._timer),e._timer=setTimeout(function(){e.assertTotallyScrolled()&&e.emit("load")},300)}),setTimeout(function(){e.emit("load")},0)}},{key:"append",value:function(e){var t=this;if(!Array.isArray(e))throw new Error("argument must be an Array.");l=e.length,e.forEach(function(e,n){return t.createBoxDom(e)})}},{key:"onload",value:function(e,t){var n=this.getPosition(),r=n.left,i=n.top;e.style.position="absolute",e.style.left=r+"px",e.style.top=i+"px",e.style.width=this.gridWidth+"px",e.style.boxSizing="border-box",e.style.padding=this.gutter/2+"px",this.container.appendChild(e),this.increaseHeightArr(t.height+this.gutter,r/this.gridWidth),this.finally()}},{key:"getPosition",value:function(){var e=this.heightArr.length<this.grid,t=e?0:Math.min.apply(Math,r(this.heightArr));return{left:this.gridWidth*(e?this.heightArr.length:this.heightArr.indexOf(t)),top:t}}},{key:"createBoxDom",value:function(e){var t=this,n=document.createElement("div"),r=new Image;return n.setAttribute("class","box"),n.appendChild(r),r.onload=function(){return t.onload(n,r)},r.onerror=function(){return t.finally()},r.src=e,r.style.width="100%",r.style.height="auto",n}},{key:"finally",value:function(){if(++s===l){console.log("loaded");var e=Math.max.apply(Math,r(this.heightArr));(this.heightArr.length<this.grid||e<=this.container.offsetHeight)&&this.emit("load")}}},{key:"increaseHeightArr",value:function(e,t){"number"!=typeof this.heightArr[t]?this.heightArr[t]=+e:this.heightArr[t]+=+e}},{key:"assertTotallyScrolled",value:function(){return this.container&&this.container.scrollHeight-this.container.scrollTop===this.container.clientHeight}}]),t}(c.EventEmitter)},function(e,t,n){"use strict";function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(t,"__esModule",{value:!0});var i=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}();t.EventEmitter=function(){function e(){r(this,e),this._events={}}return i(e,[{key:"on",value:function(e,t){if(!e||"string"!=typeof e)throw new Error("event is unvalidated.");if("function"!=typeof t)throw new Error("handler must be a function.");var n=this._events[e]=this._events[e]||[];-1===n.indexOf(t)&&n.push(t)}},{key:"emit",value:function(e){for(var t=this,n=arguments.length,r=Array(n>1?n-1:0),i=1;i<n;i++)r[i-1]=arguments[i];if(!this._events[e])throw new Error("event is undefined.");this._events[e].forEach(function(e){return e.call.apply(e,[t].concat(r))})}}]),e}()}]);