webpackJsonp([1],{"3afR":function(t,e){},"9M+g":function(t,e){},COoH:function(t,e){},Jmt5:function(t,e){},NHnr:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a=n("7+uW"),r=n("bNL2"),o=n.n(r),s={render:function(){var t=this.$createElement,e=this._self._c||t;return e("div",{attrs:{id:"app"}},[e("router-view")],1)},staticRenderFns:[]};var i=n("VU/8")({name:"App"},s,!1,function(t){n("COoH")},null,null).exports,l=n("/ocq"),u=n("pFYg"),c=n.n(u),d=n("mtWM"),h=n.n(d),p={name:"Quiz",data:function(){return{loading:!0,errored:!1,questions:[],teamSelected:!1,teams:[],selectedTeam:{},answer:"",currentStep:0,allDone:!1,wrongAnswer:!1,wrongAnswerText:""}},computed:{currentQuestion:function(){return this.questions[this.currentStep]},currentQuestionText:function(){return this.currentQuestion.questionText}},methods:{onSelectTeam:function(t){var e=this;this.loading=!0,h.a.get("http://localhost:8558/api/quiz/team/"+t.id+"/questions").then(function(n){e.selectedTeam=t,e.questions=n.data}).catch(function(t){e.loading=!1,e.handleError(null,t)}).finally(function(){return e.loading=!1}),this.teamSelected=!0},previousQuestion:function(){0===this.currentStep?(this.teamSelected=!1,this.selectedTeam={}):this.currentStep--},nextQuestion:function(){for(var t=this.currentQuestion,e=!1,n=0;n<t.answers.length;n++)this.answer.trim().toUpperCase()===t.answers[n].trim().toUpperCase()&&(e=!0);e?(this.currentStep===this.questions.length-1?this.allDone=!0:this.currentStep++,this.wrongAnswer=!1,this.wrongAnswerText="",this.answer=""):(this.wrongAnswer=!0,this.setWrongAnswerText())},startOver:function(){this.currentStep=0,this.teamSelected=!1,this.selectedTeam={},this.allDone=!1},setWrongAnswerText:function(){var t=["Nope, that's super duper wrong.","It appears you are silly and put the wrong answer.","Wowza, that is wrong!","No doubt about it - that is wrong.","How about you just put in the right answer this time, okay?"];this.wrongAnswerText=t[Math.floor(Math.random()*t.length)]},handleError:function(t,e){var n=t||e;console.log(n),this.errored=!0,"object"===(void 0===e?"undefined":c()(e))&&403===e.response.status&&(window.location.href="login")}},mounted:function(){var t=this;h.a.get("http://localhost:8558/api/quiz/teams").then(function(e){t.teams=e.data}).catch(function(e){t.loading=!1,t.handleError(null,e)}).finally(function(){return t.loading=!1})}},f={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"main"},[n("div",{staticStyle:{"background-color":"rgba(37, 36, 57, 0.9)"}},[n("b-navbar",{staticClass:"shadow p-2 mb-4",attrs:{toggleable:"lg",type:"dark",variant:"purple"}},[n("b-navbar-brand",{staticStyle:{"padding-left":"20%"}},[t._v("Spooky Cookie!")])],1)],1),t._v(" "),n("div",[t.loading?n("b-spinner",{staticStyle:{width:"100px",height:"100px",position:"fixed",top:"40%",left:"50%"},attrs:{variant:"secondary"}}):t._e(),t._v(" "),t.loading?t._e():n("b-container",[t.teamSelected||t.allDone?t._e():n("b-card",{staticClass:"shadow p-3 mb-5 rounded",attrs:{id:"","bg-variant":"light"}},[n("div",{staticStyle:{"max-height":"400px","overflow-y":"scroll"}},[n("b-list-group",t._l(t.teams,function(e,a){return n("b-list-group-item",{key:a,attrs:{button:""},on:{click:function(){t.onSelectTeam(e)}}},[t._v("Team "+t._s(e.number))])}),1)],1)]),t._v(" "),t.teamSelected&&!t.allDone?n("b-card",{staticClass:"shadow p-3 mb-5 rounded",attrs:{id:"","bg-variant":"light"}},[n("p",[t._v(t._s(t.currentQuestionText))]),t._v(" "),t.wrongAnswer?n("p",{staticStyle:{color:"red"}},[t._v(t._s(t.wrongAnswerText))]):t._e(),t._v(" "),n("b-form-input",{staticClass:"mr-sm-2",attrs:{size:"sm",placeholder:"secret code",type:"text"},model:{value:t.answer,callback:function(e){t.answer=e},expression:"answer"}}),t._v(" "),n("div",{staticClass:"pt-4"},[0===t.currentStep||t.allDone?t._e():n("b-button",{staticClass:"shadow-sm p-2 rounded float-left",attrs:{variant:"primary"},on:{click:t.previousQuestion}},[n("strong",[t._v("< Back")])]),t._v(" "),t.allDone?t._e():n("b-button",{staticClass:"shadow-sm p-2 rounded float-right",attrs:{variant:"success"},on:{click:t.nextQuestion}},[n("strong",[t._v("Next >")])])],1)],1):t._e(),t._v(" "),t.allDone?n("b-card",{staticClass:"shadow p-3 mb-5 rounded",attrs:{id:"","bg-variant":"light"}},[n("p",{staticStyle:{"text-align":"center"}},[t._v("All done! You did it!")])]):t._e()],1),t._v(" "),n("b-modal",{attrs:{centered:"","hide-footer":"",title:"No Bueno...","header-bg-variant":"danger","header-text-variant":"dark"},model:{value:t.errored,callback:function(e){t.errored=e},expression:"errored"}},[n("p",[t._v("Uh oh, something went wrong. Go tell David Horton and he'll fix it!")])])],1)])},staticRenderFns:[]};var g=n("VU/8")(p,f,!1,function(t){n("3afR")},"data-v-76d810c6",null).exports;a.default.use(l.a);var m=new l.a({mode:"history",routes:[{path:"/",name:"Dashboard",component:g}]}),v=n("Tqaz"),w=n("C/JF"),b=n("1e6/"),_=n("fhbW"),x=n("Yu89");w.c.add(_.b,_.c,_.a,x.b,x.a),a.default.component("font-awesome-icon",b.a);n("Jmt5"),n("9M+g");a.default.use(v.a),a.default.use(o.a),com.horton.spookycookie.security.productionTip=!1,new a.default({el:"#app",router:m,components:{App:i},template:"<App/>"})}},["NHnr"]);
//# sourceMappingURL=app.5713024c9344fedb15b2.js.map