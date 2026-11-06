import fs from "node:fs";
import vm from "node:vm";
import path from "node:path";
const read=p=>fs.readFileSync(path.join(process.cwd(),p),"utf8");
const has=p=>fs.existsSync(path.join(process.cwd(),p));
const issues=[];
const ok=(value,message)=>{if(!value)issues.push(message)};
const html=read("index.html"),gallery=read("album-k28.js");
const scripts=[["gallery",gallery],["cinema",read("cinema-k28.js")],
 ...[...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map((m,i)=>["inline"+i,m[1]])];
for(const [name,script] of scripts)try{new vm.Script(script,{filename:name});}catch(e){issues.push(e.message)}
for(const p of ["album-k28.css","cinema-k28.css","k28-experience.css","CNAME","data/roster-k28.csv"])
 ok(has(p),"Missing "+p);
for(const id of ["albumK28Viewer","albumK28Image","albumK28Counter","albumK28Title",
"albumK28Status","albumK28Dots","albumK28Zoom","albumK28Lightbox","mapBadge",
"provinceFilter","locationMode","shareK28","exportNotes"])
 ok(html.includes('id="'+id+'"'),"Missing ID "+id);
ok(html.includes('>Ảnh K28 · Thanh xuân vẫn ở đây</h2>'),"Wrong gallery heading");
ok(gallery.includes("const TOTAL = 44"),"Carousel should have 44 images");
ok(gallery.includes('const archive = Array.from({length: TOTAL}'),"Album must use 44 JPG originals");
ok(!gallery.includes("ky-niem-k28"),"Old photo paths must not remain in JS");
ok(gallery.includes('image.classList.add("is-changing")')&&gallery.includes("probe.onerror"),"Carousel transition and errors must be handled");
for(const dir of ["images/ky-niem-k28","images/ky-niem-k28-goc"])
 ok(!has(dir),"Legacy album folder was not deleted: "+dir);

ok(gallery.includes("touchend")&&gallery.includes("ArrowRight"),"Carousel navigation incomplete");
ok(!html.includes("albumK28Enhanced")&&!html.includes("albumK28Original"),"Old AI controls remain");
ok(!html.includes("Ảnh phục dựng rõ nét")&&!html.includes("Ảnh xử lý làm rõ"),"Old AI labels remain");
ok(html.indexOf('id="anhxua"')<html.indexOf('id="bandokyuc"'),"Album should precede WebGIS");
ok(html.includes("(!loc||locationName(p)===loc)"),"Map location mode filter inconsistent");
ok(html.includes('textContent=rows.filter(p=>p.current!=="Chưa xác định").length'),"Residence count incorrect");
const m=html.match(/<script type="text\/plain" id="roster">([\s\S]*?)<\/script>/);
const rows=m?m[1].trim().split(/\r?\n/).map(s=>s.trim().split("|")):[];
ok(rows.length===33,"Roster must contain 33 students");
ok(rows.every((r,i)=>r.length===6 && +r[0]===i+1),"Invalid roster rows");
ok(rows.some(r=>r[0]==="29"&&r[1]==="0768219"),"Student STT 29 mismatch");
ok(rows.filter(r=>r[5]!=="Chưa xác định").length===24,"Expected 24 known residences");
const csv=read("data/roster-k28.csv").trim().split(/\r?\n/).slice(1)
 .map(s=>[...s.matchAll(/"([^"]*)"/g)].map(m=>m[1]));
ok(csv.length===rows.length&&csv.every((row,i)=>JSON.stringify(row)===JSON.stringify(rows[i])),"CSV and roster diverged");
const missing=[];
for(let i=1;i<=44;i++){
 const p="images/anh-k28/"+String(i).padStart(2,"0")+".jpg";
 if(!has(p))missing.push(p);
}
if(missing.length)issues.push("Missing "+missing.length+"/44 original K28 JPGs");
console.log("K28 CORE",issues.length?"FAIL":"PASS","| Alumni:",rows.length,"| Photos:",44-missing.length,"/44");
console.log("K28 image gate:",missing.length?"44-photo archive incomplete":"44-photo archive complete");
for(const issue of issues)console.error("✖",issue);
process.exitCode=issues.length?1:0;
