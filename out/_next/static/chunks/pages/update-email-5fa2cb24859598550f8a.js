(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[734,179],{4015:function(e,t,n){"use strict";n.d(t,{a:function(){return u}});var r=n(6156),a=n(5893),i=n(7294),o=n(1163),l=n(9226);var s=n(4791);function c(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}var u=function(e,t){return function(n){var u=function(){var e=(arguments.length>0&&void 0!==arguments[0]?arguments[0]:{}).urlType,t=void 0===e?"public":e,n=(0,l.v9)((function(e){return e.authReducer.userInfo}));return(0,i.useEffect)((function(){if("public"!==t&&t&&n)if(n&&null!==n&&void 0!==n&&n.isLoggedIn)if("member"===n.role){if("auth"===t)return"verifying"===n.period&&o.default.push("/verify-email"),"onboarding"===n.period&&o.default.push("/onboard"),void("final"===n.period&&o.default.push("/dashboard"));if("verifying"===t)return"onboarding"===n.period&&o.default.push("/onboard"),void("final"===n.period&&o.default.push("/dashboard"));if("onboarding"===t)return"verifying"===n.period&&o.default.push("/verify-email"),void("final"===n.period&&o.default.push("/dashboard"));if("final-member"===t||"final-all"===t)return"verifying"===n.period&&o.default.push("/verify-email"),void("onboarding"===n.period&&o.default.push("/onboard"));"final-admin"===t&&("verifying"===n.period&&o.default.push("/verify-email"),"onboarding"===n.period&&o.default.push("/onboard"),"final"===n.period&&o.default.push("/dashboard"))}else"admin"===n.role&&"final-all"!==t&&"final-admin"!==t&&o.default.push("/admin/dashboard");else"auth"!==t&&o.default.push("/login")}),[n,t]),{user:n}}({urlType:t}).user;if(t&&"public"!==t){if(!u)return(0,a.jsx)(s.Z,{});if("auth"===t&&u.isLoggedIn)return(0,a.jsx)(s.Z,{});if("auth"!==t&&!u.isLoggedIn)return(0,a.jsx)(s.Z,{});if("member"===u.role){if(["final-all","final-member"].includes(t)&&"final"!==u.period)return(0,a.jsx)(s.Z,{});if(["verifying"].includes(t)&&"verifying"!==u.period)return(0,a.jsx)(s.Z,{});if(["onboarding"].includes(t)&&"onboarding"!==u.period)return(0,a.jsx)(s.Z,{})}if("admin"===u.role&&["verifying","onboarding","final-member"].includes(t))return(0,a.jsx)(s.Z,{})}return(0,a.jsx)(e,function(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?c(Object(n),!0).forEach((function(t){(0,r.Z)(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):c(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}({},n))}}},7667:function(e,t,n){"use strict";n.d(t,{Z:function(){return b}});var r,a=n(5893),i=n(7294);function o(){return(o=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e}).apply(this,arguments)}var l,s=function(e){return i.createElement("svg",o({xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 8.087 16.173"},e),r||(r=i.createElement("path",{d:"M2.022 5.391H0v2.7h2.022v8.087h3.369V8.087h2.454l.241-2.7h-2.7V4.268c0-.644.129-.9.751-.9h1.944V0H5.52c-2.423 0-3.5 1.067-3.5 3.11z",fill:"currentColor"})))};function c(){return(c=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e}).apply(this,arguments)}var u,f=function(e){return i.createElement("svg",c({xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 19.901 16.173"},e),l||(l=i.createElement("path",{d:"M19.9 1.915a8.152 8.152 0 01-2.345.643 4.09 4.09 0 001.8-2.259 8.179 8.179 0 01-2.593.991A4.086 4.086 0 009.8 5.013 11.591 11.591 0 011.386.752a4.088 4.088 0 001.263 5.447A4.066 4.066 0 01.8 5.688a4.086 4.086 0 003.275 4.055 4.092 4.092 0 01-1.844.07 4.086 4.086 0 003.814 2.839A8.21 8.21 0 010 14.339a11.559 11.559 0 006.259 1.834A11.547 11.547 0 0017.864 4.028 8.313 8.313 0 0019.9 1.915z",fill:"currentColor"})))};function d(){return(d=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e}).apply(this,arguments)}var m,p=function(e){return i.createElement("svg",d({xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 21.564 16.173"},e),u||(u=i.createElement("path",{d:"M17.624.165c-3.238-.221-10.451-.22-13.684 0C.438.4.026 2.519 0 8.087c.026 5.557.435 7.681 3.94 7.921 3.235.22 10.446.221 13.684 0 3.5-.239 3.914-2.354 3.94-7.921-.026-5.558-.435-7.682-3.94-7.922zM8.087 11.681V4.493l7.188 3.588z",fill:"currentColor"})))};function h(){return(h=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e}).apply(this,arguments)}var v,y=function(e){return i.createElement("svg",h({xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 16.876 16.173"},e),m||(m=i.createElement("path",{d:"M3.5 1.758A1.744 1.744 0 111.758 0 1.751 1.751 0 013.5 1.758zm.014 3.164H0v11.251h3.516zm5.613 0H5.635v11.251h3.494v-5.906c0-3.284 4.24-3.553 4.24 0v5.906h3.508V9.049c0-5.541-6.274-5.339-7.748-2.612z",fill:"currentColor"})))};function g(){return(g=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e}).apply(this,arguments)}var x=function(e){return i.createElement("svg",g({xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 20.373 16.173"},e),v||(v=i.createElement("path",{d:"M2.416 3.3a.788.788 0 00-.257-.666L.257.342V0h5.907l4.565 10.012L14.742 0h5.63v.342L18.746 1.9a.477.477 0 00-.181.457v11.459a.476.476 0 00.181.456l1.588 1.559v.342h-7.989v-.342l1.646-1.6c.161-.161.161-.209.161-.456V4.517L9.578 16.136H8.96L3.633 4.517V12.3a1.075 1.075 0 00.295.893l2.14 2.6v.343H0v-.343l2.14-2.6a1.035 1.035 0 00.276-.893v-9z",fill:"currentColor"})))},b=function(e){var t=e.theme;return(0,a.jsxs)("div",{className:"flex items-center justify-between lg:visible invisible",children:[(0,a.jsx)("p",{className:"".concat("light"===t?"text-white":"text-dark2"," text-xs animate__animated animate__fadeIn animate__delay-5s\n    "),children:"\xa92021 CasperLabs.io"}),(0,a.jsxs)("div",{className:"flex space-x-6 animate__animated animate__fadeIn animate__delay-5s",children:[(0,a.jsx)("button",{className:"flex bottom-0 transition duration-300 ease-in-out transform hover:scale-150",type:"button",children:(0,a.jsx)(s,{width:8,height:16,className:"light"===t?"text-white":"text-primary"})}),(0,a.jsx)("button",{className:"flex bottom-0 transition duration-300 ease-in-out transform hover:scale-150",type:"button",children:(0,a.jsx)(f,{width:20,height:16,className:"light"===t?"text-white":"text-primary"})}),(0,a.jsx)("button",{className:"flex bottom-0 transition duration-300 ease-in-out transform hover:scale-150",type:"button",children:(0,a.jsx)(p,{width:22,height:16,className:"light"===t?"text-white":"text-primary"})}),(0,a.jsx)("button",{className:"flex bottom-0 transition duration-300 ease-in-out transform hover:scale-150",type:"button",children:(0,a.jsx)(y,{width:16,height:16,className:"light"===t?"text-white":"text-primary"})}),(0,a.jsx)("button",{className:"flex bottom-0 transition duration-300 ease-in-out transform hover:scale-150",type:"button",children:(0,a.jsx)(x,{width:20,height:16,className:"light"===t?"text-white":"text-primary"})})]})]})}},6570:function(e,t,n){"use strict";n.d(t,{Z:function(){return p}});var r,a=n(5893),i=n(7757),o=n.n(i),l=n(2137),s=n(5675),c=n(9226),u=n(7294);function f(){return(f=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e}).apply(this,arguments)}var d=function(e){return u.createElement("svg",f({xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 35 23"},e),r||(r=u.createElement("g",{"data-name":"Group 1031",fill:"none",stroke:"currentColor",strokeWidth:3},u.createElement("path",{"data-name":"Line 1",d:"M35 21.5H0"}),u.createElement("path",{"data-name":"Line 2",d:"M35 11.5H9.082"}),u.createElement("path",{"data-name":"Line 3",d:"M35 1.5H0"}))))},m=n(3022),p=function(e){var t=e.className,n=e.theme,r=(0,c.I0)();return(0,a.jsxs)("div",{className:"flex items-center justify-between ".concat(t||""),children:[(0,a.jsx)(s.default,{className:"animate__animated animate__fadeIn",src:"/images/casper_logo_".concat(n,".svg"),alt:"casper logo",width:125,height:33}),(0,a.jsx)("button",{className:"animate__animated animate__fadeIn animate__delay-2s",type:"button",onClick:function(){var e=(0,l.Z)(o().mark((function e(t){return o().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:t.preventDefault(),r((0,m.Rg)());case 2:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),children:(0,a.jsx)(d,{width:35,height:20,className:"".concat("light"===n?"text-white":"text-dark2")})})]})}},4791:function(e,t,n){"use strict";var r=n(5893);t.Z=function(){return(0,r.jsx)("p",{children:"Loading"})}},1089:function(e,t,n){"use strict";n.d(t,{z:function(){return o}});var r=n(5893),a=n(733),i=n.n(a);function o(e){var t="flex items-center justify-center ".concat(e.className||""),n=e.colorSpinner?e.colorSpinner:"#FFFFFF";return(0,r.jsxs)("button",{className:t,type:e.type?e.type:"button",disabled:!!e.isDisabled&&e.isDisabled,onClick:function(){e.onClick&&"function"===typeof e.onClick&&e.onClick()},children:[e.isLoading&&(0,r.jsx)(i(),{type:"spinningBubbles",color:n,width:30,height:30}),(0,r.jsx)("span",{className:"pl-3",children:e.title})]})}},4205:function(e,t,n){"use strict";n.d(t,{Ge:function(){return r},QI:function(){return a},tH:function(){return i},FZ:function(){return o},ec:function(){return l},mS:function(){return s}});var r=/^[\.a-zA-Z\s ]*$/,a=/^[_A-Za-z0-9-+]+(\.[_A-Za-z0-9-+]+)*@[A-Za-z0-9-]+(\.[A-Za-z0-9-]+)*(\.[A-Za-z\u200c\u200b]{2,})$/,i=/^[A-Za-z0-9-]*$/,o=/(^)@[A-Za-z0-9-\_]*$/,l=/^[A-Za-z0-9-\s\.\_ ]*$/,s=new RegExp("".concat(/(?=.*?[a-zA-Z])/.source).concat(/(?=.*?[0-9])/.source).concat(/(?=.*?[\!\"\-\@\#\$\%\&\*\(\)\'\^\`\.\,\/\:\;\_\+\=\<\>\?\{\}\[\\\]])/.source))},6071:function(e,t,n){"use strict";var r=n(3038),a=n(862);t.default=void 0;var i=a(n(7294)),o=n(1689),l=n(2441),s=n(5749),c={};function u(e,t,n,r){if(e&&(0,o.isLocalURL)(t)){e.prefetch(t,n,r).catch((function(e){0}));var a=r&&"undefined"!==typeof r.locale?r.locale:e&&e.locale;c[t+"%"+n+(a?"%"+a:"")]=!0}}var f=function(e){var t=!1!==e.prefetch,n=(0,l.useRouter)(),a=n&&n.pathname||"/",f=i.default.useMemo((function(){var t=(0,o.resolveHref)(a,e.href,!0),n=r(t,2),i=n[0],l=n[1];return{href:i,as:e.as?(0,o.resolveHref)(a,e.as):l||i}}),[a,e.href,e.as]),d=f.href,m=f.as,p=e.children,h=e.replace,v=e.shallow,y=e.scroll,g=e.locale;"string"===typeof p&&(p=i.default.createElement("a",null,p));var x=i.Children.only(p),b=x&&"object"===typeof x&&x.ref,_=(0,s.useIntersection)({rootMargin:"200px"}),w=r(_,2),j=w[0],E=w[1],O=i.default.useCallback((function(e){j(e),b&&("function"===typeof b?b(e):"object"===typeof b&&(b.current=e))}),[b,j]);(0,i.useEffect)((function(){var e=E&&t&&(0,o.isLocalURL)(d),r="undefined"!==typeof g?g:n&&n.locale,a=c[d+"%"+m+(r?"%"+r:"")];e&&!a&&u(n,d,m,{locale:r})}),[m,d,E,g,t,n]);var N={ref:O,onClick:function(e){x.props&&"function"===typeof x.props.onClick&&x.props.onClick(e),e.defaultPrevented||function(e,t,n,r,a,i,l,s){("A"!==e.currentTarget.nodeName||!function(e){var t=e.currentTarget.target;return t&&"_self"!==t||e.metaKey||e.ctrlKey||e.shiftKey||e.altKey||e.nativeEvent&&2===e.nativeEvent.which}(e)&&(0,o.isLocalURL)(n))&&(e.preventDefault(),null==l&&(l=r.indexOf("#")<0),t[a?"replace":"push"](n,r,{shallow:i,locale:s,scroll:l}))}(e,n,d,m,h,v,y,g)},onMouseEnter:function(e){(0,o.isLocalURL)(d)&&(x.props&&"function"===typeof x.props.onMouseEnter&&x.props.onMouseEnter(e),u(n,d,m,{priority:!0}))}};if(e.passHref||"a"===x.type&&!("href"in x.props)){var S="undefined"!==typeof g?g:n&&n.locale,I=n&&n.isLocaleDomain&&(0,o.getDomainLocale)(m,S,n&&n.locales,n&&n.domainLocales);N.href=I||(0,o.addBasePath)((0,o.addLocale)(m,S,n&&n.defaultLocale))}return i.default.cloneElement(x,N)};t.default=f},1805:function(e,t,n){"use strict";n.r(t);var r=n(5893),a=n(6156),i=n(1664),o=n(7318),l=n.n(o),s=n(2283),c=n(1163),u=n(7294),f=n(9226),d=n(7667),m=n(6570),p=n(4205),h=n(1089),v=n(3022),y=n(4015);function g(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function x(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?g(Object(n),!0).forEach((function(t){(0,a.Z)(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):g(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}t.default=(0,y.a)((function(){var e,t,n,a,o=(0,s.cI)(),y=o.clearErrors,g=o.formState,b=o.register,_=o.handleSubmit,w=o.getValues,j=o.setError,E=(0,f.I0)(),O=(0,c.useRouter)(),N=l()(),S=(0,u.useState)(!1),I=S[0],P=S[1];return(0,r.jsx)("div",{className:"flex justify-center h-screen",style:{backgroundImage:"url('/images/bg_welcome".concat(N.isMobile()?"_mobile":"",".png')"),backgroundSize:"cover"},children:(0,r.jsxs)("div",{className:"w-full md:max-w-screen-2xl md:p-9 p-4 flex flex-col",children:[(0,r.jsx)(m.Z,{theme:"light"}),(0,r.jsx)("form",{className:"flex-grow flex items-center justify-center",onSubmit:_((function(e){P(!0),E((0,v.s)(x({},e),(function(){O.push("/verify-email")}),(function(){P(!1)})))})),children:(0,r.jsxs)("div",{className:"bg-white w-full md:w-2/3 text-center px-4 py-12 md:p-44",style:{backgroundImage:"url('/images/login_overlay.png')",backgroundSize:"cover"},children:[(0,r.jsx)("p",{className:"text-4xl text-center animate__animated animate__fadeInUp",children:"Update Your Email Address"}),(0,r.jsx)("p",{className:"text-xs text-center mt-2 animate__animated animate__fadeInUp animate__delay-2s",children:"Please enter the email you want to change to. This will resend the code to that email and update the email on your account as well."}),(0,r.jsxs)("div",{className:"w-full flex flex-col animate__animated animate__fadeInLeft animate__delay-4s",children:[(0,r.jsx)("input",x({type:"text",className:"text-center w-full h-16 text-xl mt-7 px-7 rounded-full shadow-md focus:outline-none",placeholder:"Enter Updated Email",name:"email"},b("email",{required:"Email is required",pattern:{message:"Email is invalid",value:p.QI},validate:function(e){return e===w().confirmEmail||"Email not match"}}))),(null===(e=g.errors)||void 0===e?void 0:e.email)&&(0,r.jsx)("p",{className:"pl-7 mt-2 text-primary text-left",children:null===(t=g.errors.email)||void 0===t?void 0:t.message})]}),(0,r.jsxs)("div",{className:"w-full flex flex-col animate__animated animate__fadeInLeft animate__delay-4s",children:[(0,r.jsx)("input",x({type:"text",className:"text-center w-full h-16 text-xl mt-7 px-7 rounded-full shadow-md focus:outline-none",placeholder:"Confirm Updated Email",name:"confirmEmail"},b("confirmEmail",{required:"Email Confirm is required",pattern:{message:"Email Confirm is invalid",value:p.QI},validate:function(e){return e===w().email?y("email"):j("email",{message:"Email not match"})}}))),(null===(n=g.errors)||void 0===n?void 0:n.confirmEmail)&&(0,r.jsx)("p",{className:"pl-7 mt-2 text-primary text-left",children:null===(a=g.errors.confirmEmail)||void 0===a?void 0:a.message})]}),(0,r.jsx)("div",{className:"md:flex md:space-x-5 md:mt-4 mt-14 md:justify-center animate__animated animate__fadeInUp animate__delay-2s",children:(0,r.jsx)(h.z,{type:"submit",isDisabled:I,isLoading:I,title:"Update & Resend Code",className:"text-lg text-white w-full md:w-64 h-16 rounded-full bg-primary hover:opacity-40 focus:outline-none shadow-md"})}),(0,r.jsx)(i.default,{href:"/verify-email",children:(0,r.jsxs)("p",{className:"cursor-pointer text-xs text-center mt-5 flex justify-center animate__animated animate__fadeInUp animate__delay-4s",children:[(0,r.jsx)("img",{src:"/images/ic_decline.svg",className:"mr-2",alt:"Go verify email"}),(0,r.jsx)("a",{className:"text-primary underline font-medium",children:"Cancel and go back"})]})})]})}),(0,r.jsx)(d.Z,{theme:"light"})]})})}),"verifying")},3022:function(e,t,n){"use strict";n.d(t,{q0:function(){return r},Rg:function(){return a},uB:function(){return i},xv:function(){return o},c0:function(){return l},s:function(){return s},gQ:function(){return c},lm:function(){return u},D:function(){return f},CS:function(){return d},$Y:function(){return m},B0:function(){return p},av:function(){return h},Nq:function(){return v},pn:function(){return y}});var r=function(e,t,n){return{type:"LOGIN_APP",callback:t,payload:e,resetSubmitting:n}},a=function(){return{type:"LOGOUT_APP"}},i=function(e,t,n){return{type:"REGISTER_ENTITY",callback:t,payload:e,resetSubmitting:n}},o=function(e,t,n){return{type:"REGISTER_INDIVIDUAL",callback:t,payload:e,resetSubmitting:n}},l=function(e,t,n){return{type:"RESET_PASSWORD",callback:t,payload:e,resetSubmitting:n}},s=function(e,t,n){return{type:"UPDATE_EMAIL",callback:t,payload:e,resetSubmitting:n}},c=function(e,t,n){return{type:"UPDATE_PASSWORD",callback:t,payload:e,resetSubmitting:n}},u=function(e,t,n){return{type:"VERIFY_EMAIL",callback:t,payload:e,resetSubmitting:n}},f=function(){return{type:"RESEND_2FA_CODE"}},d=function(){return{type:"FETCH_USER_INFO"}},m=function(e){return{type:"FETCH_USER_INFO_SUCCESS",payload:e}},p=function(e){return{type:"FETCH_USER_INFO_ERROR",payload:e}},h=function(e){return{type:"SET_USER_INFO",payload:e}},v=function(e){return{type:"UPDATE_USER_INFO",payload:e}},y=function(){return{type:"CLEAR_USER_INFO"}}},7822:function(e,t,n){(window.__NEXT_P=window.__NEXT_P||[]).push(["/update-email",function(){return n(1805)}])},1664:function(e,t,n){e.exports=n(6071)},7318:function(e,t,n){"use strict";const{useEffect:r}=n(7294),a=e=>{const t=()=>Boolean(e.match(/Android/i)),n=()=>Boolean(e.match(/iPhone|iPad|iPod/i)),r=()=>Boolean(e.match(/SSR/i)),a=()=>Boolean(t()||n()||Boolean(e.match(/Opera Mini/i))||Boolean(e.match(/IEMobile/i)));return{isMobile:a,isDesktop:()=>Boolean(!a()&&!r()),isAndroid:t,isIos:n,isSSR:r}};e.exports=()=>{const e="undefined"===typeof navigator?"SSR":navigator.userAgent;return a(e)}},4453:function(){}},function(e){e.O(0,[774,282,319,993,733,283],(function(){return t=7822,e(e.s=t);var t}));var t=e.O();_N_E=t}]);