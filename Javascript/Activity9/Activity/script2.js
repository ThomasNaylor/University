/*
 *	Eating Well in Season
 *
 *	Author: Thomas Naylor
 *	Filename: script2.js
 */
 
 "use strict";
 var queryArray = [];
 
 function populateInfo()
 {
	 if(location.search)
	 {
		var queryData = location.search;
		var hiddenInputs = document.querySelectorAll("input[type=hidden]");
		queryData = queryData.substring(1, queryData.length);
		queryArray = queryData.split("&");
		
		for (var i = 0; i < queryArray.length; i++)
		{
			hiddenInputs[i].value = queryArray[i].substring(queryArray[i].lastIndexOf("=") + 1);
		}
	 }
 }
 
 function createCookies()
 {
	 var formFields = document.querySelectorAll("input[type=hidden], input[type=radio], textarea");
	 var expiresDate = new Date();
	 
	 expiresDate.setDate(expiresDate.getDate() + 7);
	 
	 for (var i = 0; i < formFields.length; i++)
	 {
		 var currentValue = decodeURIComponent(formFields[i].value);
		 currentValue = currentValue.replace(/\+/g, " ");
		 document.cookie = formFields[i].name + "=" + currentValue + "; expires=" + expiresDate.toUTCString();
	 }
 }
 
 function handleSubmit(evt)
 {
	 if(evt.preventDefault)
	 {
		 evt.preventDefault();
	 }
	 else
	 {
		 evt.returnValue = false;
	 }
	 createCookies();
	 document.getElementsByTagName("form")[0].submit();
 }
 
 function createEventLiseners()
 {
	 var form = document.getElementsByTagName("form")[0];
	 if(form.addEventListener)
	 {
		 form.addEventListener("submit", handleSubmit, false);
	 }
	 else if(form.attachEvent)
	 {
		 form.attachEvent("onsubmit", handleSubmit);
	 }
 }
 
 function setUpPage()
 {
	 createEventLiseners();
	 populateInfo();
 }
 
 if(window.addEventListener)
 {
	 window.addEventListener("load", setUpPage, false);
 }
 else if(window.attachEvent)
 {
	window.attachEvent("onload", setUpPage);
 }