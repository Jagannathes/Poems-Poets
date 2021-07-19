//const fetch = require("node-fetch");
async function forced(){
    const _news = await fetch("https://newsapi.org/v2/top-headlines?country=in&apiKey=5b7484d18ce84ca8ae8cec6ebe0ffc85")
    const news = await _news.json()
    console.log(news)
    var newsCard = ""
    for(let i=0, n = news.articles; i < news.articles.length;i++)
	{

     newsCard = newsCard+"<div><a href=${n[i].url}><img src="+n[i].urlToImage+"><br><h4>"+n[i].title+"</h4>"+n[i].description+"</a> </div>"
                     
    }
    tophead=document.getElementById("tophead")
    tophead.innerHTML=newsCard;
}
forced(); 