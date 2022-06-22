/*****************************************************************************************************************************************************************/
//**************************************************FUNCTIONS****************************************************************************************************/
/***************************************************************************************************************************************************************/


window.onload = function(){		//Open the extension with the text box already
	document.getElementById("searchBox").focus();
}


function parseInformation() {	//Parse the information on the checkbox to an alternate text of an HTML element

	var specialCharacters = [["æ", "ae"], ["â", "a"], ["á", "a"], ["à", "a"], ["é", "e"], ["ö", "o"], ["û", "u"], ["ú", "u"]];
	var searchText = document.getElementById("searchBox").value.toLowerCase();
	
	//Store card name in alt
	document.getElementById("searchBox").alt = searchText;

	//Replace special characters
	for(var i = 0; i < searchText.length; i++) {
		for(var n = 0; n < specialCharacters.length; n++) {
			if(searchText[i] == specialCharacters[n][0]) {
				searchText = searchText.replace(searchText[i], specialCharacters[n][1]);
			}
		}
	}
}

function checkTextBox(){	//Parse the information on the text box and then check if it's empty.
	parseInformation()
	return document.getElementById("searchBox").alt != "";
}


/*****************************************************************************************************************************************************************/
//**************************************************EVENT HANDLING***********************************************************************************************/
/***************************************************************************************************************************************************************/

//Redirect to DBS Decks Main Page
document.getElementById("YGOTOPDECKSButton").onclick = function() {
	chrome.tabs.create({ url: "http://yugiohtopdecks.com"});
};

//Redirect to TCGPlayer
document.getElementById("TCGPlayerButton").onclick = function() {
	parseInformation()
	if(document.getElementById("searchBox").alt != "")
		chrome.tabs.create({ url: "http://shop.tcgplayer.com/yugioh/product/show?ProductName=" + document.getElementById("searchBox").alt });
	else
		chrome.tabs.create({ url: "https://shop.tcgplayer.com/yugioh/product/show" + document.getElementById("searchBox").alt });
};

document.getElementById("cardListButton").onclick = function() {
	chrome.tabs.create({ url: "https://db.ygoprodeck.com"});
}

function isTCGPlayer(){
	return (navigator.language == "en-US" || navigator.language == "en-CA" || navigator.language == "fr-CA" || navigator.language == "en-NZ" || navigator.language == "en-AU" )
}



function KeyPress(e) {
	if (evtobj.keyCode == 13 && evtobj.shiftKey) alert("Ctrl+z");
}

document.onkeydown = KeyPress;

document.getElementById("searchBox").onkeydown = function(e) {

	
	var evtobj = window.event? event : e

	if(evtobj.shiftKey && evtobj.keyCode == 13 && checkTextBox())
	{
		chrome.tabs.create({ url: "https://db.ygoprodeck.com/search/?card=" + document.getElementById("searchBox").alt });
	}

	else if(!evtobj.shiftKey && evtobj.keyCode == 13 && checkTextBox()) {

		if(isTCGPlayer()) //If its an American/Canada player, it searches for TCGPLAYER
			chrome.tabs.create({ url: "http://shop.tcgplayer.com/yugioh/product/show?ProductName=" + document.getElementById("searchBox").alt });

		else //If its an European player, it searches for MKM
			chrome.tabs.create({ url: "https://www.cardmarket.com/es/YuGiOh/Products/Search?searchString=" + document.getElementById("searchBox").alt });

	}

	
};

