$(() => {
  $.ajax( {
    method: "GET",
    url: "/api/users"
  }).done((users) => {
    // for(user of users) {
    //   $("<div>").text(user.name).appendTo($("body"));
    // }
  });;
});
//figure out how to access the price information, send data
//impliment ajax call, search params of ajax call where min and max price will be called
