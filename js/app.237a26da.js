(function(e){function n(n){for(var o,a,c=n[0],s=n[1],u=n[2],d=0,f=[];d<c.length;d++)a=c[d],Object.prototype.hasOwnProperty.call(r,a)&&r[a]&&f.push(r[a][0]),r[a]=0;for(o in s)Object.prototype.hasOwnProperty.call(s,o)&&(e[o]=s[o]);l&&l(n);while(f.length)f.shift()();return i.push.apply(i,u||[]),t()}function t(){for(var e,n=0;n<i.length;n++){for(var t=i[n],o=!0,c=1;c<t.length;c++){var s=t[c];0!==r[s]&&(o=!1)}o&&(i.splice(n--,1),e=a(a.s=t[0]))}return e}var o={},r={app:0},i=[];function a(n){if(o[n])return o[n].exports;var t=o[n]={i:n,l:!1,exports:{}};return e[n].call(t.exports,t,t.exports,a),t.l=!0,t.exports}a.m=e,a.c=o,a.d=function(e,n,t){a.o(e,n)||Object.defineProperty(e,n,{enumerable:!0,get:t})},a.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},a.t=function(e,n){if(1&n&&(e=a(e)),8&n)return e;if(4&n&&"object"===typeof e&&e&&e.__esModule)return e;var t=Object.create(null);if(a.r(t),Object.defineProperty(t,"default",{enumerable:!0,value:e}),2&n&&"string"!=typeof e)for(var o in e)a.d(t,o,function(n){return e[n]}.bind(null,o));return t},a.n=function(e){var n=e&&e.__esModule?function(){return e["default"]}:function(){return e};return a.d(n,"a",n),n},a.o=function(e,n){return Object.prototype.hasOwnProperty.call(e,n)},a.p="";var c=window["webpackJsonp"]=window["webpackJsonp"]||[],s=c.push.bind(c);c.push=n,c=c.slice();for(var u=0;u<c.length;u++)n(c[u]);var l=s;i.push([0,"chunk-vendors"]),t()})({0:function(e,n,t){e.exports=t("56d7")},"034f":function(e,n,t){"use strict";var o=t("85ec"),r=t.n(o);r.a},"56d7":function(e,n,t){"use strict";t.r(n);t("e260"),t("e6cf"),t("cca6"),t("a79d");var o=t("2b0e"),r=function(){var e=this,n=e.$createElement,t=e._self._c||n;return t("div",{attrs:{id:"app"}},[t("a",{staticClass:"btn-command",attrs:{href:"#"},on:{click:function(n){return n.preventDefault(),e.runLayout(n)}}},[e._v("Make 200 layout steps")])])},i=[],a=t("9aeb"),c=t("d4ec"),s=t("bee2"),u=t("262e"),l=t("2caf"),d=function(e){Object(u["a"])(t,e);var n=Object(l["a"])(t);function t(e){var o,r=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};Object(c["a"])(this,t);var i=Object(a["e"])({gl:e,vertex:"\n    uniform mat4 modelViewProjection;\n    uniform float width;\n    uniform vec2 resolution;\n\n    attribute vec4 color;\n    attribute vec3 from, to;\n    attribute vec2 point;\n\n    varying vec4 vColor;\n    varying vec2 vPoint;\n\n    void main() {\n      vec4 clip0 = modelViewProjection * vec4(from, 1.0);\n      vec4 clip1 = modelViewProjection * vec4(to, 1.0);\n\n      vec2 screen0 = resolution * (0.5 * clip0.xy/clip0.w + 0.5);\n      vec2 screen1 = resolution * (0.5 * clip1.xy/clip1.w + 0.5);\n\n      vec2 xBasis = normalize(screen1 - screen0);\n      vec2 yBasis = vec2(-xBasis.y, xBasis.x);\n\n      // Offset the original points:\n      vec2 pt0 = screen0 + width * point.x * yBasis;\n      vec2 pt1 = screen1 + width * point.x * yBasis;\n\n      vec2 pt = mix(pt0, pt1, point.y);\n      vec4 clip = mix(clip0, clip1, point.y);\n\n      gl_Position = vec4(clip.w * (2.0 * pt/resolution - 1.0), clip.z, clip.w);\n      vColor = color.abgr; // mix(.abgr, aToColor.abgr, aPosition.y);\n    }",fragment:"\n    precision highp float;\n    varying vec4 vColor;\n\n    void main() {\n      gl_FragColor = vColor;\n    }",attributes:{color:new a["a"]},instanced:{point:new a["c"]([-.5,0,-.5,1,.5,1,-.5,0,.5,1,.5,0])}});return o=n.call(this,i),o.width=r.width||2,o}return Object(s["a"])(t,[{key:"draw",value:function(e,n){this.uniforms||(this.uniforms={modelViewProjection:this.modelViewProjection,width:this.width,resolution:[n.width,n.height]}),this.uniforms.resolution[0]=n.width,this.uniforms.resolution[1]=n.height,this.program.draw(this.uniforms)}},{key:"forEachLine",value:function(e){for(var n=this.program.getCount(),t=0;t<n;++t){var o=this.program.get(t),r={x:o.from[0],y:o.from[1],z:o.from[2],color:o.color},i={x:o.to[0],y:o.to[1],z:o.to[2],color:o.color};e(r,i)}}},{key:"getLineColor",value:function(e){var n=this.program.getCount(),t=e?e.color:n>0?this.program.get(0).color:4294967295;return[t>>24&1,t>>16&1,t>>8&1,t>>0&1]}}]),t}(a["b"]),f=function(e){Object(u["a"])(t,e);var n=Object(l["a"])(t);function t(e){Object(c["a"])(this,t);var o=Object(a["e"])({gl:e,vertex:"\n  uniform mat4 modelViewProjection;\n\n  attribute float size;\n  attribute vec3 position;\n  attribute vec4 color;\n\n  attribute vec2 point; // instanced\n\n  varying vec4 vColor;\n  varying vec2 vPoint;\n  void main() {\n    gl_Position = modelViewProjection * vec4(position + vec3(point * size, 0.), 1.0);\n    vColor = color.abgr;\n    vPoint = point;\n  }",fragment:"\n  precision highp float;\n  varying vec4 vColor;\n  varying vec2 vPoint;\n  void main() {\n    float dist = length(vPoint);\n    if (dist >= 0.5) {discard;}\n    gl_FragColor = vColor;\n  }",attributes:{color:new a["a"]},instanced:{point:new a["c"]([-.5,-.5,-.5,.5,.5,.5,.5,.5,.5,-.5,-.5,-.5])},preDrawHook:function(){return"gl.enable(gl.DEPTH_TEST);\n        gl.depthFunc(gl.LEQUAL);"},postDrawHook:function(){return"gl.disable(gl.DEPTH_TEST);"}});return n.call(this,o)}return t}(a["b"]),v=t("00c7"),p=t.n(v),g=p()({}),h=g,m=t("9032"),y=t.n(m);function b(){return y.a.create()}var w=t("2b44"),x=t.n(w);function P(e){var n,t,o,r,i,c,s=!0,u=0;return l(b()),h.on("load-graph",l),{dispose:w,runLayout:v};function l(e){o&&(o.dispose(),o=null,cancelAnimationFrame(c)),o=p(),n=e,t=x()(n,{timeStep:.5,springLength:10,springCoeff:.8,gravity:-12,dragCoeff:.9}),t.step(),g(),c=requestAnimationFrame(m)}function v(e){u+=e}function p(){var n=Object(a["d"])(e);n.setClearColor(12/255,41/255,82/255,1);var t=40;return n.setViewBox({left:-t,top:-t,right:t,bottom:t}),n}function g(){r=new f(o.getGL(),{capacity:n.getNodesCount()}),n.forEachNode((function(e){var n=t.getNodePosition(e.id),o=1;e.data&&e.data.size?o=e.data.size:(e.data||(e.data={}),e.data.size=o),e.ui={size:o,position:[n.x,n.y,n.z||0],color:2432236799},e.uiId=r.add(e.ui)})),i=new d(o.getGL(),{capacity:n.getLinksCount()}),n.forEachLink((function(e){var n=t.getNodePosition(e.fromId),o=t.getNodePosition(e.toId),r={from:[n.x,n.y,n.z||0],to:[o.x,o.y,o.z||0],color:4294967056};e.ui=r,e.uiId=i.add(e.ui)})),o.appendChild(i),o.appendChild(r)}function m(){c=requestAnimationFrame(m),u>0&&(u-=1,t.step()),y(),o.renderFrame()}function y(){n.forEachNode((function(e){var n=t.getNodePosition(e.id),o=e.ui.position;o[0]=n.x,o[1]=n.y,o[2]=n.z||0,r.update(e.uiId,e.ui)})),s&&n.forEachLink((function(e){var n=t.getNodePosition(e.fromId),o=t.getNodePosition(e.toId),r=e.ui,a=r.from,c=r.to;a[0]=n.x,a[1]=n.y,a[2]=n.z||0,c[0]=o.x,c[1]=o.y,c[2]=o.z||0,i.update(e.uiId,e.ui)}))}function w(){cancelAnimationFrame(c),o.dispose(),h.off("load-graph",l)}}var j={name:"app",methods:{runLayout:function(){this.scene.runLayout(3e3)}},mounted:function(){var e=document.getElementById("cnv");this.scene=P(e)},beforeDestroy:function(){this.scene&&this.scene.dispose()}},L=j,O=(t("034f"),t("2877")),C=Object(O["a"])(L,r,i,!1,null,null,null),E=C.exports;function T(e,n){return e.addEventListener("drop",r,!0),e.addEventListener("dragover",i),e.addEventListener("dragenter",o),e.addEventListener("dragleave",c),e.addEventListener("dragend",c),{dispose:t};function t(){e.removeEventListener("drop",r),e.removeEventListener("dragover",i),e.removeEventListener("dragenter",o),e.removeEventListener("dragleave",c),e.removeEventListener("dragend",c)}function o(e){a(e)&&e.preventDefault()}function r(e){c(),e.preventDefault();var t,o,r=e.dataTransfer,i=[];if(r.items)for(t=0;t<r.items.length;t++)"file"==r.items[t].kind&&(o=r.items[t].getAsFile(),i.push(o));else for(t=0;t<r.files.length;t++)o=r.files[t],i.push(o);n(i)}function i(n){a(n)&&(n.preventDefault(),e.classList.add("drag-over"))}function a(e){if(!e.dataTransfer)return!1;if(e.dataTransfer.files&&e.dataTransfer.files.length>0)return!0;var n=e.dataTransfer.items;if(!n)return!1;for(var t=0;t<n.length;++t)if("file"===n[t].kind)return!0;return!1}function c(){e.classList.remove("drag-over")}}var z=t("9469"),k=t.n(z),_=t("8392"),F=t.n(_);function N(e){var n=e[0],t=new FileReader;function o(e){try{return k()(e)}catch(n){console.log("error loading dot file: ",n)}}function r(e){try{return F()(JSON.parse(e))}catch(n){console.log("error loading JSON: ",n)}}t.readAsText(n,"UTF-8"),t.onload=function(e){var n=e.target.result,t=o(n)||r(n);t&&h.fire("load-graph",t)},t.onerror=function(e){console.log("error loading dot file: ",e)}}o["a"].config.productionTip=!1,new o["a"]({render:function(e){return e(E)}}).$mount("#app"),T(document.body,N)},"85ec":function(e,n,t){}});
//# sourceMappingURL=app.237a26da.js.map