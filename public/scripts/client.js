//users browser
$(document).ready(function () {
  //finding elem to work on
  $(".favourites-form").on('click', function (event) {
    console.log()
    //stops from loading new page route
    event.preventDefault();
    $.post(`/favourites`,{item_id: $(event.target).data("item")})
      .then(() => {
        start: function heart() {
          $(this).css({
            display: 'flex',
            color: 'grey'
          });
        }
      });
    // });
  });
});
//make a css class that changes button to gray and add that class to the button=event (event.target add class)using jquery
