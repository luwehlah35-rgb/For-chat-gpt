import { useEffect } from "react";
import * as THREE from "three";
const CSS = `:root{--bg:#11152B;--fg:#fff;--mut:rgba(255,255,255,.7);--card:rgba(255,255,255,.07);--acc:#FFD166;--red:#FF5A4E;box-sizing:border-box;padding-top:env(safe-area-inset-top,0px);padding-bottom:env(safe-area-inset-bottom,0px)}
@media(prefers-color-scheme:dark){:root:not([data-theme="light"]){--bg:#11152B;--fg:#fff}}
:root[data-theme="dark"]{--bg:#11152B;--fg:#fff}
html{scroll-padding-top:env(safe-area-inset-top,0px);height:100%}
body{margin:0;height:100%;background:var(--bg);color:var(--fg);font-family:system-ui,-apple-system,'Segoe UI',Roboto,sans-serif;overflow:hidden;overscroll-behavior:none;touch-action:manipulation}
#box{position:fixed;inset:0}canvas{position:absolute;inset:0;width:100%;height:100%;display:block;touch-action:none}
#lobby{position:fixed;inset:0;display:flex;flex-direction:column;z-index:9;pointer-events:none;box-sizing:border-box;padding:calc(10px + env(safe-area-inset-top,0px)) 12px calc(10px + env(safe-area-inset-bottom,0px))}
#lobby>*{pointer-events:auto}
#top{display:flex;gap:10px;align-items:center}
#brand{font-weight:800;font-size:20px;white-space:nowrap;text-shadow:0 2px 6px #000}
#nm{flex:1;min-width:0;padding:9px 12px;border-radius:12px;border:0;background:rgba(0,0,0,.4);color:#fff;font-size:15px}
#res{font-size:14px;color:var(--acc);min-height:1.2em;margin-top:6px;text-shadow:0 1px 4px #000}
#sheet{margin-top:auto;display:flex;flex-direction:column;max-height:54%;background:linear-gradient(rgba(17,21,43,.9),rgba(11,14,32,.97));border-radius:18px;border:1px solid rgba(255,255,255,.12);overflow:hidden}
#tabs{display:flex;position:relative;overflow-x:auto;scrollbar-width:none;border-bottom:1px solid rgba(255,255,255,.1)}#tabs::-webkit-scrollbar{display:none}
#tabs button{flex:1 0 auto;min-width:58px;white-space:nowrap;background:none;border:0;border-bottom:3px solid transparent;color:var(--mut);padding:8px 6px 6px;font-size:11px}
#tabs button.on{color:#fff;border-color:var(--acc)}
.ti{display:block;font-size:20px}
#pane{overflow:auto;padding:10px;touch-action:auto;overscroll-behavior:contain;-webkit-overflow-scrolling:touch;flex:1;min-height:90px}
#pane.g2{display:grid;grid-template-columns:1fr 1fr;gap:8px}
#pane p{margin:8px 0 6px;font-size:13px;color:var(--mut)}
.cd{display:flex;gap:8px;align-items:center;text-align:left;width:100%;margin:0 0 8px;padding:8px;border-radius:12px;border:2px solid transparent;background:var(--card);color:#fff}
.g2 .cd{margin:0}
.cd.on,.chips button.on{border-color:var(--acc)}
.sw{flex:none;width:38px;height:38px;border-radius:10px;background:rgba(255,255,255,.12);font-style:normal;font-size:22px;line-height:38px;text-align:center}
.tx{display:flex;flex-direction:column;min-width:0}.tx b{font-size:13px}.tx small{margin:2px 0 0;font-size:10px;color:var(--mut)}
.chips{display:flex;flex-wrap:wrap;gap:8px;margin-bottom:6px}.chips button{flex:1;min-width:46px;padding:9px 2px;border-radius:12px;border:2px solid transparent;background:var(--card);color:#fff;font-size:13px;font-weight:600}
.rk{padding:6px 4px;font-size:14px;border-bottom:1px solid rgba(255,255,255,.08)}
#bar{display:flex;gap:10px;align-items:center;padding:10px;border-top:1px solid rgba(255,255,255,.1)}
#mdl{flex:1;margin:0}
#go{flex:1.2;background:var(--red);color:#fff;border:0;border-radius:14px;padding:14px 0;font-size:18px;font-weight:800}
#zc{display:none;position:fixed;left:14px;bottom:calc(18px + env(safe-area-inset-bottom,0px));flex-direction:column;gap:8px;z-index:5;align-items:flex-start}
#zc button{width:46px;height:46px;border-radius:50%;border:2px solid rgba(255,255,255,.4);background:rgba(255,255,255,.14);color:#fff;font-size:20px;touch-action:none}
#zfree{display:none;gap:6px;flex-wrap:wrap;width:104px}#zc.free #zfree{display:flex}
#zfree button{width:48px;height:36px;border-radius:12px;font-size:15px}
.rot #zc{bottom:18px}
.zs{width:100%;margin:6px 0}
#pset{text-align:left}#pset p{margin:8px 0 4px}#pset .chips button{padding:8px 2px;font-size:12px}
.pbox{max-height:88%;overflow:auto;touch-action:auto}
#coin{flex:none;font-weight:700;font-size:14px;background:rgba(0,0,0,.4);padding:8px 10px;border-radius:12px;color:var(--acc)}
.hd{grid-column:1/-1}.rcrow{display:flex;gap:8px;margin-bottom:6px}.rcrow .rc{flex:1;width:auto;margin:0}
.rcb{padding:0 14px;border-radius:12px;border:0;background:var(--red);color:#fff;font-weight:700}
#bPau{display:none;position:fixed;top:calc(40px + env(safe-area-inset-top,0px));left:50%;transform:translateX(-50%);width:40px;height:40px;border-radius:50%;border:2px solid rgba(255,255,255,.4);background:rgba(255,255,255,.14);color:#fff;font-size:16px;z-index:6}
.rot #bPau{top:40px}
#pause{position:fixed;inset:0;display:none;align-items:center;justify-content:center;background:rgba(8,10,25,.7);z-index:20}
.pbox{background:#1a2040;border-radius:18px;padding:18px;width:min(280px,80%);text-align:center;border:1px solid rgba(255,255,255,.15)}
.pbox h2{margin:0 0 6px}.pbox p{margin:0 0 12px;font-size:13px;color:var(--mut)}
.pbox>button{display:block;width:100%;margin-top:8px;padding:12px 0;border-radius:12px;border:0;background:var(--card);color:#fff;font-size:15px;font-weight:700}
#pRes{background:var(--red)!important}
.rc{width:100%;box-sizing:border-box;padding:10px;margin-bottom:8px;border-radius:12px;border:0;background:rgba(0,0,0,.4);color:#fff;font-size:15px;text-transform:uppercase}
#rotb{flex:none;padding:9px 10px;border-radius:12px;border:0;background:rgba(0,0,0,.4);color:#fff;font-size:13px}
.land #lobby{padding-left:max(12px,env(safe-area-inset-left,0px));padding-right:max(12px,env(safe-area-inset-right,0px))}
.land #brand{display:none}
.land #top{width:46%}
.land #sheet{position:absolute;right:max(12px,env(safe-area-inset-right,0px));top:calc(10px + env(safe-area-inset-top,0px));bottom:calc(10px + env(safe-area-inset-bottom,0px));width:48%;max-height:none;margin:0}
.land #ctl{flex-direction:row}
.rot #lobby{padding:10px 12px}
.rot.land #sheet{right:12px;top:10px;bottom:10px}
.rot #ctl{bottom:18px}
#ctl{position:fixed;right:14px;bottom:calc(18px + env(safe-area-inset-bottom,0px));display:none;flex-direction:column;gap:12px;z-index:5}
#ctl button{width:70px;height:70px;border-radius:50%;border:2px solid rgba(255,255,255,.4);background:rgba(255,255,255,.14);color:#fff;font-size:26px;touch-action:none}
.rc.lc{text-transform:none}.rcrow .rcb{flex:1;padding:12px 0;font-size:14px}.rcb.alt{background:rgba(255,255,255,.16)}
#pane p.ok{color:#8AC926}#pane p.pw{font-size:11px;margin-top:12px}
#pr{position:fixed;visibility:hidden;padding-top:env(safe-area-inset-top,0px)}
`;

// Logika game Cacing Rakus: sistem berat, ramuan, skill, akun lokal, leaderboard (lobi + langsung saat main), skin beranimasi halus, latar belakang, makanan beragam, render chunk ala Minecraft.
export function startGame() {
// Klien Supabase dipasang oleh main.jsx (window.__sb). Di pratinjau Claude nilainya kosong, jadi online nonaktif.
const sb = globalThis.__sb || null;
let raf = 0, dead = false;
const offs = [];
const on = (t, n, f) => { t.addEventListener(n, f); offs.push(() => t.removeEventListener(n, f)); };
const W=10000,H=10000,FOOD_N=16000,BOTS=34,POT_N=160,BASE=150,BOOST=270,JOY=55,TAU=Math.PI*2,M0=20,MMAX=Infinity;
const MAG_R=200,MAG_S=80,VOR_R=230,VOR_S=110;
const segsFor=m=>12+Math.floor(Math.pow(Math.max(0,m-M0),.8)*.9);
const radFor=m=>7+Math.min(30,Math.sqrt(Math.max(0,m-M0))*.85);
const FOODS=["#FF5A4E","#FF9F1C","#2EC4B6","#7B6CFF","#FF6FB5","#4CC9F0","#8AC926"];
const NAMES=["Budi","Sari","Kenji","Hans","Luca","Anya","Pierre","Mei","Rudi","Tariq","Bayu","Ines","Dewi","Joko","Lars","Nina","Yuki","Wira","Zara","Eko"];
const $=id=>document.getElementById(id),clamp=(v,a,b)=>Math.max(a,Math.min(b,v)),rand=(a,b)=>a+Math.random()*(b-a),norm=a=>((a%TAU)+TAU)%TAU,pick=a=>a[Math.floor(Math.random()*a.length)];
/* SKIN */
const stripes=(d,c)=>{const n=c.length;return`linear-gradient(${d=="h"?"to bottom":"to right"},${c.map((x,i)=>`${x} ${(i/n*100).toFixed(1)}% ${((i+1)/n*100).toFixed(1)}%`).join()})`};
const flag=(n,d,c)=>({n,c,css:stripes(d,c)});
const SKINS=[flag("Indonesia","h",["#E70011","#FFFFFF"]),flag("Polandia","h",["#FFFFFF","#DC143C"]),{n:"Jepang",c:["#BC002D","#FFFFFF"],css:"radial-gradient(circle,#BC002D 0 28%,#FFFFFF 30%)"},flag("Jerman","h",["#2B2B2B","#DD0000","#FFCE00"]),flag("Prancis","v",["#0055A4","#FFFFFF","#EF4135"]),flag("Italia","v",["#009246","#FFFFFF","#CE2B37"]),flag("Belanda","h",["#AE1C28","#FFFFFF","#21468B"]),flag("Rusia","h",["#FFFFFF","#0039A6","#D52B1E"]),flag("Spanyol","h",["#AA151B","#F1BF00","#F1BF00","#AA151B"]),flag("Irlandia","v",["#169B62","#FFFFFF","#FF883E"]),flag("Ukraina","h",["#0057B7","#FFD700"])];
const ch=(n,i,c,rig)=>SKINS.push({n,i,c,rig,css:`linear-gradient(135deg,${c.join()})`});
ch("Pelangi","🌈",["#FF5A4E","#FF9F1C","#FFD166","#8AC926","#4CC9F0","#7B6CFF","#FF6FB5","#FF5A4E"],{cyc:1});
ch("Naga Timur","🐲",["#FFE08A","#2EC4B6","#0A9396","#064E5A"],{tp:.5,sp:2,spc:"#FFD166",hn:"#FFD166",eye:"#FFD166",sc:1,sn:1,wh:1});
ch("Naga Api","🐉",["#FFB703","#E63946","#9D0208","#370617"],{tp:.45,sp:2,spc:"#FFB703",hn:"#FFE08A",wg:"#9D0208",eye:"#FFEA00",sc:1,sn:1});
ch("Kitsune","🦊",["#FFF1E0","#FF9F55","#E56B1F"],{tp:.3,ea:"#FF9F55",tl:5,tc:"#FFF1E0",eye:"#7BDFF2"});
ch("Ninja","🥷",["#1B1F3B","#2B3158"],{tp:.2,bd:"#E63946",eye:"#E63946"});
ch("Neko","🐱",["#FFFFFF","#FFD6E8"],{tp:.1,ea:"#FFD6E8",tl:1,tc:"#FFFFFF",eye:"#4CC9F0"});
ch("Oni","👹",["#E63946","#8D0801"],{tp:.15,sp:4,spc:"#FFE08A",hn:"#FFE08A",eye:"#FFD60A"});
// ---- skin tambahan (urutan skin lama jangan diubah supaya pilihan tersimpan tetap benar) ----
const fl2=(n,d,c)=>SKINS.push(flag(n,d,c));
fl2("Meksiko","v",["#006847","#FFFFFF","#CE1126"]);fl2("India","h",["#FF9933","#FFFFFF","#138808"]);fl2("Austria","h",["#ED2939","#FFFFFF","#ED2939"]);fl2("Hungaria","h",["#CE2939","#FFFFFF","#477050"]);fl2("Bulgaria","h",["#FFFFFF","#00966E","#D62612"]);fl2("Belgia","v",["#000000","#FAE042","#ED2939"]);fl2("Rumania","v",["#002B7F","#FCD116","#CE1126"]);fl2("Thailand","h",["#A51931","#F4F5F8","#2D2A4A","#2D2A4A","#F4F5F8","#A51931"]);fl2("Estonia","h",["#0072CE","#000000","#FFFFFF"]);fl2("Lituania","h",["#FDB913","#006A44","#C1272D"]);fl2("Kolombia","h",["#FCD116","#FCD116","#003893","#CE1126"]);fl2("Peru","v",["#D91023","#FFFFFF","#D91023"]);
const stp=(n,c)=>SKINS.push({n,c,css:`repeating-linear-gradient(135deg,${c.map((x,i)=>`${x} ${i*9}px ${(i+1)*9}px`).join(",")})`});
stp("Neon",["#00F5D4","#9B5DE5"]);stp("Macan",["#FF9F1C","#1B1B1B"]);stp("Zebra",["#FFFFFF","#1B1B1B"]);stp("Permen",["#FF6FB5","#FFFFFF"]);stp("Zombi",["#8AC926","#4F6D1B","#C7D59F"]);stp("Lebah",["#FFD166","#222222"]);stp("Matcha",["#7CB342","#C5E1A5"]);stp("Senja",["#FF7043","#5E35B1"]);
ch("Api","🔥",["#FFF3B0","#FF9F1C","#E63946","#6A040F"],{tp:.25});ch("Es","🧊",["#F1FBFF","#8FD3FF","#3A86FF","#1D3B8B"],{tp:.25});ch("Emas","🥇",["#FFF6C2","#FFD166","#C99700","#7A5A00"],{tp:.25});ch("Galaksi","🌌",["#4CC9F0","#7B2CBF","#3A0CA3","#10002B"],{tp:.25});ch("Samudra","🌊",["#7CF5E3","#2EC4B6","#0077B6","#012A4A"],{tp:.25});ch("Sakura","🌸",["#FFF0F5","#FFB7C5","#FF69B4"],{tp:.25});ch("Lava","🌋",["#FFEB3B","#FF5722","#B71C1C","#212121"],{tp:.3});ch("Aurora","🌠",["#A8FFEB","#4DD0E1","#7C4DFF","#E040FB"],{tp:.25});
ch("Naga Es","❄️",["#F1FBFF","#8FD3FF","#3A86FF","#1D3B8B"],{tp:.5,sp:2,spc:"#E0F7FF",hn:"#E0F7FF",eye:"#7DF9FF",sc:1,sn:1,wh:1});
ch("Naga Petir","⚡",["#FFF59D","#FFD600","#7B1FA2","#311B92"],{tp:.5,sp:2,spc:"#FFF176",hn:"#FFF176",wg:"#7B1FA2",eye:"#FFFF00",sc:1,sn:1});
ch("Naga Emas","👑",["#FFF6C2","#FFD166","#C99700","#7A5A00"],{tp:.5,sp:2,spc:"#FFF6C2",hn:"#FFF6C2",wg:"#C99700",eye:"#FF3D00",sc:1,sn:1,wh:1});
ch("Phoenix","🦅",["#FFEB3B","#FF9800","#F4511E","#B71C1C"],{tp:.35,wg:"#FF6D00",tl:3,tc:"#FFC107",hn:"#FFD54F",eye:"#FFFFFF"});
ch("Penyihir","🧙",["#E1BEE7","#BA68C8","#6A1B9A"],{tp:.25,hat:"#4A148C",eye:"#C77DFF"});
ch("Samurai","⚔️",["#B71C1C","#212121"],{tp:.2,hn:"#FFD54F",bd:"#FAFAFA",eye:"#FFFFFF"});
ch("Panda","🐼",["#FFFFFF","#263238","#FFFFFF","#263238"],{tp:.1,ea:"#263238",eye:"#4E342E"});
ch("Vampir","🧛",["#B71C1C","#212121","#4A0000"],{tp:.3,wg:"#212121",ea:"#B71C1C",eye:"#FF1744"});
ch("Unicorn","🦄",["#FFB3D9","#FFD6A5","#FDFFB6","#CAFFBF","#9BF6FF","#BDB2FF","#FFB3D9"],{cyc:1,uh:"#FFD700",ea:"#FFB3D9",tl:1,tc:"#BDB2FF",eye:"#7B1FA2"});
ch("Hantu","👻",["#FFFFFF","#C5CAE9","#7986CB"],{tp:.6,tl:2,tc:"#E8EAF6",eye:"#000000"});
// tier: 0 gratis, 1 beli dengan koin, 2 eksklusif (hanya lewat kode)
const PRICE={"Api":[1,300],"Es":[1,300],"Emas":[1,400],"Galaksi":[1,500],"Samudra":[1,300],"Sakura":[1,300],"Lava":[1,400],"Aurora":[1,600],"Naga Es":[1,700],"Naga Petir":[1,900],"Phoenix":[1,1200],"Penyihir":[1,600],"Panda":[1,400],"Vampir":[1,800],"Samurai":[2,0],"Naga Emas":[2,0],"Unicorn":[2,0],"Hantu":[2,0]};
SKINS.forEach(s=>{const p=PRICE[s.n];s.tier=p?p[0]:0;s.price=p?p[1]:0});
SKINS.forEach(s=>{s.col=s.c.map(x=>new THREE.Color(x));if(s.rig){const L=s.col.length;s.pal=Array.from({length:48},(_,k)=>{const u=k/47*(L-1),i=Math.min(L-2,Math.floor(u));return s.col[i].clone().lerp(s.col[i+1],u-i)})}});
const RIG={"Naga Timur":{hd:"naga",lg:1,wh:1},"Naga Api":{hd:"naga",lg:1},"Naga Es":{hd:"naga",lg:1,wh:1},"Naga Petir":{hd:"naga",lg:1},"Naga Emas":{hd:"naga",lg:1,wh:1},
 "Kitsune":{hd:"rubah"},"Ninja":{hd:"bulat"},"Neko":{hd:"kucing"},"Oni":{hd:"iblis"},"Phoenix":{hd:"burung"},"Penyihir":{hd:"bulat"},"Samurai":{hd:"bulat"},"Panda":{hd:"panda"},"Vampir":{hd:"iblis"},"Unicorn":{hd:"kuda"},"Hantu":{hd:"bulat"}};
SKINS.forEach(s=>{if(s.rig&&RIG[s.n])Object.assign(s.rig,RIG[s.n]);const rg=s.rig,h=rg?s.pal[2]:s.col[0],W=new THREE.Color("#ffffff"),cc=x=>new THREE.Color(x);
 s.kc={h,b:h.clone().lerp(W,.5),a:cc(rg&&(rg.spc||rg.hn||rg.tc||rg.hat||rg.ea||rg.wg)||"#FFD166"),e:cc(rg&&rg.eye||"#FFD54F"),w:W,k:cc("#111111"),p:cc("#FF8FB8"),t:cc("#E53935"),c:cc("#FFF1E0")}});
const dotOf=s=>s.c.find(x=>x!="#FFFFFF")||s.c[0];
const PAL=[...new Set([...FOODS,...SKINS.map(dotOf)])];
/* SKILL & RAMUAN */
const SK=[{id:"dash",n:"Terjang",i:"💨",cd:12,d:"Melesat 0,45 dtk"},{id:"shield",n:"Perisai",i:"🛡️",cd:24,d:"Kebal tabrakan 2 dtk"},{id:"vortex",n:"Pusaran",i:"🌀",cd:22,d:"Sedot makanan dekat 2,5 dtk"},{id:"blink",n:"Kedip",i:"✨",cd:16,d:"Pindah 380 unit ke depan"}];
const POT=[{k:"speed",n:"Kilat",i:"⚡",c:"#FFD166",d:6,w:3},{k:"magnet",n:"Magnet",i:"🧲",c:"#EF476F",d:6,w:2},{k:"shield",n:"Perisai",i:"🛡️",c:"#4CC9F0",d:5,w:3},{k:"poison",n:"Racun",i:"☠️",c:"#9B5DE5",d:4,w:1.5}];
const potType=()=>{let x=Math.random()*9.5;for(let i=0;i<4;i++){x-=POT[i].w;if(x<=0)return i}return 0};
const FORMS=[{n:"Klasik",i:"🪱",d:"Seimbang, cocok untuk pemula.",p:"Tanpa kelebihan khusus",m:{}},
{n:"Naga",i:"🐉",d:"Bersisik, bertanduk, ekor meruncing.",p:"Boost 12% lebih kencang",tp:.45,sp:2,sc:1,hd:"naga",lg:1,m:{bst:1.12}},
{n:"Ulat Bulu",i:"🐛",d:"Gemuk dan berdenyut.",p:"Jangkauan makan +25%",th:1.12,pulse:1,hd:"ulat",m:{eat:1.25}},
{n:"Kaki Seribu",i:"🐜",d:"Ramping dan lincah.",p:"Belok 30% lebih tajam",th:.82,hd:"ulat",leg:1,m:{turn:1.3}},
{n:"Robo",i:"🤖",d:"Tubuh kotak-kotak.",p:"Boost hemat 40% berat",seg:"box",hd:"robot",m:{bcost:.6}},
{n:"Kristal",i:"💎",d:"Permata berputar berkilau.",p:"Durasi ramuan +30%",seg:"gem",tp:.25,m:{pot:1.3}}];
const QUAL=[{n:"Hemat",dpr:1,view:.7},{n:"Normal",dpr:1.5,view:1},{n:"Tinggi",dpr:2.5,view:1.25}];
const CAMS=[{n:"Ikuti",p:.75},{n:"Samping",p:.35},{n:"Atas",p:1.5},{n:"Bebas",p:.9}];
// kehalusan skin: rs = sisi penampang badan, sp = jumlah haluskan jalur badan, sg = detail bola, cn = sisi kerucut
const SMS=[{n:"Standar",rs:10,sp:1,sg:[14,10],cn:6},{n:"Halus",rs:16,sp:2,sg:[22,16],cn:10},{n:"Ultra",rs:24,sp:3,sg:[30,22],cn:14}];
// jarak render dalam chunk (1 chunk = satu sel grid = 250 unit). 0 = otomatis mengikuti zoom & kualitas
const RDS=[0,2,4,6,8,12,16],RDN=RDS.map(n=>n?String(n):"Auto");
// latar belakang: bg = langit/kabut, gr = lantai, g1/g2 = garis grid, wl = dinding & garis chunk
const THEMES=[
{n:"Malam",i:"🌙",d:"Biru gelap klasik",bg:"#11152B",gr:"#1C2340",g1:"#2E3862",g2:"#252E52",wl:"#FF5A4E"},
{n:"Padang",i:"🌿",d:"Rumput hijau, langit cerah",bg:"#9AD7F5",gr:"#2E7D32",g1:"#1B5E20",g2:"#2A7A2F",wl:"#E76F51"},
{n:"Gurun",i:"🏜️",d:"Pasir hangat",bg:"#F6DDB0",gr:"#A87F4B",g1:"#8C6334",g2:"#9C7240",wl:"#7B2D26"},
{n:"Salju",i:"❄️",d:"Dataran es",bg:"#D6E8F8",gr:"#A9C2D8",g1:"#7FA3C4",g2:"#9DBAD6",wl:"#2F6FEB"},
{n:"Lava",i:"🌋",d:"Tanah vulkanik",bg:"#1A0505",gr:"#2B0E0A",g1:"#FF5A1F",g2:"#7A1F0F",wl:"#FFD166"},
{n:"Laut",i:"🌊",d:"Dasar laut biru",bg:"#062B42",gr:"#0A4560",g1:"#2BA3C7",g2:"#16789C",wl:"#FFD166"},
{n:"Angkasa",i:"🌌",d:"Bintang bertaburan",bg:"#04020C",gr:"#0E0822",g1:"#4B35A0",g2:"#2B1B66",wl:"#7B6CFF",stars:1},
{n:"Neon",i:"🟣",d:"Kota cyber",bg:"#07000F",gr:"#0C0016",g1:"#FF2BD6",g2:"#5A0A8A",wl:"#00F5D4"}];
const ix=(v,n,d)=>Number.isInteger(v)&&v>=0&&v<n?v:d;
/* PROFIL + LEADERBOARD */
const LS="cacing-rakus-v3",ACC="cacing-akun-v1";
const defProf=()=>({name:"",skin:0,skill:0,mode:"inf",form:0,cam:0,zm:1,qual:1,rot:0,coins:0,own:[],used:[],lb:{inf:[],timed:[],mp:[]},bg:0,rd:0,sm:1,cl:0});
function parseProf(o){const p=defProf();if(!o||typeof o!="object")return p;
 p.name=String(o.name||"").slice(0,12);p.skin=ix(o.skin,SKINS.length,0);p.skill=ix(o.skill,SK.length,0);p.mode=o.mode=="timed"?"timed":"inf";p.form=ix(o.form,FORMS.length,0);p.cam=ix(o.cam,4,0);p.zm=clamp(+o.zm||1,.35,3.2);p.qual=ix(o.qual,3,1);p.rot=ix(o.rot,3,0);p.coins=Math.max(0,Math.floor(+o.coins||0));
 p.own=Array.isArray(o.own)?o.own.filter(x=>typeof x=="string").slice(0,300):[];p.used=Array.isArray(o.used)?o.used.map(String).slice(0,200):[];
 p.bg=ix(o.bg,THEMES.length,0);p.rd=ix(o.rd,RDS.length,0);p.sm=ix(o.sm,SMS.length,1);p.cl=o.cl?1:0;
 ["inf","timed","mp"].forEach(m=>{p.lb[m]=(o.lb&&Array.isArray(o.lb[m])?o.lb[m]:[]).slice(0,10).map(e=>({n:String(e.n||"Kamu").slice(0,12),s:Math.floor(+e.s||0),k:ix(e.k,SKINS.length,0),t:+e.t||0})).filter(e=>e.s>0)});
 return p}
// akun lokal: tiap akun punya profil sendiri. Tamu memakai kunci lama supaya progres lama tidak hilang.
let accs={users:{},cur:""};
try{const a=JSON.parse(localStorage.getItem(ACC)||"null");if(a&&a.users&&typeof a.users=="object"){for(const u in a.users){const v=a.users[u];if(/^[a-z0-9_.]{3,12}$/.test(u)&&v&&typeof v.hash=="string"&&typeof v.salt=="string")accs.users[u]={name:String(v.name||u).slice(0,12),salt:v.salt,hash:v.hash,t:+v.t||0}}if(typeof a.cur=="string"&&accs.users[a.cur])accs.cur=a.cur}}catch(e){}
const saveAcc=()=>{try{localStorage.setItem(ACC,JSON.stringify(accs))}catch(e){}};
const keyOf=u=>u?LS+":"+u:LS;
const loadProf=u=>{try{return parseProf(JSON.parse(localStorage.getItem(keyOf(u))||"null"))}catch(e){return defProf()}};
let prof=loadProf(accs.cur);
const save=()=>{try{localStorage.setItem(keyOf(accs.cur),JSON.stringify(prof))}catch(e){}};
const owned=k=>!k.tier||prof.own.includes(k.n);if(!owned(SKINS[prof.skin]))prof.skin=0;
let pvSkin=null,skinArm=-1,skinMsg="",redeemTxt="";
const h53=(str,seed)=>{let h1=0xdeadbeef^seed,h2=0x41c6ce57^seed;for(let i=0,ch;i<str.length;i++){ch=str.charCodeAt(i);h1=Math.imul(h1^ch,2654435761);h2=Math.imul(h2^ch,1597334677)}h1=Math.imul(h1^(h1>>>16),2246822507)^Math.imul(h2^(h2>>>13),3266489909);h2=Math.imul(h2^(h2>>>16),2246822507)^Math.imul(h1^(h1>>>13),3266489909);return 4294967296*(2097151&h2)+(h1>>>0)};
const CODES={"4965401879463049":{c:500},"7824070492991138":{s:["Naga Emas"]},"5438190907084492":{s:["Unicorn"]},"2129704083466762":{s:["Hantu"]},"8744204510153245":{c:300,s:["Samurai","Vampir"]},"4036332583741991":{s:["Naga Petir"]}};
const earn=score=>{const c=Math.max(1,Math.floor(score/3));prof.coins+=c;save();return c};
function redeem(raw){const code=String(raw||"").toUpperCase().replace(/[^A-Z0-9]/g,"");if(!code){skinMsg="Masukkan kode dulu.";render();return}
 const h=String(h53(code,7)),r=CODES[h];
 if(!r)skinMsg="❌ Kode tidak valid.";else if(prof.used.includes(h))skinMsg="⚠️ Kode ini sudah kamu pakai.";
 else{prof.used.push(h);const got=[];if(r.c){prof.coins+=r.c;got.push("+"+r.c+" 🪙")}for(const n of r.s||[])if(!prof.own.includes(n)){prof.own.push(n);got.push("skin "+n)}save();skinMsg="🎉 Berhasil! "+(got.join(", ")||"sudah dimiliki");redeemTxt=""}
 render()}
function pickSkin(i){const k=SKINS[i];
 if(owned(k)){prof.skin=i;pvSkin=null;skinArm=-1;skinMsg="";save();setPreview();render();return}
 pvSkin=i;setPreview();
 if(k.tier==2)skinMsg="🔒 "+k.n+" adalah skin eksklusif. Dapatkan lewat kode hadiah.";
 else if(skinArm==i){if(prof.coins>=k.price){prof.coins-=k.price;prof.own.push(k.n);prof.skin=i;pvSkin=null;skinArm=-1;save();skinMsg="✅ Dibeli: "+k.n}else skinMsg="Koin kurang. Butuh "+k.price+" 🪙, kamu punya "+prof.coins+"."}
 else{skinArm=i;skinMsg=k.n+" seharga "+k.price+" 🪙. Ketuk lagi untuk membeli."}
 render()}
function addScore(mode,n,s,k){if(s<=0)return 0;const e={n,s,k,t:Date.now()},a=[...prof.lb[mode],e].sort((x,y)=>y.s-x.s||y.t-x.t);prof.lb[mode]=a.slice(0,10);save();return prof.lb[mode].indexOf(e)+1}
/* DUNIA */
// jenis makanan: 0 permen, 1 lolipop, 2 donat, 3 burger, 4 es krim, 5 kuki, 6 pizza, 7 apel, 8 pisang, 9 sushi, 10 cupcake, 11 boba, 12 apel emas (langka)
const FK=[{n:"Permen",i:"🍬",v:2,r:7,w:.2},{n:"Lolipop",i:"🍭",v:2,r:7,w:.14},{n:"Donat",i:"🍩",v:4,r:9,w:.1},{n:"Burger",i:"🍔",v:7,r:12,w:.07},{n:"Es krim",i:"🍦",v:4,r:9,w:.09},{n:"Kuki",i:"🍪",v:3,r:8,w:.12},{n:"Pizza",i:"🍕",v:6,r:11,w:.06},{n:"Apel",i:"🍎",v:3,r:8,w:.08},{n:"Pisang",i:"🍌",v:3,r:9,w:.06},{n:"Sushi",i:"🍣",v:5,r:10,w:.05},{n:"Cupcake",i:"🧁",v:5,r:10,w:.05},{n:"Boba",i:"🧋",v:6,r:11,w:.04},{n:"Apel Emas",i:"🌟",v:20,r:12,w:.015}];
const FKT=FK.reduce((s,f)=>s+f.w,0);
const CELL=250,GX=Math.ceil(W/CELL),GY=Math.ceil(H/CELL),MAXF=FOOD_N+2500;
const cellOf=(x,y)=>clamp((x/CELL)|0,0,GX-1)+clamp((y/CELL)|0,0,GY-1)*GX;
const makeGrid=()=>({cells:Array.from({length:GX*GY},()=>[]),n:0});
function addFood(g,f){f.ci=cellOf(f.x,f.y);const c=g.cells[f.ci];f.i=c.length;c.push(f);g.n++}
function delFood(g,f){const c=g.cells[f.ci],last=c.pop();if(last!==f){c[f.i]=last;last.i=f.i}g.n--}
function moveFood(g,f,x,y){f.x=x;f.y=y;const ci=cellOf(x,y);if(ci!==f.ci){delFood(g,f);addFood(g,f)}}
function eachNear(g,x,y,r,fn){const x0=clamp(((x-r)/CELL)|0,0,GX-1),x1=clamp(((x+r)/CELL)|0,0,GX-1),y0=clamp(((y-r)/CELL)|0,0,GY-1),y1=clamp(((y+r)/CELL)|0,0,GY-1);for(let cy=y0;cy<=y1;cy++)for(let cx=x0;cx<=x1;cx++){const c=g.cells[cx+cy*GX];for(let i=c.length-1;i>=0;i--)fn(c[i])}}
const dropFood=f=>{if(st.grid.n<MAXF)addFood(st.grid,f)};
function newFood(){let x=Math.random()*FKT,k=0;for(;k<FK.length-1;k++){x-=FK[k].w;if(x<=0)break}const f=FK[k];return{x:rand(30,W-30),y:rand(30,H-30),v:f.v,c:pick(FOODS),r:f.r,k}}
const newPot=()=>({x:rand(150,W-150),y:rand(150,H-150),t:potType()});
function mkWorm(x,y,sk,name,bot,mass,fi=0){const a=rand(0,TAU),n=segsFor(mass),segs=[];for(let i=0;i<n;i++)segs.push({x:x-Math.cos(a)*i*9,y:y-Math.sin(a)*i*9});return{segs,angle:a,target:a,sk,fi,fm:FORMS[fi],name,bot,boost:false,mass,acc:0,think:0,r:radFor(mass),fx:{speed:0,magnet:0,shield:0,poison:0},cd:0,dash:0,vort:0,inv:2}}
function spawnBot(away){let x,y;for(let t=0;t<12;t++){x=rand(300,W-300);y=rand(300,H-300);if(!away||Math.hypot(x-away.x,y-away.y)>700)break}return mkWorm(x,y,pick(SKINS),pick(NAMES),true,M0+rand(0,90),Math.floor(Math.random()*FORMS.length))}
function createWorld(sk,name,fi,nb=BOTS){const me=mkWorm(W/2,H/2,sk,name,false,M0,fi),worms=[me];for(let i=0;i<nb;i++)worms.push(spawnBot(me.segs[0]));return{worms,grid:(()=>{const g=makeGrid();for(let i=0;i<FOOD_N;i++)addFood(g,newFood());return g})(),pots:Array.from({length:POT_N},newPot)}}
const st={az:-Math.PI/2,cp:.75,faz:-Math.PI/2,fpt:.9,playing:false,mode:"inf",timeLeft:300,peak:0,best:0,joy:null,toasts:[],zoom:1,size:{w:360,h:640,dpr:2,sat:0}};
Object.assign(st,createWorld(SKINS[prof.skin],prof.name||"Kamu",prof.form));setPreview();
function setPreview(){const o=mkWorm(W/2,H/2,SKINS[pvSkin!=null?pvSkin:prof.skin],prof.name||"Kamu",false,90,prof.form),g=Math.max(9,o.r*.6),Rr=g*o.segs.length/(TAU*.85);o.inv=0;o.r=radFor(90)*(o.fm.th||1);o.segs.forEach((q,i)=>{const t=i*g/Rr;q.x=W/2+Math.cos(t)*Rr;q.y=H/2+Math.sin(t)*Rr});o.angle=-Math.PI/2;st.worms=[o]}
const toast=(t,w)=>{if(w&&w.rid&&st.net){st.net.send(w.rid,{k:"t",x:t});return}st.toasts.push({t:2.2,x:t});if(st.toasts.length>3)st.toasts.shift()};
function useSkill(w=st.worms[0]){if(!st.playing||st.paused&&!st.net||w.cd>0)return;if(st.net&&st.net.role=="client"){if(st.net.conn&&st.net.conn.open)st.net.conn.send({k:"sk"});return}const sk=SK[w.skI!=null?w.skI:prof.skill],cost=Math.max(2,w.mass*.02);
 if(w.mass-cost<M0+2){toast("⚖️ Berat kurang untuk skill",w);return}
 w.mass-=cost;const t=w.segs[w.segs.length-1];dropFood({x:t.x,y:t.y,v:cost,c:dotOf(w.sk),r:6});
 if(sk.id=="dash")w.dash=.45;else if(sk.id=="shield")w.fx.shield=Math.max(w.fx.shield,2);else if(sk.id=="vortex")w.vort=2.5;
 else{const h=w.segs[0],dx=clamp(h.x+Math.cos(w.angle)*380,80,W-80)-h.x,dy=clamp(h.y+Math.sin(w.angle)*380,80,H-80)-h.y;for(const s of w.segs){s.x+=dx;s.y+=dy}w.inv=Math.max(w.inv,.6)}
 w.cd=sk.cd;toast(`${sk.i} ${sk.n}!`,w)}
function takePot(w,p){const P=POT[p.t];if(P.k=="poison")w.mass=Math.max(M0,w.mass-Math.max(6,w.mass*.08));w.fx[P.k]=P.d*(w.fm.m.pot||1);toast(`${P.i} ${P.n}!`,w)}
function think(w,dt,foods){w.think-=dt;if(w.think>0)return;w.think=rand(.2,.5);const h=w.segs[0],m=250;
 if(h.x<m||h.x>W-m||h.y<m||h.y>H-m){w.target=Math.atan2(H/2-h.y,W/2-h.x);return}
 let best=null,bd=300*300;eachNear(st.grid,h.x,h.y,300,f=>{const dx=f.x-h.x,dy=f.y-h.y,d=(dx*dx+dy*dy)/f.v;if(d<bd){bd=d;best=f}});
 w.target=best?Math.atan2(best.y-h.y,best.x-h.x):norm(w.angle+rand(-1,1))}
function step(w,dt){const diff=norm(w.target-w.angle+Math.PI)-Math.PI,turn=5.5*dt*(w.fm.m.turn||1);w.angle=norm(w.angle+clamp(diff,-turn,turn));
 const bo=w.boost&&w.mass>M0+5;let sp=w.dash>0?BOOST*1.45:bo?BOOST*(w.fm.m.bst||1):BASE;if(w.fx.speed>0)sp*=1.35;if(w.fx.poison>0)sp*=.7;
 const gap=Math.max(9,w.r*.6),h=w.segs[0];h.x+=Math.cos(w.angle)*sp*dt;h.y+=Math.sin(w.angle)*sp*dt;
 for(let i=1;i<w.segs.length;i++){const p=w.segs[i-1],s=w.segs[i],dx=p.x-s.x,dy=p.y-s.y,d=Math.hypot(dx,dy)||1;if(d>gap){s.x+=dx/d*(d-gap);s.y+=dy/d*(d-gap)}}
 return bo&&w.dash<=0}
function update(dt,onDie){const{worms,grid,pots}=st,me=worms[0];
 for(const w of worms)if(w.bot)think(w,dt);
 for(const w of worms){
  for(const k in w.fx)if(w.fx[k]>0)w.fx[k]-=dt;
  w.cd=Math.max(0,w.cd-dt);w.dash=Math.max(0,w.dash-dt);w.vort=Math.max(0,w.vort-dt);w.inv=Math.max(0,w.inv-dt);
  if(step(w,dt)){w.acc+=dt;if(w.acc>.15){w.acc=0;const c=Math.max(.6,w.mass*.006)*(w.fm.m.bcost||1),t=w.segs[w.segs.length-1];w.mass-=c;dropFood({x:t.x,y:t.y,v:c,c:dotOf(w.sk),r:5})}}
  const n=segsFor(w.mass);for(let k=0;w.segs.length<n&&k<3;k++){const t=w.segs[w.segs.length-1];w.segs.push({x:t.x,y:t.y})}
  while(w.segs.length>n&&w.segs.length>12)w.segs.pop();
  w.r=radFor(w.mass)*(w.fm.th||1);if(!w.bot)w.peak=Math.max(w.peak||0,Math.floor(w.mass));if(w===me)st.peak=Math.max(st.peak,Math.floor(w.mass));
  const h=w.segs[0];
  if(w.fx.magnet>0||w.vort>0){const R=w.vort>0?VOR_R:MAG_R,sp=(w.vort>0?VOR_S:MAG_S)*dt,R2=R*R;
   eachNear(grid,h.x,h.y,R,f=>{const dx=h.x-f.x,dy=h.y-f.y,d=dx*dx+dy*dy;if(d<R2&&d>1){const dd=Math.sqrt(d),m=Math.min(sp,dd);moveFood(grid,f,f.x+dx/dd*m,f.y+dy/dd*m)}})}
  eachNear(grid,h.x,h.y,(w.r+30)*(w.fm.m.eat||1),f=>{const dx=f.x-h.x,dy=f.y-h.y,rr=(w.r+f.r+6)*(w.fm.m.eat||1);if(dx*dx+dy*dy<rr*rr){w.mass=Math.min(MMAX,w.mass+f.v);delFood(grid,f);if(grid.n<FOOD_N)addFood(grid,newFood())}})}
 
 for(const w of worms){if(w.bot)continue;const h0=w.segs[0];for(const p of pots)if((p.x-h0.x)**2+(p.y-h0.y)**2<(w.r+18)**2){takePot(w,p);p.x=rand(150,W-150);p.y=rand(150,H-150);p.t=potType()}}
 const dead=worms.map((a,i)=>{const h=a.segs[0];if(h.x<0||h.y<0||h.x>W||h.y>H)return true;if(a.inv>0||a.fx.shield>0)return false;
  for(let j=0;j<worms.length;j++){if(j==i)continue;const b=worms[j],lim=(a.r+b.r)*.7,bh=b.segs[0],rch=b.segs.length*Math.max(9,b.r*.6)+lim+20;if((bh.x-h.x)**2+(bh.y-h.y)**2>rch*rch)continue;for(const s of b.segs){const dx=s.x-h.x,dy=s.y-h.y;if(dx*dx+dy*dy<lim*lim)return true}}return false});
 let pd=false;dead.forEach((d,i)=>{if(!d)return;const a=worms[i],cnt=Math.max(1,Math.floor(a.segs.length/2)),v=Math.max(2,a.mass*.7/cnt);
  a.segs.forEach((s,k)=>{if(k%2==0)dropFood({x:s.x+rand(-8,8),y:s.y+rand(-8,8),v,c:dotOf(a.sk),r:6+Math.min(7,v/3),g:1})});
  if(i==0)pd=true;else if(a.rid)killRemote(a,i);else worms[i]=spawnBot(worms[0].segs[0])});
 if(pd)onDie(st.peak)}
/* RENDER */
const box=$("box"),hud=$("hud"),hctx=hud.getContext("2d"),renderer=new THREE.WebGLRenderer({canvas:$("gl"),antialias:true}),scene=new THREE.Scene();
scene.background=new THREE.Color("#11152B");scene.fog=new THREE.Fog("#11152B",700,1900);
const camera=new THREE.PerspectiveCamera(55,1,20,16000);scene.add(new THREE.AmbientLight(0xffffff,.7));
const sun=new THREE.DirectionalLight(0xffffff,.9);sun.position.set(.5,1,.8);scene.add(sun);
const ground=new THREE.Mesh(new THREE.PlaneGeometry(W,H),new THREE.MeshPhongMaterial({color:"#1C2340",shininess:5}));ground.rotation.x=-Math.PI/2;ground.position.set(W/2,0,H/2);scene.add(ground);
let grid=new THREE.GridHelper(W,84,"#2E3862","#252E52");grid.position.set(W/2,.5,H/2);scene.add(grid);
const wallMat=new THREE.MeshBasicMaterial({color:"#FF5A4E"});
[[W/2,-6,W+24,12],[W/2,H+6,W+24,12],[-6,H/2,12,H],[W+6,H/2,12,H]].forEach(([x,z,sx,sz])=>{const m=new THREE.Mesh(new THREE.BoxGeometry(sx,70,sz),wallMat);m.position.set(x,35,z);scene.add(m)});
const stars=(()=>{const n=700,a=new Float32Array(n*3);for(let i=0;i<n;i++){const u=Math.random()*TAU,v=Math.acos(Math.random()*.92+.04),R=7000;a[i*3]=Math.cos(u)*Math.sin(v)*R;a[i*3+1]=Math.cos(v)*R;a[i*3+2]=Math.sin(u)*Math.sin(v)*R}
 const g=new THREE.BufferGeometry();g.setAttribute("position",new THREE.BufferAttribute(a,3));const p=new THREE.Points(g,new THREE.PointsMaterial({color:"#ffffff",size:3,sizeAttenuation:false,fog:false,depthWrite:false}));p.frustumCulled=false;p.visible=false;scene.add(p);return p})();
// garis batas chunk (seperti F3+G di Minecraft)
const clGeo=new THREE.BufferGeometry();clGeo.setAttribute("position",new THREE.BufferAttribute(new Float32Array(140*3),3));
const clines=new THREE.LineSegments(clGeo,new THREE.LineBasicMaterial({color:"#FFD166",transparent:true,opacity:.7}));clines.frustumCulled=false;clines.visible=false;scene.add(clines);
let clKey="";
function updChunkLines(pcx,pcy,rd){const key=pcx+","+pcy+","+rd;if(key===clKey)return;clKey=key;const P=clGeo.attributes.position.array,x0=Math.max(0,pcx-rd),x1=Math.min(GX,pcx+rd+1),y0=Math.max(0,pcy-rd),y1=Math.min(GY,pcy+rd+1);let k=0;
 for(let cx=x0;cx<=x1;cx++){P[k++]=cx*CELL;P[k++]=1;P[k++]=y0*CELL;P[k++]=cx*CELL;P[k++]=1;P[k++]=y1*CELL}
 for(let cy=y0;cy<=y1;cy++){P[k++]=x0*CELL;P[k++]=1;P[k++]=cy*CELL;P[k++]=x1*CELL;P[k++]=1;P[k++]=cy*CELL}
 clGeo.setDrawRange(0,k/3);clGeo.attributes.position.needsUpdate=true}
function applyTheme(){const T=THEMES[prof.bg]||THEMES[0];scene.background.set(T.bg);scene.fog.color.set(T.bg);ground.material.color.set(T.gr);wallMat.color.set(T.wl);clines.material.color.set(T.wl);
 scene.remove(grid);grid.geometry.dispose();grid.material.dispose();grid=new THREE.GridHelper(W,84,T.g1,T.g2);grid.position.set(W/2,.5,H/2);scene.add(grid);stars.visible=!!T.stars;clKey=""}
applyTheme();
const mkI=(geo,n,ex)=>{const m=new THREE.InstancedMesh(geo,new THREE.MeshPhongMaterial({shininess:60,...ex}),n);m.instanceMatrix.setUsage(THREE.DynamicDrawUsage);m.frustumCulled=false;m.setColorAt(0,new THREE.Color("#fff"));m.count=0;scene.add(m);return m};
const SEG_CAP=12000,FOOD_CAP=FOOD_N+700,GEM_CAP=FOOD_CAP+8000,CONE_CAP=9000;
function makeScaleTex(){const c=document.createElement("canvas");c.width=512;c.height=256;const g=c.getContext("2d");
 g.fillStyle="#9a9a9a";g.fillRect(0,0,512,256);
 const nu=14,sw=512/nu,Rr=sw*.62,dy=Rr*.62,rows=Math.ceil(256/dy)+2;
 for(let j=rows;j>=-1;j--)for(let i=-1;i<=nu+1;i++){const cx=(i+(j&1?.5:0))*sw,cy=j*dy,gr=g.createRadialGradient(cx,cy-Rr*.2,Rr*.1,cx,cy,Rr);
  gr.addColorStop(0,"#ffffff");gr.addColorStop(.6,"#dcdcdc");gr.addColorStop(1,"#8c8c8c");g.fillStyle=gr;g.beginPath();g.arc(cx,cy,Rr,0,Math.PI*2);g.fill();g.strokeStyle="rgba(30,30,30,.7)";g.lineWidth=2;g.stroke()}
 
 const t=new THREE.CanvasTexture(c);t.wrapS=t.wrapT=THREE.RepeatWrapping;t.anisotropy=4;if(THREE.SRGBColorSpace)t.colorSpace=THREE.SRGBColorSpace;return t}
const scaleTex=makeScaleTex();
const segM=mkI(new THREE.SphereGeometry(1,14,10),SEG_CAP),foodM=mkI(new THREE.SphereGeometry(1,12,8),16000),torM=mkI(new THREE.TorusGeometry(1,.42,8,16),4000),scM=mkI(new THREE.SphereGeometry(1,20,14),SEG_CAP,{map:scaleTex,bumpMap:scaleTex,bumpScale:1.5,shininess:80}),gemM=mkI(new THREE.IcosahedronGeometry(1,0),GEM_CAP,{shininess:100,flatShading:true}),eyeM=mkI(new THREE.SphereGeometry(1,8,6),400),coneM=mkI(new THREE.ConeGeometry(1,2,6),CONE_CAP),boxM=mkI(new THREE.BoxGeometry(1,1,1),12400),potM=mkI(new THREE.OctahedronGeometry(1,0),80,{flatShading:true,emissive:"#222"}),auraM=mkI(new THREE.SphereGeometry(1,16,12),40,{transparent:true,opacity:.28,depthWrite:false});
const glowM=new THREE.InstancedMesh(new THREE.SphereGeometry(1,10,8),new THREE.MeshBasicMaterial({transparent:true,opacity:.5,blending:THREE.AdditiveBlending,depthWrite:false}),3000);glowM.instanceMatrix.setUsage(THREE.DynamicDrawUsage);glowM.frustumCulled=false;glowM.setColorAt(0,new THREE.Color("#fff"));glowM.count=0;scene.add(glowM);
/* ---- badan mulus: tabung dinamis per cacing ---- */
let RS=10,RV=11,CT=[],ST=[],SHADE=[];const tubes=[],rX=[],rZ=[],rR=[],rA=[],rC=[];
const tubeMats=[new THREE.MeshPhongMaterial({vertexColors:true,shininess:55,specular:"#444444"}),new THREE.MeshPhongMaterial({vertexColors:true,map:scaleTex,bumpMap:scaleTex,bumpScale:1.2,shininess:85,specular:"#777777"})];
function setRS(n){RS=n;RV=n+1;CT=Array.from({length:RV},(_,j)=>Math.cos(j/RS*TAU));ST=Array.from({length:RV},(_,j)=>Math.sin(j/RS*TAU));SHADE=ST.map(v=>.78+.3*Math.max(0,-v)+.08*(1-Math.abs(v)))}
// kehalusan skin: sisi penampang badan, detail bola kepala & kerucut mengikuti pilihan pemain
function applyDetail(){const s=SMS[prof.sm]||SMS[1];setRS(s.rs);segM.geometry.dispose();segM.geometry=new THREE.SphereGeometry(1,s.sg[0],s.sg[1]);coneM.geometry.dispose();coneM.geometry=new THREE.ConeGeometry(1,2,s.cn)}
applyDetail();
function growTube(m,n){if(m.cap>=n&&m.rs===RS)return;const cap=Math.max(n+8,m.rs===RS?m.cap*2:m.cap,64),V=cap*RV,g=m.geometry;if(m.cap)g.dispose();
 const mk=(k,z)=>{const a=new THREE.BufferAttribute(new Float32Array(V*z),z);a.setUsage(THREE.DynamicDrawUsage);g.setAttribute(k,a)};mk("position",3);mk("normal",3);mk("uv",2);mk("color",3);
 const ix=new Uint32Array((cap-1)*RS*6);let q=0;for(let i=0;i<cap-1;i++)for(let j=0;j<RS;j++){const a=i*RV+j,b=a+1,c=a+RV,d=c+1;ix[q++]=a;ix[q++]=c;ix[q++]=b;ix[q++]=b;ix[q++]=c;ix[q++]=d}
 g.setIndex(new THREE.BufferAttribute(ix,1));m.cap=cap;m.rs=RS}
function takeTube(wm){let m=wm.tube;if(m&&m.owner===wm&&!m.used){m.used=true;return m}
 m=tubes.find(t=>!t.used);if(!m){m=new THREE.Mesh(new THREE.BufferGeometry(),tubeMats[0]);m.frustumCulled=false;m.cap=0;scene.add(m);tubes.push(m)}
 m.used=true;m.owner=wm;wm.tube=m;return m}
const wsh=new THREE.Shape();[[.5,0],[.3,1],[-.5,2.4],[-.15,1.85],[-.9,1.7],[-.4,1.25],[-1.2,.9],[-.55,.5],[-.9,0]].forEach((p,i)=>i?wsh.lineTo(p[0],p[1]):wsh.moveTo(p[0],p[1]));
const wingG=new THREE.ShapeGeometry(wsh);wingG.rotateX(Math.PI/2);
const wingM=mkI(wingG,400,{side:THREE.DoubleSide,flatShading:true,shininess:25});
// Kepala: [bentuk(S bola, C kerucut, B kotak), depan, samping, tinggi, sx, sy, sz, rx, ry, rz, warna, cermin, syarat-rig]
const HEADS={
 ular:{s:1,p:[["S",.15,0,.62,1,.62,.95,0,0,0,"h"],["S",1.05,0,.5,.9,.42,.62,0,0,0,"h"],["S",.95,0,.22,.9,.22,.55,0,0,0,"b"],["S",.55,.6,.9,.27,.27,.27,0,0,0,"e",1],["S",.7,.62,.92,.1,.17,.1,0,0,0,"k",1],["C",2,.06,.3,.035,.45,.035,0,0,-1.5,"t",1]]},
 naga:{s:1.25,p:[["S",.1,0,.75,1.1,.78,.95,0,0,0,"h"],["S",1.25,0,.62,1.1,.45,.62,0,0,.08,"h"],["S",2.1,0,.78,.3,.22,.34,0,0,0,"h"],["S",2.3,.17,.84,.09,.07,.08,0,0,0,"k",1],["S",1.1,0,.2,1,.2,.5,0,0,.12,"b"],
  ["C",1.5,.33,.3,.045,.17,.045,3.14,0,0,"w",1],["C",1.85,.3,.3,.045,.17,.045,3.14,0,0,"w",1],["C",1.2,.36,.3,.05,.2,.05,3.14,0,0,"w",1],["C",.65,.5,1.2,.28,.45,.2,.5,0,1.15,"a",1],
  ["S",.7,.62,.98,.3,.3,.3,0,0,0,"e",1],["S",.82,.65,1,.07,.21,.1,0,0,0,"k",1],["C",-.1,.42,1.35,.22,.75,.22,.5,0,1,"a",1],["C",-.75,.62,1.7,.15,.65,.15,.65,0,1.45,"a",1],["C",.1,.9,.55,.13,.42,.13,1.3,0,.5,"a",1],
  ["C",-.7,0,1,.18,.5,.07,0,0,.5,"a"],["C",-1.25,0,.95,.16,.45,.06,0,0,.55,"a"],["C",1.7,.35,.75,.02,1.3,.02,1.35,.35,1.2,"a",1,"wh"]]},
 rubah:{s:1.1,p:[["S",.1,0,.68,1,.72,.9,0,0,0,"h"],["C",1.15,0,.5,.4,.9,.4,0,0,-1.5708,"b"],["S",2,0,.56,.15,.12,.15,0,0,0,"k"],["C",0,.55,1.5,.38,.95,.2,.25,0,.15,"h",1],["C",.08,.53,1.45,.22,.7,.12,.25,0,.15,"p",1],
  ["S",.62,.5,.95,.2,.2,.2,0,0,0,"e",1],["S",.75,.52,.97,.07,.13,.07,0,0,0,"k",1],["C",.15,.85,.5,.2,.5,.2,1.4,0,.7,"b",1]]},
 kucing:{s:1.1,p:[["S",.15,0,.7,1.05,.85,1,0,0,0,"h"],["S",1,0,.45,.55,.35,.55,0,0,0,"b"],["S",1.5,0,.55,.12,.1,.14,0,0,0,"p"],["C",0,.62,1.45,.32,.6,.16,.15,0,.1,"h",1],["C",.05,.6,1.4,.2,.42,.1,.15,0,.1,"p",1],
  ["S",.62,.52,.95,.25,.3,.2,0,0,0,"e",1],["S",.78,.54,.97,.07,.22,.07,0,0,0,"k",1],["C",1.2,.3,.5,.018,.85,.018,1.45,.3,.35,"w",1],["C",1.2,.3,.4,.018,.8,.018,1.5,.5,-.05,"w",1]]},
 panda:{s:1.1,p:[["S",.15,0,.7,1.05,.85,1,0,0,0,"w"],["S",1,0,.45,.5,.33,.5,0,0,0,"w"],["S",1.45,0,.55,.14,.11,.14,0,0,0,"k"],["S",0,.7,1.45,.32,.32,.2,0,0,0,"k",1],["S",.55,.5,.95,.3,.22,.14,0,0,0,"k",1],["S",.68,.5,.99,.17,.17,.17,0,0,0,"w",1],["S",.8,.5,1,.07,.1,.07,0,0,0,"k",1]]},
 burung:{s:1.1,p:[["S",.15,0,.7,.9,.7,.8,0,0,0,"h"],["C",1.1,0,.5,.32,.65,.3,0,0,-1.5708,"a"],["C",.95,0,.28,.22,.45,.2,0,0,-1.5708,"a"],["S",.55,.5,.95,.22,.22,.22,0,0,0,"e",1],["S",.66,.52,.97,.08,.1,.08,0,0,0,"k",1],
  ["C",-.1,0,1.35,.13,.8,.08,0,0,.5,"a"],["C",-.3,.14,1.3,.12,.7,.07,.3,0,.8,"a",1],["C",-.55,.22,1.2,.1,.6,.06,.5,0,1,"a",1]]},
 iblis:{s:1.15,p:[["S",.1,0,.7,1.1,.82,1.05,0,0,0,"h"],["S",1,0,.35,.8,.35,.8,0,0,0,"h"],["C",1.45,.32,.08,.07,.38,.07,3.14,0,0,"w",1],["C",1.2,.5,.1,.06,.3,.06,3.14,0,0,"w",1],["C",.25,.45,1.45,.28,.95,.28,.3,0,.45,"a",1],
  ["S",.6,.55,.98,.26,.26,.26,0,0,0,"e",1],["S",.74,.57,1,.09,.18,.09,0,0,0,"k",1],["C",.55,.5,1.3,.25,.4,.1,.5,0,1.1,"k",1],["C",0,.7,1.3,.3,.9,.08,.6,0,.2,"h",1,"ea"]]},
 kuda:{s:1.15,p:[["S",.1,0,.72,.95,.78,.85,0,0,0,"h"],["S",1.4,0,.5,1.1,.42,.5,0,0,0,"b"],["S",2.45,.15,.58,.1,.08,.1,0,0,0,"k",1],["C",0,.38,1.5,.2,.6,.12,.1,0,.15,"h",1],["S",.6,.55,.98,.22,.24,.2,0,0,0,"e",1],["S",.72,.57,1,.07,.14,.07,0,0,0,"k",1],
  ["C",.55,0,1.7,.16,1.25,.16,0,0,-.55,"a"],["C",-.45,0,1.2,.2,.65,.08,0,0,.5,"a"],["C",-1,0,1.05,.2,.6,.08,0,0,.55,"a"]]},
 bulat:{s:1.05,p:[["S",.2,0,.75,1.05,.88,1,0,0,0,"h"],["S",1.15,0,.5,.18,.15,.18,0,0,0,"b"],["S",.65,.5,.98,.26,.3,.24,0,0,0,"w",1],["S",.8,.52,.99,.14,.18,.14,0,0,0,"e",1],["S",.9,.52,1,.06,.1,.06,0,0,0,"k",1],
  ["B",.15,0,1.15,.3,.16,2.15,0,0,0,"@bd",0,"bd"],["C",-.1,0,1.65,.8,1.15,.8,0,0,.25,"@hat",0,"hat"],["B",-.05,0,1.2,2.2,.08,2.2,0,0,0,"@hat",0,"hat"],["C",.2,.55,1.75,.2,.7,.2,.5,0,.6,"@hn",1,"hn"]]},
 ulat:{s:1,p:[["S",.2,0,.7,1.05,.85,.95,0,0,0,"h"],["S",.6,.5,.95,.26,.26,.26,0,0,0,"w",1],["S",.75,.52,.97,.12,.15,.12,0,0,0,"k",1],["C",.5,.3,1.5,.03,.9,.03,.35,0,.55,"k",1],["S",.1,.55,2.1,.1,.1,.1,0,0,0,"t",1]]},
 robot:{s:1,p:[["B",.2,0,.75,1.9,1.4,1.9,0,0,0,"h"],["B",1.05,0,.75,.1,.5,1.3,0,0,0,"k"],["S",.7,.4,.95,.2,.2,.2,0,0,0,"e",1],["C",0,0,1.7,.05,.6,.05,0,0,0,"k"],["S",0,0,2.35,.14,.14,.14,0,0,0,"t"]]}};
const D=new THREE.Object3D();D.rotation.order="YXZ";const cache={},C=c=>cache[c]||(cache[c]=new THREE.Color(c));
const KOL={bun:C("#E3A857"),pat:C("#5B3A29"),let:C("#7BC043"),che:C("#FFD23F"),waf:C("#D9A066"),cok:C("#C68E4E"),chip:C("#4A2C1A"),wht:C("#FFF7E8"),piz:C("#E8B05B"),pep:C("#B3261E"),apl:C("#E63946"),gap:C("#8AC926"),stm:C("#6B4423"),leaf:C("#4CAF50"),ban:C("#FFE135"),banT:C("#5D4037"),ric:C("#FFFDF5"),sal:C("#FF8A65"),nor:C("#1B2A1B"),cup:C("#FFD6E8"),chy:C("#C2185B"),str:C("#26C6DA"),pearl:C("#2B1B17"),star:C("#FFD700")},TC=new THREE.Color();
const put=(m,i,x,y,z,sx,sy,sz,col,rx,ry,rz)=>{D.position.set(x,y,z);D.rotation.set(rx||0,ry||0,rz||0);D.scale.set(sx,sy,sz);D.updateMatrix();m.setMatrixAt(i,D.matrix);m.setColorAt(i,col)};
const sph=(m,i,x,y,z,s,col)=>put(m,i,x,y,z,s,s,s,col);
const VEC=new THREE.Vector3(),pr=$("pr");
function fit(){const iw=innerWidth,ih=innerHeight,rt=prof.rot&&ih>iw?prof.rot:0,w=rt?ih:iw,h=rt?iw:ih,S=$("stage");
 S.style.cssText=`position:fixed;width:${w}px;height:${h}px;transform-origin:0 0;`+(rt==1?`left:${iw}px;top:0;transform:rotate(90deg)`:rt==2?`left:0;top:${ih}px;transform:rotate(-90deg)`:"left:0;top:0");
 S.className=(rt?"rot ":"")+(w>h?"land":"");const dpr=Math.min(devicePixelRatio||1,QUAL[prof.qual].dpr);renderer.setPixelRatio(dpr);renderer.setSize(w,h,false);camera.aspect=w/Math.max(1,h);camera.updateProjectionMatrix();hud.width=Math.round(w*dpr);hud.height=Math.round(h*dpr);st.size={w,h,dpr,rt,sat:rt?0:parseFloat(getComputedStyle(pr).paddingTop)||0}}
fit();on(window,"resize",fit);
function drawHud(R2){const{w,h,dpr,sat}=st.size,ctx=hctx;ctx.setTransform(dpr,0,0,dpr,0,0);ctx.clearRect(0,0,w,h);const me=st.worms[0],hd=me.segs[0],T=sat+12;
 ctx.textAlign="center";ctx.textBaseline="alphabetic";ctx.lineJoin="round";ctx.shadowColor="rgba(0,0,0,.55)";ctx.shadowBlur=0;ctx.lineWidth=3;ctx.font="600 13px system-ui,sans-serif";
 for(const wm of st.worms){const p=wm.segs[0];if((p.x-hd.x)**2+(p.y-hd.y)**2>R2)continue;VEC.set(p.x,wm.r*2.6+8,p.y).project(camera);if(VEC.z>1)continue;const sx=(VEC.x*.5+.5)*w,sy=(-VEC.y*.5+.5)*h;ctx.strokeStyle="rgba(8,10,25,.8)";ctx.strokeText(wm.name,sx,sy);ctx.fillStyle="#fff";ctx.fillText(wm.name,sx,sy)}
 const ms=84,mx=w-ms-12;ctx.fillStyle="rgba(255,255,255,.08)";ctx.fillRect(mx,T,ms,ms);ctx.strokeStyle="rgba(255,255,255,.35)";ctx.lineWidth=1;ctx.strokeRect(mx,T,ms,ms);
 for(const wm of st.worms){const p=wm.segs[0];ctx.fillStyle=wm===me?"#FFD166":dotOf(wm.sk);ctx.beginPath();ctx.arc(mx+p.x/W*ms,T+p.y/H*ms,wm===me?3.5:2.2,0,TAU);ctx.fill()}
 {const Lb=st.top||[],pw=124,px=w-pw-12,py=T+ms+8,rh=17,n=Lb.length;if(n){const me2=st.rank>n,hh=24+n*rh+(me2?rh+4:0);ctx.fillStyle="rgba(8,10,25,.5)";ctx.beginPath();if(ctx.roundRect)ctx.roundRect(px,py,pw,hh,8);else ctx.rect(px,py,pw,hh);ctx.fill();
  ctx.shadowBlur=3;ctx.textBaseline="top";ctx.textAlign="left";ctx.font="700 11px system-ui,sans-serif";ctx.fillStyle="rgba(255,255,255,.75)";ctx.fillText("🏆 Peringkat #"+st.rank+"/"+st.nw,px+8,py+6);
  ctx.font="600 12px system-ui,sans-serif";Lb.forEach((o,i)=>{const y=py+24+i*rh;ctx.fillStyle=o.me?"#FFD166":"#fff";ctx.textAlign="left";ctx.fillText((i+1)+". "+o.n.slice(0,9),px+8,y);ctx.textAlign="right";ctx.fillText(String(o.m),px+pw-8,y)});
  if(me2){const y=py+24+n*rh+4;ctx.fillStyle="#FFD166";ctx.textAlign="left";ctx.fillText(st.rank+". "+st.myn.slice(0,9),px+8,y);ctx.textAlign="right";ctx.fillText(String(st.mym),px+pw-8,y)}
  ctx.shadowBlur=0}}
 ctx.shadowBlur=3;ctx.textAlign="left";ctx.textBaseline="top";ctx.fillStyle="rgba(255,255,255,.7)";ctx.font="12px system-ui,sans-serif";ctx.fillText("Berat",14,T);ctx.fillText("Terbaik "+st.best+" kg",14,T+40);
 ctx.fillStyle="#fff";ctx.font="700 24px system-ui,sans-serif";ctx.fillText(Math.floor(me.mass)+" kg",14,T+12);
 ctx.font="600 13px system-ui,sans-serif";let y=T+62;if(prof.cl&&st.ck){ctx.fillStyle="rgba(255,255,255,.75)";ctx.font="11px system-ui,sans-serif";ctx.fillText("Chunk "+st.ck[0]+", "+st.ck[1]+" · jarak "+st.ck[2],14,y);y+=18;ctx.font="600 13px system-ui,sans-serif"}for(const P of POT){const t=me.fx[P.k];if(t>0){ctx.fillStyle=P.c;ctx.fillText(`${P.i} ${t.toFixed(1)}s`,14,y);y+=18}}
 const tl=Math.max(0,st.timeLeft);ctx.textAlign="center";ctx.fillStyle="#fff";ctx.font="700 20px system-ui,sans-serif";ctx.fillText(st.net?"👥 "+st.net.code+" · "+st.worms.filter(x=>!x.bot).length:st.mode=="timed"?`${Math.floor(tl/60)}:${String(Math.floor(tl%60)).padStart(2,"0")}`:"∞",w/2,T);
 ctx.font="700 16px system-ui,sans-serif";st.toasts.forEach((o,i)=>{ctx.globalAlpha=Math.min(1,o.t);ctx.fillText(o.x,w/2,h*.25+i*22)});ctx.globalAlpha=1;
 ctx.shadowBlur=0;const j=st.joy;if(j){ctx.strokeStyle="rgba(255,255,255,.35)";ctx.lineWidth=2;ctx.beginPath();ctx.arc(j.ax,j.ay,JOY,0,TAU);ctx.stroke();ctx.fillStyle="rgba(255,255,255,.35)";ctx.beginPath();ctx.arc(j.x,j.y,22,0,TAU);ctx.fill()}}
function finish(reason){st.playing=false;st.paused=false;$("pause").style.display="none";st.joy=null;st.best=Math.max(st.best,st.peak);const pos=addScore(st.mode,st.worms[0].name,st.peak,prof.skin),gain=earn(st.peak);
 $("res").textContent=(reason=="time"?"⏱️ Waktu habis! ":reason=="quit"?"🏠 Keluar. ":"💀 Kalah! ")+`Berat tertinggi ${st.peak} kg · +${gain} 🪙`+(pos?` · Leaderboard #${pos}`:"");if(pos)tab="rank";setPreview();render();$("lobby").style.display="flex";$("ctl").style.display="none";$("bPau").style.display="none";$("zc").style.display="none"}
const onDie=score=>{const o=st.worms[0];if(st.net||(st.mode=="timed"&&st.timeLeft>0)){if(st.net){addScore("mp",o.name,score,prof.skin);toast("💀 Mati! "+score+" kg · +"+earn(score)+" 🪙");st.peak=0}const w=mkWorm(rand(300,W-300),rand(300,H-300),o.sk,o.name,false,M0,o.fi);w.skI=o.skI;st.worms[0]=w;st.joy=null}else finish("dead")};
let prev=performance.now(),lastBtn="",lbT=0;
function frame(now){try{frame0(now)}catch(err){$("res").textContent="⚠️ Error: "+err.message;$("lobby").style.display="flex";$("ctl").style.display="none";$("bPau").style.display="none";$("zc").style.display="none";st.playing=false;console.error(err)}if(!dead)raf=requestAnimationFrame(frame)}
function frame0(now){const dt=Math.min(.05,(now-prev)/1000);prev=now;const tt=now/1000;
 if(st.playing&&!(st.paused&&!st.net)){{const m0=st.worms[0];if(st.joy&&st.joy.s!=null)m0.target=norm(st.joy.s+st.az+Math.PI/2);else if(!st.joy&&st.ms!=null)m0.target=norm(st.ms+st.az+Math.PI/2)}
  if(st.net&&st.net.role=="client")clientStep(dt);else update(dt,onDie);if(st.net&&st.net.role=="host")hostSend(dt);st.toasts.forEach(o=>o.t-=dt);st.toasts=st.toasts.filter(o=>o.t>0);
  if(st.mode=="timed"&&!st.net){st.timeLeft-=dt;if(st.timeLeft<=0){st.timeLeft=0;finish("time")}}
  lbT-=dt;if(lbT<=0){lbT=.3;const m0=st.worms[0],Ls=st.worms.slice().sort((a,b)=>b.mass-a.mass);st.rank=Ls.indexOf(m0)+1;st.nw=Ls.length;st.myn=String(m0.name);st.mym=Math.floor(m0.mass);st.top=Ls.slice(0,5).map(w=>({n:String(w.name),m:Math.floor(w.mass),me:w===m0}))}
  const w0=st.worms[0],b=SK[prof.skill].i+(w0.cd>0?" "+Math.ceil(w0.cd):"");if(b!=lastBtn){$("bSk").textContent=b;$("bSk").style.opacity=w0.cd>0?.5:1;lastBtn=b}}
 const me=st.worms[0],hd=me.segs[0],Q=QUAL[prof.qual],k=st.zoom+=((1+(me.r-7)/25+Math.min(2,Math.sqrt(Math.max(0,me.segs.length-40))/45))-st.zoom)*Math.min(1,dt*2),kz=k*prof.zm;
 if(st.playing){const m=prof.cam;let ta=-Math.PI/2,tp=CAMS[m].p;if(m==0)ta=me.angle;else if(m==3){ta=st.faz;tp=st.fpt}
  st.az+=(norm(ta-st.az+Math.PI)-Math.PI)*Math.min(1,dt*(m==0?3:6));st.cp+=(tp-st.cp)*Math.min(1,dt*5);
  const D=540*kz,ca=Math.cos(st.az),sa=Math.sin(st.az),cc=Math.cos(st.cp);
  camera.position.set(hd.x-ca*D*cc,D*Math.sin(st.cp),hd.y-sa*D*cc);camera.lookAt(hd.x+ca*30*kz,0,hd.y+sa*30*kz);if(camera.view&&camera.view.enabled)camera.clearViewOffset()}
 else{const ld=st.size.w>st.size.h,{w,h}=st.size;camera.position.set(W/2+Math.sin(tt*.5)*200,ld?110:150,H/2+Math.cos(tt*.5)*200);camera.lookAt(W/2,ld?10:-40,H/2);camera.setViewOffset(w,h,ld?w*.22:0,0,w,h)}

 // render chunk: hanya chunk dalam jarak (kotak, seperti Minecraft) yang digambar. 0 = otomatis dari zoom & kualitas.
 const pcx=clamp((hd.x/CELL)|0,0,GX-1),pcy=clamp((hd.y/CELL)|0,0,GY-1),RDc=RDS[prof.rd]||clamp(Math.ceil(1100*kz*Q.view/CELL),3,16),RDu=(RDc+.5)*CELL,R2=((RDc+1)*CELL)**2,
  near=p=>Math.abs(((p.x/CELL)|0)-pcx)<=RDc&&Math.abs(((p.y/CELL)|0)-pcy)<=RDc;
 {const dcam=st.playing?540*kz:260;scene.fog.near=dcam+RDu*.35;scene.fog.far=dcam+RDu*1.15}
 stars.position.set(camera.position.x,0,camera.position.z);
 if(prof.cl){clines.visible=true;updChunkLines(pcx,pcy,RDc)}else clines.visible=false;
 st.ck=[pcx,pcy,RDc];
 let nf=0,ng=0,ns=0,ne=0,nc=0,nb=0,np=0,na=0,nt=0,nsc=0,ngl=0,nw=0;for(const t of tubes)t.used=false;
 const fp=(x,y,z,sx,sy,sz,c)=>put(foodM,nf++,x,y,z,sx,sy,sz,c);
 const df=f=>{if(nf>15900||nc>CONE_CAP-60)return;const k=f.k!=null?f.k:f.v>=7?3:f.v>=4?4:0,rr=f.r,x=f.x,z=f.y,y0=Math.sin(tt*2.5+f.x)*1.5,col=C(f.c);
  if(k==3){fp(x,rr*.3+y0,z,rr*1.05,rr*.3,rr*1.05,KOL.bun);fp(x,rr*.6+y0,z,rr*1.15,rr*.14,rr*1.15,KOL.let);fp(x,rr*.8+y0,z,rr*.95,rr*.22,rr*.95,KOL.pat);
   if(nb<12000)put(boxM,nb++,x,rr*.98+y0,z,rr*1.6,rr*.07,rr*1.6,KOL.che,0,.8,0);fp(x,rr*1.3+y0,z,rr*1.05,rr*.6,rr*1.05,KOL.bun);
   for(let q=0;q<3;q++)fp(x+Math.cos(q*2.1)*rr*.4,rr*1.82+y0,z+Math.sin(q*2.1)*rr*.4,rr*.1,rr*.06,rr*.1,KOL.wht)}
  else if(k==2){if(nt<4000)put(torM,nt++,x,rr*.55+y0,z,rr*.8,rr*.8,rr*.8,col,1.35,tt+f.x,0);fp(x,rr*.2+y0,z,rr*.22,rr*.12,rr*.22,KOL.wht)}
  else if(k==4){put(coneM,nc++,x,rr*.8+y0,z,rr*.55,rr*.8,rr*.55,KOL.waf,Math.PI,0,0);fp(x,rr*1.7+y0,z,rr*.78,rr*.78,rr*.78,col);fp(x,rr*2.35+y0,z,rr*.18,rr*.18,rr*.18,KOL.pat)}
  else if(k==5){fp(x,rr*.32+y0,z,rr*1.05,rr*.34,rr*1.05,KOL.cok);for(let q=0;q<4;q++)fp(x+Math.cos(q*1.7+f.x)*rr*.45,rr*.62+y0,z+Math.sin(q*1.7+f.x)*rr*.45,rr*.17,rr*.12,rr*.17,KOL.chip)}
  else if(k==1&&nb<12000){fp(x,rr*1.5+y0,z,rr*.85,rr*.85,rr*.85,col);put(boxM,nb++,x,rr*.65+y0,z,rr*.14,rr*1.4,rr*.14,KOL.wht,0,0,0);fp(x,rr*1.5+y0,z,rr*.4,rr*.2,rr*.4,KOL.wht)}
  else if(k==6){fp(x,rr*.28+y0,z,rr*1.15,rr*.2,rr*1.15,KOL.piz);fp(x,rr*.42+y0,z,rr*.95,rr*.12,rr*.95,KOL.che);for(let q=0;q<5;q++)fp(x+Math.cos(q*1.26+f.x)*rr*.5,rr*.52+y0,z+Math.sin(q*1.26+f.x)*rr*.5,rr*.2,rr*.07,rr*.2,KOL.pep)}
  else if((k==7||k==12)&&nb<11990){const gd=k==12,ac=gd?KOL.star:((f.x|0)%3==0?KOL.gap:KOL.apl);fp(x-rr*.22,rr*.85+y0,z,rr*.72,rr*.8,rr*.72,ac);fp(x+rr*.22,rr*.85+y0,z,rr*.72,rr*.8,rr*.72,ac);put(boxM,nb++,x,rr*1.72+y0,z,rr*.1,rr*.4,rr*.1,KOL.stm,0,0,.25);fp(x+rr*.32,rr*1.7+y0,z+rr*.05,rr*.34,rr*.1,rr*.18,KOL.leaf);
   if(gd&&ng<GEM_CAP-2)put(gemM,ng++,x,rr*2.3+y0+Math.sin(tt*3)*2,z,rr*.35,rr*.35,rr*.35,KOL.wht,tt*1.5,tt*2,0)}
  else if(k==8){const by=rr*.35+y0;fp(x,by,z,rr*.75,rr*.3,rr*.3,KOL.ban);put(foodM,nf++,x+rr*.8,by,z+rr*.2,rr*.65,rr*.28,rr*.28,KOL.ban,0,-.45,0);put(foodM,nf++,x-rr*.8,by,z+rr*.2,rr*.65,rr*.28,rr*.28,KOL.ban,0,.45,0);fp(x+rr*1.3,by,z+rr*.42,rr*.12,rr*.12,rr*.12,KOL.banT);fp(x-rr*1.3,by,z+rr*.42,rr*.12,rr*.12,rr*.12,KOL.banT)}
  else if(k==9&&nb<11980){put(boxM,nb++,x,rr*.4+y0,z,rr*1.5,rr*.8,rr*.95,KOL.ric,0,f.x,0);put(boxM,nb++,x,rr*.9+y0,z,rr*1.6,rr*.28,rr*1.05,KOL.sal,0,f.x,0);put(boxM,nb++,x,rr*.55+y0,z,rr*.3,rr*1.0,rr*1.12,KOL.nor,0,f.x,0)}
  else if(k==10){put(coneM,nc++,x,rr*.5+y0,z,rr*.8,rr*.5,rr*.8,KOL.cup,Math.PI,0,0);fp(x,rr*1.1+y0,z,rr*.95,rr*.55,rr*.95,col);fp(x,rr*1.5+y0,z,rr*.65,rr*.45,rr*.65,col);fp(x,rr*1.9+y0,z,rr*.22,rr*.22,rr*.22,KOL.chy)}
  else if(k==11&&nb<11990){put(coneM,nc++,x,rr*.75+y0,z,rr*.7,rr*.75,rr*.7,col,Math.PI,0,0);fp(x,rr*1.55+y0,z,rr*.75,rr*.12,rr*.75,KOL.wht);put(boxM,nb++,x+rr*.12,rr*2.05+y0,z,rr*.14,rr*1.1,rr*.14,KOL.str,0,0,.18);for(let q=0;q<3;q++)fp(x+Math.cos(q*2.1+f.x)*rr*.35,rr*1.68+y0,z+Math.sin(q*2.1+f.x)*rr*.35,rr*.14,rr*.14,rr*.14,KOL.pearl)}
  else{fp(x,rr*.8+y0,z,rr*.8,rr*.62,rr*.62,col);put(coneM,nc++,x-rr*.95,rr*.8+y0,z,rr*.35,rr*.5,rr*.35,KOL.wht,0,0,Math.PI/2);put(coneM,nc++,x+rr*.95,rr*.8+y0,z,rr*.35,rr*.5,rr*.35,KOL.wht,0,0,-Math.PI/2)}
  if((f.g||k==12)&&prof.qual>0&&ngl<3000){TC.copy(k==12?KOL.star:col).multiplyScalar(.5+.5*Math.sin(tt*4+f.x*.05));sph(glowM,ngl++,x,rr*.9+y0,z,rr*(2.4+.4*Math.sin(tt*3+f.y*.05)),TC)}};
 for(let r=0;r<=RDc&&nf<=15900;r++)for(let dy=-r;dy<=r;dy++){const cy=pcy+dy;if(cy<0||cy>=GY)continue;const stp=(dy==-r||dy==r)?1:2*r;for(let dx=-r;dx<=r;dx+=stp){const cx=pcx+dx;if(cx<0||cx>=GX)continue;const c=st.grid.cells[cx+cy*GX];for(let i=c.length-1;i>=0;i--)df(c[i])}}
 for(const p of st.pots){if(!near(p)||np>=80)continue;put(potM,np++,p.x,16+Math.sin(tt*3+p.x)*4,p.y,13,13,13,C(POT[p.t].c),0,tt*2,0)}
 for(const wm of st.worms){const sk=wm.sk,rg=sk.rig,sg=wm.segs,n=sg.length,r=wm.r,hs=sg[0],fm=wm.fm;
  if(!(near(hs)||near(sg[n>>1])||near(sg[n-1])))continue;
  const tp=Math.max(rg&&rg.tp||0,fm.tp||0,.5),tube=fm.seg?null:takeTube(wm),acc=sk.kc.a,hdn=rg&&rg.hd||fm.hd||"ular";
  let P,N,UV,CO,vv=0,vl=0;if(tube){growTube(tube,n);tube.material=tubeMats[rg&&rg.sc||fm.sc?1:0];const A=tube.geometry.attributes;P=A.position.array;N=A.normal.array;UV=A.uv.array;CO=A.color.array}
  for(let i=0;i<n;i++){const s=sg[i],a=sg[Math.min(n-1,i+1)],b=sg[Math.max(0,i-1)];let fx=a.x-b.x,fz=a.y-b.y;const l=Math.hypot(fx,fz)||1;fx/=l;fz/=l;
   const u=i/Math.max(1,n-1);let ri=r*(1-tp*Math.pow(u,1.2))*(fm.pulse?1+.1*Math.sin(tt*5-i*.5):1);if(n>5&&i>=n-3)ri*=[.7,.45,.2][i-(n-3)];
   const off=Math.sin(tt*7-i*.55)*r*(rg?.16:.07)*Math.min(1,i/3),cx=s.x-fz*off,cz=s.y+fx*off,
    col=rg?(rg.cyc?sk.pal[Math.floor(((i*.02+tt*.3)%1)*47.99)]:sk.pal[Math.floor(clamp(u+.12*Math.sin(i*.35-tt*3),0,1)*47.99)]):sk.col[Math.floor(i/3)%sk.col.length];
   rX[i]=cx;rZ[i]=cz;rR[i]=ri;rA[i]=Math.atan2(-fz,-fx);rC[i]=col;
   if(!tube){const ss=ri*(i==0?1.08:1);if(fm.seg=="box"&&nb<12000)put(boxM,nb++,cx,ri,cz,ss*1.7,ss*1.7,ss*1.7,col,0,-rA[i],0);else if(fm.seg=="gem"&&ng<GEM_CAP)put(gemM,ng++,cx,ri,cz,ss*1.15,ss*1.15,ss*1.15,col,0,tt*2+i,0)}}
  if(tube){const sps=(SMS[prof.sm]||SMS[1]).sp;for(let p=0;p<sps;p++){let px=rX[0],pz=rZ[0];for(let i=1;i<n-1;i++){const x=rX[i],z=rZ[i];rX[i]=(px+x*2+rX[i+1])*.25;rZ[i]=(pz+z*2+rZ[i+1])*.25;px=x;pz=z}}
   for(let i=0;i<n;i++){const a=i<n-1?i+1:i,b=i>0?i-1:i;let fx=rX[a]-rX[b],fz=rZ[a]-rZ[b];const l=Math.hypot(fx,fz)||1;fx/=l;fz/=l;rA[i]=Math.atan2(-fz,-fx);
    const cx=rX[i],cz=rZ[i],ri=rR[i],col=rC[i],sx=-fz,sz=fx;if(i>0)vl+=Math.hypot(cx-rX[i-1],cz-rZ[i-1])/(.49*TAU*Math.max(4,ri));
    for(let j=0;j<RV;j++){const cs=CT[j],sn=ST[j],k=vv*3,sh=rg?SHADE[j]:1+(SHADE[j]-.95)*.5;
     P[k]=cx+sx*cs*ri;P[k+1]=ri*.9+sn*ri*.9;P[k+2]=cz+sz*cs*ri;N[k]=sx*cs;N[k+1]=sn;N[k+2]=sz*cs;UV[vv*2]=j/RS;UV[vv*2+1]=vl;CO[k]=col.r*sh;CO[k+1]=col.g*sh;CO[k+2]=col.b*sh;vv++}}}
  if(tube){const g=tube.geometry;g.setDrawRange(0,(n-1)*RS*6);for(const k of["position","normal","uv","color"])g.attributes[k].needsUpdate=true}
  const spk=rg&&rg.sp||fm.sp;if(spk&&nc<CONE_CAP-n)for(let i=spk;i<n-2;i+=spk){const ri=rR[i];put(coneM,nc++,rX[i],ri*2.05,rZ[i],ri*.17,ri*.55*(1-.5*i/n),ri*.07,acc,0,-rA[i],.3)}
  if((rg&&rg.lg||fm.lg)&&n>9&&nc<CONE_CAP-40&&ns<SEG_CAP-40)for(const li of[Math.max(3,Math.round(n*.18)),Math.round(n*.55)]){const ri=rR[li],ag=rA[li],lx=-Math.sin(ag),lz=Math.cos(ag),bc=rC[li];
   for(const q of[1,-1]){const sw=Math.sin(tt*8+li*.7+(q>0?0:Math.PI))*.45,bx=rX[li]+lx*q*ri*1.05,bz=rZ[li]+lz*q*ri*1.05;
    put(segM,ns++,bx,ri*.65,bz,ri*.5,ri*.7,ri*.5,bc);put(coneM,nc++,bx+lx*q*ri*.3,ri*.45,bz+lz*q*ri*.3,ri*.2,ri*.45,ri*.2,bc,-q*.55,-ag,Math.PI+sw);put(segM,ns++,bx+lx*q*ri*.5,ri*.1,bz+lz*q*ri*.5,ri*.3,ri*.14,ri*.36,acc)}}
  if(fm.leg&&nc<CONE_CAP-2*n)for(let i=1;i<n-2;i+=2){const ri=rR[i],ag=rA[i],lx=-Math.sin(ag),lz=Math.cos(ag);for(const q of[1,-1])put(coneM,nc++,rX[i]+lx*q*ri*1.1,ri*.42,rZ[i]+lz*q*ri*1.1,ri*.08,ri*.5,ri*.08,KOL.chip,-q*.7,-ag,Math.PI+Math.sin(tt*10-i*.6)*.5)}
  if(rg&&rg.wg&&nw<390&&n>4){const wi=Math.min(3,n-2),ri=rR[wi],ag=rA[wi],lx=-Math.sin(ag),lz=Math.cos(ag),fl=.25+.5*Math.sin(tt*7),wc=C(rg.wg);for(const q of[1,-1])put(wingM,nw++,rX[wi]+lx*q*ri*.7,ri*1.7,rZ[wi]+lz*q*ri*.7,r*.9,r*.9,r*.9*q,wc,-q*fl,-ag,0)}
  if(rg&&rg.tl&&nc<CONE_CAP-20){const ag=rA[n-1];for(let q=0;q<rg.tl;q++){const dir=ag+Math.PI+(q-(rg.tl-1)/2)*.5+Math.sin(tt*3+q)*.2;put(coneM,nc++,rX[n-1]+Math.cos(dir)*r*1.6,r*1.1,rZ[n-1]+Math.sin(dir)*r*1.6,r*.5,r*1.6,r*.5,C(rg.tc),0,-dir,-1.2)}}
  if(hdn=="naga"&&nc<CONE_CAP-4){const dir=rA[n-1]+Math.PI;put(coneM,nc++,rX[n-1]+Math.cos(dir)*r*.9,r*.7,rZ[n-1]+Math.sin(dir)*r*.9,r*.75,r,r*.1,acc,0,-dir,-1.5708)}
  const HT=HEADS[hdn],H=r*HT.s,a=wm.angle,ca=Math.cos(a),sa=Math.sin(a),KC=sk.kc;
  if(ns<SEG_CAP-60&&nc<CONE_CAP-60&&nb<12200)for(const p of HT.p){if(p[12]&&!(rg&&rg[p[12]]))continue;const col=p[10][0]=="@"?C(rg[p[10].slice(1)]):KC[p[10]],ty=p[0];
   for(const q of p[11]?[1,-1]:[1])put(ty=="S"?segM:ty=="C"?coneM:boxM,ty=="S"?ns++:ty=="C"?nc++:nb++,hs.x+ca*p[1]*H-sa*p[2]*q*H,p[3]*H,hs.y+sa*p[1]*H+ca*p[2]*q*H,p[4]*H,p[5]*H,p[6]*H,col,p[7]*q,-a+p[8]*q,p[9])}
  if((wm.fx.shield>0||wm.inv>0)&&na<40)sph(auraM,na++,hs.x,r,hs.y,r*1.9,C("#4CC9F0"))}
 for(const[m,c]of[[foodM,nf],[gemM,ng],[segM,ns],[eyeM,ne],[coneM,nc],[boxM,nb],[potM,np],[auraM,na],[torM,nt],[scM,nsc],[glowM,ngl],[wingM,nw]]){m.count=c;m.instanceMatrix.needsUpdate=true;m.instanceColor.needsUpdate=true}
 renderer.render(scene,camera);if(st.playing)drawHud(R2);else hctx.clearRect(0,0,hud.width,hud.height)}
(raf=dead?0:requestAnimationFrame(frame));
/* INPUT */
const hp=e=>{const rt=st.size.rt,iw=innerWidth,ih=innerHeight;return rt==1?{x:e.clientY,y:iw-e.clientX,w:ih,h:iw}:rt==2?{x:ih-e.clientY,y:e.clientX,w:ih,h:iw}:{x:e.clientX,y:e.clientY,w:iw,h:ih}};
hud.onpointerdown=e=>{if(!st.playing||st.paused||e.pointerType=="mouse")return;const p=hp(e);if(st.joy){if(prof.cam==3)st.orb={id:e.pointerId,x:p.x,y:p.y};return}st.joy={id:e.pointerId,ax:p.x,ay:p.y,x:p.x,y:p.y};hud.setPointerCapture&&hud.setPointerCapture(e.pointerId)};
hud.onpointermove=e=>{if(!st.playing||st.paused)return;const p=hp(e),me=st.worms[0];if(st.orb&&st.orb.id==e.pointerId){const o=st.orb;st.faz+=(p.x-o.x)*.008;st.fpt=clamp(st.fpt+(p.y-o.y)*.006,.15,1.52);o.x=p.x;o.y=p.y;return}if(e.pointerType=="mouse"){st.ms=Math.atan2(p.y-p.h/2,p.x-p.w/2);return}
 const j=st.joy;if(!j||j.id!=e.pointerId)return;const dx=p.x-j.ax,dy=p.y-j.ay,d=Math.hypot(dx,dy);if(d>6)j.s=Math.atan2(dy,dx);if(d>JOY){j.ax=p.x-dx/d*JOY;j.ay=p.y-dy/d*JOY}j.x=p.x;j.y=p.y};
hud.onpointerup=hud.onpointercancel=e=>{if(st.joy&&st.joy.id==e.pointerId)st.joy=null;if(st.orb&&st.orb.id==e.pointerId)st.orb=null};
const bo=on=>{if(st.playing&&!st.paused)st.worms[0].boost=on},B=$("bBo");
B.onpointerdown=e=>{bo(true);B.setPointerCapture&&B.setPointerCapture(e.pointerId)};B.onpointerup=B.onpointercancel=()=>bo(false);
$("bSk").onpointerdown=()=>useSkill();
const zoomBy=f=>{prof.zm=clamp(prof.zm*f,.35,3.2)},applyCam=()=>$("zc").classList.toggle("free",prof.cam==3),setCam=v=>{prof.cam=v;if(v==3){st.faz=st.az;st.fpt=st.cp}applyCam()};
const hold=(id,fn)=>{const b=$(id);let iv=0;const stop=()=>{if(iv){clearInterval(iv);iv=0;save()}};b.onpointerdown=()=>{fn();iv=setInterval(fn,50)};b.onpointerup=b.onpointercancel=b.onpointerleave=stop};
hold("zIn",()=>zoomBy(.96));hold("zOut",()=>zoomBy(1.04));hold("yL",()=>st.faz-=.06);hold("yR",()=>st.faz+=.06);hold("pU",()=>st.fpt=clamp(st.fpt+.03,.15,1.52));hold("pD",()=>st.fpt=clamp(st.fpt-.03,.15,1.52));
$("zCam").onclick=()=>{setCam((prof.cam+1)%4);save()};hud.onwheel=e=>{e.preventDefault();zoomBy(e.deltaY>0?1.1:.9);save()};$("bPau").onclick=()=>setPause(true);$("pRes").onclick=()=>setPause(false);$("pLeave").onclick=()=>{setPause(false);if(st.net)leaveRoom();else finish("quit")};
const iv=setInterval(netBeat,2000);offs.push(()=>clearInterval(iv));
on(document,"visibilitychange",()=>{if(document.hidden&&st.playing&&!st.net)setPause(true)});
on(window,"keydown",e=>{if(e.code=="Space"){bo(true);e.preventDefault()}else if(e.code=="KeyQ"||e.code=="KeyE")useSkill();else if(e.code=="Escape"||e.code=="KeyP")setPause(!st.paused);else if(e.code=="Equal"||e.code=="NumpadAdd")zoomBy(.9);else if(e.code=="Minus"||e.code=="NumpadSubtract")zoomBy(1.1);else if(e.code=="KeyC"){setCam((prof.cam+1)%4);save()}else if(prof.cam==3&&e.code=="ArrowLeft")st.faz-=.1;else if(prof.cam==3&&e.code=="ArrowRight")st.faz+=.1;else if(prof.cam==3&&e.code=="ArrowUp")st.fpt=clamp(st.fpt+.05,.15,1.52);else if(prof.cam==3&&e.code=="ArrowDown")st.fpt=clamp(st.fpt-.05,.15,1.52)});
on(window,"keyup",e=>{if(e.code=="Space")bo(false)});
/* ONLINE (PeerJS, host-autoritatif: host menjalankan dunia, pemain lain kirim input) */
let netMsg="",codeTxt="";
const setMsg=t=>{netMsg=t;if(tab=="online")render()},q1=v=>v>0?Math.round(v*10)/10:0;
function follow(w){const gap=Math.max(9,w.r*.6);for(let i=1;i<w.segs.length;i++){const p=w.segs[i-1],s=w.segs[i],dx=p.x-s.x,dy=p.y-s.y,d=Math.hypot(dx,dy)||1;if(d>gap){s.x+=dx/d*(d-gap);s.y+=dy/d*(d-gap)}}}
function beginPlay(){lastBtn="";$("res").textContent="";$("lobby").style.display="none";$("ctl").style.display="flex";$("bPau").style.display="block";$("zc").style.display="flex";applyCam()}
function setPause(on){if(!st.playing)return;st.paused=on;$("pause").style.display=on?"flex":"none";$("pnote").textContent=st.net?"Mode online: game tetap berjalan, cacingmu tidak berhenti.":"Game dihentikan sementara.";$("pLeave").textContent=st.net?"🚪 Keluar Room":"🏠 Keluar ke Lobby";if(on){st.joy=null;st.orb=null;st.worms[0].boost=false;renderPauseSet()}}
function renderPauseSet(){const B=$("pset");B.innerHTML="";const r2=(l,g,f,gx)=>row(l,g,f,gx,renderPauseSet);B.append(el("p","","Kualitas grafik"),r2(QUAL.map(q=>q.n),()=>prof.qual,v=>prof.qual=v,1),el("p","","Jarak render (chunk)"),r2(RDN,()=>prof.rd,v=>prof.rd=v),el("p","","Latar belakang"),r2(THEMES.map(t=>t.i),()=>prof.bg,v=>{prof.bg=v;applyTheme()}),el("p","","Pandangan"),r2(CAMS.map(c=>c.n),()=>prof.cam,setCam),el("p","","Zoom"),slider())}
function leaveRoom(quiet){const n=st.net;if(!n)return;try{if(n.role=="client"&&n.conn&&n.conn.open)n.conn.send({k:"bye"});netClose(n)}catch(e){}
 st.net=null;st.playing=false;st.paused=false;$("pause").style.display="none";$("ctl").style.display="none";$("bPau").style.display="none";$("zc").style.display="none";$("lobby").style.display="flex";
 Object.assign(st,createWorld(SKINS[prof.skin],prof.name||"Kamu",prof.form));setPreview();if(!quiet)setMsg("Keluar dari room");render()}
function hostRoom(){if(!sb){setMsg("Online tidak tersedia di pratinjau ini. Jalankan di proyekmu (npm run dev / Netlify).");return}leaveRoom(true);const code=Array.from({length:5},()=>"ABCDEFGHJKMNPQRSTUVWXYZ23456789"[Math.floor(Math.random()*31)]).join("");
 const n=st.net={role:"host",code,peers:{},uid:0,acc:0,tick:0,count:()=>1+Object.keys(n.peers).length,send:(id,m)=>{const p=n.peers[id];if(p&&p.ready)p.ch.send({type:"broadcast",event:"m",payload:m})}};
 setMsg("Membuat room…");
 n.room=sb.channel("cr-"+code,{config:{broadcast:{self:false}}});
 n.room.on("broadcast",{event:"join"},({payload})=>hostJoin(payload&&payload.pid));
 n.room.subscribe(x=>{if(st.net!==n)return;if(x=="SUBSCRIBED")setMsg("Room siap. Bagikan kode "+code+" ke temanmu.");else if(x=="CHANNEL_ERROR"||x=="TIMED_OUT"){leaveRoom(true);setMsg("Gagal terhubung ke server Supabase")}})}
function hostJoin(pid){const n=st.net;if(!n||n.role!="host"||typeof pid!="string"||pid.length>20)return;
 if(n.peers[pid]){n.send(pid,{k:"hello"});return}
 const ch=sb.channel("cr-"+n.code+"-"+pid,{config:{broadcast:{self:false}}}),p=n.peers[pid]={ch,info:null,last:Date.now(),ready:false};
 ch.on("broadcast",{event:"m"},({payload})=>{p.last=Date.now();hostMsg(pid,payload)});
 ch.subscribe(x=>{if(x!="SUBSCRIBED"||!n.peers[pid])return;p.ready=true;if(Object.keys(n.peers).length>5){n.send(pid,{k:"full"});setTimeout(()=>dropPeer(pid),500)}else{n.send(pid,{k:"hello"});render()}})}
function joinRoom(code){if(!sb){setMsg("Online tidak tersedia di pratinjau ini. Jalankan di proyekmu (npm run dev / Netlify).");return}if(code.length<4){setMsg("Masukkan kode room");return}leaveRoom(true);setMsg("Menghubungkan…");
 const pid=Math.random().toString(36).slice(2,10),n=st.net={role:"client",code,pid,cw:{},acc:0,lt:0,lb:false,last:Date.now(),t0:Date.now(),ready:0};
 n.ch=sb.channel("cr-"+code+"-"+pid,{config:{broadcast:{self:false}}});
 n.conn={open:false,send:m=>n.ch.send({type:"broadcast",event:"m",payload:m})};
 n.ch.on("broadcast",{event:"m"},({payload})=>{n.last=Date.now();clientMsg(payload)});
 n.room=sb.channel("cr-"+code,{config:{broadcast:{self:false}}});
 n.knock=()=>{if(st.net===n&&n.ready>=2)n.room.send({type:"broadcast",event:"join",payload:{pid}})};
 n.ch.subscribe(x=>{if(x=="SUBSCRIBED"){n.ready++;n.knock()}else if((x=="CHANNEL_ERROR"||x=="TIMED_OUT")&&st.net===n){leaveRoom(true);setMsg("Gagal terhubung ke server Supabase")}});
 n.room.subscribe(x=>{if(x=="SUBSCRIBED"){n.ready++;n.knock()}})}
function netClose(n){const chs=n.role=="host"?[n.room,...Object.values(n.peers).map(p=>p.ch)]:[n.ch,n.room];if(n.role=="host")for(const pid in n.peers)n.send(pid,{k:"closed"});
 setTimeout(()=>chs.forEach(c=>{try{sb.removeChannel(c)}catch(e){}}),400)}
function netBeat(){const n=st.net;if(!n)return;const t=Date.now();
 if(n.role=="client"){if(!n.conn.open){if(t-n.t0>7000){leaveRoom(true);setMsg("Room tidak ditemukan");return}n.knock()}else{n.conn.send({k:"ping"});if(t-n.last>9000){leaveRoom(true);setMsg("Koneksi ke host terputus")}}}
 else for(const pid in n.peers)if(t-n.peers[pid].last>9000)dropPeer(pid)}
function spawnRemote(pid){const i=st.net.peers[pid].info,w=mkWorm(rand(300,W-300),rand(300,H-300),SKINS[i.s],i.n,false,M0,i.f);w.rid=pid;w.skI=i.k;st.worms.push(w)}
function dropPeer(pid){const n=st.net;if(!n||!n.peers[pid])return;try{sb.removeChannel(n.peers[pid].ch)}catch(e){}delete n.peers[pid];st.worms=st.worms.filter(w=>w.rid!=pid);render()}
function hostMsg(pid,m){const n=st.net,pe=n&&n.peers[pid];if(!pe||!m)return;
 if(m.k=="hi"){pe.info={n:String(m.n||"Pemain").slice(0,12),s:ix(m.s,SKINS.length,0),f:ix(m.f,FORMS.length,0),k:ix(m.sk,SK.length,0)};render();
  if(!st.playing)return n.send(pid,{k:"wait"});if(!st.worms.some(w=>w.rid==pid))spawnRemote(pid);n.send(pid,{k:"ok"})}
 else if(m.k=="bye")dropPeer(pid);else if(m.k=="ping")n.send(pid,{k:"pong"});
 else{const w=st.worms.find(x=>x.rid==pid);if(!w)return;if(m.k=="in"){w.target=norm(+m.t||0);w.boost=!!m.b}else if(m.k=="sk")useSkill(w)}}
function killRemote(a,i){const w=mkWorm(rand(300,W-300),rand(300,H-300),a.sk,a.name,false,M0,a.fi);w.rid=a.rid;w.skI=a.skI;st.worms[i]=w;if(st.net)st.net.send(a.rid,{k:"d",s:a.peak||0})}
function hostSend(dt){const n=st.net;n.acc+=dt;if(n.acc<.1)return;n.acc=0;n.tick++;
 const ws=st.worms,E=ws.map(w=>[w.uid||(w.uid=++n.uid),Math.round(w.segs[0].x),Math.round(w.segs[0].y),Math.round(w.angle*100)/100,Math.round(w.mass),SKINS.indexOf(w.sk),w.fi,w.name,(w.fx.shield>0||w.inv>0?1:0)|(w.bot?2:0)]);
 for(const pid in n.peers){const w=ws.find(x=>x.rid==pid);if(!w)continue;const h=w.segs[0],m={k:"s",w:E,me:[w.uid,q1(w.fx.speed),q1(w.fx.magnet),q1(w.fx.shield),q1(w.fx.poison),q1(w.cd)]};
  if(n.tick%3==0){const f=[];eachNear(st.grid,h.x,h.y,1400,o=>{if((o.x-h.x)**2+(o.y-h.y)**2<1960000)f.push(Math.round(o.x),Math.round(o.y),Math.round(o.v*2),Math.max(0,PAL.indexOf(o.c)),Math.round(o.r),o.k==null?-1:o.k,o.g?1:0)});m.f=f;m.p=st.pots.flatMap(p=>[Math.round(p.x),Math.round(p.y),p.t])}
  n.send(pid,m)}}
function clientMsg(m){const n=st.net;if(!n||!m)return;
 if(m.k=="hello"){n.conn.open=true;setMsg("Terhubung ke room "+n.code+". Tekan MAIN!")}
 else if(m.k=="closed"){leaveRoom(true);setMsg("Host menutup room")}
 else if(m.k=="full"){leaveRoom(true);setMsg("Room penuh (maks 6 pemain)")}
 else if(m.k=="ok"){st.playing=true;st.paused=false;n.cw={};st.grid=makeGrid();st.pots=[];st.toasts=[];beginPlay()}
 else if(m.k=="wait")setMsg("Host belum memulai game. Tunggu lalu tekan MAIN lagi.");
 else if(m.k=="t")toast(m.x);
 else if(m.k=="d"){addScore("mp",prof.name||"Kamu",m.s,prof.skin);toast("💀 Mati! "+m.s+" kg · +"+earn(m.s)+" 🪙")}
 else if(m.k=="s"&&st.playing)applySnap(m)}
function applySnap(m){const n=st.net,seen={};
 for(const e of m.w){const u=e[0];seen[u]=1;let w=n.cw[u];
  if(!w){w=n.cw[u]=mkWorm(e[1],e[2],SKINS[e[5]]||SKINS[0],e[7],false,e[4],e[6]||0);w.angle=e[3];w.segs.forEach((s,i)=>{s.x=e[1]-Math.cos(e[3])*i*9;s.y=e[2]-Math.sin(e[3])*i*9})}
  w.tx=e[1];w.ty=e[2];w.ta=e[3];w.mass=e[4];w.name=e[7];w.inv=e[8]&1?1:0;w.bot=!!(e[8]&2)}
 for(const u in n.cw)if(!seen[u])delete n.cw[u];
 const own=n.cw[m.me[0]],L=Object.values(n.cw);
 if(own){L.splice(L.indexOf(own),1);L.unshift(own);const f=own.fx;f.speed=m.me[1];f.magnet=m.me[2];f.shield=m.me[3];f.poison=m.me[4];own.cd=m.me[5]}
 if(L.length)st.worms=L;
 if(m.f){const a=m.f,G=makeGrid();for(let i=0;i<a.length;i+=7)addFood(G,{x:a[i],y:a[i+1],v:a[i+2]/2,c:PAL[a[i+3]]||"#fff",r:a[i+4],k:a[i+5]<0?undefined:a[i+5],g:a[i+6]});st.grid=G;const b=m.p,P=[];for(let i=0;i<b.length;i+=3)P.push({x:b[i],y:b[i+1],t:b[i+2]});st.pots=P}}
function clientStep(dt){const n=st.net,k=Math.min(1,dt*12);
 for(const w of st.worms){if(w.tx==null)continue;const h=w.segs[0],dx=w.tx-h.x,dy=w.ty-h.y;
  if(dx*dx+dy*dy>62500){for(const s of w.segs){s.x+=dx;s.y+=dy}}else{h.x+=dx*k;h.y+=dy*k}
  w.angle=norm(w.angle+(norm(w.ta-w.angle+Math.PI)-Math.PI)*k);
  const nn=segsFor(w.mass);for(let i=0;w.segs.length<nn&&i<3;i++){const t=w.segs[w.segs.length-1];w.segs.push({x:t.x,y:t.y})}while(w.segs.length>nn&&w.segs.length>12)w.segs.pop();
  w.r=radFor(w.mass)*(w.fm.th||1);follow(w)}
 const o=st.worms[0],h=o.segs[0];eachNear(st.grid,h.x,h.y,(o.r+30)*(o.fm.m.eat||1),f=>{const dx=f.x-h.x,dy=f.y-h.y,rr=(o.r+f.r+6)*(o.fm.m.eat||1);if(dx*dx+dy*dy<rr*rr)delFood(st.grid,f)});
 n.acc+=dt;const tg=Math.round(o.target*100)/100,bs=!!o.boost;if(n.conn&&n.conn.open&&n.acc>.1&&(bs!==n.lb||Math.abs(tg-n.lt)>.03||n.acc>1)){n.acc=0;n.lt=tg;n.lb=bs;n.conn.send({k:"in",t:tg,b:bs})}}
/* AKUN (lokal: tersimpan di perangkat ini, password di-hash) */
let accMsg="",accOk=false,accU="",accP="",accN="",accBusy=false,accDel=false;
const accName=()=>accs.cur&&accs.users[accs.cur]?accs.users[accs.cur].name:"";
async function hashPw(pw,salt){try{if(globalThis.crypto&&crypto.subtle){const en=new TextEncoder(),k=await crypto.subtle.importKey("raw",en.encode(pw),"PBKDF2",false,["deriveBits"]),b=await crypto.subtle.deriveBits({name:"PBKDF2",salt:en.encode(salt),iterations:50000,hash:"SHA-256"},k,256);return"p1:"+Array.from(new Uint8Array(b),x=>x.toString(16).padStart(2,"0")).join("")}}catch(e){}
 let h=salt+"|"+pw;for(let i=0;i<3000;i++)h=h53(h,i&15)+"|"+salt;return"h1:"+h}
const newSalt=()=>Math.random().toString(36).slice(2)+Date.now().toString(36);
const setAcc=(m,ok)=>{accMsg=m;accOk=!!ok;render()};
function applyProf(){if(!owned(SKINS[prof.skin]))prof.skin=0;pvSkin=null;skinArm=-1;skinMsg="";redeemTxt="";$("nm").value=prof.name;renderMode();fit();applyCam();applyTheme();applyDetail();setPreview();render()}
async function accRegister(){const u=accU.trim(),key=u.toLowerCase();if(accBusy)return;
 if(st.net)return setAcc("Keluar dari room online dulu.");
 if(!/^[a-z0-9_.]{3,12}$/i.test(u))return setAcc("Username 3–12 karakter: huruf, angka, _ atau titik.");
 if(accP.length<4)return setAcc("Password minimal 4 karakter.");
 if(accs.users[key])return setAcc("Username sudah dipakai di perangkat ini.");
 accBusy=true;setAcc("Membuat akun…",1);const salt=newSalt(),hash=await hashPw(accP,salt);accBusy=false;
 accs.users[key]={name:u,salt,hash,t:Date.now()};accs.cur=key;saveAcc();
 prof=parseProf(JSON.parse(JSON.stringify(prof)));prof.lb={inf:[],timed:[],mp:[]};if(!prof.name)prof.name=u.slice(0,12);save();accP="";accN="";accDel=false;
 applyProf();setAcc("🎉 Akun dibuat. Koin, skin, dan pengaturanmu ikut tersalin. Peringkat akun dimulai dari nol.",1)}
async function accLogin(){const key=accU.trim().toLowerCase(),a=accs.users[key];if(accBusy)return;
 if(st.net)return setAcc("Keluar dari room online dulu.");
 if(!a)return setAcc("Akun tidak ditemukan.");if(!accP)return setAcc("Masukkan password.");
 accBusy=true;setAcc("Memeriksa…",1);const h=await hashPw(accP,a.salt);accBusy=false;
 if(h!==a.hash)return setAcc("Password salah.");
 save();accs.cur=key;saveAcc();prof=loadProf(key);if(!prof.name)prof.name=a.name;save();accP="";accN="";accDel=false;
 applyProf();setAcc("👋 Selamat datang, "+a.name+"!",1)}
function accLogout(){if(st.net)return setAcc("Keluar dari room online dulu.");save();accs.cur="";saveAcc();prof=loadProf("");accP="";accN="";accDel=false;applyProf();setAcc("Kamu keluar. Sekarang bermain sebagai Tamu.",1)}
async function accChange(){const a=accs.users[accs.cur];if(!a||accBusy)return;if(accN.length<4)return setAcc("Password baru minimal 4 karakter.");
 accBusy=true;setAcc("Memeriksa…",1);const h=await hashPw(accP,a.salt);
 if(h!==a.hash){accBusy=false;return setAcc("Password lama salah.")}
 a.salt=newSalt();a.hash=await hashPw(accN,a.salt);accBusy=false;saveAcc();accP="";accN="";setAcc("✅ Password diganti.",1)}
function accDelete(){const key=accs.cur;if(!key)return;if(!accDel){accDel=true;return setAcc("Ketuk “Hapus akun” sekali lagi untuk menghapus permanen. Progres akun ikut hilang.")}
 delete accs.users[key];try{localStorage.removeItem(keyOf(key))}catch(e){}accs.cur="";saveAcc();prof=loadProf("");accDel=false;applyProf();setAcc("Akun dihapus.",1)}
function deviceBoard(mode){const out=[],add=(u,label)=>{const p=u===accs.cur?prof:loadProf(u);(p.lb[mode]||[]).forEach(e=>out.push({n:e.n,s:e.s,k:e.k,t:e.t,a:label}))};add("","Tamu");for(const u in accs.users)add(u,accs.users[u].name);return out.sort((x,y)=>y.s-x.s||y.t-x.t).slice(0,10)}
function renderAcc(P){const a=accs.cur?accs.users[accs.cur]:null,inp=(ph,get,set,pw)=>{const i=el("input","rc lc");i.type=pw?"password":"text";i.placeholder=ph;i.value=get();i.maxLength=pw?40:12;i.autocomplete=pw?"current-password":"username";i.autocapitalize="none";i.spellcheck=false;i.oninput=()=>set(i.value);return i};
 if(accMsg)P.appendChild(el("p",accOk?"ok":"",accMsg));
 if(a){const best=Math.max(0,...["inf","timed","mp"].map(m=>(prof.lb[m][0]||{s:0}).s));
  P.appendChild(card("👤",a.name,`Sedang masuk · 🪙 ${prof.coins} · skin ${SKINS.filter(k=>owned(k)).length}/${SKINS.length} · skor terbaik ${best} kg`,true,()=>{}));
  P.appendChild(card("🚪","Keluar akun","Kembali bermain sebagai Tamu",false,accLogout));
  P.appendChild(el("p","","Ganti password"));P.append(inp("Password lama",()=>accP,v=>accP=v,1),inp("Password baru",()=>accN,v=>accN=v,1),card("🔑","Simpan password baru","Password lama dan baru harus terisi",false,accChange));
  P.appendChild(card("🗑️",accDel?"Ketuk lagi untuk menghapus":"Hapus akun","Menghapus akun dan progresnya dari perangkat ini",false,accDelete))}
 else{P.appendChild(el("p","","Kamu bermain sebagai Tamu. Buat akun supaya koin, skin, dan peringkat tersimpan terpisah per akun."));
  P.append(inp("Username",()=>accU,v=>accU=v),inp("Password",()=>accP,v=>accP=v,1));
  const r=el("div","rcrow"),b1=el("button","rcb","Masuk"),b2=el("button","rcb alt","Daftar");b1.onclick=accLogin;b2.onclick=accRegister;r.append(b1,b2);P.appendChild(r)}
 P.appendChild(el("p","pw","🔒 Akun tersimpan di perangkat ini saja (password di-hash) dan belum sinkron antar perangkat."))}
/* LOBBY */
let tab="cacing",rankScope=0;
const TABS=[["cacing","🪱","Cacing"],["skin","🎨","Skin"],["skill","⚡","Skill"],["dunia","🌄","Dunia"],["online","👥","Online"],["rank","🏆","Peringkat"],["gfx","⚙️","Grafik"],["akun","👤","Akun"]];
function buildTabs(){const T=$("tabs");T.innerHTML="";TABS.forEach(([k,i,t])=>{const b=el("button","");b.append(el("span","ti",i),el("span","",t));b.onclick=()=>{tab=k;accDel=false;render()};T.appendChild(b)})}
const el=(tag,cls,txt)=>{const e=document.createElement(tag);if(cls)e.className=cls;if(txt!=null)e.textContent=txt;return e};
const card=(ico,t,d,on,fn,css)=>{const b=el("button","cd"+(on?" on":"")),i=el("i","sw",ico),x=el("span","tx");if(css)i.style.background=css;x.append(el("b","",t),el("small","",d));b.append(i,x);b.onclick=fn;return b};
const slider=()=>{const i=el("input","zs");i.type="range";i.min=.35;i.max=3.2;i.step=.05;i.value=prof.zm;i.oninput=()=>{prof.zm=+i.value};i.onchange=save;return i};
const row=(list,get,set,gfx,again=()=>render())=>{const r=el("div","chips");list.forEach((o,i)=>{const b=el("button",get()==i?"on":"",o);b.onclick=()=>{set(i);save();if(gfx)fit();again()};r.appendChild(b)});return r};
function render(){const T=$("tabs"),P=$("pane");$("coin").textContent="🪙 "+prof.coins;P.innerHTML="";$("go").textContent=st.net?"MAIN ONLINE":"MAIN";P.className=tab=="skin"||tab=="cacing"||tab=="dunia"?"g2":"";
 if(!T.children.length)buildTabs();[...T.children].forEach((b,j)=>{const k=TABS[j][0];b.className=tab==k?"on":"";if(k=="akun")b.lastChild.textContent=accs.cur?accName().slice(0,7):"Akun"});
 {const ab=T.children[TABS.findIndex(t=>t[0]==tab)];if(ab){if(ab.offsetLeft<T.scrollLeft)T.scrollLeft=ab.offsetLeft;else if(ab.offsetLeft+ab.offsetWidth>T.scrollLeft+T.clientWidth)T.scrollLeft=ab.offsetLeft+ab.offsetWidth-T.clientWidth}}
 if(tab=="cacing")FORMS.forEach((f,i)=>P.appendChild(card(f.i,f.n,f.d+" "+f.p,prof.form==i,()=>{prof.form=i;save();setPreview();render()})));
 else if(tab=="skin"){
  P.appendChild(el("p","hd",`🪙 ${prof.coins} koin · koin didapat tiap selesai main`));
  const rw=el("div","hd rcrow"),inp=el("input","rc");inp.placeholder="Kode hadiah";inp.maxLength=16;inp.value=redeemTxt;inp.oninput=()=>{redeemTxt=inp.value.toUpperCase().replace(/[^A-Z0-9]/g,"")};
  const bt=el("button","rcb","Tukar");bt.onclick=()=>redeem(redeemTxt);rw.append(inp,bt);P.appendChild(rw);
  if(skinMsg)P.appendChild(el("p","hd",skinMsg));
  [["Gratis",0],["Beli dengan koin 🪙",1],["Eksklusif · tukar kode 🎁",2]].forEach(([h,t])=>{P.appendChild(el("p","hd",h));SKINS.forEach((k,i)=>{if(k.tier!=t)return;const ow=owned(k);P.appendChild(card(k.i||"",k.n,ow?(k.rig?"Karakter beranimasi":k.tier?"Dimiliki":"Skin"):(k.tier==2?"🔒 Butuh kode":"🔒 "+k.price+" 🪙"),(prof.skin==i&&ow)||pvSkin==i,()=>pickSkin(i),k.css))})})}
 else if(tab=="skill")SK.forEach((k,i)=>P.appendChild(card(k.i,k.n,k.d+" · jeda "+k.cd+" dtk · biaya 2% berat",prof.skill==i,()=>{prof.skill=i;save();render()})));
 else if(tab=="online"){const n=st.net;
  P.appendChild(el("p","",n?(n.role=="host"?`Kamu host · Kode room: ${n.code} · ${n.count()} pemain`:`Terhubung ke room ${n.code}`):"Main bareng teman lewat internet."));
  if(netMsg)P.appendChild(el("p","",netMsg));
  if(n)P.appendChild(card("🚪","Keluar room","Putuskan koneksi",false,()=>leaveRoom()));
  else{P.appendChild(card("🏠","Buat room","Kamu jadi host, teman gabung pakai kode",false,()=>hostRoom()));
   const i=el("input","rc");i.placeholder="Kode room";i.maxLength=5;i.value=codeTxt;i.oninput=()=>{codeTxt=i.value.toUpperCase().replace(/[^A-Z0-9]/g,"")};
   P.append(i,card("🔗","Gabung room","Masukkan kode dari host",false,()=>joinRoom(codeTxt)))}}
 else if(tab=="dunia"){P.appendChild(el("p","hd","Latar belakang"));
  THEMES.forEach((t,i)=>P.appendChild(card(t.i,t.n,t.d,prof.bg==i,()=>{prof.bg=i;save();applyTheme();render()},`linear-gradient(${t.bg},${t.gr})`)));
  P.appendChild(el("p","hd","Jenis makanan dan berat yang didapat"));
  FK.forEach(f=>P.appendChild(card(f.i,f.n,`+${f.v} kg · ${f.w>=.1?"umum":f.w>=.06?"cukup umum":f.w>=.03?"langka":"sangat langka"}`,false,()=>{})))}
 else if(tab=="akun")renderAcc(P);
 else if(tab=="rank"){const mk2=st.net?"mp":prof.mode,a=rankScope?deviceBoard(mk2):prof.lb[mk2];P.appendChild(row(["Pribadi","Semua akun"],()=>rankScope,v=>rankScope=v));
  P.appendChild(el("p","",(mk2=="mp"?"Peringkat Online":mk2=="inf"?"Peringkat mode Bebas":"Peringkat mode 5 Menit")+(rankScope?" · semua akun di perangkat ini":accs.cur?" · "+accName():" · Tamu")));
  if(!a.length)P.appendChild(el("p","","Belum ada skor. Ayo main!"));a.forEach((e,i)=>P.appendChild(el("div","rk",`${i+1}. ${SKINS[e.k].i||"🏳️"} ${e.n}${e.a&&e.a!=e.n?" ("+e.a+")":""} — ${e.s} kg`)))}
 else P.append(el("p","","Kualitas grafik"),row(QUAL.map(q=>q.n),()=>prof.qual,v=>prof.qual=v,1),el("p","","Kehalusan skin cacing"),row(SMS.map(s=>s.n),()=>prof.sm,v=>{prof.sm=v;applyDetail()}),el("p","","Jarak render (chunk, seperti Minecraft)"),row(RDN,()=>prof.rd,v=>prof.rd=v),el("p","","1 chunk = 250 unit. Auto menyesuaikan zoom dan kualitas grafik."),el("p","","Garis batas chunk"),row(["Mati","Hidup"],()=>prof.cl,v=>prof.cl=v),el("p","","Pandangan"),row(CAMS.map(c=>c.n),()=>prof.cam,setCam),el("p","","Zoom (bisa juga diubah saat main)"),slider(),el("p","","Layar"),row(["Tegak","Horizontal kiri","Horizontal kanan"],()=>prof.rot,v=>prof.rot=v,1))}
function renderMode(){const m=$("mdl");m.innerHTML="";[["inf","∞ Bebas"],["timed","5 Menit"]].forEach(([v,t])=>{const b=el("button",prof.mode==v?"on":"",t);b.onclick=()=>{prof.mode=v;save();renderMode();render()};m.appendChild(b)})}
$("nm").value=prof.name;renderMode();render();
$("rotb").onclick=()=>{prof.rot=(prof.rot+1)%3;save();fit();render()};
$("go").onclick=()=>{prof.name=$("nm").value.trim().slice(0,12)||accName().slice(0,12);save();const nm=prof.name||"Kamu",n=st.net;if(!owned(SKINS[prof.skin]))prof.skin=0;pvSkin=null;
 if(prof.rot){try{const d=document.documentElement;d.requestFullscreen&&d.requestFullscreen().then(()=>screen.orientation.lock("landscape")).catch(()=>{})}catch(e){}}
 if(n&&n.role=="client"){if(!n.conn||!n.conn.open){tab="online";setMsg("Belum terhubung ke host");render();return}n.conn.send({k:"hi",n:nm,s:prof.skin,f:prof.form,sk:prof.skill});setMsg("Meminta masuk…");return}
 Object.assign(st,createWorld(SKINS[prof.skin],nm,prof.form,n?16:BOTS),{mode:n?"inf":prof.mode,timeLeft:300,peak:0,joy:null,toasts:[],zoom:1,paused:false,top:null});
 st.worms[0].skI=prof.skill;
 if(n)for(const pid in n.peers)if(n.peers[pid].info){spawnRemote(pid);n.send(pid,{k:"ok"})}
 st.playing=true;beginPlay()};

return () => { dead = true; cancelAnimationFrame(raf); offs.forEach((f) => f()); renderer.dispose(); };
}

export default function CacingRakus() {
  useEffect(() => {
    try {
      return startGame();
    } catch (e) {
      console.error(e);
      const r = document.getElementById("res");
      if (r) r.textContent = "⚠️ Error: " + (e && e.message ? e.message : e);
    }
  }, []);
  return (
    <>
      <style>{CSS}</style>
      <div id="pr" />
      <div id="stage"><div id="box"><canvas id="gl" /><canvas id="hud" /></div>
      <div id="ctl"><button id="bSk">💨</button><button id="bBo">⚡</button></div>
      <div id="zc"><button id="zIn">＋</button><button id="zOut">－</button><button id="zCam">📷</button><div id="zfree"><button id="yL">◀</button><button id="yR">▶</button><button id="pU">▲</button><button id="pD">▼</button></div></div>
      <button id="bPau">⏸</button>
      <div id="pause"><div className="pbox"><h2>⏸ Jeda</h2><p id="pnote" /><div id="pset" /><button id="pRes">▶ Lanjut</button><button id="pLeave">🏠 Keluar ke Lobby</button></div></div>
      <div id="lobby">
        <div id="top"><div id="brand">🪱 Cacing Rakus</div><div id="coin">🪙 0</div><input id="nm" maxLength={12} placeholder="Nama kamu" /><button id="rotb">🔄 Layar</button></div>
        <div id="res" />
        <div id="sheet">
          <div id="tabs" />
          <div id="pane" />
          <div id="bar"><div className="chips" id="mdl" /><button id="go">MAIN</button></div>
        </div>
      </div>
      </div>
    </>
  );
}
