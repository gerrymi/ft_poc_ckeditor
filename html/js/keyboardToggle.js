function showToolbar(newHeight) {
	var contents = document.getElementById("cke_1_contents")
	contents.style.height = newHeight
	var toolbar = document.getElementById("cke_1_bottom")
	toolbar.style.opacity = 1
}

function hideToolbar(newHeight) {
	var contents = document.getElementById("cke_1_contents")
	contents.style.height = newHeight
	var toolbar = document.getElementById("cke_1_bottom")
	toolbar.style.opacity = 0
}

function insertQuotes(insert) {
	var storage = [];
	// do this in a loop
	getJSON('http://stg-api.ibmbl.com/getTrending.php',
	function(err, data) {
	  if (err != null) {
	    alert('Something went wrong: ' + err);
	  } else {
			console.log("data: ", data.status);
			// Store the response
			storage.push(data.status);
	  }
	});
	printResponse(storage);
	// Format all the quotes

}

function printResponse(input) {
	console.log("storage: ", input);
	console.log("storage O: ", input[0]);
	CKEDITOR.instances.editor.setData(input[0]);
}

function injectQuote(input) {
	CKEDITOR.instances.editor.setData(input);
}

CKEDITOR.on('instanceCreated', function(e) {
		var postEnabled = false;
    e.editor.on('change', function (event) {
				var content = CKEDITOR.instances.editor.getData();
				if (postEnabled == false && content.length > 9) {
					postEnabled = true;
					WebViewBridge.send('longEnough');
				} else if (postEnabled && content.length < 10) {
					postEnabled = false;
					WebViewBridge.send('tooShort');
				}
    });
});


var getJSON = function(url, callback) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.responseType = 'json';
    xhr.onload = function() {
      var status = xhr.status;
      if (status == 200) {
        callback(null, xhr.response);
      } else {
        callback(status);
      }
    };
    xhr.send();
};
