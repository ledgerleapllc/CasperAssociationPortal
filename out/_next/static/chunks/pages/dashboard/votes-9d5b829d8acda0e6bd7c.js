(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[135],{4015:function(e,l,s){"use strict";s.d(l,{a:function(){return m}});var a=s(6156),i=s(5893),t=s(7294),n=s(1163),d=s(9226);var r=s(4791);function c(e,l){var s=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);l&&(a=a.filter((function(l){return Object.getOwnPropertyDescriptor(e,l).enumerable}))),s.push.apply(s,a)}return s}var m=function(e,l){return function(s){var m=function(){var e=(arguments.length>0&&void 0!==arguments[0]?arguments[0]:{}).urlType,l=void 0===e?"public":e,s=(0,d.v9)((function(e){return e.authReducer.userInfo}));return(0,t.useEffect)((function(){if("public"!==l&&l&&s)if(s&&null!==s&&void 0!==s&&s.isLoggedIn)if("member"===s.role){if("auth"===l)return"verifying"===s.period&&n.default.push("/verify-email"),"onboarding"===s.period&&n.default.push("/onboard"),void("final"===s.period&&n.default.push("/dashboard"));if("verifying"===l)return"onboarding"===s.period&&n.default.push("/onboard"),void("final"===s.period&&n.default.push("/dashboard"));if("onboarding"===l)return"verifying"===s.period&&n.default.push("/verify-email"),void("final"===s.period&&n.default.push("/dashboard"));if("final-member"===l||"final-all"===l)return"verifying"===s.period&&n.default.push("/verify-email"),void("onboarding"===s.period&&n.default.push("/onboard"));"final-admin"===l&&("verifying"===s.period&&n.default.push("/verify-email"),"onboarding"===s.period&&n.default.push("/onboard"),"final"===s.period&&n.default.push("/dashboard"))}else"admin"===s.role&&"final-all"!==l&&"final-admin"!==l&&n.default.push("/admin/dashboard");else"auth"!==l&&n.default.push("/login")}),[s,l]),{user:s}}({urlType:l}).user;if(l&&"public"!==l){if(!m)return(0,i.jsx)(r.Z,{});if("auth"===l&&m.isLoggedIn)return(0,i.jsx)(r.Z,{});if("auth"!==l&&!m.isLoggedIn)return(0,i.jsx)(r.Z,{});if("member"===m.role){if(["final-all","final-member"].includes(l)&&"final"!==m.period)return(0,i.jsx)(r.Z,{});if(["verifying"].includes(l)&&"verifying"!==m.period)return(0,i.jsx)(r.Z,{});if(["onboarding"].includes(l)&&"onboarding"!==m.period)return(0,i.jsx)(r.Z,{})}if("admin"===m.role&&["verifying","onboarding","final-member"].includes(l))return(0,i.jsx)(r.Z,{})}return(0,i.jsx)(e,function(e){for(var l=1;l<arguments.length;l++){var s=null!=arguments[l]?arguments[l]:{};l%2?c(Object(s),!0).forEach((function(l){(0,a.Z)(e,l,s[l])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(s)):c(Object(s)).forEach((function(l){Object.defineProperty(e,l,Object.getOwnPropertyDescriptor(s,l))}))}return e}({},s))}}},4791:function(e,l,s){"use strict";var a=s(5893);l.Z=function(){return(0,a.jsx)("p",{children:"Loading"})}},4590:function(e,l,s){"use strict";s.d(l,{Z:function(){return c}});var a=s(5893),i=s(7667),t=s(9226),n=s(7124),d=s(6570),r=function(){var e=(0,t.v9)((function(e){return e.authReducer.userInfo.fullInfo}));return(0,a.jsxs)(a.Fragment,{children:[(0,a.jsxs)(n.Zb,{className:"flex-col w-24 px-5 hidden lg:flex h-full overflow-y-scroll",children:[(0,a.jsx)("img",{className:"py-6 border-b-2 border-primary align-center",src:"/images/ic_logo_home.svg",alt:"Casper"}),(0,a.jsxs)("ul",{className:"mb-4 flex flex-col items-center border-b-2 border-primary",children:[(0,a.jsx)("li",{className:"pb-4 pt-14",children:(0,a.jsx)(n.O$,{activeClassName:"shadow-activeLink",href:"/dashboard",children:(0,a.jsx)("a",{className:"rounded-lg inline-block",children:(0,a.jsx)("img",{className:"p-3",src:"/images/ic_home.svg",alt:"Home"})})})}),(0,a.jsx)("li",{className:"py-2",children:(0,a.jsx)(n.O$,{activeClassName:"shadow-activeLink",href:"/dashboard/nodes",children:(0,a.jsx)("a",{className:"inline-block rounded-2xl hover:shadow-lg",children:(0,a.jsx)("img",{className:"p-3",src:"/images/ic_infor.svg",alt:"Validator Info"})})})}),(0,a.jsx)("li",{className:"py-2",children:(0,a.jsx)(n.O$,{activeClassName:"shadow-activeLink",href:"/dashboard/discussion",children:(0,a.jsx)("a",{className:"rounded-lg inline-block",children:(0,a.jsx)("img",{className:"p-3",src:"/images/ic_material_chat.svg",alt:"Material Chat"})})})}),(0,a.jsx)("li",{className:"py-2",children:(0,a.jsx)(n.O$,{activeClassName:"shadow-activeLink",href:"/dashboard/votes",children:(0,a.jsx)("a",{className:"inline-block rounded-2xl hover:shadow-lg",children:(0,a.jsx)("img",{className:"p-3",src:"/images/ic_awesome_vote.svg",alt:"Vote"})})})}),(0,a.jsx)("li",{className:"py-2",children:(0,a.jsx)(n.O$,{activeClassName:"shadow-activeLink",href:"/dashboard/member-perks",children:(0,a.jsx)("a",{className:"inline-block rounded-2xl hover:shadow-lg",children:(0,a.jsx)("img",{className:"p-3",src:"/images/ic_feather_user_plus.svg",alt:"User Add"})})})}),(0,a.jsx)("li",{className:"pt-2",children:(0,a.jsx)(n.O$,{activeClassName:"shadow-activeLink",href:"/dashboard/settings",children:(0,a.jsx)("a",{className:"inline-block rounded-2xl hover:shadow-lg",children:(0,a.jsx)("img",{className:"p-3",src:"/images/ic_feather_settings.svg",alt:"Setting"})})})})]}),"admin"===(null===e||void 0===e?void 0:e.role)&&(0,a.jsxs)("ul",{className:"flex flex-col pb-4",children:[(0,a.jsx)("li",{className:"py-1.5 cursor-pointer",children:(0,a.jsx)(n.O$,{activeClassName:"text-primary",href:"/admin/dashboard",children:(0,a.jsx)("p",{children:"Admin"})})}),(0,a.jsx)("li",{className:"py-1.5 cursor-pointer",children:(0,a.jsx)(n.O$,{activeClassName:"text-primary",href:"/admin/intake",children:(0,a.jsx)("p",{children:"Instake"})})}),(0,a.jsx)("li",{className:"py-1.5 cursor-pointer",children:(0,a.jsx)(n.O$,{activeClassName:"text-primary",href:"/admin/users",children:(0,a.jsx)("p",{children:"Users"})})}),(0,a.jsx)("li",{className:"py-1.5 cursor-pointer",children:(0,a.jsx)(n.O$,{activeClassName:"text-primary",href:"/admin/ballots",children:(0,a.jsx)("p",{children:"Ballots"})})}),(0,a.jsx)("li",{className:"py-1.5 cursor-pointer",children:(0,a.jsx)(n.O$,{activeClassName:"text-primary",href:"/admin/perks",children:(0,a.jsx)("p",{children:"Perks"})})}),(0,a.jsx)("li",{className:"py-1.5 cursor-pointer",children:(0,a.jsx)(n.O$,{activeClassName:"text-primary",href:"/admin/settings",children:(0,a.jsx)("p",{children:"Settings"})})})]})]}),(0,a.jsx)(d.Z,{className:"py-4 lg:hidden",theme:"dark"})]})};function c(e){var l=e.children;return(0,a.jsx)("div",{children:(0,a.jsx)("div",{className:"dashboard-layout",children:(0,a.jsxs)("div",{className:"relative h-screen h-px mx-auto 2xl:min-h-105 max-w-404 px-4 lg:py-4 xl:py-16 2xl:py-24 flex flex-col",children:[(0,a.jsxs)("div",{className:"flex h-full flex-col lg:flex-row",children:[(0,a.jsx)("div",{className:"flex-none",children:(0,a.jsx)(r,{})}),(0,a.jsx)("div",{className:"pt-12 lg:pt-0 lg:pl-6 dashboard-content flex-grow h-full",children:l})]}),(0,a.jsx)("div",{className:"absolute py-8 left-0 bottom-0 right-0",children:(0,a.jsx)(i.Z,{theme:"dark"})})]})})})}},1637:function(e,l,s){"use strict";s.r(l);var a=s(5893),i=s(4015),t=s(4590),n=s(7124),d=[{content:function(){return(0,a.jsxs)("div",{className:"flex flex-col w-full h-auto lg:h-full mt-5",children:[(0,a.jsxs)("div",{className:"w-full hidden lg:flex flex-row pb-4",children:[(0,a.jsx)("p",{className:"w-2/6 text-base font-medium",children:"Title"}),(0,a.jsx)("p",{className:"w-1/6 text-base font-medium",children:"Time Remainning"}),(0,a.jsx)("p",{className:"w-1/6 text-base font-medium",children:"Votes"}),(0,a.jsx)("p",{className:"w-1/6 text-base font-medium",children:"Current Split"}),(0,a.jsx)("p",{className:"w-1/6 text-base font-medium",children:"Date"})]}),(0,a.jsxs)("div",{className:"flex flex-col w-full h-full lg:overflow-y-scroll",children:[(0,a.jsxs)("div",{className:"flex flex-col lg:flex-row w-full py-7 border-b border-gray",children:[(0,a.jsxs)("p",{className:"block lg:hidden w-full text-sm py-2.5 lg:py-0",children:[(0,a.jsx)("span",{className:"font-medium pr-3",children:"Started:"}),"6/15/2021"]}),(0,a.jsx)("p",{className:"w-full lg:w-2/6 text-sm",children:"In maximus, augue a laoreet dapibus, magna ante vehicula nibh,sit ametiaculis mi erat vitae elit."}),(0,a.jsxs)("p",{className:"flex lg:block w-full lg:w-1/6 text-sm py-2.5 lg:py-0",children:[(0,a.jsx)("span",{className:"lg:hidden font-medium pr-3",children:"Time Remaining:"}),"1d:21h:05m"]}),(0,a.jsxs)("p",{className:"flex lg:block w-full lg:w-1/6 text-sm py-2.5 lg:py-0",children:[(0,a.jsx)("span",{className:"lg:hidden font-medium pr-3",children:"Votes:"}),"199"]}),(0,a.jsxs)("p",{className:"flex lg:block w-full lg:w-1/6 text-sm py-2.5 lg:py-0",children:[(0,a.jsx)("span",{className:"lg:hidden font-medium pr-3",children:"Current Split:"}),"168/",(0,a.jsx)("span",{className:"text-primary",children:"31"})]}),(0,a.jsx)("p",{className:"hidden lg:block w-full lg:w-1/6 text-sm",children:"6/15/2021"}),(0,a.jsx)("button",{type:"button",className:"block lg:hidden mt-4 transition text-lg text-white w-1/2 h-11 rounded-full bg-primary hover:opacity-40 disabled:opacity-40 disabled:cursor-not-allowed focus:outline-none shadow-md",children:"Vote Now"})]}),(0,a.jsxs)("div",{className:"flex flex-col lg:flex-row w-full py-7 border-b border-gray",children:[(0,a.jsxs)("p",{className:"block lg:hidden w-full text-sm py-2.5 lg:py-0",children:[(0,a.jsx)("span",{className:"font-medium pr-3",children:"Started:"}),"6/15/2021"]}),(0,a.jsx)("p",{className:"w-full lg:w-2/6 text-sm",children:"In maximus, augue a laoreet dapibus, magna ante vehicula nibh,sit ametiaculis mi erat vitae elit."}),(0,a.jsxs)("p",{className:"flex lg:block w-full lg:w-1/6 text-sm py-2.5 lg:py-0",children:[(0,a.jsx)("span",{className:"lg:hidden font-medium pr-3",children:"Time Remaining:"}),"1d:21h:05m"]}),(0,a.jsxs)("p",{className:"flex lg:block w-full lg:w-1/6 text-sm py-2.5 lg:py-0",children:[(0,a.jsx)("span",{className:"lg:hidden font-medium pr-3",children:"Votes:"}),"199"]}),(0,a.jsxs)("p",{className:"flex lg:block w-full lg:w-1/6 text-sm py-2.5 lg:py-0",children:[(0,a.jsx)("span",{className:"lg:hidden font-medium pr-3",children:"Current Split:"}),"168/",(0,a.jsx)("span",{className:"text-primary",children:"31"})]}),(0,a.jsx)("p",{className:"hidden lg:block w-full lg:w-1/6 text-sm",children:"6/15/2021"}),(0,a.jsx)("button",{type:"button",className:"block lg:hidden mt-4 transition text-lg text-white w-1/2 h-11 rounded-full bg-primary hover:opacity-40 disabled:opacity-40 disabled:cursor-not-allowed focus:outline-none shadow-md",children:"Vote Now"})]}),(0,a.jsxs)("div",{className:"flex flex-col lg:flex-row w-full py-7 border-b border-gray",children:[(0,a.jsxs)("p",{className:"block lg:hidden w-full text-sm py-2.5 lg:py-0",children:[(0,a.jsx)("span",{className:"font-medium pr-3",children:"Started:"}),"6/15/2021"]}),(0,a.jsx)("p",{className:"w-full lg:w-2/6 text-sm",children:"In maximus, augue a laoreet dapibus, magna ante vehicula nibh,sit ametiaculis mi erat vitae elit."}),(0,a.jsxs)("p",{className:"flex lg:block w-full lg:w-1/6 text-sm py-2.5 lg:py-0",children:[(0,a.jsx)("span",{className:"lg:hidden font-medium pr-3",children:"Time Remaining:"}),"1d:21h:05m"]}),(0,a.jsxs)("p",{className:"flex lg:block w-full lg:w-1/6 text-sm py-2.5 lg:py-0",children:[(0,a.jsx)("span",{className:"lg:hidden font-medium pr-3",children:"Votes:"}),"199"]}),(0,a.jsxs)("p",{className:"flex lg:block w-full lg:w-1/6 text-sm py-2.5 lg:py-0",children:[(0,a.jsx)("span",{className:"lg:hidden font-medium pr-3",children:"Current Split:"}),"168/",(0,a.jsx)("span",{className:"text-primary",children:"31"})]}),(0,a.jsx)("p",{className:"hidden lg:block w-full lg:w-1/6 text-sm",children:"6/15/2021"}),(0,a.jsx)("button",{type:"button",className:"block lg:hidden mt-4 transition text-lg text-white w-1/2 h-11 rounded-full bg-primary hover:opacity-40 disabled:opacity-40 disabled:cursor-not-allowed focus:outline-none shadow-md",children:"Vote Now"})]}),(0,a.jsxs)("div",{className:"flex flex-col lg:flex-row w-full py-7 border-b border-gray",children:[(0,a.jsxs)("p",{className:"block lg:hidden w-full text-sm py-2.5 lg:py-0",children:[(0,a.jsx)("span",{className:"font-medium pr-3",children:"Started:"}),"6/15/2021"]}),(0,a.jsx)("p",{className:"w-full lg:w-2/6 text-sm",children:"In maximus, augue a laoreet dapibus, magna ante vehicula nibh,sit ametiaculis mi erat vitae elit."}),(0,a.jsxs)("p",{className:"flex lg:block w-full lg:w-1/6 text-sm py-2.5 lg:py-0",children:[(0,a.jsx)("span",{className:"lg:hidden font-medium pr-3",children:"Time Remaining:"}),"1d:21h:05m"]}),(0,a.jsxs)("p",{className:"flex lg:block w-full lg:w-1/6 text-sm py-2.5 lg:py-0",children:[(0,a.jsx)("span",{className:"lg:hidden font-medium pr-3",children:"Votes:"}),"199"]}),(0,a.jsxs)("p",{className:"flex lg:block w-full lg:w-1/6 text-sm py-2.5 lg:py-0",children:[(0,a.jsx)("span",{className:"lg:hidden font-medium pr-3",children:"Current Split:"}),"168/",(0,a.jsx)("span",{className:"text-primary",children:"31"})]}),(0,a.jsx)("p",{className:"hidden lg:block w-full lg:w-1/6 text-sm",children:"6/15/2021"}),(0,a.jsx)("button",{type:"button",className:"block lg:hidden mt-4 transition text-lg text-white w-1/2 h-11 rounded-full bg-primary hover:opacity-40 disabled:opacity-40 disabled:cursor-not-allowed focus:outline-none shadow-md",children:"Vote Now"})]}),(0,a.jsxs)("div",{className:"flex flex-col lg:flex-row w-full py-7 border-b border-gray",children:[(0,a.jsxs)("p",{className:"block lg:hidden w-full text-sm py-2.5 lg:py-0",children:[(0,a.jsx)("span",{className:"font-medium pr-3",children:"Started:"}),"6/15/2021"]}),(0,a.jsx)("p",{className:"w-full lg:w-2/6 text-sm",children:"In maximus, augue a laoreet dapibus, magna ante vehicula nibh,sit ametiaculis mi erat vitae elit."}),(0,a.jsxs)("p",{className:"flex lg:block w-full lg:w-1/6 text-sm py-2.5 lg:py-0",children:[(0,a.jsx)("span",{className:"lg:hidden font-medium pr-3",children:"Time Remaining:"}),"1d:21h:05m"]}),(0,a.jsxs)("p",{className:"flex lg:block w-full lg:w-1/6 text-sm py-2.5 lg:py-0",children:[(0,a.jsx)("span",{className:"lg:hidden font-medium pr-3",children:"Votes:"}),"199"]}),(0,a.jsxs)("p",{className:"flex lg:block w-full lg:w-1/6 text-sm py-2.5 lg:py-0",children:[(0,a.jsx)("span",{className:"lg:hidden font-medium pr-3",children:"Current Split:"}),"168/",(0,a.jsx)("span",{className:"text-primary",children:"31"})]}),(0,a.jsx)("p",{className:"hidden lg:block w-full lg:w-1/6 text-sm",children:"6/15/2021"}),(0,a.jsx)("button",{type:"button",className:"block lg:hidden mt-4 transition text-lg text-white w-1/2 h-11 rounded-full bg-primary hover:opacity-40 disabled:opacity-40 disabled:cursor-not-allowed focus:outline-none shadow-md",children:"Vote Now"})]}),(0,a.jsxs)("div",{className:"flex flex-col lg:flex-row w-full py-7 border-b border-gray",children:[(0,a.jsxs)("p",{className:"block lg:hidden w-full text-sm py-2.5 lg:py-0",children:[(0,a.jsx)("span",{className:"font-medium pr-3",children:"Started:"}),"6/15/2021"]}),(0,a.jsx)("p",{className:"w-full lg:w-2/6 text-sm",children:"In maximus, augue a laoreet dapibus, magna ante vehicula nibh,sit ametiaculis mi erat vitae elit."}),(0,a.jsxs)("p",{className:"flex lg:block w-full lg:w-1/6 text-sm py-2.5 lg:py-0",children:[(0,a.jsx)("span",{className:"lg:hidden font-medium pr-3",children:"Time Remaining:"}),"1d:21h:05m"]}),(0,a.jsxs)("p",{className:"flex lg:block w-full lg:w-1/6 text-sm py-2.5 lg:py-0",children:[(0,a.jsx)("span",{className:"lg:hidden font-medium pr-3",children:"Votes:"}),"199"]}),(0,a.jsxs)("p",{className:"flex lg:block w-full lg:w-1/6 text-sm py-2.5 lg:py-0",children:[(0,a.jsx)("span",{className:"lg:hidden font-medium pr-3",children:"Current Split:"}),"168/",(0,a.jsx)("span",{className:"text-primary",children:"31"})]}),(0,a.jsx)("p",{className:"hidden lg:block w-full lg:w-1/6 text-sm",children:"6/15/2021"}),(0,a.jsx)("button",{type:"button",className:"block lg:hidden mt-4 transition text-lg text-white w-1/2 h-11 rounded-full bg-primary hover:opacity-40 disabled:opacity-40 disabled:cursor-not-allowed focus:outline-none shadow-md",children:"Vote Now"})]}),(0,a.jsxs)("div",{className:"flex flex-col lg:flex-row w-full py-7 border-b border-gray",children:[(0,a.jsxs)("p",{className:"block lg:hidden w-full text-sm py-2.5 lg:py-0",children:[(0,a.jsx)("span",{className:"font-medium pr-3",children:"Started:"}),"6/15/2021"]}),(0,a.jsx)("p",{className:"w-full lg:w-2/6 text-sm",children:"In maximus, augue a laoreet dapibus, magna ante vehicula nibh,sit ametiaculis mi erat vitae elit."}),(0,a.jsxs)("p",{className:"flex lg:block w-full lg:w-1/6 text-sm py-2.5 lg:py-0",children:[(0,a.jsx)("span",{className:"lg:hidden font-medium pr-3",children:"Time Remaining:"}),"1d:21h:05m"]}),(0,a.jsxs)("p",{className:"flex lg:block w-full lg:w-1/6 text-sm py-2.5 lg:py-0",children:[(0,a.jsx)("span",{className:"lg:hidden font-medium pr-3",children:"Votes:"}),"199"]}),(0,a.jsxs)("p",{className:"flex lg:block w-full lg:w-1/6 text-sm py-2.5 lg:py-0",children:[(0,a.jsx)("span",{className:"lg:hidden font-medium pr-3",children:"Current Split:"}),"168/",(0,a.jsx)("span",{className:"text-primary",children:"31"})]}),(0,a.jsx)("p",{className:"hidden lg:block w-full lg:w-1/6 text-sm",children:"6/15/2021"}),(0,a.jsx)("button",{type:"button",className:"block lg:hidden mt-4 transition text-lg text-white w-1/2 h-11 rounded-full bg-primary hover:opacity-40 disabled:opacity-40 disabled:cursor-not-allowed focus:outline-none shadow-md",children:"Vote Now"})]}),(0,a.jsxs)("div",{className:"flex flex-col lg:flex-row w-full py-7 border-b border-gray",children:[(0,a.jsxs)("p",{className:"block lg:hidden w-full text-sm py-2.5 lg:py-0",children:[(0,a.jsx)("span",{className:"font-medium pr-3",children:"Started:"}),"6/15/2021"]}),(0,a.jsx)("p",{className:"w-full lg:w-2/6 text-sm",children:"In maximus, augue a laoreet dapibus, magna ante vehicula nibh,sit ametiaculis mi erat vitae elit."}),(0,a.jsxs)("p",{className:"flex lg:block w-full lg:w-1/6 text-sm py-2.5 lg:py-0",children:[(0,a.jsx)("span",{className:"lg:hidden font-medium pr-3",children:"Time Remaining:"}),"1d:21h:05m"]}),(0,a.jsxs)("p",{className:"flex lg:block w-full lg:w-1/6 text-sm py-2.5 lg:py-0",children:[(0,a.jsx)("span",{className:"lg:hidden font-medium pr-3",children:"Votes:"}),"199"]}),(0,a.jsxs)("p",{className:"flex lg:block w-full lg:w-1/6 text-sm py-2.5 lg:py-0",children:[(0,a.jsx)("span",{className:"lg:hidden font-medium pr-3",children:"Current Split:"}),"168/",(0,a.jsx)("span",{className:"text-primary",children:"31"})]}),(0,a.jsx)("p",{className:"hidden lg:block w-full lg:w-1/6 text-sm",children:"6/15/2021"}),(0,a.jsx)("button",{type:"button",className:"block lg:hidden mt-4 transition text-lg text-white w-1/2 h-11 rounded-full bg-primary hover:opacity-40 disabled:opacity-40 disabled:cursor-not-allowed focus:outline-none shadow-md",children:"Vote Now"})]}),(0,a.jsxs)("div",{className:"flex flex-col lg:flex-row w-full py-7",children:[(0,a.jsxs)("p",{className:"block lg:hidden w-full text-sm py-2.5 lg:py-0",children:[(0,a.jsx)("span",{className:"font-medium pr-3",children:"Started:"}),"6/15/2021"]}),(0,a.jsx)("p",{className:"w-full lg:w-2/6 text-sm",children:"In maximus, augue a laoreet dapibus, magna ante vehicula nibh,sit ametiaculis mi erat vitae elit."}),(0,a.jsxs)("p",{className:"flex lg:block w-full lg:w-1/6 text-sm py-2.5 lg:py-0",children:[(0,a.jsx)("span",{className:"lg:hidden font-medium pr-3",children:"Time Remaining:"}),"1d:21h:05m"]}),(0,a.jsxs)("p",{className:"flex lg:block w-full lg:w-1/6 text-sm py-2.5 lg:py-0",children:[(0,a.jsx)("span",{className:"lg:hidden font-medium pr-3",children:"Votes:"}),"199"]}),(0,a.jsxs)("p",{className:"flex lg:block w-full lg:w-1/6 text-sm py-2.5 lg:py-0",children:[(0,a.jsx)("span",{className:"lg:hidden font-medium pr-3",children:"Current Split:"}),"168/",(0,a.jsx)("span",{className:"text-primary",children:"31"})]}),(0,a.jsx)("p",{className:"hidden lg:block w-full lg:w-1/6 text-sm",children:"6/15/2021"}),(0,a.jsx)("button",{type:"button",className:"block lg:hidden mt-4 transition text-lg text-white w-1/2 h-11 rounded-full bg-primary hover:opacity-40 disabled:opacity-40 disabled:cursor-not-allowed focus:outline-none shadow-md",children:"Vote Now"})]})]})]})},id:"active_votes",title:"Active Votes"},{content:function(){return(0,a.jsxs)("div",{className:"flex flex-col w-full h-full mt-5",children:[(0,a.jsxs)("div",{className:"w-full hidden lg:flex flex-row pb-4",children:[(0,a.jsx)("p",{className:"w-2/5 text-base font-medium",children:"Title"}),(0,a.jsx)("p",{className:"w-1/5 text-base font-medium",children:"Votes"}),(0,a.jsx)("p",{className:"w-1/5 text-base font-medium",children:"Results"}),(0,a.jsx)("p",{className:"w-1/5 text-base font-medium",children:"Date"})]}),(0,a.jsxs)("div",{className:"flex flex-col w-full h-full lg:overflow-y-scroll",children:[(0,a.jsxs)("div",{className:"flex flex-col lg:flex-row w-full py-7 border-b border-gray",children:[(0,a.jsxs)("p",{className:"block lg:hidden w-full text-sm py-2.5 lg:py-0",children:[(0,a.jsx)("span",{className:"font-medium pr-3",children:"Ended:"}),"6/15/2021"]}),(0,a.jsx)("p",{className:"w-full lg:w-2/5 text-sm",children:"In maximus, augue a laoreet dapibus, magna ante vehicula nibh,sit ametiaculis mi erat vitae elit."}),(0,a.jsxs)("p",{className:"flex lg:block w-full lg:w-1/5 text-sm py-2.5 lg:py-0",children:[(0,a.jsx)("span",{className:"lg:hidden font-medium pr-3",children:"Votes:"}),"199"]}),(0,a.jsxs)("p",{className:"flex lg:block w-full lg:w-1/5 text-sm py-2.5 lg:py-0",children:[(0,a.jsx)("span",{className:"lg:hidden font-medium pr-3",children:"Results:"}),"168/",(0,a.jsx)("span",{className:"text-primary",children:"31"})]}),(0,a.jsx)("p",{className:"hidden lg:block w-full lg:w-1/5 text-sm",children:"6/15/2021"}),(0,a.jsx)("button",{type:"button",className:"block lg:hidden mt-4 transition text-lg text-white w-1/2 h-11 rounded-full bg-primary hover:opacity-40 disabled:opacity-40 disabled:cursor-not-allowed focus:outline-none shadow-md",children:"View Result"})]}),(0,a.jsxs)("div",{className:"flex flex-col lg:flex-row w-full py-7 border-b border-gray",children:[(0,a.jsxs)("p",{className:"block lg:hidden w-full text-sm py-2.5 lg:py-0",children:[(0,a.jsx)("span",{className:"font-medium pr-3",children:"Ended:"}),"6/15/2021"]}),(0,a.jsx)("p",{className:"w-full lg:w-2/5 text-sm",children:"In maximus, augue a laoreet dapibus, magna ante vehicula nibh,sit ametiaculis mi erat vitae elit."}),(0,a.jsxs)("p",{className:"flex lg:block w-full lg:w-1/5 text-sm py-2.5 lg:py-0",children:[(0,a.jsx)("span",{className:"lg:hidden font-medium pr-3",children:"Votes:"}),"199"]}),(0,a.jsxs)("p",{className:"flex lg:block w-full lg:w-1/5 text-sm py-2.5 lg:py-0",children:[(0,a.jsx)("span",{className:"lg:hidden font-medium pr-3",children:"Results:"}),"168/",(0,a.jsx)("span",{className:"text-primary",children:"31"})]}),(0,a.jsx)("p",{className:"hidden lg:block w-full lg:w-1/5 text-sm",children:"6/15/2021"}),(0,a.jsx)("button",{type:"button",className:"block lg:hidden mt-4 transition text-lg text-white w-1/2 h-11 rounded-full bg-primary hover:opacity-40 disabled:opacity-40 disabled:cursor-not-allowed focus:outline-none shadow-md",children:"View Result"})]}),(0,a.jsxs)("div",{className:"flex flex-col lg:flex-row w-full py-7 border-b border-gray",children:[(0,a.jsxs)("p",{className:"block lg:hidden w-full text-sm py-2.5 lg:py-0",children:[(0,a.jsx)("span",{className:"font-medium pr-3",children:"Ended:"}),"6/15/2021"]}),(0,a.jsx)("p",{className:"w-full lg:w-2/5 text-sm",children:"In maximus, augue a laoreet dapibus, magna ante vehicula nibh,sit ametiaculis mi erat vitae elit."}),(0,a.jsxs)("p",{className:"flex lg:block w-full lg:w-1/5 text-sm py-2.5 lg:py-0",children:[(0,a.jsx)("span",{className:"lg:hidden font-medium pr-3",children:"Votes:"}),"199"]}),(0,a.jsxs)("p",{className:"flex lg:block w-full lg:w-1/5 text-sm py-2.5 lg:py-0",children:[(0,a.jsx)("span",{className:"lg:hidden font-medium pr-3",children:"Results:"}),"168/",(0,a.jsx)("span",{className:"text-primary",children:"31"})]}),(0,a.jsx)("p",{className:"hidden lg:block w-full lg:w-1/5 text-sm",children:"6/15/2021"}),(0,a.jsx)("button",{type:"button",className:"block lg:hidden mt-4 transition text-lg text-white w-1/2 h-11 rounded-full bg-primary hover:opacity-40 disabled:opacity-40 disabled:cursor-not-allowed focus:outline-none shadow-md",children:"View Result"})]}),(0,a.jsxs)("div",{className:"flex flex-col lg:flex-row w-full py-7 border-b border-gray",children:[(0,a.jsxs)("p",{className:"block lg:hidden w-full text-sm py-2.5 lg:py-0",children:[(0,a.jsx)("span",{className:"font-medium pr-3",children:"Ended:"}),"6/15/2021"]}),(0,a.jsx)("p",{className:"w-full lg:w-2/5 text-sm",children:"In maximus, augue a laoreet dapibus, magna ante vehicula nibh,sit ametiaculis mi erat vitae elit."}),(0,a.jsxs)("p",{className:"flex lg:block w-full lg:w-1/5 text-sm py-2.5 lg:py-0",children:[(0,a.jsx)("span",{className:"lg:hidden font-medium pr-3",children:"Votes:"}),"199"]}),(0,a.jsxs)("p",{className:"flex lg:block w-full lg:w-1/5 text-sm py-2.5 lg:py-0",children:[(0,a.jsx)("span",{className:"lg:hidden font-medium pr-3",children:"Results:"}),"168/",(0,a.jsx)("span",{className:"text-primary",children:"31"})]}),(0,a.jsx)("p",{className:"hidden lg:block w-full lg:w-1/5 text-sm",children:"6/15/2021"}),(0,a.jsx)("button",{type:"button",className:"block lg:hidden mt-4 transition text-lg text-white w-1/2 h-11 rounded-full bg-primary hover:opacity-40 disabled:opacity-40 disabled:cursor-not-allowed focus:outline-none shadow-md",children:"View Result"})]}),(0,a.jsxs)("div",{className:"flex flex-col lg:flex-row w-full py-7 border-b border-gray",children:[(0,a.jsxs)("p",{className:"block lg:hidden w-full text-sm py-2.5 lg:py-0",children:[(0,a.jsx)("span",{className:"font-medium pr-3",children:"Ended:"}),"6/15/2021"]}),(0,a.jsx)("p",{className:"w-full lg:w-2/5 text-sm",children:"In maximus, augue a laoreet dapibus, magna ante vehicula nibh,sit ametiaculis mi erat vitae elit."}),(0,a.jsxs)("p",{className:"flex lg:block w-full lg:w-1/5 text-sm py-2.5 lg:py-0",children:[(0,a.jsx)("span",{className:"lg:hidden font-medium pr-3",children:"Votes:"}),"199"]}),(0,a.jsxs)("p",{className:"flex lg:block w-full lg:w-1/5 text-sm py-2.5 lg:py-0",children:[(0,a.jsx)("span",{className:"lg:hidden font-medium pr-3",children:"Results:"}),"168/",(0,a.jsx)("span",{className:"text-primary",children:"31"})]}),(0,a.jsx)("p",{className:"hidden lg:block w-full lg:w-1/5 text-sm",children:"6/15/2021"}),(0,a.jsx)("button",{type:"button",className:"block lg:hidden mt-4 transition text-lg text-white w-1/2 h-11 rounded-full bg-primary hover:opacity-40 disabled:opacity-40 disabled:cursor-not-allowed focus:outline-none shadow-md",children:"View Result"})]}),(0,a.jsxs)("div",{className:"flex flex-col lg:flex-row w-full py-7",children:[(0,a.jsxs)("p",{className:"block lg:hidden w-full text-sm py-2.5 lg:py-0",children:[(0,a.jsx)("span",{className:"font-medium pr-3",children:"Ended:"}),"6/15/2021"]}),(0,a.jsx)("p",{className:"w-full lg:w-2/5 text-sm",children:"In maximus, augue a laoreet dapibus, magna ante vehicula nibh,sit ametiaculis mi erat vitae elit."}),(0,a.jsxs)("p",{className:"flex lg:block w-full lg:w-1/5 text-sm py-2.5 lg:py-0",children:[(0,a.jsx)("span",{className:"lg:hidden font-medium pr-3",children:"Votes:"}),"199"]}),(0,a.jsxs)("p",{className:"flex lg:block w-full lg:w-1/5 text-sm py-2.5 lg:py-0",children:[(0,a.jsx)("span",{className:"lg:hidden font-medium pr-3",children:"Results:"}),"168/",(0,a.jsx)("span",{className:"text-primary",children:"31"})]}),(0,a.jsx)("p",{className:"hidden lg:block w-full lg:w-1/5 text-sm",children:"6/15/2021"}),(0,a.jsx)("button",{type:"button",className:"block lg:hidden mt-4 transition text-lg text-white w-1/2 h-11 rounded-full bg-primary hover:opacity-40 disabled:opacity-40 disabled:cursor-not-allowed focus:outline-none shadow-md",children:"View Result"})]})]})]})},id:"finished",title:"Finished"}];l.default=(0,i.a)((function(){return(0,a.jsx)(t.Z,{children:(0,a.jsx)(n.Zb,{className:"h-full lg:pl-24 lg:py-20 lg:shadow-2xl",noShadow:!0,children:(0,a.jsx)("div",{className:"w-full h-full",children:(0,a.jsx)(n.OK,{className:"w-full h-full pt-12 lg:pt-0 lg:-mt-7",data:d})})})})}),"final-all")},748:function(e,l,s){(window.__NEXT_P=window.__NEXT_P||[]).push(["/dashboard/votes",function(){return s(1637)}])}},function(e){e.O(0,[774,554,282,319,993,802,271],(function(){return l=748,e(e.s=l);var l}));var l=e.O();_N_E=l}]);