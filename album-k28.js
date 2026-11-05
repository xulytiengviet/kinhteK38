(function(){
"use strict";
const $=id=>document.getElementById(id);
const root=$("albumK28Groups");
if(!root)return;
const names=["Ngày tốt nghiệp","Dã ngoại trên đồi cát","Tập thể trước giảng đường","Những người bạn thân thiết","Khoảnh khắc lớp học","Ngày hội lớp","Lang Biang – Chuyến đi đáng nhớ","Hội ngộ trên núi","Tham quan trang trại","Một ngày bên nhau"];
const groups=[
 {id:"albumK28Class",title:"Lớp học thân quen",indices:[0,2,3,4,5]},
 {id:"albumK28Trip",title:"Chuyến tham quan K28",indices:[6,8]},
 {id:"albumK28Picnic",title:"Kỷ niệm dã ngoại K28",indices:[1,7,9]}
];
const paths={restored:"images/ky-niem-k28/",original:"images/ky-niem-k28-goc/"};
const fallback=[
 {src:"images/k28-lop-hoc.webp",title:"Lớp học thân quen",group:"albumK28Class"},
 {src:"images/k28-tham-quan.webp",title:"Chuyến tham quan",group:"albumK28Trip"},
 {src:"images/k28-da-ngoai.webp",title:"Kỷ niệm dã ngoại",group:"albumK28Picnic"}
];
const count=$("albumK28Count"),notice=$("albumK28Message"),disclaimer=$("albumK28Disclaimer");
const restoredBtn=$("albumK28Enhanced"),originalBtn=$("albumK28Original");
const dialog=$("albumK28Lightbox"),image=$("albumK28LightboxImage");
let present={restored:[],original:[]},mode="fallback",items=[],currentIndex=0,previousFocus=null;
const file=(m,n)=>paths[m]+String(n+1).padStart(2,"0")+".webp";
function exists(url){
 return new Promise(resolve=>{
  let done=false;
  const finish=ok=>{if(done)return;done=true;resolve(ok);};
  const controller=typeof AbortController!=="undefined"?new AbortController():null;
  const timer=setTimeout(()=>{controller?.abort();finish(false);},6500);
  fetch(url,{method:"HEAD",signal:controller?.signal}).then(r=>{clearTimeout(timer);finish(r.ok);}).catch(()=>{
   const img=new Image();
   img.onload=()=>{clearTimeout(timer);finish(true);};
   img.onerror=()=>{clearTimeout(timer);finish(false);};
   img.src=url;
  });
 });
}
function has(m){return present[m].some(Boolean);}
function status(s){notice.hidden=!s;notice.textContent=s;}
function photos(){
 if(mode==="fallback")return fallback.map((p,i)=>({...p,index:i,caption:"Ảnh dự phòng hiện có"}));
 return names.map((title,i)=>({index:i,title,src:file(mode,i),group:groups.find(g=>g.indices.includes(i)).id,caption:mode==="original"?"Ảnh tư liệu gốc":"Ảnh xử lý rõ nét · đối chiếu ảnh gốc"})).filter(p=>present[mode][p.index]);
}
function openPhoto(i){
 if(!items.length)return;
 currentIndex=(i+items.length)%items.length;
 const p=items[currentIndex];
 image.src=p.src;image.alt=p.title;
 $("albumK28LightboxLabel").textContent=p.title;
 $("albumK28LightboxIndex").textContent=(currentIndex+1)+" / "+items.length+" · "+p.caption;
 if(!dialog.open){previousFocus=document.activeElement;dialog.showModal();}
}
function render(){
 items=photos();root.replaceChildren();
 restoredBtn.disabled=!has("restored");originalBtn.disabled=!has("original");
 for(const [button,m] of [[restoredBtn,"restored"],[originalBtn,"original"]]){
  button.classList.toggle("is-selected",mode===m);
  button.setAttribute("aria-pressed",String(mode===m));
 }
 disclaimer.textContent=mode==="fallback"?"Chưa đủ album 10 ảnh. Các hình bên dưới chỉ là ảnh dự phòng, chưa được nghiệm thu.":mode==="original"?"Đây là ảnh tư liệu gốc; hãy giữ bản gốc để đối chiếu.":"Ảnh xử lý bằng AI có thể sai khuôn mặt hoặc bối cảnh. Chỉ xác nhận sự kiện sau khi đối chiếu ảnh gốc.";
 for(const group of groups){
  const section=document.createElement("section");section.className="album-k28-group";section.id=group.id;
  const title=document.createElement("h3");title.className="album-k28-heading";title.textContent=group.title;section.append(title);
  const subset=items.filter(p=>p.group===group.id);
  if(!subset.length){const p=document.createElement("p");p.className="album-k28-empty";p.textContent="Đang chờ bổ sung ảnh tư liệu cho nhóm này.";section.append(p);}
  else{
   const grid=document.createElement("div");grid.className="album-k28-grid";
   for(const photo of subset){
    const card=document.createElement("article");card.className="album-k28-card";
    const button=document.createElement("button");button.type="button";button.className="album-k28-thumb";button.setAttribute("aria-label","Phóng to "+photo.title);
    const img=document.createElement("img");img.src=photo.src;img.alt=photo.title;img.loading="lazy";img.decoding="async";
    img.addEventListener("error",()=>{button.disabled=true;button.title="Không tải được ảnh";});
    button.append(img);button.addEventListener("click",()=>openPhoto(items.indexOf(photo)));
    const label=document.createElement("div");label.className="album-k28-photo-label";label.textContent=photo.title;
    const small=document.createElement("small");small.textContent=photo.caption;label.append(small);
    card.append(button,label);grid.append(card);
   }
   section.append(grid);
  }
  root.append(section);
 }
 count.textContent=mode==="fallback"?items.length+" ảnh dự phòng · chờ album 10 ảnh":items.length+"/10 ảnh · "+(mode==="original"?"Ảnh gốc":"Ảnh xử lý");
 status(mode==="fallback"?"Bộ 10 ảnh gốc và phục dựng chưa được tải đủ lên GitHub.":items.length<10?"Chỉ có "+items.length+"/10 ảnh thuộc chế độ này. Những ảnh thiếu đã được ẩn.":"");
}
restoredBtn.addEventListener("click",()=>{if(has("restored")){mode="restored";render();}});
originalBtn.addEventListener("click",()=>{if(has("original")){mode="original";render();}});
$("albumK28LightboxClose").addEventListener("click",()=>dialog.close());
$("albumK28LightboxPrev").addEventListener("click",()=>openPhoto(currentIndex-1));
$("albumK28LightboxNext").addEventListener("click",()=>openPhoto(currentIndex+1));
dialog.addEventListener("close",()=>{if(previousFocus?.isConnected)previousFocus.focus();});
dialog.addEventListener("click",e=>{if(e.target===dialog)dialog.close();});
document.addEventListener("keydown",e=>{
 if(!dialog.open)return;
 if(e.key==="ArrowLeft"){e.preventDefault();openPhoto(currentIndex-1);}
 if(e.key==="ArrowRight"){e.preventDefault();openPhoto(currentIndex+1);}
});
count.textContent="Đang kiểm tra ảnh thực có…";
Promise.all(["restored","original"].map(async m=>{present[m]=await Promise.all(names.map((_,i)=>exists(file(m,i))));}))
 .then(()=>{mode=has("restored")?"restored":has("original")?"original":"fallback";render();})
 .catch(()=>{mode="fallback";render();});
})();
