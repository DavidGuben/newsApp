$( document ).ready(function() {
  function getResults() {
    $('#results').empty();
    $.getJSON('/all', function(data) {
      for(var i = 0; i < data.length; i++) {
        console.log(data[i]);
        $('#results').append('<div class="col-md-4">'+
          '<p data-id='+data[i]._id+'><span class="dataTitle">'+data[i].title+'</span></p>'+
          '<a target="_blank"href='+data[i].link+'data-id='+data[i]._id+'><span class="dataLink">'+data[i].link+'</span></p></div>'
        );
      }
    });
  }
  getResults();
});
