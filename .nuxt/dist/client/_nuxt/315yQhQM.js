import{_ as M,o as w,c as T,a as p,t as x,Z as R,r as k,g as W,z as Q,$ as G,a0 as K,q as v,a1 as Z,F as J,a2 as X,a3 as j,d as tt,b as et,p as it,e as st}from"./D168nk1t.js";const at={__name:"book",props:["bok","updateBook"],setup(o){return(l,h)=>(w(),T("div",{class:R(["book",{liked:o.bok.isLiked}])},[p("h1",null,x(o.bok.title),1),p("h2",null,x(o.bok.author),1),p("button",{onClick:h[0]||(h[0]=u=>o.updateBook(o.bok))},"Like")],2))}},rt=M(at,[["__scopeId","data-v-d35ce046"]]);(()=>{function o(t){t&&(t.element.classList.add(t.stateClassName),t.element.firstChild.classList.remove(t.stateChildClassNames[0]),t.element.firstChild.classList.add(t.stateChildClassNames[1]),t.element.setAttribute("aria-pressed",!1))}function l(t){t&&(t.element.classList.remove(t.stateClassName),t.element.firstChild.classList.add(t.stateChildClassNames[0]),t.element.firstChild.classList.remove(t.stateChildClassNames[1]),t.element.setAttribute("aria-pressed",!0))}function h(t,e){const i=document.createElement("button");i.className=e.className,i.innerHTML=e.innerHtml,i.setAttribute("role","switch"),i.firstChild.classList.add(e.stateChildClassNames[0]),i.setAttribute("aria-pressed",!e.initialState),e.element=i,t.params[e.condition_parameter]===e.initialState&&o(e),i.addEventListener("click",function(s){this.classList.contains(e.stateClassName)?(l(e),t[e.actions[0]]()):(o(e),t[e.actions[1]]())}),t.buttons[e.name]={element:i,button_properties:e},t.controls_element.appendChild(i)}function u(t){if(/^\s*(true|false)\s*$/i.test(t))return t==="true"}function f(t){if(/^\s*\d+\s*$/.test(t))return parseInt(t);if(/^\s*[\d.]+\s*$/.test(t))return parseFloat(t)}function V(t){if(/^\s*\[.*\]\s*$/.test(t))try{return JSON.parse(t)}catch{}}function P(t){if(/^\s*\{.*\}\s*$/.test(t))try{return JSON.parse(t)}catch{}}function A(t){if(/^\s*\/.*\/g?i?\s*$/.test(t))try{return new RegExp(t)}catch{}}function E(t){if(/^\s*null\s*$/.test(t))return null;const e=u(t);return e!==void 0?e:f(t)||V(t)||P(t)||A(t)||t}function g(t){return Array.isArray(t)}function c(t){return typeof t=="string"}function m(t,e,i=!1){if(t=Number(t),e=Number(e),isNaN(t)||isNaN(e))throw new TypeError("Both min and max must be numbers");if(t>e&&([t,e]=[e,t]),t===e)return t;t=Math.round(t),e=Math.round(e);const s=i?D():Math.random();return Math.floor(s*(e-t+1))+t}function d(t,e){return parseFloat(t.toFixed(e))}function y(t,e){return!t||!e||Number.isNaN(t)||Number.isNaN(e)?0:t/e*100}function D(){if(!crypto)return Math.random();if(crypto.getRandomValues)return crypto.getRandomValues(new Uint32Array(1))[0]/4294967295}var I=/(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/ ]{11})/i,L=/(?:www\.|player\.)?vimeo.com\/(?:channels\/(?:\w+\/)?|groups\/(?:[^\/]*)\/videos\/|album\/(?:\d+)\/video\/|video\/|)(\d+)(?:[a-zA-Z0-9_\-]+)?/i,C=/\/([^\/]+\.(?:mp4|ogg|ogv|ogm|webm|avi))\s*$/i;function $(t){const e=1.7777777778;if(!t||!t.length||/16[\:x\-\/]{1}9/i.test(t))return e;const i=t.split(/\s?[\:x\-\/]{1}\s?/i);if(i.length<2)return e;const s=parseInt(i[0]),a=parseInt(i[1]);return s===0||a===0||isNaN(s)||isNaN(a)?e:s/a}function _(t,e=document){if(t instanceof Array||t instanceof NodeList)return t;if(t instanceof Element)return[t];if(e instanceof Element||e instanceof Document)return e.querySelectorAll(t);if(c(e)&&(e=_(e)),!e instanceof Array&&!e instanceof NodeList)return[];const i=[];for(const s of e)i.push(...s.querySelectorAll(t));return i}function q(t,e=1,i=0){t instanceof Element&&(t=[t]),typeof t=="string"&&(t=_(t));for(const s of t){const a=s.parentNode.offsetHeight+i,r=s.parentNode.offsetWidth+i;e>r/a?(s.style.width=a*e+"px",s.style.height=a+"px"):(s.style.width=r+"px",s.style.height=r/e+"px")}}function Y(t){return/\b(BlackBerry|webOS|iPhone|IEMobile)\b/i.test(t)||/\b(Android|Windows Phone|iPad|iPod)\b/i.test(t)}function H(){return"maxTouchPoints"in navigator?navigator.maxTouchPoints>0:"matchMedia"in window?!!matchMedia("(pointer:coarse)").matches:"orientation"in window?!0:Y(navigator.userAgent)}var S=class{constructor(t,e,i,s,a,r){if(!i)return;this.is_mobile=H(),this.type=a,this.id=i,this.factoryInstance=r,this.element=t,this.playerElement=null,this.uid=s,this.element.setAttribute("data-vbg-uid",s),this.buttons={},this.isIntersecting=!1,this.paused=!1,this.muted=!1,this.currentState="notstarted",this.initialPlay=!1,this.initialVolume=!1,this.volume=1,this.params={};const n={pause:!1,"play-button":!1,"mute-button":!1,autoplay:!0,muted:!0,loop:!0,mobile:!0,"load-background":!1,resolution:"16:9","inline-styles":!0,"fit-box":!1,offset:100,"start-at":0,"end-at":0,poster:null,"always-play":!1,volume:1,"no-cookie":!0,"force-on-low-battery":!1,lazyloading:!1,title:"Video background"};this.params=this.parseProperties(e,n,this.element,["data-ytbg-","data-vbg-"]),this.params.pause&&(this.params["play-button"]=this.params.pause),this.params.resolution_mod=$(this.params.resolution),this.muted=this.params.muted,this.volume=this.params.volume,this.currentTime=this.params["start-at"]||0,this.duration=this.params["end-at"]||0,this.percentComplete=0,this.params["start-at"]&&(this.percentComplete=this.timeToPercentage(this.params["start-at"])),this.buildWrapperHTML(),!(this.is_mobile&&!this.params.mobile)&&(this.params["play-button"]&&h(this,{name:"playing",className:"play-toggle",innerHtml:'<i class="fa"></i>',initialState:!this.paused,stateClassName:"paused",condition_parameter:"paused",stateChildClassNames:["fa-pause-circle","fa-play-circle"],actions:["play","pause"]}),this.params["mute-button"]&&h(this,{name:"muted",className:"mute-toggle",innerHtml:'<i class="fa"></i>',initialState:this.muted,stateClassName:"muted",condition_parameter:"muted",stateChildClassNames:["fa-volume-up","fa-volume-mute"],actions:["unmute","mute"]}))}timeToPercentage(t){if(t<=this.params["start-at"])return 0;if(t>=this.duration)return 100;if(t<=0)return 0;t-=this.params["start-at"];const e=this.duration-this.params["start-at"];return y(t,e)}percentageToTime(t){if(!this.duration)return this.params["start-at"]||0;if(t>100)return this.duration;if(t<=0)return this.params["start-at"]||0;const e=this.duration-this.params["start-at"];let i=t*e/100;return i=d(i,3),i>e&&(i=e),this.params["start-at"]&&(i+=this.params["start-at"]),i}resize(t){this.params["fit-box"]||q(t||this.playerElement,this.params.resolution_mod,this.params.offset),this.dispatchEvent("video-background-resize")}stylePlayerElement(t){t&&(this.params["inline-styles"]&&(t.style.top="50%",t.style.left="50%",t.style.transform="translateX(-50%) translateY(-50%)",t.style.position="absolute",t.style.opacity=0),this.params["fit-box"]&&(t.style.width="100%",t.style.height="100%"))}buildWrapperHTML(){const t=this.element.parentNode;this.element.classList.add("youtube-background","video-background");const e={height:"100%",width:"100%","z-index":"0",position:"absolute",overflow:"hidden",top:0,left:0,bottom:0,right:0};if(this.params["mute-button"]||(e["pointer-events"]="none"),(this.params["load-background"]||this.params.poster)&&(this.loadBackground(this.id),this.params.poster&&(e["background-image"]=`url(${this.params.poster})`),e["background-size"]="cover",e["background-repeat"]="no-repeat",e["background-position"]="center"),this.params["inline-styles"]){for(let i in e)this.element.style[i]=e[i];["absolute","fixed","relative","sticky"].indexOf(t.style.position)||(t.style.position="relative")}if(this.params["play-button"]||this.params["mute-button"]){const i=document.createElement("div");i.className="video-background-controls",i.style.position="absolute",i.style.top="10px",i.style.right="10px",i.style["z-index"]=2,this.controls_element=i,t.appendChild(i)}return this.element}loadBackground(t){this.params["load-background"]&&t&&(this.type==="youtube"&&(this.element.style["background-image"]=`url(https://img.youtube.com/vi/${t}/hqdefault.jpg)`),this.type==="vimeo"&&(this.element.style["background-image"]=`url(https://vumbnail.com/${t}.jpg)`))}destroy(){this.playerElement.remove(),this.element.classList.remove("youtube-background","video-background"),this.element.removeAttribute("data-vbg-uid"),this.element.style="",(this.params["play-button"]||this.params["mute-button"])&&this.controls_element.remove(),this.timeUpdateTimer&&clearInterval(this.timeUpdateTimer),this.dispatchEvent("video-background-destroyed")}setDuration(t){if(this.duration!==t){if(this.params["end-at"]){if(t>this.params["end-at"]){this.duration=this.params["end-at"];return}if(t<this.params["end-at"]){this.duration=t;return}}else{this.duration=t;return}t<=0&&(this.duration=this.params["end-at"])}}setStartAt(t){this.params["start-at"]=t}setEndAt(t){this.params["end-at"]=t,this.duration>t&&(this.duration=t),this.currentTime>t&&this.onVideoEnded()}dispatchEvent(t){this.element.dispatchEvent(new CustomEvent(t,{bubbles:!0,detail:this}))}shouldPlay(){return this.currentState==="ended"&&!this.params.loop?!1:!!(this.params["always-play"]&&this.currentState!=="playing"||this.isIntersecting&&this.params.autoplay&&this.currentState!=="playing")}mobileLowBatteryAutoplayHack(){if(!this.params["force-on-low-battery"]||!this.is_mobile&&this.params.mobile)return;const t=function(){!this.initialPlay&&this.params.autoplay&&this.params.muted&&(this.softPlay(),!this.isIntersecting&&!this.params["always-play"]&&this.softPause())};document.addEventListener("touchstart",t.bind(this),{once:!0})}parseProperties(t,e,i,s){let a={};if(!t)a=e;else for(let r in e)a[r]=t.hasOwnProperty(r)?t[r]:e[r];if(!i)return a;for(let r in a){let n;if(g(s))for(let b=0;b<s.length;b++){const B=i.getAttribute(s[b]+r);if(B){n=B;break}}else n=i.getAttribute(s+r);n!=null&&(a[r]=E(n))}return a}},N=class extends S{constructor(t,e,i,s,a){super(t,e,i,s,"youtube",a),i&&(this.is_mobile&&!this.params.mobile||(this.injectScript(),this.player=null,this.injectPlayer(),this.STATES={"-1":"notstarted",0:"ended",1:"playing",2:"paused",3:"buffering",5:"cued"},this.timeUpdateTimer=null,this.timeUpdateInterval=250,this.initYTPlayer()))}startTimeUpdateTimer(){this.timeUpdateTimer||(this.timeUpdateTimer=setInterval(this.onVideoTimeUpdate.bind(this),this.timeUpdateInterval))}stopTimeUpdateTimer(){clearInterval(this.timeUpdateTimer),this.timeUpdateTimer=null}convertState(t){return this.STATES[t]}initYTPlayer(){!window.hasOwnProperty("YT")||this.player!==null||(this.player=new YT.Player(this.uid,{events:{onReady:this.onVideoPlayerReady.bind(this),onStateChange:this.onVideoStateChange.bind(this)}}),this.volume!==1&&!this.muted&&this.setVolume(this.volume))}onVideoError(t){console.error(t)}injectScript(){const t="https://www.youtube.com/player_api";if(window.hasOwnProperty("YT")||document.querySelector(`script[src="${t}"]`))return;const e=document.createElement("script");e.async=!0,e.src=t;const i=document.getElementsByTagName("script")[0];i.parentNode.insertBefore(e,i)}generatePlayerElement(){const t=document.createElement("iframe");return this.params.title&&t.setAttribute("title",this.params.title),t.setAttribute("frameborder",0),t.setAttribute("allow","autoplay; mute"),this.params.lazyloading&&t.setAttribute("loading","lazy"),t}generateSrcURL(t){let e="https://www.youtube.com/embed/";this.params["no-cookie"]&&(e="https://www.youtube-nocookie.com/embed/");let i=`${e}${t}?&enablejsapi=1&disablekb=1&controls=0&rel=0&iv_load_policy=3&cc_load_policy=0&playsinline=1&showinfo=0&modestbranding=1&fs=0`;return this.params.muted&&(i+="&mute=1"),this.params.autoplay&&(this.params["always-play"]||this.isIntersecting)&&(i+="&autoplay=1"),this.params.loop&&(i+="&loop=1"),i}injectPlayer(){this.playerElement=this.generatePlayerElement(),this.src=this.generateSrcURL(this.id),this.playerElement.src=this.src,this.playerElement.id=this.uid,this.stylePlayerElement(this.playerElement),this.element.appendChild(this.playerElement),this.resize(this.playerElement)}setSource(t){const e=t.match(I);!e||!e.length||(this.id=e[1],this.src=this.generateSrcURL(this.id),this.playerElement.src=this.src,this.element.hasAttribute("data-vbg")&&this.element.setAttribute("data-vbg",this.src),this.element.hasAttribute("data-ytbg")&&this.element.setAttribute("data-ytbg",this.src),this.loadBackground(this.id))}onVideoTimeUpdate(){const t=this.player.getCurrentTime();if(t!==this.currentTime){if(this.currentTime=t,this.percentComplete=this.timeToPercentage(this.currentTime),this.params["end-at"]&&this.duration&&this.currentTime>=this.duration){this.currentState="ended",this.dispatchEvent("video-background-state-change"),this.onVideoEnded(),this.stopTimeUpdateTimer();return}this.dispatchEvent("video-background-time-update")}}onVideoPlayerReady(){this.mobileLowBatteryAutoplayHack(),this.params.autoplay&&(this.params["always-play"]||this.isIntersecting)&&(this.params["start-at"]&&this.seekTo(this.params["start-at"]),this.player.playVideo()),this.setDuration(this.player.getDuration()),this.dispatchEvent("video-background-ready")}onVideoStateChange(t){this.currentState=this.convertState(t.data),this.currentState==="ended"&&this.onVideoEnded(),this.currentState==="notstarted"&&this.params.autoplay&&(this.seekTo(this.params["start-at"]),this.player.playVideo()),this.currentState==="playing"&&this.onVideoPlay(),this.currentState==="paused"&&this.onVideoPause(),this.dispatchEvent("video-background-state-change")}onVideoPlay(){this.initialPlay||(this.initialPlay=!0,this.playerElement.style.opacity=1);const t=this.player.getCurrentTime();this.params["start-at"]&&t<this.params["start-at"]&&this.seekTo(this.params["start-at"]),this.duration&&t>=this.duration&&this.seekTo(this.params["start-at"]),this.duration||this.setDuration(this.player.getDuration()),this.dispatchEvent("video-background-play"),this.startTimeUpdateTimer()}onVideoPause(){this.stopTimeUpdateTimer(),this.dispatchEvent("video-background-pause")}onVideoEnded(){if(this.dispatchEvent("video-background-ended"),!this.params.loop)return this.pause();this.seekTo(this.params["start-at"]),this.player.playVideo()}seek(t){this.seekTo(this.percentageToTime(t),!0)}seekTo(t,e=!0){this.player&&(this.player.seekTo(t,e),this.dispatchEvent("video-background-seeked"))}softPause(){!this.player||this.currentState==="paused"||(this.stopTimeUpdateTimer(),this.player.pauseVideo())}softPlay(){!this.player||this.currentState==="playing"||this.player.playVideo()}play(){this.player&&(this.paused=!1,this.player.playVideo())}pause(){this.player&&(this.paused=!0,this.stopTimeUpdateTimer(),this.player.pauseVideo())}unmute(){this.player&&(this.muted=!1,this.initialVolume||(this.initialVolume=!0,this.setVolume(this.params.volume)),this.player.unMute(),this.dispatchEvent("video-background-unmute"))}mute(){this.player&&(this.muted=!0,this.player.mute(),this.dispatchEvent("video-background-mute"))}getVolume(){if(this.player)return this.player.getVolume()/100}setVolume(t){this.player&&(this.volume=t,this.player.setVolume(t*100),this.dispatchEvent("video-background-volume-change"))}},O=class extends S{constructor(t,e,i,s,a){super(t,e,i.id,s,"vimeo",a),i&&(this.unlisted=i.unlisted,!(this.is_mobile&&!this.params.mobile)&&(this.injectScript(),this.player=null,this.injectPlayer(),this.initVimeoPlayer()))}injectScript(){const t="https://player.vimeo.com/api/player.js";if(window.hasOwnProperty("Vimeo")||document.querySelector(`script[src="${t}"]`))return;const e=document.createElement("script");e.async=!0,window.hasOwnProperty("onVimeoIframeAPIReady")&&typeof window.onVimeoIframeAPIReady=="function"&&e.addEventListener("load",()=>{window.onVimeoIframeAPIReady()}),e.src=t;const i=document.getElementsByTagName("script")[0];i.parentNode.insertBefore(e,i)}initVimeoPlayer(){!window.hasOwnProperty("Vimeo")||this.player!==null||(this.player=new Vimeo.Player(this.playerElement),this.player.on("loaded",this.onVideoPlayerReady.bind(this)),this.player.on("ended",this.onVideoEnded.bind(this)),this.player.on("play",this.onVideoPlay.bind(this)),this.player.on("pause",this.onVideoPause.bind(this)),this.player.on("bufferstart",this.onVideoBuffering.bind(this)),this.player.on("timeupdate",this.onVideoTimeUpdate.bind(this)),this.volume!==1&&!this.muted&&this.setVolume(this.volume))}onVideoError(t){console.error(t)}generatePlayerElement(){const t=document.createElement("iframe");return this.params.title&&t.setAttribute("title",this.params.title),t.setAttribute("frameborder",0),t.setAttribute("allow","autoplay; mute"),this.params.lazyloading&&t.setAttribute("loading","lazy"),t}generateSrcURL(t,e){e=e?`h=${e}&`:"";let i=`https://player.vimeo.com/video/${t}?${e}background=1&controls=0`;return this.params.muted&&(i+="&muted=1"),this.params.autoplay&&(this.params["always-play"]||this.isIntersecting)&&(i+="&autoplay=1"),this.params.loop&&(i+="&loop=1&autopause=0"),this.params["no-cookie"]&&(i+="&dnt=1"),this.params["start-at"]&&(i+="#t="+this.params["start-at"]+"s"),i}injectPlayer(){this.playerElement=this.generatePlayerElement(),this.src=this.generateSrcURL(this.id,this.unlisted),this.playerElement.src=this.src,this.playerElement.id=this.uid,this.stylePlayerElement(this.playerElement),this.element.appendChild(this.playerElement),this.resize(this.playerElement)}updateState(t){this.currentState=t,this.dispatchEvent("video-background-state-change")}setSource(t){const e=t.match(L);!e||!e.length||(this.id=e[1],this.src=this.generateSrcURL(this.id),this.playerElement.src=this.src,this.element.hasAttribute("data-vbg")&&this.element.setAttribute("data-vbg",this.src),this.element.hasAttribute("data-ytbg")&&this.element.setAttribute("data-ytbg",this.src),this.loadBackground(this.id))}onVideoPlayerReady(){this.mobileLowBatteryAutoplayHack(),this.params["start-at"]&&this.seekTo(this.params["start-at"]),this.params.autoplay&&(this.params["always-play"]||this.isIntersecting)&&this.player.play(),this.player.getDuration().then(t=>{this.setDuration(t)}),this.dispatchEvent("video-background-ready")}onVideoEnded(){if(this.updateState("ended"),this.dispatchEvent("video-background-ended"),!this.params.loop)return this.pause();this.seekTo(this.params["start-at"]),this.updateState("playing"),this.dispatchEvent("video-background-play")}onVideoTimeUpdate(t){this.currentTime=t.seconds,this.percentComplete=this.timeToPercentage(t.seconds),this.dispatchEvent("video-background-time-update"),this.setDuration(t.duration),this.params["end-at"]&&this.duration&&t.seconds>=this.duration&&this.onVideoEnded()}onVideoBuffering(){this.updateState("buffering")}onVideoPlay(t){if(this.setDuration(t.duration),!this.initialPlay&&(this.initialPlay=!0,this.playerElement.style.opacity=1,this.player.setLoop(this.params.loop),!(this.params.autoplay&&(this.params["always-play"]||this.isIntersecting))))return this.player.pause();const e=t.seconds;this.params["start-at"]&&e<this.params["start-at"]&&this.seekTo(this.params["start-at"]),this.duration&&e>=this.duration&&this.seekTo(this.params["start-at"]),this.updateState("playing"),this.dispatchEvent("video-background-play")}onVideoPause(){this.updateState("paused"),this.dispatchEvent("video-background-pause")}seek(t){this.seekTo(this.percentageToTime(t))}seekTo(t){this.player&&(this.player.setCurrentTime(t),this.dispatchEvent("video-background-seeked"))}softPause(){!this.player||this.currentState==="paused"||this.player.pause()}softPlay(){!this.player||this.currentState==="playing"||this.player.play()}play(){this.player&&(this.paused=!1,this.player.play())}pause(){this.player&&(this.paused=!0,this.player.pause())}unmute(){this.player&&(this.muted=!1,this.initialVolume||(this.initialVolume=!0,this.setVolume(this.params.volume)),this.player.setMuted(!1),this.dispatchEvent("video-background-unmute"))}mute(){this.player&&(this.muted=!0,this.player.setMuted(!0),this.dispatchEvent("video-background-mute"))}getVolume(){if(this.player)return this.player.getVolume()}setVolume(t){this.player&&(this.volume=t,this.player.setVolume(t),this.dispatchEvent("video-background-volume-change"))}},F=class extends S{constructor(t,e,i,s,a){super(t,e,i.link,s,"video",a),!(!i||!i.link)&&(this.is_mobile&&!this.params.mobile||(this.src=i.link,this.ext=/(?:\.([^.]+))?$/.exec(i.id)[1],this.uid=s,this.element.setAttribute("data-vbg-uid",s),this.player=null,this.buttons={},this.MIME_MAP={ogv:"video/ogg",ogm:"video/ogg",ogg:"video/ogg",avi:"video/avi",mp4:"video/mp4",webm:"video/webm",m4v:"video/x-m4v",mov:"video/quicktime",qt:"video/quicktime"},this.mime=this.MIME_MAP[this.ext.toLowerCase()],this.injectPlayer(),this.mobileLowBatteryAutoplayHack(),this.dispatchEvent("video-background-ready")))}generatePlayerElement(){const t=document.createElement("video");return this.params.title&&t.setAttribute("title",this.params.title),t.setAttribute("playsinline",""),this.params.loop&&t.setAttribute("loop",""),this.params.autoplay&&(this.params["always-play"]||this.isIntersecting)&&(t.setAttribute("autoplay",""),t.autoplay=!0),this.muted&&(t.setAttribute("muted",""),t.muted=!0),this.params.lazyloading&&t.setAttribute("loading","lazy"),t}injectPlayer(){this.player=this.generatePlayerElement(),this.playerElement=this.player,this.volume!==1&&!this.muted&&this.setVolume(this.volume),this.playerElement.setAttribute("id",this.uid),this.stylePlayerElement(this.playerElement),this.player.addEventListener("loadedmetadata",this.onVideoLoadedMetadata.bind(this)),this.player.addEventListener("durationchange",this.onVideoLoadedMetadata.bind(this)),this.player.addEventListener("canplay",this.onVideoCanPlay.bind(this)),this.player.addEventListener("timeupdate",this.onVideoTimeUpdate.bind(this)),this.player.addEventListener("play",this.onVideoPlay.bind(this)),this.player.addEventListener("pause",this.onVideoPause.bind(this)),this.player.addEventListener("waiting",this.onVideoBuffering.bind(this)),this.player.addEventListener("ended",this.onVideoEnded.bind(this)),this.element.appendChild(this.playerElement);const t=document.createElement("source");t.setAttribute("src",this.src),t.setAttribute("type",this.mime),this.playerElement.appendChild(t),this.resize(this.playerElement)}updateState(t){this.currentState=t,this.dispatchEvent("video-background-state-change")}setSource(t){const e=t.match(C);if(!e||!e.length)return;this.id=e[1],this.ext=/(?:\.([^.]+))?$/.exec(this.id)[1],this.mime=this.MIME_MAP[this.ext.toLowerCase()],this.playerElement.innerHTML="";const i=document.createElement("source");i.setAttribute("src",t),i.setAttribute("type",this.mime),this.playerElement.appendChild(i),this.src=t,this.element.hasAttribute("data-vbg")&&this.element.setAttribute("data-vbg",this.src),this.element.hasAttribute("data-ytbg")&&this.element.setAttribute("data-ytbg",this.src)}onVideoLoadedMetadata(){this.setDuration(this.player.duration)}onVideoCanPlay(){this.setDuration(this.player.duration)}onVideoTimeUpdate(){this.currentTime=this.player.currentTime,this.percentComplete=this.timeToPercentage(this.player.currentTime),this.dispatchEvent("video-background-time-update"),this.params["end-at"]&&this.currentTime>=this.duration&&this.onVideoEnded()}onVideoPlay(){this.initialPlay||(this.initialPlay=!0,this.playerElement.style.opacity=1);const t=this.player.currentTime;this.params["start-at"]&&t<=this.params["start-at"]&&this.seekTo(this.params["start-at"]),this.duration&&t>=this.duration&&this.seekTo(this.params["start-at"]),this.updateState("playing"),this.dispatchEvent("video-background-play")}onVideoPause(){this.updateState("paused"),this.dispatchEvent("video-background-pause")}onVideoEnded(){if(this.updateState("ended"),this.dispatchEvent("video-background-ended"),!this.params.loop)return this.pause();this.seekTo(this.params["start-at"]),this.onVideoPlay()}onVideoBuffering(){this.updateState("buffering")}seek(t){this.seekTo(this.percentageToTime(t))}seekTo(t){if(this.player){if(this.player.hasOwnProperty("fastSeek")){this.player.fastSeek(t);return}this.player.currentTime=t,this.dispatchEvent("video-background-seeked")}}softPause(){!this.player||this.currentState==="paused"||this.player.pause()}softPlay(){!this.player||this.currentState==="playing"||this.player.play()}play(){this.player&&(this.paused=!1,this.player.play())}pause(){this.player&&(this.paused=!0,this.player.pause())}unmute(){this.player&&(this.muted=!1,this.player.muted=!1,this.initialVolume||(this.initialVolume=!0,this.setVolume(this.params.volume)),this.dispatchEvent("video-background-unmute"))}mute(){this.player&&(this.muted=!0,this.player.muted=!0,this.dispatchEvent("video-background-mute"))}getVolume(){if(this.player)return this.player.volume}setVolume(t){this.player&&(this.volume=t,this.player.volume=t,this.dispatchEvent("video-background-volume-change"))}},U=class{constructor(t,e){this.elements=t,this.elements instanceof Element&&(this.elements=[this.elements]),typeof this.elements=="string"&&(this.elements=document.querySelectorAll(t)),this.index={};const i=this;if(this.intersectionObserver=null,"IntersectionObserver"in window&&(this.intersectionObserver=new IntersectionObserver(function(s){s.forEach(function(a){const r=a.target.getAttribute("data-vbg-uid");if(r&&i.index.hasOwnProperty(r)&&a.isIntersecting){i.index[r].isIntersecting=!0;try{i.index[r].player&&!i.index[r].paused&&i.index[r].softPlay()}catch{}}else{i.index[r].isIntersecting=!1;try{i.index[r].player&&i.index[r].softPause()}catch{}}})})),this.resizeObserver=null,"ResizeObserver"in window?this.resizeObserver=new ResizeObserver(function(s){s.forEach(function(a){const r=a.target.getAttribute("data-vbg-uid");r&&i.index.hasOwnProperty(r)&&window.requestAnimationFrame(()=>i.index[r].resize())})}):window.addEventListener("resize",function(){for(let s in i.index)window.requestAnimationFrame(()=>i.index[s].resize(i.index[s].playerElement))}),this.initPlayers(),!(!this.elements||!this.elements.length)){for(let s=0;s<this.elements.length;s++){const a=this.elements[s];this.add(a,e)}document.addEventListener("visibilitychange",this.onVisibilityChange.bind(this))}}onVisibilityChange(){if(!document.hidden)for(let t in this.index){const e=this.index[t];e.shouldPlay()&&e.softPlay()}}add(t,e){if(!t||t.hasAttribute("data-vbg-uid"))return;this.intersectionObserver||(e||(e={}),e["always-play"]=!0);const i=t.getAttribute("data-youtube")||t.getAttribute("data-vbg"),s=this.getVidID(i);if(!s)return;const a=this.generateUID(s.id);if(a){switch(s.type){case"YOUTUBE":const r=new N(t,e,s.id,a,this);this.index[a]=r;break;case"VIMEO":const n=new O(t,e,s,a,this);this.index[a]=n;break;case"VIDEO":const b=new F(t,e,s,a,this);this.index[a]=b;break}this.resizeObserver&&this.resizeObserver.observe(t),!this.index[a].params["always-play"]&&this.intersectionObserver&&this.intersectionObserver.observe(t)}}destroy(t){const e=t.uid||t.getAttribute("data-vbg-uid");e&&this.index.hasOwnProperty(e)&&(!this.index[e].params["always-play"]&&this.intersectionObserver&&this.intersectionObserver.unobserve(t),this.resizeObserver&&this.resizeObserver.unobserve(t),this.index[e].destroy(),delete this.index[e])}destroyAll(){for(let t in this.index)this.destroy(this.index[t].playerElement)}getVidID(t){if(!(t===void 0&&t===null)){this.re={},this.re.YOUTUBE=I,this.re.VIMEO=L,this.re.VIDEO=C;for(let e in this.re){const i=t.match(this.re[e]);if(i&&i.length){this.re[e].lastIndex=0;const s={id:i[1],type:e,regex_pts:i,link:t};if(e==="VIMEO"){const a=/(\?|&)h=([^=&#?]+)/,r=/\/[^\/\:\.]+(\:|\/)([^:?\/]+)\s?$/,n=t.match(r)||t.match(a);n&&(s.unlisted=n[2])}return s}}}}generateUID(t){t=t.replace(/[^a-zA-Z0-9\-_]/g,"-"),t=t.replace(/-{2,}/g,"-"),t=t.replace(/^-+/,"").replace(/-+$/,""),t="vbg-"+t;let e=t+"-"+m(0,9999);for(;this.index.hasOwnProperty(e);)e=t+"-"+m(0,9999);return e}get(t){const e=typeof t=="string"?t:t.getAttribute("data-vbg-uid");if(e&&this.index.hasOwnProperty(e))return this.index[e]}pauseAll(){for(let t in this.index)this.index[t].pause()}playAll(){for(let t in this.index)this.index[t].play()}muteAll(){for(let t in this.index)this.index[t].mute()}unmuteAll(){for(let t in this.index)this.index[t].unmute()}setVolumeAll(t){for(let e in this.index)this.index[e].setVolume(t)}initPlayers(t){const e=this;window.onYouTubeIframeAPIReady=function(){for(let i in e.index)e.index[i]instanceof N&&e.index[i].initYTPlayer();t&&setTimeout(t,100)},window.hasOwnProperty("YT")&&window.YT.loaded&&window.onYouTubeIframeAPIReady(),window.onVimeoIframeAPIReady=function(){for(let i in e.index)e.index[i]instanceof O&&e.index[i].initVimeoPlayer();t&&setTimeout(t,100)},window.hasOwnProperty("Vimeo")&&window.Vimeo.hasOwnProperty("Player")&&window.onVimeoIframeAPIReady()}};typeof jQuery=="function"&&function(t){t.fn.youtube_background=function(e){const i=t(this);return window.hasOwnProperty("VIDEO_BACKGROUNDS")?(window.VIDEO_BACKGROUNDS.add(i,e),i):(window.VIDEO_BACKGROUNDS=new U(this,e),i)}}(jQuery),window.VideoBackgrounds=U})();const z=o=>(it("data-v-86c87979"),o=o(),st(),o),nt=z(()=>p("h1",null,"Hello, h1 heading",-1)),ot=z(()=>p("hr",null,null,-1)),lt={__name:"testing",props:["name"],setup(o){const l=k("https://youtu.be/T_lC2O1oIew?si=Sh2nWSAaOr6EgrLI"),h=k("https://youtu.be/T_lC2O1oIew?si=Sh2nWSAaOr6EgrLI");let u=1,f=k(!0);W(()=>{const c=new VideoBackgrounds("[data-vbg]",{"play-button":!0,"mute-button":!0}),m=document.querySelector("[data-vbg]");u=c.get(m),document.querySelectorAll(".play").forEach(d=>d.click()),u.setVolume(1),h.value!==l.value&&(h.value=l.value,u.setSource(l.value)),document.querySelector("#video-background").addEventListener("video-background-play",function(d){console.log("video-background-play"),console.log(d.detail),f.value=!1,document.querySelector("iframe").setAttribute("allow","accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"),setTimeout(()=>{console.log("After 2s");try{u.unmute()}catch(y){console.log(y)}},4e3)}),document.querySelector("#video-background").addEventListener("video-background-pause",function(d){console.log("video-background-play"),console.log(d.detail),f.value=!0})});function V(){console.log("Play the vid"),h.value!==l.value&&(h.value=l.value,u.setSource(l.value)),u.play(),console.log("Unmuting"),u.unmute(),f.value=!1}function P(c){c.isLiked=!c.isLiked,console.log("Update book")}function A(){g.value=!g.value,console.log(g)}let E=Q([{title:"The lord of the rings",author:"Me",isLiked:!0},{title:"Book 2",author:"Me",isLiked:!1},{title:"1984",author:"Me",isLiked:!1}]),g=k(!0);return(c,m)=>{const d=rt;return w(),T("div",null,[nt,G(p("textarea",{name:"","onUpdate:modelValue":m[0]||(m[0]=y=>Z(l)?l.value=y:null),id:""},null,512),[[K,v(l)]]),p("div",{id:"video-background",class:R({before:v(f)}),"data-vbg-play-button":"true","data-vbg":"https://youtu.be/T_lC2O1oIew?si=Sh2nWSAaOr6EgrLI"},null,2),p("button",{onClick:V,class:"play",ref:"myCoolDiv"},"Play/Pause",512),p("button",{onClick:A},"Toggle book"),v(g)?(w(!0),T(J,{key:0},X(v(E),y=>(w(),T("div",null,[et(d,{bok:y,"update-book":P},null,8,["bok"])]))),256)):j("",!0),ot,tt(" "+x(v(E)),1)])}}},ut=M(lt,[["__scopeId","data-v-86c87979"]]);export{ut as default};
