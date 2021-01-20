
d3.csv("data/states.csv").then(function(states) {

	console.log(states);
	// console.log(d3.select("#states"));
	
	d3.select("#states")
		.selectAll("option")
		.data(states)
		.enter()
		.append("option")
		.attr("value", function(d) { return d.abbreviation })
		.text(function(d) { return d.name; });
	
	d3.select("#states")
		.insert("option", ":first-child")
		.attr("value", "")
		.attr("selected", "selected")
		.text("Select a state or territory...");
	
	d3.select("#states")
		.on("change", function() {

			var dropdown = d3.select(this);
			var selectedIndex = dropdown.property('selectedIndex');
			var selectedOption = dropdown.selectAll("option")
				.filter(function (d, i) { return i === selectedIndex });
        	var data;
			selectedOption.each(function(d) { data = d; });
			
			// alert(data.name);
			
			var newState = d3.select("#" + data.abbreviation);

			if (newState.empty()) {
				d3.selectAll(".state").classed("visible", false);
				d3.select("#missingWarning").classed("visible", true);
			} else {
				newState.classed("visible", true);
				d3.select("#missingWarning").classed("visible", false);
			}
			
		});
	
});
