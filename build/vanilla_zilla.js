!(()=>{const name="\uD83E\uDD96 Vanilla-Zilla",v=`0.0.3`,vPrefix="v-",context=!!window&&window,document=!!context&&context.document;if(!document)return void console.error("Invalid environment!");const channel_zilla="__zilla",message_type_internal="internal",message_target_pages="pages",message_target_routing="routing",on_before_create="onBeforeCreate",on_after_create="onAfterCreate",on_ready="onReady",on_data_received="onDataReceived",on_show="onShow",on_hide="onHide",op=Object.prototype,ostring=op.toString,hasOwn=op.hasOwnProperty,isBrowser="undefined"!=typeof context&&"undefined"!=typeof navigator&&document,isWebWorker=!isBrowser&&"undefined"!=typeof importScripts,hasProp=function(e,n){return hasOwn.call(e,n)},getOwn=function(e,n){return hasProp(e,n)&&e[n]},getDeep=function(e,n){if(!e||!n)return;let t=e;return each(n.split("."),function(e){return!hasProp(t,e)||void(t=t[e])}),t},eachProp=function(e,n){if(e)for(let t in e)if(hasProp(e,t)&&n(t,e[t]))break},isArray=function(e){return"[object Array]"===ostring.call(e)},isFunction=function(e){return!!e&&"[object Function]"===ostring.call(e)},isAsyncFunction=function(e){return!!e&&"[object AsyncFunction]"===ostring.call(e)},isString=function(e){return"string"==typeof e},isObject=function(e){return!isArray(e)&&"object"==typeof e},isNumber=function(e){return!isNaN(parseFloat(e))&&isFinite(e)},isHTMLElement=function(e){return!!e&&e instanceof HTMLElement},isPromise=function(e){return!!e&&e instanceof Promise},isVanilla=function(e){return!!e&&e instanceof Vanilla},isComponent=function(e){return!!e&&e instanceof vanilla.BaseComponent},isMessage=function(e){return!!e&&e instanceof ZMessage},isView=function(e){return!!e&&e instanceof vanilla.BaseView},isHTML=function(e){return isString(e)&&/<\/?[a-z][\s\S]*>/i.test(e)},isUrl=function(e){return isString(e)&&(e.startsWith("./")||e.startsWith("http"))},isVUID=function(e){return!!e&&isString(e)&&e.startsWith(vPrefix)},toVUID=function(e,n){return isString(n)?isVUID(n)?n:e+"-"+n:n},urlHref=function(n){try{return new URL(n).href}catch(t){return new URL(n,document.baseURI).href}},each=function(e,n){if(!!e)for(let t=0;t<e.length&&!(e[t]&&n(e[t],t,e));t+=1);},eachReverse=function(e,n){if(!!e)for(let t=e.length-1;-1<t&&!(e[t]&&n(e[t],t,e));t-=1);},bind=function(e,n,...t){return!!isFunction(n)&&function(){return n.call(e,...t)}},invoke=function(e,n,...t){return!!(!!n&&(isFunction(n)||isAsyncFunction(n)))&&n.call(e,...t)},invokeAsync=function(e,n,...t){setTimeout((e,n,...t)=>{invoke(e,n,...t)},0,e,n,...t)},uuid=function(e){return e=e||"",e+"10000000-1000-4000-8000-100000000000".replace(/[018]/g,e=>(+e^crypto.getRandomValues(new Uint8Array(1))[0]&15>>+e/4).toString(16))},vuid=function(){return uuid(vPrefix)},slugify=function(e){return e+="",e=e.replace(/^\s+|\s+$/g,""),e=e.toLowerCase(),e=e.replace(/[^a-z0-9 -]/g,"").replace(/\s+/g,"_").replace(/-+/g,"_"),e},argsSolve=function(...e){const n={comp:null,elem:null,obj:null,str:"",promise:null,func:[],args:[]};return each(e,(e,t)=>isPromise(e)?(n.promise=n.promise||[],void n.promise.push(e)):isFunction(e)?(n.func=n.func||[],void n.func.push(e)):isHTMLElement(e)?void(n.elem=e):isVanilla(e)?void(n.comp=e):isObject(e)?void(n.obj?eachProp(e,(e,t)=>{n.obj[e]=t}):n.obj=e):isArray(e)?void n.args.push(...e):void(isString(e)&&(0===t?n.str=e:n.elem?n.str=e:n.elem=e))),n},argsSolveMultiple=function(...e){const n={promises:null,functions:null,elements:null,views:null,components:null,objects:null,arrays:null,numbers:null,strings_url:null,strings_vuid:null,strings_html:null,strings:null};return each(e,e=>isPromise(e)?(n.promises=n.promises||[],void n.promises.push(e)):isFunction(e)?(n.functions=n.functions||[],void n.functions.push(e)):isHTMLElement(e)?(n.elements=n.elements||[],void(n.elements=e)):isView(e)?(n.views=n.views||[],void(n.views=e)):isVanilla(e)?(n.components=n.components||[],void(n.components=e)):isObject(e)?(n.objects=n.objects||[],void(n.objects=e)):isArray(e)?(n.arrays=n.arrays||[],void n.arrays.push(e)):isNumber(e)?(n.numbers=n.numbers||[],void n.numbers.push(e)):isUrl(e)?(n.strings_url=n.strings_url||[],void n.strings_url.push(e)):isVUID(e)?(n.strings_vuid=n.strings_vuid||[],void n.strings_vuid.push(e)):isHTML(e)?(n.strings_html=n.strings_html||[],void n.strings_html.push(e)):void(isString(e)&&(n.strings=n.strings||[],n.strings.push(e)))),n},setFunctionName=function(e,n){return isFunction(e)&&Object.defineProperty(e,"name",{value:n,writable:!1}),n};class Vanilla{constructor(){this._uid=vuid()}}class Futures{constructor(){this._late_actions=[]}push(e,n,...t){!n||this._late_actions.push(n.bind(e||this,...t))}doAll(){!this._late_actions||(each(this._late_actions,e=>{try{e()}catch(e){console.error("",e)}}),this._late_actions=[])}}class ZMessage{constructor(e,n,t,i){this._sender=e||"",this._type=n||message_type_internal,this._target=t||"*",this._data=i||{}}get sender(){return this._sender}set sender(e){this._sender=e}get type(){return this._type}set type(e){this._type=e}get target(){return this._target}set target(e){this._target=e}get data(){return this._data}set data(e){this._data=e}isTarget(e){return this._target||"*"===this._target||this._target===e}}const vanilla={};return context.module||(context.module={exports:{}}),function(e){e.version=v,e.env={name:name,version:v,isBrowser:isBrowser,isWorker:isWebWorker}}(vanilla),function(e){function n(e,n,t){console.log("DOM invokeReady"),invoke(e,n,t)}function t(e){if(isHTMLElement(e))return e;if(isHTML(e))return r(e);const{elem:n,str:t,comp:a}=argsSolve(e);return n||i(a?a.uid:t)}function i(e){try{const n=isString(e)?document.getElementById(e):e;if(!!n)return n;console.error(`get() -> Element not found: "${e}"`)}catch(n){console.error(`get() -> Error retrieving "${e}":`,n)}return null}function r(e){const n=document.createElement("div");return n.innerHTML=e.trim(),n.firstElementChild}function a(e){if(!!e){const n=document.getElementsByTagName(e);return!!n&&0<n.length?n[0]:null}return null}function s(n,i){const r=t(n);if(!!r&&isFunction(i)){if(invoke(e,i,r))return;for(const e of r.children)s(e,i)}}function d(){return document.head||a("head")}let o=!1;e.dom={ready:function r(t,i){if(isFunction(t)){function r(){o=!0,n(e,t,e)}if(!!o)return void n(e,t,e);"complete"===document.readyState?(o=!0,n(e,t,e)):"interactive"===document.readyState?!!i&&(o=!0,n(e,t,e)):(context.addEventListener("DOMContentLoaded",()=>{!i||(context.removeEventListener("load",r),o=!0,n(e,t,e))}),context.addEventListener("load",r))}},scripts:function e(){return document.getElementsByTagName("script")||[]}(),elem:t,get:i,remove:function n(e){try{const n=i(e);if(!!n)return n.remove(),n}catch(n){console.error(`removeElemById() -> removing element "${e}":`,n)}return null},removeChild:function n(e){try{const n=i(e);if(!!n)return n.innerHTML="",n}catch(n){console.error(`removeElemChildrenById() -> removing children from "${e}":`,n)}return null},setInner:function t(e,n){try{const t=i(e);if(!!t)return t.innerHTML=n,t}catch(t){console.error(`setInnerHTMLById() -> inserting "${n}" into "${e}":`,t)}return null},appendInner:function t(e,n){try{const t=i(e);if(!!t){const e=document.createElement("div");return t.append(e),e.outerHTML=n,t}}catch(n){console.error(`appendElemChildById() -> adding child into "${e}":`,n)}return null},classRemove:function t(e,n){try{const t=i(e);!t||t.classList.remove(n)}catch(n){console.error(`classRemove() -> adding child into "${e}":`,n)}return null},classAdd:function t(e,n){try{const t=i(e);!t||t.classList.add(n)}catch(n){console.error(`classAdd() -> adding class into "${e}":`,n)}return null},tagAddStyle:function t(e,n){try{n=isString(n)?a(n):n,n=n||d();const t=document.createElement("style");n.appendChild(t),t.appendChild(document.createTextNode(e))}catch(e){console.error(`tagAddStyle() -> adding style tag into header:`,e)}return null},tagAddScript:function t(e,n){try{n=isString(n)?a(n):n,n=n||d();const t=document.createElement("script");n.appendChild(t),t.appendChild(document.createTextNode(e))}catch(e){console.error(`tagAddScript() -> adding script tag into header:`,e)}return null},childOfById:function i(e,n){let r=null;const a=t(e);return a?s(a,e=>{if(n===e.getAttribute("id"))return r=e,!0}):console.error("dom.childOfById()",new Error("Parent elem do not exist!")),r},each:s,head:d,body:function e(){return document.body||a("body")}}}(vanilla),function initRequire(instance){function configFn(e){return eachProp(e,function(e,n){_config[e]=n}),_config}function _fetchFn(e,n,t){if(!n)return void invoke(null,t,null,[new Error("Missing url parameter.")]);const i=isArray(n)?n:[n],r=[],a=[],s=configFn().limit;for(let d of i)d=urlHref(d),_cache_count[d]=hasProp(_cache_count,d)?_cache_count[d]+1:1,_cache_count[d]>s&&(console.warn(`Component reached the limit of ${s} requests: ${d}`),_cache_count[d]=0),!!_cache[d]&&configFn().use_cache?a.push(_cache[d]):r.push(fetch(d,{method:"GET"}));return a.length===i.length?void invoke(null,t,a):void Promise.all(r).then(async function(n){for(const t of n){const n=await t.status,i=await t.statusText,r=await t.url,s=r.split(".").pop(),d=e||_ext_fetch[s]||"text",o={url:r,ext:s,type:d};if(200!==n)o.type="error",o.error=new Error(`Error ${n} "${i}": ${r}`),a.push(o);else try{"text"===d&&(o[d]=await t.text()),"json"===d&&(o[d]=await t.json()),"blob"===d&&(o[d]=await t.blob()),"bytes"===d&&(o[d]=await t.bytes()),"arrayBuffer"===d&&(o[d]=await t.arrayBuffer()),a.push(o),_cache[r]=o}catch(n){a.push({url:r,error:n})}}invoke(instance,t,a)}).catch(function(e){a.push({error:e}),invoke(instance,t,a)})}function _solve(fetchResponses,callback){const solved=[],errors=[];for(const response of fetchResponses)if(!!response.error)errors.push(response.error);else{const ext=response.ext,type_fetch=response.type,fmt=_ext_solve[ext]||type_fetch;try{const item={type:fmt};switch(fmt){case"blob":item.value=response.blob;break;case"bytes":item.value=response.bytes;break;case"arrayBuffer":item.value=response.arrayBuffer;break;case"json":item.value=response.json;break;case"script":const text=response.text,evaluated=eval(text);evaluated?item.value=evaluated:console.warn("_solve: Missing return or export statement!",response);break;default:item.value=response.text}solved.push(item)}catch(n){errors.push(n)}}0<errors.length?invoke(instance,callback,solved,new AggregateError(errors,"Errors fetching data")):invoke(instance,callback,solved,!1)}function require(e,n,t){return new Promise((i,r)=>{e?_fetchFn(t,e,function(e){_solve(e,function(e,t){const a={};let s=0;for(const n of e)"script"===n.type?eachProp(n.value,(e,n)=>{a[e]=n}):(a[s]=n.value,s++);t?(!!n&&invoke(instance,n,a,t),r(t)):(!!n&&invoke(instance,n,a,!1),i(a))})}):r(new Error("Nothing to require, missing URLs"))})}const _cache={},_cache_count={},_ext_fetch={md:"text",js:"text",txt:"text",json:"json",jpg:"blob",png:"blob",pdf:"bytes",wav:"arrayBuffer"},_ext_solve={js:"script"},_config={use_cache:!0,limit:700};instance.require=require,instance.require.config=configFn}(vanilla),function n(e){function t(e,n,t,i){let r="";return r=e?e.uid:"",!n||(!n.id&&(n.id=uuid()),r+=r?"|"+n.id:n.id),r+=r?"|"+t:t,!i||(r+=r?"|"+i:i),r}function i(n,i,r,a,...s){const d={},o=a.bind(e,d),_=setFunctionName(o,uuid());return d.id=t(n,i,r,_),d.name=r,d.sender=n,d.target=i,d.handler=o,d.handlerName=_,d.data=[...s],d}function r(e,n,t,r,...a){const s=i(e,n,t,r,...a);return s&&s.id&&s.handler&&!o[s.id]?(o[s.id]=s,s.handler):null}function a(e,n,t){let i=0;return eachProp(o,(r,a)=>{let s=r===t||a.handlerName===t;s||(e||n?n&&a.target&&a.target.id===n.id?s=!t||a.name===t:!!e&&!!a.sender&&a.sender.uid===e.uid&&(s=!t||a.name===t):s=!t||a.name===t||a.sender.uid===t||a.target.id===t),s&&(a.target.removeEventListener(a.name,a.handler,{capture:!0}),delete o[r],i++)}),i}function s(n,t,i,a,...s){if(!!t&&!!i&&!!a){const d=e.dom.get(t);if(!!d){const e=r(n,t,i,a,...s);!e||d.addEventListener(i,e,{capture:!0})}}}function d(n,t,i){const r=isString(i)?i:isFunction(i)?i.name:i.id;return invokeAsync(e,a,n,t,r)}const o={};e.events={on:s,off:d}}(vanilla),function n(e){class t extends Vanilla{constructor(e){super(),this._model=!1,this._created=!1,this.__require(e)}async get(){return new Promise(async(e,n)=>{if(!this._model)e(null);else if(isPromise(this._model)){const n=await this._model;e(n)}else e(this._model)})}set(e){!e||(this._model?isObject(e)&&(this._model=e):this.__require(e))}__require(e){const n=this;if(!!e){if(n.__invoke_before_create(),isUrl(e))return void(n._model=new Promise(async(t,i)=>{vanilla.require(e,(e,r)=>{if(!!r)i(r);else{const r=e[0];r?(n._model=r,n._model=this.__invoke_data_received(r),n.__invoke_after_create(),t(n._model)):i(new Error("Data not found"))}}).catch()}));if(isObject(e))return n._model=this.__invoke_data_received(e),void n.__invoke_after_create();throw new Error(`Data not supported: ${e}`)}else n.__invoke_after_create()}__invoke_before_create(){invoke(this,this[on_before_create])}__invoke_after_create(){this._created||(this._created=!0,invoke(this,this[on_after_create]))}__invoke_data_received(e){const n=invoke(this,this[on_data_received],e);return isObject(n)?n:e}}e.classes={DataWrapper:t}}(vanilla),function n(e){function t(...n){const{comp:t,elem:r,str:a,obj:s}=argsSolve(...n);if(!!t)return t;const d=e.dom.elem(r||a);return new i(d,s)}class i extends Vanilla{constructor(...e){super(),this._model={},this._model.uid=this._uid,this._parent_elem=null,this._detached=!0,this._visible=!1,this._late_actions=new Futures,this._elem=null,this._elem_promise=null,this._consistence_promise_resolver=Promise.withResolvers(),this._ready_promise_resolver=Promise.withResolvers(),this._created=!1,this.__init_component(...e)}get uid(){return this._uid}get detached(){return this._detached}get visible(){return this._visible}set visible(e){e?this.show():this.hide()}set html(n){if(isHTML(n)){const t=e.html.bodyContent(n),i=this._renderHtml(t),r=e.dom.elem(i);!r||(e.dom.body().insertAdjacentElement("beforeend",r),this.setElem(r))}else if(isUrl(n)){const t=n;this._elem_promise=new Promise((n,i)=>{e.require(t,(e,r)=>{if(!!r)i(new Error(`Error creating page from "${t}": ${r}`));else{const r=e[0];isString(r)?(this.html=r,n(this._elem)):i(new Error(`Error creating page from "${t}". Unexpected returned value: ${r}`))}})})}else console.warn(`Error creating BaseComponent loading html from: "${n}"`)}setElem(e){!e||(isHTMLElement(e)?this.__init_elem(e):console.error(`BaseComponent.elem: Invalid element type: ${e}`))}async getElem(){return this._elem_promise}async ready(){return await this._ready_promise_resolver.promise}on(...n){const t=this;if(this.isConsistent()){const{promise:i,elem:r,str:a,func:s,args:d}=argsSolve(...n);if(!!i)Promise.all(i).then(e=>{for(const n of e)each(s,e=>{invoke(t,t.on,n,a,e,...d)})}).catch(e=>{console.error("BaseComponent.on#promise",e)});else{const n=r||this._elem,t=a||"click",i=s&&0<s.length&&s[0];!i||e.events.on(this,n,"\uD83E\uDD96 Vanilla-Zilla",i,...d)}}else this._late_actions.push(this,this.on,...n)}off(...n){const t=this;if(this.isConsistent()){const{promise:i,elem:r,obj:a,str:s,func:d}=argsSolve(...n);if(!!i)Promise.all(i).then(e=>{for(const n of e)each(d,e=>{invoke(t,t.off,n,s,e)})}).catch(e=>{console.error("BaseComponent.on#promise",e)});else{const n=!!d&&0<d.length?d:a||s;e.events.off(this,r,n)}}else this._late_actions.push(this,this.off,...n)}isConsistent(){return!!this._elem&&!!this._parent_elem&&!this._detached}async childElem(n){const t=toVUID(this._uid,n),i=await this.getElem();return i?e.dom.childOfById(i,t):null}attach(n){const t=this;if(!!n)try{const{promise:i,elem:r,str:a,comp:s}=argsSolve(n),d=r?r:i?i:a?e.dom.get(toVUID(this._uid,n)):s?s.getElem():n;isHTMLElement(d)?(this._parent_elem=d,this._elem&&this._parent_elem?(this._parent_elem.append(this._elem),this._detached=!1):this._late_actions.push(this,this.attach,n)):isPromise(d)?d.then(e=>{invoke(t,t.attach,e)}).catch(e=>{console.error("BaseComponent.attach#promise: ",e)}):console.warn("BaseComponent.attach() wrong parent type: ",d)}catch(e){console.error("BaseComponent.attach: ",e)}return this}show(e,...n){try{this.isConsistent()?!this._visible&&!!this._elem&&(this._elem.classList.remove("hidden"),this._visible=!0,!!e&&invoke(this._elem,e,this._elem,...n),invoke(this,this[on_show])):this._late_actions.push(this,this.show,e,...n)}catch(e){console.error("BaseComponent.show: ",e)}return this}hide(e,...n){try{this.isConsistent()?this._visible&&(this._elem.classList.add("hidden"),this._visible=!1,!!e&&invoke(this._elem,e,this._elem,...n),invoke(this,this[on_hide])):this._late_actions.push(this,this.hide,e,...n)}catch(e){console.error("BaseComponent.hide: ",e)}return this}fadeIn(n,t){try{this.isConsistent()?this.show(e.effects.fadeIn,n,t):this._late_actions.push(this,this.fadeIn,n,t)}catch(e){console.error("BaseComponent.fadeIn: ",e)}return this}effect(e,...n){try{this.isConsistent()?(this.show(),e.bind(this._elem,...n)):this._late_actions.push(this,this.effect,e,...n)}catch(e){console.error("BaseComponent.effect: ",e)}return this}detach(){try{this.off();const n=e.dom.body();n.append(this._elem),this._elem.classList.add("hidden"),this._detached=!0,this._visible=!1}catch(e){console.error("BaseComponent.detach: ",e)}return!1}remove(){try{return this.off(),this._elem.remove(),this._elem=null,this._visible=!1,this._model=null,!0}catch(e){console.error("BaseComponent.remove: ",e)}return!1}__init_component(...e){this.__invoke_before_create();const{obj:n,str:t,elem:i}=argsSolve(...e);!n||(eachProp(n,(e,n)=>{this._model[e]=n}),!this._model.uid&&(this._model.uid=this._uid)),t?this.html=t:!!i&&(this._parent_elem=i.parentNode,!!this._parent_elem&&(this._detached=!1),i.innerHTML=this._renderHtml(i.innerHTML),i.getAttribute("id")?(this._uid=i.getAttribute("id"),!this._model.uid&&(this._model.uid=this._uid)):i.setAttribute("id",this._uid),this.setElem(i))}__init_elem(n){if(!!n)try{const t=this._uid;this._elem=n,this._elem.classList.add("hidden"),this._elem.getAttribute("id")||this._elem.setAttribute("id",t),e.dom.each(n,e=>{if(!!e){const n=e.getAttribute("id");if(!!n&&!isVUID(n)){const i=toVUID(t,n);e.setAttribute("id",i)}}}),!!this._parent_elem&&this._detached&&this._late_actions.doAll(),this.__invoke_after_create(),this._consistence_promise_resolver.resolve(this)}catch(e){this._consistence_promise_resolver.reject(e)}}_renderHtml(n){const t=e.template.render(n,this._model);return isHTML(t)?t:`<div>${t}</div>`}__invoke_before_create(){invoke(this,this[on_before_create])}__invoke_after_create(){const e=this;if(!e._created){e._created=!0;const n=invoke(e,e[on_after_create]);if(isPromise(n))n.catch(n=>{e._ready_promise_resolver.reject(n)}).then(n=>{const t=e.__invoke_on_ready();isPromise(t)?t.then(()=>{e._ready_promise_resolver.resolve(e)}):e._ready_promise_resolver.resolve(e)});else{const n=e.__invoke_on_ready();isPromise(n)?n.then(()=>{e._ready_promise_resolver.resolve(e)}):e._ready_promise_resolver.resolve(e)}}}__invoke_on_ready(){return invoke(this,this[on_ready])}}e.BaseComponent=i,e.components={BaseComponent:i,componentize:t}}(vanilla),function n(e){class t extends e.BaseComponent{constructor(...e){super(),this._name="anonymous",this._slug="anonymous",this._model={},this._views=new r(this),this.__init_view(...e)}get slug(){return this._slug}get name(){return this._name}set name(e){!e||(this._name=e,this._slug=slugify(e))}get model(){return this._model}get views(){return this._views}init(e,n){this.__init_view(e,n)}async ready(){return await super.ready(),await this._views.ready(),this}attach(e){if(!!e){const n=toVUID(this._uid,e);return super.attach(n)}}show(e,...n){super.show(e,...n)}hide(e,...n){super.hide(e,...n)}async childElem(e){const n=toVUID(this._uid,e);return super.childElem(n)}__init_view(...e){const{obj:n,str:t}=argsSolve(...e);!n||(eachProp(n,(e,n)=>{this._model[e]=n}),!this._model.uid&&(this._model.uid=this._uid)),!t||(super.html=t)}}class i{constructor(e,n,t,i){this._parentComponent=i,this._name=e,this._slug=slugify(e),this._url=n,this._model=t||{},this._view_resolver=Promise.withResolvers(),this._init_loader()}get name(){return this._name}get slug(){return this._slug}get view(){return this._view_resolver.promise}_init_loader(){const n=this._url,t=this._model,i=this._name;e.require(n,(i,r)=>{r?this._view_resolver.reject(new Error(`Error creating page from "${n}": ${r}`)):eachProp(i,async(n,i)=>{const r=new i(t);if(r.name="\uD83E\uDD96 Vanilla-Zilla",r.attach(e.dom.body()),!!this._parentComponent){const e=await this._parentComponent.getElem();r.attach(e)}this._view_resolver.resolve(r)})})}}class r{constructor(e){this._parentComponent=e,this._view_promises=[],this._curr_view_fn=null,this._last_view_fn=null,this._curr_view=null,this._last_view=null}push(...e){for(const n of e){const e=n.name,t=n.url,r=n.data||{};if(!!e&&!!t){const n=new i(e,t,r,this._parentComponent);this._view_promises.push(n)}}return this._view_promises.length}prepare(...e){return this.push(...e),this.__waitAll()}async ready(){return await this.__waitAll(),this}async get(e){if(isView(e))return e;const n=e instanceof i?e:null;if(!!n)return n.view;if(0<this._view_promises.length){let n=0;for(const t of this._view_promises){const i=await t.view;if(i){if(isString(e)){if(i.uid===e||i.name===e||i.slug===e)return i;}else if(isNumber(e)&&n===e)return i;n++}}}return null}async goto(e,n,...t){if(!!e){const i=await this.get(e);return await this.__activateView(i,n,...t)}}async home(){const e=await this.get(0);return await this.__activateView(e,vanilla.effects.fadeIn)}back(){return this._last_view_fn?this._last_view_fn():null}async __waitAll(){const e=[];for(const n of this._view_promises){const t=await n.view;await t.ready(),e.push(t)}return e}async __activateView(e,n,...t){if(isView(e)){for(const e of this._view_promises){const n=await e.view;n.hide()}n?e.show(n,...t):e.show(),this._last_view=this._curr_view,this._curr_view=e,this._last_view_fn=this._curr_view_fn,this._curr_view_fn=this.__activateView.bind(this,e,n,...t)}return e}}class a extends r{constructor(){super(),l.subscribe(channel_zilla,this.__onInternalMessage.bind(this))}async ready(){return super.ready()}async goto(e,n,...t){if(!!e){const i=await super.get(e),r=await super.__activateView(i,n,...t);return this.__notify(i),r}}async home(){const e=await super.get(0);if(!!e){const n=await super.__activateView(e,vanilla.effects.fadeIn);return this.__notify(e),n}return null}back(){if(!!this._last_view_fn){const e=this._last_view_fn();return this.__notify(e),e}return null}__notify(e){const n=e.slug;l.publish(channel_zilla,new ZMessage(message_target_pages,message_type_internal,message_target_routing,{name:n}))}__onInternalMessage(e,n){if(!!e&&e.channel===channel_zilla&&!!n&&n instanceof ZMessage&&n.isTarget(message_target_pages)&&!!n.data){const e=n.sender;if(e===message_target_routing){const e=n.data.hash,t=e.name||"";t?super.goto(t,null).catch(e=>{console.error(`__onInternalMessage() Navigating to page "${t}"`,e)}):this.home().catch(e=>{console.error(`__onInternalMessage() Navigating to Home page`,e)})}}}}class s extends Vanilla{constructor(){super(),this._channelName="*",this._subscription=null,this._func=null,this._args=[]}get channel(){return this._channelName}set channel(e){this._channelName=e||"*"}get subscription(){return this._subscription}set subscription(e){this._subscription=e}get func(){return this._func}bind(e,...n){isFunction(e)&&(this._func=e,this._args.push(...n))}}class d{constructor(...e){this._id="",this._channel="",!!e&&0<e.length&&(this._channel=e[0],this._id=e[1]||"",isFunction(this._id)&&(this._id=this._id.name||""))}get id(){return this._id||"*"}set id(e){this._id=e}get channel(){return this._channel||"*"}set channel(e){this._channel=e}}class o{constructor(){this._listeners=[]}publish(e,n){invokeAsync(this,(e,n)=>{e=e||"*";for(const t of this._listeners){const i=t.subscription;if("*"===i.channel||i.channel===e||"*"===e){const r=new d(e,i.id);invokeAsync(this,t.func,r,n,...t._args)}}},e,n)}subscribe(e,n,...t){e=e||"*";const i=new d;if(isFunction(n)){i.id=setFunctionName(n,uuid()),i.channel=e;const r=new s;r.subscription=i,r.channel=e,r.bind(n,...t),this._listeners.push(r)}return i}unsubscribe(...e){const n=[];if(!!e&&0<e.length){const t=e[0]instanceof d?e[0]:new d(...e),i=[...this._listeners];this._listeners=[];for(const e of i){const i=e?e.subscription:null;if(!!i){const r=i.id===t.id||"*"===t.id,a=i.channel===t.channel||"*"===t.channel,s=a&&r;s?n.push(i):this._listeners.push(e)}}}return n}clear(){this._listeners=[]}}class _ extends Vanilla{constructor(){super(),this._pages=m,this._messages=l}get pages(){return this._pages}get messages(){return this._messages}async ready(){return await this._pages.ready(),this}}const l=new o,m=new a;e.BaseView=t,e.app=new _}(vanilla),function n(e){const t=context.history,i=context.addEventListener;class r{constructor(){this._available=!0,this._enabled=!0,this._curr_hash={hash:"#",name:"",query:""},t?(i("popstate",this.__onpopstate.bind(this)),e.app.messages.subscribe(channel_zilla,this.__onInternalMessage.bind(this)),e.dom.ready(this.__onDomReady.bind(this)),console.info(`${name}: Routing enabled!`)):(this._available=!1,this._enabled=!1,console.warn(`${name}: Cannot enable routing in this environment because is not supported!`))}get enabled(){return this._enabled&&this._available}set enabled(e){this._available?this._enabled=e:e&&console.warn(`${name} Cannot enable routing in this environment because is not supported!`)}push(e){if(this.enabled&&!!context.location){const n=new URL(context.location),i=this.__parseHash(n.hash);n.hash="#"+e+(i.query?"?"+i.query:""),t.pushState({},"",n)}}replace(e){if(this.enabled&&!!context.location){const n=new URL(context.location),i=this.__parseHash(n.hash);n.hash="#"+e+(i.query?"?"+i.query:""),t.replaceState({},"",n)}}__onDomReady(){const e=new URL(context.location);this._curr_hash=this.__parseHash(e.hash),this.__notify()}__onpopstate(n){const e=this.__parseHash(n.target.location.hash),t=!!e&&e.name!==this._curr_hash.name;this._curr_hash=e,t&&this.__notify()}__parseHash(e){const n={hash:e,name:"",query:""},t=e.substring(1).toLowerCase().split("?")||[];return 0<t.length&&(n.name=t[0],2===t.length&&(n.query=t[1])),n}__notify(){const n=this._curr_hash;e.app.messages.publish(channel_zilla,new ZMessage(message_target_routing,message_type_internal,message_target_pages,{hash:n}))}__onInternalMessage(e,n){if(!!e&&e.channel===channel_zilla&&!!n&&n instanceof ZMessage&&n.isTarget(message_target_routing)&&!!n.data){const e=n.sender;if(e===message_target_pages){const e=n.data.name;this.push(e)}}}}e.routing=new r}(vanilla),function n(e){function t(n,t){const i=e.template.TPL_PREFIX,r=e.template.TPL_SUFFIX,a=e.html.encode(i),s=e.html.encode(r);let d=n;for(const e in t)if(t.hasOwnProperty(e)){const n=t[e];d=d.replaceAll(`${i+e+r}`,n),d=d.replaceAll(`${a+e+s}`,n)}return d}const i="<%",r="%>";e.template={TPL_PREFIX:"<%",TPL_SUFFIX:r,render:t}}(vanilla),function n(e){function t(){o||(o=!0,e.dom.tagAddStyle(d))}function i(n,i,r){if(!!n){t();const a=e.dom.elem(n);if(!!a){let n,t;isFunction(i)?n=i:isNumber(i)&&(t=i),isFunction(r)?n=r:isNumber(r)&&(t=r),t=t||s,a.style.animation="vanilla-fadeIn ease "+t+"ms",a.style.animationFillMode="forwards",a.style.animationIterationCount="1";const d=setInterval(function(){clearInterval(d),invoke(e,n)},t)}}}function r(n,i,r){if(!!n){t();const a=e.dom.elem(n);if(!!a){let n,t;isFunction(i)?n=i:isNumber(i)&&(t=i),isFunction(r)?n=r:isNumber(r)&&(t=r),t=t||s,a.style.animationName="vanilla-bounce",a.style.animationDuration=t+"ms",a.style.animationFillMode="both",a.style.animationIterationCount="1";const d=setInterval(function(){clearInterval(d),a.style.animationName="",invoke(e,n)},t)}}}function a(n,r,a){if(!!n){t();const s=e.dom.elem(n);!s||(s.style.opacity="0",e.dom.classRemove(s,"hidden"),i(n,r,a))}}const s=1e3,d=`      
            @keyframes vanilla-fadeIn {
                0% { opacity: 0; }
                100% { opacity: 1; }
            }
            @keyframes vanilla-bounce { 
                0%, 20%, 50%, 80%, 100% {transform: translateY(0); opacity:1;} 
                40% {transform: translateY(-30px);} 
                60% {transform: translateY(-15px);} 
            }

        `;let o=!1;e.effects={fadeIn:i,bounce:r,show:a}}(vanilla),function n(e){function t(e,n,t){if(e&&"string"==typeof e){const i=new RegExp(n,"g");return e.replace(i,t)}return""}function i(e){return!!e&&0<e.toString().trim().length}function r(e,n){return 0===e.indexOf(n)}function a(e,n){return e.lastIndexOf(n||"")===e.length-(n?n.length:1)}function s(e,n,t){if(isString(e)&&isString(n)&&isString(t)&&!!n&&!!t){const i=e.indexOf(n)+n.length,r=e.lastIndexOf(t)-1;return-1<i&&-1<r?e.substring(i,r).trim():e.trim()}return e}e.strings={replaceAll:t,hasText:i,startsWith:r,endsWith:a,textBetween:s}}(vanilla),function n(e){function t(e){const n=new DOMParser().parseFromString(e,"text/html");return n.documentElement.textContent||""}function i(e){const n=document.createElement("textarea");return n.innerText=e,n.innerHTML.split("<br>").join("\n")||""}function r(n){const t=e.strings.textBetween(n,"<body>","</body>");return t||n}e.html={decode:t,encode:i,bodyContent:r}}(vanilla),function n(e){e.utils={bind:bind,invoke:invoke,invokeAsync:invokeAsync,isFunction:isFunction,isArray:isArray,isObject:isObject,isString:isString,isNumber:isNumber,isHTMLElement:isHTMLElement,isUrl:isUrl,isView:isView,isVUID:isVUID,toVUID:toVUID,each:each,eachReverse:eachReverse,eachProp:eachProp,get:getDeep,uuid:uuid,argsSolve:argsSolve,argsSolveMultiple:argsSolveMultiple}}(vanilla),function n(e){const t=`.hidden {visibility: hidden; display:none;}`;e.dom.tagAddStyle(".hidden {visibility: hidden; display:none;}")}(vanilla),vanilla.ready=vanilla.dom.ready,console.info(`${"\uD83E\uDD96 Vanilla-Zilla"} v${vanilla.version}`),context.vanilla=vanilla,context.vanilla})();