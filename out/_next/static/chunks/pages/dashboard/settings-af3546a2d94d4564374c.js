(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[6130],{24015:function(e,n,r){"use strict";r.d(n,{a:function(){return u}});var i=r(96156),l=r(85893),s=r(67294),t=r(11163),a=r(49226);var d=r(44791);function o(e,n){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);n&&(i=i.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),r.push.apply(r,i)}return r}var u=function(e,n){return function(r){var u=function(){var e=(arguments.length>0&&void 0!==arguments[0]?arguments[0]:{}).urlType,n=void 0===e?"public":e,r=(0,a.v9)((function(e){return e.authReducer.userInfo}));return(0,s.useEffect)((function(){if("public"!==n&&n&&r)if(r&&null!==r&&void 0!==r&&r.isLoggedIn)if("member"===r.role){if("auth"===n)return"verifying"===r.period&&t.default.push("/verify-email"),"onboarding"===r.period&&t.default.push("/onboard"),void("final"===r.period&&t.default.push("/dashboard"));if("verifying"===n)return"onboarding"===r.period&&t.default.push("/onboard"),void("final"===r.period&&t.default.push("/dashboard"));if("onboarding"===n)return"verifying"===r.period&&t.default.push("/verify-email"),void("final"===r.period&&t.default.push("/dashboard"));if("final-member"===n||"final-all"===n)return"verifying"===r.period&&t.default.push("/verify-email"),void("onboarding"===r.period&&t.default.push("/onboard"));"final-admin"===n&&("verifying"===r.period&&t.default.push("/verify-email"),"onboarding"===r.period&&t.default.push("/onboard"),"final"===r.period&&t.default.push("/dashboard"))}else"admin"===r.role&&"final-all"!==n&&"final-admin"!==n&&t.default.push("/admin/dashboard");else"auth"!==n&&t.default.push("/login")}),[r,n]),{user:r}}({urlType:n}).user;if(n&&"public"!==n){if(!u)return(0,l.jsx)(d.Z,{});if("auth"===n&&u.isLoggedIn)return(0,l.jsx)(d.Z,{});if("auth"!==n&&!u.isLoggedIn)return(0,l.jsx)(d.Z,{});if("member"===u.role){if(["final-all","final-member"].includes(n)&&"final"!==u.period)return(0,l.jsx)(d.Z,{});if(["verifying"].includes(n)&&"verifying"!==u.period)return(0,l.jsx)(d.Z,{});if(["onboarding"].includes(n)&&"onboarding"!==u.period)return(0,l.jsx)(d.Z,{})}if("admin"===u.role&&["verifying","onboarding","final-member"].includes(n))return(0,l.jsx)(d.Z,{})}return(0,l.jsx)(e,function(e){for(var n=1;n<arguments.length;n++){var r=null!=arguments[n]?arguments[n]:{};n%2?o(Object(r),!0).forEach((function(n){(0,i.Z)(e,n,r[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):o(Object(r)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(r,n))}))}return e}({},r))}}},44791:function(e,n,r){"use strict";var i=r(85893),l=r(733),s=r.n(l);n.Z=function(){return(0,i.jsxs)("div",{className:"fixed inset-0 flex items-center justify-center z-40",children:[(0,i.jsx)("div",{className:"fixed inset-0 bg-white opacity-40"}),(0,i.jsx)(s(),{className:"z-50",type:"spinningBubbles",color:"#FF473E",width:100,height:100})]})}},8922:function(e,n,r){"use strict";r.r(n);var i=r(85893),l=r(96156),s=r(41664),t=r(67294),a=r(24015),d=r(25955),o=r(28569);function u(e,n){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);n&&(i=i.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),r.push.apply(r,i)}return r}n.default=(0,a.a)((function(){var e=(0,t.useState)({"2fa":!0,email:!0,updatePassword:!0,username:!0}),n=e[0],r=e[1],a=function(e){n[e]=!1,r(function(e){for(var n=1;n<arguments.length;n++){var r=null!=arguments[n]?arguments[n]:{};n%2?u(Object(r),!0).forEach((function(n){(0,l.Z)(e,n,r[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):u(Object(r)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(r,n))}))}return e}({},n))};return(0,i.jsx)(d.Z,{children:(0,i.jsx)(o.Zb,{className:"h-full lg:pl-24 lg:py-11 lg:shadow-2xl",noShadow:!0,children:(0,i.jsxs)("div",{className:"w-full h-full",children:[(0,i.jsxs)("div",{className:"card-header lg:mr-24 lg:h-70px",children:[(0,i.jsxs)("div",{className:"flex justify-between items-end mb-3.5",children:[(0,i.jsxs)("div",{className:"flex items-center",children:[(0,i.jsx)("h3",{className:"text-dark2 text-xl font-medium mr-24",children:(0,i.jsx)(s.default,{href:"/dashboard/settings",children:(0,i.jsx)("a",{children:"User Settings"})})}),(0,i.jsx)("h3",{className:"text-gray text-xl font-medium",children:(0,i.jsx)(s.default,{href:"/dashboard/profile",children:(0,i.jsx)("a",{children:"My profile"})})})]}),(0,i.jsx)("div",{children:(0,i.jsx)(o.zx,{primary:!0,children:"Save Changes"})})]}),(0,i.jsx)("div",{className:"border-primary border-b-2"})]}),(0,i.jsx)("div",{className:"card-body pt-8 pb-28 overflow-x-hidden overflow-y-auto lg:h-100%-70px",children:(0,i.jsxs)("div",{className:"lg:pr-24",children:[(0,i.jsxs)("div",{className:"flex flex-col lg:flex-row",children:[(0,i.jsx)("div",{className:"w-full lg:w-1/2 pb-12",children:(0,i.jsxs)("div",{className:"form-group",children:[(0,i.jsxs)("div",{className:"flex justify-between",children:[(0,i.jsx)("label",{htmlFor:"username",children:"Username"}),n.username&&(0,i.jsx)("button",{type:"button",className:"inline lg:hidden text-primary focus:outline-none",onClick:function(){return a("username")},children:"Edit"})]}),(0,i.jsxs)("div",{className:"mt-5 flex items-center",children:[(0,i.jsx)("input",{name:"username",type:"text",disabled:n.username,className:"w-full lg:w-3/4 lg:mt-0 h-14 px-7 rounded-full shadow-activeLink focus:outline-none"}),n.username&&(0,i.jsx)("button",{type:"button",className:"pl-6 hidden lg:inline text-primary focus:outline-none",onClick:function(){return a("username")},children:"Edit"})]})]})}),(0,i.jsx)("div",{className:"w-full lg:w-1/2 pb-12",children:(0,i.jsxs)("div",{className:"form-group",children:[(0,i.jsxs)("div",{className:"flex justify-between",children:[(0,i.jsx)("label",{htmlFor:"email",children:"Email Address"}),n.email&&(0,i.jsx)("button",{type:"button",className:"inline lg:hidden text-primary focus:outline-none",onClick:function(){return a("email")},children:"Edit"})]}),(0,i.jsxs)("div",{className:"mt-5 flex items-center",children:[(0,i.jsx)("input",{name:"email",type:"text",disabled:n.email,className:"w-full lg:w-3/4 lg:mt-0 h-14 px-7 rounded-full shadow-activeLink focus:outline-none"}),n.email&&(0,i.jsx)("button",{type:"button",className:"pl-6 hidden lg:inline text-primary focus:outline-none",onClick:function(){return a("email")},children:"Edit"})]})]})})]}),(0,i.jsxs)("div",{className:"flex flex-col lg:flex-row",children:[(0,i.jsx)("div",{className:"w-full lg:w-1/2 pb-12",children:(0,i.jsxs)("div",{className:"form-group",children:[(0,i.jsxs)("div",{className:"flex justify-between",children:[(0,i.jsx)("label",{htmlFor:"password",children:"Update Password"}),n.updatePassword&&(0,i.jsx)("button",{type:"button",className:"inline lg:hidden text-primary focus:outline-none",onClick:function(){return a("updatePassword")},children:"Edit"})]}),(0,i.jsxs)("div",{className:"mt-5 flex items-center",children:[(0,i.jsx)("input",{disabled:n.updatePassword,name:"password",placeholder:"Type Current Password",type:"text",className:"w-full lg:w-3/4 lg:mt-0 h-14 px-7 rounded-full shadow-activeLink focus:outline-none"}),n.updatePassword&&(0,i.jsx)("button",{type:"button",className:"pl-6 hidden lg:inline text-primary focus:outline-none",onClick:function(){return a("updatePassword")},children:"Edit"})]}),(0,i.jsx)("div",{className:"pt-8",children:(0,i.jsx)("input",{disabled:n.updatePassword,placeholder:"New Password",type:"text",className:"w-full lg:w-3/4 mr-6 lg:mt-0 h-14 px-7 rounded-full shadow-activeLink focus:outline-none"})}),(0,i.jsx)("div",{className:"pt-8",children:(0,i.jsx)("input",{placeholder:"Confirm New Password",type:"text",disabled:n.updatePassword,className:"w-full lg:w-3/4 mr-6 lg:mt-0 h-14 px-7 rounded-full shadow-activeLink focus:outline-none"})})]})}),(0,i.jsx)("div",{className:"w-full lg:w-1/2 pb-12",children:(0,i.jsxs)("div",{className:"form-group",children:[(0,i.jsx)("label",{htmlFor:"2fa",children:"2FA toggle"}),(0,i.jsxs)("div",{className:"hidden lg:block pl-5 mt-5",children:[(0,i.jsxs)("label",{className:"relative pl-8 inline-flex items-center mr-6",children:[(0,i.jsx)("input",{name:"2fa",disabled:n["2fa"],type:"radio",className:"text-primary",value:"on"}),(0,i.jsx)("span",{className:"text-sm text-dark1",children:"ON"})]}),(0,i.jsxs)("label",{className:"relative pl-8 pt-6 flex",children:[(0,i.jsx)("input",{name:"2fa",type:"radio",className:"text-primary",value:"off"}),(0,i.jsx)("span",{className:"text-sm text-dark1",children:"OFF"})]})]}),(0,i.jsx)("div",{className:"block lg:hidden pl-5 mt-5",children:(0,i.jsx)(o.CO,{})})]})})]})]})})]})})})}),"final-all")},3606:function(e,n,r){(window.__NEXT_P=window.__NEXT_P||[]).push(["/dashboard/settings",function(){return r(8922)}])}},function(e){e.O(0,[9774,2554,4597,9650,6993,6095,1878,5955],(function(){return n=3606,e(e.s=n);var n}));var n=e.O();_N_E=n}]);