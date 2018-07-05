/*
  Please add all Javascript code to this file.
*/

/**
 * create array/object with list of api keys, urls, and translation tables for variables retrieved
 * create array/object for article data to be dumped into
 * create functions to populate data from each api
 */

//api set up data
var apis = {
	nyt:{
		source:'The New York Times',
		returnResult:'results',
		apikey:'3a2be41461714996a25b6f9a46daa606',
		url:'https://api.nytimes.com/svc/mostpopular/v2/mostviewed/all-sections/7.json?api-key=3a2be41461714996a25b6f9a46daa606',
		subthumb:'',
		defaultthumb:'http://www.eatdimestore.com/wp-content/uploads/2017/05/new-york-times-logo.jpg',
		translate:{
			pk:'url',
			type:'type',
			section1:'section',
			section2:'type',
			date:'published_date',
			title:'title',
			author:'byline',
			url:'url',
			thumb:'media[0][\'media-metadata\'][0].url',
			thumb_alt:'media[0].caption',
			abrev:'abstract',
			impressions:'',
		}
	},
	guardian:{
		source:'The Guardian',
		returnResult:'response.results',
		apikey:'cab434ec-44d1-4d51-a16e-d7c116819d03',
		url:'https://content.guardianapis.com/search?api-key=cab434ec-44d1-4d51-a16e-d7c116819d03',
		subthumb:'',
		defaultthumb:'https://i.vimeocdn.com/portrait/23154888_300x300',
		translate:{
			pk:'id',
			type:'type',
			section1:'sectionId',
			section2:'sectionName',
			date:'webPublicationDate',
			title:'webTitle',
			author:'',
			url:'webUrl',
			thumb:'',
			abrev:'',
			impressions:'',
		}
	},
};

var articles = [];
var source_menu = '<li><a class="newssource" href="#all">All</a></li>';
var request = new XMLHttpRequest();

//$('#sources > li:nth-child(2) > a').click(function() {
//$('#sources > li:nth-child(2)').click(function() { //doesn't work
//$('#sources > li').click(function() { //doesn't work
//$('#sources li').click(function() { //doesn't work
//$('#sources').click(function() { //works
//document.getElementById("sources").addEventListener("click", alert('displayDate'));

/*$("a").click(function() {
  alert("Handler for .click() called.");
  console.log(this);
});*/

function loopThroughApis(apis){
	for(api in apis){
		source_menu += '<li><a class="newssource" href="#'+api+'">'+apis[api].source+'</a></li>'
		var requestURL = apis[api].url;
		var request = new XMLHttpRequest();
		var aliases = apis[api].translate;
		request.addEventListener('load', function(){
			//console.log('ddtest011a', JSON.parse(this.responseText));
			var myData = JSON.parse(request.response);
			//loop through results and push values to articles array
			for(res in myData.results){
				var temp = {};
				//loop through aliases and load result values into object to pass into articles array
				for(alias in aliases){
					//add value and key to object to be passed to articles
					if(alias == 'thumb'){
						temp[alias] = eval('myData.results[res].'+aliases[alias]);
					}else{
						temp[alias] = myData.results[res][aliases[alias]];
					}
					if(alias == 'impressions'){
						if(aliases[alias] == ''){
							temp[alias] = '';
						}
					}
				}
				//console.log('temp', temp);
				//add value and key object to articles array
//console.log('temp', temp);
				articles.push(temp);
			}
//console.log('articles!!!!!!', articles);

	//update the source menu options
//console.log('ddtest303');
			$('#sources').html(source_menu);
//console.log('ddtest304');
			populateArticles(articles, apis[api].subthumb, apis[api].defaultthumb);
//console.log('ddtest305');
		});

//console.log('ddtest300');
		request.open('GET', requestURL);
//console.log('ddtest301');
		request.send();
//console.log('ddtest302');
	}
}

function populateArticles(articles, subthumb, defaultthumb){
//console.log('ddtestAA');
	var html_result = '';
	for(i = 0; i < articles.length; ++i){
//console.log('ddtestAB', articles[i]);
/*console.log('THUMB01!', articles[i].thumb);
console.log('THUMB02!', eval(articles[i].thumb));
console.log('THUMB03!', eval(articles[i].thumb+'[0].url'));
console.log('THUMB04 - ', eval(articles[i].thumb+'[0]'))
console.log('THUMB04!', eval('articles[i].thumb'+subthumb));*/
//console.log('articles[i].thumb'+subthumb);
//console.log(eval('articles[i].thumb'+subthumb));
		var thumb_url = (subthumb != '') ? eval('articles[i].thumb'+subthumb) : articles[i].thumb;
//console.log('ddtest thumb1', thumb_url);
		if(thumb_url == ''){
			thumb_url == defaultthumb;
//console.log('ddtest thumb2', thumb_url);
		}
//		var thumb = 
		html_result += '<article class="article">';
		html_result +=  '<section class="featuredImage">';
		html_result +=   '<img src="'+thumb_url+'" alt="'+articles[i].title+'">';
		html_result +=  '</section>';
		html_result +=  '<section class="articleContent">';
		html_result +=   '<a href="#"><h3>'+articles[i].title+'</h3></a>';
		html_result +=   '<h6>'+(articles[i].section1 != undefined ? (articles[i].section1+' ') : '');
		html_result +=          (articles[i].section2 != undefined ? articles[i].section2 : '');
		html_result +=          ': '+articles[i].abrev+'</h6>';
		html_result +=  '</section>';
		html_result +=  '<section class="impressions">'+articles[i].impressions+'</section>';
		html_result +=  '<div class="clearfix"></div>';
		html_result += '</article>';
	}
//console.log('html_result!!!', html_result);
	$('#main').html(html_result);
}

loopThroughApis(apis);

/***
function loadApi(api){
	var requestURL = api.url;
	var request = new XMLHttpRequest();
	request.open('GET', requestURL);
	request.send();
};

function parseApi(){
	request.onload = function() {
    var x = JSON.parse(request.response);
    console.log(x.results[0].webTitle);
    var title = x.results[0].webTitle;
    function addToDOM(data, element) {
        var articles = $(".articleContent");
        //var h3s = document.querySelectorAll("H3");
        for (var i = 0; i < articles.length; i++) {
            var articleTitle = $(articles[i]).find("h3")[0];
            articleTitle.innerHTML = x.results[i].webTitle;
        }
    };
    addToDOM();
};

/***
//var requestURL = "https://content.guardianapis.com/search?api-key=cab434ec-44d1-4d51-a16e-d7c116819d03";
var requestURL = "https://api.nytimes.com/svc/topstories/v2/home.json?api-key=3a2be41461714996a25b6f9a46daa606";
var request = new XMLHttpRequest();
request.open('GET', requestURL);
request.send();

request.onload = function() {
    //console.log("data", request.response);
    var x = JSON.parse(request.response);
//    console.log(x.response.results[0].webTitle);
//    var title = x.response.results[0].webTitle;
    console.log(x.results[0].webTitle);
    var title = x.results[0].webTitle;
    //document.getElementById("title").innerHTML = title;
    // var source   = document.getElementById("article-template").innerHTML;
    // var template = Handlebars.compile(source);
    // var context = {title: "x.response.results[0].webTitle"};
    // var html    = template(context);
    function addToDOM(data, element) {
        var articles = $(".articleContent");
        //var h3s = document.querySelectorAll("H3");
        for (var i = 0; i < articles.length; i++) {
            var articleTitle = $(articles[i]).find("h3")[0]; 
//            articleTitle.innerHTML = x.response.results[i].webTitle;
            articleTitle.innerHTML = x.results[i].webTitle;
        }
    }
    addToDOM();
};

/*
request.onload = function() {
//getNYT();
    //console.log("data", request.response);
    var x = JSON.parse(request.response);
    console.log(x.response.results[0].webTitle);
    var title = x.response.results[0].webTitle;
    //document.getElementById("title").innerHTML = title;
    // var source   = document.getElementById("article-template").innerHTML;
    // var template = Handlebars.compile(source);
    // var context = {title: "x.response.results[0].webTitle"};
    // var html    = template(context);
    function addToDOM(data, element) {
        var articles = $(".articleContent");
        //var h3s = document.querySelectorAll("H3");
        for (var i = 0; i < articles.length; i++) {
            var articleTitle = $(articles[i]).find("h3")[0]; 
            articleTitle.innerHTML = x.response.results[i].webTitle;
        }
    }
    addToDOM();
}
*/
/***
function getNYT(){
	var url = "https://api.nytimes.com/svc/topstories/v2/home.json";
	url += '?' + $.param({
	  'api-key': "3a2be41461714996a25b6f9a46daa606"
	});
	$.ajax({
	  url: url,
	  method: 'GET',
	}).done(function(result) {
	  console.log(result);
	}).fail(function(err) {
	  throw err;
	});
};

/*
function getRedditJson(ajaxRequest){
	$.ajax({
		method: 'GET',
		url: 'http://www.reddit.com/r/popular/new/.json',
		dataType: 'json',
		success: onSuccess,
		error: onError
	})
}
*/
/***
function onSuccess(){
	console.log('Woo Hoo!!!');
};

function onError(){
	console.log('Error api not working and stuff!!!');
};

*/
