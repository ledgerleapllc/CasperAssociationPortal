(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[5090],{24015:function(e,n,l){"use strict";l.d(n,{a:function(){return c}});var i=l(96156),t=l(85893),r=l(67294),d=l(11163),a=l(49226);var s=l(44791);function o(e,n){var l=Object.keys(e);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);n&&(i=i.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),l.push.apply(l,i)}return l}var c=function(e,n){return function(l){var c=function(){var e=(arguments.length>0&&void 0!==arguments[0]?arguments[0]:{}).urlType,n=void 0===e?"public":e,l=(0,a.v9)((function(e){return e.authReducer.userInfo}));return(0,r.useEffect)((function(){if("public"!==n&&n&&l)if(l&&null!==l&&void 0!==l&&l.isLoggedIn)if("member"===l.role){if("auth"===n)return"verifying"===l.period&&d.default.push("/verify-email"),"onboarding"===l.period&&d.default.push("/onboard"),void("final"===l.period&&d.default.push("/dashboard"));if("verifying"===n)return"onboarding"===l.period&&d.default.push("/onboard"),void("final"===l.period&&d.default.push("/dashboard"));if("onboarding"===n)return"verifying"===l.period&&d.default.push("/verify-email"),void("final"===l.period&&d.default.push("/dashboard"));if("final-member"===n||"final-all"===n)return"verifying"===l.period&&d.default.push("/verify-email"),void("onboarding"===l.period&&d.default.push("/onboard"));"final-admin"===n&&("verifying"===l.period&&d.default.push("/verify-email"),"onboarding"===l.period&&d.default.push("/onboard"),"final"===l.period&&d.default.push("/dashboard"))}else"admin"===l.role&&"final-all"!==n&&"final-admin"!==n&&d.default.push("/admin/dashboard");else"auth"!==n&&d.default.push("/login")}),[l,n]),{user:l}}({urlType:n}).user;if(n&&"public"!==n){if(!c)return(0,t.jsx)(s.Z,{});if("auth"===n&&c.isLoggedIn)return(0,t.jsx)(s.Z,{});if("auth"!==n&&!c.isLoggedIn)return(0,t.jsx)(s.Z,{});if("member"===c.role){if(["final-all","final-member"].includes(n)&&"final"!==c.period)return(0,t.jsx)(s.Z,{});if(["verifying"].includes(n)&&"verifying"!==c.period)return(0,t.jsx)(s.Z,{});if(["onboarding"].includes(n)&&"onboarding"!==c.period)return(0,t.jsx)(s.Z,{})}if("admin"===c.role&&["verifying","onboarding","final-member"].includes(n))return(0,t.jsx)(s.Z,{})}return(0,t.jsx)(e,function(e){for(var n=1;n<arguments.length;n++){var l=null!=arguments[n]?arguments[n]:{};n%2?o(Object(l),!0).forEach((function(n){(0,i.Z)(e,n,l[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(l)):o(Object(l)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(l,n))}))}return e}({},l))}}},68046:function(e,n,l){"use strict";l.r(n),l.d(n,{default:function(){return N}});var i=l(85893),t=l(11163),r=l(67294),d=l(49226),a=l(24015),s=l(25955),o=l(89),c=l(87028),u=l(32465),h=l(29163),f=l(41664),x=l(4478),p=l(56073);function j(){var e=(0,u.Z)(["\n  .active-ballot-table {\n    width: 100%;\n    & > tr {\n      td {\n        vertical-align: top;\n        padding-bottom: 30px;\n      }\n      td:nth-child(1) {\n        width: 25%;\n      }\n      td:nth-child(2) {\n        width: 75%;\n      }\n    }\n  }\n"]);return j=function(){return e},e}var v=h.ZP.div(j()),m=function(e){var n,l=e.ballot,a=(0,d.I0)(),s=(0,x.R)().setDialog,u=(0,r.useContext)(p.AppContext).setLoading;return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsxs)("div",{className:"card-header lg:mr-24 lg:h-70px",children:[(0,i.jsx)(o.xE,{href:"/admin/ballots",text:"Back",force:!0}),(0,i.jsxs)("div",{className:"flex justify-between items-center mb-3.5",children:[(0,i.jsx)("h3",{className:"text-dark2 text-xl lg:pr-32 font-medium",children:"Manage Active Ballot"}),(0,i.jsxs)("div",{className:"flex flex-col-reverse lg:flex-wrap lg:flex-row justify-end",children:[(0,i.jsx)(f.default,{href:"/admin/ballots/detail/".concat(null===l||void 0===l?void 0:l.id,"/current-votes"),children:(0,i.jsx)("button",{type:"button",className:"lg:mr-5 h-16 lg:h-11 text-lg w-full text-white lg:w-48 rounded-full bg-primary hover:opacity-40 disabled:opacity-40 disabled:cursor-not-allowed focus:outline-none shadow-md",children:"View Current Votes"})}),(0,i.jsx)("button",{type:"button",className:"h-16 lg:h-11 w-full text-lg text-primary lg:w-48 rounded-full bg-none border-2 border-primary hover:opacity-40 disabled:opacity-40 disabled:cursor-not-allowed focus:outline-none shadow-md",onClick:function(){s({type:"DialogConfirm",data:{title:"Are you sure?",content:"Canceling this will close the vote and record this as a \u201ccanceled\u201d ballot",ok:"Yes, cancel this ballot",cancel:"No, leave the vote open"},afterClosed:function(e){e&&(u(!0),a((0,c.MC)(null===l||void 0===l?void 0:l.id,(function(){t.default.push("/admin/ballots"),u(!1)}),(function(){u(!1)}))))}})},children:"Cancel Ballot"})]})]}),(0,i.jsx)("div",{className:"border-primary border-b-2"})]}),(0,i.jsx)("div",{className:"card-body pt-8 pb-28 overflow-y-auto lg:h-100%-70px",children:(0,i.jsx)(v,{className:"lg:pr-24",children:(0,i.jsxs)("table",{className:"active-ballot-table border-0",children:[(0,i.jsxs)("tr",{children:[(0,i.jsx)("td",{children:(0,i.jsx)("span",{children:"Ballot Title:"})}),(0,i.jsx)("td",{children:(0,i.jsx)("span",{children:null===l||void 0===l?void 0:l.title})})]}),(0,i.jsxs)("tr",{children:[(0,i.jsx)("td",{children:(0,i.jsx)("span",{children:"Time Remaining:"})}),(0,i.jsx)("td",{children:l&&(0,i.jsx)(o.ZF,{className:"w-40",endTime:new Date(l.time_end),startTime:new Date(l.created_at)})})]}),(0,i.jsxs)("tr",{children:[(0,i.jsx)("td",{children:(0,i.jsx)("span",{children:"Ballot Text:"})}),(0,i.jsx)("td",{children:(0,i.jsx)("span",{dangerouslySetInnerHTML:{__html:null===l||void 0===l?void 0:l.description}})})]}),(0,i.jsxs)("tr",{children:[(0,i.jsx)("td",{children:(0,i.jsx)("span",{children:"Files Attached:"})}),(0,i.jsx)("td",{children:(0,i.jsx)("ul",{children:null===l||void 0===l||null===(n=l.files)||void 0===n?void 0:n.map((function(e,n){return(0,i.jsxs)("li",{className:"flex pb-2",children:[(0,i.jsx)("p",{className:"w-52",children:e.name}),(0,i.jsx)(f.default,{href:"".concat(e.file_url),children:(0,i.jsx)("a",{target:"_blank",className:"text-primary",children:"View"})})]},"file-".concat(n))}))})})]})]})})})]})},b=l(29586);function g(){var e=(0,u.Z)(["\n  .complete-ballot-table {\n    width: 100%;\n    & > tr {\n      td {\n        vertical-align: top;\n        padding-bottom: 30px;\n      }\n      td:nth-child(1) {\n        width: 25%;\n      }\n      td:nth-child(2) {\n        width: 75%;\n      }\n    }\n  }\n"]);return g=function(){return e},e}var y=h.ZP.div(g()),w=function(e){var n,l,t,r,d=e.ballot;return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsxs)("div",{className:"card-header lg:mr-24 lg:h-70px",children:[(0,i.jsx)(o.xE,{href:"/admin/ballots",text:"Back",force:!0}),(0,i.jsxs)("div",{className:"flex justify-between items-center mb-3.5",children:[(0,i.jsx)("h3",{className:"text-dark2 text-xl lg:pr-32 font-medium",children:"Completed Ballot"}),(0,i.jsx)("div",{className:"flex flex-col-reverse lg:flex-wrap lg:flex-row justify-end",children:(0,i.jsx)(f.default,{href:"/admin/ballots/detail/".concat(null===d||void 0===d?void 0:d.id,"/current-votes"),children:(0,i.jsx)("button",{type:"button",className:"lg:mr-5 h-16 lg:h-11 text-lg w-full text-white lg:w-48 rounded-full bg-primary hover:opacity-40 disabled:opacity-40 disabled:cursor-not-allowed focus:outline-none shadow-md",children:"View Voting Records"})})})]}),(0,i.jsx)("div",{className:"border-primary border-b-2"})]}),(0,i.jsx)("div",{className:"card-body pt-8 pb-28 overflow-y-auto lg:h-100%-70px",children:(0,i.jsx)("div",{className:"lg:pr-24",children:(0,i.jsx)(y,{children:(0,i.jsxs)("table",{className:"complete-ballot-table border-0",children:[(0,i.jsxs)("tr",{children:[(0,i.jsx)("td",{children:(0,i.jsx)("span",{children:"Ballot Title:"})}),(0,i.jsx)("td",{children:(0,i.jsx)("span",{children:null===d||void 0===d?void 0:d.title})})]}),(0,i.jsxs)("tr",{children:[(0,i.jsx)("td",{children:(0,i.jsx)("span",{children:"Final Result:"})}),(0,i.jsx)("td",{children:(0,i.jsx)(o.r2,{content:null===d||void 0===d?void 0:d.status,className:"uppercase"})})]}),(0,i.jsxs)("tr",{children:[(0,i.jsx)("td",{children:(0,i.jsx)("span",{children:"Total Votes:"})}),(0,i.jsx)("td",{children:(0,i.jsx)("span",{children:null===d||void 0===d||null===(n=d.vote)||void 0===n?void 0:n.result_count})})]}),(0,i.jsxs)("tr",{children:[(0,i.jsx)("td",{children:(0,i.jsx)("span",{children:"Split (For/Against):"})}),(0,i.jsx)("td",{children:(0,i.jsx)("p",{children:(0,i.jsx)(o.L3,{splitFor:null===d||void 0===d||null===(l=d.vote)||void 0===l?void 0:l.for_value,splitAgainst:null===d||void 0===d||null===(t=d.vote)||void 0===t?void 0:t.against_value})})})]}),(0,i.jsxs)("tr",{children:[(0,i.jsx)("td",{children:(0,i.jsx)("span",{children:"Start Time:"})}),(0,i.jsx)("td",{children:(0,i.jsx)("span",{children:(0,b.p)(null===d||void 0===d?void 0:d.created_at,"dd/MM/yyyy - hh:mm aaa")})})]}),(0,i.jsxs)("tr",{children:[(0,i.jsx)("td",{children:(0,i.jsx)("span",{children:"End Time:"})}),(0,i.jsx)("td",{children:(0,i.jsx)("span",{children:(0,b.p)(null===d||void 0===d?void 0:d.time_end,"dd/MM/yyyy - hh:mm aaa")})})]}),(0,i.jsxs)("tr",{children:[(0,i.jsx)("td",{children:(0,i.jsx)("span",{children:"Ballot Text:"})}),(0,i.jsx)("td",{children:(0,i.jsx)("span",{dangerouslySetInnerHTML:{__html:null===d||void 0===d?void 0:d.description}})})]}),(0,i.jsxs)("tr",{children:[(0,i.jsx)("td",{children:(0,i.jsx)("span",{children:"Files Attached:"})}),(0,i.jsx)("td",{children:(0,i.jsx)("ul",{children:null===d||void 0===d||null===(r=d.files)||void 0===r?void 0:r.map((function(e){return(0,i.jsxs)("li",{className:"flex pb-2",children:[(0,i.jsx)("p",{className:"w-52",children:e.name}),(0,i.jsx)(f.default,{href:"".concat(e.file_url),children:(0,i.jsx)("a",{target:"_blank",className:"text-primary",children:"View"})})]})}))})})]})]})})})})]})},N=(0,a.a)((function(){var e=(0,r.useState)(),n=e[0],l=e[1],a=t.default.query.id,u=(0,d.I0)();return(0,r.useEffect)((function(){u((0,c.Lx)(a,(function(e){l(e)})))}),[a]),(0,i.jsx)(s.Z,{children:(0,i.jsx)(o.Zb,{className:"h-full lg:pl-24 lg:py-11 lg:shadow-2xl",noShadow:!0,children:(0,i.jsxs)("div",{className:"w-full h-full",children:[n&&"active"===n.status&&(0,i.jsx)(m,{ballot:n}),n&&"active"!==n.status&&(0,i.jsx)(w,{ballot:n})]})})})}),"final-all")},5055:function(e,n,l){(window.__NEXT_P=window.__NEXT_P||[]).push(["/admin/ballots/detail/[id]",function(){return l(68046)}])}},function(e){e.O(0,[9774,2554,4597,9650,6993,6095,8661,9669,3913,7010,5955,5774],(function(){return n=5055,e(e.s=n);var n}));var n=e.O();_N_E=n}]);