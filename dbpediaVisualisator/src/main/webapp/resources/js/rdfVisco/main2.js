var w = '100%',
    h = '100%',
    width,
    height,
    node,
    link,
    text,
    root;

var myjson = {};
var myLocalData,localDataPointer;
var url  = "createJson";
var page = 0;

var currentCounter = $("#currentCount");
var allCounter = $("#allCount");
var nextPage = $("#nextPage");
var previousPage = $("#previousPage");


var vis = d3.select("#chart").append("svg")
.attr("width", w)
.attr("height", h);

width = $("svg").width();
height = $("svg").height();

var force = d3.layout.force()
    .on("tick", tick)
    /*.charge(function(d) {
      return d._children ? -d.size / 50 : d.children ? -100 : -30;
    })*/
    .linkDistance(function(d) {
      return d.target.children ? 50  : 30;
    })
    .charge(function(node) {
       return -500;
       })
    .size([width, height]);


var drag = force.drag()
.on("dragstart", dragstart)
.on("drag", drag);

function dragstart(d) {
	  d3.select(this).classed("fixed", d.fixed = true);
	  
}

function drag(d){
	  var children = d.children || d._children;
	  if(children){
		  
		  $.each(children, function(key, val){
			 if(val.fixed){
				 val.y = d.y + 50;
				 val.py = d.py + 50;
			 } 
		  });
	  }
}



function initTree(resourceUri){

	hideTree();
	page = 0;
	$.ajax({
		  dataType: "json",
		  url: url,
		  data: {url: resourceUri, page: page},
		  success: success
		});

	function success(data){
		//"resources/data/barackObama-data.json"
		//d3.json(data, function(json) {
			  //root = json;
		hideSpinner();
		console.log(data);
		root = data;
		root.fixed = true;
		root.px = root.py = 0;
		myLocalData = { name: root.name, label: root.label,  children: []};
		localDataPointer = myLocalData;
		update();
		setCounters(data.page + 1,data.all);
		showTree();
		
	}
}


function update(nodes) {
	
	var nod = vis.selectAll(".link"); 
	var vod = vis.selectAll(".node");
	var txt = vis.selectAll(".txt");
	
	nod.remove();
	vod.remove();
	txt.remove();
	
	
  var nodes = flatten(root);
  var links = d3.layout.tree().links(nodes);

  // make sure we set .px/.py as well as node.fixed will use those .px/.py to 'stick' the node to:
  if (!root.px) {
    // root have not be set / dragged / moved: set initial root position
    root.px = root.x = width / 2;
    root.py = root.y = circle_radius(root) + 2 ;
  }

  // Restart the force layout.
  force
      .nodes(nodes)
      .links(links)
      .start();

  // Update the links…
  link = vis.selectAll("line.link")
      .data(links, function(d) { return d.target.id; });

  // Enter any new links.
  link.enter().insert("line", ".node")
      .attr("class", "link")
      .attr("x1", function(d) { return d.source.x; })
      .attr("y1", function(d) { return d.source.y; })
      .attr("x2", function(d) { return d.target.x; })
      .attr("y2", function(d) { return d.target.y; });

  // Exit any old links.
  link.exit().remove();

  // Update the nodes…
  node = vis.selectAll("circle.node")
      .data(nodes, function(d) { return d.id; })
      .style("fill", color);

  node.transition()
      .attr("cy", function(d) { return d.y; })
      .attr("r", function(d) { return circle_radius(d); });

  // Enter any new nodes.
  node.enter()
  	  .append("circle")
      .attr("class", "node")
      .attr("cx", function(d) { return d.x; })
      .attr("cy", function(d) { return d.y; })
      .attr("r", function(d) { return circle_radius(d); })
      .style("fill", color)
      .on("click", click)
      .call(force.drag)
      .append("svg:title")
	  .text(function(d) { return d.name; });
  
 
  d3.select("svg").append("g").attr("class", "txt");
  text = d3.select("g").selectAll("text")
  .data(nodes)
  .enter().append("text")
  .attr("class", "txt")
  .attr("x", function(d){ return d.x})
  .attr("y", function(d){ return d.y})
  .text(function(d) { return d.label;})
  .attr("id", function(d) { return d.label; })
  
  
  // Exit any old nodes.
  node.exit().remove();
}

function tick(e) {
  // Apply the constraints:
  //
	var i = 20;
  force.nodes().forEach(function(d) {
    if (!d.fixed) {
      var r = circle_radius(d) + 14, dx, dy, ly = 10;
      // #1: constraint all nodes to the visible screen:
      //d.x = Math.min(width - r, Math.max(r, d.x));
      //d.y = Math.min(height - r, Math.max(r, d.y));

      // #1.0: hierarchy: same level nodes have to remain with a 1 LY band vertically:
      if (d.children || d._children) {
    	  if(d.parent){ d.fixed = true;}
        var py = 0;
        if (d.parent) {
          py = d.parent.y;
        }
        d.py = d.y = py + d.depth + ly + r;
      }

      // #1a: constraint all nodes to the visible screen: links
      dx = Math.min(0, width - r - d.x) + Math.max(0, r - d.x);
      dy = Math.min(0, height - r - d.y) + Math.max(0, r - 2*d.y);
      
      if(d.parent && !d.parent.parent){
    	  var num_c = d.parent.children.length || d.parent._children.length;
    	  var inc = (width - 2*r)/num_c;
    	  d.x = i; i+= inc; //2 * Math.max(-ly, Math.min(ly, dx));
      }else{
    	  if(d.parent){
    		  d.x = d.parent.x;
    	  }
      }
      
      if(d.parent){
    	  var parentChilds = d.parent.children.length || d.parent._children.length;
    	  var parentParentChilds = 0;
    	  
    	  if(d.parent.parent){
    		  if(d.parent.parent.children || d.parent.parent._children){
    			  parentParentChilds = d.parent.parent.children.length || d.parent.parent._children.length;
    		  }
    	  }
          
    	  if((parentParentChilds == 0 || parentParentChilds == 1) && parentChilds == 1){
        	  d.px = width/2;
          }
      }
      
      
      d.y += 2 * Math.max(-ly, Math.min(ly, dy));
      // #1b: constraint all nodes to the visible screen: charges ('repulse')
      dx = Math.min(0, width - r - d.px) + Math.max(0, r - d.px);
      dy = Math.min(0, height - r - d.py) + Math.max(0, r - d.py);
      d.px += 2 * Math.max(-ly, Math.min(ly, dx));
      d.py += 2 * Math.max(-ly, Math.min(ly, dy));

      // #2: hierarchy means childs must be BELOW parents in Y direction:
      if (d.parent) {
        d.y = Math.max(d.y, d.parent.y + ly);
        d.py = Math.max(d.py, d.parent.py + ly);
        
      }
    }
  });

  link.attr("x1", function(d) { return d.source.x; })
      .attr("y1", function(d) { return d.source.y; })
      .attr("x2", function(d) { return d.target.x; })
      .attr("y2", function(d) { return d.target.y; });

  node.attr("cx", function(d) { return d.x; })
      .attr("cy", function(d) { return d.y; });
  
  text.attr("x", function(d) { return d.x - 10; })
  .attr("y", function(d) { return d.y; });
}

// Color leaf nodes orange, and packages white or blue.
function color(d) {
  return d._children ? "#4F9ADB" : d.children ? "#194163" : "#467D33";
}

function circle_radius(d) {
  return d.children ? 15 : 20;//Math.sqrt(d.size) / 5;
}

// Toggle children on click.
function click(d) {
	if (d3.event.defaultPrevented) return; 
	
	if (d.children) {
    d._children = d.children;
    d.children = null;
    update();
  } else if(d._children){
    d.children = d._children;
    d._children = null;
    update();
  }else{
	  if(!testDbpediaLink(d.name)){
		  alert("You have selected literal, please choose another option.");//show modal here
		  return;
	  }
	  localDataPointer.children = [{"name": d.parent.name, "label": d.parent.label, children: [{ name: d.name, children: []}]}];
	  localDataPointer = localDataPointer.children[0];
		
	  
	  
	  hideTree();
	  showSpinner();
	  page = 0;
	  $.ajax({
			  dataType: "json",
			  url: url,
			  data: {url: d.name, page: page},
			  success: success
			});
	
		function success(data){
			//myjson = JSON.parse(JSON.stringify(myLocalData));
			localDataPointer.children[0] = data;
			localDataPointer = localDataPointer.children[0];
				console.log(myLocalData,"localD");
				
		    var myjson = JSON.parse(JSON.stringify(myLocalData));
			root = myjson;
			//root.label = myjson.label;
			update();
			setCounters(data.page + 1,data.all);
			hideSpinner();
			showTree();
		}
	 
  }
 
}

// Returns a list of all nodes under the root.
//
// Also assign each node a reasonable starting x/y position: we can do better than random placement since we're force-layout-ing a hierarchy!
function flatten(root) {
  var nodes = [], i = 0, depth = 0, level_widths = [1], max_width, max_depth = 1, kx, ky;

  function recurse(node, parent, depth, x) {
    if (node.children) {
      var w = level_widths[depth + 1] || 0;
      level_widths[depth + 1] = w + node.children.length;
      max_depth = Math.max(max_depth, depth + 1);
      node.size = node.children.reduce(function(p, v, i) {
        return p + recurse(v, node, depth + 1, w + i);
      }, 0);
    }
    if (!node.id) node.id = ++i;
    node.parent = parent;
    node.depth = depth;
    if (!node.px) {
      node.y = depth;
      node.x = x;
    }
    nodes.push(node);
    return node.size;
  }

  root.size = recurse(root, null, 0);

  // now correct/balance the x positions:
  max_width = 1;
  for (i = level_widths.length; --i > 0; ) {
    max_width = Math.max(max_width, level_widths[i]);
  }
  kx = (width - 20) / max_width;
  ky = (height - 20) / max_depth;
  for (i = nodes.length; --i >= 0; ) {
    var node = nodes[i];
    if (!node.px) {
      node.y *= ky;
      node.y += 10 + ky / 2;
      node.x *= kx;
      node.x += 10 + kx / 2;
    }
  }

  return nodes;
}

function hideTree(){
	$('#chart').addClass('display-none');
}

function showTree(){
	$('#chart').removeClass('display-none');
}

function setCounters(page, all){
	var current = page*20 > all ? all : page*20;
	currentCounter.html(current);
	allCounter.html(all);
}

nextPage.click(function(){
	page++;
	getPage(page);
});

previousPage.click(function(){
	page--;
	if(page < 0){ page = 0};
	getPage(page);
});


function getPage(p) {
	
	hideTree();
	showSpinner();
	
	$.ajax({
		dataType : "json",
		url : url,
		data : {
			url : localDataPointer.name,
			page : p
		},
		success : success
	});

	function success(data) {
		setPage(data.all);
		if(data.page * 20 <= data.all){
			localDataPointer.children = data.children;
			setCounters(data.page + 1, data.all);
		}

		var myjson = JSON.parse(JSON.stringify(myLocalData));
		root = myjson;
		// root.label = myjson.label;
		update();
		
		hideSpinner();
		showTree();
	}
}

function setPage(all){
	if(page*20 > all){
		page = Math.floor(all/20);
	}
	else if(page*20 < 0){
		page = 0;
	}
}

function testDbpediaLink(link){
	var re = new RegExp("http:\/\/dbpedia.org\/resource\/");
	if (re.test(link)) {
	    return true;
	} else {
	    return false;
	}
}

