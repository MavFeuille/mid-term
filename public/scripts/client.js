//users browser
$(document).ready(function () {
  // if (sessionStorage.getItem("isCliked")) {
  //   $("btn btn-secondary favourites-form").addClass("btn-success");
  //   $("btn btn-secondary favourites-form").removeClass("btn-default");
  // }
  $(".favourites-form").on("click", function (event) {
    //stops from loading new page route
    event.preventDefault();
    $.post(`/favourites`, { item_id: $(event.target).data("item") }).then(
      (result) => {
        // $(event.target).data("item").addClass('clicked');
        //   $(".btn btn-danger favourites-form").css("color", "grey")
        //   })
        console.log("Add Fav REsult: ", result);
        $(event.target).addClass("btn-success");
        $(this).removeClass("btn-danger");
        // set the value upon clicking
        sessionStorage.setItem("isCliked", true);
      }
    );
  });


  $(".sold-form").on("click", function (event) {
    //stops from loading new page route
    event.preventDefault();
    $.post(`/item/sold`, { item_id: $(event.target).data("item") }).then(
      (result) => {
        // $(event.target).data("item").addClass('clicked');
        //   $(".btn btn-danger favourites-form").css("color", "grey")
        //   })
        console.log("Add Fav REsult: ", result);
        $(event.target).addClass("btn-dark");
        $(this).removeClass("btn-warning");
        // set the value upon clicking
        sessionStorage.setItem("isCliked", true);
        return soldBadgeHTML;
      }
    );
  });

  
  const deleteButton = $(".delete-form");
  console.log("Delete button:", deleteButton);
  $(".delete-form").on("click", function (event) {
    const itemID = $(event.target).data("item")
    console.log("clicked!!!!!!!!!!");
    //stops from loading new page route
    event.preventDefault();
    $.post(`item/delete`, { item_id: itemID })
      // console.log(">>>>>>> data (item) <<<<<<:", $(event.target).data("item"))
      .then((result) => {
        console.log("DELETE RESULT: ", result);
        //on form item set to remove
        console.log("item selector container: ", $(`#item-${itemID}-container`));
        $(`#item-${itemID}-container`).remove();
      });
  });

  $(".post-form").on("click", function (event) {
    //stops from loading new page route
    event.preventDefault();
    $.post(`/new_item`, { item_id: $(event.target).data("item") }).then(
      (result) => {
        // $(event.target).data("item").addClass('clicked');
        //   $(".btn btn-danger favourites-form").css("color", "grey")
        //   })
        console.log("Add new item REsult: ", result);
        $(event.target).addClass("btn-success");
        $(this).removeClass("btn-primary");
        // set the value upon clicking
        sessionStorage.setItem("isCliked", true);
      }
    );
  });

  // $("#new-item").on("submit", function (event) {
  //   //stops from loading new page route
  //   event.preventDefault();
  //   console.log("-----> TRIGGERED!!!!!!!!!<------")
  //   $.post(`/new_item`, { item_id: $(event.target).data("item") }).then(
  //       (result) => {
  //       // const data = $(this).serialize();
  //       submitProperty(data)
  //       .then(() => {
  //         views_manager.show('listings');
  //       })
  //       .catch((error) => {
  //         console.error(error);
  //         views_manager.show('listings');
  //       })
  //       // console.log("Add new item REsult: ", result);
  //       // $(event.target).addClass("btn-success");
  //       // $(this).removeClass("btn-primary");
  //       // // set the value upon clicking
  //       // sessionStorage.setItem("isCliked", true);
  //     }
  //   );
  // });


});
