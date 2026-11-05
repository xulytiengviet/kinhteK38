(function(){
"use strict";
const $=id=>document.getElementById(id);
const host=$("albumK28Groups");
if(!host)return;
const photos=[
 ["Ngày tốt nghiệp","Ngày tốt nghiệp"],
 ["Dã ngoại trên đồi cát","Chuyến đi cùng nhau"],
 ["Tập thể trước giảng đường","Lớp học thân quen"],
 ["Những người bạn thân thiết","Lớp học thân quen"],
 ["Khoảnh khắc lớp học","Lớp học thân quen"],
 ["Ngày hội lớp","Lớp học thân quen"],
 ["Lang Biang – Chuyến đi đáng nhớ","Kỷ niệm dã ngoại K28"],
 ["Hội ngộ trên núi","Kỷ niệm dã ngoại K28"],
 ["Tham quan trang trại","Chuyến tham quan K28"],
 ["Một ngày bên nhau","Một ngày dã ngoại"]
];
const path=i=>"images/ky-niem-k28/"+String(i+1).padStart(2,"0")+".webp";
const present=Array(10).fill(false);
const notice=$("albumK28Message"),count=$("albumK28Count");
const dialog=$("albumK28Lightbox"),large=$("albumK28LightboxImage");
let index=0,lastFocus=null,touchX=null;
const view=document.createElement("div");view.className="k28-carousel";
view.innerHTML=[
 '<div class="k28-carousel-stage">',
  '<button class="k28-carousel-arrow prev" type="button" aria-label="Ảnh trước">❮</button>',
  '<button class="k28-carousel-image-button" type="button" aria-label="Phóng to ảnh">',
   '<img class="k28-carousel-image" alt="" decoding="async">',
  '</button>',
  '<button class="k28-carousel-arrow next" type="button" aria-label="Ảnh tiếp theo">❯</button>',
  '<span class="k28-carousel-count" aria-live="polite">00 / 10</span>',
 '</div>',
 '<div class="k28-carousel-footer">',
  '<div><div class="k28-carousel-category"></div><h3 class="k28-carousel-title"></h3>',
  '</div>',
  '<div class="k28-carousel-controls">',
   '<button class="prev" type="button">← Trước</button><button class="next" type="button">Tiếp →</button>',
  '</div>',
 '</div>',
 '<div class="k28-carousel-dots" role="group" aria-label="Chọn ảnh trong album"></div>',
 '<p class="k28-carousel-help">Vuốt ngang trên điện thoại hoặc dùng phím ← → để chuyển ảnh. Chạm ảnh để xem lớn.</p>'
].join("");
host.replaceChildren(view);
const stage=view.querySelector(".k28-carousel-stage");
const img=view.querySelector(".k28-carousel-image");
const zoom=view.querySelector(".k28-carousel-image-button");
const dots=view.querySelector(".k28-carousel-dots");
const showNotice=s=>{notice.hidden=!s;notice.textContent=s||"";};
const available=()=>photos.map((p,i)=>i).filter(i=>present[i]);
function probe(url){
 return new Promise(resolve=>{
  const c=typeof AbortController==="function"?new AbortController():null;
  let done=false;
  const finish=ok=>{if(!done){done=true;resolve(ok);}};
  const timer=setTimeout(()=>{c?.abort();finish(false);},7000);
  fetch(url,{method:"HEAD",signal:c?.signal}).then(r=>{clearTimeout(timer);finish(r.ok);}).catch(()=>{
   const im=new Image();im.onload=()=>{clearTimeout(timer);finish(true);};
   im.onerror=()=>{clearTimeout(timer);finish(false);};im.src=url;
  });
 });
}
function syncDialog(){
 large.src=path(index);large.alt=photos[index][0];
 $("albumK28LightboxLabel").textContent=photos[index][0];
 $("albumK28LightboxIndex").textContent=String(index+1).padStart(2,"0")+" / 10 · Ảnh K28";
}
function render(){
 const choices=available();

 if(choices.length&&!present[index])index=choices[0];
 dots.replaceChildren();
 photos.forEach((p,i)=>{
  const b=document.createElement("button");b.type="button";
  b.className="k28-carousel-dot"+(index===i?" active":"");
  b.textContent=String(i+1);b.disabled=!present[i];
  b.setAttribute("aria-label","Ảnh "+(i+1)+": "+p[0]);
  b.setAttribute("aria-current",String(i===index&&present[i]));
  b.addEventListener("click",()=>show(i));dots.append(b);
 });
 if(!choices.length){
  img.removeAttribute("src");img.alt="";zoom.disabled=true;
  view.classList.add("is-empty");
  view.querySelector(".k28-carousel-title").textContent="Đang chờ bộ 10 ảnh K28";
  view.querySelector(".k28-carousel-category").textContent="ALBUM TƯ LIỆU";
  view.querySelector(".k28-carousel-count").textContent="00 / 10";
  count.textContent="0/10 ảnh đã công bố";
  showNotice("Bộ ảnh chưa có trên máy chủ. Không dùng ảnh dự phòng để thay thế 10 ảnh của lớp.");
  return;
 }
 view.classList.remove("is-empty");zoom.disabled=false;
 img.src=path(index);img.alt=photos[index][0];
 view.querySelector(".k28-carousel-count").textContent=String(index+1).padStart(2,"0")+" / 10";
 view.querySelector(".k28-carousel-category").textContent=photos[index][1];
 view.querySelector(".k28-carousel-title").textContent=photos[index][0];
 count.textContent=choices.length+"/10 ảnh";
 showNotice(choices.length<10?"Chỉ có "+choices.length+"/10 ảnh; những tấm chưa tải lên được bỏ qua.":"");
 if(dialog.open)syncDialog();
 if(choices.length>1){
  const next=choices[(choices.indexOf(index)+1)%choices.length];
  const preload=new Image();preload.src=path(next);
 }
}
function show(next){if(!present[next])return;index=next;render();}
function step(delta){
 const v=available();if(!v.length)return;
 const pos=v.indexOf(index);show(v[(pos+delta+v.length)%v.length]);
}
view.querySelectorAll(".prev").forEach(b=>b.addEventListener("click",()=>step(-1)));
view.querySelectorAll(".next").forEach(b=>b.addEventListener("click",()=>step(1)));
zoom.addEventListener("click",()=>{if(!available().length)return;lastFocus=document.activeElement;syncDialog();dialog.showModal();});
$("albumK28LightboxClose").addEventListener("click",()=>dialog.close());
$("albumK28LightboxPrev").addEventListener("click",()=>step(-1));
$("albumK28LightboxNext").addEventListener("click",()=>step(1));
dialog.addEventListener("close",()=>{if(lastFocus?.isConnected)lastFocus.focus();});
dialog.addEventListener("click",e=>{if(e.target===dialog)dialog.close();});
stage.addEventListener("touchstart",e=>{if(e.touches.length===1)touchX=e.touches[0].clientX;},{passive:true});
stage.addEventListener("touchend",e=>{
 if(touchX===null||!e.changedTouches.length)return;
 const diff=e.changedTouches[0].clientX-touchX;touchX=null;
 if(Math.abs(diff)>45)step(diff<0?1:-1);
},{passive:true});
document.addEventListener("keydown",e=>{
 if(!dialog.open&&!view.contains(document.activeElement))return;
 if(e.key==="ArrowLeft"){e.preventDefault();step(-1);}
 if(e.key==="ArrowRight"){e.preventDefault();step(1);}
});
img.addEventListener("error",()=>{present[index]=false;render();});
showNotice("Đang kiểm tra bộ ảnh K28…");
Promise.all(photos.map((_,i)=>probe(path(i))))
 .then(flags=>{flags.forEach((found,i)=>{present[i]=found;});render();})
 .catch(()=>{render();showNotice("Không kiểm tra được album trên máy chủ. Thử tải lại trang.");});
})();
