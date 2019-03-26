// Get references to page elements
$("#zipSearch").on("submit", function(){
  event.preventDefault();
  var pickedZip  = $("#zip_code").val();
  $.ajax({
    method: "GET",
    url: "/housing/" + pickedZip
  })
})
