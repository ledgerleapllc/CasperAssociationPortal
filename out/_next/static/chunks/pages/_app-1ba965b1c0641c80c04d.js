(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[888,179],{4478:function(e,t,r){"use strict";r.d(t,{T:function(){return f},R:function(){return l}});var n=r(6156),a=r(5893),c=r(7294),o=r(3935);function u(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function s(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?u(Object(r),!0).forEach((function(t){(0,n.Z)(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):u(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}var i=c.createContext({setDialog:function(e){return e}}),l=function(){var e=c.useContext(i);if(!e)throw new Error("useDialog must be used within a DialogProvider");return e},p=function(e){var t=e.dialog,r=e.onClosed,n=t.settings?t.settings:{},c=function(e){r(),t.afterClosed&&t.afterClosed(e)};return(0,o.createPortal)((0,a.jsx)("div",{className:"backdrop-filter backdrop-blur-sm justify-center items-center flex fixed inset-0 z-50",children:(0,a.jsxs)("div",{className:"w-full max-w-2xl shadow-2xl mx-4 relative bg-white",style:n.style,children:[(0,a.jsxs)("div",{children:[(0,a.jsx)("p",{className:"text-4xl text-center pt-4",children:t.data.title}),(0,a.jsx)("a",{onClick:function(){return c(!1)},children:(0,a.jsx)("img",{src:"/images/ic_decline.svg",className:"absolute right-4 top-4",alt:"Cancel"})}),(0,a.jsx)("div",{className:"h-full w-full pt-16 pb-36 flex flex-col items-center justify-between border-gray",children:(0,a.jsx)("div",{className:"h-full w-full flex flex-col items-center justify-between",children:t.data.content})})]}),!n.hideButton&&(0,a.jsx)("button",{type:"button",className:"transform -translate-x-1/2 absolute left-1/2 bottom-6 text-lg text-white w-1/2 lg:w-1/2 h-16 rounded-full bg-primary hover:opacity-40 focus:outline-none shadow-md",onClick:function(){return c(!1)},children:"OK"})]})}),document.body)},f=function(e){var t=(0,c.useState)(null),r=t[0],n=t[1],o=(0,c.useCallback)((function(){n(null)}),[n]);return(0,a.jsxs)(i.Provider,s(s({value:{dialog:r,onClosed:o,setDialog:n}},e),{},{children:[e.children,r&&(0,a.jsx)(p,{dialog:r,onClosed:o})]}))}},7207:function(e,t,r){"use strict";r.r(t),r.d(t,{default:function(){return dt}});var n=r(6156),a=r(5893),c=r(7294),o=r(9008),u=(r(6677),r(8077),r(5197),r(5538),r(997),r(5627),r(797)),s=r(879),i=r(4500),l=r(9226),p=function(e,t){return function(){var r,n=arguments.length>0&&void 0!==arguments[0]?arguments[0]:t,a=arguments.length>1?arguments[1]:void 0,c=a.type,o=a.payload;return(null!==(r=e[c])&&void 0!==r?r:e.__default__)(n,o)}};function f(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function d(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?f(Object(r),!0).forEach((function(t){(0,n.Z)(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):f(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}var v=1,E=2,g=3,h={process:0,data:null,error:null};function y(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function _(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?y(Object(r),!0).forEach((function(t){(0,n.Z)(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):y(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}var O,b,m={id:null,fullInfo:null,period:null,type:null,isLoggedIn:!1},S=p({SET_USER_INFO:function(e,t){var r;return r=t.email_verified_at?t.signature_request_id&&t.node_verified_at&&t.kyc_verified_at?"final":"onboarding":"verifying",_(_({},e),{},{id:t.id,fullInfo:t,period:r,role:t.role,isLoggedIn:!0})},UPDATE_USER_INFO:function(e,t){return _(_({},e),t)},CLEAR_USER_INFO:function(e){return _(_({},e),m)},__default__:function(e){return e}},m),x=p({FETCH_USER_INFO:function(e){return d(d({},e),{},{process:v,data:null,error:null})},FETCH_USER_INFO_SUCCESS:function(e,t){return d(d({},e),{},{process:E,data:t,error:null})},FETCH_USER_INFO_ERROR:function(e,t){return d(d({},e),{},{process:g,data:null,error:t})},__default__:function(e){return e}},_({},h)),w=(0,s.UY)({fetchUserInfo:x,userInfo:S});function R(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function j(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?R(Object(r),!0).forEach((function(t){(0,n.Z)(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):R(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}var P,T={data:null,error:null,hasError:!1,isLoading:!1,isProcessing:!1},A=(O={},(0,n.Z)(O,"GET_LIST_MEMBER",(function(e){return j(j({},e),{},{isLoading:!0})})),(0,n.Z)(O,"GET_LIST_MEMBER_SUCCESS",(function(e,t){return j(j({},e),{},{data:t,isLoading:!1})})),(0,n.Z)(O,"GET_LIST_MEMBER_ERROR",(function(e,t){return j(j({},e),{},{error:t,hasError:!0,isLoading:!1})})),(0,n.Z)(O,"__default__",(function(e){return e})),O),C=(b={},(0,n.Z)(b,"GET_USER_DETAIL",(function(e){return j(j({},e),{},{isLoading:!0})})),(0,n.Z)(b,"GET_USER_DETAIL_SUCCESS",(function(e,t){return j(j({},e),{},{data:t,isLoading:!1})})),(0,n.Z)(b,"GET_USER_DETAIL_ERROR",(function(e,t){return j(j({},e),{},{error:t,hasError:!0,isLoading:!1})})),(0,n.Z)(b,"__default__",(function(e){return e})),b),D=p(A,T),k=p(C,T);function I(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function N(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?I(Object(r),!0).forEach((function(t){(0,n.Z)(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):I(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}var F=p((P={},(0,n.Z)(P,"GET_DASHBOARD_DATA_DEMO",(function(e){return N(N({},e),{},{isLoading:!0})})),(0,n.Z)(P,"GET_DASHBOARD_DATA_DEMO_SUCCESS",(function(e,t){return N(N({},e),{},{data:t,isLoading:!1})})),(0,n.Z)(P,"GET_DASHBOARD_DATA_DEMO_ERROR",(function(e,t){return N(N({},e),{},{error:t,hasError:!0,isLoading:!1})})),(0,n.Z)(P,"__default__",(function(e){return e})),P),{data:null,error:null,hasError:!1,isLoading:!1,isProcessing:!1});function U(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function L(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?U(Object(r),!0).forEach((function(t){(0,n.Z)(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):U(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}var z=p({SAVE_API_RESPONSE_ERROR:function(e,t){return L(L({},e),{},{hasError:!0,response:t.data,statusError:t.statusCode})},CLEAR_API_RESPONSE_ERROR:function(){return{response:null,statusError:null}},__default__:function(e){return e}},{hasError:!1,statusError:null}),B=(0,s.UY)({apiControllerReducer:z,demoDataReducer:F,authReducer:w,membersReducer:D,userDetailReducer:k}),G=r(7757),Z=r.n(G),M=r(4857),$=Z().mark(K),H=Z().mark(V);function K(){var e;return Z().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,e=[{a:"a",b:"b"}],t.next=4,(0,M.gz)({type:"GET_DASHBOARD_DATA_DEMO_SUCCESS",payload:e});case 4:t.next=10;break;case 6:return t.prev=6,t.t0=t.catch(0),t.next=10,(0,M.gz)({type:"GET_DASHBOARD_DATA_DEMO_SUCCESS_ERROR",payload:t.t0});case 10:case"end":return t.stop()}}),$,null,[[0,6]])}function V(){return Z().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,(0,M.$6)([(0,M.Fm)("GET_DASHBOARD_DATA_DEMO",K)]);case 2:case"end":return e.stop()}}),H)}var Y=r(129),W=r.n(Y),q=r(6610),Q=r(5991),X=r(9669),J=r.n(X);function ee(e){var t;if("string"!==typeof e[e.length-1]){t=e.pop();var r=e.join("/");return Object.keys(t).forEach((function(e){r=r.replace(":".concat(e),t[e])})),r}return e.join("/")}var te=function(){function e(){(0,q.Z)(this,e),(0,n.Z)(this,"axiosInstance",void 0),this.axiosInstance=J().create({baseURL:"".concat("https://backend.caspermember.com","/api/v1/"),headers:{"Content-Type":"application/json"}})}return(0,Q.Z)(e,[{key:"doGet",value:function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};return this.axiosInstance.get(ee(e),t)}},{key:"doPost",value:function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{};return this.axiosInstance.post(ee(e),t,r)}},{key:"doPut",value:function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{};return this.axiosInstance.put(ee(e),t,r)}},{key:"doDelete",value:function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{};return this.axiosInstance.delete(ee(e),t,r)}}]),e}(),re=Z().mark(ue),ne=Z().mark(se),ae=Z().mark(ie),ce=function e(t){(0,q.Z)(this,e),(0,n.Z)(this,"data",void 0),(0,n.Z)(this,"statusCode",void 0),this.statusCode=t.response.status,this.data=t.response.data},oe=new te;function ue(e){var t,r,n,a=arguments;return Z().wrap((function(c){for(;;)switch(c.prev=c.next){case 0:return t=a.length>1&&void 0!==a[1]?a[1]:{},r=a.length>2&&void 0!==a[2]?a[2]:{},c.prev=2,c.next=5,oe.doGet(e,t,r);case 5:return n=c.sent,c.abrupt("return",n.data);case 9:throw c.prev=9,c.t0=c.catch(2),401===+c.t0.response.status&&localStorage.clear(),new ce(c.t0);case 13:case"end":return c.stop()}}),re,null,[[2,9]])}function se(e){var t,r,n,a=arguments;return Z().wrap((function(c){for(;;)switch(c.prev=c.next){case 0:return t=a.length>1&&void 0!==a[1]?a[1]:{},r=a.length>2&&void 0!==a[2]?a[2]:{},c.prev=2,c.next=5,oe.doPost(e,t,r);case 5:return n=c.sent,c.abrupt("return",n.data);case 9:throw c.prev=9,c.t0=c.catch(2),401===+c.t0.response.status&&localStorage.clear(),new ce(c.t0);case 13:case"end":return c.stop()}}),ne,null,[[2,9]])}function ie(e){var t,r,n,a=arguments;return Z().wrap((function(c){for(;;)switch(c.prev=c.next){case 0:return t=a.length>1&&void 0!==a[1]?a[1]:{},r=a.length>2&&void 0!==a[2]?a[2]:{},c.prev=2,c.next=5,oe.doPut(e,t,r);case 5:return n=c.sent,c.abrupt("return",n.data);case 9:throw c.prev=9,c.t0=c.catch(2),401===+c.t0.response.status&&localStorage.clear(),new ce(c.t0);case 13:case"end":return c.stop()}}),ae,null,[[2,9]])}var le=function(e){return{type:"SAVE_API_RESPONSE_ERROR",payload:e}},pe=function(e){localStorage.setItem("ACCESS-TOKEN",e)},fe=r(3022),de=Z().mark(xe),ve=Z().mark(we),Ee=Z().mark(Re),ge=Z().mark(je),he=Z().mark(Pe),ye=Z().mark(Te),_e=Z().mark(Ae),Oe=Z().mark(Ce),be=Z().mark(De),me=Z().mark(ke),Se=Z().mark(Ie);function xe(e){var t,r,n,a;return Z().wrap((function(c){for(;;)switch(c.prev=c.next){case 0:return t=e.payload,r=e.callback,n=e.resetSubmitting,c.prev=1,c.next=4,se(["auth/login"],t);case 4:return a=c.sent,pe(a.data.access_token),c.next=8,(0,M.gz)((0,fe.av)(a.data));case 8:r(),n(),c.next=17;break;case 12:return c.prev=12,c.t0=c.catch(1),c.next=16,(0,M.gz)(le(c.t0));case 16:n();case 17:case"end":return c.stop()}}),de,null,[[1,12]])}function we(){return Z().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,(0,M.gz)((0,fe.pn)());case 2:case"end":return e.stop()}}),ve)}function Re(e){var t,r,n,a,c,o;return Z().wrap((function(u){for(;;)switch(u.prev=u.next){case 0:return t=e.payload,r=e.callback,n=e.resetSubmitting,u.prev=1,a={"Content-Type":"application/x-www-form-urlencoded"},c=W().stringify({email:t.email,entity_name:t.entityName,entity_register_country:t.entityRegisterCountry,entity_register_number:t.entityRegisterNumber,entity_tax:t.entityTax,entity_type:t.entityType,first_name:t.firstName,last_name:t.lastName,password:t.password,pseudonym:t.pseudonym,telegram:t.telegram}),u.next=6,se(["auth/register-entity"],c,{headers:a});case 6:o=u.sent,pe(o.data.access_token),localStorage.setItem("USER_ID",o.data.user_id),r(),n(),u.next=18;break;case 13:return u.prev=13,u.t0=u.catch(1),u.next=17,(0,M.gz)(le(u.t0));case 17:n();case 18:case"end":return u.stop()}}),Ee,null,[[1,13]])}function je(e){var t,r,n,a,c,o;return Z().wrap((function(u){for(;;)switch(u.prev=u.next){case 0:return t=e.payload,r=e.callback,n=e.resetSubmitting,u.prev=1,a={"Content-Type":"application/x-www-form-urlencoded"},c=W().stringify({email:t.email,first_name:t.firstName,last_name:t.lastName,password:t.password,pseudonym:t.pseudonym,telegram:t.telegram}),u.next=6,se(["auth/register-individual"],c,{headers:a});case 6:return o=u.sent,pe(o.data.access_token),u.next=10,(0,M.gz)((0,fe.av)(o.data));case 10:r(),n(),u.next=19;break;case 14:return u.prev=14,u.t0=u.catch(1),u.next=18,(0,M.gz)(le(u.t0));case 18:n();case 19:case"end":return u.stop()}}),ge,null,[[1,14]])}function Pe(e){var t,r,n,a;return Z().wrap((function(c){for(;;)switch(c.prev=c.next){case 0:return t=e.payload,r=e.callback,n=e.resetSubmitting,c.prev=1,a={"Content-Type":"application/x-www-form-urlencoded"},c.next=5,se(["auth/send-reset-password"],W().stringify(t),{headers:a});case 5:r(),n(),c.next=14;break;case 9:return c.prev=9,c.t0=c.catch(1),c.next=13,(0,M.gz)(le(c.t0));case 13:n();case 14:case"end":return c.stop()}}),he,null,[[1,9]])}function Te(e){var t,r,n,a,c,o;return Z().wrap((function(u){for(;;)switch(u.prev=u.next){case 0:return t=e.payload,r=e.callback,n=e.resetSubmitting,u.prev=1,a=localStorage.getItem("ACCESS-TOKEN"),c={Authorization:"Bearer ".concat(a),"Content-Type":"application/x-www-form-urlencoded"},o=W().stringify({email:t.email}),u.next=7,se(["users/change-email"],o,{headers:c});case 7:r(),n(),u.next=16;break;case 11:return u.prev=11,u.t0=u.catch(1),u.next=15,(0,M.gz)(le(u.t0));case 15:n();case 16:case"end":return u.stop()}}),ye,null,[[1,11]])}function Ae(e){var t,r,n,a,c;return Z().wrap((function(o){for(;;)switch(o.prev=o.next){case 0:return t=e.payload,r=e.callback,n=e.resetSubmitting,o.prev=1,a={"Content-Type":"application/x-www-form-urlencoded"},c=W().stringify({code:t.code,email:t.email,password:t.password}),o.next=6,se(["auth/reset-password"],c,{headers:a});case 6:r(),n(),o.next=15;break;case 10:return o.prev=10,o.t0=o.catch(1),o.next=14,(0,M.gz)(le(o.t0));case 14:n();case 15:case"end":return o.stop()}}),_e,null,[[1,10]])}function Ce(e){var t,r,n,a,c;return Z().wrap((function(o){for(;;)switch(o.prev=o.next){case 0:return t=e.payload,r=e.callback,n=e.resetSubmitting,o.prev=1,a=localStorage.getItem("ACCESS-TOKEN"),c={Authorization:"Bearer ".concat(a)},o.next=6,se(["users/verify-email"],t,{headers:c});case 6:return o.next=8,(0,M.gz)((0,fe.Nq)({period:"onboarding"}));case 8:r(),n(),o.next=17;break;case 12:return o.prev=12,o.t0=o.catch(1),o.next=16,(0,M.gz)(le(o.t0));case 16:n();case 17:case"end":return o.stop()}}),Oe,null,[[1,12]])}function De(){var e,t;return Z().wrap((function(r){for(;;)switch(r.prev=r.next){case 0:return r.prev=0,e=localStorage.getItem("ACCESS-TOKEN"),t={Authorization:"Bearer ".concat(e)},r.next=5,se(["users/resend-verify-email"],null,{headers:t});case 5:r.next=11;break;case 7:return r.prev=7,r.t0=r.catch(0),r.next=11,(0,M.gz)(le(r.t0));case 11:case"end":return r.stop()}}),be,null,[[0,7]])}function ke(){var e,t;return Z().wrap((function(r){for(;;)switch(r.prev=r.next){case 0:return e={Authorization:"Bearer ".concat(localStorage.getItem("ACCESS-TOKEN"))},r.prev=1,r.next=4,ue(["users/profile"],{headers:e});case 4:return t=r.sent,r.next=7,(0,M.gz)((0,fe.av)(t.data));case 7:return r.next=9,(0,M.gz)((0,fe.$Y)(t.data));case 9:r.next=15;break;case 11:return r.prev=11,r.t0=r.catch(1),r.next=15,(0,M.gz)((0,fe.B0)(r.t0));case 15:case"end":return r.stop()}}),me,null,[[1,11]])}function Ie(){return Z().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,(0,M.$6)([(0,M.Fm)("LOGIN_APP",xe)]);case 2:return e.next=4,(0,M.$6)([(0,M.Fm)("LOGOUT_APP",we)]);case 4:return e.next=6,(0,M.$6)([(0,M.Fm)("REGISTER_ENTITY",Re)]);case 6:return e.next=8,(0,M.$6)([(0,M.Fm)("REGISTER_INDIVIDUAL",je)]);case 8:return e.next=10,(0,M.$6)([(0,M.Fm)("RESET_PASSWORD",Pe)]);case 10:return e.next=12,(0,M.$6)([(0,M.Fm)("UPDATE_EMAIL",Te)]);case 12:return e.next=14,(0,M.$6)([(0,M.Fm)("UPDATE_PASSWORD",Ae)]);case 14:return e.next=16,(0,M.$6)([(0,M.Fm)("VERIFY_EMAIL",Ce)]);case 16:return e.next=18,(0,M.$6)([(0,M.Fm)("RESEND_2FA_CODE",De)]);case 18:return e.next=20,(0,M.$6)([(0,M.Fm)("FETCH_USER_INFO",ke)]);case 20:case"end":return e.stop()}}),Se)}var Ne=Z().mark(Me),Fe=Z().mark($e),Ue=Z().mark(He),Le=Z().mark(Ke),ze=Z().mark(Ve),Be=Z().mark(Ye),Ge=Z().mark(We),Ze=Z().mark(qe);function Me(e){var t,r,n,a;return Z().wrap((function(c){for(;;)switch(c.prev=c.next){case 0:return t=e.callback,c.prev=1,r=localStorage.getItem("ACCESS-TOKEN"),n={Authorization:"Bearer ".concat(r),"Content-Type":"application/x-www-form-urlencoded"},c.next=6,se(["users/hellosign-request"],null,{headers:n});case 6:a=c.sent,t(a),c.next=14;break;case 10:return c.prev=10,c.t0=c.catch(1),c.next=14,(0,M.gz)(le(c.t0));case 14:case"end":return c.stop()}}),Ne,null,[[1,10]])}function $e(e){var t,r,n,a,c,o;return Z().wrap((function(u){for(;;)switch(u.prev=u.next){case 0:return t=e.payload,r=e.callback,n=e.isVerifying,u.prev=1,a=localStorage.getItem("ACCESS-TOKEN"),c={Authorization:"Bearer ".concat(a),"Content-Type":"application/x-www-form-urlencoded"},o=W().stringify({public_address:t.pubAddress}),u.next=7,se(["users/submit-public-address"],o,{headers:c});case 7:r(),n(),u.next=16;break;case 11:return u.prev=11,u.t0=u.catch(1),u.next=15,(0,M.gz)(le(u.t0));case 15:n();case 16:case"end":return u.stop()}}),Fe,null,[[1,11]])}function He(e){var t,r,n,a,c;return Z().wrap((function(o){for(;;)switch(o.prev=o.next){case 0:return t=e.payload,r=e.callback,o.prev=1,n=localStorage.getItem("ACCESS-TOKEN"),a={Authorization:"Bearer ".concat(n),"Content-Type":"application/x-www-form-urlencoded"},(c=new FormData).append("file",t.newFile),o.next=8,se(["users/verify-file-casper-signer"],c,{headers:a});case 8:r(),o.next=15;break;case 11:return o.prev=11,o.t0=o.catch(1),o.next=15,(0,M.gz)(le(o.t0));case 15:case"end":return o.stop()}}),Ue,null,[[1,11]])}function Ke(){var e,t;return Z().wrap((function(r){for(;;)switch(r.prev=r.next){case 0:return r.prev=0,e=localStorage.getItem("ACCESS-TOKEN"),t={Authorization:"Bearer ".concat(e),"Content-Type":"application/x-www-form-urlencoded"},r.next=5,ue(["users/message-content"],{headers:t});case 5:r.next=11;break;case 7:return r.prev=7,r.t0=r.catch(0),r.next=11,(0,M.gz)(le(r.t0));case 11:case"end":return r.stop()}}),Le,null,[[0,7]])}function Ve(e){var t,r,n,a;return Z().wrap((function(c){for(;;)switch(c.prev=c.next){case 0:return t=e.payload,r=e.resolve,c.prev=1,n=localStorage.getItem("ACCESS-TOKEN"),a={Authorization:"Bearer ".concat(n)},c.next=6,se(["users/submit-kyc"],t,{headers:a});case 6:r(),c.next=13;break;case 9:return c.prev=9,c.t0=c.catch(1),c.next=13,(0,M.gz)(le(c.t0));case 13:case"end":return c.stop()}}),ze,null,[[1,9]])}function Ye(e){var t,r,n;return Z().wrap((function(a){for(;;)switch(a.prev=a.next){case 0:return t=e.payload,a.prev=1,r=localStorage.getItem("ACCESS-TOKEN"),n={Authorization:"Bearer ".concat(r)},a.next=6,se(["users/shuftipro-temp"],t,{headers:n});case 6:a.next=12;break;case 8:return a.prev=8,a.t0=a.catch(1),a.next=12,(0,M.gz)(le(a.t0));case 12:case"end":return a.stop()}}),Be,null,[[1,8]])}function We(e){var t,r,n,a;return Z().wrap((function(c){for(;;)switch(c.prev=c.next){case 0:return t=e.payload,r=e.resolve,c.prev=1,n=localStorage.getItem("ACCESS-TOKEN"),a={Authorization:"Bearer ".concat(n)},c.next=6,ie(["users/shuftipro-temp"],t,{headers:a});case 6:r(),c.next=13;break;case 9:return c.prev=9,c.t0=c.catch(1),c.next=13,(0,M.gz)(le(c.t0));case 13:case"end":return c.stop()}}),Ge,null,[[1,9]])}function qe(){return Z().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,(0,M.$6)([(0,M.Fm)("HELLO_SIGN_REQUEST",Me)]);case 2:return e.next=4,(0,M.$6)([(0,M.Fm)("SUBMIT_PUBLIC_ADDRESS",$e)]);case 4:return e.next=6,(0,M.$6)([(0,M.Fm)("VERIFY_FILE_CASPER_SIGNER",He)]);case 6:return e.next=8,(0,M.$6)([(0,M.Fm)("HANDLE_VIEW_GUIDE",Ke)]);case 8:return e.next=10,(0,M.$6)([(0,M.Fm)("SUBMIT_KYC",Ve)]);case 10:return e.next=12,(0,M.$6)([(0,M.Fm)("SAVE_SHUFTI",Ye)]);case 12:return e.next=14,(0,M.$6)([(0,M.Fm)("UPDATE_SHUFTI",We)]);case 14:case"end":return e.stop()}}),Ze)}var Qe=r(7028),Xe=Z().mark(tt),Je=Z().mark(rt),et=Z().mark(nt);function tt(e){var t,r,n;return Z().wrap((function(a){for(;;)switch(a.prev=a.next){case 0:return a.prev=0,t=localStorage.getItem("ACCESS-TOKEN"),r={Authorization:"Bearer ".concat(t)},a.next=5,ue(["admin/users?limit=".concat(e.payload.limit)],{headers:r});case 5:return n=a.sent,a.next=8,(0,M.gz)((0,Qe.yW)(n.data));case 8:a.next=14;break;case 10:return a.prev=10,a.t0=a.catch(0),a.next=14,(0,M.gz)(le(a.t0));case 14:case"end":return a.stop()}}),Xe,null,[[0,10]])}function rt(e){var t,r,n;return Z().wrap((function(a){for(;;)switch(a.prev=a.next){case 0:return a.prev=0,t=localStorage.getItem("ACCESS-TOKEN"),r={Authorization:"Bearer ".concat(t)},a.next=5,ue(["admin/users/".concat(e.payload)],{headers:r});case 5:return n=a.sent,a.next=8,(0,M.gz)((0,Qe.FH)(n.data));case 8:a.next=14;break;case 10:return a.prev=10,a.t0=a.catch(0),a.next=14,(0,M.gz)(le(a.t0));case 14:case"end":return a.stop()}}),Je,null,[[0,10]])}function nt(){return Z().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,(0,M.$6)([(0,M.Fm)("GET_LIST_MEMBER",tt)]);case 2:return e.next=4,(0,M.$6)([(0,M.Fm)("GET_USER_DETAIL",rt)]);case 4:case"end":return e.stop()}}),et)}var at=Z().mark(ct);function ct(){return Z().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,(0,M.$6)([V(),Ie(),qe(),nt()]);case 2:case"end":return e.stop()}}),at)}var ot=r(4478);function ut(){var e=(0,l.v9)((function(e){return e.apiControllerReducer})),t=(0,ot.R)().setDialog,r=(0,l.I0)();return(0,c.useEffect)((function(){var n,a,c;null!==e&&void 0!==e&&e.hasError&&(422===(null===e||void 0===e?void 0:e.statusError)?t({type:"Dialog",data:{title:"Error",content:Object.values(null===e||void 0===e||null===(n=e.response)||void 0===n||null===(a=n.data)||void 0===a?void 0:a.errors)[0]},afterClosed:function(){r({type:"CLEAR_API_RESPONSE_ERROR"})}}):t({type:"Dialog",data:{title:"Error",content:null===e||void 0===e||null===(c=e.response)||void 0===c?void 0:c.message},afterClosed:function(){r({type:"CLEAR_API_RESPONSE_ERROR"})}}))}),[e]),(0,a.jsx)(a.Fragment,{})}function st(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function it(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?st(Object(r),!0).forEach((function(t){(0,n.Z)(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):st(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}var lt=(0,u.ZP)(),pt=(0,s.MT)(B,(0,s.md)(lt,i.logger));lt.run(ct);var ft=function(e){var t=(0,l.I0)(),r=(0,l.v9)((function(e){return e.authReducer.fetchUserInfo}));return(0,c.useEffect)((function(){console.log("app init"),t((0,fe.CS)())}),[]),r.process>1&&(0,a.jsx)(a.Fragment,{children:e.children})};var dt=function(e){var t=e.Component,r=e.pageProps;return(0,a.jsx)(l.zt,{store:pt,children:(0,a.jsxs)(ot.T,{children:[(0,a.jsxs)(o.default,{children:[(0,a.jsx)("title",{children:"Casper Association Portal"}),(0,a.jsx)("link",{rel:"icon",href:"/favicon.ico"}),(0,a.jsx)("meta",{name:"description",content:"Casper Association Portal"}),(0,a.jsx)("meta",{name:"viewport",content:"width=device-width, initial-scale=1, user-scalable=no"})]}),(0,a.jsx)(ft,{children:(0,a.jsx)(t,it({},r))}),(0,a.jsx)(ut,{})]})})}},7028:function(e,t,r){"use strict";r.d(t,{lL:function(){return n},yW:function(){return a},nE:function(){return c},FH:function(){return o}});var n=function(e){return{type:"GET_LIST_MEMBER",payload:e}},a=function(e){return{type:"GET_LIST_MEMBER_SUCCESS",payload:e}},c=function(e){return{type:"GET_USER_DETAIL",payload:e}},o=function(e){return{type:"GET_USER_DETAIL_SUCCESS",payload:e}}},3022:function(e,t,r){"use strict";r.d(t,{q0:function(){return n},Rg:function(){return a},uB:function(){return c},xv:function(){return o},c0:function(){return u},s:function(){return s},gQ:function(){return i},lm:function(){return l},D:function(){return p},CS:function(){return f},$Y:function(){return d},B0:function(){return v},av:function(){return E},Nq:function(){return g},pn:function(){return h}});var n=function(e,t,r){return{type:"LOGIN_APP",callback:t,payload:e,resetSubmitting:r}},a=function(){return{type:"LOGOUT_APP"}},c=function(e,t,r){return{type:"REGISTER_ENTITY",callback:t,payload:e,resetSubmitting:r}},o=function(e,t,r){return{type:"REGISTER_INDIVIDUAL",callback:t,payload:e,resetSubmitting:r}},u=function(e,t,r){return{type:"RESET_PASSWORD",callback:t,payload:e,resetSubmitting:r}},s=function(e,t,r){return{type:"UPDATE_EMAIL",callback:t,payload:e,resetSubmitting:r}},i=function(e,t,r){return{type:"UPDATE_PASSWORD",callback:t,payload:e,resetSubmitting:r}},l=function(e,t,r){return{type:"VERIFY_EMAIL",callback:t,payload:e,resetSubmitting:r}},p=function(){return{type:"RESEND_2FA_CODE"}},f=function(){return{type:"FETCH_USER_INFO"}},d=function(e){return{type:"FETCH_USER_INFO_SUCCESS",payload:e}},v=function(e){return{type:"FETCH_USER_INFO_ERROR",payload:e}},E=function(e){return{type:"SET_USER_INFO",payload:e}},g=function(e){return{type:"UPDATE_USER_INFO",payload:e}},h=function(){return{type:"CLEAR_USER_INFO"}}},1780:function(e,t,r){(window.__NEXT_P=window.__NEXT_P||[]).push(["/_app",function(){return r(7207)}])},5197:function(){},997:function(){},5627:function(){},6677:function(){},5538:function(){},4453:function(){},4654:function(){}},function(e){var t=function(t){return e(e.s=t)};e.O(0,[774,282,319,669,983],(function(){return t(1780),t(2441)}));var r=e.O();_N_E=r}]);