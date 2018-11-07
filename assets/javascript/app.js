var topics=["angry","inspired","scared","bored","shocked","drunk","nervous","surprised","excited","relaxed","happy"];
function renderButtons() {
    $("#btn").html("");
    for (var i = 0; i < topics.length; i++) {
        var bt = $("<button>");
        bt.addClass("topic");
        bt.attr("data-name", topics[i]);
        bt.text(topics[i]);
        $("#btn").append(bt);
    }
};
  $("#addGif").on("click", function(event) {
    event.preventDefault();
    topics.push($("#gif-input").val());
    renderButtons();
  });
  renderButtons();

function displayMovieInfo() {
    $("#gifShow").html("");
    var topic = $(this).attr("data-name");
    var queryURL="http://api.giphy.com/v1/gifs/search?q="+topic+"&api_key=vE4Wtbvqs7WbrmCN1g07CRBAEWZOnKY1&limit=10";
    $.ajax({
        url:queryURL,
        method:"GET"
    }).then(function(response){
        var results=response.data;
         for (var i = 0; i < results.length; i++) {  
        var resultDiv=$("<div>");
        resultDiv.css({
            float:"left",
            margin:"20px",
        })
        var p=$("<p>");
        p.text("Rating: "+results[i].rating);
        var resultImage=$("<img>");
        resultImage.addClass("resultIMG")
        resultImage.attr({"src":results[i].images.fixed_height_still.url,
                            "data-still":results[i].images.fixed_height_still.url,
                            "data-animate":results[i].images.fixed_height.url,
                            "data-state":"still"});
        resultDiv.append(p);
        resultDiv.append(resultImage);
        $("#gifShow").append(resultDiv);
    }
    $(".resultIMG").on('click',function(){
         var image =$(this);
        var state =image.attr("data-state");
      if(state==='still'){
      image.attr("src",image.attr("data-animate"));
      image.attr("data-state","animate");
      }
      else if(state==='animate'){
      image.attr("src",image.attr("data-still"));
      image.attr("data-state","still");
      }
    })
})
};
$(document).on("click", ".topic", displayMovieInfo);

