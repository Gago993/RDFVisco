<html>

<head>
<meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="description" content="">
    <meta name="author" content="">
    
	<title>RDFVisco</title>
	<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous">

    <!-- Custom Fonts -->
    <link href="resources/vendor/font-awesome/css/font-awesome.min.css" rel="stylesheet" type="text/css">
    <link href="https://fonts.googleapis.com/css?family=Montserrat:400,700" rel="stylesheet" type="text/css">
    <link href="https://fonts.googleapis.com/css?family=Lato:400,700,400italic,700italic" rel="stylesheet" type="text/css">
	<link href="resources/css/main.css" rel="stylesheet">
	<link rel="stylesheet" href="//code.jquery.com/ui/1.12.0/themes/base/jquery-ui.css">
	<script src="resources/js/jquery-1.11.3.min.js" charset="utf-8"></script>
	<script src="resources/js/jquery-ui.min.js" charset="utf-8"></script>
	<script src="https://d3js.org/d3.v3.min.js" charset="utf-8"></script>
	<script src="https://d3js.org/d3-hierarchy.v1.min.js"></script>

</head>



<body id="page-top" class="index">

 
    
    <header>
        <div class="container">
            <div class="row">
                <div class="col-sm-2 ">
                    <img class="img-responsive" src="resources/img/logo.png" alt="">
                </div>
                 <div class="col-sm-10 intro-text">
                        <span class="name" style="font-family: titleFont; font-size: 65px;">Dbpedia Visualisator</span>
                 </div>
                 
            </div>
        </div>
    </header>
    
   
    <section id="portfolio">
        <div>
        <hr class="star-light">
            <div class="row">
                <div class="col-md-12  text-center search-bar">
                	<a id="previousPage" class="page-link f-left" href="#" aria-label="Previous">
			        	<span aria-hidden="true">&laquo;</span>
			        	<span>Previous</span>
			      	</a>
                    <div class="autocomplete f-left">
					  <label for="results">Search <span class="glyphicon glyphicon-search"></span> </label>
					  <input id="results">
					</div>
					
					<label>
						<span id="currentCount">0</span>/<span id="allCount">0</span>
					</label>
										
					<a id="nextPage" class="page-link f-right" href="#" aria-label="Next">
			        	<span>Next</span>
			        	<span aria-hidden="true">&raquo;</span>
			      	</a>
					
                </div>
                
                
				<div class="col-md-12 mt-50 spinner display-none">
					<div class="loader"></div>	
                </div>
                
                <div class="col-md-12 mt-20">
   					<div id="chart"></div>
            	</div>
            	
            	
            </div>
            
        </div>
    </section>


	<script src="resources/js/rdfVisco/search.js"></script>
	<script src="resources/js/rdfVisco/main2.js"></script>
</body>
</html>
