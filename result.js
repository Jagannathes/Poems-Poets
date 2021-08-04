
async function onload(){
var Url = await window.location.href;
// readsd the current page url and stores its as a string variable
console.log(Url)
let params = (new URL(Url)).searchParams
 var title = params.get('title')
let _poem = await fetch("https://poetrydb.org/title/"+title+":abs")
var poem = await _poem.json()
console.log(_poem)
if(poem.status != 404 ){
console.log(title)

console.log(poem)
var poemCard = `<br><h3>${poem[0].title}</h3><h4>${poem[0].author.toUpperCase()}</h4><br><div>`
for(let j=0, m=poem[0].lines; j<poem[0].lines.length;j++){
    poemCard = poemCard+m[j]+"<br>";
 }
 poemCard+="</div>"
 tophead=document.getElementById("main")
 tophead.innerHTML=poemCard;
 document.getElementById("loader").remove();
}
else{
   let nfp = document.getElementById("loader")
   nfp.innerHTML = "<h2>Page not found</h2>"
}
return;
}
if ("serviceWorker" in navigator) {
   // register service worker
   navigator.serviceWorker.register("service-worker.js");
 }
onload();

