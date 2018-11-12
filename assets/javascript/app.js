var animals = ["dog", "cat", "squirrel", "owl"];

function displayGifs() {  
$("button").on("click", function(){
    var apikey = "8CjKzV1t7oi9qZjn7v0CLewpqhX7Rnfb";
    var animal = $(this).attr("data-name");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + animal + "&api_key=" + apikey + "&limit=10";
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response) {
        var results = response.data;
        console.log(results.rating);
        //adding gifDiv and rating text for all results
        for (var i = 0; i < results.length; i++) {  
            //filtering results to only show certain ratings
            if(results[i].rating === "g" || results[i].rating === "pg") {
                var gifDiv = $('<div class="gifs-here">');
                var rating = results[i].rating;
                var p = $('<p class="rating">').text("Rating: " + rating.toUpperCase());
                var image = $('<img class ="animal-gif">');
                image.attr("src", results[i].images.fixed_height_still.url);
                gifDiv.prepend(p);
                gifDiv.prepend(image);

                $("#gifs-appear").prepend(gifDiv);

                //adding attributes for animated/still gif
                image.attr("data-still", results[i].images.fixed_height_still.url);
                image.attr("data-animate", results[i].images.fixed_height.url);
                image.attr("data-state", results[i].images.fixed_height_still.url);
               
        }}
        
        //changing state from still to animated on click
        $(".animal-gif").on("click", function(){
            var state = $(this).attr("data-state");
            var still = $(this).attr("data-still");
            var animate = $(this).attr("data-animate");
            
            $(this).attr(state); 

            if(state = state) {
                $(this).attr("src", animate);
                state = animate;
            //else is being ignored for some reason, gif restarts on click but doesn't stop completely
            } else {
                $(this).attr("src", still);
            }
        })  
        
    })
})

}
//rendering buttons for items in animals array
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

//displays new animal buttons added by user when submit button is clicked
//gifs appear when new button is clicked
$(".new-animal").on("click", displayGifs());

$('#add-animal').on("click", function(event) {
    event.preventDefault();
    var newAnimal = $('#animal-input').val().trim();
    animals.push(newAnimal);
    console.log(animals);
    renderButtons();
    displayGifs();
});

renderButtons();

displayGifs();

})