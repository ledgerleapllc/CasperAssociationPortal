(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[8006],{4015:function(e,n,t){"use strict";t.d(n,{a:function(){return c}});var r=t(6156),i=t(5893),a=t(7294),o=t(1163),s=t(9226);var l=t(4791);function u(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);n&&(r=r.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),t.push.apply(t,r)}return t}var c=function(e,n){return function(t){var c=function(){var e=(arguments.length>0&&void 0!==arguments[0]?arguments[0]:{}).urlType,n=void 0===e?"public":e,t=(0,s.v9)((function(e){return e.authReducer.userInfo}));return(0,a.useEffect)((function(){if("public"!==n&&n&&t)if(t&&null!==t&&void 0!==t&&t.isLoggedIn)if("member"===t.role){if("auth"===n)return"verifying"===t.period&&o.default.push("/verify-email"),"onboarding"===t.period&&o.default.push("/onboard"),void("final"===t.period&&o.default.push("/dashboard"));if("verifying"===n)return"onboarding"===t.period&&o.default.push("/onboard"),void("final"===t.period&&o.default.push("/dashboard"));if("onboarding"===n)return"verifying"===t.period&&o.default.push("/verify-email"),void("final"===t.period&&o.default.push("/dashboard"));if("final-member"===n||"final-all"===n)return"verifying"===t.period&&o.default.push("/verify-email"),void("onboarding"===t.period&&o.default.push("/onboard"));"final-admin"===n&&("verifying"===t.period&&o.default.push("/verify-email"),"onboarding"===t.period&&o.default.push("/onboard"),"final"===t.period&&o.default.push("/dashboard"))}else"admin"===t.role&&"final-all"!==n&&"final-admin"!==n&&o.default.push("/admin/dashboard");else"auth"!==n&&o.default.push("/login")}),[t,n]),{user:t}}({urlType:n}).user;if(n&&"public"!==n){if(!c)return(0,i.jsx)(l.Z,{});if("auth"===n&&c.isLoggedIn)return(0,i.jsx)(l.Z,{});if("auth"!==n&&!c.isLoggedIn)return(0,i.jsx)(l.Z,{});if("member"===c.role){if(["final-all","final-member"].includes(n)&&"final"!==c.period)return(0,i.jsx)(l.Z,{});if(["verifying"].includes(n)&&"verifying"!==c.period)return(0,i.jsx)(l.Z,{});if(["onboarding"].includes(n)&&"onboarding"!==c.period)return(0,i.jsx)(l.Z,{})}if("admin"===c.role&&["verifying","onboarding","final-member"].includes(n))return(0,i.jsx)(l.Z,{})}return(0,i.jsx)(e,function(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{};n%2?u(Object(t),!0).forEach((function(n){(0,r.Z)(e,n,t[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):u(Object(t)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))}))}return e}({},t))}}},4791:function(e,n,t){"use strict";var r=t(5893),i=t(733),a=t.n(i);n.Z=function(){return(0,r.jsxs)("div",{className:"fixed inset-0 flex items-center justify-center z-40",children:[(0,r.jsx)("div",{className:"fixed inset-0 bg-white opacity-40"}),(0,r.jsx)(a(),{className:"z-50",type:"spinningBubbles",color:"#FF473E",width:100,height:100})]})}},4205:function(e,n,t){"use strict";t.d(n,{Ge:function(){return r},QI:function(){return i},tH:function(){return a},FZ:function(){return o},ec:function(){return s},mS:function(){return l}});var r=/^[\.a-zA-Z\s ]*$/,i=/^[_A-Za-z0-9-+]+(\.[_A-Za-z0-9-+]+)*@[A-Za-z0-9-]+(\.[A-Za-z0-9-]+)*(\.[A-Za-z\u200c\u200b]{2,})$/,a=/^[A-Za-z0-9-]*$/,o=/(^)@[A-Za-z0-9-\_]*$/,s=/^[A-Za-z0-9-\s\.\_ ]*$/,l=new RegExp("".concat(/(?=.*?[a-zA-Z])/.source).concat(/(?=.*?[0-9])/.source).concat(/(?=.*?[\!\"\-\@\#\$\%\&\*\(\)\'\^\`\.\,\/\:\;\_\+\=\<\>\?\{\}\[\\\]])/.source))},4004:function(e,n,t){"use strict";t.r(n);var r=t(5893),i=t(6156),a=t(1664),o=t(7318),s=t.n(o),l=t(2283),u=t(1163),c=t(7294),d=t(9226),f=t(4504),m=t(6570),p=t(4205),g=t(6766),h=t(3022),b=t(4015);function x(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);n&&(r=r.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),t.push.apply(t,r)}return t}function v(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{};n%2?x(Object(t),!0).forEach((function(n){(0,i.Z)(e,n,t[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):x(Object(t)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))}))}return e}n.default=(0,b.a)((function(){var e,n,t=(0,l.cI)(),i=t.formState,o=t.register,b=t.handleSubmit,x=(0,d.I0)(),y=(0,u.useRouter)(),j=s()(),_=(0,c.useState)(!1),w=_[0],O=_[1];return(0,r.jsx)("div",{className:"flex justify-center h-screen",style:{backgroundImage:"url('/images/bg_welcome".concat(j.isMobile()?"_mobile":"",".png')"),backgroundSize:"cover"},children:(0,r.jsxs)("div",{className:" flex flex-col w-full p-4 lg:max-w-380 lg:p-9 xl:max-w-screen-xl xl:p-9 2xl:max-w-screen-2xl",children:[(0,r.jsx)(m.Z,{theme:"light"}),(0,r.jsx)("form",{className:"flex-grow flex items-center justify-center",onSubmit:b((function(e){O(!0),x((0,h.c0)(v({},e),(function(){y.push("/login")}),(function(){O(!1)})))})),children:(0,r.jsxs)("div",{className:"bg-white w-full lg:w-2/3 text-center px-4 py-12 lg:p-44",style:{backgroundImage:"url('/images/login_overlay.png')",backgroundSize:"cover"},children:[(0,r.jsx)("p",{className:"text-4xl text-center whitespace-pre-line animate__animated animate__fadeInUp",children:"Reset Your Password"}),(0,r.jsx)("p",{className:"text-xs text-center mt-2 animate__animated animate__fadeInUp animate__delay-2s",children:"Please enter your email to request a password reset link."}),(0,r.jsxs)("div",{className:"w-full flex flex-col animate__animated animate__fadeInLeft animate__delay-4s",children:[(0,r.jsx)("input",v({type:"text",className:"font-bold w-full h-16 text-xl mt-7 px-7 rounded-full shadow-md focus:outline-none",placeholder:"Email",name:"email"},o("email",{required:"Email is required",pattern:{message:"Email is invalid",value:p.QI}}))),(null===(e=i.errors)||void 0===e?void 0:e.email)&&(0,r.jsx)("p",{className:"pl-7 mt-2 text-primary text-left",children:null===(n=i.errors.email)||void 0===n?void 0:n.message})]}),(0,r.jsx)("div",{className:"lg:flex lg:space-x-5 lg:mt-4 mt-14 lg:justify-center animate__animated animate__fadeInUp animate__delay-2s",children:(0,r.jsx)(g.fl,{type:"submit",isDisabled:w,isLoading:w,title:"Submit",className:"text-lg text-white w-full lg:w-64 h-16 rounded-full bg-primary hover:opacity-40 focus:outline-none shadow-md"})}),(0,r.jsx)(a.default,{href:"/home",children:(0,r.jsxs)("p",{className:"cursor-pointer text-xs text-center mt-5 flex justify-center animate__animated animate__fadeInUp animate__delay-4s",children:[(0,r.jsx)("img",{src:"/images/ic_decline.svg",className:"mr-2",alt:"Go home page"}),(0,r.jsx)("a",{className:"text-primary underline font-medium",children:"Cancel and go back"})]})})]})}),(0,r.jsx)(f.Z,{theme:"light"})]})})}),"auth")},948:function(e,n,t){(window.__NEXT_P=window.__NEXT_P||[]).push(["/reset-password",function(){return t(4004)}])},7318:function(e,n,t){"use strict";const{useEffect:r}=t(7294),i=e=>{const n=()=>Boolean(e.match(/Android/i)),t=()=>Boolean(e.match(/iPhone|iPad|iPod/i)),r=()=>Boolean(e.match(/SSR/i)),i=()=>Boolean(n()||t()||Boolean(e.match(/Opera Mini/i))||Boolean(e.match(/IEMobile/i)));return{isMobile:i,isDesktop:()=>Boolean(!i()&&!r()),isAndroid:n,isIos:t,isSSR:r}};e.exports=()=>{const e="undefined"===typeof navigator?"SSR":navigator.userAgent;return i(e)}}},function(e){e.O(0,[9774,2554,1282,8930,6993,6095,2283,2602],(function(){return n=948,e(e.s=n);var n}));var n=e.O();_N_E=n}]);