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

function returnStart(payload) {
	var array = payload.split('|');
	var result = '';
	array.forEach(function(part, index, array) {
		getJSON('http://stg-api.ibmbl.com/getPost.php?token=fdb603bb6d7e7532a088842932ad8368&id='+part,
		function(err, data) {
		  if (err != null) {
		    alert('Something went wrong: ' + err);
		  } else {
				result += "[QUOTE]"+data.data.message_bbcode+"[/QUOTE]";
		  }
		});
	});
	result += "[LIST][/LIST]";
	CKEDITOR.instances.editor.setData(result);


	//insertQuotes();
}

function startup() {
	WebViewBridge.send('started');
}

function insertQuotes() {
	// do this in a loop
	getJSON('http://stg-api.ibmbl.com/getPost.php?token=fdb603bb6d7e7532a088842932ad8368&id=175',
	function(err, data) {
	  if (err != null) {
	    alert('Something went wrong: ' + err);
	  } else {
			console.log("data: ", data.data.message_html);
			// Store the response
			CKEDITOR.instances.editor.setData(data.data.message_html);
	  }
	});
//	console.log('storage: ', storage);

	// Format all the quotes
}


function saveData(input) {
	var storage = input;
	printResponse(storage);
}

function printResponse(input) {
	CKEDITOR.instances.editor.setData(input);
}

function injectQuote(input) {
	CKEDITOR.instances.editor.setData(input);
}


var tobeInserted = "<div>bunch of html</div>";
CKEDITOR.on('instanceCreated', function(e) {
		//if (typeof toInject !== 'undefined' && toInject) {
		//if (1==1) {
			//e.editor.setData(tobeInserted);
			//insertQuotes();
		//}
		//insertQuotes();
		e.editor.focus();
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
