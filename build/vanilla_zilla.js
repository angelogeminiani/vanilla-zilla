!(()=>{const name="\uD83E\uDD96 Vanilla-Zilla",v=`0.0.5`,vPrefix="v-",vPrefixReplaceable="v*",context="undefined"!=typeof window&&window,document=!!context&&context.document,navigator=!!context&&context.navigator;if(!document)return void console.error("Invalid environment!");const attr_vuid="data-vuid",channel_zilla="__zilla",message_type_internal="internal",message_target_pages="pages",message_target_routing="routing",on_before_create="onBeforeCreate",on_after_create="onAfterCreate",on_ready="onReady",on_data_received="onDataReceived",on_show="onShow",on_hide="onHide",op=Object.prototype,ostring=op.toString,hasOwn=op.hasOwnProperty,isBrowser="undefined"!=typeof context&&"undefined"!=typeof navigator&&document,isWebWorker=!isBrowser&&"undefined"!=typeof importScripts,hasProp=function(e,n){return hasOwn.call(e,n)},getOwn=function(e,n){return hasProp(e,n)&&e[n]},getDeep=function(e,n){if(!e||!n)return;let t=e;return each(n.split("."),function(e){return!hasProp(t,e)||void(t=t[e])}),t},eachProp=function(e,n){if(e)for(let t in e)if(hasProp(e,t)&&n(t,e[t]))break},isUndefined=function(e){return void 0===e},isArray=function(e){return"[object Array]"===ostring.call(e)},isFunction=function(e){return!!e&&"[object Function]"===ostring.call(e)},isAsyncFunction=function(e){return!!e&&"[object AsyncFunction]"===ostring.call(e)},isCallable=function(e){return isFunction(e)||isAsyncFunction(e)},isString=function(e){return"string"==typeof e},isDate=function(e){return"[object Date]"===ostring.call(e)},isObject=function(e){return!isArray(e)&&"object"==typeof e},isNumber=function(e){return!isNaN(parseFloat(e))&&isFinite(e)},isHTMLElement=function(e){return!!e&&e instanceof HTMLElement},isPromise=function(e){return!!e&&e instanceof Promise},isVanilla=function(e){return!!e&&e instanceof Vanilla},isComponent=function(e){return!!e&&e instanceof vanilla.BaseComponent},isMessage=function(e){return!!e&&e instanceof ZMessage},isView=function(e){return!!e&&e instanceof vanilla.BaseView},isHTML=function(e){return isString(e)&&/<\/?[a-z][\s\S]*>/i.test(e)},isUrl=function(e){return isString(e)&&(e.startsWith("./")||e.startsWith("http"))},isError=function(e){return!!e&&e instanceof Error},pathGetExt=function(e,n){if(n=n||"",isString(e)&&3<e.length){const t=e.lastIndexOf(".");if(0<t){const a=e.substring(t+1)||n;return!!a&&-1<a.indexOf("?")?a.substring(0,a.indexOf("?")):a}}return n},pathGetName=function(e,n){if(isString(e)&&3<e.length){const t=e.lastIndexOf("/");if(0<t){const a=e.substring(t+1);if(!!n){const e=pathGetExt(a);if(!!e)return a.replace("."+e,"")}return a}}return""},isReplaceableId=function(e){return!!e&&isString(e)&&e.startsWith(vPrefixReplaceable)},isVUID=function(e){return!!e&&isString(e)&&e.startsWith(vPrefix)},toVUID=function(e,n){return isString(n)?(isReplaceableId(n)&&(n=n.replaceAll(vPrefixReplaceable,"")),isVUID(n)?n:e+"|"+n):n},parseVUID=function(e){const n={id:"",name:"",raw:e},t=e.split("|");return n.id=t[0],n.name=t[1]||"",n},urlWithExt=function(e,n){let t=e;if(!pathGetExt(t)){const e=pathGetName(t,!0);!e||(t=`${t}/${e}.${n}`)}return t},urlUI=function(e){return urlWithExt(e,"html")},urlJS=function(e){return urlWithExt(e,"js")},urlHref=function(n){try{return new URL(n).href}catch(t){return new URL(n,document.baseURI).href}},each=function(e,n){if(!!e)for(let t=0;t<e.length&&!(e[t]&&n(e[t],t,e));t+=1);},eachReverse=function(e,n){if(!!e)for(let t=e.length-1;-1<t&&!(e[t]&&n(e[t],t,e));t-=1);},bind=function(e,n,...t){return!!isFunction(n)&&function(){return n.call(e,...t)}},invoke=function(e,n,...t){return!!(!!n&&(isFunction(n)||isAsyncFunction(n)))&&n.call(e,...t)},invokeAsync=function(e,n,...t){setTimeout((e,n,...t)=>{invoke(e,n,...t)},0,e,n,...t)},uuid=function(e){return e=e||"",e+"10000000-1000-4000-8000-100000000000".replace(/[018]/g,e=>(+e^crypto.getRandomValues(new Uint8Array(1))[0]&15>>+e/4).toString(16))},vuid=function(){return uuid(vPrefix)},slugify=function(e){return e+="",e=e.replace(/^\s+|\s+$/g,""),e=e.toLowerCase(),e=e.replace(/[^a-z0-9 -]/g,"").replace(/\s+/g,"_").replace(/-+/g,"_"),e},matchHTMLElement=function(e,n){return!!isHTMLElement(e)&&(e.getAttribute("id")===n||e.getAttribute(attr_vuid)===n)},htmlEncode=function(e){const n=document.createElement("textarea");return n.innerText=e,n.innerHTML.split("<br>").join("\n")||""},htmlDecode=function(e){const n=new DOMParser().parseFromString(e,"text/html");return n.documentElement.textContent||""},renderTpl=function(e,n,t,a,i){const r=t||"<%",d=a||"%>",s=htmlEncode(r),l=htmlEncode(d);let o=e;for(const _ in n)if(n.hasOwnProperty(_)){let e=n[_];if(isFunction(i)){const n=i(e);!n||(e=n)}o=o.replaceAll(`${r+_+d}`,e),o=o.replaceAll(`${s+_+l}`,e)}return o},argsSolve=function(...e){const n={comp:null,elem:null,obj:null,str:"",promise:null,func:[],args:[]};return each(e,(e,t)=>isPromise(e)?(n.promise=n.promise||[],void n.promise.push(e)):isFunction(e)?(n.func=n.func||[],void n.func.push(e)):isHTMLElement(e)?void(n.elem=e):isVanilla(e)?void(n.comp=e):isObject(e)?void(n.obj?eachProp(e,(e,t)=>{n.obj[e]=t}):n.obj=e):isArray(e)?void n.args.push(...e):void(isString(e)&&(0===t?n.str=e:n.elem?n.str=e:n.elem=e))),n},argsSolveMultiple=function(...e){const n={promises:null,functions:null,elements:null,views:null,components:null,objects:null,arrays:null,numbers:null,strings_url:null,strings_vuid:null,strings_html:null,strings:null};return each(e,e=>isPromise(e)?(n.promises=n.promises||[],void n.promises.push(e)):isFunction(e)?(n.functions=n.functions||[],void n.functions.push(e)):isHTMLElement(e)?(n.elements=n.elements||[],void(n.elements=e)):isView(e)?(n.views=n.views||[],void(n.views=e)):isVanilla(e)?(n.components=n.components||[],void(n.components=e)):isObject(e)?(n.objects=n.objects||[],void(n.objects=e)):isArray(e)?(n.arrays=n.arrays||[],void n.arrays.push(e)):isNumber(e)?(n.numbers=n.numbers||[],void n.numbers.push(e)):isUrl(e)?(n.strings_url=n.strings_url||[],void n.strings_url.push(e)):isVUID(e)?(n.strings_vuid=n.strings_vuid||[],void n.strings_vuid.push(e)):isHTML(e)?(n.strings_html=n.strings_html||[],void n.strings_html.push(e)):void(isString(e)&&(n.strings=n.strings||[],n.strings.push(e)))),n},setFunctionName=function(e,n){return isFunction(e)&&Object.defineProperty(e,"name",{value:n,writable:!1}),n},sortAsc=function(e,n){isArray(e)&&(isString(n)?e.sort((e,t)=>e[n]-t[n]):e.sort((e,n)=>e-n))},sortDesc=function(e,n){isArray(e)&&(isString(n)?e.sort((e,t)=>t[n]-e[n]):e.sort((e,n)=>n-e))};class Vanilla{constructor(){this._uid=vuid()}}class Futures{constructor(){this._late_actions=[]}get length(){return this._late_actions.length}push(e,n,...t){const a={thisArg:e||this,action:!1,callback:!1};return isCallable(n)&&(a.action=n.bind(e||this,...t),this._late_actions.push(a)),a}doAll(){!this._late_actions||(each(this._late_actions,e=>{try{if(isCallable(e.action)){const n=e.action();isCallable(e.callback)&&(isPromise(n)?n.then(n=>{invoke(e.thisArg,e.callback,n)}).catch(n=>{invoke(e.thisArg,e.callback,n)}):invoke(e.thisArg,e.callback,n))}}catch(e){console.error("Future.doAll()",e)}}),this._late_actions=[])}}class ZMessage{constructor(e,n,t,a){this._sender=e||"",this._type=n||message_type_internal,this._target=t||"*",this._data=a||{}}get sender(){return this._sender}set sender(e){this._sender=e}get type(){return this._type}set type(e){this._type=e}get target(){return this._target}set target(e){this._target=e}get data(){return this._data}set data(e){this._data=e}isTarget(e){return this._target||"*"===this._target||this._target===e}}const getLuxon=function(){try{if("undefined"!=typeof luxon)return luxon;console.warn(`${name} v${v}: 'luxon' date and time library disabled.\nSee at: https://moment.github.io/luxon/#/install`)}catch(n){}return!1},getShowDown=function(e){return showdown?(e=e||{noHeaderId:!0,tables:!0,simpleLineBreaks:!0},new showdown.Converter(e)):(console.warn(`${name} v${v}: 'showdown' markdown converter library disabled.\nSee at: https://showdownjs.com/`),!1)},mdToHTML=function(e,n){if(isString(e)){const t=getShowDown(n);if(!!t)return t.makeHtml(e)}return e},vanilla={},i18n={};return function(e){const t="en-US";class a{constructor(e){this._dictionary=e||{}}clear(){this._dictionary={}}load(e){const n=this;!e||eachProp(e,(e,t)=>{n.put(e,t)})}get(e){return this._dictionary[e]||""}put(e,n){!e||!n||(this._dictionary[e]=n)}}const i=new class{constructor(){this._enabled=!0,this._locale=new Intl.Locale(t),this._lang="",this._languageNames=null,this._regionNames=null,this._dateStyle="medium",this._timeStyle="medium",this._dictionaries={},this.__initI18n()}get enabled(){return this._enabled}set enabled(e){this._enabled=e,this.__initI18n(this._locale.language)}get dateStyle(){return this._dateStyle}set dateStyle(e){this._dateStyle=e}get timeStyle(){return this._timeStyle}set timeStyle(e){this._timeStyle=e}get lang(){return this._locale.language}set lang(e){!e||this.__initI18n(e)}get locale(){return this._locale}get dictionary(){return this.getDictionary(this._lang)}normalize(e){return e=e||t,"*"===e?e:new Intl.Locale(e).language||t}getDictionary(e){const t=this.normalize(e);return this._dictionaries[t]||(this._dictionaries[t]=new a({vanilla:`${name} v${v}`,tpl_from:"from <%from%>","tpl_from-to":"from <%from%> to <%to%>"})),this._dictionaries[t]}fmtDate(e,n){const a=isString(n)?{dateStyle:n}:isObject(n)?n:null;if(isDate(e)){const n=a?new Intl.DateTimeFormat([this._locale.language,t],a):new Intl.DateTimeFormat([this._locale.language,t],{dateStyle:this._dateStyle});return n.format(e)}if(isString(e)){const n=getLuxon();if(!!n){const t=n.DateTime.fromISO(e);return t.setLocale(this._lang).toLocaleString("short")}return e}return e+""}fmtDateTime(e,n){if(isDate(e)){const a=isString(n)?{dateStyle:n}:isObject(n)?n:null,i=a?new Intl.DateTimeFormat([this._locale.language,t],a):new Intl.DateTimeFormat([this._locale.language,t],{dateStyle:this._dateStyle,timeStyle:this._timeStyle});return i.format(e)}return""}fmtNumber(e,n){if(isNumber(e)){const a=isString(n)?{dateStyle:n}:isObject(n)?n:null,i=a?new Intl.NumberFormat([this._locale.language,t],a):new Intl.NumberFormat([this._locale.language,t]);return i.format(e)}return e}nameOfLang(e){return this._languageNames?this._languageNames.of(e):e}nameOfRegion(e){return this._regionNames?this._regionNames.of(e):e}async load(n){const t=await e.require(n),a=t[0];if(!!a){const e=a.dictionaries;!e||eachProp(e,(e,n)=>{const t=this.getDictionary(e);t.load(n)})}return e}addLabel(e,n){const t=parseVUID(e);this.dictionary.put(t.name||t.raw,n)}getLabel(n,t){if(isString(n)){const e=this.dictionary.get(n)||n;try{if(!!e&&!!t)return renderTpl(e,t)}catch(t){console.warn(`${name} v${v}: Error on i18n.getLabel("${n}")`,t)}return e}return n}__initI18n(e){const n=e||navigator.language||t;if(this._locale=new Intl.Locale(n),this._lang!==this._locale.language&&(this._lang=this._locale.language,this.dictionary.put("vanilla",`${name} v${v}`)),this._languageNames=new Intl.DisplayNames(this._lang,{type:"language"}),this._regionNames=new Intl.DisplayNames(this._lang,{type:"region"}),this._enabled){const e=getLuxon();console.debug(`${name} v${v}: i18n enabled.`,"language:",this._lang,"date:",this.fmtDateTime(new Date),"number:",this.fmtNumber(1234567890.12345),"luxon:",e?"Luxon installed!":"Luxon not installed!")}else console.debug(`${name} v${v}: i18n disabled.`)}};i18n.enabled=e=>(isUndefined(e)||(i.enabled=e),i.enabled),i18n.lang=e=>(isString(e)||(i.language=e),i.lang),i18n.locale=()=>i.locale,i18n.fmtDate=i.fmtDate.bind(i),i18n.fmtDateTime=i.fmtDateTime.bind(i),i18n.fmtNumber=i.fmtNumber.bind(i),i18n.nameOfLang=i.nameOfLang.bind(i),i18n.nameOfRegion=i.nameOfRegion.bind(i),i18n.load=i.load.bind(i),i18n.addLabel=i.addLabel.bind(i),i18n.getLabel=i.getLabel.bind(i),e.__ready__=!1,e.i18n=i18n,e.version=v,e.env={name:name,version:v,isBrowser:isBrowser,isWorker:isWebWorker,context:context}}(vanilla),function(e){function n(e,n,t){invoke(e,n,t)}function t(e){if(isHTMLElement(e))return e;if(isHTML(e))return r(e);const{elem:n,str:t,comp:a}=argsSolve(e);return n||i(a?a.uid:t)}function a(e,n){if(!!e&&!!n){if(isHTMLElement(e)){const t=e.getAttribute("id");return(!t||isReplaceableId(t))&&e.setAttribute("id",n),e.setAttribute(attr_vuid,n),e}if(isHTML(e))return a(r(e),n);console.error(`dom.setId() -> Element not supported: "${e}"`)}return null}function i(e){try{if(isString(e)){let n=document.getElementById(e);if(!n){const t=document.querySelectorAll(`[${attr_vuid}="${e}"]`);0<t.length&&(n=t.item(0))}if(!!n)return n;console.error(`dom.get() -> Element not found: "${e}"`)}}catch(n){console.error(`dom.get() -> Error retrieving "${e}":`,n)}return e}function r(e){const n=document.createElement("div");if(n.innerHTML=e.trim(),1<n.childElementCount){const e=[];o(n,n=>{const t=n.tagName.toLowerCase();("script"===t||"meta"===t||"link"===t||"title"===t)&&e.push(n)});for(const n of e)n.remove();return s(n),n}return n.firstElementChild}function d(e){const n=t(e),a=[],i=document.createNodeIterator(n,NodeFilter.SHOW_COMMENT);for(let n;n=i.nextNode();)a.push(n);return a}function s(e){const n=d(e);for(const t of n)t.remove()}function l(e){if(!!e){const n=document.getElementsByTagName(e);return!!n&&0<n.length?n[0]:null}return null}function o(n,a){const i=t(n);if(!!i&&isFunction(a)){if(invoke(e,a,i))return;for(const e of i.children)o(e,a)}}function _(){return document.head||l("head")}let m=!1;e.dom={ready:function i(t,a){if(isFunction(t)){function i(){m=!0,n(e,t,e)}if(!!m)return void n(e,t,e);"complete"===document.readyState?(m=!0,n(e,t,e)):"interactive"===document.readyState?!!a&&(m=!0,n(e,t,e)):(context.addEventListener("DOMContentLoaded",()=>{!a||(context.removeEventListener("load",i),m=!0,n(e,t,e))}),context.addEventListener("load",i))}},scripts:function e(){return document.getElementsByTagName("script")||[]}(),solve:async function n(...e){const{elem:t,str:a,comp:d,obj:s,promise:l}=argsSolve(...e);if(!!t)return t;if(!!d)return await d.getElem();if(!!l)return await l;if(isString(a)){if(isHTML(a)){const e=renderTpl(a,s);return r(e)}return i(a)}return null},elem:t,get:i,setId:a,remove:function n(e){try{const n=i(e);if(!!n)return n.remove(),n}catch(n){console.error(`removeElemById() -> removing element "${e}":`,n)}return null},removeChild:function n(e){try{const n=i(e);if(!!n)return n.innerHTML="",n}catch(n){console.error(`dom.removeElemChildrenById() -> removing children from "${e}":`,n)}return null},setInner:function t(e,n){try{const t=i(e);if(!!t)return t.innerHTML=n,t}catch(t){console.error(`dom.setInnerHTMLById() -> inserting "${n}" into "${e}":`,t)}return null},appendInner:function t(e,n){try{const t=i(e);if(!!t){const e=document.createElement("div");return t.append(e),e.outerHTML=n,t}}catch(n){console.error(`dom.appendElemChildById() -> adding child into "${e}":`,n)}return null},classRemove:function t(e,n){try{const t=i(e);!t||t.classList.remove(n)}catch(n){console.error(`dom.classRemove() -> adding child into "${e}":`,n)}return null},classAdd:function t(e,n){try{const t=i(e);!t||t.classList.add(n)}catch(n){console.error(`dom.classAdd() -> adding class into "${e}":`,n)}return null},tagAddStyle:function t(e,n){try{n=isString(n)?l(n):n,n=n||_();const t=document.createElement("style");n.appendChild(t),t.appendChild(document.createTextNode(e))}catch(e){console.error(`dom.tagAddStyle() -> adding style tag into header:`,e)}return null},tagAddScript:function t(e,n){try{n=isString(n)?l(n):n,n=n||_();const t=document.createElement("script");n.appendChild(t),t.appendChild(document.createTextNode(e))}catch(e){console.error(`dom.tagAddScript() -> adding script tag into header:`,e)}return null},matchHTMLElement:matchHTMLElement,childOfById:function a(e,n){let i=null;const r=t(e);return r?o(r,e=>{if(matchHTMLElement(e,n))return i=e,!0}):console.error("dom.childOfById()",new Error("Parent elem do not exist!")),i},eachElem:o,head:_,body:function e(){return document.body||l("body")}}}(vanilla),function initRequire(instance){function configFn(e){return eachProp(e,function(e,n){_config[e]=n}),_config}function _smartURL(e,n){const t=pathGetExt(n),a=e||_ext_fetch[t||"js"]||"text",i=t?n:urlJS(n);return{ext:t||"js",type:a,url:i}}function _fetchFn(e,n,t){if(!n)return void invoke(null,t,null,[new Error("Missing url parameter.")]);const a=isArray(n)?n:[n],i=[],r=[],d=configFn().limit,s=configFn().enableSmartUrl;for(let l of a)l=s?_smartURL(e,urlHref(l)).url:urlHref(l),_cache_count[l]=hasProp(_cache_count,l)?_cache_count[l]+1:1,_cache_count[l]>d&&(console.warn(`Component reached the limit of ${d} requests: ${l}`),_cache_count[l]=0),!!_cache[l]&&configFn().use_cache?r.push(_cache[l]):i.push(fetch(l,{method:"GET"}));return r.length===a.length?void invoke(null,t,r):void Promise.all(i).then(async function(n){for(const t of n){const n=await t.status,a=await t.statusText,i=await t.url,d=pathGetExt(i,"js"),s=e||_ext_fetch[d]||"text",l={url:i,ext:d,type:s};if(200!==n)l.type="error",l.error=new Error(`Error ${n} "${a}": ${i}`),r.push(l);else try{"text"===s&&(l[s]=await t.text()),"json"===s&&(l[s]=await t.json()),"blob"===s&&(l[s]=await t.blob()),"bytes"===s&&(l[s]=await t.bytes()),"arrayBuffer"===s&&(l[s]=await t.arrayBuffer()),r.push(l),_cache[i]=l}catch(n){r.push({url:i,error:n})}}invoke(instance,t,r)}).catch(function(e){r.push({error:e}),invoke(instance,t,r)})}function _solve(fetchResponses,callback){const solved=[],errors=[];for(const response of fetchResponses)if(!!response.error)errors.push(response.error);else{const ext=response.ext,type_fetch=response.type,fmt=_ext_solve[ext]||type_fetch;try{const item={type:fmt};switch(fmt){case"blob":item.value=response.blob;break;case"bytes":item.value=response.bytes;break;case"arrayBuffer":item.value=response.arrayBuffer;break;case"json":item.value=response.json;break;case"script":const text=response.text,evaluated=eval(text);evaluated?item.value=evaluated:console.warn("_solve: Missing return or export statement!",response);break;default:item.value=response.text}solved.push(item)}catch(n){errors.push(n)}}0<errors.length?invoke(instance,callback,solved,new AggregateError(errors,"Errors fetching data")):invoke(instance,callback,solved,!1)}function require(e,n,t){return new Promise((a,i)=>{e?_fetchFn(t,e,function(e){_solve(e,function(e,t){const r={};let d=0;for(const n of e)"script"===n.type?eachProp(n.value,(e,n)=>{r[e]=n}):(r[d]=n.value,d++);t?(!!n&&invoke(instance,n,r,t),i(t)):(!!n&&invoke(instance,n,r,!1),a(r))})}):i(new Error("Nothing to require, missing URLs"))})}const _cache={},_cache_count={},_ext_fetch={md:"text",js:"text",txt:"text",json:"json",jpg:"blob",png:"blob",pdf:"bytes",wav:"arrayBuffer"},_ext_solve={js:"script"},_config={use_cache:!0,limit:700,enableSmartUrl:!0};instance.require=require,instance.require.config=configFn}(vanilla),function n(e){function t(e,n,t,a){let i="";return i=e?e.uid:"",!n||(!n.id&&(n.id=uuid()),i+=i?"|"+n.id:n.id),i+=i?"|"+t:t,!a||(i+=i?"|"+a:a),i}function a(n,a,i,r,...d){const s={},l=r.bind(e,s),o=setFunctionName(l,uuid());return s.id=t(n,a,i,o),s.name=i,s.sender=n,s.target=a,s.handler=l,s.handlerName=o,s.data=[...d],s}function i(e,n,t,i,...r){const d=a(e,n,t,i,...r);return d&&d.id&&d.handler&&!l[d.id]?(l[d.id]=d,d.handler):null}function r(e,n,t){let a=0;return eachProp(l,(i,r)=>{let d=i===t||r.handlerName===t;d||(e||n?n&&r.target&&r.target.id===n.id?d=!t||r.name===t:!!e&&!!r.sender&&r.sender.uid===e.uid&&(d=!t||r.name===t):d=!t||r.name===t||r.sender.uid===t||r.target.id===t),d&&(r.target.removeEventListener(r.name,r.handler,{capture:!0}),delete l[i],a++)}),a}function d(n,t,a,r,...d){if(!!t&&!!a&&!!r){const s=e.dom.get(t);if(!!s){const e=i(n,t,a,r,...d);!e||s.addEventListener(a,e,{capture:!0})}}}function s(n,t,a){const i=isString(a)?a:isFunction(a)?a.name:a.id;return invokeAsync(e,r,n,t,i)}const l={};e.events={on:d,off:s}}(vanilla),function n(e){class t extends Vanilla{constructor(e){super(),this._model=!1,this._created=!1,this.__require(e)}async get(){return new Promise(async(e,n)=>{if(!this._model)e(null);else if(isPromise(this._model)){const n=await this._model;e(n)}else e(this._model)})}set(e){!e||(this._model?isObject(e)&&(this._model=e):this.__require(e))}__require(e){const n=this;if(!!e){if(n.__invoke_before_create(),isUrl(e))return void(n._model=new Promise(async(t,a)=>{vanilla.require(e,(e,i)=>{if(!!i)a(i);else{const i=e[0];i?(n._model=i,n._model=this.__invoke_data_received(i),n.__invoke_after_create(),t(n._model)):a(new Error("Data not found"))}}).catch()}));if(isObject(e))return n._model=this.__invoke_data_received(e),void n.__invoke_after_create();throw new Error(`Data not supported: ${e}`)}else n.__invoke_after_create()}__invoke_before_create(){invoke(this,this[on_before_create])}__invoke_after_create(){this._created||(this._created=!0,invoke(this,this[on_after_create]))}__invoke_data_received(e){const n=invoke(this,this[on_data_received],e);return isObject(n)?n:e}static async wait(e){const n=new t(e);return await n.get()}static wrap(e){const n=new t(e);return n.get()}}class a extends Vanilla{constructor(){super(),this._channelName="*",this._subscription=null,this._func=null,this._args=[]}get channel(){return this._channelName}set channel(e){this._channelName=e||"*"}get subscription(){return this._subscription}set subscription(e){this._subscription=e}get func(){return this._func}bind(e,...n){isFunction(e)&&(this._func=e,this._args.push(...n))}}class i{constructor(...e){this._id="",this._channel="",!!e&&0<e.length&&(this._channel=e[0],this._id=e[1]||"",isFunction(this._id)&&(this._id=this._id.name||""))}get id(){return this._id||"*"}set id(e){this._id=e}get channel(){return this._channel||"*"}set channel(e){this._channel=e}}class r{constructor(){this._listeners=[]}publish(e,n){invokeAsync(this,(e,n)=>{e=e||"*";for(const t of this._listeners){const a=t.subscription;if("*"===a.channel||a.channel===e||"*"===e){const r=new i(e,a.id);invokeAsync(this,t.func,r,n,...t._args)}}},e,n)}subscribe(e,n,...t){e=e||"*";const r=new i;if(isFunction(n)){r.id=setFunctionName(n,uuid()),r.channel=e;const i=new a;i.subscription=r,i.channel=e,i.bind(n,...t),this._listeners.push(i)}return r}unsubscribe(...e){const n=[];if(!!e&&0<e.length){const t=e[0]instanceof i?e[0]:new i(...e),a=[...this._listeners];this._listeners=[];for(const e of a){const a=e?e.subscription:null;if(!!a){const i=a.id===t.id||"*"===t.id,r=a.channel===t.channel||"*"===t.channel,d=r&&i;d?n.push(a):this._listeners.push(e)}}}return n}clear(){this._listeners=[]}}class d extends Vanilla{constructor(e){super(),this._model={},this._messageQueue=e||new r}get messages(){return this._messageQueue}set(e,n){void 0!==this._model[e],this._model[e]=n}get(e){return this._model[e]}}e.classes={DataWrapper:t,QueueManager:r,VanillaStore:d}}(vanilla),function n(e){function t(...n){const{comp:t,elem:i,str:r,obj:d}=argsSolve(...n);if(!!t)return t;const s=e.dom.elem(i||r);return new a(s,d)}class a extends Vanilla{constructor(...e){super(),this._model={},this._model.uid=this._uid,this._parent_elem=null,this._detached=!0,this._visible=!1,this._late_actions=new Futures,this._elem=null,this._elem_promise=null,this._consistence_promise_resolver=Promise.withResolvers(),this._ready_promise_resolver=Promise.withResolvers(),this._created=!1,this.__init_component(...e)}get uid(){return this._uid}set uid(e){!!e&&isString(e)&&(this._uid=e,!this._model.uid&&(this._model.uid=this._uid))}get model(){return this._model}get detached(){return this._detached}get visible(){return this._visible}set visible(e){e?this.show():this.hide()}set html(n){if(isHTML(n)){const t=e.html.bodyContent(n),a=this._renderHtml(t),i=e.dom.elem(a);!i||(e.dom.body().insertAdjacentElement("beforeend",i),this.setElem(i))}else if(isUrl(n)){const t=urlUI(n);this._elem_promise=new Promise((n,a)=>{e.require(t,(e,i)=>{if(!!i)a(new Error(`Error creating page from "${t}": ${i}`));else{const i=e[0];isString(i)?(this.html=i,n(this._elem)):a(new Error(`Error creating page from "${t}". Unexpected returned value: ${i}`))}}).catch(e=>{console.error(`Error creating page from "${t}"`,e)})})}else console.warn(`Error creating BaseComponent loading html from: "${n}"`)}setElem(e){!e||(isHTMLElement(e)?this.__init_elem(e):console.error(`BaseComponent.elem: Invalid element type: ${e}`))}async getElem(){return this._elem_promise}async render(){return this._elem_promise}async ready(){return await this._ready_promise_resolver.promise}on(...n){const t=this;if(this.isConsistent()){const{promise:a,elem:i,str:r,func:d,args:s}=argsSolve(...n);if(!!a)Promise.all(a).then(e=>{for(const n of e)each(d,e=>{invoke(t,t.on,n,r,e,...s)})}).catch(e=>{console.error("BaseComponent.on#promise",e)});else{const n=i||this._elem,t=r||"click",a=d&&0<d.length&&d[0];!a||e.events.on(this,n,"\uD83E\uDD96 Vanilla-Zilla",a,...s)}}else this._late_actions.push(this,this.on,...n)}off(...n){const t=this;if(this.isConsistent()){const{promise:a,elem:i,obj:r,str:d,func:s}=argsSolve(...n);if(!!a)Promise.all(a).then(e=>{for(const n of e)each(s,e=>{invoke(t,t.off,n,d,e)})}).catch(e=>{console.error("BaseComponent.on#promise",e)});else{const n=!!s&&0<s.length?s:r||d;e.events.off(this,i,n)}}else this._late_actions.push(this,this.off,...n)}isConsistent(){return!!this._elem&&!!this._parent_elem&&!this._detached}toVUID(e){return!isString(e)||isHTML(e)||isUrl(e)||isVUID(e)?e:toVUID(this._uid,e)}attach(n){const t=this;if(!!n)try{const{promise:a,elem:i,str:r,comp:d}=argsSolve(n),s=i?i:a?a:r?e.dom.get(this.toVUID(r)):d?d.getElem():n;isHTMLElement(s)?(this._parent_elem=s,this._elem&&this._parent_elem?(this._parent_elem.append(this._elem),this._detached=!1):this._late_actions.push(this,this.attach,n)):isPromise(s)?s.then(e=>{invoke(t,t.attach,e)}).catch(e=>{console.error("BaseComponent.attach#promise: ",e)}):console.warn("BaseComponent.attach() wrong parent type: ",s)}catch(e){console.error("BaseComponent.attach: ",e)}return this}detach(){try{this.off();const n=e.dom.body();n.append(this._elem),this._elem.classList.add("vz-hidden"),this._detached=!0,this._visible=!1}catch(e){console.error("BaseComponent.detach: ",e)}return!1}remove(){try{return this.off(),this._elem.remove(),this._elem=null,this._visible=!1,this._model=null,!0}catch(e){console.error("BaseComponent.remove: ",e)}return!1}show(e,...n){try{this.isConsistent()?!this._visible&&!!this._elem&&(this._elem.classList.remove("vz-hidden"),this._visible=!0,!!e&&invoke(this._elem,e,this._elem,...n),invoke(this,this[on_show])):this._late_actions.push(this,this.show,e,...n)}catch(e){console.error("BaseComponent.show: ",e)}return this}hide(e,...n){try{this.isConsistent()?this._visible&&(this._elem.classList.add("vz-hidden"),this._visible=!1,!!e&&invoke(this._elem,e,this._elem,...n),invoke(this,this[on_hide])):this._late_actions.push(this,this.hide,e,...n)}catch(e){console.error("BaseComponent.hide: ",e)}return this}fadeIn(n,t){try{this.isConsistent()?this.show(e.effects.fadeIn,n,t):this._late_actions.push(this,this.fadeIn,n,t)}catch(e){console.error("BaseComponent.fadeIn: ",e)}return this}effect(e,...n){try{this.isConsistent()?(this.show(),e.bind(this._elem,...n)):this._late_actions.push(this,this.effect,e,...n)}catch(e){console.error("BaseComponent.effect: ",e)}return this}async childElem(n){const t=this.toVUID(n),a=await this.getElem();return a?e.dom.childOfById(a,t):null}async appendChild(...n){if(!!v){let t,a,i;3===n.length?(t=await e.dom.solve(this.toVUID(n[0])),a=await e.dom.solve(n[1],n[2]||{})):2===n.length?isObject(n[1])?(t=await this.getElem(),a=await e.dom.solve(n[0],n[1])):(t=await e.dom.solve(this.toVUID(n[0])),a=await e.dom.solve(n[1])):1===n.length&&(t=await this.getElem(),a=await e.dom.solve(n[0])),t?a?t.insertAdjacentElement("beforeend",a):console.warn(`${name} v${v}: ${this.name}.appendChild() -> Unable to solve element.`,v):console.warn(`${name} v${v}: ${this.name}.appendChild() -> Missing parent.`)}}__init_component(...e){this.__invoke_before_create();const{obj:n,str:t,elem:a}=argsSolve(...e);!n||(eachProp(n,(e,n)=>{this._model[e]=n}),!this._model.uid&&(this._model.uid=this._uid)),t?this.html=t:!!a&&(this._parent_elem=a.parentNode,!!this._parent_elem&&(this._detached=!1),a.innerHTML=this._renderHtml(a.innerHTML),a.getAttribute("id")?this.uid=a.getAttribute("id"):a.setAttribute("id",this._uid),this.setElem(a))}__init_elem(n){if(!!n)try{const t=this._uid;this._elem=n,this._elem.classList.add("vz-hidden"),e.dom.setId(this._elem,t),e.dom.eachElem(n,n=>{if(!!n){const a=n.getAttribute("id"),i=n.tagName.toLowerCase();!a||isVUID(a)||"script"===i||"style"===i||e.dom.setId(n,toVUID(t,a))}}),!!this._parent_elem&&this._detached&&this._late_actions.doAll(),this.__invoke_after_create(),this._consistence_promise_resolver.resolve(this)}catch(e){this._consistence_promise_resolver.reject(e)}}_renderHtml(n){const t=e.template.render(n,this._model);return isHTML(t)?t:`<div>${t}</div>`}__invoke_before_create(){invoke(this,this[on_before_create])}__invoke_after_create(){const e=this;if(!e._created){e._created=!0;const n=invoke(e,e[on_after_create]);if(isPromise(n))n.catch(n=>{e._ready_promise_resolver.reject(n)}).then(n=>{const t=e.__invoke_on_ready();isPromise(t)?t.then(()=>{e._ready_promise_resolver.resolve(e)}):e._ready_promise_resolver.resolve(e)});else{const n=e.__invoke_on_ready();isPromise(n)?n.then(()=>{e._ready_promise_resolver.resolve(e)}):e._ready_promise_resolver.resolve(e)}}}__invoke_on_ready(){return invoke(this,this[on_ready])}}e.BaseComponent=a,e.components={BaseComponent:a,componentize:t}}(vanilla),function n(e){class t extends e.BaseComponent{constructor(...e){super(),this._name="anonymous",this._slug="anonymous",this._model={},this._views=new i(this),this.__init_view(...e)}get slug(){return this._slug}get name(){return this._name}set name(e){!e||(this._name=e,this._slug=slugify(e))}get model(){return this._model}get views(){return this._views}init(e,n){this.__init_view(e,n)}async ready(){return await super.ready(),await this._views.ready(),this}attach(e){if(!!e){const n=toVUID(this._uid,e);return super.attach(n)}}show(e,...n){super.show(e,...n)}hide(e,...n){super.hide(e,...n)}async childElem(e){const n=toVUID(this._uid,e);return super.childElem(n)}__init_view(...e){const{obj:n,str:t}=argsSolve(...e);!n||(eachProp(n,(e,n)=>{this._model[e]=n}),!this._model.uid&&(this._model.uid=this._uid)),!t||(super.html=t)}}class a{constructor(e,n,t,a){this._parent=a,this._name=e,this._slug=slugify(e),this._url=n,this._model=t||{},this._view_resolver=Promise.withResolvers(),this._init_loader()}get name(){return this._name}get slug(){return this._slug}get view(){return this._view_resolver.promise}_init_loader(){const n=this._url,t=this._model,a=this._name;e.require(n,(a,i)=>{i?this._view_resolver.reject(new Error(`Error creating page from "${n}": ${i}`)):eachProp(a,async(n,a)=>{const i=new a(t);if(i.name="\uD83E\uDD96 Vanilla-Zilla",i.attach(e.dom.body()),!!this._parent){const e=await this.__getElem(this._parent);i.attach(e)}this._view_resolver.resolve(i)})}).catch(e=>{console.error(`ViewLoader._init_loader() -> Error requiring page from "${n}": ${e}`)})}async __getElem(n){return isComponent(n)?await n.getElem():isPromise(n)?await n:e.dom.elem(n)}}class i{constructor(e){this._parent=e,this._view_promises=[],this._late_actions=new Futures,this._curr_view_fn=null,this._last_view_fn=null,this._curr_view=null,this._last_view=null}get parent(){return this._parent}set parent(e){this._parent=e}push(...e){for(const n of e){const e=n.name,t=n.url,i=n.data||{};if(!!e&&!!t){const n=new a(e,t,i,this._parent);this._view_promises.push(n)}}return 0<this._late_actions.length&&this._late_actions.doAll(),this._view_promises.length}prepare(...e){return this.push(...e),this.__waitAll()}async ready(){return await this.__waitAll(),this}async get(e){if(isView(e))return e;const n=e instanceof a?e:null;if(!!n)return n.view;if(0<this._view_promises.length){let n=0;for(const t of this._view_promises){const a=await t.view;if(a){if(isString(e)){if(a.uid===e||a.name===e||a.slug===e)return a;}else if(isNumber(e)&&n===e)return a;n++}}}return null}async goto(e,n,...t){return void 0===e?null:await new Promise((a,i)=>{if(0===this._view_promises.length){const r=this._late_actions.push(this,this.goto,e,n,...t);r.callback=function(e){isError(e)?i(e):a(e)}}else this.get(e).then(r=>{r?this.__activateView(r,n,...t).then(()=>{a(r)}).catch(e=>{i(e)}):i(new Error(`ViewManager.goto() -> View "${e}" not found!`))}).catch(e=>{i(e)})})}async home(){return await this.goto(0,vanilla.effects.fadeIn)}back(){return this._last_view_fn?this._last_view_fn():null}async __waitAll(){const e=[];for(const n of this._view_promises){const t=await n.view;await t.ready(),e.push(t)}return e}async __activateView(e,n,...t){if(isView(e)){for(const e of this._view_promises){const n=await e.view;n.hide()}n?e.show(n,...t):e.show(),this._last_view=this._curr_view,this._curr_view=e,this._last_view_fn=this._curr_view_fn,this._curr_view_fn=this.__activateView.bind(this,e,n,...t)}return e}}class r extends i{constructor(){super(),s.subscribe(channel_zilla,this.__onInternalMessage.bind(this))}async ready(){return super.ready()}async goto(e,n,...t){const a=await super.goto(e,n,...t);return this.__notify(a),a}async home(){const e=await super.home();return e?(this.__notify(e),e):null}back(){if(!!this._last_view_fn){const e=this._last_view_fn();return this.__notify(e),e}return null}__notify(e){const n=e.slug;s.publish(channel_zilla,new ZMessage(message_target_pages,message_type_internal,message_target_routing,{name:n}))}__onInternalMessage(e,n){if(!!e&&e.channel===channel_zilla&&!!n&&n instanceof ZMessage&&n.isTarget(message_target_pages)&&!!n.data){const e=n.sender;if(e===message_target_routing){const e=n.data.hash,t=e.name||"";t?super.goto(t,null).catch(e=>{console.error(`__onInternalMessage() Navigating to page "${t}"`,e)}):this.home().catch(e=>{console.error(`__onInternalMessage() Navigating to Home page`,e)})}}}}class d extends Vanilla{constructor(){super(),this._pages=l,this._messages=s,this._state=new e.classes.VanillaStore}get pages(){return this._pages}get messages(){return this._messages}get state(){return this._state}async ready(){return await this._pages.ready(),this}}const s=new e.classes.QueueManager,l=new r;e.BaseView=t,e.app=new d}(vanilla),function n(e){const t=context.history,a=context.addEventListener;class i{constructor(){this._available=!0,this._enabled=!0,this._curr_hash={hash:"#",name:"",query:""},t?(a("popstate",this.__onpopstate.bind(this)),e.app.messages.subscribe(channel_zilla,this.__onInternalMessage.bind(this)),e.dom.ready(this.__onDomReady.bind(this)),console.info(`${name}: Routing enabled!`)):(this._available=!1,this._enabled=!1,console.warn(`${name}: Cannot enable routing in this environment because is not supported!`))}get enabled(){return this._enabled&&this._available}set enabled(e){this._available?this._enabled=e:e&&console.warn(`${name} Cannot enable routing in this environment because is not supported!`)}push(e){if(this.enabled&&!!context.location){const n=new URL(context.location),a=this.__parseHash(n.hash);n.hash="#"+e+(a.query?"?"+a.query:""),t.pushState({},"",n)}}replace(e){if(this.enabled&&!!context.location){const n=new URL(context.location),a=this.__parseHash(n.hash);n.hash="#"+e+(a.query?"?"+a.query:""),t.replaceState({},"",n)}}__onDomReady(){const e=new URL(context.location);this._curr_hash=this.__parseHash(e.hash),this.__notify()}__onpopstate(n){const e=this.__parseHash(n.target.location.hash),t=!!e&&e.name!==this._curr_hash.name;this._curr_hash=e,t&&this.__notify()}__parseHash(e){const n={hash:e,name:"",query:""},t=e.substring(1).toLowerCase().split("?")||[];return 0<t.length&&(n.name=t[0],2===t.length&&(n.query=t[1])),n}__notify(){const n=this._curr_hash;e.app.messages.publish(channel_zilla,new ZMessage(message_target_routing,message_type_internal,message_target_pages,{hash:n}))}__onInternalMessage(e,n){if(!!e&&e.channel===channel_zilla&&!!n&&n instanceof ZMessage&&n.isTarget(message_target_routing)&&!!n.data){const e=n.sender;if(e===message_target_pages){const e=n.data.name;this.push(e)}}}}e.routing=new i}(vanilla),function n(e){function t(n,t){return renderTpl(n,t,e.template.TPL_PREFIX,e.template.TPL_SUFFIX,n=>!!e.i18n&&e.i18n.enabled()?e.i18n.getLabel(n,t):n)}const a="<%",i="%>";e.template={TPL_PREFIX:"<%",TPL_SUFFIX:i,render:t}}(vanilla),function n(e){function t(){l||(l=!0,e.dom.tagAddStyle(s))}function a(n,a,i){if(!!n){t();const r=e.dom.elem(n);if(!!r){let n,t;isFunction(a)?n=a:isNumber(a)&&(t=a),isFunction(i)?n=i:isNumber(i)&&(t=i),t=t||d,r.style.animation="vanilla-fadeIn ease "+t+"ms",r.style.animationFillMode="forwards",r.style.animationIterationCount="1";const s=setInterval(function(){clearInterval(s),invoke(e,n)},t)}}}function i(n,a,i){if(!!n){t();const r=e.dom.elem(n);if(!!r){let n,t;isFunction(a)?n=a:isNumber(a)&&(t=a),isFunction(i)?n=i:isNumber(i)&&(t=i),t=t||d,r.style.animationName="vanilla-bounce",r.style.animationDuration=t+"ms",r.style.animationFillMode="both",r.style.animationIterationCount="1";const s=setInterval(function(){clearInterval(s),r.style.animationName="",invoke(e,n)},t)}}}function r(n,i,r){if(!!n){t();const d=e.dom.elem(n);!d||(d.style.opacity="0",e.dom.classRemove(d,"vz-hidden"),a(n,i,r))}}const d=1e3,s=`      
            @keyframes vanilla-fadeIn {
                0% { opacity: 0; }
                100% { opacity: 1; }
            }
            @keyframes vanilla-bounce { 
                0%, 20%, 50%, 80%, 100% {transform: translateY(0); opacity:1;} 
                40% {transform: translateY(-30px);} 
                60% {transform: translateY(-15px);} 
            }

        `;let l=!1;e.effects={fadeIn:a,bounce:i,show:r}}(vanilla),function n(e){function t(e,n,t){if(e&&"string"==typeof e){const a=new RegExp(n,"g");return e.replace(a,t)}return""}function a(e){return!!e&&0<e.toString().trim().length}function i(e,n){return 0===e.indexOf(n)}function r(e,n){return e.lastIndexOf(n||"")===e.length-(n?n.length:1)}function d(e,n,t){try{if(isString(e)&&isString(n)&&isString(t)&&!!n&&!!t){const a=e.indexOf(n),i=-1<a?a+n.length:-1,r=e.lastIndexOf(t)-1;return-1<i&&-1<r?e.substring(i,r).trim():e.trim()}}catch(e){console.error(`${name} v${v}: strings.textBetween() raised error.`,e)}return e}e.strings={replaceAll:t,hasText:a,startsWith:i,endsWith:r,textBetween:d}}(vanilla),function n(e){function t(e){return htmlDecode(e)}function a(e){return htmlEncode(e)}function i(e){try{if(isString(e)){if(0<e.indexOf("<body")||0<e.indexOf("<BODY")){const n=new DOMParser().parseFromString(e,"text/html");return n.body.innerHTML.trim()}return e.trim()}}catch(e){console.error(`${name} v${v}: html.bodyContent() raise error.`,e)}return`<div>INVALID HTML CONTENT: "${ostring.call(e)}"</div>`}e.html={decode:t,encode:a,bodyContent:i}}(vanilla),function n(e){e.utils={bind:bind,invoke:invoke,invokeAsync:invokeAsync,isFunction:isFunction,isArray:isArray,isObject:isObject,isString:isString,isNumber:isNumber,isDate:isDate,isHTMLElement:isHTMLElement,isUrl:isUrl,isView:isView,isVUID:isVUID,toVUID:toVUID,each:each,eachReverse:eachReverse,eachProp:eachProp,get:getDeep,uuid:uuid,argsSolve:argsSolve,argsSolveMultiple:argsSolveMultiple,sortAsc:sortAsc,sortDesc:sortDesc,mdToHTML:mdToHTML}}(vanilla),function n(e){const t=`.vz-hidden {visibility: hidden; display:none;} .vz-pointer{cursor:pointer;}`;e.dom.tagAddStyle(".vz-hidden {visibility: hidden; display:none;} .vz-pointer{cursor:pointer;}")}(vanilla),vanilla.ready=function n(e){return new Promise((n,t)=>{vanilla.__ready__?(n(vanilla),invoke(vanilla,e,vanilla)):vanilla.dom.ready(()=>{vanilla.__ready__||(vanilla.__ready__=!0,context.module?console.debug(`${name} v${v}: export module inherited from.`,context.module):(context.module={exports:{}},console.debug(`${name} v${v}: using internal export module.`,context.module))),n(vanilla),invoke(vanilla,e,vanilla)})})},vanilla.ready().then(()=>{console.info(`${name} v${vanilla.version}: loaded!`)}).catch(e=>{console.error(`${name} v${v}: Error loading!`,e)}),context.vanilla=vanilla,context.vanilla})();