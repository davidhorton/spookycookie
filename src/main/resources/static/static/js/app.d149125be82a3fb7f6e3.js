webpackJsonp([1],{"9M+g":function(e,t){},COoH:function(e,t){},"E++M":function(e,t){},Jmt5:function(e,t){},NHnr:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=n("7+uW"),a=n("bNL2"),o=n.n(a),s={render:function(){var e=this.$createElement,t=this._self._c||e;return t("div",{attrs:{id:"app"}},[t("router-view")],1)},staticRenderFns:[]};var i=n("VU/8")({name:"App"},s,!1,function(e){n("COoH")},null,null).exports,c=n("/ocq"),u=n("pFYg"),d=n.n(u),l=n("mtWM"),p=n.n(l),f={name:"Quiz",data:function(){return{loading:!0,errored:!1,errorMessage:"",questions:[],currentStep:0}},computed:{currentQuestion:function(){return this.questions[this.currentStep].questionText}},methods:{handleError:function(e,t){var n=e||t;console.log(n),this.errorMessage=n,this.errored=!0,"object"===(void 0===t?"undefined":d()(t))&&403===t.response.status&&(window.location.href="login")}},mounted:function(){var e=this;p.a.get("/api/questions").then(function(t){e.questions=t.data}).catch(function(t){e.loading=!1,e.handleError(null,t)}).finally(function(){return e.loading=!1})}},h={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",[e.loading?n("b-spinner",{staticStyle:{width:"100px",height:"100px",position:"fixed",top:"40%",left:"50%"},attrs:{variant:"secondary"}}):e._e(),e._v(" "),e.loading?e._e():n("b-container",[n("b-row",{staticClass:"justify-content-md-center pt-2"},[n("b-col",{attrs:{cols:"5"}},[n("b-card-group",{attrs:{deck:""}},[n("b-card",{staticClass:"shadow p-3 mb-5 rounded",attrs:{id:"","bg-variant":"light"}},[n("p",[e._v(e._s(e.currentQuestion))]),e._v(" "),n("b-form-input",{staticClass:"mr-sm-2",attrs:{size:"sm",placeholder:"secret code",type:"text"},model:{value:e.search,callback:function(t){e.search=t},expression:"search"}})],1)],1)],1)],1)],1),e._v(" "),n("b-modal",{attrs:{centered:"","hide-footer":"",title:"No Bueno...","header-bg-variant":"danger","header-text-variant":"dark"},model:{value:e.errored,callback:function(t){e.errored=t},expression:"errored"}},[n("p",[e._v(e._s(e.errorMessage))])])],1)},staticRenderFns:[]};var v={name:"Dashboard",components:{Quiz:n("VU/8")(f,h,!1,function(e){n("E++M")},null,null).exports}},m={render:function(){var e=this.$createElement,t=this._self._c||e;return t("div",{staticClass:"main"},[t("div",[t("b-navbar",{staticClass:"shadow p-2 mb-4",attrs:{toggleable:"lg",type:"dark",variant:"purple"}},[t("b-navbar-brand",{staticStyle:{"padding-left":"20%"}},[this._v("Spooky Cookie")])],1)],1),this._v(" "),t("Quiz"),this._v(" "),t("b-container",[t("div",{staticClass:"copyright"},[t("p",[this._v("©2019 Rick's Creek Ward")])])])],1)},staticRenderFns:[]};var b=n("VU/8")(v,m,!1,function(e){n("VymP")},"data-v-73c40f57",null).exports;r.default.use(c.a);var g=new c.a({mode:"history",routes:[{path:"/",name:"Dashboard",component:b}]}),_=n("Tqaz"),y=n("C/JF"),w=n("1e6/"),x=n("fhbW"),C=n("Yu89");y.c.add(x.b,x.c,x.a,C.b,C.a),r.default.component("font-awesome-icon",w.a);n("Jmt5"),n("9M+g");r.default.use(_.a),r.default.use(o.a),com.horton.spookycookie.security.productionTip=!1,new r.default({el:"#app",router:g,components:{App:i},template:"<App/>"})},VymP:function(e, t){}},["NHnr"]);
//# sourceMappingURL=app.d149125be82a3fb7f6e3.js.map