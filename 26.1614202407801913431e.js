(window.webpackJsonp=window.webpackJsonp||[]).push([[26],{70:function(s,e,t){"use strict";t.r(e),t.d(e,"default",function(){return c});var a=t(10),r=t(5),n=t(2),o=t(9);class c extends r.e{constructor(){super(...arguments),this.currentUser=o.a,this.password=ko.observable("")}async save(){await o.a.save({password:this.password()}),n.b.update("//",{with:{[a.a]:{text:"Settings saved!",type:"success"}}})}}}}]);