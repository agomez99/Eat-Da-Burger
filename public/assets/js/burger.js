
$(function() {
    $(".change-devour").on("click", function(event) {
      let id = $(this).data("id");
      console.log("id in change devour")
      let newDevour = $(this).data("newdevour");
  
      let newDevourState = {
        isDevoured: newDevour
      };
  
      // Send the PUT request.
      $.ajax("/api/burgers/" + id, {
        type: "PUT",
        data: newDevourState
      }).then(
        function() {
          console.log("changed devour to", newDevour);
          // Reload the page to get the updated list
          location.reload();
        }
      );
    });
    $(".create-form").on("submit", function(event) {
        // Make sure to preventDefault on a submit event.
        event.preventDefault();
  
        var newBurger = {
          burger_name: $("#bur").val().trim(),
          isDevoured: $("[name=isDevoured]:checked").val().trim()
        };
        // Send the POST request.
        $.ajax("/api/burgers", {
          type: "POST",
          data: newBurger
        }).then(
          function() {
            console.log("created new burger");
            // Reload the page to get the updated list
            location.reload();
          }
          );
        });


        $(".delete-burger").on("click", function (event) {
          // Make sure to preventDefault on a submit event.
          var id = $(this).data("id");
          $.ajax("/api/burgers/" + id, {
            type: "DELETE"
          }).then(function () {
            console.log("deleted burger",id);
            // Reload the page to get the updated list
            location.reload();
          });
        });
        });



