// ==UserScript==
// @name Privacy Redirector
// @name:tr Gizlilik Yönlendiricisi
// @namespace https://github.com/dybdeskarphet/privacy-redirector
// @license GPLv3
// @version 1.2.7
// @description	Redirect social media platforms to their privacy respecting frontends
// @description:tr Sosyal medya platformlarını, gizliliğe saygı duyan önyüzlerine yönlendirir
// @updateURL https://raw.githubusercontent.com/dybdeskarphet/privacy-redirector/main/privacy-redirector.js
// @downloadURL https://raw.githubusercontent.com/dybdeskarphet/privacy-redirector/main/privacy-redirector.js
// @supportURL https://github.com/dybdeskarphet/privacy-redirector
// @run-at document-start
// @match *://instagram.com/*
// @match *://*.instagram.com/*
// @match *://twitter.com/*
// @match *://*.twitter.com/*
// @match *://reddit.com/*
// @match *://*.reddit.com/*
// @match *://youtube.com/*
// @match *://*.youtube.com/*
// @match *://*.tiktok.com/*
// @match *://imgur.com/*
// @match *://*.imgur.com/*
// @match *://medium.com/*
// @match *://*.medium.com/*
// @match *://translate.google.com/*
// @match *://news.ycombinator.com/*
// @match *://*.reuters.com/*
// @match *://*.wikipedia.org/*
// ==/UserScript==

/*
  ___  _   _        ___  _____ _____ 
 / _ \| \ | |      / _ \|  ___|  ___|
| | | |  \| |_____| | | | |_  | |_   
| |_| | |\  |_____| |_| |  _| |  _|  
 \___/|_| \_|      \___/|_|   |_|    

CHANGE THE RELEVANT VALUE TO "false" TO
DISABLE THE REDIRECTION FOR THAT
PARTICULAR SITE */
var redirect_youtube = true;
var redirect_instagram = true;
var redirect_twitter = true;
var redirect_reddit = true;
var redirect_tiktok = true;
var redirect_imgur = true;
var redirect_medium = true;
var redirect_hackernews = true;
var redirect_gtranslate = true;
var redirect_reuters = true;
var redirect_wikipedia = true;

// // // // // // // // // // // // //

var farsideInstance = "farside.link";
var debug_mode = false;

if (debug_mode == true) {
	alert("Path: " + window.location.pathname + "\nQuery: " + window.location.search + "\nHash: " + window.location.hash)
}

function redirectInstagram() {
	if (redirect_instagram == false) {
		return;
	}

	window.stop();

	let bibliogramInstances = [
		'bibliogram.art',
		'bibliogram.pussthecat.org',
		'bibliogram.1d4.us',
		'bibliogram.froth.zone'
	];

	let randomInstance = bibliogramInstances[Math.floor(Math.random()*bibliogramInstances.length)];

	if (window.location.pathname.startsWith("/accounts/login/")) {
		if (window.location.search.indexOf("/reel/") != -1) { // reels
			let newURL = window.location.protocol + "//" + randomInstance + window.location.pathname.replace("/accounts/login/", "/") + window.location.search.replace("?next=/reel", "p") + window.location.hash;
			window.location.replace(newURL);
		} else if (window.location.search.indexOf("/p/") == -1) { // user pages - it will break if it's not the second last block
			let newURL = window.location.protocol + "//" + randomInstance + window.location.pathname.replace("/accounts/login/", "/") + window.location.search.replace("?next=", "u") + window.location.hash;
			window.location.replace(newURL);
		} else { // probably a post
			let newURL = window.location.protocol + "//" + randomInstance + window.location.pathname.replace("/accounts/login/", "") + window.location.search.replace("?next=", "") + window.location.hash;
			window.location.replace(newURL);
		}
	} else {
		if (window.location.pathname == "/") { // home page
			location.hostname = randomInstance
		} else if (window.location.pathname.startsWith("/reel/")) { // reel
			let newURL = window.location.protocol + "//" + randomInstance + window.location.pathname.replace("/reel", "/p")  + window.location.hash;
			window.location.replace(newURL);
		} else if (! window.location.pathname.startsWith("/p/")) { // user page - it will break if it's not the second last block
			let newURL = window.location.protocol + "//" + randomInstance + "/u" + window.location.pathname + window.location.search + window.location.hash;
			window.location.replace(newURL);
		} else { // probably a post
			location.hostname = randomInstance 
		}
	}
}

function redirectTwitter() {
	if (redirect_twitter == false) {
		return;
	}

	window.stop();

	let newURL = window.location.protocol + "//" + farsideInstance + "/nitter" + window.location.pathname + window.location.search + window.location.hash;
	window.location.replace(newURL);
}

function redirectReddit() {
	if (redirect_reddit == false) {
		return;
	}

	window.stop();

	let farsideLibreddit = farsideInstance + "/libreddit";
	let farsideTeddit = farsideInstance + "/teddit";

	if (window.location.hostname == "old.reddit.com") {
		let newURL = window.location.protocol + "//" + farsideTeddit + window.location.pathname + window.location.search + window.location.hash;
		window.location.replace(newURL);
	} else {
		let newURL = window.location.protocol + "//" + farsideLibreddit + window.location.pathname + window.location.search + window.location.hash;
		window.location.replace(newURL);
	}
}

function redirectYoutube() {
	if (redirect_youtube == false) {
		return;
	}

	window.stop();

	let newURL = window.location.protocol + "//" + farsideInstance + "/invidious" + window.location.pathname + window.location.search + window.location.hash;
	window.location.replace(newURL);
}

function redirectTiktok() {
	if (redirect_tiktok == false) {
		return;
	}

	window.stop();

	if (window.location.pathname.startsWith("/discover")) {
		let newURL = window.location.protocol + "//" + "proxitok.herokuapp.com" + window.location.pathname.replace("discover", "tag") + window.location.hash;
		window.location.replace(newURL);
	} else if (window.location.pathname.search(/[a-z][a-z]\-[A-Z][A-Z]/g) != -1) {
		let newURL = window.location.protocol + "//" + "proxitok.pussthecat.org";
		window.location.replace(newURL);
	} else {
		location.hostname = "proxitok.pussthecat.org";
	}

}

function redirectImgur() {
	if (redirect_imgur == false) {
		return;
	}

	window.stop();

	let newURL = window.location.protocol + "//" + farsideInstance + "/rimgo" + window.location.pathname + window.location.search + window.location.hash;
  window.location.replace(newURL);
}

function redirectMedium() {
	if (redirect_medium == false || window.location.pathname == "/") {
		return;
	}

	window.stop();

	let newURL = window.location.protocol + "//" + farsideInstance + "/scribe" + window.location.pathname + window.location.search + window.location.hash;
	window.location.replace(newURL);
}

function redirectYoutubeMusic() {
	if (redirect_youtube == false) {
		return;
	}

	window.stop();

	if (window.location.pathname.startsWith("/playlist")) {
		let newURL = window.location.protocol + "//" + "beatbump.ml" + window.location.pathname + window.location.search.replace("?list=", "/VL") + window.location.hash;
		window.location.replace(newURL);
	} else if (window.location.pathname.startsWith("/channel")) {
		let newURL = window.location.protocol + "//" + "beatbump.ml" + window.location.pathname.replace("/channel", "/artist") + window.location.search + window.location.hash;
		window.location.replace(newURL);
	} else if (window.location.pathname.startsWith("/explore")) {
		let newURL = window.location.protocol + "//" + "beatbump.ml" + window.location.pathname.replace("/explore", "/trending") + window.location.search + window.location.hash;
		window.location.replace(newURL);
	} else if (window.location.pathname.startsWith("/moods_and_genres")) {
		let newURL = window.location.protocol + "//" + "beatbump.ml" + window.location.pathname.replace("/moods_and_genres", "/explore") + window.location.search + window.location.hash;
		window.location.replace(newURL);
	} else {
		location.hostname = "beatbump.ml";
	}

}

function redirectHackerNews() {
	if (redirect_hackernews == false) {
		return;
	}

	window.stop();
	let newURL = window.location.protocol + "//" + "hn.algolia.com";
	window.location.replace(newURL);
}

function redirectGTranslate() {
	if (redirect_gtranslate == false) {
		return;
	}

	window.stop();


	if (window.location.search != "") {
		let newURL = window.location.protocol + "//" + farsideInstance + "/lingva" + window.location.pathname + window.location.search.replace(/\?hl=tr/, "").replace(/.sl=/, "").replace("&tl=", "/").replace("&text=", "/").replace("&op=translate", "") + window.location.hash;
		window.location.replace(newURL);
	} else {
		let newURL = window.location.protocol + "//" + farsideInstance + "/lingva";
		window.location.replace(newURL);
	}
}

function redirectReuters() {
	if (redirect_reuters == false) {
		return;
	}

	window.stop();
	location.hostname = "neuters.de";
}

function redirectWikipedia() {
	if (redirect_wikipedia == false) {
		return;
	}
	
	let langCodeIndex = window.location.hostname.search(/^[a-z][a-z]\./)

	window.stop();

	if (langCodeIndex != -1) {
		let newURL = window.location.protocol + "//" + farsideInstance + "/wikiless" + window.location.pathname + "?lang=" + window.location.hostname[langCodeIndex] + window.location.hostname[langCodeIndex + 1] + window.location.hash;
		window.location.replace(newURL);
	} else {
		let newURL = window.location.protocol + "//" + farsideInstance + "/wikiless" + window.location.pathname + "?lang=en" + window.location.hash;
		window.location.replace(newURL);
	}
}

var urlHostname = window.location.hostname;

switch (urlHostname) {

	case "www.instagram.com":
		redirectInstagram();
		break;

	case "twitter.com":
	case "mobile.twitter.com":
		redirectTwitter();
		break;

	case "www.reddit.com":
	case "old.reddit.com":
		redirectReddit();
		break;

	case "www.youtube.com":
	case "m.youtube.com":
		redirectYoutube();
		break;

	case "www.tiktok.com":
		redirectTiktok();
		break;

	case "music.youtube.com":
		redirectYoutubeMusic();
		break;

	case "news.ycombinator.com":
		redirectHackerNews();
		break;

	case "translate.google.com":
		redirectGTranslate();
		break;

	case "www.reuters.com":
		redirectReuters();
		break;
}

if (urlHostname.includes("medium.com")) {
	redirectMedium();
} else if (urlHostname.includes("imgur.com")) {
	redirectImgur();
} else if (urlHostname.includes("wikipedia.org")) {
	redirectWikipedia();
}
