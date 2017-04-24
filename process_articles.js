function parseDates ( articles ) {
  articles.map(function(article) {
    articleDate = new Date(article['date'] * 1000);
    article['timestamp'] = articleDate.toLocaleString();
  });
  return articles;
}

function sortArticles( articles ) {
  articles.sort(function(i, j) {
    return i['group-rank'] - j['group-rank'];
  });
  articles['cutoff'] = articles.length / 2;

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

function loadArticles() {
$.ajax({
	url: "https://confabulator.io/api/clustering",
	dataType: "json",
	success: function( result ) {
		generateList(result);
	}
});
};
