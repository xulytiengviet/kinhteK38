
(function(){
"use strict";
const names=[
 "Ngày tốt nghiệp","Dã ngoại trên đồi cát","Tập thể trước giảng đường","Những người bạn thân thiết",
 "Khoảnh khắc lớp học","Ngày hội lớp","Lang Biang – Chuyến đi đáng nhớ","Hội ngộ trên núi",
 "Tham quan trang trại","Một ngày bên nhau"
];
const root=document.getElementById("anhxua");
if(!root)return;
const $=id=>document.getElementById(id);
const folder={restored:"images/ky-niem-k28/",original:"images/ky-niem-k28-goc/"};
let mode="restored",ready=false,lightbox=0;
const pad=n=>String(n).padStart(2,"0");
const src=(i,m=mode)=>folder[m]+pad(i+1)+".webp";
function exists(url){return new Promise(resolve=>{const img=new Image();img.onload=()=>resolve(true);img.onerror=()=>resolve(false);img.src=url})}
function updateControls(){
 $("albumK28Enhanced").classList.toggle("is-selected",mode==="restored");
 $("albumK28Original").classList.toggle("is-selected",mode==="original");
 $("albumK28Enhanced").setAttribute("aria-pressed",String(mode==="restored"));
 $("albumK28Original").setAttribute("aria-pressed",String(mode==="original"));
 $("albumK28Disclaimer").textContent=mode==="restored"?
 "Ảnh phục dựng bằng AI có thể khác ảnh lịch sử ở chi tiết khuôn mặt và cảnh vật; nhấn “Ảnh gốc” để đối chiếu.":
 "Ảnh gốc được giữ nguyên từ tư liệu do lớp cung cấp, độ phân giải có thể thấp nhưng trung thực với khoảnh khắc ban đầu.";
}
function openPhoto(n){
 lightbox=(n+names.length)%names.length;
 $("albumK28LightboxImage").src=src(lightbox);
 $("albumK28LightboxImage").alt=names[lightbox]+(mode==="restored"?" · ảnh phục dựng":" · ảnh gốc");
 $("albumK28LightboxLabel").textContent=names[lightbox];
 $("albumK28LightboxIndex").textContent=(lightbox+1)+" / "+names.length+" · "+(mode==="restored"?"Phục dựng AI":"Ảnh gốc");
 const dialog=$("albumK28Lightbox");if(!dialog.open)dialog.showModal();
}
function draw(){
 updateControls();
 const grid=$("albumK28Grid");grid.replaceChildren();
 names.forEach((name,i)=>{
  const card=document.createElement("article");card.className="album-k28-card";
  const button=document.createElement("button");button.className="album-k28-thumb";button.type="button";
  button.setAttribute("aria-label","Phóng to "+name);
  const im=document.createElement("img");im.src=src(i);im.alt=name+(mode==="restored"?" — ảnh phục dựng AI":" — ảnh gốc");
  im.loading=i<2?"eager":"lazy";im.decoding="async";button.append(im);
  button.addEventListener("click",()=>openPhoto(i));
  const label=document.createElement("div");label.className="album-k28-photo-label";
  label.textContent=String(i+1).padStart(2,"0")+" · "+name;
  const sub=document.createElement("small");sub.textContent=mode==="restored"?"Ảnh làm rõ bằng AI":"Tư liệu gốc K28";label.append(sub);
  card.append(button,label);grid.append(card);
 });
 $("albumK28Count").textContent="10 ảnh · "+(mode==="restored"?"Bản phục dựng":"Bản gốc");
}
async function choose(next){
 if(next===mode)return;
 const ok=await exists(src(0,next));
 if(!ok){$("albumK28Count").textContent="Chưa có ảnh "+(next==="original"?"gốc":"phục dựng")+" trong GitHub";return}
 mode=next;draw();
}
$("albumK28Enhanced").addEventListener("click",()=>choose("restored"));
$("albumK28Original").addEventListener("click",()=>choose("original"));
$("albumK28LightboxClose").addEventListener("click",()=>$("albumK28Lightbox").close());
$("albumK28LightboxPrev").addEventListener("click",()=>openPhoto(lightbox-1));
$("albumK28LightboxNext").addEventListener("click",()=>openPhoto(lightbox+1));
$("albumK28Lightbox").addEventListener("click",e=>{if(e.target===$("albumK28Lightbox"))e.target.close()});
document.addEventListener("keydown",e=>{
 const dialog=$("albumK28Lightbox");if(!dialog.open)return;
 if(e.key==="ArrowLeft"){e.preventDefault();openPhoto(lightbox-1)}
 if(e.key==="ArrowRight"){e.preventDefault();openPhoto(lightbox+1)}
});
exists(src(0)).then(ok=>{
 if(!ok){$("albumK28Fallback").hidden=false;$("albumK28Count").textContent="3 ảnh cũ · chờ bổ sung 10 ảnh";return}
 ready=true;$("albumK28Fallback").hidden=true;draw();
}).catch(()=>{$("albumK28Fallback").hidden=false});
})();
