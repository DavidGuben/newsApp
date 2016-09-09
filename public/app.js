$( document ).ready(function() {
  function getResults() {
    $('#results').empty();
    $.getJSON('/all', function(data) {
      for(var i = 0; i < data.length; i++) {
        console.log(data[i]);
        $('#results').append('<p class="dataentry" data-id=' +data[i]._id+ '><span class="dataTitle" data-id=' +data[i]._id+ '>' + data[i].title + '</span></p><p class="dataentry" data-id=' +data[i]._id+ '><span class="dataTitle" data-id=' +data[i]._id+ '>' + data[i].link + '</span></p>');
      }
    });
  }
  getResults();
});
