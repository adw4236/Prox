let titles = ["Upside-Down Museum","Monster Mini Golf","Canada's Best Resort"];
let descriptions = ["The Upside-down museum features really cool things.",
					"Monster Mini Golf has only 18 holes, but infinite fun.",
					"You might like this place because you've been to countries similar to this one."];
let imgLinks = ["imgs/house.jpg","imgs/golf.jpg","imgs/canadaresort.jpg"];


document.addEventListener("deviceready",function(){

	let locationsList = $("#locations");
	let template = locationsList.find("#locations-template");
	for (var i = 0; i < titles.length; i++) {
	    let locationElement = template.clone();
	    locationElement.removeAttr("id");

	    locationElement.find(".location-img").attr("src",imgLinks[i]);
	    locationElement.find(".name").html(titles[i]);
	    locationElement.find(".desc").html(descriptions[i]);

	    locationElement.find(".icon-like").attr("id","like"+i);
	    locationElement.find(".icon-discovery").attr("id","disc"+i);

	    locationsList.append(locationElement);
	}

	var like1 = document.getElementById("like0");
	var like2 = document.getElementById("like1");
	var like3 = document.getElementById("like2");

	like1.addEventListener("click",function(){
		if(like1.style.color == "gray"){
			like1.style.color = "blue";
		}else{
			like1.style.color = "gray";
		}
	});

	like2.addEventListener("click",function(){
		if(like2.style.color == "gray"){
			like2.style.color = "blue";
		}else{
			like2.style.color = "gray";
		}
	});

	like3.addEventListener("click",function(){
		if(like3.style.color == "gray"){
			like3.style.color = "blue";
		}else{
			like3.style.color = "gray";
		}
	});

});