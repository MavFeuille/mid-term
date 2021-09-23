//users browser
$(document).ready(function () {
  if (sessionStorage.getItem('isCliked')){
    $("btn btn-secondary favourites-form").addClass('btn-success');
    $("btn btn-secondary favourites-form").removeClass('btn-default');
  }
  $(".favourites-form").on('click', function (event) {
    //stops from loading new page route
    event.preventDefault();
    $.post(`/favourites`, { item_id: $(event.target).data("item") })
      .then((result) => {
        // $(event.target).data("item").addClass('clicked');
        //   $(".btn btn-danger favourites-form").css("color", "grey")
        //   })
        console.log("Add Fav REsult: ", result)
        $(event.target).addClass('btn-success');
        $(this).removeClass('btn-danger')
        // set the value upon clicking
        sessionStorage.setItem('isCliked', true)
      });

    $(".delete-form").on('click', function (event) {
      //stops from loading new page route
      event.preventDefault();
      $.post(`home/delete`, { item_id: $(event.target).data("item") })
        .then((result) => {
        console.log("DELETE RESULT: ", result);

        })
      });

  });


// //make a css class that changes button to gray and add that class to the button=event (event.target add class)using jquery
//       )}
})
