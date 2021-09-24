$(document).ready(function () {
  //Event listener to add favourite items
  $(".favourites-form").on("click", function (event) {
    event.preventDefault();
    $.post(`/favourites`, { item_id: $(event.target).data("item") }).then(
      (result) => {
        console.log("Add Fav REsult: ", result);
        $(event.target).addClass("btn-success");
        $(this).removeClass("btn-danger");
        // set the value upon clicking
        sessionStorage.setItem("isCliked", true);
      }
    );
  });

  //Event listener to mark item as "SOLD"
  $(".sold-form").on("click", function (event) {
    event.preventDefault();
    $.post(`/item/sold`, { item_id: $(event.target).data("item") }).then(
      (result) => {
        console.log("Add Fav REsult: ", result);
        $(event.target).addClass("btn-dark");
        $(this).removeClass("btn-warning");
        sessionStorage.setItem("isCliked", true);
        return soldBadgeHTML;
      }
    );
  });

  //Event listener to delete any items
  const deleteButton = $(".delete-form");
  console.log("Delete button:", deleteButton);
  $(".delete-form").on("click", function (event) {
    event.preventDefault();
    const itemID = $(event.target).data("item");
    console.log("clicked!!!!!!!!!!");
    $.post(`item/delete`, { item_id: itemID }).then((result) => {
      console.log("DELETE RESULT: ", result);
      //on form item set to remove
      console.log("item selector container: ", $(`#item-${itemID}-container`));
      $(`#item-${itemID}-container`).remove();
    });
  });

  //Event listner for new_item post
  $(".post-form").on("click", function (event) {
    event.preventDefault();
    $.post(`/new_item`, { item_id: $(event.target).data("item") }).then(
      (result) => {
        console.log("Add new item Result: ", result);
      }
    );
  });
});
