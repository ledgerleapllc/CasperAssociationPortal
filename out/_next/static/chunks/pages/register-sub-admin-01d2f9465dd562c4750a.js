(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[3632],{24015:function(e,t,n){"use strict";n.d(t,{a:function(){return s}});var r=n(96156),a=n(85893),i=n(67294),o=n(11163),u=n(49226);var c=n(44791);function l(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}var s=function(e,t){return function(n){var s=function(){var e=(arguments.length>0&&void 0!==arguments[0]?arguments[0]:{}).urlType,t=void 0===e?"public":e,n=(0,u.v9)((function(e){return e.authReducer.userInfo}));return(0,i.useEffect)((function(){if("public"!==t&&t&&n)if(n&&null!==n&&void 0!==n&&n.isLoggedIn)if("member"===n.role){if("auth"===t)return"verifying"===n.period&&o.default.push("/verify-email"),"onboarding"===n.period&&o.default.push("/onboard"),void("final"===n.period&&o.default.push("/dashboard"));if("verifying"===t)return"onboarding"===n.period&&o.default.push("/onboard"),void("final"===n.period&&o.default.push("/dashboard"));if("onboarding"===t)return"verifying"===n.period&&o.default.push("/verify-email"),void("final"===n.period&&o.default.push("/dashboard"));if("final-member"===t||"final-all"===t)return"verifying"===n.period&&o.default.push("/verify-email"),void("onboarding"===n.period&&o.default.push("/onboard"));"final-admin"===t&&("verifying"===n.period&&o.default.push("/verify-email"),"onboarding"===n.period&&o.default.push("/onboard"),"final"===n.period&&o.default.push("/dashboard"))}else["admin","sub-admin"].includes(n.role)&&"final-all"!==t&&"final-admin"!==t&&o.default.push("/admin/dashboard");else"auth"!==t&&o.default.push("/login")}),[n,t]),{user:n}}({urlType:t}).user;if(t&&"public"!==t){if(!s)return(0,a.jsx)(c.Z,{});if("auth"===t&&s.isLoggedIn)return(0,a.jsx)(c.Z,{});if("auth"!==t&&!s.isLoggedIn)return(0,a.jsx)(c.Z,{});if("member"===s.role){if(["final-all","final-member"].includes(t)&&"final"!==s.period)return(0,a.jsx)(c.Z,{});if(["verifying"].includes(t)&&"verifying"!==s.period)return(0,a.jsx)(c.Z,{});if(["onboarding"].includes(t)&&"onboarding"!==s.period)return(0,a.jsx)(c.Z,{})}if(["admin","sub-admin"].includes(s.role)&&["verifying","onboarding","final-member"].includes(t))return(0,a.jsx)(c.Z,{})}return(0,a.jsx)(e,function(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?l(Object(n),!0).forEach((function(t){(0,r.Z)(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):l(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}({},n))}}},66570:function(e,t,n){"use strict";n.d(t,{Z:function(){return _}});var r,a=n(85893),i=n(87757),o=n.n(i),u=n(92137),c=n(25675),l=n(49226),s=n(67294);function f(){return(f=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e}).apply(this,arguments)}var d=function(e){return s.createElement("svg",f({xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 35 23"},e),r||(r=s.createElement("g",{"data-name":"Group 1031",fill:"none",stroke:"currentColor",strokeWidth:3},s.createElement("path",{"data-name":"Line 1",d:"M35 21.5H0"}),s.createElement("path",{"data-name":"Line 2",d:"M35 11.5H9.082"}),s.createElement("path",{"data-name":"Line 3",d:"M35 1.5H0"}))))},p=n(43022),_=function(e){var t=e.className,n=e.theme,r=(0,l.I0)();return(0,a.jsxs)("div",{className:"flex items-center justify-between ".concat(t||""),children:[(0,a.jsx)(c.default,{className:"animate__animated animate__fadeIn",src:"/images/casper_logo_".concat(n,".svg"),alt:"casper logo",width:125,height:33}),(0,a.jsx)("button",{className:"animate__animated animate__fadeIn animate__delay-2s",type:"button",onClick:function(){var e=(0,u.Z)(o().mark((function e(t){return o().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:t.preventDefault(),r((0,p.Rg)());case 2:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),children:(0,a.jsx)(d,{width:"2rem",height:"1.25rem",className:"".concat("light"===n?"text-white":"text-dark2")})})]})}},44791:function(e,t,n){"use strict";var r=n(85893),a=n(733),i=n.n(a);t.Z=function(){return(0,r.jsxs)("div",{className:"fixed inset-0 flex items-center justify-center z-40",children:[(0,r.jsx)("div",{className:"fixed inset-0 bg-white opacity-40"}),(0,r.jsx)(i(),{className:"z-50",type:"spinningBubbles",color:"#FF473E",width:100,height:100})]})}},24205:function(e,t,n){"use strict";n.d(t,{Ge:function(){return r},QI:function(){return a},zC:function(){return i},qn:function(){return o},tH:function(){return u},VX:function(){return c},FZ:function(){return l},ec:function(){return s},mS:function(){return f}});var r=/^[\.a-zA-Z\s ]*$/,a=/^[_A-Za-z0-9-+]+(\.[_A-Za-z0-9-+]+)*@[A-Za-z0-9-]+(\.[A-Za-z0-9-]+)*(\.[A-Za-z\u200c\u200b]{2,})$/,i=/(^[0-9])/,o=/^-?[1-9]/,u=/^[A-Za-z0-9-]*$/,c=/^[A-Za-z0-9-]*$/,l=/(^)@[A-Za-z0-9-\_]*$/,s=/^[A-Za-z0-9-\s\.\_ ]*$/,f=new RegExp("".concat(/(?=.*?[a-zA-Z])/.source).concat(/(?=.*?[0-9])/.source).concat(/(?=.*?[\!\"\-\@\#\$\%\&\*\(\)\'\^\`\.\,\/\:\;\_\+\=\<\>\?\{\}\[\\\]])/.source))},35391:function(e,t,n){"use strict";n.r(t);var r=n(85893),a=n(96156),i=n(41664),o=n(7318),u=n.n(o),c=n(42283),l=n(11163),s=n(67294),f=n(49226),d=n(7667),p=n(66570),_=n(24205),y=n(89),m=n(24015),E=n(87028);function v(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function I(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?v(Object(n),!0).forEach((function(t){(0,a.Z)(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):v(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}t.default=(0,m.a)((function(){var e,t,n,a,o,m,v,g,h=(0,c.cI)(),x=h.clearErrors,S=h.formState,T=h.register,j=h.handleSubmit,b=h.getValues,N=h.setError,A=(0,f.I0)(),R=(0,l.useRouter)(),O=u()(),w=(0,s.useState)(!1),L=w[0],C=w[1],P=(0,s.useState)(!1),D=P[0],G=P[1];return(0,r.jsx)("div",{className:"flex justify-center h-screen",style:{backgroundImage:"url('/images/bg_welcome".concat(O.isMobile()?"_mobile":"",".png')"),backgroundSize:"cover"},children:(0,r.jsxs)("div",{className:" flex flex-col w-full p-4 lg:max-w-380 lg:p-9 xl:max-w-screen-xl xl:p-9 2xl:max-w-screen-2xl",children:[(0,r.jsx)(p.Z,{theme:"light"}),(0,r.jsx)("form",{className:"flex-grow flex items-center justify-center",onSubmit:j((function(e){var t=e;G(!0),t.email=R.query.email,t.code=R.query.code,A((0,E.Pj)(I({},t),(function(){C(!0)}),(function(){G(!1)})))})),children:L?(0,r.jsxs)("div",{className:"bg-white w-full lg:w-2/3 text-center px-4 py-12 lg:p-44",style:{backgroundImage:"url('/images/login_overlay.png')",backgroundSize:"cover"},children:[(0,r.jsx)("p",{className:"text-4xl text-center animate__animated animate__fadeInUp",children:"Your Password has been updated"}),(0,r.jsx)("div",{className:"lg:flex lg:space-x-5 lg:mt-12 mt-8 lg:justify-center animate__animated animate__fadeInUp animate__delay-2s",children:(0,r.jsx)("button",{type:"button",onClick:function(){return R.push("/login")},className:"text-lg text-white w-full lg:w-64 h-16 rounded-full bg-primary hover:opacity-40 focus:outline-none shadow-md",children:"Go to Login"})})]}):(0,r.jsxs)("div",{className:"bg-white w-full lg:w-2/3 text-center px-4 py-12 lg:px-44",style:{backgroundImage:"url('/images/login_overlay.png')",backgroundSize:"cover"},children:[(0,r.jsx)("p",{className:"text-4xl text-center animate__animated animate__fadeInUp",children:"Create Your Password"}),(0,r.jsx)("p",{className:"text-xs text-center mt-2 animate__animated animate__fadeInUp animate__delay-2s",children:"Please create a new password and click Submit"}),(0,r.jsxs)("div",{className:"w-full flex flex-col animate__animated animate__fadeInLeft animate__delay-4s",children:[(0,r.jsx)("input",I({type:"text",className:"text-center w-full h-16 text-xl mt-7 px-7 rounded-full shadow-md focus:outline-none",placeholder:"Enter First Name",name:"password"},T("first_name",{required:"First name is required",pattern:{message:"First name is invalid",value:_.Ge}}))),(null===(e=S.errors)||void 0===e?void 0:e.first_name)&&(0,r.jsx)("p",{className:"pl-7 mt-2 text-primary text-left",children:null===(t=S.errors.first_name)||void 0===t?void 0:t.message})]}),(0,r.jsxs)("div",{className:"w-full flex flex-col animate__animated animate__fadeInLeft animate__delay-4s",children:[(0,r.jsx)("input",I({type:"text",className:"text-center w-full h-16 text-xl mt-7 px-7 rounded-full shadow-md focus:outline-none",placeholder:"Enter Last Name",name:"password"},T("last_name",{required:"Last name is required",pattern:{message:"Last name is invalid",value:_.Ge}}))),(null===(n=S.errors)||void 0===n?void 0:n.last_name)&&(0,r.jsx)("p",{className:"pl-7 mt-2 text-primary text-left",children:null===(a=S.errors.last_name)||void 0===a?void 0:a.message})]}),(0,r.jsxs)("div",{className:"w-full flex flex-col animate__animated animate__fadeInLeft animate__delay-4s",children:[(0,r.jsx)("input",I({type:"password",className:"text-center w-full h-16 text-xl mt-7 px-7 rounded-full shadow-md focus:outline-none",placeholder:"Enter New Password",name:"password"},T("password",{required:"Password is required",minLength:{message:"Min 8 character",value:8},pattern:{message:"Password is invalid",value:_.mS},validate:function(e){return e===b().confirmPassword||"Password not match"}}))),(null===(o=S.errors)||void 0===o?void 0:o.password)&&(0,r.jsx)("p",{className:"pl-7 mt-2 text-primary text-left",children:null===(m=S.errors.password)||void 0===m?void 0:m.message})]}),(0,r.jsxs)("div",{className:"w-full flex flex-col animate__animated animate__fadeInLeft animate__delay-4s",children:[(0,r.jsx)("input",I({type:"password",className:"text-center w-full h-16 text-xl mt-7 px-7 rounded-full shadow-md focus:outline-none",placeholder:"Verify New Password",name:"confirmPassword"},T("confirmPassword",{required:"Confirm password is required",minLength:{message:"Min 8 character",value:8},pattern:{message:"Confirm password is invalid",value:_.mS},validate:function(e){return e===b().password?x("password"):N("password",{message:"Password not match"})}}))),(null===(v=S.errors)||void 0===v?void 0:v.confirmPassword)&&(0,r.jsx)("p",{className:"pl-7 mt-2 text-primary text-left",children:null===(g=S.errors.confirmPassword)||void 0===g?void 0:g.message})]}),(0,r.jsx)("div",{className:"lg:flex lg:space-x-5 lg:mt-4 mt-14 lg:justify-center animate__animated animate__fadeInUp animate__delay-2s",children:(0,r.jsx)(y.fl,{type:"submit",isDisabled:D,isLoading:D,title:"Submit",className:"text-lg text-white w-full lg:w-64 h-16 rounded-full bg-primary hover:opacity-40 focus:outline-none shadow-md"})}),(0,r.jsx)(i.default,{href:"/home",children:(0,r.jsxs)("p",{className:"cursor-pointer text-xs text-center mt-5 flex justify-center animate__animated animate__fadeInUp animate__delay-4s",children:[(0,r.jsx)("img",{src:"/images/ic_decline.svg",className:"mr-2",alt:"Go home page"}),(0,r.jsx)("a",{className:"text-primary underline font-medium",children:"Cancel and go back"})]})})]})}),(0,r.jsx)(d.Z,{theme:"light"})]})})}),"auth")},87028:function(e,t,n){"use strict";n.d(t,{lL:function(){return r},yW:function(){return a},nE:function(){return i},Eg:function(){return o},BQ:function(){return u},FH:function(){return c},C4:function(){return l},iA:function(){return s},Xp:function(){return f},ed:function(){return d},c8:function(){return p},fX:function(){return _},Od:function(){return y},fI:function(){return m},yG:function(){return E},Lx:function(){return v},TT:function(){return I},I2:function(){return g},qG:function(){return h},hy:function(){return x},MC:function(){return S},CQ:function(){return T},ie:function(){return j},kB:function(){return b},Pj:function(){return N},ZZ:function(){return A},nQ:function(){return R},yT:function(){return O},Dj:function(){return w},li:function(){return L},tA:function(){return C},Hi:function(){return P},zb:function(){return D},QT:function(){return G},cX:function(){return U},b$:function(){return M},y3:function(){return k},Nk:function(){return B},Xs:function(){return F},O2:function(){return Z},J5:function(){return V},og:function(){return z},Xj:function(){return K},lf:function(){return q},D:function(){return H},Vk:function(){return Y},M6:function(){return $},Ng:function(){return W},lN:function(){return X},VO:function(){return Q},R$:function(){return J},q6:function(){return ee},Li:function(){return te},wN:function(){return ne},t:function(){return re},uy:function(){return ae},HC:function(){return ie},AL:function(){return oe},xC:function(){return ue}});var r=function(e,t){return{type:"GET_LIST_MEMBER",payload:e,callback:t}},a=function(e){return{type:"GET_LIST_MEMBER_SUCCESS",payload:e}},i=function(e){return{type:"GET_USER_DETAIL",payload:e}},o=function(e,t,n){return{type:"GET_USER_METRICS",payload:e,resolve:t,reject:n}},u=function(e,t,n){return{type:"UPDATE_USER_METRICS",payload:e,resolve:t,reject:n}},c=function(e){return{type:"GET_USER_DETAIL_SUCCESS",payload:e}},l=function(e){return{type:"GET_USER_KYC_INFO",payload:e}},s=function(e){return{type:"GET_USER_KYC_INFO_SUCCESS",payload:e}},f=function(e){return{type:"APPROVE_KYC",payload:e}},d=function(e){return{type:"DENY_KYC",payload:e}},p=function(e,t){return{type:"GET_LIST_INTAKE",payload:e,successCb:t}},_=function(e,t){return{type:"GET_LIST_VERIFICATIONS",payload:e,resolve:t}},y=function(e){return{type:"GET_LIST_INTAKE_SUCCESS",payload:e}},m=function(e){return{type:"GET_LIST_INTAKE_ERROR",payload:e}},E=function(e,t){return{type:"GET_BALLOTS",payload:e,callback:t}},v=function(e,t){return{type:"GET_BALLOT_DETAIL",payload:e,callback:t}},I=function(e,t){return{type:"GET_BALLOT_VOTES",payload:e,callback:t}},g=function(e,t,n){return{type:"SUBMIT_BALLOT",payload:e,resolve:t,reject:n}},h=function(e,t,n){return{type:"SUBMIT_PERK",payload:e,resolve:t,reject:n}},x=function(e,t,n){return{type:"EDIT_PERK",payload:e,resolve:t,reject:n}},S=function(e,t,n){return{type:"CANCEL_BALLOT",payload:e,resolve:t,reject:n}},T=function(e){return{type:"CANCEL_BALLOT_SUCCESS",payload:e}},j=function(e){return{type:"CANCEL_BALLOT_ERROR",payload:e}},b=function(e,t){return{type:"GET_SUBADMINS",payload:e,callback:t}},N=function(e,t,n){return{type:"REGISTER_SUB_ADMIN",payload:e,resolve:t,reject:n}},A=function(e,t){return{type:"GET_IP_HISTORIES",payload:e,callback:t}},R=function(e,t,n){return{type:"INVITE_SUBADMIN",email:e,resolve:t,reject:n}},O=function(e,t,n){return{type:"REVOKE_SUBADMIN",id:e,resolve:t,reject:n}},w=function(e,t,n){return{type:"RESET_SUBADMIN_PASSWORD",id:e,resolve:t,reject:n}},L=function(e,t,n){return{type:"RESEND_INVITE_SUBADMIN",id:e,resolve:t,reject:n}},C=function(e,t,n){return{type:"CHANGE_SUBADMIN_PERMISSIONS",id:e,payload:t,callback:n}},P=function(e,t,n){return{type:"APPROVE_USER",payload:e,resolve:t,reject:n}},D=function(e,t,n){return{type:"RESET_USER",payload:e,resolve:t,reject:n}},G=function(e,t,n){return{type:"BAN_USER",payload:e,resolve:t,reject:n}},U=function(e,t,n){return{type:"BAN_VERIFIED_USER",payload:e,resolve:t,reject:n}},M=function(e,t,n){return{type:"APPROVED_DOCUMENTS",payload:e,resolve:t,reject:n}},k=function(e,t,n){return{type:"GET_LIST_VERIFICATION_DETAIL",payload:e,resolve:t,reject:n}},B=function(e,t,n){return{type:"APPROVE_USER_AML",payload:e,resolve:t,reject:n}},F=function(e,t,n){return{type:"RESET_USER_AML",payload:e,resolve:t,reject:n}},Z=function(e,t,n){return{type:"APPROVE_USER_KYC",payload:e,resolve:t,reject:n}},V=function(e,t,n){return{type:"RESET_USER_KYC",payload:e,resolve:t,reject:n}},z=function(e,t){return{type:"GET_EMAILER_DATA",resolve:e,reject:t}},K=function(e,t,n){return{type:"ADD_EMAILER_ADMIN",payload:e,resolve:t,reject:n}},q=function(e,t,n){return{type:"DELETE_EMAILER_ADMIN",payload:e,resolve:t,reject:n}},H=function(e,t,n){return{type:"UPDATE_EMAILER_TRIGGER_USER",payload:e,resolve:t,reject:n}},Y=function(e,t,n){return{type:"UPDATE_EMAILER_TRIGGER_ADMIN",payload:e,resolve:t,reject:n}},$=function(e,t,n){return{type:"GET_LIST_PERKS",payload:e,resolve:t,reject:n}},W=function(e,t,n){return{type:"GET_ACTIVE_PERKS",payload:e,resolve:t,reject:n}},X=function(e,t,n){return{type:"GET_LIST_PERK_ENGAGEMENT",payload:e,resolve:t,reject:n}},Q=function(e,t,n){return{type:"GET_PERK_DETAIL",payload:e,resolve:t,reject:n}},J=function(e,t){return{type:"GET_WARNING_METRICS",resolve:e,reject:t}},ee=function(e,t,n){return{type:"GET_ACTIVE_PERK_DETAIL",payload:e,resolve:t,reject:n}},te=function(e,t,n){return{type:"UPDATE_WARNING_METRICS",payload:e,resolve:t,reject:n}},ne=function(e,t,n){return{type:"ADD_NOTIFICATION",payload:e,resolve:t,reject:n}},re=function(e,t,n){return{type:"EDIT_NOTIFICATION",payload:e,resolve:t,reject:n}},ae=function(e,t,n){return{type:"GET_NOTIFICATION_DETAIL",payload:e,resolve:t,reject:n}},ie=function(e,t,n){return{type:"GET_LIST_NOTIFICATIONS",payload:e,resolve:t,reject:n}},oe=function(e,t){return{type:"GET_NOTIFICATION_VIEW_LOGS",payload:e,resolve:t}},ue=function(e,t){return{type:"GET_HIGH_PRIORITY_NOTIFICATION",resolve:e,reject:t}}},43022:function(e,t,n){"use strict";n.d(t,{q0:function(){return r},Rg:function(){return a},uB:function(){return i},xv:function(){return o},c0:function(){return u},s:function(){return c},gQ:function(){return l},lm:function(){return s},hh:function(){return f},CS:function(){return d},$Y:function(){return p},B0:function(){return _},av:function(){return y},Nq:function(){return m},pn:function(){return E},NL:function(){return v},V$:function(){return I},x8:function(){return g},Nc:function(){return h},zg:function(){return x},qA:function(){return S},j_:function(){return T}});var r=function(e,t,n){return{type:"LOGIN_APP",callback:t,payload:e,resetSubmitting:n}},a=function(){return{type:"LOGOUT_APP"}},i=function(e,t,n){return{type:"REGISTER_ENTITY",callback:t,payload:e,resetSubmitting:n}},o=function(e,t,n){return{type:"REGISTER_INDIVIDUAL",callback:t,payload:e,resetSubmitting:n}},u=function(e,t,n){return{type:"RESET_PASSWORD",callback:t,payload:e,resetSubmitting:n}},c=function(e,t,n){return{type:"UPDATE_EMAIL",callback:t,payload:e,resetSubmitting:n}},l=function(e,t,n){return{type:"UPDATE_PASSWORD",callback:t,payload:e,resetSubmitting:n}},s=function(e,t,n){return{type:"VERIFY_EMAIL",callback:t,payload:e,resetSubmitting:n}},f=function(e,t){return{type:"RESEND_VERIFICATION_CODE",resolve:e,reject:t}},d=function(e){return{type:"FETCH_USER_INFO",resolve:e}},p=function(e){return{type:"FETCH_USER_INFO_SUCCESS",payload:e}},_=function(e){return{type:"FETCH_USER_INFO_ERROR",payload:e}},y=function(e){return{type:"SET_USER_INFO",payload:e}},m=function(e){return{type:"UPDATE_USER_INFO",payload:e}},E=function(){return{type:"CLEAR_USER_INFO"}},v=function(){return{type:"CLEAR_METRICS"}},I=function(e,t,n){return{type:"CHANGE_EMAIL_CONFIRM",payload:e,resolve:t,reject:n}},g=function(e,t,n){return{type:"CHANGE_EMAIL_CANCEL",payload:e,resolve:t,reject:n}},h=function(e,t,n){return{type:"VERIFY_2FA",payload:e,resolve:t,reject:n}},x=function(e,t,n){return{type:"RESEND_2FA_CODE",resolve:t,reject:n}},S=function(){return{type:"GET_MY_METRICS"}},T=function(e){return{type:"SET_METRICS",payload:e}}},65054:function(e,t,n){(window.__NEXT_P=window.__NEXT_P||[]).push(["/register-sub-admin",function(){return n(35391)}])},7318:function(e,t,n){"use strict";const{useEffect:r}=n(67294),a=e=>{const t=()=>Boolean(e.match(/Android/i)),n=()=>Boolean(e.match(/iPhone|iPad|iPod/i)),r=()=>Boolean(e.match(/SSR/i)),a=()=>Boolean(t()||n()||Boolean(e.match(/Opera Mini/i))||Boolean(e.match(/IEMobile/i)));return{isMobile:a,isDesktop:()=>Boolean(!a()&&!r()),isAndroid:t,isIos:n,isSSR:r}};e.exports=()=>{const e="undefined"===typeof navigator?"SSR":navigator.userAgent;return a(e)}}},function(e){e.O(0,[9774,2554,4597,9650,6993,6095,2283,7010],(function(){return t=65054,e(e.s=t);var t}));var t=e.O();_N_E=t}]);