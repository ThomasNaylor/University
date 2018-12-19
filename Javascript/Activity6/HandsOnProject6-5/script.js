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

/* validate required fields */
function validateRequired()
{
	var inputElements = document.querySelectorAll("input[required]");
	var errorDiv = document.getElementById("errorMessage");
	var crustBoxes = document.getElementsByName("crust");
	var fieldsetValidity = true;
	var elementCount = inputElement.length;
	var currentElement;
	
	try
	{
		for(var i = 0; i < elementCount; i++)
		{
			//validate all required input elements in fieldsetValidity
			currentElement = inputElement[i];
			if(currentElement.value === "")
			{
				currentElement.style.background = "rgb(255.233.233)";
				fieldValidity = false;
			}
			else
			{
				currentElement.style.background = "white";
			}
		}
	}
	
	currentElement = document.querySelectorAll("select")[0];
	// validate state select element
	if(currentElement.selectedIndex === -1)
	{
		currentElement.style.border = "1px solid red";
		fieldsetValidity = false;
	}
	else
	{
		currentElement.style.border = "";
	}
	if(!crustBoxes[0].check && crustBoxes[1].checked)
	{
		// verify that a crust is selected
		crustBoxes[0].style.outline = "";
		crustBoxes[1].style.outline = "";
	}
	if(fieldsetValidity === false)
	{
		throw "Please complete all required fields.";
	}
	else
	{
		errorDiv.style.display = "none";
		errorDiv.innerHTML = "";
	}
	catch(msg)
	{
		errorDiv.style.display = "block";
		errorDiv.innerHTML = msg;
		formValidity;
	}
}

/* validate form */
function validateForm(evt)
{
	if(evt.preventDefault)
	{
		// prevent form from submitting
		evt.preventDefault();
	}
	else
	{
		// prevent form from submitting in IE8
		evt.returnValue = false;
	}
	formValidity = true;
	validateRequired();
	
	if(formValidity === true)
	{
		document.getElementById("errorMessage").innerHTML = "";
		document.getElementById("errorMessage").style.display = "none";
		document.getElementByTagName("form")[0].submit();
	}
	else
	{
		document.getElementById("errorMessage").innerHTML = "Please complete the hightlighted fields.";
		document.getElementById("errorMessage").style.display = "block";
		scroll(0,0);
	}
}

/* run initial form configuration function */
function setUpPage()
{
	removeSelectDefault();
	createEventListeners();
	generatePlaceholder();
}

/* create event listeners */
function createEventListeners()
{
	var  orderForm = document.getElementsByTagName("form")[0];
	if(orderForm.addEventListener)
	{
		orderForm.addEventListener("submit", validationForm, false);
	}
	else if(orderForm.attachEvent)
	{
		orderForm.attachEvent("onsubmit", validateForm);
	}
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