(function(e){function t(t){for(var r,i,s=t[0],u=t[1],l=t[2],c=0,m=[];c<s.length;c++)i=s[c],Object.prototype.hasOwnProperty.call(o,i)&&o[i]&&m.push(o[i][0]),o[i]=0;for(r in u)Object.prototype.hasOwnProperty.call(u,r)&&(e[r]=u[r]);p&&p(t);while(m.length)m.shift()();return a.push.apply(a,l||[]),n()}function n(){for(var e,t=0;t<a.length;t++){for(var n=a[t],r=!0,i=1;i<n.length;i++){var u=n[i];0!==o[u]&&(r=!1)}r&&(a.splice(t--,1),e=s(s.s=n[0]))}return e}var r={},o={app:0},a=[];function i(e){return s.p+"js/"+({about:"about"}[e]||e)+"."+{about:"77260375"}[e]+".js"}function s(t){if(r[t])return r[t].exports;var n=r[t]={i:t,l:!1,exports:{}};return e[t].call(n.exports,n,n.exports,s),n.l=!0,n.exports}s.e=function(e){var t=[],n=o[e];if(0!==n)if(n)t.push(n[2]);else{var r=new Promise((function(t,r){n=o[e]=[t,r]}));t.push(n[2]=r);var a,u=document.createElement("script");u.charset="utf-8",u.timeout=120,s.nc&&u.setAttribute("nonce",s.nc),u.src=i(e);var l=new Error;a=function(t){u.onerror=u.onload=null,clearTimeout(c);var n=o[e];if(0!==n){if(n){var r=t&&("load"===t.type?"missing":t.type),a=t&&t.target&&t.target.src;l.message="Loading chunk "+e+" failed.\n("+r+": "+a+")",l.name="ChunkLoadError",l.type=r,l.request=a,n[1](l)}o[e]=void 0}};var c=setTimeout((function(){a({type:"timeout",target:u})}),12e4);u.onerror=u.onload=a,document.head.appendChild(u)}return Promise.all(t)},s.m=e,s.c=r,s.d=function(e,t,n){s.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},s.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},s.t=function(e,t){if(1&t&&(e=s(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(s.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)s.d(n,r,function(t){return e[t]}.bind(null,r));return n},s.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return s.d(t,"a",t),t},s.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},s.p="/",s.oe=function(e){throw console.error(e),e};var u=window["webpackJsonp"]=window["webpackJsonp"]||[],l=u.push.bind(u);u.push=t,u=u.slice();for(var c=0;c<u.length;c++)t(u[c]);var p=l;a.push([0,"chunk-vendors"]),n()})({0:function(e,t,n){e.exports=n("56d7")},"00f7":function(e,t,n){"use strict";n("a2d4")},"56d7":function(e,t,n){"use strict";n.r(t);n("e260"),n("e6cf"),n("cca6"),n("a79d");var r=n("2b0e"),o=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{attrs:{id:"app"}},[e._v(" //mettre header et footer "),n("router-view")],1)},a=[],i=(n("5c0b"),n("2877")),s={},u=Object(i["a"])(s,o,a,!1,null,null,null),l=u.exports,c=(n("d3b7"),n("3ca3"),n("ddb0"),n("8c4f")),p=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"home"},[r("img",{attrs:{alt:"Vue logo",src:n("cf05")}}),r("groupomania",{attrs:{msg:"Welcome to Groupomania ! "}}),r("login"),r("signup")],1)},m=[],d=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"hello"},[n("h1",[e._v(e._s(e.msg))]),n("p",[e._v(" Bienvenue sur votre forum d'entreprise. ")])])},f=[],v={name:"groupomania",props:{msg:String}},g=v,h=(n("00f7"),Object(i["a"])(g,d,f,!1,null,"4a171d2a",null)),b=h.exports,w=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"login"},[n("form",[n("div",{staticClass:"form-group col-lg-3 col-sm-6"},[n("input",{directives:[{name:"model",rawName:"v-model",value:e.email,expression:"email"}],attrs:{type:"email",placeholder:"email",size:"50",required:"","aria-label":"Email de connection"},domProps:{value:e.email},on:{input:function(t){t.target.composing||(e.email=t.target.value)}}}),e._v(" "),n("br")]),n("div",{staticClass:"form-group col-lg-3 col-sm-6"},[n("input",{directives:[{name:"model",rawName:"v-model",value:e.password,expression:"password"}],attrs:{type:"password",placeholder:"password",size:"50",required:""},domProps:{value:e.password},on:{input:function(t){t.target.composing||(e.password=t.target.value)}}}),e._v(" "),n("br")]),n("button",{on:{click:function(t){return t.preventDefault(),e.login()}}},[e._v("Se connecter")]),e._m(0)])])},y=[function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("p",[e._v("Pas encore inscrit ? "),n("a",{attrs:{href:"#"}},[e._v("Inscrivez-vous")])])}],_=n("bc3a"),j=n.n(_),O={name:"login",data:function(){return{email:"",password:"",userId:""}},methods:{login:function(){var e="";""==this.email||""==this.password?alert("Veuillez renseigner un email et un mot de passe correct !"):j.a.post("http://localhost:8080/api/users/login",{email:this.email,password:this.password},{headers:{"Content-type":"application/json",Authorization:"Bearer".concat(e)}}).then((function(e){localStorage.setItem("userId",e.data.userId),localStorage.setItem("token",e.data.token),location.href="http://localhost:8080/api/mur"})).catch((function(e){e.status(400).json({message:"Something went wrong"})}))}}},x=O,S=Object(i["a"])(x,w,y,!1,null,"73c164a2",null),P=S.exports,k=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"signup"},[n("form",[n("input",{directives:[{name:"model",rawName:"v-model",value:e.name,expression:"name"}],attrs:{type:"name",placeholder:"name",size:"50",required:""},domProps:{value:e.name},on:{input:function(t){t.target.composing||(e.name=t.target.value)}}}),n("br"),n("input",{directives:[{name:"model",rawName:"v-model",value:e.email,expression:"email"}],attrs:{type:"email",placeholder:"email",size:"50",required:"","aria-label":"Email de connection"},domProps:{value:e.email},on:{input:function(t){t.target.composing||(e.email=t.target.value)}}}),e._v(" "),n("br"),n("input",{directives:[{name:"model",rawName:"v-model",value:e.password,expression:"password"}],attrs:{type:"password",placeholder:"password",size:"50",required:""},domProps:{value:e.password},on:{input:function(t){t.target.composing||(e.password=t.target.value)}}}),e._v(" "),n("br")]),n("button",{attrs:{type:"submit","aria-label":"S'inscrire",formaction:"",formenctype:"application/x-www-form-urlencoded"},on:{click:function(t){return e.signup()}}},[e._v("S'inscrire")])])},E=[],C=(n("b0c0"),n("e9c4"),n("d9e2"),{name:"signup",data:function(){return{name:"",email:"",password:""}},methods:{signup:function(){var e={name:this.name,email:this.email,password:this.password};fetch("http://localhost:8080/api/users/signUp",{method:"POST",headers:{Accept:"application/json","Content-Type":"application/json"},body:JSON.stringify(e)}).then((function(e){return e.ok?e.json():e.text().then((function(e){throw new Error(e)}))})).then((function(e){var t=JSON.stringify(e.token),n=JSON.stringify(e.userId);localStorage.setItem("userToken",t),localStorage.setItem("userId",n)})).catch(alert)}}}),I=C,z=Object(i["a"])(I,k,E,!1,null,"69f04aa7",null),N=z.exports,T={name:"Home",components:{groupomania:b,login:P,signup:N}},$=T,q=Object(i["a"])($,p,m,!1,null,null,null),J=q.exports;r["a"].use(c["a"]);var A=[{path:"/",name:"Home",component:J},{path:"/about",name:"About",component:function(){return n.e("about").then(n.bind(null,"f820"))}},{path:"/mur",name:"mur",component:function(){return n.e("about").then(n.bind(null,"c65be"))}}],M=new c["a"]({routes:A}),B=M;r["a"].config.productionTip=!1,new r["a"]({router:B,render:function(e){return e(l)}}).$mount("#app")},"5c0b":function(e,t,n){"use strict";n("9c0c")},"9c0c":function(e,t,n){},a2d4:function(e,t,n){},cf05:function(e,t,n){e.exports=n.p+"img/logo.7be57adb.png"}});
//# sourceMappingURL=app.bed079ab.js.map