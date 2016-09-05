function showSpinner(){
	$('.spinner').removeClass('display-none');
}

function hideSpinner(){
	$('.spinner').addClass('display-none');
}

$("#results").autocomplete({
    source: function (request, response) {
    	console.log(request.term, request.term.length);
    	if(request.term.length > 2){
	        $.ajax({
	            url: 'http://lookup.dbpedia.org/api/search/PrefixSearch?QueryClass=&MaxHits=50',
	            headers: {          
	                Accept: "application/json",
              	},
	            data: { QueryString: request.term },
	            success: function (data) {
	                var transformed = $.map(data.results, function (el) {
	                    return {
	                        label: el.label,
	                        id: el.uri,
	                    };
	                });
	                response(transformed);
	            },
	            error: function () {
	                response([]);
	            }
	        });
    	}
    },
    select: function(event, ui) {
         console.log(ui.item.id);
         initTree(ui.item.id);
         showSpinner();
    }
});
