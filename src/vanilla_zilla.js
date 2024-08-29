/**
 *  VANILLA ZILLA
 *  ----------------
 *  Copyright: Gian Angelo Geminiani
 *  License: MIT
 *  Version: 0.0.3
 */
!(() => {

    const name = "🦖 Vanilla-Zilla";
    const v = `0.0.3`;
    const vPrefix = "v-"
    const context = !!window ? window : false;
    const document = !!context ? context.document : false;
    // validate environment
    if (!document) {
        console.error("Invalid environment!");
        return
    }
    // const
    const channel_zilla = "__zilla"; // internal channel for app communication
    const message_type_internal = "internal";
    const message_target_pages = "pages";
    const message_target_routing = "routing";
    //-- events --//
    const on_before_create = "onBeforeCreate";
    const on_after_create = "onAfterCreate";
    const on_ready = "onReady";
    const on_data_received = "onDataReceived";
    const on_show = "onShow";
    const on_hide = "onHide";
    // utils
    const op = Object.prototype;
    const ostring = op.toString;
    const hasOwn = op.hasOwnProperty;
    const isBrowser = !!(typeof context !== 'undefined' && typeof navigator !== 'undefined' && !!document);
    const isWebWorker = !isBrowser && typeof importScripts !== 'undefined';
    const hasProp = function hasProp(obj, prop) {
        return hasOwn.call(obj, prop);
    }
    const getOwn = function getOwn(obj, prop) {
        return hasProp(obj, prop) && obj[prop];
    }
    const getDeep = function getGlobal(obj, path) {
        if (!obj || !path) {
            return;
        }
        let response = obj;
        each(path.split('.'), function (prop) {
            if (hasProp(response, prop)) {
                response = response[prop];
            } else {
                return true; // exit
            }
        });
        return response;
    }
    const eachProp = function eachProp(obj, func) {
        if (!obj) return;
        for (let prop in obj) {
            if (hasProp(obj, prop)) {
                // key, value
                if (func(prop, obj[prop])) {
                    break;
                }
            }
        }
    }
    const isArray = function isArray(item) {
        return ostring.call(item) === '[object Array]';
    };
    const isFunction = function isFunction(item) {
        return !!item && ostring.call(item) === '[object Function]';
    };
    const isAsyncFunction = function isAsyncFunction(item) {
        return !!item && ostring.call(item) === '[object AsyncFunction]';
    };
    const isString = function isString(v) {
        return (typeof (v) === "string");
    };
    const isObject = function isObject(v) {
        return !isArray(v) && (typeof (v) === "object");
    };
    const isNumber = function isNumber(n) {
        return !isNaN(parseFloat(n)) && isFinite(n);
    };
    const isHTMLElement = function isHTMLElement(v) {
        return !!v && v instanceof HTMLElement;
    };
    const isPromise = function isPromise(v) {
        return !!v && v instanceof Promise;
    };
    const isVanilla = function isVanilla(v) {
        return !!v && v instanceof Vanilla;
    };
    const isComponent = function isComponent(v) {
        return !!v && v instanceof vanilla.BaseComponent;
    };
    const isMessage = function isMessage(v) {
        return !!v && v instanceof ZMessage;
    };
    const isView = function isView(v) {
        return !!v && v instanceof vanilla.BaseView;
    };
    const isHTML = function isHTML(text) {
        return isString(text) && /<\/?[a-z][\s\S]*>/i.test(text);
    }
    const isUrl = function isUrl(v) {
        return isString(v) && (v.startsWith("./") || v.startsWith("http"));
    }
    const isVUID = function isVUID(text) {
        return !!text && isString(text) && text.startsWith(vPrefix);
    }
    const toVUID = function toVUID(uid, v) {
        if (isString(v)) {
            return isVUID(v) ? v : uid + "-" + v;
        }
        return v;
    }
    const urlHref = function urlHref(url) {
        try {
            return new URL(url).href;
        } catch (e) {
            return new URL(url, document.baseURI).href;
        }
    }
    const each = function each(items, func) {
        if (!!items) {
            for (let i = 0; i < items.length; i += 1) {
                if (items[i] && func(items[i], i, items)) {
                    break;
                }
            }
        }
    };
    const eachReverse = function eachReverse(items, func) {
        if (!!items) {
            for (let i = items.length - 1; i > -1; i -= 1) {
                if (items[i] && func(items[i], i, items)) {
                    break;
                }
            }
        }
    };
    const bind = function bind(obj, fn, ...args) {
        if (isFunction(fn)) {
            return function () {
                return fn.call(obj, ...args);
            };
        }
        return false;
    };
    const invoke = function invoke(obj, fn, ...args) {
        if (!!fn && (isFunction(fn) || isAsyncFunction(fn))) {
            return fn.call(obj, ...args);
        }
        return false;
    };
    const invokeAsync = function invokeAsync(pobj, pfn, ...pargs) {
        setTimeout((obj, fn, ...args) => {
            invoke(obj, fn, ...args);
        }, 0, pobj, pfn, ...pargs);
    }
    const uuid = function uuidv4(optPrefix) {
        optPrefix = optPrefix || "";
        return optPrefix + ("10000000-1000-4000-8000-100000000000".replace(/[018]/g, c =>
            (+c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> +c / 4).toString(16)
        ));
    }
    const vuid = function vuid() {
        return uuid(vPrefix);
    }
    const slugify = function slugify(value) {
        value = value + "";
        value = value.replace(/^\s+|\s+$/g, ''); // trim leading/trailing white space
        value = value.toLowerCase(); // convert string to lowercase
        value = value.replace(/[^a-z0-9 -]/g, '') // remove any non-alphanumeric characters
            .replace(/\s+/g, '_') // replace spaces with underscores
            .replace(/-+/g, '_'); // remove consecutive
        return value
    }
    //-- utils arguments --//
    const argsSolve = function argsSolve(...args) {
        const response = {
            comp: null,
            elem: null,
            obj: null,
            str: "",
            promise: null,  // array
            func: [],       // array
            args: [],       // array
        };
        each(args, (arg, i) => {
            if (isPromise(arg)) {
                response["promise"] = response["promise"] || [];
                response["promise"].push(arg);
                return;
            }
            if (isFunction(arg)) {
                response["func"] = response["func"] || [];
                response["func"].push(arg);
                return;
            }
            if (isHTMLElement(arg)) {
                response["elem"] = arg;
                return;
            }
            if (isVanilla(arg)) {
                response["comp"] = arg;
                return;
            }
            if (isObject(arg)) {
                if (!response["obj"]) {
                    response["obj"] = arg;
                } else {
                    eachProp(arg, (k, v) => {
                        response["obj"][k] = v;
                    });
                }
                return;
            }
            if (isArray(arg)) {
                response["args"].push(...arg);
                return;
            }
            if (isString(arg)) {
                if (i === 0) {
                    // event name
                    response["str"] = arg; // event name
                } else {
                    if (!response["elem"]) {
                        response["elem"] = arg; // id
                    } else {
                        response["str"] = arg;
                    }
                }
            }
        });
        return response;
    }
    const argsSolveMultiple = function argsSolveMultiple(...args) {
        const response = {
            promises: null,
            functions: null,
            elements: null,
            views: null,
            components: null,
            objects: null,
            arrays: null,
            numbers: null,
            strings_url: null,
            strings_vuid: null,
            strings_html: null,
            strings: null,
        };
        each(args, (arg, i) => {
            if (isPromise(arg)) {
                response["promises"] = response["promises"] || [];
                response["promises"].push(arg);
                return;
            }
            if (isFunction(arg)) {
                response["functions"] = response["functions"] || [];
                response["functions"].push(arg);
                return;
            }
            if (isHTMLElement(arg)) {
                response["elements"] = response["elements"] || [];
                response["elements"] = arg;
                return;
            }
            if (isView(arg)) {
                response["views"] = response["views"] || [];
                response["views"] = arg;
                return;
            }
            if (isVanilla(arg)) {
                response["components"] = response["components"] || [];
                response["components"] = arg;
                return;
            }
            if (isObject(arg)) {
                response["objects"] = response["objects"] || [];
                response["objects"] = arg;
                return;
            }

            if (isArray(arg)) {
                response["arrays"] = response["arrays"] || [];
                response["arrays"].push(arg);
                return;
            }
            if (isNumber(arg)) {
                response["numbers"] = response["numbers"] || [];
                response["numbers"].push(arg);
                return;
            }
            if (isUrl(arg)) {
                response["strings_url"] = response["strings_url"] || [];
                response["strings_url"].push(arg);
                return;
            }
            if (isVUID(arg)) {
                response["strings_vuid"] = response["strings_vuid"] || [];
                response["strings_vuid"].push(arg);
                return;
            }
            if (isHTML(arg)) {
                response["strings_html"] = response["strings_html"] || [];
                response["strings_html"].push(arg);
                return;
            }
            if (isString(arg)) {
                response["strings"] = response["strings"] || [];
                response["strings"].push(arg);
            }
        });
        return response;
    }
    //-- utils functions --//
    const setFunctionName = function setFunctionName(func, funcName) {
        if (isFunction(func)) {
            Object.defineProperty(func, 'name', {value: funcName, writable: false});
        }
        return funcName;
    }

    //-- types --//
    class Vanilla {
        constructor() {
            this._uid = vuid();
        }
    }

    //-- late actions --//
    class Futures {
        constructor() {
            this._late_actions = []; // binding to execute after component is consistent (has HTML)
        }

        push(thisArg, func, ...args) {
            if (!!func) {
                this._late_actions.push(func.bind(thisArg || this, ...args));
            }
        }

        doAll() {
            if (!!this._late_actions) {
                each(this._late_actions, (action) => {
                    try {
                        action();
                    } catch (err) {
                        console.error("", err);
                    }
                });
                this._late_actions = [];
            }
        }
    }

    class ZMessage {
        constructor(sender, type, target, data) {
            this._sender = sender || "";
            this._type = type || message_type_internal;
            this._target = target || "*";
            this._data = data || {};
        }

        get sender() {
            return this._sender;
        }

        set sender(sender) {
            this._sender = sender;
        }

        get type() {
            return this._type;
        }

        set type(value) {
            this._type = value;
        }

        get target() {
            return this._target;
        }

        set target(target) {
            this._target = target;
        }

        get data() {
            return this._data;
        }

        set data(data) {
            this._data = data;
        }

        isTarget(target) {
            return !!this._target || this._target === "*" ? true : this._target === target;
        }
    }

    // --------------------------
    //  VANILLA
    // --------------------------

    const vanilla = {};
    if (!context.module) {
        context.module = {
            exports: {}
        };
    }

    // --------------------------
    //  VANILLA - context
    // --------------------------

    (function initContext(instance) {

        //-- assign --//
        instance.version = v;
        instance.env = {
            name: name,
            version: v,
            isBrowser: isBrowser,
            isWorker: isWebWorker,
        };
    })(vanilla);

    // --------------------------
    //  VANILLA - dom
    // --------------------------

    (function initDOM(instance) {

        let _is_ready = false;

        /**
         * Invoke callback when DOM is completely loaded
         * @param callback
         * @param earlyInvoke boolean
         */
        function readyFn(callback, earlyInvoke) {
            if (isFunction(callback)) {

                function onReady() {
                    _is_ready = true;
                    invoke(instance, callback, instance);
                }

                if (!!_is_ready) {
                    invoke(instance, callback, instance);
                    return;
                }

                if (document.readyState === "complete") {
                    // Fully loaded!
                    _is_ready = true;
                    invoke(instance, callback, instance);
                } else if (document.readyState === "interactive") {
                    // DOM ready! Images, frames, and other subresources are still downloading.
                    if (!!earlyInvoke) {
                        _is_ready = true;
                        invoke(instance, callback, instance);
                    }
                } else {
                    // Loading still in progress.
                    // To wait for it to complete, add "DOMContentLoaded" or "load" listeners.
                    context.addEventListener("DOMContentLoaded", () => {
                        // DOM ready! Images, frames, and other sub resources are still downloading.
                        if (!!earlyInvoke) {
                            context.removeEventListener("load", onReady);
                            _is_ready = true;
                            invoke(instance, callback, instance);
                        }
                    });

                    context.addEventListener("load", onReady);
                }
            }
        }

        /**
         * Returns all script tags
         * @returns {HTMLCollectionOf<HTMLElementTagNameMap[string]>|*[]}
         */
        function scriptsFn() {
            return document.getElementsByTagName('script') || [];
        }


        function elem(arg) {
            if (isHTMLElement(arg)) {
                return arg;
            }
            if (isHTML(arg)) {
                return createFromHTML(arg);
            }
            const {elem, str, comp} = argsSolve(arg);
            return elem || get(!!comp ? comp.uid : str);
        }

        /**
         * Return an Html element by ID
         * @param id ID of the html element to return
         * @returns {HTMLElement}
         */
        function get(id) {
            try {
                const elem = isString(id) ? document.getElementById(id) : id;
                if (!!elem) {
                    return elem;
                } else {
                    console.error(`get() -> Element not found: "${id}"`);
                }
            } catch (err) {
                console.error(`get() -> Error retrieving "${id}":`, err);
            }
            return null;
        }

        function remove(id) {
            try {
                const elem = get(id);
                if (!!elem) {
                    elem.remove();
                    return elem;
                }
            } catch (err) {
                console.error(`removeElemById() -> removing element "${id}":`, err);
            }
            return null;
        }

        function removeElemChildrenByIdFn(id) {
            try {
                const elem = get(id);
                if (!!elem) {
                    elem.innerHTML = "";
                    return elem;
                }
            } catch (err) {
                console.error(`removeElemChildrenById() -> removing children from "${id}":`, err);
            }
            return null;
        }

        function createFromHTML(htmlString) {
            const div = document.createElement('div');
            div.innerHTML = htmlString.trim();

            // Change this to div.childNodes to support multiple top-level nodes.
            return div.firstElementChild;
        }

        /**
         * Replace innerHTML of an HTML element
         * @param id
         * @param html
         * @returns {HTMLElement}
         */
        function setElemInnerHTMLByIdFn(id, html) {
            try {
                const elem = get(id);
                if (!!elem) {
                    elem.innerHTML = html;
                    return elem;
                }
            } catch (err) {
                console.error(`setInnerHTMLById() -> inserting "${html}" into "${id}":`, err);
            }
            return null;
        }

        function appendElemChildByIdFn(id, html) {
            try {
                const elem = get(id);
                if (!!elem) {
                    // create and append new HTML
                    const div = document.createElement("div");
                    elem.append(div);
                    div.outerHTML = html;
                    return elem;
                }
            } catch (err) {
                console.error(`appendElemChildById() -> adding child into "${id}":`, err)
            }
            return null;
        }

        function classRemove(id, className) {
            try {
                const elem = get(id);
                if (!!elem) {
                    elem.classList.remove(className);
                }
            } catch (err) {
                console.error(`classRemove() -> adding child into "${id}":`, err)
            }
            return null;
        }

        function classAdd(id, className) {
            try {
                const elem = get(id);
                if (!!elem) {
                    elem.classList.add(className);
                }
            } catch (err) {
                console.error(`classAdd() -> adding class into "${id}":`, err)
            }
            return null;
        }

        function tagGetOne(name) {
            if (!!name) {
                const elems = document.getElementsByTagName(name);
                return !!elems && elems.length > 0 ? elems[0] : null;
            }
            return null;
        }

        function tagAddStyle(css, target) {
            try {
                target = isString(target) ? tagGetOne(target) : target;
                target = target || head();
                const tag = document.createElement('style');
                target.appendChild(tag);
                tag.appendChild(document.createTextNode(css));
            } catch (err) {
                console.error(`tagAddStyle() -> adding style tag into header:`, err)
            }
            return null;
        }

        function tagAddScript(text, target) {
            try {
                target = isString(target) ? tagGetOne(target) : target;
                target = target || head();
                const tag = document.createElement('script');
                target.appendChild(tag);
                tag.appendChild(document.createTextNode(text));
            } catch (err) {
                console.error(`tagAddScript() -> adding script tag into header:`, err)
            }
            return null;
        }

        function childOfById(parent, childId) {
            let response = null;
            const parentElem = elem(parent);
            if (!!parentElem) {
                each(parentElem, (elem) => {
                    if (childId === elem.getAttribute("id")) {
                        response = elem;
                        return true; // exit loop
                    }
                });
            } else {
                console.error("dom.childOfById()", new Error("Parent elem do not exist!"));
            }
            return response;
        }

        function each(id, callback) {
            const el = elem(id);
            if (!!el && isFunction(callback)) {
                if (invoke(instance, callback, el)) {
                    return;
                }
                for (const child of el.children) {
                    each(child, callback);
                }
            }
        }

        function head() {
            return document.head || tagGetOne('head');
        }

        function body() {
            return document.body || tagGetOne('body');
        }

        //-- assign --//
        instance.dom = {
            ready: readyFn,
            scripts: scriptsFn(),
            elem: elem,
            get: get,
            remove: remove,
            removeChild: removeElemChildrenByIdFn,
            setInner: setElemInnerHTMLByIdFn,
            appendInner: appendElemChildByIdFn,
            classRemove: classRemove,
            classAdd: classAdd,
            tagAddStyle: tagAddStyle,
            tagAddScript: tagAddScript,
            // children
            childOfById: childOfById,
            each: each,
            // special
            head: head,
            body: body,
        };
    })(vanilla);

    // --------------------------
    //  VANILLA - require
    // --------------------------

    (function initRequire(instance) {

        const _cache = {};
        const _cache_count = {};
        const _ext_fetch = {
            "md": "text",
            "js": "text",
            "txt": "text",
            "json": "json",
            "jpg": "blob",
            "png": "blob",
            "pdf": "bytes",
            "wav": "arrayBuffer",
        };
        const _ext_solve = {
            "js": "script",
        };

        const _config = {
            use_cache: true,
            limit: 700, // number of "require" of same url before to write a warning
        };

        function configFn(value) {
            eachProp(value, function (k, v) {
                _config[k] = v;
            });
            return _config;
        }

        function _fetchFn(fmt, rawUrls, callback) {
            if (!rawUrls) {
                invoke(null, callback, null, [new Error("Missing url parameter.")]);
                return;
            }

            const urls = isArray(rawUrls) ? rawUrls : [rawUrls];
            const promises = [];
            const data = [];
            const limit = configFn().limit;

            for (let url of urls) {
                url = urlHref(url); // new URL(url, document.baseURI).href;
                _cache_count[url] = hasProp(_cache_count, url) ? _cache_count[url] + 1 : 1;
                if (_cache_count[url] > limit) {
                    console.warn(`Component reached the limit of ${limit} requests: ${url}`);
                    _cache_count[url] = 0;
                }
                if (!!_cache[url] && configFn().use_cache) {
                    data.push(_cache[url]);
                } else {
                    promises.push(fetch(url, {method: "GET"}))
                }
            }

            if (data.length === urls.length) {
                // got all required data
                invoke(null, callback, data);
                return;
            }

            Promise.all(promises).then(async function (requests) {
                for (const request of requests) {
                    const status = await request.status;
                    const statusText = await request.statusText;
                    const url = await request.url;
                    const ext = url.split('.').pop();
                    const type = fmt || _ext_fetch[ext] || "text";
                    const item = {
                        url: url,
                        ext: ext,
                        type: type,
                    };
                    if (status !== 200) {
                        item["type"] = "error";
                        item["error"] = new Error(`Error ${status} "${statusText}": ${url}`)
                        data.push(item);
                    } else {
                        try {
                            if (type === "text") item[type] = await request.text();
                            if (type === "json") item[type] = await request.json();
                            if (type === "blob") item[type] = await request.blob();
                            if (type === "bytes") item[type] = await request.bytes();
                            if (type === "arrayBuffer") item[type] = await request.arrayBuffer();
                            data.push(item);
                            _cache[url] = item;
                        } catch (e) {
                            data.push({
                                url: url,
                                error: e
                            });
                        }
                    }
                }
                invoke(instance, callback, data);
            }).catch(function (errors) {
                data.push({
                    error: errors
                });
                invoke(instance, callback, data);
            });
        } // fetchFn

        function _solve(fetchResponses, callback) {
            const solved = [];
            const errors = [];
            for (const response of fetchResponses) {
                if (!!response.error) {
                    errors.push(response.error);
                } else {
                    const ext = response["ext"];
                    const type_fetch = response["type"]
                    const fmt = _ext_solve[ext] || type_fetch;
                    try {
                        const item = {
                            type: fmt
                        };
                        switch (fmt) {
                            case "blob":
                                // const objectURL = URL.createObjectURL(response["blob"]);
                                // myImage.src = objectURL;
                                item["value"] = response["blob"];
                                break;
                            case "bytes":
                                // const text = new TextDecoder().decode(response["bytes"]);
                                item["value"] = response["bytes"];
                                break;
                            case "arrayBuffer":
                                item["value"] = response["arrayBuffer"];
                                break;
                            case "json":
                                item["value"] = response["json"];
                                break;
                            case "script":
                                const text = response["text"];
                                const evaluated = eval(text);
                                if (!!evaluated) {
                                    item["value"] = evaluated;
                                } else {
                                    console.warn("_solve: Missing return or export statement!", response);
                                }
                                /**
                                 let count = 0;
                                 eachProp(evaluated, (k, v) => {
                                 console.log(count, k, "=", v);
                                 count++;
                                 })
                                 **/
                                break;
                            default:
                                item["value"] = response["text"];
                        }
                        solved.push(item);
                    } catch (e) {
                        errors.push(e);
                    }
                }
            }
            if (errors.length > 0) {
                invoke(instance, callback, solved, new AggregateError(errors, "Errors fetching data"));
            } else {
                invoke(instance, callback, solved, false);
            }
        }

        function require(rawUrls, callback, fmt) {
            return new Promise((resolve, reject) => {
                if (!!rawUrls) {
                    _fetchFn(fmt, rawUrls, function (responses) {
                        _solve(responses, function (solved, err) {
                            const exports = {};
                            let count = 0;
                            for (const item of solved) {
                                if (item["type"] === "script") {
                                    eachProp(item["value"], (k, v) => {
                                        exports[k] = v;
                                    });
                                } else {
                                    exports[count] = item["value"];
                                    count++;
                                }
                            }
                            if (!!err) {
                                if (!!callback) {
                                    invoke(instance, callback, exports, err);
                                }
                                reject(err);
                            } else {
                                if (!!callback) {
                                    invoke(instance, callback, exports, false);
                                }
                                resolve(exports);
                            }
                        });
                    });
                } else {
                    reject(new Error("Nothing to require, missing URLs"));
                }
            });

        } // require

        //-- assign --//
        instance.require = require;
        instance.require.config = configFn;
    })(vanilla);

    // --------------------------
    //  VANILLA - events
    // --------------------------

    (function initEvents(instance) {

        const _events = {};

        function _eventId(comp, target, name, handlerName) {
            let response = "";
            response = !!comp ? comp.uid : "";
            if (!!target) {
                if (!target.id) {
                    target.id = uuid();
                }
                response += !!response ? "|" + target.id : target.id;
            }
            response += !!response ? "|" + name : name;
            if (!!handlerName) {
                response += !!response ? "|" + handlerName : handlerName;
            }
            return response;
        }

        function _bind(comp, target, eventName, func, ...data) {
            const event = {};
            const callback = func.bind(instance, event);
            // name the callback
            const funcName = setFunctionName(callback, uuid());
            // Object.defineProperty(callback, 'name', {value: funcName, writable: false});
            // add properties to event's object
            event.id = _eventId(comp, target, eventName, funcName)
            event.name = eventName;
            event.sender = comp;
            event.target = target;
            event.handler = callback;
            event.handlerName = funcName;
            event.data = [...data];
            return event;
        }

        function _attach(comp, target, eventName, func, ...args) {
            const item = _bind(comp, target, eventName, func, ...args);
            if (!!item && !!item.id && !!item.handler && !_events[item.id]) {
                _events[item.id] = item;
                return item.handler;
            }
            return null;
        }

        function _detach(comp, target, uid) {
            let count = 0;
            eachProp(_events, (k, v) => {
                let remove = k === uid || v.handlerName === uid;
                if (!remove) {
                    if (!comp && !target) {
                        remove = !uid || v.name === uid || v.sender.uid === uid || v.target.id === uid;
                    } else if (!!target && !!v.target && v.target.id === target.id) {
                        remove = !uid || v.name === uid;
                    } else if (!!comp && !!v.sender && v.sender.uid === comp.uid) {
                        remove = !uid || v.name === uid;
                    }
                }

                if (remove) {
                    v.target.removeEventListener(v.name, v.handler, {capture: true})
                    delete _events[k];
                    count++;
                }
            });
            return count;
        }


        function on(comp, target, name, func, ...args) {
            if (!!target && !!name && !!func) {
                const el = instance.dom.get(target);
                if (!!el) {
                    const handler = _attach(comp, target, name, func, ...args)
                    if (!!handler) {
                        el.addEventListener(name, handler, {capture: true});
                    }

                }
            }
        }

        function off(comp, target, arg) {
            const uid = isString(arg) ? arg : isFunction(arg) ? arg.name : arg.id;
            // uid can be "event.id", "event.name", "function.name", "component.id"
            return invokeAsync(instance, _detach, comp, target, uid);
        }

        //-- assign --//
        instance.events = {
            on: on,
            off: off,
        };
    })(vanilla);

    // --------------------------
    //  VANILLA - helper classes
    // --------------------------

    (function initClasses(instance) {

        /**
         *  DataLoader
         *  Load data from url passed into constructor
         */
        class DataLoader extends Vanilla {
            constructor(v) {
                super();
                this._model = false; // empty fake model - no model loaded
                this._created = false;
                this.__require(v);
            }

            /**
             * Return the current model.
             * Use onDataReceived in subclasses to handle event when data is received
             * @returns {Promise<Object>}
             */
            async model() {
                return new Promise(async (resolve, reject) => {
                    if (!this._model) {
                        resolve(null);
                    } else {
                        if (isPromise(this._model)) {
                            const response = await this._model;
                            resolve(response);
                        } else {
                            resolve(this._model);
                        }
                    }
                });
            }

            set(v) {
                if (!!v) {
                    if (!this._model) {
                        this.__require(v);
                    } else {
                        // model already assigned
                        if (isObject(v)) {
                            this._model = v;
                        }
                    }
                }
            }

            __require(v) {
                const self = this;
                if (!!v) {
                    self.__invoke_before_create();
                    if (isUrl(v)) {
                        self._model = new Promise(async (resolve, reject) => {
                            vanilla.require(v, (exports, err) => {
                                if (!!err) {
                                    reject(err);
                                } else {
                                    const data = exports[0];
                                    if (!!data) {
                                        self._model = data;
                                        self._model = this.__invoke_data_received(data); // data can be transformed
                                        self.__invoke_after_create();
                                        resolve(self._model); // returns transformed data
                                    } else {
                                        reject(new Error("Data not found"));
                                    }
                                }
                            }).catch();
                        })
                        return;
                    }
                    if (isObject(v)) {
                        self._model = this.__invoke_data_received(v);
                        self.__invoke_after_create();
                        return
                    }

                    // v is not supported
                    throw new Error(`Data not supported: ${v}`);
                } else {
                    self.__invoke_after_create();
                }
            }

            __invoke_before_create() {
                invoke(this, this[on_before_create]);
            }

            __invoke_after_create() {
                if (!this._created) {
                    this._created = true;
                    invoke(this, this[on_after_create]);
                }
            }

            __invoke_data_received(data) {
                const response = invoke(this, this[on_data_received], data);
                if (isObject(response)) {
                    return response;
                }
                return data;
            }
        }


        //-- assign --//
        instance.classes = {
            DataLoader: DataLoader,
        };
    })(vanilla);

    // --------------------------
    //  VANILLA - components
    // --------------------------

    (function initComponents(instance) {

        //-- component --//

        class BaseComponent extends Vanilla {
            constructor(...args) {
                super();
                this._model = {};
                this._model["uid"] = this._uid;
                this._parent_elem = null; // parent node
                this._detached = true; // attached only to body
                this._visible = false;
                this._late_actions = new Futures(); // binding to execute after component is consistent (has HTML)
                this._elem = null; // dom ui
                this._elem_promise = null;
                this._consistence_promise_resolver = Promise.withResolvers();
                this._ready_promise_resolver = Promise.withResolvers();
                this._created = false;

                // initialize reading all arguments
                this.__init_component(...args);
            }

            //-- PROPERTIES --//

            get uid() {
                return this._uid;
            }

            get detached() {
                return this._detached; // attached only to body, but not visible
            }

            get visible() {
                return this._visible;
            }

            set visible(b) {
                if (!!b) {
                    this.show();
                } else {
                    this.hide();
                }
            }

            set html(value) {
                if (isHTML(value)) {
                    const fullHtml = instance.html.bodyContent(value); //instance.template.render(value, this._model);
                    const html = this._renderHtml(fullHtml);
                    const elem = instance.dom.elem(html);
                    if (!!elem) {
                        // instance.dom.body().insertAdjacentHTML("beforeend", html);
                        instance.dom.body().insertAdjacentElement("beforeend", elem);
                        this.setElem(elem);
                    }
                } else if (isUrl(value)) {
                    const url = value;
                    this._elem_promise = new Promise((resolve, reject) => {
                        instance.require(url, (exports, errors) => {
                            if (!!errors) {
                                reject(new Error((`Error creating page from "${url}": ${errors}`)));
                                // console.error(`Error creating BaseComponent loading html from: "${value}"`, errors);
                            } else {
                                const html = exports[0];
                                if (isString(html)) {
                                    this.html = html;
                                    resolve(this._elem);
                                } else {
                                    reject(new Error((`Error creating page from "${url}". Unexpected returned value: ${html}`)));
                                }
                            }
                        });
                    });
                } else {
                    // not supported yet!
                    console.warn(`Error creating BaseComponent loading html from: "${value}"`);
                }
            }

            setElem(elem) {
                if (!!elem) {
                    if (isHTMLElement(elem)) {
                        this.__init_elem(elem);
                    } else {
                        console.error(`BaseComponent.elem: Invalid element type: ${elem}`);
                    }
                }
            }

            async getElem() {
                return this._elem_promise;
            }

            //-- ready --//

            /**
             * Return instance of component when ready and consistent
             * @returns {Promise<BaseComponent>}
             */
            async ready() {
                return await this._ready_promise_resolver.promise;
            }

            //-- EVENTS --//

            on(...params) {
                const self = this;
                if (this.isConsistent()) {
                    const {promise, elem, str, func, args} = argsSolve(...params);
                    if (!!promise) {
                        Promise.all(promise).then((elems) => {
                            for (const el of elems) {
                                each(func, (fn) => {
                                    invoke(self, self.on, el, str, fn, ...args);
                                })
                            }
                        }).catch((err) => {
                            console.error("BaseComponent.on#promise", err);
                        });
                    } else {
                        const target = elem || this._elem;
                        const name = str || "click";
                        const fn = !!func && func.length > 0 ? func[0] : false;
                        if (!!fn) {
                            instance.events.on(this, target, name, fn, ...args);
                        }
                    }
                } else {
                    this._late_actions.push(this, this.on, ...params);
                }
            }

            off(...params) {
                const self = this;
                if (this.isConsistent()) {
                    const {promise, elem, obj, str, func} = argsSolve(...params);
                    if (!!promise) {
                        Promise.all(promise).then((elems) => {
                            for (const el of elems) {
                                each(func, (fn) => {
                                    invoke(self, self.off, el, str, fn);
                                })
                            }
                        }).catch((err) => {
                            console.error("BaseComponent.on#promise", err);
                        });
                    } else {
                        const arg = !!func && func.length > 0 ? func : obj || str;
                        instance.events.off(this, elem, arg);
                    }
                } else {
                    this._late_actions.push(this, this.off, ...params);
                }
            }

            //-- PUBLIC --//

            isConsistent() {
                return !!this._elem && !!this._parent_elem && !this._detached;
            }

            async childElem(id) {
                const vid = toVUID(this._uid, id) // isVUID(id) ? id : this._uid + "-" + id;
                const elem = await this.getElem()
                if (!!elem) {
                    return instance.dom.childOfById(elem, vid);
                }
                return null;
            }

            attach(v) {
                const self = this;
                if (!!v) {
                    try {
                        const {promise, elem, str, comp} = argsSolve(v);
                        // const vid = toVUID(this._uid, id) // isVUID(id) ? id : this._uid + "-" + id;
                        const parent = !!elem ? elem
                            : !!promise ? promise
                                : !!str ? instance.dom.get(toVUID(this._uid, v))
                                    : !!comp ? comp.getElem() : v;
                        if (isHTMLElement(parent)) {
                            // parent is valid HTMLElement
                            this._parent_elem = parent;
                            if (!!this._elem && !!this._parent_elem) {
                                this._parent_elem.append(this._elem);
                                this._detached = false;
                            } else {
                                // we have a parent node, but not yet html
                                this._late_actions.push(this, this.attach, v);
                            }
                        } else if (isPromise(parent)) {
                            // parent is a promise
                            parent.then((item) => {
                                invoke(self, self.attach, item);
                            }).catch((err) => {
                                console.error("BaseComponent.attach#promise: ", err);
                            });
                        } else {
                            // parent is not supported
                            console.warn("BaseComponent.attach() wrong parent type: ", parent);
                        }
                    } catch (err) {
                        console.error("BaseComponent.attach: ", err);
                    }
                }
                return this;
            }

            show(effectFn, ...options) {
                try {
                    if (this.isConsistent()) {
                        if (!this._visible && !!this._elem) {
                            this._elem.classList.remove("hidden");
                            this._visible = true;
                            if (!!effectFn) {
                                invoke(this._elem, effectFn, this._elem, ...options);
                            }
                            // onShow
                            invoke(this, this[on_show]);
                        }
                    } else {
                        this._late_actions.push(this, this.show, effectFn, ...options);
                    }
                } catch (err) {
                    console.error("BaseComponent.show: ", err);
                }
                return this;
            }

            hide(effectFn, ...options) {
                try {
                    if (this.isConsistent()) {
                        if (this._visible) {
                            this._elem.classList.add("hidden");
                            this._visible = false;
                            if (!!effectFn) {
                                invoke(this._elem, effectFn, this._elem, ...options);
                            }
                            // onHide
                            invoke(this, this[on_hide]);
                        }
                    } else {
                        this._late_actions.push(this, this.hide, effectFn, ...options);
                    }
                } catch (err) {
                    console.error("BaseComponent.hide: ", err);
                }
                return this;
            }

            fadeIn(arg1, arg2) {
                try {
                    if (this.isConsistent()) {
                        this.show(instance.effects.fadeIn, arg1, arg2);
                    } else {
                        this._late_actions.push(this, this.fadeIn, arg1, arg2);
                    }
                } catch (err) {
                    console.error("BaseComponent.fadeIn: ", err);
                }
                return this;
            }

            effect(effectFn, ...args) {
                try {
                    if (this.isConsistent()) {
                        this.show();
                        effectFn.bind(this._elem, ...args);
                    } else {
                        this._late_actions.push(this, this.effect, effectFn, ...args);
                    }
                } catch (err) {
                    console.error("BaseComponent.effect: ", err);
                }
                return this;
            }

            detach() {
                try {
                    this.off();
                    const elem = instance.dom.body();
                    elem.append(this._elem);
                    this._elem.classList.add("hidden");
                    this._detached = true;
                    this._visible = false;
                } catch (err) {
                    console.error("BaseComponent.detach: ", err);
                }
                return false;
            }

            remove() {
                try {
                    this.off();
                    this._elem.remove();
                    this._elem = null;
                    this._visible = false;
                    this._model = null;
                    return true;
                } catch (err) {
                    console.error("BaseComponent.remove: ", err);
                }
                return false;
            }

            //-- PRIVATE --//

            __init_component(...args) {
                // console.log("BaseComponent.__init_component()", ...args);
                // onBeforeCreate
                this.__invoke_before_create();

                const {obj, str, elem} = argsSolve(...args);
                if (!!obj) {
                    eachProp(obj, (k, v) => {
                        this._model[k] = v;
                    })
                    if (!this._model["uid"]) this._model["uid"] = this._uid;
                }
                if (!!str) {
                    this.html = str;
                } else if (!!elem) {
                    this._parent_elem = elem.parentNode;
                    if (!!this._parent_elem) {
                        this._detached = false;
                    }
                    elem.innerHTML = this._renderHtml(elem.innerHTML);
                    if (!!elem.getAttribute("id")) {
                        this._uid = elem.getAttribute("id");
                        if (!this._model["uid"]) {
                            this._model["uid"] = this._uid;
                        }
                    } else {
                        elem.setAttribute("id", this._uid);
                    }
                    // set element
                    this.setElem(elem);
                }
            }

            __init_elem(elem) {
                if (!!elem) {
                    try {
                        const id = this._uid;
                        // assign HTMLElement
                        this._elem = elem;
                        this._elem.classList.add("hidden");
                        // set id if missing
                        if (!this._elem.getAttribute("id")) {
                            this._elem.setAttribute("id", id);
                        }
                        // check all children components for appropriate id
                        instance.dom.each(elem, (el) => {
                            if (!!el) {
                                const cid = el.getAttribute("id");
                                if (!!cid && !isVUID(cid)) {
                                    const vuid = toVUID(id, cid)
                                    el.setAttribute("id", vuid);
                                }
                            }
                        });
                        // check if we should attach to a parent elem
                        if (!!this._parent_elem && this._detached) {
                            this._late_actions.doAll();
                        }

                        // onAfterCreate
                        this.__invoke_after_create();

                        // invoke initialized
                        this._consistence_promise_resolver.resolve(this);
                    } catch (err) {
                        this._consistence_promise_resolver.reject(err);
                    }
                }
            }

            _renderHtml(html) {
                const response = instance.template.render(html, this._model);
                if (!isHTML(response)) {
                    return `<div>${response}</div>`;
                }
                return response;
            }

            __invoke_before_create() {
                invoke(this, this[on_before_create]);
            }

            __invoke_after_create() {
                const self = this;
                if (!self._created) {
                    self._created = true;
                    const response = invoke(self, self[on_after_create]);
                    // resolve ready
                    if (isPromise(response)) {
                        response.catch((err) => {
                            self._ready_promise_resolver.reject(err);
                        }).then((item) => {
                            self._ready_promise_resolver.resolve(self);
                            self.__invoke_on_ready();
                        });
                    } else {
                        self._ready_promise_resolver.resolve(self);
                        self.__invoke_on_ready();
                    }
                }
            }

            __invoke_on_ready() {
                invoke(this, this[on_ready]);
            }

        } // Component class

        function componentize(...args) {
            const {comp, elem, str, obj} = argsSolve(...args);
            if (!!comp) {
                return comp;
            }
            const el = instance.dom.elem(elem || str)
            return new BaseComponent(el, obj);
        }

        //-- assign --//
        instance.BaseComponent = BaseComponent;
        instance.components = {
            BaseComponent: BaseComponent,
            componentize: componentize,
        };
    })(vanilla);

    // --------------------------
    //  VANILLA - app
    // --------------------------

    (function initApp(instance) {

        //-- Base View Class --//

        class BaseView extends instance.BaseComponent {
            constructor(...args) {
                super();
                this._name = "anonymous";
                this._slug = "anonymous";
                this._model = {};
                // optionals sub-views
                this._views = new ViewManager(this);

                this.__init_view(...args);
            }

            get slug() {
                return this._slug;
            }

            get name() {
                return this._name;
            }

            set name(value) {
                if (!!value) {
                    this._name = value;
                    this._slug = slugify(value);
                }
            }

            get model() {
                return this._model;
            }

            get views() {
                return this._views;
            }

            //-- view initialization --//

            init(html, model) {
                this.__init_view(html, model)
            }

            async ready() {
                await super.ready();
                await this._views.ready();
                return this;
            }

            attach(id) {
                if (!!id) {
                    const vid = toVUID(this._uid, id); //isVUID(id) ? id : this._uid + "-" + id;
                    return super.attach(vid);
                }
            }

            //-- view visible --//

            show(effectFn, ...options) {
                super.show(effectFn, ...options);
            }

            hide(effectFn, ...options) {
                super.hide(effectFn, ...options);
            }

            //-- view dom --//

            async childElem(id) {
                const vid = toVUID(this._uid, id);
                return super.childElem(vid);

            }

            //-- PRIVATE --//

            __init_view(...args) {
                const {obj, str} = argsSolve(...args);
                if (!!obj) {
                    eachProp(obj, (k, v) => {
                        this._model[k] = v;
                    })
                    if (!this._model["uid"]) this._model["uid"] = this._uid;
                }
                if (!!str) {
                    super.html = str;
                }
            }
        } // BaseView

        //-- ASYNC PAGE LAUNCHER --//

        class ViewLoader {
            constructor(name, url, model, parent) {
                this._parentComponent = parent;
                this._name = name;
                this._slug = slugify(name);
                this._url = url;
                this._model = model || {};
                this._view_resolver = Promise.withResolvers(); // promise

                // bootstrap
                this._init_loader();
            }

            get name() {
                return this._name;
            }

            get slug() {
                return this._slug;
            }

            /**
             *
             * @returns {Promise<BaseView>}
             */
            get view() {
                return this._view_resolver.promise;
            }

            _init_loader() {
                const url = this._url;
                const model = this._model;
                const name = this._name;
                instance.require(url, (exports, err) => {
                    if (!!err) {
                        this._view_resolver.reject(new Error((`Error creating page from "${url}": ${err}`)));
                        // console.error(`Error creating page from "${url}": `, errors);
                    } else {
                        eachProp(exports, async (k, ctr) => {
                            // create page with constructor
                            const page = new ctr(model);
                            page.name = name;
                            page.attach(instance.dom.body());
                            if (!!this._parentComponent) {
                                const parent = await this._parentComponent.getElem();
                                page.attach(parent);
                            }
                            this._view_resolver.resolve(page);
                        });
                    }
                });
            }
        }

        //-- ViewManager --//

        class ViewManager {
            constructor(parent) {
                this._parentComponent = parent; // parent component
                this._view_promises = [];
                this._curr_view_fn = null;
                this._last_view_fn = null;
                this._curr_view = null;
                this._last_view = null;
            }

            push(...items) {
                for (const item of items) {
                    const name = item["name"];
                    const url = item["url"];
                    const data = item["data"] || {};
                    if (!!name && !!url) {
                        const pp = new ViewLoader(name, url, data, this._parentComponent)
                        this._view_promises.push(pp);
                    }
                }
                return this._view_promises.length;
            }

            /**
             * Prepare views and return a Promise of BaseView array.
             * @param items Vies to add to container
             * @returns {Promise<BaseView[]>}
             */
            prepare(...items) {
                this.push(...items);
                return this.__waitAll();
            }

            /**
             * Wait ViewManager is Ready
             * @returns {Promise<ViewManager>}
             */
            async ready() {
                // console.log("ViewManager.ready()");
                await this.__waitAll();
                return this;
            }

            /**
             * Return a page by instance, name, slug or id
             * @param v {int|string} index or name or slug or id
             * @returns {BaseView}
             */
            async get(v) {
                if (isView(v)) {
                    return v;
                }
                const ppromise = v instanceof ViewLoader ? v : null;
                if (!!ppromise) {
                    return ppromise.view;
                }
                if (this._view_promises.length > 0) {
                    let count = 0;
                    for (const pp of this._view_promises) {
                        const page = await pp.view;
                        if (!page) continue;
                        if (isString(v)) {
                            if (page.uid === v || page.name === v || page.slug === v) {
                                return page;
                            }
                        } else if (isNumber(v)) {
                            if (count === v) {
                                return page;
                            }
                        }
                        count++;
                    }
                }
                return null; // not found
            } // get

            /**
             * Navigate to a page.
             * @param v {int|string} index or name or slug or id
             * @param effectFn {Function} Optional effect function
             * @param options {any} Options effect params
             * @returns {Promise<BaseView>}
             */
            async goto(v, effectFn, ...options) {
                if (!!v) {
                    const page = await this.get(v);
                    return await this.__activateView(page, effectFn, ...options);
                }
            }

            /**
             * Navigate the first page into page's list.
             * @returns {Promise<BaseView>}
             */
            async home() {
                const page = await this.get(0);
                return await this.__activateView(page, vanilla.effects.fadeIn);
            }

            /**
             * Navigate to the previous page if any
             * @returns {BaseView|null}
             */
            back() {
                return !!this._last_view_fn ? this._last_view_fn() : null;
            }

            //-- PRIVATE --//

            /**
             * Return all page instances
             * @returns {Promise<BaseView[]>}
             * @private
             */
            async __waitAll() {
                const views = [];
                for (const pp of this._view_promises) {
                    const p = await pp.view;
                    await p.ready();
                    views.push(p);
                }
                return views;
            }

            async __activateView(view, effectFn, ...options) {
                if (isView(view)) {
                    // hide all
                    for (const pp of this._view_promises) {
                        const p = await pp.view;
                        p.hide();
                    }
                    // show the page
                    if (!!effectFn) {
                        view.show(effectFn, ...options);
                    } else {
                        view.show();
                    }
                    this._last_view = this._curr_view;
                    this._curr_view = view;
                    this._last_view_fn = this._curr_view_fn;
                    this._curr_view_fn = this.__activateView.bind(this, view, effectFn, ...options);
                }
                return view;
            }

        } // View Manager

        class PageManager extends ViewManager {
            constructor() {
                super();

                // subscribe app messages
                messages.subscribe(channel_zilla, this.__onInternalMessage.bind(this));
            }

            async ready() {
                // console.log("PageManager.ready()");
                return super.ready();
            }

            /**
             * Navigate to a page.
             * @param v {int|string} index or name or slug or id
             * @param effectFn {Function} Optional effect function
             * @param options {any} Options effect params
             * @returns {Promise<BaseView>}
             */
            async goto(v, effectFn, ...options) {
                if (!!v) {
                    const page = await super.get(v);
                    const response = await super.__activateView(page, effectFn, ...options);
                    this.__notify(page);
                    return response;
                }
            }

            /**
             * Navigate the first page into page's list.
             * @returns {Promise<BaseView>}
             */
            async home() {
                const page = await super.get(0);
                const response = await super.__activateView(page, vanilla.effects.fadeIn);
                this.__notify(page);
                return response;
            }

            /**
             * Navigate to the previous page if any
             * @returns {BaseView|null}
             */
            back() {
                if (!!this._last_view_fn) {
                    const page = this._last_view_fn();
                    this.__notify(page);
                    return page;
                }
                return null;
            }

            __notify(page) {
                // notify app internally
                const pageName = page.slug;
                messages.publish(channel_zilla,
                    new ZMessage(
                        message_target_pages, message_type_internal, message_target_routing, {name: pageName}
                    )
                );
            }

            __onInternalMessage(subscription, message) {
                if (!!subscription && subscription.channel === channel_zilla && !!message && message instanceof ZMessage && message.isTarget(message_target_pages)) {
                    if (!!message.data) {
                        const sender = message.sender;
                        if (sender === message_target_routing) {
                            const hash = message.data.hash;
                            const pageName = hash.name || "";
                            if (!!pageName) {
                                // do not notify
                                super.goto(pageName, null).catch((err) => {
                                    console.error(`__onInternalMessage() Navigating to page "${pageName}"`, err);
                                });
                            } else {
                                // notify home
                                this.home().catch((err) => {
                                    console.error(`__onInternalMessage() Navigating to Home page`, err);
                                });
                            }
                        }
                    }
                }
            }
        } // Page Manager

        //-- Queue/Event Manager --//

        class QueueListener extends Vanilla {
            constructor() {
                super();
                this._channelName = "*"; // alla channels
                this._subscription = null;
                this._func = null; // binding callback
                this._args = [];
            }

            get channel() {
                return this._channelName;
            }

            set channel(v) {
                this._channelName = v || "*";
            }

            get subscription() {
                return this._subscription;
            }

            set subscription(v) {
                this._subscription = v;
            }

            get func() {
                return this._func;
            }

            bind(fn, ...bindable) {
                if (isFunction(fn)) {
                    this._func = fn;
                    this._args.push(...bindable);
                }
            }
        }

        class QueueSubscription {
            constructor(...args) {
                this._id = "";
                this._channel = "";
                if (!!args && args.length > 0) {
                    this._channel = args[0];
                    this._id = args[1] || "";
                    if (isFunction(this._id)) {
                        this._id = this._id.name || "";
                    }
                }
            }

            get id() {
                return this._id || "*";
            }

            set id(v) {
                this._id = v;
            }

            get channel() {
                return this._channel || "*";
            }

            set channel(v) {
                this._channel = v;
            }
        }

        class QueueManager {
            constructor() {
                this._listeners = [];
            }

            publish(channelName, data) {
                invokeAsync(this, (channelName, data) => {
                    channelName = channelName || "*";
                    for (const listener of this._listeners) {
                        const subscription = listener.subscription;
                        if (subscription.channel === "*" || subscription.channel === channelName || channelName === "*") {
                            const sender = new QueueSubscription(channelName, subscription.id);
                            invokeAsync(this, listener.func, sender, data, ...listener._args);
                        }
                    }
                }, channelName, data);
            }

            subscribe(channelName, func, ...bindable) {
                channelName = channelName || "*";
                const subscription = new QueueSubscription();
                if (isFunction(func)) {
                    subscription.id = setFunctionName(func, uuid());
                    subscription.channel = channelName;
                    const listener = new QueueListener();
                    listener.subscription = subscription;
                    listener.channel = channelName;
                    listener.bind(func, ...bindable);
                    this._listeners.push(listener);
                }
                return subscription;
            }

            unsubscribe(...args) {
                const unsubscribed = [];
                if (!!args && args.length > 0) {
                    const subscription = args[0] instanceof QueueSubscription ? args[0] : new QueueSubscription(...args);
                    // clone listeners and empty original
                    const listeners = [...this._listeners];
                    this._listeners = [];
                    // insert only listeners not removed
                    for (const listener of listeners) {
                        const sub = !!listener ? listener.subscription : null;
                        if (!!sub) {
                            const matchFunction = sub.id === subscription.id || subscription.id === "*";
                            const matchChannel = sub.channel === subscription.channel || subscription.channel === "*";
                            const match = matchChannel && matchFunction;
                            if (!match) {
                                this._listeners.push(listener);
                            } else {
                                unsubscribed.push(sub);
                            }
                        }
                    }
                }
                return unsubscribed;
            }

            clear() {
                this._listeners = [];
            }

        } // QueueManager

        //-- App --//

        class App extends Vanilla {
            constructor() {
                super();
                this._pages = pages;
                this._messages = messages;
            }

            get pages() {
                return this._pages;
            }

            get messages() {
                return this._messages;
            }

            async ready() {
                await this._pages.ready();
                return this;
            }

        }

        const messages = new QueueManager();
        const pages = new PageManager();

        //-- assign --//
        instance.BaseView = BaseView;
        instance.app = new App();

    })(vanilla);

    // --------------------------
    //  VANILLA - router
    // --------------------------

    (function initRouter(instance) {
        const history = context.history;
        const addEventListener = context.addEventListener;

        class Router {
            constructor() {
                this._available = true;
                this._enabled = true;
                this._curr_hash = {hash: "#", name: "", query: ""};

                if (!history) {
                    this._available = false;
                    this._enabled = false;
                    console.warn(`${name}: Cannot enable routing in this environment because is not supported!`)
                } else {
                    // listen to browser changes
                    addEventListener("popstate", this.__onpopstate.bind(this));
                    // subscribe app messages
                    instance.app.messages.subscribe(channel_zilla, this.__onInternalMessage.bind(this));
                    // dom ready event
                    instance.dom.ready(this.__onDomReady.bind(this));
                    // ok, ready
                    console.info(`${name}: Routing enabled!`);
                }
            }

            //-- PROPERTIES --//

            get enabled() {
                return this._enabled && this._available;
            }

            set enabled(enabled) {
                if (this._available) {
                    this._enabled = enabled;
                } else if (enabled) {
                    console.warn(`${name} Cannot enable routing in this environment because is not supported!`)
                }
            }

            //-- PUBLIC --//

            push(pageName) {
                if (this.enabled && !!context.location) {
                    const url = new URL(context.location);
                    const hash = this.__parseHash(url.hash);
                    url.hash = "#" + pageName + (!!hash.query ? "?" + hash.query : "");
                    history.pushState({}, "", url);
                }
            }

            replace(pageName) {
                if (this.enabled && !!context.location) {
                    const url = new URL(context.location);
                    const hash = this.__parseHash(url.hash);
                    url.hash = "#" + pageName + (!!hash.query ? "?" + hash.query : "");
                    history.replaceState({}, "", url);
                }
            }

            //-- PRIVATE --//

            __onDomReady() {
                const url = new URL(context.location);
                this._curr_hash = this.__parseHash(url.hash);
                this.__notify();
            }

            __onpopstate(e) {
                const hash = this.__parseHash(e.target.location.hash);
                const changed = !!hash && hash.name !== this._curr_hash.name;
                this._curr_hash = hash;
                if (changed) {
                    this.__notify();
                }
            }

            __parseHash(rawHash) {
                const response = {
                    hash: rawHash,
                    name: "",
                    query: "",
                }
                const tokens = rawHash.substring(1).toLowerCase().split("?") || [];
                if (tokens.length > 0) {
                    response.name = tokens[0];
                    if (tokens.length === 2) {
                        response.query = tokens[1];
                    }
                }
                return response;
            }

            __notify() {
                const hash = this._curr_hash;
                // notify app internally
                instance.app.messages.publish(channel_zilla,
                    new ZMessage(
                        message_target_routing, message_type_internal, message_target_pages, {hash: hash}
                    )
                );
            }

            __onInternalMessage(subscription, message) {
                if (!!subscription && subscription.channel === channel_zilla && !!message && message instanceof ZMessage && message.isTarget(message_target_routing)) {
                    if (!!message.data) {
                        const sender = message.sender;
                        if (sender === message_target_pages) {
                            const pageName = message.data.name;
                            this.push(pageName);
                        }
                    }
                }
            }
        } // Router

        //-- assign --//
        instance.routing = new Router();

    })(vanilla);

    // --------------------------
    //  VANILLA - template
    // --------------------------

    (function initTemplate(instance) {

        const _prefix = "<%";
        const _suffix = "%>";

        function render(template, model) {
            // init context
            const prefix = instance.template.TPL_PREFIX;
            const suffix = instance.template.TPL_SUFFIX;
            const prefix2 = instance.html.encode(prefix);
            const suffix2 = instance.html.encode(suffix);

            // render the model into template
            let str_html = template;
            for (const k in model) {
                if (model.hasOwnProperty(k)) {
                    const v = model[k];
                    str_html = str_html.replaceAll(`${prefix + k + suffix}`, v);
                    str_html = str_html.replaceAll(`${prefix2 + k + suffix2}`, v);
                }
            }
            return str_html;
        }

        //-- assigning --//
        instance.template = {
            TPL_PREFIX: _prefix,
            TPL_SUFFIX: _suffix,
            render: render,
        };

    })(vanilla);

    // --------------------------
    //  VANILLA - effects
    // --------------------------

    (function initEffects(instance) {

        const _duration = 1000;
        const _styles = `      
            @keyframes vanilla-fadeIn {
                0% { opacity: 0; }
                100% { opacity: 1; }
            }
            @keyframes vanilla-bounce { 
                0%, 20%, 50%, 80%, 100% {transform: translateY(0); opacity:1;} 
                40% {transform: translateY(-30px);} 
                60% {transform: translateY(-15px);} 
            }

        `;

        let _initialized = false;

        function _init() {
            if (_initialized) return;
            _initialized = true;
            // add styles to dom
            instance.dom.tagAddStyle(_styles);
        }

        function fadeIn(elemOrId, arg1, arg2) {
            if (!!elemOrId) {
                _init();
                const el = instance.dom.elem(elemOrId);
                if (!!el) {
                    let callback, duration;
                    if (isFunction(arg1)) {
                        callback = arg1;
                    } else if (isNumber(arg1)) {
                        duration = arg1;
                    }
                    if (isFunction(arg2)) {
                        callback = arg2;
                    } else if (isNumber(arg2)) {
                        duration = arg2;
                    }
                    duration = duration || _duration;

                    el.style.animation = "vanilla-fadeIn ease " + duration + "ms";
                    el.style.animationFillMode = "forwards";
                    el.style.animationIterationCount = "1";

                    const intervalID = setInterval(function () {
                        clearInterval(intervalID);
                        invoke(instance, callback);
                    }, duration);
                }
            }
        }

        function bounce(elemOrId, arg1, arg2) {
            if (!!elemOrId) {
                _init();
                const el = instance.dom.elem(elemOrId);
                if (!!el) {
                    let callback, duration;
                    if (isFunction(arg1)) {
                        callback = arg1;
                    } else if (isNumber(arg1)) {
                        duration = arg1;
                    }
                    if (isFunction(arg2)) {
                        callback = arg2;
                    } else if (isNumber(arg2)) {
                        duration = arg2;
                    }
                    duration = duration || _duration;

                    el.style.animationName = "vanilla-bounce";
                    el.style.animationDuration = duration + "ms";
                    el.style.animationFillMode = "both";
                    el.style.animationIterationCount = "1";

                    const intervalID = setInterval(function () {
                        clearInterval(intervalID);
                        el.style.animationName = "";
                        invoke(instance, callback);
                    }, duration);
                }
            }
        }

        function show(elemOrId, arg1, arg2) {
            if (!!elemOrId) {
                _init();
                const elem = instance.dom.elem(elemOrId);
                if (!!elem) {
                    elem.style.opacity = "0";
                    instance.dom.classRemove(elem, "hidden");
                    fadeIn(elemOrId, arg1, arg2);
                }
            }
        }

        //-- assign --//
        instance.effects = {
            fadeIn: fadeIn,
            bounce: bounce,
            // special
            show: show,
        }
    })(vanilla);

    // --------------------------
    //  VANILLA - strings
    // --------------------------

    (function initStrings(instance) {

        function replaceAll(text, search_for, replace_text) {
            if (text && (typeof (text) === "string")) {
                const regexp = new RegExp(search_for, 'g');
                return text.replace(regexp, replace_text);
            }
            return '';
        }

        function hasText(text) {
            return text ? text.toString().trim().length > 0 : false;
        }

        function startsWith(/* text to check */ text, /* start string */str) {
            return (text.indexOf(str) === 0);
        }

        function endsWith(/* text to check */text, /* end string */str) {
            return (text.lastIndexOf(str || '') === text.length - (str ? str.length : 1));
        }

        function textBetween(text, prefix, suffix) {
            if (isString(text) && isString(prefix) && isString(suffix) && !!prefix && !!suffix) {
                const startIndex = text.indexOf(prefix) + prefix.length;
                const endIndex = text.lastIndexOf(suffix) - 1;
                return startIndex > -1 && endIndex > -1 ? text.substring(startIndex, endIndex).trim() : text.trim();
            }
            return text;
        }

        //-- assign --//
        instance.strings = {
            replaceAll: replaceAll,
            hasText: hasText,
            startsWith: startsWith,
            endsWith: endsWith,
            textBetween: textBetween,
        }
    })(vanilla);

    // --------------------------
    //  VANILLA - html
    // --------------------------

    (function initHTML(instance) {

        function decode(input) {
            const doc = new DOMParser().parseFromString(input, "text/html");
            return doc.documentElement.textContent || "";
        }

        function encode(input) {
            const textArea = document.createElement("textarea");
            textArea.innerText = input;
            return textArea.innerHTML.split("<br>").join("\n") || "";
        }

        function bodyContent(textHtml) {
            const content = instance.strings.textBetween(textHtml, "<body>", "</body>");
            return content || textHtml;
        }

        //-- assign --//
        instance.html = {
            decode: decode,
            encode: encode,
            bodyContent: bodyContent,
        };

    })(vanilla);

    // --------------------------
    //  VANILLA - utils
    // --------------------------

    (function initUtils(instance) {

        instance.utils = {
            bind: bind,
            invoke: invoke,
            invokeAsync: invokeAsync,
            isFunction: isFunction,
            isArray: isArray,
            isObject: isObject,
            isString: isString,
            isNumber: isNumber,
            isHTMLElement: isHTMLElement,
            isUrl: isUrl,
            isView: isView,
            isVUID: isVUID,
            toVUID: toVUID,
            each: each,
            eachReverse: eachReverse,
            eachProp: eachProp,
            get: getDeep,
            uuid: uuid,
            argsSolve: argsSolve,
            argsSolveMultiple: argsSolveMultiple,
        }

    })(vanilla);

    // --------------------------
    //  VANILLA - init
    // --------------------------

    (function init(instance) {

        const _styles = `.hidden {visibility: hidden; display:none;}`;
        // add styles to dom
        instance.dom.tagAddStyle(_styles);

    })(vanilla);

    // --------------------------
    //  vanilla shortcuts
    // --------------------------

    vanilla.ready = vanilla.dom.ready;

    // --------------------------
    //  vanilla loaded
    // --------------------------

    console.info(`${name} v${vanilla.version}`);

    // --------------------------
    //  exports
    // --------------------------

    context.vanilla = vanilla;
    return context.vanilla;

})();