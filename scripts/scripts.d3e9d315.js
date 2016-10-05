"use strict";angular.module("grantmcdApp",["ngAnimate","ngCookies","ngResource","ngRoute","ngSanitize","ngTouch"]).config(["$routeProvider",function(a){a.when("/",{templateUrl:"views/main.html",controller:"MainCtrl",controllerAs:"main"}).when("/updown",{templateUrl:"views/updown.html",controller:"UpdownCtrl",controllerAs:"updown"}).when("/329-assignment4",{templateUrl:"views/329-Assignment4.html",controller:"329Assignment4",controllerAs:"329Assignment4"}).otherwise({redirectTo:"/"})}]),angular.module("grantmcdApp").controller("MainCtrl",["$scope","$http",function(a,b){a.projects=[{name:"Task Manager",description:"I started working on this app because I was tired of looking for a dead simple task manager that syncs across all devices. It's a work in progress and I'm still thinking of a clever name for the app. Once the web app is finished, the plan is to build a mobile version for Android as well.",linkText:"Beta Web App",link:"http://todomcd.parseapp.com"},{name:"Dskus",description:"An app to allow communication between an individual presenting and their audience. Users are able to create or join \"discussions\" where they can answer polls or questions from the presenter. Dskus uses Parse for data storage and PubNub for real time communication between users. It's built with AngularJS. I plan on open sourcing this once I've made more progress.",linkText:"Beta Web App",link:"http://dskus.parseapp.com/#/"},{name:"Steam Crawler",description:"My senior design project requires a large amount of Steam game data which isn't available via an API, so I'm currently building an HTML crawler using jSoup to gather as much data as possible from the games' store pages.",linkText:"GitHub",link:"https://github.com/grantmcd/steam-crawl"},{name:"Green Apartment Prototype",description:"Worked with the Director of Sustainability for Iowa State University to gather requirements for a Green Apartment Application that will be created in a future senior design project. The purpose of the app is to allow a user to recreate the layout of their apartment along with any energy consuming items within. Tips and a score related to how environmentally friendly the user's apartment is would be displayed. This UI prototype served as a proof of concept for the final product. I built the apartment visualization component of the app using the <a href='http://fabricjs.com/'>Fabric.js</a> library for easy canvas manipulation.",linkText:"Prototype",link:"http://grantmcd.com/409-pages"},{name:"Portfolio",description:"The site you're currently viewing is made with AngularJS and Bootstrap. One of my main goals with this most recent redesign was to learn how to use Travis CI to speed up the deployment process and to tinker with web typography.",linkText:"GitHub",link:"https://github.com/grantmcd/grantmcd.github.io"}],a.experiments=[{name:"Steam User Graph",description:"This simple app was made during the research phase of my senior design project. My goals when working on this app were to become familiar with Steam's public API as well as to use the Sigma.js library for displaying graphs in the canvas element. Because Steam's API does not allow CORS, you will need to disable security in your browser for the app to function.",linkText:"Web App",link:"http://may1635.sd.ece.iastate.edu/#/graph",image:"steam-graph.png"},{name:"PDM Schedule Creator",description:"This tool was built for a class project, but it could be useful to others planning out their projects. The web app allows users to create tasks with a duration in weeks and assign any dependent tasks. Once finished, a report will be generated allowing a user to see the order of their tasks and when they need to be started and finished by. It also was a good opportunity to try out the HTML5 FileReader API for the first time.",linkText:"Web App",link:"/#/329-assignment4",image:""}],a.chosenExperiment=a.experiments[0],a.bioText="<b>Hello!</b> Welcome to my little corner of the web. I'm a recent graduate of Iowa State University where I studied Software Engineering. At the moment, most of my work has been with web development on a variety of projects. Feel free to check out some of them below. If you have any questions or just want to say hi, <a href='mailto:grantmcd@outlook.com'>shoot me an email</a>.",a.subTitleText="Software Developer, Web Designer",a.chooseExperiment=function(b){b==a.chosenExperiment?a.chosenExperiment="":a.chosenExperiment=b},a.openWindow=function(a){window.open(a)}}]),angular.module("grantmcdApp").controller("UpdownCtrl",["$scope","$http",function(a,b){Parse.initialize("X9c7UH7ZkTAu1j9EQ6yE3SHD8SKiqkZTPclZ67Sh","WgUaoGkH6IbNgUBUw9dLpS4vWP5ZoDULQ3ZGrcu5"),a.message="hello world",a.count=25}]),angular.module("grantmcdApp").controller("329Assignment4",["$scope","$http",function(a,b){a.newTaskDuration=1,a.tasks=[],a.currentDependencies=[],a.calculatedPath=!1,a.addedTaskIds=[],a.showError=!1,a.errorMessage="",a.addedTaskIds=[],a.addTask=function(){if(a.showError=!1,a.errorMessage="",a.criticalPaths=[],a.addedTaskIds.indexOf(a.newTaskId)>-1)return a.showError=!0,a.errorMessage="Task ID must be unique.",-1;a.calculatedPath=!1,a.addedTaskIds.push(a.newTaskId);for(var b={id:a.newTaskId,duration:a.newTaskDuration,dependencies:new Array,dependents:new Array,es:null,ef:null,ls:null,lf:null,criticalCost:null},c=0;c<a.tasks.length;c++)a.currentDependencies[a.tasks[c].id]&&(b.dependencies.push(a.tasks[c].id),a.tasks[c].dependents.push(a.newTaskId));a.newTaskId="",a.newTaskDuration=1,a.currentDependencies=[],a.tasks.push(b)},a.addTaskFromFile=function(b){for(var c=b.split(" "),d="",e=0,f=[],g=0;g<c.length;g++)if(0==g){if(d=c[g].trim(),a.addedTaskIds.indexOf(d)>-1)return a.showError=!0,a.errorMessage="Task ID must be unique.",-1;a.$apply(function(){a.addedTaskIds.push(d)})}else if(1==g)e=parseInt(c[g]);else if(2==g)for(var h=c[g].split(","),i=0;i<h.length;i++){if(a.addedTaskIds.indexOf(h[i].trim())<0)return a.showError=!0,a.errorMessage="Check your input file. Tasks must be created before they can be set as dependencies. ",-1;f.push(h[i].trim());for(var j=0;j<a.tasks.length;j++)a.tasks[j].id.trim()==h[i].trim()&&a.tasks[j].dependents.push(d)}if(""!=d&&e>0){var k={id:d,duration:e,dependencies:f,dependents:new Array,es:null,ef:null,ls:null,lf:null,criticalCost:null};a.$apply(function(){return a.tasks.push(k),0})}},a.criticalPaths=[],a.recursivePathSearch=function(b,c,d,e){for(var f=0;f<b[c].dependents.length;f++){for(var g=0,h=0;h<b.length;h++)if(b[h].id==b[c].dependents[f]){g=h;break}var i=e+b[g].duration,j=d.concat();j.push(b[g].id),i==a.longestFinalPath?a.criticalPaths.push(j):a.recursivePathSearch(b,g,j,i)}},a.findCriticalPath=function(b){for(var c=0;c<b.length;c++)if(0==b[c].dependencies.length){var d=new Array;d.push(b[c].id),a.recursivePathSearch(b,c,d,b[c].duration)}},a.findPath=function(b){a.criticalPaths=[],a.showError=!1,a.errorMessage="";for(var c=0;c<b.length;c++)if(0==b[c].dependencies.length)b[c].es=0,b[c].ef=b[c].duration;else for(var d=0;d<b[c].dependencies.length;d++)for(var e=0;e<b.length;e++)b[c].dependencies[d]==b[e].id&&(null==b[c].es||b[c].es<b[e].ef)&&(b[c].es=b[e].ef,b[c].ef=b[e].ef+b[c].duration);for(var f=0,c=0;c<b.length;c++)b[c].ef>f&&(f=b[c].ef);a.longestFinalPath=f;for(var c=b.length-1;c>=0;c--)if(0==b[c].dependents.length)b[c].lf=f,b[c].ls=f-b[c].duration;else for(var d=0;d<b[c].dependents.length;d++)for(var e=b.length-1;e>=0;e--)b[c].dependents[d]==b[e].id&&(null==b[c].lf||b[c].lf>b[e].ls)&&(b[c].lf=b[e].ls,b[c].ls=b[e].ls-b[c].duration);a.findCriticalPath(b),a.calculatedPath=!0},a.clearTasks=function(){a.calculatedPath=!1,a.tasks=new Array,a.currentDependencies=[],a.addedTaskIds=[],a.criticalPaths=[]},a.inputtedFile=!1,a.uploadFileInput=function(b){if(a.$apply(function(){a.showError=!1,a.errorMessage="",a.clearTasks()}),window.File&&window.FileReader&&window.FileList&&window.Blob){var c=b.target.files[0];if(c){var d=new FileReader;d.onload=function(b){for(var c=d.result,e=c.split(/[\r\n]+/g),f=0;f<e.length;f++){var g=a.addTaskFromFile(e[f]);if(g==-1)return a.$apply(function(){a.inputtedFile=!0,a.clearTasks()}),-1}a.$apply(function(){a.inputtedFile=!0})},d.readAsText(c)}else alert("Failed to load file. Try again.")}else alert("The File APIs are not fully supported by your browser. You will need to enter inputs manually :(")}}]),!function(){function a(a){function b(a,b){a="on"+a,"function"==typeof b&&(f[a]||(f[a]=[]),f[a].indexOf(b)>-1||f[a].push(b))}function c(a,b){a="on"+a,f[a]&&f[a].splice(f[a].indexOf(b),1)}function d(a,b){a="on"+a;var c=f[a];if(c)for(var d,e=0;d=c[e++];)d(b)}var e=a||new Function,f={};return e.addEventListener=b,e.removeEventListener=c,e.triggerEvent=d,e}window.voxelcss||(window.voxelcss={}),window.voxelcss.interfaces||(window.voxelcss.interfaces={}),voxelcss.interfaces.EventListener=a}(),!function(){function a(){function b(){return 1===arguments.length&&arguments[0].constructor!=Number?arguments[0].constructor==String?i(arguments[0]):h(arguments[0]):g.apply(this,arguments)}function c(){return{r:o.r,g:o.g,b:o.b,a:o.a}}function d(){return k(o.r,o.g,o.b)}function e(){return JSON.stringify(o)}function f(){return new a(o)}function g(a,b,d,e){var f=c();return a!=m&&a.constructor==Number&&(o.r=a),b!=m&&b.constructor==Number&&(o.g=b),d!=m&&d.constructor==Number&&(o.b=d),e!=m&&e.constructor==Number&&(o.a=e),l(),f}function h(a){return a===m?c():g(a.r,a.g,a.b,a.a)}function i(a){if(!a||a.constructor!==String)return c();var b=c();return o=j(a),o.a=1,l(),b}function j(a){var b=/^#?([a-f\d])([a-f\d])([a-f\d])$/i;a=a.replace(b,function(a,b,c,d){return b+b+c+c+d+d});var c=/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(a);return c?{r:parseInt(c[1],16),g:parseInt(c[2],16),b:parseInt(c[3],16)}:null}function k(a,b,c){return""+((1<<24)+(a<<16)+(b<<8)+c).toString(16).slice(1)}function l(){n.triggerEvent("change",{target:n})}var m,n=this,o={r:0,g:0,b:0,a:1};n.setColor=b,n.getRGBA=c,n.getHex=d,n.serialize=e,n.clone=f,function(){voxelcss.interfaces.EventListener(n),b.apply(this,arguments)}.apply(n,arguments)}window.voxelcss||(window.voxelcss={}),a.loadFromSerial=function(b){var c=JSON.parse(b);return new a(c)},window.voxelcss.ColorFace=a}(),!function(){function a(a){function b(a,b,f){p=!1;var g={x:c(a),y:d(b),z:e(f)};return p=!0,n.triggerEvent("move"),g}function c(a){if(void 0===a||"number"!=typeof a)return o.x;var b=o.x;return o.x=a,p&&n.triggerEvent("move"),b}function d(a){if(void 0===a||"number"!=typeof a)return o.y;var b=o.y;return o.y=a,p&&n.triggerEvent("move"),b}function e(a){if(void 0===a||"number"!=typeof a)return o.z;var b=o.z;return o.z=a,p&&n.triggerEvent("move"),b}function f(a,b,c){p=!1;var d={x:g(a),y:h(b),z:i(c)};return p=!0,n.triggerEvent("move"),d}function g(a){return void 0===a||"number"!=typeof a?o.x:c(a+o.x)}function h(a){return void 0===a||"number"!=typeof a?o.y:d(a+o.y)}function i(a){return void 0===a||"number"!=typeof a?o.z:e(a+o.z)}function j(){return{x:o.x,y:o.y,z:o.z}}function k(){return o.x}function l(){return o.y}function m(){return o.z}var n=a||new Function,o={x:0,y:0,z:0},p=!0;return n.setPosition=b,n.setPositionX=c,n.setPositionY=d,n.setPositionZ=e,n.translate=f,n.translateX=g,n.translateY=h,n.translateZ=i,n.getPosition=j,n.getPositionX=k,n.getPositionY=l,n.getPositionZ=m,n}window.voxelcss||(window.voxelcss={}),window.voxelcss.interfaces||(window.voxelcss.interfaces={}),voxelcss.interfaces.Positioned=a}(),!function(){function a(){function a(){F=!0;var a=C.getScene().getDomElement();a.setAttribute("class","scene edit")}function b(){F=!1;var a=C.getScene().getDomElement();a.setAttribute("class","scene")}function c(){return F}function d(){E=!0}function e(){E=!1}function f(){return E}function g(){C.save()}function h(){var a=C.load();return A(),a}function i(){return C.isSaved()}function j(){return C.deleteSave()}function k(){return C.export()}function l(a){var b=C.import(a);return A(),b}function m(a){q(a);var b=C.add(a);return E&&g(),b}function n(a){var b=C.remove(a);return b&&r(a),E&&g(),b}function o(){return C}function p(a){if(a===B)return G.mesh;var b=G.mesh;return G.mesh=a,b}function q(a){a.addEventListener("VoxelClick",s),a.addEventListener("TopClick",t),a.addEventListener("BottomClick",u),a.addEventListener("FrontClick",v),a.addEventListener("BackClick",w),a.addEventListener("LeftClick",x),a.addEventListener("RightClick",y),a.addEventListener("MeshChange",function(){E&&g()})}function r(a){a.removeEventListener("VoxelClick",s),a.removeEventListener("TopClick",t),a.removeEventListener("BottomClick",u),a.removeEventListener("FrontClick",v),a.removeEventListener("BackClick",w),a.removeEventListener("LeftClick",x),a.removeEventListener("RightClick",y)}function s(a){if(F){var b=a.target;n(b)}}function t(a){if(F){var b=a.target;z(b,0,1,0)}}function u(a){if(F){var b=a.target;z(b,0,-1,0)}}function v(a){if(F){var b=a.target;z(b,0,0,1)}}function w(a){if(F){var b=a.target;z(b,0,0,-1)}}function x(a){if(F){var b=a.target;z(b,-1,0,0)}}function y(a){if(F){var b=a.target;z(b,1,0,0)}}function z(a,b,c,d){var e=a.clone(),f=e.getDimension();e.setMesh(G.mesh),e.translate(b*f,c*f,d*f),m(e)}function A(){for(var a,b=0;a=C.getVoxels()[b++];)q(a)}var B,C,D=this,E=!1,F=!0,G={mesh:{}};D.enable=a,D.disable=b,D.isEnabled=c,D.enableAutoSave=d,D.disableAutoSave=e,D.canAutoSave=f,D.save=g,D.load=h,D.isSaved=i,D.deleteSave=j,D.export=k,D.import=l,D.add=m,D.remove=n,D.getWorld=o,D.setToolMesh=p,function(b,c){if(b===B)throw"Editor requires World instance for initialization";C=b,c!==B&&c.autosave===!0&&d(),a(),A()}.apply(D,arguments)}window.voxelcss||(window.voxelcss={}),voxelcss.Editor=a}(),!function(){function a(){function c(a){if(!a)return i;var b=i;return i=a,g(),b}function d(){return i}function e(){return i}function f(){return new a(i)}function g(){h.triggerEvent("change",{target:h})}var h=this,i=b;h.setSource=c,h.getSource=d,h.serialize=e,h.clone=f,function(a){voxelcss.interfaces.EventListener(h),c(a)}.apply(h,arguments)}window.voxelcss||(window.voxelcss={});var b="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7";a.loadFromSerial=function(b){return new a(b)},window.voxelcss.ImageFace=a}(),!function(){function a(){function a(a){if(a===e||"number"!=typeof a)return g;var b=g;return g=a,f.triggerEvent("change",{target:f}),b}function b(){return g}function c(a,b){var c=d();return"number"==typeof b&&(h=b),"number"==typeof a&&(i=a),f.triggerEvent("change",{target:f}),c}function d(){return[i,h]}var e,f=this,g=500,h=1,i=0;f.setTravelDistance=a,f.getTravelDistance=b,f.setBrightness=c,f.getBrightness=d,function(b,d,e,g,h,i){voxelcss.interfaces.Positioned(voxelcss.interfaces.EventListener(f)),f.setPosition(b,d,e),a(g),c(h,i)}.apply(f,arguments)}window.voxelcss||(window.voxelcss={}),window.voxelcss.LightSource=a}(),!function(){function a(){function a(a){if(void 0!==a&&r(a)){var b=v;return b&&b.removeEventListener("change",t),v=a,v.addEventListener("change",t),C&&u(),b}}function b(a){if(void 0!==a&&r(a)){var b=w;return b&&b.removeEventListener("change",t),w=a,w.addEventListener("change",t),C&&u(),b}}function d(a){if(void 0!==a&&r(a)){var b=x;return b&&b.removeEventListener("change",t),x=a,x.addEventListener("change",t),C&&u(),b}}function e(a){if(void 0!==a&&r(a)){var b=y;return b&&b.removeEventListener("change",t),y=a,y.addEventListener("change",t),C&&u(),b}}function f(a){if(void 0!==a&&r(a)){var b=z;return b&&b.removeEventListener("change",t),z=a,z.addEventListener("change",t),C&&u(),b}}function g(a){if(void 0!==a&&r(a)){var b=A;return b&&b.removeEventListener("change",t),A=a,A.addEventListener("change",t),C&&u(),b}}function h(){return v}function i(){return w}function j(){return x}function k(){return y}function l(){return z}function m(){return A}function n(c){var h=o();return void 0===c?h:(r(c)&&(c={front:c,back:c,top:c,bottom:c,left:c,right:c}),C=!1,a(c.front),b(c.back),d(c.left),e(c.right),f(c.top),g(c.bottom),u(),C=!0,h)}function o(){return{front:v,back:w,left:x,right:y,top:z,bottom:A}}function p(){return JSON.stringify({front:q(v),back:q(w),left:q(x),right:q(y),top:q(z),bottom:q(A)})}function q(a){return s(a.constructor)+"("+a.serialize()+")"}function r(a){return!!s(a.constructor)}function s(a){for(var b in c){var d=c[b];if(d==a)return b}return null}function t(){u()}function u(){B.triggerEvent("change",{target:B,faces:o()})}var v,w,x,y,z,A,B=this,C=!0;B.setFront=a,B.setBack=b,B.setLeft=d,B.setRight=e,B.setTop=f,B.setBottom=g,B.getFront=h,B.getBack=i,B.getLeft=j,B.getRight=k,B.getTop=l,B.getBottom=m,B.setFaces=n,B.getFaces=o,B.serialize=p,function(a){voxelcss.interfaces.EventListener(B),n(new voxelcss.ImageFace),n(a)}.apply(B,arguments)}function b(a){var b=a.indexOf("("),d=a.slice(0,b),e=a.slice(b+1,-1);return c[d].loadFromSerial(e)}window.voxelcss||(window.voxelcss={});var c={image:voxelcss.ImageFace,color:voxelcss.ColorFace};a.loadFromSerial=function(c){var d=JSON.parse(c);return new a({front:b(d.front),back:b(d.back),left:b(d.left),right:b(d.right),top:b(d.top),bottom:b(d.bottom)})},window.voxelcss.Mesh=a}(),!function(){function a(){function a(a,e,f){return{x:b(a),y:c(e),z:d(f)}}function b(a){if(a===ea||"number"!=typeof a)return la.x;var b=la.x;return la.x+=a,ca(),b}function c(a){if(a===ea||"number"!=typeof a)return la.y;var b=la.y;return la.y+=a,ca(),b}function d(a){if(a===ea||"number"!=typeof a)return la.z;var b=la.z;return la.z+=a,ca(),b}function e(a,b,c){var d={x:f(a),y:g(b),z:h(c)};return ca(),d}function f(a){if(a===ea||"number"!=typeof a)return la.x;var b=la.x;return la.x=a,ca(),b}function g(a){if(a===ea||"number"!=typeof a)return la.y;var b=la.y;return la.y=a,ca(),b}function h(a){if(a===ea||"number"!=typeof a)return la.z;var b=la.z;return la.z=a,ca(),b}function i(){return{x:la.x,y:la.y,z:la.z}}function j(){return la.x}function k(){return la.y}function l(){return la.z}function m(a,b,c){return{x:n(a),y:o(b),z:p(c)}}function n(a){if(a===ea||"number"!=typeof a)return ma.x;var b=ma.x;return ma.x+=a,ca(),b}function o(a){if(a===ea||"number"!=typeof a)return ma.y;var b=ma.y;return ma.y+=a,ca(),b}function p(a){if(a===ea||"number"!=typeof a)return ma.z;var b=ma.z;return ma.z+=a,ca(),b}function q(a,b,c){var d={x:r(a),y:s(b),z:t(c)};return ca(),d}function r(a){if(a===ea||"number"!=typeof a)return ma.x;var b=ma.x;return ma.x=a,ca(),b}function s(a){if(a===ea||"number"!=typeof a)return ma.y;var b=ma.y;return ma.y=a,ca(),b}function t(a){if(a===ea||"number"!=typeof a)return ma.z;var b=ma.z;return ma.z=a,ca(),b}function u(){return{x:ma.x,y:ma.y,z:ma.z}}function v(){return ma.x}function w(){return ma.y}function x(){return ma.z}function y(a){if(a===ea||"number"!=typeof a)return na;var b=na;return na+=a,ca(),b}function z(a){return a===ea||"number"!=typeof a?na:(na=a,ca(),na)}function A(){return na}function B(a){if(ka)throw"Cannot attach currently attached scene";fa=a,a.appendChild(ga),ka=!0}function C(){if(!ka)throw"Cannot detach currently detached scene";ka=!1,ga.parentElement.removeChild(ga)}function D(){return ka}function E(){return fa}function F(){return ga}function G(){pa||(pa=!0)}function H(){pa&&(pa=!1)}function I(){return pa}function J(){qa||(qa=!0)}function K(){qa&&(qa=!1)}function L(){return qa}function M(){ra||(ra=!0)}function N(){ra&&(ra=!1)}function O(){return ra}function P(a){ia.appendChild(a.getDomElement()),ta.push(a),a.setParentScene(ja),0!==sa.length&&a.updateLightSource(sa)}function Q(a){ia.removeChild(a.getDomElement()),ta.splice(ta.indexOf(a),1),a.removeParentScene()}function R(){return ta.concat([])}function S(a){var b=sa.indexOf(a);return-1===b&&(a.addEventListener("change",da),a.addEventListener("move",da),sa.push(a),da(),!0)}function T(a){var b=sa.indexOf(a);return-1!==b&&(a.removeEventListener("change",da),a.removeEventListener("move",da),sa.splice(b,1),da(),!0)}function U(){return sa}function V(){ga=document.createElement("div"),ga.setAttribute("class","scene"),ha=document.createElement("div"),ha.setAttribute("class","zoom"),ia=document.createElement("div"),ia.setAttribute("class","camera"),ga.appendChild(ha),ha.appendChild(ia)}function W(){ga.addEventListener("mousedown",X),ga.addEventListener("mousewheel",$),ga.addEventListener("wheel",$)}function X(a){oa.start.x=a.x||a.clientX,oa.start.y=a.y||a.clientY,oa.current.x=a.x||a.clientX,oa.current.y=a.y||a.clientY,window.addEventListener("mousemove",Z),window.addEventListener("mouseup",Y)}function Y(a){window.removeEventListener("mousemove",Z),window.removeEventListener("mouseup",Y)}function Z(a){if(oa.lastMove.dx=(a.x||a.clientX)-oa.current.x,oa.lastMove.dy=(a.y||a.clientY)-oa.current.y,oa.current.x=a.x||a.clientX,oa.current.y=a.y||a.clientY,qa&&oa.shiftDown)m(oa.lastMove.dx,oa.lastMove.dy),ca(),ja.triggerEvent("pan",{rotation:i(),pan:u(),zoom:A(),target:ja});else if(pa){var b=2;la.y+=oa.lastMove.dx/window.innerWidth*Math.PI*2*b,la.x-=oa.lastMove.dy/window.innerHeight*Math.PI*2*b,ca(),ja.triggerEvent("orbit",{rotation:i(),pan:u(),zoom:A(),target:ja})}}function $(a){return ra?(na+=a.deltaY/5e3,ca(),a.preventDefault(),ja.triggerEvent("zoom",{rotation:i(),pan:u(),zoom:A(),target:ja}),!1):void 0}function _(){window.addEventListener("keydown",aa),window.addEventListener("keyup",ba)}function aa(a){(16===a.keyCode||16===a.which)&&(oa.shiftDown=!0)}function ba(a){(16===a.keyCode||16===a.which)&&(oa.shiftDown=!1)}function ca(){ia.style.transform="rotateX("+la.x+"rad) rotateY("+la.y+"rad) rotateZ("+la.z+"rad)",ha.style.transform="scale("+na+", "+na+")",ha.style.transform+=" translateX("+ma.x+"px) translateY("+ma.y+"px) translateZ("+ma.z+"px)",da()}function da(){if(0!==sa.length)for(var a,b=0;a=ta[b++];)a.updateLightSource(sa)}var ea,fa,ga,ha,ia,ja=this,ka=!1,la={x:0,y:0,z:0},ma={x:0,y:0,z:0},na=1,oa={start:{x:0,y:0},current:{x:0,y:0},lastMove:{x:0,y:0},shiftDown:!1},pa=!0,qa=!0,ra=!0,sa=[],ta=[];ja.rotate=a,ja.rotateX=b,ja.rotateY=c,ja.rotateZ=d,ja.setRotation=e,ja.setRotationX=f,ja.setRotationY=g,ja.setRotationZ=h,ja.getRotation=i,ja.getRotationX=j,ja.getRotationY=k,ja.getRotationZ=l,ja.pan=m,ja.panX=n,ja.panY=o,ja.panZ=p,ja.setPan=q,ja.setPanX=r,ja.setPanY=s,ja.setPanZ=t,ja.getPan=u,ja.getPanX=v,ja.getPanY=w,ja.getPanZ=x,ja.zoom=y,ja.setZoom=z,ja.getZoom=A,ja.attach=B,ja.detach=C,ja.isAttached=D,ja.getParentElement=E,ja.getDomElement=F,ja.enableOrbit=G,ja.disableOrbit=H,ja.canOrbit=I,ja.enablePan=J,ja.disablePan=K,ja.canPan=L,ja.enableZoom=M,ja.disableZoom=N,ja.canZoom=O,ja.add=P,ja.remove=Q,ja.getVoxels=R,ja.addLightSource=S,ja.removeLightSource=T,ja.getLightSources=U,function(){voxelcss.interfaces.EventListener(ja),V(),W(),_()}.apply(ja,arguments)}window.voxelcss||(window.voxelcss={}),voxelcss.Scene=a}(),!function(){function a(){function a(a){if(a!==G&&a.constructor===voxelcss.Mesh){var b=J;return b&&b.removeEventListener("change",s),J=a,J.addEventListener("change",s),t(),b}}function b(){return J}function c(a){if(a===G)throw"Scene required to add voxel to scene";K=a,I.setAttribute("class","anim up"),y()}function d(a){if(a===G)throw"Scene required to add voxel to scene";K=a,I.setAttribute("class","anim down"),y()}function e(a){if(a===G)throw"Scene required to add voxel to scene";K=a,I.setAttribute("class","anim"),y()}function f(){K!==G&&K.removeChild(H)}function g(a){K=a}function h(){K=G}function i(a){if(a===G||"number"!=typeof a)return N;var b=N;return N=a,b}function j(){return N}function k(){return H}function l(){return new voxelcss.Voxel(L.getPositionX(),L.getPositionY(),L.getPositionZ(),N,{mesh:J})}function m(a){for(var b,c=1,d=1,e=1,f=1,g=1,h=1,i=0;b=a[i++];){var j=b.getBrightness(),k=j[1]-j[0],l=1-j[1],m=b.getPositionX(),p=b.getPositionY(),q=b.getPositionZ();if(d>0){var r=o(m,p,q,{A:0,B:0,C:-1}),s=r.angle,t=1-s/(Math.PI/2);t=n(t),t=Math.min(1,t+Math.pow(r.distance/b.getTravelDistance(),6));var u=(r.direction<0?1:t)*k+l;d=Math.max(0,d-(1-u))}if(c>0){var r=o(m,p,q,{A:0,B:0,C:1}),s=r.angle,t=1-s/(Math.PI/2);t=n(t),t=Math.min(1,t+Math.pow(r.distance/b.getTravelDistance(),6));var u=(r.direction<0?1:t)*k+l;c=Math.max(0,c-(1-u))}if(e>0){var r=o(m,p,q,{A:-1,B:0,C:0}),s=r.angle,t=1-s/(Math.PI/2);t=n(t),t=Math.min(1,t+Math.pow(r.distance/b.getTravelDistance(),6));var u=(r.direction<0?1:t)*k+l;e=Math.max(0,e-(1-u))}if(f>0){var r=o(m,p,q,{A:1,B:0,C:0}),s=r.angle,t=1-s/(Math.PI/2);t=n(t),t=Math.min(1,t+Math.pow(r.distance/b.getTravelDistance(),6));var u=(r.direction<0?1:t)*k+l;f=Math.max(0,f-(1-u))}if(g>0){var r=o(m,p,q,{A:0,B:1,C:0}),s=r.angle,t=1-s/(Math.PI/2);t=n(t),t=Math.min(1,t+Math.pow(r.distance/b.getTravelDistance(),6));var u=(r.direction<0?1:t)*k+l;g=Math.max(0,g-(1-u))}if(h>0){var r=o(m,p,q,{A:0,B:-1,C:0}),s=r.angle,t=1-s/(Math.PI/2);t=n(t),t=Math.min(1,t+Math.pow(r.distance/b.getTravelDistance(),6));var u=(r.direction<0?1:t)*k+l;h=Math.max(0,h-(1-u))}}M.front.shader.style.opacity=c,M.back.shader.style.opacity=d,M.left.shader.style.opacity=e,M.right.shader.style.opacity=f,M.top.shader.style.opacity=g,M.bottom.shader.style.opacity=h}function n(a){return Math.pow(a,3)}function o(a,b,c,d){var e=p(K.getRotationX(),-K.getRotationY(),K.getRotationZ()),f={x:a,y:b,z:c},g=q(f,e);g={x:g.x-L.getPositionX()-d.A*L.getDimension()/2,y:g.y-L.getPositionY()-d.B*L.getDimension()/2,z:g.z-L.getPositionZ()-d.C*L.getDimension()/2};var h=Math.sqrt(Math.pow(g.x,2)+Math.pow(g.y,2)+Math.pow(g.z,2)),i=1==Math.abs(d.C)?d.C*g.z:1==Math.abs(d.B)?d.B*g.y:d.A*g.x,j=Math.asin(Math.abs(g.x*d.A+g.y*d.B+g.z*d.C)/Math.sqrt(Math.pow(g.x,2)+Math.pow(g.y,2)+Math.pow(g.z,2)));return{angle:j,direction:i,distance:h}}function p(a,b,c){var d=[[1,0,0],[0,Math.cos(a),-Math.sin(a)],[0,Math.sin(a),Math.cos(a)]],e=[[Math.cos(b),0,Math.sin(b)],[0,1,0],[-Math.sin(b),0,Math.cos(b)]],f=[[Math.cos(c),-Math.sin(c),0],[Math.sin(c),Math.cos(c),0],[0,0,1]];return r(r(f,e),d)}function q(a,b){var c=[[a.x],[a.y],[a.z]],d=r(b,c);return{x:d[0][0],y:d[1][0],z:d[2][0]}}function r(a,b){for(var c=a.length,d=a[0].length,e=(b.length,b[0].length),f=new Array(c),g=0;c>g;++g){f[g]=new Array(e);for(var h=0;e>h;++h){f[g][h]=0;for(var i=0;d>i;++i)f[g][h]+=a[g][i]*b[i][h]}}return f}function s(){t(),L.triggerEvent("MeshChange",{target:L,mesh:J})}function t(){var a=J.getFaces();for(var b in M){var c=a[b];if(c instanceof voxelcss.ImageFace)M[b].src=c.getSource(),M[b].removeAttribute("class");else if(c instanceof voxelcss.ColorFace){var d=M[b].parentElement;d.style.background="#"+c.getHex(),M[b].setAttribute("class","colored")}}}function u(){H=w("div","cube"),I=w("div","anim"),v("top"),v("bottom"),v("front"),v("back"),v("left"),v("right"),H.appendChild(I)}function v(a){var b=w("div","face "+a);switch(b.style.width=N+"px",b.style.height=N+"px",b.style.marginLeft=-N/2+"px",b.style.marginTop=-N/2+"px",a){case"top":b.style.transform="rotateX(90deg) translateZ("+N/2+"px)",b.addEventListener("click",A);break;case"bottom":b.style.transform="rotateX(90deg) translateZ(-"+N/2+"px)",b.addEventListener("click",B);break;case"left":b.style.transform="rotateY(90deg) translateZ(-"+N/2+"px)",b.addEventListener("click",C);break;case"right":b.style.transform="rotateY(90deg) translateZ("+N/2+"px)",b.addEventListener("click",D);break;case"front":b.style.transform="translateZ("+N/2+"px)",b.addEventListener("click",E);break;case"back":b.style.transform="translateZ(-"+N/2+"px)",b.addEventListener("click",F)}b.addEventListener("contextmenu",z);var c=w("img","");M[a]=c;var d=w("div","shader");M[a].shader=d,b.appendChild(c),b.appendChild(d),I.appendChild(b)}function w(a,b){var c=document.createElement(a);return c.setAttribute("class",b),c}function x(){var a=L.getPosition();H.style.transform="translate3d("+a.x+"px, "+-a.y+"px, "+a.z+"px)"}function y(){K.add(L)}function z(a){return a.preventDefault(),L.triggerEvent("VoxelClick",{target:L}),!1}function A(){L.triggerEvent("TopClick",{target:L})}function B(){L.triggerEvent("BottomClick",{target:L})}function C(){L.triggerEvent("LeftClick",{target:L})}function D(){L.triggerEvent("RightClick",{target:L})}function E(){L.triggerEvent("FrontClick",{target:L})}function F(){L.triggerEvent("BackClick",{target:L})}var G,H,I,J,K,L=this,M={},N=0;L.setMesh=a,L.getMesh=b,L.animUp=c,L.animDown=d,L.addToScene=e,L.removeFromScene=f,L.setParentScene=g,L.removeParentScene=h,L.setDimension=i,L.getDimension=j,L.getDomElement=k,L.clone=l,L.updateLightSource=m,function(b,c,d,e,f){voxelcss.interfaces.Positioned(voxelcss.interfaces.EventListener(L)),L.addEventListener("move",x),i(e),u(),L.setPosition(b,c,d),a(new voxelcss.Mesh),f!==G&&f.mesh!==G&&a(f.mesh)}.apply(L,arguments)}window.voxelcss||(window.voxelcss={}),voxelcss.Voxel=a}(),!function(){function a(){function a(a){return q.push(a),n.add(a)}function b(a){var b=q.indexOf(a);return-1!=b&&(n.remove(a),q.splice(b,1),!0)}function c(){for(var a,b=[],c=0;a=q[c++];)b.push({position:a.getPosition(),dimension:a.getDimension(),mesh:a.getMesh().serialize()});return JSON.stringify(b)}function d(b){k();for(var c,d=JSON.parse(b+""),e=0;c=d[e++];){var f=new voxelcss.Voxel(c.position.x,c.position.y,c.position.z,c.dimension);f.setMesh(voxelcss.Mesh.loadFromSerial(c.mesh)),a(f)}}function e(){localStorage.setItem(l(),c())}function f(){d(localStorage.getItem(l())||"[]")}function g(){return!!localStorage.getItem(l())}function h(){localStorage.setItem(l(),"")}function i(){return n}function j(){return q.concat([])}function k(){for(;q.length>0;)b(q[0])}function l(){return"savedWorld<"+p+">"}var m,n,o=this,p="*",q=[];o.add=a,o.remove=b,o.export=c,o.import=d,o.save=e,o.load=f,o.isSaved=g,o.deleteSave=h,o.getScene=i,o.getVoxels=j,function(a,b){if(a===m)throw"World cannot be instantiated without a Scene instance";n=a,b!==m&&(p=b)}.apply(o,arguments)}window.voxelcss||(window.voxelcss={}),voxelcss.World=a}(),!function(){window.voxelcss||(window.voxelcss={}),voxelcss.Meshes={dirt:new voxelcss.Mesh(new voxelcss.ImageFace("http://voxelcss.com/res/dirt/main.png")),grass:new voxelcss.Mesh({top:new voxelcss.ImageFace("http://voxelcss.com/res/grass/top.png"),bottom:new voxelcss.ImageFace("http://voxelcss.com/res/grass/bottom.png"),front:new voxelcss.ImageFace("http://voxelcss.com/res/grass/side.png"),back:new voxelcss.ImageFace("http://voxelcss.com/res/grass/side.png"),left:new voxelcss.ImageFace("http://voxelcss.com/res/grass/side.png"),right:new voxelcss.ImageFace("http://voxelcss.com/res/grass/side.png")}),water:new voxelcss.Mesh(new voxelcss.ImageFace("http://voxelcss.com/res/water/main.png")),waterFall:new voxelcss.Mesh({top:new voxelcss.ImageFace("http://voxelcss.com/res/water/main.png"),bottom:new voxelcss.ImageFace("http://voxelcss.com/res/water/main.png"),front:new voxelcss.ImageFace("http://voxelcss.com/res/water/fall.png"),back:new voxelcss.ImageFace("http://voxelcss.com/res/water/fall.png"),left:new voxelcss.ImageFace("http://voxelcss.com/res/water/fall.png"),right:new voxelcss.ImageFace("http://voxelcss.com/res/water/fall.png")}),waterFallTop:new voxelcss.Mesh({top:new voxelcss.ImageFace("http://voxelcss.com/res/water/main.png"),bottom:new voxelcss.ImageFace("http://voxelcss.com/res/water/main.png"),front:new voxelcss.ImageFace("http://voxelcss.com/res/water/falltop.png"),back:new voxelcss.ImageFace("http://voxelcss.com/res/water/falltop.png"),left:new voxelcss.ImageFace("http://voxelcss.com/res/water/falltop.png"),right:new voxelcss.ImageFace("http://voxelcss.com/res/water/falltop.png")}),waterFallCrash:new voxelcss.Mesh({top:new voxelcss.ImageFace("http://voxelcss.com/res/water/main.png"),bottom:new voxelcss.ImageFace("http://voxelcss.com/res/water/main.png"),front:new voxelcss.ImageFace("http://voxelcss.com/res/water/crash.png"),back:new voxelcss.ImageFace("http://voxelcss.com/res/water/crash.png"),left:new voxelcss.ImageFace("http://voxelcss.com/res/water/crash.png"),right:new voxelcss.ImageFace("http://voxelcss.com/res/water/crash.png")}),treeTrunk:new voxelcss.Mesh({top:new voxelcss.ImageFace("http://voxelcss.com/res/tree/rings.png"),bottom:new voxelcss.ImageFace("http://voxelcss.com/res/tree/rings.png"),front:new voxelcss.ImageFace("http://voxelcss.com/res/tree/bark.png"),back:new voxelcss.ImageFace("http://voxelcss.com/res/tree/bark.png"),left:new voxelcss.ImageFace("http://voxelcss.com/res/tree/bark.png"),right:new voxelcss.ImageFace("http://voxelcss.com/res/tree/bark.png")
}),treeLeaves:new voxelcss.Mesh(new voxelcss.ImageFace("http://voxelcss.com/res/tree/leaves.png"))}}(),angular.module("grantmcdApp").run(["$templateCache",function(a){a.put("views/329-Assignment4.html",'<div class="page-header"> <h1>329 - Assignment 4 <small>Grant McDonald, Tristan Walter, Matt White</small> </h1> </div> <div class="row"> <div class="col-md-12"> <div class="alert alert-warning" role="alert" ng-show="showError"> <span class="glyphicon glyphicon-warning-sign" aria-hidden="true"></span> {{errorMessage}}</div> </div> <div class="col-md-6"> <h2> Enter a Task </h2> <p> Or upload a text file with properly formatted inputs. </p> <form ng-submit="addTask()"> <div class="form-group"> <label for="inputTaskId">Task ID</label> <input type="text" class="form-control" id="inputTaskId" required placeholder="Task ID - can be any string." ng-model="newTaskId"> </div> <div class="form-group"> <label for="inputDuration">Duration (weeks)</label> <input type="number" class="form-control" min="1" required id="inputDuration" ng-model="newTaskDuration"> </div> <div class="form-group"> <label>Dependencies</label> <div class="alert alert-warning" role="alert" ng-show="tasks.length == 0">No tasks have been created yet to set as dependencies.</div> <div class="checkbox" ng-repeat="task in tasks"> <label> <input type="checkbox" ng-model="currentDependencies[task.id]"> {{task.id}} </label> </div> </div> <button type="submit" class="btn btn-success">Add Task</button> <button class="btn btn-danger pull-right" type="button" ng-click="clearTasks()">Clear Tasks</button> </form> <div class="row"> <div class="col-md-12"> <span class="btn btn-primary btn-lg btn-file btn-block" ng-disabled="inputtedFile"> <span class="glyphicon glyphicon-file" aria-hidden="true"></span> {{!inputtedFile ? "Upload Input File" : "Refresh Page to Upload a New Input File"}} <input type="file" id="fileinput" onchange="angular.element(this).scope().uploadFileInput(event)" ng-disabled="inputtedFile"> </span> </div> </div> </div> <div class="col-md-6"> <h2> Added Tasks </h2> <div class="alert alert-info" role="alert" ng-show="tasks.length == 0">No tasks have been added yet.</div> <div class="list-group"> <li class="list-group-item" ng-repeat="task in tasks"> <b>ID: </b>{{task.id}} <b>Duration: </b>{{task.duration}} Weeks <span ng-show="task.dependencies.length != 0"> <br> <b>Dependencies: </b> <span ng-repeat="dependency in task.dependencies"> {{dependency}}</span> </span> <span ng-show="task.dependents.length != 0"> <br> <b>Dependents: </b> <span ng-repeat="dependent in task.dependents"> {{dependent}}</span> </span> </li></div> <div class="row" ng-show="tasks.length!=0"> <div class="col-md-12"> <button class="btn btn-danger btn-block" type="button" ng-click="findPath(tasks)">Calcuate Path</button> </div> </div> </div> </div> <div class="row" style="margin-top: 15px" ng-show="calculatedPath"> <div class="col-md-8"> <h2>Schedule</h2> <div class="panel panel-default"> <div class="table-responsive"> <table class="table table-striped"> <tr> <th> Task Id </th> <th> Duration </th> <th> Dependencies </th> <th> Dependents </th> <th> Early Start </th> <th> Early Finish </th> <th> Late Start </th> <th> Late Finish </th> </tr> <tr ng-repeat="task in tasks"> <td> {{task.id}} </td> <td> {{task.duration}} week(s) </td> <td> <span ng-repeat="dependency in task.dependencies"> {{dependency}}</span> </td> <td> <span ng-repeat="dependent in task.dependents"> {{dependent}}</span> </td> <td> {{task.es}} </td> <td> {{task.ef}} </td> <td> {{task.ls}} </td> <td> {{task.lf}} </td> </tr> </table> </div> </div> </div> <div class="col-md-4"> <h1>Critical Path(s)</h1> <p> <b>Critical Path Length: </b> {{longestFinalPath}} weeks </p> <ul> <li ng-repeat="path in criticalPaths"> <span ng-repeat="task in path track by $index">{{task}} <span ng-show="$index != path.length-1">-></span> </span> </li> </ul> </div> </div>'),a.put("views/main.html",'<div id="mainContainer"> <div class="container"> <div class="row"> <div class="col-xs-12"> <div class="titleBox"> <h1 ng-click="finishAnimation=!finishAnimation;">Grant McDonald</h1> <p> {{subTitleText}} </p> <hr> </div> </div> </div> <div class="row"> <div class="col-xs-12"> <div class="bioBox"> <p ng-bind-html="bioText"> </p> <hr> </div> </div> </div> <div class="row"> <div class="col-lg-3 col-md-4 col-sm-6 col-xs-12" ng-repeat="contact in contacts"> <button class="btn btn-primary btn-lg" type="submit">{{contact.name}}</button> </div> </div> <div class="row sectionTitle"> <div class="col-xs-12"> <h1>Projects</h1> </div> </div> <div class="row"> <div class="col-lg-4 col-md-6 col-sm-12" ng-repeat="project in projects"> <div class="projectBox my-hvr-grow"> <dl> <dt>{{project.name}}</dt> <dd ng-bind-html="project.description"></dd> </dl> <button ng-show="project.link != \'\'" type="button" class="btn-link" ng-click="openWindow(project.link)">{{project.linkText}} <span class="glyphicon glyphicon-chevron-right" aria-hidden="true"></span> </button> </div> </div> </div> <div class="row"> <div class="col-md-6"> <div class="row sectionTitle"> <div class="col-xs-12"> <h1>Experiments</h1> <p> These are smaller, one-off apps or utilities I\'ve built. More coming soon... </p> </div> </div> <div class="row"> <div class="col-md-12"> <ul class="experiments-list"> <li ng-repeat="experiment in experiments" ng-class="chosenExperiment == experiment ? \'selected-item\' : \'unselected-item\' " ng-click="chooseExperiment(experiment)"> <h1>{{experiment.name}}</h1> <p> {{experiment.description}} </p> <button type="button" class="btn-link" ng-click="openWindow(experiment.link)">{{experiment.linkText}} <span class="glyphicon glyphicon-chevron-right" aria-hidden="true"></span> </button> </li> </ul> </div> </div> </div> <div class="col-md-6"> <div class="row sectionTitle"> <div class="col-xs-12"> <h1>Other Stuff</h1> <p> My work not related to programming will show up here eventually. </p> </div> </div> </div> </div> </div> </div>'),a.put("views/updown.html",'<div style="position: fixed;\nleft: 0; top: 0; font-size: 1000%; text-align: center; width: 100%; height: 33%; background-color: red; padding-top: 1%"> up </div> <div style="position: fixed;\nleft: 0; bottom: 30%; font-size: 1000%; text-align: center; width: 100%; height: 33%; padding-top: 1%"> {{count}} </div> <div style="position: fixed;\nleft: 0; bottom: 0; font-size: 1000%; text-align: center; width: 100%; height: 33%; background-color: blue; padding-top: 4%"> down </div>')}]);