if(!self.define){let e,i={};const n=(n,s)=>(n=new URL(n+".js",s).href,i[n]||new Promise((i=>{if("document"in self){const e=document.createElement("script");e.src=n,e.onload=i,document.head.appendChild(e)}else e=n,importScripts(n),i()})).then((()=>{let e=i[n];if(!e)throw new Error(`Module ${n} didn’t register its module`);return e})));self.define=(s,r)=>{const o=e||("document"in self?document.currentScript.src:"")||location.href;if(i[o])return;let c={};const f=e=>n(e,o),a={module:{uri:o},exports:c,require:f};i[o]=Promise.all(s.map((e=>a[e]||f(e)))).then((e=>(r(...e),c)))}}define(["./workbox-fa446783"],(function(e){"use strict";self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"assets/index-0826924a.css",revision:null},{url:"assets/index-0865a9bc.js",revision:null},{url:"assets/index-be92cd97.js",revision:null},{url:"index.html",revision:"6a6cf5adb07831da8eb515ab2acca827"},{url:"registerSW.js",revision:"402b66900e731ca748771b6fc5e7a068"},{url:"pwa-64x64.png",revision:"e56d0b8f80fad1e5206fe38422f19b15"},{url:"apple-touch-icon-180x180.png",revision:"f0166c767183d1f5ca1834c2046c66cd"},{url:"favicon.ico",revision:"6e3d1a7e17b7994f1653e3e0a6ddc5f0"},{url:"logo.png",revision:"03e51300a666fdffbfbbe579e638e6cd"},{url:"maskable-icon-512x512.png",revision:"a968f9581aa2728e591975302fc155eb"},{url:"pwa-192x192.png",revision:"969661b7d1ecf79d27e0e6ff9a16e408"},{url:"pwa-512x512.png",revision:"57527226cda95bef4cca5400ac71a818"},{url:"manifest.webmanifest",revision:"0992cff00f27bb0001d322ceaeb6f5f1"}],{}),e.cleanupOutdatedCaches(),e.registerRoute(new e.NavigationRoute(e.createHandlerBoundToURL("index.html")))}));
