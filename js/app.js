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
	guardian:{
		returnResult:'response.results',
		apikey:'cab434ec-44d1-4d51-a16e-d7c116819d03',
		url:'https://content.guardianapis.com/search?api-key=cab434ec-44d1-4d51-a16e-d7c116819d03',
		translate:{
			pk:'id',
			type:'type',
			section1:'sectionId',
			section2:'sectionName',
			date:'webPublicationDate',
			title:'webTitle',
			author:'',
			url:'webUrl',
		}
	},
	nyt:{
		returnResult:'results',
		apikey:'3a2be41461714996a25b6f9a46daa606 ',
		url:'https://api.nytimes.com/svc/topstories/v2/home.json?api-key=3a2be41461714996a25b6f9a46daa606',
		translate:{
			pk:'url',
			type:'item_type',
			section1:'Section',
			section2:'subsection',
			date:'published_date',
			title:'title',
			author:'byline',
			url:'url',
		}
	},
};

var articles = {};

var request = new XMLHttpRequest();

function loopThroughApis(apis){
console.log("ddtest001");
	for(api in apis){
console.log("ddtest002 "+api);
		var requestURL = apis[api].url;
console.log("requestURL: "+requestURL);
		var request = new XMLHttpRequest();
		var aliases = apis[api].translate;
		request.addEventListener('load', function(){
			console.log('ddtest011a', JSON.parse(this.responseText));
			var myData = JSON.parse(request.response);
			console.log('x',apis[api].translate);
			console.log('y',apis[api].translate.title);
			console.log('z',myData.results[0][apis[api].translate.title]);
			for(res in myData.results){
				for(alias in aliases){
					console.log(alias + ' = ' + aliases[alias]);
					//add value and key to object to be passed to articles
				}
				//add value and key object to articles array
			}


		});

		request.open('GET', requestURL);
		request.send();


//console.log("request:", request);

		var apidata = apis[api];
//		request.onload = function() {
//console.log("ddtest003 data");
//console.log('ddtest apidata: ', apidata);
//console.log('ddtest what\'s the return', apidata[returnResult]);
//console.log('ddtest010', request);
//console.log(request);
//console.log("data", request.response);

//		    var x = JSON.parse(request.response);


// console.log('x:');
// console.log(x);
// console.log('x.response');
// console.log(x.response);
// console.log('x.response.results');
// console.log(x.response.results);
// console.log('x.response.results[0]');
// console.log(x.response.results[0]);
// console.log('x.response.results[0].webTitle');
// console.log(x.response.results[0].webTitle);
//		    var title = x.response.results[0].webTitle;
		    //document.getElementById("title").innerHTML = title;
		    // var source   = document.getElementById("article-template").innerHTML;
		    // var template = Handlebars.compile(source);
		    // var context = {title: "x.response.results[0].webTitle"};
		    // var html    = template(context);
/*		    function addToDOM(data, element) {
		        var articles = $(".articleContent");
		        //var h3s = document.querySelectorAll("H3");
		        for (var i = 0; i < articles.length; i++) {
		            var articleTitle = $(articles[i]).find("h3")[0]; 
		            articleTitle.innerHTML = x.response.results[i].webTitle;
		        }
		    }
		    addToDOM();
*/
//		}
	}
}

loopThroughApis(apis);

request.onload = function(){
//console.log('ddtest001');
	for(api in apis){
//console.log('ddtest002');
//console.log(api);
//		loadApi(apis[api]);
	}
}
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