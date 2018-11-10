var animals = ["dog", "cat", "squirrel", "owl"];

function displayGifs() {
var animal = $(this).attr("data-name");
var apikey = "8CjKzV1t7oi9qZjn7v0CLewpqhX7Rnfb";
var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + animal + "&api_key=" + apikey + "&limit=10";

$("button").on("click", function(){
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response) {
        var results = response.data;

        for (var i = 0; i < results.length; i++) {  
            var gifDiv = $('<div class="animal-gif">');
            var rating = results[i].rating;
            var p = $('<p>').text(rating);
            var image = $('<img>');
            image.attr("src", results[i].images.fixed_height.url);
            gifDiv.prepend(p);
            gifDiv.prepend(image);

            $("#gifs-appear").prepend(gifDiv);

        }

    })

})
}
function renderButtons() {    
    $('#animal-buttons').empty();
    for (var i=0; i < animals.length; i++) {
        var addAnimal = $('<button>');
        addAnimal.addClass = ("new-animal");
        addAnimal.attr("data-name", animals[i]);
        addAnimal.text(animals[i]);
        $('#animal-buttons').append(addAnimal);
        $('#animal-input').val("");
    }  
};

$(document).ready(function() {

$('#add-animal').on("click", function(event) {
    event.preventDefault();
    var newAnimal = $('#animal-input').val().trim();
    animals.push(newAnimal);
    renderButtons();
});

$(document).on("click", ".new-animal", displayGifs);

renderButtons();

displayGifs();
})