(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[3574],{4354:function(e,i,s){"use strict";var r,n=s(7294);function a(){return(a=Object.assign||function(e){for(var i=1;i<arguments.length;i++){var s=arguments[i];for(var r in s)Object.prototype.hasOwnProperty.call(s,r)&&(e[r]=s[r])}return e}).apply(this,arguments)}i.Z=function(e){return n.createElement("svg",a({xmlns:"http://www.w3.org/2000/svg",width:14,height:14},e),r||(r=n.createElement("path",{"data-name":"Icon material-mode-comment",d:"M13.993 1.4A1.4 1.4 0 0012.6 0H1.4A1.4 1.4 0 000 1.4v8.4a1.4 1.4 0 001.4 1.4h9.8L14 14z"})))}},1045:function(e,i,s){"use strict";var r,n=s(7294);function a(){return(a=Object.assign||function(e){for(var i=1;i<arguments.length;i++){var s=arguments[i];for(var r in s)Object.prototype.hasOwnProperty.call(s,r)&&(e[r]=s[r])}return e}).apply(this,arguments)}i.Z=function(e){return n.createElement("svg",a({"data-name":"Icon material-remove-red-eye",xmlns:"http://www.w3.org/2000/svg",width:20.699,height:14.113},e),r||(r=n.createElement("path",{"data-name":"Icon material-remove-red-eye",fill:"currentColor",d:"M10.349 0A11.127 11.127 0 000 7.056a11.118 11.118 0 0020.7 0A11.127 11.127 0 0010.349 0zm0 11.761a4.7 4.7 0 114.7-4.7 4.706 4.706 0 01-4.7 4.7zm0-7.527a2.823 2.823 0 102.823 2.823 2.819 2.819 0 00-2.823-2.823z"})))}},4677:function(e,i,s){"use strict";var r,n,a=s(7294);function t(){return(t=Object.assign||function(e){for(var i=1;i<arguments.length;i++){var s=arguments[i];for(var r in s)Object.prototype.hasOwnProperty.call(s,r)&&(e[r]=s[r])}return e}).apply(this,arguments)}i.Z=function(e){return a.createElement("svg",t({"data-name":"Icon ionic-md-thumbs-up",xmlns:"http://www.w3.org/2000/svg",width:16.486,height:15.222},e),r||(r=a.createElement("path",{"data-name":"Path 11186",fill:"currentColor",className:"ic_like_svg__cls-1",d:"M5.946 15.222h6.818a1.454 1.454 0 001.356-.928l2.263-5.367a1.517 1.517 0 00.1-.555v-1.53a1.748 1.748 0 00-1.5-1.768h-4.72l.714-3.231.024-.238a1.149 1.149 0 00-.329-.8l-.8-.8-4.996 5.041A1.526 1.526 0 004.44 6.12v7.611a1.5 1.5 0 001.506 1.491z"})),n||(n=a.createElement("path",{"data-name":"Path 11187",fill:"currentColor",className:"ic_like_svg__cls-1",d:"M0 6.342h2.537v8.879H0z"})))}},4015:function(e,i,s){"use strict";s.d(i,{a:function(){return d}});var r=s(6156),n=s(5893),a=s(7294),t=s(1163),l=s(9226);var c=s(4791);function o(e,i){var s=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);i&&(r=r.filter((function(i){return Object.getOwnPropertyDescriptor(e,i).enumerable}))),s.push.apply(s,r)}return s}var d=function(e,i){return function(s){var d=function(){var e=(arguments.length>0&&void 0!==arguments[0]?arguments[0]:{}).urlType,i=void 0===e?"public":e,s=(0,l.v9)((function(e){return e.authReducer.userInfo}));return(0,a.useEffect)((function(){if("public"!==i&&i&&s)if(s&&null!==s&&void 0!==s&&s.isLoggedIn)if("member"===s.role){if("auth"===i)return"verifying"===s.period&&t.default.push("/verify-email"),"onboarding"===s.period&&t.default.push("/onboard"),void("final"===s.period&&t.default.push("/dashboard"));if("verifying"===i)return"onboarding"===s.period&&t.default.push("/onboard"),void("final"===s.period&&t.default.push("/dashboard"));if("onboarding"===i)return"verifying"===s.period&&t.default.push("/verify-email"),void("final"===s.period&&t.default.push("/dashboard"));if("final-member"===i||"final-all"===i)return"verifying"===s.period&&t.default.push("/verify-email"),void("onboarding"===s.period&&t.default.push("/onboard"));"final-admin"===i&&("verifying"===s.period&&t.default.push("/verify-email"),"onboarding"===s.period&&t.default.push("/onboard"),"final"===s.period&&t.default.push("/dashboard"))}else"admin"===s.role&&"final-all"!==i&&"final-admin"!==i&&t.default.push("/admin/dashboard");else"auth"!==i&&t.default.push("/login")}),[s,i]),{user:s}}({urlType:i}).user;if(i&&"public"!==i){if(!d)return(0,n.jsx)(c.Z,{});if("auth"===i&&d.isLoggedIn)return(0,n.jsx)(c.Z,{});if("auth"!==i&&!d.isLoggedIn)return(0,n.jsx)(c.Z,{});if("member"===d.role){if(["final-all","final-member"].includes(i)&&"final"!==d.period)return(0,n.jsx)(c.Z,{});if(["verifying"].includes(i)&&"verifying"!==d.period)return(0,n.jsx)(c.Z,{});if(["onboarding"].includes(i)&&"onboarding"!==d.period)return(0,n.jsx)(c.Z,{})}if("admin"===d.role&&["verifying","onboarding","final-member"].includes(i))return(0,n.jsx)(c.Z,{})}return(0,n.jsx)(e,function(e){for(var i=1;i<arguments.length;i++){var s=null!=arguments[i]?arguments[i]:{};i%2?o(Object(s),!0).forEach((function(i){(0,r.Z)(e,i,s[i])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(s)):o(Object(s)).forEach((function(i){Object.defineProperty(e,i,Object.getOwnPropertyDescriptor(s,i))}))}return e}({},s))}}},4791:function(e,i,s){"use strict";var r=s(5893);i.Z=function(){return(0,r.jsx)("p",{children:"Loading"})}},4590:function(e,i,s){"use strict";s.d(i,{Z:function(){return o}});var r=s(5893),n=s(7667),a=s(9226),t=s(7124),l=s(6570),c=function(){var e=(0,a.v9)((function(e){return e.authReducer.fetchUserInfo.data}));return console.log("aaaa",e),(0,r.jsxs)(r.Fragment,{children:[(0,r.jsxs)(t.Zb,{className:"flex-col w-24 px-5 hidden lg:flex h-full overflow-y-scroll",children:[(0,r.jsx)("img",{className:"py-6 border-b-2 border-primary align-center",src:"/images/ic_logo_home.svg",alt:"Casper"}),(0,r.jsxs)("ul",{className:"mb-4 flex flex-col items-center border-b-2 border-primary",children:[(0,r.jsx)("li",{className:"pb-4 pt-14",children:(0,r.jsx)(t.O$,{activeClassName:"shadow-activeLink",href:"/dashboard",children:(0,r.jsx)("a",{className:"rounded-lg inline-block",children:(0,r.jsx)("img",{className:"p-3",src:"/images/ic_home.svg",alt:"Home"})})})}),(0,r.jsx)("li",{className:"py-2",children:(0,r.jsx)(t.O$,{activeClassName:"shadow-activeLink",href:"/dashboard/nodes",children:(0,r.jsx)("a",{className:"inline-block rounded-2xl hover:shadow-lg",children:(0,r.jsx)("img",{className:"p-3",src:"/images/ic_infor.svg",alt:"Validator Info"})})})}),(0,r.jsx)("li",{className:"py-2",children:(0,r.jsx)(t.O$,{activeClassName:"shadow-activeLink",href:"/dashboard/discussion",children:(0,r.jsx)("a",{className:"rounded-lg inline-block",children:(0,r.jsx)("img",{className:"p-3",src:"/images/ic_material_chat.svg",alt:"Material Chat"})})})}),(0,r.jsx)("li",{className:"py-2",children:(0,r.jsx)(t.O$,{activeClassName:"shadow-activeLink",href:"/dashboard/votes",children:(0,r.jsx)("a",{className:"inline-block rounded-2xl hover:shadow-lg",children:(0,r.jsx)("img",{className:"p-3",src:"/images/ic_awesome_vote.svg",alt:"Vote"})})})}),(0,r.jsx)("li",{className:"py-2",children:(0,r.jsx)(t.O$,{activeClassName:"shadow-activeLink",href:"/dashboard/member-perks",children:(0,r.jsx)("a",{className:"inline-block rounded-2xl hover:shadow-lg",children:(0,r.jsx)("img",{className:"p-3",src:"/images/ic_feather_user_plus.svg",alt:"User Add"})})})}),(0,r.jsx)("li",{className:"pt-2",children:(0,r.jsx)(t.O$,{activeClassName:"shadow-activeLink",href:"/dashboard/settings",children:(0,r.jsx)("a",{className:"inline-block rounded-2xl hover:shadow-lg",children:(0,r.jsx)("img",{className:"p-3",src:"/images/ic_feather_settings.svg",alt:"Setting"})})})})]}),"admin"===(null===e||void 0===e?void 0:e.role)&&(0,r.jsxs)("ul",{className:"flex flex-col pb-4",children:[(0,r.jsx)("li",{className:"py-1.5 cursor-pointer",children:(0,r.jsx)(t.O$,{activeClassName:"text-primary",href:"/admin/dashboard",children:(0,r.jsx)("p",{children:"Admin"})})}),(0,r.jsx)("li",{className:"py-1.5 cursor-pointer",children:(0,r.jsx)(t.O$,{activeClassName:"text-primary",href:"/admin/intake",children:(0,r.jsx)("p",{children:"Instake"})})}),(0,r.jsx)("li",{className:"py-1.5 cursor-pointer",children:(0,r.jsx)(t.O$,{activeClassName:"text-primary",href:"/admin/users",children:(0,r.jsx)("p",{children:"Users"})})}),(0,r.jsx)("li",{className:"py-1.5 cursor-pointer",children:(0,r.jsx)(t.O$,{activeClassName:"text-primary",href:"/admin/ballots",children:(0,r.jsx)("p",{children:"Ballots"})})}),(0,r.jsx)("li",{className:"py-1.5 cursor-pointer",children:(0,r.jsx)(t.O$,{activeClassName:"text-primary",href:"/admin/perks",children:(0,r.jsx)("p",{children:"Perks"})})}),(0,r.jsx)("li",{className:"py-1.5 cursor-pointer",children:(0,r.jsx)(t.O$,{activeClassName:"text-primary",href:"/admin/settings",children:(0,r.jsx)("p",{children:"Settings"})})})]})]}),(0,r.jsx)(l.Z,{className:"py-4 lg:hidden",theme:"dark"})]})};function o(e){var i=e.children;return(0,r.jsx)("div",{children:(0,r.jsx)("div",{className:"dashboard-layout",children:(0,r.jsxs)("div",{className:"relative h-screen h-px mx-auto 2xl:min-h-105 max-w-404 px-4 lg:py-4 xl:py-16 2xl:py-24 flex flex-col",children:[(0,r.jsxs)("div",{className:"flex h-full flex-col lg:flex-row",children:[(0,r.jsx)("div",{className:"flex-none",children:(0,r.jsx)(c,{})}),(0,r.jsx)("div",{className:"pt-12 lg:pt-0 lg:pl-6 dashboard-content flex-grow h-full",children:i})]}),(0,r.jsx)("div",{className:"absolute py-8 left-0 bottom-0 right-0",children:(0,r.jsx)(n.Z,{theme:"dark"})})]})})})}},9608:function(e,i,s){"use strict";s.r(i),s.d(i,{default:function(){return j}});var r=s(676);var n=s(2961);function a(e){return function(e){if(Array.isArray(e))return(0,r.Z)(e)}(e)||function(e){if("undefined"!==typeof Symbol&&Symbol.iterator in Object(e))return Array.from(e)}(e)||(0,n.Z)(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}var t=s(5893),l=s(7294),c=s(1664),o=s(4590),d=s(7124),u=s(1045),m=s(4354),h=s(4677),f=s(4015),p=[{id:1,desc:"Nunc eu viverra turpis. In tincidunt enim tellus, sit amet fermentum\n    elit facilisis sit amet. Donec quis quam egestas, dignissim odio eu,\n    elementum tortor. Vivamus egestas orci orci, in vehicula urna luctus\n    quis. Fusce auctor urna sed suscipit pulvinar. Vivamus porta fermentum\n    fermentum. Aliquam facilisis.",image:"/images/img_signature.png",pinned:!1,postedBy:"Username16448",reaction:{comments:25,likes:25,read:25},title:"Title goes here for each discussion"},{id:2,desc:"Nunc eu viverra turpis. In tincidunt enim tellus, sit amet fermentum\n    elit facilisis sit amet. Donec quis quam egestas, dignissim odio eu,\n    elementum tortor. Vivamus egestas orci orci, in vehicula urna luctus\n    quis. Fusce auctor urna sed suscipit pulvinar. Vivamus porta fermentum\n    fermentum. Aliquam facilisis.",image:"/images/img_signature.png",pinned:!1,postedBy:"Username16448",reaction:{comments:35,likes:2,read:2},title:"Title goes here for each discussion"},{id:3,desc:"Nunc eu viverra turpis. In tincidunt enim tellus, sit amet fermentum\n    elit facilisis sit amet. Donec quis quam egestas, dignissim odio eu,\n    elementum tortor. Vivamus egestas orci orci, in vehicula urna luctus\n    quis. Fusce auctor urna sed suscipit pulvinar. Vivamus porta fermentum\n    fermentum. Aliquam facilisis.",image:"/images/img_signature.png",pinned:!1,postedBy:"Username16448",reaction:{comments:25,likes:25,read:25},title:"Title goes here for each discussion"},{id:4,desc:"Nunc eu viverra turpis. In tincidunt enim tellus, sit amet fermentum\n    elit facilisis sit amet. Donec quis quam egestas, dignissim odio eu,\n    elementum tortor. Vivamus egestas orci orci, in vehicula urna luctus\n    quis. Fusce auctor urna sed suscipit pulvinar. Vivamus porta fermentum\n    fermentum. Aliquam facilisis.",image:"/images/img_signature.png",pinned:!1,postedBy:"Username16448",reaction:{comments:25,likes:25,read:25},title:"Title goes here for each discussion"}],x=(0,l.createContext)(),v=function(e){var i=e.data,s=(0,l.useContext)(x).togglePinnedList;return(0,t.jsxs)("div",{className:"flex py-5 md:py-12 border-b border-gray1 flex-col md:flex-row",children:[(0,t.jsxs)("div",{className:"flex-none flex",children:[(0,t.jsx)("div",{className:"w-24 h-24",children:(0,t.jsx)("img",{className:"h-full w-full object-cover rounded-lg shadow-lg",src:"/images/img_signature.png",alt:"avatar"})}),(0,t.jsx)("div",{className:"px-6 pt-2 mt-auto md:mt-0",children:(0,t.jsx)(u.Z,{className:"cursor-pointer ".concat(i.pinned?"text-primary":""),onClick:function(){s(i)}})})]}),(0,t.jsxs)("div",{className:"chat-content mt-5 md:m-0",children:[(0,t.jsxs)("div",{className:"chat-content-body",children:[(0,t.jsx)(c.default,{href:"/dashboard/discussion/".concat(i.id),children:(0,t.jsx)("h2",{className:"cursor-pointer text-lg mb-2.5",children:i.title})}),(0,t.jsx)("p",{className:"text-sm mb-5",children:i.desc})]}),(0,t.jsxs)("div",{className:"chat-content-footer flex text-sm flex-col md:flex-row",children:[(0,t.jsxs)("p",{children:["Posted by: ",(0,t.jsx)("a",{className:"text-primary",children:i.postedBy})]}),(0,t.jsxs)("ul",{className:"ml-8 flex -ml-6 mt-5 md:ml-0 md:mt-0",children:[(0,t.jsxs)("li",{className:"flex px-6 items-center",children:[(0,t.jsx)(m.Z,{}),(0,t.jsx)("span",{className:"pl-2.5",children:i.reaction.comments||0})]}),(0,t.jsxs)("li",{className:"flex px-6 items-center",children:[(0,t.jsx)(u.Z,{}),(0,t.jsx)("span",{className:"pl-2.5",children:i.reaction.read||0})]}),(0,t.jsxs)("li",{className:"flex px-6 items-center",children:[(0,t.jsx)(h.Z,{}),(0,t.jsx)("span",{className:"pl-2.5",children:i.reaction.likes||0})]})]})]})]})]})},g=[{content:function(){return(0,t.jsx)("ul",{className:"pb-20",children:(0,t.jsx)(x.Consumer,{children:function(e){return e.discussionList.map((function(e,i){return(0,t.jsx)("li",{children:(0,t.jsx)(v,{data:e})},i)}))}})})},id:"discuss",title:"All Discussions"},{content:function(){return(0,t.jsx)("ul",{className:"pb-20",children:(0,t.jsx)(x.Consumer,{children:function(e){return e.pinnedList.map((function(e,i){return(0,t.jsx)("li",{children:(0,t.jsx)(v,{data:e})},i)}))}})})},id:"pinned",title:"Pinned"}],j=(0,f.a)((function(){var e=(0,l.useState)([]),i=e[0],s=e[1],r=(0,l.useState)(p),n=r[0],u=r[1];return(0,t.jsx)(o.Z,{children:(0,t.jsx)(x.Provider,{value:{discussionList:n,pinnedList:i,togglePinnedList:function(e){var r=n.findIndex((function(i){return i.id===e.id}));if(i.findIndex((function(i){return i.id===e.id}))>=0){n[r].pinned=!1;var t=i.filter((function(i){return i.id!==e.id}));s(t)}else n[r].pinned=!0,s([].concat(a(i),[e]));u(a(n))}},children:(0,t.jsx)(d.Zb,{className:"h-full md:pl-24 md:py-10 md:shadow-2xl",noShadow:!0,children:(0,t.jsxs)("div",{className:"w-full h-full",children:[(0,t.jsx)("div",{className:"flex justify-end md:mr-24",children:(0,t.jsx)(c.default,{href:"/dashboard/discussion/add",children:(0,t.jsx)("button",{type:"button",className:"transition text-lg text-white w-full md:w-64 h-16 rounded-full bg-primary hover:opacity-40 disabled:opacity-40 disabled:cursor-not-allowed focus:outline-none shadow-md",children:"+ New Discussion"})})}),(0,t.jsx)(d.OK,{className:"w-full h-full pt-12 md:pt-0 md:-mt-7",data:g})]})})})})}),"final-all")},5718:function(e,i,s){(window.__NEXT_P=window.__NEXT_P||[]).push(["/dashboard/discussion",function(){return s(9608)}])}},function(e){e.O(0,[9774,2554,1282,319,6993,5802,8271],(function(){return i=5718,e(e.s=i);var i}));var i=e.O();_N_E=i}]);