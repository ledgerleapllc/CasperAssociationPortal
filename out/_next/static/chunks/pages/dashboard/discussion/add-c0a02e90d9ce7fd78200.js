(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[732],{4015:function(e,r,s){"use strict";s.d(r,{a:function(){return c}});var a=s(6156),i=s(5893),l=s(7294),n=s(1163),d=s(9226);var t=s(4791);function o(e,r){var s=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);r&&(a=a.filter((function(r){return Object.getOwnPropertyDescriptor(e,r).enumerable}))),s.push.apply(s,a)}return s}var c=function(e,r){return function(s){var c=function(){var e=(arguments.length>0&&void 0!==arguments[0]?arguments[0]:{}).urlType,r=void 0===e?"public":e,s=(0,d.v9)((function(e){return e.authReducer.userInfo}));return(0,l.useEffect)((function(){if("public"!==r&&r&&s)if(s&&null!==s&&void 0!==s&&s.isLoggedIn)if("member"===s.role){if("auth"===r)return"verifying"===s.period&&n.default.push("/verify-email"),"onboarding"===s.period&&n.default.push("/onboard"),void("final"===s.period&&n.default.push("/dashboard"));if("verifying"===r)return"onboarding"===s.period&&n.default.push("/onboard"),void("final"===s.period&&n.default.push("/dashboard"));if("onboarding"===r)return"verifying"===s.period&&n.default.push("/verify-email"),void("final"===s.period&&n.default.push("/dashboard"));if("final-member"===r||"final-all"===r)return"verifying"===s.period&&n.default.push("/verify-email"),void("onboarding"===s.period&&n.default.push("/onboard"));"final-admin"===r&&("verifying"===s.period&&n.default.push("/verify-email"),"onboarding"===s.period&&n.default.push("/onboard"),"final"===s.period&&n.default.push("/dashboard"))}else"admin"===s.role&&"final-all"!==r&&"final-admin"!==r&&n.default.push("/admin/dashboard");else"auth"!==r&&n.default.push("/login")}),[s,r]),{user:s}}({urlType:r}).user;if(r&&"public"!==r){if(!c)return(0,i.jsx)(t.Z,{});if("auth"===r&&c.isLoggedIn)return(0,i.jsx)(t.Z,{});if("auth"!==r&&!c.isLoggedIn)return(0,i.jsx)(t.Z,{});if("member"===c.role){if(["final-all","final-member"].includes(r)&&"final"!==c.period)return(0,i.jsx)(t.Z,{});if(["verifying"].includes(r)&&"verifying"!==c.period)return(0,i.jsx)(t.Z,{});if(["onboarding"].includes(r)&&"onboarding"!==c.period)return(0,i.jsx)(t.Z,{})}if("admin"===c.role&&["verifying","onboarding","final-member"].includes(r))return(0,i.jsx)(t.Z,{})}return(0,i.jsx)(e,function(e){for(var r=1;r<arguments.length;r++){var s=null!=arguments[r]?arguments[r]:{};r%2?o(Object(s),!0).forEach((function(r){(0,a.Z)(e,r,s[r])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(s)):o(Object(s)).forEach((function(r){Object.defineProperty(e,r,Object.getOwnPropertyDescriptor(s,r))}))}return e}({},s))}}},4791:function(e,r,s){"use strict";var a=s(5893);r.Z=function(){return(0,a.jsx)("p",{children:"Loading"})}},4590:function(e,r,s){"use strict";s.d(r,{Z:function(){return o}});var a=s(5893),i=s(7667),l=s(9226),n=s(7124),d=s(6570),t=function(){var e=(0,l.v9)((function(e){return e.authReducer.userInfo.fullInfo}));return(0,a.jsxs)(a.Fragment,{children:[(0,a.jsxs)(n.Zb,{className:"flex-col w-24 px-5 hidden lg:flex h-full overflow-y-scroll",children:[(0,a.jsx)("img",{className:"py-6 border-b-2 border-primary align-center",src:"/images/ic_logo_home.svg",alt:"Casper"}),(0,a.jsxs)("ul",{className:"mb-4 flex flex-col items-center border-b-2 border-primary",children:[(0,a.jsx)("li",{className:"pb-4 pt-14",children:(0,a.jsx)(n.O$,{activeClassName:"shadow-activeLink",href:"/dashboard",children:(0,a.jsx)("a",{className:"rounded-lg inline-block",children:(0,a.jsx)("img",{className:"p-3",src:"/images/ic_home.svg",alt:"Home"})})})}),(0,a.jsx)("li",{className:"py-2",children:(0,a.jsx)(n.O$,{activeClassName:"shadow-activeLink",href:"/dashboard/nodes",children:(0,a.jsx)("a",{className:"inline-block rounded-2xl hover:shadow-lg",children:(0,a.jsx)("img",{className:"p-3",src:"/images/ic_infor.svg",alt:"Validator Info"})})})}),(0,a.jsx)("li",{className:"py-2",children:(0,a.jsx)(n.O$,{activeClassName:"shadow-activeLink",href:"/dashboard/discussion",children:(0,a.jsx)("a",{className:"rounded-lg inline-block",children:(0,a.jsx)("img",{className:"p-3",src:"/images/ic_material_chat.svg",alt:"Material Chat"})})})}),(0,a.jsx)("li",{className:"py-2",children:(0,a.jsx)(n.O$,{activeClassName:"shadow-activeLink",href:"/dashboard/votes",children:(0,a.jsx)("a",{className:"inline-block rounded-2xl hover:shadow-lg",children:(0,a.jsx)("img",{className:"p-3",src:"/images/ic_awesome_vote.svg",alt:"Vote"})})})}),(0,a.jsx)("li",{className:"py-2",children:(0,a.jsx)(n.O$,{activeClassName:"shadow-activeLink",href:"/dashboard/member-perks",children:(0,a.jsx)("a",{className:"inline-block rounded-2xl hover:shadow-lg",children:(0,a.jsx)("img",{className:"p-3",src:"/images/ic_feather_user_plus.svg",alt:"User Add"})})})}),(0,a.jsx)("li",{className:"pt-2",children:(0,a.jsx)(n.O$,{activeClassName:"shadow-activeLink",href:"/dashboard/settings",children:(0,a.jsx)("a",{className:"inline-block rounded-2xl hover:shadow-lg",children:(0,a.jsx)("img",{className:"p-3",src:"/images/ic_feather_settings.svg",alt:"Setting"})})})})]}),"admin"===(null===e||void 0===e?void 0:e.role)&&(0,a.jsxs)("ul",{className:"flex flex-col pb-4",children:[(0,a.jsx)("li",{className:"py-1.5 cursor-pointer",children:(0,a.jsx)(n.O$,{activeClassName:"text-primary",href:"/admin/dashboard",children:(0,a.jsx)("p",{children:"Admin"})})}),(0,a.jsx)("li",{className:"py-1.5 cursor-pointer",children:(0,a.jsx)(n.O$,{activeClassName:"text-primary",href:"/admin/intake",children:(0,a.jsx)("p",{children:"Instake"})})}),(0,a.jsx)("li",{className:"py-1.5 cursor-pointer",children:(0,a.jsx)(n.O$,{activeClassName:"text-primary",href:"/admin/users",children:(0,a.jsx)("p",{children:"Users"})})}),(0,a.jsx)("li",{className:"py-1.5 cursor-pointer",children:(0,a.jsx)(n.O$,{activeClassName:"text-primary",href:"/admin/ballots",children:(0,a.jsx)("p",{children:"Ballots"})})}),(0,a.jsx)("li",{className:"py-1.5 cursor-pointer",children:(0,a.jsx)(n.O$,{activeClassName:"text-primary",href:"/admin/perks",children:(0,a.jsx)("p",{children:"Perks"})})}),(0,a.jsx)("li",{className:"py-1.5 cursor-pointer",children:(0,a.jsx)(n.O$,{activeClassName:"text-primary",href:"/admin/settings",children:(0,a.jsx)("p",{children:"Settings"})})})]})]}),(0,a.jsx)(d.Z,{className:"py-4 lg:hidden",theme:"dark"})]})};function o(e){var r=e.children;return(0,a.jsx)("div",{children:(0,a.jsx)("div",{className:"dashboard-layout",children:(0,a.jsxs)("div",{className:"relative h-screen h-px mx-auto 2xl:min-h-105 max-w-404 px-4 lg:py-4 xl:py-16 2xl:py-24 flex flex-col",children:[(0,a.jsxs)("div",{className:"flex h-full flex-col lg:flex-row",children:[(0,a.jsx)("div",{className:"flex-none",children:(0,a.jsx)(t,{})}),(0,a.jsx)("div",{className:"pt-12 lg:pt-0 lg:pl-6 dashboard-content flex-grow h-full",children:r})]}),(0,a.jsx)("div",{className:"absolute py-8 left-0 bottom-0 right-0",children:(0,a.jsx)(i.Z,{theme:"dark"})})]})})})}},4891:function(e,r,s){"use strict";s.r(r);var a=s(5893),i=s(4015),l=s(4590),n=s(7124);r.default=(0,i.a)((function(){return(0,a.jsx)(l.Z,{children:(0,a.jsx)(n.Zb,{className:"h-full lg:pl-24 lg:py-11 lg:shadow-2xl",noShadow:!0,children:(0,a.jsxs)("div",{className:"w-full h-full",children:[(0,a.jsxs)("div",{className:"card-header lg:mr-24 lg:h-70px",children:[(0,a.jsx)(n.xE,{href:"/dashboard/discussion",text:"Cancel"}),(0,a.jsx)("h3",{className:"text-dark2 text-xl lg:pr-32 font-medium mb-3.5",children:"Create a Discusion"}),(0,a.jsx)("div",{className:"border-primary border-b-2"})]}),(0,a.jsx)("div",{className:"card-body pt-8 pb-28 overflow-y-auto lg:h-100%-70px",children:(0,a.jsxs)("div",{className:"lg:pr-24",children:[(0,a.jsxs)("p",{className:"text-sm",children:["Posting as: ",(0,a.jsx)("a",{className:"text-primary",children:"Usernameismine5859"})]}),(0,a.jsx)("input",{type:"text",className:"border border-gray1 w-full mt-4 flex-1 h-14 px-7 shadow-md focus:outline-none",placeholder:"Title"}),(0,a.jsx)("div",{className:"mt-4 shadow-md",children:(0,a.jsx)(n.ML,{})}),(0,a.jsxs)("div",{className:"flex flex-col-reverse lg:flex-wrap lg:flex-row pt-8 justify-end",children:[(0,a.jsx)("button",{type:"button",className:"lg:mr-5 my-1 h-16 lg:h-11 w-full text-lg text-primary lg:w-48 rounded-full bg-none border-2 border-primary hover:opacity-40 disabled:opacity-40 disabled:cursor-not-allowed focus:outline-none shadow-md",children:"Save Draft"}),(0,a.jsx)("button",{type:"button",className:"my-1 h-16 lg:h-11 text-lg w-full text-white lg:w-48 rounded-full bg-primary hover:opacity-40 disabled:opacity-40 disabled:cursor-not-allowed focus:outline-none shadow-md",children:"Post"})]}),(0,a.jsx)("div",{className:"pt-8 border-primary border-b lg:border-b-2"})]})})]})})})}),"final-all")},8220:function(e,r,s){(window.__NEXT_P=window.__NEXT_P||[]).push(["/dashboard/discussion/add",function(){return s(4891)}])}},function(e){e.O(0,[774,554,282,319,993,802,271],(function(){return r=8220,e(e.s=r);var r}));var r=e.O();_N_E=r}]);