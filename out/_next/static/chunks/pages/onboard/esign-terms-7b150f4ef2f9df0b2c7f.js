(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[665,179],{9756:function(e,t,n){"use strict";function r(e,t){if(null==e)return{};var n,r,i={},a=Object.keys(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)>=0||(i[n]=e[n]);return i}n.d(t,{Z:function(){return r}})},507:function(e,t,n){e.exports=n(2105)},4015:function(e,t,n){"use strict";n.d(t,{a:function(){return u}});var r=n(6156),i=n(5893),a=n(7294),s=n(1163),o=n(9226);var c=n(4791);function l(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}var u=function(e,t){return function(n){var u=function(){var e=(arguments.length>0&&void 0!==arguments[0]?arguments[0]:{}).urlType,t=void 0===e?"public":e,n=(0,o.v9)((function(e){return e.authReducer.userInfo}));return(0,a.useEffect)((function(){if("public"!==t&&t&&n)if(n&&null!==n&&void 0!==n&&n.isLoggedIn)if("member"===n.role){if("auth"===t)return"verifying"===n.period&&s.default.push("/verify-email"),"onboarding"===n.period&&s.default.push("/onboard"),void("final"===n.period&&s.default.push("/dashboard"));if("verifying"===t)return"onboarding"===n.period&&s.default.push("/onboard"),void("final"===n.period&&s.default.push("/dashboard"));if("onboarding"===t)return"verifying"===n.period&&s.default.push("/verify-email"),void("final"===n.period&&s.default.push("/dashboard"));if("final-member"===t||"final-all"===t)return"verifying"===n.period&&s.default.push("/verify-email"),void("onboarding"===n.period&&s.default.push("/onboard"));"final-admin"===t&&("verifying"===n.period&&s.default.push("/verify-email"),"onboarding"===n.period&&s.default.push("/onboard"),"final"===n.period&&s.default.push("/dashboard"))}else"admin"===n.role&&"final-all"!==t&&"final-admin"!==t&&s.default.push("/admin/dashboard");else"auth"!==t&&s.default.push("/login")}),[n,t]),{user:n}}({urlType:t}).user;if(t&&"public"!==t){if(!u)return(0,i.jsx)(c.Z,{});if("auth"===t&&u.isLoggedIn)return(0,i.jsx)(c.Z,{});if("auth"!==t&&!u.isLoggedIn)return(0,i.jsx)(c.Z,{});if("member"===u.role){if(["final-all","final-member"].includes(t)&&"final"!==u.period)return(0,i.jsx)(c.Z,{});if(["verifying"].includes(t)&&"verifying"!==u.period)return(0,i.jsx)(c.Z,{});if(["onboarding"].includes(t)&&"onboarding"!==u.period)return(0,i.jsx)(c.Z,{})}if("admin"===u.role&&["verifying","onboarding","final-member"].includes(t))return(0,i.jsx)(c.Z,{})}return(0,i.jsx)(e,function(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?l(Object(n),!0).forEach((function(t){(0,r.Z)(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):l(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}({},n))}}},4504:function(e,t,n){"use strict";n.d(t,{Z:function(){return y}});var r,i=n(5893),a=n(7294);function s(){return(s=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e}).apply(this,arguments)}var o,c=function(e){return a.createElement("svg",s({xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 8.087 16.173"},e),r||(r=a.createElement("path",{d:"M2.022 5.391H0v2.7h2.022v8.087h3.369V8.087h2.454l.241-2.7h-2.7V4.268c0-.644.129-.9.751-.9h1.944V0H5.52c-2.423 0-3.5 1.067-3.5 3.11z",fill:"currentColor"})))};function l(){return(l=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e}).apply(this,arguments)}var u,d=function(e){return a.createElement("svg",l({xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 19.901 16.173"},e),o||(o=a.createElement("path",{d:"M19.9 1.915a8.152 8.152 0 01-2.345.643 4.09 4.09 0 001.8-2.259 8.179 8.179 0 01-2.593.991A4.086 4.086 0 009.8 5.013 11.591 11.591 0 011.386.752a4.088 4.088 0 001.263 5.447A4.066 4.066 0 01.8 5.688a4.086 4.086 0 003.275 4.055 4.092 4.092 0 01-1.844.07 4.086 4.086 0 003.814 2.839A8.21 8.21 0 010 14.339a11.559 11.559 0 006.259 1.834A11.547 11.547 0 0017.864 4.028 8.313 8.313 0 0019.9 1.915z",fill:"currentColor"})))};function m(){return(m=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e}).apply(this,arguments)}var f,p=function(e){return a.createElement("svg",m({xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 21.564 16.173"},e),u||(u=a.createElement("path",{d:"M17.624.165c-3.238-.221-10.451-.22-13.684 0C.438.4.026 2.519 0 8.087c.026 5.557.435 7.681 3.94 7.921 3.235.22 10.446.221 13.684 0 3.5-.239 3.914-2.354 3.94-7.921-.026-5.558-.435-7.682-3.94-7.922zM8.087 11.681V4.493l7.188 3.588z",fill:"currentColor"})))};function h(){return(h=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e}).apply(this,arguments)}var x,b=function(e){return a.createElement("svg",h({xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 16.876 16.173"},e),f||(f=a.createElement("path",{d:"M3.5 1.758A1.744 1.744 0 111.758 0 1.751 1.751 0 013.5 1.758zm.014 3.164H0v11.251h3.516zm5.613 0H5.635v11.251h3.494v-5.906c0-3.284 4.24-3.553 4.24 0v5.906h3.508V9.049c0-5.541-6.274-5.339-7.748-2.612z",fill:"currentColor"})))};function v(){return(v=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e}).apply(this,arguments)}var g=function(e){return a.createElement("svg",v({xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 20.373 16.173"},e),x||(x=a.createElement("path",{d:"M2.416 3.3a.788.788 0 00-.257-.666L.257.342V0h5.907l4.565 10.012L14.742 0h5.63v.342L18.746 1.9a.477.477 0 00-.181.457v11.459a.476.476 0 00.181.456l1.588 1.559v.342h-7.989v-.342l1.646-1.6c.161-.161.161-.209.161-.456V4.517L9.578 16.136H8.96L3.633 4.517V12.3a1.075 1.075 0 00.295.893l2.14 2.6v.343H0v-.343l2.14-2.6a1.035 1.035 0 00.276-.893v-9z",fill:"currentColor"})))},y=function(e){var t=e.theme;return(0,i.jsxs)("div",{className:"flex items-center justify-between lg:visible invisible",children:[(0,i.jsx)("p",{className:"".concat("light"===t?"text-white":"text-dark2"," text-xs animate__animated animate__fadeIn animate__delay-5s\n    "),children:"\xa92021 CasperLabs.io"}),(0,i.jsxs)("div",{className:"flex space-x-6 animate__animated animate__fadeIn animate__delay-5s",children:[(0,i.jsx)("button",{className:"flex bottom-0 transition duration-300 ease-in-out transform hover:scale-150",type:"button",children:(0,i.jsx)(c,{width:8,height:16,className:"light"===t?"text-white":"text-primary"})}),(0,i.jsx)("button",{className:"flex bottom-0 transition duration-300 ease-in-out transform hover:scale-150",type:"button",children:(0,i.jsx)(d,{width:20,height:16,className:"light"===t?"text-white":"text-primary"})}),(0,i.jsx)("button",{className:"flex bottom-0 transition duration-300 ease-in-out transform hover:scale-150",type:"button",children:(0,i.jsx)(p,{width:22,height:16,className:"light"===t?"text-white":"text-primary"})}),(0,i.jsx)("button",{className:"flex bottom-0 transition duration-300 ease-in-out transform hover:scale-150",type:"button",children:(0,i.jsx)(b,{width:16,height:16,className:"light"===t?"text-white":"text-primary"})}),(0,i.jsx)("button",{className:"flex bottom-0 transition duration-300 ease-in-out transform hover:scale-150",type:"button",children:(0,i.jsx)(g,{width:20,height:16,className:"light"===t?"text-white":"text-primary"})})]})]})}},6570:function(e,t,n){"use strict";n.d(t,{Z:function(){return p}});var r,i=n(5893),a=n(7757),s=n.n(a),o=n(2137),c=n(5675),l=n(9226),u=n(7294);function d(){return(d=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e}).apply(this,arguments)}var m=function(e){return u.createElement("svg",d({xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 35 23"},e),r||(r=u.createElement("g",{"data-name":"Group 1031",fill:"none",stroke:"currentColor",strokeWidth:3},u.createElement("path",{"data-name":"Line 1",d:"M35 21.5H0"}),u.createElement("path",{"data-name":"Line 2",d:"M35 11.5H9.082"}),u.createElement("path",{"data-name":"Line 3",d:"M35 1.5H0"}))))},f=n(3022),p=function(e){var t=e.className,n=e.theme,r=(0,l.I0)();return(0,i.jsxs)("div",{className:"flex items-center justify-between ".concat(t||""),children:[(0,i.jsx)(c.default,{className:"animate__animated animate__fadeIn",src:"/images/casper_logo_".concat(n,".svg"),alt:"casper logo",width:125,height:33}),(0,i.jsx)("button",{className:"animate__animated animate__fadeIn animate__delay-2s",type:"button",onClick:function(){var e=(0,o.Z)(s().mark((function e(t){return s().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:t.preventDefault(),r((0,f.Rg)());case 2:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),children:(0,i.jsx)(m,{width:35,height:20,className:"".concat("light"===n?"text-white":"text-dark2")})})]})}},9299:function(e,t,n){"use strict";var r=n(5893),i=n(1163),a=n(7294),s=n(9226),o=n(3022);t.Z=function(e){var t=e.title,n=e.description,c=e.imageUrl,l=e.currentStep,u=e.totalSteps,d=e.stepContent,m=e.showNextButton,f=e.showContinueButton,p=e.continueButtonTitle,h=e.hideContinueButton,x=e.onPrev,b=e.onNext,v=(0,i.useRouter)(),g=(0,a.useState)(!1),y=g[0],j=g[1],w=(0,s.v9)((function(e){return e.authReducer.userInfo})),_=(0,s.I0)();(0,a.useEffect)((function(){("Submit KYC"===t&&6===l&&w.signature_request_id&&w.node_verified_at||"Esign Terms"===t&&2===l&&w.node_verified_at&&w.kyc_verified_at||"Verify Node Ownership"===t&&3===l&&w.signature_request_id&&w.kyc_verified_at)&&j(!0)}),[l,t]);return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsxs)("div",{className:"block md:hidden w-full flex justify-between animate__animated animate__fadeInUp",children:[(0,r.jsxs)("button",{type:"button",className:"flex items-center focus:outline-none",onClick:x,children:[(0,r.jsx)("img",{src:"/images/ic_prev_circle.svg",alt:"prev",width:"18",height:"18",className:"mr-2"}),(0,r.jsx)("span",{className:"text-primary text-sm",children:"Back"})]}),"Submit KYC"===t?(0,r.jsx)("ul",{className:"list-disc md:list-none",children:(0,r.jsx)("li",{className:"text-primary font-bold text-sm",children:4===l||5===l?"CSPR Owner KYC":"Operator KYC"})}):(0,r.jsxs)("button",{type:"button",className:"flex items-center focus:outline-none ".concat(m?"visible":"invisible"),onClick:b,children:[(0,r.jsx)("span",{className:"text-primary text-sm",children:"Next"}),(0,r.jsx)("img",{src:"/images/ic_next_circle.svg",alt:"next",width:"18",height:"18",className:"ml-2"})]}),!m&&"Submit KYC"===t&&(0,r.jsx)("ul",{className:"list-disc md:list-none",children:(0,r.jsx)("li",{className:"text-primary font-bold text-sm",children:"Operator KYC"})})]}),(0,r.jsxs)("div",{className:"w-full md:w-8.85/10",children:[(0,r.jsxs)("div",{className:"hidden md:flex border-b border-gray pb-1 animate__animated animate__fadeInUp",children:[(0,r.jsx)("span",{className:"font-bold text-dark2",children:t}),"Submit KYC"===t&&(0,r.jsxs)("ul",{className:"flex list-disc",children:[(0,r.jsx)("li",{className:"mx-44 text-sm text-primary ".concat(l>=2?"font-bold":"text-opacity-50"),children:"Operator KYC"}),(0,r.jsx)("li",{className:"mx-44 text-sm text-primary ".concat(l>=4?"font-bold":"text-opacity-50"),children:"CSPR Owner KYC"})]})]}),(0,r.jsx)("div",{className:"hidden md:block border-b border-primary border-2 animate__animated animate__fadeInUp",style:{width:"".concat(100*l/u,"%")}}),(0,r.jsxs)("div",{id:"custom-content",className:"mt-2 md:flex md:space-x-12 animate__animated animate__fadeInUp",children:[(0,r.jsxs)("div",{className:"relative w-full md:w-auto md:flex-none md:h-114",children:[(0,r.jsx)("img",{src:c,alt:"esign terms",className:"w-full h-44 md:h-auto object-cover"}),(0,r.jsxs)("div",{className:"absolute bottom-0 mx-4 my-8 opacity-30",children:[(0,r.jsx)("p",{className:"text-2xl",children:t}),(0,r.jsx)("p",{className:"text-sm text-dark1 mt-2",children:n})]})]}),(0,r.jsx)("div",{className:"flex-grow",children:d})]}),(0,r.jsxs)("div",{className:"hidden md:flex justify-between border-b border-gray pb-2",children:[(0,r.jsxs)("button",{type:"button",className:"".concat("Submit KYC"===t&&6===l&&"invisible"," text-center ml-4 text-sm text-dark3 flex flex-col items-center justify-end focus:outline-none animate__animated animate__fadeInUp animate__delay-2s"),onClick:x,children:[(0,r.jsx)("img",{src:"/images/ic_prev_circle_gradient_small.svg",alt:"back",className:"mb-1"}),"Back"]}),!h&&(0,r.jsx)("div",{className:"animate__animated animate__fadeInUp animate__delay-4s",children:(0,r.jsxs)("button",{type:"button",className:"text-center ml-5 text-sm text-dark3 focus:outline-none disabled:opacity-25 disabled:cursor-not-allowed",disabled:!f,onClick:function(){y?(v.push("/dashboard"),_((0,o.Nq)({period:"final"}))):b()},children:[(0,r.jsx)("img",{src:"/images/ic_next_circle_gradient_large.svg",alt:"go to esign",className:"mb-1"}),y?"To Dashboard":p]})})]})]})]})}},1089:function(e,t,n){"use strict";n.d(t,{z:function(){return s}});var r=n(5893),i=n(733),a=n.n(i);function s(e){var t="flex items-center justify-center ".concat(e.className||""),n=e.colorSpinner?e.colorSpinner:"#FFFFFF";return(0,r.jsxs)("button",{className:t,type:e.type?e.type:"button",disabled:!!e.isDisabled&&e.isDisabled,onClick:function(){e.onClick&&"function"===typeof e.onClick&&e.onClick()},children:[e.isLoading&&(0,r.jsx)(a(),{className:"mr-3",type:"spinningBubbles",color:n,width:e.size||30,height:e.size||30}),(0,r.jsx)("span",{children:e.title})]})}},1714:function(e,t,n){"use strict";n.r(t),n.d(t,{default:function(){return S}});var r,i=n(5893),a=n(6156),s=n(7294),o=n(1163),c=n(9226),l=n(4504),u=n(6570);function d(){return(d=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e}).apply(this,arguments)}var m=function(e){return s.createElement("svg",d({xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 38.662 50.556"},e),r||(r=s.createElement("g",{"data-name":"Icon ionic-ios-document",fill:"rgba(255,255,255,0.9)",stroke:"currentColor",strokeWidth:"1em"},s.createElement("path",{"data-name":"Path 9",d:"M26.268 12.768h11.274a.613.613 0 00.619-.619h0a3.667 3.667 0 00-1.326-2.837l-9.452-7.883a3.979 3.979 0 00-2.552-.917h0a.915.915 0 00-.917.917v8.982a2.353 2.353 0 002.354 2.357z"}),s.createElement("path",{"data-name":"Path 10",d:"M20.693 10.411V.5H4.464A3.976 3.976 0 00.5 4.462v41.629a3.976 3.976 0 003.964 3.964h29.733a3.976 3.976 0 003.964-3.964V15.986H26.268a5.583 5.583 0 01-5.575-5.575z"}))))},f=function(e){var t=e.documents,n=e.selectedDocument,r=e.onDocumentSelect;return(0,i.jsxs)("div",{className:"pt-8",children:[(0,i.jsx)("p",{className:"text-2.5xl",children:"Now, you must sign the Membership Agreement"}),(0,i.jsx)("p",{className:"text-sm mt-2 text-dark1",children:"Clicking the icons below will open them up on a new tab for viewing before you sign. On the next screen, you will electronically sign these documents. Please click next to proceed after your are done reviewing."}),(0,i.jsx)("div",{className:"mt-10 flex flex-wrap space-x-10",children:t.map((function(e,t){return(0,i.jsxs)("button",{type:"button",className:"text-center focus:outline-none",onClick:function(){return r(e)},children:[(0,i.jsx)(m,{width:38,height:50,className:e===n?"text-primary":"text-dark-3",style:e===n?{fontSize:"2px"}:{fontSize:"1px"}}),(0,i.jsx)("p",{className:"text-dark3 mt-1 text-xs",children:e})]},t)}))})]})},p=function(e){var t=e.onContinue;return(0,i.jsxs)("div",{className:"pt-8",children:[(0,i.jsx)("p",{className:"text-2.5xl",children:"ESigning was successful"}),(0,i.jsx)("p",{className:"text-sm text-dark1 mt-1",children:"You can continue the onboarding steps."}),(0,i.jsx)("button",{type:"button",className:"block md:hidden text-lg text-white w-full h-16 rounded-full bg-primary focus:outline-none mt-12",onClick:t,children:"Continue"})]})},h=n(463),x=n(733),b=n.n(x),v=n(1089);function g(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function y(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?g(Object(n),!0).forEach((function(t){(0,a.Z)(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):g(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}var j=function(e){var t=e.selectedDocument,n=e.onDocumentSelect,r=(0,s.useState)(!1),a=r[0],o=r[1],l=(0,c.v9)((function(e){var t;return null===e||void 0===e||null===(t=e.onboardReducer)||void 0===t?void 0:t.uploadLetter})).isLoading,u=function(e){"open"===e?(document.getElementById("custom-content").classList.add("remove-animation"),o(!0)):"close"===e&&o(!1)},d=(0,s.useCallback)((function(e){var t=e[0],r=t.name,i={lastModified:t.lastModified,lastModifiedDate:t.lastModifiedDate,type:t.type},a=new File([t],r,i);u("close"),n({name:r,file:a})}),[]),m=(0,h.u)({multiple:!1,onDrop:d}),f=m.getRootProps,p=m.getInputProps;return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsxs)("div",{className:"pt-8",children:[(0,i.jsx)("p",{className:"text-2.5xl",children:"First, please upload a letter explaining why you would like to join."}),(0,i.jsx)("p",{className:"text-sm mt-2 md:mb-14 mb-14 text-dark1",children:"Each member in the portal must upload a \u201cletter of motivation\u201d summarizing why they are requesting to become a member. This letter should explain, in a short paragraph or two, why you would like to become a member of the Casper Association and include the signature of the node operator or person in a management role within your organization."}),l?(0,i.jsx)(b(),{type:"spinningBubbles",color:"#FF473E",width:80,height:80}):(0,i.jsxs)("div",{className:"md:flex-column md:space-x-5 md:justify-start animate__animated animate__fadeInUp animate__delay-2s",children:[(0,i.jsx)(v.z,{type:"submit",title:"Upload letter",className:"text-lg text-white w-full md:w-64 h-16 rounded-full bg-primary hover:opacity-40 focus:outline-none shadow-md",onClick:function(){return u("open")}}),t&&(0,i.jsxs)("div",{className:"flex mt-5 items-center",children:[(0,i.jsx)("button",{className:"pr-3 w-7",onClick:function(){return n(null)},type:"button",children:(0,i.jsx)("img",{className:"w-full",src:"/images/ic_x.svg",alt:"icon x"})}),(0,i.jsx)("span",{className:"text-sm text-primary",children:t.name})]})]})]}),a&&(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)("div",{className:"backdrop-filter backdrop-blur-sm justify-center items-center flex fixed inset-0 z-50",children:(0,i.jsx)("div",{className:"w-full max-w-2xl shadow-2xl mx-4 relative bg-white",children:(0,i.jsx)("div",y(y({},f()),{},{children:(0,i.jsx)("div",{className:"py-36 flex flex-col items-center justify-between border-2 border-dashed border-gray",children:(0,i.jsxs)("div",{className:"flex flex-col items-center justify-between",children:[(0,i.jsx)("input",y({},p())),(0,i.jsx)("img",{src:"/images/ic_upload.svg",alt:"upload",className:"align-middle mb-6"}),(0,i.jsx)("button",{type:"button",className:"mb-2.5 text-lg text-white w-full px-14 py-5 shadow-lg rounded-full bg-primary hover:opacity-40 focus:outline-none",children:"Upload Letter of Motivation"}),(0,i.jsx)("span",{className:"hidden md:block",children:"Or Drap File Here"})]})})}))})}),(0,i.jsx)("div",{className:"opacity-25 fixed inset-0 z-40 bg-black"})]})]})},w=n(9299),_=n(1455),N=n(4015),O=n(3022),E=n(3455);function k(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function C(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?k(Object(n),!0).forEach((function(t){(0,a.Z)(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):k(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}var S=(0,N.a)((function(){var e=(0,s.useState)(1),t=e[0],r=e[1],a=(0,s.useState)(!1),d=a[0],m=a[1],h=(0,s.useState)({step1:null,step2:null}),x=h[0],b=h[1],v=(0,s.useState)(null),g=v[0],y=v[1],N=(0,c.I0)(),k=(0,c.v9)((function(e){var t;return null===e||void 0===e||null===(t=e.onboardReducer)||void 0===t?void 0:t.uploadLetter})).isLoading,S=(0,s.useContext)(E.AppContext).setLoading,P=(0,o.useRouter)(),D=["Doc1","Doc2","Doc3","Doc4"],I=function(){3===t?(P.push("/onboard"),N((0,O.Nq)({signature_request_id:!0}))):2===t?(S(!0),N((0,_.EA)((function(e){S(!1),g.open(e.data.url,{clientId:"d0cb9c3a8a0ce7b34a62985617bf22eb",skipDomainVerification:!0})}),(function(){S(!1)})))):1===t&&N((0,_.cf)({newFile:x.step1.file},(function(){r(t+1)})))};(0,s.useEffect)((function(){var e=n(507);y(new e({clientId:"d0cb9c3a8a0ce7b34a62985617bf22eb"}))}),[]),(0,s.useEffect)((function(){g&&g.on("sign",(function(){g.close(),m(!0)}))}),[g]),(0,s.useEffect)((function(){2===t&&r(t+1)}),[d]);var R=function(){return 3===t||(!!x["step".concat(t)]||k)};return(0,i.jsx)("div",{className:"flex justify-center min-h-screen",children:(0,i.jsxs)("div",{className:"w-full md:max-w-screen-2xl md:p-9 p-4 flex flex-col",children:[(0,i.jsx)(u.Z,{theme:"dark"}),(0,i.jsx)("div",{className:"flex-grow md:flex md:items-center justify-center mt-12 md:mt-0",children:(0,i.jsx)(w.Z,{title:"Esign Terms",description:"You must read and agree to the terms of service before continuing to the portal",imageUrl:"/images/img_signature_blur.png",currentStep:t,totalSteps:3,stepContent:1===t?(0,i.jsx)(j,{selectedDocument:null===x||void 0===x?void 0:x.step1,onDocumentSelect:function(e){b((function(t){return C(C({},t),{step1:x===e?null:e})}))}}):2===t?(0,i.jsx)(i.Fragment,{children:(0,i.jsx)(f,{documents:D,selectedDocument:null===x||void 0===x?void 0:x.step2,onDocumentSelect:function(e){b((function(t){return C(C({},t),{step2:x===e?null:e})}))}})}):(0,i.jsx)(p,{onContinue:I}),showNextButton:R(),showContinueButton:R(),continueButtonTitle:2===t?"Go to Esign":"Continue",onPrev:function(){1===t?P.back():r(t-1)},onNext:I})}),(0,i.jsx)(l.Z,{theme:"dark"})]})})}),"onboarding")},3022:function(e,t,n){"use strict";n.d(t,{q0:function(){return r},Rg:function(){return i},uB:function(){return a},xv:function(){return s},c0:function(){return o},s:function(){return c},gQ:function(){return l},lm:function(){return u},D:function(){return d},CS:function(){return m},$Y:function(){return f},B0:function(){return p},av:function(){return h},Nq:function(){return x},pn:function(){return b}});var r=function(e,t,n){return{type:"LOGIN_APP",callback:t,payload:e,resetSubmitting:n}},i=function(){return{type:"LOGOUT_APP"}},a=function(e,t,n){return{type:"REGISTER_ENTITY",callback:t,payload:e,resetSubmitting:n}},s=function(e,t,n){return{type:"REGISTER_INDIVIDUAL",callback:t,payload:e,resetSubmitting:n}},o=function(e,t,n){return{type:"RESET_PASSWORD",callback:t,payload:e,resetSubmitting:n}},c=function(e,t,n){return{type:"UPDATE_EMAIL",callback:t,payload:e,resetSubmitting:n}},l=function(e,t,n){return{type:"UPDATE_PASSWORD",callback:t,payload:e,resetSubmitting:n}},u=function(e,t,n){return{type:"VERIFY_EMAIL",callback:t,payload:e,resetSubmitting:n}},d=function(){return{type:"RESEND_2FA_CODE"}},m=function(){return{type:"FETCH_USER_INFO"}},f=function(e){return{type:"FETCH_USER_INFO_SUCCESS",payload:e}},p=function(e){return{type:"FETCH_USER_INFO_ERROR",payload:e}},h=function(e){return{type:"SET_USER_INFO",payload:e}},x=function(e){return{type:"UPDATE_USER_INFO",payload:e}},b=function(){return{type:"CLEAR_USER_INFO"}}},8323:function(e,t,n){(window.__NEXT_P=window.__NEXT_P||[]).push(["/onboard/esign-terms",function(){return n(1714)}])},4453:function(){}},function(e){e.O(0,[9774,117,1282,8930,6993,9041,463,8620],(function(){return t=8323,e(e.s=t);var t}));var t=e.O();_N_E=t}]);