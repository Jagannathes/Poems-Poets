//const fetch = require("node-fetch");

// this function will be called once the homepage is loaded
async function onLoad(){
    //fetching information about 20 random poems from poetrydb API and convertig to json 
    const _poem = await fetch("https://poetrydb.org/random/20")
    const poem = await _poem.json()
    console.log(poem)
    //variable for storing the content to be displayed in HTML
    var newsCard = ""
    for(let i=0, n = poem; i < poem.length;i++)
	{

     newsCard = newsCard+"<div onclick=\"window.location=\'result.html?"+n[i].title+"\';\"><h4>"+n[i].title+"</h4><h5>"+n[i].author+"</h5>";
     //  loop for iterating through the first 4 lines of the poem and adding them to newsCard variable 

     for(let j=0, m=n[i].lines; j<Math.min(4,n[i].lines.length);j++){
        newsCard = newsCard+m[j]+"<br>";
     }


     newsCard+="</div>"
                     
    }
    // selecting  HTML div based on its ID and changing its content to that of newsCard variable 
    tophead=document.getElementById("tophead")
    tophead.innerHTML=newsCard;
}

onLoad(); 