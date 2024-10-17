/**
 *  VANILLA ZILLA
 *  ----------------
 *  Copyright: Gian Angelo Geminiani
 *  Repo: https://github.com/angelogeminiani/vanilla-zilla
 *  License: MIT
 *  Version: 0.0.36
 */
!(() => {

    const vname = "🦖 Vanilla-Zilla";
    const v = `0.0.36`;
    const vPrefix = "v-"
    const vPrefixReplaceable = "v*"
    const vconsole = console;
    const context = (typeof window !== 'undefined') ? window : false;
    const document = !!context ? context.document : false;
    const navigator = !!context ? context.navigator : false;
    // validate environment
    if (!document) {
        console.error("Invalid environment!");
        return
    }
    // const
    const attr_vuid = "data-vuid";
    const channel_zilla = "__zilla"; // internal channel for app communication
    const message_type_internal = "internal";
    const message_target_pages = "pages";
    const message_target_routing = "routing";
    //-- lifecycle events --//
    const on_before_create = "onBeforeCreate";
    const on_after_create = "onAfterCreate";
    const on_attach = "onAttach";
    const on_detach = "onDetach";
    const on_dispose = "onDispose";
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
    const isUndefined = function isUndefined(v) {
        return v === undefined;
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
    const isCallable = function isCallable(item) {
        return isFunction(item) || isAsyncFunction(item);
    };
    const isString = function isString(v) {
        return (typeof (v) === "string");
    };
    const isDate = function isDate(v) {
        return ostring.call(v) === '[object Date]';
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
    const isHTMLElementBody = function isBody(v) {
        return isHTMLElement(v) && v.tagName.toLowerCase() === "body";
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
    const isError = function isError(v) {
        return !!v && v instanceof Error;
    }
    const sizeOf = function sizeOf(v) {
        if (isArray(v)) {
            return v.length;
        }
        let response = 0;
        eachProp(v, function (k, v) {
            response++;
        })
        return response;
    }
    const pathGetExt = function pathGetExt(url, defaultValue) {
        defaultValue = defaultValue || "";
        if (isString(url) && url.length > 3) {
            const idx = url.lastIndexOf(".");
            if (idx > 0) {
                let rawExt = url.substring(idx + 1) || defaultValue;
                if (!!rawExt) {
                    if (!!rawExt && rawExt.indexOf("?") > -1) {
                        rawExt = rawExt.substring(0, rawExt.indexOf("?"));
                    }
                    if (!!rawExt && rawExt.length < 5) {
                        return rawExt;
                    }
                }
            }
        }
        return defaultValue;
    }
    const pathGetName = function pathGetName(url, stripExt) {
        if (isString(url) && url.length > 3) {
            const idx = url.lastIndexOf("/");
            if (idx > 0) {
                const fullName = url.substring(idx + 1);
                if (!!stripExt) {
                    const ext = pathGetExt(fullName);
                    if (!!ext) {
                        return fullName.replace("." + ext, "");
                    }
                }
                return fullName;
            }
        }
        return "";
    }
    const isReplaceableId = function isReplaceableId(text) {
        return !!text && isString(text) && text.startsWith(vPrefixReplaceable);
    }
    const isVUID = function isVUID(text) {
        return !!text && isString(text) && text.startsWith(vPrefix);
    }
    const toVUID = function toVUID(uid, v) {
        if (isString(v)) {
            if (isReplaceableId(v)) {
                v = v.replaceAll(vPrefixReplaceable, "");
            }
            return isVUID(v) ? v : uid + "|" + v;
        }
        return v;
    }
    const parseVUID = function parseVUID(vuid) {
        const response = {id: "", name: "", "raw": vuid};
        const tokens = vuid.split("|");
        response.id = tokens[0];
        response.name = tokens[1] || "";
        return response;
    }
    const urlWithExt = function urlWithExt(rawURL, ext) {
        let response = rawURL;
        if (!pathGetExt(response)) {
            // add ui name and extension
            const name = pathGetName(response, true);
            if (!!name) {
                response = `${response}/${name}.${ext}`;
            }
        }
        return response;
    }
    const urlUI = function urlUI(rawURL) {
        return urlWithExt(rawURL, "html");
    }
    const urlJS = function urlJS(rawURL) {
        return urlWithExt(rawURL, "js");
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
    const matchHTMLElement = function matchHTMLElement(elem, id) {
        if (isHTMLElement(elem)) {
            return elem.getAttribute("id") === id || elem.getAttribute(attr_vuid) === id;
        }
        return false;
    }
    const htmlEncode = function htmlEncode(input) {
        const textArea = document.createElement("textarea");
        textArea.innerText = input;
        return textArea.innerHTML.split("<br>").join("\n") || "";
    }
    const htmlDecode = function htmlDecode(input) {
        const doc = new DOMParser().parseFromString(input, "text/html");
        return doc.documentElement.textContent || "";
    }
    const renderTpl = function renderTpl(template, model, _prefix, _suffix, transformerFn) {
        // init context
        const prefix = _prefix || "<%";
        const suffix = _suffix || "%>";
        const prefix2 = htmlEncode(prefix);
        const suffix2 = htmlEncode(suffix);

        // render the model into template
        let str_html = template;
        for (const k in model) {
            if (model.hasOwnProperty(k)) {
                let v = model[k];
                // check external data transformer
                if (isFunction(transformerFn)) {
                    const vv = transformerFn(v);
                    if (!!vv) {
                        v = vv;
                    }
                }
                // replace
                str_html = str_html.replaceAll(`${prefix + k + suffix}`, v);
                str_html = str_html.replaceAll(`${prefix2 + k + suffix2}`, v);
            }
        }
        return str_html;
    }
    const timestamp = function timestamp() {
        return new Date().getTime();
    }
    const timestampUnix = function timestampUnix() {
        return timestamp() / 1000;
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
    //-- utils arrays --//
    const sortAsc = function sortAsc(arr, attrName) {
        if (isArray(arr)) {
            if (isString(attrName)) {
                arr.sort((a, b) => {
                    return a[attrName] - b[attrName];
                });
            } else {
                arr.sort((a, b) => {
                    return a - b;
                });
            }
        }
    }
    const sortDesc = function sortDesc(arr, attrName) {
        if (isArray(arr)) {
            if (isString(attrName)) {
                arr.sort((a, b) => {
                    return b[attrName] - a[attrName];
                });
            } else {
                arr.sort((a, b) => {
                    return b - a;
                });
            }
        }
    }
    const map = function map(arr, func) {
        const response = [];
        if (isArray(arr) && isFunction(func)) {
            let count = 0;
            for (const item of arr) {
                const resp = func(item, count, arr);
                if (resp === false) {
                    break; // exit
                }
                if (resp === true) {
                    response.push(item); // add item of the array
                } else if (!!resp) {
                    response.push(resp); // add response
                }
                count++;
            }
        }
        return response;
    }
    //-- async --//
    const sleep = function sleep(time) {
        return new Promise(resolve => setTimeout(resolve, time));
    }

    //-- types --//
    class Vanilla {
        constructor() {
            this._uid = vuid();
            this._name = ""
            this._slug = ""
        }

        get uid() {
            return this._uid;
        }

        set uid(v) {
            this._uid = v;
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

        get slug() {
            return this._slug;
        }

        dispose() {
            this._uid = null;
        }
    }

    //-- late actions --//
    class Futures {
        constructor() {
            this._late_actions = []; // binding to execute after component is consistent (has HTML)
        }

        get length() {
            return this._late_actions.length;
        }

        push(thisArg, func, ...args) {
            const item = {thisArg: thisArg || this, action: false, callback: false};
            if (isCallable(func)) {
                item.action = func.bind(thisArg || this, ...args);
                this._late_actions.push(item);
            }
            return item;
        }

        doAll() {
            if (!!this._late_actions) {
                each(this._late_actions, (item) => {
                    try {
                        if (isCallable(item.action)) {
                            const response = item.action();
                            if (isCallable(item.callback)) {
                                if (isPromise(response)) {
                                    response.then((response) => {
                                        invoke(item.thisArg, item.callback, response);
                                    }).catch((err) => {
                                        invoke(item.thisArg, item.callback, err);
                                    })
                                } else {
                                    invoke(item.thisArg, item.callback, response);
                                }
                            }
                        }
                    } catch (err) {
                        console.error("Future.doAll()", err);
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
    //  VANILLA - companion - Luxon
    //  https://moment.github.io/luxon/
    // --------------------------

    const getLuxon = function getLuxon() {
        try {
            if (typeof luxon !== 'undefined') {
                return luxon;
            } else {
                console.warn(`${vname} v${v}: 'luxon' date and time library disabled.\nSee at: https://moment.github.io/luxon/#/install`);
            }
        } catch (e) {
        }
        return false;
    }

    // --------------------------
    //  VANILLA - companion - ShowDownJs
    //  https://showdownjs.com/
    // --------------------------

    const getShowDown = function getShowDown(options) {
        if (!!showdown) {
            options = options || {noHeaderId: true, tables: true, simpleLineBreaks: true};
            return new showdown.Converter(options);
        } else {
            console.warn(`${vname} v${v}: 'showdown' markdown converter library disabled.\nSee at: https://showdownjs.com/`);
        }
        return false;
    }
    const mdToHTML = function mdToHTML(md, options) {
        if (isString(md)) {
            const converter = getShowDown(options);
            if (!!converter) {
                return converter.makeHtml(md);
            }
        }
        return md;
    }

    // --------------------------
    //  VANILLA
    // --------------------------

    const vanilla = {};

    // --------------------------
    //  VANILLA - globals
    // --------------------------

    // localization
    const i18n = {};

    (function initGlobals(instance) {

        const i18nDefaultLang = "en-US";
        const i18nDefaultDateStyle = "medium"; // "full", "long", "medium", and "short"
        const i18nDefaultTimeStyle = "medium";

        // template labels
        const lblFrom = "tpl_from"; // "from <%from%>"
        const lblFromTo = "tpl_from-to"; // "from <%from%> to <%to%>"

        //-- i18n --//
        class i18nDictionary {
            constructor(optData) {
                this._dictionary = optData || {};
            }

            clear() {
                this._dictionary = {};
            }

            load(data) {
                const self = this;
                if (!!data) {
                    eachProp(data, (k, v) => {
                        self.put(k, v);
                    })
                }
            }

            get(key) {
                return this._dictionary[key] || "";
            }

            put(key, value) {
                if (!!key && !!value) {
                    this._dictionary[key] = value;
                }
            }
        }

        class i18nCtrl {
            constructor() {
                this._enabled = true;
                this._locale = new Intl.Locale(i18nDefaultLang);
                this._lang = "";
                this._languageNames = null;
                this._regionNames = null;
                this._dateStyle = i18nDefaultDateStyle;
                this._timeStyle = i18nDefaultTimeStyle;
                this._dictionaries = {};
                this.__initI18n();
            }

            get enabled() {
                return this._enabled;
            }

            set enabled(enabled) {
                this._enabled = enabled;
                this.__initI18n(this._locale.language);
            }

            get dateStyle() {
                return this._dateStyle;
            }

            set dateStyle(dateStyle) {
                this._dateStyle = dateStyle;
            }

            get timeStyle() {
                return this._timeStyle;
            }

            set timeStyle(timeStyle) {
                this._timeStyle = timeStyle;
            }

            get lang() {
                return this._locale.language;
            }

            set lang(l) {
                if (!!l) {
                    this.__initI18n(l);
                }
            }

            get locale() {
                return this._locale;
            }

            get dictionary() {
                return this.getDictionary(this._lang);
            }

            normalize(lang) {
                lang = lang || i18nDefaultLang
                return lang === '*' ? lang : new Intl.Locale(lang).language || i18nDefaultLang;
            }

            getDictionary(lang) {
                const n = this.normalize(lang);
                if (!this._dictionaries[n]) {
                    this._dictionaries[n] = new i18nDictionary({
                            "vanilla": `${vname} v${v}`,
                            "tpl_from": "from <%from%>",
                            "tpl_from-to": "from <%from%> to <%to%>"
                        }
                    );
                }
                return this._dictionaries[n];
            }

            //-- i18n fmt --//

            fmtDate(v, options) {
                const opts = isString(options) ? {dateStyle: options} : isObject(options) ? options : null;
                if (isDate(v)) {
                    const dt = v;
                    const fmt = !!opts
                        ? new Intl.DateTimeFormat([this._locale.language, i18nDefaultLang], opts)
                        : new Intl.DateTimeFormat([this._locale.language, i18nDefaultLang], {
                            dateStyle: this._dateStyle
                        });
                    return fmt.format(dt);
                } else if (isString(v)) {
                    const luxon = getLuxon();
                    if (!!luxon) {
                        const luxonDate = luxon.DateTime.fromISO(v);
                        return luxonDate.setLocale(this._lang).toLocaleString("short");
                    } else {
                        return v;
                    }
                }
                return v + "";
            }

            fmtDateTime(dt, options) {
                if (isDate(dt)) {
                    const opts = isString(options) ? {dateStyle: options} : isObject(options) ? options : null;
                    const fmt = !!opts
                        ? new Intl.DateTimeFormat([this._locale.language, i18nDefaultLang], opts)
                        : new Intl.DateTimeFormat([this._locale.language, i18nDefaultLang], {
                            dateStyle: this._dateStyle,
                            timeStyle: this._timeStyle
                        });
                    return fmt.format(dt);
                }
                return "";
            }

            fmtNumber(n, options) {
                if (isNumber(n)) {
                    const opts = isString(options) ? {dateStyle: options} : isObject(options) ? options : null;
                    const fmt = !!opts
                        ? new Intl.NumberFormat([this._locale.language, i18nDefaultLang], opts)
                        : new Intl.NumberFormat([this._locale.language, i18nDefaultLang])
                    return fmt.format(n);
                }
                return n
            }

            nameOfLang(code) {
                if (!!this._languageNames) {
                    return this._languageNames.of(code);
                }
                return code;
            }

            nameOfRegion(code) {
                if (!!this._regionNames) {
                    return this._regionNames.of(code);
                }
                return code;
            }

            //-- i18n dictionary --//

            async load(fileName) {
                const imports = await instance.require(fileName);
                const data = imports[0];
                if (!!data) {
                    const dictionaries = data["dictionaries"];
                    if (!!dictionaries) {
                        eachProp(dictionaries, (k, v) => {
                            const dictionary = this.getDictionary(k);
                            dictionary.load(v);
                        });
                    }
                }
                return instance;
            }

            addLabel(key, value) {
                const k = parseVUID(key);
                this.dictionary.put(k.name || k.raw, value);
            }

            getLabel(key, optModel) {
                if (isString(key)) {
                    const label = this.dictionary.get(key) || key;
                    try {
                        if (!!label && !!optModel) {
                            return renderTpl(label, optModel);
                        }
                    } catch (e) {
                        console.warn(`${vname} v${v}: Error on i18n.getLabel("${key}")`, e);
                    }
                    return label;
                }
                return key;
            }

            //-- i18n PRIVATE --//

            __initI18n(l) {
                const lang = l || navigator.language || i18nDefaultLang;
                this._locale = new Intl.Locale(lang);
                if (this._lang !== this._locale.language) {
                    this._lang = this._locale.language;
                    this.dictionary.put("vanilla", `${vname} v${v}`);
                }
                this._languageNames = new Intl.DisplayNames(this._lang, {
                    type: 'language'
                });
                this._regionNames = new Intl.DisplayNames(this._lang, {
                    type: 'region'
                });
                if (this._enabled) {
                    const luxon = getLuxon();
                    console.debug(`${vname} v${v}: i18n enabled.`,
                        "language:", this._lang,
                        "date:", this.fmtDateTime(new Date()),
                        "number:", this.fmtNumber(1234567890.12345),
                        "luxon:", !!luxon ? "Luxon installed!" : "Luxon not installed!",
                    );
                } else {
                    console.debug(`${vname} v${v}: i18n disabled.`);
                }
            }
        }

        const i18n_helper = new i18nCtrl();
        i18n.enabled = (b) => {
            if (!isUndefined(b)) {
                i18n_helper.enabled = b;
            }
            return i18n_helper.enabled;
        }; // property read, write
        i18n.lang = (v) => {
            if (!isString(v)) {
                i18n_helper.language = v;
            }
            return i18n_helper.lang;
        }; // property read, write
        i18n.locale = () => i18n_helper.locale;   // property readonly
        i18n.fmtDate = i18n_helper.fmtDate.bind(i18n_helper);
        i18n.fmtDateTime = i18n_helper.fmtDateTime.bind(i18n_helper);
        i18n.fmtNumber = i18n_helper.fmtNumber.bind(i18n_helper);
        i18n.nameOfLang = i18n_helper.nameOfLang.bind(i18n_helper);
        i18n.nameOfRegion = i18n_helper.nameOfRegion.bind(i18n_helper);
        i18n.load = i18n_helper.load.bind(i18n_helper);
        i18n.addLabel = i18n_helper.addLabel.bind(i18n_helper);
        i18n.getLabel = i18n_helper.getLabel.bind(i18n_helper);

        //-- assign --//
        instance.__ready__ = false;
        instance.i18n = i18n;
        instance.version = v;
        instance._verbose = false;
        instance.verbose = (b) => {
            if (b !== undefined) {
                instance.verbose = !!b;
                if (instance.verbose) {
                    // enable
                    context.console = vconsole;
                } else {
                    // disable
                    context.console = {
                        log: () => {
                        },
                        debug: () => {
                        },
                        info: () => {
                        },
                        warn: vconsole.warn,
                        error: vconsole.error,
                    };
                }
            }
            return instance._verbose;
        };
        instance.log = context.console.log;
        instance.env = {
            name: vname,
            version: v,
            isBrowser: isBrowser,
            isWorker: isWebWorker,
            context: context,
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
                    invokeReady(instance, callback, instance);
                }

                if (!!_is_ready) {
                    invokeReady(instance, callback, instance);
                    return;
                }

                if (document.readyState === "complete") {
                    // Fully loaded!
                    _is_ready = true;
                    invokeReady(instance, callback, instance);
                } else if (document.readyState === "interactive") {
                    // DOM ready! Images, frames, and other subresources are still downloading.
                    if (!!earlyInvoke) {
                        _is_ready = true;
                        invokeReady(instance, callback, instance);
                    }
                } else {
                    // Loading still in progress.
                    // To wait for it to complete, add "DOMContentLoaded" or "load" listeners.
                    context.addEventListener("DOMContentLoaded", () => {
                        // DOM ready! Images, frames, and other sub resources are still downloading.
                        if (!!earlyInvoke) {
                            context.removeEventListener("load", onReady);
                            _is_ready = true;
                            invokeReady(instance, callback, instance);
                        }
                    });

                    context.addEventListener("load", onReady);
                }
            }
        }

        function invokeReady(thisArgs, callback, args) {
            // console.log("DOM invokeReady");
            invoke(thisArgs, callback, args);
        }

        /**
         * Returns all script tags
         * @returns {HTMLCollectionOf<HTMLElementTagNameMap[string]>|*[]}
         */
        function scriptsFn() {
            return document.getElementsByTagName('script') || [];
        }


        /**
         * Receive an input with an optional model and returns an HTMLElement
         * @param args elem, HTML, vuid and model
         * @returns {Promise<HTMLElement|null>}
         */
        async function solve(...args) {
            const {elem, str, comp, obj, promise} = argsSolve(...args);
            if (!!elem) {
                return elem;
            }
            if (!!comp) {
                return await comp.getElem();
            }
            if (!!promise) {
                return await promise;
            }
            if (isString(str)) {
                if (isHTML(str)) {
                    const html = renderTpl(str, obj);
                    return createFromHTML(html);
                }
                return get(str);
            }
            return null;
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

        function setId(arg, id) {
            if (!!arg && !!id) {
                if (isHTMLElement(arg)) {
                    // set id if missing or replaceable
                    const attrId = arg.getAttribute("id")
                    if (!attrId || isReplaceableId(attrId)) {
                        arg.setAttribute("id", id);
                    }
                    arg.setAttribute(attr_vuid, id);
                    return arg;
                }
                if (isHTML(arg)) {
                    return setId(createFromHTML(arg), id);
                }
                console.error(`dom.setId() -> Element not supported: "${arg}"`);
            }
            return null;
        }

        /**
         * Return an HTML element by ID
         * @param id ID of the HTML element to return
         * @returns {HTMLElement}
         */
        function get(id) {
            try {
                if (isString(id)) {
                    let elem = document.getElementById(id);
                    if (!elem) {
                        const elems = document.querySelectorAll(`[${attr_vuid}="${id}"]`);
                        if (elems.length > 0) {
                            elem = elems.item(0);
                        }
                    }
                    if (!!elem) {
                        return elem;
                    } else {
                        console.error(`dom.get() -> Element not found: "${id}"`);
                    }
                }
            } catch (err) {
                console.error(`dom.get() -> Error retrieving "${id}":`, err);
            }
            return id;
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
                console.error(`dom.removeElemChildrenById() -> removing children from "${id}":`, err);
            }
            return null;
        }

        function createFromHTML(htmlString) {
            const div = document.createElement('div');
            div.innerHTML = htmlString.trim();

            // Return the primary node if it has multiple children
            if (div.childElementCount > 1) {
                // get scripts
                const removable = [];
                eachElem(div, (elem) => {
                    const tagName = elem.tagName.toLowerCase();
                    if (tagName === "script" || tagName === "meta" || tagName === "link" || tagName === "title") {
                        removable.push(elem);
                    }
                });
                for (const elem of removable) {
                    elem.remove();
                }
                removeAllComments(div);
                return div;
            } else {
                return div.firstElementChild;
            }
        }

        function getAllCommentNodes(v) {
            const rootElem = elem(v);
            const comments = [];
            const iterator = document.createNodeIterator(rootElem, NodeFilter.SHOW_COMMENT);
            let curNode;
            while (curNode = iterator.nextNode()) {
                comments.push(curNode);
            }
            return comments;
        }

        function removeAllComments(v) {
            const comments = getAllCommentNodes(v);
            for (const elem of comments) {
                elem.remove();
            }
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
                console.error(`dom.setInnerHTMLById() -> inserting "${html}" into "${id}":`, err);
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
                console.error(`dom.appendElemChildById() -> adding child into "${id}":`, err)
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
                console.error(`dom.classRemove() -> adding child into "${id}":`, err)
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
                console.error(`dom.classAdd() -> adding class into "${id}":`, err)
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
                console.error(`dom.tagAddStyle() -> adding style tag into header:`, err)
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
                console.error(`dom.tagAddScript() -> adding script tag into header:`, err)
            }
            return null;
        }

        function childOfById(parent, childId) {
            let response = null;
            const parentElem = elem(parent);
            if (!!parentElem) {
                eachElem(parentElem, (elem) => {
                    if (matchHTMLElement(elem, childId)) {
                        response = elem;
                        return true; // exit loop
                    }
                });
            } else {
                console.error("dom.childOfById()", new Error("Parent elem do not exist!"));
            }
            return response;
        }

        /**
         * Iterates over each element and its children, executing a callback function on each.
         *
         * @param {*} v - The value to be processed by the `elem` function to get the element.
         * @param {Function} callback - The callback function to be executed on each element.
         * @return {void}
         */
        function eachElem(v, callback) {
            const el = elem(v);
            if (!!el && isFunction(callback)) {
                if (invoke(instance, callback, el)) {
                    return;
                }
                for (const child of el.children) {
                    eachElem(child, callback);
                }
            }
        }

        /**
         * Iterates over each element within the provided `elem` and updates its ID to a VUID (Universally Unique Identifier-ish).
         * Only elements with a defined `id` attribute that are not scripts or styles are processed.
         *
         * @param {string} id - The base identifier used for generating VUIDs.
         * @param {HTMLElement|string} v - The root element containing child elements to process.
         * @return {HTMLElement} Returns v element
         */
        function eachElemToVUID(id, v) {
            const element = elem(v);
            eachElem(element, (el) => {
                if (!!el) {
                    const cid = el.getAttribute("id");
                    const tag = el.tagName.toLowerCase();
                    if (!!cid && !isVUID(cid) && tag !== "script" && tag !== "style") {
                        setId(el, toVUID(id, cid));
                    }
                }
            });
            return element;
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
            solve: solve,
            elem: elem,
            get: get,
            setId: setId,
            remove: remove,
            removeChild: removeElemChildrenByIdFn,
            setInner: setElemInnerHTMLByIdFn,
            appendInner: appendElemChildByIdFn,
            classRemove: classRemove,
            classAdd: classAdd,
            tagAddStyle: tagAddStyle,
            tagAddScript: tagAddScript,
            matchHTMLElement: matchHTMLElement,
            // children
            childOfById: childOfById,
            eachElem: eachElem,
            eachElemToVUID: eachElemToVUID,
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
            enableSmartUrl: true,
        };

        function configFn(value) {
            eachProp(value, function (k, v) {
                _config[k] = v;
            });
            return _config;
        }

        function _smartURL(fmt, rawURL) {
            const ext = pathGetExt(rawURL);
            const type = fmt || _ext_fetch[ext || "js"] || "text";
            const url = !!ext ? rawURL : urlJS(rawURL);
            return {
                "ext": ext || "js",
                "type": type,
                "url": url,
            }
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
            const smartUrls = configFn().enableSmartUrl;

            for (let url of urls) {
                url = smartUrls ? _smartURL(fmt, urlHref(url)).url : urlHref(url);
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
                    const ext = pathGetExt(url, "js"); //url.split('.').pop();
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
    //  VANILLA - remote
    // --------------------------

    (function initRemote(instance) {

        class RemoteRequest extends Vanilla {
            constructor(options) {
                super();

                this._headers = new Headers();
                this._body = undefined;
                this._method = "POST";
                this._mode = "cors" // cors, no-cors, or same-origin
                this._url = "";
                this._type = "text"; // json, text, blob, form, buffer, url
                this._opt_abort = false;

                options = options || {};
                this._parse_options(options);

                this._response_promise = undefined; // fetched response
            }

            getHeaders() {
                return this._headers;
            }

            getBody() {
                return this._body;
            }

            /**
             * Creates and returns a new instance of AbortController.
             * If an instance is created, the request will adopt this controller to receive a signal "controller.abort();".
             * @return {AbortController} The AbortController instance created and stored in the _opt_abort property.
             */
            getAbortController() {
                this._opt_abort = new AbortController();
                return this._opt_abort;
            }

            mode(m) {
                this._mode = m || "cors";
                return this;
            }

            headers(v) {
                eachProp(v, (k, v) => {
                    this._headers.set(k, v);
                });
                return this;
            }

            body(v) {
                this._body = {};
                eachProp(v, (k, v) => {
                    this._body[k] = v;
                });
                return this;
            }

            url(u) {
                if (!!u) {
                    this._url = u;
                }
                return this;
            }

            method(m) {
                this._method = this._validate_method(m);
                return this;
            }

            //-- ACTIONS --//

            /**
             * Use "submit" to get the response.
             * If you already know about an expected response type, use
             * "asText", "asJson", etc...
             * @param options
             * @returns {Promise<{ok}|*>}
             */
            async submit(options) {
                this._parse_options(options);
                return await this._get_response();
            }

            //-- RESPONSE TYPE HELPERS --//

            async response(options) {
                this._parse_options(options);
                if (this._type === "json") {
                    return await this.asJson();
                }
                if (this._type === "blob") {
                    return await this.asBlob();
                }
                if (this._type === "buffer") {
                    return await this.asArrayBuffer();
                }
                if (this._type === "form") {
                    return await this.asFormData();
                }
                if (this._type === "url") {
                    return await this.asObjectURL();
                }
                // text is default response
                return await this.asText();
            }

            async asText(options) {
                this._parse_options(options);
                const response = await this._get_response();
                return await response.text();
            }

            async asJson(options) {
                this._parse_options(options);
                const response = await this._fetch();
                return await response.json();
            }

            async asJsonValue(...args) {
                let name = "response";
                for (const arg of args) {
                    if (isString(arg)) {
                        name = arg;
                        continue;
                    }
                    if (isObject(arg)) {
                        this._parse_options(arg);
                    }
                }
                const response = await this.asJson();
                if (!!response["error"]) {
                    throw new Error(response["error"]);
                }
                return getDeep(response, name);
            }

            async asArrayBuffer(options) {
                this._parse_options(options);
                const response = await this._fetch();
                return await response.arrayBuffer();
            }

            async asFormData(options) {
                this._parse_options(options);
                const response = await this._fetch();
                return await response.formData();
            }

            async asBlob(options) {
                this._parse_options(options);
                const response = await this._fetch();
                return await response.blob();
            }

            async asObjectURL(options) {
                const blob = await this.asBlob(options);
                return URL.createObjectURL(blob);
            }

            //-- PRIVATE --//

            async _get_response() {
                const response = await this._fetch();
                if (!response.ok) {
                    throw new Error(`Response status: ${response.status}`);
                }
                return response;
            }

            _fetch() {
                const method = this._method || "POST";
                const url = this._url;
                const headers = this._headers;
                const body = this._body;
                if (!url) {
                    throw new Error("Missing URL!");
                }

                const options = {
                    method: method,
                    mode: this._mode || "cors",
                }
                if (this._opt_abort) {
                    options.signal = this._opt_abort.signal;
                }
                if (sizeOf(body) > 0) {
                    options.body = JSON.stringify(body);
                    if (!headers.get("Content-Type")) {
                        headers.set("Content-Type", "application/json; charset=UTF-8");
                    }
                    if (!headers.get("Content-Length")) {
                        headers.set("Content-Length", "" + options.body.length);
                    }
                }
                if (!headers.get("Accept")) {
                    headers.set("Accept", "*/*");
                }
                options.headers = headers;

                // execute request
                this._response_promise = context.fetch(url, options);
                return this._response_promise; // blob, arrayBuffer, fromData, json, text
            }

            _parse_options(options) {
                if (!!options) {
                    this._headers = !!options.headers ? this._parse_headers(options.headers) : this._headers;
                    this._body = !!options.body ? options.body : this._body || {};
                    this._method = !!options.method ? this._validate_method(options.method) : this._method || "POST";
                    this._mode = !!options.mode ? options.mode : this._mode || "cors" // cors, no-cors, or same-origin
                    this._url = !!options.url ? options.url : this._url || "";
                    this._type = !!options.type ? options.type : this._type || "text";
                }
            }

            _parse_headers(v) {
                const headers = new Headers();
                if (!!v) {
                    eachProp(v, (k, v) => {
                        headers.set(k, v);
                    });
                }
                return headers;
            }

            _validate_method(m) {
                if (isString(m)) {
                    m = m.toLowerCase();
                    if (m === "get") return "GET";
                    if (m === "post") return "POST";
                    if (m === "put") return "PUT";
                    if (m === "delete") return "DELETE";
                    if (m === "patch") return "PATCH";
                    if (m === "options") return "OPTIONS";
                }
                return "POST";
            }
        }


        instance.RemoteRequest = RemoteRequest;
        instance.request = (url) => {
            return (new RemoteRequest()).url(url);
        };

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

        //-- vanilla timer --//

        class VanillaTimer extends Vanilla {
            constructor(interval_ms) {
                super();

                this._interval_ms = interval_ms || 0;
                this._timer = null;
                this._callback = null;
                this._args = [];
            }

            set interval(v) {
                this._interval_ms = v;
            }

            get interval() {
                return this._interval_ms;
            }

            set callback(f) {
                this._callback = f;
            }

            get callback() {
                return this._callback
            }

            /**
             * Start the timer.
             * Usage:
             * timer.start(function);
             * timer.start(interval, function);
             * timer.start(interval, function, param1, param2, param3...)
             * timer.start(param1, param2, param3...)
             * @param args
             * @returns {boolean}
             */
            start(...args) {
                if (!this._timer) {
                    this._init(...args);
                    if (this._is_runnable()) {
                        this._timer = setInterval(this._callback, this._interval_ms);
                        return true;
                    }
                }
                return false;
            }

            stop() {
                if (!!this._timer) {
                    clearInterval(this._timer);
                    this._timer = null;
                }
            }

            /**
             * Start a timer.
             * Usage:
             * VanillaTimer.run(function);
             * VanillaTimer.run(interval, function);
             * VanillaTimer.run(interval, function, param1, param2, param3...)
             * VanillaTimer.run(param1, param2, param3...)
             * @param args
             * @returns {VanillaTimer|null}
             */
            static run(...args) {
                const timer = new VanillaTimer();
                if (timer.start(...args)) {
                    return timer;
                }
                return null;
            }

            _is_runnable() {
                return isCallable(this._callback) && isNumber(this._interval_ms) && this._interval_ms > 0;
            }

            _init(...args) {
                this._args = [];
                if (this._is_runnable()) {
                    this._args.push(...args);
                    return;
                }

                if (!!args && args.length > 0) {
                    let count = 0
                    for (const arg of args) {
                        count++;
                        if (isCallable(arg) && count < 3) {
                            this._callback = arg;
                            continue;
                        }
                        if (isNumber(arg) && count < 3) {
                            this._interval_ms = arg;
                            continue;
                        }
                        this._args.push(arg);
                    }
                }
            }
        }

        //-- vanilla store --//

        class VanillaStore extends Vanilla {
            constructor(messageQueue) {
                super();
                this._model = {}; // data
                this._messageQueue = messageQueue || new QueueManager();
            }

            // expose message queue.
            get messages() {
                return this._messageQueue;
            }

            set(name, value) {
                if (this._model[name] !== undefined) {
                    // send change state event

                }
                this._model[name] = value;
            }

            get(name) {
                return this._model[name];
            }

        }

        /**
         *  DataWrapper
         *  Load data from url passed into constructor
         */
        class DataWrapper extends Vanilla {
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
            async get() {
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

            /**
             * Wrap and wait for the result
             * @param v
             * @returns {Object}
             */
            static async wait(v) {
                const instance = new DataWrapper(v)
                return await instance.get();
            }

            /**
             * Wrap data and return a promise
             * @param v
             * @returns {Promise<Object>}
             */
            static wrap(v) {
                const instance = new DataWrapper(v)
                return instance.get();
            }
        }

        /**
         *  DataPing
         *  Create a timer and ping data each "interval".
         *  If property "path" is assigned, the callback event is called only if
         *  the latest value is different from the previous.
         */
        class DataPing extends Vanilla {
            constructor(options) {
                super();
                this._url = !!options ? options.url : "";
                this._interval_ms = !!options ? options.interval : 3000;
                this._callback = !!options ? options.options.callback : null;
                this._model_path = !!options ? options.options.path : "";
                this._timer = null;
                this._latest_model_value = null;
                this._error = null;
            }

            set url(v) {
                this._url = v;
            }

            get url() {
                return this._url;
            }

            set interval(v) {
                this._interval_ms = v;
            }

            get interval() {
                return this._interval_ms;
            }

            set callback(f) {
                this._callback = f;
            }

            get callback() {
                return this._callback
            }

            set path(v) {
                this._model_path = v;
            }

            get path() {
                return this._model_path;
            }

            get error() {
                return this._error;
            }

            start() {
                const self = this;
                self._error = null;
                if (!this._timer && this._is_runnable()) {
                    // timed ping
                    this._timer = VanillaTimer.run(async function () {
                        try {
                            // get data
                            await self._ping_data.bind(self)();
                        } catch (err) {
                            self._error = err;
                            console.error("DataPing.start() Error: ", err);
                        }
                    }, this._interval_ms);
                    // immediate ping
                    self._ping_data.bind(self)().catch((err) => {
                        self._error = err;
                        console.error("DataPing.start() Error: ", err);
                    });
                    return true;
                }
                return false;
            }

            stop() {
                if (!!this._timer) {
                    this._timer.stop();
                    this._timer = null;
                }
            }

            static run(url, callback, interval_ms, path) {
                const instance = new DataPing();
                instance.url = url;
                instance.callback = callback;
                instance.interval = interval_ms || 10 * 1000;
                instance.path = path;
                instance.start();
                return instance;
            }

            _is_runnable() {
                return !!this._url && isCallable(this._callback) && isNumber(this._interval_ms) && this._interval_ms > 0;
            }

            async _ping_data() {
                const url = this._url + "?t=" + timestamp();
                const model = await DataWrapper.wrap(url);
                if (!!model) {
                    const data = !!this._model_path ? getDeep(model, this._model_path) : model;
                    const data_str = JSON.stringify(data);
                    if (!this._latest_model_value || (!!data && data_str !== this._latest_model_value)) {
                        this._latest_model_value = data_str;
                        if (!!this._callback && isCallable(this._callback)) {
                            invoke(this, this._callback, data);
                        }
                    }
                }
            }
        }

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
                            const queueSubscription = new QueueSubscription(channelName, subscription.id);
                            invokeAsync(this, listener.func, data, queueSubscription, ...listener._args);
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


        //-- assign --//
        instance.classes = {
            VanillaStore: VanillaStore,
            VanillaTimer: VanillaTimer,
            DataWrapper: DataWrapper,
            DataPing: DataPing,
            QueueManager: QueueManager,
        };
        instance.queue = new QueueManager(); // shortcut to vanilla.app.messages
    })(vanilla);

    // --------------------------
    //  VANILLA - components
    // --------------------------

    (function initComponents(instance) {

        //-- component registry --//

        class ComponentRegistry extends Vanilla {
            constructor() {
                super();
                this._registry = {}; // map of components. KeyPair = uid:component
            }

            put(item) {
                if (isComponent(item) && !!item.uid) {
                    const uid = item.uid;
                    this._registry[uid] = item;
                    console.log("ComponentRegistry.put. Added: ", uid);
                } else {
                    console.error("ComponentRegistry.put. Added invalid instance: ", item)
                }
            }

            delete(item) {
                const uid = isComponent(item) ? item.uid : isString(item) ? item : "";
                if (!!uid && !!this._registry[uid]) {
                    delete this._registry[uid];
                    console.log("ComponentRegistry.delete. Removed: ", uid);
                }
            }

            get(vuid) {
                const uid = parseVUID(vuid)["id"];
                return this._registry[uid];
            }
        }

        //-- component lifecycle --//

        class ComponentLifecycle extends Vanilla {
            constructor(emitter) {
                super();
                this._emitter = emitter
                this._invokedLifecycles = [];
            }

            dispose() {
                this._emitter = null;
                this._invokedLifecycles = null;
                super.dispose();
            }

            invokeReady() {
                return this.__invoke(on_ready, true);
            }

            invokeBeforeCreate() {
                return this.__invoke(on_before_create, true);
            }

            invokeAfterCreate() {
                return this.__invoke(on_after_create, true);
            }

            invokeDispose() {
                return this.__invoke(on_dispose, true);
            }

            invokeAttach() {
                return this.__invoke(on_attach, false);
            }

            invokeDetach() {
                return this.__invoke(on_detach, false);
            }

            invokeShow() {
                return this.__invoke(on_show, false);
            }

            invokeHide() {
                return this.__invoke(on_hide, false);
            }

            __invoke(method, onlyOnce) {
                let response = undefined;
                const func = !!this._emitter ? this._emitter[method] : false;
                if (isCallable(func)) {
                    if (onlyOnce) {
                        if (this._invokedLifecycles.indexOf(method) === -1) {
                            this._invokedLifecycles.push(method);
                            response = invoke(this._emitter, func);
                        }
                    } else {
                        response = invoke(this._emitter, func);
                    }
                }
                return response;
            }
        }

        //-- component --//

        class BaseComponent extends Vanilla {
            constructor(...args) {
                super();
                this._name = "anonymous";
                this._slug = "anonymous";
                this._model = {};
                this._model["uid"] = this._uid;
                this._parent_elem = null; // parent node
                this._detached = true; // attached only to body
                this._visible = false;
                this._late_actions = new Futures(); // binding to execute after component is consistent (has HTML)
                this._elem = null; // dom ui
                this._elem_promise = null;
                this._ready_promise_resolver = Promise.withResolvers();
                this._created = false;
                this._lifecycle = new ComponentLifecycle(this);
                this._children_components = []; // to destroy on detaching or dispose

                // initialize reading all arguments
                this.__init_component(...args);
            }

            //-- PROPERTIES --//

            get uid() {
                return this._uid;
            }

            set uid(v) {
                if (!!v && isString(v)) {

                    this._uid = v;
                    if (!this._model["uid"]) {
                        this._model["uid"] = this._uid;
                    }
                }
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
                    const html = this.__renderHtml(fullHtml);
                    const elem = instance.dom.elem(html);
                    if (!!elem) {
                        // instance.dom.body().insertAdjacentHTML("beforeend", html);
                        instance.dom.body().insertAdjacentElement("beforeend", elem);
                        this.setElem(elem);
                    }
                } else if (isUrl(value)) {
                    const url = urlUI(value);
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
                        }).catch((err) => {
                            console.error(`Error creating page from "${url}"`, err);
                        });
                    });
                } else {
                    // not supported yet!
                    console.warn(`Error creating BaseComponent loading html from: "${value}"`);
                }
            }

            //-- METHODS --//

            init(html, model) {
                this.__init_component(html, model)
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

            /**
             * Return HTMLElement of current component
             * @returns {Promise<HTMLElement>}
             */
            async getElem() {
                return this._elem_promise;
            }

            /**
             * Return HTMLElement of current component
             * @returns {Promise<HTMLElement>}
             */
            async elem() {
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

            /**
             * Add event listener to element.
             * @param params HtmlElement, promise<HtmlElement>, "id", function, ...args
             */
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
                            instance.events.on(this, target, name, fn.bind(this), ...args);
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

            toVUID(v) {
                if (isString(v) && !isHTML(v) && !isUrl(v) && !isVUID(v)) {
                    return toVUID(this._uid, v);
                }
                return v;
            }

            /**
             * Return parent HTMLElement
             * @returns {HTMLElement|null}
             */
            parent() {
                return this._parent_elem;
            }

            /**
             * Return root (parent Component main element) or null
             * @returns {HTMLElement|null}
             */
            root() {
                const elem = this.parent();
                if (!!elem) {
                    const id = elem.getAttribute("id");
                    const vuid = !!id ? parseVUID(id)["id"] : false;
                    if (!!vuid && vuid !== id) {
                        return instance.dom.get(vuid);
                    }
                }
                return elem;
            }

            /**
             * Adds a component to the list of disposable components if it implements the dispose method.
             *
             * @param {Object} component - The component to be added.
             * @return {Object} The current instance for chaining.
             */
            addDisposable(component) {
                if (!!component && isCallable(component.dispose)) {
                    this._children_components.push(component);
                }
                return this;
            }

            /**
             * Attach the current component to a specified parent element, which can be an
             * HTMLElement, a promise that resolves to an element, a string VUID, or another component.
             *
             * @param {Object|String|HTMLElement|Promise} v - The parent reference which can be:
             * - An Object that contains relevant properties.
             * - A string VUID that references an existing element.
             * - An HTMLElement directly.
             * - A Promise that resolves to an HTMLElement.
             *
             * @return {BaseComponent} The current instance of the component.
             */
            attach(v) {
                const self = this;
                if (!!v) {
                    try {
                        const {promise, elem, str, comp} = argsSolve(v);
                        // const vid = toVUID(this._uid, id) // isVUID(id) ? id : this._uid + "-" + id;
                        const parent = !!elem ? elem
                            : !!promise ? promise
                                : !!str ? instance.dom.get(this.toVUID(str))
                                    : !!comp ? comp.getElem() : v;
                        if (isHTMLElement(parent)) {
                            // parent is valid HTMLElement
                            this._parent_elem = parent;
                            if (!!this._elem && !!this._parent_elem) {
                                this.__appendElemToParent()
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

            detach() {
                try {
                    this.off();
                    instance.app.messages.unsubscribe(this.uid); // unsubscribe also messages
                    instance.components.registry.delete(this.uid);
                    const elem = instance.dom.body();
                    elem.append(this._elem);
                    this._elem.classList.add("vz-hidden");
                    this._detached = true;
                    this._visible = false;
                    this._lifecycle.invokeDetach();
                    return true;
                } catch (err) {
                    console.error("BaseComponent.detach: ", err);
                }
                return false;
            }

            dispose() {
                this.remove();
            }

            remove() {
                try {
                    this.off();
                    instance.app.messages.unsubscribe(this.uid); // unsubscribe also messages
                    this._elem.remove();
                    this._elem = null;
                    this._visible = false;
                    this._model = null;
                    this._lifecycle.invokeDetach();
                    this._lifecycle.invokeDispose();
                    this._lifecycle.dispose();
                    this._lifecycle = null;
                    super.dispose();
                    for (const comp of this._children_components) {
                        if (!!comp && isCallable(comp.dispose)) {
                            comp.dispose();
                        }
                    }
                    return true;
                } catch (err) {
                    console.error("BaseComponent.remove: ", err);
                }
                return false;
            }

            //-- visibility --//

            show(effectFn, ...options) {
                try {
                    if (this.isConsistent()) {
                        if (!this._visible && !!this._elem) {
                            this._elem.classList.remove("vz-hidden");
                            this._visible = true;
                            if (!!effectFn) {
                                invoke(this._elem, effectFn, this._elem, ...options);
                            }
                            // onShow
                            this._lifecycle.invokeShow();
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
                            this._elem.classList.add("vz-hidden");
                            this._visible = false;
                            if (!!effectFn) {
                                invoke(this._elem, effectFn, this._elem, ...options);
                            }
                            // onHide
                            this._lifecycle.invokeHide()
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

            //-- children --//

            async child(id) {
                return await this.childElem(id);
            }

            async childElem(id) {
                const vid = this.toVUID(id) // isVUID(id) ? id : this._uid + "-" + id;
                const elem = await this.getElem()
                if (!!elem) {
                    return instance.dom.childOfById(elem, vid);
                }
                return null;
            }

            async appendChild(...args) {
                if (!!v) {
                    let parent, elem, model;
                    if (args.length === 3) {
                        parent = await instance.dom.solve(this.toVUID(args[0]));
                        elem = await instance.dom.solve(args[1], args[2] || {});
                    } else if (args.length === 2) {
                        if (isObject(args[1])) {
                            parent = await this.getElem();
                            elem = await instance.dom.solve(args[0], args[1]);
                        } else {
                            parent = await instance.dom.solve(this.toVUID(args[0]));
                            elem = await instance.dom.solve(args[1]);
                        }
                    } else if (args.length === 1) {
                        parent = await this.getElem();
                        elem = await instance.dom.solve(args[0]);
                    }
                    if (!!parent) {
                        if (!!elem) {
                            // check for id to convert to uid
                            instance.dom.eachElemToVUID(this._uid, elem);
                            // insert
                            parent.insertAdjacentElement("beforeend", elem);
                            return elem;
                        } else {
                            console.warn(`${vname} v${v}: ${this.name}.appendChild() -> Unable to solve element.`, v);
                        }
                    } else {
                        console.warn(`${vname} v${v}: ${this.name}.appendChild() -> Missing parent.`);
                    }
                }
                return null;
            }

            /**
             * Set children inner HTML or attribute value
             * @param id children ID or VUID
             * @param args attribute and content or only content
             * @returns {Promise<void>}
             */
            async childSet(id, ...args) {
                const elem = await this.childElem(id);
                if (!!elem) {
                    let attr, content;
                    if (args.length === 2) {
                        attr = args[0];
                        content = args[1];
                    } else if (args.length === 1) {
                        content = args[0];
                    }
                    if (!!attr) {
                        elem.setAttribute(attr, content);
                    } else {
                        elem.innerHTML = content;
                    }
                }
            }

            //-- PRIVATE --//

            __init_component(...args) {
                // console.log("BaseComponent.__init_component()", ...args);

                // onBeforeCreate
                this._lifecycle.invokeBeforeCreate();

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
                    elem.innerHTML = this.__renderHtml(elem.innerHTML);
                    if (!!elem.getAttribute("id")) {
                        this.uid = elem.getAttribute("id");
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
                        this._elem.classList.add("vz-hidden");
                        // set id if missing
                        instance.dom.setId(this._elem, id);
                        // check all children components for appropriate id
                        instance.dom.eachElem(elem, (el) => {
                            if (!!el) {
                                const cid = el.getAttribute("id");
                                const tag = el.tagName.toLowerCase();
                                if (!!cid && !isVUID(cid) && tag !== "script" && tag !== "style") {
                                    instance.dom.setId(el, toVUID(id, cid));
                                }
                            }
                        });
                        // check if we should attach to a parent elem
                        if (!!this._parent_elem && this._detached) {
                            this._late_actions.doAll();
                        }

                        // invoke initialized
                        // this._consistence_promise_resolver.resolve(this);

                        // add to registry
                        instance.components.registry.put(this);
                    } catch (err) {
                        // this._consistence_promise_resolver.reject(err);
                        console.error("BaseView.__init_elem:", err.message);
                    }
                }
            }

            __appendElemToParent() {
                this._parent_elem.append(this._elem);
                this._detached = false;

                // onAfterCreate and readiness
                if (!self._created) {
                    this.__process_after_create();
                }

                this._lifecycle.invokeAttach();
            }

            __renderHtml(html) {
                const response = instance.template.render(html, this._model);
                if (!isHTML(response)) {
                    return `<div>${response}</div>`;
                }
                return response;
            }

            __process_after_create() {
                const self = this;
                if (!self._created) {
                    self._created = true;
                    const response = self._lifecycle.invokeAfterCreate(); // ON AFTER CREATE
                    // resolve ready
                    if (isPromise(response)) {
                        response.catch((err) => {
                            self._ready_promise_resolver.reject(err);
                        }).then((item) => {
                            const ready = self._lifecycle.invokeReady();
                            if (isPromise(ready)) {
                                ready.then(() => {
                                    self._ready_promise_resolver.resolve(self);
                                });
                            } else {
                                self._ready_promise_resolver.resolve(self);
                            }
                        });
                    } else {
                        const ready = self._lifecycle.invokeReady();
                        if (isPromise(ready)) {
                            ready.then(() => {
                                self._ready_promise_resolver.resolve(self);
                            });
                        } else {
                            self._ready_promise_resolver.resolve(self);
                        }
                    }
                }
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
            registry: new ComponentRegistry(),
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
                super(...args);

                // optionals sub-views
                this._views = new ViewManager(this);
            }

            //-- PROPERTIES --//

            get views() {
                return this._views;
            }

            //-- METHODS --//

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

        } // BaseView

        //-- ASYNC PAGE LAUNCHER --//

        class ViewLoader {

            constructor(_name, _url, _model, _parent) {
                this._parent = _parent;
                this._name = _name;
                this._slug = slugify(_name);
                this._url = _url;
                this._model = _model || {};
                this._view_resolver = Promise.withResolvers(); // promise

                console.debug(`ViewLoader.constructor. Creating loader with name='${_name}', url='${_url}', model='${_model}', parent='${_parent}'`);

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
                const self = this;
                const url = self._url;
                const model = self._model;
                const name = self._name;
                const slug = self._slug;
                console.debug(`ViewLoader._init_loader. Initializing loader for name='${name}', slug='${slug}', url='${url}', model='${model}', parent='${parent}'`);
                instance.require(url, (exports, err) => {
                    if (!!err) {
                        self._view_resolver.reject(new Error((`Error creating page from "${url}": ${err}`)));
                        console.debug(`ViewLoader._init_loader. Error creating page from "${url}": `, err);
                    } else {
                        console.debug(`ViewLoader._init_loader. Start loop on exports: `, exports);
                        eachProp(exports, async (k, ctr) => {
                            try {
                                if (isCallable(ctr)) {
                                    // create page with constructor
                                    const page = new ctr(model);
                                    page.name = name;
                                    if (!!self._parent) {
                                        const parent = await self.__getElem(self._parent);
                                        page.attach(parent);
                                    } else {
                                        page.attach(instance.dom.body());
                                    }
                                    self._view_resolver.resolve(page);
                                    console.debug(`ViewLoader._init_loader. Resolving '${name}' with: `, page);
                                } else {
                                    // not a constructor
                                    console.error("ViewLoader._init_loader: Received an invalid data. ", k, ctr);
                                }
                            } catch (err) {
                                console.error("ViewLoader._init_loader", err);
                            }
                        });
                    }
                }).catch((err) => {
                    console.error(`ViewLoader._init_loader() -> Error requiring page from "${url}": ${err}`);
                });
            }

            async __getElem(v) {
                if (isComponent(v)) {
                    return await v.getElem();
                }
                if (isPromise(v)) {
                    return await v;
                }
                return instance.dom.elem(v);
            }
        }

        //-- ViewManager --//

        class ViewManager {
            constructor(parent) {
                this._parent = parent;                  // Parent component. The owner of the view manager and parent of views
                this._view_promises = [];               // all pushed views
                this._late_actions = new Futures();     // all goto request with no pushed views
                this._curr_view_fn = null;
                this._last_view_fn = null;
                this._curr_view = null;
                this._last_view = null;
                // console.log("ViewManager.ctr() parent:", this._parentComponent);
            }

            get parent() {
                return this._parent;
            }

            set parent(value) {
                this._parent = value;
            }

            length() {
                return !!this._view_promises ? this._view_promises.length : 0;
            }

            push(...items) {
                console.debug(`ViewManager.push. Pushing items:`, ...items);
                for (const item of items) {
                    const name = item["name"];
                    const url = item["url"];
                    const data = item["data"] || {};
                    if (!!name && !!url) {
                        console.debug(`ViewManager.push. Creating ViewLoader:`, name, url, data, this._parent);
                        const pp = new ViewLoader(name, url, data, this._parent);
                        console.debug(`ViewManager.push. Adding:`, pp);
                        this._view_promises.push(pp);
                    }
                }

                if (this._late_actions.length > 0) {
                    this._late_actions.doAll();
                }

                // return number of promises
                console.debug(`ViewManager.push. Added:`, this._view_promises.length);
                return this._view_promises.length;
            }

            /**
             * Add views to list and promise to wait are all ready.
             * Return a Promise of BaseView array.
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
             * @param v {int|string|BaseView|Promise<BaseView>} index or name or slug or id
             * @returns {Promise<BaseView>}
             */
            async get(v) {
                console.log("ViewManager.get()", v);
                if (isView(v)) {
                    console.debug("ViewManager.get. Returning passed view: ", v);
                    return v;
                }
                const ppromise = v instanceof ViewLoader ? v : null;
                if (!!ppromise) {
                    console.debug("ViewManager.get. Returning passed ViewLoader view: ", ppromise.view);
                    return ppromise.view;
                }
                if (this.length() > 0) {
                    let count = 0;
                    for (const pp of this._view_promises) {
                        const page = await pp.view;
                        if (!page) continue;
                        if (isString(v)) {
                            const page_uid = page.uid;
                            const page_name = page.name;
                            const page_slug = page.slug;
                            console.debug(`ViewManager.get. Comparing passed reference '${v}' with page uid='${page_uid}' name='${page_name}' slug='${page_slug}'`, page);
                            if (page_uid === v || page_name === v || page_slug === v) {
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
                const self = this;
                if (v !== undefined) {
                    console.debug("ViewManager.goto", v, effectFn, ...options);
                    return await new Promise((resolve, reject) => {
                        console.debug("ViewManager.goto. Pages: ", self.length(), self._view_promises);
                        if (self.length() === 0) {
                            // page requested, but still not added
                            console.debug("ViewManager.goto. Adding function to late actions.");
                            const item = self._late_actions.push(self, self.goto, v, effectFn, ...options);
                            item.callback = function (response) {
                                if (isError(response)) {
                                    reject(response);
                                } else {
                                    resolve(response);
                                }
                            }
                        } else {
                            console.debug("ViewManager.goto. Searching page into existing: ", v);
                            self.get(v).then((view) => {
                                if (!!view) {
                                    self.__activateView(view, effectFn, ...options).then(() => {
                                        resolve(view);
                                    }).catch((err) => {
                                        reject(err);
                                    });
                                } else {
                                    reject(new Error(`ViewManager.goto() -> View "${v}" not found!`));
                                }
                            }).catch((err) => {
                                reject(err);
                            });
                        }
                    });
                }
                return null;
            }

            /**
             * Navigate the first page into page's list.
             * @returns {Promise<BaseView>}
             */
            async home() {
                return await this.goto(0, vanilla.effects.fadeIn);
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
            constructor(parent) {
                super(parent);

                // subscribe app messages
                this._queue = instance.queue;
                this._queue.subscribe(channel_zilla, this.__onInternalMessage.bind(this));
            }

            async ready() {
                // console.log("PageManager.ready()");
                return super.ready();
            }

            push(...items) {
                console.debug(`PageManager.push. Pushing items:`, ...items);
                super.push(...items);
            }

            /**
             * Navigate to a page.
             * @param v {int|string} index or name or slug or id
             * @param effectFn {Function} Optional effect function
             * @param options {any} Options effect params
             * @returns {Promise<BaseView>}
             */
            async goto(v, effectFn, ...options) {
                const page = await super.goto(v, effectFn, ...options);
                this.__notify(page);
                return page;
            }

            /**
             * Navigate the first page into page's list.
             * @returns {Promise<BaseView>}
             */
            async home() {
                const page = await super.home();
                if (!!page) {
                    this.__notify(page);
                    return page;
                }
                return null;
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
                this._queue.publish(channel_zilla,
                    new ZMessage(
                        message_target_pages, message_type_internal, message_target_routing, {name: pageName}
                    )
                );
            }

            __onInternalMessage(message, subscription,) {
                const self = this;
                if (!!subscription && subscription.channel === channel_zilla && !!message && message instanceof ZMessage && message.isTarget(message_target_pages)) {
                    if (!!message.data) {
                        const sender = message.sender;
                        if (sender === message_target_routing) {
                            // wait page manager is ready
                            self.ready().catch((err) => {
                                console.error(`PageManager.__onInternalMessage() Waiting for PageManager to be ready: `, err);
                            }).then(() => {
                                const hash = message.data.hash;
                                const pageName = hash.name || "";
                                if (!!pageName) {
                                    // do not notify
                                    super.goto(pageName, null).catch((err) => {
                                        console.error(`PageManager.__onInternalMessage() Navigating to page "${pageName}"`, err);
                                    });
                                } else {
                                    // notify home
                                    self.home().catch((err) => {
                                        console.error(`PageManager.__onInternalMessage() Navigating to Home page`, err);
                                    });
                                }
                            });
                        }
                    }
                }
            }
        } // Page Manager


        //-- App --//

        class App extends Vanilla {
            constructor() {
                super();

                this._pages = new PageManager("body");
                this._messages = instance.queue;
                this._state = new instance.classes.VanillaStore();
            }

            get pages() {
                return this._pages;
            }

            get messages() {
                return this._messages;
            }

            get state() {
                return this._state;
            }

            async ready() {
                await this._pages.ready();
                return this;
            }

        }

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
                    console.warn(`${vname}: Cannot enable routing in this environment because is not supported!`)
                } else {
                    // listen to browser changes
                    addEventListener("popstate", this.__onpopstate.bind(this));
                    // subscribe app messages
                    instance.queue.subscribe(channel_zilla, this.__onInternalMessage.bind(this));
                    // dom ready event
                    instance.dom.ready(this.__onDomReady.bind(this));
                    // ok, ready
                    console.info(`${vname}: Routing enabled!`);
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
                    console.warn(`${vname} Cannot enable routing in this environment because is not supported!`)
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
                this.__notifyToPages();
            }

            __onpopstate(e) {
                const hash = this.__parseHash(e.target.location.hash);
                const changed = !!hash && hash.name !== this._curr_hash.name;
                this._curr_hash = hash;
                if (changed) {
                    this.__notifyToPages();
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

            __notifyToPages() {
                if (!!instance.app && !!instance.app.pages) {
                    const hash = this._curr_hash;
                    // notify app internally
                    instance.queue.publish(channel_zilla,
                        new ZMessage(
                            message_target_routing, message_type_internal, message_target_pages, {hash: hash}
                        )
                    );
                }
            }

            __onInternalMessage(message, subscription) {
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
            return renderTpl(template, model, instance.template.TPL_PREFIX, instance.template.TPL_SUFFIX,
                (v) => {
                    // check i18n
                    if (!!instance.i18n && instance.i18n.enabled()) {
                        return instance.i18n.getLabel(v, model);
                    }
                    return v;
                }
            );
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
                    instance.dom.classRemove(elem, "vz-hidden");
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
            try {
                if (isString(text) && isString(prefix) && isString(suffix) && !!prefix && !!suffix) {
                    const si = text.indexOf(prefix);
                    const startIndex = si > -1 ? si + prefix.length : -1;
                    const endIndex = text.lastIndexOf(suffix) - 1;
                    return startIndex > -1 && endIndex > -1 ? text.substring(startIndex, endIndex).trim() : text.trim();
                }
            } catch (err) {
                console.error(`${vname} v${v}: strings.textBetween() raised error.`, err);
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
            return htmlDecode(input);
        }

        function encode(input) {
            return htmlEncode(input);
        }

        function bodyContent(textHtml) {
            try {
                if (isString(textHtml)) {
                    if (textHtml.indexOf("<body") > 0 || textHtml.indexOf("<BODY") > 0) {
                        const doc = new DOMParser().parseFromString(textHtml, "text/html");
                        return doc.body.innerHTML.trim();
                    } else {
                        // const response = /<body.*?>([\s\S]*)<\/body>/.exec(textHtml)[1];
                        // return !!response = response : `<div>INVALID HTML CONTENT: "${ostring.call(textHtml)}"</div>`;
                        return textHtml.trim();
                    }
                }
            } catch (err) {
                console.error(`${vname} v${v}: html.bodyContent() raise error.`, err);
            }
            return `<div>INVALID HTML CONTENT: "${ostring.call(textHtml)}"</div>`;
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
            isAsyncFunction: isAsyncFunction,
            isCallable: isCallable,
            isArray: isArray,
            isObject: isObject,
            isString: isString,
            isNumber: isNumber,
            isDate: isDate,
            isHTMLElement: isHTMLElement,
            isHTMLElementBody: isHTMLElementBody,
            isUrl: isUrl,
            isView: isView,
            isVUID: isVUID,
            toVUID: toVUID,
            parseVUID: parseVUID,
            each: each,
            eachReverse: eachReverse,
            eachProp: eachProp,
            sizeOf: sizeOf,
            get: getDeep,
            uuid: uuid,
            argsSolve: argsSolve,
            argsSolveMultiple: argsSolveMultiple,
            sleep: sleep,
            // timestamp
            timestamp: timestamp,
            timestampUnix: timestampUnix,
            // arrays
            sortAsc: sortAsc,
            sortDesc: sortDesc,
            map: map,
            // conversion
            mdToHTML: mdToHTML,
        }

    })(vanilla);

    // --------------------------
    //  VANILLA - init
    // --------------------------

    (function init(instance) {

        const _styles = `.vz-hidden {visibility: hidden; display:none;} .vz-pointer{cursor:pointer;}`;
        // add styles to dom
        instance.dom.tagAddStyle(_styles);

    })(vanilla);

    // --------------------------
    //  vanilla promise
    // --------------------------

    /**
     * Usage:
     *  await vanilla.ready();
     *  vanilla.ready((vanilla)=>{...});
     * @param callback
     * @returns {Promise<vanilla>} vanilla instance
     */
    vanilla.ready = function vanillaReady(callback) {
        return new Promise((resolve, reject) => {
            if (!!vanilla.__ready__) {
                resolve(vanilla);
                invoke(vanilla, callback, vanilla);
            } else {
                vanilla.dom.ready(() => {
                    if (!vanilla.__ready__) {
                        // module exports
                        if (!context.module) {
                            context.module = {
                                exports: {}
                            };
                            console.debug(`${vname} v${v}: using internal export module.`, context.module);
                        } else {
                            console.debug(`${vname} v${v}: export module inherited from.`, context.module);
                        }

                        vanilla.__ready__ = true;
                        resolve(vanilla);
                        invoke(vanilla, callback, vanilla);
                    } else {
                        resolve(vanilla);
                        invoke(vanilla, callback, vanilla);
                    }
                });
            }
        });
    }

    // --------------------------
    //  vanilla loaded
    // --------------------------

    vanilla.ready().then(() => {
        console.info(`${vname} v${vanilla.version}: loaded!`);
    }).catch((err) => {
        console.error(`${vname} v${v}: Error loading!`, err);
    });

    // --------------------------
    //  exports
    // --------------------------

    context.vanilla = vanilla;
    return context.vanilla;

})();