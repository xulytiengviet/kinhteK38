
(function(){
"use strict";
const play=document.getElementById("k28YoutubePlay");
const stop=document.getElementById("k28YoutubeStop");
const poster=document.getElementById("k28Poster");
const overlay=document.getElementById("k28YoutubeOverlay");
const holder=document.getElementById("k28IframeHolder");
const status=document.getElementById("k28Notice");
if(!play||!holder)return;
const url="https://www.youtube-nocookie.com/embed/Q6IrWD7cFUI?autoplay=1&playsinline=1&rel=0&enablejsapi=1";
function pause(){
 const iframe=holder.querySelector("iframe");
 if(iframe&&iframe.contentWindow){
  iframe.contentWindow.postMessage(JSON.stringify({event:"command",func:"pauseVideo",args:[]}),"https://www.youtube-nocookie.com");
 }
}
function begin(){
 if(holder.querySelector("iframe"))return;
 const iframe=document.createElement("iframe");
 iframe.title="YouTube · Video và nhạc kỷ niệm Kinh tế K28";
 iframe.allow="autoplay; encrypted-media; picture-in-picture; fullscreen; web-share";
 iframe.allowFullscreen=true;
 iframe.referrerPolicy="strict-origin-when-cross-origin";
 iframe.src=url;
 holder.appendChild(iframe);holder.hidden=false;poster.hidden=true;overlay.hidden=true;stop.hidden=false;
 status.textContent="Đang mở video YouTube. Nếu trình duyệt yêu cầu, chạm Play trực tiếp bên trong video để nghe nhạc. Nếu báo không thể phát nhúng, hãy chọn “Mở trên YouTube”.";
}
function reset(){
 holder.replaceChildren();holder.hidden=true;overlay.hidden=false;poster.hidden=false;stop.hidden=true;
 status.textContent="Đã dừng video. Chạm “Xem YouTube & bật nhạc” để phát lại.";
}
play.addEventListener("click",begin);
stop.addEventListener("click",reset);
document.addEventListener("visibilitychange",()=>{if(document.hidden)pause()});
document.querySelectorAll('a[href="#anhxua"],a[href="#bandokyuc"],a[href="#luubut"]').forEach(a=>a.addEventListener("click",pause));
})();
