import fs from "node:fs";
import vm from "node:vm";
import path from "node:path";

const read=p=>fs.readFileSync(path.join(process.cwd(),p),"utf8");
const has=p=>fs.existsSync(path.join(process.cwd(),p));
const errors=[];
const assert=(condition,message)=>{if(!condition)errors.push(message);};
const html=read("index.html");
const album=read("album-k28.js");
const cinema=read("cinema-k28.js");
const inline=[...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m=>m[1]);

for(const [name,code] of [["album-k28.js",album],["cinema-k28.js",cinema],...inline.map((s,i)=>["index inline "+i,s])]){
 try{new vm.Script(code,{filename:name});}catch(e){errors.push("Invalid JavaScript "+name+": "+e.message);}
}
for(const file of ["album-k28.css","cinema-k28.css","k28-experience.css","CNAME","data/roster-k28.csv"])
 assert(has(file),"Missing "+file);
for(const id of ["albumK28Groups","albumK28Message","albumK28Lightbox","albumK28Count","mapBadge","provinceFilter","locationMode","shareK28","exportNotes"])
 assert(html.includes('id="'+id+'"'),"Missing HTML ID "+id);
assert(album.includes('const host=$("albumK28Groups")'),"Carousel host selector not synced with HTML");
assert(html.includes('class="album-k28-name">Ảnh K28</strong>'),"Album name not unified");
for(const phrase of ["Ảnh phục dựng rõ nét","Ảnh gốc","Ảnh xử lý làm rõ","albumK28Disclaimer","albumK28Enhanced","albumK28Original"]) assert(!html.includes(phrase)&&!album.includes(phrase),"Obsolete album text or controls: "+phrase);
assert(album.includes('k28-carousel-stage')&&album.includes('k28-carousel-dot'),"Single-frame carousel elements missing");
assert(album.includes('function step(delta)')&&album.includes('touchend'),"Next/previous and swipe handling missing");
assert(!album.includes('$("albumK28Grid")'),"Old missing gallery selector");
assert(html.indexOf('id="anhxua"')<html.indexOf('id="bandokyuc"'),"Album should appear before map");
assert(html.includes("(!loc||locationName(p)===loc)"),"Map filter should use active location mode");
assert(html.includes('textContent=rows.filter(p=>p.current!=="Chưa xác định").length'),"Current residence count must count students");
assert(!html.includes("properties:{STT:+p.stt,MSSV:p.id"),"GeoJSON must not export identity fields");
const match=html.match(/<script type="text\/plain" id="roster">([\s\S]*?)<\/script>/);
assert(Boolean(match),"Missing embedded roster");
const rows=match?match[1].trim().split(/\r?\n/).map(l=>l.trim().split("|")):[];
assert(rows.length===33,"Expected 33 students, got "+rows.length);
assert(rows.every(r=>r.length===6),"Each student must have 6 columns");
assert(rows.every((r,i)=>+r[0]===i+1),"STT order broken");
assert(new Set(rows.map(r=>r[1])).size===rows.length,"Duplicate MSSV");
assert(rows.some(r=>r[0]==="29"&&r[1]==="0768219"),"STT 29 / MSSV 0768219 mismatch");
const known=rows.filter(r=>r[5]!=="Chưa xác định").length;
assert(known===24,"Current residence count 24 expected, got "+known);
const csv=read("data/roster-k28.csv").trim().split(/\r?\n/).slice(1).map(line=>[...line.matchAll(/"([^"]*)"/g)].map(m=>m[1]));
assert(csv.length===rows.length,"CSV and HTML student counts differ");
for(let i=0;i<Math.min(rows.length,csv.length);i++)
 assert(JSON.stringify(rows[i])===JSON.stringify(csv[i]),"CSV mismatch at row "+(i+1));
const missing=[];
for(const dir of ["images/ky-niem-k28","images/ky-niem-k28-goc"])
 for(let i=1;i<=10;i++){
  const p=dir+"/"+String(i).padStart(2,"0")+".webp";
  if(!has(p))missing.push(p);
 }
if(process.argv.includes("--strict")&&missing.length)errors.push("Archive assets missing: "+missing.length+"/20");
console.log("K28 · CORE:",errors.length?"FAIL":"PASS");
console.log("Roster:",rows.length,"| Known current residences:",known);
console.log("Archive photos:",20-missing.length,"/20");
console.log("Archive readiness:",missing.length?"BLOCKED (not FULL PASS)":"FILES PRESENT — editorial/visual checks still required");
for(const issue of errors)console.error("FAIL:",issue);
process.exitCode=errors.length?1:0;
