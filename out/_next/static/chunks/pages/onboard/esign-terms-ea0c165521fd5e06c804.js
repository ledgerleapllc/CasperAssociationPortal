(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[665,179],{507:function(e,t,n){e.exports=n(2105)},4015:function(e,t,n){"use strict";n.d(t,{a:function(){return u}});var r=n(6156),a=n(5893),i=n(7294),s=n(1163),o=n(9226);var c=n(4791);function l(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}var u=function(e,t){return function(n){var u=function(){var e=(arguments.length>0&&void 0!==arguments[0]?arguments[0]:{}).urlType,t=void 0===e?"public":e,n=(0,o.v9)((function(e){return e.authReducer.userInfo}));return(0,i.useEffect)((function(){if("public"!==t&&t&&n)if(n&&null!==n&&void 0!==n&&n.isLoggedIn)if("member"===n.role){if("auth"===t)return"verifying"===n.period&&s.default.push("/verify-email"),"onboarding"===n.period&&s.default.push("/onboard"),void("final"===n.period&&s.default.push("/dashboard"));if("verifying"===t)return"onboarding"===n.period&&s.default.push("/onboard"),void("final"===n.period&&s.default.push("/dashboard"));if("onboarding"===t)return"verifying"===n.period&&s.default.push("/verify-email"),void("final"===n.period&&s.default.push("/dashboard"));if("final-member"===t||"final-all"===t)return"verifying"===n.period&&s.default.push("/verify-email"),void("onboarding"===n.period&&s.default.push("/onboard"));"final-admin"===t&&("verifying"===n.period&&s.default.push("/verify-email"),"onboarding"===n.period&&s.default.push("/onboard"),"final"===n.period&&s.default.push("/dashboard"))}else"admin"===n.role&&"final-all"!==t&&"final-admin"!==t&&s.default.push("/admin/dashboard");else"auth"!==t&&s.default.push("/login")}),[n,t]),{user:n}}({urlType:t}).user;if(t&&"public"!==t){if(!u)return(0,a.jsx)(c.Z,{});if("auth"===t&&u.isLoggedIn)return(0,a.jsx)(c.Z,{});if("auth"!==t&&!u.isLoggedIn)return(0,a.jsx)(c.Z,{});if("member"===u.role){if(["final-all","final-member"].includes(t)&&"final"!==u.period)return(0,a.jsx)(c.Z,{});if(["verifying"].includes(t)&&"verifying"!==u.period)return(0,a.jsx)(c.Z,{});if(["onboarding"].includes(t)&&"onboarding"!==u.period)return(0,a.jsx)(c.Z,{})}if("admin"===u.role&&["verifying","onboarding","final-member"].includes(t))return(0,a.jsx)(c.Z,{})}return(0,a.jsx)(e,function(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?l(Object(n),!0).forEach((function(t){(0,r.Z)(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):l(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}({},n))}}},7667:function(e,t,n){"use strict";n.d(t,{Z:function(){return y}});var r,a=n(5893),i=n(7294);function s(){return(s=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e}).apply(this,arguments)}var o,c=function(e){return i.createElement("svg",s({xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 8.087 16.173"},e),r||(r=i.createElement("path",{d:"M2.022 5.391H0v2.7h2.022v8.087h3.369V8.087h2.454l.241-2.7h-2.7V4.268c0-.644.129-.9.751-.9h1.944V0H5.52c-2.423 0-3.5 1.067-3.5 3.11z",fill:"currentColor"})))};function l(){return(l=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e}).apply(this,arguments)}var u,d=function(e){return i.createElement("svg",l({xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 19.901 16.173"},e),o||(o=i.createElement("path",{d:"M19.9 1.915a8.152 8.152 0 01-2.345.643 4.09 4.09 0 001.8-2.259 8.179 8.179 0 01-2.593.991A4.086 4.086 0 009.8 5.013 11.591 11.591 0 011.386.752a4.088 4.088 0 001.263 5.447A4.066 4.066 0 01.8 5.688a4.086 4.086 0 003.275 4.055 4.092 4.092 0 01-1.844.07 4.086 4.086 0 003.814 2.839A8.21 8.21 0 010 14.339a11.559 11.559 0 006.259 1.834A11.547 11.547 0 0017.864 4.028 8.313 8.313 0 0019.9 1.915z",fill:"currentColor"})))};function f(){return(f=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e}).apply(this,arguments)}var m,p=function(e){return i.createElement("svg",f({xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 21.564 16.173"},e),u||(u=i.createElement("path",{d:"M17.624.165c-3.238-.221-10.451-.22-13.684 0C.438.4.026 2.519 0 8.087c.026 5.557.435 7.681 3.94 7.921 3.235.22 10.446.221 13.684 0 3.5-.239 3.914-2.354 3.94-7.921-.026-5.558-.435-7.682-3.94-7.922zM8.087 11.681V4.493l7.188 3.588z",fill:"currentColor"})))};function h(){return(h=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e}).apply(this,arguments)}var x,v=function(e){return i.createElement("svg",h({xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 16.876 16.173"},e),m||(m=i.createElement("path",{d:"M3.5 1.758A1.744 1.744 0 111.758 0 1.751 1.751 0 013.5 1.758zm.014 3.164H0v11.251h3.516zm5.613 0H5.635v11.251h3.494v-5.906c0-3.284 4.24-3.553 4.24 0v5.906h3.508V9.049c0-5.541-6.274-5.339-7.748-2.612z",fill:"currentColor"})))};function b(){return(b=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e}).apply(this,arguments)}var g=function(e){return i.createElement("svg",b({xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 20.373 16.173"},e),x||(x=i.createElement("path",{d:"M2.416 3.3a.788.788 0 00-.257-.666L.257.342V0h5.907l4.565 10.012L14.742 0h5.63v.342L18.746 1.9a.477.477 0 00-.181.457v11.459a.476.476 0 00.181.456l1.588 1.559v.342h-7.989v-.342l1.646-1.6c.161-.161.161-.209.161-.456V4.517L9.578 16.136H8.96L3.633 4.517V12.3a1.075 1.075 0 00.295.893l2.14 2.6v.343H0v-.343l2.14-2.6a1.035 1.035 0 00.276-.893v-9z",fill:"currentColor"})))},y=function(e){var t=e.theme;return(0,a.jsxs)("div",{className:"flex items-center justify-between lg:visible invisible",children:[(0,a.jsx)("p",{className:"".concat("light"===t?"text-white":"text-dark2"," text-xs animate__animated animate__fadeIn animate__delay-5s\n    "),children:"\xa92021 CasperLabs.io"}),(0,a.jsxs)("div",{className:"flex space-x-6 animate__animated animate__fadeIn animate__delay-5s",children:[(0,a.jsx)("button",{className:"flex bottom-0 transition duration-300 ease-in-out transform hover:scale-150",type:"button",children:(0,a.jsx)(c,{width:8,height:16,className:"light"===t?"text-white":"text-primary"})}),(0,a.jsx)("button",{className:"flex bottom-0 transition duration-300 ease-in-out transform hover:scale-150",type:"button",children:(0,a.jsx)(d,{width:20,height:16,className:"light"===t?"text-white":"text-primary"})}),(0,a.jsx)("button",{className:"flex bottom-0 transition duration-300 ease-in-out transform hover:scale-150",type:"button",children:(0,a.jsx)(p,{width:22,height:16,className:"light"===t?"text-white":"text-primary"})}),(0,a.jsx)("button",{className:"flex bottom-0 transition duration-300 ease-in-out transform hover:scale-150",type:"button",children:(0,a.jsx)(v,{width:16,height:16,className:"light"===t?"text-white":"text-primary"})}),(0,a.jsx)("button",{className:"flex bottom-0 transition duration-300 ease-in-out transform hover:scale-150",type:"button",children:(0,a.jsx)(g,{width:20,height:16,className:"light"===t?"text-white":"text-primary"})})]})]})}},6570:function(e,t,n){"use strict";n.d(t,{Z:function(){return p}});var r,a=n(5893),i=n(7757),s=n.n(i),o=n(2137),c=n(5675),l=n(9226),u=n(7294);function d(){return(d=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e}).apply(this,arguments)}var f=function(e){return u.createElement("svg",d({xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 35 23"},e),r||(r=u.createElement("g",{"data-name":"Group 1031",fill:"none",stroke:"currentColor",strokeWidth:3},u.createElement("path",{"data-name":"Line 1",d:"M35 21.5H0"}),u.createElement("path",{"data-name":"Line 2",d:"M35 11.5H9.082"}),u.createElement("path",{"data-name":"Line 3",d:"M35 1.5H0"}))))},m=n(3022),p=function(e){var t=e.className,n=e.theme,r=(0,l.I0)();return(0,a.jsxs)("div",{className:"flex items-center justify-between ".concat(t||""),children:[(0,a.jsx)(c.default,{className:"animate__animated animate__fadeIn",src:"/images/casper_logo_".concat(n,".svg"),alt:"casper logo",width:125,height:33}),(0,a.jsx)("button",{className:"animate__animated animate__fadeIn animate__delay-2s",type:"button",onClick:function(){var e=(0,o.Z)(s().mark((function e(t){return s().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:t.preventDefault(),r((0,m.Rg)());case 2:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),children:(0,a.jsx)(f,{width:35,height:20,className:"".concat("light"===n?"text-white":"text-dark2")})})]})}},4791:function(e,t,n){"use strict";var r=n(5893);t.Z=function(){return(0,r.jsx)("p",{children:"Loading"})}},9299:function(e,t,n){"use strict";var r=n(5893),a=n(1163),i=n(7294),s=n(9226),o=n(3022);t.Z=function(e){var t=e.title,n=e.description,c=e.imageUrl,l=e.currentStep,u=e.totalSteps,d=e.stepContent,f=e.showNextButton,m=e.showContinueButton,p=e.continueButtonTitle,h=e.hideContinueButton,x=e.onPrev,v=e.onNext,b=(0,a.useRouter)(),g=(0,i.useState)(!1),y=g[0],_=g[1],j=(0,s.v9)((function(e){return e.authReducer.userInfo})),w=(0,s.I0)();(0,i.useEffect)((function(){("Submit KYC"===t&&6===l&&j.signature_request_id&&j.node_verified_at||"Esign Terms"===t&&2===l&&j.node_verified_at&&j.kyc_verified_at||"Verify Node Ownership"===t&&3===l&&j.signature_request_id&&j.kyc_verified_at)&&_(!0)}),[l,t]);return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsxs)("div",{className:"block md:hidden w-full flex justify-between animate__animated animate__fadeInUp",children:[(0,r.jsxs)("button",{type:"button",className:"flex items-center focus:outline-none",onClick:x,children:[(0,r.jsx)("img",{src:"/images/ic_prev_circle.svg",alt:"prev",width:"18",height:"18",className:"mr-2"}),(0,r.jsx)("span",{className:"text-primary text-sm",children:"Back"})]}),"Submit KYC"===t?(0,r.jsx)("ul",{className:"list-disc md:list-none",children:(0,r.jsx)("li",{className:"text-primary font-bold text-sm",children:4===l||5===l?"CSPR Owner KYC":"Operator KYC"})}):(0,r.jsxs)("button",{type:"button",className:"flex items-center focus:outline-none ".concat(f?"visible":"invisible"),onClick:v,children:[(0,r.jsx)("span",{className:"text-primary text-sm",children:"Next"}),(0,r.jsx)("img",{src:"/images/ic_next_circle.svg",alt:"next",width:"18",height:"18",className:"ml-2"})]}),!f&&"Submit KYC"===t&&(0,r.jsx)("ul",{className:"list-disc md:list-none",children:(0,r.jsx)("li",{className:"text-primary font-bold text-sm",children:"Operator KYC"})})]}),(0,r.jsxs)("div",{className:"w-full md:w-9/12 md:max-w-6xl",children:[(0,r.jsxs)("div",{className:"hidden md:flex border-b border-gray pb-1 animate__animated animate__fadeInUp",children:[(0,r.jsx)("span",{className:"font-bold text-dark2",children:t}),"Submit KYC"===t&&(0,r.jsxs)("ul",{className:"flex list-disc",children:[(0,r.jsx)("li",{className:"mx-44 text-sm text-primary ".concat(l>=2?"font-bold":"text-opacity-50"),children:"Operator KYC"}),(0,r.jsx)("li",{className:"mx-44 text-sm text-primary ".concat(l>=4?"font-bold":"text-opacity-50"),children:"CSPR Owner KYC"})]})]}),(0,r.jsx)("div",{className:"hidden md:block border-b border-primary border-2 animate__animated animate__fadeInUp",style:{width:"".concat(100*l/u,"%")}}),(0,r.jsxs)("div",{id:"custom-content",className:"mt-2 md:flex md:space-x-12 animate__animated animate__fadeInUp",children:[(0,r.jsxs)("div",{className:"relative w-full md:w-auto md:flex-none md:h-114",children:[(0,r.jsx)("img",{src:c,alt:"esign terms",className:"w-full h-44 md:h-auto object-cover"}),(0,r.jsxs)("div",{className:"absolute bottom-0 mx-4 my-8 opacity-30",children:[(0,r.jsx)("p",{className:"text-2xl",children:t}),(0,r.jsx)("p",{className:"text-sm text-dark1 mt-2",children:n})]})]}),(0,r.jsx)("div",{className:"flex-grow",children:d})]}),(0,r.jsxs)("div",{className:"hidden md:flex justify-between border-b border-gray pb-2",children:[(0,r.jsxs)("button",{type:"button",className:"".concat("Submit KYC"===t&&6===l&&"invisible"," text-center ml-4 text-sm text-dark3 flex flex-col items-center justify-end focus:outline-none animate__animated animate__fadeInUp animate__delay-2s"),onClick:x,children:[(0,r.jsx)("img",{src:"/images/ic_prev_circle_gradient_small.svg",alt:"back",className:"mb-1"}),"Back"]}),!h&&(0,r.jsx)("div",{className:"animate__animated animate__fadeInUp animate__delay-4s",children:(0,r.jsxs)("button",{type:"button",className:"text-center ml-5 text-sm text-dark3 focus:outline-none disabled:opacity-25 disabled:cursor-not-allowed",disabled:!m,onClick:function(){y?(b.push("/dashboard"),w((0,o.Nq)({period:"final"}))):v()},children:[(0,r.jsx)("img",{src:"/images/ic_next_circle_gradient_large.svg",alt:"go to esign",className:"mb-1"}),y?"To Dashboard":p]})})]})]})]})}},5659:function(e,t,n){"use strict";n.r(t),n.d(t,{default:function(){return b}});var r,a=n(5893),i=n(7294),s=n(1163),o=n(9226),c=n(7667),l=n(6570);function u(){return(u=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e}).apply(this,arguments)}var d=function(e){return i.createElement("svg",u({xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 38.662 50.556"},e),r||(r=i.createElement("g",{"data-name":"Icon ionic-ios-document",fill:"rgba(255,255,255,0.9)",stroke:"currentColor",strokeWidth:"1em"},i.createElement("path",{"data-name":"Path 9",d:"M26.268 12.768h11.274a.613.613 0 00.619-.619h0a3.667 3.667 0 00-1.326-2.837l-9.452-7.883a3.979 3.979 0 00-2.552-.917h0a.915.915 0 00-.917.917v8.982a2.353 2.353 0 002.354 2.357z"}),i.createElement("path",{"data-name":"Path 10",d:"M20.693 10.411V.5H4.464A3.976 3.976 0 00.5 4.462v41.629a3.976 3.976 0 003.964 3.964h29.733a3.976 3.976 0 003.964-3.964V15.986H26.268a5.583 5.583 0 01-5.575-5.575z"}))))},f=function(e){var t=e.documents,n=e.selectedDocument,r=e.onDocumentSelect;return(0,a.jsxs)("div",{className:"pt-8",children:[(0,a.jsx)("p",{className:"text-2.5xl",children:"Members must sign the Membership Agreement"}),(0,a.jsx)("p",{className:"text-sm mt-2 text-dark1",children:"Clicking below will open up the hellosign document for capturing your electronic signature"}),(0,a.jsx)("div",{className:"mt-10 flex flex-wrap space-x-10",children:t.map((function(e,t){return(0,a.jsxs)("button",{type:"button",className:"text-center focus:outline-none",onClick:function(){return r(e)},children:[(0,a.jsx)(d,{width:38,height:50,className:e===n?"text-primary":"text-dark-3",style:e===n?{fontSize:"2px"}:{fontSize:"1px"}}),(0,a.jsx)("p",{className:"text-dark3 mt-1 text-xs",children:e})]},t)}))})]})},m=function(e){var t=e.onContinue;return(0,a.jsxs)("div",{className:"pt-8",children:[(0,a.jsx)("p",{className:"text-2.5xl",children:"ESigning was successful"}),(0,a.jsx)("p",{className:"text-sm text-dark1 mt-1",children:"You can continue the onboarding steps."}),(0,a.jsx)("button",{type:"button",className:"block md:hidden text-lg text-white w-full h-16 rounded-full bg-primary focus:outline-none mt-12",onClick:t,children:"Continue"})]})},p=n(9299),h=n(1455),x=n(4015),v=n(3022),b=(0,x.a)((function(){var e=(0,i.useState)(1),t=e[0],r=e[1],u=(0,i.useState)(null),d=u[0],x=u[1],b=(0,i.useState)(null),g=b[0],y=b[1],_=(0,o.I0)();(0,i.useEffect)((function(){var e=n(507);y(new e({clientId:"986d4bc5f54a0b9a96e1816d2204a4a0"}))}),[]),(0,i.useEffect)((function(){g&&g.on("sign",(function(){g.close(),r(t+1)}))}),[g]);var j=(0,s.useRouter)(),w=["Doc1","Doc2","Doc3","Doc4"],N=function(){2===t?(j.push("/onboard"),_((0,v.Nq)({signature_request_id:!0}))):1===t&&_((0,h.EA)((function(e){g.open(e.data.url,{clientId:"986d4bc5f54a0b9a96e1816d2204a4a0",skipDomainVerification:!0})})))},E=function(){_((0,h.EA)((function(e){r(t+1)})))},O=function(){return 1!==t||!!d};return(0,a.jsx)("div",{className:"flex justify-center min-h-screen",children:(0,a.jsxs)("div",{className:"w-full md:max-w-screen-2xl md:p-9 p-4 flex flex-col",children:[(0,a.jsx)(l.Z,{theme:"dark"}),(0,a.jsx)("div",{className:"flex-grow md:flex md:items-center justify-center mt-12 md:mt-0",children:(0,a.jsx)(p.Z,{title:"Esign Terms",description:"You must read and agree to the terms of service before continuing to the portal",imageUrl:"/images/img_signature_blur.png",currentStep:t,totalSteps:2,stepContent:1===t?(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)(f,{documents:w,selectedDocument:d,onDocumentSelect:function(e){return x(d===e?null:e)}}),(0,a.jsx)("div",{className:"mt-8 text-primary",children:(0,a.jsx)("a",{className:"cursor-pointer",onClick:E,children:"By Pass"})})]}):(0,a.jsx)(m,{onContinue:N}),showNextButton:O(),showContinueButton:O(),continueButtonTitle:1===t?"Go to Esign":"Continue",onPrev:function(){1===t?j.back():r(t-1)},onNext:N})}),(0,a.jsx)(c.Z,{theme:"dark"})]})})}),"onboarding")},3022:function(e,t,n){"use strict";n.d(t,{q0:function(){return r},Rg:function(){return a},uB:function(){return i},xv:function(){return s},c0:function(){return o},s:function(){return c},gQ:function(){return l},lm:function(){return u},D:function(){return d},CS:function(){return f},$Y:function(){return m},B0:function(){return p},av:function(){return h},Nq:function(){return x},pn:function(){return v}});var r=function(e,t,n){return{type:"LOGIN_APP",callback:t,payload:e,resetSubmitting:n}},a=function(){return{type:"LOGOUT_APP"}},i=function(e,t,n){return{type:"REGISTER_ENTITY",callback:t,payload:e,resetSubmitting:n}},s=function(e,t,n){return{type:"REGISTER_INDIVIDUAL",callback:t,payload:e,resetSubmitting:n}},o=function(e,t,n){return{type:"RESET_PASSWORD",callback:t,payload:e,resetSubmitting:n}},c=function(e,t,n){return{type:"UPDATE_EMAIL",callback:t,payload:e,resetSubmitting:n}},l=function(e,t,n){return{type:"UPDATE_PASSWORD",callback:t,payload:e,resetSubmitting:n}},u=function(e,t,n){return{type:"VERIFY_EMAIL",callback:t,payload:e,resetSubmitting:n}},d=function(){return{type:"RESEND_2FA_CODE"}},f=function(){return{type:"FETCH_USER_INFO"}},m=function(e){return{type:"FETCH_USER_INFO_SUCCESS",payload:e}},p=function(e){return{type:"FETCH_USER_INFO_ERROR",payload:e}},h=function(e){return{type:"SET_USER_INFO",payload:e}},x=function(e){return{type:"UPDATE_USER_INFO",payload:e}},v=function(){return{type:"CLEAR_USER_INFO"}}},1455:function(e,t,n){"use strict";n.d(t,{EA:function(){return r},gy:function(){return a},_9:function(){return i},H5:function(){return s},Kt:function(){return o},Dr:function(){return c},TP:function(){return l},S5:function(){return u}});var r=function(e){return{type:"HELLO_SIGN_REQUEST",callback:e}},a=function(e,t){return{type:"SUBMIT_KYC",payload:e,resolve:t}},i=function(e){return{type:"SAVE_SHUFTI",payload:e}},s=function(e,t){return{type:"UPDATE_SHUFTI",payload:e,resolve:t}},o=function(e,t,n){return{type:"SUBMIT_PUBLIC_ADDRESS",callback:t,isVerifying:n,payload:e}},c=function(e,t){return{type:"VERIFY_FILE_CASPER_SIGNER",callback:t,payload:e}},l=function(e,t){return{type:"POST_OWNER_NODES",payload:e,resolve:t}},u=function(){return{type:"HANDLE_VIEW_GUIDE"}}},8323:function(e,t,n){(window.__NEXT_P=window.__NEXT_P||[]).push(["/onboard/esign-terms",function(){return n(5659)}])},4453:function(){}},function(e){e.O(0,[9774,117,1282,319,6993],(function(){return t=8323,e(e.s=t);var t}));var t=e.O();_N_E=t}]);