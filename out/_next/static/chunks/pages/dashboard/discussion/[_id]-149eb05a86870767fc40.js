(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[8451],{4354:function(e,s,a){"use strict";var r,i=a(7294);function t(){return(t=Object.assign||function(e){for(var s=1;s<arguments.length;s++){var a=arguments[s];for(var r in a)Object.prototype.hasOwnProperty.call(a,r)&&(e[r]=a[r])}return e}).apply(this,arguments)}s.Z=function(e){return i.createElement("svg",t({xmlns:"http://www.w3.org/2000/svg",width:14,height:14},e),r||(r=i.createElement("path",{"data-name":"Icon material-mode-comment",d:"M13.993 1.4A1.4 1.4 0 0012.6 0H1.4A1.4 1.4 0 000 1.4v8.4a1.4 1.4 0 001.4 1.4h9.8L14 14z"})))}},1045:function(e,s,a){"use strict";var r,i=a(7294);function t(){return(t=Object.assign||function(e){for(var s=1;s<arguments.length;s++){var a=arguments[s];for(var r in a)Object.prototype.hasOwnProperty.call(a,r)&&(e[r]=a[r])}return e}).apply(this,arguments)}s.Z=function(e){return i.createElement("svg",t({"data-name":"Icon material-remove-red-eye",xmlns:"http://www.w3.org/2000/svg",width:20.699,height:14.113},e),r||(r=i.createElement("path",{"data-name":"Icon material-remove-red-eye",fill:"currentColor",d:"M10.349 0A11.127 11.127 0 000 7.056a11.118 11.118 0 0020.7 0A11.127 11.127 0 0010.349 0zm0 11.761a4.7 4.7 0 114.7-4.7 4.706 4.706 0 01-4.7 4.7zm0-7.527a2.823 2.823 0 102.823 2.823 2.819 2.819 0 00-2.823-2.823z"})))}},4677:function(e,s,a){"use strict";var r,i,t=a(7294);function l(){return(l=Object.assign||function(e){for(var s=1;s<arguments.length;s++){var a=arguments[s];for(var r in a)Object.prototype.hasOwnProperty.call(a,r)&&(e[r]=a[r])}return e}).apply(this,arguments)}s.Z=function(e){return t.createElement("svg",l({"data-name":"Icon ionic-md-thumbs-up",xmlns:"http://www.w3.org/2000/svg",width:16.486,height:15.222},e),r||(r=t.createElement("path",{"data-name":"Path 11186",fill:"currentColor",className:"ic_like_svg__cls-1",d:"M5.946 15.222h6.818a1.454 1.454 0 001.356-.928l2.263-5.367a1.517 1.517 0 00.1-.555v-1.53a1.748 1.748 0 00-1.5-1.768h-4.72l.714-3.231.024-.238a1.149 1.149 0 00-.329-.8l-.8-.8-4.996 5.041A1.526 1.526 0 004.44 6.12v7.611a1.5 1.5 0 001.506 1.491z"})),i||(i=t.createElement("path",{"data-name":"Path 11187",fill:"currentColor",className:"ic_like_svg__cls-1",d:"M0 6.342h2.537v8.879H0z"})))}},4015:function(e,s,a){"use strict";a.d(s,{a:function(){return d}});var r=a(6156),i=a(5893),t=a(7294),l=a(1163),n=a(9226);var c=a(4791);function o(e,s){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);s&&(r=r.filter((function(s){return Object.getOwnPropertyDescriptor(e,s).enumerable}))),a.push.apply(a,r)}return a}var d=function(e,s){return function(a){var d=function(){var e=(arguments.length>0&&void 0!==arguments[0]?arguments[0]:{}).urlType,s=void 0===e?"public":e,a=(0,n.v9)((function(e){return e.authReducer.userInfo}));return(0,t.useEffect)((function(){if("public"!==s&&s&&a)if(a&&null!==a&&void 0!==a&&a.isLoggedIn)if("member"===a.role){if("auth"===s)return"verifying"===a.period&&l.default.push("/verify-email"),"onboarding"===a.period&&l.default.push("/onboard"),void("final"===a.period&&l.default.push("/dashboard"));if("verifying"===s)return"onboarding"===a.period&&l.default.push("/onboard"),void("final"===a.period&&l.default.push("/dashboard"));if("onboarding"===s)return"verifying"===a.period&&l.default.push("/verify-email"),void("final"===a.period&&l.default.push("/dashboard"));if("final-member"===s||"final-all"===s)return"verifying"===a.period&&l.default.push("/verify-email"),void("onboarding"===a.period&&l.default.push("/onboard"));"final-admin"===s&&("verifying"===a.period&&l.default.push("/verify-email"),"onboarding"===a.period&&l.default.push("/onboard"),"final"===a.period&&l.default.push("/dashboard"))}else"admin"===a.role&&"final-all"!==s&&"final-admin"!==s&&l.default.push("/admin/dashboard");else"auth"!==s&&l.default.push("/login")}),[a,s]),{user:a}}({urlType:s}).user;if(s&&"public"!==s){if(!d)return(0,i.jsx)(c.Z,{});if("auth"===s&&d.isLoggedIn)return(0,i.jsx)(c.Z,{});if("auth"!==s&&!d.isLoggedIn)return(0,i.jsx)(c.Z,{});if("member"===d.role){if(["final-all","final-member"].includes(s)&&"final"!==d.period)return(0,i.jsx)(c.Z,{});if(["verifying"].includes(s)&&"verifying"!==d.period)return(0,i.jsx)(c.Z,{});if(["onboarding"].includes(s)&&"onboarding"!==d.period)return(0,i.jsx)(c.Z,{})}if("admin"===d.role&&["verifying","onboarding","final-member"].includes(s))return(0,i.jsx)(c.Z,{})}return(0,i.jsx)(e,function(e){for(var s=1;s<arguments.length;s++){var a=null!=arguments[s]?arguments[s]:{};s%2?o(Object(a),!0).forEach((function(s){(0,r.Z)(e,s,a[s])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):o(Object(a)).forEach((function(s){Object.defineProperty(e,s,Object.getOwnPropertyDescriptor(a,s))}))}return e}({},a))}}},4791:function(e,s,a){"use strict";var r=a(5893);s.Z=function(){return(0,r.jsx)("p",{children:"Loading"})}},4590:function(e,s,a){"use strict";a.d(s,{Z:function(){return o}});var r=a(5893),i=a(7667),t=a(9226),l=a(7124),n=a(6570),c=function(){var e=(0,t.v9)((function(e){return e.authReducer.userInfo.fullInfo}));return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsxs)(l.Zb,{className:"flex-col w-24 px-5 hidden lg:flex h-full overflow-y-scroll",children:[(0,r.jsx)("img",{className:"py-6 border-b-2 border-primary align-center",src:"/images/ic_logo_home.svg",alt:"Casper"}),(0,r.jsxs)("ul",{className:"mb-4 flex flex-col items-center border-b-2 border-primary",children:[(0,r.jsx)("li",{className:"pb-4 pt-14",children:(0,r.jsx)(l.O$,{activeClassName:"shadow-activeLink",href:"/dashboard",children:(0,r.jsx)("a",{className:"rounded-lg inline-block",children:(0,r.jsx)("img",{className:"p-3",src:"/images/ic_home.svg",alt:"Home"})})})}),(0,r.jsx)("li",{className:"py-2",children:(0,r.jsx)(l.O$,{activeClassName:"shadow-activeLink",href:"/dashboard/nodes",children:(0,r.jsx)("a",{className:"inline-block rounded-2xl hover:shadow-lg",children:(0,r.jsx)("img",{className:"p-3",src:"/images/ic_infor.svg",alt:"Validator Info"})})})}),(0,r.jsx)("li",{className:"py-2",children:(0,r.jsx)(l.O$,{activeClassName:"shadow-activeLink",href:"/dashboard/discussion",children:(0,r.jsx)("a",{className:"rounded-lg inline-block",children:(0,r.jsx)("img",{className:"p-3",src:"/images/ic_material_chat.svg",alt:"Material Chat"})})})}),(0,r.jsx)("li",{className:"py-2",children:(0,r.jsx)(l.O$,{activeClassName:"shadow-activeLink",href:"/dashboard/votes",children:(0,r.jsx)("a",{className:"inline-block rounded-2xl hover:shadow-lg",children:(0,r.jsx)("img",{className:"p-3",src:"/images/ic_awesome_vote.svg",alt:"Vote"})})})}),(0,r.jsx)("li",{className:"py-2",children:(0,r.jsx)(l.O$,{activeClassName:"shadow-activeLink",href:"/dashboard/member-perks",children:(0,r.jsx)("a",{className:"inline-block rounded-2xl hover:shadow-lg",children:(0,r.jsx)("img",{className:"p-3",src:"/images/ic_feather_user_plus.svg",alt:"User Add"})})})}),(0,r.jsx)("li",{className:"pt-2",children:(0,r.jsx)(l.O$,{activeClassName:"shadow-activeLink",href:"/dashboard/settings",children:(0,r.jsx)("a",{className:"inline-block rounded-2xl hover:shadow-lg",children:(0,r.jsx)("img",{className:"p-3",src:"/images/ic_feather_settings.svg",alt:"Setting"})})})})]}),"admin"===(null===e||void 0===e?void 0:e.role)&&(0,r.jsxs)("ul",{className:"flex flex-col pb-4",children:[(0,r.jsx)("li",{className:"py-1.5 cursor-pointer",children:(0,r.jsx)(l.O$,{activeClassName:"text-primary",href:"/admin/dashboard",children:(0,r.jsx)("p",{children:"Admin"})})}),(0,r.jsx)("li",{className:"py-1.5 cursor-pointer",children:(0,r.jsx)(l.O$,{activeClassName:"text-primary",href:"/admin/intake",children:(0,r.jsx)("p",{children:"Intake"})})}),(0,r.jsx)("li",{className:"py-1.5 cursor-pointer",children:(0,r.jsx)(l.O$,{activeClassName:"text-primary",href:"/admin/users",children:(0,r.jsx)("p",{children:"Users"})})}),(0,r.jsx)("li",{className:"py-1.5 cursor-pointer",children:(0,r.jsx)(l.O$,{activeClassName:"text-primary",href:"/admin/ballots",children:(0,r.jsx)("p",{children:"Ballots"})})}),(0,r.jsx)("li",{className:"py-1.5 cursor-pointer",children:(0,r.jsx)(l.O$,{activeClassName:"text-primary",href:"/admin/perks",children:(0,r.jsx)("p",{children:"Perks"})})}),(0,r.jsx)("li",{className:"py-1.5 cursor-pointer",children:(0,r.jsx)(l.O$,{activeClassName:"text-primary",href:"/admin/settings",children:(0,r.jsx)("p",{children:"Settings"})})})]})]}),(0,r.jsx)(n.Z,{className:"py-4 lg:hidden",theme:"dark"})]})};function o(e){var s=e.children;return(0,r.jsx)("div",{children:(0,r.jsx)("div",{className:"dashboard-layout",children:(0,r.jsxs)("div",{className:"relative h-screen h-px mx-auto 2xl:min-h-105 max-w-404 px-4 lg:py-4 xl:py-16 2xl:py-24 flex flex-col",children:[(0,r.jsxs)("div",{className:"flex h-full flex-col lg:flex-row",children:[(0,r.jsx)("div",{className:"flex-none",children:(0,r.jsx)(c,{})}),(0,r.jsx)("div",{className:"pt-12 lg:pt-0 lg:pl-6 dashboard-content flex-grow h-full",children:s})]}),(0,r.jsx)("div",{className:"absolute py-8 left-0 bottom-0 right-0",children:(0,r.jsx)(i.Z,{theme:"dark"})})]})})})}},4865:function(e,s,a){"use strict";a.r(s),a.d(s,{default:function(){return g}});var r,i,t=a(5893),l=a(7294),n=a(4590),c=a(7124),o=a(4677);function d(){return(d=Object.assign||function(e){for(var s=1;s<arguments.length;s++){var a=arguments[s];for(var r in a)Object.prototype.hasOwnProperty.call(a,r)&&(e[r]=a[r])}return e}).apply(this,arguments)}var u=function(e){return l.createElement("svg",d({xmlns:"http://www.w3.org/2000/svg",width:17.49,height:16.427},e),r||(r=l.createElement("defs",null,l.createElement("style",null,".ic_dislike_svg__cls-1{fill:none;stroke:#9a9a9a}"))),i||(i=l.createElement("g",{id:"ic_dislike_svg__Icon_ionic-md-thumbs-down","data-name":"Icon ionic-md-thumbs-down",transform:"translate(.5 .5)"},l.createElement("path",{id:"ic_dislike_svg__Path_11188","data-name":"Path 11188",className:"ic_dislike_svg__cls-1",d:"M13.919 4.5H7.1a1.454 1.454 0 00-1.356.928l-2.266 5.367a1.517 1.517 0 00-.1.555v1.53a1.748 1.748 0 001.5 1.768H9.6l-.714 3.231-.024.238a1.149 1.149 0 00.329.8l.793.8 5-5.042a1.526 1.526 0 00.436-1.074V5.99a1.5 1.5 0 00-1.501-1.49z",transform:"translate(-3.375 -4.5)"}),l.createElement("path",{id:"ic_dislike_svg__Path_11189","data-name":"Path 11189",className:"ic_dislike_svg__cls-1",d:"M28.125 4.5h2.537v8.879h-2.537z",transform:"translate(-14.172 -4.5)"}))))},m=a(1045),h=a(4354),p=a(4015),f={desc:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur nec accumsan libero. Vivamus cursus, dui nec tristique bibendum, tortor eros ultrices libero, eu imperdiet ex est non tellus. Nullam eu iaculis neque. Nam congue felis consequat nunc maximus porttitor. Aliquam interdum vulputate magna, vitae scelerisque metus. Cras sem nunc, egestas ut ornare in, maximus ac sapien. Morbi interdum eget odio finibus volutpat. Sed sed condimentum mi. Aliquam purus quam, luctus eu lectus quis, tempor scelerisque massa. In viverra convallis nunc, nec posuere mi pretium ut. Praesent porta pretium feugiat. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.",discussions:[{desc:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur nec accumsan libero. Vivamus cursus, dui nec tristique bibendum, tortor eros ultrices libero, eu imperdiet ex est non tellus. Nullam eu iaculis neque. Nam congue felis consequat nunc maximus porttitor. Aliquam interdum vulputate magna, vitae scelerisque metus. Cras sem nunc, egestas ut ornare in, maximus ac sapien. Morbi interdum eget odio finibus volutpat. Sed sed condimentum mi. Aliquam purus quam, luctus eu lectus quis, tempor scelerisque massa. In viverra convallis nunc, nec posuere mi pretium ut. Praesent porta pretium feugiat. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.",image:"/images/img_signature.png",postedBy:"Username16448",reaction:{comments:25,likes:25,read:25},title:"Title goes here for each discussion",user:{createdDate:"5/9/2021 - 10:40am",name:"Username123",validatorId:"261689470949"}},{desc:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur nec accumsan libero. Vivamus cursus, dui nec tristique bibendum, tortor eros ultrices libero, eu imperdiet ex est non tellus. Nullam eu iaculis neque. Nam congue felis consequat nunc maximus porttitor. Aliquam interdum vulputate magna, vitae scelerisque metus. Cras sem nunc, egestas ut ornare in, maximus ac sapien. Morbi interdum eget odio finibus volutpat. Sed sed condimentum mi. Aliquam purus quam, luctus eu lectus quis, tempor scelerisque massa. In viverra convallis nunc, nec posuere mi pretium ut. Praesent porta pretium feugiat. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.",image:"/images/img_signature.png",postedBy:"Username16448",reaction:{comments:25,likes:25,read:25},title:"Title goes here for each discussion",user:{createdDate:"5/9/2021 - 10:40am",name:"Username123",validatorId:"261689470949"}}],image:"/images/img_signature.png",postedBy:"Username16448",reaction:{comments:25,likes:25,read:25},title:"Title goes here for each discussion",user:{createdDate:"5/9/2021 - 10:40am",name:"Username123",validatorId:"261689470949"}},x=function(e){var s=e.data,a=e.noBorder;return(0,t.jsxs)("div",{className:"flex py-8 border-gray1 flex-col lg:flex-row ".concat(a?"":"border-b"),children:[(0,t.jsxs)("div",{className:"flex-none flex flex-row lg:flex-col lg:w-44",children:[(0,t.jsx)("div",{className:"w-24 h-24 mr-5 lg:mr-12",children:(0,t.jsx)("img",{className:"h-full w-full object-cover rounded-lg shadow-lg",src:"/images/img_signature.png",alt:"avatar"})}),(0,t.jsxs)("div",{className:"pt-2 pr-6 mt-auto lg:mt-0",children:[(0,t.jsx)("p",{className:"text-sm font-bold py-1",children:s.user.name}),(0,t.jsx)("div",{className:"border-gray1 border-b"}),(0,t.jsxs)("p",{className:"text-xxs py-1",children:["Validator ID: ",s.user.validatorId]}),(0,t.jsx)("div",{className:"border-gray1 border-b"}),(0,t.jsx)("p",{className:"text-xxs py-1",children:s.user.createdDate}),(0,t.jsx)("div",{className:"border-gray1 border-b"})]})]}),(0,t.jsx)("div",{className:"chat-content mt-5 lg:m-0",children:(0,t.jsx)("div",{className:"chat-content-body",children:(0,t.jsx)("p",{className:"text-sm mb-5",children:s.desc})})}),(0,t.jsxs)("div",{className:"block lg:hidden chat-content-footer flex text-sm flex-col md:flex-row",children:[(0,t.jsxs)("p",{children:["Posted by: ",(0,t.jsx)("a",{className:"text-primary",children:s.postedBy})]}),(0,t.jsxs)("ul",{className:"ml-8 flex -ml-6 mt-5 md:ml-0 md:mt-0",children:[(0,t.jsxs)("li",{className:"flex px-6 items-center",children:[(0,t.jsx)(h.Z,{}),(0,t.jsx)("span",{className:"pl-2.5",children:s.reaction.comments||0})]}),(0,t.jsxs)("li",{className:"flex px-6 items-center",children:[(0,t.jsx)(m.Z,{}),(0,t.jsx)("span",{className:"pl-2.5",children:s.reaction.read||0})]}),(0,t.jsxs)("li",{className:"flex px-6 items-center",children:[(0,t.jsx)(o.Z,{}),(0,t.jsx)("span",{className:"pl-2.5",children:s.reaction.likes||0})]})]})]})]})},g=(0,p.a)((function(){var e=(0,l.useState)(f),s=e[0],a=(e[1],function(){return(0,t.jsxs)("ul",{className:"flex",children:[(0,t.jsxs)("li",{className:"flex px-6 items-center",children:[(0,t.jsx)(o.Z,{className:"text-primary"}),(0,t.jsx)("span",{className:"pl-2.5",children:s.reaction.comments||0})]}),(0,t.jsxs)("li",{className:"flex px-6 items-center",children:[(0,t.jsx)(u,{}),(0,t.jsx)("span",{className:"pl-2.5",children:s.reaction.read||0})]})]})});return(0,t.jsx)(n.Z,{children:(0,t.jsx)(c.Zb,{className:"h-full lg:pl-24 lg:py-11 lg:shadow-2xl",noShadow:!0,children:(0,t.jsxs)("div",{className:"w-full h-full",children:[(0,t.jsxs)("div",{className:"card-header lg:mr-24 lg:h-70px",children:[(0,t.jsxs)("div",{className:"flex justify-between items-center",children:[(0,t.jsx)(c.xE,{href:"/dashboard/discussion",text:"Discussions"}),(0,t.jsx)("div",{className:"inline-block lg:hidden pb-2.5",children:(0,t.jsx)(a,{})})]}),(0,t.jsxs)("div",{className:"flex justify-between items-center mb-3.5",children:[(0,t.jsx)("h3",{className:"text-dark2 text-xl lg:pr-32 font-medium",children:s.title}),(0,t.jsx)("div",{className:"hidden lg:inline-block",children:(0,t.jsx)(a,{})})]}),(0,t.jsx)("div",{className:"border-primary border-b-2"})]}),(0,t.jsx)("div",{className:"card-body pb-40 overflow-y-auto lg:h-100%-70px",children:(0,t.jsxs)("div",{className:"lg:pr-24",children:[(0,t.jsx)(x,{data:s,noBorder:!0}),(0,t.jsxs)("div",{className:"relative pt-4 mb-8 lg:mb-12 ck-editor-reverse",children:[(0,t.jsx)(c.ML,{}),(0,t.jsx)("button",{type:"button",className:"my-5 h-16 lg:absolute lg:m-0 lg:bottom-4 lg:right-12 lg:h-11 text-lg w-full text-white lg:w-48 rounded-full bg-primary hover:opacity-40 disabled:opacity-40 disabled:cursor-not-allowed focus:outline-none shadow-md",children:"Add Comment"})]}),(0,t.jsx)("div",{className:"hidden lg:block border-primary border-b"}),(0,t.jsx)("ul",{className:"pb-20",children:s.discussions.map((function(e,s){return(0,t.jsx)("li",{children:(0,t.jsx)(x,{data:e})},s)}))})]})})]})})})}),"final-all")},904:function(e,s,a){(window.__NEXT_P=window.__NEXT_P||[]).push(["/dashboard/discussion/[_id]",function(){return a(4865)}])}},function(e){e.O(0,[9774,2554,1282,319,6993,5802,8271],(function(){return s=904,e(e.s=s);var s}));var s=e.O();_N_E=s}]);