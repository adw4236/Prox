let titles = ["hotel","golf"];
let descriptions = ["come to the hotel","golf"];
let imgLinks = ["../imgs/house.jpg","imgs/golf.jpg"];


let locationsList = $("#locations");
let template = locationsList.find("#locations-template");
for (var i = 0; i < titles.length; i++) {
    let locationElement = template.clone();
    locationElement.removeAttr("id");

    locationElement.find(".location-img").attr("src",imgLinks[i]);
    locationElement.find(".name").html(titles[i]);
    locationElement.find(".desc").html(descriptions[i]);

    locationsList.append(locationElement);
}
