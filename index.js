//const fetch = require("node-fetch");
var newsCard = "<h2>Randam Picks</h2><div class =\'random\'>"
// this function will be called once the homepage is loaded
async function onLoad(){
    //fetching information about 20 random poems from poetrydb API and convertig to json 
    let _poem = await fetch("https://poetrydb.org/random/20")
    let poem = await _poem.json()
    console.log(poem)
    //variable for storing the content to be displayed in HTML
    
    for(let i=0, n = poem; i < poem.length;i++)
	{

     newsCard = newsCard+"<a href ='result.html?title="+n[i].title+"\'><div><h4>"+n[i].title+"</h4><h5>BY "+n[i].author.toUpperCase()+"</h5>";
     //  loop for iterating through the first 4 lines of the poem and adding them to newsCard variable 

     for(let j=0, m=n[i].lines; j<Math.min(2,n[i].lines.length);j++){
        newsCard = newsCard+m[j]+"<br>";
     }


     newsCard+="</div></a>"
                     
    }
    newsCard+="</div>"
    // selecting  HTML div based on its ID and changing its content to that of newsCard variable 
    tophead=document.getElementById("tophead")
    tophead.innerHTML=newsCard;
    // removes the division containing loading animation 
    document.getElementById("loader").remove();
}

onLoad(); 
var searchPoems = document.getElementById("search");
const drawListPoems = async () => {
    if(searchPoems.value!= ""){
        let resultDiv=document.getElementById("tophead")
        resultDiv="<div class = \"loadresult\"><div>"+newsCard;
        let _poem = await fetch('https://poetrydb.org/title/'+searchPoems.value)
        let poem = await _poem.json()
        console.log(poem);
        //variable for storing the content to be displayed in HTML
        let result = "<div class =\'result\'>"
        for(let i=0, n = poem; i < Math.min(6,poem.length);i++)
        {
    
         result =  result+"<div><h4><a href ='result.html?title="+n[i].title+"\'>"+n[i].title+"</a></h4><h5>BY "+n[i].author.toUpperCase()+"</h5>";
         //  loop for iterating through the first 4 lines of the poem and adding them to newsCard variable 
    
         for(let j=0, m=n[i].lines; j<Math.min(2,n[i].lines.length);j++){
            result = result+m[j]+"<br>";
         }
    
    
         result+="</div>"
        }  
        result+="</div>"
        resultDiv=document.getElementById("tophead")
        resultDiv.innerHTML = "<h2>Results</h2>"+result+newsCard;               
    }
}

const debounce = (fn, time, to = 0) => {
    to ? clearTimeout(to) : (to = setTimeout(drawListPoems, time));
  };

  
searchPoems.addEventListener("input", () => debounce(drawListPoems, 1000));
