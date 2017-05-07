$.ajax({
	'url': 'http://apis.is/concerts',
	'type': 'GET',
	'dataType': 'json',
	'success': function(response) {
		renderData(response);
		startSearch();
		loadLocationCheckboxes();
		checkboxFilter();
		filterByDate();
	}
});
function renderData(datas) {
	var data = datas['results']
	console.log(data.length);
	for (var i = 0; i < data.length; i++) {
		var event = data[i];
		var date = changeDate(event.dateOfShow);
		var insert = $("#mainThing");
		var eventTile = "<div class=\"col-md-4 eventContainer\"><img src='" + event.imageSource + "'><div class='eventName'>" + event.eventDateName + "</div><div class='location' data-location='" + event.eventHallName + "'>Staðsetning: " + event.eventHallName + "</div><div class='eventTime' data-time='" + event.dateOfShow + "'>Tími: " + date + "</div></div>";
		insert.append(eventTile);
	}
}
function changeDate(date) {
	var d = new Date(date);
	var day = d.getDate() + "." + (d.getMonth() + 1) + "." + d.getFullYear();
	var time = date.substring(11, date.length -3);
	return (day + " - " + time);
}

var filterByDate = function () {
	var events = $('#mainThing .eventContainer');
	var cache = [];
	
	events.each(function() {
		var date = $(this).children('.eventTime').data().time.trim().toLowerCase();
		var fixedDate = new Date(date);
		cache.push({
			element: this,
			date: fixedDate.getTime()
		});
	});
	$("#dateButton").click(function() {
		var fromDate = new Date($("#fromDate").val());
		var toDate = new Date($("#toDate").val());
		for (var i = 0; i < cache.length; i++) {
			if (cache[i].date >= fromDate && cache[i].date <= toDate) {
				cache[i].element.style.display = "";
			}
			else{
				cache[i].element.style.display = "none";
			}
		}
	});

}

var startSearch = function() {

	var events = $('#mainThing .eventContainer');
	var search = $('#textSearch');
	var cache = [];
	events.each(function() {
		cache.push({
			element: this,
			text: $(this).children('.eventName').text().trim().toLowerCase()
		});
	});
	
	function filter() {
	
		var query = this.value.trim().toLowerCase();
		cache.forEach(function(thing) {
		var index = 0;
		index = thing.text.indexOf(query);
		thing.element.style.display = index === -1 ? 'none' : '';
	});
	}
	
	search.on('keyup', filter);
}
var getLocations = function() {
	var events = $('#mainThing .eventContainer .location');
	var allTheLocations = [];
	events.each(function() {
		var location = $(this).data().location.trim().toLowerCase();
		allTheLocations.push(location);
	});
	return allTheLocations.unique();

}
var loadLocationCheckboxes = function() {

	var l = getLocations();
	var container = $("#checkboxContainer");
	l.forEach(function (thing) {
		container.append('<div class="checkbox"><label><input type="checkbox" class="locationCheckbox" value="' + thing + '"> ' + thing + '</label></div>');
	});
}
var checkboxFilter = function () {
	
	var container = $("#checkboxContainer");
	var checkers = $(".locationCheckbox");
	var cache = [];
	
	var events = $('#mainThing .eventContainer');
	events.each(function() {
		cache.push({
			element: this,
			text: $(this).children('.location').data().location.trim().toLowerCase()
		});
	});

	checkers.change(function() {
		console.log(this);
		var checkedArray = getCheckedArray();
		if (checkedArray.length == 0) {
			for (var i = 0; i < cache.length; i++) {
				cache[i].element.style.display = '';
			}
			console.log("nothing checked");
			return;
		}else{
			for (var i = 0; i < cache.length; i++) {
				for (var j = 0; j < checkedArray.length; j++) {
					if (checkedArray[j] == cache[i].text) {
						cache[i].element.style.display = '';
						break;
					}
					cache[i].element.style.display = 'none';
				}
			}
		}
	});
	function getCheckedArray() {
		var arr = [];
		checkers.each(function () {
			if (this.checked) {
				arr.push($(this).val().trim().toLowerCase());
			}
			return arr;
		});
		return arr;
	}
}




Array.prototype.contains = function(v) {
    for(var i = 0; i < this.length; i++) {
        if(this[i] === v){
        	 return true;
        }
    }
    return false;
};
Array.prototype.unique = function() {
    var arr = [];
    for(var i = 0; i < this.length; i++) {
        if(!arr.contains(this[i])) {
            arr.push(this[i]);
        }
    }
    return arr; 
}