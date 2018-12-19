/*
Thomas Naylor
7/14/2015
*/

"use strict";

var formValidity = true;

/* validate required fields */
function validateRequired()
{
	var inputElements = document.querySelectorAll("#contactinfo input");
	var errorDiv = document.getElementById("errorText");
	var elementCount = inputElements.length;
	var requiredValidity = true;
	var currentElement;
	
	try
	{
		for(var i = 0; i < elementCount; i++)
		{
			// validate all input elements in fieldset
			currentElement = inputElements[i];
			if(currentElement.value === "")
			{
				currentElement.style.background = "rgb (255,233,233)";
				requiredValidity = false;
			}
			else
			{
				currentElement.style.background = "white";
			}
		}
		if(requiredValidity === false)
		{
			throw "Please complete all fields.";
		}
		errorDiv.style.display = "none";
		errorDiv.innerHTML = "";
	}
	catch(msg)
	{
		errorDiv.style.display = "block";
		errorDiv.innerHTML = msg;
		formValidity = false;
	}
}
/* validate number fields for older browsers */
function validateNumbers()
{
	var numberInputs = document.querySelectorAll("#contactinfo input[type=number]");
	var elementCount = numberInputs.length;
	var numErrorDiv = document.getElementById("numErrorText");
	var numbersValidity = true;
	var currentElement;
	
	try
	{
		for(var i = 0; i < elementCount; i++)
		{
			//validate all input elements of type "number" in fieldset
			currentElement = numberInputs[i];
			if(isNaN(currentElement.value) || (currentElement.value === ""))
			{
				currentElement.style.background = "rgb(255,233,233)";
				numbersValidity = false;
			}
			else
			{
				currentElement.style.background = "white";
			}
		}
		
		if(numbersValidity === false)
		{
			throw "Zip and Social Security values must be numbers.";
		}
		numErrorDiv.style.display = "none";
		numErrorDiv.innerHTML = "";
	}
	catch(msg)
	{
		numErrorDiv.style.display = "block";
		numErrorDiv.innerHTML = msg;
		formValidity = false;
	}
}

/* remove fallback placeholder text */
function zeroPlaceholder()
{
	var addressBox = document.getElementById("addrinput");
	addressBox.style.color = "black";
	if(addressBox.value === addressBox.placeholder)
	{
		addressBox.value = "";
	}
}

/* restore placeholder text if box contains no user entry */
function checkPlaceholder()
{
	var addressBox = document.getElementById("addinput");
	if(addressBox.value === addressBox.placeholder)
	{
		addressBox.value = "";
	}
}

/* add placeholder text for browsers that don't support placeholder attributes */
function generatePlaceholder()
{
	if(!Modernizr.input.placeholder)
	{
		var addressBox = document.getElementById("addrinput");
		addressBox.value = addressBox.placeholder;
		address.Box.style.color = "rgb(178,184,183)";
		if(addressBox.addEventListener)
		{
			addressBox.addEventListener("focus", zeroPlaceholder, false);
			addressBox.addEventListener("blur", checkPlaceholder, false);
		}
		else if(addressBox.attachEvent)
		{
			addressBox.attachEvent("onfocus", zeroPlaceholder);
			addressBox.attachEvent("onblur", checkPlaceholder);
		}
	}
}
/* auto focus next element after complete */
function advanceSsn()
{
	var ssnFields = document.getElementsByClassName("ssn");
	var currentField = document.activeElement;
	if(currentField.value.length === currentField.maxLength)
	{
		if(currentField === ssnFields[0])
		{
			ssnFields[1].focus();
		}
		if(currentField === ssnFields[1])
		{
			ssnFields[2].focus();
		}
		if(currentField === ssnFields[2])
		{
			document.getElementById("submitBtn").focus();
		}
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
	validateNumbers();
	
	if(formValidity === true)
	{
		document.getElementsByTagName("form")[0].submit();
	}
}

/* run initial form configuration functions */
function setUpPage()
{
	createEventListeners();
	generatePlaceholder();
}

/* create event listeners */
function createEventListeners()
{
	var form = document.getElementsByTagName("form")[0];
	if(form.addEventListener)
	{
		form.addEventListener("submit", validateForm, false);
	}
	else if(form.attachEvent)
	{
		form.attachEvent("onsubmit", validateForm)
	}
	
	var ssnFields = document.getElementsByClassName("ssn");
	for(var i = 0; i < ssnFields.length; i++)
	{
		if(ssnFields[i].addEventListener)
		{
			ssnFields[i].addEventListener("input", advanceSsn, false);
		}
		else if(ssnFields[i].attachEvent)
		{
			ssnField[i].attachEvent("oninput", advanceSsn);
		}
	}
}

/* run setup function when page finishes loading */
if(window.addEventListener)
{
	window.addEventListener("load", setUpPage, false)
}
else if (window.attachEvent)
{
	window.attachEvent("onload", setUpPage);
}