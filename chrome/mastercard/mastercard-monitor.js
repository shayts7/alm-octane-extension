//(selector generator took from: https://github.com/fczbkk/css-selector-generator)

(function() {
    var CssSelectorGenerator, root,
        indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

    CssSelectorGenerator = (function() {
        CssSelectorGenerator.prototype.default_options = {
            selectors: ['id', 'attribute:data-aid', 'class', 'tag', 'nthchild']
        };

        function CssSelectorGenerator(options) {
            if (options == null) {
                options = {};
            }
            this.options = {};
            this.setOptions(this.default_options);
            this.setOptions(options);
        }

        CssSelectorGenerator.prototype.setOptions = function(options) {
            var key, results, val;
            if (options == null) {
                options = {};
            }
            results = [];
            for (key in options) {
                val = options[key];
                if (this.default_options.hasOwnProperty(key)) {
                    results.push(this.options[key] = val);
                } else {
                    results.push(void 0);
                }
            }
            return results;
        };

        CssSelectorGenerator.prototype.isElement = function(element) {
            return !!((element != null ? element.nodeType : void 0) === 1);
        };

        CssSelectorGenerator.prototype.getParents = function(element) {
            var current_element, result;
            result = [];
            if (this.isElement(element)) {
                current_element = element;
                while (this.isElement(current_element)) {
                    result.push(current_element);
                    current_element = current_element.parentNode;
                }
            }
            return result;
        };

        CssSelectorGenerator.prototype.getTagSelector = function(element) {
            return this.sanitizeItem(element.tagName.toLowerCase());
        };

        CssSelectorGenerator.prototype.sanitizeItem = function(item) {
            var characters;
            characters = (item.split('')).map(function(character) {
                if (character === ':') {
                    return "\\" + (':'.charCodeAt(0).toString(16).toUpperCase()) + " ";
                } else if (/[ !"#$%&'()*+,.\/;<=>?@\[\\\]^`{|}~]/.test(character)) {
                    return "\\" + character;
                } else {
                    return escape(character).replace(/\%/g, '\\');
                }
            });
            return characters.join('');
        };

        CssSelectorGenerator.prototype.getIdSelector = function(element) {
            var id, sanitized_id;
            id = element.getAttribute('id');
            if ((id != null) && (id !== '') && !(/\s/.exec(id)) && !(/^\d/.exec(id))) {
                sanitized_id = "#" + (this.sanitizeItem(id));
                if (element.ownerDocument.querySelectorAll(sanitized_id).length === 1) {
                    return sanitized_id;
                }
            }
            return null;
        };

        CssSelectorGenerator.prototype.getClassSelectors = function(element) {
            var class_string, item, result;
            result = [];
            class_string = element.getAttribute('class');
            if (class_string != null) {
                class_string = class_string.replace(/\s+/g, ' ');
                class_string = class_string.replace(/^\s|\s$/g, '');
                if (class_string !== '') {
                    result = (function() {
                        var k, len, ref, results;
                        ref = class_string.split(/\s+/);
                        results = [];
                        for (k = 0, len = ref.length; k < len; k++) {
                            item = ref[k];
                            results.push("." + (this.sanitizeItem(item)));
                        }
                        return results;
                    }).call(this);
                }
            }
            return result;
        };

        // CssSelectorGenerator.prototype.getAttributeSelectors = function(element) {
        //     var attribute, blacklist, k, len, ref, ref1, result;
        //     result = [];
        //     blacklist = ['id', 'class'];
        //     ref = element.attributes;
        //     for (k = 0, len = ref.length; k < len; k++) {
        //         attribute = ref[k];
        //         if (ref1 = attribute.nodeName, indexOf.call(blacklist, ref1) < 0) {
        //             result.push("[" + attribute.nodeName + "=" + attribute.nodeValue + "]");
        //         }
        //     }
        //     return result;
        // };

        CssSelectorGenerator.prototype.getAttributeSelectors = function(element, name) {
            var attribute, blacklist, k, len, ref, ref1, result;
            result = [];
            ref = element.attributes;
            for (k = 0, len = ref.length; k < len; k++) {
                if (ref[k].nodeName === name) {
                    result.push("[" + ref[k].nodeName + "=\"" + ref[k].nodeValue + "\"]");
                    if (ref[k].nodeValue.indexOf(' ') > -1) {
                        console.log('>>>> Hey, there is a space in data-aid: ' + ref[k].nodeValue);
                    }
                }
            }
            return result;
        };


        CssSelectorGenerator.prototype.getNthChildSelector = function(element) {
            var counter, k, len, parent_element, sibling, siblings;
            parent_element = element.parentNode;
            if (parent_element != null) {
                counter = 0;
                siblings = parent_element.childNodes;
                for (k = 0, len = siblings.length; k < len; k++) {
                    sibling = siblings[k];
                    if (this.isElement(sibling)) {
                        counter++;
                        if (sibling === element) {
                            return ":nth-child(" + counter + ")";
                        }
                    }
                }
            }
            return null;
        };

        CssSelectorGenerator.prototype.testSelector = function(element, selector) {
            var is_unique, result;
            is_unique = false;
            if ((selector != null) && selector !== '') {
                result = element.ownerDocument.querySelectorAll(selector);
                if (result.length === 1 && result[0] === element) {
                    is_unique = true;
                }
            }
            return is_unique;
        };

        CssSelectorGenerator.prototype.getAllSelectors = function(element) {
            var result;
            result = {
                t: null,
                i: null,
                c: null,
                a: null,
                n: null
            };
            if (indexOf.call(this.options.selectors, 'tag') >= 0) {
                result.t = this.getTagSelector(element);
            }
            if (indexOf.call(this.options.selectors, 'id') >= 0) {
                result.i = this.getIdSelector(element);
            }
            if (indexOf.call(this.options.selectors, 'class') >= 0) {
                result.c = this.getClassSelectors(element);
            }
            // if (indexOf.call(this.options.selectors, 'attribute') >= 0) {
            //     result.a = this.getAttributeSelectors(element);
            // }
            var attrName = this.fetchAttributeName();
            if (attrName) {
                result.a = this.getAttributeSelectors(element, attrName);
            }
            if (indexOf.call(this.options.selectors, 'nthchild') >= 0) {
                result.n = this.getNthChildSelector(element);
            }
            return result;
        };

        CssSelectorGenerator.prototype.fetchAttributeName = function() {
            var result = '';
            for (s = 0; s < this.options.selectors.length; s++) {
                if (this.options.selectors[s].startsWith("attribute")) {
                    var parts = this.options.selectors[s].split(':');
                    if (parts !== null && parts.length == 2) {
                        result = parts[1];
                        break;
                    }
                }
            }
            return result;
        }


        CssSelectorGenerator.prototype.testUniqueness = function(element, selector) {
            var found_elements, parent;
            parent = element.parentNode;
            found_elements = parent.querySelectorAll(selector);
            return found_elements.length === 1 && found_elements[0] === element;
        };

        CssSelectorGenerator.prototype.testCombinations = function(element, items, tag) {
            var item, k, l, len, len1, ref, ref1;
            ref = this.getCombinations(items);
            for (k = 0, len = ref.length; k < len; k++) {
                item = ref[k];
                if (this.testUniqueness(element, item)) {
                    return item;
                }
            }
            if (tag != null) {
                ref1 = items.map(function(item) {
                    return tag + item;
                });
                for (l = 0, len1 = ref1.length; l < len1; l++) {
                    item = ref1[l];
                    if (this.testUniqueness(element, item)) {
                        return item;
                    }
                }
            }
            return null;
        };

        CssSelectorGenerator.prototype.getUniqueSelector = function(element) {
            var found_selector, k, len, ref, selector_type, selectors;
            selectors = this.getAllSelectors(element);
            ref = this.options.selectors;
            for (k = 0, len = ref.length; k < len; k++) {
                selector_type = ref[k];
                if (selector_type.startsWith('attribute')) {
                    if ((selectors.a != null) && selectors.a.length !== 0) {
                        found_selector = this.testCombinations(element, selectors.a, selectors.t);
                        if (found_selector) {
                            return found_selector;
                        }
                    }
                } else {
                    switch (selector_type) {
                        case 'id':
                            if (selectors.i != null) {
                                return selectors.i;
                            }
                            break;
                        case 'tag':
                            if (selectors.t != null) {
                                if (this.testUniqueness(element, selectors.t)) {
                                    return selectors.t;
                                }
                            }
                            break;
                        case 'class':
                            if ((selectors.c != null) && selectors.c.length !== 0) {
                                found_selector = this.testCombinations(element, selectors.c, selectors.t);
                                if (found_selector) {
                                    return found_selector;
                                }
                            }
                            break;
                        // case 'attribute':
                        //     if ((selectors.a != null) && selectors.a.length !== 0) {
                        //         found_selector = this.testCombinations(element, selectors.a, selectors.t);
                        //         if (found_selector) {
                        //             return found_selector;
                        //         }
                        //     }
                        //     break;
                        case 'nthchild':
                            if (selectors.n != null) {
                                return selectors.n;
                            }
                    }
                }
            }
            return '*';
        };

        CssSelectorGenerator.prototype.getSelector = function(element) {
            var MINIMAL_SELECTOR_CHAIN_LENGTH = 5;
            var all_selectors, item, k, l, len, len1, parents, result, selector, selectors;
            all_selectors = [];
            parents = this.getParents(element);
            for (k = 0, len = parents.length; k < len; k++) {
                item = parents[k];
                selector = this.getUniqueSelector(item);
                if (selector != null) {
                    all_selectors.push(selector);
                }
            }
            selectors = [];
            for (l = 0, len1 = all_selectors.length; l < len1; l++) {
                item = all_selectors[l];
                selectors.unshift(item);
                result = selectors.join(' > ');
                if (this.testSelector(element, result)) {
                    if (selectors.length == MINIMAL_SELECTOR_CHAIN_LENGTH || selectors.length == all_selectors.length) {
                        return result;
                    }
                }
            }
            return null;
        };

        CssSelectorGenerator.prototype.getCombinations = function(items) {
            var i, j, k, l, ref, ref1, result;
            if (items == null) {
                items = [];
            }
            result = [
                []
            ];
            for (i = k = 0, ref = items.length - 1; 0 <= ref ? k <= ref : k >= ref; i = 0 <= ref ? ++k : --k) {
                for (j = l = 0, ref1 = result.length - 1; 0 <= ref1 ? l <= ref1 : l >= ref1; j = 0 <= ref1 ? ++l : --l) {
                    result.push(result[j].concat(items[i]));
                }
            }
            result.shift();
            result = result.sort(function(a, b) {
                return a.length - b.length;
            });
            result = result.map(function(item) {
                return item.join('');
            });
            return result;
        };

        return CssSelectorGenerator;

    })();

    if (typeof define !== "undefined" && define !== null ? define.amd : void 0) {
        define([], function() {
            return CssSelectorGenerator;
        });
    } else {
        root = typeof exports !== "undefined" && exports !== null ? exports : this;
        root.CssSelectorGenerator = CssSelectorGenerator;
    }

}).call(this);

function sendDataToBdi(data) {
    //check TOKEN - if undefined, set to empty string in order to not if/else later
    if (typeof TOKEN === 'undefined') {
        TOKEN = ''
    }
    var img = document.createElement("img");
    img.src = 'http://35.157.160.56:8080/rest-service/api/browser_eventX/data-in?data=' + encodeURIComponent(data) + '&context=prod&loc=' + encodeURIComponent(JSON.stringify(window.location));
    img.style = 'width:1px;height:1px;visibility:hidden';
    console.log('Sending data to BDI: ' + img.src);
}

var sheet = (function() {
    // Create the <style> tag
    var style = document.createElement("style");

    // Add a media (and/or media query) here if you'd like!
    // style.setAttribute("media", "screen")
    // style.setAttribute("media", "only screen and (max-width : 1024px)")

    // WebKit hack :(
    style.appendChild(document.createTextNode(""));

    // Add the <style> element to the page
    document.head.appendChild(style);

    return style.sheet;
})();

// first, create instance of the object with default options
my_selector_generator = new CssSelectorGenerator;

// track every click
document.body.addEventListener('click', function(event) {
    // get reference to the element user clicked on
    var element = event.target;
    // get unique CSS selector for that element
    var selector = my_selector_generator.getSelector(element);
    // do whatever you need to do with that selector
    console.log('selector', selector);
    alert(selector);
    sendDataToBdi(selector);
    //sheet.insertRule(selector + "{ background: #ffff66 none !important; outline: 1px solid #ffff66; }", 0);
}, true);

/*function onClick(evt) {

 //alert("Hello World!");
 alert(event.type);
 alert(evt.type);
 } */