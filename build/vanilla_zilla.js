!(()=>{const v=`0.0.2`,vPrefix="v-",context=!!window&&window,document=!!context&&context.document;if(!document)return void console.error("Invalid environment!");const op=Object.prototype,ostring=op.toString,hasOwn=op.hasOwnProperty,isBrowser="undefined"!=typeof context&&"undefined"!=typeof navigator&&document,isWebWorker=!isBrowser&&"undefined"!=typeof importScripts;class Vanilla{constructor(){this._uid=vuid()}}class Futures{constructor(){this._late_actions=[]}push(e,n,...t){!n||this._late_actions.push(n.bind(e||this,...t))}doAll(){!this._late_actions||(each(this._late_actions,e=>{try{e()}catch(e){console.error("",e)}}),this._late_actions=[])}}const on_before_create="onBeforeCreate",on_after_create="onAfterCreate",on_show="onShow",on_hide="onHide",hasProp=function(e,n){return hasOwn.call(e,n)},getOwn=function(e,n){return hasProp(e,n)&&e[n]},getDeep=function(e,n){if(!e||!n)return;let t=e;return each(n.split("."),function(e){return!hasProp(t,e)||void(t=t[e])}),t},eachProp=function(e,n){if(e)for(let t in e)if(hasProp(e,t)&&n(t,e[t]))break},isArray=function(e){return"[object Array]"===ostring.call(e)},isFunction=function(e){return"[object Function]"===ostring.call(e)},isString=function(e){return"string"==typeof e},isObject=function(e){return!isArray(e)&&"object"==typeof e},isNumber=function(e){return!isNaN(parseFloat(e))&&isFinite(e)},isHTMLElement=function(e){return!!e&&e instanceof HTMLElement},isPromise=function(e){return!!e&&e instanceof Promise},isVanilla=function(e){return!!e&&e instanceof Vanilla},isComponent=function(e){return!!e&&e instanceof vanilla.BaseComponent},isView=function(e){return!!e&&e instanceof vanilla.BaseView},isHTML=function(e){return isString(e)&&/<\/?[a-z][\s\S]*>/i.test(e)},isUrl=function(e){return isString(e)&&(e.startsWith("./")||e.startsWith("http"))},isVUID=function(e){return!!e&&isString(e)&&e.startsWith(vPrefix)},toVUID=function(e,n){return isString(n)?isVUID(n)?n:e+"-"+n:n},urlHref=function(n){try{return new URL(n).href}catch(t){return new URL(n,document.baseURI).href}},each=function(e,n){if(!!e)for(let t=0;t<e.length&&!(e[t]&&n(e[t],t,e));t+=1);},eachReverse=function(e,n){if(!!e)for(let t=e.length-1;-1<t&&!(e[t]&&n(e[t],t,e));t-=1);},bind=function(e,n,...t){return!!isFunction(n)&&function(){return n.call(e,...t)}},invoke=function(e,n,...t){return!!isFunction(n)&&n.call(e,...t)},invokeAsync=function(e,n,...t){setTimeout((e,n,...t)=>{invoke(e,n,...t)},0,e,n,...t)},uuid=function(e){return e=e||"",e+"10000000-1000-4000-8000-100000000000".replace(/[018]/g,e=>(+e^crypto.getRandomValues(new Uint8Array(1))[0]&15>>+e/4).toString(16))},vuid=function(){return uuid(vPrefix)},slugify=function(e){return e+="",e=e.replace(/^\s+|\s+$/g,""),e=e.toLowerCase(),e=e.replace(/[^a-z0-9 -]/g,"").replace(/\s+/g,"_").replace(/-+/g,"_"),e},argsSolve=function(...e){const n={comp:null,elem:null,obj:null,str:"",promise:null,func:[],args:[]};return each(e,(e,t)=>isPromise(e)?(n.promise=n.promise||[],void n.promise.push(e)):isFunction(e)?(n.func=n.func||[],void n.func.push(e)):isHTMLElement(e)?void(n.elem=e):isVanilla(e)?void(n.comp=e):isObject(e)?void(n.obj?eachProp(e,(e,t)=>{n.obj[e]=t}):n.obj=e):isArray(e)?void n.args.push(...e):void(isString(e)&&(0===t?n.str=e:n.elem?n.str=e:n.elem=e))),n},argsSolveMultiple=function(...e){const n={promises:null,functions:null,elements:null,views:null,components:null,objects:null,arrays:null,numbers:null,strings_url:null,strings_vuid:null,strings_html:null,strings:null};return each(e,e=>isPromise(e)?(n.promises=n.promises||[],void n.promises.push(e)):isFunction(e)?(n.functions=n.functions||[],void n.functions.push(e)):isHTMLElement(e)?(n.elements=n.elements||[],void(n.elements=e)):isView(e)?(n.views=n.views||[],void(n.views=e)):isVanilla(e)?(n.components=n.components||[],void(n.components=e)):isObject(e)?(n.objects=n.objects||[],void(n.objects=e)):isArray(e)?(n.arrays=n.arrays||[],void n.arrays.push(e)):isNumber(e)?(n.numbers=n.numbers||[],void n.numbers.push(e)):isUrl(e)?(n.strings_url=n.strings_url||[],void n.strings_url.push(e)):isVUID(e)?(n.strings_vuid=n.strings_vuid||[],void n.strings_vuid.push(e)):isHTML(e)?(n.strings_html=n.strings_html||[],void n.strings_html.push(e)):void(isString(e)&&(n.strings=n.strings||[],n.strings.push(e)))),n},setFunctionName=function(e,n){return isFunction(e)&&Object.defineProperty(e,"name",{value:n,writable:!1}),n},vanilla={};return context.module||(context.module={exports:{}}),function(e){e.version=v,e.context={version:v,isBrowser:isBrowser,isWorker:isWebWorker}}(vanilla),function(e){function n(e,n,t,i){let r="";return r=e?e.uid:"",!n||(!n.id&&(n.id=uuid()),r+=r?"|"+n.id:n.id),r+=r?"|"+t:t,!i||(r+=r?"|"+i:i),r}function t(t,i,r,s,...d){const o={},a=s.bind(e,o),l=setFunctionName(a,uuid());return o.id=n(t,i,r,l),o.name=r,o.sender=t,o.target=i,o.handler=a,o.handlerName=l,o.data=[...d],o}function i(e,n,i,r,...d){const o=t(e,n,i,r,...d);return o&&o.id&&o.handler&&!s[o.id]?(s[o.id]=o,o.handler):null}function r(e,n,t){let i=0;return eachProp(s,(r,d)=>{let o=r===t||d.handlerName===t;o||(e||n?n&&d.target&&d.target.id===n.id?o=!t||d.name===t:!!e&&!!d.sender&&d.sender.uid===e.uid&&(o=!t||d.name===t):o=!t||d.name===t||d.sender.uid===t||d.target.id===t),o&&(d.target.removeEventListener(d.name,d.handler,{capture:!0}),delete s[r],i++)}),i}const s={};e.events={on:function(n,t,r,s,...d){if(!!t&&!!r&&!!s){const o=e.dom.get(t);if(!!o){const e=i(n,t,r,s,...d);!e||o.addEventListener(r,e,{capture:!0})}}},off:function(n,t,i){const s=isString(i)?i:isFunction(i)?i.name:i.id;return invokeAsync(e,r,n,t,s)}}}(vanilla),function(e){class n extends Vanilla{constructor(...e){super(),this._model={},this._model.uid=this._uid,this._parent_elem=null,this._detached=!0,this._visible=!1,this._late_actions=new Futures,this._elem=null,this._elem_promise=null,this._ready_promise_resolver=Promise.withResolvers(),this.__init_component(...e)}get uid(){return this._uid}get detached(){return this._detached}get visible(){return this._visible}set visible(e){e?this.show():this.hide()}set html(n){if(isHTML(n)){const t=e.html.bodyContent(n),i=this._renderHtml(t),r=e.dom.elem(i);!r||(e.dom.body().insertAdjacentElement("beforeend",r),this.setElem(r))}else if(isUrl(n)){const t=n;this._elem_promise=new Promise((n,i)=>{e.require(t,(e,r)=>{if(!!r)i(new Error(`Error creating page from "${t}": ${r}`));else{const r=e[0];isString(r)?(this.html=r,n(this._elem)):i(new Error(`Error creating page from "${t}". Unexpected returned value: ${r}`))}})})}else console.warn(`Error creating BaseComponent loading html from: "${n}"`)}setElem(e){!e||(isHTMLElement(e)?this.__init_elem(e):console.error(`BaseComponent.elem: Invalid element type: ${e}`))}async getElem(){return this._elem_promise}async ready(){return this._ready_promise_resolver.promise}on(...n){const t=this;if(this.isConsistent()){const{promise:i,elem:r,str:s,func:d,args:o}=argsSolve(...n);if(!!i)Promise.all(i).then(e=>{for(const n of e)each(d,e=>{invoke(t,t.on,n,s,e,...o)})}).catch(e=>{console.error("BaseComponent.on#promise",e)});else{const n=r||this._elem,t=d&&0<d.length&&d[0];!t||e.events.on(this,n,s||"click",t,...o)}}else this._late_actions.push(this,this.on,...n)}off(...n){const t=this;if(this.isConsistent()){const{promise:i,elem:r,obj:s,str:d,func:o}=argsSolve(...n);if(!!i)Promise.all(i).then(e=>{for(const n of e)each(o,e=>{invoke(t,t.off,n,d,e)})}).catch(e=>{console.error("BaseComponent.on#promise",e)});else{const n=!!o&&0<o.length?o:s||d;e.events.off(this,r,n)}}else this._late_actions.push(this,this.off,...n)}isConsistent(){return!!this._elem&&!!this._parent_elem&&!this._detached}async childElem(n){const t=toVUID(this._uid,n),i=await this.getElem();return i?e.dom.childOfById(i,t):null}attach(n){const t=this;if(!!n)try{const i=toVUID(this._uid,n),r=e.dom.get(i);isHTMLElement(r)?(this._parent_elem=r,this._elem&&this._parent_elem?(this._parent_elem.append(this._elem),this._detached=!1):this._late_actions.push(this,this.attach,n)):isPromise(r)?r.then(e=>{invoke(t,t.attach,e)}).catch(e=>{console.error("BaseComponent.attach#promise: ",e)}):console.warn("BaseComponent.attach() wrong parent type: ",r)}catch(e){console.error("BaseComponent.attach: ",e)}return this}show(e,...n){try{this.isConsistent()?!this._visible&&!!this._elem&&(this._elem.classList.remove("hidden"),this._visible=!0,!!e&&invoke(this._elem,e,this._elem,...n),invoke(this,this[on_show])):this._late_actions.push(this,this.show,e,...n)}catch(e){console.error("BaseComponent.show: ",e)}return this}hide(e,...n){try{this.isConsistent()?this._visible&&(this._elem.classList.add("hidden"),this._visible=!1,!!e&&invoke(this._elem,e,this._elem,...n),invoke(this,this[on_hide])):this._late_actions.push(this,this.hide,e,...n)}catch(e){console.error("BaseComponent.hide: ",e)}return this}fadeIn(n,t){try{this.isConsistent()?this.show(e.effects.fadeIn,n,t):this._late_actions.push(this,this.fadeIn,n,t)}catch(e){console.error("BaseComponent.fadeIn: ",e)}return this}effect(e,...n){try{this.isConsistent()?(this.show(),e.bind(this._elem,...n)):this._late_actions.push(this,this.effect,e,...n)}catch(e){console.error("BaseComponent.effect: ",e)}return this}detach(){try{this.off();const n=e.dom.body();n.append(this._elem),this._elem.classList.add("hidden"),this._detached=!0,this._visible=!1}catch(e){console.error("BaseComponent.detach: ",e)}return!1}remove(){try{return this.off(),this._elem.remove(),this._elem=null,this._visible=!1,this._model=null,!0}catch(e){console.error("BaseComponent.remove: ",e)}return!1}__init_component(...e){invoke(this,this[on_before_create]);const{obj:n,str:t,elem:i}=argsSolve(...e);!n||(eachProp(n,(e,n)=>{this._model[e]=n}),!this._model.uid&&(this._model.uid=this._uid)),t?this.html=t:!!i&&(this._parent_elem=i.parentNode,!!this._parent_elem&&(this._detached=!1),i.innerHTML=this._renderHtml(i.innerHTML),i.getAttribute("id")?(this._uid=i.getAttribute("id"),!this._model.uid&&(this._model.uid=this._uid)):i.setAttribute("id",this._uid),this.setElem(i))}__init_elem(n){if(!!n)try{const t=this._uid;this._elem=n,this._elem.classList.add("hidden"),this._elem.getAttribute("id")||this._elem.setAttribute("id",t),e.dom.each(n,e=>{if(!!e){const n=e.getAttribute("id");if(!!n&&!isVUID(n)){const i=toVUID(t,n);e.setAttribute("id",i)}}}),!!this._parent_elem&&this._detached&&this._late_actions.doAll(),this._ready_promise_resolver.resolve(this),invoke(this,this[on_after_create])}catch(e){this._ready_promise_resolver.reject(e)}}_renderHtml(n){const t=e.template.render(n,this._model);return isHTML(t)?t:`<div>${t}</div>`}}e.BaseComponent=n,e.components={BaseComponent:n,componentize:function(...t){const{comp:i,elem:r,str:s,obj:d}=argsSolve(...t);if(!!i)return i;const o=e.dom.elem(r||s);return new n(o,d)}}}(vanilla),function(e){class n extends e.BaseComponent{constructor(...e){super(),this._name="anonymous",this._slug="anonymous",this._model={},this._views=new i(this),this.__init_view(...e)}get slug(){return this._slug}get name(){return this._name}set name(e){!e||(this._name=e,this._slug=slugify(e))}get views(){return this._views}init(e,n){this.__init_view(e,n)}async ready(){return await super.ready(),await this._views.ready(),this}attach(e){if(!!e){const n=toVUID(this._uid,e);return super.attach(n)}}show(e,...n){super.show(e,...n)}hide(e,...n){super.hide(e,...n)}async childElem(e){const n=toVUID(this._uid,e);return super.childElem(n)}__init_view(...e){const{obj:n,str:t}=argsSolve(...e);!n||(eachProp(n,(e,n)=>{this._model[e]=n}),!this._model.uid&&(this._model.uid=this._uid)),!t||(super.html=t)}}class t{constructor(e,n,t,i){this._parentComponent=i,this._name=e,this._slug=slugify(e),this._url=n,this._model=t||{},this._view_resolver=Promise.withResolvers(),this._init_loader()}get name(){return this._name}get slug(){return this._slug}get view(){return this._view_resolver.promise}_init_loader(){const n=this._url,t=this._model,i=this._name;e.require(n,(r,s)=>{s?this._view_resolver.reject(new Error(`Error creating page from "${n}": ${s}`)):eachProp(r,async(n,r)=>{const s=new r(t);if(s.name=i,s.attach(e.dom.body()),!!this._parentComponent){const e=await this._parentComponent.getElem();s.attach(e)}this._view_resolver.resolve(s)})})}}class i{constructor(e){this._parentComponent=e,this._view_promises=[],this._curr_view_fn=null,this._last_view_fn=null}push(...e){for(const n of e){const e=n.name,i=n.url,r=n.data||{};if(!!e&&!!i){const n=new t(e,i,r,this._parentComponent);this._view_promises.push(n)}}return this._view_promises.length}prepare(...e){return this.push(...e),this.__waitAll()}async ready(){return await this.__waitAll(),this}async get(e){if(isView(e))return e;const n=e instanceof t?e:null;if(!!n)return n.view;if(0<this._view_promises.length){let n=0;for(const t of this._view_promises){const i=await t.view;if(i){if(isString(e)){if(i.uid===e||i.name===e||i.slug===e)return i;}else if(isNumber(e)&&n===e)return i;n++}}}return null}async goto(e,n,...t){const i=await this.get(e);return await this.__activateView(i,n,...t)}async home(){const e=await this.get(0);return await this.__activateView(e,vanilla.effects.fadeIn)}back(){return this._last_view_fn?this._last_view_fn():null}async __waitAll(){const e=[];for(const n of this._view_promises){const t=await n.view;await t.ready(),e.push(t)}return e}async __activateView(e,n,...t){if(isView(e)){for(const e of this._view_promises){const n=await e.view;n.hide()}n?e.show(n,...t):e.show(),this._last_view_fn=this._curr_view_fn,this._curr_view_fn=this.__activateView.bind(this,e,n,...t)}return e}}class r extends i{constructor(){super()}async ready(){return super.ready()}}class s extends Vanilla{constructor(){super(),this._channelName="*",this._subscription=null,this._func=null,this._args=[]}get channel(){return this._channelName}set channel(e){this._channelName=e||"*"}get subscription(){return this._subscription}set subscription(e){this._subscription=e}get func(){return this._func}bind(e,...n){isFunction(e)&&(this._func=e,this._args.push(...n))}}class d{constructor(...e){this._id="",this._channel="",!!e&&0<e.length&&(this._channel=e[0],this._id=e[1]||"",isFunction(this._id)&&(this._id=this._id.name||""))}get id(){return this._id||"*"}set id(e){this._id=e}get channel(){return this._channel||"*"}set channel(e){this._channel=e}}class o{constructor(){this._listeners=[]}publish(e,n){invokeAsync(this,(e,n)=>{e=e||"*";for(const t of this._listeners){const i=t.subscription;if("*"===i.channel||i.channel===e||"*"===e){const r=new d(e,i.id);invokeAsync(this,t.func,r,n,...t._args)}}},e,n)}subscribe(e,n,...t){e=e||"*";const i=new d;if(isFunction(n)){i.id=setFunctionName(n,uuid()),i.channel=e;const r=new s;r.subscription=i,r.channel=e,r.bind(n,...t),this._listeners.push(r)}return i}unsubscribe(...e){const n=[];if(!!e&&0<e.length){const t=e[0]instanceof d?e[0]:new d(...e),i=[...this._listeners];this._listeners=[];for(const e of i){const i=e?e.subscription:null;if(!!i){const r=i.id===t.id||"*"===t.id,s=i.channel===t.channel||"*"===t.channel;s&&r?n.push(i):this._listeners.push(e)}}}return n}clear(){this._listeners=[]}}e.BaseView=n,e.app=new class extends Vanilla{constructor(){super(),this._pages=new r,this._messages=new o}get pages(){return this._pages}get messages(){return this._messages}async ready(){return await this._pages.ready(),this}}}(vanilla),function(instance){function configFn(e){return eachProp(e,function(e,n){_config[e]=n}),_config}function _fetchFn(e,n,t){if(!n)return void invoke(null,t,null,[new Error("Missing url parameter.")]);const i=isArray(n)?n:[n],r=[],s=[],d=configFn().limit;for(let o of i)o=urlHref(o),_cache_count[o]=hasProp(_cache_count,o)?_cache_count[o]+1:1,_cache_count[o]>d&&(console.warn(`Component reached the limit of ${d} requests: ${o}`),_cache_count[o]=0),!!_cache[o]&&configFn().use_cache?s.push(_cache[o]):r.push(fetch(o,{method:"GET"}));return s.length===i.length?void invoke(null,t,s):void Promise.all(r).then(async function(n){for(const t of n){const n=await t.status,i=await t.statusText,r=await t.url,d=r.split(".").pop(),o=e||_ext_fetch[d]||"text",a={url:r,ext:d,type:o};if(200!==n)a.type="error",a.error=new Error(`Error ${n} "${i}": ${r}`),s.push(a);else try{"text"===o&&(a[o]=await t.text()),"json"===o&&(a[o]=await t.json()),"blob"===o&&(a[o]=await t.blob()),"bytes"===o&&(a[o]=await t.bytes()),"arrayBuffer"===o&&(a[o]=await t.arrayBuffer()),s.push(a),_cache[r]=a}catch(n){s.push({url:r,error:n})}}invoke(instance,t,s)}).catch(function(e){s.push({error:e}),invoke(instance,t,s)})}function _solve(fetchResponses,callback){const solved=[],errors=[];for(const response of fetchResponses)if(!!response.error)errors.push(response.error);else{const ext=response.ext,type_fetch=response.type,fmt=_ext_solve[ext]||type_fetch;try{const item={type:fmt};switch(fmt){case"blob":item.value=response.blob;break;case"bytes":item.value=response.bytes;break;case"arrayBuffer":item.value=response.arrayBuffer;break;case"json":item.value=response.json;break;case"script":const text=response.text,evaluated=eval(text);evaluated?item.value=evaluated:console.warn("_solve: Missing return or export statement!",response);break;default:item.value=response.text}solved.push(item)}catch(n){errors.push(n)}}invoke(instance,callback,solved,errors)}function require(e,n,t){!e||_fetchFn(t,e,function(e){_solve(e,function(e,t){const i={};let r=0;for(const n of e)"script"===n.type?eachProp(n.value,(e,n)=>{i[e]=n}):(i[r]=n.value,r++);0<t.length?invoke(instance,n,i,t):invoke(instance,n,i,!1)})})}const _cache={},_cache_count={},_ext_fetch={md:"text",js:"text",txt:"text",json:"json",jpg:"blob",png:"blob",pdf:"bytes",wav:"arrayBuffer"},_ext_solve={js:"script"},_config={use_cache:!0,limit:700};instance.require=require,instance.require.config=configFn}(vanilla),function(e){e.template={TPL_PREFIX:"<%",TPL_SUFFIX:"%>",render:function(n,t){const i=e.template.TPL_PREFIX,r=e.template.TPL_SUFFIX,s=e.html.encode(i),d=e.html.encode(r);let o=n;for(const e in t)if(t.hasOwnProperty(e)){const n=t[e];o=o.replaceAll(`${i+e+r}`,n),o=o.replaceAll(`${s+e+d}`,n)}return o}}}(vanilla),function(e){function n(e){if(isHTMLElement(e))return e;if(isHTML(e))return i(e);const{elem:n,str:r,comp:s}=argsSolve(e);return n||t(s?s.uid:r)}function t(e){try{const n=isString(e)?document.getElementById(e):e;if(!!n)return n;console.error(`get() -> Element not found: "${e}"`)}catch(n){console.error(`get() -> Error retrieving "${e}":`,n)}return null}function i(e){const n=document.createElement("div");return n.innerHTML=e.trim(),n.firstElementChild}function r(e){if(!!e){const n=document.getElementsByTagName(e);return!!n&&0<n.length?n[0]:null}return null}function s(t,i){const r=n(t);if(!!r&&isFunction(i)){if(invoke(e,i,r))return;for(const e of r.children)s(e,i)}}function d(){return document.head||r("head")}let o=!1;e.dom={ready:function i(n,t){if(isFunction(n)){function i(){o=!0,invoke(e,n,e)}if(!!o)return void invoke(e,n,e);"complete"===document.readyState?(o=!0,invoke(e,n,e)):"interactive"===document.readyState?!!t&&(o=!0,invoke(e,n,e)):(context.addEventListener("DOMContentLoaded",()=>{!t||(context.removeEventListener("load",i),o=!0,invoke(e,n,e))}),context.addEventListener("load",i))}},scripts:function e(){return document.getElementsByTagName("script")||[]}(),elem:n,get:t,remove:function n(e){try{const n=t(e);if(!!n)return n.remove(),n}catch(n){console.error(`removeElemById() -> removing element "${e}":`,n)}return null},removeChild:function n(e){try{const n=t(e);if(!!n)return n.innerHTML="",n}catch(n){console.error(`removeElemChildrenById() -> removing children from "${e}":`,n)}return null},setInner:function i(e,n){try{const i=t(e);if(!!i)return i.innerHTML=n,i}catch(t){console.error(`setInnerHTMLById() -> inserting "${n}" into "${e}":`,t)}return null},appendInner:function i(e,n){try{const i=t(e);if(!!i){const e=document.createElement("div");return i.append(e),e.outerHTML=n,i}}catch(n){console.error(`appendElemChildById() -> adding child into "${e}":`,n)}return null},classRemove:function i(e,n){try{const i=t(e);!i||i.classList.remove(n)}catch(n){console.error(`classRemove() -> adding child into "${e}":`,n)}return null},classAdd:function i(e,n){try{const i=t(e);!i||i.classList.add(n)}catch(n){console.error(`classAdd() -> adding class into "${e}":`,n)}return null},tagAddStyle:function t(e,n){try{n=isString(n)?r(n):n,n=n||d();const t=document.createElement("style");n.appendChild(t),t.appendChild(document.createTextNode(e))}catch(e){console.error(`tagAddStyle() -> adding style tag into header:`,e)}return null},tagAddScript:function t(e,n){try{n=isString(n)?r(n):n,n=n||d();const t=document.createElement("script");n.appendChild(t),t.appendChild(document.createTextNode(e))}catch(e){console.error(`tagAddScript() -> adding script tag into header:`,e)}return null},childOfById:function i(e,t){let r=null;const d=n(e);return d?s(d,e=>{if(t===e.getAttribute("id"))return r=e,!0}):console.error("dom.childOfById()",new Error("Parent elem do not exist!")),r},each:s,head:d,body:function e(){return document.body||r("body")}}}(vanilla),function n(e){function t(){a||(a=!0,e.dom.tagAddStyle(o))}function i(n,i,r){if(!!n){t();const s=e.dom.elem(n);if(!!s){let n,t;isFunction(i)?n=i:isNumber(i)&&(t=i),isFunction(r)?n=r:isNumber(r)&&(t=r),t=t||d,s.style.animation="vanilla-fadeIn ease "+t+"ms",s.style.animationFillMode="forwards",s.style.animationIterationCount="1";const o=setInterval(function(){clearInterval(o),invoke(e,n)},t)}}}function r(n,i,r){if(!!n){t();const s=e.dom.elem(n);if(!!s){let n,t;isFunction(i)?n=i:isNumber(i)&&(t=i),isFunction(r)?n=r:isNumber(r)&&(t=r),t=t||d,s.style.animationName="vanilla-bounce",s.style.animationDuration=t+"ms",s.style.animationFillMode="both",s.style.animationIterationCount="1";const o=setInterval(function(){clearInterval(o),s.style.animationName="",invoke(e,n)},t)}}}function s(n,r,s){if(!!n){t();const d=e.dom.elem(n);!d||(d.style.opacity="0",e.dom.classRemove(d,"hidden"),i(n,r,s))}}const d=1e3,o=`
            .hidden {visibility: hidden; display:none;}           
            @keyframes vanilla-fadeIn {
                0% { opacity: 0; }
                100% { opacity: 1; }
            }
            @keyframes vanilla-bounce { 
                0%, 20%, 50%, 80%, 100% {transform: translateY(0); opacity:1;} 
                40% {transform: translateY(-30px);} 
                60% {transform: translateY(-15px);} 
            }

        `;let a=!1;e.effects={fadeIn:i,bounce:r,show:s}}(vanilla),function n(e){function t(e,n,t){if(e&&"string"==typeof e){const i=new RegExp(n,"g");return e.replace(i,t)}return""}function i(e){return!!e&&0<e.toString().trim().length}function r(e,n){return 0===e.indexOf(n)}function s(e,n){return e.lastIndexOf(n||"")===e.length-(n?n.length:1)}function d(e,n,t){if(isString(e)&&isString(n)&&isString(t)&&!!n&&!!t){const i=e.indexOf(n)+n.length,r=e.lastIndexOf(t)-1;return-1<i&&-1<r?e.substring(i,r).trim():e.trim()}return e}e.strings={replaceAll:t,hasText:i,startsWith:r,endsWith:s,textBetween:d}}(vanilla),function n(e){function t(e){const n=new DOMParser().parseFromString(e,"text/html");return n.documentElement.textContent||""}function i(e){const n=document.createElement("textarea");return n.innerText=e,n.innerHTML.split("<br>").join("\n")||""}function r(n){const t=e.strings.textBetween(n,"<body>","</body>");return t||n}e.html={decode:t,encode:i,bodyContent:r}}(vanilla),function n(e){e.utils={bind:bind,invoke:invoke,invokeAsync:invokeAsync,isFunction:isFunction,isArray:isArray,isObject:isObject,isString:isString,isNumber:isNumber,isHTMLElement:isHTMLElement,isUrl:isUrl,isView:isView,isVUID:isVUID,toVUID:toVUID,each:each,eachReverse:eachReverse,eachProp:eachProp,get:getDeep,uuid:uuid,argsSolve:argsSolve,argsSolveMultiple:argsSolveMultiple}}(vanilla),vanilla.ready=vanilla.dom.ready,console.info(`VANILLA v${vanilla.version}`),context.vanilla=vanilla,context.vanilla})();