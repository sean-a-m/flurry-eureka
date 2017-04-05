function sort

function generateList( result ) {
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
