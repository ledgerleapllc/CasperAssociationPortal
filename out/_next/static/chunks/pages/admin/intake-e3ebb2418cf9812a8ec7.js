(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[2747],{7329:function(e,n,r){"use strict";r.d(n,{Z:function(){return t}});var i=r(5219);var a=r(2961);function t(e){return function(e){if(Array.isArray(e))return(0,i.Z)(e)}(e)||function(e){if("undefined"!==typeof Symbol&&Symbol.iterator in Object(e))return Array.from(e)}(e)||(0,a.Z)(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}},4015:function(e,n,r){"use strict";r.d(n,{a:function(){return d}});var i=r(6156),a=r(5893),t=r(7294),s=r(1163),l=r(9226);var c=r(4791);function o(e,n){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);n&&(i=i.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),r.push.apply(r,i)}return r}var d=function(e,n){return function(r){var d=function(){var e=(arguments.length>0&&void 0!==arguments[0]?arguments[0]:{}).urlType,n=void 0===e?"public":e,r=(0,l.v9)((function(e){return e.authReducer.userInfo}));return(0,t.useEffect)((function(){if("public"!==n&&n&&r)if(r&&null!==r&&void 0!==r&&r.isLoggedIn)if("member"===r.role){if("auth"===n)return"verifying"===r.period&&s.default.push("/verify-email"),"onboarding"===r.period&&s.default.push("/onboard"),void("final"===r.period&&s.default.push("/dashboard"));if("verifying"===n)return"onboarding"===r.period&&s.default.push("/onboard"),void("final"===r.period&&s.default.push("/dashboard"));if("onboarding"===n)return"verifying"===r.period&&s.default.push("/verify-email"),void("final"===r.period&&s.default.push("/dashboard"));if("final-member"===n||"final-all"===n)return"verifying"===r.period&&s.default.push("/verify-email"),void("onboarding"===r.period&&s.default.push("/onboard"));"final-admin"===n&&("verifying"===r.period&&s.default.push("/verify-email"),"onboarding"===r.period&&s.default.push("/onboard"),"final"===r.period&&s.default.push("/dashboard"))}else"admin"===r.role&&"final-all"!==n&&"final-admin"!==n&&s.default.push("/admin/dashboard");else"auth"!==n&&s.default.push("/login")}),[r,n]),{user:r}}({urlType:n}).user;if(n&&"public"!==n){if(!d)return(0,a.jsx)(c.Z,{});if("auth"===n&&d.isLoggedIn)return(0,a.jsx)(c.Z,{});if("auth"!==n&&!d.isLoggedIn)return(0,a.jsx)(c.Z,{});if("member"===d.role){if(["final-all","final-member"].includes(n)&&"final"!==d.period)return(0,a.jsx)(c.Z,{});if(["verifying"].includes(n)&&"verifying"!==d.period)return(0,a.jsx)(c.Z,{});if(["onboarding"].includes(n)&&"onboarding"!==d.period)return(0,a.jsx)(c.Z,{})}if("admin"===d.role&&["verifying","onboarding","final-member"].includes(n))return(0,a.jsx)(c.Z,{})}return(0,a.jsx)(e,function(e){for(var n=1;n<arguments.length;n++){var r=null!=arguments[n]?arguments[n]:{};n%2?o(Object(r),!0).forEach((function(n){(0,i.Z)(e,n,r[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):o(Object(r)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(r,n))}))}return e}({},r))}}},4791:function(e,n,r){"use strict";var i=r(5893),a=r(733),t=r.n(a);n.Z=function(){return(0,i.jsxs)("div",{className:"fixed inset-0 flex items-center justify-center z-40",children:[(0,i.jsx)("div",{className:"fixed inset-0 bg-white opacity-40"}),(0,i.jsx)(t(),{className:"z-50",type:"spinningBubbles",color:"#FF473E",width:100,height:100})]})}},4590:function(e,n,r){"use strict";r.d(n,{Z:function(){return o}});var i=r(5893),a=r(4504),t=r(9226),s=r(9582),l=r(6570),c=function(){var e=(0,t.v9)((function(e){return e.authReducer.userInfo.fullInfo}));return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsxs)(s.Zb,{className:"flex-col w-24 px-5 hidden lg:flex h-full overflow-y-scroll",children:[(0,i.jsx)("img",{className:"py-6 border-b-2 border-primary align-center",src:"/images/ic_logo_home.svg",alt:"Casper"}),(0,i.jsxs)("ul",{className:"mb-4 flex flex-col items-center border-b-2 border-primary",children:[(0,i.jsx)("li",{className:"pb-4 pt-14",children:(0,i.jsx)(s.O$,{activeClassName:"shadow-activeLink",href:"/dashboard",children:(0,i.jsx)("a",{className:"rounded-lg inline-block",children:(0,i.jsx)("img",{className:"p-3",src:"/images/ic_home.svg",alt:"Home"})})})}),(0,i.jsx)("li",{className:"py-2",children:(0,i.jsx)(s.O$,{activeClassName:"shadow-activeLink",href:"/dashboard/nodes",children:(0,i.jsx)("a",{className:"inline-block rounded-2xl hover:shadow-lg",children:(0,i.jsx)("img",{className:"p-3",src:"/images/ic_infor.svg",alt:"Validator Info"})})})}),(0,i.jsx)("li",{className:"py-2",children:(0,i.jsx)(s.O$,{activeClassName:"shadow-activeLink",href:"/dashboard/discussion",children:(0,i.jsx)("a",{className:"rounded-lg inline-block",children:(0,i.jsx)("img",{className:"p-3",src:"/images/ic_material_chat.svg",alt:"Material Chat"})})})}),(0,i.jsx)("li",{className:"py-2",children:(0,i.jsx)(s.O$,{activeClassName:"shadow-activeLink",href:"/dashboard/votes",children:(0,i.jsx)("a",{className:"inline-block rounded-2xl hover:shadow-lg",children:(0,i.jsx)("img",{className:"p-3",src:"/images/ic_awesome_vote.svg",alt:"Vote"})})})}),(0,i.jsx)("li",{className:"py-2",children:(0,i.jsx)(s.O$,{activeClassName:"shadow-activeLink",href:"/dashboard/member-perks",children:(0,i.jsx)("a",{className:"inline-block rounded-2xl hover:shadow-lg",children:(0,i.jsx)("img",{className:"p-3",src:"/images/ic_feather_user_plus.svg",alt:"User Add"})})})}),(0,i.jsx)("li",{className:"pt-2",children:(0,i.jsx)(s.O$,{activeClassName:"shadow-activeLink",href:"/dashboard/settings",children:(0,i.jsx)("a",{className:"inline-block rounded-2xl hover:shadow-lg",children:(0,i.jsx)("img",{className:"p-3",src:"/images/ic_feather_settings.svg",alt:"Setting"})})})})]}),"admin"===(null===e||void 0===e?void 0:e.role)&&(0,i.jsxs)("ul",{className:"flex flex-col pb-4",children:[(0,i.jsx)("li",{className:"py-1.5 cursor-pointer",children:(0,i.jsx)(s.O$,{activeClassName:"text-primary",href:"/admin/dashboard",children:(0,i.jsx)("p",{children:"Admin"})})}),(0,i.jsx)("li",{className:"py-1.5 cursor-pointer",children:(0,i.jsx)(s.O$,{activeClassName:"text-primary",href:"/admin/intake",children:(0,i.jsx)("p",{children:"Intake"})})}),(0,i.jsx)("li",{className:"py-1.5 cursor-pointer",children:(0,i.jsx)(s.O$,{activeClassName:"text-primary",href:"/admin/users",children:(0,i.jsx)("p",{children:"Users"})})}),(0,i.jsx)("li",{className:"py-1.5 cursor-pointer",children:(0,i.jsx)(s.O$,{activeClassName:"text-primary",href:"/admin/ballots",children:(0,i.jsx)("p",{children:"Ballots"})})}),(0,i.jsx)("li",{className:"py-1.5 cursor-pointer",children:(0,i.jsx)(s.O$,{activeClassName:"text-primary",href:"/admin/perks",children:(0,i.jsx)("p",{children:"Perks"})})}),(0,i.jsx)("li",{className:"py-1.5 cursor-pointer",children:(0,i.jsx)(s.O$,{activeClassName:"text-primary",href:"/admin/settings",children:(0,i.jsx)("p",{children:"Settings"})})})]})]}),(0,i.jsx)(l.Z,{className:"py-4 lg:hidden",theme:"dark"})]})};function o(e){var n=e.children;return(0,i.jsx)("div",{children:(0,i.jsx)("div",{className:"dashboard-layout",children:(0,i.jsxs)("div",{className:"relative h-screen h-px mx-auto 2xl:min-h-105 max-w-404 px-4 lg:py-4 xl:py-16 2xl:py-24 flex flex-col",children:[(0,i.jsxs)("div",{className:"flex h-full flex-col lg:flex-row",children:[(0,i.jsx)("div",{className:"flex-none",children:(0,i.jsx)(c,{})}),(0,i.jsx)("div",{className:"pt-12 lg:pt-0 lg:pl-6 dashboard-content flex-grow h-full",children:n})]}),(0,i.jsx)("div",{className:"absolute py-8 left-0 bottom-0 right-0",children:(0,i.jsx)(a.Z,{theme:"dark"})})]})})})}},2139:function(e,n,r){"use strict";r.r(n);var i=r(5893),a=r(7329),t=r(2465),s=r(7294),l=r(9226),c=r(9163),o=r(4015),d=r(4590),u=r(9582),f=r(7028),h=r(9586);function p(){var e=(0,t.Z)(["\n  .intake-table {\n    .col-1 {\n      width: 13%;\n    }\n    .col-2 {\n      width: 25%;\n    }\n    .col-3 {\n      width: 10%;\n    }\n    .col-4 {\n      width: 13%;\n    }\n    .col-5 {\n      width: 13%;\n    }\n    .col-6 {\n      width: 13%;\n    }\n    .col-7 {\n      width: 13%;\n    }\n  }\n"]);return p=function(){return e},e}var x=c.ZP.div(p());n.default=(0,o.a)((function(){var e=(0,l.I0)(),n=(0,s.useState)([]),r=n[0],t=n[1],c=(0,s.useState)(!0),o=c[0],p=c[1],m=(0,s.useState)(1),j=m[0],y=m[1],v=function(){e((0,f.c8)({page:j},(function(e,n){p(n),t((function(n){return[].concat((0,a.Z)(n),(0,a.Z)(e))})),y((function(e){return e+1}))})))};return(0,s.useEffect)((function(){v()}),[]),(0,i.jsx)(d.Z,{children:(0,i.jsx)(u.Zb,{className:"h-full px-24 py-14",children:(0,i.jsxs)("div",{className:"bg-transparent h-full",children:[(0,i.jsx)("div",{className:"w-full",children:(0,i.jsxs)("div",{className:"lg:h-70px flex flex-col justify-center",children:[(0,i.jsx)("h3",{className:"text-dark2 text-xl lg:pr-32 font-medium mb-3.5",children:"Intake"}),(0,i.jsx)("p",{className:"text-sm text-gray pb-3.5",children:"New members needing approval"}),(0,i.jsx)("div",{className:"border-primary border-b-2"})]})}),(0,i.jsx)("div",{className:"flex flex-col h-5/6",children:(0,i.jsx)(x,{className:"h-full",children:(0,i.jsxs)(u.iA,{className:"intake-table pt-10 h-full",onLoadMore:v,hasMore:o,dataLength:r.length,children:[(0,i.jsxs)(u.iA.Header,{children:[(0,i.jsx)(u.iA.HeaderCell,{children:(0,i.jsx)("p",{children:"Registration Date"})}),(0,i.jsx)(u.iA.HeaderCell,{children:(0,i.jsx)("p",{children:"Users Email"})}),(0,i.jsx)(u.iA.HeaderCell,{children:(0,i.jsxs)("p",{children:["Letter of ",(0,i.jsx)("br",{})," Motivation"]})}),(0,i.jsx)(u.iA.HeaderCell,{children:(0,i.jsxs)("p",{children:["Node Operator ",(0,i.jsx)("br",{})," KYC"]})}),(0,i.jsx)(u.iA.HeaderCell,{children:(0,i.jsxs)("p",{children:["Beneficial Owner ",(0,i.jsx)("br",{})," KYC"]})}),(0,i.jsx)(u.iA.HeaderCell,{children:(0,i.jsx)("p",{children:"# of Beneficial Owners"})}),(0,i.jsx)(u.iA.HeaderCell,{children:(0,i.jsx)("p",{children:"Unopened Invites"})})]}),(0,i.jsx)(u.iA.Body,{children:r.map((function(e,n){return(0,i.jsxs)(u.iA.BodyRow,{children:[(0,i.jsx)(u.iA.BodyCell,{children:(0,i.jsx)("p",{children:(0,h.p)(new Date(null===e||void 0===e?void 0:e.registration_date))})}),(0,i.jsx)(u.iA.BodyCell,{children:(0,i.jsx)("p",{className:"truncate",children:e.email})}),(0,i.jsx)(u.iA.BodyCell,{children:(0,i.jsx)("a",{href:"/".concat(e.signed_file_url),className:"pl-3 text-primary cursor-pointer underline",children:"View"})}),(0,i.jsx)(u.iA.BodyCell,{children:(0,i.jsx)("button",{type:"button",className:"text-sm text-white w-1/2 h-7 rounded-full bg-primary shadow-md focus:outline-none hover:opacity-40",children:"Review"})}),(0,i.jsx)(u.iA.BodyCell,{children:(0,i.jsx)("button",{type:"button",className:"text-sm text-white w-1/2 h-7 rounded-full bg-primary shadow-md focus:outline-none hover:opacity-40",children:"Review"})}),(0,i.jsx)(u.iA.BodyCell,{children:(0,i.jsx)("p",{children:e.beneficial_owners})}),(0,i.jsx)(u.iA.BodyCell,{children:(0,i.jsx)("p",{children:e.unopened_invites})})]},n)}))})]})})})]})})})}),"final-admin")},9586:function(e,n,r){"use strict";r.d(n,{p:function(){return a},e:function(){return t}});var i=r(8661),a=function(e){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"dd/MM/yyyy",r=new Date(e);return"Invalid Date"===r.toString()?r.toString():(0,i.Z)(r,n)},t=function(e){return e?"".concat(e.substr(0,10),"...").concat(e.substr(-4)):"-"}},7028:function(e,n,r){"use strict";r.d(n,{lL:function(){return i},yW:function(){return a},nE:function(){return t},FH:function(){return s},fX:function(){return l},iA:function(){return c},Xp:function(){return o},ed:function(){return d},c8:function(){return u},Od:function(){return f},fI:function(){return h},yG:function(){return p},Lx:function(){return x},TT:function(){return m},I2:function(){return j},MC:function(){return y},CQ:function(){return v},ie:function(){return b}});var i=function(e,n){return{type:"GET_LIST_MEMBER",payload:e,callback:n}},a=function(e){return{type:"GET_LIST_MEMBER_SUCCESS",payload:e}},t=function(e){return{type:"GET_USER_DETAIL",payload:e}},s=function(e){return{type:"GET_USER_DETAIL_SUCCESS",payload:e}},l=function(e){return{type:"GET_USER_KYC_INFO",payload:e}},c=function(e){return{type:"GET_USER_KYC_INFO_SUCCESS",payload:e}},o=function(e){return{type:"APPROVE_KYC",payload:e}},d=function(e){return{type:"DENY_KYC",payload:e}},u=function(e,n){return{type:"GET_LIST_INTAKE",payload:e,successCb:n}},f=function(e){return{type:"GET_LIST_INTAKE_SUCCESS",payload:e}},h=function(e){return{type:"GET_LIST_INTAKE_ERROR",payload:e}},p=function(e,n){return{type:"GET_BALLOTS",payload:e,callback:n}},x=function(e,n){return{type:"GET_BALLOT_DETAIL",payload:e,callback:n}},m=function(e,n){return{type:"GET_BALLOT_VOTES",payload:e,callback:n}},j=function(e,n,r){return{type:"SUBMIT_BALLOT",payload:e,resolve:n,reject:r}},y=function(e,n){return{type:"CANCEL_BALLOT",payload:e,callback:n}},v=function(e){return{type:"CANCEL_BALLOT_SUCCESS",payload:e}},b=function(e){return{type:"CANCEL_BALLOT_ERROR",payload:e}}},9200:function(e,n,r){(window.__NEXT_P=window.__NEXT_P||[]).push(["/admin/intake",function(){return r(2139)}])}},function(e){e.O(0,[9774,2554,1282,8930,6993,1295,5751,8661,2899],(function(){return n=9200,e(e.s=n);var n}));var n=e.O();_N_E=n}]);