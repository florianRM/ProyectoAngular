"use strict";(self.webpackChunkProyectoAngular=self.webpackChunkProyectoAngular||[]).push([[439],{7439:(v,u,r)=>{r.r(u),r.d(u,{UsersModule:()=>Z});var c=r(4755),l=r(6868),e=r(2223),m=r(3071),p=r(7914),d=r(805);function g(t,o){if(1&t&&(e.TgZ(0,"th"),e._uU(1),e.qZA()),2&t){const n=o.$implicit;e.xp6(1),e.hij(" ",n.header," ")}}function f(t,o){if(1&t&&(e.TgZ(0,"tr"),e.YNc(1,g,2,1,"th",3),e.qZA()),2&t){const n=e.oxw();e.xp6(1),e.Q6J("ngForOf",n.cols)}}function _(t,o){if(1&t&&(e.TgZ(0,"td",7),e._uU(1),e.qZA()),2&t){const n=o.$implicit,s=e.oxw().$implicit;e.xp6(1),e.hij(" ",s[n.field]," ")}}function b(t,o){if(1&t){const n=e.EpF();e.TgZ(0,"button",8),e.NdJ("click",function(){e.CHM(n);const i=e.oxw().$implicit,a=e.oxw();return e.KtG(a.enabledUser(i))}),e._uU(1,"Disabled"),e.qZA()}}function U(t,o){if(1&t){const n=e.EpF();e.TgZ(0,"button",9),e.NdJ("click",function(){e.CHM(n);const i=e.oxw().$implicit,a=e.oxw();return e.KtG(a.enabledUser(i))}),e._uU(1,"Enabled"),e.qZA()}}function h(t,o){if(1&t&&(e.TgZ(0,"tr"),e.YNc(1,_,2,1,"td",4),e.YNc(2,b,2,0,"button",5),e.YNc(3,U,2,0,"button",6),e.qZA()),2&t){const n=o.$implicit,s=e.oxw();e.xp6(1),e.Q6J("ngForOf",s.cols),e.xp6(1),e.Q6J("ngIf",n.enabled),e.xp6(1),e.Q6J("ngIf",!n.enabled)}}const x=function(){return[5,10,15,20]},C=[{path:"",component:(()=>{class t{constructor(n,s){this.userService=n,this.router=s,this.cols=[],this.totalRecords=0}ngOnInit(){this.userService.getUsers().subscribe({next:n=>{this.users=n,this.totalRecords=n.length}}),this.cols=[{field:"username",header:"Username"},{field:"email",header:"Email"},{field:"name",header:"Name"},{field:"creationDate",header:"Creation Date"},{field:"enabled",header:"Enabled"}]}enabledUser(n){this.userService.enabledUser(n.username,!n.enabled).subscribe({next:s=>{console.log(s),this.ngOnInit()},error:s=>console.log(s)})}}return t.\u0275fac=function(n){return new(n||t)(e.Y36(m.K),e.Y36(l.F0))},t.\u0275cmp=e.Xpm({type:t,selectors:[["app-users"]],decls:3,vars:8,consts:[[3,"columns","value","paginator","rows","rowsPerPageOptions","totalRecords","pageLinks"],["pTemplate","header"],["pTemplate","body"],[4,"ngFor","ngForOf"],["enabled","col.enabled","user","col",4,"ngFor","ngForOf"],["type","button","class","btn btn-danger",3,"click",4,"ngIf"],["type","button","class","btn btn-success",3,"click",4,"ngIf"],["enabled","col.enabled","user","col"],["type","button",1,"btn","btn-danger",3,"click"],["type","button",1,"btn","btn-success",3,"click"]],template:function(n,s){1&n&&(e.TgZ(0,"p-table",0),e.YNc(1,f,2,1,"ng-template",1),e.YNc(2,h,4,3,"ng-template",2),e.qZA()),2&n&&e.Q6J("columns",s.cols)("value",s.users)("paginator",!0)("rows",10)("rowsPerPageOptions",e.DdM(7,x))("totalRecords",s.totalRecords)("pageLinks",3)},dependencies:[c.sg,c.O5,p.iA,d.jx]}),t})()}];let T=(()=>{class t{}return t.\u0275fac=function(n){return new(n||t)},t.\u0275mod=e.oAB({type:t}),t.\u0275inj=e.cJS({imports:[l.Bz.forChild(C),l.Bz]}),t})(),Z=(()=>{class t{}return t.\u0275fac=function(n){return new(n||t)},t.\u0275mod=e.oAB({type:t}),t.\u0275inj=e.cJS({imports:[c.ez,T,p.U$]}),t})()}}]);