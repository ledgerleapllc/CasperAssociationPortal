(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[802],{676:function(t,e,r){"use strict";function n(t,e){(null==e||e>t.length)&&(e=t.length);for(var r=0,n=new Array(e);r<e;r++)n[r]=t[r];return n}r.d(e,{Z:function(){return n}})},2949:function(t,e,r){"use strict";r.d(e,{Z:function(){return o}});var n=r(9756);function o(t,e){if(null==t)return{};var r,o,i=(0,n.Z)(t,e);if(Object.getOwnPropertySymbols){var s=Object.getOwnPropertySymbols(t);for(o=0;o<s.length;o++)r=s[o],e.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(t,r)&&(i[r]=t[r])}return i}},9756:function(t,e,r){"use strict";function n(t,e){if(null==t)return{};var r,n,o={},i=Object.keys(t);for(n=0;n<i.length;n++)r=i[n],e.indexOf(r)>=0||(o[r]=t[r]);return o}r.d(e,{Z:function(){return n}})},4699:function(t,e,r){"use strict";r.d(e,{Z:function(){return o}});var n=r(2961);function o(t,e){return function(t){if(Array.isArray(t))return t}(t)||function(t,e){if("undefined"!==typeof Symbol&&Symbol.iterator in Object(t)){var r=[],n=!0,o=!1,i=void 0;try{for(var s,a=t[Symbol.iterator]();!(n=(s=a.next()).done)&&(r.push(s.value),!e||r.length!==e);n=!0);}catch(c){o=!0,i=c}finally{try{n||null==a.return||a.return()}finally{if(o)throw i}}return r}}(t,e)||(0,n.Z)(t,e)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}},2961:function(t,e,r){"use strict";r.d(e,{Z:function(){return o}});var n=r(676);function o(t,e){if(t){if("string"===typeof t)return(0,n.Z)(t,e);var r=Object.prototype.toString.call(t).slice(8,-1);return"Object"===r&&t.constructor&&(r=t.constructor.name),"Map"===r||"Set"===r?Array.from(t):"Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)?(0,n.Z)(t,e):void 0}}},2757:function(t,e,r){var n;window,t.exports=(n=r(7294),function(t){var e={};function r(n){if(e[n])return e[n].exports;var o=e[n]={i:n,l:!1,exports:{}};return t[n].call(o.exports,o,o.exports,r),o.l=!0,o.exports}return r.m=t,r.c=e,r.d=function(t,e,n){r.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:n})},r.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},r.t=function(t,e){if(1&e&&(t=r(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var n=Object.create(null);if(r.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var o in t)r.d(n,o,function(e){return t[e]}.bind(null,o));return n},r.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return r.d(e,"a",e),e},r.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},r.p="",r(r.s=12)}([function(t,e,r){"use strict";var n=r(4),o="object"==typeof self&&self&&self.Object===Object&&self,i=n.a||o||Function("return this")();e.a=i},function(t,e,r){t.exports=r(9)()},function(t,r,n){"use strict";(function(t){var o=n(4),i=e&&!e.nodeType&&e,s=i&&"object"==typeof t&&t&&!t.nodeType&&t,a=s&&s.exports===i&&o.a.process,c=function(){try{return s&&s.require&&s.require("util").types||a&&a.binding&&a.binding("util")}catch(t){}}();r.a=c}).call(this,n(6)(t))},function(t,e){t.exports=n},function(t,e,r){"use strict";(function(t){var r="object"==typeof t&&t&&t.Object===Object&&t;e.a=r}).call(this,r(11))},function(t,r,n){"use strict";(function(t){var o=n(0),i=n(7),s=e&&!e.nodeType&&e,a=s&&"object"==typeof t&&t&&!t.nodeType&&t,c=a&&a.exports===s?o.a.Buffer:void 0,u=(c?c.isBuffer:void 0)||i.a;r.a=u}).call(this,n(6)(t))},function(t,e){t.exports=function(t){if(!t.webpackPolyfill){var e=Object.create(t);e.children||(e.children=[]),Object.defineProperty(e,"loaded",{enumerable:!0,get:function(){return e.l}}),Object.defineProperty(e,"id",{enumerable:!0,get:function(){return e.i}}),Object.defineProperty(e,"exports",{enumerable:!0}),e.webpackPolyfill=1}return e}},function(t,e,r){"use strict";e.a=function(){return!1}},function(t,r,n){"use strict";(function(t){var o=n(0),i=e&&!e.nodeType&&e,s=i&&"object"==typeof t&&t&&!t.nodeType&&t,a=s&&s.exports===i?o.a.Buffer:void 0,c=a?a.allocUnsafe:void 0;r.a=function(t,e){if(e)return t.slice();var r=t.length,n=c?c(r):new t.constructor(r);return t.copy(n),n}}).call(this,n(6)(t))},function(t,e,r){"use strict";var n=r(10);function o(){}function i(){}i.resetWarningCache=o,t.exports=function(){function t(t,e,r,o,i,s){if(s!==n){var a=new Error("Calling PropTypes validators directly is not supported by the `prop-types` package. Use PropTypes.checkPropTypes() to call them. Read more at http://fb.me/use-check-prop-types");throw a.name="Invariant Violation",a}}function e(){return t}t.isRequired=t;var r={array:t,bool:t,func:t,number:t,object:t,string:t,symbol:t,any:t,arrayOf:e,element:t,elementType:t,instanceOf:e,node:t,objectOf:e,oneOf:e,oneOfType:e,shape:e,exact:e,checkPropTypes:i,resetWarningCache:o};return r.PropTypes=r,r}},function(t,e,r){"use strict";t.exports="SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED"},function(t,e){var r;r=function(){return this}();try{r=r||new Function("return this")()}catch(t){"object"==typeof window&&(r=window)}t.exports=r},function(t,e,r){"use strict";r.r(e),r.d(e,"CKEditor",(function(){return Wr})),r.d(e,"CKEditorContext",(function(){return Rr}));var n=r(3),o=r.n(n),i=r(1),s=r.n(i),a=function(t){var e=typeof t;return null!=t&&("object"==e||"function"==e)},c=r(0),u=function(){return c.a.Date.now()},h=/\s/,l=function(t){for(var e=t.length;e--&&h.test(t.charAt(e)););return e},f=/^\s+/,d=function(t){return t?t.slice(0,l(t)+1).replace(f,""):t},p=c.a.Symbol,y=Object.prototype,_=y.hasOwnProperty,b=y.toString,g=p?p.toStringTag:void 0,m=function(t){var e=_.call(t,g),r=t[g];try{t[g]=void 0;var n=!0}catch(t){}var o=b.call(t);return n&&(e?t[g]=r:delete t[g]),o},v=Object.prototype.toString,j=function(t){return v.call(t)},w=p?p.toStringTag:void 0,x=function(t){return null==t?void 0===t?"[object Undefined]":"[object Null]":w&&w in Object(t)?m(t):j(t)},E=function(t){return null!=t&&"object"==typeof t},O=function(t){return"symbol"==typeof t||E(t)&&"[object Symbol]"==x(t)},P=/^[-+]0x[0-9a-f]+$/i,C=/^0b[01]+$/i,A=/^0o[0-7]+$/i,S=parseInt,T=function(t){if("number"==typeof t)return t;if(O(t))return NaN;if(a(t)){var e="function"==typeof t.valueOf?t.valueOf():t;t=a(e)?e+"":e}if("string"!=typeof t)return 0===t?t:+t;t=d(t);var r=C.test(t);return r||A.test(t)?S(t.slice(2),r?2:8):P.test(t)?NaN:+t},R=Math.max,W=Math.min,D=function(t,e,r){var n,o,i,s,c,h,l=0,f=!1,d=!1,p=!0;if("function"!=typeof t)throw new TypeError("Expected a function");function y(e){var r=n,i=o;return n=o=void 0,l=e,s=t.apply(i,r)}function _(t){return l=t,c=setTimeout(g,e),f?y(t):s}function b(t){var r=t-h;return void 0===h||r>=e||r<0||d&&t-l>=i}function g(){var t=u();if(b(t))return m(t);c=setTimeout(g,function(t){var r=e-(t-h);return d?W(r,i-(t-l)):r}(t))}function m(t){return c=void 0,p&&n?y(t):(n=o=void 0,s)}function v(){var t=u(),r=b(t);if(n=arguments,o=this,h=t,r){if(void 0===c)return _(h);if(d)return clearTimeout(c),c=setTimeout(g,e),y(h)}return void 0===c&&(c=setTimeout(g,e)),s}return e=T(e)||0,a(r)&&(f=!!r.leading,i=(d="maxWait"in r)?R(T(r.maxWait)||0,e):i,p="trailing"in r?!!r.trailing:p),v.cancel=function(){void 0!==c&&clearTimeout(c),l=0,n=h=o=c=void 0},v.flush=function(){return void 0===c?s:m(u())},v},I=function(t,e,r){var n=!0,o=!0;if("function"!=typeof t)throw new TypeError("Expected a function");return a(r)&&(n="leading"in r?!!r.leading:n,o="trailing"in r?!!r.trailing:o),D(t,e,{leading:n,maxWait:e,trailing:o})},z=function(){this.__data__=[],this.size=0},L=function(t,e){return t===e||t!=t&&e!=e},M=function(t,e){for(var r=t.length;r--;)if(L(t[r][0],e))return r;return-1},U=Array.prototype.splice,k=function(t){var e=this.__data__,r=M(e,t);return!(r<0)&&(r==e.length-1?e.pop():U.call(e,r,1),--this.size,!0)},F=function(t){var e=this.__data__,r=M(e,t);return r<0?void 0:e[r][1]},N=function(t){return M(this.__data__,t)>-1},H=function(t,e){var r=this.__data__,n=M(r,t);return n<0?(++this.size,r.push([t,e])):r[n][1]=e,this};function B(t){var e=-1,r=null==t?0:t.length;for(this.clear();++e<r;){var n=t[e];this.set(n[0],n[1])}}B.prototype.clear=z,B.prototype.delete=k,B.prototype.get=F,B.prototype.has=N,B.prototype.set=H;var $,Q=B,q=function(){this.__data__=new Q,this.size=0},V=function(t){var e=this.__data__,r=e.delete(t);return this.size=e.size,r},Z=function(t){return this.__data__.get(t)},K=function(t){return this.__data__.has(t)},G=function(t){if(!a(t))return!1;var e=x(t);return"[object Function]"==e||"[object GeneratorFunction]"==e||"[object AsyncFunction]"==e||"[object Proxy]"==e},Y=c.a["__core-js_shared__"],J=($=/[^.]+$/.exec(Y&&Y.keys&&Y.keys.IE_PROTO||""))?"Symbol(src)_1."+$:"",X=function(t){return!!J&&J in t},tt=Function.prototype.toString,et=function(t){if(null!=t){try{return tt.call(t)}catch(t){}try{return t+""}catch(t){}}return""},rt=/^\[object .+?Constructor\]$/,nt=Function.prototype,ot=Object.prototype,it=nt.toString,st=ot.hasOwnProperty,at=RegExp("^"+it.call(st).replace(/[\\^$.*+?()[\]{}|]/g,"\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g,"$1.*?")+"$"),ct=function(t){return!(!a(t)||X(t))&&(G(t)?at:rt).test(et(t))},ut=function(t,e){return null==t?void 0:t[e]},ht=function(t,e){var r=ut(t,e);return ct(r)?r:void 0},lt=ht(c.a,"Map"),ft=ht(Object,"create"),dt=function(){this.__data__=ft?ft(null):{},this.size=0},pt=function(t){var e=this.has(t)&&delete this.__data__[t];return this.size-=e?1:0,e},yt=Object.prototype.hasOwnProperty,_t=function(t){var e=this.__data__;if(ft){var r=e[t];return"__lodash_hash_undefined__"===r?void 0:r}return yt.call(e,t)?e[t]:void 0},bt=Object.prototype.hasOwnProperty,gt=function(t){var e=this.__data__;return ft?void 0!==e[t]:bt.call(e,t)},mt=function(t,e){var r=this.__data__;return this.size+=this.has(t)?0:1,r[t]=ft&&void 0===e?"__lodash_hash_undefined__":e,this};function vt(t){var e=-1,r=null==t?0:t.length;for(this.clear();++e<r;){var n=t[e];this.set(n[0],n[1])}}vt.prototype.clear=dt,vt.prototype.delete=pt,vt.prototype.get=_t,vt.prototype.has=gt,vt.prototype.set=mt;var jt=vt,wt=function(){this.size=0,this.__data__={hash:new jt,map:new(lt||Q),string:new jt}},xt=function(t){var e=typeof t;return"string"==e||"number"==e||"symbol"==e||"boolean"==e?"__proto__"!==t:null===t},Et=function(t,e){var r=t.__data__;return xt(e)?r["string"==typeof e?"string":"hash"]:r.map},Ot=function(t){var e=Et(this,t).delete(t);return this.size-=e?1:0,e},Pt=function(t){return Et(this,t).get(t)},Ct=function(t){return Et(this,t).has(t)},At=function(t,e){var r=Et(this,t),n=r.size;return r.set(t,e),this.size+=r.size==n?0:1,this};function St(t){var e=-1,r=null==t?0:t.length;for(this.clear();++e<r;){var n=t[e];this.set(n[0],n[1])}}St.prototype.clear=wt,St.prototype.delete=Ot,St.prototype.get=Pt,St.prototype.has=Ct,St.prototype.set=At;var Tt=St,Rt=function(t,e){var r=this.__data__;if(r instanceof Q){var n=r.__data__;if(!lt||n.length<199)return n.push([t,e]),this.size=++r.size,this;r=this.__data__=new Tt(n)}return r.set(t,e),this.size=r.size,this};function Wt(t){var e=this.__data__=new Q(t);this.size=e.size}Wt.prototype.clear=q,Wt.prototype.delete=V,Wt.prototype.get=Z,Wt.prototype.has=K,Wt.prototype.set=Rt;var Dt=Wt,It=function(t,e){for(var r=-1,n=null==t?0:t.length;++r<n&&!1!==e(t[r],r,t););return t},zt=function(){try{var t=ht(Object,"defineProperty");return t({},"",{}),t}catch(t){}}(),Lt=function(t,e,r){"__proto__"==e&&zt?zt(t,e,{configurable:!0,enumerable:!0,value:r,writable:!0}):t[e]=r},Mt=Object.prototype.hasOwnProperty,Ut=function(t,e,r){var n=t[e];Mt.call(t,e)&&L(n,r)&&(void 0!==r||e in t)||Lt(t,e,r)},kt=function(t,e,r,n){var o=!r;r||(r={});for(var i=-1,s=e.length;++i<s;){var a=e[i],c=n?n(r[a],t[a],a,r,t):void 0;void 0===c&&(c=t[a]),o?Lt(r,a,c):Ut(r,a,c)}return r},Ft=function(t,e){for(var r=-1,n=Array(t);++r<t;)n[r]=e(r);return n},Nt=function(t){return E(t)&&"[object Arguments]"==x(t)},Ht=Object.prototype,Bt=Ht.hasOwnProperty,$t=Ht.propertyIsEnumerable,Qt=Nt(function(){return arguments}())?Nt:function(t){return E(t)&&Bt.call(t,"callee")&&!$t.call(t,"callee")},qt=Array.isArray,Vt=r(5),Zt=/^(?:0|[1-9]\d*)$/,Kt=function(t,e){var r=typeof t;return!!(e=null==e?9007199254740991:e)&&("number"==r||"symbol"!=r&&Zt.test(t))&&t>-1&&t%1==0&&t<e},Gt=function(t){return"number"==typeof t&&t>-1&&t%1==0&&t<=9007199254740991},Yt={};Yt["[object Float32Array]"]=Yt["[object Float64Array]"]=Yt["[object Int8Array]"]=Yt["[object Int16Array]"]=Yt["[object Int32Array]"]=Yt["[object Uint8Array]"]=Yt["[object Uint8ClampedArray]"]=Yt["[object Uint16Array]"]=Yt["[object Uint32Array]"]=!0,Yt["[object Arguments]"]=Yt["[object Array]"]=Yt["[object ArrayBuffer]"]=Yt["[object Boolean]"]=Yt["[object DataView]"]=Yt["[object Date]"]=Yt["[object Error]"]=Yt["[object Function]"]=Yt["[object Map]"]=Yt["[object Number]"]=Yt["[object Object]"]=Yt["[object RegExp]"]=Yt["[object Set]"]=Yt["[object String]"]=Yt["[object WeakMap]"]=!1;var Jt=function(t){return E(t)&&Gt(t.length)&&!!Yt[x(t)]},Xt=function(t){return function(e){return t(e)}},te=r(2),ee=te.a&&te.a.isTypedArray,re=ee?Xt(ee):Jt,ne=Object.prototype.hasOwnProperty,oe=function(t,e){var r=qt(t),n=!r&&Qt(t),o=!r&&!n&&Object(Vt.a)(t),i=!r&&!n&&!o&&re(t),s=r||n||o||i,a=s?Ft(t.length,String):[],c=a.length;for(var u in t)!e&&!ne.call(t,u)||s&&("length"==u||o&&("offset"==u||"parent"==u)||i&&("buffer"==u||"byteLength"==u||"byteOffset"==u)||Kt(u,c))||a.push(u);return a},ie=Object.prototype,se=function(t){var e=t&&t.constructor;return t===("function"==typeof e&&e.prototype||ie)},ae=function(t,e){return function(r){return t(e(r))}},ce=ae(Object.keys,Object),ue=Object.prototype.hasOwnProperty,he=function(t){if(!se(t))return ce(t);var e=[];for(var r in Object(t))ue.call(t,r)&&"constructor"!=r&&e.push(r);return e},le=function(t){return null!=t&&Gt(t.length)&&!G(t)},fe=function(t){return le(t)?oe(t):he(t)},de=function(t,e){return t&&kt(e,fe(e),t)},pe=function(t){var e=[];if(null!=t)for(var r in Object(t))e.push(r);return e},ye=Object.prototype.hasOwnProperty,_e=function(t){if(!a(t))return pe(t);var e=se(t),r=[];for(var n in t)("constructor"!=n||!e&&ye.call(t,n))&&r.push(n);return r},be=function(t){return le(t)?oe(t,!0):_e(t)},ge=function(t,e){return t&&kt(e,be(e),t)},me=r(8),ve=function(t,e){var r=-1,n=t.length;for(e||(e=Array(n));++r<n;)e[r]=t[r];return e},je=function(t,e){for(var r=-1,n=null==t?0:t.length,o=0,i=[];++r<n;){var s=t[r];e(s,r,t)&&(i[o++]=s)}return i},we=function(){return[]},xe=Object.prototype.propertyIsEnumerable,Ee=Object.getOwnPropertySymbols,Oe=Ee?function(t){return null==t?[]:(t=Object(t),je(Ee(t),(function(e){return xe.call(t,e)})))}:we,Pe=function(t,e){return kt(t,Oe(t),e)},Ce=function(t,e){for(var r=-1,n=e.length,o=t.length;++r<n;)t[o+r]=e[r];return t},Ae=ae(Object.getPrototypeOf,Object),Se=Object.getOwnPropertySymbols?function(t){for(var e=[];t;)Ce(e,Oe(t)),t=Ae(t);return e}:we,Te=function(t,e){return kt(t,Se(t),e)},Re=function(t,e,r){var n=e(t);return qt(t)?n:Ce(n,r(t))},We=function(t){return Re(t,fe,Oe)},De=function(t){return Re(t,be,Se)},Ie=ht(c.a,"DataView"),ze=ht(c.a,"Promise"),Le=ht(c.a,"Set"),Me=ht(c.a,"WeakMap"),Ue=et(Ie),ke=et(lt),Fe=et(ze),Ne=et(Le),He=et(Me),Be=x;(Ie&&"[object DataView]"!=Be(new Ie(new ArrayBuffer(1)))||lt&&"[object Map]"!=Be(new lt)||ze&&"[object Promise]"!=Be(ze.resolve())||Le&&"[object Set]"!=Be(new Le)||Me&&"[object WeakMap]"!=Be(new Me))&&(Be=function(t){var e=x(t),r="[object Object]"==e?t.constructor:void 0,n=r?et(r):"";if(n)switch(n){case Ue:return"[object DataView]";case ke:return"[object Map]";case Fe:return"[object Promise]";case Ne:return"[object Set]";case He:return"[object WeakMap]"}return e});var $e=Be,Qe=Object.prototype.hasOwnProperty,qe=function(t){var e=t.length,r=new t.constructor(e);return e&&"string"==typeof t[0]&&Qe.call(t,"index")&&(r.index=t.index,r.input=t.input),r},Ve=c.a.Uint8Array,Ze=function(t){var e=new t.constructor(t.byteLength);return new Ve(e).set(new Ve(t)),e},Ke=function(t,e){var r=e?Ze(t.buffer):t.buffer;return new t.constructor(r,t.byteOffset,t.byteLength)},Ge=/\w*$/,Ye=function(t){var e=new t.constructor(t.source,Ge.exec(t));return e.lastIndex=t.lastIndex,e},Je=p?p.prototype:void 0,Xe=Je?Je.valueOf:void 0,tr=function(t){return Xe?Object(Xe.call(t)):{}},er=function(t,e){var r=e?Ze(t.buffer):t.buffer;return new t.constructor(r,t.byteOffset,t.length)},rr=function(t,e,r){var n=t.constructor;switch(e){case"[object ArrayBuffer]":return Ze(t);case"[object Boolean]":case"[object Date]":return new n(+t);case"[object DataView]":return Ke(t,r);case"[object Float32Array]":case"[object Float64Array]":case"[object Int8Array]":case"[object Int16Array]":case"[object Int32Array]":case"[object Uint8Array]":case"[object Uint8ClampedArray]":case"[object Uint16Array]":case"[object Uint32Array]":return er(t,r);case"[object Map]":return new n;case"[object Number]":case"[object String]":return new n(t);case"[object RegExp]":return Ye(t);case"[object Set]":return new n;case"[object Symbol]":return tr(t)}},nr=Object.create,or=function(){function t(){}return function(e){if(!a(e))return{};if(nr)return nr(e);t.prototype=e;var r=new t;return t.prototype=void 0,r}}(),ir=function(t){return"function"!=typeof t.constructor||se(t)?{}:or(Ae(t))},sr=function(t){return E(t)&&"[object Map]"==$e(t)},ar=te.a&&te.a.isMap,cr=ar?Xt(ar):sr,ur=function(t){return E(t)&&"[object Set]"==$e(t)},hr=te.a&&te.a.isSet,lr=hr?Xt(hr):ur,fr={};fr["[object Arguments]"]=fr["[object Array]"]=fr["[object ArrayBuffer]"]=fr["[object DataView]"]=fr["[object Boolean]"]=fr["[object Date]"]=fr["[object Float32Array]"]=fr["[object Float64Array]"]=fr["[object Int8Array]"]=fr["[object Int16Array]"]=fr["[object Int32Array]"]=fr["[object Map]"]=fr["[object Number]"]=fr["[object Object]"]=fr["[object RegExp]"]=fr["[object Set]"]=fr["[object String]"]=fr["[object Symbol]"]=fr["[object Uint8Array]"]=fr["[object Uint8ClampedArray]"]=fr["[object Uint16Array]"]=fr["[object Uint32Array]"]=!0,fr["[object Error]"]=fr["[object Function]"]=fr["[object WeakMap]"]=!1;var dr=function t(e,r,n,o,i,s){var c,u=1&r,h=2&r,l=4&r;if(n&&(c=i?n(e,o,i,s):n(e)),void 0!==c)return c;if(!a(e))return e;var f=qt(e);if(f){if(c=qe(e),!u)return ve(e,c)}else{var d=$e(e),p="[object Function]"==d||"[object GeneratorFunction]"==d;if(Object(Vt.a)(e))return Object(me.a)(e,u);if("[object Object]"==d||"[object Arguments]"==d||p&&!i){if(c=h||p?{}:ir(e),!u)return h?Te(e,ge(c,e)):Pe(e,de(c,e))}else{if(!fr[d])return i?e:{};c=rr(e,d,u)}}s||(s=new Dt);var y=s.get(e);if(y)return y;s.set(e,c),lr(e)?e.forEach((function(o){c.add(t(o,r,n,o,e,s))})):cr(e)&&e.forEach((function(o,i){c.set(i,t(o,r,n,i,e,s))}));var _=f?void 0:(l?h?De:We:h?be:fe)(e);return It(_||e,(function(o,i){_&&(o=e[i=o]),Ut(c,i,t(o,r,n,i,e,s))})),c},pr=function(t,e){return dr(t,5,e="function"==typeof e?e:void 0)},yr=Function.prototype,_r=Object.prototype,br=yr.toString,gr=_r.hasOwnProperty,mr=br.call(Object),vr=function(t){if(!E(t)||"[object Object]"!=x(t))return!1;var e=Ae(t);if(null===e)return!0;var r=gr.call(e,"constructor")&&e.constructor;return"function"==typeof r&&r instanceof r&&br.call(r)==mr},jr=function(t){return E(t)&&1===t.nodeType&&!vr(t)};function wr(t,e=new Set){const r=[t],n=new Set;for(;r.length>0;){const o=r.shift();if(!(n.has(o)||xr(o)||e.has(o)))if(n.add(o),o[Symbol.iterator])try{for(const t of o)r.push(t)}catch(t){}else for(const t in o)"defaultValue"!==t&&r.push(o[t])}return n}function xr(t){const e=Object.prototype.toString.call(t),r=typeof t;return"number"===r||"boolean"===r||"string"===r||"symbol"===r||"function"===r||"[object Date]"===e||"[object RegExp]"===e||"[object Module]"===e||null==t||t instanceof EventTarget||t instanceof Event}function Er(t,e,r=new Set){if(t===e&&"object"==typeof(n=t)&&null!==n)return!0;var n;const o=wr(t,r),i=wr(e,r);for(const s of o)if(i.has(s))return!0;return!1}class Or{constructor(t){if(this.crashes=[],this.state="initializing",this._crashNumberLimit="number"==typeof t.crashNumberLimit?t.crashNumberLimit:3,this._now=Date.now,this._minimumNonErrorTimePeriod="number"==typeof t.minimumNonErrorTimePeriod?t.minimumNonErrorTimePeriod:5e3,this._boundErrorHandler=t=>{const e=t.error||t.reason;e instanceof Error&&this._handleError(e,t)},this._listeners={},!this._restart)throw new Error("The Watchdog class was split into the abstract `Watchdog` class and the `EditorWatchdog` class. Please, use `EditorWatchdog` if you have used the `Watchdog` class previously.")}setCreator(t){this._creator=t}setDestructor(t){this._destructor=t}destroy(){this._stopErrorHandling(),this._listeners={}}on(t,e){this._listeners[t]||(this._listeners[t]=[]),this._listeners[t].push(e)}off(t,e){this._listeners[t]=this._listeners[t].filter((t=>t!==e))}_fire(t,...e){const r=this._listeners[t]||[];for(const n of r)n.apply(this,[null,...e])}_startErrorHandling(){window.addEventListener("error",this._boundErrorHandler),window.addEventListener("unhandledrejection",this._boundErrorHandler)}_stopErrorHandling(){window.removeEventListener("error",this._boundErrorHandler),window.removeEventListener("unhandledrejection",this._boundErrorHandler)}_handleError(t,e){if(this._shouldReactToError(t)){this.crashes.push({message:t.message,stack:t.stack,filename:e.filename,lineno:e.lineno,colno:e.colno,date:this._now()});const r=this._shouldRestart();this.state="crashed",this._fire("stateChange"),this._fire("error",{error:t,causesRestart:r}),r?this._restart():(this.state="crashedPermanently",this._fire("stateChange"))}}_shouldReactToError(t){return t.is&&t.is("CKEditorError")&&void 0!==t.context&&null!==t.context&&"ready"===this.state&&this._isErrorComingFromThisItem(t)}_shouldRestart(){return this.crashes.length<=this._crashNumberLimit||(this.crashes[this.crashes.length-1].date-this.crashes[this.crashes.length-1-this._crashNumberLimit].date)/this._crashNumberLimit>this._minimumNonErrorTimePeriod}}class Pr extends Or{constructor(t,e={}){super(e),this._editor=null,this._throttledSave=I(this._save.bind(this),"number"==typeof e.saveInterval?e.saveInterval:5e3),this._creator=(e,r)=>t.create(e,r),this._destructor=t=>t.destroy()}get editor(){return this._editor}get _item(){return this._editor}_restart(){return Promise.resolve().then((()=>(this.state="initializing",this._fire("stateChange"),this._destroy()))).catch((t=>{console.error("An error happened during the editor destroying.",t)})).then((()=>{if("string"==typeof this._elementOrData)return this.create(this._data,this._config,this._config.context);{const t=Object.assign({},this._config,{initialData:this._data});return this.create(this._elementOrData,t,t.context)}})).then((()=>{this._fire("restart")}))}create(t=this._elementOrData,e=this._config,r){return Promise.resolve().then((()=>(super._startErrorHandling(),this._elementOrData=t,this._config=this._cloneEditorConfiguration(e)||{},this._config.context=r,this._creator(t,this._config)))).then((t=>{this._editor=t,t.model.document.on("change:data",this._throttledSave),this._lastDocumentVersion=t.model.document.version,this._data=this._getData(),this.state="ready",this._fire("stateChange")}))}destroy(){return Promise.resolve().then((()=>(this.state="destroyed",this._fire("stateChange"),super.destroy(),this._destroy())))}_destroy(){return Promise.resolve().then((()=>{this._stopErrorHandling(),this._throttledSave.flush();const t=this._editor;return this._editor=null,this._destructor(t)}))}_save(){const t=this._editor.model.document.version;if(t!==this._lastDocumentVersion)try{this._data=this._getData(),this._lastDocumentVersion=t}catch(t){console.error(t,"An error happened during restoring editor data. Editor will be restored from the previously saved data.")}}_setExcludedProperties(t){this._excludedProps=t}_getData(){const t={};for(const e of this._editor.model.document.getRootNames())t[e]=this._editor.data.get({rootName:e});return t}_isErrorComingFromThisItem(t){return Er(this._editor,t.context,this._excludedProps)}_cloneEditorConfiguration(t){return pr(t,((t,e)=>jr(t)||"context"===e?t:void 0))}}const Cr=new Array(256).fill().map(((t,e)=>("0"+e.toString(16)).slice(-2)));class Ar extends Or{constructor(t,e={}){super(e),this._watchdogs=new Map,this._watchdogConfig=e,this._context=null,this._contextProps=new Set,this._actionQueue=new Sr,this._creator=e=>t.create(e),this._destructor=t=>t.destroy(),this._actionQueue.onEmpty((()=>{"initializing"===this.state&&(this.state="ready",this._fire("stateChange"))}))}get context(){return this._context}create(t={}){return this._actionQueue.enqueue((()=>(this._contextConfig=t,this._create())))}getItem(t){return this._getWatchdog(t)._item}getItemState(t){return this._getWatchdog(t).state}add(t){const e=Array.isArray(t)?t:[t];return this._actionQueue.enqueue((()=>{if("destroyed"===this.state)throw new Error("Cannot add items to destroyed watchdog.");if(!this._context)throw new Error("Context was not created yet. You should call the `ContextWatchdog#create()` method first.");return Promise.all(e.map((t=>{let e;if(this._watchdogs.has(t.id))throw new Error(`Item with the given id is already added: '${t.id}'.`);if("editor"===t.type)return e=new Pr(this._watchdogConfig),e.setCreator(t.creator),e._setExcludedProperties(this._contextProps),t.destructor&&e.setDestructor(t.destructor),this._watchdogs.set(t.id,e),e.on("error",((r,{error:n,causesRestart:o})=>{this._fire("itemError",{itemId:t.id,error:n}),o&&this._actionQueue.enqueue((()=>new Promise((r=>{e.on("restart",function n(){e.off("restart",n),this._fire("itemRestart",{itemId:t.id}),r()}.bind(this))}))))})),e.create(t.sourceElementOrData,t.config,this._context);throw new Error(`Not supported item type: '${t.type}'.`)})))}))}remove(t){const e=Array.isArray(t)?t:[t];return this._actionQueue.enqueue((()=>Promise.all(e.map((t=>{const e=this._getWatchdog(t);return this._watchdogs.delete(t),e.destroy()})))))}destroy(){return this._actionQueue.enqueue((()=>(this.state="destroyed",this._fire("stateChange"),super.destroy(),this._destroy())))}_restart(){return this._actionQueue.enqueue((()=>(this.state="initializing",this._fire("stateChange"),this._destroy().catch((t=>{console.error("An error happened during destroying the context or items.",t)})).then((()=>this._create())).then((()=>this._fire("restart"))))))}_create(){return Promise.resolve().then((()=>(this._startErrorHandling(),this._creator(this._contextConfig)))).then((t=>(this._context=t,this._contextProps=wr(this._context),Promise.all(Array.from(this._watchdogs.values()).map((t=>(t._setExcludedProperties(this._contextProps),t.create(void 0,void 0,this._context))))))))}_destroy(){return Promise.resolve().then((()=>{this._stopErrorHandling();const t=this._context;return this._context=null,this._contextProps=new Set,Promise.all(Array.from(this._watchdogs.values()).map((t=>t.destroy()))).then((()=>this._destructor(t)))}))}_getWatchdog(t){const e=this._watchdogs.get(t);if(!e)throw new Error(`Item with the given id was not registered: ${t}.`);return e}_isErrorComingFromThisItem(t){for(const e of this._watchdogs.values())if(e._isErrorComingFromThisItem(t))return!1;return Er(this._context,t.context)}}class Sr{constructor(){this._promiseQueue=Promise.resolve(),this._onEmptyCallbacks=[]}onEmpty(t){this._onEmptyCallbacks.push(t)}enqueue(t){let e;const r=this._promiseQueue.then(t).then((()=>{this._promiseQueue===e&&this._onEmptyCallbacks.forEach((t=>t()))}));return e=this._promiseQueue=r.catch((()=>{})),r}}const Tr=o.a.createContext("contextWatchdog");class Rr extends o.a.Component{constructor(t,e){super(t,e),this.contextWatchdog=null,this.props.isLayoutReady&&this._initializeContextWatchdog(this.props.config)}shouldComponentUpdate(t){return t.id!==this.props.id&&(this.contextWatchdog&&this.contextWatchdog.destroy(),this._initializeContextWatchdog(t.config)),t.isLayoutReady&&!this.contextWatchdog?(this._initializeContextWatchdog(t.config),!0):this.props.children!==t.children}render(){return o.a.createElement(Tr.Provider,{value:this.contextWatchdog},this.props.children)}componentWillUnmount(){this._destroyContext()}_initializeContextWatchdog(t){this.contextWatchdog=new Ar(this.props.context),this.contextWatchdog.create(t).catch((t=>{this.props.onError(t,{phase:"initialization",willContextRestart:!1})})),this.contextWatchdog.on("error",((t,e)=>{this.props.onError(e.error,{phase:"runtime",willContextRestart:e.causesRestart})})),this.contextWatchdog.on("stateChange",(()=>{"ready"===this.contextWatchdog.state&&this.props.onReady&&this.props.onReady(this.contextWatchdog.context)}))}_destroyContext(){this.contextWatchdog&&(this.contextWatchdog.destroy(),this.contextWatchdog=null)}}Rr.defaultProps={isLayoutReady:!0,onError:(t,e)=>console.error(t,e)},Rr.propTypes={id:s.a.string,isLayoutReady:s.a.bool,context:s.a.func,config:s.a.object,onReady:s.a.func,onError:s.a.func};class Wr extends o.a.Component{constructor(t){super(t),this.domContainer=o.a.createRef(),this.watchdog=null}get editor(){return this.watchdog?this.watchdog.editor:null}shouldComponentUpdate(t){return!!this.editor&&(t.id!==this.props.id?(this._destroyEditor(),!0):(this._shouldUpdateEditor(t)&&this.editor.setData(t.data),"disabled"in t&&(this.editor.isReadOnly=t.disabled),!1))}componentDidMount(){this._initializeEditor()}componentDidUpdate(){this._initializeEditor()}componentWillUnmount(){this._destroyEditor()}render(){return o.a.createElement("div",{ref:this.domContainer})}_initializeEditor(){this.context instanceof Ar?this.watchdog=new Dr(this.context):this.watchdog=new Pr(this.editor),this.watchdog.setCreator(((t,e)=>this._createEditor(t,e))),this.watchdog.on("error",((t,{error:e,causesRestart:r})=>{this.props.onError(e,{phase:"runtime",willEditorRestart:r})})),this.watchdog.create(this.domContainer.current,this._getConfig()).catch((t=>this.props.onError(t,{phase:"initialization",willEditorRestart:!1})))}_createEditor(t,e){return this.props.editor.create(t,e).then((t=>{"disabled"in this.props&&(t.isReadOnly=this.props.disabled);const e=t.model.document,r=t.editing.view.document;return e.on("change:data",(e=>{this.props.onChange&&this.props.onChange(e,t)})),r.on("focus",(e=>{this.props.onFocus&&this.props.onFocus(e,t)})),r.on("blur",(e=>{this.props.onBlur&&this.props.onBlur(e,t)})),setTimeout((()=>{this.props.onReady&&this.props.onReady(this.editor)})),t}))}_destroyEditor(){this.watchdog&&(this.watchdog.destroy(),this.watchdog=null)}_shouldUpdateEditor(t){return this.props.data!==t.data&&this.editor.getData()!==t.data}_getConfig(){return this.props.data&&this.props.config.initialData&&console.warn("Editor data should be provided either using `config.initialData` or `data` properties. The config property is over the data value and the first one will be used when specified both."),{...this.props.config,initialData:this.props.config.initialData||this.props.data||""}}}class Dr{constructor(t){this._contextWatchdog=t,this._id=function(){const t=4294967296*Math.random()>>>0,e=4294967296*Math.random()>>>0,r=4294967296*Math.random()>>>0,n=4294967296*Math.random()>>>0;return"e"+Cr[t>>0&255]+Cr[t>>8&255]+Cr[t>>16&255]+Cr[t>>24&255]+Cr[e>>0&255]+Cr[e>>8&255]+Cr[e>>16&255]+Cr[e>>24&255]+Cr[r>>0&255]+Cr[r>>8&255]+Cr[r>>16&255]+Cr[r>>24&255]+Cr[n>>0&255]+Cr[n>>8&255]+Cr[n>>16&255]+Cr[n>>24&255]}()}setCreator(t){this._creator=t}create(t,e){return this._contextWatchdog.add({sourceElementOrData:t,config:e,creator:this._creator,id:this._id,type:"editor"})}on(t,e){this._contextWatchdog.on("itemError",((t,{itemId:r,causesRestart:n,error:o})=>{r===this._id&&e(null,{error:o,causesRestart:n})}))}destroy(){this._contextWatchdog.remove(this._id)}get editor(){try{return this._contextWatchdog.getItem(this._id)}catch(t){return null}}}Wr.contextType=Tr,Wr.propTypes={editor:s.a.func.isRequired,data:s.a.string,config:s.a.object,onChange:s.a.func,onReady:s.a.func,onFocus:s.a.func,onBlur:s.a.func,onError:s.a.func,disabled:s.a.bool,onInit:(t,e)=>{if(t[e])return new Error('The "onInit" property is not supported anymore by the CKEditor component. Use the "onReady" property instead.')}},Wr.defaultProps={config:{},onError:(t,e)=>console.error(t,e)}}]))},6071:function(t,e,r){"use strict";var n=r(3038),o=r(862);e.default=void 0;var i=o(r(7294)),s=r(1689),a=r(2441),c=r(5749),u={};function h(t,e,r,n){if(t&&(0,s.isLocalURL)(e)){t.prefetch(e,r,n).catch((function(t){0}));var o=n&&"undefined"!==typeof n.locale?n.locale:t&&t.locale;u[e+"%"+r+(o?"%"+o:"")]=!0}}var l=function(t){var e=!1!==t.prefetch,r=(0,a.useRouter)(),o=r&&r.pathname||"/",l=i.default.useMemo((function(){var e=(0,s.resolveHref)(o,t.href,!0),r=n(e,2),i=r[0],a=r[1];return{href:i,as:t.as?(0,s.resolveHref)(o,t.as):a||i}}),[o,t.href,t.as]),f=l.href,d=l.as,p=t.children,y=t.replace,_=t.shallow,b=t.scroll,g=t.locale;"string"===typeof p&&(p=i.default.createElement("a",null,p));var m=i.Children.only(p),v=m&&"object"===typeof m&&m.ref,j=(0,c.useIntersection)({rootMargin:"200px"}),w=n(j,2),x=w[0],E=w[1],O=i.default.useCallback((function(t){x(t),v&&("function"===typeof v?v(t):"object"===typeof v&&(v.current=t))}),[v,x]);(0,i.useEffect)((function(){var t=E&&e&&(0,s.isLocalURL)(f),n="undefined"!==typeof g?g:r&&r.locale,o=u[f+"%"+d+(n?"%"+n:"")];t&&!o&&h(r,f,d,{locale:n})}),[d,f,E,g,e,r]);var P={ref:O,onClick:function(t){m.props&&"function"===typeof m.props.onClick&&m.props.onClick(t),t.defaultPrevented||function(t,e,r,n,o,i,a,c){("A"!==t.currentTarget.nodeName||!function(t){var e=t.currentTarget.target;return e&&"_self"!==e||t.metaKey||t.ctrlKey||t.shiftKey||t.altKey||t.nativeEvent&&2===t.nativeEvent.which}(t)&&(0,s.isLocalURL)(r))&&(t.preventDefault(),null==a&&(a=n.indexOf("#")<0),e[o?"replace":"push"](r,n,{shallow:i,locale:c,scroll:a}))}(t,r,f,d,y,_,b,g)},onMouseEnter:function(t){(0,s.isLocalURL)(f)&&(m.props&&"function"===typeof m.props.onMouseEnter&&m.props.onMouseEnter(t),h(r,f,d,{priority:!0}))}};if(t.passHref||"a"===m.type&&!("href"in m.props)){var C="undefined"!==typeof g?g:r&&r.locale,A=r&&r.isLocaleDomain&&(0,s.getDomainLocale)(d,C,r&&r.locales,r&&r.domainLocales);P.href=A||(0,s.addBasePath)((0,s.addLocale)(d,C,r&&r.defaultLocale))}return i.default.cloneElement(m,P)};e.default=l},1664:function(t,e,r){t.exports=r(6071)}}]);