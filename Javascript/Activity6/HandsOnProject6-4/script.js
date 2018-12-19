/*
Thomas Naylor
7/14/15
*/

"use strict";

/* remove default value and formatting from selection list */
function removeSelectDefault() 
{
	var selectBox = document.getElementById("size");
	selectBox.selectedIndex = -1;
	selectBox.style.boxShadow = "none";
}

/* remove fallback placeholder text */
function zeroPlaceholder()
{
	var instrBox = document.getElementById("instructions");
	instrBox.style.color = "black";
	
	if(instrBox.value === instrBox.placeholder)
	{
		instrBox.value = "";
	}
}

/* restore placeholder text if box container no user entry */
function checkPlaceholder()
{
	var instrBox = document.getElementById("instruction");
	if(instrBox.value === "")
	{
		instrBox.style.color = "rgb(178,184,183)";
		instrBox.value = instrBox.placeholder;
	}
}

/* add placeholder text for browser that don't support placeholder attribute */
function generatePlaceholder()
{
	if(!Modernizr.input.placeholder)
		{
		var instrBox = document.getElementById("instructions");
		instrBox.value = instrBox.placeholder;
		instrBox.style.color = "rgb(178,184,183)";
		
		if(instrBox.addEventListener)
		{
			instrBox.addEventListener("focus", zeroPlaceholder, false);
			instrBox.addEventListener("blur", checkPlaceholder, false);
		}
		else if(instrBox.attachEvent)
		{
			instrBox.attachEvent("onfocus", zeroPlaceholder);
			instrBox.attachEvent("onfocus", checkPlaceholder);
		}
	}
}

/* run initial form configuration function */
function setUpPage()
{
	removeSelectDefault();
	generatePlaceholder();
}

/* run setup function when page finishes loading */
if(window.addEventListener)
{
	window.addEventListener("load", setUpPage, false)
}
else if(window.attachEvent)
{
	window.attachEvent("onload", setUpPage);
}