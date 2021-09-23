//users browser
$(document).ready(function () {
  //finding elem to work on
  //       $( "btn btn-secondary favourites-form" ).addClass( 'btn-success' );

  //       $("btn btn-secondary favourites-form").removeClass( 'btn-default' );
  if (sessionStorage.getItem('isCliked')){
    $("btn btn-secondary favourites-form").addClass('btn-success');
    $("btn btn-secondary favourites-form").removeClass('btn-default');

  }
  $(".favourites-form").on('click', function (event) {
    //stops from loading new page route
    event.preventDefault();
    $.post(`/favourites`, { item_id: $(event.target).data("item") })
      .then(() => {
        // $(event.target).data("item").addClass('clicked');
        //   $(".btn btn-danger favourites-form").css("color", "grey")
        //   })
        $(event.target).data("item").addClass('btn-success');
        $(this).removeClass('btn-default');
        // set the value upon clicking
        sessionStorage.setItem('isCliked', true)
      });

        //
        //   if(sessionStorage.getItem('isCliked'){
        //       $( "btn btn-secondary favourites-form" ).addClass( 'btn-success' );

        //       $("btn btn-secondary favourites-form").removeClass( 'btn-default' );
      // }
    //   $('#mylink').on('click',function() {
    //     $( this ).addClass( 'btn-success' );

    //     $( this ).removeClass( 'btn-default' );
    //     // set the value upon clicking
    //     localStorage.setItem('isCliked', true)
    //   });
    // });




        // $(event.target).data("item").empty();
        // $(event.target).data("item").removeClass("btn btn-secondary favourites-form").addclass(".btn btn-danger favourites-form")
          // $(event.target).data("item").addClass("clicked");
  //     // });

  // });
    // });
  });

//   $(".delete-form").on('click', function (event) {
//     //stops from loading new page route
//     event.preventDefault();
//     $.post(`/favourites`, { item_id: $(event.target).data("item") })
//       .then(() => {
//       }

// //make a css class that changes button to gray and add that class to the button=event (event.target add class)using jquery
//       )}
})
