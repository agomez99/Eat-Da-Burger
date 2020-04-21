$(function () {
  $(".change-devour").on("click", function (event) {
    let id = $(this).data("id");
    let newDevour = $(this).data("newdevour");
    let newDevourState = {
      isDevoured: newDevour,
    };

    //PUT request.
    $.ajax("/api/burgers/" + id, {
      type: "PUT",
      data: newDevourState,
    }).then(function () {
      location.reload();
    });
  });
  $(".create-form").on("submit", function (event) {
    event.preventDefault();
    var newBurger = {
      burger_name: $("#bur").val().trim(),
      isDevoured: $("[name=isDevoured]:checked").val().trim(),
    };

    // POST request.
    $.ajax("/api/burgers", {
      type: "POST",
      data: newBurger,
    }).then(function () {
      location.reload();
    });
  });

  //DELETE
  $(".delete-burger").on("click", function (event) {
    var id = $(this).data("id");
    $.ajax("/api/burgers/" + id, {
      type: "DELETE",
    }).then(function () {
      location.reload();
    });
  });
});
