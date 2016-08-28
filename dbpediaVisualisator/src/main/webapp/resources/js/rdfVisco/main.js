var myjson = {
		
		"name": "gago",
		"children":[{
			"name": "http://dbpedia.org/resource/Barack_Obama",
			"children": [{
				"name": "http://dbpedia.org/property/nationality",
				"children": [{
					"name": "American",
					"size": 4000,
					"parent": "http://dbpedia.org/property/nationality"
				}],
				"parent": "http://dbpedia.org/resource/Barack_Obama"
			}, {
				"name": "http://dbpedia.org/property/religion",
				"children": [{
					"name": "Protestantism",
					"size": 3500,
					"parent": "http://dbpedia.org/property/religion"
				}],
				"parent": "http://dbpedia.org/resource/Barack_Obama"
			}, {
				"name": "http://dbpedia.org/ontology/soundRecording",
				"children": [{
					"name": "http://dbpedia.org/resource/Barack_Obama__5",
					"size": 3300,
					"parent": "http://dbpedia.org/ontology/soundRecording"
				}, {
					"name": "http://dbpedia.org/resource/Barack_Obama__4",
					"size": 3300,
					"parent": "http://dbpedia.org/ontology/soundRecording"
				}],
				"parent": "http://dbpedia.org/resource/Barack_Obama",
			}, {
				"name": "http://dbpedia.org/ontology/party",
				"children": [{
					"name": "http://dbpedia.org/resource/Democratic_Party_(United_States)",
					"size": 8500,
					"parent": "http://dbpedia.org/ontology/party"
				}],
				"parent": "http://dbpedia.org/resource/Barack_Obama"
			}, {
				"name": "http://dbpedia.org/property/birthName",
				"children": [{
					"name": "Barack Hussein Obama II",
					"size": 7000,
					"parent": "http://dbpedia.org/property/birthName"
				}],
				"parent": "http://dbpedia.org/resource/Barack_Obama"
			}, {
				"name": "http://dbpedia.org/ontology/wikiPageID",
				"children": [{
					"name": "534366",
					"size": 2000,
					"parent": "http://dbpedia.org/ontology/wikiPageID"
				}],
				"parent": "http://dbpedia.org/resource/Barack_Obama",
			}]
		}]
		
	};


var myLocalData;

var width = 1000, height = 600, root;
var force = d3.layout.force().size([ width, height ]).on("tick", tick).charge(-120)
.linkDistance(30);

var svg = d3.select("body").append("svg").attr("width", width).attr("height",
		height);
var link = svg.selectAll(".link"), node = svg.selectAll(".node");
d3.json("dbpediaVisualisator/resources/data/barackObama-data.json", function(error, json) {
	
	//console.log(json,"json");
	if (error)
		throw error;
	root = json;
	myLocalData = { name: root.name, children: []};
	update();
});

/*root = myjson;


root = d3.hierarchy(root);

update();*/

/*var drag = force.drag()
.on("dragstart", dragstart);*/



function update() {
	link.remove();
	node.remove();
	link = svg.selectAll(".link"); node = svg.selectAll(".node");
	var test = d3.hierarchy(root);
	var nodes = flatten(test), links = test.links(nodes);
	
	// Restart the force layout.
	force.nodes(nodes).links(links).start();
	// Update the links…
	link = link.data(links, function(d) {
		return d.target.id;
	});
	// Exit any old links.
	link.exit().remove();
	// Enter any new links.
	link.enter().insert("line", ".node").attr("class", "link").attr("x1",
			function(d) {
				return d.source.x;
			}).attr("y1", function(d) {
		return d.source.y;
	}).attr("x2", function(d) {
		return d.target.x;
	}).attr("y2", function(d) {
		return d.target.y;
	});
	// Update the nodes…
	node = node.data(nodes, function(d) {
		return d.id;
	}).style("fill", color);
	// Exit any old nodes.
	node.exit().remove();
	// Enter any new nodes.
	node.enter().append("circle")
	.attr("class", "node").attr("class", "circle").attr("cx", function(d) {
		return d.x;
	}).attr("cy", function(d) {
		return d.y;
	}).attr("r", function(d) {
		return Math.sqrt(d.size) / 5 || 8.5;
	}).style("fill", color).on("click", click).call(force.drag).append("svg:title")
	   .text(function(d) { return d.data.name; });
	
	   
}

function tick(e) {
	var k = 6 * e.alpha;
	
	link
	.each(function(d) { d.source.y -= k, d.target.y += k;})
	.attr("x1", function(d) {
		return d.source.x;
	}).attr("y1", function(d) {
		return d.source.y;
	}).attr("x2", function(d) {
		return d.target.x;
	}).attr("y2", function(d) {
		return d.target.y;
	});
	node.attr("cx", function(d) {
		return d.x;
	}).attr("cy", function(d) {
		return d.y;
	});
	
	
}
// Color leaf nodes orange, and packages white or blue.
function color(d) {
	return d._children ? "#3182bd" : d.children ? "#c6dbef" : "#013918";
}
// Toggle children on click.
function click(d) {
	
	if (!d3.event.defaultPrevented) {
		if (d.children) {
			d._children = d.children;
			d.children = null;
		} else if(d._children){
			d.children = d._children;
			d._children = null;
		}else{
			myLocalData.children[0] = {"name": d.parent.data.name, children: [{ name: d.data.name, children: []}]};
			

			d3.json("dbpediaVisualisator/resources/data/punahou-data.json",function(error,json){
				if(error) throw error;
				
				myjson = JSON.parse(JSON.stringify(myLocalData));
				myjson.children[0].children[0] = json;
				console.log(myjson,"localData");
				
				root = myjson;
				
			//	console.log(root,"new data");
				update();
			})
			
		}
	}
}
// Returns a list of all nodes under the root.
function flatten(root) {
	var nodes = [], i = 0;
	function recurse(node) {
		
		if (node.children){
			node.children.forEach(recurse);
		}
		if (!node.id)
			node.id = ++i;
		nodes.push(node);
	}
	recurse(root);
	return nodes;
}

function escapeRegExp(str) {
	  return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|:]/g, "\\$&");
}

function dragstart(d) {
	  d3.select(this).classed("fixed", d.fixed = true);
}



