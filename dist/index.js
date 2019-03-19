(function () {
    'use strict';

    /* proxy-compat-disable */

    /*
     * Copyright (c) 2018, salesforce.com, inc.
     * All rights reserved.
     * SPDX-License-Identifier: MIT
     * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
     */
    const {
      freeze,
      seal,
      keys,
      create,
      assign,
      defineProperty,
      getPrototypeOf,
      setPrototypeOf,
      getOwnPropertyDescriptor,
      getOwnPropertyNames,
      defineProperties,
      getOwnPropertySymbols,
      hasOwnProperty,
      preventExtensions,
      isExtensible
    } = Object;
    const {
      isArray
    } = Array;
    const {
      concat: ArrayConcat,
      filter: ArrayFilter,
      slice: ArraySlice,
      splice: ArraySplice,
      unshift: ArrayUnshift,
      indexOf: ArrayIndexOf,
      push: ArrayPush,
      map: ArrayMap,
      join: ArrayJoin,
      forEach,
      reduce: ArrayReduce,
      reverse: ArrayReverse
    } = Array.prototype;
    const {
      replace: StringReplace,
      toLowerCase: StringToLowerCase,
      indexOf: StringIndexOf,
      charCodeAt: StringCharCodeAt,
      slice: StringSlice,
      split: StringSplit
    } = String.prototype;

    function isUndefined(obj) {
      return obj === undefined;
    }

    function isNull(obj) {
      return obj === null;
    }

    function isTrue(obj) {
      return obj === true;
    }

    function isFalse(obj) {
      return obj === false;
    }

    function isFunction(obj) {
      return typeof obj === 'function';
    }

    function isObject(obj) {
      return typeof obj === 'object';
    }

    function isString(obj) {
      return typeof obj === 'string';
    }

    const OtS = {}.toString;

    function toString(obj) {
      if (obj && obj.toString) {
        return obj.toString();
      } else if (typeof obj === 'object') {
        return OtS.call(obj);
      } else {
        return obj + '';
      }
    }

    function getPropertyDescriptor(o, p) {
      do {
        const d = getOwnPropertyDescriptor(o, p);

        if (!isUndefined(d)) {
          return d;
        }

        o = getPrototypeOf(o);
      } while (o !== null);
    }

    const emptyString = '';
    /*
     * Copyright (c) 2018, salesforce.com, inc.
     * All rights reserved.
     * SPDX-License-Identifier: MIT
     * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
     */

    const {
      hasAttribute,
      getAttribute,
      getAttributeNS,
      setAttribute,
      setAttributeNS,
      removeAttribute,
      removeAttributeNS,
      querySelector,
      querySelectorAll,
      getBoundingClientRect,
      getElementsByTagName,
      getElementsByClassName,
      getElementsByTagNameNS
    } = Element.prototype;
    let {
      addEventListener,
      removeEventListener
    } = Element.prototype;
    /**
     * This trick to try to pick up the __lwcOriginal__ out of the intrinsic is to please
     * jsdom, who usually reuse intrinsic between different document.
     */
    // @ts-ignore jsdom

    addEventListener = addEventListener.__lwcOriginal__ || addEventListener; // @ts-ignore jsdom

    removeEventListener = removeEventListener.__lwcOriginal__ || removeEventListener;
    const innerHTMLSetter = hasOwnProperty.call(Element.prototype, 'innerHTML') ? getOwnPropertyDescriptor(Element.prototype, 'innerHTML').set : getOwnPropertyDescriptor(HTMLElement.prototype, 'innerHTML').set; // IE11

    const tagNameGetter = getOwnPropertyDescriptor(Element.prototype, 'tagName').get;
    const tabIndexGetter = getOwnPropertyDescriptor(HTMLElement.prototype, 'tabIndex').get;
    const matches = hasOwnProperty.call(Element.prototype, 'matches') ? Element.prototype.matches : Element.prototype.msMatchesSelector; // IE11

    const childrenGetter = hasOwnProperty.call(Element.prototype, 'children') ? getOwnPropertyDescriptor(Element.prototype, 'children').get : getOwnPropertyDescriptor(HTMLElement.prototype, 'children').get; // IE11

    /*
     * Copyright (c) 2018, salesforce.com, inc.
     * All rights reserved.
     * SPDX-License-Identifier: MIT
     * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
     */

    const {
      DOCUMENT_POSITION_CONTAINED_BY,
      DOCUMENT_POSITION_CONTAINS,
      DOCUMENT_POSITION_PRECEDING,
      DOCUMENT_POSITION_FOLLOWING,
      DOCUMENT_FRAGMENT_NODE
    } = Node;
    const {
      insertBefore,
      removeChild,
      appendChild,
      hasChildNodes,
      replaceChild,
      compareDocumentPosition,
      cloneNode
    } = Node.prototype;
    const parentNodeGetter = getOwnPropertyDescriptor(Node.prototype, 'parentNode').get;
    const parentElementGetter = hasOwnProperty.call(Node.prototype, 'parentElement') ? getOwnPropertyDescriptor(Node.prototype, 'parentElement').get : getOwnPropertyDescriptor(HTMLElement.prototype, 'parentElement').get; // IE11

    const textContextSetter = getOwnPropertyDescriptor(Node.prototype, 'textContent').set;
    const childNodesGetter = hasOwnProperty.call(Node.prototype, 'childNodes') ? getOwnPropertyDescriptor(Node.prototype, 'childNodes').get : getOwnPropertyDescriptor(HTMLElement.prototype, 'childNodes').get; // IE11

    const nodeValueDescriptor = getOwnPropertyDescriptor(Node.prototype, 'nodeValue');
    const nodeValueSetter = nodeValueDescriptor.set;
    const nodeValueGetter = nodeValueDescriptor.get;
    const isConnected = hasOwnProperty.call(Node.prototype, 'isConnected') ? getOwnPropertyDescriptor(Node.prototype, 'isConnected').get : function () {
      // IE11
      return (compareDocumentPosition.call(document, this) & DOCUMENT_POSITION_CONTAINED_BY) !== 0;
    };
    /*
     * Copyright (c) 2018, salesforce.com, inc.
     * All rights reserved.
     * SPDX-License-Identifier: MIT
     * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
     */

    const ShadowRootHostGetter = typeof window.ShadowRoot !== 'undefined' ? getOwnPropertyDescriptor(window.ShadowRoot.prototype, 'host').get : () => {
      throw new Error('Internal Error: Missing ShadowRoot');
    };
    const ShadowRootInnerHTMLSetter = typeof window.ShadowRoot !== 'undefined' ? getOwnPropertyDescriptor(window.ShadowRoot.prototype, 'innerHTML').set : () => {
      throw new Error('Internal Error: Missing ShadowRoot');
    };
    const dispatchEvent = 'EventTarget' in window ? EventTarget.prototype.dispatchEvent : Node.prototype.dispatchEvent; // IE11

    const isNativeShadowRootAvailable = typeof window.ShadowRoot !== 'undefined';
    const iFrameContentWindowGetter = getOwnPropertyDescriptor(HTMLIFrameElement.prototype, 'contentWindow').get;
    const eventTargetGetter = getOwnPropertyDescriptor(Event.prototype, 'target').get;
    const eventCurrentTargetGetter = getOwnPropertyDescriptor(Event.prototype, 'currentTarget').get;
    const focusEventRelatedTargetGetter = getOwnPropertyDescriptor(FocusEvent.prototype, 'relatedTarget').get;
    /*
     * Copyright (c) 2018, salesforce.com, inc.
     * All rights reserved.
     * SPDX-License-Identifier: MIT
     * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
     */

    /**
     * In IE11, symbols are expensive.
     * Due to the nature of the symbol polyfill. This method abstract the
     * creation of symbols, so we can fallback to string when native symbols
     * are not supported. Note that we can't use typeof since it will fail when transpiling.
     */

    const hasNativeSymbolsSupport = Symbol('x').toString() === 'Symbol(x)';

    function createFieldName(key) {
      // @ts-ignore: using a string as a symbol for perf reasons
      return hasNativeSymbolsSupport ? Symbol(key) : `$$lwc-${key}$$`;
    }

    function setInternalField(o, fieldName, value) {
      // TODO: improve this to use  or a WeakMap
      defineProperty(o, fieldName, {
        value
      });
    }

    function getInternalField(o, fieldName) {
      return o[fieldName];
    }
    /**
     * Store fields that should be hidden from outside world
     * hiddenFieldsMap is a WeakMap.
     * It stores a hash of any given objects associative relationships.
     * The hash uses the fieldName as the key, the value represents the other end of the association.
     *
     * For example, if the association is
     *              ViewModel
     * Component-A --------------> VM-1
     * then,
     * hiddenFieldsMap : (Component-A, { Symbol(ViewModel) : VM-1 })
     *
     */


    const hiddenFieldsMap = new WeakMap();
    const setHiddenField = hasNativeSymbolsSupport ? (o, fieldName, value) => {
      let valuesByField = hiddenFieldsMap.get(o);

      if (isUndefined(valuesByField)) {
        valuesByField = create(null);
        hiddenFieldsMap.set(o, valuesByField);
      }

      valuesByField[fieldName] = value;
    } : setInternalField; // Fall back to symbol based approach in compat mode

    const getHiddenField = hasNativeSymbolsSupport ? (o, fieldName) => {
      const valuesByField = hiddenFieldsMap.get(o);
      return !isUndefined(valuesByField) && valuesByField[fieldName];
    } : getInternalField; // Fall back to symbol based approach in compat mode

    /*
     * Copyright (c) 2018, salesforce.com, inc.
     * All rights reserved.
     * SPDX-License-Identifier: MIT
     * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
     */

    function detect(propName) {
      return Object.getOwnPropertyDescriptor(Element.prototype, propName) === undefined;
    }
    /*
     * Copyright (c) 2018, salesforce.com, inc.
     * All rights reserved.
     * SPDX-License-Identifier: MIT
     * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
     */
    // this regular expression is used to transform aria props into aria attributes because
    // that doesn't follow the regular transformation process. e.g.: `aria-labeledby` <=> `ariaLabelBy`


    const ARIA_REGEX = /^aria/;
    const nodeToAriaPropertyValuesMap = new WeakMap();
    const {
      hasOwnProperty: hasOwnProperty$1
    } = Object.prototype;
    const {
      replace: StringReplace$1,
      toLowerCase: StringToLowerCase$1
    } = String.prototype;

    function getAriaPropertyMap(elm) {
      let map = nodeToAriaPropertyValuesMap.get(elm);

      if (map === undefined) {
        map = {};
        nodeToAriaPropertyValuesMap.set(elm, map);
      }

      return map;
    }

    function getNormalizedAriaPropertyValue(value) {
      return value == null ? null : value + '';
    }

    function createAriaPropertyPropertyDescriptor(propName, attrName) {
      return {
        get() {
          const map = getAriaPropertyMap(this);

          if (hasOwnProperty$1.call(map, propName)) {
            return map[propName];
          } // otherwise just reflect what's in the attribute


          return hasAttribute.call(this, attrName) ? getAttribute.call(this, attrName) : null;
        },

        set(newValue) {
          const normalizedValue = getNormalizedAriaPropertyValue(newValue);
          const map = getAriaPropertyMap(this);
          map[propName] = normalizedValue; // reflect into the corresponding attribute

          if (newValue === null) {
            removeAttribute.call(this, attrName);
          } else {
            setAttribute.call(this, attrName, newValue);
          }
        },

        configurable: true,
        enumerable: true
      };
    }

    function patch(propName) {
      // Typescript is inferring the wrong function type for this particular
      // overloaded method: https://github.com/Microsoft/TypeScript/issues/27972
      // @ts-ignore type-mismatch
      const replaced = StringReplace$1.call(propName, ARIA_REGEX, 'aria-');
      const attrName = StringToLowerCase$1.call(replaced);
      const descriptor = createAriaPropertyPropertyDescriptor(propName, attrName);
      Object.defineProperty(Element.prototype, propName, descriptor);
    }
    /*
     * Copyright (c) 2018, salesforce.com, inc.
     * All rights reserved.
     * SPDX-License-Identifier: MIT
     * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
     */
    // Global Aria and Role Properties derived from ARIA and Role Attributes.
    // https://wicg.github.io/aom/spec/aria-reflection.html


    const ElementPrototypeAriaPropertyNames = ['ariaAutoComplete', 'ariaChecked', 'ariaCurrent', 'ariaDisabled', 'ariaExpanded', 'ariaHasPopup', 'ariaHidden', 'ariaInvalid', 'ariaLabel', 'ariaLevel', 'ariaMultiLine', 'ariaMultiSelectable', 'ariaOrientation', 'ariaPressed', 'ariaReadOnly', 'ariaRequired', 'ariaSelected', 'ariaSort', 'ariaValueMax', 'ariaValueMin', 'ariaValueNow', 'ariaValueText', 'ariaLive', 'ariaRelevant', 'ariaAtomic', 'ariaBusy', 'ariaActiveDescendant', 'ariaControls', 'ariaDescribedBy', 'ariaFlowTo', 'ariaLabelledBy', 'ariaOwns', 'ariaPosInSet', 'ariaSetSize', 'ariaColCount', 'ariaColIndex', 'ariaDetails', 'ariaErrorMessage', 'ariaKeyShortcuts', 'ariaModal', 'ariaPlaceholder', 'ariaRoleDescription', 'ariaRowCount', 'ariaRowIndex', 'ariaRowSpan', 'ariaColSpan', 'role'];
    /**
     * Note: Attributes aria-dropeffect and aria-grabbed were deprecated in
     * ARIA 1.1 and do not have corresponding IDL attributes.
     */

    for (let i = 0, len = ElementPrototypeAriaPropertyNames.length; i < len; i += 1) {
      const propName = ElementPrototypeAriaPropertyNames[i];

      if (detect(propName)) {
        patch(propName);
      }
    }
    /*
     * Copyright (c) 2018, salesforce.com, inc.
     * All rights reserved.
     * SPDX-License-Identifier: MIT
     * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
     */
    // These properties get added to LWCElement.prototype publicProps automatically


    const defaultDefHTMLPropertyNames = ['dir', 'id', 'accessKey', 'title', 'lang', 'hidden', 'draggable', 'tabIndex']; // Few more exceptions that are using the attribute name to match the property in lowercase.
    // this list was compiled from https://msdn.microsoft.com/en-us/library/ms533062(v=vs.85).aspx
    // and https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes
    // Note: this list most be in sync with the compiler as well.

    const HTMLPropertyNamesWithLowercasedReflectiveAttributes = ['accessKey', 'readOnly', 'tabIndex', 'bgColor', 'colSpan', 'rowSpan', 'contentEditable', 'dateTime', 'formAction', 'isMap', 'maxLength', 'useMap'];
    // https://developer.mozilla.org/en-US/docs/Web/API/Element
    // TODO: complete this list with Node properties
    // https://developer.mozilla.org/en-US/docs/Web/API/Node


    const AttrNameToPropNameMap = create(null);
    const PropNameToAttrNameMap = create(null); // Synthetic creation of all AOM property descriptors for Custom Elements

    forEach.call(ElementPrototypeAriaPropertyNames, propName => {
      // Typescript is inferring the wrong function type for this particular
      // overloaded method: https://github.com/Microsoft/TypeScript/issues/27972
      // @ts-ignore type-mismatch
      const attrName = StringToLowerCase.call(StringReplace.call(propName, /^aria/, 'aria-'));
      AttrNameToPropNameMap[attrName] = propName;
      PropNameToAttrNameMap[propName] = attrName;
    });
    forEach.call(defaultDefHTMLPropertyNames, propName => {
      const attrName = StringToLowerCase.call(propName);
      AttrNameToPropNameMap[attrName] = propName;
      PropNameToAttrNameMap[propName] = attrName;
    });
    forEach.call(HTMLPropertyNamesWithLowercasedReflectiveAttributes, propName => {
      const attrName = StringToLowerCase.call(propName);
      AttrNameToPropNameMap[attrName] = propName;
      PropNameToAttrNameMap[propName] = attrName;
    });

    const CAPS_REGEX = /[A-Z]/g;
    /**
     * This method maps between property names
     * and the corresponding attribute name.
     */

    function getAttrNameFromPropName(propName) {
      if (isUndefined(PropNameToAttrNameMap[propName])) {
        PropNameToAttrNameMap[propName] = StringReplace.call(propName, CAPS_REGEX, match => '-' + match.toLowerCase());
      }

      return PropNameToAttrNameMap[propName];
    }
    /*
     * Copyright (c) 2018, salesforce.com, inc.
     * All rights reserved.
     * SPDX-License-Identifier: MIT
     * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
     */


    let nextTickCallbackQueue = [];
    const SPACE_CHAR = 32;
    const EmptyObject = seal(create(null));
    const EmptyArray = seal([]);
    const ViewModelReflection = createFieldName('ViewModel');

    function flushCallbackQueue() {

      const callbacks = nextTickCallbackQueue;
      nextTickCallbackQueue = []; // reset to a new queue

      for (let i = 0, len = callbacks.length; i < len; i += 1) {
        callbacks[i]();
      }
    }

    function addCallbackToNextTick(callback) {

      if (nextTickCallbackQueue.length === 0) {
        Promise.resolve().then(flushCallbackQueue);
      } // TODO: eventually, we might want to have priority when inserting callbacks


      ArrayPush.call(nextTickCallbackQueue, callback);
    }

    function isCircularModuleDependency(value) {
      return hasOwnProperty.call(value, '__circular__');
    }
    /**
     * When LWC is used in the context of an Aura application, the compiler produces AMD
     * modules, that doesn't resolve properly circular dependencies between modules. In order
     * to circumvent this issue, the module loader returns a factory with a symbol attached
     * to it.
     *
     * This method returns the resolved value if it received a factory as argument. Otherwise
     * it returns the original value.
     */


    function resolveCircularModuleDependency(fn) {

      return fn();
    }
    /*
     * Copyright (c) 2018, salesforce.com, inc.
     * All rights reserved.
     * SPDX-License-Identifier: MIT
     * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
     */


    function handleEvent(event, vnode) {
      const {
        type
      } = event;
      const {
        data: {
          on
        }
      } = vnode;
      const handler = on && on[type]; // call event handler if exists

      if (handler) {
        handler.call(undefined, event);
      }
    }

    function createListener() {
      return function handler(event) {
        handleEvent(event, handler.vnode);
      };
    }

    function updateAllEventListeners(oldVnode, vnode) {
      if (isUndefined(oldVnode.listener)) {
        createAllEventListeners(vnode);
      } else {
        vnode.listener = oldVnode.listener;
        vnode.listener.vnode = vnode;
      }
    }

    function createAllEventListeners(vnode) {
      const {
        data: {
          on
        }
      } = vnode;

      if (isUndefined(on)) {
        return;
      }

      const elm = vnode.elm;
      const listener = vnode.listener = createListener();
      listener.vnode = vnode;
      let name;

      for (name in on) {
        elm.addEventListener(name, listener);
      }
    }

    var modEvents = {
      update: updateAllEventListeners,
      create: createAllEventListeners
    };
    /*
     * Copyright (c) 2018, salesforce.com, inc.
     * All rights reserved.
     * SPDX-License-Identifier: MIT
     * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
     */

    const xlinkNS = 'http://www.w3.org/1999/xlink';
    const xmlNS = 'http://www.w3.org/XML/1998/namespace';
    const ColonCharCode = 58;

    function updateAttrs(oldVnode, vnode) {
      const {
        data: {
          attrs
        }
      } = vnode;

      if (isUndefined(attrs)) {
        return;
      }

      let {
        data: {
          attrs: oldAttrs
        }
      } = oldVnode;

      if (oldAttrs === attrs) {
        return;
      }

      const elm = vnode.elm;
      let key;
      oldAttrs = isUndefined(oldAttrs) ? EmptyObject : oldAttrs; // update modified attributes, add new attributes
      // this routine is only useful for data-* attributes in all kind of elements
      // and aria-* in standard elements (custom elements will use props for these)

      for (key in attrs) {
        const cur = attrs[key];
        const old = oldAttrs[key];

        if (old !== cur) {

          if (StringCharCodeAt.call(key, 3) === ColonCharCode) {
            // Assume xml namespace
            elm.setAttributeNS(xmlNS, key, cur);
          } else if (StringCharCodeAt.call(key, 5) === ColonCharCode) {
            // Assume xlink namespace
            elm.setAttributeNS(xlinkNS, key, cur);
          } else if (isNull(cur)) {
            elm.removeAttribute(key);
          } else {
            elm.setAttribute(key, cur);
          }
        }
      }
    }

    const emptyVNode = {
      data: {}
    };
    var modAttrs = {
      create: vnode => updateAttrs(emptyVNode, vnode),
      update: updateAttrs
    };
    /*
     * Copyright (c) 2018, salesforce.com, inc.
     * All rights reserved.
     * SPDX-License-Identifier: MIT
     * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
     */

    const TargetToReactiveRecordMap = new WeakMap();

    function notifyMutation(target, key) {

      const reactiveRecord = TargetToReactiveRecordMap.get(target);

      if (!isUndefined(reactiveRecord)) {
        const value = reactiveRecord[key];

        if (value) {
          const len = value.length;

          for (let i = 0; i < len; i += 1) {
            const vm = value[i];

            if (isFalse(vm.isDirty)) {
              markComponentAsDirty(vm);
              scheduleRehydration(vm);
            }
          }
        }
      }
    }

    function observeMutation(target, key) {
      if (isNull(vmBeingRendered)) {
        return; // nothing to subscribe to
      }

      const vm = vmBeingRendered;
      let reactiveRecord = TargetToReactiveRecordMap.get(target);

      if (isUndefined(reactiveRecord)) {
        const newRecord = create(null);
        reactiveRecord = newRecord;
        TargetToReactiveRecordMap.set(target, newRecord);
      }

      let value = reactiveRecord[key];

      if (isUndefined(value)) {
        value = [];
        reactiveRecord[key] = value;
      } else if (value[0] === vm) {
        return; // perf optimization considering that most subscriptions will come from the same vm
      }

      if (ArrayIndexOf.call(value, vm) === -1) {
        ArrayPush.call(value, vm); // we keep track of the sets that vm is listening from to be able to do some clean up later on

        ArrayPush.call(vm.deps, value);
      }
    }
    /**
     * Copyright (C) 2017 salesforce.com, inc.
     */


    const {
      isArray: isArray$1
    } = Array;
    const {
      getPrototypeOf: getPrototypeOf$1,
      create: ObjectCreate,
      defineProperty: ObjectDefineProperty,
      defineProperties: ObjectDefineProperties,
      isExtensible: isExtensible$1,
      getOwnPropertyDescriptor: getOwnPropertyDescriptor$1,
      getOwnPropertyNames: getOwnPropertyNames$1,
      getOwnPropertySymbols: getOwnPropertySymbols$1,
      preventExtensions: preventExtensions$1,
      hasOwnProperty: hasOwnProperty$2
    } = Object;
    const {
      push: ArrayPush$1,
      concat: ArrayConcat$1,
      map: ArrayMap$1
    } = Array.prototype;

    function isUndefined$1(obj) {
      return obj === undefined;
    }

    function isFunction$1(obj) {
      return typeof obj === 'function';
    }

    const TargetSlot = Symbol(); // TODO: we are using a funky and leaky abstraction here to try to identify if
    // the proxy is a compat proxy, and define the unwrap method accordingly.
    // @ts-ignore

    const {
      getKey
    } = Proxy;
    const unwrap = getKey ? replicaOrAny => replicaOrAny && getKey(replicaOrAny, TargetSlot) || replicaOrAny : replicaOrAny => replicaOrAny && replicaOrAny[TargetSlot] || replicaOrAny;

    function isObject$1(obj) {
      return typeof obj === 'object';
    }

    function wrapValue(membrane, value) {
      return membrane.valueIsObservable(value) ? membrane.getProxy(value) : value;
    } // Unwrap property descriptors
    // We only need to unwrap if value is specified


    function unwrapDescriptor(descriptor) {
      if (hasOwnProperty$2.call(descriptor, 'value')) {
        descriptor.value = unwrap(descriptor.value);
      }

      return descriptor;
    }

    function lockShadowTarget(membrane, shadowTarget, originalTarget) {
      const targetKeys = ArrayConcat$1.call(getOwnPropertyNames$1(originalTarget), getOwnPropertySymbols$1(originalTarget));
      targetKeys.forEach(key => {
        let descriptor = getOwnPropertyDescriptor$1(originalTarget, key); // We do not need to wrap the descriptor if configurable
        // Because we can deal with wrapping it when user goes through
        // Get own property descriptor. There is also a chance that this descriptor
        // could change sometime in the future, so we can defer wrapping
        // until we need to

        if (!descriptor.configurable) {
          descriptor = wrapDescriptor(membrane, descriptor, wrapValue);
        }

        ObjectDefineProperty(shadowTarget, key, descriptor);
      });
      preventExtensions$1(shadowTarget);
    }

    class ReactiveProxyHandler {
      constructor(membrane, value) {
        this.originalTarget = value;
        this.membrane = membrane;
      }

      get(shadowTarget, key) {
        const {
          originalTarget,
          membrane
        } = this;

        if (key === TargetSlot) {
          return originalTarget;
        }

        const value = originalTarget[key];
        const {
          valueObserved
        } = membrane;
        valueObserved(originalTarget, key);
        return membrane.getProxy(value);
      }

      set(shadowTarget, key, value) {
        const {
          originalTarget,
          membrane: {
            valueMutated
          }
        } = this;
        const oldValue = originalTarget[key];

        if (oldValue !== value) {
          originalTarget[key] = value;
          valueMutated(originalTarget, key);
        } else if (key === 'length' && isArray$1(originalTarget)) {
          // fix for issue #236: push will add the new index, and by the time length
          // is updated, the internal length is already equal to the new length value
          // therefore, the oldValue is equal to the value. This is the forking logic
          // to support this use case.
          valueMutated(originalTarget, key);
        }

        return true;
      }

      deleteProperty(shadowTarget, key) {
        const {
          originalTarget,
          membrane: {
            valueMutated
          }
        } = this;
        delete originalTarget[key];
        valueMutated(originalTarget, key);
        return true;
      }

      apply(shadowTarget, thisArg, argArray) {
        /* No op */
      }

      construct(target, argArray, newTarget) {
        /* No op */
      }

      has(shadowTarget, key) {
        const {
          originalTarget,
          membrane: {
            valueObserved
          }
        } = this;
        valueObserved(originalTarget, key);
        return key in originalTarget;
      }

      ownKeys(shadowTarget) {
        const {
          originalTarget
        } = this;
        return ArrayConcat$1.call(getOwnPropertyNames$1(originalTarget), getOwnPropertySymbols$1(originalTarget));
      }

      isExtensible(shadowTarget) {
        const shadowIsExtensible = isExtensible$1(shadowTarget);

        if (!shadowIsExtensible) {
          return shadowIsExtensible;
        }

        const {
          originalTarget,
          membrane
        } = this;
        const targetIsExtensible = isExtensible$1(originalTarget);

        if (!targetIsExtensible) {
          lockShadowTarget(membrane, shadowTarget, originalTarget);
        }

        return targetIsExtensible;
      }

      setPrototypeOf(shadowTarget, prototype) {
      }

      getPrototypeOf(shadowTarget) {
        const {
          originalTarget
        } = this;
        return getPrototypeOf$1(originalTarget);
      }

      getOwnPropertyDescriptor(shadowTarget, key) {
        const {
          originalTarget,
          membrane
        } = this;
        const {
          valueObserved
        } = this.membrane; // keys looked up via hasOwnProperty need to be reactive

        valueObserved(originalTarget, key);
        let desc = getOwnPropertyDescriptor$1(originalTarget, key);

        if (isUndefined$1(desc)) {
          return desc;
        }

        const shadowDescriptor = getOwnPropertyDescriptor$1(shadowTarget, key);

        if (!isUndefined$1(shadowDescriptor)) {
          return shadowDescriptor;
        } // Note: by accessing the descriptor, the key is marked as observed
        // but access to the value, setter or getter (if available) cannot observe
        // mutations, just like regular methods, in which case we just do nothing.


        desc = wrapDescriptor(membrane, desc, wrapValue);

        if (!desc.configurable) {
          // If descriptor from original target is not configurable,
          // We must copy the wrapped descriptor over to the shadow target.
          // Otherwise, proxy will throw an invariant error.
          // This is our last chance to lock the value.
          // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy/handler/getOwnPropertyDescriptor#Invariants
          ObjectDefineProperty(shadowTarget, key, desc);
        }

        return desc;
      }

      preventExtensions(shadowTarget) {
        const {
          originalTarget,
          membrane
        } = this;
        lockShadowTarget(membrane, shadowTarget, originalTarget);
        preventExtensions$1(originalTarget);
        return true;
      }

      defineProperty(shadowTarget, key, descriptor) {
        const {
          originalTarget,
          membrane
        } = this;
        const {
          valueMutated
        } = membrane;
        const {
          configurable
        } = descriptor; // We have to check for value in descriptor
        // because Object.freeze(proxy) calls this method
        // with only { configurable: false, writeable: false }
        // Additionally, method will only be called with writeable:false
        // if the descriptor has a value, as opposed to getter/setter
        // So we can just check if writable is present and then see if
        // value is present. This eliminates getter and setter descriptors

        if (hasOwnProperty$2.call(descriptor, 'writable') && !hasOwnProperty$2.call(descriptor, 'value')) {
          const originalDescriptor = getOwnPropertyDescriptor$1(originalTarget, key);
          descriptor.value = originalDescriptor.value;
        }

        ObjectDefineProperty(originalTarget, key, unwrapDescriptor(descriptor));

        if (configurable === false) {
          ObjectDefineProperty(shadowTarget, key, wrapDescriptor(membrane, descriptor, wrapValue));
        }

        valueMutated(originalTarget, key);
        return true;
      }

    }

    function wrapReadOnlyValue(membrane, value) {
      return membrane.valueIsObservable(value) ? membrane.getReadOnlyProxy(value) : value;
    }

    class ReadOnlyHandler {
      constructor(membrane, value) {
        this.originalTarget = value;
        this.membrane = membrane;
      }

      get(shadowTarget, key) {
        const {
          membrane,
          originalTarget
        } = this;

        if (key === TargetSlot) {
          return originalTarget;
        }

        const value = originalTarget[key];
        const {
          valueObserved
        } = membrane;
        valueObserved(originalTarget, key);
        return membrane.getReadOnlyProxy(value);
      }

      set(shadowTarget, key, value) {

        return false;
      }

      deleteProperty(shadowTarget, key) {

        return false;
      }

      apply(shadowTarget, thisArg, argArray) {
        /* No op */
      }

      construct(target, argArray, newTarget) {
        /* No op */
      }

      has(shadowTarget, key) {
        const {
          originalTarget,
          membrane: {
            valueObserved
          }
        } = this;
        valueObserved(originalTarget, key);
        return key in originalTarget;
      }

      ownKeys(shadowTarget) {
        const {
          originalTarget
        } = this;
        return ArrayConcat$1.call(getOwnPropertyNames$1(originalTarget), getOwnPropertySymbols$1(originalTarget));
      }

      setPrototypeOf(shadowTarget, prototype) {
      }

      getOwnPropertyDescriptor(shadowTarget, key) {
        const {
          originalTarget,
          membrane
        } = this;
        const {
          valueObserved
        } = membrane; // keys looked up via hasOwnProperty need to be reactive

        valueObserved(originalTarget, key);
        let desc = getOwnPropertyDescriptor$1(originalTarget, key);

        if (isUndefined$1(desc)) {
          return desc;
        }

        const shadowDescriptor = getOwnPropertyDescriptor$1(shadowTarget, key);

        if (!isUndefined$1(shadowDescriptor)) {
          return shadowDescriptor;
        } // Note: by accessing the descriptor, the key is marked as observed
        // but access to the value or getter (if available) cannot be observed,
        // just like regular methods, in which case we just do nothing.


        desc = wrapDescriptor(membrane, desc, wrapReadOnlyValue);

        if (hasOwnProperty$2.call(desc, 'set')) {
          desc.set = undefined; // readOnly membrane does not allow setters
        }

        if (!desc.configurable) {
          // If descriptor from original target is not configurable,
          // We must copy the wrapped descriptor over to the shadow target.
          // Otherwise, proxy will throw an invariant error.
          // This is our last chance to lock the value.
          // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy/handler/getOwnPropertyDescriptor#Invariants
          ObjectDefineProperty(shadowTarget, key, desc);
        }

        return desc;
      }

      preventExtensions(shadowTarget) {

        return false;
      }

      defineProperty(shadowTarget, key, descriptor) {

        return false;
      }

    }

    function createShadowTarget(value) {
      let shadowTarget = undefined;

      if (isArray$1(value)) {
        shadowTarget = [];
      } else if (isObject$1(value)) {
        shadowTarget = {};
      }

      return shadowTarget;
    }

    const ObjectDotPrototype = Object.prototype;

    function defaultValueIsObservable(value) {
      // intentionally checking for null and undefined
      if (value == null) {
        return false;
      }

      if (isArray$1(value)) {
        return true;
      }

      const proto = getPrototypeOf$1(value);
      return proto === ObjectDotPrototype || proto === null || getPrototypeOf$1(proto) === null;
    }

    const defaultValueObserved = (obj, key) => {
      /* do nothing */
    };

    const defaultValueMutated = (obj, key) => {
      /* do nothing */
    };

    const defaultValueDistortion = value => value;

    function wrapDescriptor(membrane, descriptor, getValue) {
      const {
        set,
        get
      } = descriptor;

      if (hasOwnProperty$2.call(descriptor, 'value')) {
        descriptor.value = getValue(membrane, descriptor.value);
      } else {
        if (!isUndefined$1(get)) {
          descriptor.get = function () {
            // invoking the original getter with the original target
            return getValue(membrane, get.call(unwrap(this)));
          };
        }

        if (!isUndefined$1(set)) {
          descriptor.set = function (value) {
            // At this point we don't have a clear indication of whether
            // or not a valid mutation will occur, we don't have the key,
            // and we are not sure why and how they are invoking this setter.
            // Nevertheless we preserve the original semantics by invoking the
            // original setter with the original target and the unwrapped value
            set.call(unwrap(this), membrane.unwrapProxy(value));
          };
        }
      }

      return descriptor;
    }

    class ReactiveMembrane {
      constructor(options) {
        this.valueDistortion = defaultValueDistortion;
        this.valueMutated = defaultValueMutated;
        this.valueObserved = defaultValueObserved;
        this.valueIsObservable = defaultValueIsObservable;
        this.objectGraph = new WeakMap();

        if (!isUndefined$1(options)) {
          const {
            valueDistortion,
            valueMutated,
            valueObserved,
            valueIsObservable
          } = options;
          this.valueDistortion = isFunction$1(valueDistortion) ? valueDistortion : defaultValueDistortion;
          this.valueMutated = isFunction$1(valueMutated) ? valueMutated : defaultValueMutated;
          this.valueObserved = isFunction$1(valueObserved) ? valueObserved : defaultValueObserved;
          this.valueIsObservable = isFunction$1(valueIsObservable) ? valueIsObservable : defaultValueIsObservable;
        }
      }

      getProxy(value) {
        const distorted = this.valueDistortion(value);

        if (this.valueIsObservable(distorted)) {
          const o = this.getReactiveState(distorted); // when trying to extract the writable version of a readonly
          // we return the readonly.

          return o.readOnly === value ? value : o.reactive;
        }

        return distorted;
      }

      getReadOnlyProxy(value) {
        const distorted = this.valueDistortion(value);

        if (this.valueIsObservable(distorted)) {
          return this.getReactiveState(distorted).readOnly;
        }

        return distorted;
      }

      unwrapProxy(p) {
        return unwrap(p);
      }

      getReactiveState(value) {
        const {
          objectGraph
        } = this;
        value = unwrap(value);
        let reactiveState = objectGraph.get(value);

        if (reactiveState) {
          return reactiveState;
        }

        const membrane = this;
        reactiveState = {
          get reactive() {
            const reactiveHandler = new ReactiveProxyHandler(membrane, value); // caching the reactive proxy after the first time it is accessed

            const proxy = new Proxy(createShadowTarget(value), reactiveHandler);
            ObjectDefineProperty(this, 'reactive', {
              value: proxy
            });
            return proxy;
          },

          get readOnly() {
            const readOnlyHandler = new ReadOnlyHandler(membrane, value); // caching the readOnly proxy after the first time it is accessed

            const proxy = new Proxy(createShadowTarget(value), readOnlyHandler);
            ObjectDefineProperty(this, 'readOnly', {
              value: proxy
            });
            return proxy;
          }

        };
        objectGraph.set(value, reactiveState);
        return reactiveState;
      }

    }
    /** version: 0.25.0 */

    /*
     * Copyright (c) 2018, salesforce.com, inc.
     * All rights reserved.
     * SPDX-License-Identifier: MIT
     * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
     */


    function valueDistortion(value) {
      return value;
    }

    const reactiveMembrane = new ReactiveMembrane({
      valueObserved: observeMutation,
      valueMutated: notifyMutation,
      valueDistortion
    }); // Universal unwrap mechanism that works for observable membrane
    /*
     * Copyright (c) 2018, salesforce.com, inc.
     * All rights reserved.
     * SPDX-License-Identifier: MIT
     * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
     */


    function track(target, prop, descriptor) {
      if (arguments.length === 1) {
        return reactiveMembrane.getProxy(target);
      }

      return createTrackedPropertyDescriptor(target, prop, isUndefined(descriptor) ? true : descriptor.enumerable === true);
    }

    function createTrackedPropertyDescriptor(Ctor, key, enumerable) {
      return {
        get() {
          const vm = getComponentVM(this);

          observeMutation(this, key);
          return vm.cmpTrack[key];
        },

        set(newValue) {
          const vm = getComponentVM(this);

          const reactiveOrAnyValue = reactiveMembrane.getProxy(newValue);

          if (reactiveOrAnyValue !== vm.cmpTrack[key]) {
            vm.cmpTrack[key] = reactiveOrAnyValue;

            if (isFalse(vm.isDirty)) {
              // perf optimization to skip this step if the track property is on a component that is already dirty
              notifyMutation(this, key);
            }
          }
        },

        enumerable,
        configurable: true
      };
    }
    /*
     * Copyright (c) 2018, salesforce.com, inc.
     * All rights reserved.
     * SPDX-License-Identifier: MIT
     * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
     */


    function wireDecorator(target, prop, descriptor) {


      return createTrackedPropertyDescriptor(target, prop, isObject(descriptor) ? descriptor.enumerable === true : true);
    } // @wire is a factory that when invoked, returns the wire decorator


    function wire(_adapter, _config) {
      const len = arguments.length;

      if (len > 0 && len < 3) {
        return wireDecorator;
      } else {

        throw new TypeError();
      }
    }
    /*
     * Copyright (c) 2018, salesforce.com, inc.
     * All rights reserved.
     * SPDX-License-Identifier: MIT
     * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
     */


    function decorate(Ctor, decorators) {
      // intentionally comparing decorators with null and undefined
      if (!isFunction(Ctor) || decorators == null) {
        throw new TypeError();
      }

      const props = getOwnPropertyNames(decorators); // intentionally allowing decoration of classes only for now

      const target = Ctor.prototype;

      for (let i = 0, len = props.length; i < len; i += 1) {
        const propName = props[i];
        const decorator = decorators[propName];

        if (!isFunction(decorator)) {
          throw new TypeError();
        }

        const originalDescriptor = getOwnPropertyDescriptor(target, propName);
        const descriptor = decorator(Ctor, propName, originalDescriptor);

        if (!isUndefined(descriptor)) {
          defineProperty(target, propName, descriptor);
        }
      }

      return Ctor; // chaining
    }
    /*
     * Copyright (c) 2018, salesforce.com, inc.
     * All rights reserved.
     * SPDX-License-Identifier: MIT
     * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
     */


    const signedDecoratorToMetaMap = new Map();

    function registerDecorators(Ctor, meta) {
      const decoratorMap = create(null);
      const props = getPublicPropertiesHash(Ctor, meta.publicProps);
      const methods = getPublicMethodsHash(Ctor, meta.publicMethods);
      const wire$$1 = getWireHash(Ctor, meta.wire);
      const track$$1 = getTrackHash(Ctor, meta.track);
      signedDecoratorToMetaMap.set(Ctor, {
        props,
        methods,
        wire: wire$$1,
        track: track$$1
      });

      for (const propName in props) {
        decoratorMap[propName] = api;
      }

      if (wire$$1) {
        for (const propName in wire$$1) {
          const wireDef = wire$$1[propName];

          if (wireDef.method) {
            // for decorated methods we need to do nothing
            continue;
          }

          decoratorMap[propName] = wire(wireDef.adapter, wireDef.params);
        }
      }

      if (track$$1) {
        for (const propName in track$$1) {
          decoratorMap[propName] = track;
        }
      }

      decorate(Ctor, decoratorMap);
      return Ctor;
    }

    function getDecoratorsRegisteredMeta(Ctor) {
      return signedDecoratorToMetaMap.get(Ctor);
    }

    function getTrackHash(target, track$$1) {
      if (isUndefined(track$$1) || getOwnPropertyNames(track$$1).length === 0) {
        return EmptyObject;
      } // TODO: check that anything in `track` is correctly defined in the prototype


      return assign(create(null), track$$1);
    }

    function getWireHash(target, wire$$1) {
      if (isUndefined(wire$$1) || getOwnPropertyNames(wire$$1).length === 0) {
        return;
      } // TODO: check that anything in `wire` is correctly defined in the prototype


      return assign(create(null), wire$$1);
    }

    function getPublicPropertiesHash(target, props) {
      if (isUndefined(props) || getOwnPropertyNames(props).length === 0) {
        return EmptyObject;
      }

      return getOwnPropertyNames(props).reduce((propsHash, propName) => {
        const attrName = getAttrNameFromPropName(propName);

        propsHash[propName] = assign({
          config: 0,
          type: 'any',
          attr: attrName
        }, props[propName]);
        return propsHash;
      }, create(null));
    }

    function getPublicMethodsHash(target, publicMethods) {
      if (isUndefined(publicMethods) || publicMethods.length === 0) {
        return EmptyObject;
      }

      return publicMethods.reduce((methodsHash, methodName) => {

        methodsHash[methodName] = target.prototype[methodName];
        return methodsHash;
      }, create(null));
    }
    /*
     * Copyright (c) 2018, salesforce.com, inc.
     * All rights reserved.
     * SPDX-License-Identifier: MIT
     * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
     */


    function api(target, propName, descriptor) {

      const meta = getDecoratorsRegisteredMeta(target); // initializing getters and setters for each public prop on the target prototype

      if (isObject(descriptor) && (isFunction(descriptor.get) || isFunction(descriptor.set))) {
        // if it is configured as an accessor it must have a descriptor
        // @ts-ignore it must always be set before calling this method
        meta.props[propName].config = isFunction(descriptor.set) ? 3 : 1;
        return createPublicAccessorDescriptor(target, propName, descriptor);
      } else {
        // @ts-ignore it must always be set before calling this method
        meta.props[propName].config = 0;
        return createPublicPropertyDescriptor(target, propName, descriptor);
      }
    }

    function createPublicPropertyDescriptor(proto, key, descriptor) {
      return {
        get() {
          const vm = getComponentVM(this);

          if (isBeingConstructed(vm)) {

            return;
          }

          observeMutation(this, key);
          return vm.cmpProps[key];
        },

        set(newValue) {
          const vm = getComponentVM(this);

          if (isTrue(vm.isRoot) || isBeingConstructed(vm)) ;
          // not need to wrap or check the value since that is happening somewhere else

          vm.cmpProps[key] = reactiveMembrane.getReadOnlyProxy(newValue); // avoid notification of observability if the instance is already dirty

          if (isFalse(vm.isDirty)) {
            // perf optimization to skip this step if the component is dirty already.
            notifyMutation(this, key);
          }
        },

        enumerable: isUndefined(descriptor) ? true : descriptor.enumerable
      };
    }

    function createPublicAccessorDescriptor(Ctor, key, descriptor) {
      const {
        get,
        set,
        enumerable
      } = descriptor;

      if (!isFunction(get)) {

        throw new TypeError();
      }

      return {
        get() {

          return get.call(this);
        },

        set(newValue) {
          const vm = getComponentVM(this);

          if (vm.isRoot || isBeingConstructed(vm)) ;
          // not need to wrap or check the value since that is happening somewhere else

          if (set) {
            set.call(this, reactiveMembrane.getReadOnlyProxy(newValue));
          }
        },

        enumerable
      };
    }
    /*
     * Copyright (c) 2018, salesforce.com, inc.
     * All rights reserved.
     * SPDX-License-Identifier: MIT
     * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
     */


    function isLiveBindingProp(sel, key) {
      // For special whitelisted properties, we check against the actual property value on the DOM element instead of
      // relying on tracked property values.
      return sel === 'input' && (key === 'value' || key === 'checked');
    }

    function update(oldVnode, vnode) {
      const props = vnode.data.props;

      if (isUndefined(props)) {
        return;
      }

      const oldProps = oldVnode.data.props;

      if (oldProps === props) {
        return;
      }

      const elm = vnode.elm;
      const vm = getInternalField(elm, ViewModelReflection);
      const isFirstPatch = isUndefined(oldProps);
      const {
        sel
      } = vnode;

      for (const key in props) {
        const cur = props[key];


        if (isFirstPatch || cur !== (isLiveBindingProp(sel, key) ? elm[key] : oldProps[key])) {

          elm[key] = cur;
        }
      }
    }

    const emptyVNode$1 = {
      data: {}
    };
    var modProps = {
      create: vnode => update(emptyVNode$1, vnode),
      update
    };
    /*
     * Copyright (c) 2018, salesforce.com, inc.
     * All rights reserved.
     * SPDX-License-Identifier: MIT
     * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
     */

    const classNameToClassMap = create(null);

    function getMapFromClassName(className) {
      // Intentionally using == to match undefined and null values from computed style attribute
      if (className == null) {
        return EmptyObject;
      } // computed class names must be string


      className = isString(className) ? className : className + '';
      let map = classNameToClassMap[className];

      if (map) {
        return map;
      }

      map = create(null);
      let start = 0;
      let o;
      const len = className.length;

      for (o = 0; o < len; o++) {
        if (StringCharCodeAt.call(className, o) === SPACE_CHAR) {
          if (o > start) {
            map[StringSlice.call(className, start, o)] = true;
          }

          start = o + 1;
        }
      }

      if (o > start) {
        map[StringSlice.call(className, start, o)] = true;
      }

      classNameToClassMap[className] = map;

      return map;
    }

    function updateClassAttribute(oldVnode, vnode) {
      const {
        elm,
        data: {
          className: newClass
        }
      } = vnode;
      const {
        data: {
          className: oldClass
        }
      } = oldVnode;

      if (oldClass === newClass) {
        return;
      }

      const {
        classList
      } = elm;
      const newClassMap = getMapFromClassName(newClass);
      const oldClassMap = getMapFromClassName(oldClass);
      let name;

      for (name in oldClassMap) {
        // remove only if it is not in the new class collection and it is not set from within the instance
        if (isUndefined(newClassMap[name])) {
          classList.remove(name);
        }
      }

      for (name in newClassMap) {
        if (isUndefined(oldClassMap[name])) {
          classList.add(name);
        }
      }
    }

    const emptyVNode$2 = {
      data: {}
    };
    var modComputedClassName = {
      create: vnode => updateClassAttribute(emptyVNode$2, vnode),
      update: updateClassAttribute
    };
    /*
     * Copyright (c) 2018, salesforce.com, inc.
     * All rights reserved.
     * SPDX-License-Identifier: MIT
     * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
     */
    // The style property is a string when defined via an expression in the template.

    function updateStyleAttribute(oldVnode, vnode) {
      const {
        style: newStyle
      } = vnode.data;

      if (oldVnode.data.style === newStyle) {
        return;
      }

      const elm = vnode.elm;
      const {
        style
      } = elm;

      if (!isString(newStyle) || newStyle === '') {
        removeAttribute.call(elm, 'style');
      } else {
        style.cssText = newStyle;
      }
    }

    const emptyVNode$3 = {
      data: {}
    };
    var modComputedStyle = {
      create: vnode => updateStyleAttribute(emptyVNode$3, vnode),
      update: updateStyleAttribute
    };
    /*
     * Copyright (c) 2018, salesforce.com, inc.
     * All rights reserved.
     * SPDX-License-Identifier: MIT
     * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
     */
    // The HTML class property becomes the vnode.data.classMap object when defined as a string in the template.
    // The compiler takes care of transforming the inline classnames into an object. It's faster to set the
    // different classnames properties individually instead of via a string.

    function createClassAttribute(vnode) {
      const {
        elm,
        data: {
          classMap
        }
      } = vnode;

      if (isUndefined(classMap)) {
        return;
      }

      const {
        classList
      } = elm;

      for (const name in classMap) {
        classList.add(name);
      }
    }

    var modStaticClassName = {
      create: createClassAttribute
    };
    /*
     * Copyright (c) 2018, salesforce.com, inc.
     * All rights reserved.
     * SPDX-License-Identifier: MIT
     * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
     */
    // The HTML style property becomes the vnode.data.styleMap object when defined as a string in the template.
    // The compiler takes care of transforming the inline style into an object. It's faster to set the
    // different style properties individually instead of via a string.

    function createStyleAttribute(vnode) {
      const {
        elm,
        data: {
          styleMap
        }
      } = vnode;

      if (isUndefined(styleMap)) {
        return;
      }

      const {
        style
      } = elm;

      for (const name in styleMap) {
        style[name] = styleMap[name];
      }
    }

    var modStaticStyle = {
      create: createStyleAttribute
    };
    /*
     * Copyright (c) 2018, salesforce.com, inc.
     * All rights reserved.
     * SPDX-License-Identifier: MIT
     * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
     */

    function createContext(vnode) {
      const {
        data: {
          context
        }
      } = vnode;

      if (isUndefined(context)) {
        return;
      }

      const elm = vnode.elm;
      const vm = getInternalField(elm, ViewModelReflection);

      if (!isUndefined(vm)) {
        assign(vm.context, context);
      }
    }

    const contextModule = {
      create: createContext
    };
    /*
     * Copyright (c) 2018, salesforce.com, inc.
     * All rights reserved.
     * SPDX-License-Identifier: MIT
     * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
     */

    let MO = window.MutationObserver; // MutationObserver is not yet implemented in jsdom:
    // https://github.com/jsdom/jsdom/issues/639

    if (typeof MO === 'undefined') {
      /* eslint-disable-next-line no-inner-declarations */
      function MutationObserverMock() {}

      MutationObserverMock.prototype = {
        observe() {
        }

      };
      MO = window.MutationObserver = MutationObserverMock;
    }

    const MutationObserver = MO; // Eventually, import the patched MutationObserver polyfill here
    // to ensure rest of the framework uses the patched version

    let MutationObserverObserve = MutationObserver.prototype.observe;
    /*
     * Copyright (c) 2018, salesforce.com, inc.
     * All rights reserved.
     * SPDX-License-Identifier: MIT
     * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
     */

    function getTextContent(node) {
      switch (node.nodeType) {
        case Node.ELEMENT_NODE:
          {
            const childNodes = getFilteredChildNodes(node);
            let content = '';

            for (let i = 0, len = childNodes.length; i < len; i += 1) {
              content += getTextContent(childNodes[i]);
            }

            return content;
          }

        default:
          return node.nodeValue;
      }
    }
    /*
     * Copyright (c) 2018, salesforce.com, inc.
     * All rights reserved.
     * SPDX-License-Identifier: MIT
     * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
     */


    const Items = createFieldName('items');

    function StaticNodeList() {
      throw new TypeError('Illegal constructor');
    }

    StaticNodeList.prototype = create(NodeList.prototype, {
      constructor: {
        writable: true,
        configurable: true,
        value: StaticNodeList
      },
      item: {
        writable: true,
        enumerable: true,
        configurable: true,

        value(index) {
          return this[index];
        }

      },
      length: {
        enumerable: true,
        configurable: true,

        get() {
          return getInternalField(this, Items).length;
        }

      },
      // Iterator protocol
      forEach: {
        writable: true,
        enumerable: true,
        configurable: true,

        value(cb, thisArg) {
          forEach.call(getInternalField(this, Items), cb, thisArg);
        }

      },
      entries: {
        writable: true,
        enumerable: true,
        configurable: true,

        value() {
          return ArrayMap.call(getInternalField(this, Items), (v, i) => [i, v]);
        }

      },
      keys: {
        writable: true,
        enumerable: true,
        configurable: true,

        value() {
          return ArrayMap.call(getInternalField(this, Items), (v, i) => i);
        }

      },
      values: {
        writable: true,
        enumerable: true,
        configurable: true,

        value() {
          return getInternalField(this, Items);
        }

      },
      [Symbol.iterator]: {
        writable: true,
        configurable: true,

        value() {
          let nextIndex = 0;
          return {
            next: () => {
              const items = getInternalField(this, Items);
              return nextIndex < items.length ? {
                value: items[nextIndex++],
                done: false
              } : {
                done: true
              };
            }
          };
        }

      }
    }); // prototype inheritance dance

    setPrototypeOf(StaticNodeList, NodeList);

    function createStaticNodeList(items) {
      const nodeList = create(StaticNodeList.prototype);
      setInternalField(nodeList, Items, items); // setting static indexes

      forEach.call(items, (item, index) => {
        defineProperty(nodeList, index, {
          value: item,
          enumerable: true,
          configurable: true
        });
      });
      return nodeList;
    }
    /*
     * Copyright (c) 2018, salesforce.com, inc.
     * All rights reserved.
     * SPDX-License-Identifier: MIT
     * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
     */


    const DocumentPrototypeActiveElement = getOwnPropertyDescriptor(Document.prototype, 'activeElement').get;
    const elementFromPoint = hasOwnProperty.call(Document.prototype, 'elementFromPoint') ? Document.prototype.elementFromPoint : Document.prototype.msElementFromPoint; // IE11

    const {
      createDocumentFragment,
      createElement,
      createElementNS,
      createTextNode,
      createComment,
      querySelector: querySelector$1,
      querySelectorAll: querySelectorAll$1,
      getElementById,
      getElementsByClassName: getElementsByClassName$1,
      getElementsByName,
      getElementsByTagName: getElementsByTagName$1,
      getElementsByTagNameNS: getElementsByTagNameNS$1
    } = Document.prototype;
    /*
     * Copyright (c) 2018, salesforce.com, inc.
     * All rights reserved.
     * SPDX-License-Identifier: MIT
     * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
     */

    const Items$1 = createFieldName('items');

    function isValidHTMLCollectionName(name) {
      return name !== 'length' && isNaN(name);
    }

    function getNodeHTMLCollectionName(node) {
      return node.getAttribute('id') || node.getAttribute('name');
    }

    function StaticHTMLCollection() {
      throw new TypeError('Illegal constructor');
    }

    StaticHTMLCollection.prototype = create(HTMLCollection.prototype, {
      constructor: {
        writable: true,
        configurable: true,
        value: StaticHTMLCollection
      },
      item: {
        writable: true,
        enumerable: true,
        configurable: true,

        value(index) {
          return this[index];
        }

      },
      length: {
        enumerable: true,
        configurable: true,

        get() {
          return getInternalField(this, Items$1).length;
        }

      },
      // https://dom.spec.whatwg.org/#dom-htmlcollection-nameditem-key
      namedItem: {
        writable: true,
        enumerable: true,
        configurable: true,

        value(name) {
          if (isValidHTMLCollectionName(name) && this[name]) {
            return this[name];
          }

          const items = getInternalField(this, Items$1); // Note: loop in reverse so that the first named item matches the named property

          for (let len = items.length - 1; len >= 0; len -= 1) {
            const item = items[len];
            const nodeName = getNodeHTMLCollectionName(item);

            if (nodeName === name) {
              return item;
            }
          }

          return null;
        }

      },
      // Iterator protocol
      forEach: {
        writable: true,
        enumerable: true,
        configurable: true,

        value(cb, thisArg) {
          forEach.call(getInternalField(this, Items$1), cb, thisArg);
        }

      },
      entries: {
        writable: true,
        enumerable: true,
        configurable: true,

        value() {
          return ArrayMap.call(getInternalField(this, Items$1), (v, i) => [i, v]);
        }

      },
      keys: {
        writable: true,
        enumerable: true,
        configurable: true,

        value() {
          return ArrayMap.call(getInternalField(this, Items$1), (v, i) => i);
        }

      },
      values: {
        writable: true,
        enumerable: true,
        configurable: true,

        value() {
          return getInternalField(this, Items$1);
        }

      },
      [Symbol.iterator]: {
        writable: true,
        configurable: true,

        value() {
          let nextIndex = 0;
          return {
            next: () => {
              const items = getInternalField(this, Items$1);
              return nextIndex < items.length ? {
                value: items[nextIndex++],
                done: false
              } : {
                done: true
              };
            }
          };
        }

      }
    }); // prototype inheritance dance

    setPrototypeOf(StaticHTMLCollection, HTMLCollection);

    function createStaticHTMLCollection(items) {
      const collection = create(StaticHTMLCollection.prototype);
      setInternalField(collection, Items$1, items); // setting static indexes

      forEach.call(items, (item, index) => {
        defineProperty(collection, index, {
          value: item,
          enumerable: true,
          configurable: true
        });
      });
      return collection;
    }
    /*
     * Copyright (c) 2018, salesforce.com, inc.
     * All rights reserved.
     * SPDX-License-Identifier: MIT
     * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
     */


    function getInnerHTML(node) {
      let s = '';
      const childNodes = getFilteredChildNodes(node);

      for (let i = 0, len = childNodes.length; i < len; i += 1) {
        s += getOuterHTML(childNodes[i]);
      }

      return s;
    }
    /*
     * Copyright (c) 2018, salesforce.com, inc.
     * All rights reserved.
     * SPDX-License-Identifier: MIT
     * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
     */
    // http://www.whatwg.org/specs/web-apps/current-work/multipage/the-end.html#escapingString


    const escapeAttrRegExp = /[&\u00A0"]/g;
    const escapeDataRegExp = /[&\u00A0<>]/g;
    const {
      replace,
      toLowerCase
    } = String.prototype;

    function escapeReplace(c) {
      switch (c) {
        case '&':
          return '&amp;';

        case '<':
          return '&lt;';

        case '>':
          return '&gt;';

        case '"':
          return '&quot;';

        case '\u00A0':
          return '&nbsp;';

        default:
          return '';
      }
    }

    function escapeAttr(s) {
      return replace.call(s, escapeAttrRegExp, escapeReplace);
    }

    function escapeData(s) {
      return replace.call(s, escapeDataRegExp, escapeReplace);
    } // http://www.whatwg.org/specs/web-apps/current-work/#void-elements


    const voidElements = new Set(['AREA', 'BASE', 'BR', 'COL', 'COMMAND', 'EMBED', 'HR', 'IMG', 'INPUT', 'KEYGEN', 'LINK', 'META', 'PARAM', 'SOURCE', 'TRACK', 'WBR']);
    const plaintextParents = new Set(['STYLE', 'SCRIPT', 'XMP', 'IFRAME', 'NOEMBED', 'NOFRAMES', 'PLAINTEXT', 'NOSCRIPT']);

    function getOuterHTML(node) {
      switch (node.nodeType) {
        case Node.ELEMENT_NODE:
          {
            const {
              attributes: attrs
            } = node;
            const tagName = tagNameGetter.call(node);
            let s = '<' + toLowerCase.call(tagName);

            for (let i = 0, attr; attr = attrs[i]; i++) {
              s += ' ' + attr.name + '="' + escapeAttr(attr.value) + '"';
            }

            s += '>';

            if (voidElements.has(tagName)) {
              return s;
            }

            return s + getInnerHTML(node) + '</' + toLowerCase.call(tagName) + '>';
          }

        case Node.TEXT_NODE:
          {
            const {
              data,
              parentNode
            } = node;

            if (parentNode instanceof Element && plaintextParents.has(tagNameGetter.call(parentNode))) {
              return data;
            }

            return escapeData(data);
          }

        case Node.COMMENT_NODE:
          {
            return '<!--' + node.data + '-->';
          }

        default:
          {
            throw new Error();
          }
      }
    }
    /*
     * Copyright (c) 2018, salesforce.com, inc.
     * All rights reserved.
     * SPDX-License-Identifier: MIT
     * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
     */

    /**
    @license
    Copyright (c) 2016 The Polymer Project Authors. All rights reserved.
    This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
    The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
    The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
    Code distributed by Google as part of the polymer project is also
    subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
    */


    function pathComposer(startNode, composed) {
      const composedPath = [];
      let current = startNode;
      const startRoot = startNode === window ? window : getRootNodeGetter.call(startNode);

      while (current) {
        composedPath.push(current);

        if (current.assignedSlot) {
          current = current.assignedSlot;
        } else if (current.nodeType === DOCUMENT_FRAGMENT_NODE && current.host && (composed || current !== startRoot)) {
          current = current.host;
        } else {
          current = current.parentNode;
        }
      } // event composedPath includes window when startNode's ownerRoot is document


      if (composedPath[composedPath.length - 1] === document) {
        composedPath.push(window);
      }

      return composedPath;
    }
    /*
     * Copyright (c) 2018, salesforce.com, inc.
     * All rights reserved.
     * SPDX-License-Identifier: MIT
     * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
     */

    /**
    @license
    Copyright (c) 2016 The Polymer Project Authors. All rights reserved.
    This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
    The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
    The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
    Code distributed by Google as part of the polymer project is also
    subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
    */


    function retarget(refNode, path) {
      // If ANCESTOR's root is not a shadow root or ANCESTOR's root is BASE's
      // shadow-including inclusive ancestor, return ANCESTOR.
      const refNodePath = pathComposer(refNode, true);
      const p$ = path;

      for (let i = 0, ancestor, lastRoot, root, rootIdx; i < p$.length; i++) {
        ancestor = p$[i];
        root = ancestor === window ? window : getRootNodeGetter.call(ancestor);

        if (root !== lastRoot) {
          rootIdx = refNodePath.indexOf(root);
          lastRoot = root;
        }

        if (!(root instanceof SyntheticShadowRoot) || rootIdx > -1) {
          return ancestor;
        }
      }

      return null;
    }
    /*
     * Copyright (c) 2018, salesforce.com, inc.
     * All rights reserved.
     * SPDX-License-Identifier: MIT
     * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
     */


    const InternalSlot = createFieldName('shadowRecord');
    const {
      createDocumentFragment: createDocumentFragment$1
    } = document;

    function getInternalSlot(root) {
      const record = getInternalField(root, InternalSlot);

      if (isUndefined(record)) {
        throw new TypeError();
      }

      return record;
    }

    function isDelegatingFocus(host) {
      return getInternalSlot(host).delegatesFocus;
    }

    function getHost(root) {
      return getInternalSlot(root).host;
    }

    function getShadowRoot(elm) {
      return getInternalSlot(elm).shadowRoot;
    }

    function attachShadow(elm, options) {
      if (!isUndefined(getInternalField(elm, InternalSlot))) {
        throw new Error(`Failed to execute 'attachShadow' on 'Element': Shadow root cannot be created on a host which already hosts a shadow tree.`);
      }

      const {
        mode,
        delegatesFocus
      } = options; // creating a real fragment for shadowRoot instance

      const sr = createDocumentFragment$1.call(document); // creating shadow internal record

      const record = {
        mode,
        delegatesFocus: !!delegatesFocus,
        host: elm,
        shadowRoot: sr
      };
      setInternalField(sr, InternalSlot, record);
      setInternalField(elm, InternalSlot, record); // correcting the proto chain

      setPrototypeOf(sr, SyntheticShadowRoot.prototype);
      return sr;
    }

    const SyntheticShadowRootDescriptors = {
      constructor: {
        writable: true,
        configurable: true,
        value: SyntheticShadowRoot
      },
      toString: {
        writable: true,
        configurable: true,

        value() {
          return `[object ShadowRoot]`;
        }

      }
    };
    const ShadowRootDescriptors = {
      activeElement: {
        enumerable: true,
        configurable: true,

        get() {
          const activeElement = DocumentPrototypeActiveElement.call(document);

          if (isNull(activeElement)) {
            return activeElement;
          }

          const host = getHost(this);

          if ((compareDocumentPosition.call(host, activeElement) & DOCUMENT_POSITION_CONTAINED_BY) === 0) {
            return null;
          } // activeElement must be child of the host and owned by it


          let node = activeElement;

          while (!isNodeOwnedBy(host, node)) {
            node = parentElementGetter.call(node);
          } // If we have a slot element here that means that we were dealing
          // with an element that was passed to one of our slots. In this
          // case, activeElement returns null.


          if (isSlotElement(node)) {
            return null;
          }

          return node;
        }

      },
      delegatesFocus: {
        configurable: true,

        get() {
          return getInternalSlot(this).delegatesFocus;
        }

      },
      elementFromPoint: {
        writable: true,
        enumerable: true,
        configurable: true,

        value(left, top) {
          const element = elementFromPoint.call(document, left, top);

          if (isNull(element)) {
            return element;
          }

          return retarget(this, pathComposer(element, true));
        }

      },
      elementsFromPoint: {
        writable: true,
        enumerable: true,
        configurable: true,

        value(_left, _top) {
          throw new Error();
        }

      },
      getSelection: {
        writable: true,
        enumerable: true,
        configurable: true,

        value() {
          throw new Error();
        }

      },
      host: {
        enumerable: true,
        configurable: true,

        get() {
          return getHost(this);
        }

      },
      mode: {
        configurable: true,

        get() {
          return getInternalSlot(this).mode;
        }

      },
      styleSheets: {
        enumerable: true,
        configurable: true,

        get() {
          throw new Error();
        }

      }
    };
    const NodePatchDescriptors = {
      addEventListener: {
        writable: true,
        enumerable: true,
        configurable: true,

        value(type, listener, options) {
          addShadowRootEventListener(this, type, listener, options);
        }

      },
      removeEventListener: {
        writable: true,
        enumerable: true,
        configurable: true,

        value(type, listener, options) {
          removeShadowRootEventListener(this, type, listener, options);
        }

      },
      baseURI: {
        enumerable: true,
        configurable: true,

        get() {
          return getHost(this).baseURI;
        }

      },
      childNodes: {
        enumerable: true,
        configurable: true,

        get() {
          return createStaticNodeList(shadowRootChildNodes(this));
        }

      },
      compareDocumentPosition: {
        writable: true,
        enumerable: true,
        configurable: true,

        value(otherNode) {
          const host = getHost(this);

          if (this === otherNode) {
            // "this" and "otherNode" are the same shadow root.
            return 0;
          } else if (this.contains(otherNode)) {
            // "otherNode" belongs to the shadow tree where "this" is the shadow root.
            return 20; // Node.DOCUMENT_POSITION_CONTAINED_BY | Node.DOCUMENT_POSITION_FOLLOWING
          } else if (compareDocumentPosition.call(host, otherNode) & DOCUMENT_POSITION_CONTAINED_BY) {
            // "otherNode" is in a different shadow tree contained by the shadow tree where "this" is the shadow root.
            return 37; // Node.DOCUMENT_POSITION_DISCONNECTED | Node.DOCUMENT_POSITION_FOLLOWING | Node.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC
          } else {
            // "otherNode" is in a different shadow tree that is not contained by the shadow tree where "this" is the shadow root.
            return 35; // Node.DOCUMENT_POSITION_DISCONNECTED | Node.DOCUMENT_POSITION_PRECEDING | Node.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC
          }
        }

      },
      contains: {
        writable: true,
        enumerable: true,
        configurable: true,

        value(otherNode) {
          if (this === otherNode) {
            return true;
          }

          const host = getHost(this); // must be child of the host and owned by it.

          return (compareDocumentPosition.call(host, otherNode) & DOCUMENT_POSITION_CONTAINED_BY) !== 0 && isNodeOwnedBy(host, otherNode);
        }

      },
      firstChild: {
        enumerable: true,
        configurable: true,

        get() {
          const childNodes = getInternalChildNodes(this);
          return childNodes[0] || null;
        }

      },
      lastChild: {
        enumerable: true,
        configurable: true,

        get() {
          const childNodes = getInternalChildNodes(this);
          return childNodes[childNodes.length - 1] || null;
        }

      },
      hasChildNodes: {
        writable: true,
        enumerable: true,
        configurable: true,

        value() {
          const childNodes = getInternalChildNodes(this);
          return childNodes.length > 0;
        }

      },
      isConnected: {
        enumerable: true,
        configurable: true,

        get() {
          return isConnected.call(getHost(this));
        }

      },
      nextSibling: {
        enumerable: true,
        configurable: true,

        get() {
          return null;
        }

      },
      previousSibling: {
        enumerable: true,
        configurable: true,

        get() {
          return null;
        }

      },
      nodeName: {
        enumerable: true,
        configurable: true,

        get() {
          return '#document-fragment';
        }

      },
      nodeType: {
        enumerable: true,
        configurable: true,

        get() {
          return 11; // Node.DOCUMENT_FRAGMENT_NODE
        }

      },
      nodeValue: {
        enumerable: true,
        configurable: true,

        get() {
          return null;
        }

      },
      ownerDocument: {
        enumerable: true,
        configurable: true,

        get() {
          return getHost(this).ownerDocument;
        }

      },
      parentElement: {
        enumerable: true,
        configurable: true,

        get() {
          return null;
        }

      },
      parentNode: {
        enumerable: true,
        configurable: true,

        get() {
          return null;
        }

      },
      textContent: {
        enumerable: true,
        configurable: true,

        get() {
          const childNodes = getInternalChildNodes(this);
          let textContent = '';

          for (let i = 0, len = childNodes.length; i < len; i += 1) {
            textContent += getTextContent(childNodes[i]);
          }

          return textContent;
        },

        set(v) {
          const host = getHost(this);
          textContextSetter.call(host, v);
        }

      },
      getRootNode: {
        writable: true,
        enumerable: true,
        configurable: true,

        value(options) {
          const composed = isUndefined(options) ? false : !!options.composed;
          return isFalse(composed) ? this : getRootNodeGetter.call(getHost(this), {
            composed
          });
        }

      }
    };
    const ElementPatchDescriptors = {
      innerHTML: {
        enumerable: true,
        configurable: true,

        get() {
          const childNodes = getInternalChildNodes(this);
          let innerHTML = '';

          for (let i = 0, len = childNodes.length; i < len; i += 1) {
            innerHTML += getOuterHTML(childNodes[i]);
          }

          return innerHTML;
        },

        set(v) {
          const host = getHost(this);
          innerHTMLSetter.call(host, v);
        }

      }
    };
    const ParentNodePatchDescriptors = {
      childElementCount: {
        enumerable: true,
        configurable: true,

        get() {
          return this.children.length;
        }

      },
      children: {
        enumerable: true,
        configurable: true,

        get() {
          return createStaticHTMLCollection(ArrayFilter.call(shadowRootChildNodes(this), elm => elm instanceof Element));
        }

      },
      firstElementChild: {
        enumerable: true,
        configurable: true,

        get() {
          return this.children[0] || null;
        }

      },
      lastElementChild: {
        enumerable: true,
        configurable: true,

        get() {
          const {
            children
          } = this;
          return children.item(children.length - 1) || null;
        }

      },
      querySelector: {
        writable: true,
        enumerable: true,
        configurable: true,

        value(selectors) {
          return shadowRootQuerySelector(this, selectors);
        }

      },
      querySelectorAll: {
        writable: true,
        enumerable: true,
        configurable: true,

        value(selectors) {
          return createStaticNodeList(shadowRootQuerySelectorAll(this, selectors));
        }

      }
    };
    assign(SyntheticShadowRootDescriptors, NodePatchDescriptors, ParentNodePatchDescriptors, ElementPatchDescriptors, ShadowRootDescriptors);

    function SyntheticShadowRoot() {
      throw new TypeError('Illegal constructor');
    }

    SyntheticShadowRoot.prototype = create(DocumentFragment.prototype, SyntheticShadowRootDescriptors); // Is native ShadowDom is available on window,
    // we need to make sure that our synthetic shadow dom
    // passed instanceof checks against window.ShadowDom

    if (isNativeShadowRootAvailable) {
      setPrototypeOf(SyntheticShadowRoot.prototype, window.ShadowRoot.prototype);
    }
    /*
     * Copyright (c) 2018, salesforce.com, inc.
     * All rights reserved.
     * SPDX-License-Identifier: MIT
     * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
     */
    // DO NOT CHANGE this:
    // these two values need to be in sync with framework/vm.ts


    const OwnerKey = '$$OwnerKey$$';
    const OwnKey = '$$OwnKey$$';
    const hasNativeSymbolsSupport$1 = Symbol('x').toString() === 'Symbol(x)';

    function getNodeOwnerKey(node) {
      return node[OwnerKey];
    }

    function setNodeOwnerKey(node, key) {
      node[OwnerKey] = key;
    }

    function getNodeNearestOwnerKey(node) {
      let ownerNode = node;
      let ownerKey; // search for the first element with owner identity (just in case of manually inserted elements)

      while (!isNull(ownerNode)) {
        ownerKey = ownerNode[OwnerKey];

        if (!isUndefined(ownerKey)) {
          return ownerKey;
        }

        ownerNode = parentNodeGetter.call(ownerNode);
      }
    }

    function getNodeKey(node) {
      return node[OwnKey];
    }

    const portals = new WeakMap(); // We can use a single observer without having to worry about leaking because
    // "Registered observers in a node’s registered observer list have a weak
    // reference to the node."
    // https://dom.spec.whatwg.org/#garbage-collection

    let portalObserver;
    const portalObserverConfig = {
      childList: true,
      subtree: true
    };

    function patchPortalElement(node, ownerKey, shadowToken) {
      // If node already has an ownerKey, we can skip
      // Note: checking if a node has any ownerKey is not enough
      // because this element could be moved from one
      // shadow to another
      if (getNodeOwnerKey(node) === ownerKey) {
        return;
      }

      setNodeOwnerKey(node, ownerKey);

      if (node instanceof Element) {
        setCSSToken(node, shadowToken);
        const childNodes = getInternalChildNodes(node);

        for (let i = 0, len = childNodes.length; i < len; i += 1) {
          const child = childNodes[i];
          patchPortalElement(child, ownerKey, shadowToken);
        }
      }
    }

    function initPortalObserver() {
      return new MutationObserver(mutations => {
        forEach.call(mutations, mutation => {
          const {
            target: elm,
            addedNodes
          } = mutation;
          const ownerKey = getNodeOwnerKey(elm);
          const shadowToken = getCSSToken(elm); // OwnerKey might be undefined at this point.
          // We used to throw an error here, but we need to return early instead.
          //
          // This routine results in a mutation target that will have no key
          // because its been removed by the time the observer runs
          // const div = document.createElement('div');
          // div.innerHTML = '<span>span</span>';
          // const span = div.querySelector('span');
          // manualElement.appendChild(div);
          // span.textContent = '';
          // span.parentNode.removeChild(span);

          if (isUndefined(ownerKey)) {
            return;
          }

          for (let i = 0, len = addedNodes.length; i < len; i += 1) {
            const node = addedNodes[i];
            patchPortalElement(node, ownerKey, shadowToken);
          }
        });
      });
    }

    const ShadowTokenKey = '$$ShadowTokenKey$$';

    function setCSSToken(elm, shadowToken) {
      if (!isUndefined(shadowToken)) {
        setAttribute.call(elm, shadowToken, '');
        elm[ShadowTokenKey] = shadowToken;
      }
    }

    function getCSSToken(elm) {
      return elm[ShadowTokenKey];
    }

    function markElementAsPortal(elm) {
      portals.set(elm, 1);

      if (!portalObserver) {
        portalObserver = initPortalObserver();
      } // install mutation observer for portals


      MutationObserverObserve.call(portalObserver, elm, portalObserverConfig);
    }

    function getShadowParent(node, value) {
      const owner = getNodeOwner(node);

      if (value === owner) {
        // walking up via parent chain might end up in the shadow root element
        return getShadowRoot(owner);
      } else if (value instanceof Element) {
        if (getNodeNearestOwnerKey(node) === getNodeNearestOwnerKey(value)) {
          // the element and its parent node belong to the same shadow root
          return value;
        } else if (!isNull(owner) && isSlotElement(value)) {
          // slotted elements must be top level childNodes of the slot element
          // where they slotted into, but its shadowed parent is always the
          // owner of the slot.
          const slotOwner = getNodeOwner(value);

          if (!isNull(slotOwner) && isNodeOwnedBy(owner, slotOwner)) {
            // it is a slotted element, and therefore its parent is always going to be the host of the slot
            return slotOwner;
          }
        }
      }

      return null;
    }

    function PatchedNode(node) {
      const Ctor = getPrototypeOf(node).constructor;

      class PatchedNodeClass {
        constructor() {
          // Patched classes are not supposed to be instantiated directly, ever!
          throw new TypeError('Illegal constructor');
        }

        hasChildNodes() {
          return getInternalChildNodes(this).length > 0;
        } // @ts-ignore until ts@3.x


        get firstChild() {
          const childNodes = getInternalChildNodes(this); // @ts-ignore until ts@3.x

          return childNodes[0] || null;
        } // @ts-ignore until ts@3.x


        get lastChild() {
          const childNodes = getInternalChildNodes(this); // @ts-ignore until ts@3.x

          return childNodes[childNodes.length - 1] || null;
        }

        get textContent() {
          return getTextContent(this);
        }

        set textContent(value) {
          textContextSetter.call(this, value);
        }

        get childElementCount() {
          return this.children.length;
        }

        get firstElementChild() {
          return this.children[0] || null;
        }

        get lastElementChild() {
          const {
            children
          } = this;
          return children.item(children.length - 1) || null;
        }

        get assignedSlot() {
          const parentNode = parentNodeGetter.call(this);
          /**
           * if it doesn't have a parent node,
           * or the parent is not an slot element
           * or they both belong to the same template (default content)
           * we should assume that it is not slotted
           */

          if (isNull(parentNode) || !isSlotElement(parentNode) || getNodeNearestOwnerKey(parentNode) === getNodeNearestOwnerKey(this)) {
            return null;
          }

          return parentNode;
        }

        get parentNode() {
          const value = parentNodeGetter.call(this);

          if (isNull(value)) {
            return value;
          }

          return getShadowParent(this, value);
        }

        get parentElement() {
          const value = parentNodeGetter.call(this);

          if (isNull(value)) {
            return null;
          }

          const parentNode = getShadowParent(this, value); // it could be that the parentNode is the shadowRoot, in which case
          // we need to return null.

          return parentNode instanceof Element ? parentNode : null;
        }

        getRootNode(options) {
          return getRootNodeGetter.call(this, options);
        }

        compareDocumentPosition(otherNode) {
          if (getRootNodeGetter.call(this) === otherNode) {
            // "this" is in a shadow tree where the shadow root is the "otherNode".
            return 10; // Node.DOCUMENT_POSITION_CONTAINS | Node.DOCUMENT_POSITION_PRECEDING
          } else if (getNodeOwnerKey(this) !== getNodeOwnerKey(otherNode)) {
            // "this" and "otherNode" belongs to 2 different shadow tree.
            return 35; // Node.DOCUMENT_POSITION_DISCONNECTED | Node.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC | Node.DOCUMENT_POSITION_PRECEDING
          } // Since "this" and "otherNode" are part of the same shadow tree we can safely rely to the native
          // Node.compareDocumentPosition implementation.


          return compareDocumentPosition.call(this, otherNode);
        }

        contains(otherNode) {
          if (getNodeOwnerKey(this) !== getNodeOwnerKey(otherNode)) {
            // it is from another shadow
            return false;
          }

          return (compareDocumentPosition.call(this, otherNode) & DOCUMENT_POSITION_CONTAINED_BY) !== 0;
        }

        cloneNode(deep) {
          const clone = cloneNode.call(this, false); // Per spec, browsers only care about truthy values
          // Not strict true or false

          if (!deep) {
            return clone;
          }

          const childNodes = getInternalChildNodes(this);

          for (let i = 0, len = childNodes.length; i < len; i += 1) {
            clone.appendChild(childNodes[i].cloneNode(true));
          }

          return clone;
        }

      } // prototype inheritance dance


      setPrototypeOf(PatchedNodeClass, Ctor);
      setPrototypeOf(PatchedNodeClass.prototype, Ctor.prototype);
      return PatchedNodeClass;
    }

    const getInternalChildNodes = function (node) {
      return node.childNodes;
    };
    /*
     * Copyright (c) 2018, salesforce.com, inc.
     * All rights reserved.
     * SPDX-License-Identifier: MIT
     * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
     */

    function wrapIframeWindow(win) {
      return {
        postMessage() {
          // Typescript does not like it when you treat the `arguments` object as an array
          // @ts-ignore type-mismatch
          return win.postMessage.apply(win, arguments);
        },

        blur() {
          // Typescript does not like it when you treat the `arguments` object as an array
          // @ts-ignore type-mismatch
          return win.blur.apply(win, arguments);
        },

        close() {
          // Typescript does not like it when you treat the `arguments` object as an array
          // @ts-ignore type-mismatch
          return win.close.apply(win, arguments);
        },

        focus() {
          // Typescript does not like it when you treat the `arguments` object as an array
          // @ts-ignore type-mismatch
          return win.focus.apply(win, arguments);
        },

        get closed() {
          return win.closed;
        },

        get frames() {
          return win.frames;
        },

        get length() {
          return win.length;
        },

        get location() {
          return win.location;
        },

        set location(value) {
          win.location = value;
        },

        get opener() {
          return win.opener;
        },

        get parent() {
          return win.parent;
        },

        get self() {
          return win.self;
        },

        get top() {
          return win.top;
        },

        get window() {
          return win.window;
        }

      };
    }
    /*
     * Copyright (c) 2018, salesforce.com, inc.
     * All rights reserved.
     * SPDX-License-Identifier: MIT
     * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
     */
    // We can use a single observer without having to worry about leaking because
    // "Registered observers in a node’s registered observer list have a weak
    // reference to the node."
    // https://dom.spec.whatwg.org/#garbage-collection


    let observer;
    const observerConfig = {
      childList: true
    };
    const SlotChangeKey = createFieldName('slotchange');

    function initSlotObserver() {
      return new MutationObserver(mutations => {
        const slots = [];
        forEach.call(mutations, mutation => {

          const {
            target: slot
          } = mutation;

          if (ArrayIndexOf.call(slots, slot) === -1) {
            ArrayPush.call(slots, slot);
            dispatchEvent.call(slot, new CustomEvent('slotchange'));
          }
        });
      });
    }

    function getFilteredSlotAssignedNodes(slot) {
      const owner = getNodeOwner(slot);

      if (isNull(owner)) {
        return [];
      }

      const childNodes = ArraySlice.call(childNodesGetter.call(slot)); // Typescript is inferring the wrong function type for this particular
      // overloaded method: https://github.com/Microsoft/TypeScript/issues/27972
      // @ts-ignore type-mismatch

      return ArrayReduce.call(childNodes, (seed, child) => {
        if (!isNodeOwnedBy(owner, child)) {
          ArrayPush.call(seed, child);
        }

        return seed;
      }, []);
    }

    function getFilteredSlotFlattenNodes(slot) {
      const childNodes = ArraySlice.call(childNodesGetter.call(slot)); // Typescript is inferring the wrong function type for this particular
      // overloaded method: https://github.com/Microsoft/TypeScript/issues/27972
      // @ts-ignore type-mismatch

      return ArrayReduce.call(childNodes, (seed, child) => {
        if (child instanceof Element && isSlotElement(child)) {
          ArrayPush.apply(seed, getFilteredSlotFlattenNodes(child));
        } else {
          ArrayPush.call(seed, child);
        }

        return seed;
      }, []);
    }

    function PatchedSlotElement(elm) {
      const Ctor = PatchedElement(elm);
      const {
        addEventListener: superAddEventListener
      } = elm;
      return class PatchedHTMLSlotElement extends Ctor {
        addEventListener(type, listener, options) {
          if (type === 'slotchange' && !getInternalField(this, SlotChangeKey)) {

            setInternalField(this, SlotChangeKey, true);

            if (!observer) {
              observer = initSlotObserver();
            }

            MutationObserverObserve.call(observer, this, observerConfig);
          }

          superAddEventListener.call(this, type, listener, options);
        }

        assignedElements(options) {
          const flatten = !isUndefined(options) && isTrue(options.flatten);
          const nodes = flatten ? getFilteredSlotFlattenNodes(this) : getFilteredSlotAssignedNodes(this);
          return ArrayFilter.call(nodes, node => node instanceof Element);
        }

        assignedNodes(options) {
          const flatten = !isUndefined(options) && isTrue(options.flatten);
          return flatten ? getFilteredSlotFlattenNodes(this) : getFilteredSlotAssignedNodes(this);
        }

        get name() {
          // in browsers that do not support shadow dom, slot's name attribute is not reflective
          const name = getAttribute.call(this, 'name');
          return isNull(name) ? '' : name;
        }

        get childNodes() {
          const owner = getNodeOwner(this);
          const childNodes = isNull(owner) ? [] : getAllMatches(owner, getFilteredChildNodes(this));
          return createStaticNodeList(childNodes);
        }

        get children() {

          const owner = getNodeOwner(this);
          const childNodes = isNull(owner) ? [] : getAllMatches(owner, getFilteredChildNodes(this));
          return createStaticHTMLCollection(ArrayFilter.call(childNodes, node => node instanceof Element));
        }

      };
    }
    /*
     * Copyright (c) 2018, salesforce.com, inc.
     * All rights reserved.
     * SPDX-License-Identifier: MIT
     * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
     */


    function getNodeOwner(node) {
      if (!(node instanceof Node)) {
        return null;
      }

      const ownerKey = getNodeNearestOwnerKey(node);

      if (isUndefined(ownerKey)) {
        return null;
      }

      let nodeOwner = node; // At this point, node is a valid node with owner identity, now we need to find the owner node
      // search for a custom element with a VM that owns the first element with owner identity attached to it

      while (!isNull(nodeOwner) && getNodeKey(nodeOwner) !== ownerKey) {
        nodeOwner = parentNodeGetter.call(nodeOwner);
      }

      if (isNull(nodeOwner)) {
        return null;
      }

      return nodeOwner;
    }

    function isSlotElement(elm) {
      return tagNameGetter.call(elm) === 'SLOT';
    }

    function isNodeOwnedBy(owner, node) {

      const ownerKey = getNodeNearestOwnerKey(node);
      return isUndefined(ownerKey) || getNodeKey(owner) === ownerKey;
    } // when finding a slot in the DOM, we can fold it if it is contained
    // inside another slot.


    function foldSlotElement(slot) {
      let parent = parentElementGetter.call(slot);

      while (!isNull(parent) && isSlotElement(parent)) {
        slot = parent;
        parent = parentElementGetter.call(slot);
      }

      return slot;
    }

    function isNodeSlotted(host, node) {

      const hostKey = getNodeKey(host); // this routine assumes that the node is coming from a different shadow (it is not owned by the host)
      // just in case the provided node is not an element

      let currentElement = node instanceof Element ? node : parentElementGetter.call(node);

      while (!isNull(currentElement) && currentElement !== host) {
        const elmOwnerKey = getNodeNearestOwnerKey(currentElement);
        const parent = parentElementGetter.call(currentElement);

        if (elmOwnerKey === hostKey) {
          // we have reached an element inside the host's template, and only if
          // that element is an slot, then the node is considered slotted
          // TODO: add the examples
          return isSlotElement(currentElement);
        } else if (parent === host) {
          return false;
        } else if (!isNull(parent) && getNodeNearestOwnerKey(parent) !== elmOwnerKey) {
          // we are crossing a boundary of some sort since the elm and its parent
          // have different owner key. for slotted elements, this is possible
          // if the parent happens to be a slot.
          if (isSlotElement(parent)) {
            /**
             * the slot parent might be allocated inside another slot, think of:
             * <x-root> (<--- root element)
             *    <x-parent> (<--- own by x-root)
             *       <x-child> (<--- own by x-root)
             *           <slot> (<--- own by x-child)
             *               <slot> (<--- own by x-parent)
             *                  <div> (<--- own by x-root)
             *
             * while checking if x-parent has the div slotted, we need to traverse
             * up, but when finding the first slot, we skip that one in favor of the
             * most outer slot parent before jumping into its corresponding host.
             */
            currentElement = getNodeOwner(foldSlotElement(parent));

            if (!isNull(currentElement)) {
              if (currentElement === host) {
                // the slot element is a top level element inside the shadow
                // of a host that was allocated into host in question
                return true;
              } else if (getNodeNearestOwnerKey(currentElement) === hostKey) {
                // the slot element is an element inside the shadow
                // of a host that was allocated into host in question
                return true;
              }
            }
          } else {
            return false;
          }
        } else {
          currentElement = parent;
        }
      }

      return false;
    }

    function shadowRootChildNodes(root) {
      const elm = getHost(root);
      return getAllMatches(elm, childNodesGetter.call(elm));
    }

    function getAllMatches(owner, nodeList) {
      const filteredAndPatched = [];

      for (let i = 0, len = nodeList.length; i < len; i += 1) {
        const node = nodeList[i];
        const isOwned = isNodeOwnedBy(owner, node);

        if (isOwned) {
          // Patch querySelector, querySelectorAll, etc
          // if element is owned by VM
          ArrayPush.call(filteredAndPatched, node);
        }
      }

      return filteredAndPatched;
    }

    function getRoot(node) {
      const ownerNode = getNodeOwner(node);

      if (isNull(ownerNode)) {
        // we hit a wall, is not in lwc boundary.
        return getShadowIncludingRoot(node);
      } // @ts-ignore: Attributes property is removed from Node (https://developer.mozilla.org/en-US/docs/Web/API/Node)


      return getShadowRoot(ownerNode);
    }

    function getShadowIncludingRoot(node) {
      let nodeParent;

      while (!isNull(nodeParent = parentNodeGetter.call(node))) {
        node = nodeParent;
      }

      return node;
    }
    /**
     * Dummy implementation of the Node.prototype.getRootNode.
     * Spec: https://dom.spec.whatwg.org/#dom-node-getrootnode
     *
     * TODO: Once we start using the real shadowDOM, this method should be replaced by:
     * const { getRootNode } = Node.prototype;
     */


    function getRootNodeGetter(options) {
      const composed = isUndefined(options) ? false : !!options.composed;
      return isTrue(composed) ? getShadowIncludingRoot(this) : getRoot(this);
    }

    function getFirstMatch(owner, nodeList) {
      for (let i = 0, len = nodeList.length; i < len; i += 1) {
        if (isNodeOwnedBy(owner, nodeList[i])) {
          return nodeList[i];
        }
      }

      return null;
    }

    function getAllSlottedMatches(host, nodeList) {
      const filteredAndPatched = [];

      for (let i = 0, len = nodeList.length; i < len; i += 1) {
        const node = nodeList[i];

        if (!isNodeOwnedBy(host, node) && isNodeSlotted(host, node)) {
          ArrayPush.call(filteredAndPatched, node);
        }
      }

      return filteredAndPatched;
    }

    function getFirstSlottedMatch(host, nodeList) {
      for (let i = 0, len = nodeList.length; i < len; i += 1) {
        const node = nodeList[i];

        if (!isNodeOwnedBy(host, node) && isNodeSlotted(host, node)) {
          return node;
        }
      }

      return null;
    }

    function lightDomQuerySelectorAll(elm, selectors) {
      const owner = getNodeOwner(elm);

      if (isNull(owner)) {
        return [];
      }

      const nodeList = querySelectorAll.call(elm, selectors);

      if (getNodeKey(elm)) {
        // it is a custom element, and we should then filter by slotted elements
        return getAllSlottedMatches(elm, nodeList);
      } else {
        // regular element, we should then filter by ownership
        return getAllMatches(owner, nodeList);
      }
    }

    function lightDomQuerySelector(elm, selector) {
      const owner = getNodeOwner(elm);

      if (isNull(owner)) {
        // the it is a root, and those can't have a lightdom
        return null;
      }

      const nodeList = querySelectorAll.call(elm, selector);

      if (getNodeKey(elm)) {
        // it is a custom element, and we should then filter by slotted elements
        return getFirstSlottedMatch(elm, nodeList);
      } else {
        // regular element, we should then filter by ownership
        return getFirstMatch(owner, nodeList);
      }
    }

    function shadowRootQuerySelector(root, selector) {
      const elm = getHost(root);
      const nodeList = querySelectorAll.call(elm, selector);
      return getFirstMatch(elm, nodeList);
    }

    function shadowRootQuerySelectorAll(root, selector) {
      const elm = getHost(root);
      const nodeList = querySelectorAll.call(elm, selector);
      return getAllMatches(elm, nodeList);
    }

    function getFilteredChildNodes(node) {
      let children;

      if (!isUndefined(getNodeKey(node))) {
        // node itself is a custom element
        // lwc element, in which case we need to get only the nodes
        // that were slotted
        const slots = querySelectorAll.call(node, 'slot');
        children = ArrayReduce.call(slots, (seed, slot) => {
          if (isNodeOwnedBy(node, slot)) {
            ArrayPush.apply(seed, getFilteredSlotAssignedNodes(slot));
          }

          return seed;
        }, []);
      } else {
        // regular element
        children = childNodesGetter.call(node);
      }

      const owner = getNodeOwner(node);

      if (isNull(owner)) {
        return [];
      } // Typescript is inferring the wrong function type for this particular
      // overloaded method: https://github.com/Microsoft/TypeScript/issues/27972
      // @ts-ignore type-mismatch


      return ArrayReduce.call(children, (seed, child) => {
        if (isNodeOwnedBy(owner, child)) {
          ArrayPush.call(seed, child);
        }

        return seed;
      }, []);
    }

    function PatchedElement(elm) {
      const Ctor = PatchedNode(elm);
      return class PatchedHTMLElement extends Ctor {
        querySelector(selector) {
          return lightDomQuerySelector(this, selector);
        }

        querySelectorAll(selectors) {
          return createStaticNodeList(lightDomQuerySelectorAll(this, selectors));
        }

        get innerHTML() {
          const childNodes = getInternalChildNodes(this);
          let innerHTML = '';

          for (let i = 0, len = childNodes.length; i < len; i += 1) {
            innerHTML += getOuterHTML(childNodes[i]);
          }

          return innerHTML;
        }

        set innerHTML(value) {
          innerHTMLSetter.call(this, value);
        }

        get outerHTML() {
          return getOuterHTML(this);
        }

      };
    }

    function PatchedIframeElement(elm) {
      const Ctor = PatchedElement(elm); // @ts-ignore type-mismatch

      return class PatchedHTMLIframeElement extends Ctor {
        get contentWindow() {
          const original = iFrameContentWindowGetter.call(this);

          if (original) {
            const wrapped = wrapIframeWindow(original);
            return wrapped;
          }

          return original;
        }

      };
    }
    /*
     * Copyright (c) 2018, salesforce.com, inc.
     * All rights reserved.
     * SPDX-License-Identifier: MIT
     * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
     */

    /*
     * Copyright (c) 2018, salesforce.com, inc.
     * All rights reserved.
     * SPDX-License-Identifier: MIT
     * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
     */


    let {
      addEventListener: windowAddEventListener,
      removeEventListener: windowRemoveEventListener
    } = window;
    /**
     * This trick to try to pick up the __lwcOriginal__ out of the intrinsic is to please
     * jsdom, who usually reuse intrinsic between different document.
     */
    // @ts-ignore jsdom

    windowAddEventListener = windowAddEventListener.__lwcOriginal__ || windowAddEventListener; // @ts-ignore jsdom

    windowRemoveEventListener = windowRemoveEventListener.__lwcOriginal__ || windowRemoveEventListener;
    /*
     * Copyright (c) 2018, salesforce.com, inc.
     * All rights reserved.
     * SPDX-License-Identifier: MIT
     * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
     */

    function doesEventNeedsPatch(e) {
      const originalTarget = eventTargetGetter.call(e);

      if (originalTarget instanceof Node) {
        if ((compareDocumentPosition.call(document, originalTarget) & DOCUMENT_POSITION_CONTAINED_BY) !== 0 && getNodeOwnerKey(originalTarget)) {
          return true;
        }
      }

      return false;
    }

    function getEventListenerWrapper(fnOrObj) {
      let wrapperFn = null;

      try {
        wrapperFn = fnOrObj.$$lwcEventWrapper$$;

        if (!wrapperFn) {
          const isHandlerFunction = typeof fnOrObj === 'function';

          wrapperFn = fnOrObj.$$lwcEventWrapper$$ = function (e) {
            // we don't want to patch every event, only when the original target is coming
            // from inside a synthetic shadow
            if (doesEventNeedsPatch(e)) {
              patchEvent(e);
            }

            return isHandlerFunction ? fnOrObj.call(this, e) : fnOrObj.handleEvent && fnOrObj.handleEvent(e);
          };
        }
      } catch (e) {
        /** ignore */
      }

      return wrapperFn;
    }

    function windowAddEventListener$1(type, fnOrObj, optionsOrCapture) {
      const handlerType = typeof fnOrObj; // bail if `fnOrObj` is not a function, not an object

      if (handlerType !== 'function' && handlerType !== 'object') {
        return;
      } // bail if `fnOrObj` is an object without a `handleEvent` method


      if (handlerType === 'object' && (!fnOrObj.handleEvent || typeof fnOrObj.handleEvent !== 'function')) {
        return;
      }

      const wrapperFn = getEventListenerWrapper(fnOrObj);
      windowAddEventListener.call(this, type, wrapperFn, optionsOrCapture);
    }

    function windowRemoveEventListener$1(type, fnOrObj, optionsOrCapture) {
      const wrapperFn = getEventListenerWrapper(fnOrObj);
      windowRemoveEventListener.call(this, type, wrapperFn || fnOrObj, optionsOrCapture);
    }

    function addEventListener$1(type, fnOrObj, optionsOrCapture) {
      const handlerType = typeof fnOrObj; // bail if `fnOrObj` is not a function, not an object

      if (handlerType !== 'function' && handlerType !== 'object') {
        return;
      } // bail if `fnOrObj` is an object without a `handleEvent` method


      if (handlerType === 'object' && (!fnOrObj.handleEvent || typeof fnOrObj.handleEvent !== 'function')) {
        return;
      }

      const wrapperFn = getEventListenerWrapper(fnOrObj);
      addEventListener.call(this, type, wrapperFn, optionsOrCapture);
    }

    function removeEventListener$1(type, fnOrObj, optionsOrCapture) {
      const wrapperFn = getEventListenerWrapper(fnOrObj);
      removeEventListener.call(this, type, wrapperFn || fnOrObj, optionsOrCapture);
    }

    addEventListener$1.__lwcOriginal__ = addEventListener;
    removeEventListener$1.__lwcOriginal__ = removeEventListener;
    windowAddEventListener$1.__lwcOriginal__ = windowAddEventListener;
    windowRemoveEventListener$1.__lwcOriginal__ = windowRemoveEventListener;

    function windowPatchListeners() {
      window.addEventListener = windowAddEventListener$1;
      window.removeEventListener = windowRemoveEventListener$1;
    }

    function nodePatchListeners() {
      Node.prototype.addEventListener = addEventListener$1;
      Node.prototype.removeEventListener = removeEventListener$1;
    }

    function apply() {
      windowPatchListeners();
      nodePatchListeners();
    }
    /*
     * Copyright (c) 2018, salesforce.com, inc.
     * All rights reserved.
     * SPDX-License-Identifier: MIT
     * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
     */


    {
      apply();
    }
    /*
     * Copyright (c) 2018, salesforce.com, inc.
     * All rights reserved.
     * SPDX-License-Identifier: MIT
     * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
     */
    // intentionally extracting the patched addEventListener and removeEventListener from Node.prototype
    // due to the issues with JSDOM patching hazard.

    const {
      addEventListener: addEventListener$2,
      removeEventListener: removeEventListener$2
    } = Node.prototype;
    var EventListenerContext;

    (function (EventListenerContext) {
      EventListenerContext[EventListenerContext["CUSTOM_ELEMENT_LISTENER"] = 1] = "CUSTOM_ELEMENT_LISTENER";
      EventListenerContext[EventListenerContext["SHADOW_ROOT_LISTENER"] = 2] = "SHADOW_ROOT_LISTENER";
    })(EventListenerContext || (EventListenerContext = {}));

    const eventToContextMap = new WeakMap();

    function isChildNode(root, node) {
      return !!(compareDocumentPosition.call(root, node) & DOCUMENT_POSITION_CONTAINED_BY);
    }

    const GET_ROOT_NODE_CONFIG_FALSE = {
      composed: false
    };

    function getRootNodeHost(node, options) {
      let rootNode = getRootNodeGetter.call(node, options); // is SyntheticShadowRootInterface

      if ('mode' in rootNode && 'delegatesFocus' in rootNode) {
        rootNode = getHost(rootNode);
      }

      return rootNode;
    }

    function targetGetter() {
      // currentTarget is always defined
      const originalCurrentTarget = eventCurrentTargetGetter.call(this);
      const originalTarget = eventTargetGetter.call(this);
      const composedPath = pathComposer(originalTarget, this.composed); // Handle cases where the currentTarget is null (for async events),
      // and when an event has been added to Window

      if (!(originalCurrentTarget instanceof Node)) {
        return retarget(document, composedPath);
      }

      const eventContext = eventToContextMap.get(this);
      const currentTarget = eventContext === EventListenerContext.SHADOW_ROOT_LISTENER ? getShadowRoot(originalCurrentTarget) : originalCurrentTarget;
      return retarget(currentTarget, composedPath);
    }

    function composedPathValue() {
      const originalTarget = eventTargetGetter.call(this);
      return pathComposer(originalTarget, this.composed);
    }

    function patchEvent(event) {
      if (eventToContextMap.has(event)) {
        return; // already patched
      }

      defineProperties(event, {
        target: {
          get: targetGetter,
          enumerable: true,
          configurable: true
        },
        composedPath: {
          value: composedPathValue,
          writable: true,
          enumerable: true,
          configurable: true
        },
        // non-standard but important accessor
        srcElement: {
          get: targetGetter,
          enumerable: true,
          configurable: true
        },
        path: {
          get: composedPathValue,
          enumerable: true,
          configurable: true
        }
      }); // not all events implement the relatedTarget getter, that's why we need to extract it from the instance
      // Note: we can't really use the super here because of issues with the typescript transpilation for accessors

      const originalRelatedTargetDescriptor = getPropertyDescriptor(event, 'relatedTarget');

      if (!isUndefined(originalRelatedTargetDescriptor)) {
        defineProperty(event, 'relatedTarget', {
          get() {
            const eventContext = eventToContextMap.get(this);
            const originalCurrentTarget = eventCurrentTargetGetter.call(this);
            const relatedTarget = originalRelatedTargetDescriptor.get.call(this);

            if (isNull(relatedTarget)) {
              return null;
            }

            const currentTarget = eventContext === EventListenerContext.SHADOW_ROOT_LISTENER ? getShadowRoot(originalCurrentTarget) : originalCurrentTarget;
            return retarget(currentTarget, pathComposer(relatedTarget, true));
          },

          enumerable: true,
          configurable: true
        });
      }

      eventToContextMap.set(event, 0);
    }

    const customElementToWrappedListeners = new WeakMap();

    function getEventMap(elm) {
      let listenerInfo = customElementToWrappedListeners.get(elm);

      if (isUndefined(listenerInfo)) {
        listenerInfo = create(null);
        customElementToWrappedListeners.set(elm, listenerInfo);
      }

      return listenerInfo;
    }

    const shadowRootEventListenerMap = new WeakMap();

    function getWrappedShadowRootListener(sr, listener) {
      if (!isFunction(listener)) {
        throw new TypeError(); // avoiding problems with non-valid listeners
      }

      let shadowRootWrappedListener = shadowRootEventListenerMap.get(listener);

      if (isUndefined(shadowRootWrappedListener)) {
        shadowRootWrappedListener = function (event) {
          // * if the event is dispatched directly on the host, it is not observable from root
          // * if the event is dispatched in an element that does not belongs to the shadow and it is not composed,
          //   it is not observable from the root
          const {
            composed
          } = event;
          const target = eventTargetGetter.call(event);
          const currentTarget = eventCurrentTargetGetter.call(event);

          if (target !== currentTarget) {
            const rootNode = getRootNodeHost(target, {
              composed
            });

            if (isChildNode(rootNode, currentTarget) || composed === false && rootNode === currentTarget) {
              listener.call(sr, event);
            }
          }
        };

        shadowRootWrappedListener.placement = EventListenerContext.SHADOW_ROOT_LISTENER;

        shadowRootEventListenerMap.set(listener, shadowRootWrappedListener);
      }

      return shadowRootWrappedListener;
    }

    const customElementEventListenerMap = new WeakMap();

    function getWrappedCustomElementListener(elm, listener) {
      if (!isFunction(listener)) {
        throw new TypeError(); // avoiding problems with non-valid listeners
      }

      let customElementWrappedListener = customElementEventListenerMap.get(listener);

      if (isUndefined(customElementWrappedListener)) {
        customElementWrappedListener = function (event) {
          if (isValidEventForCustomElement(event)) {
            // all handlers on the custom element should be called with undefined 'this'
            listener.call(elm, event);
          }
        };

        customElementWrappedListener.placement = EventListenerContext.CUSTOM_ELEMENT_LISTENER;

        customElementEventListenerMap.set(listener, customElementWrappedListener);
      }

      return customElementWrappedListener;
    }

    function domListener(evt) {
      let immediatePropagationStopped = false;
      let propagationStopped = false;
      const {
        type,
        stopImmediatePropagation,
        stopPropagation
      } = evt; // currentTarget is always defined

      const currentTarget = eventCurrentTargetGetter.call(evt);
      const listenerMap = getEventMap(currentTarget);
      const listeners = listenerMap[type]; // it must have listeners at this point

      defineProperty(evt, 'stopImmediatePropagation', {
        value() {
          immediatePropagationStopped = true;
          stopImmediatePropagation.call(evt);
        },

        writable: true,
        enumerable: true,
        configurable: true
      });
      defineProperty(evt, 'stopPropagation', {
        value() {
          propagationStopped = true;
          stopPropagation.call(evt);
        },

        writable: true,
        enumerable: true,
        configurable: true
      }); // in case a listener adds or removes other listeners during invocation

      const bookkeeping = ArraySlice.call(listeners);

      function invokeListenersByPlacement(placement) {
        forEach.call(bookkeeping, listener => {
          if (isFalse(immediatePropagationStopped) && listener.placement === placement) {
            // making sure that the listener was not removed from the original listener queue
            if (ArrayIndexOf.call(listeners, listener) !== -1) {
              // all handlers on the custom element should be called with undefined 'this'
              listener.call(undefined, evt);
            }
          }
        });
      }

      eventToContextMap.set(evt, EventListenerContext.SHADOW_ROOT_LISTENER);
      invokeListenersByPlacement(EventListenerContext.SHADOW_ROOT_LISTENER);

      if (isFalse(immediatePropagationStopped) && isFalse(propagationStopped)) {
        // doing the second iteration only if the first one didn't interrupt the event propagation
        eventToContextMap.set(evt, EventListenerContext.CUSTOM_ELEMENT_LISTENER);
        invokeListenersByPlacement(EventListenerContext.CUSTOM_ELEMENT_LISTENER);
      }

      eventToContextMap.set(evt, 0);
    }

    function attachDOMListener(elm, type, wrappedListener) {
      const listenerMap = getEventMap(elm);
      let cmpEventHandlers = listenerMap[type];

      if (isUndefined(cmpEventHandlers)) {
        cmpEventHandlers = listenerMap[type] = [];
      } // only add to DOM if there is no other listener on the same placement yet


      if (cmpEventHandlers.length === 0) {
        addEventListener$2.call(elm, type, domListener);
      }

      ArrayPush.call(cmpEventHandlers, wrappedListener);
    }

    function detachDOMListener(elm, type, wrappedListener) {
      const listenerMap = getEventMap(elm);
      let p;
      let listeners;

      if (!isUndefined(listeners = listenerMap[type]) && (p = ArrayIndexOf.call(listeners, wrappedListener)) !== -1) {
        ArraySplice.call(listeners, p, 1); // only remove from DOM if there is no other listener on the same placement

        if (listeners.length === 0) {
          removeEventListener$2.call(elm, type, domListener);
        }
      }
    }

    function isValidEventForCustomElement(event) {
      const target = eventTargetGetter.call(event);
      const currentTarget = eventCurrentTargetGetter.call(event);
      const {
        composed
      } = event;
      return (// it is composed, and we should always get it, or
        composed === true || // it is dispatched onto the custom element directly, or
        target === currentTarget || // it is coming from a slotted element
        isChildNode(getRootNodeHost(target, GET_ROOT_NODE_CONFIG_FALSE), currentTarget)
      );
    }

    function addCustomElementEventListener(elm, type, listener, options) {

      const wrappedListener = getWrappedCustomElementListener(elm, listener);
      attachDOMListener(elm, type, wrappedListener);
    }

    function removeCustomElementEventListener(elm, type, listener, _options) {
      const wrappedListener = getWrappedCustomElementListener(elm, listener);
      detachDOMListener(elm, type, wrappedListener);
    }

    function addShadowRootEventListener(sr, type, listener, options) {

      const elm = getHost(sr);
      const wrappedListener = getWrappedShadowRootListener(sr, listener);
      attachDOMListener(elm, type, wrappedListener);
    }

    function removeShadowRootEventListener(sr, type, listener, _options) {
      const elm = getHost(sr);
      const wrappedListener = getWrappedShadowRootListener(sr, listener);
      detachDOMListener(elm, type, wrappedListener);
    }
    /*
     * Copyright (c) 2018, salesforce.com, inc.
     * All rights reserved.
     * SPDX-License-Identifier: MIT
     * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
     */


    const TabbableElementsQuery = `
    button:not([tabindex="-1"]):not([disabled]),
    [contenteditable]:not([tabindex="-1"]),
    video[controls]:not([tabindex="-1"]),
    audio[controls]:not([tabindex="-1"]),
    [href]:not([tabindex="-1"]),
    input:not([tabindex="-1"]):not([disabled]),
    select:not([tabindex="-1"]):not([disabled]),
    textarea:not([tabindex="-1"]):not([disabled]),
    [tabindex="0"]
`;

    function isVisible(element) {
      const {
        width,
        height
      } = getBoundingClientRect.call(element);
      const noZeroSize = width > 0 || height > 0;
      return noZeroSize && getComputedStyle(element).visibility !== 'hidden';
    }

    function hasFocusableTabIndex(element) {
      if (isFalse(hasAttribute.call(element, 'tabindex'))) {
        return false;
      }

      const value = getAttribute.call(element, 'tabindex'); // Really, any numeric tabindex value is valid
      // But LWC only allows 0 or -1, so we can just check against that.
      // The main point here is to make sure the tabindex attribute is not an invalid
      // value like tabindex="hello"

      if (value === '' || value !== '0' && value !== '-1') {
        return false;
      }

      return true;
    } // This function based on https://allyjs.io/data-tables/focusable.html
    // It won't catch everything, but should be good enough
    // There are a lot of edge cases here that we can't realistically handle
    // Determines if a particular element is tabbable, as opposed to simply focusable
    // Exported for jest purposes


    function isTabbable(element) {
      return matches.call(element, TabbableElementsQuery) && isVisible(element);
    }

    const focusableTagNames = {
      IFRAME: 1,
      VIDEO: 1,
      AUDIO: 1,
      A: 1,
      INPUT: 1,
      SELECT: 1,
      TEXTAREA: 1,
      BUTTON: 1
    }; // This function based on https://allyjs.io/data-tables/focusable.html
    // It won't catch everything, but should be good enough
    // There are a lot of edge cases here that we can't realistically handle
    // Exported for jest purposes

    function isFocusable(element) {
      const tagName = tagNameGetter.call(element);
      return isVisible(element) && (hasFocusableTabIndex(element) || hasAttribute.call(element, 'contenteditable') || hasOwnProperty.call(focusableTagNames, tagName));
    }

    function getFirstTabbableMatch(elements) {
      for (let i = 0, len = elements.length; i < len; i += 1) {
        const elm = elements[i];

        if (isTabbable(elm)) {
          return elm;
        }
      }

      return null;
    }

    function getLastTabbableMatch(elements) {
      for (let i = elements.length - 1; i >= 0; i -= 1) {
        const elm = elements[i];

        if (isTabbable(elm)) {
          return elm;
        }
      }

      return null;
    }

    function getTabbableSegments(host) {
      const all = querySelectorAll$1.call(document, TabbableElementsQuery);
      const inner = ArraySlice.call(querySelectorAll.call(host, TabbableElementsQuery));

      const firstChild = inner[0];
      const lastChild = inner[inner.length - 1];
      const hostIndex = ArrayIndexOf.call(all, host); // Host element can show up in our "previous" section if its tabindex is 0
      // We want to filter that out here

      const firstChildIndex = hostIndex > -1 ? hostIndex : ArrayIndexOf.call(all, firstChild); // Account for an empty inner list

      const lastChildIndex = inner.length === 0 ? firstChildIndex + 1 : ArrayIndexOf.call(all, lastChild) + 1;
      const prev = ArraySlice.call(all, 0, firstChildIndex);
      const next = ArraySlice.call(all, lastChildIndex);
      return {
        prev,
        inner,
        next
      };
    }

    function getActiveElement(host) {
      const activeElement = DocumentPrototypeActiveElement.call(document);

      if (isNull(activeElement)) {
        return activeElement;
      } // activeElement must be child of the host and owned by it


      return (compareDocumentPosition.call(host, activeElement) & DOCUMENT_POSITION_CONTAINED_BY) !== 0 ? activeElement : null;
    }

    function relatedTargetPosition(host, relatedTarget) {
      // assert: target must be child of host
      const pos = compareDocumentPosition.call(host, relatedTarget);

      if (pos & DOCUMENT_POSITION_CONTAINED_BY) {
        // focus remains inside the host
        return 0;
      } else if (pos & DOCUMENT_POSITION_PRECEDING) {
        // focus is coming from above
        return 1;
      } else if (pos & DOCUMENT_POSITION_FOLLOWING) {
        // focus is coming from below
        return 2;
      } // we don't know what's going on.


      return -1;
    }

    function getPreviousTabbableElement(segments) {
      const {
        prev
      } = segments;
      return getFirstTabbableMatch(ArrayReverse.call(prev));
    }

    function getNextTabbableElement(segments) {
      const {
        next
      } = segments;
      return getFirstTabbableMatch(next);
    }

    function focusOnNextOrBlur(focusEventTarget, segments) {
      const nextNode = getNextTabbableElement(segments);

      if (isNull(nextNode)) {
        // nothing to focus on, blur to invalidate the operation
        focusEventTarget.blur();
        return;
      }

      nextNode.focus();
    }

    function focusOnPrevOrBlur(focusEventTarget, segments) {
      const prevNode = getPreviousTabbableElement(segments);

      if (isNull(prevNode)) {
        // nothing to focus on, blur to invalidate the operation
        focusEventTarget.blur();
        return;
      }

      prevNode.focus();
    }

    function isFirstTabbableChild(target, segments) {
      return getFirstTabbableMatch(segments.inner) === target;
    }

    function isLastTabbableChild(target, segments) {
      return getLastTabbableMatch(segments.inner) === target;
    }

    function keyboardFocusHandler(event) {
      const host = eventCurrentTargetGetter.call(event);
      const target = eventTargetGetter.call(event); // Ideally, we would be able to use a "focus" event that doesn't bubble
      // but, IE11 doesn't support relatedTarget on focus events so we have to use
      // focusin instead. The logic below is predicated on non-bubbling events
      // So, if currentTarget(host) ir not target, we know that the event is bubbling
      // and we escape because focus occured on something below the host.

      if (host !== target) {
        return;
      }

      const relatedTarget = focusEventRelatedTargetGetter.call(event);

      if (isNull(relatedTarget)) {
        return;
      }

      const segments = getTabbableSegments(host);
      const position = relatedTargetPosition(host, relatedTarget);

      if (position === 1) {
        // probably tabbing into element
        const first = getFirstTabbableMatch(segments.inner);

        if (!isNull(first)) {
          first.focus();
        } else {
          focusOnNextOrBlur(target, segments);
        }

        return;
      } else if (host === target) {
        // Shift tabbed back to the host
        focusOnPrevOrBlur(host, segments);
      }
    } // focusin handler for custom elements
    // This handler should only be called when a user
    // focuses on either the custom element, or an internal element
    // via keyboard navigation (tab or shift+tab)
    // Focusing via mouse should be disqualified before this gets called


    function keyboardFocusInHandler(event) {
      const host = eventCurrentTargetGetter.call(event);
      const target = eventTargetGetter.call(event);
      const relatedTarget = focusEventRelatedTargetGetter.call(event);
      const segments = getTabbableSegments(host);
      const isFirstFocusableChildReceivingFocus = isFirstTabbableChild(target, segments);
      const isLastFocusableChildReceivingFocus = isLastTabbableChild(target, segments);

      if ( // If we receive a focusin event that is not focusing on the first or last
      // element inside of a shadow, we can assume that the user is tabbing between
      // elements inside of the custom element shadow, so we do nothing
      isFalse(isFirstFocusableChildReceivingFocus) && isFalse(isLastFocusableChildReceivingFocus) || // If related target is null, user is probably tabbing into the document from the browser chrome (location bar?)
      // If relatedTarget is null, we can't do much here because we don't know what direction the user is tabbing
      // This is a bit of an edge case, and only comes up if the custom element is the very first or very last
      // tabbable element in a document
      isNull(relatedTarget)) {
        return;
      } // Determine where the focus is coming from (Tab or Shift+Tab)


      const post = relatedTargetPosition(host, relatedTarget);

      switch (post) {
        case 1:
          // focus is probably coming from above
          if (isFirstFocusableChildReceivingFocus && relatedTarget === getPreviousTabbableElement(segments)) {
            // the focus was on the immediate focusable elements from above,
            // it is almost certain that the focus is due to tab keypress
            focusOnNextOrBlur(target, segments);
          }

          break;

        case 2:
          // focus is probably coming from below
          if (isLastFocusableChildReceivingFocus && relatedTarget === getNextTabbableElement(segments)) {
            // the focus was on the immediate focusable elements from above,
            // it is almost certain that the focus is due to tab keypress
            focusOnPrevOrBlur(target, segments);
          }

          break;
      }
    }

    function willTriggerFocusInEvent(target) {
      return target !== DocumentPrototypeActiveElement.call(document) && isFocusable(target) // if the element is currently active, it will not fire a focusin event
      ;
    }

    function enterMouseDownState(evt) {
      const currentTarget = eventCurrentTargetGetter.call(evt);
      removeEventListener.call(currentTarget, 'focusin', keyboardFocusInHandler);
      setTimeout(() => {
        // only reinstate the focus if the tabindex is still -1
        if (tabIndexGetter.call(currentTarget) === -1) {
          addEventListener.call(currentTarget, 'focusin', keyboardFocusInHandler);
        }
      }, 0);
    }

    function exitMouseDownState(event) {
      const currentTarget = eventCurrentTargetGetter.call(event);
      const relatedTarget = focusEventRelatedTargetGetter.call(event); // If the focused element is null or the focused element is no longer internal

      if (isNull(relatedTarget) || relatedTargetPosition(currentTarget, relatedTarget) !== 0) {
        removeEventListener.call(currentTarget, 'focusin', enterMouseDownState, true);
        removeEventListener.call(currentTarget, 'focusout', exitMouseDownState, true);
      }
    }

    function handleFocusMouseDown(evt) {
      const target = eventTargetGetter.call(evt); // If we are mouse down in an element that can be focused
      // and the currentTarget's activeElement is not element we are mouse-ing down in
      // We can bail out and let the browser do its thing.

      if (willTriggerFocusInEvent(target)) {
        const currentTarget = eventCurrentTargetGetter.call(evt); // Enter the temporary state where we disable the keyboard focusin handler when we click into the shadow.

        addEventListener.call(currentTarget, 'focusin', enterMouseDownState, true); // Exit the temporary state When focus leaves the shadow.

        addEventListener.call(currentTarget, 'focusout', exitMouseDownState, true);
      }
    }

    function handleFocus(elm) {


      ignoreFocusIn(elm);
      addEventListener.call(elm, 'focusin', keyboardFocusHandler, true);
    }

    function ignoreFocus(elm) {
      removeEventListener.call(elm, 'focusin', keyboardFocusHandler, true);
    }

    function handleFocusIn(elm) {


      ignoreFocus(elm); // We want to listen for mousedown
      // If the user is triggering a mousedown event on an element
      // That can trigger a focus event, then we need to opt out
      // of our tabindex -1 dance. The tabindex -1 only applies for keyboard navigation

      addEventListener.call(elm, 'mousedown', handleFocusMouseDown, true); // This focusin listener is to catch focusin events from keyboard interactions
      // A better solution would perhaps be to listen for keydown events, but
      // the keydown event happens on whatever element already has focus (or no element
      // at all in the case of the location bar. So, instead we have to assume that focusin
      // without a mousedown means keyboard navigation

      addEventListener.call(elm, 'focusin', keyboardFocusInHandler);
    }

    function ignoreFocusIn(elm) {

      removeEventListener.call(elm, 'focusin', keyboardFocusInHandler);
      removeEventListener.call(elm, 'mousedown', handleFocusMouseDown, true);
    }
    /*
     * Copyright (c) 2018, salesforce.com, inc.
     * All rights reserved.
     * SPDX-License-Identifier: MIT
     * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
     */


    function PatchedCustomElement(Base) {
      const Ctor = PatchedElement(Base);
      return class PatchedHTMLElement extends Ctor {
        attachShadow(options) {
          return attachShadow(this, options);
        }

        addEventListener(type, listener, options) {
          addCustomElementEventListener(this, type, listener, options);
        }

        removeEventListener(type, listener, options) {
          removeCustomElementEventListener(this, type, listener, options);
        }

        get shadowRoot() {
          const shadow = getShadowRoot(this);

          if (shadow.mode === 'open') {
            return shadow;
          }

          return null;
        }

        get tabIndex() {
          if (isDelegatingFocus(this) && isFalse(hasAttribute.call(this, 'tabindex'))) {
            // this cover the case where the default tabindex should be 0 because the
            // custom element is delegating its focus
            return 0;
          } // NOTE: Technically this should be `super.tabIndex` however Typescript
          // has a known bug while transpiling down to ES5
          // https://github.com/Microsoft/TypeScript/issues/338


          const descriptor = getPropertyDescriptor(Ctor.prototype, 'tabIndex');
          return descriptor.get.call(this);
        }

        set tabIndex(value) {
          // get the original value from the element before changing it, just in case
          // the custom element is doing something funky. we only really care about
          // the actual changes in the DOM.
          const hasAttr = hasAttribute.call(this, 'tabindex');
          const originalValue = tabIndexGetter.call(this); // run the super logic, which bridges the setter to the component
          // NOTE: Technically this should be `super.tabIndex` however Typescript
          // has a known bug while transpiling down to ES5
          // https://github.com/Microsoft/TypeScript/issues/338

          const descriptor = getPropertyDescriptor(Ctor.prototype, 'tabIndex');
          descriptor.set.call(this, value); // Check if the value from the dom has changed

          const newValue = tabIndexGetter.call(this);

          if (!hasAttr || originalValue !== newValue) {
            // Value has changed
            if (newValue === -1) {
              // add the magic to skip this element
              handleFocusIn(this);
            } else if (newValue === 0 && isDelegatingFocus(this)) {
              // Listen for focus if the new tabIndex is 0, and we are delegating focus
              handleFocus(this);
            } else {
              // TabIndex is set to 0, but we aren't delegating focus, so we can ignore everything
              ignoreFocusIn(this);
              ignoreFocus(this);
            }
          } else if (originalValue === -1) {
            // remove the magic
            ignoreFocusIn(this);
            ignoreFocus(this);
          }
        }

        blur() {
          if (isDelegatingFocus(this)) {
            const currentActiveElement = getActiveElement(this);

            if (!isNull(currentActiveElement)) {
              // if there is an active element, blur it
              currentActiveElement.blur();
              return;
            }
          }

          super.blur();
        }

        get childNodes() {
          const owner = getNodeOwner(this);
          const childNodes = isNull(owner) ? [] : getAllMatches(owner, getFilteredChildNodes(this));

          return createStaticNodeList(childNodes);
        }

        get children() {

          const owner = getNodeOwner(this);
          const childNodes = isNull(owner) ? [] : getAllMatches(owner, getFilteredChildNodes(this));
          return createStaticHTMLCollection(ArrayFilter.call(childNodes, node => node instanceof Element));
        }

      };
    }
    /*
     * Copyright (c) 2018, salesforce.com, inc.
     * All rights reserved.
     * SPDX-License-Identifier: MIT
     * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
     */
    // Using a WeakMap instead of a WeakSet because this one works in IE11 :(


    const FromIteration = new WeakMap(); // dynamic children means it was generated by an iteration
    // in a template, and will require a more complex diffing algo.

    function markAsDynamicChildren(children) {
      FromIteration.set(children, 1);
    }

    function hasDynamicChildren(children) {
      return FromIteration.has(children);
    }

    let TextNodeProto; // this method is supposed to be invoked when in fallback mode only
    // to patch text nodes generated by a template.

    function patchTextNodeProto(text) {
      if (isUndefined(TextNodeProto)) {
        TextNodeProto = PatchedNode(text).prototype;
      }

      setPrototypeOf(text, TextNodeProto);
    }

    let CommentNodeProto; // this method is supposed to be invoked when in fallback mode only
    // to patch comment nodes generated by a template.

    function patchCommentNodeProto(comment) {
      if (isUndefined(CommentNodeProto)) {
        CommentNodeProto = PatchedNode(comment).prototype;
      }

      setPrototypeOf(comment, CommentNodeProto);
    }

    const TagToProtoCache = create(null);

    function getPatchedElementClass(elm) {
      switch (tagNameGetter.call(elm)) {
        case 'SLOT':
          return PatchedSlotElement(elm);

        case 'IFRAME':
          return PatchedIframeElement(elm);
      }

      return PatchedElement(elm);
    } // this method is supposed to be invoked when in fallback mode only
    // to patch elements generated by a template.


    function patchElementProto(elm, options) {
      const {
        sel,
        isPortal,
        shadowAttribute
      } = options;
      let proto = TagToProtoCache[sel];

      if (isUndefined(proto)) {
        proto = TagToProtoCache[sel] = getPatchedElementClass(elm).prototype;
      }

      setPrototypeOf(elm, proto);

      if (isTrue(isPortal)) {
        markElementAsPortal(elm);
      }

      setCSSToken(elm, shadowAttribute);
    }

    function patchCustomElementProto(elm, options) {
      const {
        def,
        shadowAttribute
      } = options;
      let patchedBridge = def.patchedBridge;

      if (isUndefined(patchedBridge)) {
        patchedBridge = def.patchedBridge = PatchedCustomElement(elm);
      } // temporary patching the proto, eventually this should be just more nodes in the proto chain


      setPrototypeOf(elm, patchedBridge.prototype);
      setCSSToken(elm, shadowAttribute);
    }
    /*
     * Copyright (c) 2018, salesforce.com, inc.
     * All rights reserved.
     * SPDX-License-Identifier: MIT
     * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
     */

    /**
    @license
    Copyright (c) 2015 Simon Friis Vindum.
    This code may only be used under the MIT License found at
    https://github.com/snabbdom/snabbdom/blob/master/LICENSE
    Code distributed by Snabbdom as part of the Snabbdom project at
    https://github.com/snabbdom/snabbdom/
    */


    function isUndef(s) {
      return s === undefined;
    }

    function sameVnode(vnode1, vnode2) {
      return vnode1.key === vnode2.key && vnode1.sel === vnode2.sel;
    }

    function isVNode(vnode) {
      return vnode != null;
    }

    function createKeyToOldIdx(children, beginIdx, endIdx) {
      const map = {};
      let j, key, ch; // TODO: simplify this by assuming that all vnodes has keys

      for (j = beginIdx; j <= endIdx; ++j) {
        ch = children[j];

        if (isVNode(ch)) {
          key = ch.key;

          if (key !== undefined) {
            map[key] = j;
          }
        }
      }

      return map;
    }

    function addVnodes(parentElm, before, vnodes, startIdx, endIdx) {
      for (; startIdx <= endIdx; ++startIdx) {
        const ch = vnodes[startIdx];

        if (isVNode(ch)) {
          ch.hook.create(ch);
          ch.hook.insert(ch, parentElm, before);
        }
      }
    }

    function removeVnodes(parentElm, vnodes, startIdx, endIdx) {
      for (; startIdx <= endIdx; ++startIdx) {
        const ch = vnodes[startIdx]; // text nodes do not have logic associated to them

        if (isVNode(ch)) {
          ch.hook.remove(ch, parentElm);
        }
      }
    }

    function updateDynamicChildren(parentElm, oldCh, newCh) {
      let oldStartIdx = 0;
      let newStartIdx = 0;
      let oldEndIdx = oldCh.length - 1;
      let oldStartVnode = oldCh[0];
      let oldEndVnode = oldCh[oldEndIdx];
      let newEndIdx = newCh.length - 1;
      let newStartVnode = newCh[0];
      let newEndVnode = newCh[newEndIdx];
      let oldKeyToIdx;
      let idxInOld;
      let elmToMove;
      let before;

      while (oldStartIdx <= oldEndIdx && newStartIdx <= newEndIdx) {
        if (!isVNode(oldStartVnode)) {
          oldStartVnode = oldCh[++oldStartIdx]; // Vnode might have been moved left
        } else if (!isVNode(oldEndVnode)) {
          oldEndVnode = oldCh[--oldEndIdx];
        } else if (!isVNode(newStartVnode)) {
          newStartVnode = newCh[++newStartIdx];
        } else if (!isVNode(newEndVnode)) {
          newEndVnode = newCh[--newEndIdx];
        } else if (sameVnode(oldStartVnode, newStartVnode)) {
          patchVnode(oldStartVnode, newStartVnode);
          oldStartVnode = oldCh[++oldStartIdx];
          newStartVnode = newCh[++newStartIdx];
        } else if (sameVnode(oldEndVnode, newEndVnode)) {
          patchVnode(oldEndVnode, newEndVnode);
          oldEndVnode = oldCh[--oldEndIdx];
          newEndVnode = newCh[--newEndIdx];
        } else if (sameVnode(oldStartVnode, newEndVnode)) {
          // Vnode moved right
          patchVnode(oldStartVnode, newEndVnode);
          newEndVnode.hook.move(oldStartVnode, parentElm, // TODO: resolve this, but using dot notation for nextSibling for now
          oldEndVnode.elm.nextSibling);
          oldStartVnode = oldCh[++oldStartIdx];
          newEndVnode = newCh[--newEndIdx];
        } else if (sameVnode(oldEndVnode, newStartVnode)) {
          // Vnode moved left
          patchVnode(oldEndVnode, newStartVnode);
          newStartVnode.hook.move(oldEndVnode, parentElm, oldStartVnode.elm);
          oldEndVnode = oldCh[--oldEndIdx];
          newStartVnode = newCh[++newStartIdx];
        } else {
          if (oldKeyToIdx === undefined) {
            oldKeyToIdx = createKeyToOldIdx(oldCh, oldStartIdx, oldEndIdx);
          }

          idxInOld = oldKeyToIdx[newStartVnode.key];

          if (isUndef(idxInOld)) {
            // New element
            newStartVnode.hook.create(newStartVnode);
            newStartVnode.hook.insert(newStartVnode, parentElm, oldStartVnode.elm);
            newStartVnode = newCh[++newStartIdx];
          } else {
            elmToMove = oldCh[idxInOld];

            if (isVNode(elmToMove)) {
              if (elmToMove.sel !== newStartVnode.sel) {
                // New element
                newStartVnode.hook.create(newStartVnode);
                newStartVnode.hook.insert(newStartVnode, parentElm, oldStartVnode.elm);
              } else {
                patchVnode(elmToMove, newStartVnode);
                oldCh[idxInOld] = undefined;
                newStartVnode.hook.move(elmToMove, parentElm, oldStartVnode.elm);
              }
            }

            newStartVnode = newCh[++newStartIdx];
          }
        }
      }

      if (oldStartIdx <= oldEndIdx || newStartIdx <= newEndIdx) {
        if (oldStartIdx > oldEndIdx) {
          const n = newCh[newEndIdx + 1];
          before = isVNode(n) ? n.elm : null;
          addVnodes(parentElm, before, newCh, newStartIdx, newEndIdx);
        } else {
          removeVnodes(parentElm, oldCh, oldStartIdx, oldEndIdx);
        }
      }
    }

    function updateStaticChildren(parentElm, oldCh, newCh) {
      const {
        length
      } = newCh;

      if (oldCh.length === 0) {
        // the old list is empty, we can directly insert anything new
        addVnodes(parentElm, null, newCh, 0, length);
        return;
      } // if the old list is not empty, the new list MUST have the same
      // amount of nodes, that's why we call this static children


      let referenceElm = null;

      for (let i = length - 1; i >= 0; i -= 1) {
        const vnode = newCh[i];
        const oldVNode = oldCh[i];

        if (vnode !== oldVNode) {
          if (isVNode(oldVNode)) {
            if (isVNode(vnode)) {
              // both vnodes must be equivalent, and se just need to patch them
              patchVnode(oldVNode, vnode);
              referenceElm = vnode.elm;
            } else {
              // removing the old vnode since the new one is null
              oldVNode.hook.remove(oldVNode, parentElm);
            }
          } else if (isVNode(vnode)) {
            // this condition is unnecessary
            vnode.hook.create(vnode); // insert the new node one since the old one is null

            vnode.hook.insert(vnode, parentElm, referenceElm);
            referenceElm = vnode.elm;
          }
        }
      }
    }

    function patchVnode(oldVnode, vnode) {
      if (oldVnode !== vnode) {
        vnode.elm = oldVnode.elm;
        vnode.hook.update(oldVnode, vnode);
      }
    }
    /*
     * Copyright (c) 2018, salesforce.com, inc.
     * All rights reserved.
     * SPDX-License-Identifier: MIT
     * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
     */


    const noop = () => void 0;

    function updateNodeHook(oldVnode, vnode) {
      if (oldVnode.text !== vnode.text) {
        nodeValueSetter.call(vnode.elm, vnode.text);
      }
    }

    function insertNodeHook(vnode, parentNode, referenceNode) {
      insertBefore.call(parentNode, vnode.elm, referenceNode);
    }

    function removeNodeHook(vnode, parentNode) {
      removeChild.call(parentNode, vnode.elm);
    }

    function createTextHook(vnode) {
      const text = vnode.elm;
      const {
        uid,
        fallback
      } = vnode.owner;
      setNodeOwnerKey$1(text, uid);

      if (isTrue(fallback)) {
        patchTextNodeProto(text);
      }
    }

    function createCommentHook(vnode) {
      const comment = vnode.elm;
      const {
        uid,
        fallback
      } = vnode.owner;
      setNodeOwnerKey$1(comment, uid);

      if (isTrue(fallback)) {
        patchCommentNodeProto(comment);
      }
    }

    function createElmDefaultHook(vnode) {
      modEvents.create(vnode); // Attrs need to be applied to element before props
      // IE11 will wipe out value on radio inputs if value
      // is set before type=radio.

      modAttrs.create(vnode);
      modProps.create(vnode);
      modStaticClassName.create(vnode);
      modStaticStyle.create(vnode);
      modComputedClassName.create(vnode);
      modComputedStyle.create(vnode);
      contextModule.create(vnode);
    }

    var LWCDOMMode;

    (function (LWCDOMMode) {
      LWCDOMMode["manual"] = "manual";
    })(LWCDOMMode || (LWCDOMMode = {}));

    function createElmHook(vnode) {
      const {
        owner,
        sel
      } = vnode;
      const elm = vnode.elm;
      setNodeOwnerKey$1(elm, owner.uid);

      if (isTrue(owner.fallback)) {
        const {
          data: {
            context
          }
        } = vnode;
        const {
          shadowAttribute
        } = owner.context;
        const isPortal = !isUndefined(context) && !isUndefined(context.lwc) && context.lwc.dom === LWCDOMMode.manual;
        patchElementProto(elm, {
          sel,
          isPortal,
          shadowAttribute
        });
      }
    }

    function updateElmDefaultHook(oldVnode, vnode) {
      // Attrs need to be applied to element before props
      // IE11 will wipe out value on radio inputs if value
      // is set before type=radio.
      modAttrs.update(oldVnode, vnode);
      modProps.update(oldVnode, vnode);
      modComputedClassName.update(oldVnode, vnode);
      modComputedStyle.update(oldVnode, vnode);
    }

    function insertCustomElmHook(vnode) {
      const vm = getCustomElementVM(vnode.elm);
      appendVM(vm);
    }

    function updateChildrenHook(oldVnode, vnode) {
      const {
        children,
        owner
      } = vnode;
      const fn = hasDynamicChildren(children) ? updateDynamicChildren : updateStaticChildren;
      runWithBoundaryProtection(owner, owner.owner, noop, () => {
        fn(vnode.elm, oldVnode.children, children);
      }, noop);
    }

    function allocateChildrenHook(vnode) {
      if (isTrue(vnode.owner.fallback)) {
        // slow path
        const elm = vnode.elm;
        const vm = getCustomElementVM(elm);
        const children = vnode.children;
        allocateInSlot(vm, children); // every child vnode is now allocated, and the host should receive none directly, it receives them via the shadow!

        vnode.children = EmptyArray;
      }
    }

    function createCustomElmHook(vnode) {
      const elm = vnode.elm;

      if (hasOwnProperty.call(elm, ViewModelReflection)) {
        // There is a possibility that a custom element is registered under tagName,
        // in which case, the initialization is already carry on, and there is nothing else
        // to do here since this hook is called right after invoking `document.createElement`.
        return;
      }

      const {
        mode,
        ctor,
        owner
      } = vnode;
      const {
        uid,
        fallback
      } = owner;
      setNodeOwnerKey$1(elm, uid);
      const def = getComponentDef(ctor);
      setElementProto(elm, def);

      if (isTrue(fallback)) {
        const {
          shadowAttribute
        } = owner.context;
        patchCustomElementProto(elm, {
          def,
          shadowAttribute
        });
      }

      createVM(vnode.sel, elm, ctor, {
        mode,
        fallback,
        owner
      });
      const vm = getCustomElementVM(elm);
    }

    function createCustomElmDefaultHook(vnode) {
      modEvents.create(vnode); // Attrs need to be applied to element before props
      // IE11 will wipe out value on radio inputs if value
      // is set before type=radio.

      modAttrs.create(vnode);
      modProps.create(vnode);
      modStaticClassName.create(vnode);
      modStaticStyle.create(vnode);
      modComputedClassName.create(vnode);
      modComputedStyle.create(vnode);
      contextModule.create(vnode);
    }

    function createChildrenHook(vnode) {
      const {
        elm,
        children
      } = vnode;

      for (let j = 0; j < children.length; ++j) {
        const ch = children[j];

        if (ch != null) {
          ch.hook.create(ch);
          ch.hook.insert(ch, elm, null);
        }
      }
    }

    function rerenderCustomElmHook(vnode) {
      const vm = getCustomElementVM(vnode.elm);

      rerenderVM(vm);
    }

    function updateCustomElmDefaultHook(oldVnode, vnode) {
      // Attrs need to be applied to element before props
      // IE11 will wipe out value on radio inputs if value
      // is set before type=radio.
      modAttrs.update(oldVnode, vnode);
      modProps.update(oldVnode, vnode);
      modComputedClassName.update(oldVnode, vnode);
      modComputedStyle.update(oldVnode, vnode);
    }

    function removeElmHook(vnode) {
      // this method only needs to search on child vnodes from template
      // to trigger the remove hook just in case some of those children
      // are custom elements.
      const {
        children,
        elm
      } = vnode;

      for (let j = 0, len = children.length; j < len; ++j) {
        const ch = children[j];

        if (!isNull(ch)) {
          ch.hook.remove(ch, elm);
        }
      }
    }

    function removeCustomElmHook(vnode) {
      // for custom elements we don't have to go recursively because the removeVM routine
      // will take care of disconnecting any child VM attached to its shadow as well.
      removeVM(getCustomElementVM(vnode.elm));
    }
    /*
     * Copyright (c) 2018, salesforce.com, inc.
     * All rights reserved.
     * SPDX-License-Identifier: MIT
     * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
     */


    const Services = create(null);

    function invokeServiceHook(vm, cbs) {

      const {
        component,
        data,
        def,
        context
      } = vm;

      for (let i = 0, len = cbs.length; i < len; ++i) {
        cbs[i].call(undefined, component, data, def, context);
      }
    }
    /*
     * Copyright (c) 2018, salesforce.com, inc.
     * All rights reserved.
     * SPDX-License-Identifier: MIT
     * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
     */


    const {
      createElement: createElement$1,
      createElementNS: createElementNS$1,
      createTextNode: createTextNode$1,
      createComment: createComment$1
    } = document;
    const CHAR_S = 115;
    const CHAR_V = 118;
    const CHAR_G = 103;
    const NamespaceAttributeForSVG = 'http://www.w3.org/2000/svg';
    const SymbolIterator = Symbol.iterator;
    const TextHook = {
      create: vnode => {
        if (isUndefined(vnode.elm)) {
          // supporting the ability to inject an element via a vnode
          // this is used mostly for caching in compiler
          vnode.elm = createTextNode$1.call(document, vnode.text);
        }

        createTextHook(vnode);
      },
      update: updateNodeHook,
      insert: insertNodeHook,
      move: insertNodeHook,
      remove: removeNodeHook
    };
    const CommentHook = {
      create: vnode => {
        if (isUndefined(vnode.elm)) {
          // supporting the ability to inject an element via a vnode
          // this is used mostly for caching in compiler
          vnode.elm = createComment$1.call(document, vnode.text);
        }

        createCommentHook(vnode);
      },
      update: updateNodeHook,
      insert: insertNodeHook,
      move: insertNodeHook,
      remove: removeNodeHook
    }; // insert is called after update, which is used somewhere else (via a module)
    // to mark the vm as inserted, that means we cannot use update as the main channel
    // to rehydrate when dirty, because sometimes the element is not inserted just yet,
    // which breaks some invariants. For that reason, we have the following for any
    // Custom Element that is inserted via a template.

    const ElementHook = {
      create: vnode => {
        const {
          data,
          sel,
          elm
        } = vnode;
        const {
          ns,
          create: create$$1
        } = data;

        if (isUndefined(elm)) {
          // supporting the ability to inject an element via a vnode
          // this is used mostly for caching in compiler and style tags
          vnode.elm = isUndefined(ns) ? createElement$1.call(document, sel) : createElementNS$1.call(document, ns, sel);
        }

        createElmHook(vnode);
        create$$1(vnode);
      },
      update: (oldVnode, vnode) => {
        const {
          data: {
            update
          }
        } = vnode;
        update(oldVnode, vnode);
        updateChildrenHook(oldVnode, vnode);
      },
      insert: (vnode, parentNode, referenceNode) => {
        insertNodeHook(vnode, parentNode, referenceNode);
        createChildrenHook(vnode);
      },
      move: (vnode, parentNode, referenceNode) => {
        insertNodeHook(vnode, parentNode, referenceNode);
      },
      remove: (vnode, parentNode) => {
        removeNodeHook(vnode, parentNode);
        removeElmHook(vnode);
      }
    };
    const CustomElementHook = {
      create: vnode => {
        const {
          sel,
          data: {
            create: create$$1
          },
          elm
        } = vnode;

        if (isUndefined(elm)) {
          // supporting the ability to inject an element via a vnode
          // this is used mostly for caching in compiler and style tags
          vnode.elm = createElement$1.call(document, sel);
        }

        createCustomElmHook(vnode);
        allocateChildrenHook(vnode);
        create$$1(vnode);
      },
      update: (oldVnode, vnode) => {
        const {
          data: {
            update
          }
        } = vnode;
        update(oldVnode, vnode); // in fallback mode, the allocation will always the children to
        // empty and delegate the real allocation to the slot elements

        allocateChildrenHook(vnode); // in fallback mode, the children will be always empty, so, nothing
        // will happen, but in native, it does allocate the light dom

        updateChildrenHook(oldVnode, vnode); // this will update the shadowRoot

        rerenderCustomElmHook(vnode);
      },
      insert: (vnode, parentNode, referenceNode) => {
        insertNodeHook(vnode, parentNode, referenceNode);
        createChildrenHook(vnode);
        insertCustomElmHook(vnode);
      },
      move: (vnode, parentNode, referenceNode) => {
        insertNodeHook(vnode, parentNode, referenceNode);
      },
      remove: (vnode, parentNode) => {
        removeNodeHook(vnode, parentNode);
        removeCustomElmHook(vnode);
      }
    }; // TODO: this should be done by the compiler, adding ns to every sub-element

    function addNS(vnode) {
      const {
        data,
        children,
        sel
      } = vnode; // TODO: review why `sel` equal `foreignObject` should get this `ns`

      data.ns = NamespaceAttributeForSVG;

      if (isArray(children) && sel !== 'foreignObject') {
        for (let j = 0, n = children.length; j < n; ++j) {
          const childNode = children[j];

          if (childNode != null && childNode.hook === ElementHook) {
            addNS(childNode);
          }
        }
      }
    }

    function addVNodeToChildLWC(vnode) {

      ArrayPush.call(vmBeingRendered.velements, vnode);
    } // [h]tml node


    function h(sel, data, children) {

      const {
        key
      } = data;

      if (isUndefined(data.create)) {
        data.create = createElmDefaultHook;
      }

      if (isUndefined(data.update)) {
        data.update = updateElmDefaultHook;
      }

      let text, elm;
      const vnode = {
        sel,
        data,
        children,
        text,
        elm,
        key,
        hook: ElementHook,
        owner: vmBeingRendered
      };

      if (sel.length === 3 && StringCharCodeAt.call(sel, 0) === CHAR_S && StringCharCodeAt.call(sel, 1) === CHAR_V && StringCharCodeAt.call(sel, 2) === CHAR_G) {
        addNS(vnode);
      }

      return vnode;
    } // [t]ab[i]ndex function


    function ti(value) {
      // if value is greater than 0, we normalize to 0
      // If value is an invalid tabIndex value (null, undefined, string, etc), we let that value pass through
      // If value is less than -1, we don't care
      const shouldNormalize = value > 0 && !(isTrue(value) || isFalse(value));

      return shouldNormalize ? 0 : value;
    } // [s]lot element node


    function s(slotName, data, children, slotset) {

      if (!isUndefined(slotset) && !isUndefined(slotset[slotName]) && slotset[slotName].length !== 0) {
        children = slotset[slotName];
      }

      const vnode = h('slot', data, children);

      if (isTrue(vnode.owner.fallback)) {
        markAsDynamicChildren(children);
      }

      return vnode;
    } // [c]ustom element node


    function c(sel, Ctor, data, children) {
      if (isCircularModuleDependency(Ctor)) {
        Ctor = resolveCircularModuleDependency(Ctor);
      }

      const {
        key
      } = data;

      if (isUndefined(data.create)) {
        data.create = createCustomElmDefaultHook;
      }

      if (isUndefined(data.update)) {
        data.update = updateCustomElmDefaultHook;
      }

      let text, elm;
      children = arguments.length === 3 ? EmptyArray : children;
      const vnode = {
        sel,
        data,
        children,
        text,
        elm,
        key,
        hook: CustomElementHook,
        ctor: Ctor,
        owner: vmBeingRendered,
        mode: 'open'
      };
      addVNodeToChildLWC(vnode);
      return vnode;
    } // [i]terable node


    function i(iterable, factory) {
      const list = []; // marking the list as generated from iteration so we can optimize the diffing

      markAsDynamicChildren(list);

      if (isUndefined(iterable) || iterable === null) {

        return list;
      }

      const iterator = iterable[SymbolIterator]();

      let next = iterator.next();
      let j = 0;
      let {
        value,
        done: last
      } = next;

      while (last === false) {
        // implementing a look-back-approach because we need to know if the element is the last
        next = iterator.next();
        last = next.done; // template factory logic based on the previous collected value

        const vnode = factory(value, j, j === 0, last);

        if (isArray(vnode)) {
          ArrayPush.apply(list, vnode);
        } else {
          ArrayPush.call(list, vnode);
        }


        j += 1;
        value = next.value;
      }

      return list;
    }
    /**
     * [f]lattening
     */


    function f(items) {

      const len = items.length;
      const flattened = []; // all flattened nodes should be marked as dynamic because
      // flattened nodes are because of a conditional or iteration.
      // We have to mark as dynamic because this could switch from an
      // iterator to "static" text at any time.
      // TODO: compiler should give us some sort of indicator
      // to describe whether a vnode is dynamic or not

      markAsDynamicChildren(flattened);

      for (let j = 0; j < len; j += 1) {
        const item = items[j];

        if (isArray(item)) {
          ArrayPush.apply(flattened, item);
        } else {
          ArrayPush.call(flattened, item);
        }
      }

      return flattened;
    } // [t]ext node


    function t(text) {
      const data = EmptyObject;
      let sel, children, key, elm;
      return {
        sel,
        data,
        children,
        text,
        elm,
        key,
        hook: TextHook,
        owner: vmBeingRendered
      };
    } // comment node


    function p(text) {
      const data = EmptyObject;
      let sel = '!',
          children,
          key,
          elm;
      return {
        sel,
        data,
        children,
        text,
        elm,
        key,
        hook: CommentHook,
        owner: vmBeingRendered
      };
    } // [d]ynamic value to produce a text vnode


    function d(value) {
      if (value == null) {
        return null;
      }

      return t(value);
    } // [b]ind function


    function b(fn) {
      if (isNull(vmBeingRendered)) {
        throw new Error();
      }

      const vm = vmBeingRendered;
      return function (event) {
        invokeEventListener(vm, fn, vm.component, event);
      };
    } // [f]unction_[b]ind


    function fb(fn) {
      if (isNull(vmBeingRendered)) {
        throw new Error();
      }

      const vm = vmBeingRendered;
      return function () {
        return invokeComponentCallback(vm, fn, ArraySlice.call(arguments));
      };
    } // [l]ocator_[l]istener function


    function ll(originalHandler, id, context) {
      if (isNull(vmBeingRendered)) {
        throw new Error();
      }

      const vm = vmBeingRendered; // bind the original handler with b() so we can call it
      // after resolving the locator

      const eventListener = b(originalHandler); // create a wrapping handler to resolve locator, and
      // then invoke the original handler.

      return function (event) {
        // located service for the locator metadata
        const {
          context: {
            locator
          }
        } = vm;

        if (!isUndefined(locator)) {
          const {
            locator: locatorService
          } = Services;

          if (locatorService) {
            locator.resolved = {
              target: id,
              host: locator.id,
              targetContext: isFunction(context) && context(),
              hostContext: isFunction(locator.context) && locator.context()
            }; // a registered `locator` service will be invoked with
            // access to the context.locator.resolved, which will contain:
            // outer id, outer context, inner id, and inner context

            invokeServiceHook(vm, locatorService);
          }
        } // invoke original event listener via b()


        eventListener(event);
      };
    } // [k]ey function


    function k(compilerKey, obj) {
      switch (typeof obj) {
        case 'number': // TODO: when obj is a numeric key, we might be able to use some other strategy to combine two numbers into a new unique number

        case 'string':
          return compilerKey + ':' + obj;

        case 'object':


      }
    } // [g]lobal [id] function


    function gid(id) {
      if (isUndefined(id) || id === '') {

        return id;
      }

      return isNull(id) ? id : `${id}-${vmBeingRendered.uid}`;
    }

    var api$1 =
    /*#__PURE__*/
    Object.freeze({
      h: h,
      ti: ti,
      s: s,
      c: c,
      i: i,
      f: f,
      t: t,
      p: p,
      d: d,
      b: b,
      fb: fb,
      ll: ll,
      k: k,
      gid: gid
    });
    const signedTemplateSet = new Set();

    function defaultEmptyTemplate() {
      return [];
    }

    signedTemplateSet.add(defaultEmptyTemplate);

    function isTemplateRegistered(tpl) {
      return signedTemplateSet.has(tpl);
    } // chaining this method as a way to wrap existing
    // assignment of templates easily, without too much transformation


    function registerTemplate(tpl) {
      signedTemplateSet.add(tpl);
      return tpl;
    } // locker-service patches this function during runtime to sanitize vulnerable attributes.
    /*
     * Copyright (c) 2018, salesforce.com, inc.
     * All rights reserved.
     * SPDX-License-Identifier: MIT
     * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
     */


    const CachedStyleFragments = create(null);

    function createStyleElement(styleContent) {
      const elm = createElement.call(document, 'style');
      elm.type = 'text/css';
      elm.textContent = styleContent;
      return elm;
    }

    function getCachedStyleElement(styleContent) {
      let fragment = CachedStyleFragments[styleContent];

      if (isUndefined(fragment)) {
        fragment = createDocumentFragment.call(document);
        const elm = createStyleElement(styleContent);
        appendChild.call(fragment, elm);
        CachedStyleFragments[styleContent] = fragment;
      }

      return fragment.cloneNode(true).firstChild;
    }

    const globalStyleParent = document.head || document.body || document;
    const InsertedGlobalStyleContent = create(null);

    function insertGlobalStyle(styleContent) {
      // inserts the global style when needed, otherwise does nothing
      if (isUndefined(InsertedGlobalStyleContent[styleContent])) {
        InsertedGlobalStyleContent[styleContent] = true;
        const elm = createStyleElement(styleContent);
        appendChild.call(globalStyleParent, elm);
      }
    }

    function noop$1() {
      /** do nothing */
    }

    function createStyleVNode(elm) {
      const vnode = h('style', {
        key: 'style',
        create: noop$1,
        update: noop$1
      }, EmptyArray); // Force the diffing algo to use the cloned style.

      vnode.elm = elm;
      return vnode;
    }
    /**
     * Reset the styling token applied to the host element.
     */


    function resetStyleAttributes(vm) {
      const {
        context,
        elm
      } = vm; // Remove the style attribute currently applied to the host element.

      const oldHostAttribute = context.hostAttribute;

      if (!isUndefined(oldHostAttribute)) {
        removeAttribute.call(elm, oldHostAttribute);
      } // Reset the scoping attributes associated to the context.


      context.hostAttribute = context.shadowAttribute = undefined;
    }
    /**
     * Apply/Update the styling token applied to the host element.
     */


    function applyStyleAttributes(vm, hostAttribute, shadowAttribute) {
      const {
        context,
        elm
      } = vm; // Remove the style attribute currently applied to the host element.

      setAttribute.call(elm, hostAttribute, '');
      context.hostAttribute = hostAttribute;
      context.shadowAttribute = shadowAttribute;
    }

    function evaluateCSS(vm, stylesheets, hostAttribute, shadowAttribute) {

      const {
        fallback
      } = vm;

      if (fallback) {
        const hostSelector = `[${hostAttribute}]`;
        const shadowSelector = `[${shadowAttribute}]`;
        forEach.call(stylesheets, stylesheet => {
          const textContent = stylesheet(hostSelector, shadowSelector, false);
          insertGlobalStyle(textContent);
        });
        return null;
      } else {
        // Native shadow in place, we need to act accordingly by using the `:host` selector, and an
        // empty shadow selector since it is not really needed.
        const textContent = ArrayReduce.call(stylesheets, (buffer, stylesheet) => {
          return buffer + stylesheet(emptyString, emptyString, true);
        }, '');
        return createStyleVNode(getCachedStyleElement(textContent));
      }
    }
    /*
     * Copyright (c) 2018, salesforce.com, inc.
     * All rights reserved.
     * SPDX-License-Identifier: MIT
     * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
     */


    const EmptySlots = create(null);

    function evaluateTemplate(vm, html) {


      const {
        component,
        context,
        cmpSlots,
        cmpTemplate
      } = vm; // reset the cache memoizer for template when needed

      if (html !== cmpTemplate) {
        // perf opt: do not reset the shadow root during the first rendering (there is nothing to reset)
        if (!isUndefined(cmpTemplate)) {
          // It is important to reset the content to avoid reusing similar elements generated from a different
          // template, because they could have similar IDs, and snabbdom just rely on the IDs.
          resetShadowRoot(vm);
        } // Check that the template was built by the compiler


        if (!isTemplateRegistered(html)) {
          throw new TypeError(`Invalid template returned by the render() method on ${vm}. It must return an imported template (e.g.: \`import html from "./${vm.def.name}.html"\`), instead, it has returned: ${toString(html)}.`);
        }

        vm.cmpTemplate = html; // Populate context with template information

        context.tplCache = create(null);
        resetStyleAttributes(vm);
        const {
          stylesheets,
          stylesheetTokens
        } = html;

        if (isUndefined(stylesheets) || stylesheets.length === 0) {
          context.styleVNode = null;
        } else if (!isUndefined(stylesheetTokens)) {
          const {
            hostAttribute,
            shadowAttribute
          } = stylesheetTokens;
          applyStyleAttributes(vm, hostAttribute, shadowAttribute); // Caching style vnode so it can be reused on every render

          context.styleVNode = evaluateCSS(vm, stylesheets, hostAttribute, shadowAttribute);
        }
      }

      const vnodes = html.call(undefined, api$1, component, cmpSlots, context.tplCache);
      const {
        styleVNode
      } = context;

      if (!isNull(styleVNode)) {
        ArrayUnshift.call(vnodes, styleVNode);
      }

      return vnodes;
    }

    var GlobalMeasurementPhase;

    (function (GlobalMeasurementPhase) {
      GlobalMeasurementPhase["REHYDRATE"] = "lwc-rehydrate";
      GlobalMeasurementPhase["HYDRATE"] = "lwc-hydrate";
    })(GlobalMeasurementPhase || (GlobalMeasurementPhase = {})); // Even if all the browser the engine supports implements the UserTiming API, we need to guard the measure APIs.
    // JSDom (used in Jest) for example doesn't implement the UserTiming APIs.


    const isUserTimingSupported = typeof performance !== 'undefined' && typeof performance.mark === 'function' && typeof performance.clearMarks === 'function' && typeof performance.measure === 'function' && typeof performance.clearMeasures === 'function';

    function getMarkName(phase, vm) {
      return `<${StringToLowerCase.call(tagNameGetter.call(vm.elm))} (${vm.uid})> - ${phase}`;
    }

    function start(markName) {
      performance.mark(markName);
    }

    function end(measureName, markName) {
      performance.measure(measureName, markName); // Clear the created marks and measure to avoid filling the performance entries buffer.
      // Note: Even if the entries get deleted, existing PerformanceObservers preserve a copy of those entries.

      performance.clearMarks(markName);
      performance.clearMarks(measureName);
    }

    function noop$2() {
      /* do nothing */
    }
    // the VM is used to create unique mark names at each level.

    const startGlobalMeasure = !isUserTimingSupported ? noop$2 : function (phase, vm) {
      const markName = isUndefined(vm) ? phase : getMarkName(phase, vm);
      start(markName);
    };
    const endGlobalMeasure = !isUserTimingSupported ? noop$2 : function (phase, vm) {
      const markName = isUndefined(vm) ? phase : getMarkName(phase, vm);
      end(phase, markName);
    };
    let vmBeingRendered = null;
    let vmBeingConstructed = null;

    function isBeingConstructed(vm) {

      return vmBeingConstructed === vm;
    }

    function invokeComponentCallback(vm, fn, args) {
      const {
        component,
        callHook,
        context,
        owner
      } = vm;
      let result;
      runWithBoundaryProtection(vm, owner, () => {}, () => {
        // job
        result = callHook(component, fn, args);
      }, () => {});
      return result;
    }

    function invokeComponentConstructor(vm, Ctor) {
      const vmBeingConstructedInception = vmBeingConstructed;

      let error;

      vmBeingConstructed = vm;
      /**
       * Constructors don't need to be wrapped with a boundary because for root elements
       * it should throw, while elements from template are already wrapped by a boundary
       * associated to the diffing algo.
       */

      try {
        // job
        new Ctor();
      } catch (e) {
        error = Object(e);
      } finally {

        vmBeingConstructed = vmBeingConstructedInception;

        if (!isUndefined(error)) {
          error.wcStack = getErrorComponentStack(vm.elm); // re-throwing the original error annotated after restoring the context

          throw error; // eslint-disable-line no-unsafe-finally
        }
      }
    }

    function invokeComponentRenderMethod(vm) {
      const {
        def: {
          render
        },
        callHook,
        component,
        context,
        owner
      } = vm;
      const vmBeingRenderedInception = vmBeingRendered;
      vmBeingRendered = vm;
      let result;
      runWithBoundaryProtection(vm, owner, () => {
        vmBeingRendered = vm;
      }, () => {
        // job
        const html = callHook(component, render);
        result = evaluateTemplate(vm, html);
      }, () => {
        vmBeingRendered = vmBeingRenderedInception;
      });
      return result || [];
    }

    function invokeEventListener(vm, fn, thisValue, event) {
      const {
        callHook,
        owner,
        context
      } = vm;
      runWithBoundaryProtection(vm, owner, () => {}, () => {

        callHook(thisValue, fn, [event]);
      }, () => {});
    }
    /*
     * Copyright (c) 2018, salesforce.com, inc.
     * All rights reserved.
     * SPDX-License-Identifier: MIT
     * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
     */


    const signedComponentToMetaMap = new Map(); // chaining this method as a way to wrap existing
    // assignment of component constructor easily, without too much transformation

    function registerComponent(Ctor, {
      name,
      tmpl: template
    }) {
      signedComponentToMetaMap.set(Ctor, {
        name,
        template
      });
      return Ctor;
    }

    function getComponentRegisteredMeta(Ctor) {
      return signedComponentToMetaMap.get(Ctor);
    }

    function createComponent(vm, Ctor) {


      invokeComponentConstructor(vm, Ctor);
      const initialized = vm;

      if (isUndefined(initialized.component)) {
        throw new ReferenceError(`Invalid construction for ${Ctor}, you must extend LightningElement.`);
      }
    }

    function linkComponent(vm) {


      const {
        def: {
          wire
        }
      } = vm;

      if (wire) {
        const {
          wiring
        } = Services;

        if (wiring) {
          invokeServiceHook(vm, wiring);
        }
      }
    }

    function clearReactiveListeners(vm) {

      const {
        deps
      } = vm;
      const len = deps.length;

      if (len > 0) {
        for (let i = 0; i < len; i += 1) {
          const set = deps[i];
          const pos = ArrayIndexOf.call(deps[i], vm);

          ArraySplice.call(set, pos, 1);
        }

        deps.length = 0;
      }
    }

    function clearChildLWC(vm) {

      vm.velements = [];
    }

    function renderComponent(vm) {

      clearReactiveListeners(vm);
      clearChildLWC(vm);
      const vnodes = invokeComponentRenderMethod(vm);
      vm.isDirty = false;
      vm.isScheduled = false;

      return vnodes;
    }

    function markComponentAsDirty(vm) {

      vm.isDirty = true;
    }

    const cmpEventListenerMap = new WeakMap();

    function getWrappedComponentsListener(vm, listener) {

      if (!isFunction(listener)) {
        throw new TypeError(); // avoiding problems with non-valid listeners
      }

      let wrappedListener = cmpEventListenerMap.get(listener);

      if (isUndefined(wrappedListener)) {
        wrappedListener = function (event) {
          invokeEventListener(vm, listener, undefined, event);
        };

        cmpEventListenerMap.set(listener, wrappedListener);
      }

      return wrappedListener;
    }
    /*
     * Copyright (c) 2018, salesforce.com, inc.
     * All rights reserved.
     * SPDX-License-Identifier: MIT
     * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
     */

    /*
     * Copyright (c) 2018, salesforce.com, inc.
     * All rights reserved.
     * SPDX-License-Identifier: MIT
     * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
     */


    function apply$1() {
      function elemFromPoint(left, top) {
        const element = elementFromPoint.call(document, left, top);

        if (isNull(element)) {
          return element;
        }

        return retarget(document, pathComposer(element, true));
      } // https://github.com/Microsoft/TypeScript/issues/14139


      document.elementFromPoint = elemFromPoint; // Go until we reach to top of the LWC tree

      defineProperty(document, 'activeElement', {
        get() {
          let node = DocumentPrototypeActiveElement.call(this);

          if (isNull(node)) {
            return node;
          }

          while (!isUndefined(getNodeOwnerKey$1(node))) {
            node = parentElementGetter.call(node);

            if (isNull(node)) {
              return null;
            }
          }

          if (node.tagName === 'HTML') {
            // IE 11. Active element should never be html element
            node = document.body;
          }

          return node;
        },

        enumerable: true,
        configurable: true
      });
    }
    /*
     * Copyright (c) 2018, salesforce.com, inc.
     * All rights reserved.
     * SPDX-License-Identifier: MIT
     * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
     */


    {
      apply$1();
    }
    /*
     * Copyright (c) 2018, salesforce.com, inc.
     * All rights reserved.
     * SPDX-License-Identifier: MIT
     * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
     */

    function detect$3() {
      return typeof window.ShadowRoot === 'undefined';
    }
    /*
     * Copyright (c) 2018, salesforce.com, inc.
     * All rights reserved.
     * SPDX-License-Identifier: MIT
     * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
     */


    function apply$2() {
      window.ShadowRoot = SyntheticShadowRoot;
    }
    /*
     * Copyright (c) 2018, salesforce.com, inc.
     * All rights reserved.
     * SPDX-License-Identifier: MIT
     * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
     */


    if (detect$3()) {
      apply$2();
    }
    /*
     * Copyright (c) 2018, salesforce.com, inc.
     * All rights reserved.
     * SPDX-License-Identifier: MIT
     * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
     */


    function detect$4() {
      // Don't apply polyfill when ProxyCompat is enabled.
      if ('getKey' in Proxy) {
        return false;
      }

      const proxy = new Proxy([3, 4], {});
      const res = [1, 2].concat(proxy);
      return res.length !== 4;
    }
    /*
     * Copyright (c) 2018, salesforce.com, inc.
     * All rights reserved.
     * SPDX-License-Identifier: MIT
     * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
     */


    const {
      isConcatSpreadable
    } = Symbol;
    const {
      isArray: isArray$2
    } = Array;
    const {
      slice: ArraySlice$1,
      unshift: ArrayUnshift$1,
      shift: ArrayShift
    } = Array.prototype;

    function isObject$2(O) {
      return typeof O === 'object' ? O !== null : typeof O === 'function';
    } // https://www.ecma-international.org/ecma-262/6.0/#sec-isconcatspreadable


    function isSpreadable(O) {
      if (!isObject$2(O)) {
        return false;
      }

      const spreadable = O[isConcatSpreadable];
      return spreadable !== undefined ? Boolean(spreadable) : isArray$2(O);
    } // https://www.ecma-international.org/ecma-262/6.0/#sec-array.prototype.concat


    function ArrayConcatPolyfill(..._args) {
      const O = Object(this);
      const A = [];
      let N = 0;
      const items = ArraySlice$1.call(arguments);
      ArrayUnshift$1.call(items, O);

      while (items.length) {
        const E = ArrayShift.call(items);

        if (isSpreadable(E)) {
          let k = 0;
          const length = E.length;

          for (k; k < length; k += 1, N += 1) {
            if (k in E) {
              const subElement = E[k];
              A[N] = subElement;
            }
          }
        } else {
          A[N] = E;
          N += 1;
        }
      }

      return A;
    }

    function apply$3() {
      Array.prototype.concat = ArrayConcatPolyfill;
    }
    /*
     * Copyright (c) 2018, salesforce.com, inc.
     * All rights reserved.
     * SPDX-License-Identifier: MIT
     * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
     */


    if (detect$4()) {
      apply$3();
    }
    /*
     * Copyright (c) 2018, salesforce.com, inc.
     * All rights reserved.
     * SPDX-License-Identifier: MIT
     * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
     */


    const composedDescriptor = Object.getOwnPropertyDescriptor(Event.prototype, 'composed');

    function detect$5() {
      if (!composedDescriptor) {
        // No need to apply this polyfill if this client completely lacks
        // support for the composed property.
        return false;
      } // Assigning a throwaway click event here to suppress a ts error when we
      // pass clickEvent into the composed getter below. The error is:
      // [ts] Variable 'clickEvent' is used before being assigned.


      let clickEvent = new Event('click');
      const button = document.createElement('button');
      button.addEventListener('click', event => clickEvent = event);
      button.click();
      return !composedDescriptor.get.call(clickEvent);
    }
    /*
     * Copyright (c) 2018, salesforce.com, inc.
     * All rights reserved.
     * SPDX-License-Identifier: MIT
     * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
     */


    const originalClickDescriptor = Object.getOwnPropertyDescriptor(HTMLElement.prototype, 'click');

    function handleClick(event) {
      Object.defineProperty(event, 'composed', {
        configurable: true,
        enumerable: true,

        get() {
          return true;
        }

      });
    }

    function apply$4() {
      HTMLElement.prototype.click = function () {
        addEventListener.call(this, 'click', handleClick);

        try {
          originalClickDescriptor.value.call(this);
        } catch (ex) {
          throw ex;
        } finally {
          removeEventListener.call(this, 'click', handleClick);
        }
      };
    }
    /*
     * Copyright (c) 2018, salesforce.com, inc.
     * All rights reserved.
     * SPDX-License-Identifier: MIT
     * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
     */


    if (detect$5()) {
      apply$4();
    }
    /*
     * Copyright (c) 2018, salesforce.com, inc.
     * All rights reserved.
     * SPDX-License-Identifier: MIT
     * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
     */


    function detect$6() {
      return Object.getOwnPropertyDescriptor(Event.prototype, 'composed') === undefined;
    }
    /*
     * Copyright (c) 2018, salesforce.com, inc.
     * All rights reserved.
     * SPDX-License-Identifier: MIT
     * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
     */


    function apply$5() {
      // https://github.com/w3c/webcomponents/issues/513#issuecomment-224183937
      const composedEvents = assign(create(null), {
        blur: 1,
        focus: 1,
        focusin: 1,
        focusout: 1,
        click: 1,
        dblclick: 1,
        mousedown: 1,
        mouseenter: 1,
        mouseleave: 1,
        mousemove: 1,
        mouseout: 1,
        mouseover: 1,
        mouseup: 1,
        wheel: 1,
        beforeinput: 1,
        input: 1,
        keydown: 1,
        keyup: 1,
        compositionstart: 1,
        compositionupdate: 1,
        compositionend: 1,
        touchstart: 1,
        touchend: 1,
        touchmove: 1,
        touchcancel: 1,
        pointerover: 1,
        pointerenter: 1,
        pointerdown: 1,
        pointermove: 1,
        pointerup: 1,
        pointercancel: 1,
        pointerout: 1,
        pointerleave: 1,
        gotpointercapture: 1,
        lostpointercapture: 1,
        dragstart: 1,
        drag: 1,
        dragenter: 1,
        dragleave: 1,
        dragover: 1,
        drop: 1,
        dragend: 1,
        DOMActivate: 1,
        DOMFocusIn: 1,
        DOMFocusOut: 1,
        keypress: 1
      }); // Composed for Native events

      Object.defineProperties(Event.prototype, {
        composed: {
          get() {
            const {
              type
            } = this;
            return composedEvents[type] === 1;
          },

          configurable: true,
          enumerable: true
        }
      });
    }
    /*
     * Copyright (c) 2018, salesforce.com, inc.
     * All rights reserved.
     * SPDX-License-Identifier: MIT
     * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
     */


    if (detect$6()) {
      apply$5();
    }
    /*
     * Copyright (c) 2018, salesforce.com, inc.
     * All rights reserved.
     * SPDX-License-Identifier: MIT
     * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
     */


    const {
      CustomEvent: OriginalCustomEvent
    } = window;

    function PatchedCustomEvent(type, eventInitDict) {
      const event = new OriginalCustomEvent(type, eventInitDict); // support for composed on custom events

      Object.defineProperties(event, {
        composed: {
          // We can't use "value" here, because IE11 doesn't like mixing and matching
          // value with get() from Event.prototype.
          get() {
            return !!(eventInitDict && eventInitDict.composed);
          },

          configurable: true,
          enumerable: true
        }
      });
      return event;
    }

    function apply$6() {
      window.CustomEvent = PatchedCustomEvent;
      window.CustomEvent.prototype = OriginalCustomEvent.prototype;
    }
    /*
     * Copyright (c) 2018, salesforce.com, inc.
     * All rights reserved.
     * SPDX-License-Identifier: MIT
     * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
     */


    function detect$7() {
      // We need to check if CustomEvent is our PatchedCustomEvent because jest
      // will reset the window object but not constructos and prototypes (e.g.,
      // Event.prototype).
      // https://github.com/jsdom/jsdom#shared-constructors-and-prototypes
      return window.CustomEvent !== PatchedCustomEvent;
    }
    /*
     * Copyright (c) 2018, salesforce.com, inc.
     * All rights reserved.
     * SPDX-License-Identifier: MIT
     * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
     */


    if (detect$7()) {
      apply$6();
    }
    /*
     * Copyright (c) 2018, salesforce.com, inc.
     * All rights reserved.
     * SPDX-License-Identifier: MIT
     * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
     */

    /*
     * Copyright (c) 2018, salesforce.com, inc.
     * All rights reserved.
     * SPDX-License-Identifier: MIT
     * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
     */


    function apply$7() {
      const originalComposedGetter = Object.getOwnPropertyDescriptor(Event.prototype, 'composed').get;
      Object.defineProperties(FocusEvent.prototype, {
        composed: {
          get() {
            const {
              isTrusted
            } = this;
            const composed = originalComposedGetter.call(this);

            if (isTrusted && composed === false) {
              return true;
            }

            return composed;
          },

          enumerable: true,
          configurable: true
        }
      });
    }
    /*
     * Copyright (c) 2018, salesforce.com, inc.
     * All rights reserved.
     * SPDX-License-Identifier: MIT
     * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
     */


    {
      apply$7();
    }
    /*
     * Copyright (c) 2018, salesforce.com, inc.
     * All rights reserved.
     * SPDX-License-Identifier: MIT
     * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
     */

    /*
     * Copyright (c) 2018, salesforce.com, inc.
     * All rights reserved.
     * SPDX-License-Identifier: MIT
     * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
     */

    const OriginalMutationObserver = window.MutationObserver;
    const {
      disconnect: originalDisconnect,
      observe: originalObserve,
      takeRecords: originalTakeRecords
    } = OriginalMutationObserver.prototype; // Internal fields to maintain relationships

    const observedTargetsField = '$$lwcObservedTargets$$';
    const wrapperLookupField = '$$lwcObserverCallbackWrapper$$';
    /**
     * Retarget the mutation record's target value to its shadowRoot
     * @param {MutationRecord} originalRecord
     */

    function retargetMutationRecord(originalRecord) {
      const {
        addedNodes,
        removedNodes,
        target,
        type
      } = originalRecord;
      const retargetedRecord = create(MutationRecord.prototype);
      defineProperties(retargetedRecord, {
        addedNodes: {
          get() {
            return addedNodes;
          },

          enumerable: true,
          configurable: true
        },
        removedNodes: {
          get() {
            return removedNodes;
          },

          enumerable: true,
          configurable: true
        },
        type: {
          get() {
            return type;
          },

          enumerable: true,
          configurable: true
        },
        target: {
          get() {
            return target.shadowRoot;
          },

          enumerable: true,
          configurable: true
        }
      });
      return retargetedRecord;
    }
    /**
     * This function first gathers the OwnerKey of all the targets observed by the MutationObserver instance.
     * Next, process each MutationRecord to determine if the mutation occured in the same shadow tree as
     * one of the targets being observed.
     *
     * The key filtering logic is to match the observed target node's ownerKey/ownKey with the ownerKey of the nodes in the
     * MutationRecord.
     * The ownerKey of the rootnode will be undefined. Similarly ownerkey of nodes outside the shadow will be undefined.
     * @param {MutationRecords[]} mutations
     * @param {MutationObserver} observer
     */


    function filterMutationRecords(mutations, observer) {
      const observedTargets = observer[observedTargetsField];
      const observedTargetOwnerKeys = [];
      forEach.call(observedTargets, node => {
        // If the observed target is a shadowRoot, the ownerkey of the shadow tree will be fetched using the host
        const observedTargetOwnerKey = node instanceof window.ShadowRoot ? getNodeKey(node.host) : getNodeNearestOwnerKey(node);
        ArrayPush.call(observedTargetOwnerKeys, observedTargetOwnerKey);
      });
      return ArrayReduce.call(mutations, (filteredSet, record) => {
        const {
          target,
          addedNodes,
          removedNodes,
          type
        } = record; // If the mutations affected a lwc host element or its shadow,
        // because LWC uses synthetic shadow, target will be the host

        if (type === 'childList' && !isUndefined(getNodeKey(target))) {
          // Optimization: Peek in and test one node to decide if the MutationRecord qualifies
          // The remaining nodes in this MutationRecord will have the same ownerKey
          const sampleNode = addedNodes.length > 0 ? addedNodes[0] : removedNodes[0];
          const sampleNodeOwnerKey = getNodeNearestOwnerKey(sampleNode); // Is node being added/removed to a subtree that is being observed

          if (ArrayIndexOf.call(observedTargetOwnerKeys, sampleNodeOwnerKey) !== -1) {
            // If the target was being observed, then return record as-is
            if (observedTargets.indexOf(target) !== -1) {
              ArrayPush.call(filteredSet, record);
            } else {
              // else, must be observing the shadowRoot
              ArrayPush.call(filteredSet, retargetMutationRecord(record));
            }
          }
        } else {
          // if target is shadowRoot, then fetch key of shadow tree from the host
          // this should never be the case when synthetic shadow is on, only when running in native
          const recordTargetOwnerKey = target instanceof window.ShadowRoot ? getNodeKey(target.host) : getNodeNearestOwnerKey(target);
          const mutationInScope = ArrayIndexOf.call(observedTargetOwnerKeys, recordTargetOwnerKey) !== -1;

          if (mutationInScope) {
            ArrayPush.call(filteredSet, record);
          }
        }

        return filteredSet;
      }, []);
    }

    function getWrappedCallback(callback) {
      let wrappedCallback = callback[wrapperLookupField];

      if (isUndefined(wrappedCallback)) {
        wrappedCallback = callback[wrapperLookupField] = (mutations, observer) => {
          // Filter mutation records
          const filteredRecords = filterMutationRecords(mutations, observer); // If not records are eligible for the observer, do not invoke callback

          if (filteredRecords.length === 0) {
            return;
          }

          callback.call(observer, filteredRecords, observer);
        };
      }

      return wrappedCallback;
    }
    /**
     * Patched MutationObserver constructor.
     * 1. Wrap the callback to filter out MutationRecords based on dom ownership
     * 2. Add a property field to track all observed targets of the observer instance
     * @param {MutationCallback} callback
     */


    function PatchedMutationObserver(callback) {
      const wrappedCallback = getWrappedCallback(callback);
      const observer = new OriginalMutationObserver(wrappedCallback);
      defineProperty(observer, observedTargetsField, {
        value: []
      });
      return observer;
    }

    function patchedDisconnect() {
      if (!isUndefined(this[observedTargetsField])) {
        this[observedTargetsField].length = 0;
      }

      originalDisconnect.call(this);
    }
    /**
     * A single mutation observer can observe multiple nodes(target).
     * Maintain a list of all targets that the observer chooses to observe
     * @param {Node} target
     * @param {Object} options
     */


    function patchedObserve(target, options) {
      // If the observer was created by the patched constructor, this field should be defined. Adding a guard for extra safety
      if (!isUndefined(this[observedTargetsField])) {
        ArrayPush.call(this[observedTargetsField], target);
      } // If the target is a SyntheticShadowRoot, observe the host since the shadowRoot is an empty documentFragment


      if (target instanceof SyntheticShadowRoot) {
        target = target.host;
      }

      return originalObserve.call(this, target, options);
    }
    /**
     * Patch the takeRecords() api to filter MutationRecords based on the observed targets
     */


    function patchedTakeRecords() {
      return filterMutationRecords(originalTakeRecords.call(this), this);
    }

    function apply$8() {
      window.MutationObserver = PatchedMutationObserver;
      window.MutationObserver.prototype = OriginalMutationObserver.prototype;
      window.MutationObserver.prototype.disconnect = patchedDisconnect;
      window.MutationObserver.prototype.observe = patchedObserve;
      window.MutationObserver.prototype.takeRecords = patchedTakeRecords;
    }
    /*
     * Copyright (c) 2018, salesforce.com, inc.
     * All rights reserved.
     * SPDX-License-Identifier: MIT
     * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
     */


    {
      apply$8();
    }
    /*
     * Copyright (c) 2018, salesforce.com, inc.
     * All rights reserved.
     * SPDX-License-Identifier: MIT
     * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
     */

    /**
     * This is a descriptor map that contains
     * all standard properties that a Custom Element can support (including AOM properties), which
     * determines what kind of capabilities the Base HTML Element and
     * Base Lightning Element should support.
     */

    const HTMLElementOriginalDescriptors = create(null);
    forEach.call(ElementPrototypeAriaPropertyNames, propName => {
      // Note: intentionally using our in-house getPropertyDescriptor instead of getOwnPropertyDescriptor here because
      // in IE11, some properties are on Element.prototype instead of HTMLElement, just to be sure.
      const descriptor = getPropertyDescriptor(HTMLElement.prototype, propName);

      if (!isUndefined(descriptor)) {
        HTMLElementOriginalDescriptors[propName] = descriptor;
      }
    });
    forEach.call(defaultDefHTMLPropertyNames, propName => {
      // Note: intentionally using our in-house getPropertyDescriptor instead of getOwnPropertyDescriptor here because
      // in IE11, id property is on Element.prototype instead of HTMLElement, and we suspect that more will fall into
      // this category, so, better to be sure.
      const descriptor = getPropertyDescriptor(HTMLElement.prototype, propName);

      if (!isUndefined(descriptor)) {
        HTMLElementOriginalDescriptors[propName] = descriptor;
      }
    });

    /**
     * This operation is called with a descriptor of an standard html property
     * that a Custom Element can support (including AOM properties), which
     * determines what kind of capabilities the Base Lightning Element should support. When producing the new descriptors
     * for the Base Lightning Element, it also include the reactivity bit, so the standard property is reactive.
     */

    function createBridgeToElementDescriptor(propName, descriptor) {
      const {
        get,
        set,
        enumerable,
        configurable
      } = descriptor;

      if (!isFunction(get)) {

        throw new TypeError();
      }

      if (!isFunction(set)) {

        throw new TypeError();
      }

      return {
        enumerable,
        configurable,

        get() {
          const vm = getComponentVM(this);

          if (isBeingConstructed(vm)) {

            return;
          }

          observeMutation(this, propName);
          return get.call(vm.elm);
        },

        set(newValue) {
          const vm = getComponentVM(this);

          if (newValue !== vm.cmpProps[propName]) {
            vm.cmpProps[propName] = newValue;

            if (isFalse(vm.isDirty)) {
              // perf optimization to skip this step if not in the DOM
              notifyMutation(this, propName);
            }
          }

          return set.call(vm.elm, newValue);
        }

      };
    }

    function getLinkedElement(cmp) {
      return getComponentVM(cmp).elm;
    }

    function BaseLightningElement() {
      // This should be as performant as possible, while any initialization should be done lazily
      if (isNull(vmBeingConstructed)) {
        throw new ReferenceError();
      }

      const vm = vmBeingConstructed;
      const {
        elm,
        cmpRoot,
        uid
      } = vm;
      const component = this;
      vm.component = component; // interaction hooks
      // We are intentionally hiding this argument from the formal API of LWCElement because
      // we don't want folks to know about it just yet.

      if (arguments.length === 1) {
        const {
          callHook,
          setHook,
          getHook
        } = arguments[0];
        vm.callHook = callHook;
        vm.setHook = setHook;
        vm.getHook = getHook;
      } // linking elm, shadow root and component with the VM


      setHiddenField(component, ViewModelReflection, vm);
      setInternalField(elm, ViewModelReflection, vm);
      setInternalField(cmpRoot, ViewModelReflection, vm);
      setNodeKey(elm, uid);
    } // HTML Element - The Good Parts


    BaseLightningElement.prototype = {
      constructor: BaseLightningElement,

      dispatchEvent(event) {
        const elm = getLinkedElement(this);
        const vm = getComponentVM(this);

        return dispatchEvent.call(elm, event);
      },

      addEventListener(type, listener, options) {
        const vm = getComponentVM(this);

        const wrappedListener = getWrappedComponentsListener(vm, listener);
        vm.elm.addEventListener(type, wrappedListener, options);
      },

      removeEventListener(type, listener, options) {
        const vm = getComponentVM(this);

        const wrappedListener = getWrappedComponentsListener(vm, listener);
        vm.elm.removeEventListener(type, wrappedListener, options);
      },

      setAttributeNS(ns, attrName, _value) {
        const elm = getLinkedElement(this);
        // @ts-ignore type-mismatch

        elm.setAttributeNS.apply(elm, arguments);
      },

      removeAttributeNS(ns, attrName) {
        const elm = getLinkedElement(this);
        // @ts-ignore type-mismatch

        elm.removeAttributeNS.apply(elm, arguments);
      },

      removeAttribute(attrName) {
        const elm = getLinkedElement(this);
        // @ts-ignore type-mismatch

        elm.removeAttribute.apply(elm, arguments);
      },

      setAttribute(attrName, _value) {
        const elm = getLinkedElement(this);
        // @ts-ignore type-mismatch

        elm.setAttribute.apply(elm, arguments);
      },

      getAttribute(attrName) {
        const elm = getLinkedElement(this);
        // @ts-ignore type-mismatch

        const value = elm.getAttribute.apply(elm, arguments);
        return value;
      },

      getAttributeNS(ns, attrName) {
        const elm = getLinkedElement(this);
        // @ts-ignore type-mismatch

        const value = elm.getAttributeNS.apply(elm, arguments);
        return value;
      },

      getBoundingClientRect() {
        const elm = getLinkedElement(this);

        return elm.getBoundingClientRect();
      },

      /**
       * Returns the first element that is a descendant of node that
       * matches selectors.
       */
      // querySelector<K extends keyof HTMLElementTagNameMap>(selectors: K): HTMLElementTagNameMap[K] | null;
      // querySelector<K extends keyof SVGElementTagNameMap>(selectors: K): SVGElementTagNameMap[K] | null;
      querySelector(selectors) {
        const vm = getComponentVM(this);

        const {
          elm
        } = vm;
        return elm.querySelector(selectors);
      },

      /**
       * Returns all element descendants of node that
       * match selectors.
       */
      // querySelectorAll<K extends keyof HTMLElementTagNameMap>(selectors: K): NodeListOf<HTMLElementTagNameMap[K]>,
      // querySelectorAll<K extends keyof SVGElementTagNameMap>(selectors: K): NodeListOf<SVGElementTagNameMap[K]>,
      querySelectorAll(selectors) {
        const vm = getComponentVM(this);

        const {
          elm
        } = vm;
        return elm.querySelectorAll(selectors);
      },

      /**
       * Returns all element descendants of node that
       * match the provided tagName.
       */
      getElementsByTagName(tagNameOrWildCard) {
        const vm = getComponentVM(this);

        const {
          elm
        } = vm;
        return elm.getElementsByTagName(tagNameOrWildCard);
      },

      /**
       * Returns all element descendants of node that
       * match the provide classnames.
       */
      getElementsByClassName(names) {
        const vm = getComponentVM(this);

        const {
          elm
        } = vm;
        return elm.getElementsByClassName(names);
      },

      get classList() {

        return getLinkedElement(this).classList;
      },

      get template() {
        const vm = getComponentVM(this);

        return vm.cmpRoot;
      },

      get shadowRoot() {
        // From within the component instance, the shadowRoot is always
        // reported as "closed". Authors should rely on this.template instead.
        return null;
      },

      render() {
        const vm = getComponentVM(this);
        const {
          template
        } = vm.def;
        return isUndefined(template) ? defaultEmptyTemplate : template;
      },

      toString() {
        const vm = getComponentVM(this);

        return `[object ${vm.def.name}]`;
      }

    }; // Typescript is inferring the wrong function type for this particular
    // overloaded method: https://github.com/Microsoft/TypeScript/issues/27972
    // @ts-ignore type-mismatch

    const baseDescriptors = ArrayReduce.call(getOwnPropertyNames(HTMLElementOriginalDescriptors), (descriptors, propName) => {
      descriptors[propName] = createBridgeToElementDescriptor(propName, HTMLElementOriginalDescriptors[propName]);
      return descriptors;
    }, create(null));
    defineProperties(BaseLightningElement.prototype, baseDescriptors);

    freeze(BaseLightningElement);
    seal(BaseLightningElement.prototype);
    /*
     * Copyright (c) 2018, salesforce.com, inc.
     * All rights reserved.
     * SPDX-License-Identifier: MIT
     * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
     */
    // A bridge descriptor is a descriptor whose job is just to get the component instance
    // from the element instance, and get the value or set a new value on the component.
    // This means that across different elements, similar names can get the exact same
    // descriptor, so we can cache them:

    const cachedGetterByKey = create(null);
    const cachedSetterByKey = create(null);

    function createGetter(key) {
      let fn = cachedGetterByKey[key];

      if (isUndefined(fn)) {
        fn = cachedGetterByKey[key] = function () {
          const vm = getCustomElementVM(this);
          const {
            getHook
          } = vm;
          return getHook(vm.component, key);
        };
      }

      return fn;
    }

    function createSetter(key) {
      let fn = cachedSetterByKey[key];

      if (isUndefined(fn)) {
        fn = cachedSetterByKey[key] = function (newValue) {
          const vm = getCustomElementVM(this);
          const {
            setHook
          } = vm;
          setHook(vm.component, key, newValue);
        };
      }

      return fn;
    }

    function createMethodCaller(methodName) {
      return function () {
        const vm = getCustomElementVM(this);
        const {
          callHook,
          component
        } = vm;
        const fn = component[methodName];
        return callHook(vm.component, fn, ArraySlice.call(arguments));
      };
    }

    function HTMLBridgeElementFactory(SuperClass, props, methods) {
      let HTMLBridgeElement;
      /**
       * Modern browsers will have all Native Constructors as regular Classes
       * and must be instantiated with the new keyword. In older browsers,
       * specifically IE11, those are objects with a prototype property defined,
       * since they are not supposed to be extended or instantiated with the
       * new keyword. This forking logic supports both cases, specifically because
       * wc.ts relies on the construction path of the bridges to create new
       * fully qualifying web components.
       */

      if (isFunction(SuperClass)) {
        HTMLBridgeElement = class extends SuperClass {};
      } else {
        HTMLBridgeElement = function () {
          // Bridge classes are not supposed to be instantiated directly in
          // browsers that do not support web components.
          throw new TypeError('Illegal constructor');
        }; // prototype inheritance dance


        setPrototypeOf(HTMLBridgeElement, SuperClass);
        setPrototypeOf(HTMLBridgeElement.prototype, SuperClass.prototype);
        defineProperty(HTMLBridgeElement.prototype, 'constructor', {
          writable: true,
          configurable: true,
          value: HTMLBridgeElement
        });
      }

      const descriptors = create(null); // expose getters and setters for each public props on the new Element Bridge

      for (let i = 0, len = props.length; i < len; i += 1) {
        const propName = props[i];
        descriptors[propName] = {
          get: createGetter(propName),
          set: createSetter(propName),
          enumerable: true,
          configurable: true
        };
      } // expose public methods as props on the new Element Bridge


      for (let i = 0, len = methods.length; i < len; i += 1) {
        const methodName = methods[i];
        descriptors[methodName] = {
          value: createMethodCaller(methodName),
          writable: true,
          configurable: true
        };
      }

      defineProperties(HTMLBridgeElement.prototype, descriptors);
      return HTMLBridgeElement;
    }

    const BaseBridgeElement = HTMLBridgeElementFactory(HTMLElement, getOwnPropertyNames(HTMLElementOriginalDescriptors), []);
    freeze(BaseBridgeElement);
    seal(BaseBridgeElement.prototype);
    /*
     * Copyright (c) 2018, salesforce.com, inc.
     * All rights reserved.
     * SPDX-License-Identifier: MIT
     * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
     */

    const CtorToDefMap = new WeakMap();

    function getCtorProto(Ctor, subclassComponentName) {
      let proto = getPrototypeOf(Ctor);

      if (isNull(proto)) {
        throw new ReferenceError(`Invalid prototype chain for ${subclassComponentName}, you must extend LightningElement.`);
      } // covering the cases where the ref is circular in AMD


      if (isCircularModuleDependency(proto)) {
        const p = resolveCircularModuleDependency(proto);
        // of our Base class without having to leak it to user-land. If the circular function returns
        // itself, that's the signal that we have hit the end of the proto chain, which must always
        // be base.


        proto = p === proto ? BaseLightningElement : p;
      }

      return proto;
    }

    function createComponentDef(Ctor, meta, subclassComponentName) {

      const {
        name,
        template
      } = meta;
      let decoratorsMeta = getDecoratorsRegisteredMeta(Ctor); // TODO: eventually, the compiler should do this call directly, but we will also
      // have to fix all our tests, which are using this declaration manually.

      if (isUndefined(decoratorsMeta)) {
        registerDecorators(Ctor, {
          publicMethods: getOwnValue(Ctor, 'publicMethods'),
          publicProps: getOwnValue(Ctor, 'publicProps'),
          track: getOwnValue(Ctor, 'track'),
          wire: getOwnValue(Ctor, 'wire')
        });
        decoratorsMeta = getDecoratorsRegisteredMeta(Ctor);
      }

      let {
        props,
        methods,
        wire,
        track
      } = decoratorsMeta || EmptyObject;
      const proto = Ctor.prototype;
      let {
        connectedCallback,
        disconnectedCallback,
        renderedCallback,
        errorCallback,
        render
      } = proto;
      const superProto = getCtorProto(Ctor, subclassComponentName);
      const superDef = superProto !== BaseLightningElement ? getComponentDef(superProto, subclassComponentName) : null;
      const SuperBridge = isNull(superDef) ? BaseBridgeElement : superDef.bridge;
      const bridge = HTMLBridgeElementFactory(SuperBridge, getOwnPropertyNames(props), getOwnPropertyNames(methods));

      if (!isNull(superDef)) {
        props = assign(create(null), superDef.props, props);
        methods = assign(create(null), superDef.methods, methods);
        wire = superDef.wire || wire ? assign(create(null), superDef.wire, wire) : undefined;
        track = assign(create(null), superDef.track, track);
        connectedCallback = connectedCallback || superDef.connectedCallback;
        disconnectedCallback = disconnectedCallback || superDef.disconnectedCallback;
        renderedCallback = renderedCallback || superDef.renderedCallback;
        errorCallback = errorCallback || superDef.errorCallback;
        render = render || superDef.render;
      }

      props = assign(create(null), HTML_PROPS, props);
      const def = {
        ctor: Ctor,
        name,
        wire,
        track,
        props,
        methods,
        bridge,
        template,
        connectedCallback,
        disconnectedCallback,
        renderedCallback,
        errorCallback,
        render
      };

      return def;
    }

    function getOwnValue(o, key) {
      const d = getOwnPropertyDescriptor(o, key);
      return d && d.value;
    }

    function getComponentDef(Ctor, subclassComponentName) {
      let def = CtorToDefMap.get(Ctor);

      if (def) {
        return def;
      }

      let meta = getComponentRegisteredMeta(Ctor);

      if (isUndefined(meta)) {
        // TODO: remove this workaround:
        // this is temporary until
        // all tests are updated to call registerComponent:
        meta = {
          template: undefined,
          name: Ctor.name
        };
      }

      def = createComponentDef(Ctor, meta, subclassComponentName || Ctor.name);
      CtorToDefMap.set(Ctor, def);
      return def;
    }
    // No DOM Patching occurs here


    function setElementProto(elm, def) {
      setPrototypeOf(elm, def.bridge.prototype);
    } // Typescript is inferring the wrong function type for this particular
    // overloaded method: https://github.com/Microsoft/TypeScript/issues/27972
    // @ts-ignore type-mismatch


    const HTML_PROPS = ArrayReduce.call(getOwnPropertyNames(HTMLElementOriginalDescriptors), (props, propName) => {
      const attrName = getAttrNameFromPropName(propName);
      props[propName] = {
        config: 3,
        type: 'any',
        attr: attrName
      };
      return props;
    }, create(null));
    /*
     * Copyright (c) 2018, salesforce.com, inc.
     * All rights reserved.
     * SPDX-License-Identifier: MIT
     * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
     */
    // Object of type ShadowRoot for instance checks

    const NativeShadowRoot = window.ShadowRoot;
    const isNativeShadowRootAvailable$1 = typeof NativeShadowRoot !== 'undefined';
    var VMState;

    (function (VMState) {
      VMState[VMState["created"] = 0] = "created";
      VMState[VMState["connected"] = 1] = "connected";
      VMState[VMState["disconnected"] = 2] = "disconnected";
    })(VMState || (VMState = {}));

    let idx = 0;
    let uid = 0;

    function callHook(cmp, fn, args = []) {
      return fn.apply(cmp, args);
    }

    function setHook(cmp, prop, newValue) {
      cmp[prop] = newValue;
    }

    function getHook(cmp, prop) {
      return cmp[prop];
    } // DO NOT CHANGE this:
    // these two values are used by the faux-shadow implementation to traverse the DOM


    const OwnerKey$1 = '$$OwnerKey$$';
    const OwnKey$1 = '$$OwnKey$$';

    function rerenderVM(vm) {

      rehydrate(vm);
    }

    function appendRootVM(vm) {

      runConnectedCallback(vm);
      rehydrate(vm);
    }

    function appendVM(vm) {

      runConnectedCallback(vm);
      rehydrate(vm);
    } // just in case the component comes back, with this we guarantee re-rendering it
    // while preventing any attempt to rehydration until after reinsertion.


    function resetComponentStateWhenRemoved(vm) {

      runDisconnectedCallback(vm);
      runChildrenDisconnectedCallback(vm);
    } // this method is triggered by the diffing algo only when a vnode from the
    // old vnode.children is removed from the DOM.


    function removeVM(vm) {

      resetComponentStateWhenRemoved(vm);
    } // this method is triggered by the removal of a root element from the DOM.


    function removeRootVM(vm) {

      resetComponentStateWhenRemoved(vm);
    }

    function createVM(tagName, elm, Ctor, options) {

      const def = getComponentDef(Ctor);
      const {
        isRoot,
        mode,
        fallback,
        owner
      } = options;
      const shadowRootOptions = {
        mode,
        delegatesFocus: !!Ctor.delegatesFocus
      };
      uid += 1;
      idx += 1;
      const vm = {
        uid,
        // component creation index is defined once, and never reset, it can
        // be preserved from one insertion to another without any issue
        idx,
        state: VMState.created,
        isScheduled: false,
        isDirty: true,
        isRoot: isTrue(isRoot),
        fallback,
        mode,
        def,
        owner,
        elm: elm,
        data: EmptyObject,
        context: create(null),
        cmpProps: create(null),
        cmpTrack: create(null),
        cmpSlots: fallback ? create(null) : undefined,
        cmpRoot: elm.attachShadow(shadowRootOptions),
        callHook,
        setHook,
        getHook,
        children: EmptyArray,
        velements: EmptyArray,
        // used to track down all object-key pairs that makes this vm reactive
        deps: []
      };


      createComponent(vm, Ctor);
      const initialized = vm; // link component to the wire service

      linkComponent(initialized);
    }

    function rehydrate(vm) {

      if (isTrue(vm.isDirty)) {
        const children = renderComponent(vm);
        patchShadowRoot(vm, children);
      }
    }

    function patchShadowRoot(vm, newCh) {

      const {
        elm,
        cmpRoot,
        fallback,
        children: oldCh
      } = vm;
      vm.children = newCh; // caching the new children collection

      if (newCh.length > 0 || oldCh.length > 0) {
        // patch function mutates vnodes by adding the element reference,
        // however, if patching fails it contains partial changes.
        if (oldCh !== newCh) {
          const parentNode = fallback ? elm : cmpRoot;
          const fn = hasDynamicChildren(newCh) ? updateDynamicChildren : updateStaticChildren;
          runWithBoundaryProtection(vm, vm, () => {
          }, () => {
            // job
            fn(parentNode, oldCh, newCh);
          }, () => {
          });
        }
      }

      if (vm.state === VMState.connected) {
        // If the element is connected, that means connectedCallback was already issued, and
        // any successive rendering should finish with the call to renderedCallback, otherwise
        // the connectedCallback will take care of calling it in the right order at the end of
        // the current rehydration process.
        runRenderedCallback(vm);
      }
    }

    function runRenderedCallback(vm) {

      const {
        rendered
      } = Services;

      if (rendered) {
        invokeServiceHook(vm, rendered);
      }

      const {
        renderedCallback
      } = vm.def;

      if (!isUndefined(renderedCallback)) {

        invokeComponentCallback(vm, renderedCallback);
      }
    }

    let rehydrateQueue = [];

    function flushRehydrationQueue() {
      startGlobalMeasure(GlobalMeasurementPhase.REHYDRATE);

      const vms = rehydrateQueue.sort((a, b) => a.idx - b.idx);
      rehydrateQueue = []; // reset to a new queue

      for (let i = 0, len = vms.length; i < len; i += 1) {
        const vm = vms[i];

        try {
          rehydrate(vm);
        } catch (error) {
          if (i + 1 < len) {
            // pieces of the queue are still pending to be rehydrated, those should have priority
            if (rehydrateQueue.length === 0) {
              addCallbackToNextTick(flushRehydrationQueue);
            }

            ArrayUnshift.apply(rehydrateQueue, ArraySlice.call(vms, i + 1));
          } // we need to end the measure before throwing.


          endGlobalMeasure(GlobalMeasurementPhase.REHYDRATE); // re-throwing the original error will break the current tick, but since the next tick is
          // already scheduled, it should continue patching the rest.

          throw error; // eslint-disable-line no-unsafe-finally
        }
      }

      endGlobalMeasure(GlobalMeasurementPhase.REHYDRATE);
    }

    function runConnectedCallback(vm) {

      const {
        state
      } = vm;

      if (state === VMState.connected) {
        return; // nothing to do since it was already connected
      }

      vm.state = VMState.connected; // reporting connection

      const {
        connected
      } = Services;

      if (connected) {
        invokeServiceHook(vm, connected);
      }

      const {
        connectedCallback
      } = vm.def;

      if (!isUndefined(connectedCallback)) {

        invokeComponentCallback(vm, connectedCallback);
      }
    }

    function runDisconnectedCallback(vm) {

      const {
        state
      } = vm;

      if (state === VMState.disconnected) {
        return; // nothing to do since it was already disconnected
      }

      if (isFalse(vm.isDirty)) {
        // this guarantees that if the component is reused/reinserted,
        // it will be re-rendered because we are disconnecting the reactivity
        // linking, so mutations are not automatically reflected on the state
        // of disconnected components.
        markComponentAsDirty(vm);
      }

      clearReactiveListeners(vm);
      vm.state = VMState.disconnected; // reporting disconnection

      const {
        disconnected
      } = Services;

      if (disconnected) {
        invokeServiceHook(vm, disconnected);
      }

      const {
        disconnectedCallback
      } = vm.def;

      if (!isUndefined(disconnectedCallback)) {

        invokeComponentCallback(vm, disconnectedCallback);
      }
    }

    function runChildrenDisconnectedCallback(vm) {

      const {
        velements: vCustomElementCollection
      } = vm; // reporting disconnection for every child

      for (let i = 0, len = vCustomElementCollection.length; i < len; i += 1) {
        const elm = vCustomElementCollection[i].elm; // There are two cases where the element could be undefined:
        // * when there is an error during the construction phase, and an
        //   error boundary picks it, there is a possibility that the VCustomElement
        //   is not properly initialized, and therefore is should be ignored.
        // * when slotted custom element is not used by the element where it is slotted
        //   into it, as a result, the custom element was never initialized.

        if (!isUndefined(elm)) {
          const childVM = getCustomElementVM(elm);
          runDisconnectedCallback(childVM);
          runChildrenDisconnectedCallback(childVM);
        }
      }
    } // This is a super optimized mechanism to remove the content of the shadowRoot
    // without having to go into snabbdom. Especially useful when the reset is a consequence
    // of an error, in which case the children VNodes might not be representing the current
    // state of the DOM


    function resetShadowRoot(vm) {

      const {
        fallback
      } = vm;
      vm.children = EmptyArray;

      if (isTrue(fallback)) {
        // faux-shadow does not have a real cmpRoot instance, instead
        // we need to remove the content of the host entirely
        innerHTMLSetter.call(vm.elm, '');
      } else {
        ShadowRootInnerHTMLSetter.call(vm.cmpRoot, '');
      } // disconnecting any known custom element inside the shadow of the this vm


      runChildrenDisconnectedCallback(vm);
    }

    function scheduleRehydration(vm) {

      if (!vm.isScheduled) {
        vm.isScheduled = true;

        if (rehydrateQueue.length === 0) {
          addCallbackToNextTick(flushRehydrationQueue);
        }

        ArrayPush.call(rehydrateQueue, vm);
      }
    }

    function getErrorBoundaryVMFromOwnElement(vm) {

      const {
        elm
      } = vm;
      return getErrorBoundaryVM(elm);
    }

    function getErrorBoundaryVM(startingElement) {
      let elm = startingElement;
      let vm;

      while (!isNull(elm)) {
        vm = getInternalField(elm, ViewModelReflection);

        if (!isUndefined(vm) && !isUndefined(vm.def.errorCallback)) {
          return vm;
        }

        elm = getParentOrHostElement(elm);
      }
    }
    /**
     * Returns the component stack. Used for errors messages only.
     *
     * @param {Element} startingElement
     *
     * @return {string} The component stack for errors.
     */


    function getErrorComponentStack(startingElement) {
      const wcStack = [];
      let elm = startingElement;

      do {
        const currentVm = getInternalField(elm, ViewModelReflection);

        if (!isUndefined(currentVm)) {
          const tagName = tagNameGetter.call(elm);
          const is = elm.getAttribute('is');
          ArrayPush.call(wcStack, `<${StringToLowerCase.call(tagName)}${is ? ' is="${is}' : ''}>`);
        }

        elm = getParentOrHostElement(elm);
      } while (!isNull(elm));

      return wcStack.reverse().join('\n\t');
    }
    /**
     * Finds the parent of the specified element. If shadow DOM is enabled, finds
     * the host of the shadow root to escape the shadow boundary.
     */


    function getParentOrHostElement(elm) {
      const parentElement = parentElementGetter.call(elm); // If this is a shadow root, find the host instead

      return isNull(parentElement) && isNativeShadowRootAvailable$1 ? getHostElement(elm) : parentElement;
    }
    /**
     * Finds the host element, if it exists.
     */


    function getHostElement(elm) {

      const parentNode = parentNodeGetter.call(elm);
      return parentNode instanceof NativeShadowRoot ? ShadowRootHostGetter.call(parentNode) : null;
    }

    function getNodeOwnerKey$1(node) {
      return node[OwnerKey$1];
    }

    function setNodeOwnerKey$1(node, value) {
      {
        // in prod, for better perf, we just let it roll
        node[OwnerKey$1] = value;
      }
    }

    function getNodeKey$1(node) {
      return node[OwnKey$1];
    }

    function setNodeKey(node, value) {
      {
        // in prod, for better perf, we just let it roll
        node[OwnKey$1] = value;
      }
    }

    function getCustomElementVM(elm) {

      return getInternalField(elm, ViewModelReflection);
    }

    function getComponentVM(component) {

      return getHiddenField(component, ViewModelReflection);
    }
    // NOTE: we should probably more this routine to the faux shadow folder
    // and get the allocation to be cached by in the elm instead of in the VM


    function allocateInSlot(vm, children) {

      const {
        cmpSlots: oldSlots
      } = vm;
      const cmpSlots = vm.cmpSlots = create(null);

      for (let i = 0, len = children.length; i < len; i += 1) {
        const vnode = children[i];

        if (isNull(vnode)) {
          continue;
        }

        const data = vnode.data;
        const slotName = data.attrs && data.attrs.slot || '';
        const vnodes = cmpSlots[slotName] = cmpSlots[slotName] || []; // re-keying the vnodes is necessary to avoid conflicts with default content for the slot
        // which might have similar keys. Each vnode will always have a key that
        // starts with a numeric character from compiler. In this case, we add a unique
        // notation for slotted vnodes keys, e.g.: `@foo:1:1`

        vnode.key = `@${slotName}:${vnode.key}`;
        ArrayPush.call(vnodes, vnode);
      }

      if (isFalse(vm.isDirty)) {
        // We need to determine if the old allocation is really different from the new one
        // and mark the vm as dirty
        const oldKeys = keys(oldSlots);

        if (oldKeys.length !== keys(cmpSlots).length) {
          markComponentAsDirty(vm);
          return;
        }

        for (let i = 0, len = oldKeys.length; i < len; i += 1) {
          const key = oldKeys[i];

          if (isUndefined(cmpSlots[key]) || oldSlots[key].length !== cmpSlots[key].length) {
            markComponentAsDirty(vm);
            return;
          }

          const oldVNodes = oldSlots[key];
          const vnodes = cmpSlots[key];

          for (let j = 0, a = cmpSlots[key].length; j < a; j += 1) {
            if (oldVNodes[j] !== vnodes[j]) {
              markComponentAsDirty(vm);
              return;
            }
          }
        }
      }
    }

    function runWithBoundaryProtection(vm, owner, pre, job, post) {

      let error;
      pre();

      try {
        job();
      } catch (e) {
        error = Object(e);
      } finally {
        post();

        if (!isUndefined(error)) {
          error.wcStack = error.wcStack || getErrorComponentStack(vm.elm);
          const errorBoundaryVm = isNull(owner) ? undefined : getErrorBoundaryVMFromOwnElement(owner);

          if (isUndefined(errorBoundaryVm)) {
            throw error; // eslint-disable-line no-unsafe-finally
          }

          resetShadowRoot(vm); // remove offenders

          const {
            errorCallback
          } = errorBoundaryVm.def;


          invokeComponentCallback(errorBoundaryVm, errorCallback, [error, error.wcStack]);
        }
      }
    }
    /*
     * Copyright (c) 2018, salesforce.com, inc.
     * All rights reserved.
     * SPDX-License-Identifier: MIT
     * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
     */


    const ConnectingSlot = createFieldName('connecting');
    const DisconnectingSlot = createFieldName('disconnecting');

    function callNodeSlot(node, slot) {

      const fn = getInternalField(node, slot);

      if (!isUndefined(fn)) {
        fn();
      }

      return node; // for convenience
    } // monkey patching Node methods to be able to detect the insertions and removal of
    // root elements created via createElement.


    assign(Node.prototype, {
      appendChild(newChild) {
        const appendedNode = appendChild.call(this, newChild);
        return callNodeSlot(appendedNode, ConnectingSlot);
      },

      insertBefore(newChild, referenceNode) {
        const insertedNode = insertBefore.call(this, newChild, referenceNode);
        return callNodeSlot(insertedNode, ConnectingSlot);
      },

      removeChild(oldChild) {
        const removedNode = removeChild.call(this, oldChild);
        return callNodeSlot(removedNode, DisconnectingSlot);
      },

      replaceChild(newChild, oldChild) {
        const replacedNode = replaceChild.call(this, newChild, oldChild);
        callNodeSlot(replacedNode, DisconnectingSlot);
        callNodeSlot(newChild, ConnectingSlot);
        return replacedNode;
      }

    });
    /**
     * This method is almost identical to document.createElement
     * (https://developer.mozilla.org/en-US/docs/Web/API/Document/createElement)
     * with the slightly difference that in the options, you can pass the `is`
     * property set to a Constructor instead of just a string value. E.g.:
     *
     * const el = createElement('x-foo', { is: FooCtor });
     *
     * If the value of `is` attribute is not a constructor,
     * then it throws a TypeError.
     */

    function createElement$2(sel, options) {
      if (!isObject(options) || isNull(options)) {
        throw new TypeError(`"createElement" function expects an object as second parameter but received "${toString(options)}".`);
      }

      let Ctor = options.is;

      if (!isFunction(Ctor)) {
        throw new TypeError(`"is" value must be a function but received "${toString(Ctor)}".`);
      }

      if (isCircularModuleDependency(Ctor)) {
        Ctor = resolveCircularModuleDependency(Ctor);
      }

      let {
        mode,
        fallback
      } = options; // TODO: for now, we default to open, but eventually it should default to 'closed'

      if (mode !== 'closed') {
        mode = 'open';
      } // TODO: for now, we default to true, but eventually it should default to false


      fallback = isUndefined(fallback) || isTrue(fallback) || isFalse(isNativeShadowRootAvailable); // Create element with correct tagName

      const element = document.createElement(sel);

      if (!isUndefined(getNodeKey$1(element))) {
        // There is a possibility that a custom element is registered under tagName,
        // in which case, the initialization is already carry on, and there is nothing else
        // to do here.
        return element;
      }

      const def = getComponentDef(Ctor);
      setElementProto(element, def);

      if (isTrue(fallback)) {
        patchCustomElementProto(element, {
          def
        });
      }


      createVM(sel, element, Ctor, {
        mode,
        fallback,
        isRoot: true,
        owner: null
      }); // Handle insertion and removal from the DOM manually

      setInternalField(element, ConnectingSlot, () => {
        const vm = getCustomElementVM(element);
        startGlobalMeasure(GlobalMeasurementPhase.HYDRATE, vm);

        if (vm.state === VMState.connected) {
          // usually means moving the element from one place to another, which is observable via life-cycle hooks
          removeRootVM(vm);
        }

        appendRootVM(vm);
        endGlobalMeasure(GlobalMeasurementPhase.HYDRATE, vm);
      });
      setInternalField(element, DisconnectingSlot, () => {
        const vm = getCustomElementVM(element);
        removeRootVM(vm);
      });
      return element;
    }
    /** version: 0.36.0 */

    function tmpl($api, $cmp, $slotset, $ctx) {
      const {
        t: api_text,
        h: api_element,
        b: api_bind,
        d: api_dynamic,
        k: api_key,
        i: api_iterator
      } = $api;
      const {
        _m0,
        _m1,
        _m2,
        _m3,
        _m4,
        _m5,
        _m6
      } = $ctx;
      return [api_element("div", {
        classMap: {
          "container": true
        },
        key: 2
      }, [api_element("div", {
        classMap: {
          "jumbotron": true
        },
        key: 3
      }, [api_element("div", {
        classMap: {
          "row": true
        },
        key: 4
      }, [api_element("div", {
        classMap: {
          "col-md-6": true
        },
        key: 5
      }, [api_element("h1", {
        key: 6
      }, [api_text("LWC")])]), api_element("div", {
        classMap: {
          "col-md-6": true
        },
        key: 7
      }, [api_element("div", {
        classMap: {
          "row": true
        },
        key: 8
      }, [api_element("div", {
        classMap: {
          "col-sm-6": true,
          "smallpad": true
        },
        key: 9
      }, [api_element("button", {
        classMap: {
          "btn": true,
          "btn-primary": true,
          "btn-block": true
        },
        attrs: {
          "type": "button",
          "data-btn-id": "run"
        },
        key: 10,
        on: {
          "click": _m0 || ($ctx._m0 = api_bind($cmp.run))
        }
      }, [api_text("Create 1,000 rows")])]), api_element("div", {
        classMap: {
          "col-sm-6": true,
          "smallpad": true
        },
        key: 11
      }, [api_element("button", {
        classMap: {
          "btn": true,
          "btn-primary": true,
          "btn-block": true
        },
        attrs: {
          "type": "button",
          "data-btn-id": "runlots"
        },
        key: 12,
        on: {
          "click": _m1 || ($ctx._m1 = api_bind($cmp.runLots))
        }
      }, [api_text("Create 10,000 rows")])]), api_element("div", {
        classMap: {
          "col-sm-6": true,
          "smallpad": true
        },
        key: 13
      }, [api_element("button", {
        classMap: {
          "btn": true,
          "btn-primary": true,
          "btn-block": true
        },
        attrs: {
          "type": "button",
          "data-btn-id": "add"
        },
        key: 14,
        on: {
          "click": _m2 || ($ctx._m2 = api_bind($cmp.add))
        }
      }, [api_text("Append 1,000 rows")])]), api_element("div", {
        classMap: {
          "col-sm-6": true,
          "smallpad": true
        },
        key: 15
      }, [api_element("button", {
        classMap: {
          "btn": true,
          "btn-primary": true,
          "btn-block": true
        },
        attrs: {
          "type": "button",
          "data-btn-id": "update"
        },
        key: 16,
        on: {
          "click": _m3 || ($ctx._m3 = api_bind($cmp.update))
        }
      }, [api_text("Update every 10th row")])]), api_element("div", {
        classMap: {
          "col-sm-6": true,
          "smallpad": true
        },
        key: 17
      }, [api_element("button", {
        classMap: {
          "btn": true,
          "btn-primary": true,
          "btn-block": true
        },
        attrs: {
          "type": "button",
          "data-btn-id": "clear"
        },
        key: 18,
        on: {
          "click": _m4 || ($ctx._m4 = api_bind($cmp.clear))
        }
      }, [api_text("Clear")])]), api_element("div", {
        classMap: {
          "col-sm-6": true,
          "smallpad": true
        },
        key: 19
      }, [api_element("button", {
        classMap: {
          "btn": true,
          "btn-primary": true,
          "btn-block": true
        },
        attrs: {
          "type": "button",
          "data-btn-id": "swaprows"
        },
        key: 20,
        on: {
          "click": _m5 || ($ctx._m5 = api_bind($cmp.swapRows))
        }
      }, [api_text("Swap Rows")])])])])])]), api_element("table", {
        classMap: {
          "table": true,
          "table-hover": true,
          "table-striped": true,
          "test-data": true
        },
        key: 21,
        on: {
          "click": _m6 || ($ctx._m6 = api_bind($cmp.handleRowClick))
        }
      }, [api_element("tbody", {
        key: 22
      }, api_iterator($cmp.rows, function (row) {
        return api_element("tr", {
          className: row.className,
          attrs: {
            "data-id": row.id
          },
          key: api_key(24, row.id)
        }, [api_element("td", {
          classMap: {
            "col-md-1": true
          },
          key: 25
        }, [api_dynamic(row.id)]), api_element("td", {
          classMap: {
            "col-md-4": true
          },
          attrs: {
            "data-interaction": "select"
          },
          key: 26
        }, [api_element("a", {
          attrs: {
            "data-id": row.id,
            "data-interaction": "select"
          },
          key: 27
        }, [api_dynamic(row.label)])]), api_element("td", {
          classMap: {
            "col-md-1": true
          },
          key: 28
        }, [api_element("a", {
          attrs: {
            "data-interaction": "remove",
            "data-id": row.id
          },
          key: 29
        }, [api_element("span", {
          classMap: {
            "glyphicon": true,
            "glyphicon-remove": true
          },
          attrs: {
            "data-interaction": "remove",
            "data-id": row.id,
            "aria-hidden": "true"
          },
          key: 30
        }, [])])]), api_element("td", {
          classMap: {
            "col-md-6": true
          },
          key: 31
        }, [])]);
      }))]), api_element("span", {
        classMap: {
          "preloadicon": true,
          "glyphicon": true,
          "glyphicon-remove": true
        },
        attrs: {
          "aria-hidden": "true"
        },
        key: 32
      }, [])])];
    }

    var _tmpl = registerTemplate(tmpl);
    tmpl.stylesheets = [];
    tmpl.stylesheetTokens = {
      hostAttribute: "bench-app_app-host",
      shadowAttribute: "bench-app_app"
    };

    var _tmpl$1 = void 0;

    function _random(max) {
      return Math.round(Math.random() * 1000) % max;
    }

    class Store {
      constructor() {
        this.data = [];
        this.backup = null;
        this.selected = null;
        this.id = 1;
      }

      buildData(count = 1000) {
        var adjectives = ["pretty", "large", "big", "small", "tall", "short", "long", "handsome", "plain", "quaint", "clean", "elegant", "easy", "angry", "crazy", "helpful", "mushy", "odd", "unsightly", "adorable", "important", "inexpensive", "cheap", "expensive", "fancy"];
        var colours = ["red", "yellow", "blue", "green", "pink", "brown", "purple", "brown", "white", "black", "orange"];
        var nouns = ["table", "chair", "house", "bbq", "desk", "car", "pony", "cookie", "sandwich", "burger", "pizza", "mouse", "keyboard"];
        var data = [];

        for (var i = 0; i < count; i++) data.push({
          id: this.id++,
          label: adjectives[_random(adjectives.length)] + " " + colours[_random(colours.length)] + " " + nouns[_random(nouns.length)]
        });

        return data;
      }

      updateData(mod = 10) {
        for (let i = 0; i < this.data.length; i += 10) {
          this.data[i].label += ' !!!'; // this.data[i] = Object.assign({}, this.data[i], {label: this.data[i].label +' !!!'});
        }
      }

      delete(id) {
        const idx = this.data.findIndex(d => d.id == id);
        this.data = this.data.filter((e, i) => i != idx);
        return this;
      }

      run() {
        this.data = this.buildData();
        this.selected = null;
      }

      add() {
        this.data = this.data.concat(this.buildData(1000));
        this.selected = null;
      }

      update() {
        this.updateData();
        this.selected = null;
      }

      select(id) {
        this.selected = id;
      }

      hideAll() {
        this.backup = this.data;
        this.data = [];
        this.selected = null;
      }

      showAll() {
        this.data = this.backup;
        this.backup = null;
        this.selected = null;
      }

      runLots() {
        this.data = this.buildData(10000);
        this.selected = null;
      }

      clear() {
        this.data = [];
        this.selected = null;
      }

      swapRows() {
        if (this.data.length > 998) {
          var a = this.data[1];
          this.data[1] = this.data[998];
          this.data[998] = a;
        }
      }

    }

    var Store$1 = registerComponent(Store, {
      tmpl: _tmpl$1
    });

    function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

    function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
    const store = new Store$1();
    let startTime;
    let lastMeasure;

    function startMeasure$1(name) {
      startTime = performance.now();
      lastMeasure = name;
    }

    function stopMeasure() {
      var last = lastMeasure;

      if (lastMeasure) {
        window.setTimeout(function () {
          lastMeasure = null;
          var stop = performance.now();
          console.log(last + " took " + (stop - startTime));
        }, 0);
      }
    }

    function generateRows(store) {
      const {
        selected,
        data
      } = store;
      return data.map(row => _objectSpread({}, row, {
        className: row.id === selected ? 'danger' : ''
      }));
    }

    class App extends BaseLightningElement {
      constructor(...args) {
        super(...args);
        this.rows = [];
        this._hasRendered = false;
      }

      run() {
        startMeasure$1('run');
        store.run();
        this.rows = generateRows(store);
      }

      runLots() {
        startMeasure$1('runLots');
        store.runLots();
        this.rows = generateRows(store);
      }

      add() {
        startMeasure$1('add');
        store.add();
        this.rows = generateRows(store);
      }

      update() {
        startMeasure$1('update');
        store.update();
        this.rows = generateRows(store);
      }

      clear() {
        startMeasure$1('clear');
        store.clear();
        this.rows = generateRows(store);
      }

      swapRows() {
        startMeasure$1('swapRows');
        store.swapRows();
        this.rows = generateRows(store);
      }

      handleRowClick(evt) {
        const {
          target
        } = evt;
        const interaction = target.getAttribute('data-interaction');
        const id = target.getAttribute('data-id');

        if (interaction !== null && id !== null) {
          if (interaction === 'select') {
            startMeasure$1('select');
            store.select(parseInt(id));
          } else if (interaction === 'remove') {
            startMeasure$1('delete');
            store.delete(parseInt(id));
          }

          this.rows = generateRows(store);
        }
      }

      renderedCallback() {
        stopMeasure();

        if (!this._hasRendered) {
          this._hasRendered = true;
          const btns = this.template.querySelectorAll('[data-btn-id]');

          for (let btn of btns) {
            btn.id = btn.dataset.btnId;
          }
        }
      }

    }

    registerDecorators(App, {
      track: {
        rows: 1
      }
    });

    var App$1 = registerComponent(App, {
      tmpl: _tmpl
    });

    const element = createElement$2("main-element", {
      is: App$1
    });
    const container = document.getElementById("app");
    container.appendChild(element);

}());
