// const { json } = require("body-parser");

$(() => {
  $.ajax( {
    method: "GET",
    url: "/api/users"
  }).done((users) => {
    // for(user of users) {
    //   $("<div>").text(user.name).appendTo($("body"));
    // }
  });



});

//fetch fav page by ajax, and itwillappend/update to the arr
