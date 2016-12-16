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