(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[108],{11168:function(e,t,n){"use strict";var i,r=n(67294);function o(){return(o=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var i in n)Object.prototype.hasOwnProperty.call(n,i)&&(e[i]=n[i])}return e}).apply(this,arguments)}t.Z=function(e){return r.createElement("svg",o({xmlns:"http://www.w3.org/2000/svg",width:"1em",height:"1em",viewBox:"0 0 8.392 4.695"},e),i||(i=r.createElement("path",{"data-name":"Path 11155",d:"M.707.707l3.489 3.488L7.684.707",fill:"none",stroke:"#9a9a9a",strokeLinecap:"round",strokeLinejoin:"round"})))}},24015:function(e,t,n){"use strict";n.d(t,{a:function(){return u}});var i=n(96156),r=n(85893),o=n(67294),s=n(11163),l=n(49226);var c=n(44791);function a(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);t&&(i=i.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,i)}return n}var u=function(e,t){return function(n){var u=function(){var e=(arguments.length>0&&void 0!==arguments[0]?arguments[0]:{}).urlType,t=void 0===e?"public":e,n=(0,l.v9)((function(e){return e.authReducer.userInfo}));return(0,o.useEffect)((function(){if("public"!==t&&t&&n)if(n&&null!==n&&void 0!==n&&n.isLoggedIn)if("member"===n.role){if("auth"===t)return"verifying"===n.period&&s.default.push("/verify-email"),"onboarding"===n.period&&s.default.push("/onboard"),void("final"===n.period&&s.default.push("/dashboard"));if("verifying"===t)return"onboarding"===n.period&&s.default.push("/onboard"),void("final"===n.period&&s.default.push("/dashboard"));if("onboarding"===t)return"verifying"===n.period&&s.default.push("/verify-email"),void("final"===n.period&&s.default.push("/dashboard"));if("final-member"===t||"final-all"===t)return"verifying"===n.period&&s.default.push("/verify-email"),void("onboarding"===n.period&&s.default.push("/onboard"));"final-admin"===t&&("verifying"===n.period&&s.default.push("/verify-email"),"onboarding"===n.period&&s.default.push("/onboard"),"final"===n.period&&s.default.push("/dashboard"))}else["admin","sub-admin"].includes(n.role)&&"final-all"!==t&&"final-admin"!==t&&s.default.push("/admin/dashboard");else"auth"!==t&&s.default.push("/login")}),[n,t]),{user:n}}({urlType:t}).user;if(t&&"public"!==t){if(!u)return(0,r.jsx)(c.Z,{});if("auth"===t&&u.isLoggedIn)return(0,r.jsx)(c.Z,{});if("auth"!==t&&!u.isLoggedIn)return(0,r.jsx)(c.Z,{});if("member"===u.role){if(["final-all","final-member"].includes(t)&&"final"!==u.period)return(0,r.jsx)(c.Z,{});if(["verifying"].includes(t)&&"verifying"!==u.period)return(0,r.jsx)(c.Z,{});if(["onboarding"].includes(t)&&"onboarding"!==u.period)return(0,r.jsx)(c.Z,{})}if(["admin","sub-admin"].includes(u.role)&&["verifying","onboarding","final-member"].includes(t))return(0,r.jsx)(c.Z,{})}return(0,r.jsx)(e,function(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?a(Object(n),!0).forEach((function(t){(0,i.Z)(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):a(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}({},n))}}},44791:function(e,t,n){"use strict";var i=n(85893),r=n(733),o=n.n(r);t.Z=function(){return(0,i.jsxs)("div",{className:"fixed inset-0 flex items-center justify-center z-40",children:[(0,i.jsx)("div",{className:"fixed inset-0 bg-white opacity-40"}),(0,i.jsx)(o(),{className:"z-50",type:"spinningBubbles",color:"#FF473E",width:100,height:100})]})}},96099:function(e,t,n){"use strict";n.r(t),n.d(t,{default:function(){return S}});var i=n(85893),r=n(59936),o=n(41664),s=n(67294),l=n(24015),c=n(25955),a=n(89),u=n(96156),d=n(32465),h=n(49226),f=n(29163),p=n(87028),y=n(64605),v=n(29586);function j(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);t&&(i=i.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,i)}return n}function x(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?j(Object(n),!0).forEach((function(t){(0,u.Z)(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):j(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function b(){var e=(0,d.Z)(["\n  .notifications-table {\n    .col-1 {\n      width: 5%;\n    }\n    .col-2 {\n      width: 10%;\n    }\n    .col-3 {\n      width: 25%;\n    }\n    .col-4 {\n      width: 10%;\n    }\n    .col-5 {\n      width: 7%;\n    }\n    .col-6 {\n      width: 8%;\n    }\n    .col-7 {\n      width: 5%;\n    }\n    .col-8 {\n      width: 10%;\n    }\n    .col-9 {\n      width: 10%;\n    }\n    .col-10 {\n      width: 10%;\n    }\n  }\n"]);return b=function(){return e},e}var E=f.ZP.div(b()),m=function(e){var t=e.hideOff,n=e.onChangeValue,r=(0,h.I0)(),l=(0,y.x)(),c=l.data,u=l.setParams,d=l.params,f=l.register,j=l.resetData,b=l.hasMore,m=l.appendData,g=l.setHasMore,_=l.page,T=l.setPage,w=(0,s.useState)(null),A=w[0],I=w[1],S=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:_,t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:d;r((0,p.HC)(x({page:e},t),(function(e,t,i,r){g(t),m(e),T((function(e){return e+1})),n(i),I(r)})))};return(0,s.useEffect)((function(){S()}),[]),(0,s.useEffect)((function(){if(0===t||1===t){var e=1===t?{setting:1}:{};u(e),j(),S(1,e)}}),[t]),(0,i.jsx)(E,{className:"h-full",children:(0,i.jsxs)(a.iA,x(x({},f),{},{className:"notifications-table pt-5 h-full",onLoadMore:S,hasMore:b,dataLength:c.length,children:[(0,i.jsxs)(a.iA.Header,{children:[(0,i.jsx)(a.iA.HeaderCell,{children:(0,i.jsx)("p",{children:"Alert ID"})}),(0,i.jsx)(a.iA.HeaderCell,{children:(0,i.jsx)("p",{children:"Type"})}),(0,i.jsx)(a.iA.HeaderCell,{children:(0,i.jsx)("p",{children:"Title"})}),(0,i.jsx)(a.iA.HeaderCell,{children:(0,i.jsx)("p",{children:"Created"})}),(0,i.jsx)(a.iA.HeaderCell,{children:(0,i.jsx)("p",{children:"Status"})}),(0,i.jsx)(a.iA.HeaderCell,{children:(0,i.jsx)("p",{children:"Visibility"})}),(0,i.jsx)(a.iA.HeaderCell,{children:(0,i.jsx)("p",{children:"View %"})}),(0,i.jsx)(a.iA.HeaderCell,{children:(0,i.jsxs)("p",{children:["Auto Start ",(0,i.jsx)("br",{})," Date"]})}),(0,i.jsx)(a.iA.HeaderCell,{children:(0,i.jsxs)("p",{children:["Auto End ",(0,i.jsx)("br",{})," Date"]})}),(0,i.jsx)(a.iA.HeaderCell,{children:(0,i.jsx)("p",{children:"Admin Action"})})]}),(0,i.jsx)(a.iA.Body,{className:"lg:-mr-24 lg:pr-24",children:c.map((function(e,t){return(0,i.jsxs)(a.iA.BodyRow,{children:[(0,i.jsx)(a.iA.BodyCell,{children:(0,i.jsx)("p",{children:e.id})}),(0,i.jsx)(a.iA.BodyCell,{children:(0,i.jsx)("p",{children:e.type})}),(0,i.jsx)(a.iA.BodyCell,{children:(0,i.jsx)("p",{children:e.title})}),(0,i.jsx)(a.iA.BodyCell,{children:(0,i.jsx)("p",{children:e.created_at?(0,v.p)(e.created_at,"MM/dd/yyyy"):""})}),(0,i.jsx)(a.iA.BodyCell,{children:(0,i.jsx)(a.r2,{content:e.status})}),(0,i.jsx)(a.iA.BodyCell,{children:(0,i.jsx)("p",{className:"capitalize",children:e.visibility})}),(0,i.jsx)(a.iA.BodyCell,{children:(0,i.jsx)("p",{children:A&&null!==e&&void 0!==e&&e.total_views?Math.round((null===e||void 0===e?void 0:e.total_views)/A*100):0})}),(0,i.jsx)(a.iA.BodyCell,{children:(0,i.jsx)("p",{children:e.start_date?(0,v.p)(e.start_date,"MM/dd/yyyy"):""})}),(0,i.jsx)(a.iA.BodyCell,{children:(0,i.jsx)("p",{children:e.end_date?(0,v.p)(e.end_date,"MM/dd/yyyy"):""})}),(0,i.jsx)(a.iA.BodyCell,{children:(0,i.jsx)(o.default,{href:"notifications/detail/".concat(e.id),children:(0,i.jsx)("a",{children:(0,i.jsx)(a.zx,{className:"w-full",primary:!0,size:"small",children:"Edit"})})})})]},t)}))})]}))})},g=n(11168);function _(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);t&&(i=i.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,i)}return n}function T(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?_(Object(n),!0).forEach((function(t){(0,u.Z)(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):_(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function w(){var e=(0,d.Z)(["\n  .view-logs-table {\n    .col-1 {\n      width: 30%;\n    }\n    .col-2 {\n      width: 17.5%;\n    }\n    .col-3 {\n      width: 17.5%;\n    }\n    .col-4 {\n      width: 17.5%;\n    }\n    .col-5 {\n      width: 17.5%;\n    }\n  }\n"]);return w=function(){return e},e}var A=f.ZP.div(w()),I=function(e){var t=e.idList,n=(0,h.I0)(),r=(0,s.useState)(null),o=r[0],l=r[1],c=(0,s.useState)(null),u=c[0],d=c[1],f=(0,y.x)(),v=f.data,j=(f.setParams,f.params),x=f.register,b=f.resetData,E=f.hasMore,m=f.appendData,_=f.setHasMore,w=f.setData,I=f.page,S=f.setPage,C=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:I,t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:j;n((0,p.AL)(T({id:o,page:e},t),(function(e,t,n){_(t),m(e),S((function(e){return e+1})),d(n)})))};return(0,s.useEffect)((function(){o?(b(),C(1)):_(!1)}),[o]),(0,s.useEffect)((function(){!o||null!==t&&void 0!==t&&t.includes(+o)||(_(!1),w([]),l(""),d(null))}),[t]),(0,i.jsxs)(A,{className:"h-full",children:[(0,i.jsxs)("div",{className:"py-2 flex justify-between",style:{height:"50px"},children:[(0,i.jsxs)("div",{children:[(0,i.jsxs)("p",{children:["Notification ID: ",o]}),(0,i.jsxs)("p",{children:["Percent of active users who have viewed it:"," ",null!==u?"".concat(u," %"):""]})]}),(0,i.jsxs)("div",{className:"relative w-full lg:w-1/5 h-40px mr-10 border border-gray1 c-select flex items-center relative focus:outline-none shadow-md",children:[(0,i.jsxs)("select",{className:"px-5 w-full h-full cursor-pointer",required:!0,onChange:function(e){l(e.target.value)},children:[(0,i.jsx)("option",{selected:!o,value:"",disabled:!0,children:"Select Notification ID"}),null===t||void 0===t?void 0:t.map((function(e){return(0,i.jsx)("option",{value:e,children:e})}))]}),(0,i.jsx)(g.Z,{className:"absolute right-7"})]})]}),(0,i.jsx)("div",{style:{height:"calc(100% - 50px)"},children:(0,i.jsxs)(a.iA,T(T({},x),{},{className:"view-logs-table pt-5 h-full",onLoadMore:C,hasMore:E,dataLength:v.length,children:[(0,i.jsxs)(a.iA.Header,{children:[(0,i.jsx)(a.iA.HeaderCell,{children:(0,i.jsx)("p",{children:"User Email"})}),(0,i.jsx)(a.iA.HeaderCell,{children:(0,i.jsx)("p",{children:"First Viewed On"})}),(0,i.jsx)(a.iA.HeaderCell,{children:(0,i.jsx)("p",{children:"Dismissed"})}),(0,i.jsx)(a.iA.HeaderCell,{children:(0,i.jsx)("p",{children:"CTA Click"})}),(0,i.jsx)(a.iA.HeaderCell,{children:(0,i.jsx)("p",{children:"CTA Click Count"})})]}),(0,i.jsx)(a.iA.Body,{className:"lg:-mr-24 lg:pr-24",children:v.map((function(e,t){var n;return(0,i.jsxs)(a.iA.BodyRow,{children:[(0,i.jsx)(a.iA.BodyCell,{children:(0,i.jsx)("p",{className:"truncate",children:null===(n=e.user)||void 0===n?void 0:n.email})}),(0,i.jsx)(a.iA.BodyCell,{children:(0,i.jsx)("p",{children:e.first_view_at||""})}),(0,i.jsx)(a.iA.BodyCell,{children:(0,i.jsx)("p",{children:e.dismissed_at||""})}),(0,i.jsx)(a.iA.BodyCell,{children:(0,i.jsx)("p",{children:e.cta_click_at||""})}),(0,i.jsx)(a.iA.BodyCell,{children:(0,i.jsx)("p",{children:e.cta_click_count||0})})]},t)}))})]}))})]})},S=(0,l.a)((function(){var e=(0,s.useState)(!1),t=e[0],n=e[1],l=(0,s.useState)(),u=l[0],d=l[1],h=s.useCallback((function(e){d(e)}),[]);return(0,i.jsx)(c.Z,{children:(0,i.jsxs)(a.Zb,{className:"h-full px-24 py-2",children:[(0,i.jsxs)("div",{className:"bg-transparent h-3/5 2xl:pb-5",children:[(0,i.jsx)("div",{className:"w-full h-70px",children:(0,i.jsxs)("div",{className:"h-70px flex flex-col justify-center",children:[(0,i.jsxs)("div",{className:"flex justify-between items-end pb-3",children:[(0,i.jsxs)("div",{children:[(0,i.jsx)(a.xE,{href:"/admin/settings",text:"Back",force:!0}),(0,i.jsx)("h3",{className:"text-dark2 text-xl lg:pr-32 font-medium",children:"Notification Settings"})]}),(0,i.jsx)(o.default,{href:"/admin/settings/notifications/add",children:(0,i.jsx)("button",{type:"button",className:"transition text-lg text-white w-36 lg:w-48 h-9 rounded-full bg-primary hover:opacity-40 disabled:opacity-40 disabled:cursor-not-allowed focus:outline-none shadow-md",children:"+ New Notification"})})]}),(0,i.jsx)("div",{className:"border-primary border-b-2"})]})}),(0,i.jsxs)("div",{className:"h-30px flex justify-between items-center",children:[(0,i.jsx)("div",{className:"text-dark2 text-lg font-medium",children:"Notifications"}),(0,i.jsxs)("div",{className:"flex items-center gap-4",children:[(0,i.jsx)("span",{children:"Hide OFF"}),(0,i.jsx)(r.default,{onChange:function(e){return n(e?1:0)},checked:t,checkedIcon:null,uncheckedIcon:null,offColor:"#bbb",onColor:"#ff474e",height:18,width:40})]})]}),(0,i.jsx)("div",{className:"flex flex-col h-100%-100px",children:(0,i.jsx)(m,{hideOff:t,onChangeValue:h})})]}),(0,i.jsxs)("div",{className:"bg-transparent h-2/5 xl:pt-2 2xl:pt-5",children:[(0,i.jsxs)("div",{className:"w-full h-40px flex flex-col justify-end",children:[(0,i.jsx)("div",{className:"flex justify-between items-center pb-3",children:(0,i.jsx)("h3",{className:"text-dark2 text-xl lg:pr-32 font-medium",children:"View Activity Logs"})}),(0,i.jsx)("div",{className:"border-primary border-b-2"})]}),(0,i.jsx)("div",{className:"flex flex-col h-100%-40px",children:(0,i.jsx)(I,{idList:u})})]})]})})}),"final-admin")},29586:function(e,t,n){"use strict";n.d(t,{p:function(){return r},e:function(){return o}});var i=n(38661),r=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"dd/MM/yyyy",n=new Date(e);return"Invalid Date"===n.toString()?n.toString():(0,i.Z)(n,t)},o=function(e){return e?"".concat(e.substr(0,10),"...").concat(e.substr(-4)):"-"}},87028:function(e,t,n){"use strict";n.d(t,{lL:function(){return i},yW:function(){return r},nE:function(){return o},Eg:function(){return s},BQ:function(){return l},FH:function(){return c},C4:function(){return a},iA:function(){return u},Xp:function(){return d},ed:function(){return h},c8:function(){return f},fX:function(){return p},Od:function(){return y},fI:function(){return v},yG:function(){return j},Lx:function(){return x},TT:function(){return b},I2:function(){return E},qG:function(){return m},hy:function(){return g},MC:function(){return _},CQ:function(){return T},ie:function(){return w},kB:function(){return A},Pj:function(){return I},ZZ:function(){return S},nQ:function(){return C},yT:function(){return O},Dj:function(){return N},li:function(){return D},tA:function(){return k},Hi:function(){return M},zb:function(){return R},QT:function(){return L},cX:function(){return P},b$:function(){return B},y3:function(){return U},Nk:function(){return G},Xs:function(){return H},O2:function(){return V},J5:function(){return Z},og:function(){return W},Xj:function(){return F},lf:function(){return K},D:function(){return z},Vk:function(){return X},M6:function(){return Y},Ng:function(){return $},lN:function(){return Q},VO:function(){return q},R$:function(){return J},q6:function(){return ee},Li:function(){return te},wN:function(){return ne},t:function(){return ie},uy:function(){return re},HC:function(){return oe},AL:function(){return se},xC:function(){return le}});var i=function(e,t){return{type:"GET_LIST_MEMBER",payload:e,callback:t}},r=function(e){return{type:"GET_LIST_MEMBER_SUCCESS",payload:e}},o=function(e){return{type:"GET_USER_DETAIL",payload:e}},s=function(e,t,n){return{type:"GET_USER_METRICS",payload:e,resolve:t,reject:n}},l=function(e,t,n){return{type:"UPDATE_USER_METRICS",payload:e,resolve:t,reject:n}},c=function(e){return{type:"GET_USER_DETAIL_SUCCESS",payload:e}},a=function(e){return{type:"GET_USER_KYC_INFO",payload:e}},u=function(e){return{type:"GET_USER_KYC_INFO_SUCCESS",payload:e}},d=function(e){return{type:"APPROVE_KYC",payload:e}},h=function(e){return{type:"DENY_KYC",payload:e}},f=function(e,t){return{type:"GET_LIST_INTAKE",payload:e,successCb:t}},p=function(e,t){return{type:"GET_LIST_VERIFICATIONS",payload:e,resolve:t}},y=function(e){return{type:"GET_LIST_INTAKE_SUCCESS",payload:e}},v=function(e){return{type:"GET_LIST_INTAKE_ERROR",payload:e}},j=function(e,t){return{type:"GET_BALLOTS",payload:e,callback:t}},x=function(e,t){return{type:"GET_BALLOT_DETAIL",payload:e,callback:t}},b=function(e,t){return{type:"GET_BALLOT_VOTES",payload:e,callback:t}},E=function(e,t,n){return{type:"SUBMIT_BALLOT",payload:e,resolve:t,reject:n}},m=function(e,t,n){return{type:"SUBMIT_PERK",payload:e,resolve:t,reject:n}},g=function(e,t,n){return{type:"EDIT_PERK",payload:e,resolve:t,reject:n}},_=function(e,t,n){return{type:"CANCEL_BALLOT",payload:e,resolve:t,reject:n}},T=function(e){return{type:"CANCEL_BALLOT_SUCCESS",payload:e}},w=function(e){return{type:"CANCEL_BALLOT_ERROR",payload:e}},A=function(e,t){return{type:"GET_SUBADMINS",payload:e,callback:t}},I=function(e,t,n){return{type:"REGISTER_SUB_ADMIN",payload:e,resolve:t,reject:n}},S=function(e,t){return{type:"GET_IP_HISTORIES",payload:e,callback:t}},C=function(e,t,n){return{type:"INVITE_SUBADMIN",email:e,resolve:t,reject:n}},O=function(e,t,n){return{type:"REVOKE_SUBADMIN",id:e,resolve:t,reject:n}},N=function(e,t,n){return{type:"RESET_SUBADMIN_PASSWORD",id:e,resolve:t,reject:n}},D=function(e,t,n){return{type:"RESEND_INVITE_SUBADMIN",id:e,resolve:t,reject:n}},k=function(e,t,n){return{type:"CHANGE_SUBADMIN_PERMISSIONS",id:e,payload:t,callback:n}},M=function(e,t,n){return{type:"APPROVE_USER",payload:e,resolve:t,reject:n}},R=function(e,t,n){return{type:"RESET_USER",payload:e,resolve:t,reject:n}},L=function(e,t,n){return{type:"BAN_USER",payload:e,resolve:t,reject:n}},P=function(e,t,n){return{type:"BAN_VERIFIED_USER",payload:e,resolve:t,reject:n}},B=function(e,t,n){return{type:"APPROVED_DOCUMENTS",payload:e,resolve:t,reject:n}},U=function(e,t,n){return{type:"GET_LIST_VERIFICATION_DETAIL",payload:e,resolve:t,reject:n}},G=function(e,t,n){return{type:"APPROVE_USER_AML",payload:e,resolve:t,reject:n}},H=function(e,t,n){return{type:"RESET_USER_AML",payload:e,resolve:t,reject:n}},V=function(e,t,n){return{type:"APPROVE_USER_KYC",payload:e,resolve:t,reject:n}},Z=function(e,t,n){return{type:"RESET_USER_KYC",payload:e,resolve:t,reject:n}},W=function(e,t){return{type:"GET_EMAILER_DATA",resolve:e,reject:t}},F=function(e,t,n){return{type:"ADD_EMAILER_ADMIN",payload:e,resolve:t,reject:n}},K=function(e,t,n){return{type:"DELETE_EMAILER_ADMIN",payload:e,resolve:t,reject:n}},z=function(e,t,n){return{type:"UPDATE_EMAILER_TRIGGER_USER",payload:e,resolve:t,reject:n}},X=function(e,t,n){return{type:"UPDATE_EMAILER_TRIGGER_ADMIN",payload:e,resolve:t,reject:n}},Y=function(e,t,n){return{type:"GET_LIST_PERKS",payload:e,resolve:t,reject:n}},$=function(e,t,n){return{type:"GET_ACTIVE_PERKS",payload:e,resolve:t,reject:n}},Q=function(e,t,n){return{type:"GET_LIST_PERK_ENGAGEMENT",payload:e,resolve:t,reject:n}},q=function(e,t,n){return{type:"GET_PERK_DETAIL",payload:e,resolve:t,reject:n}},J=function(e,t){return{type:"GET_WARNING_METRICS",resolve:e,reject:t}},ee=function(e,t,n){return{type:"GET_ACTIVE_PERK_DETAIL",payload:e,resolve:t,reject:n}},te=function(e,t,n){return{type:"UPDATE_WARNING_METRICS",payload:e,resolve:t,reject:n}},ne=function(e,t,n){return{type:"ADD_NOTIFICATION",payload:e,resolve:t,reject:n}},ie=function(e,t,n){return{type:"EDIT_NOTIFICATION",payload:e,resolve:t,reject:n}},re=function(e,t,n){return{type:"GET_NOTIFICATION_DETAIL",payload:e,resolve:t,reject:n}},oe=function(e,t,n){return{type:"GET_LIST_NOTIFICATIONS",payload:e,resolve:t,reject:n}},se=function(e,t){return{type:"GET_NOTIFICATION_VIEW_LOGS",payload:e,resolve:t}},le=function(e,t){return{type:"GET_HIGH_PRIORITY_NOTIFICATION",resolve:e,reject:t}}},41152:function(e,t,n){(window.__NEXT_P=window.__NEXT_P||[]).push(["/admin/settings/notifications",function(){return n(96099)}])},83231:function(e,t,n){var i=n(67294);function r(){return(r=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var i in n)Object.prototype.hasOwnProperty.call(n,i)&&(e[i]=n[i])}return e}).apply(this,arguments)}var o=i.createElement("svg",{viewBox:"-2 -5 14 20",height:"100%",width:"100%",style:{position:"absolute",top:0}},i.createElement("path",{d:"M9.9 2.12L7.78 0 4.95 2.828 2.12 0 0 2.12l2.83 2.83L0 7.776 2.123 9.9 4.95 7.07 7.78 9.9 9.9 7.776 7.072 4.95 9.9 2.12",fill:"#fff",fillRule:"evenodd"})),s=i.createElement("svg",{height:"100%",width:"100%",viewBox:"-2 -5 17 21",style:{position:"absolute",top:0}},i.createElement("path",{d:"M11.264 0L5.26 6.004 2.103 2.847 0 4.95l5.26 5.26 8.108-8.107L11.264 0",fill:"#fff",fillRule:"evenodd"}));function l(e){if(7===e.length)return e;for(var t="#",n=1;n<4;n+=1)t+=e[n]+e[n];return t}function c(e,t,n,i,r){return function(e,t,n,i,r){var o=(e-n)/(t-n);if(0===o)return i;if(1===o)return r;for(var s="#",l=1;l<6;l+=2){var c=parseInt(i.substr(l,2),16),a=parseInt(r.substr(l,2),16),u=Math.round((1-o)*c+o*a).toString(16);1===u.length&&(u="0"+u),s+=u}return s}(e,t,n,l(i),l(r))}var a=function(e){function t(t){e.call(this,t);var n=t.height,i=t.width,r=t.checked;this.t=t.handleDiameter||n-2,this.i=Math.max(i-n,i-(n+this.t)/2),this.o=Math.max(0,(n-this.t)/2),this.state={h:r?this.i:this.o},this.l=0,this.u=0,this.p=this.p.bind(this),this.v=this.v.bind(this),this.g=this.g.bind(this),this.k=this.k.bind(this),this.M=this.M.bind(this),this.m=this.m.bind(this),this.T=this.T.bind(this),this.$=this.$.bind(this),this.C=this.C.bind(this),this.D=this.D.bind(this),this.O=this.O.bind(this),this.S=this.S.bind(this)}return e&&(t.__proto__=e),(t.prototype=Object.create(e&&e.prototype)).constructor=t,t.prototype.componentDidMount=function(){this.W=!0},t.prototype.componentDidUpdate=function(e){e.checked!==this.props.checked&&this.setState({h:this.props.checked?this.i:this.o})},t.prototype.componentWillUnmount=function(){this.W=!1},t.prototype.I=function(e){this.H.focus(),this.setState({R:e,j:!0,B:Date.now()})},t.prototype.L=function(e){var t=this.state,n=t.R,i=t.h,r=(this.props.checked?this.i:this.o)+e-n;t.N||e===n||this.setState({N:!0});var o=Math.min(this.i,Math.max(this.o,r));o!==i&&this.setState({h:o})},t.prototype.U=function(e){var t=this.state,n=t.h,i=t.N,r=t.B,o=this.props.checked,s=(this.i+this.o)/2;this.setState({h:this.props.checked?this.i:this.o});var l=Date.now()-r;(!i||l<250||o&&n<=s||!o&&n>=s)&&this.A(e),this.W&&this.setState({N:!1,j:!1}),this.l=Date.now()},t.prototype.p=function(e){e.preventDefault(),"number"==typeof e.button&&0!==e.button||(this.I(e.clientX),window.addEventListener("mousemove",this.v),window.addEventListener("mouseup",this.g))},t.prototype.v=function(e){e.preventDefault(),this.L(e.clientX)},t.prototype.g=function(e){this.U(e),window.removeEventListener("mousemove",this.v),window.removeEventListener("mouseup",this.g)},t.prototype.k=function(e){this.X=null,this.I(e.touches[0].clientX)},t.prototype.M=function(e){this.L(e.touches[0].clientX)},t.prototype.m=function(e){e.preventDefault(),this.U(e)},t.prototype.$=function(e){Date.now()-this.l>50&&(this.A(e),Date.now()-this.u>50&&this.W&&this.setState({j:!1}))},t.prototype.C=function(){this.u=Date.now()},t.prototype.D=function(){this.setState({j:!0})},t.prototype.O=function(){this.setState({j:!1})},t.prototype.S=function(e){this.H=e},t.prototype.T=function(e){e.preventDefault(),this.H.focus(),this.A(e),this.W&&this.setState({j:!1})},t.prototype.A=function(e){var t=this.props;(0,t.onChange)(!t.checked,e,t.id)},t.prototype.render=function(){var e=this.props,t=e.checked,n=e.disabled,o=e.className,s=e.offColor,l=e.onColor,a=e.offHandleColor,u=e.onHandleColor,d=e.checkedIcon,h=e.uncheckedIcon,f=e.checkedHandleIcon,p=e.uncheckedHandleIcon,y=e.boxShadow,v=e.activeBoxShadow,j=e.height,x=e.width,b=e.borderRadius,E=function(e,t){var n={};for(var i in e)Object.prototype.hasOwnProperty.call(e,i)&&-1===t.indexOf(i)&&(n[i]=e[i]);return n}(e,["checked","disabled","className","offColor","onColor","offHandleColor","onHandleColor","checkedIcon","uncheckedIcon","checkedHandleIcon","uncheckedHandleIcon","boxShadow","activeBoxShadow","height","width","borderRadius","handleDiameter"]),m=this.state,g=m.h,_=m.N,T=m.j,w={position:"relative",display:"inline-block",textAlign:"left",opacity:n?.5:1,direction:"ltr",borderRadius:j/2,WebkitTransition:"opacity 0.25s",MozTransition:"opacity 0.25s",transition:"opacity 0.25s",touchAction:"none",WebkitTapHighlightColor:"rgba(0, 0, 0, 0)",WebkitUserSelect:"none",MozUserSelect:"none",msUserSelect:"none",userSelect:"none"},A={height:j,width:x,margin:Math.max(0,(this.t-j)/2),position:"relative",background:c(g,this.i,this.o,s,l),borderRadius:"number"==typeof b?b:j/2,cursor:n?"default":"pointer",WebkitTransition:_?null:"background 0.25s",MozTransition:_?null:"background 0.25s",transition:_?null:"background 0.25s"},I={height:j,width:Math.min(1.5*j,x-(this.t+j)/2+1),position:"relative",opacity:(g-this.o)/(this.i-this.o),pointerEvents:"none",WebkitTransition:_?null:"opacity 0.25s",MozTransition:_?null:"opacity 0.25s",transition:_?null:"opacity 0.25s"},S={height:j,width:Math.min(1.5*j,x-(this.t+j)/2+1),position:"absolute",opacity:1-(g-this.o)/(this.i-this.o),right:0,top:0,pointerEvents:"none",WebkitTransition:_?null:"opacity 0.25s",MozTransition:_?null:"opacity 0.25s",transition:_?null:"opacity 0.25s"},C={height:this.t,width:this.t,background:c(g,this.i,this.o,a,u),display:"inline-block",cursor:n?"default":"pointer",borderRadius:"number"==typeof b?b-1:"50%",position:"absolute",transform:"translateX("+g+"px)",top:Math.max(0,(j-this.t)/2),outline:0,boxShadow:T?v:y,border:0,WebkitTransition:_?null:"background-color 0.25s, transform 0.25s, box-shadow 0.15s",MozTransition:_?null:"background-color 0.25s, transform 0.25s, box-shadow 0.15s",transition:_?null:"background-color 0.25s, transform 0.25s, box-shadow 0.15s"},O={height:this.t,width:this.t,opacity:Math.max(2*(1-(g-this.o)/(this.i-this.o)-.5),0),position:"absolute",left:0,top:0,pointerEvents:"none",WebkitTransition:_?null:"opacity 0.25s",MozTransition:_?null:"opacity 0.25s",transition:_?null:"opacity 0.25s"},N={height:this.t,width:this.t,opacity:Math.max(2*((g-this.o)/(this.i-this.o)-.5),0),position:"absolute",left:0,top:0,pointerEvents:"none",WebkitTransition:_?null:"opacity 0.25s",MozTransition:_?null:"opacity 0.25s",transition:_?null:"opacity 0.25s"};return i.createElement("div",{className:o,style:w},i.createElement("div",{className:"react-switch-bg",style:A,onClick:n?null:this.T,onMouseDown:function(e){return e.preventDefault()}},d&&i.createElement("div",{style:I},d),h&&i.createElement("div",{style:S},h)),i.createElement("div",{className:"react-switch-handle",style:C,onClick:function(e){return e.preventDefault()},onMouseDown:n?null:this.p,onTouchStart:n?null:this.k,onTouchMove:n?null:this.M,onTouchEnd:n?null:this.m,onTouchCancel:n?null:this.O},p&&i.createElement("div",{style:O},p),f&&i.createElement("div",{style:N},f)),i.createElement("input",r({},{type:"checkbox",role:"switch","aria-checked":t,checked:t,disabled:n,style:{border:0,clip:"rect(0 0 0 0)",height:1,margin:-1,overflow:"hidden",padding:0,position:"absolute",width:1}},E,{ref:this.S,onFocus:this.D,onBlur:this.O,onKeyUp:this.C,onChange:this.$})))},t}(i.Component);a.defaultProps={disabled:!1,offColor:"#888",onColor:"#080",offHandleColor:"#fff",onHandleColor:"#fff",uncheckedIcon:o,checkedIcon:s,boxShadow:null,activeBoxShadow:"0 0 2px 3px #3bf",height:28,width:56},t.default=a},59936:function(e,t,n){e.exports=n(83231)}},function(e){e.O(0,[9774,2554,4597,9650,6993,6095,8661,7010,5955],(function(){return t=41152,e(e.s=t);var t}));var t=e.O();_N_E=t}]);