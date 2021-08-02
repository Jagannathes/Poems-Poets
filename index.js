//const fetch = require("node-fetch");
var newsCard = "<br><h2>Random Picks</h2><br><div class =\'random\'>"
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
        resultDiv.innerHTML="<div id = \"sload\" class = \"sload\"><br><br><br><br><div class = \"dots-9\" id = \"dots-9\"></div><br><br><br><br></div>"+newsCard;
        let _poem = await fetch('https://poetrydb.org/title/'+searchPoems.value)
        let _poemA = await fetch('https://poetrydb.org/author/'+searchPoems.value)
        let poem = await _poem.json()
        let poemA = await _poemA.json()
     if(poem.status!=404&&poemA.status!=404)  var resPoem =  {...poemA,...poem}
     else if(poem.status!=404)var resPoem = poem
     else var resPoem = poemA
       
        console.log(resPoem)
        console.log(resPoem.length)
        if(poem.status!=404||poemA.status!=404){
            
             //variable for storing the content to be displayed in HTML
             let result = "<div class =\'result\'>"
             for(let i=0, n = resPoem; i < Math.min(15,Object.keys(resPoem).length);i++)
             {
    
                  result =  result+"<a href ='result.html?title="+n[i].title+"\'><div><h4>"+n[i].title+"</h4><h5>BY "+n[i].author.toUpperCase()+"</h5>";
                  //  loop for iterating through the first 4 lines of the poem and adding them to newsCard variable 
    
                  for(let j=0, m=n[i].lines; j<Math.min(2,n[i].lines.length);j++)
                  {
                    result = result+m[j]+"<br>";
                   }
    
    
                result+="</div></a>"
             }  
             result+="</div>"
        
        
             resultDiv.innerHTML = "<br><h2>Results</h2><br>"+result+newsCard;    }
        else 
        {
            resultDiv.innerHTML="<div id = \"sload\" class = \"sload\"><br><br><br><br><h3>Sorry, no relevant results were found </h3><br><br><br><br></div>"+newsCard;
        }           
    }
    else{
        let resultDiv=document.getElementById("tophead")
        resultDiv.innerHTML =  newsCard;
    }
}

const debounce = (fn, time, to = 0) => {
    to ? clearTimeout(to) : (to = setTimeout(drawListPoems, time));
  };

  
searchPoems.addEventListener("input", () => debounce(drawListPoems, 3000));
