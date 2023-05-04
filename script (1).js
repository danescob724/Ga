import createBareServer from "https://cdn.skypack.dev/@tomphttp/bare-server-node@1.2.5";
import http from "https://cdn.skypack.dev/node:http";
import fs from "https://cdn.skypack.dev/fs/promises";
import { createRequire } from "https://cdn.skypack.dev/module@1.2.5";
import express from "https://cdn.skypack.dev/express@4.18.2"; // Moved this line outside of the main function
const require = createRequire(import.meta.url);
const port = process.env.PORT || 80;

async function main() {
  // Create Bare
  const bare = createBareServer('/bare/');

  const app = express(); // Moved this line inside the main function

  // Set up caching for static files
  const cacheOptions = { maxAge: 86400000 }; // Cache static files for 1 day (in milliseconds)
  app.use(express.static('./public', cacheOptions));

  // Use route handling middleware for Express
  app.use((req, res, next) => {
    const routes = {
      '/': 'index.html',
      '/games': 'games.html',
      '/settings': 'settings.html',
      '/apps': 'apps.html',
      '/discord': 'discord.html',
      '/chat': 'chat.html'
    };
    const filename = routes[req.path];

    if (filename) {
      res.sendFile(filename, { root: './html' });
    } else {
      next();
    }
  });

  app.use((req, res) => {
    res.status(404).sendFile('404.html', { root: './html' });
  });

  const httpServer = http.createServer();

  httpServer.on('request', (req, res) => {
    if (bare.shouldRoute(req)) {
      bare.routeRequest(req, res);
    } else {
      app(req, res);
    }
  });

  httpServer.on('error', (err) => console.log(err));
  httpServer.on('upgrade', (req, socket, head) => {
    if (bare.shouldRoute(req)) {
      bare.routeUpgrade(req, socket, head);
    } else {
      socket.end();
    }
  });

  httpServer.listen({ port: port }, () => {
    console.log(`\x1b[42m\x1b[1m shuttle\n Port: ${port}\x1b[0m`);
    console.log('\x1b[41m\x1b[5m\x1b[1m\x1b[33m PLEASE NOTE: Shuttle is in a development stage. Expect bugs!\x1b[0m');
  });
}

main().catch((error) => console.error('An error occurred:', error));

{
  "name": "Shuttle Proxy",
  "description": "A simple web proxy",
  "image": "heroku/nodejs",
  "addons": [],
  "buildpacks": [
    {
      "url": "https://github.com/heroku/heroku-buildpack-nodejs.git"
    }
  ],
  "env": {
    "NODE_ENV": "production"
  },
  "scripts": {
    "start": "node ."
  },
  "formation": {
    "web": {
      "quantity": 1,
      "size": "Free"
    }
  }
}
function goBlank() {
  var page = new ABC({
    "type": "blank",
    "url": window.location.href
  })
  page.open()
  window.location.replace("https://google.com")
};
// This script below is made by
//  _____             _   _      _                      _    
// |  ___|__   __ _  | \ | | ___| |___      _____  _ __| | __
// | |_ / _ \ / _` | |  \| |/ _ \ __\ \ /\ / / _ \| '__| |/ /
// |  _| (_) | (_| | | |\  |  __/ |_ \ V  V / (_) | |  |   < 
// |_|  \___/ \__, | |_| \_|\___|\__| \_/\_/ \___/|_|  |_|\_\
//   

class ABC {
  constructor(config = {}) {
    this.type = config.type || "blank"
    this.url = config.url || "about:blank"
  }
  setType(type) {
    if (!type) return;
    this.type = type
  }
  setUrl(url) {
    if (!url) return;
    this.url = url
  }
  getCode() {
    return `<iframe style="height:100%; width: 100%; border: none; position: fixed; top: 0; right: 0; left: 0; bottom: 0; border: none" sandbox="allow-forms allow-modals allow-orientation-lock allow-pointer-lock allow-popups allow-popups-to-escape-sandbox allow-presentation allow-same-origin allow-scripts allow-top-navigation allow-top-navigation-by-user-activation" src="` + this.url + `"></iframe>`
  }
  open() {
    if (this.type == "blank") {
      try {
        var page = window.open()
        page.document.body.innerHTML = `<iframe style="height:100%; width: 100%; border: none; position: fixed; top: 0; right: 0; left: 0; bottom: 0; border: none" sandbox="allow-forms allow-modals allow-orientation-lock allow-pointer-lock allow-popups allow-popups-to-escape-sandbox allow-presentation allow-same-origin allow-scripts allow-top-navigation allow-top-navigation-by-user-activation" src="` + this.url + `"></iframe>`
      } catch {
      }
    } else if (this.type == "blob") {
      try {
        var page = new Blob([`<iframe style="height:100%; width: 100%; border: none; position: fixed; top: 0; right: 0; left: 0; bottom: 0; border: none" sandbox="allow-forms allow-modals allow-orientation-lock allow-pointer-lock allow-popups allow-popups-to-escape-sandbox allow-presentation allow-same-origin allow-scripts allow-top-navigation allow-top-navigation-by-user-activation" src="` + this.url + `"></iframe>`], { type: "text/html" })
        window.open(URL.createObjectURL(page))
      } catch {
      }
    } else if (this.type == "overwrite") {
      try {
        document.body.innerHTML = `<iframe style="height:100%; width: 100%; border: none; position: fixed; top: 0; right: 0; left: 0; bottom: 0; border: none" sandbox="allow-forms allow-modals allow-orientation-lock allow-pointer-lock allow-popups allow-popups-to-escape-sandbox allow-presentation allow-same-origin allow-scripts allow-top-navigation allow-top-navigation-by-user-activation" src="` + this.url + `"></iframe>`
      } catch {
      }
    }
  }
}
const buildGS = async () => {
  const res = await fetch('/assets/json/apps.json')
  const json = await res.json()
  console.log(json)
  json.forEach(element => {
    const div = document.createElement('div')
    div.className = "box"
    div.innerHTML = `<img class="gs-img" src="${element.image}" /><h7 class="h7 gs-box-header">${element.title}</h7>`
    div.setAttribute("onclick", `window.open('${element.loc}')`)
    document.getElementById('apps-container').append(div);
  })
}

buildGS()
// Create cookie
function setCookie(cname, cvalue, exdays) {
	const d = new Date();
	d.setTime(d.getTime() + (exdays*24*60*60*1000));
	let expires = "expires="+ d.toUTCString();
	document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

// Delete cookie
function deleteCookie(cname) {
	const d = new Date();
	d.setTime(d.getTime() + (24*60*60*1000));
	let expires = "expires="+ d.toUTCString();
	document.cookie = cname + "=;" + expires + ";path=/";
}

// Read cookie
function getCookie(cname) {
	let name = cname + "=";
	let decodedCookie = decodeURIComponent(document.cookie);
	let ca = decodedCookie.split(';');
	for(let i = 0; i <ca.length; i++) {
		let c = ca[i];
		while (c.charAt(0) == ' ') {
			c = c.substring(1);
		}
		if (c.indexOf(name) == 0) {
			return c.substring(name.length, c.length);
		}
	}
	return "";
}

// Set cookie consent
function acceptCookieConsent(){
	deleteCookie('user_cookie_consent');
	setCookie('user_cookie_consent', 1, 30);
	document.getElementById("cookieNotice").style.display = "none";
}

// Set visibility of the cookie consent popup
let cookie_consent = getCookie("user_cookie_consent");
if(cookie_consent != ""){
	document.getElementById("cookieNotice").style.display = "none";
	document.getElementById("acceptNoti").style.display = "block";
}else{
	document.getElementById("cookieNotice").style.display = "block";
	document.getElementById("acceptNoti").style.display = "none";
}
const search = document.getElementById('search')

document.getElementById("form").addEventListener("submit", function(e) {
  e.preventDefault()
  pxy(search.value)
});
function uv(url) {
  window.location.hash = btoa(url)
  document.getElementById('align').style.display = 'flex';
  document.getElementsByClassName('sidebar').display = 'none';
  proxy()
}
function searchurl(url) {
  switch (localStorage.getItem("search")) {
    case 'DuckDuckGo':
      uv(`https://duckduckgo.com/?q=${url}`)
      break;
    case 'Brave':
      uv(`https://search.brave.com/search?q=${url}`)
      break;
    case 'Google':
      uv(`https://www.google.com/search?q=${url}`)
      break;
    default:
      localStorage.setItem("search", "Google")
      uv(`https://google.com/search?q=${url}`)
  }
}
function pxy(url) {
  console.log(`Going to ${url}`)
  if (!isUrl(url)) {
    searchurl(url)
  } else {
    if (!(url.startsWith('https://') || url.startsWith('http://'))) url = 'http://' + url
    uv(url)
  }
}
function isUrl(val = '') {
  if (/^http(s?):\/\//.test(val) || val.includes('.') && val.substr(0, 1) !== ' ') return true;
  return false;
}const buildGS = async () => {
  const res = await fetch('/assets/json/gs.json')
  const json = await res.json()
  console.log(json)
  json.forEach(element => {
    const div = document.createElement('div')
    div.className = "box"
    div.innerHTML = `<img class="gs-img" src="${element.image}" /><h7 class="h7 gs-box-header">${element.title}</h7>`
    div.setAttribute("onclick", `window.open('${element.loc}')`)
    document.getElementById('gs-container').append(div)
  })
}

buildGS()
particlesJS("particles-js", {"particles":{"number":{"value":558,"density":{"enable":true,"value_area":800}},"color":{"value":"#ffffff"},"shape":{"type":"circle","stroke":{"width":0,"color":"#000000"},"polygon":{"nb_sides":5},"image":{"src":"img/github.svg","width":100,"height":100}},"opacity":{"value":0.9700642968236413,"random":false,"anim":{"enable":false,"speed":1,"opacity_min":0.1,"sync":false}},"size":{"value":3,"random":true,"anim":{"enable":false,"speed":40,"size_min":0.1,"sync":false}},"line_linked":{"enable":false,"distance":150,"color":"#ffffff","opacity":0.4,"width":1},"move":{"enable":true,"speed":2,"direction":"bottom","random":true,"straight":true,"out_mode":"out","bounce":false,"attract":{"enable":false,"rotateX":600,"rotateY":1200}}},"interactivity":{"detect_on":"canvas","events":{"onhover":{"enable":true,"mode":"grab"},"onclick":{"enable":false,"mode":"push"},"resize":true},"modes":{"grab":{"distance":292.33117874427535,"line_linked":{"opacity":0.2714664122011815}},"bubble":{"distance":400,"size":40,"duration":2,"opacity":8,"speed":3},"repulse":{"distance":200,"duration":0.4},"push":{"particles_nb":4},"remove":{"particles_nb":2}}},"retina_detect":true});var count_particles, stats, update; stats = new Stats; stats.setMode(0); stats.domElement.style.position = 'absolute'; stats.domElement.style.left = '0px'; stats.domElement.style.top = '0px'; document.body.appendChild(stats.domElement); count_particles = document.querySelector('.js-count-particles'); update = function() { stats.begin(); stats.end(); if (window.pJSDom[0].pJS.particles && window.pJSDom[0].pJS.particles.array) { count_particles.innerText = window.pJSDom[0].pJS.particles.array.length; } requestAnimationFrame(update); }; requestAnimationFrame(update);;

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/uv.sw-handler.js', { scope: __uv$config.prefix })
}

function fullscreen() {
  var elem = document.getElementById('ifr')
  if (elem.requestFullscreen) {
    elem.requestFullscreen();
  } else if (elem.webkitRequestFullscreen) { /* Safari */
    elem.webkitRequestFullscreen();
  } else if (elem.msRequestFullscreen) { /* IE11 */
    elem.msRequestFullscreen();
  }
}
function changeFavicon(f) {
  var link = document.querySelector("link[rel~='icon']");
  if (!link) {
    link = document.createElement('link');
    link.rel = 'icon';
    document.head.appendChild(link);
  }
  link.href = f;
}
window.onload = () => {
  if(localStorage.getItem('title')) {
    document.title = localStorage.getItem('title')
  }
  if(localStorage.getItem('favicon')) {
    changeFavicon(localStorage.getItem('favicon'))
  }
}
/*document.addEventListener("visibilitychange", () => {
  var l = localStorage.getItem('autoCloak')
  if(!l) return;
  if (document.visibilityState === 'hidden') {
    switch (l) {
      case 'low':
        changeFavicon('https://google.com/favicon.ico')
        document.title = 'Google'
      case 'high':
        document.location.href = 'https://google.com'
    }
  } else if (document.visibilityState === 'visible') {
    changeFavicon(localStorage.getItem('favicon'))
    document.title = localStorage.getItem('title')
  } else{ console.log('Visibility Change: ' + document.visibilityState) }
});*/

/* ---- particles.js config ---- */

particlesJS("particles-js", {
  "particles": {
    "number": {
      "value": 200,
      "density": {
        "enable": true,
        "value_area": 600
      }
    },
    "color": {
      "value": "#ffffff"
    },
    "shape": {
      "type": "circle",
      "stroke": {
        "width": 0,
        "color": "#000000"
      },
      "polygon": {
        "nb_sides": 5
      },
      "image": {
        "src": "img/github.svg",
        "width": 100,
        "height": 100
      }
    },
    "opacity": {
      "value": 1,
      "random": true,
      "anim": {
        "enable": false,
        "speed": 1,
        "opacity_min": 0.1,
        "sync": false
      }
    },
    "size": {
      "value": 3,
      "random": true,
      "anim": {
        "enable": false,
        "speed": 40,
        "size_min": 0.1,
        "sync": false
      }
    },
    "line_linked": {
      "enable": false,
      "distance": 150,
      "color": "#ffffff",
      "opacity": 0.4,
      "width": 1
    },
    "move": {
      "enable": true,
      "speed": 2,
      "direction": "bottom",
      "random": true,
      "straight": false,
      "out_mode": "out",
      "bounce": false,
      "attract": {
        "enable": false,
        "rotateX": 600,
        "rotateY": 1200
      }
    }
  },
  "interactivity": {
    "detect_on": "canvas",
    "events": {
      "onhover": {
        "enable": true,
        "mode": "repulse"
      },
      "onclick": {
        "enable": false,
        "mode": "push"
      },
      "resize": true
    },
    "modes": {
      "grab": {
        "distance": 400,
        "line_linked": {
          "opacity": 1
        }
      },
      "bubble": {
        "distance": 400,
        "size": 40,
        "duration": 2,
        "opacity": 8,
        "speed": 3
      },
      "repulse": {
        "distance": 40,
        "duration": 0.4
      },
      "push": {
        "particles_nb": 4
      },
      "remove": {
        "particles_nb": 2
      }
    }
  },
  "retina_detect": true
});

function proxy() {
	if ('serviceWorker' in navigator) {
		var i = document.getElementById('ifr');
		let url = atob(decodeURIComponent(window.location.hash.slice(1)));
		console.log(url)
		navigator.serviceWorker.register('/uv.sw-handler.js', {scope: __uv$config.prefix}).then(() => {
			i.src = __uv$config.prefix + __uv$config.encodeUrl(url);
			var m = document.getElementById('m');
			document.getElementById('settings').style.display = 'none';
			i.onload = function() {
				m.innerText = i.contentDocument.title;
				window.location.hash = btoa(__uv$config.decodeUrl(i.contentWindow.location.href.split('/')[4]))
			}
		});
	}
	else {
		document.getElementById('m').innerHTML = "Fatal Error: Your browser does not support service workers, please join our <a href='https://discord.gg/xi'>Discord</a> for more information."
	}
}

navigator.serviceWorker.getRegistrations().then(registrations => {
	if(registrations[0] === undefined) {
		document.getElementById('m').innerHTML = "Fatal Service Worker Error: Please join our <a href='https://discord.gg/xi'>Discord</a> to report this issue or try again later"
	}
});
function load() {
	if(!(btoa(window.location.hash.slice(1)))) return true;
	document.getElementById('align').style.display = 'flex';
	document.getElementsByClassName('sidebar').display = 'none';
	proxy()
}
window.addEventListener("DOMContentLoaded", () => {
        load()
    });

function back() {
	document.getElementById('align').style.display = "none";
	document.getElementsByClassName('sidebar').display = 'none';
}
const changeSearch = (target) => {
  switch (target.value) {
    case 'DuckDuckGo':
      localStorage.setItem('search', 'DuckDuckGo')
      break;
    case 'Brave':
      localStorage.setItem('search', 'Brave');
      break;
    case 'Google':
      localStorage.setItem('search', 'Google');
      break;
    default: 
      localStorage.setItem('search', 'Google')
  }
}
/*const changeAutoCloak = (target) => {
  switch (target.value) {
    case 'None':
      localStorage.setItem('autoCloak', false)
      break;
    case 'Low':
      localStorage.setItem('autoCloak', 'low');
      break;
    case 'High':
      localStorage.setItem('autoCloak', 'high');
      break;
  }
}*/
[
  {
    "image": "/assets/img/apps/youtube.jpg",
    "loc": "/#aHR0cHM6Ly95b3V0dWJlLmNvbQ==",
    "title": "Youtube"
  },
  {
    "image": "/assets/img/apps/spotify.jpg",
    "loc": "/#aHR0cHM6Ly9zcG90aWZ5LmNvbQ==",
    "title": "Spotify"
  },
  {
    "image": "/assets/img/apps/discord.jpg",
    "loc": "/#aHR0cHM6Ly9kaXNjb3JkLmNvbQ==",
    "title": "Discord"
  },
  {
    "image": "/assets/img/apps/vsc.png",
    "loc": "/#aHR0cHM6Ly92c2NvZGUuZGV2",
    "title": "VS Code"
  },
  {
    "image": "/assets/img/apps/snap.png",
    "loc": "/#aHR0cHM6Ly93ZWIuc25hcGNoYXQuY29t",
    "title": "Snapchat"
  },
  {
    "image": "/assets/img/apps/tiktok.png",
    "loc": "/#aHR0cHM6Ly93d3cudGlrdG9rLmNvbS8=",
    "title": "TikTok"
  },
  {
    "image": "/assets/img/apps/gmail.webp",
    "loc": "/#aHR0cHM6Ly9tYWlsLmdvb2dsZS5jb20v",
    "title": "Gmail"
  },
  {
    "image": "/assets/img/apps/github.png",
    "loc": "/#aHR0cHM6Ly9naXRodWIuY29tLw==",
    "title": "GitHub"
  },
    {
    "image": "/assets/img/apps/twitch.webp",
    "loc": "/#aHR0cHM6Ly93d3cudHdpdGNoLnR2Lw==",
    "title": "Twitch"
  },
    {
    "image": "/assets/img/apps/pinterest.png",
    "loc": "/#aHR0cHM6Ly93d3cucGludGVyZXN0LmNvbS8=",
    "title": "Pinterest"
  },
      {
    "image": "/assets/img/apps/facebook.webp",
    "loc": "/#aHR0cHM6Ly93d3cuZmFjZWJvb2suY29tLw==",
    "title": "Facebook"
  }
][
 {
    "image": "/assets/img/gs/roblox.jpeg",
    "loc": "/#aHR0cHM6Ly9reGQuZm0vcm9ibG94L3YyLw==",
    "title": "Shuttle Games"
  }
]