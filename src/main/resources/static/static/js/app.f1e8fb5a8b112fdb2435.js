webpackJsonp([1],{"9M+g":function(t,e){},AUiz:function(t,e){},COoH:function(t,e){},F42i:function(t,e){},Jmt5:function(t,e){},NHnr:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var r=n("7+uW"),a=n("bNL2"),s=n.n(a),o={render:function(){var t=this.$createElement,e=this._self._c||t;return e("div",{attrs:{id:"app"}},[e("router-view")],1)},staticRenderFns:[]};var i=n("VU/8")({name:"App"},o,!1,function(t){n("COoH")},null,null).exports,l=n("/ocq"),u=n("pFYg"),c=n.n(u),d=n("mtWM"),h=n.n(d),p={name:"Quiz",data:function(){return{loading:!0,errored:!1,questions:[],allDoneText:"",superDuperHint:"",teamSelected:!1,teams:[],selectedTeam:{},answer:"",currentStep:0,showHint:!1,showSuperDuperHint:!1,allDone:!1,wrongAnswer:!1,wrongAnswerText:"",rightAnswer:!1,rightAnswerText:""}},computed:{currentQuestion:function(){return this.questions[this.currentStep]},currentQuestionText:function(){return this.currentQuestion.questionText},currentQuestionHint:function(){return this.currentQuestion.hint},currentQuestionHeader:function(){return"Team #"+this.selectedTeam.number+", Question #"+this.currentQuestion.number}},methods:{onSelectTeam:function(t){var e=this;this.loading=!0,h.a.get("/api/quiz/team/"+t.id+"/questions").then(function(n){e.selectedTeam=t,e.questions=n.data}).catch(function(t){e.loading=!1,e.handleError(null,t)}).finally(function(){return e.loading=!1}),this.teamSelected=!0},previousQuestion:function(){0===this.currentStep?(this.teamSelected=!1,this.selectedTeam={}):this.currentStep--,this.showHint=!1,this.showSuperDuperHint=!1,this.$forceUpdate()},nextQuestion:function(){for(var t=this.currentQuestion,e=!1,n=0;n<t.answers.length;n++)this.answer.trim().toUpperCase()===t.answers[n].trim().toUpperCase()&&(e=!0);e?(this.currentStep===this.questions.length-1?this.allDone=!0:this.currentStep++,this.rightAnswer=!0,this.wrongAnswer=!1,this.wrongAnswerText="",this.setRightAnswerText(),this.answer="",this.showHint=!1,this.showSuperDuperHint=!1,this.$forceUpdate()):(this.rightAnswer=!1,this.wrongAnswer=!0,this.rightAnswerText="",this.setWrongAnswerText())},startOver:function(){this.currentStep=0,this.teamSelected=!1,this.selectedTeam={},this.allDone=!1},setWrongAnswerText:function(){var t=["Nope, that's super duper wrong.","It appears you are silly and put the wrong answer.","Wowza, that is wrong!","No doubt about it - that is wrong.","How about you just put in the right answer this time, okay?","Sorry, that's the wrong answer.","I regret to inform you that that is the wrong answer."];this.wrongAnswerText=t[Math.floor(Math.random()*t.length)]},setRightAnswerText:function(){var t=["Nice! On to the next one!","You done good. Keep going!","Your skill is unmatched. Well done!","Good job!","Yup, that's right!"];this.rightAnswerText=t[Math.floor(Math.random()*t.length)]},handleError:function(t,e){var n=t||e;console.log(n),this.errored=!0,"object"===(void 0===e?"undefined":c()(e))&&403===e.response.status&&(window.location.href="login")}},mounted:function(){var t=this;h.a.get("/api/quiz/info").then(function(e){var n=e.data;t.teams=n.teams,t.allDoneText=n.allDoneMessage,t.superDuperHint=n.superDuperHint}).catch(function(e){t.loading=!1,t.handleError(null,e)}).finally(function(){return t.loading=!1})}},m={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"main"},[n("div",{staticStyle:{"background-color":"rgba(37, 36, 57, 0.9)"}},[n("b-navbar",{staticClass:"shadow p-2 mb-4",attrs:{toggleable:"lg",type:"dark",variant:"purple"}},[n("b-navbar-brand",{staticStyle:{"padding-left":"20%"}},[t._v("Spooky Cookie!")]),t._v(" "),n("b-navbar-nav",{staticClass:"ml-auto"},[n("b-nav-item-dropdown",{attrs:{right:""}},[n("template",{slot:"button-content"}),t._v(" "),n("b-dropdown-item",{on:{click:t.startOver}},[t._v("Start Over")]),t._v(" "),n("b-dropdown-item",{attrs:{href:"/admin"}},[t._v("Admin")])],2)],1)],1)],1),t._v(" "),n("div",[t.loading?n("b-spinner",{staticStyle:{width:"100px",height:"100px",position:"fixed",top:"40%",left:"40%"},attrs:{variant:"secondary"}}):t._e(),t._v(" "),t.loading?t._e():n("b-container",[t.teamSelected||t.allDone?t._e():n("b-card",{staticClass:"shadow p-3 mb-5 rounded",attrs:{header:"Choose your team!",id:"","bg-variant":"light"}},[n("div",[n("b-list-group",t._l(t.teams,function(e,r){return n("b-list-group-item",{key:r,attrs:{button:""},on:{click:function(){t.onSelectTeam(e)}}},[t._v("Team "+t._s(e.number))])}),1)],1)]),t._v(" "),t.teamSelected&&!t.allDone?n("b-card",{staticClass:"shadow p-3 mb-5 rounded",attrs:{header:t.currentQuestionHeader,id:"","bg-variant":"light"}},[t.rightAnswer?n("p",{staticStyle:{color:"#009c00"}},[t._v(t._s(t.rightAnswerText))]):t._e(),t._v(" "),n("p",[t._v(t._s(t.currentQuestionText))]),t._v(" "),n("a",{class:t.showHint?"collapsed":null,attrs:{href:"#"},on:{click:function(e){t.showHint=!t.showHint}}},[t._v("Show hint...")]),t._v(" "),n("b-collapse",{staticClass:"mt-2",attrs:{id:"question-hint"},model:{value:t.showHint,callback:function(e){t.showHint=e},expression:"showHint"}},[n("b-card",[t._v(t._s(t.currentQuestionHint))]),t._v(" "),n("a",{class:t.showSuperDuperHint?"collapsed":null,attrs:{href:"#"},on:{click:function(e){t.showSuperDuperHint=!t.showSuperDuperHint}}},[t._v("Still stuck?")]),t._v(" "),n("b-collapse",{staticClass:"mt-2",attrs:{id:"super-duper-hint"},model:{value:t.showSuperDuperHint,callback:function(e){t.showSuperDuperHint=e},expression:"showSuperDuperHint"}},[n("b-card",[t._v(t._s(t.superDuperHint))])],1)],1),t._v(" "),t.wrongAnswer?n("p",{staticStyle:{color:"#e20000"}},[t._v(t._s(t.wrongAnswerText))]):t._e(),t._v(" "),n("b-form-input",{staticClass:"mr-sm-2",staticStyle:{"margin-top":"20px"},attrs:{size:"sm",placeholder:"Type the secret code here",type:"text"},on:{keydown:function(e){return!e.type.indexOf("key")&&t._k(e.keyCode,"enter",13,e.key,"Enter")?null:t.nextQuestion(e)}},model:{value:t.answer,callback:function(e){t.answer=e},expression:"answer"}}),t._v(" "),n("div",{staticClass:"pt-4"},[t.allDone?t._e():n("b-button",{staticClass:"shadow-sm p-2 rounded float-left",attrs:{variant:"primary"},on:{click:t.previousQuestion}},[n("strong",[t._v("< Back")])]),t._v(" "),t.allDone?t._e():n("b-button",{staticClass:"shadow-sm p-2 rounded float-right",attrs:{variant:"success"},on:{click:t.nextQuestion}},[n("strong",[t._v("Next >")])])],1)],1):t._e(),t._v(" "),t.allDone?n("b-card",{staticClass:"shadow p-3 mb-5 rounded",attrs:{header:"Nice!",id:"","bg-variant":"light"}},[n("p",{staticStyle:{"text-align":"center"}},[t._v(t._s(t.allDoneText))]),t._v(" "),n("div",{staticStyle:{"text-align":"center"}},[n("b-button",{staticClass:"shadow-sm p-2 rounded",attrs:{variant:"primary"},on:{click:t.startOver}},[n("strong",[t._v("Start Over")])])],1)]):t._e()],1),t._v(" "),n("b-modal",{attrs:{centered:"","hide-footer":"",title:"No Bueno...","header-bg-variant":"danger","header-text-variant":"dark"},model:{value:t.errored,callback:function(e){t.errored=e},expression:"errored"}},[n("p",[t._v("Uh oh, something went wrong. Go tell David Horton and he'll fix it!")])])],1)])},staticRenderFns:[]};var v=n("VU/8")(p,m,!1,function(t){n("AUiz")},"data-v-1a351cd0",null).exports,g={name:"Admin",data:function(){return{loading:!0,errored:!1,allDoneText:"",superDuperHint:"",teams:[],teamSelected:!1,selectedTeam:{},questions:[]}},computed:{questionOrderingHeader:function(){return"Question Ordering for Team #"+this.selectedTeam.number}},methods:{onSelectTeam:function(t){this.selectedTeam=t,this.teamSelected=!0,this.deselectAllTeams(),t.selected=!0},save:function(){},cancel:function(){},deselectAllTeams:function(){for(var t=0;t<this.teams.length;t++)this.teams[t].selected=!1},handleError:function(t,e){var n=t||e;console.log(n),this.errored=!0,"object"===(void 0===e?"undefined":c()(e))&&403===e.response.status&&(window.location.href="login")}},mounted:function(){var t=this;h.a.get("/api/quiz/info").then(function(e){var n=e.data;t.teams=n.teams,t.allDoneText=n.allDoneMessage,t.superDuperHint=n.superDuperHint}).catch(function(e){t.loading=!1,t.handleError(null,e)}).finally(function(){return t.loading=!1})}},f={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"main"},[n("div",{staticStyle:{"background-color":"rgba(37, 36, 57, 0.9)"}},[n("b-navbar",{staticClass:"shadow p-2 mb-4",attrs:{toggleable:"lg",type:"dark",variant:"purple"}},[n("b-navbar-brand",{staticStyle:{"padding-left":"20%"}},[t._v("Spooky Cookie Admin")]),t._v(" "),n("b-navbar-nav",{staticClass:"ml-auto"},[n("b-nav-item-dropdown",{attrs:{right:""}},[n("template",{slot:"button-content"}),t._v(" "),n("b-dropdown-item",{attrs:{href:"/"}},[t._v("Go to quiz")]),t._v(" "),n("b-dropdown-item",{attrs:{href:"/logout"}},[t._v("Logout")])],2)],1)],1)],1),t._v(" "),n("div",[t.loading?n("b-spinner",{staticStyle:{width:"100px",height:"100px",position:"fixed",top:"40%",left:"40%"},attrs:{variant:"secondary"}}):t._e(),t._v(" "),t.loading?t._e():n("b-container",[n("b-card",{staticClass:"shadow p-3 mb-5 rounded",attrs:{header:"General",id:"","bg-variant":"light"}},[n("b-form-input",{staticClass:"mr-sm-2",staticStyle:{"margin-top":"20px"},attrs:{size:"sm",placeholder:"The 'all done' text",type:"text"},model:{value:t.allDoneText,callback:function(e){t.allDoneText=e},expression:"allDoneText"}}),t._v(" "),n("b-form-input",{staticClass:"mr-sm-2",staticStyle:{"margin-top":"20px"},attrs:{size:"sm",placeholder:"The super duper hint",type:"text"},model:{value:t.superDuperHint,callback:function(e){t.superDuperHint=e},expression:"superDuperHint"}})],1),t._v(" "),n("b-card",{staticClass:"shadow p-3 mb-5 rounded",attrs:{header:"Teams",id:"","bg-variant":"light"}},[n("div",[n("b-list-group",t._l(t.teams,function(e,r){return n("b-list-group-item",{key:r,attrs:{button:"",active:e.selected},on:{click:function(){t.onSelectTeam(e)}}},[t._v("Team "+t._s(e.number))])}),1)],1)]),t._v(" "),t.teamSelected?n("b-card",{staticClass:"shadow p-3 mb-5 rounded",attrs:{header:t.questionOrderingHeader,id:"","bg-variant":"light"}},[n("div",[n("b-list-group",t._l(t.questions,function(e,r){return n("b-list-group-item",{key:r,attrs:{button:"",active:e.selected},on:{click:function(){t.onSelectTeam(e)}}},[t._v("Team "+t._s(e.number))])}),1)],1)]):t._e(),t._v(" "),n("b-card",{staticStyle:{border:"none"}},[n("div",{staticClass:"pt-4"},[n("b-button",{staticClass:"shadow-sm p-2 rounded float-left",attrs:{variant:"warning"},on:{click:t.cancel}},[n("strong",[t._v("Cancel")])]),t._v(" "),n("b-button",{staticClass:"shadow-sm p-2 rounded float-right",attrs:{variant:"success"},on:{click:t.save}},[n("strong",[t._v("Save")])])],1)])],1),t._v(" "),n("b-modal",{attrs:{centered:"","hide-footer":"",title:"No Bueno...","header-bg-variant":"danger","header-text-variant":"dark"},model:{value:t.errored,callback:function(e){t.errored=e},expression:"errored"}},[n("p",[t._v("Uh oh, something went wrong. Go tell David Horton and he'll fix it!")])])],1)])},staticRenderFns:[]};var b=n("VU/8")(g,f,!1,function(t){n("F42i")},"data-v-10d7f5a5",null).exports;r.default.use(l.a);var w=new l.a({mode:"history",routes:[{path:"/",name:"Dashboard",component:v},{path:"/admin",name:"Admin",component:b}]}),_=n("Tqaz"),x=n("C/JF"),S=n("1e6/"),T=n("fhbW"),y=n("Yu89");x.c.add(T.b,T.c,T.a,y.b,y.a),r.default.component("font-awesome-icon",S.a);n("Jmt5"),n("9M+g");r.default.use(_.a),r.default.use(s.a),r.default.config.productionTip=!1,new r.default({el:"#app",router:w,components:{App:i},template:"<App/>"})}},["NHnr"]);
//# sourceMappingURL=app.f1e8fb5a8b112fdb2435.js.map