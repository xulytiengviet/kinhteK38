
(function () {
"use strict";
const groups=[
 {id:"albumK28Class",title:"Lớp học thân quen",subtitle:"Những gương mặt và góc sân trường đã cùng chúng mình đi qua tuổi trẻ.",items:[1,3,4,5,6]},
 {id:"albumK28Trip",title:"Chuyến tham quan K28",subtitle:"Chuyến đi cùng nhau",items:[2,8,9,10]},
 {id:"albumK28Picnic",title:"Kỷ niệm dã ngoại K28",subtitle:"Một ngày dã ngoại",items:[7]}
];
const captions={
 1:"Ngày chúng mình tốt nghiệp",
 2:"Những nụ cười trên đồi cát",
 3:"Tập thể trước giảng đường",
 4:"Bạn bè thân thương",
 5:"Những giây phút trong lớp",
 6:"Ngày vui của lớp mình",
 7:"Một ngày ở Lang Biang",
 8:"Hội ngộ giữa núi trời",
 9:"Cùng nhau đi tham quan",
 10:"Ngày ấy bên nhau"
};
const allIds=groups.flatMap(g=>g.items);
if(allIds.length!==10||new Set(allIds).size!==10)throw Error("Album cần có đúng mười ảnh không lặp.");
const root=document.getElementById("anhxua");if(!root)return;
const $=id=>document.getElementById(id);
const dirs={restored:"images/ky-niem-k28/",original:"images/ky-niem-k28-goc/"};
let mode="restored",lightboxIndex=0,renderVersion=0,shown=new Set();
const src=(id,m=mode)=>dirs[m]+String(id).padStart(2,"0")+".webp";
const sourceLabel=m=>m==="restored"?"Phục dựng AI":"Ảnh gốc";
function updateMeta(){
 $("albumK28Enhanced").classList.toggle("is-selected",mode==="restored");
 $("albumK28Original").classList.toggle("is-selected",mode==="original");
 $("albumK28Enhanced").setAttribute("aria-pressed",String(mode==="restored"));
 $("albumK28Original").setAttribute("aria-pressed",String(mode==="original"));
 $("albumK28Disclaimer").textContent=mode==="restored"?
   "Bộ ảnh rõ nét được phục dựng bằng AI nên có thể khác ảnh gốc ở một số chi tiết. Sử dụng nút Ảnh gốc để đối chiếu.":
   "Ảnh gốc từ tư liệu lớp K28 được giữ để đối chiếu; kích thước nhỏ có thể khiến ảnh kém sắc nét khi phóng lớn.";
}
function updateCount(){
 $("albumK28Count").textContent=shown.size+" / 10 ảnh đã tải · "+sourceLabel(mode);
 const message=$("albumK28Message");
 message.hidden=shown.size===10;
 message.textContent=shown.size===10?"":"Đang thiếu "+(10-shown.size)+" ảnh trên GitHub. Vui lòng đồng bộ các tệp ảnh K28 vào thư mục images/ rồi tải lại trang. Ba ảnh cũ đã được gỡ khỏi album.";
}
function makeImage(id,version){
 const button=document.createElement("button");button.type="button";button.className="album-k28-thumb";
 button.setAttribute("aria-label","Xem lớn ảnh "+id+": "+captions[id]);
 const placeholder=document.createElement("div");placeholder.className="album-k28-placeholder";
 placeholder.innerHTML='<span>▧</span><strong>Ảnh '+String(id).padStart(2,"0")+'</strong><small>Đang đồng bộ ảnh</small>';
 const img=document.createElement("img");img.alt=captions[id]+", "+sourceLabel(mode);
 img.loading="lazy";img.decoding="async";img.hidden=true;
 img.onload=()=>{if(renderVersion!==version)return;placeholder.hidden=true;img.hidden=false;shown.add(id);button.disabled=false;updateCount()};
 img.onerror=()=>{if(renderVersion!==version)return;placeholder.hidden=false;img.hidden=true;shown.delete(id);button.disabled=true;updateCount()};
 button.disabled=true;
 button.addEventListener("click",()=>openPhoto(id));
 button.append(img,placeholder);
 img.src=src(id);
 return button;
}
function render(){
 const container=$("albumK28Groups");container.replaceChildren();renderVersion++;shown=new Set();
 const ver=renderVersion;updateMeta();
 for(const group of groups){
  const section=document.createElement("section");section.className="album-k28-group";section.id=group.id;
  const head=document.createElement("div");head.className="album-k28-group-head";
  const title=document.createElement("h3");title.textContent=group.title;
  const subtitle=document.createElement("p");subtitle.textContent=group.subtitle;
  const counter=document.createElement("span");counter.textContent=group.items.length+" ảnh";
  head.append(title,subtitle,counter);
  const grid=document.createElement("div");grid.className="album-k28-grid";
  for(const id of group.items){
   const item=document.createElement("figure");item.className="album-k28-card";
   const photo=makeImage(id,ver);
   const label=document.createElement("figcaption");label.className="album-k28-photo-label";
   label.append(document.createTextNode(String(id).padStart(2,"0")+" · "+captions[id]));
   const sub=document.createElement("small");sub.textContent=sourceLabel(mode);label.append(sub);
   item.append(photo,label);grid.append(item);
  }
  section.append(head,grid);container.append(section);
 }
 updateCount();
}
function openPhoto(id){
 const modal=$("albumK28Lightbox");lightboxIndex=allIds.indexOf(id);
 if(lightboxIndex<0)lightboxIndex=0;
 const target=allIds[lightboxIndex];
 $("albumK28LightboxImage").src=src(target);
 $("albumK28LightboxImage").alt=captions[target];
 $("albumK28LightboxLabel").textContent=captions[target];
 $("albumK28LightboxIndex").textContent=String(target).padStart(2,"0")+" / 10 · "+sourceLabel(mode);
 if(!modal.open)modal.showModal();
}
function next(step){
 for(let i=1;i<=allIds.length;i++){
  const j=(lightboxIndex+step*i+allIds.length*3)%allIds.length;
  if(shown.has(allIds[j])){openPhoto(allIds[j]);return}
 }
}
$("albumK28Enhanced").addEventListener("click",()=>{if(mode!=="restored"){mode="restored";render()}});
$("albumK28Original").addEventListener("click",()=>{if(mode!=="original"){mode="original";render()}});
$("albumK28LightboxClose").addEventListener("click",()=>$("albumK28Lightbox").close());
$("albumK28LightboxPrev").addEventListener("click",()=>next(-1));
$("albumK28LightboxNext").addEventListener("click",()=>next(1));
$("albumK28Lightbox").addEventListener("click",e=>{if(e.target===$("albumK28Lightbox"))e.target.close()});
document.addEventListener("keydown",e=>{
 if(!$("albumK28Lightbox").open)return;
 if(e.key==="ArrowLeft"){e.preventDefault();next(-1)}
 if(e.key==="ArrowRight"){e.preventDefault();next(1)}
});
let touchX=null;
$("albumK28LightboxImage").addEventListener("touchstart",e=>{touchX=e.changedTouches[0].clientX},{passive:true});
$("albumK28LightboxImage").addEventListener("touchend",e=>{
 if(touchX===null)return;
 const d=e.changedTouches[0].clientX-touchX;touchX=null;
 if(Math.abs(d)>65)next(d>0?-1:1);
},{passive:true});
render();
})();
