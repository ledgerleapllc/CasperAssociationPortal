(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[5074],{44791:function(e,n,t){"use strict";var r=t(85893),u=t(733),o=t.n(u);n.Z=function(){return(0,r.jsxs)("div",{className:"fixed inset-0 flex items-center justify-center z-40",children:[(0,r.jsx)("div",{className:"fixed inset-0 bg-white opacity-40"}),(0,r.jsx)(o(),{className:"z-50",type:"spinningBubbles",color:"#FF473E",width:100,height:100})]})}},3099:function(e,n,t){"use strict";t.r(n);var r=t(85893),u=t(67294),o=t(24015),c=t(25955),i=t(89),a=t(17202),l=t(22163),f=t(51040);n.default=(0,o.a)((function(){var e=(0,u.useState)(),n=e[0],t=e[1],o=u.useCallback((function(e){t(e)}),[]);return(0,r.jsx)(c.Z,{children:(0,r.jsx)(i.Zb,{className:"h-full lg:pl-24 lg:py-11 lg:shadow-2xl",noShadow:!0,children:(0,r.jsxs)("div",{className:"w-full h-full",children:[(0,r.jsxs)("div",{className:"card-header lg:mr-24 lg:h-70px",children:[(0,r.jsx)(i.xE,{href:"/admin/perks",text:"Cancel",force:!0}),(0,r.jsx)("h3",{className:"text-dark2 text-xl lg:pr-32 font-medium mb-3.5",children:"Add New Perk"}),(0,r.jsx)("div",{className:"border-primary border-b-2"})]}),(0,r.jsx)("div",{className:"card-body pt-5 pb-28 overflow-y-auto lg:h-100%-70px -ml-5 pl-5",children:(0,r.jsxs)("div",{className:"lg:pr-24",children:[(0,r.jsx)(f.U,{onChange:o}),(0,r.jsxs)("div",{className:"pt-10",children:[(0,r.jsx)("h3",{className:"text-dark2 text-xl lg:pr-32 font-medium mb-3.5",children:"Card Preview"}),(0,r.jsx)("div",{className:"border-primary border-b-2"}),(0,r.jsx)("div",{className:"mt-4",style:{width:"400px",maxWidth:"100%"},children:(0,r.jsx)(a.T,{perk:n,preview:!0})})]}),(0,r.jsxs)("div",{className:"pt-10",children:[(0,r.jsx)("h3",{className:"text-dark2 text-xl lg:pr-32 font-medium mb-3.5",children:"Page Preview"}),(0,r.jsx)("div",{className:"border-primary border-b-2"}),(0,r.jsx)("div",{className:"mt-4",children:(0,r.jsx)(l.o,{perk:n,preview:!0})})]})]})})]})})})}),"final-all")},29586:function(e,n,t){"use strict";t.d(n,{p:function(){return u},e:function(){return o}});var r=t(38661),u=function(e){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"dd/MM/yyyy",t=new Date(e);return"Invalid Date"===t.toString()?t.toString():(0,r.Z)(t,n)},o=function(e){return e?"".concat(e.substr(0,10),"...").concat(e.substr(-4)):"-"}},87028:function(e,n,t){"use strict";t.d(n,{lL:function(){return r},yW:function(){return u},nE:function(){return o},Eg:function(){return c},BQ:function(){return i},FH:function(){return a},C4:function(){return l},iA:function(){return f},Xp:function(){return s},ed:function(){return p},c8:function(){return E},fX:function(){return y},Od:function(){return d},fI:function(){return _},yG:function(){return T},Lx:function(){return I},TT:function(){return v},I2:function(){return N},qG:function(){return A},hy:function(){return S},MC:function(){return R},CQ:function(){return j},ie:function(){return C},Hi:function(){return L},zb:function(){return x},QT:function(){return O},cX:function(){return h},b$:function(){return m},y3:function(){return G},Nk:function(){return b},Xs:function(){return D},O2:function(){return P},J5:function(){return U},og:function(){return M},Xj:function(){return g},lf:function(){return w},D:function(){return k},Vk:function(){return K},M6:function(){return B},Ng:function(){return F},lN:function(){return V},VO:function(){return Y},R$:function(){return X},q6:function(){return H},Li:function(){return W},wN:function(){return Z},t:function(){return z},uy:function(){return Q},HC:function(){return q},AL:function(){return $},xC:function(){return J}});var r=function(e,n){return{type:"GET_LIST_MEMBER",payload:e,callback:n}},u=function(e){return{type:"GET_LIST_MEMBER_SUCCESS",payload:e}},o=function(e){return{type:"GET_USER_DETAIL",payload:e}},c=function(e,n,t){return{type:"GET_USER_METRICS",payload:e,resolve:n,reject:t}},i=function(e,n,t){return{type:"UPDATE_USER_METRICS",payload:e,resolve:n,reject:t}},a=function(e){return{type:"GET_USER_DETAIL_SUCCESS",payload:e}},l=function(e){return{type:"GET_USER_KYC_INFO",payload:e}},f=function(e){return{type:"GET_USER_KYC_INFO_SUCCESS",payload:e}},s=function(e){return{type:"APPROVE_KYC",payload:e}},p=function(e){return{type:"DENY_KYC",payload:e}},E=function(e,n){return{type:"GET_LIST_INTAKE",payload:e,successCb:n}},y=function(e,n){return{type:"GET_LIST_VERIFICATIONS",payload:e,resolve:n}},d=function(e){return{type:"GET_LIST_INTAKE_SUCCESS",payload:e}},_=function(e){return{type:"GET_LIST_INTAKE_ERROR",payload:e}},T=function(e,n){return{type:"GET_BALLOTS",payload:e,callback:n}},I=function(e,n){return{type:"GET_BALLOT_DETAIL",payload:e,callback:n}},v=function(e,n){return{type:"GET_BALLOT_VOTES",payload:e,callback:n}},N=function(e,n,t){return{type:"SUBMIT_BALLOT",payload:e,resolve:n,reject:t}},A=function(e,n,t){return{type:"SUBMIT_PERK",payload:e,resolve:n,reject:t}},S=function(e,n,t){return{type:"EDIT_PERK",payload:e,resolve:n,reject:t}},R=function(e,n,t){return{type:"CANCEL_BALLOT",payload:e,resolve:n,reject:t}},j=function(e){return{type:"CANCEL_BALLOT_SUCCESS",payload:e}},C=function(e){return{type:"CANCEL_BALLOT_ERROR",payload:e}},L=function(e,n,t){return{type:"APPROVE_USER",payload:e,resolve:n,reject:t}},x=function(e,n,t){return{type:"RESET_USER",payload:e,resolve:n,reject:t}},O=function(e,n,t){return{type:"BAN_USER",payload:e,resolve:n,reject:t}},h=function(e,n,t){return{type:"BAN_VERIFIED_USER",payload:e,resolve:n,reject:t}},m=function(e,n,t){return{type:"APPROVED_DOCUMENTS",payload:e,resolve:n,reject:t}},G=function(e,n,t){return{type:"GET_LIST_VERIFICATION_DETAIL",payload:e,resolve:n,reject:t}},b=function(e,n,t){return{type:"APPROVE_USER_AML",payload:e,resolve:n,reject:t}},D=function(e,n,t){return{type:"RESET_USER_AML",payload:e,resolve:n,reject:t}},P=function(e,n,t){return{type:"APPROVE_USER_KYC",payload:e,resolve:n,reject:t}},U=function(e,n,t){return{type:"RESET_USER_KYC",payload:e,resolve:n,reject:t}},M=function(e,n){return{type:"GET_EMAILER_DATA",resolve:e,reject:n}},g=function(e,n,t){return{type:"ADD_EMAILER_ADMIN",payload:e,resolve:n,reject:t}},w=function(e,n,t){return{type:"DELETE_EMAILER_ADMIN",payload:e,resolve:n,reject:t}},k=function(e,n,t){return{type:"UPDATE_EMAILER_TRIGGER_USER",payload:e,resolve:n,reject:t}},K=function(e,n,t){return{type:"UPDATE_EMAILER_TRIGGER_ADMIN",payload:e,resolve:n,reject:t}},B=function(e,n,t){return{type:"GET_LIST_PERKS",payload:e,resolve:n,reject:t}},F=function(e,n,t){return{type:"GET_ACTIVE_PERKS",payload:e,resolve:n,reject:t}},V=function(e,n,t){return{type:"GET_LIST_PERK_ENGAGEMENT",payload:e,resolve:n,reject:t}},Y=function(e,n,t){return{type:"GET_PERK_DETAIL",payload:e,resolve:n,reject:t}},X=function(e,n){return{type:"GET_WARNING_METRICS",resolve:e,reject:n}},H=function(e,n,t){return{type:"GET_ACTIVE_PERK_DETAIL",payload:e,resolve:n,reject:t}},W=function(e,n,t){return{type:"UPDATE_WARNING_METRICS",payload:e,resolve:n,reject:t}},Z=function(e,n,t){return{type:"ADD_NOTIFICATION",payload:e,resolve:n,reject:t}},z=function(e,n,t){return{type:"EDIT_NOTIFICATION",payload:e,resolve:n,reject:t}},Q=function(e,n,t){return{type:"GET_NOTIFICATION_DETAIL",payload:e,resolve:n,reject:t}},q=function(e,n,t){return{type:"GET_LIST_NOTIFICATIONS",payload:e,resolve:n,reject:t}},$=function(e,n){return{type:"GET_NOTIFICATION_VIEW_LOGS",payload:e,resolve:n}},J=function(e,n){return{type:"GET_HIGH_PRIORITY_NOTIFICATION",resolve:e,reject:n}}},42918:function(e,n,t){(window.__NEXT_P=window.__NEXT_P||[]).push(["/admin/perks/add",function(){return t(3099)}])}},function(e){e.O(0,[9774,2554,4597,9650,6993,6095,8661,2283,4733,3752,7010,5955,6187],(function(){return n=42918,e(e.s=n);var n}));var n=e.O();_N_E=n}]);