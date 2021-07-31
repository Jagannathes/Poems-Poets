async function onload(){
var Url = await window.location.href;
// readsd the current page url and stores its as a string variable
console.log(Url)
let params = (new URL(Url)).searchParams
 var title = params.get('title')
let _poem = await fetch("https://poetrydb.org/title/"+title+":abs")
console.log(title)
let poem = await _poem.json()
console.log(poem)
var poemCard = "<h2>"+poem[0].title+"</h2>"
for(let j=0, m=poem[0].lines; j<poem[0].linecount;j++){
    poemCard = poemCard+m[j]+"<br>";
 }
 tophead=document.getElementById("main")
 tophead.innerHTML=poemCard;
 document.getElementById("loader").remove();
}
onload();