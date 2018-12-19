/*

Author: Thomas Naylor
Filename: script.js

*/

function populateInfo()
{
	if(location.search)
	{
		var greeting = location.search;
		greeting = greeting.replace("+", " ");
		greeting = greeting.substring(greeting.lastIndexOf("=") + 1);
		document.getElementById("greetingtext").innerHTML = decodeURIComponent(greeting);
	}
}

if(window.addEventListener)
{
	window.addEventListener("load", populateInfo, false);
}
else if(window.addattachEvent)
{
	window.attachEvent("onload", populateInfo);
}