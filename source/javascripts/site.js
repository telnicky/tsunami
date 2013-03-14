
            // <th>date</th>
            // <th>location</th>
            // <th>price</th>

$.ajax({
    type: "GET",
    url : "http://api.tumblr.com/v2/blog/i-was-a-wave.tumblr.com/posts/text",
    dataType: "jsonp",
    data: {
        api_key : "rZkTfa9UL5oisnympMDB029IwSUU3IAKmG4PnwZDnhBEycYu5t",
        jsonp : "populateShows"
    }
});

buildHtml = function (posts) {
  var shows = _.map(posts, function (post) {
    var body = $(post.body);
    return body.html().split("%%");
  });

  var rows = _.map(shows, function(show) {
    var row = "<tr>" +
                "<td>" + show[0] + "</td>" +
                "<td>" + show[1] + "</td>" +
                "<td>" + show[2] + "</td>" +          
              "</tr>";
    return row;
  });

  var els = _.reduce(rows, function(el, row) {
    return el += row;
  }, '');

  return els;
}

populateShows = function (data) {
  console.log(data);
  if(data.meta.status == 200) {
    elements = buildHtml(data.response.posts);
    $('.shows').prepend(elements);
  }
}