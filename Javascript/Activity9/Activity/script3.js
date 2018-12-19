/*
 *	Eating Well in Season
 *
 *	Author: Thomas Naylor
 *	Filename: script3.js
 */

function parseData()
{
	var formData = document.cookie;
	var formArray = [];
	var list = document.querySelector("div.results ul");
	formArray = formData.split("; ");
	for (var i = 0; i < formArray.length; i++)
	{
		var newItem = document.createElement("li");
		newItem.innerHTML = formArray[i];
		list.appendChild(newItem);
	}
}	

function clearCookies()
{
	var cookieString = document.cookie;
	var cookieArray = cookieString.split("; ");
	var expires = new Date();
	expiresDate.setDate(expireDate.getDate) - 7);
	for (var i = 0; i < cookieArray.length; i++)
	{
		document.cookie = cookieArray[i] + "; expires=" + expiresDate.toUTCString();
	}
}
 
/*
function parseData()
 {
	var formData = decodeURIComponent(location.search);
	var formArray = [];
	var list = document.querySelector("div.results ul");
	
	formData = formData.substring(1, formData.length);
	
	while (formData.indexOf("+") !== -1)
	{
			formData = formData.replace("+", " ");
	}
	
	formData = decodeURIComponent(formData);
	formArray = formData.split("&");
	
	for (var i = 0; i < formArray.length; i++)
	{
		var newItem = document.createElement("li");
		newItem.innerHTML = formArray[i];
		list.appendChild(newItem);
	}
 } 
 */
 
 if(window.addEventListener)
 {
	 window.addEventListener("load", clearCookies, false);
 }
 else if(window.attachEvent)
 {
	 window.attachEvent("onload", clearCookies);
 }
 
 if(window.addEventListener)
 {
	 window.addEventListener("load", parseData, false);
 }
 else if(window.attachEvent)
 {
	window.attachEvent("onload", parseData);
 }