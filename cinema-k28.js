
(function(){
"use strict";
const $=s=>document.getElementById(s);
if(!$("k28Cinema"))return;
const base=[
 ["01","Ngày chúng mình tốt nghiệp","Niên khóa 2007–2011"],
 ["02","Một thời tuổi trẻ","Những chuyến đi đáng nhớ"],
 ["03","Bên nhau ngày ấy","Bạn bè Kinh tế K28"],
 ["04","Những người bạn thân thương","Tình bạn ở lại"],
 ["05","Kỷ niệm giảng đường","Gương mặt sinh viên"],
 ["06","Ngày vui còn mãi","Nụ cười năm ấy"],
 ["07","Đi qua miền ký ức","Hành trình tuổi trẻ"],
 ["08","Bạn bè bốn phương","Một thời rực rỡ"],
 ["09","Một hành trình đáng nhớ","K28, nơi chúng mình gặp nhau"],
 ["10","Hẹn ngày gặp lại","Thầy Long Ngo gửi tặng Lớp"]
].map(x=>({src:"images/ky-niem-k28/"+x[0]+".webp",title:x[1],subtitle:x[2]}));
const fallback=[
{src:"images/k28-lop-hoc.webp",title:"Góc lớp thân quen",subtitle:"Kinh tế K28 · 2007–2011"},
{src:"images/k28-tham-quan.webp",title:"Những chuyến đi cùng nhau",subtitle:"Một thời không quên"},
{src:"images/k28-da-ngoai.webp",title:"Tuổi trẻ còn ở lại",subtitle:"Thầy Long Ngo gửi tặng Lớp"}
];
const track=$("k28Music"),imga=$("k28FrameA"),imgb=$("k28FrameB");
const shorter=matchMedia("(prefers-reduced-motion: reduce)").matches;
const ms=shorter?7600:6200;
let slides=fallback.slice(),current=0,active=0,playing=false,timer=null,raf=null,t0=0,muted=false,audioStarted=false,fileUrl=null;
const note=s=>$("k28Notice").textContent=s;
function bars(){
 const holder=$("k28Progress");holder.replaceChildren();
 slides.forEach((s,i)=>{const el=document.createElement("button");el.type="button";el.className="k28-segment";el.setAttribute("aria-label","Xem ảnh "+(i+1));
 const fill=document.createElement("b");el.append(fill);el.onclick=()=>{render(i);schedule()};holder.append(el)});
 progress(0);
}
function progress(p){[...$("k28Progress").children].forEach((el,i)=>{el.firstChild.style.width=i<current?"100%":i===current?Math.round(p*100)+"%":"0%"})}
function render(n){
 current=(n+slides.length)%slides.length;
 const s=slides[current];
 $("k28Fraction").textContent=String(current+1).padStart(2,"0")+" / "+String(slides.length).padStart(2,"0");
 $("k28Caption").textContent=s.title;$("k28Subcaption").textContent=s.subtitle;
 $("k28Index").textContent=(current+1)+"/"+slides.length;
 const next=active===0?imgb:imga,prev=active===0?imga:imgb;
 const reveal=()=>{next.classList.add("visible");prev.classList.remove("visible");active=1-active;progress(0)};
 next.onload=reveal;next.onerror=()=>note("Một ảnh chưa tải được. Hãy kiểm tra thư mục images/ky-niem-k28.");
 next.src=s.src;next.alt=s.title;
 if(next.complete&&next.naturalWidth)reveal();
}
function stopClock(){if(timer)clearTimeout(timer);if(raf)cancelAnimationFrame(raf);timer=raf=null}
function tick(){if(!playing||document.hidden)return;const p=Math.min(1,(performance.now()-t0)/ms);progress(p);if(p<1)raf=requestAnimationFrame(tick)}
function schedule(){stopClock();if(!playing||document.hidden)return;t0=performance.now();raf=requestAnimationFrame(tick);timer=setTimeout(()=>{render(current+1);schedule()},ms)}
function pause(){playing=false;stopClock();track.pause();$("k28Play").textContent="▶ Xem phim & bật nhạc";$("k28OverlayPlay").hidden=false}
async function start(){
 if(playing)return;
 playing=true;$("k28Play").textContent="❚❚ Tạm dừng";$("k28OverlayPlay").hidden=true;
 schedule();
 if(!muted){try{await track.play();audioStarted=true;$("k28AudioToggle").textContent="♫ Tắt nhạc"}
 catch(e){note("Ảnh đang trình chiếu. Hãy chọn tệp MP3 từ điện thoại hoặc nhấn bật nhạc khi tệp đã có trên website.")}}
}
function available(src){return new Promise(resolve=>{const img=new Image();img.onload=()=>resolve(true);img.onerror=()=>resolve(false);img.src=src})}
Promise.all(base.map(x=>available(x.src))).then(flags=>{
 const found=base.filter((s,i)=>flags[i]);if(!found.length)return;
 slides=found;current=0;stopClock();playing=false;
 imga.src=slides[0].src;imga.classList.add("visible");imgb.classList.remove("visible");active=0;
 $("k28OverlayPlay").hidden=false;$("k28Play").textContent="▶ Xem phim & bật nhạc";
 $("k28Fraction").textContent="01 / "+String(slides.length).padStart(2,"0");
 $("k28Index").textContent="1/"+slides.length;$("k28Caption").textContent=slides[0].title;
 $("k28Subcaption").textContent=slides[0].subtitle;bars();
 note("Đã tải "+slides.length+" ảnh kỷ niệm. Chạm Phát để xem và nghe nhạc.");
}).catch(()=>{});
$("k28Play").addEventListener("click",()=>playing?pause():start());
$("k28OverlayPlay").addEventListener("click",start);
$("k28Back").addEventListener("click",()=>{render(current-1);schedule()});
$("k28Forward").addEventListener("click",()=>{render(current+1);schedule()});
$("k28AudioToggle").addEventListener("click",async()=>{
 if(!track.paused){track.pause();muted=true;$("k28AudioToggle").textContent="♫ Bật nhạc";return}
 try{muted=false;await track.play();audioStarted=true;$("k28AudioToggle").textContent="♫ Tắt nhạc";note("Nhạc đang phát cùng thước phim.")}
 catch(e){note("Chưa có tệp nhạc được phép phát trên website. Bạn có thể chọn MP3 từ thiết bị.") }
});
$("k28File").addEventListener("change",async e=>{
 const file=e.target.files&&e.target.files[0];if(!file)return;
 if(!file.type.startsWith("audio/")){note("Chọn tệp âm thanh hợp lệ.");return}
 if(fileUrl)URL.revokeObjectURL(fileUrl);
 fileUrl=URL.createObjectURL(file);track.pause();track.src=fileUrl;track.load();muted=false;
 try{await track.play();audioStarted=true;$("k28AudioToggle").textContent="♫ Tắt nhạc";note("Đang phát "+file.name+" từ thiết bị; không tải lên máy chủ.");if(!playing)start()}
 catch(e){note("Đã chọn nhạc. Nhấn Bật nhạc để nghe.")}
});
$("k28Full").addEventListener("click",()=>{
 const el=$("k28Stage");
 if(document.fullscreenElement&&document.exitFullscreen)document.exitFullscreen();
 else if(el.requestFullscreen)el.requestFullscreen().catch(()=>note("Không hỗ trợ toàn màn hình trên thiết bị này."));
});
document.addEventListener("visibilitychange",()=>{
 if(document.hidden){stopClock();track.pause()}
 else if(playing){schedule();if(audioStarted&&!muted)track.play().catch(()=>{})}
});
const nav=document.querySelector(".masthead .nav");
if(nav&&!nav.querySelector('a[href="#k28Cinema"]')){const a=document.createElement("a");a.href="#k28Cinema";a.textContent="PHIM KỶ NIỆM";nav.append(a)}
bars();
})();
