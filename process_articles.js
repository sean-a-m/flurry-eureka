function parseDates ( articles ) {
  articles['articles'].map(function(article) {
    articleDate = new Date(article['date'] * 1000);
    article['timestamp'] = articleDate.toLocaleString();
  });
  console.log(articles);
  return articles;
}

function sortArticles( articles ) {
  articles['articles'].sort(function(i, j) {
    return i['group-rank'] - j['group-rank'];
  });
  articles['cutoff'] = articles['articles'].length / 2;

  return articles;
}

function generateList( result ) {
  result = result.map(function(xs) {
    return sortArticles(xs);
  });

  result = result.map(function(xs) {
    return parseDates(xs);
  });


	$( "#articles" ).html( nunjucks.render('./template.html', {groups: result} ))
};

function generateRelatedList( result ) {
	$( "#articles" ).html( nunjucks.render('./related_template.html', {groups: result} ))
};


function loadArticles() {
$.ajax({
	url: "https://confabulator.io/api/clustering/",
	dataType: "json",
	success: function( result ) {
		generateList(result);
	}
});
};

function loadRelated() {
  var urlParams = new URLSearchParams(window.location.search);
  var searchId = urlParams.get('id');
  $.ajax({
    url: "https://confabulator.io/api/clustering/related?id=" + searchId + "&page=10&perpage=0",
    dataType: "json",
    success: function( result ) {
      generateRelatedList(result);
    }
  });
};



