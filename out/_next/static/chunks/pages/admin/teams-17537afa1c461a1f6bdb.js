(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[4382],{6610:function(t,e,n){"use strict";function i(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}n.d(e,{Z:function(){return i}})},5991:function(t,e,n){"use strict";function i(t,e){for(var n=0;n<e.length;n++){var i=e[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(t,i.key,i)}}function o(t,e,n){return e&&i(t.prototype,e),n&&i(t,n),t}n.d(e,{Z:function(){return o}})},24015:function(t,e,n){"use strict";n.d(e,{a:function(){return u}});var i=n(96156),o=n(85893),s=n(67294),r=n(11163),a=n(49226);var l=n(44791);function c(t,e){var n=Object.keys(t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(t);e&&(i=i.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),n.push.apply(n,i)}return n}var u=function(t,e){return function(n){var u=function(){var t=(arguments.length>0&&void 0!==arguments[0]?arguments[0]:{}).urlType,e=void 0===t?"public":t,n=(0,a.v9)((function(t){return t.authReducer.userInfo}));return(0,s.useEffect)((function(){if("public"!==e&&e&&n)if(n&&null!==n&&void 0!==n&&n.isLoggedIn)if("member"===n.role){if("auth"===e)return"verifying"===n.period&&r.default.push("/verify-email"),"onboarding"===n.period&&r.default.push("/onboard"),void("final"===n.period&&r.default.push("/dashboard"));if("verifying"===e)return"onboarding"===n.period&&r.default.push("/onboard"),void("final"===n.period&&r.default.push("/dashboard"));if("onboarding"===e)return"verifying"===n.period&&r.default.push("/verify-email"),void("final"===n.period&&r.default.push("/dashboard"));if("final-member"===e||"final-all"===e)return"verifying"===n.period&&r.default.push("/verify-email"),void("onboarding"===n.period&&r.default.push("/onboard"));"final-admin"===e&&("verifying"===n.period&&r.default.push("/verify-email"),"onboarding"===n.period&&r.default.push("/onboard"),"final"===n.period&&r.default.push("/dashboard"))}else"admin"===n.role&&"final-all"!==e&&"final-admin"!==e&&r.default.push("/admin/dashboard");else"auth"!==e&&r.default.push("/login")}),[n,e]),{user:n}}({urlType:e}).user;if(e&&"public"!==e){if(!u)return(0,o.jsx)(l.Z,{});if("auth"===e&&u.isLoggedIn)return(0,o.jsx)(l.Z,{});if("auth"!==e&&!u.isLoggedIn)return(0,o.jsx)(l.Z,{});if("member"===u.role){if(["final-all","final-member"].includes(e)&&"final"!==u.period)return(0,o.jsx)(l.Z,{});if(["verifying"].includes(e)&&"verifying"!==u.period)return(0,o.jsx)(l.Z,{});if(["onboarding"].includes(e)&&"onboarding"!==u.period)return(0,o.jsx)(l.Z,{})}if("admin"===u.role&&["verifying","onboarding","final-member"].includes(e))return(0,o.jsx)(l.Z,{})}return(0,o.jsx)(t,function(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{};e%2?c(Object(n),!0).forEach((function(e){(0,i.Z)(t,e,n[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(n)):c(Object(n)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(n,e))}))}return t}({},n))}}},44791:function(t,e,n){"use strict";var i=n(85893),o=n(733),s=n.n(o);e.Z=function(){return(0,i.jsxs)("div",{className:"fixed inset-0 flex items-center justify-center z-40",children:[(0,i.jsx)("div",{className:"fixed inset-0 bg-white opacity-40"}),(0,i.jsx)(s(),{className:"z-50",type:"spinningBubbles",color:"#FF473E",width:100,height:100})]})}},4478:function(t,e,n){"use strict";n.d(e,{T:function(){return h},R:function(){return u}});var i=n(96156),o=n(85893),s=n(67294),r=n(73935);function a(t,e){var n=Object.keys(t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(t);e&&(i=i.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),n.push.apply(n,i)}return n}function l(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{};e%2?a(Object(n),!0).forEach((function(e){(0,i.Z)(t,e,n[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(n)):a(Object(n)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(n,e))}))}return t}var c=s.createContext({setDialog:function(t){return t}}),u=function(){var t=s.useContext(c);if(!t)throw new Error("useDialog must be used within a DialogProvider");return t},d=function(t){var e,n=t.dialog,a=t.onClosed,l=n.settings?n.settings:{},c=(0,s.useState)(n.defaultValue||""),u=c[0],d=c[1],h=function(t){a(),n.afterClosed&&("DialogPrompt"===n.type?t&&n.afterClosed(u):n.afterClosed(t))};return(0,r.createPortal)((0,o.jsxs)("div",{className:"w-screen h-screen justify-center items-center flex fixed inset-0 ".concat(null!==l&&void 0!==l&&l.zIndex?"z-".concat(null===l||void 0===l?void 0:l.zIndex):""),children:[(0,o.jsx)("div",{onClick:function(){return h(!1)},className:"backdrop-filter backdrop-blur-sm fixed inset-0 z-40"}),(0,o.jsxs)("div",{className:"".concat(l.className||""," w-full max-w-2xl shadow-2xl mx-4 relative bg-white z-50"),style:l.style,children:["Dialog"===n.type&&(0,o.jsxs)("div",{children:[(0,o.jsxs)("div",{children:[(0,o.jsx)("p",{className:"text-4xl text-center pt-4",children:n.data.title}),(0,o.jsx)("a",{onClick:function(){return h(!1)},children:(0,o.jsx)("img",{src:"/images/ic_decline.svg",className:"absolute right-4 top-4",alt:"Cancel"})}),(0,o.jsx)("div",{className:"h-full w-full pt-16 pb-36 flex flex-col items-center justify-between border-gray",children:(0,o.jsx)("div",{className:"h-full w-full flex flex-col items-center justify-between",children:n.data.content})})]}),!l.hideButton&&(0,o.jsx)("button",{type:"button",className:"transform -translate-x-1/2 absolute left-1/2 bottom-6 text-lg text-white w-1/2 lg:w-1/2 h-16 rounded-full bg-primary hover:opacity-40 focus:outline-none shadow-md",onClick:function(){return h(!1)},children:"OK"})]}),"DialogConfirm"===n.type&&(0,o.jsxs)("div",{className:"p-16",children:[n.data.title&&(0,o.jsx)("h3",{className:"text-4xl text-center mb-6",children:n.data.title}),(0,o.jsx)("div",{className:"h-full w-full flex mb-6 flex-col items-center justify-between border-gray",children:(0,o.jsx)("div",{className:"h-full w-full flex flex-col items-center justify-between",children:n.data.content})}),(0,o.jsxs)("div",{className:"flex flex-row justify-center",children:[(0,o.jsx)("button",{type:"button",className:"mx-2 bottom-6 text-lg text-white w-1/2 h-11 rounded-full bg-primary hover:opacity-40 focus:outline-none shadow-md",onClick:function(){return h(!1)},children:n.data.cancel}),(0,o.jsx)("button",{type:"button",className:"mx-2 bottom-6 text-lg text-white w-1/2 h-11 rounded-full bg-primary hover:opacity-40 focus:outline-none shadow-md",onClick:function(){return h(!0)},children:n.data.ok})]})]}),"DialogPrompt"===n.type&&(0,o.jsxs)("div",{className:"border border-gray",children:[(0,o.jsxs)("div",{children:[(0,o.jsx)("p",{className:"text-2xl text-center m-20",children:n.data.title}),(0,o.jsx)("div",{className:"mx-20",children:(0,o.jsx)("input",{type:"text",className:"w-full h-16 text-xl px-4 shadow-md focus:outline-none",placeholder:"Email",value:u,onChange:function(t){d(t.target.value)},name:"email"})})]}),(0,o.jsxs)("div",{className:"flex flex-row justify-center m-20",children:[(0,o.jsx)("button",(e={type:"button",className:"mx-2 bottom-6 text-lg text-white w-1/2 h-11 rounded-full bg-primary hover:opacity-40 focus:outline-none shadow-md"},(0,i.Z)(e,"className","mx-2 bottom-6 text-lg text-white w-1/4 h-11 rounded-full bg-primary hover:opacity-40 focus:outline-none shadow-md"),(0,i.Z)(e,"onClick",(function(){return h(!0)})),(0,i.Z)(e,"children",n.data.ok),e)),(0,o.jsx)("button",{type:"button",className:"mx-2 bottom-6 text-lg text-white w-1/4 h-11 rounded-full bg-primary hover:opacity-40 focus:outline-none shadow-md",onClick:function(){return h(!1)},children:n.data.cancel})]})]}),"DialogCustom"===n.type&&(0,o.jsx)("div",{className:"rounded-xl",children:n.data.content}),"Notification"===n.type&&(0,o.jsxs)("div",{className:"p-16",children:[n.data.title&&(0,o.jsx)("h3",{className:"text-4xl text-center mb-6",children:n.data.title}),(0,o.jsx)("a",{onClick:function(){return h(!1)},children:(0,o.jsx)("img",{src:"/images/ic_decline.svg",className:"absolute right-6 top-6",alt:"Cancel"})}),(0,o.jsx)("div",{className:"h-full w-full flex mb-6 flex-col items-center justify-between border-gray",children:(0,o.jsx)("div",{className:"h-full w-full flex flex-col items-center justify-between",children:n.data.content})}),(0,o.jsx)("div",{className:"flex flex-row justify-center",children:n.data.ok&&(0,o.jsx)("button",{type:"button",className:"mx-2 bottom-6 text-lg text-white w-1/2 h-11 rounded-full bg-primary hover:opacity-40 focus:outline-none shadow-md",onClick:function(){window.open(n.data.link,"_blank"),h(!0)},children:n.data.ok})})]})]})]}),document.body)},h=function(t){var e=(0,s.useState)(null),n=e[0],i=e[1],r=(0,s.useCallback)((function(){i(null)}),[i]);return(0,o.jsxs)(c.Provider,l(l({value:{dialog:n,onClosed:r,setDialog:i}},t),{},{children:[t.children,n&&(0,o.jsx)(d,{dialog:n,onClosed:r})]}))}},77001:function(t,e,n){"use strict";n.d(e,{s:function(){return c}});var i=n(6610),o=n(5991),s=n(96156),r=n(9669),a=n.n(r);function l(t){var e;if("string"!==typeof t[t.length-1]){e=t.pop();var n=t.join("/");return Object.keys(e).forEach((function(t){n=n.replace(":".concat(t),e[t])})),n}return t.join("/")}var c=function(){function t(){(0,i.Z)(this,t),(0,s.Z)(this,"axiosInstance",void 0),this.axiosInstance=a().create({baseURL:"".concat("https://backend.caspermember.com","/api/v1/"),headers:{"Content-Type":"application/json"}}),this.axiosInstance.interceptors.request.use((function(t){var e=localStorage.getItem("ACCESS-TOKEN");return e&&(t.headers.Authorization="Bearer ".concat(e)),t}))}return(0,o.Z)(t,[{key:"doGet",value:function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};return this.axiosInstance.get(l(t),e)}},{key:"doPost",value:function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{};return this.axiosInstance.post(l(t),e,n)}},{key:"doPut",value:function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{};return this.axiosInstance.put(l(t),e,n)}},{key:"doDelete",value:function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{};return this.axiosInstance.delete(l(t),e,n)}}]),t}()},65500:function(t,e,n){"use strict";n.r(e);var i=n(87757),o=n.n(i),s=n(92137),r=n(85893),a=n(87329),l=n(67294),c=n(59936),u=n(24015),d=n(25955),h=n(89),f=n(4478),p=n(77001),m=n(29586),x=new p.s;e.default=(0,u.a)((function(){var t=(0,f.R)().setDialog,e=(0,l.useState)([]),n=e[0],i=e[1],u=function(t){t&&x.doPost(["admin/teams/invite"],{email:t}).then((function(t){var e=t.data.data;i([].concat((0,a.Z)(n),[e.invited_admin]))})).catch((function(t){return console.log(t)}))},p=function(t,e,o){var s=n.findIndex((function(e){return e.id===t}));n[s].permission[e]=o,x.doPost(["admin/teams/".concat(t,"/change-permissions")],{permission:n[s].permission}).then((function(t){200===t.data.code&&i((0,a.Z)(n))}))};return(0,l.useEffect)((function(){x.doGet(["admin/teams"]).then((function(t){var e=t.data.data;i(e)})).catch((function(t){return console.log(t)}))}),[]),(0,r.jsx)(d.Z,{children:(0,r.jsx)(h.Zb,{className:"h-full px-24 py-14",children:(0,r.jsxs)("div",{className:"bg-transparent h-full",children:[(0,r.jsx)("div",{className:"w-full",children:(0,r.jsxs)("div",{className:"lg:h-70px flex flex-col justify-center",children:[(0,r.jsx)("h3",{className:"text-dark2 text-xl lg:pr-32 font-medium mb-3.5",children:"Team Management"}),(0,r.jsx)("div",{className:"border-primary border-b-2"})]})}),(0,r.jsxs)("div",{className:"flex items-center justify-between",children:[(0,r.jsx)("h4",{className:"text-dark2 text-lg lg:pr-32 font-medium mb-4",children:"Admins"}),(0,r.jsx)("button",{type:"button",className:"transition text-lg text-white w-full lg:w-56 h-12 rounded-full bg-primary hover:opacity-40 disabled:opacity-40 disabled:cursor-not-allowed focus:outline-none shadow-md",onClick:function(){t({type:"DialogPrompt",data:{title:"Enter the email address of the person you would like\n                 too invite to be come an admin",ok:"Invite",cancel:"Cancel"},afterClosed:u})},children:"+ New Admin"})]}),(0,r.jsx)("div",{className:"flex flex-col h-full",children:(0,r.jsxs)("div",{className:"flex flex-col lg:pt-6 h-full",children:[(0,r.jsxs)("div",{className:"flex w-full",children:[(0,r.jsx)("p",{className:"w-1/12 text-base font-medium",children:"Added Date"}),(0,r.jsx)("p",{className:"w-1/12 text-base font-medium",children:"Status"}),(0,r.jsx)("p",{className:"w-1/12 text-base font-medium",children:"Email"}),(0,r.jsx)("p",{className:"w-1/12 text-base font-medium",children:"Last Login"}),(0,r.jsx)("p",{className:"w-1/12 text-base font-medium",children:"IP"}),(0,r.jsx)("p",{className:"w-1/12 text-base font-medium",children:"Intake"}),(0,r.jsx)("p",{className:"w-1/12 text-base font-medium",children:"Users"}),(0,r.jsx)("p",{className:"w-1/12 text-base font-medium",children:"Ballots"}),(0,r.jsx)("p",{className:"w-1/12 text-base font-medium",children:"Perks"}),(0,r.jsx)("p",{className:"w-1/4 text-base font-medium",children:"Admin Action"})]}),(0,r.jsx)("div",{className:"flex flex-col w-full h-4/5 mt-5 overflow-y-scroll",children:n.map((function(t){return(0,r.jsxs)("div",{className:"flex items-center lg:flex-row w-full py-2.5 border-b border-gray",children:[(0,r.jsx)("p",{className:"text-sm w-full lg:w-1/12",children:(0,m.p)(t.created_at)}),(0,r.jsxs)("div",{className:"text-sm w-full lg:w-1/12",children:[(0,r.jsx)("div",{children:t.type}),"invited"===t.type&&(0,r.jsx)("button",{type:"button",className:"inline-flex text-xs text-primary underline",onClick:function(){var t=(0,s.Z)(o().mark((function t(e){return o().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:e.preventDefault();case 1:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}(),children:"Resend Link"})]}),(0,r.jsx)("p",{className:"text-sm w-full lg:w-1/12 text-break",children:t.email}),(0,r.jsxs)("p",{className:"text-sm w-full lg:w-1/12",children:["21/06/2021",(0,r.jsx)("br",{}),"2:15PM"]}),(0,r.jsx)("p",{className:"text-sm w-full lg:w-1/12",children:"255.255.255.255"}),(0,r.jsx)("div",{className:"text-sm w-full lg:w-1/12",children:(0,r.jsx)(c.default,{onChange:function(e){return p(t.id,"intake",e)},checked:t.permission.intake,checkedIcon:null,uncheckedIcon:null,offColor:"#bbb",onColor:"#ff474e",height:18,width:40})}),(0,r.jsx)("div",{className:"text-sm w-full lg:w-1/12",children:(0,r.jsx)(c.default,{onChange:function(e){return p(t.id,"users",e)},checked:t.permission.users,checkedIcon:null,uncheckedIcon:null,offColor:"#bbb",onColor:"#ff474e",height:18,width:40})}),(0,r.jsx)("div",{className:"text-sm w-full lg:w-1/12",children:(0,r.jsx)(c.default,{onChange:function(e){return p(t.id,"ballots",e)},checked:t.permission.ballots,checkedIcon:null,uncheckedIcon:null,offColor:"#bbb",onColor:"#ff474e",height:18,width:40})}),(0,r.jsx)("div",{className:"text-sm w-full lg:w-1/12",children:(0,r.jsx)(c.default,{onChange:function(e){return p(t.id,"perks",e)},checked:t.permission.perks,checkedIcon:null,uncheckedIcon:null,offColor:"#bbb",onColor:"#ff474e",height:18,width:40})}),(0,r.jsxs)("p",{className:"text-sm w-full lg:w-1/4",children:[(0,r.jsx)("button",{type:"button",className:"text-md text-primary px-4 py-1 rounded-full border-primary border-2 mr-2 bg-white shadow-md focus:outline-none hover:opacity-40",children:"Reset Password"}),(0,r.jsx)("button",{type:"button",className:"text-md text-white px-4 py-1 rounded-full bg-primary border-primary border-2 shadow-md focus:outline-none hover:opacity-40",onClick:function(){var e;e=t,x.doDelete(["admin/teams/".concat(e.id,"/revoke")],{}).then((function(t){if(200===t.data.code){var o=n.findIndex((function(t){return t.id===e.id}));n[o].type="revoked",o>=0&&i((0,a.Z)(n))}})).catch((function(t){return console.log(t)}))},children:"Revoke"})]})]},"admin-team-".concat(t.id))}))})]})})]})})})}),"final-admin")},29586:function(t,e,n){"use strict";n.d(e,{p:function(){return o},e:function(){return s}});var i=n(38661),o=function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"dd/MM/yyyy",n=new Date(t);return"Invalid Date"===n.toString()?n.toString():(0,i.Z)(n,e)},s=function(t){return t?"".concat(t.substr(0,10),"...").concat(t.substr(-4)):"-"}},13470:function(t,e,n){(window.__NEXT_P=window.__NEXT_P||[]).push(["/admin/teams",function(){return n(65500)}])},83231:function(t,e,n){var i=n(67294);function o(){return(o=Object.assign||function(t){for(var e=1;e<arguments.length;e++){var n=arguments[e];for(var i in n)Object.prototype.hasOwnProperty.call(n,i)&&(t[i]=n[i])}return t}).apply(this,arguments)}var s=i.createElement("svg",{viewBox:"-2 -5 14 20",height:"100%",width:"100%",style:{position:"absolute",top:0}},i.createElement("path",{d:"M9.9 2.12L7.78 0 4.95 2.828 2.12 0 0 2.12l2.83 2.83L0 7.776 2.123 9.9 4.95 7.07 7.78 9.9 9.9 7.776 7.072 4.95 9.9 2.12",fill:"#fff",fillRule:"evenodd"})),r=i.createElement("svg",{height:"100%",width:"100%",viewBox:"-2 -5 17 21",style:{position:"absolute",top:0}},i.createElement("path",{d:"M11.264 0L5.26 6.004 2.103 2.847 0 4.95l5.26 5.26 8.108-8.107L11.264 0",fill:"#fff",fillRule:"evenodd"}));function a(t){if(7===t.length)return t;for(var e="#",n=1;n<4;n+=1)e+=t[n]+t[n];return e}function l(t,e,n,i,o){return function(t,e,n,i,o){var s=(t-n)/(e-n);if(0===s)return i;if(1===s)return o;for(var r="#",a=1;a<6;a+=2){var l=parseInt(i.substr(a,2),16),c=parseInt(o.substr(a,2),16),u=Math.round((1-s)*l+s*c).toString(16);1===u.length&&(u="0"+u),r+=u}return r}(t,e,n,a(i),a(o))}var c=function(t){function e(e){t.call(this,e);var n=e.height,i=e.width,o=e.checked;this.t=e.handleDiameter||n-2,this.i=Math.max(i-n,i-(n+this.t)/2),this.o=Math.max(0,(n-this.t)/2),this.state={h:o?this.i:this.o},this.l=0,this.u=0,this.p=this.p.bind(this),this.v=this.v.bind(this),this.g=this.g.bind(this),this.k=this.k.bind(this),this.M=this.M.bind(this),this.m=this.m.bind(this),this.T=this.T.bind(this),this.$=this.$.bind(this),this.C=this.C.bind(this),this.D=this.D.bind(this),this.O=this.O.bind(this),this.S=this.S.bind(this)}return t&&(e.__proto__=t),(e.prototype=Object.create(t&&t.prototype)).constructor=e,e.prototype.componentDidMount=function(){this.W=!0},e.prototype.componentDidUpdate=function(t){t.checked!==this.props.checked&&this.setState({h:this.props.checked?this.i:this.o})},e.prototype.componentWillUnmount=function(){this.W=!1},e.prototype.I=function(t){this.H.focus(),this.setState({R:t,j:!0,B:Date.now()})},e.prototype.L=function(t){var e=this.state,n=e.R,i=e.h,o=(this.props.checked?this.i:this.o)+t-n;e.N||t===n||this.setState({N:!0});var s=Math.min(this.i,Math.max(this.o,o));s!==i&&this.setState({h:s})},e.prototype.U=function(t){var e=this.state,n=e.h,i=e.N,o=e.B,s=this.props.checked,r=(this.i+this.o)/2;this.setState({h:this.props.checked?this.i:this.o});var a=Date.now()-o;(!i||a<250||s&&n<=r||!s&&n>=r)&&this.A(t),this.W&&this.setState({N:!1,j:!1}),this.l=Date.now()},e.prototype.p=function(t){t.preventDefault(),"number"==typeof t.button&&0!==t.button||(this.I(t.clientX),window.addEventListener("mousemove",this.v),window.addEventListener("mouseup",this.g))},e.prototype.v=function(t){t.preventDefault(),this.L(t.clientX)},e.prototype.g=function(t){this.U(t),window.removeEventListener("mousemove",this.v),window.removeEventListener("mouseup",this.g)},e.prototype.k=function(t){this.X=null,this.I(t.touches[0].clientX)},e.prototype.M=function(t){this.L(t.touches[0].clientX)},e.prototype.m=function(t){t.preventDefault(),this.U(t)},e.prototype.$=function(t){Date.now()-this.l>50&&(this.A(t),Date.now()-this.u>50&&this.W&&this.setState({j:!1}))},e.prototype.C=function(){this.u=Date.now()},e.prototype.D=function(){this.setState({j:!0})},e.prototype.O=function(){this.setState({j:!1})},e.prototype.S=function(t){this.H=t},e.prototype.T=function(t){t.preventDefault(),this.H.focus(),this.A(t),this.W&&this.setState({j:!1})},e.prototype.A=function(t){var e=this.props;(0,e.onChange)(!e.checked,t,e.id)},e.prototype.render=function(){var t=this.props,e=t.checked,n=t.disabled,s=t.className,r=t.offColor,a=t.onColor,c=t.offHandleColor,u=t.onHandleColor,d=t.checkedIcon,h=t.uncheckedIcon,f=t.checkedHandleIcon,p=t.uncheckedHandleIcon,m=t.boxShadow,x=t.activeBoxShadow,b=t.height,v=t.width,y=t.borderRadius,g=function(t,e){var n={};for(var i in t)Object.prototype.hasOwnProperty.call(t,i)&&-1===e.indexOf(i)&&(n[i]=t[i]);return n}(t,["checked","disabled","className","offColor","onColor","offHandleColor","onHandleColor","checkedIcon","uncheckedIcon","checkedHandleIcon","uncheckedHandleIcon","boxShadow","activeBoxShadow","height","width","borderRadius","handleDiameter"]),w=this.state,j=w.h,k=w.N,N=w.j,C={position:"relative",display:"inline-block",textAlign:"left",opacity:n?.5:1,direction:"ltr",borderRadius:b/2,WebkitTransition:"opacity 0.25s",MozTransition:"opacity 0.25s",transition:"opacity 0.25s",touchAction:"none",WebkitTapHighlightColor:"rgba(0, 0, 0, 0)",WebkitUserSelect:"none",MozUserSelect:"none",msUserSelect:"none",userSelect:"none"},O={height:b,width:v,margin:Math.max(0,(this.t-b)/2),position:"relative",background:l(j,this.i,this.o,r,a),borderRadius:"number"==typeof y?y:b/2,cursor:n?"default":"pointer",WebkitTransition:k?null:"background 0.25s",MozTransition:k?null:"background 0.25s",transition:k?null:"background 0.25s"},D={height:b,width:Math.min(1.5*b,v-(this.t+b)/2+1),position:"relative",opacity:(j-this.o)/(this.i-this.o),pointerEvents:"none",WebkitTransition:k?null:"opacity 0.25s",MozTransition:k?null:"opacity 0.25s",transition:k?null:"opacity 0.25s"},I={height:b,width:Math.min(1.5*b,v-(this.t+b)/2+1),position:"absolute",opacity:1-(j-this.o)/(this.i-this.o),right:0,top:0,pointerEvents:"none",WebkitTransition:k?null:"opacity 0.25s",MozTransition:k?null:"opacity 0.25s",transition:k?null:"opacity 0.25s"},E={height:this.t,width:this.t,background:l(j,this.i,this.o,c,u),display:"inline-block",cursor:n?"default":"pointer",borderRadius:"number"==typeof y?y-1:"50%",position:"absolute",transform:"translateX("+j+"px)",top:Math.max(0,(b-this.t)/2),outline:0,boxShadow:N?x:m,border:0,WebkitTransition:k?null:"background-color 0.25s, transform 0.25s, box-shadow 0.15s",MozTransition:k?null:"background-color 0.25s, transform 0.25s, box-shadow 0.15s",transition:k?null:"background-color 0.25s, transform 0.25s, box-shadow 0.15s"},S={height:this.t,width:this.t,opacity:Math.max(2*(1-(j-this.o)/(this.i-this.o)-.5),0),position:"absolute",left:0,top:0,pointerEvents:"none",WebkitTransition:k?null:"opacity 0.25s",MozTransition:k?null:"opacity 0.25s",transition:k?null:"opacity 0.25s"},P={height:this.t,width:this.t,opacity:Math.max(2*((j-this.o)/(this.i-this.o)-.5),0),position:"absolute",left:0,top:0,pointerEvents:"none",WebkitTransition:k?null:"opacity 0.25s",MozTransition:k?null:"opacity 0.25s",transition:k?null:"opacity 0.25s"};return i.createElement("div",{className:s,style:C},i.createElement("div",{className:"react-switch-bg",style:O,onClick:n?null:this.T,onMouseDown:function(t){return t.preventDefault()}},d&&i.createElement("div",{style:D},d),h&&i.createElement("div",{style:I},h)),i.createElement("div",{className:"react-switch-handle",style:E,onClick:function(t){return t.preventDefault()},onMouseDown:n?null:this.p,onTouchStart:n?null:this.k,onTouchMove:n?null:this.M,onTouchEnd:n?null:this.m,onTouchCancel:n?null:this.O},p&&i.createElement("div",{style:S},p),f&&i.createElement("div",{style:P},f)),i.createElement("input",o({},{type:"checkbox",role:"switch","aria-checked":e,checked:e,disabled:n,style:{border:0,clip:"rect(0 0 0 0)",height:1,margin:-1,overflow:"hidden",padding:0,position:"absolute",width:1}},g,{ref:this.S,onFocus:this.D,onBlur:this.O,onKeyUp:this.C,onChange:this.$})))},e}(i.Component);c.defaultProps={disabled:!1,offColor:"#888",onColor:"#080",offHandleColor:"#fff",onHandleColor:"#fff",uncheckedIcon:s,checkedIcon:r,boxShadow:null,activeBoxShadow:"0 0 2px 3px #3bf",height:28,width:56},e.default=c},59936:function(t,e,n){t.exports=n(83231)}},function(t){t.O(0,[9774,2554,4597,9650,6993,6095,8661,9669,7010,5955],(function(){return e=13470,t(t.s=e);var e}));var e=t.O();_N_E=e}]);