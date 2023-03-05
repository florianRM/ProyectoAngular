"use strict";(self.webpackChunkProyectoAngular=self.webpackChunkProyectoAngular||[]).push([[576],{5576:(I,m,r)=>{r.r(m),r.d(m,{MypostsModule:()=>S});var d=r(6895),u=r(5848),t=r(1571),h=r(9019),x=r(529);let f=(()=>{class n{constructor(o){this.http=o,this.url=h.N.url}getMyposts(){return this.http.get(`${this.url}/myposts`)}uploadPost(o,e){const s=new FormData;return s.append("file",e,e.name),s.append("post",new Blob([JSON.stringify(o)],{type:"application/json"})),this.http.post(`${this.url}/upload`,s)}}return n.\u0275fac=function(o){return new(o||n)(t.LFG(x.eN))},n.\u0275prov=t.Yz7({token:n,factory:n.\u0275fac,providedIn:"root"}),n})();var P=r(5227),a=r(7340),l=r(433),_=r(5226),C=r.n(_),c=r(5834);function y(n,i){1&n&&t._UZ(0,"i",20)}let M=(()=>{class n{constructor(o,e,s){this.fb=o,this.dialog=e,this.myPostService=s,this.myForm=this.fb.group({title:["",l.kI.required],description:[""],img:["",l.kI.required],fileSource:[""]}),this.json={title:"",description:""},this.uploaded=!1}ngOnInit(){}onFileChange(o){this.file=o.target.files[0],this.myForm.patchValue({fileSource:this.file}),this.uploaded=!0}closeModal(){this.dialog.close()}uploadPost(){this.myForm.invalid&&this.myForm.markAllAsTouched(),this.json.title=this.myForm.get("title")?.value,this.json.description=this.myForm.get("description")?.value;const o=this.myForm.get("fileSource")?.value;this.myPostService.uploadPost(this.json,o).subscribe({next:e=>{C().fire({icon:"success",title:"Successful Upload",text:`Image with name ${e.name} has been uploaded`,showConfirmButton:!0}).then(s=>{s.isConfirmed&&this.closeModal()})},error:e=>console.log(e)})}}return n.\u0275fac=function(o){return new(o||n)(t.Y36(l.qu),t.Y36(c.so),t.Y36(f))},n.\u0275cmp=t.Xpm({type:n,selectors:[["app-upload-post"]],decls:33,vars:3,consts:[[1,"mycontainer"],[1,"header"],[1,"title"],[1,"containerImg"],["enctype","multipart/form-data",3,"formGroup","ngSubmit"],[1,"form-group"],["for","title"],["type","text","name","titlePost","formControlName","title",1,"titlePost"],["for","description"],["name","description","cols","30","rows","5","formControlName","description",1,"description"],[1,"dropzone"],["type","file","id","fileDropRef","formControlName","img",3,"change"],["for","fileDropRef"],[1,"file"],[1,"info"],[1,"name"],["class","bi bi-check-lg",4,"ngIf"],[1,"formButtons"],["type","submit",1,"submitButton"],[1,"cancelButton",3,"click"],[1,"bi","bi-check-lg"]],template:function(o,e){1&o&&(t.TgZ(0,"div",0)(1,"div",1)(2,"div",2)(3,"h1"),t._uU(4,"Upload Post"),t.qZA()()(),t.TgZ(5,"div",3)(6,"form",4),t.NdJ("ngSubmit",function(){return e.uploadPost()}),t.TgZ(7,"div",5)(8,"label",6),t._uU(9,"Title"),t.qZA(),t._UZ(10,"input",7),t.qZA(),t.TgZ(11,"div",5)(12,"label",8),t._uU(13,"Description"),t.qZA(),t._UZ(14,"textarea",9),t.qZA(),t.TgZ(15,"div",10)(16,"input",11),t.NdJ("change",function(p){return e.onFileChange(p)}),t.qZA(),t.TgZ(17,"h3"),t._uU(18,"Drag and drop file here"),t.qZA(),t.TgZ(19,"h3"),t._uU(20,"or"),t.qZA(),t.TgZ(21,"label",12),t._uU(22,"Browse for file"),t.qZA()(),t.TgZ(23,"div",13)(24,"div",14)(25,"h4",15),t.YNc(26,y,1,0,"i",16),t._uU(27),t.qZA()()(),t.TgZ(28,"div",17)(29,"button",18),t._uU(30,"Upload"),t.qZA(),t.TgZ(31,"button",19),t.NdJ("click",function(){return e.closeModal()}),t._uU(32,"Cancel"),t.qZA()()()()()),2&o&&(t.xp6(6),t.Q6J("formGroup",e.myForm),t.xp6(20),t.Q6J("ngIf",e.uploaded),t.xp6(1),t.hij("",null==e.file?null:e.file.name," "))},dependencies:[d.O5,l._Y,l.Fj,l.JJ,l.JL,l.sg,l.u],styles:[".mycontainer[_ngcontent-%COMP%]{position:relative;z-index:2;overflow:hidden}.bi-x-circle[_ngcontent-%COMP%]{font-size:24px}.header[_ngcontent-%COMP%]{display:flex;justify-content:center}.form-group[_ngcontent-%COMP%]{display:flex;flex-direction:column;margin-bottom:10px}.dropzone[_ngcontent-%COMP%]{width:450px;height:200px;padding:2rem;text-align:center;border:dashed 1px #979797;position:relative;margin:O auto}.dropzone[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]{opacity:0;position:absolute;z-index:2;width:100%;height:100%;top:0;left:0}.dropzone[_ngcontent-%COMP%]   label[_ngcontent-%COMP%]{color:#fff;border-radius:5px;background-color:#4473ff;padding:10px}.bi-check-lg[_ngcontent-%COMP%]{color:green;font-size:20px}.dropzone[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%]{font-size:20px;font-weight:600;color:#38424c}.file[_ngcontent-%COMP%]   h4[_ngcontent-%COMP%]{margin:0;font-weight:700;font-size:16px}.formButtons[_ngcontent-%COMP%]{display:flex;justify-content:center;padding:20px;margin:0}.formButtons[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]{padding:7px 20px;margin:0 0 0 25px;border:none;border-radius:5px;color:#fff}.formButtons[_ngcontent-%COMP%]   .submitButton[_ngcontent-%COMP%]{background-color:green}.formButtons[_ngcontent-%COMP%]   .cancelButton[_ngcontent-%COMP%]{background-color:red}"]}),n})();var b=r(7420),v=r(384);let Z=(()=>{class n{constructor(o,e,s){this.dialogRef=o,this.sharedService=e,this.authService=s}ngOnInit(){}closeDialog(){this.dialogRef.close()}}return n.\u0275fac=function(o){return new(o||n)(t.Y36(c.so),t.Y36(b.F),t.Y36(v.e))},n.\u0275cmp=t.Xpm({type:n,selectors:[["app-pop-up-post"]],inputs:{post:"post"},decls:19,vars:2,consts:[[1,"header"],[1,"user"],[1,"exit"],[1,"bi","bi-x-circle",3,"click"],[1,"containerImg"],[1,"img"],[3,"src"],[1,"post_icons"],[1,"bi","bi-heart"],[1,"bi","bi-chat"],[1,"bi","bi-trash3-fill","text-danger"],[1,"bi","bi-pencil"]],template:function(o,e){1&o&&(t.TgZ(0,"div",0)(1,"div",1)(2,"p"),t._uU(3),t.qZA()(),t.TgZ(4,"div",2)(5,"i",3),t.NdJ("click",function(){return e.closeDialog()}),t.qZA()()(),t.TgZ(6,"mat-dialog-content",4)(7,"div",5),t._UZ(8,"img",6),t.qZA()(),t.TgZ(9,"div",7)(10,"ul")(11,"li"),t._UZ(12,"i",8),t.qZA(),t.TgZ(13,"li"),t._UZ(14,"i",9),t.qZA(),t.TgZ(15,"li"),t._UZ(16,"i",10),t.qZA(),t.TgZ(17,"li"),t._UZ(18,"i",11),t.qZA()()()),2&o&&(t.xp6(3),t.Oqu(e.post.user),t.xp6(5),t.Q6J("src",e.post.img,t.LSH))},dependencies:[c.xY],styles:[".header[_ngcontent-%COMP%]{display:flex}.header[_ngcontent-%COMP%] > .exit[_ngcontent-%COMP%] > i[_ngcontent-%COMP%]{font-size:22px;color:#000;cursor:pointer}.user[_ngcontent-%COMP%]{display:flex;align-items:baseline;flex:1}.user[_ngcontent-%COMP%] > button[_ngcontent-%COMP%]{padding:4px;background-color:#4473ff;color:#fff;border:none;border-radius:4px;width:10%}.user[_ngcontent-%COMP%] > p[_ngcontent-%COMP%]{font-weight:bolder;font-size:16px;margin-right:10px}.containerImg[_ngcontent-%COMP%]{overflow:hidden}.post_icons[_ngcontent-%COMP%] > ul[_ngcontent-%COMP%]{display:flex;list-style:none;margin:10px 0 0;padding:0}.post_icons[_ngcontent-%COMP%] > ul[_ngcontent-%COMP%]   i[_ngcontent-%COMP%]{cursor:pointer;font-size:22px;margin-right:20px}.img[_ngcontent-%COMP%]{width:100%}img[_ngcontent-%COMP%]{width:100%;height:100%;object-fit:contain}"]}),n})();function O(n,i){if(1&n){const o=t.EpF();t.TgZ(0,"div",6),t.NdJ("mouseenter",function(){const p=t.CHM(o).index,g=t.oxw();return t.KtG(g.changeState(p))})("mouseleave",function(){const p=t.CHM(o).index,g=t.oxw();return t.KtG(g.changeState(p))}),t.TgZ(1,"div",7)(2,"div",8),t._UZ(3,"img",9),t.qZA()(),t.TgZ(4,"div",10)(5,"ul")(6,"li"),t._UZ(7,"i",11),t.qZA(),t.TgZ(8,"li"),t._UZ(9,"i",12),t.qZA(),t.TgZ(10,"li"),t._UZ(11,"i",13),t.qZA(),t.TgZ(12,"li"),t._UZ(13,"i",14),t.qZA()()()()}if(2&n){const o=i.$implicit,e=i.index,s=t.oxw();t.xp6(3),t.Q6J("src",o.img,t.LSH),t.xp6(1),t.Q6J("@visibleIcons",s.state[e])}}let U=(()=>{class n{constructor(o){this.dialog=o,this.posts=[],this.postsLength=0,this.state=[]}ngOnInit(){for(let o=0;o<this.postsLength;o++)this.state.push("close");console.log(this.state)}openDialogUpload(){this.dialog.open(M,{disableClose:!0})}openDialog(o){this.dialog.open(Z,{maxWidth:"700px",maxHeight:"700px"}).componentInstance.post=o}changeState(o){this.state[o]="close"===this.state[o]?"open":"close"}}return n.\u0275fac=function(o){return new(o||n)(t.Y36(c.uw))},n.\u0275cmp=t.Xpm({type:n,selectors:[["app-post-gallery"]],inputs:{posts:"posts",postsLength:"postsLength"},decls:6,vars:1,consts:[[1,"row"],[1,"column"],[1,"add_post"],[1,"blur_background"],["data-toggle","tooltip","data-placement","bottom","title","Add Post",1,"bi","bi-plus-square",3,"click"],["class","column",3,"mouseenter","mouseleave",4,"ngFor","ngForOf"],[1,"column",3,"mouseenter","mouseleave"],[1,"gallery-container"],[1,"image"],[3,"src"],[1,"post_icons"],[1,"bi","bi-heart"],[1,"bi","bi-chat"],[1,"bi","bi-trash3-fill","text-danger"],[1,"bi","bi-pencil"]],template:function(o,e){1&o&&(t.TgZ(0,"div",0)(1,"div",1)(2,"div",2),t._UZ(3,"div",3),t.TgZ(4,"i",4),t.NdJ("click",function(){return e.openDialogUpload()}),t.qZA()()(),t.YNc(5,O,14,2,"div",5),t.qZA()),2&o&&(t.xp6(5),t.Q6J("ngForOf",e.posts))},dependencies:[d.sg],styles:[".row[_ngcontent-%COMP%]{display:flex;margin:5px;flex-wrap:wrap}.column[_ngcontent-%COMP%]{flex-basis:33.3%;padding:5px}.add_post[_ngcontent-%COMP%]{position:relative;display:flex;justify-content:center;align-items:center;width:100%;height:88%}.blur_background[_ngcontent-%COMP%]{position:absolute;inset:0;background-color:#bbb;filter:blur(5px);z-index:-1}.bi-plus-square[_ngcontent-%COMP%]{z-index:111;font-size:2.2em;cursor:pointer}.imgcontainer[_ngcontent-%COMP%]{position:relative;top:0;z-index:1}.image[_ngcontent-%COMP%]{width:100%;height:100%;overflow:hidden}img[_ngcontent-%COMP%]{border-radius:4px;width:100%;height:100%;object-fit:cover}.post_icons[_ngcontent-%COMP%] > ul[_ngcontent-%COMP%]{display:flex;justify-content:center;list-style:none;margin:10px 0 0;padding:0}.post_icons[_ngcontent-%COMP%] > ul[_ngcontent-%COMP%]   i[_ngcontent-%COMP%]{cursor:pointer;font-size:20px;margin-right:20px}@media only screen and (max-width:480px){.column[_ngcontent-%COMP%]{flex-basis:100%}.add_post[_ngcontent-%COMP%]{height:12.4475em}}@media only screen and (min-width: 481px) and (max-width:801px){.column[_ngcontent-%COMP%]{flex-basis:50%}}"],data:{animation:[(0,a.X$)("visibleIcons",[(0,a.SB)("open",(0,a.oB)({transform:"translateY(0px)"})),(0,a.SB)("close",(0,a.oB)({transform:"translateY(-40px)"})),(0,a.eR)("open<=>close",(0,a.jt)("150ms"))])]}}),n})();function T(n,i){1&n&&t._UZ(0,"span",6)}function A(n,i){if(1&n&&(t.TgZ(0,"div",7),t._UZ(1,"app-post-gallery",8),t.qZA()),2&n){const o=t.oxw();t.xp6(1),t.Q6J("posts",o.myPosts)("postsLength",o.myPosts.length)}}const w=[{path:"",component:(()=>{class n{constructor(o){this.myPostService=o,this.myPosts=[]}ngOnInit(){this.getMyPosts()}getMyPosts(){this.myPostService.getMyposts().subscribe({next:o=>this.myPosts=o,error:o=>console.log(o)})}}return n.\u0275fac=function(o){return new(o||n)(t.Y36(f))},n.\u0275cmp=t.Xpm({type:n,selectors:[["app-mypost"]],decls:9,vars:2,consts:[[1,"mycontainer"],[1,"d-flex","justify-content-center"],["class","loader",4,"ngIf","ngIfElse"],["posts",""],[1,"container_footer"],[1,"footer"],[1,"loader"],[1,"postcontainer"],[3,"posts","postsLength"]],template:function(o,e){if(1&o&&(t.TgZ(0,"div",0)(1,"div",1)(2,"h3"),t._uU(3,"My Posts"),t.qZA()(),t.YNc(4,T,1,0,"span",2),t.YNc(5,A,2,2,"ng-template",null,3,t.W1O),t.TgZ(7,"div",4),t._UZ(8,"app-footer",5),t.qZA()()),2&o){const s=t.MAs(6);t.xp6(4),t.Q6J("ngIf",!e.myPosts.length)("ngIfElse",s)}},dependencies:[d.O5,P.c,U],styles:['.mycontainer[_ngcontent-%COMP%]{display:flex;flex-direction:column;height:100%}h3[_ngcontent-%COMP%]{margin-top:10px;margin-bottom:5px;font-size:30px}.postcontainer[_ngcontent-%COMP%]{flex:1}.container_footer[_ngcontent-%COMP%]{display:flex;justify-content:center}.footer[_ngcontent-%COMP%]{width:70%}.loader[_ngcontent-%COMP%]{width:48px;height:48px;border-radius:50%;display:inline-block;border-top:4px solid #FFF;border-right:4px solid transparent;box-sizing:border-box;animation:rotation 1s linear infinite}.loader[_ngcontent-%COMP%]:after{content:"";box-sizing:border-box;position:absolute;left:0;top:0;width:48px;height:48px;border-radius:50%;border-bottom:4px solid #FF3D00;border-left:4px solid transparent}@keyframes rotation{0%{transform:rotate(0)}to{transform:rotate(360deg)}}']}),n})()}];let F=(()=>{class n{}return n.\u0275fac=function(o){return new(o||n)},n.\u0275mod=t.oAB({type:n}),n.\u0275inj=t.cJS({imports:[u.Bz.forChild(w),u.Bz]}),n})();var z=r(4466);let S=(()=>{class n{}return n.\u0275fac=function(o){return new(o||n)},n.\u0275mod=t.oAB({type:n}),n.\u0275inj=t.cJS({imports:[d.ez,F,z.m,c.Is,l.UX]}),n})()}}]);