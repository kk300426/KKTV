// KKTV channel list. Replace logoText/logoBg with official logo image URLs if you have permission to use them.
const channels = [
 {name:"Zee Tamil HD",category:"Tamil Entertainment",url:"https://d2o8pibksxtln6.cloudfront.net/live/media/Zee_Tamil_HD/hls/Zee_Tamil_HD.m3u8",logoText:"ZEE",logoBg:"linear-gradient(135deg,#8e1b36,#e84c59)"},
 {name:"Sun TV",category:"Tamil Entertainment",url:"https://d2px1d6ssc60fw.cloudfront.net/SunTV/SunTV-HDR10-IN-index.m3u8",logoText:"SUN",logoBg:"linear-gradient(135deg,#e44a19,#f8a51b)"},
 {name:"Star Vijay",category:"Tamil Entertainment",url:"https://da86m1sqpm3o0.cloudfront.net/28072023/smil:starvijayuk.smil/playlist.m3u8",logoText:"VIJAY",logoBg:"linear-gradient(135deg,#1745a5,#27a8e0)"},
 {name:"Colors Tamil HD",category:"Tamil Entertainment",url:"https://da86m1sqpm3o0.cloudfront.net/28072023/smil:colorstamilhd11.smil/playlist.m3u8",logoText:"COLORS",logoBg:"linear-gradient(135deg,#57218c,#df3e9b)"},
 {name:"7S Music",category:"Music",url:"https://cdn.pishow.tv/ott/live/1279/master.m3u8",logoText:"7S",logoBg:"linear-gradient(135deg,#d91e72,#5424a8)"},
 {name:"Isai Aruvi",category:"Music",url:"https://segment.yuppcdn.net/140622/isaiaruvi/playlist.m3u8",logoText:"ISAI ARUVI",logoBg:"linear-gradient(135deg,#087e8b,#23b5af)"},
 {name:"Star Movies Select",category:"Movies",url:"https://livetv.shamon-cable.net:8443/Star-movies-select/index.m3u8",logoText:"STAR MOVIES",logoBg:"linear-gradient(135deg,#142b5a,#526d9e)"},
 {name:"History Channel",category:"Knowledge",url:"https://amg01448-amg01448c16-samsung-in-3495.playouts.now.amagi.tv/playlist/amg01448-samsungindia-historychannelenglish-samsungin/playlist.m3u8",logoText:"HISTORY",logoBg:"linear-gradient(135deg,#8d2020,#d18a31)"},
 {name:"CN Network",category:"Kids",url:"http://103.135.253.32:8080/CN-NETWORK/index.m3u8",logoText:"CN",logoBg:"linear-gradient(135deg,#171717,#4a4a4a)"},
 {name:"Makkal TV",category:"Tamil Entertainment",url:"https://5k8q87azdy4v-hls-live.wmncdn.net/MAKKAL/271ddf829afeece44d8732757fba1a66.sdp/playlist.m3u8",logoText:"மக்கள்",logoBg:"linear-gradient(135deg,#176b4a,#36a56d)"},
 {name:"News Tamil",category:"News",url:"https://stream.ottlive.co.in/newstamil/index.m3u8",logoText:"NEWS TAMIL",logoBg:"linear-gradient(135deg,#9c1b29,#e14c4c)"},
 {name:"News18 Tamil Nadu",category:"News",url:"https://n18syndication.akamaized.net/bpk-tv/News18_Tamil_Nadu_NW18_MOB/output01/master.m3u8",logoText:"NEWS18",logoBg:"linear-gradient(135deg,#8d1524,#d52d3d)"},
 {name:"PiShow Live 1243",category:"Other",url:"https://cdn.pishow.tv/ott/live/1243/master.m3u8",logoText:"PISHOW",logoBg:"linear-gradient(135deg,#2853a4,#743fc1)"},
 {name:"PiShow Live 1257",category:"Other",url:"https://cdn.pishow.tv/ott/live/1257/master.m3u8",logoText:"PISHOW",logoBg:"linear-gradient(135deg,#2853a4,#743fc1)"},
 {name:"News J",category:"News",url:"https://cdn.pishow.tv/ott/live/1498/master.m3u8",logoText:"NEWS J",logoBg:"linear-gradient(135deg,#14569b,#23a4d6)"},
 {name:"News7 Tamil",category:"News",url:"https://cdn.pishow.tv/ott/live/1245/master.m3u8",logoText:"NEWS7",logoBg:"linear-gradient(135deg,#a31929,#e04b3f)"},
 {name:"Polimer News",category:"News",url:"https://cdn.pishow.tv/ott/live/1245/master.m3u8",logoText:"POLIMER",logoBg:"linear-gradient(135deg,#1a3e85,#e33c4b)",note:"The supplied message did not include a separate Polimer News URL; currently using the News7 URL as a placeholder."}
];

const video = document.getElementById("video");
const grid = document.getElementById("channelGrid");
const filters = document.getElementById("filters");
const statusEl = document.getElementById("status");
let currentIndex = -1, hls = null, activeCategory = "All";
const categories = ["All", ...new Set(channels.map(c => c.category))];

function setStatus(message){ statusEl.textContent = message; }
function renderFilters(){
  filters.innerHTML = "";
  categories.forEach(category => {
    const b = document.createElement("button");
    b.className = "filter" + (category === activeCategory ? " active" : "");
    b.textContent = category;
    b.addEventListener("click", () => { activeCategory = category; renderFilters(); renderChannels(); });
    filters.appendChild(b);
  });
}
function renderChannels(){
  const shown = channels.map((c,i)=>({...c,index:i})).filter(c=>activeCategory==="All"||c.category===activeCategory);
  grid.innerHTML = "";
  shown.forEach(c=>{
    const card = document.createElement("button");
    card.className = "channel-card" + (c.index===currentIndex?" selected":"");
    card.dataset.index = c.index;
    card.innerHTML = `<div class="channel-logo" style="--logo-bg:${c.logoBg}">${c.logoText}</div><div class="channel-name"></div><div class="channel-type"></div><div class="card-live">● LIVE CHANNEL</div>`;
    card.querySelector(".channel-name").textContent = c.name;
    card.querySelector(".channel-type").textContent = c.category;
    card.addEventListener("click",()=>playChannel(c.index));
    grid.appendChild(card);
  });
  document.getElementById("channelCount").textContent = `${shown.length} CHANNELS`;
}
function playChannel(index){
  if(index<0||index>=channels.length)return;
  currentIndex=index;
  const c=channels[index];
  document.getElementById("channelTitle").textContent=c.name;
  document.getElementById("channelCategory").textContent=c.category;
  document.getElementById("nowPlaying").textContent=c.name.toUpperCase();
  document.getElementById("overlayTitle").textContent=c.name;
  document.getElementById("overlayLogo").textContent=c.logoText;
  document.getElementById("playerOverlay").classList.remove("hidden");
  if(hls){hls.destroy();hls=null;}
  video.pause(); video.removeAttribute("src"); video.load();
  setStatus("Connecting to "+c.name+"…");
  if(c.note) setStatus(c.note);
  // Native HLS is preferred on Samsung TV browsers; hls.js is the fallback.
  if(video.canPlayType("application/vnd.apple.mpegurl")){
    video.src=c.url; video.load();
    video.play().then(()=>{document.getElementById("playerOverlay").classList.add("hidden");setStatus("Playing "+c.name);}).catch(()=>setStatus("Press OK/Play to start. The stream may be unavailable or blocked."));
  } else if(window.Hls && Hls.isSupported()){
    hls=new Hls({enableWorker:false});
    hls.loadSource(c.url); hls.attachMedia(video);
    hls.on(Hls.Events.MANIFEST_PARSED,()=>video.play().then(()=>{document.getElementById("playerOverlay").classList.add("hidden");setStatus("Playing "+c.name);}).catch(()=>setStatus("Press Play to start "+c.name)));
    hls.on(Hls.Events.ERROR,(_,data)=>{if(data.fatal)setStatus("Unable to play this stream. It may be offline, blocked, or require an authorized source.");});
  } else {
    setStatus("This TV browser does not support HLS playback. Try a newer browser or a compatible HLS player.");
  }
  renderChannels();
}
document.getElementById("prevBtn").addEventListener("click",()=>playChannel((currentIndex-1+channels.length)%channels.length));
document.getElementById("nextBtn").addEventListener("click",()=>playChannel((currentIndex+1)%channels.length));
document.getElementById("fullscreenBtn").addEventListener("click",()=>{const el=document.getElementById("playerWrap");if(el.requestFullscreen)el.requestFullscreen();else if(video.webkitEnterFullscreen)video.webkitEnterFullscreen();});
video.addEventListener("playing",()=>document.getElementById("playerOverlay").classList.add("hidden"));
video.addEventListener("error",()=>setStatus("Playback error. Check the stream URL, network access, and provider permissions."));
video.addEventListener("keydown",e=>{if(e.key==="Escape"||e.key==="Backspace")video.pause();});

// Keyboard / TV remote navigation: arrows move focus, OK/Enter selects, channel +/- changes channel.
document.addEventListener("keydown",e=>{
  if(["ArrowUp","ArrowDown","ArrowLeft","ArrowRight","Enter"," "].includes(e.key)) {
    const tag=document.activeElement?.tagName;
    if(tag==="VIDEO" && e.key===" ") return;
    if(e.key==="ArrowRight"||e.key==="ArrowLeft"){
      const cards=[...document.querySelectorAll(".channel-card")];
      const i=cards.indexOf(document.activeElement);
      if(i>=0){e.preventDefault();cards[Math.max(0,Math.min(cards.length-1,i+(e.key==="ArrowRight"?1:-1)))].focus();return;}
    }
  }
  if(e.key==="PageDown"||e.key==="ChannelDown")playChannel((currentIndex+1+channels.length)%channels.length);
  if(e.key==="PageUp"||e.key==="ChannelUp")playChannel((currentIndex-1+channels.length)%channels.length);
  if(e.key==="Escape"||e.key==="Backspace"){if(document.fullscreenElement)document.exitFullscreen();}
});
function updateClock(){document.getElementById("clock").textContent=new Date().toLocaleTimeString([], {hour:"2-digit",minute:"2-digit"});}
setInterval(updateClock,10000);updateClock();renderFilters();renderChannels();
