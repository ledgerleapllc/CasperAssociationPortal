(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[1389],{24015:function(e,n,r){"use strict";r.d(n,{a:function(){return d}});var t=r(96156),i=r(85893),s=r(67294),l=r(11163),a=r(49226);var c=r(44791);function o(e,n){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var t=Object.getOwnPropertySymbols(e);n&&(t=t.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),r.push.apply(r,t)}return r}var d=function(e,n){return function(r){var d=function(){var e=(arguments.length>0&&void 0!==arguments[0]?arguments[0]:{}).urlType,n=void 0===e?"public":e,r=(0,a.v9)((function(e){return e.authReducer.userInfo}));return(0,s.useEffect)((function(){if("public"!==n&&n&&r)if(r&&null!==r&&void 0!==r&&r.isLoggedIn)if("member"===r.role){if("auth"===n)return"verifying"===r.period&&l.default.push("/verify-email"),"onboarding"===r.period&&l.default.push("/onboard"),void("final"===r.period&&l.default.push("/dashboard"));if("verifying"===n)return"onboarding"===r.period&&l.default.push("/onboard"),void("final"===r.period&&l.default.push("/dashboard"));if("onboarding"===n)return"verifying"===r.period&&l.default.push("/verify-email"),void("final"===r.period&&l.default.push("/dashboard"));if("final-member"===n||"final-all"===n)return"verifying"===r.period&&l.default.push("/verify-email"),void("onboarding"===r.period&&l.default.push("/onboard"));"final-admin"===n&&("verifying"===r.period&&l.default.push("/verify-email"),"onboarding"===r.period&&l.default.push("/onboard"),"final"===r.period&&l.default.push("/dashboard"))}else["admin","sub-admin"].includes(r.role)&&"final-all"!==n&&"final-admin"!==n&&l.default.push("/admin/dashboard");else"auth"!==n&&l.default.push("/login")}),[r,n]),{user:r}}({urlType:n}).user;if(n&&"public"!==n){if(!d)return(0,i.jsx)(c.Z,{});if("auth"===n&&d.isLoggedIn)return(0,i.jsx)(c.Z,{});if("auth"!==n&&!d.isLoggedIn)return(0,i.jsx)(c.Z,{});if("member"===d.role){if(["final-all","final-member"].includes(n)&&"final"!==d.period)return(0,i.jsx)(c.Z,{});if(["verifying"].includes(n)&&"verifying"!==d.period)return(0,i.jsx)(c.Z,{});if(["onboarding"].includes(n)&&"onboarding"!==d.period)return(0,i.jsx)(c.Z,{})}if(["admin","sub-admin"].includes(d.role)&&["verifying","onboarding","final-member"].includes(n))return(0,i.jsx)(c.Z,{})}return(0,i.jsx)(e,function(e){for(var n=1;n<arguments.length;n++){var r=null!=arguments[n]?arguments[n]:{};n%2?o(Object(r),!0).forEach((function(n){(0,t.Z)(e,n,r[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):o(Object(r)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(r,n))}))}return e}({},r))}}},96375:function(e,n,r){"use strict";r.d(n,{Z:function(){return l}});var t=r(67294),i=r(49226),s=r(43022);function l(){var e=(0,i.v9)((function(e){return e.authReducer.metrics})),n=(0,i.I0)();return(0,t.useEffect)((function(){Object.keys(e).length||n((0,s.qA)())}),[e]),{metrics:e}}},44791:function(e,n,r){"use strict";var t=r(85893),i=r(733),s=r.n(i);n.Z=function(){return(0,t.jsxs)("div",{className:"fixed inset-0 flex items-center justify-center z-40",children:[(0,t.jsx)("div",{className:"fixed inset-0 bg-white opacity-40"}),(0,t.jsx)(s(),{className:"z-50",type:"spinningBubbles",color:"#FF473E",width:100,height:100})]})}},76990:function(e,n,r){"use strict";r.r(n),r.d(n,{default:function(){return P}});var t,i=r(85893),s=r(87757),l=r.n(s),a=r(92137),c=r(96156),o=r(32465),d=r(67294),u=r(11163),f=r(49226),p=r(29163),h=r(41664),x=r(733),v=r.n(x),j=r(24015),y=r(25955),m=r(89),b=r(8517);function g(){return(g=Object.assign||function(e){for(var n=1;n<arguments.length;n++){var r=arguments[n];for(var t in r)Object.prototype.hasOwnProperty.call(r,t)&&(e[t]=r[t])}return e}).apply(this,arguments)}var _=function(e){return d.createElement("svg",g({xmlns:"http://www.w3.org/2000/svg",width:"1em",height:"1em",viewBox:"0 0 25.8 22.575"},e),t||(t=d.createElement("path",{d:"M25.8 5.644v14.512a2.419 2.419 0 01-2.419 2.419H2.419A2.419 2.419 0 010 20.156V5.644a2.419 2.419 0 012.419-2.419h4.434l.62-1.658A2.415 2.415 0 019.735 0h6.324a2.415 2.415 0 012.263 1.567l.625 1.658h4.434A2.419 2.419 0 0125.8 5.644zM18.947 12.9a6.047 6.047 0 10-6.047 6.05 6.052 6.052 0 006.047-6.05zm-1.612 0A4.434 4.434 0 1112.9 8.466a4.441 4.441 0 014.434 4.434z",fill:"#d3d3d3"})))},N=r(29586),O=r(35708),S=r(43022),E=r(96375);function T(e,n){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var t=Object.getOwnPropertySymbols(e);n&&(t=t.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),r.push.apply(r,t)}return r}function w(e){for(var n=1;n<arguments.length;n++){var r=null!=arguments[n]?arguments[n]:{};n%2?T(Object(r),!0).forEach((function(n){(0,c.Z)(e,n,r[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):T(Object(r)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(r,n))}))}return e}function I(){var e=(0,o.Z)(["\n  .advanced-info-table {\n    width: 100%;\n    tr {\n      td {\n        vertical-align: top;\n        padding-bottom: 0.625rem;\n      }\n      td:nth-child(1) {\n        width: 12rem;\n        font-weight: 500;\n      }\n      td:nth-child(2) {\n        width: calc(100% - 12rem);\n      }\n    }\n  }\n"]);return I=function(){return e},e}function C(){var e=(0,o.Z)(["\n  .basic-info-table {\n    width: 100%;\n    tr {\n      td {\n        vertical-align: top;\n        padding-bottom: 0.625rem;\n      }\n      td:nth-child(1) {\n        width: 200px;\n        font-weight: 500;\n      }\n      td:nth-child(2) {\n        width: calc(100% - 200px);\n      }\n    }\n  }\n"]);return C=function(){return e},e}var D=p.ZP.div(C()),A=p.ZP.div(I()),P=(0,j.a)((function(){var e,n=(0,f.I0)(),r=(0,d.useState)({}),t=r[0],s=r[1],c=(0,d.useState)(!1),o=c[0],p=c[1],x=(0,E.Z)().metrics;(0,d.useEffect)((function(){n((0,b._Y)((function(e){s(e)}),(function(){})))}),[]);return(0,i.jsx)(y.Z,{children:(0,i.jsx)(m.Zb,{className:"h-full lg:pl-24 lg:py-11 lg:shadow-2xl",noShadow:!0,children:(0,i.jsxs)("div",{className:"w-full h-full",children:[(0,i.jsxs)("div",{className:"card-header lg:mr-24 lg:h-70px",children:[(0,i.jsxs)("div",{className:"flex justify-between items-end mb-3.5",children:[(0,i.jsxs)("div",{className:"flex items-center",children:[(0,i.jsx)("h3",{className:"mr-24 text-gray text-xl font-medium",children:(0,i.jsx)(h.default,{href:"/dashboard/settings/",children:(0,i.jsx)("a",{children:"User Settings"})})}),(0,i.jsx)("h3",{className:"text-dark2 text-xl font-medium",children:(0,i.jsx)(h.default,{href:"/dashboard/profile",children:(0,i.jsx)("a",{children:"My profile"})})})]}),(0,i.jsxs)("div",{className:"flex",children:[!(null!==t&&void 0!==t&&t.approve_at)&&(0,i.jsxs)(m.zx,{primaryOutline:!0,className:"mr-5",onClick:function(){var e=(0,a.Z)(l().mark((function e(n){return l().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:n.preventDefault(),u.default.push("/dashboard/verification");case 2:case"end":return e.stop()}}),e)})));return function(n){return e.apply(this,arguments)}}(),children:[(0,i.jsx)(O.Z,{className:"mr-2"})," Get Verified"]}),(0,i.jsx)(m.zx,{primary:!0,onClick:function(){var e=(0,a.Z)(l().mark((function e(r){return l().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:r.preventDefault(),n((0,S.Rg)());case 2:case"end":return e.stop()}}),e)})));return function(n){return e.apply(this,arguments)}}(),children:"Log Out"})]})]}),(0,i.jsx)("div",{className:"border-primary border-b-2"})]}),(0,i.jsx)("div",{className:"card-body pb-28 overflow-y-auto lg:h-100%-70px lg:pt-4 2xl:pt-8",children:(0,i.jsxs)("div",{className:"lg:pr-24",children:[(0,i.jsx)("section",{className:"basic-info",children:(0,i.jsxs)("div",{className:"flex",children:[(0,i.jsxs)("div",{className:"upload-avatar-box mr-9",children:[(0,i.jsxs)("label",{htmlFor:"upload-avatar",className:"relative overflow-hidden cursor-pointer w-32 h-32 block border border-gray shadow-md rounded-md flex justify-center items-center",children:[(0,i.jsx)(_,{className:"text-2xl"}),!(null===t||void 0===t||!t.avatar_url)&&(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)("div",{className:"absolute inset-0",children:(0,i.jsx)("img",{className:"w-full h-full object-cover",src:null===t||void 0===t?void 0:t.avatar_url,alt:""})}),(0,i.jsx)("div",{className:"opacity-0 hover:opacity-100 absolute inset-0 w-full h-full transition duration-100 ease-in-out",children:(0,i.jsxs)("div",{className:"relative flex justify-center items-center w-full h-full",children:[(0,i.jsx)("div",{className:"absolute inset-0 w-full h-full bg-white opacity-80"}),(0,i.jsx)(_,{className:"text-2xl z-40"})]})})]}),o&&(0,i.jsx)("div",{className:"opacity-100 absolute inset-0 w-full h-full transition duration-100 ease-in-out",children:(0,i.jsxs)("div",{className:"relative flex justify-center items-center w-full h-full",children:[(0,i.jsx)("div",{className:"absolute inset-0 w-full h-full bg-white opacity-80"}),(0,i.jsx)(v(),{className:"z-50",type:"spinningBubbles",color:"#FF473E",width:20,height:20})]})})]}),(0,i.jsx)("input",{id:"upload-avatar",type:"file",hidden:!0,accept:"image/*",onChange:function(e){p(!0);var r=e.target.files[0];n((0,b.gg)({file:r},(function(e){p(!1);var n=new FileReader;n.onloadend=function(){s(w(w({},t),{},{avatar_url:n.result}))},n.readAsDataURL(r)}),(function(){p(!1)})))}})]}),(0,i.jsx)("div",{children:(0,i.jsx)(D,{children:(0,i.jsx)("table",{className:"basic-info-table border-0",children:(0,i.jsxs)("tbody",{children:[(0,i.jsxs)("tr",{children:[(0,i.jsx)("td",{children:(0,i.jsx)("span",{children:"Name:"})}),(0,i.jsx)("td",{children:(0,i.jsx)("span",{children:null===t||void 0===t?void 0:t.full_name})})]}),(0,i.jsxs)("tr",{children:[(0,i.jsx)("td",{children:(0,i.jsx)("span",{children:"Member Since:"})}),(0,i.jsx)("td",{children:(0,i.jsx)("span",{children:(0,N.p)(null===t||void 0===t?void 0:t.email_verified_at,"dd/MM/yyyy")})})]}),(0,i.jsxs)("tr",{children:[(0,i.jsx)("td",{children:(0,i.jsx)("span",{children:"Member Type:"})}),(0,i.jsx)("td",{children:(0,i.jsx)("span",{className:"text-primary uppercase font-medium",children:null===t||void 0===t||null===(e=t.profile)||void 0===e?void 0:e.type})})]}),(0,i.jsxs)("tr",{children:[(0,i.jsx)("td",{children:(0,i.jsx)("span",{children:"Verified Since:"})}),(0,i.jsx)("td",{children:null!==t&&void 0!==t&&t.approve_at?(0,i.jsx)("span",{children:(0,N.p)(null===t||void 0===t?void 0:t.approve_at,"dd/MM/yyyy")}):(0,i.jsx)(h.default,{href:"/dashboard/verification",children:(0,i.jsx)("a",{className:"text-primary underline",children:"Get Verified"})})})]}),(0,i.jsxs)("tr",{children:[(0,i.jsx)("td",{children:(0,i.jsx)("span",{children:"Average Peers:"})}),(0,i.jsx)("td",{children:(0,i.jsx)("span",{children:"18"})})]})]})})})})]})}),(0,i.jsx)("div",{className:"border-gray border-b lg:my-8 2xl:my-12"}),(0,i.jsxs)("section",{className:"advanced-info",children:[(0,i.jsx)(A,{children:(0,i.jsx)("table",{className:"advanced-info-table border-0",children:(0,i.jsxs)("tbody",{children:[(0,i.jsxs)("tr",{children:[(0,i.jsx)("td",{children:(0,i.jsx)("span",{children:"Node Address:"})}),(0,i.jsx)("td",{children:(0,i.jsx)("span",{children:null===t||void 0===t?void 0:t.public_address_node})})]}),(0,i.jsxs)("tr",{children:[(0,i.jsx)("td",{children:(0,i.jsx)("span",{children:"Validator Fee:"})}),(0,i.jsx)("td",{children:(0,i.jsx)("span",{children:"5%"})})]}),(0,i.jsxs)("tr",{children:[(0,i.jsx)("td",{children:(0,i.jsx)("span",{children:"CSPR Delegated:"})}),(0,i.jsx)("td",{children:(0,i.jsx)("span",{children:"15,000,000"})})]}),(0,i.jsxs)("tr",{children:[(0,i.jsx)("td",{children:(0,i.jsx)("span",{children:"CSPR Self-Staked:"})}),(0,i.jsx)("td",{children:(0,i.jsx)("span",{children:"1,200,000"})})]})]})})}),(0,i.jsxs)("div",{className:"grid grid-flow-col grid-cols-2 grid-rows-2 gap-x-32 2xl:gap-y-1",style:{width:"40rem"},children:[(0,i.jsxs)("div",{className:"flex flex-col lg:py-1 2xl:py-2",children:[(0,i.jsxs)("div",{className:"flex flex-row",children:[(0,i.jsx)("span",{className:"text-lg",children:"Uptime"}),(0,i.jsx)("img",{className:"pl-3",src:"/images/ic_feather_info.svg",alt:"Info"})]}),(0,i.jsx)("p",{className:"text-sm text-gray lg:mb-1 2xl:mb-2",children:"Average: ".concat(null===x||void 0===x?void 0:x.uptime,"%")}),(0,i.jsx)(m.ko,{percent:null===x||void 0===x?void 0:x.uptime})]}),(0,i.jsxs)("div",{className:"flex flex-col lg:py-1 2xl:py-2",children:[(0,i.jsxs)("div",{className:"flex flex-row",children:[(0,i.jsx)("span",{className:"text-lg",children:"Block Height"}),(0,i.jsx)("img",{className:"pl-3",src:"/images/ic_feather_info.svg",alt:"Info"})]}),(0,i.jsxs)("p",{className:"text-sm text-gray lg:mb-1 2xl:mb-2",children:["Current: ",null===x||void 0===x?void 0:x.block_height_average," block behind"]}),(0,i.jsx)(m.ko,{counts:null===x||void 0===x?void 0:x.block_height_average,totalCounts:505,type:"count"})]}),(0,i.jsxs)("div",{className:"flex flex-col lg:py-1 2xl:py-2",children:[(0,i.jsxs)("div",{className:"flex flex-row",children:[(0,i.jsx)("span",{className:"text-lg",children:"Update Responsiveness"}),(0,i.jsx)("img",{className:"pl-3",src:"/images/ic_feather_info.svg",alt:"Info"})]}),(0,i.jsxs)("p",{className:"text-sm text-gray lg:mb-1 2xl:mb-2",children:["Average: ",null===x||void 0===x?void 0:x.update_responsiveness,"+ days early"]}),(0,i.jsx)(m.ko,{counts:null===x||void 0===x?void 0:x.update_responsiveness,totalCounts:5,type:"text",startText:"Needs Improvement",endText:"Great"})]}),(0,i.jsxs)("div",{className:"flex flex-col lg:py-1 2xl:py-2",children:[(0,i.jsxs)("div",{className:"flex flex-row",children:[(0,i.jsx)("span",{className:"text-lg",children:"Peers"}),(0,i.jsx)("img",{className:"pl-3",src:"/images/ic_feather_info.svg",alt:"Info"})]}),(0,i.jsxs)("p",{className:"text-sm text-gray lg:mb-1 2xl:mb-2",children:["Average: ",null===x||void 0===x?void 0:x.peers]}),(0,i.jsx)(m.ko,{counts:null===x||void 0===x?void 0:x.peers,totalCounts:88,type:"count"})]})]})]})]})})]})})})}),"final-all")},29586:function(e,n,r){"use strict";r.d(n,{p:function(){return i},e:function(){return s}});var t=r(38661),i=function(e){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"dd/MM/yyyy",r=new Date(e);return"Invalid Date"===r.toString()?r.toString():(0,t.Z)(r,n)},s=function(e){return e?"".concat(e.substr(0,10),"...").concat(e.substr(-4)):"-"}},8517:function(e,n,r){"use strict";r.d(n,{sp:function(){return t},HA:function(){return i},uM:function(){return s},mm:function(){return l},u0:function(){return a},Dz:function(){return c},M3:function(){return o},eK:function(){return d},wT:function(){return u},Vu:function(){return f},Hp:function(){return p},Pf:function(){return h},j_:function(){return x},E_:function(){return v},XQ:function(){return j},oo:function(){return y},Vk:function(){return m},vv:function(){return b},kO:function(){return g},nn:function(){return _},ob:function(){return N},O7:function(){return O},Gi:function(){return S},pV:function(){return E},_Y:function(){return T},gg:function(){return w},oH:function(){return I},d2:function(){return C},TH:function(){return D},ui:function(){return A},N5:function(){return P},V6:function(){return R},H:function(){return U}});var t=function(e){return{type:"GET_DASHBOARD_DATA_DEMO_SUCCESS",payload:e}},i=function(e){return{type:"GET_DASHBOARD_DATA_DEMO_SUCCESS_ERROR",payload:e}},s=function(e,n){return{type:"GET_VOTES",payload:e,successCb:n}},l=function(e,n){return{type:"GET_MY_VOTES",payload:e,successCb:n}},a=function(e,n,r){return{type:"GET_VOTE_DETAIL",payload:e,resolve:n,reject:r}},c=function(e){return{type:"GET_VOTE_DETAIL_SUCCESS",payload:e}},o=function(e){return{type:"GET_VOTE_DETAIL_ERROR",payload:e}},d=function(e,n,r){return{type:"RECORD_VOTE",payload:e,resolve:n,reject:r}},u=function(e){return{type:"RECORD_VOTE_SUCCESS",payload:e}},f=function(e){return{type:"RECORD_VOTE_ERROR",payload:e}},p=function(e,n){return{type:"GET_DISCUSSIONS",payload:e,successCb:n}},h=function(e,n,r){return{type:"GET_PINNED_DISCUSSIONS",payload:e,resolve:n,reject:r}},x=function(e,n,r){return{type:"GET_MY_DISCUSSIONS",payload:e,resolve:n,reject:r}},v=function(e,n){return{type:"GET_TRENDING_DISCUSSIONS",payload:e,resolve:n}},j=function(e,n,r){return{type:"GET_DISCUSSION_DETAIL",id:e,resolve:n,reject:r}},y=function(e,n){return{type:"GET_DISCUSSION_COMMENTS",payload:e,resolve:n}},m=function(e){return{type:"SET_DISCUSSION_PIN",id:e}},b=function(e,n,r){return{type:"CREATE_DISCUSSION",payload:e,resolve:n,reject:r}},g=function(e){return{type:"SET_REMOVE_NEW",id:e}},_=function(e,n,r){return{type:"POST_DISCUSSION_COMMENT",payload:e,resolve:n,reject:r}},N=function(e,n){return{type:"VOTE_DISCUSSION",payload:e,successCb:n}},O=function(e,n,r){return{type:"SUBMIT_NODE",payload:e,resolve:n,reject:r}},S=function(e,n,r){return{type:"SUBMIT_DETAIL",payload:e,resolve:n,reject:r}},E=function(e,n,r){return{type:"UPDATE_VERIFICATION_DOCUMENTS",payload:e,resolve:n,reject:r}},T=function(e,n){return{type:"GET_MY_INFO",resolve:e,reject:n}},w=function(e,n,r){return{type:"UPLOAD_AVATAR",payload:e,resolve:n,reject:r}},I=function(e,n,r){return{type:"CHECK_PASSWORD",payload:e,resolve:n,reject:r}},C=function(e,n,r){return{type:"UPDATE_USER_SETTINGS",payload:e,resolve:n,reject:r}},D=function(e,n,r){return{type:"GET_NOTIFICATIONS",payload:e,resolve:n,reject:r}},A=function(e){return{type:"GET_NOTIFICATIONS_SUCCESS",payload:e}},P=function(e,n){return{type:"DISMISS_NOTIFICATION",payload:e,resolve:n}},R=function(e,n){return{type:"UPDATE_VIEW_NOTIFICATION",payload:e,resolve:n}},U=function(e,n){return{type:"UPDATE_CLICK_CTA",payload:e,resolve:n}}},25278:function(e,n,r){(window.__NEXT_P=window.__NEXT_P||[]).push(["/dashboard/profile",function(){return r(76990)}])}},function(e){e.O(0,[9774,2554,4597,9650,6993,6095,8661,7010,5955],(function(){return n=25278,e(e.s=n);var n}));var n=e.O();_N_E=n}]);