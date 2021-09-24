// const { json } = require("body-parser");
$(() => {
  $.ajax( {
    method: "GET",
    url: "/api/users"
  }).done((users) => {

  });

});
