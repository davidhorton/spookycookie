webpackJsonp([1],{"9M+g":function(e,t){},COoH:function(e,t){},Jmt5:function(e,t){},LaSM:function(e,t){},NHnr:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var o=a("7+uW"),n=a("bNL2"),r=a.n(n),s={render:function(){var e=this.$createElement,t=this._self._c||e;return t("div",{attrs:{id:"app"}},[t("router-view")],1)},staticRenderFns:[]};var i=a("VU/8")({name:"App"},s,!1,function(e){a("COoH")},null,null).exports,l=a("/ocq"),d=a("mtWM"),c=a.n(d),u=a("pFYg"),h=a.n(u),m={name:"Updater",data:function(){return{search:"",imageSelected:"",branchSelected:"",versions:[],loading:!0,readyToUse:!1,loadingCompanyInfo:!1,companyInfo:{},companySelected:"",errored:!1,errorMessage:"",dbLogStatements:[],selectedImageId:0,doingAnUpdate:!1}},computed:{filteredItems:function(){var e=this;return this.versions.filter(function(t){return t.dockerImage.toLowerCase().indexOf(e.search.trim().toLowerCase())>-1}).sort(function(e,t){return e.dockerImage>t.dockerImage?1:-1})},isDisabled:function(){return 6!==this.companySelected.length},modelTableItems:function(){return[{key:"Image",value:this.imageSelected},{key:"Branch",value:this.branchSelected},{key:"CompanyID",value:this.companySelected},{key:"Sandbox",value:this.companyInfo.sandboxName},{key:"Database",value:this.companyInfo.databaseName}]}},methods:{showModal:function(){this.$refs["are-you-sure-modal"].show()},hideModal:function(){this.$refs["are-you-sure-modal"].hide()},handleError:function(e,t){var a=e||t;console.log(a),this.errorMessage=a,this.errored=!0,"object"===(void 0===t?"undefined":h()(t))&&403===t.response.status&&(window.location.href="login")},onSelectVersion:function(e){this.imageSelected=e.dockerImage,this.branchSelected=e.imageBranch,this.selectedImageId=e.id,this.deselectAllVersions(),e.selected=!0},deselectAllVersions:function(){for(var e=0;e<this.versions.length;e++)this.versions[e].selected=!1},getCompanyInfoIfValid:function(){this.isDisabled||""===this.imageSelected||this.getCompanyInfo()},getCompanyInfo:function(){var e=this;this.loadingCompanyInfo=!0,c.a.get("/api/company/"+this.companySelected).then(function(t){e.companyInfo=t.data,e.companyInfo.internal?e.showModal():e.handleError("Whoa whoa whoa, that's a production database!!! You best make like a tree and get out of here.")}).catch(function(t){e.loadingCompanyInfo=!1,e.handleError("Failed to get company information for "+e.companySelected+". Are you sure you put in the right company ID? Here's the actual error: "+t,t)}).finally(function(){e.loadingCompanyInfo=!1})},refreshVersions:function(){var e=this;this.loading=!0,this.imageSelected="",this.deselectAllVersions(),c.a.get("/api/versions").then(function(t){e.versions=t.data}).catch(function(t){e.loading=!1,e.handleError(null,t)}).finally(function(){return e.loading=!1})},addLogMessage:function(e,t){this.dbLogStatements.push({text:e,isError:t})},runUpdate:function(){this.hideModal(),this.doingAnUpdate=!0,this.$refs["display-logs-modal"].show();var e=this,t=new EventSource("/api/update/stream/"+e.selectedImageId+"/"+e.companySelected);t.addEventListener("message",function(a){if(a&&a.data){var o=a.data;e.addLogMessage(o,o.includes("Error occurred")),o.includes("DB update is complete")&&e.finishDBUpdate(t)}}),t.addEventListener("error",function(a){e.addLogMessage(a.data,!0),e.finishDBUpdate(t)})},finishDBUpdate:function(e){e.close(),this.doingAnUpdate=!1},closeDBUpdateModal:function(){this.$refs["display-logs-modal"].hide(),this.dbLogStatements=[]}},mounted:function(){var e=this;c.a.get("/api/gitStatus").then(function(t){if("LOADING"===t.data)e.handleError("Before this service can be used it needs to clone a copy of the Evolution git repository, and it's still working on doing that. Please check back again later as it may take a long time.");else{if("FAILED"!==t.data)return e.readyToUse=!0,c.a.get("/api/versions").then(function(t){e.versions=t.data}).catch(function(t){e.loading=!1,e.handleError(null,t)}).finally(function(){return e.loading=!1});e.handleError("Something went wrong while the service was trying to initialize the Evolution git repo... someone will need to look at the service logs to see what went wrong.")}}).catch(function(t){e.handleError(null,t)}).finally(function(){return e.loading=!1})}},p={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",[e.loading?a("b-spinner",{staticStyle:{width:"100px",height:"100px",position:"fixed",top:"40%",left:"50%"},attrs:{variant:"secondary"}}):e._e(),e._v(" "),e.readyToUse||e.loading?e._e():a("div",{staticStyle:{"text-align":"center"}},[a("h2",[e._v("Sorry, it's not ready to use yet.")]),e._v(" "),a("h2",[e._v("Go ahead and use the restroom, maybe play some ping pong.")]),e._v(" "),a("h2",[e._v("And then come back and refresh the page.")])]),e._v(" "),!e.loading&&e.readyToUse?a("b-container",[a("b-row",{staticClass:"justify-content-md-center pt-2"},[a("b-col",{attrs:{cols:"5"}},[a("b-card-group",{attrs:{deck:""}},[a("b-card",{staticClass:"shadow p-3 mb-5 rounded",attrs:{id:"","bg-variant":"light"}},[a("p",[e._v("\n              Docker Image:"),a("font-awesome-icon",{staticStyle:{float:"right",cursor:"pointer"},attrs:{icon:"sync"},on:{click:e.refreshVersions}}),e._v(" "),e.imageSelected.length<1?a("strong",[e._v(e._s(e.search))]):a("strong",[e._v(e._s(e.imageSelected))])],1),e._v(" "),a("b-form-input",{staticClass:"mr-sm-2",attrs:{size:"sm",placeholder:"Search for Image - Click to Select",type:"text"},model:{value:e.search,callback:function(t){e.search=t},expression:"search"}}),e._v(" "),a("br"),e._v(" "),a("div",{staticStyle:{"max-height":"500px","overflow-y":"scroll"}},[a("b-list-group",e._l(e.filteredItems,function(t,o){return a("b-list-group-item",{key:o,attrs:{button:"",active:t.selected},on:{click:function(){e.onSelectVersion(t)}}},[e._v(e._s(t.dockerImage))])}),1)],1)],1)],1)],1),e._v(" "),a("b-col",{attrs:{cols:"5"}},[a("b-card-group",{attrs:{deck:""}},[a("b-card",{staticClass:"shadow p-3 mb-5 rounded",attrs:{id:"","bg-variant":"light"}},[a("p",[e._v("\n              Sandbox CompanyID:\n              "),a("strong",[e._v(e._s(e.companySelected))])]),e._v(" "),a("b-form-input",{staticClass:"mr-sm-2",attrs:{size:"sm",placeholder:"Please type CompanyID here - example: 101693",type:"number"},on:{keydown:function(t){return!t.type.indexOf("key")&&e._k(t.keyCode,"enter",13,t.key,"Enter")?null:e.getCompanyInfoIfValid(t)}},model:{value:e.companySelected,callback:function(t){e.companySelected=t},expression:"companySelected"}}),e._v(" "),a("div",{staticClass:"pt-4 text-right"},[a("b-button",{staticClass:"shadow-sm p-2 rounded",attrs:{variant:"success",disabled:e.isDisabled||""===e.imageSelected},on:{click:e.getCompanyInfo}},[e.loadingCompanyInfo?a("b-spinner",{attrs:{small:""}}):e._e(),e._v(" "),a("strong",[e._v("Run Update")])],1)],1),e._v(" "),a("b-modal",{ref:"are-you-sure-modal",attrs:{size:"lg",centered:"","hide-footer":"",title:"Does this look right? Double check!"}},[a("b-table",{attrs:{striped:"","thead-class":"hidden_header",items:e.modelTableItems}}),e._v(" "),a("div",[a("b-button",{staticStyle:{float:"left"},attrs:{variant:"outline-danger"},on:{click:e.hideModal}},[e._v("Cancel")]),e._v(" "),a("b-button",{staticStyle:{float:"right"},attrs:{variant:"success"},on:{click:e.runUpdate}},[e._v("Continue")])],1)],1),e._v(" "),a("b-modal",{ref:"display-logs-modal",attrs:{centered:"","no-close-on-backdrop":!0,"no-close-on-esc":!0,title:"DB Updater Logs"}},[a("div",{attrs:{id:"oldschoolmodal-outer"}},[e.doingAnUpdate?e._e():a("i",{attrs:{id:"oldschoolmodal-close-text"},on:{click:e.closeDBUpdateModal}},[e._v("X")]),e._v(" "),a("div",{attrs:{id:"oldschoolmodal-screen"}},[a("div",{directives:[{name:"chat-scroll",rawName:"v-chat-scroll",value:{always:!0,smooth:!0},expression:"{always: true, smooth: true}"}],ref:"oldschoolmodal-output-area",attrs:{id:"oldschoolmodal-output"}},e._l(e.dbLogStatements,function(t,o){return a("p",{key:o,class:{redMessage:t.isError}},[e._v(" "+e._s(t.text))])}),0)]),e._v(" "),a("div",{attrs:{id:"oldschoolmodal-led"}})])])],1)],1)],1)],1)],1):e._e(),e._v(" "),a("b-modal",{attrs:{centered:"","hide-footer":"",title:"No Bueno...","header-bg-variant":"danger","header-text-variant":"dark"},model:{value:e.errored,callback:function(t){e.errored=t},expression:"errored"}},[a("p",[e._v(e._s(e.errorMessage))])])],1)},staticRenderFns:[]};var f={name:"Dashboard",components:{Updater:a("VU/8")(m,p,!1,function(e){a("LaSM")},null,null).exports},data:function(){return{loading:!0,userName:"Buddy"}},mounted:function(){var e=this;c.a.get("/api/username").then(function(t){e.userName=t.data}).catch(function(t){console.log("Failed to lookup username "+t),e.loading=!1}).finally(function(){return e.loading=!1})}},g={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"main"},[e.loading?a("b-spinner",{staticStyle:{width:"100px",height:"100px",position:"fixed",top:"40%",left:"50%"},attrs:{variant:"secondary"}}):e._e(),e._v(" "),e.loading?e._e():a("div",[a("b-navbar",{staticClass:"shadow p-2 mb-4",attrs:{toggleable:"lg",type:"dark",variant:"purple"}},[a("b-navbar-brand",{staticStyle:{"padding-left":"20%"}},[e._v("Remote Internal DB Updater")]),e._v(" "),a("b-navbar-nav",{staticClass:"ml-auto"},[a("b-nav-item-dropdown",{attrs:{right:""}},[a("template",{slot:"button-content"},[a("em",[e._v("Sup "+e._s(e.userName))])]),e._v(" "),a("b-dropdown-item",{attrs:{href:"/logout"}},[e._v("Sign Out")])],2)],1)],1)],1),e._v(" "),a("Updater"),e._v(" "),a("b-container",[a("div",{staticClass:"copyright"},[a("p",[e._v("©2019-2112 CDK Global, LLC - "),a("a",{staticStyle:{color:"white"},attrs:{target:"_blank",href:"https://www.youtube.com/watch?v=dQw4w9WgXcQ"}},[e._v("Recreation")])])])])],1)},staticRenderFns:[]};var v=a("VU/8")(f,g,!1,function(e){a("ohZ9")},"data-v-7fa93c27",null).exports;o.default.use(l.a);var y=new l.a({mode:"history",routes:[{path:"/",name:"Dashboard",component:v}]}),b=a("Tqaz"),_=a("C/JF"),S=a("1e6/"),w=a("fhbW"),k=a("Yu89");_.c.add(w.b,w.c,w.a,k.b,k.a),o.default.component("font-awesome-icon",S.a);a("Jmt5"),a("9M+g");o.default.use(b.a),o.default.use(r.a),o.default.config.productionTip=!1,new o.default({el:"#app",router:y,components:{App:i},template:"<App/>"})},ohZ9:function(e,t){}},["NHnr"]);
//# sourceMappingURL=app.70112a63bc75d13b8c39.js.map