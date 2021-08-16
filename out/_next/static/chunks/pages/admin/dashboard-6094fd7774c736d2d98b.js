(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[9189],{78098:function(e,t,n){"use strict";n.r(t),n.d(t,{default:function(){return j}});var l=n(85893),r=n(67294),s=n(49226),a=n(37124),c=n(12245),i=(n(22897),n(96375)),o=function(e){var t,n,r=e.stats,s=(0,i.Z)().metricConfig;return(0,l.jsx)("div",{className:"flex flex-col mx-9 my-3 bg-white",children:(0,l.jsxs)("div",{className:" flex flex-col  pt-3 lg:pb-3 2xl:pt-5 ",children:[(0,l.jsx)("span",{className:"text-lg font-medium pb-5",children:"Metrics"}),(0,l.jsxs)("div",{className:"flex flex-col py-3 xl:py-1 2xl:py-3",children:[(0,l.jsxs)("div",{className:"flex flex-row",children:[(0,l.jsx)("span",{className:"text-lg",children:"Total Users"}),(0,l.jsx)("img",{className:"pl-3",src:"/images/ic_feather_info.svg",alt:"Info"})]}),(0,l.jsx)("span",{className:"text-base text-black1 font-thin",children:null===r||void 0===r?void 0:r.totalUser})]}),(0,l.jsxs)("div",{className:"flex flex-col py-2 2xl:py-3",children:[(0,l.jsxs)("div",{className:"flex flex-row",children:[(0,l.jsx)("span",{className:"text-lg",children:"Member\u2019s Stake"}),(0,l.jsx)("img",{className:"pl-3",src:"/images/ic_feather_info.svg",alt:"Info"})]}),(0,l.jsx)("span",{className:"text-base text-black1 font-thin",children:null===r||void 0===r?void 0:r.totalStake})]}),(0,l.jsxs)("div",{className:"flex flex-col py-2 2xl:py-3",children:[(0,l.jsxs)("div",{className:"flex flex-row",children:[(0,l.jsx)("span",{className:"text-lg",children:"Total Delegators"}),(0,l.jsx)("img",{className:"pl-3",src:"/images/ic_feather_info.svg",alt:"Info"})]}),(0,l.jsx)("span",{className:"text-base text-black1 font-thin",children:null===r||void 0===r?void 0:r.totalDelegators})]}),(0,l.jsxs)("div",{className:"flex flex-col py-2 2xl:py-3",children:[(0,l.jsxs)("div",{className:"flex flex-row",children:[(0,l.jsx)("span",{className:"text-lg",children:"Average Uptime"}),(0,l.jsx)("img",{className:"pl-3",src:"/images/ic_feather_info.svg",alt:"Info"})]}),(0,l.jsx)(c.ko,{value:(+(null===r||void 0===r?void 0:r.avgUptime)).toFixed(2),mask:"x%"})]}),(0,l.jsxs)("div",{className:"flex flex-col pt-2 pb-9 xl:pb-6 2xl:pb-9",children:[(0,l.jsxs)("div",{className:"flex flex-row",children:[(0,l.jsx)("span",{className:"text-lg",children:"Average Block Height"}),(0,l.jsx)("img",{className:"pl-3",src:"/images/ic_feather_info.svg",alt:"Info"})]}),(0,l.jsx)(c.ko,{value:(+(null===r||void 0===r?void 0:r.avgBlockHeightAverage)).toFixed(2),total:null===s||void 0===s||null===(t=s.max)||void 0===t?void 0:t.block_height_average,mask:"x/y"})]}),(0,l.jsxs)("div",{className:"flex flex-col pt-2 pb-9 xl:pb-6 2xl:pb-9",children:[(0,l.jsxs)("div",{className:"flex flex-row",children:[(0,l.jsx)("span",{className:"text-lg",children:"Average Responsiveness"}),(0,l.jsx)("img",{className:"pl-3",src:"/images/ic_feather_info.svg",alt:"Info"})]}),(0,l.jsx)(c.ko,{value:(+(null===r||void 0===r?void 0:r.avgUpdateResponsiveness)).toFixed(2),total:null===s||void 0===s||null===(n=s.max)||void 0===n?void 0:n.update_responsiveness,mask:"x/y"})]})]})})},u=n(96156),f=n(41664),d=n(6632),p=n(44536);function x(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(e);t&&(l=l.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,l)}return n}function y(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?x(Object(n),!0).forEach((function(t){(0,u.Z)(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):x(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}var m=[{label:"Last 24 hours",key:"last_24hs"},{label:"Last 7 days",key:"last_7days"},{label:"Last 30 days",key:"last_30days"},{label:"Last year",key:"last_year"}],v=function(e){var t=e.stats,n=e.changeFrame,s=(0,r.useState)(!1),a=s[0],i=s[1],o=(0,r.useState)({timeframe_perk:"last_24hs",timeframe_comments:"last_24hs",timeframe_discussions:"last_24hs"}),x=o[0],v=o[1],_=function(e,t){var l=y(y({},x),{},(0,u.Z)({},e,t));v(l),n(l)};(0,r.useEffect)((function(){n(x)}),[]);var h=function(e){var t;return null===(t=m.find((function(t){return t.key===x[e]})))||void 0===t?void 0:t.label};return(0,l.jsx)("div",{className:"flex gap-5 flex-col lg:justify-between w-full h-full",children:(0,l.jsxs)("div",{className:"flex flex-1 gap-5 flex-col-reverse lg:flex-col lg:justify-between min-h-0",children:[(0,l.jsxs)("div",{className:"flex gap-5 flex-col lg:flex-row h-auto lg:h-1/3",children:[(0,l.jsx)("div",{className:"gap-5 flex-grow w-full mt-0 lg:w-2/3 h-full",children:(0,l.jsxs)("div",{className:"gap-5 flex lg:flex-row flex-col justify-between h-full",children:[(0,l.jsx)(c.Zb,{className:"h-full lg:w-full",children:(0,l.jsxs)("div",{className:"flex flex-col justify-between p-6 h-full text-center",children:[(0,l.jsx)("p",{className:"text-lg font-medium",children:"KYC for Review"}),(0,l.jsx)("p",{className:"text-3xl font-thin",children:null===t||void 0===t?void 0:t.totalNewUserReady}),(0,l.jsx)("p",{className:"text-base font-thin",children:"new user ready"}),(0,l.jsx)("p",{className:"text-3xl font-thin",children:null===t||void 0===t?void 0:t.totalUserVerification}),(0,l.jsx)("p",{className:"text-base font-thin",children:"IDverification to Review"}),(0,l.jsx)(f.default,{href:"/admin/intake",children:(0,l.jsx)("a",{className:"text-lg text-white w-full h-12 flex items-center justify-center rounded-full bg-primary shadow-md focus:outline-none hover:opacity-40",children:"Review"})})]})}),(0,l.jsx)(c.Zb,{className:"h-full lg:w-full",children:(0,l.jsxs)("div",{className:"flex flex-col justify-between p-6 h-full text-center",children:[(0,l.jsx)("p",{className:"text-lg font-medium",children:"Failing Nodes"}),(0,l.jsx)("p",{className:"text-5xl py-4 font-thin",children:null===t||void 0===t?void 0:t.totalFailNode}),0!==+(null===t||void 0===t?void 0:t.totalFailNode)&&(0,l.jsx)(f.default,{href:"/dashboard/nodes?node_failing=1",children:(0,l.jsx)("a",{className:"text-lg text-white w-full h-12 flex items-center justify-center rounded-full bg-primary shadow-md focus:outline-none hover:opacity-40",children:"Review"})}),0===+(null===t||void 0===t?void 0:t.totalFailNode)&&(0,l.jsx)("span",{})]})}),(0,l.jsx)(c.Zb,{className:"h-full lg:w-full",children:(0,l.jsxs)("div",{className:"flex flex-col justify-between p-6 h-full text-center",children:[(0,l.jsx)("p",{className:"text-lg font-medium",children:"Perks Activated"}),(0,l.jsx)("p",{className:"text-5xl py-4 font-thin",children:null===t||void 0===t?void 0:t.totalPerksActive}),(0,l.jsx)(c.Lt,{className:"mt-2 w-full",trigger:(0,l.jsx)("div",{className:"flex items-center gap-2",children:(0,l.jsx)("p",{className:"w-full relative h-6",children:(0,l.jsxs)("span",{className:"text-base truncate absolute inset-0",children:["( ",h("timeframe_perk")," )"]})})}),children:(0,l.jsx)("ul",{children:m.map((function(e){return(0,l.jsx)("li",{className:"p-2 hover:text-primary cursor-pointer",onClick:function(){return _("timeframe_perk",e.key)},children:(0,l.jsx)("p",{className:"w-full relative h-6",children:e.label})})}))})})]})})]})}),(0,l.jsxs)(c.Zb,{className:"flex-grow p-6 gap-5 flex flex-row w-full lg:w-1/3 h-full",children:[(0,l.jsx)("div",{className:"flex w-1/2 flex-col",children:(0,l.jsxs)("div",{className:"flex flex-col justify-between h-full text-center",children:[(0,l.jsx)("p",{className:"text-lg font-medium",children:"Forum Activity"}),(0,l.jsx)("p",{className:"text-5xl py-4 font-thin",children:null===t||void 0===t?void 0:t.totalNewComments}),(0,l.jsx)(c.Lt,{className:"mt-2 w-full",trigger:(0,l.jsxs)("div",{children:[(0,l.jsx)("p",{className:"w-full",children:"New Comments"}),(0,l.jsxs)("p",{className:"w-full",children:["( ",h("timeframe_comments")," )"]})]}),children:(0,l.jsx)("ul",{children:m.map((function(e){return(0,l.jsx)("li",{className:"p-2 hover:text-primary cursor-pointer",onClick:function(){return _("timeframe_comments",e.key)},children:(0,l.jsx)("p",{className:"w-full relative h-6",children:e.label})})}))})})]})}),(0,l.jsx)("div",{className:"flex w-1/2 flex-col",children:(0,l.jsxs)("div",{className:"flex flex-col justify-between h-full text-center",children:[(0,l.jsx)("p",{className:"text-lg font-medium invisible",children:"Forum Activity"}),(0,l.jsx)("p",{className:"text-5xl py-4 font-thin",children:null===t||void 0===t?void 0:t.totalNewDiscussions}),(0,l.jsx)(c.Lt,{className:"mt-2 w-full",trigger:(0,l.jsxs)("div",{children:[(0,l.jsx)("p",{className:"w-full",children:"New Threads"}),(0,l.jsxs)("p",{className:"w-full",children:["( ",h("timeframe_discussions")," )"]})]}),children:(0,l.jsx)("ul",{children:m.map((function(e){return(0,l.jsx)("li",{className:"p-2 hover:text-primary cursor-pointer",onClick:function(){return _("timeframe_discussions",e.key)},children:(0,l.jsx)("p",{className:"w-full relative h-6",children:e.label})})}))})})]})})]})]}),(0,l.jsxs)("div",{className:"flex flex-1 min-h-0 gap-5 flex-col-reverse lg:flex-row lg:h-2/3",children:[(0,l.jsx)(c.Zb,{className:"flex-grow w-full lg:w-2/3 h-full",children:(0,l.jsx)(p.Z,{})}),(0,l.jsx)(c.Zb,{className:"".concat(a?"flex-grow w-full lg:w-1/3 h-full":"hidden"),children:(0,l.jsx)(d.Z,{toggleOpenVotes:i})})]})]})})},_=n(24015),h=n(87028),j=(0,_.a)((function(){var e=(0,s.I0)(),t=(0,r.useState)(),n=t[0],i=t[1];return(0,l.jsx)(a.Z,{children:(0,l.jsxs)("div",{className:"flex gap-5 h-auto lg:h-full",children:[(0,l.jsx)("div",{className:"w-4/5",children:(0,l.jsx)(v,{stats:n,changeFrame:function(t){e((0,h.kF)(t,(function(e){i(e)})))}})}),(0,l.jsx)(c.Zb,{className:"hidden lg:block h-full w-1/5",children:(0,l.jsx)("div",{className:"overflow-y-scroll h-full w-80",children:(0,l.jsx)(o,{stats:n})})})]})})}),"final-admin")},87028:function(e,t,n){"use strict";n.d(t,{lL:function(){return l},yW:function(){return r},nE:function(){return s},Eg:function(){return a},BQ:function(){return c},FH:function(){return i},iA:function(){return o},c8:function(){return u},fX:function(){return f},Od:function(){return d},fI:function(){return p},yG:function(){return x},Lx:function(){return y},TT:function(){return m},I2:function(){return v},qG:function(){return _},hy:function(){return h},MC:function(){return j},CQ:function(){return E},ie:function(){return N},kB:function(){return T},Pj:function(){return I},ZZ:function(){return g},nQ:function(){return A},yT:function(){return S},sW:function(){return w},Dj:function(){return R},li:function(){return b},tA:function(){return O},Hi:function(){return L},zb:function(){return D},QT:function(){return C},cX:function(){return k},b$:function(){return G},y3:function(){return U},Nk:function(){return M},Xs:function(){return P},O2:function(){return B},J5:function(){return F},bG:function(){return V},og:function(){return K},Xj:function(){return Z},lf:function(){return H},D:function(){return X},Vk:function(){return W},M6:function(){return Y},Ng:function(){return Q},lN:function(){return q},VO:function(){return $},R$:function(){return z},q6:function(){return J},Li:function(){return ee},wN:function(){return te},t:function(){return ne},uy:function(){return le},HC:function(){return re},AL:function(){return se},xC:function(){return ae},kF:function(){return ce},ud:function(){return ie},Vi:function(){return oe},_i:function(){return ue},XM:function(){return fe}});var l=function(e,t){return{type:"GET_LIST_MEMBER",payload:e,callback:t}},r=function(e){return{type:"GET_LIST_MEMBER_SUCCESS",payload:e}},s=function(e){return{type:"GET_USER_DETAIL",payload:e}},a=function(e,t,n){return{type:"GET_USER_METRICS",payload:e,resolve:t,reject:n}},c=function(e,t,n){return{type:"UPDATE_USER_METRICS",payload:e,resolve:t,reject:n}},i=function(e){return{type:"GET_USER_DETAIL_SUCCESS",payload:e}},o=function(e){return{type:"GET_USER_KYC_INFO_SUCCESS",payload:e}},u=function(e,t){return{type:"GET_LIST_INTAKE",payload:e,successCb:t}},f=function(e,t){return{type:"GET_LIST_VERIFICATIONS",payload:e,resolve:t}},d=function(e){return{type:"GET_LIST_INTAKE_SUCCESS",payload:e}},p=function(e){return{type:"GET_LIST_INTAKE_ERROR",payload:e}},x=function(e,t){return{type:"GET_BALLOTS",payload:e,callback:t}},y=function(e,t){return{type:"GET_BALLOT_DETAIL",payload:e,callback:t}},m=function(e,t){return{type:"GET_BALLOT_VOTES",payload:e,callback:t}},v=function(e,t,n){return{type:"SUBMIT_BALLOT",payload:e,resolve:t,reject:n}},_=function(e,t,n){return{type:"SUBMIT_PERK",payload:e,resolve:t,reject:n}},h=function(e,t,n){return{type:"EDIT_PERK",payload:e,resolve:t,reject:n}},j=function(e,t,n){return{type:"CANCEL_BALLOT",payload:e,resolve:t,reject:n}},E=function(e){return{type:"CANCEL_BALLOT_SUCCESS",payload:e}},N=function(e){return{type:"CANCEL_BALLOT_ERROR",payload:e}},T=function(e,t){return{type:"GET_SUBADMINS",payload:e,callback:t}},I=function(e,t,n){return{type:"REGISTER_SUB_ADMIN",payload:e,resolve:t,reject:n}},g=function(e,t){return{type:"GET_IP_HISTORIES",payload:e,callback:t}},A=function(e,t,n){return{type:"INVITE_SUBADMIN",email:e,resolve:t,reject:n}},S=function(e,t,n){return{type:"REVOKE_SUBADMIN",id:e,resolve:t,reject:n}},w=function(e,t,n){return{type:"UNDO_REVOKE_SUBADMIN",id:e,resolve:t,reject:n}},R=function(e,t,n){return{type:"RESET_SUBADMIN_PASSWORD",id:e,resolve:t,reject:n}},b=function(e,t,n){return{type:"RESEND_INVITE_SUBADMIN",id:e,resolve:t,reject:n}},O=function(e,t,n){return{type:"CHANGE_SUBADMIN_PERMISSIONS",id:e,payload:t,callback:n}},L=function(e,t,n){return{type:"APPROVE_USER",payload:e,resolve:t,reject:n}},D=function(e,t,n){return{type:"RESET_USER",payload:e,resolve:t,reject:n}},C=function(e,t,n){return{type:"BAN_USER",payload:e,resolve:t,reject:n}},k=function(e,t,n){return{type:"BAN_VERIFIED_USER",payload:e,resolve:t,reject:n}},G=function(e,t,n){return{type:"APPROVED_DOCUMENTS",payload:e,resolve:t,reject:n}},U=function(e,t,n){return{type:"GET_LIST_VERIFICATION_DETAIL",payload:e,resolve:t,reject:n}},M=function(e,t,n){return{type:"APPROVE_USER_AML",payload:e,resolve:t,reject:n}},P=function(e,t,n){return{type:"RESET_USER_AML",payload:e,resolve:t,reject:n}},B=function(e,t,n){return{type:"APPROVE_USER_KYC",payload:e,resolve:t,reject:n}},F=function(e,t,n){return{type:"RESET_USER_KYC",payload:e,resolve:t,reject:n}},V=function(e,t,n){return{type:"ACTIVATE_VERIFIED_STATUS",payload:e,resolve:t,reject:n}},K=function(e,t){return{type:"GET_EMAILER_DATA",resolve:e,reject:t}},Z=function(e,t,n){return{type:"ADD_EMAILER_ADMIN",payload:e,resolve:t,reject:n}},H=function(e,t,n){return{type:"DELETE_EMAILER_ADMIN",payload:e,resolve:t,reject:n}},X=function(e,t,n){return{type:"UPDATE_EMAILER_TRIGGER_USER",payload:e,resolve:t,reject:n}},W=function(e,t,n){return{type:"UPDATE_EMAILER_TRIGGER_ADMIN",payload:e,resolve:t,reject:n}},Y=function(e,t,n){return{type:"GET_LIST_PERKS",payload:e,resolve:t,reject:n}},Q=function(e,t,n){return{type:"GET_ACTIVE_PERKS",payload:e,resolve:t,reject:n}},q=function(e,t,n){return{type:"GET_LIST_PERK_ENGAGEMENT",payload:e,resolve:t,reject:n}},$=function(e,t,n){return{type:"GET_PERK_DETAIL",payload:e,resolve:t,reject:n}},z=function(e,t){return{type:"GET_WARNING_METRICS",resolve:e,reject:t}},J=function(e,t,n){return{type:"GET_ACTIVE_PERK_DETAIL",payload:e,resolve:t,reject:n}},ee=function(e,t,n){return{type:"UPDATE_WARNING_METRICS",payload:e,resolve:t,reject:n}},te=function(e,t,n){return{type:"ADD_NOTIFICATION",payload:e,resolve:t,reject:n}},ne=function(e,t,n){return{type:"EDIT_NOTIFICATION",payload:e,resolve:t,reject:n}},le=function(e,t,n){return{type:"GET_NOTIFICATION_DETAIL",payload:e,resolve:t,reject:n}},re=function(e,t,n){return{type:"GET_LIST_NOTIFICATIONS",payload:e,resolve:t,reject:n}},se=function(e,t){return{type:"GET_NOTIFICATION_VIEW_LOGS",payload:e,resolve:t}},ae=function(e,t){return{type:"GET_HIGH_PRIORITY_NOTIFICATION",resolve:e,reject:t}},ce=function(e,t,n){return{type:"GET_ADMIN_DASHBOARD",payload:e,resolve:t,reject:n}},ie=function(e,t,n){return{type:"GET_NODES_FROM_ADMIN",payload:e,resolve:t,reject:n}},oe=function(e,t){return{type:"GET_LOCK_PAGE_RULES",resolve:e,reject:t}},ue=function(e,t,n){return{type:"UPDATE_LOCK_PAGE_RULES",payload:e,resolve:t,reject:n}},fe=function(e,t,n){return{type:"GET_NODE_DETAIL",payload:e,resolve:t,reject:n}}},84737:function(e,t,n){(window.__NEXT_P=window.__NEXT_P||[]).push(["/admin/dashboard",function(){return n(78098)}])},22897:function(){}},function(e){e.O(0,[9774,2554,4597,9650,6993,6095,8661,1045,804,2351],(function(){return t=84737,e(e.s=t);var t}));var t=e.O();_N_E=t}]);