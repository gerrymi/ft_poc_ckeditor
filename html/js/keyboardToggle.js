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

CKEDITOR.on('instanceCreated', function(e) {
		var postEnabled = false;
    e.editor.on('change', function (event) {
				var content = CKEDITOR.instances.editor.getData();
				if (postEnabled == false && content.length > 9) {
					console.log("Went above 10", content.length);
					postEnabled = true;
					// send message
					WebViewBridge.send('longEnough');
				} else if (postEnabled && content.length < 10) {
					console.log("Went below 10", content.length);
					postEnabled = false;
					WebViewBridge.send('tooShort');
				}
    });
});
