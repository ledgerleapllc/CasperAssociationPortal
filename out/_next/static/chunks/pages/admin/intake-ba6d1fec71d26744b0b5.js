(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[2747],{4015:function(e,r,n){"use strict";n.d(r,{a:function(){return d}});var i=n(6156),a=n(5893),t=n(7294),s=n(1163),l=n(9226);var c=n(4791);function o(e,r){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);r&&(i=i.filter((function(r){return Object.getOwnPropertyDescriptor(e,r).enumerable}))),n.push.apply(n,i)}return n}var d=function(e,r){return function(n){var d=function(){var e=(arguments.length>0&&void 0!==arguments[0]?arguments[0]:{}).urlType,r=void 0===e?"public":e,n=(0,l.v9)((function(e){return e.authReducer.userInfo}));return(0,t.useEffect)((function(){if("public"!==r&&r&&n)if(n&&null!==n&&void 0!==n&&n.isLoggedIn)if("member"===n.role){if("auth"===r)return"verifying"===n.period&&s.default.push("/verify-email"),"onboarding"===n.period&&s.default.push("/onboard"),void("final"===n.period&&s.default.push("/dashboard"));if("verifying"===r)return"onboarding"===n.period&&s.default.push("/onboard"),void("final"===n.period&&s.default.push("/dashboard"));if("onboarding"===r)return"verifying"===n.period&&s.default.push("/verify-email"),void("final"===n.period&&s.default.push("/dashboard"));if("final-member"===r||"final-all"===r)return"verifying"===n.period&&s.default.push("/verify-email"),void("onboarding"===n.period&&s.default.push("/onboard"));"final-admin"===r&&("verifying"===n.period&&s.default.push("/verify-email"),"onboarding"===n.period&&s.default.push("/onboard"),"final"===n.period&&s.default.push("/dashboard"))}else"admin"===n.role&&"final-all"!==r&&"final-admin"!==r&&s.default.push("/admin/dashboard");else"auth"!==r&&s.default.push("/login")}),[n,r]),{user:n}}({urlType:r}).user;if(r&&"public"!==r){if(!d)return(0,a.jsx)(c.Z,{});if("auth"===r&&d.isLoggedIn)return(0,a.jsx)(c.Z,{});if("auth"!==r&&!d.isLoggedIn)return(0,a.jsx)(c.Z,{});if("member"===d.role){if(["final-all","final-member"].includes(r)&&"final"!==d.period)return(0,a.jsx)(c.Z,{});if(["verifying"].includes(r)&&"verifying"!==d.period)return(0,a.jsx)(c.Z,{});if(["onboarding"].includes(r)&&"onboarding"!==d.period)return(0,a.jsx)(c.Z,{})}if("admin"===d.role&&["verifying","onboarding","final-member"].includes(r))return(0,a.jsx)(c.Z,{})}return(0,a.jsx)(e,function(e){for(var r=1;r<arguments.length;r++){var n=null!=arguments[r]?arguments[r]:{};r%2?o(Object(n),!0).forEach((function(r){(0,i.Z)(e,r,n[r])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):o(Object(n)).forEach((function(r){Object.defineProperty(e,r,Object.getOwnPropertyDescriptor(n,r))}))}return e}({},n))}}},4791:function(e,r,n){"use strict";var i=n(5893);r.Z=function(){return(0,i.jsx)("p",{children:"Loading"})}},4590:function(e,r,n){"use strict";n.d(r,{Z:function(){return o}});var i=n(5893),a=n(7667),t=n(9226),s=n(2927),l=n(6570),c=function(){var e=(0,t.v9)((function(e){return e.authReducer.userInfo.fullInfo}));return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsxs)(s.Zb,{className:"flex-col w-24 px-5 hidden lg:flex h-full overflow-y-scroll",children:[(0,i.jsx)("img",{className:"py-6 border-b-2 border-primary align-center",src:"/images/ic_logo_home.svg",alt:"Casper"}),(0,i.jsxs)("ul",{className:"mb-4 flex flex-col items-center border-b-2 border-primary",children:[(0,i.jsx)("li",{className:"pb-4 pt-14",children:(0,i.jsx)(s.O$,{activeClassName:"shadow-activeLink",href:"/dashboard",children:(0,i.jsx)("a",{className:"rounded-lg inline-block",children:(0,i.jsx)("img",{className:"p-3",src:"/images/ic_home.svg",alt:"Home"})})})}),(0,i.jsx)("li",{className:"py-2",children:(0,i.jsx)(s.O$,{activeClassName:"shadow-activeLink",href:"/dashboard/nodes",children:(0,i.jsx)("a",{className:"inline-block rounded-2xl hover:shadow-lg",children:(0,i.jsx)("img",{className:"p-3",src:"/images/ic_infor.svg",alt:"Validator Info"})})})}),(0,i.jsx)("li",{className:"py-2",children:(0,i.jsx)(s.O$,{activeClassName:"shadow-activeLink",href:"/dashboard/discussion",children:(0,i.jsx)("a",{className:"rounded-lg inline-block",children:(0,i.jsx)("img",{className:"p-3",src:"/images/ic_material_chat.svg",alt:"Material Chat"})})})}),(0,i.jsx)("li",{className:"py-2",children:(0,i.jsx)(s.O$,{activeClassName:"shadow-activeLink",href:"/dashboard/votes",children:(0,i.jsx)("a",{className:"inline-block rounded-2xl hover:shadow-lg",children:(0,i.jsx)("img",{className:"p-3",src:"/images/ic_awesome_vote.svg",alt:"Vote"})})})}),(0,i.jsx)("li",{className:"py-2",children:(0,i.jsx)(s.O$,{activeClassName:"shadow-activeLink",href:"/dashboard/member-perks",children:(0,i.jsx)("a",{className:"inline-block rounded-2xl hover:shadow-lg",children:(0,i.jsx)("img",{className:"p-3",src:"/images/ic_feather_user_plus.svg",alt:"User Add"})})})}),(0,i.jsx)("li",{className:"pt-2",children:(0,i.jsx)(s.O$,{activeClassName:"shadow-activeLink",href:"/dashboard/settings",children:(0,i.jsx)("a",{className:"inline-block rounded-2xl hover:shadow-lg",children:(0,i.jsx)("img",{className:"p-3",src:"/images/ic_feather_settings.svg",alt:"Setting"})})})})]}),"admin"===(null===e||void 0===e?void 0:e.role)&&(0,i.jsxs)("ul",{className:"flex flex-col pb-4",children:[(0,i.jsx)("li",{className:"py-1.5 cursor-pointer",children:(0,i.jsx)(s.O$,{activeClassName:"text-primary",href:"/admin/dashboard",children:(0,i.jsx)("p",{children:"Admin"})})}),(0,i.jsx)("li",{className:"py-1.5 cursor-pointer",children:(0,i.jsx)(s.O$,{activeClassName:"text-primary",href:"/admin/intake",children:(0,i.jsx)("p",{children:"Intake"})})}),(0,i.jsx)("li",{className:"py-1.5 cursor-pointer",children:(0,i.jsx)(s.O$,{activeClassName:"text-primary",href:"/admin/users",children:(0,i.jsx)("p",{children:"Users"})})}),(0,i.jsx)("li",{className:"py-1.5 cursor-pointer",children:(0,i.jsx)(s.O$,{activeClassName:"text-primary",href:"/admin/ballots",children:(0,i.jsx)("p",{children:"Ballots"})})}),(0,i.jsx)("li",{className:"py-1.5 cursor-pointer",children:(0,i.jsx)(s.O$,{activeClassName:"text-primary",href:"/admin/perks",children:(0,i.jsx)("p",{children:"Perks"})})}),(0,i.jsx)("li",{className:"py-1.5 cursor-pointer",children:(0,i.jsx)(s.O$,{activeClassName:"text-primary",href:"/admin/settings",children:(0,i.jsx)("p",{children:"Settings"})})})]})]}),(0,i.jsx)(l.Z,{className:"py-4 lg:hidden",theme:"dark"})]})};function o(e){var r=e.children;return(0,i.jsx)("div",{children:(0,i.jsx)("div",{className:"dashboard-layout",children:(0,i.jsxs)("div",{className:"relative h-screen h-px mx-auto 2xl:min-h-105 max-w-404 px-4 lg:py-4 xl:py-16 2xl:py-24 flex flex-col",children:[(0,i.jsxs)("div",{className:"flex h-full flex-col lg:flex-row",children:[(0,i.jsx)("div",{className:"flex-none",children:(0,i.jsx)(c,{})}),(0,i.jsx)("div",{className:"pt-12 lg:pt-0 lg:pl-6 dashboard-content flex-grow h-full",children:r})]}),(0,i.jsx)("div",{className:"absolute py-8 left-0 bottom-0 right-0",children:(0,i.jsx)(a.Z,{theme:"dark"})})]})})})}},2139:function(e,r,n){"use strict";n.r(r);var i=n(5893),a=n(7294),t=n(9226),s=n(44),l=n(4015),c=n(4590),o=n(2927),d=n(7028);r.default=(0,l.a)((function(){var e=(0,t.I0)(),r=(0,t.v9)((function(e){return null===e||void 0===e?void 0:e.intakeReducer})),n=r.isLoading,l=r.data,u=(0,a.useMemo)((function(){return[{name:(0,i.jsx)("div",{className:"text-lg font-medium",children:"Registration Date"}),selector:"registration_date",cell:function(e){return"".concat(e.registration_date)},sortable:!1,left:!0},{name:(0,i.jsx)("div",{className:"text-lg font-medium",children:"Users Email"}),selector:"email",cell:function(e){return(0,i.jsx)("p",{className:"truncate\t",children:e.email})},sortable:!1,left:!0},{name:(0,i.jsxs)("div",{className:"text-lg font-medium",children:["Letter of ",(0,i.jsx)("br",{})," Motivation"]}),selector:"letter",cell:function(e){return(0,i.jsx)("a",{href:"/".concat(e.signed_file_url),className:"pl-3 text-primary cursor-pointer underline",children:"View"})},sortable:!1,left:!0},{name:(0,i.jsx)("div",{className:"text-lg font-medium",children:"Node Operator KYC"}),selector:"register_date",cell:function(e){return(0,i.jsx)("button",{type:"button",className:"text-sm text-white w-1/2 h-7 rounded-full bg-primary shadow-md focus:outline-none hover:opacity-40",children:"Review"})},sortable:!1,left:!0},{name:(0,i.jsx)("div",{className:"text-lg font-medium",children:"Beneficial Owner KYC"}),selector:"register_date",cell:function(e){return(0,i.jsx)("button",{type:"button",className:"text-sm text-white w-1/2 h-7 rounded-full bg-primary shadow-md focus:outline-none hover:opacity-40",children:"Review"})},sortable:!1,left:!0},{name:(0,i.jsx)("div",{className:"text-lg font-medium",children:"# of Beneficial Owners"}),selector:"register_date",cell:function(e){return"".concat(e.beneficial_owners)},sortable:!1,left:!0},{name:(0,i.jsx)("div",{className:"text-lg font-medium",children:"Unopened Invites"}),selector:"register_date",cell:function(e){return"".concat(e.unopened_invites)},sortable:!1,left:!0}]}),[]);return(0,a.useEffect)((function(){e((0,d.c8)({page:1,limit:999}))}),[]),(0,i.jsx)(c.Z,{children:(0,i.jsx)(o.Zb,{className:"h-full px-24 py-14",children:(0,i.jsxs)("div",{className:"bg-transparent h-full",children:[(0,i.jsx)("div",{className:"w-full",children:(0,i.jsxs)("div",{className:"lg:h-70px flex flex-col justify-center",children:[(0,i.jsx)("h3",{className:"text-dark2 text-xl lg:pr-32 font-medium mb-3.5",children:"Intake"}),(0,i.jsx)("p",{className:"text-sm text-gray pb-3.5",children:"New members needing approval"}),(0,i.jsx)("div",{className:"border-primary border-b-2"})]})}),(0,i.jsx)("div",{className:"flex flex-col pt-4 h-full",children:(0,i.jsx)(s.ZP,{columns:u,data:(null===l||void 0===l?void 0:l.data)||[],progressPending:n,persistTableHead:!0,responsive:!0,noHeader:!0,fixedHeader:!0,fixedHeaderScrollHeight:"380px"})})]})})})}),"final-admin")},7028:function(e,r,n){"use strict";n.d(r,{lL:function(){return i},yW:function(){return a},nE:function(){return t},FH:function(){return s},fX:function(){return l},iA:function(){return c},Xp:function(){return o},ed:function(){return d},c8:function(){return u},Od:function(){return f},fI:function(){return m},yG:function(){return p},Lx:function(){return h},I2:function(){return x},MC:function(){return v}});var i=function(e){return{type:"GET_LIST_MEMBER",payload:e}},a=function(e){return{type:"GET_LIST_MEMBER_SUCCESS",payload:e}},t=function(e){return{type:"GET_USER_DETAIL",payload:e}},s=function(e){return{type:"GET_USER_DETAIL_SUCCESS",payload:e}},l=function(e){return{type:"GET_USER_KYC_INFO",payload:e}},c=function(e){return{type:"GET_USER_KYC_INFO_SUCCESS",payload:e}},o=function(e){return{type:"APPROVE_KYC",payload:e}},d=function(e){return{type:"DENY_KYC",payload:e}},u=function(e){return{type:"GET_LIST_INTAKE",payload:e}},f=function(e){return{type:"GET_LIST_INTAKE_SUCCESS",payload:e}},m=function(e){return{type:"GET_LIST_INTAKE_ERROR",payload:e}},p=function(e,r){return{type:"GET_BALLOTS",payload:e,callback:r}},h=function(e,r){return{type:"GET_BALLOT_DETAIL",payload:e,callback:r}},x=function(e,r,n){return{type:"SUBMIT_BALLOT",payload:e,resolve:r,reject:n}},v=function(e,r){return{type:"CANCEL_BALLOT",payload:e,callback:r}}},9200:function(e,r,n){(window.__NEXT_P=window.__NEXT_P||[]).push(["/admin/intake",function(){return n(2139)}])}},function(e){e.O(0,[9774,2554,1282,319,6993,733,9460,9163,44,856],(function(){return r=9200,e(e.s=r);var r}));var r=e.O();_N_E=r}]);