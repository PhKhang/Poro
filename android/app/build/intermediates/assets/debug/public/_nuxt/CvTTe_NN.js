import{P as t}from"./CTak-ZH6.js";/*!
 * (C) Ionic http://ionicframework.com - MIT License
 */const r=()=>{if(t!==void 0)return t.Capacitor};/*!
 * (C) Ionic http://ionicframework.com - MIT License
 */var n;(function(e){e.Unimplemented="UNIMPLEMENTED",e.Unavailable="UNAVAILABLE"})(n||(n={}));var o;(function(e){e.Body="body",e.Ionic="ionic",e.Native="native",e.None="none"})(o||(o={}));const a={getEngine(){const e=r();if(e!=null&&e.isPluginAvailable("Keyboard"))return e.Plugins.Keyboard},getResizeMode(){const e=this.getEngine();return e!=null&&e.getResizeMode?e.getResizeMode().catch(i=>{if(i.code!==n.Unimplemented)throw i}):Promise.resolve(void 0)}};export{a as K,o as a};
