/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/blocks/conditional-group/edit.js"
/*!**********************************************!*\
  !*** ./src/blocks/conditional-group/edit.js ***!
  \**********************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Edit)
/* harmony export */ });
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/block-editor */ "@wordpress/block-editor");
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__);
/**
 * Editor view for the "Conditional Group" block: a plain wrapper that
 * lets authors drop any blocks inside and apply one set of conditions
 * to the whole group (the Conditional Visibility panel itself is added
 * automatically to every block, including this one, by src/index.js).
 */



function Edit({
  attributes
}) {
  const blockProps = (0,_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_0__.useBlockProps)({
    className: 'wbdcobl-conditional-group-editor'
  });
  const isActive = !!(attributes.cbConditions && attributes.cbConditions.enabled);
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)("div", {
    ...blockProps,
    children: [isActive && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("div", {
      className: "wbdcobl-group-badge",
      children: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Conditional Group — rules active', 'wbd-conditional-block')
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_0__.InnerBlocks, {
      templateLock: false,
      renderAppender: _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_0__.InnerBlocks.DefaultBlockAppender
    })]
  });
}

/***/ },

/***/ "./src/blocks/conditional-group/save.js"
/*!**********************************************!*\
  !*** ./src/blocks/conditional-group/save.js ***!
  \**********************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ save)
/* harmony export */ });
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/block-editor */ "@wordpress/block-editor");
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__);
/**
 * Save callback for the "Conditional Group" block. The block is rendered
 * dynamically on the frontend (see WBDCOBL_Block_Group::render() in PHP), but
 * WordPress still needs save() to serialize the inner block markup into
 * post_content so it survives edits, exports, and revisions.
 */


function save() {
  const blockProps = _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_0__.useBlockProps.save();
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("div", {
    ...blockProps,
    children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_0__.InnerBlocks.Content, {})
  });
}

/***/ },

/***/ "./src/components/condition-row.js"
/*!*****************************************!*\
  !*** ./src/components/condition-row.js ***!
  \*****************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ ConditionRow)
/* harmony export */ });
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_icons__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/icons */ "./node_modules/@wordpress/icons/build-module/library/close-small.mjs");
/* harmony import */ var _utils_constants__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../utils/constants */ "./src/utils/constants.js");
/* harmony import */ var _condition_value_control__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./condition-value-control */ "./src/components/condition-value-control.js");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__);
/**
 * One condition row: type + operator (is/is not) + value + remove button.
 */






function ConditionRow({
  condition,
  onChange,
  onRemove
}) {
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)("div", {
    className: "wbdcobl-condition-row",
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)(_wordpress_components__WEBPACK_IMPORTED_MODULE_0__.Flex, {
      align: "flex-start",
      gap: 2,
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_0__.FlexBlock, {
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_0__.SelectControl, {
          label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Condition type', 'wbd-conditional-block'),
          value: condition.type,
          options: _utils_constants__WEBPACK_IMPORTED_MODULE_3__.CONDITION_TYPES,
          onChange: type => onChange((0,_utils_constants__WEBPACK_IMPORTED_MODULE_3__.createEmptyCondition)(type)),
          __next40pxDefaultSize: true
        })
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_0__.FlexItem, {
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_0__.SelectControl, {
          label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Operator', 'wbd-conditional-block'),
          value: condition.operator || 'is',
          options: [{
            value: 'is',
            label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Is', 'wbd-conditional-block')
          }, {
            value: 'is_not',
            label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Is not', 'wbd-conditional-block')
          }],
          onChange: operator => onChange({
            ...condition,
            operator
          }),
          __next40pxDefaultSize: true
        })
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_0__.FlexItem, {
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_0__.Button, {
          icon: _wordpress_icons__WEBPACK_IMPORTED_MODULE_2__["default"],
          label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Remove condition', 'wbd-conditional-block'),
          onClick: onRemove,
          isSmall: true,
          className: "wbdcobl-remove-condition"
        })
      })]
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("div", {
      className: "wbdcobl-condition-value",
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_condition_value_control__WEBPACK_IMPORTED_MODULE_4__["default"], {
        type: condition.type,
        value: condition.value,
        onChange: value => onChange({
          ...condition,
          value
        })
      })
    })]
  });
}

/***/ },

/***/ "./src/components/condition-value-control.js"
/*!***************************************************!*\
  !*** ./src/components/condition-value-control.js ***!
  \***************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ ConditionValueControl)
/* harmony export */ });
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _post_picker__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./post-picker */ "./src/components/post-picker.js");
/* harmony import */ var _utils_constants__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../utils/constants */ "./src/utils/constants.js");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__);
/**
 * Renders the correct value input(s) for a given condition type.
 */





const data = typeof window !== 'undefined' && window.ConditionalBlocksData ? window.ConditionalBlocksData : {};
const ROLE_OPTIONS = (data.roles || []).concat([{
  value: 'wc_customer',
  label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('WooCommerce Customer', 'wbd-conditional-block')
}]);
const POST_TYPE_OPTIONS = data.postTypes || [];
function updateValue(value, patch, onChange) {
  onChange({
    ...(typeof value === 'object' && value ? value : {}),
    ...patch
  });
}
function ConditionValueControl({
  type,
  value,
  onChange
}) {
  switch (type) {
    case 'login_status':
      return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_0__.SelectControl, {
        label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Visitor is', 'wbd-conditional-block'),
        value: value,
        options: [{
          value: 'logged_in',
          label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Logged in', 'wbd-conditional-block')
        }, {
          value: 'logged_out',
          label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Logged out', 'wbd-conditional-block')
        }],
        onChange: onChange,
        __next40pxDefaultSize: true
      });
    case 'user_role':
      return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_0__.FormTokenField, {
        label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Roles (any match)', 'wbd-conditional-block'),
        value: (Array.isArray(value) ? value : []).map(slug => (ROLE_OPTIONS.find(r => r.value === slug) || {
          label: slug
        }).label),
        suggestions: ROLE_OPTIONS.map(r => r.label),
        onChange: labels => {
          const slugs = labels.map(label => {
            const found = ROLE_OPTIONS.find(r => r.label === label);
            return found ? found.value : null;
          }).filter(Boolean);
          onChange(slugs);
        },
        __experimentalExpandOnFocus: true,
        __next40pxDefaultSize: true
      });
    case 'device_type':
      return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_0__.SelectControl, {
        label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Device', 'wbd-conditional-block'),
        value: value,
        options: _utils_constants__WEBPACK_IMPORTED_MODULE_3__.DEVICE_OPTIONS,
        onChange: onChange,
        __next40pxDefaultSize: true
      });
    case 'date_time':
      return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(DateTimeValue, {
        value: value,
        onChange: onChange
      });
    case 'page_type':
      return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(PageTypeValue, {
        value: value,
        onChange: onChange
      });
    case 'geolocation':
      return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_0__.FormTokenField, {
        label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Country codes (ISO 2-letter, any match)', 'wbd-conditional-block'),
        value: Array.isArray(value) ? value : [],
        onChange: codes => onChange(codes.map(c => c.toUpperCase().trim()).filter(Boolean)),
        __experimentalExpandOnFocus: true,
        __next40pxDefaultSize: true
      });
    case 'browser':
      return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_0__.SelectControl, {
        label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Browser', 'wbd-conditional-block'),
        value: value,
        options: _utils_constants__WEBPACK_IMPORTED_MODULE_3__.BROWSER_OPTIONS,
        onChange: onChange,
        __next40pxDefaultSize: true
      });
    case 'os':
      return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_0__.SelectControl, {
        label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Operating system', 'wbd-conditional-block'),
        value: value,
        options: _utils_constants__WEBPACK_IMPORTED_MODULE_3__.OS_OPTIONS,
        onChange: onChange,
        __next40pxDefaultSize: true
      });
    case 'referrer':
      return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(ReferrerValue, {
        value: value,
        onChange: onChange
      });
    case 'query_string':
      return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.Fragment, {
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_0__.TextControl, {
          label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Parameter name', 'wbd-conditional-block'),
          value: value && value.key || '',
          onChange: key => updateValue(value, {
            key
          }, onChange),
          placeholder: "source",
          __next40pxDefaultSize: true
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_0__.TextControl, {
          label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Expected value (optional — leave blank to just check it exists)', 'wbd-conditional-block'),
          value: value && value.value || '',
          onChange: fieldValue => updateValue(value, {
            value: fieldValue
          }, onChange),
          placeholder: "facebook",
          __next40pxDefaultSize: true
        })]
      });
    case 'cookie':
      return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.Fragment, {
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_0__.TextControl, {
          label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Cookie name', 'wbd-conditional-block'),
          value: value && value.name || '',
          onChange: name => updateValue(value, {
            name
          }, onChange),
          placeholder: "visited_before",
          __next40pxDefaultSize: true
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_0__.TextControl, {
          label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Expected value (optional — leave blank to just check it exists)', 'wbd-conditional-block'),
          value: value && value.value || '',
          onChange: fieldValue => updateValue(value, {
            value: fieldValue
          }, onChange),
          __next40pxDefaultSize: true
        })]
      });
    case 'woocommerce':
      return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(WooCommerceValue, {
        value: value,
        onChange: onChange
      });
    case 'custom_field':
      return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(CustomFieldValue, {
        value: value,
        onChange: onChange
      });
    case 'language':
      return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_0__.TextControl, {
        label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Language code (e.g. bn, en, bn_BD)', 'wbd-conditional-block'),
        value: value || '',
        onChange: onChange,
        placeholder: "bn",
        __next40pxDefaultSize: true
      });
    case 'ab_test':
      return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_0__.SelectControl, {
        label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Variant', 'wbd-conditional-block'),
        value: value,
        options: [{
          value: 'a',
          label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Variant A', 'wbd-conditional-block')
        }, {
          value: 'b',
          label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Variant B', 'wbd-conditional-block')
        }],
        onChange: onChange,
        help: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Visitors are randomly (and consistently) split 50/50 between A and B.', 'wbd-conditional-block'),
        __next40pxDefaultSize: true
      });
    default:
      return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_0__.TextControl, {
        label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Value', 'wbd-conditional-block'),
        value: typeof value === 'string' ? value : JSON.stringify(value),
        onChange: onChange,
        help: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Custom condition type registered by a developer.', 'wbd-conditional-block'),
        __next40pxDefaultSize: true
      });
  }
}
function DateTimeValue({
  value,
  onChange
}) {
  const v = value && typeof value === 'object' ? value : {};
  const mode = v.mode || 'range';
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.Fragment, {
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_0__.SelectControl, {
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Mode', 'wbd-conditional-block'),
      value: mode,
      options: [{
        value: 'range',
        label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Date range (or countdown end date)', 'wbd-conditional-block')
      }, {
        value: 'recurring_day',
        label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Recurring day of week', 'wbd-conditional-block')
      }],
      onChange: newMode => updateValue(v, {
        mode: newMode
      }, onChange),
      __next40pxDefaultSize: true
    }), mode === 'range' ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.Fragment, {
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_0__.TextControl, {
        label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Start (optional)', 'wbd-conditional-block'),
        type: "datetime-local",
        value: v.start || '',
        onChange: start => updateValue(v, {
          start
        }, onChange),
        __next40pxDefaultSize: true
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_0__.TextControl, {
        label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('End (optional)', 'wbd-conditional-block'),
        type: "datetime-local",
        value: v.end || '',
        onChange: end => updateValue(v, {
          end
        }, onChange),
        __next40pxDefaultSize: true
      })]
    }) : /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.Fragment, {
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("p", {
        className: "wbdcobl-field-label",
        children: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Days', 'wbd-conditional-block')
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("div", {
        className: "wbdcobl-weekday-grid",
        children: _utils_constants__WEBPACK_IMPORTED_MODULE_3__.WEEKDAYS.map(day => /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_0__.CheckboxControl, {
          label: day.label,
          checked: (v.days || []).includes(day.value),
          onChange: checked => {
            const days = new Set(v.days || []);
            if (checked) {
              days.add(day.value);
            } else {
              days.delete(day.value);
            }
            updateValue(v, {
              days: Array.from(days).sort()
            }, onChange);
          }
        }, day.value))
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_0__.TextControl, {
        label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Start time (optional, HH:MM)', 'wbd-conditional-block'),
        type: "time",
        value: v.time_start || '',
        onChange: startTime => updateValue(v, {
          time_start: startTime
        }, onChange),
        __next40pxDefaultSize: true
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_0__.TextControl, {
        label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('End time (optional, HH:MM)', 'wbd-conditional-block'),
        type: "time",
        value: v.time_end || '',
        onChange: endTime => updateValue(v, {
          time_end: endTime
        }, onChange),
        __next40pxDefaultSize: true
      })]
    })]
  });
}
function PageTypeValue({
  value,
  onChange
}) {
  const v = value && typeof value === 'object' ? value : {};
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.Fragment, {
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_0__.SelectControl, {
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Show on', 'wbd-conditional-block'),
      value: v.special || '',
      options: _utils_constants__WEBPACK_IMPORTED_MODULE_3__.PAGE_SPECIAL_OPTIONS,
      onChange: special => updateValue(v, {
        special
      }, onChange),
      __next40pxDefaultSize: true
    }), !v.special && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.Fragment, {
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_0__.FormTokenField, {
        label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Post types (any match)', 'wbd-conditional-block'),
        value: (v.post_types || []).map(slug => (POST_TYPE_OPTIONS.find(p => p.value === slug) || {
          label: slug
        }).label),
        suggestions: POST_TYPE_OPTIONS.map(p => p.label),
        onChange: labels => {
          const slugs = labels.map(label => {
            const found = POST_TYPE_OPTIONS.find(p => p.label === label);
            return found ? found.value : null;
          }).filter(Boolean);
          updateValue(v, {
            post_types: slugs
          }, onChange);
        },
        __next40pxDefaultSize: true
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_post_picker__WEBPACK_IMPORTED_MODULE_2__["default"], {
        postType: v.post_types && v.post_types[0] || 'page',
        value: v.post_ids || [],
        onChange: postIds => updateValue(v, {
          post_ids: postIds
        }, onChange)
      })]
    })]
  });
}
function ReferrerValue({
  value,
  onChange
}) {
  const isCustom = !_utils_constants__WEBPACK_IMPORTED_MODULE_3__.REFERRER_OPTIONS.some(o => o.value === value) || value === 'custom';
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.Fragment, {
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_0__.SelectControl, {
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Referrer', 'wbd-conditional-block'),
      value: isCustom ? 'custom' : value,
      options: _utils_constants__WEBPACK_IMPORTED_MODULE_3__.REFERRER_OPTIONS,
      onChange: onChange,
      __next40pxDefaultSize: true
    }), isCustom && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_0__.TextControl, {
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Referrer URL contains…', 'wbd-conditional-block'),
      value: value === 'custom' ? '' : value,
      onChange: onChange,
      placeholder: "example.com",
      __next40pxDefaultSize: true
    })]
  });
}
function WooCommerceValue({
  value,
  onChange
}) {
  const v = value && typeof value === 'object' ? value : {};
  if (!data.hasWooCommerce) {
    return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("p", {
      className: "wbdcobl-notice",
      children: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('WooCommerce is not active. This condition will always evaluate to false.', 'wbd-conditional-block')
    });
  }
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.Fragment, {
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_0__.SelectControl, {
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Check', 'wbd-conditional-block'),
      value: v.check || 'cart_has_items',
      options: _utils_constants__WEBPACK_IMPORTED_MODULE_3__.WOOCOMMERCE_CHECKS,
      onChange: check => updateValue(v, {
        check
      }, onChange),
      __next40pxDefaultSize: true
    }), v.check === 'cart_value_min' && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_0__.TextControl, {
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Minimum cart subtotal', 'wbd-conditional-block'),
      type: "number",
      value: v.amount || 0,
      onChange: amount => updateValue(v, {
        amount: parseFloat(amount) || 0
      }, onChange),
      __next40pxDefaultSize: true
    }), v.check === 'purchased_product' && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_0__.TextControl, {
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Product ID', 'wbd-conditional-block'),
      type: "number",
      value: v.product_id || '',
      onChange: productId => updateValue(v, {
        product_id: parseInt(productId, 10) || ''
      }, onChange),
      __next40pxDefaultSize: true
    }), v.check === 'total_spent_min' && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_0__.TextControl, {
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Minimum lifetime spend', 'wbd-conditional-block'),
      type: "number",
      value: v.amount || 0,
      onChange: amount => updateValue(v, {
        amount: parseFloat(amount) || 0
      }, onChange),
      __next40pxDefaultSize: true
    }), v.check === 'customer_vs_guest' && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_0__.CheckboxControl, {
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Must be a logged-in customer (unchecked = must be a guest)', 'wbd-conditional-block'),
      checked: !!v.is_customer,
      onChange: isCustomer => updateValue(v, {
        is_customer: isCustomer
      }, onChange)
    })]
  });
}
function CustomFieldValue({
  value,
  onChange
}) {
  const v = value && typeof value === 'object' ? value : {};
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.Fragment, {
    children: [!data.hasACF && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("p", {
      className: "wbdcobl-notice",
      children: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('ACF not detected — falling back to plain post meta lookup by key.', 'wbd-conditional-block')
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_0__.TextControl, {
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Field key', 'wbd-conditional-block'),
      value: v.key || '',
      onChange: key => updateValue(v, {
        key
      }, onChange),
      placeholder: "price",
      __next40pxDefaultSize: true
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_0__.SelectControl, {
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Compare', 'wbd-conditional-block'),
      value: v.compare || '=',
      options: _utils_constants__WEBPACK_IMPORTED_MODULE_3__.CUSTOM_FIELD_COMPARES,
      onChange: compare => updateValue(v, {
        compare
      }, onChange),
      __next40pxDefaultSize: true
    }), v.compare !== 'exists' && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_0__.TextControl, {
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Expected value', 'wbd-conditional-block'),
      value: v.value || '',
      onChange: fieldValue => updateValue(v, {
        value: fieldValue
      }, onChange),
      __next40pxDefaultSize: true
    })]
  });
}

/***/ },

/***/ "./src/components/conditional-panel.js"
/*!*********************************************!*\
  !*** ./src/components/conditional-panel.js ***!
  \*********************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ ConditionalPanel)
/* harmony export */ });
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_icons__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/icons */ "./node_modules/@wordpress/icons/build-module/library/plus.mjs");
/* harmony import */ var _condition_row__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./condition-row */ "./src/components/condition-row.js");
/* harmony import */ var _utils_templates__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../utils/templates */ "./src/utils/templates.js");
/* harmony import */ var _utils_constants__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../utils/constants */ "./src/utils/constants.js");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__);
/**
 * The "Conditional Visibility" Inspector Controls panel, injected into
 * every block's settings sidebar.
 */







const data = typeof window !== 'undefined' && window.WBD_Conditional_BlockData ? window.WBD_Conditional_BlockData : {};

/**
 * @param {Object}   props
 * @param {Object}   props.value    Current cbConditions attribute value.
 * @param {Function} props.onChange Called with the updated cbConditions object.
 */
function ConditionalPanel({
  value,
  onChange
}) {
  const conditions = value || {};
  const enabled = !!conditions.enabled;
  const rules = Array.isArray(conditions.conditions) ? conditions.conditions : [];
  function update(patch) {
    onChange({
      ...conditions,
      ...patch
    });
  }
  function toggleEnabled(isEnabled) {
    const patch = {
      enabled: isEnabled
    };
    if (isEnabled && !conditions.uid) {
      patch.uid = (0,_utils_constants__WEBPACK_IMPORTED_MODULE_5__.generateUid)();
    }
    if (isEnabled && rules.length === 0) {
      patch.conditions = [(0,_utils_constants__WEBPACK_IMPORTED_MODULE_5__.createEmptyCondition)()];
      patch.logic = conditions.logic || 'all';
    }
    update(patch);
  }
  function applyTemplate(templateKey) {
    const template = _utils_templates__WEBPACK_IMPORTED_MODULE_4__["default"].find(t => t.key === templateKey);
    if (!template) {
      return;
    }
    update({
      enabled: true,
      uid: conditions.uid || (0,_utils_constants__WEBPACK_IMPORTED_MODULE_5__.generateUid)(),
      logic: template.rules.logic,
      conditions: template.rules.conditions.map(c => ({
        ...c
      }))
    });
  }
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)(_wordpress_components__WEBPACK_IMPORTED_MODULE_0__.PanelBody, {
    title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Conditional Visibility', 'wbd-conditional-block'),
    initialOpen: enabled,
    className: "wbdcobl-panel",
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_0__.ToggleControl, {
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Show/hide this block based on conditions', 'wbd-conditional-block'),
      checked: enabled,
      onChange: toggleEnabled,
      __nextHasNoMarginBottom: true
    }), enabled && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.Fragment, {
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_0__.SelectControl, {
        label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Quick template', 'wbd-conditional-block'),
        value: "",
        options: [{
          value: '',
          label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('— Apply a template —', 'wbd-conditional-block')
        }, ..._utils_templates__WEBPACK_IMPORTED_MODULE_4__["default"].map(t => ({
          value: t.key,
          label: t.label
        }))],
        onChange: applyTemplate,
        __next40pxDefaultSize: true
      }), rules.length > 1 && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_0__.SelectControl, {
        label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Logic', 'wbd-conditional-block'),
        value: conditions.logic || 'all',
        options: [{
          value: 'all',
          label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Match ALL conditions (AND)', 'wbd-conditional-block')
        }, {
          value: 'any',
          label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Match ANY condition (OR)', 'wbd-conditional-block')
        }],
        onChange: logic => update({
          logic
        }),
        __next40pxDefaultSize: true
      }), rules.map((condition, index) => /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_condition_row__WEBPACK_IMPORTED_MODULE_3__["default"], {
        condition: condition,
        onChange: newCondition => {
          const next = rules.slice();
          next[index] = newCondition;
          update({
            conditions: next
          });
        },
        onRemove: () => {
          const next = rules.slice();
          next.splice(index, 1);
          update({
            conditions: next
          });
        }
      }, index)), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_0__.Button, {
        variant: "secondary",
        icon: _wordpress_icons__WEBPACK_IMPORTED_MODULE_2__["default"],
        onClick: () => update({
          conditions: [...rules, (0,_utils_constants__WEBPACK_IMPORTED_MODULE_5__.createEmptyCondition)()]
        }),
        className: "wbdcobl-add-condition",
        children: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Add condition', 'wbd-conditional-block')
      }), rules.length === 0 && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_0__.Notice, {
        status: "warning",
        isDismissible: false,
        children: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('No conditions set — this block will always be visible.', 'wbd-conditional-block')
      }), data.adminUrl && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("p", {
        className: "wbdcobl-analytics-link",
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("a", {
          href: data.adminUrl,
          target: "_blank",
          rel: "noreferrer",
          children: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('View analytics for conditional blocks →', 'wbd-conditional-block')
        })
      })]
    })]
  });
}

/***/ },

/***/ "./src/components/post-picker.js"
/*!***************************************!*\
  !*** ./src/components/post-picker.js ***!
  \***************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ PostPicker)
/* harmony export */ });
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/api-fetch */ "@wordpress/api-fetch");
/* harmony import */ var _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__);
/**
 * Async post/page picker backed by the plugin's REST search endpoint.
 */





/**
 * @param {Object}   props
 * @param {string}   props.postType Post type to search within.
 * @param {number[]} props.value    Currently selected post IDs.
 * @param {Function} props.onChange Called with the new array of post IDs.
 */

function PostPicker({
  postType,
  value,
  onChange
}) {
  const [suggestions, setSuggestions] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useState)([]);
  const [knownLabels, setKnownLabels] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useState)({});
  const requestRef = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useRef)(0);
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
    // Resolve existing IDs to labels once, so tokens don't show as raw numbers.
    if (!value || !value.length) {
      return;
    }
    const missing = value.filter(id => !knownLabels[id]);
    if (!missing.length) {
      return;
    }
    search('');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [postType]);
  function search(text) {
    const reqId = ++requestRef.current;
    _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_2___default()({
      path: `/wbd-conditional-block/v1/search-posts?post_type=${encodeURIComponent(postType)}&search=${encodeURIComponent(text)}`
    }).then(results => {
      if (requestRef.current !== reqId) {
        return; // Stale response.
      }
      const labels = {};
      results.forEach(r => {
        labels[r.id] = r.title;
      });
      setKnownLabels(prev => ({
        ...prev,
        ...labels
      }));
      setSuggestions(results.map(r => `${r.title} (#${r.id})`));
    }).catch(() => {
      setSuggestions([]);
    });
  }
  const tokens = (value || []).map(id => knownLabels[id] ? `${knownLabels[id]} (#${id})` : `#${id}`);
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_0__.FormTokenField, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Specific posts/pages', 'wbd-conditional-block'),
    value: tokens,
    suggestions: suggestions,
    onInputChange: search,
    onChange: newTokens => {
      const ids = newTokens.map(token => {
        const match = /#(\d+)\)?$/.exec(token);
        if (match) {
          return parseInt(match[1], 10);
        }
        const foundId = Object.keys(knownLabels).find(id => `${knownLabels[id]} (#${id})` === token);
        return foundId ? parseInt(foundId, 10) : null;
      }).filter(id => Number.isInteger(id));
      onChange(ids);
    },
    __experimentalExpandOnFocus: true,
    __next40pxDefaultSize: true
  });
}

/***/ },

/***/ "./src/utils/constants.js"
/*!********************************!*\
  !*** ./src/utils/constants.js ***!
  \********************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   BROWSER_OPTIONS: () => (/* binding */ BROWSER_OPTIONS),
/* harmony export */   CONDITION_TYPES: () => (/* binding */ CONDITION_TYPES),
/* harmony export */   CUSTOM_FIELD_COMPARES: () => (/* binding */ CUSTOM_FIELD_COMPARES),
/* harmony export */   DEVICE_OPTIONS: () => (/* binding */ DEVICE_OPTIONS),
/* harmony export */   OS_OPTIONS: () => (/* binding */ OS_OPTIONS),
/* harmony export */   PAGE_SPECIAL_OPTIONS: () => (/* binding */ PAGE_SPECIAL_OPTIONS),
/* harmony export */   REFERRER_OPTIONS: () => (/* binding */ REFERRER_OPTIONS),
/* harmony export */   WEEKDAYS: () => (/* binding */ WEEKDAYS),
/* harmony export */   WOOCOMMERCE_CHECKS: () => (/* binding */ WOOCOMMERCE_CHECKS),
/* harmony export */   createEmptyCondition: () => (/* binding */ createEmptyCondition),
/* harmony export */   generateUid: () => (/* binding */ generateUid)
/* harmony export */ });
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__);
/**
 * Shared constants for the Conditional Visibility editor UI.
 */


/**
 * Condition type option list. Keep the `value`s in sync with the PHP
 * switch statement in includes/class-wbdcobl-conditions.php.
 */
const CONDITION_TYPES = [{
  value: 'login_status',
  label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Login Status', 'wbd-conditional-block')
}, {
  value: 'user_role',
  label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('User Role', 'wbd-conditional-block')
}, {
  value: 'device_type',
  label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Device Type', 'wbd-conditional-block')
}, {
  value: 'date_time',
  label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Date / Time', 'wbd-conditional-block')
}, {
  value: 'page_type',
  label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Page / Post Type', 'wbd-conditional-block')
}, {
  value: 'geolocation',
  label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Geolocation (Country)', 'wbd-conditional-block')
}, {
  value: 'browser',
  label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Browser', 'wbd-conditional-block')
}, {
  value: 'os',
  label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Operating System', 'wbd-conditional-block')
}, {
  value: 'referrer',
  label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Referrer URL', 'wbd-conditional-block')
}, {
  value: 'query_string',
  label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Query String', 'wbd-conditional-block')
}, {
  value: 'cookie',
  label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Cookie Value', 'wbd-conditional-block')
}, {
  value: 'woocommerce',
  label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('WooCommerce', 'wbd-conditional-block')
}, {
  value: 'custom_field',
  label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Custom Field (Meta/ACF)', 'wbd-conditional-block')
}, {
  value: 'language',
  label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Language', 'wbd-conditional-block')
}, {
  value: 'ab_test',
  label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('A/B Test Variant', 'wbd-conditional-block')
}];
const DEVICE_OPTIONS = [{
  value: 'mobile',
  label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Mobile', 'wbd-conditional-block')
}, {
  value: 'tablet',
  label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Tablet', 'wbd-conditional-block')
}, {
  value: 'desktop',
  label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Desktop', 'wbd-conditional-block')
}];
const BROWSER_OPTIONS = [{
  value: 'chrome',
  label: 'Chrome'
}, {
  value: 'firefox',
  label: 'Firefox'
}, {
  value: 'safari',
  label: 'Safari'
}, {
  value: 'edge',
  label: 'Edge'
}, {
  value: 'opera',
  label: 'Opera'
}, {
  value: 'other',
  label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Other', 'wbd-conditional-block')
}];
const OS_OPTIONS = [{
  value: 'windows',
  label: 'Windows'
}, {
  value: 'macos',
  label: 'macOS'
}, {
  value: 'linux',
  label: 'Linux'
}, {
  value: 'ios',
  label: 'iOS'
}, {
  value: 'android',
  label: 'Android'
}, {
  value: 'other',
  label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Other', 'wbd-conditional-block')
}];
const REFERRER_OPTIONS = [{
  value: 'any',
  label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Any referrer', 'wbd-conditional-block')
}, {
  value: 'direct',
  label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Direct (no referrer)', 'wbd-conditional-block')
}, {
  value: 'google',
  label: 'Google'
}, {
  value: 'facebook',
  label: 'Facebook'
}, {
  value: 'bing',
  label: 'Bing'
}, {
  value: 'twitter',
  label: 'Twitter / X'
}, {
  value: 'linkedin',
  label: 'LinkedIn'
}, {
  value: 'youtube',
  label: 'YouTube'
}, {
  value: 'custom',
  label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Custom (contains…)', 'wbd-conditional-block')
}];
const PAGE_SPECIAL_OPTIONS = [{
  value: '',
  label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Specific post types / posts', 'wbd-conditional-block')
}, {
  value: 'front_page',
  label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Front page', 'wbd-conditional-block')
}, {
  value: 'blog_home',
  label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Blog index', 'wbd-conditional-block')
}, {
  value: 'single',
  label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Any single post', 'wbd-conditional-block')
}, {
  value: 'archive',
  label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Any archive', 'wbd-conditional-block')
}, {
  value: 'search',
  label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Search results', 'wbd-conditional-block')
}, {
  value: '404',
  label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('404 (not found)', 'wbd-conditional-block')
}];
const WOOCOMMERCE_CHECKS = [{
  value: 'cart_has_items',
  label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Cart has items', 'wbd-conditional-block')
}, {
  value: 'cart_value_min',
  label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Cart subtotal is at least…', 'wbd-conditional-block')
}, {
  value: 'purchased_product',
  label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Customer purchased product ID…', 'wbd-conditional-block')
}, {
  value: 'total_spent_min',
  label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Customer lifetime spend is at least…', 'wbd-conditional-block')
}, {
  value: 'customer_vs_guest',
  label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Is a logged-in customer (vs. guest)', 'wbd-conditional-block')
}];
const CUSTOM_FIELD_COMPARES = [{
  value: '=',
  label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Equals', 'wbd-conditional-block')
}, {
  value: '!=',
  label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Does not equal', 'wbd-conditional-block')
}, {
  value: '>',
  label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Greater than', 'wbd-conditional-block')
}, {
  value: '<',
  label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Less than', 'wbd-conditional-block')
}, {
  value: '>=',
  label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Greater than or equal to', 'wbd-conditional-block')
}, {
  value: '<=',
  label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Less than or equal to', 'wbd-conditional-block')
}, {
  value: 'contains',
  label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Contains', 'wbd-conditional-block')
}, {
  value: 'exists',
  label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Has any value', 'wbd-conditional-block')
}];
const WEEKDAYS = [{
  value: 0,
  label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Sun', 'wbd-conditional-block')
}, {
  value: 1,
  label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Mon', 'wbd-conditional-block')
}, {
  value: 2,
  label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Tue', 'wbd-conditional-block')
}, {
  value: 3,
  label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Wed', 'wbd-conditional-block')
}, {
  value: 4,
  label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Thu', 'wbd-conditional-block')
}, {
  value: 5,
  label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Fri', 'wbd-conditional-block')
}, {
  value: 6,
  label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Sat', 'wbd-conditional-block')
}];

/**
 * A fresh, empty condition row for the given type.
 *
 * @param {string} type Condition type key.
 * @return {Object} condition
 */
function createEmptyCondition(type = 'login_status') {
  const defaults = {
    login_status: 'logged_in',
    user_role: ['administrator'],
    device_type: 'mobile',
    date_time: {
      mode: 'range',
      start: '',
      end: ''
    },
    page_type: {
      special: 'front_page',
      post_types: [],
      post_ids: []
    },
    geolocation: ['US'],
    browser: 'chrome',
    os: 'windows',
    referrer: 'any',
    query_string: {
      key: '',
      value: ''
    },
    cookie: {
      name: '',
      value: ''
    },
    woocommerce: {
      check: 'cart_has_items'
    },
    custom_field: {
      key: '',
      compare: '=',
      value: ''
    },
    language: 'en',
    ab_test: 'a'
  };
  return {
    type,
    operator: 'is',
    value: defaults[type] !== undefined ? defaults[type] : ''
  };
}

/**
 * Generate a short, url-safe unique id for a block instance so analytics
 * can track it across renders/edits.
 *
 * @return {string} id
 */
function generateUid() {
  return 'cb' + Math.random().toString(36).slice(2, 10) + Date.now().toString(36).slice(-4);
}

/***/ },

/***/ "./src/utils/templates.js"
/*!********************************!*\
  !*** ./src/utils/templates.js ***!
  \********************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__);
/**
 * Pre-built condition templates — one click fills in a common scenario.
 */

const templates = [{
  key: 'logged_in_only',
  label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Show only to logged-in users', 'wbd-conditional-block'),
  rules: {
    logic: 'all',
    conditions: [{
      type: 'login_status',
      operator: 'is',
      value: 'logged_in'
    }]
  }
}, {
  key: 'logged_out_only',
  label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Show only to logged-out visitors', 'wbd-conditional-block'),
  rules: {
    logic: 'all',
    conditions: [{
      type: 'login_status',
      operator: 'is',
      value: 'logged_out'
    }]
  }
}, {
  key: 'hide_on_mobile',
  label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Hide on mobile devices', 'wbd-conditional-block'),
  rules: {
    logic: 'all',
    conditions: [{
      type: 'device_type',
      operator: 'is_not',
      value: 'mobile'
    }]
  }
}, {
  key: 'mobile_only_cta',
  label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Mobile-only call to action', 'wbd-conditional-block'),
  rules: {
    logic: 'all',
    conditions: [{
      type: 'device_type',
      operator: 'is',
      value: 'mobile'
    }]
  }
}, {
  key: 'admins_only',
  label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Show only to administrators', 'wbd-conditional-block'),
  rules: {
    logic: 'all',
    conditions: [{
      type: 'user_role',
      operator: 'is',
      value: ['administrator']
    }]
  }
}, {
  key: 'members_offer',
  label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Exclusive offer for logged-in members', 'wbd-conditional-block'),
  rules: {
    logic: 'all',
    conditions: [{
      type: 'login_status',
      operator: 'is',
      value: 'logged_in'
    }, {
      type: 'user_role',
      operator: 'is',
      value: ['subscriber', 'customer']
    }]
  }
}, {
  key: 'ab_test_split',
  label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('A/B test this block (Variant A)', 'wbd-conditional-block'),
  rules: {
    logic: 'all',
    conditions: [{
      type: 'ab_test',
      operator: 'is',
      value: 'a'
    }]
  }
}];
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (templates);

/***/ },

/***/ "./src/editor.scss"
/*!*************************!*\
  !*** ./src/editor.scss ***!
  \*************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ },

/***/ "react/jsx-runtime"
/*!**********************************!*\
  !*** external "ReactJSXRuntime" ***!
  \**********************************/
(module) {

module.exports = window["ReactJSXRuntime"];

/***/ },

/***/ "@wordpress/api-fetch"
/*!**********************************!*\
  !*** external ["wp","apiFetch"] ***!
  \**********************************/
(module) {

module.exports = window["wp"]["apiFetch"];

/***/ },

/***/ "@wordpress/block-editor"
/*!*************************************!*\
  !*** external ["wp","blockEditor"] ***!
  \*************************************/
(module) {

module.exports = window["wp"]["blockEditor"];

/***/ },

/***/ "@wordpress/blocks"
/*!********************************!*\
  !*** external ["wp","blocks"] ***!
  \********************************/
(module) {

module.exports = window["wp"]["blocks"];

/***/ },

/***/ "@wordpress/components"
/*!************************************!*\
  !*** external ["wp","components"] ***!
  \************************************/
(module) {

module.exports = window["wp"]["components"];

/***/ },

/***/ "@wordpress/compose"
/*!*********************************!*\
  !*** external ["wp","compose"] ***!
  \*********************************/
(module) {

module.exports = window["wp"]["compose"];

/***/ },

/***/ "@wordpress/element"
/*!*********************************!*\
  !*** external ["wp","element"] ***!
  \*********************************/
(module) {

module.exports = window["wp"]["element"];

/***/ },

/***/ "@wordpress/hooks"
/*!*******************************!*\
  !*** external ["wp","hooks"] ***!
  \*******************************/
(module) {

module.exports = window["wp"]["hooks"];

/***/ },

/***/ "@wordpress/i18n"
/*!******************************!*\
  !*** external ["wp","i18n"] ***!
  \******************************/
(module) {

module.exports = window["wp"]["i18n"];

/***/ },

/***/ "@wordpress/primitives"
/*!************************************!*\
  !*** external ["wp","primitives"] ***!
  \************************************/
(module) {

module.exports = window["wp"]["primitives"];

/***/ },

/***/ "./node_modules/@wordpress/icons/build-module/library/close-small.mjs"
/*!****************************************************************************!*\
  !*** ./node_modules/@wordpress/icons/build-module/library/close-small.mjs ***!
  \****************************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ close_small_default)
/* harmony export */ });
/* harmony import */ var _wordpress_primitives__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/primitives */ "@wordpress/primitives");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
// packages/icons/src/library/close-small.tsx


var close_small_default = /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_wordpress_primitives__WEBPACK_IMPORTED_MODULE_0__.SVG, { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 24 24", fill: "currentColor", children: /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_wordpress_primitives__WEBPACK_IMPORTED_MODULE_0__.Path, { d: "M12 13.06l3.712 3.713 1.061-1.06L13.061 12l3.712-3.712-1.06-1.06L12 10.938 8.288 7.227l-1.061 1.06L10.939 12l-3.712 3.712 1.06 1.061L12 13.061z" }) });

//# sourceMappingURL=close-small.mjs.map


/***/ },

/***/ "./node_modules/@wordpress/icons/build-module/library/plus.mjs"
/*!*********************************************************************!*\
  !*** ./node_modules/@wordpress/icons/build-module/library/plus.mjs ***!
  \*********************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ plus_default)
/* harmony export */ });
/* harmony import */ var _wordpress_primitives__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/primitives */ "@wordpress/primitives");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
// packages/icons/src/library/plus.tsx


var plus_default = /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_wordpress_primitives__WEBPACK_IMPORTED_MODULE_0__.SVG, { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 24 24", fill: "currentColor", children: /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_wordpress_primitives__WEBPACK_IMPORTED_MODULE_0__.Path, { d: "M11 12.5V17.5H12.5V12.5H17.5V11H12.5V6H11V11H6V12.5H11Z" }) });

//# sourceMappingURL=plus.mjs.map


/***/ },

/***/ "./node_modules/@wordpress/icons/build-module/library/seen.mjs"
/*!*********************************************************************!*\
  !*** ./node_modules/@wordpress/icons/build-module/library/seen.mjs ***!
  \*********************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ seen_default)
/* harmony export */ });
/* harmony import */ var _wordpress_primitives__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/primitives */ "@wordpress/primitives");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
// packages/icons/src/library/seen.tsx


var seen_default = /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_wordpress_primitives__WEBPACK_IMPORTED_MODULE_0__.SVG, { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 24 24", fill: "currentColor", children: /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_wordpress_primitives__WEBPACK_IMPORTED_MODULE_0__.Path, { d: "M3.99961 13C4.67043 13.3354 4.6703 13.3357 4.67017 13.3359L4.67298 13.3305C4.67621 13.3242 4.68184 13.3135 4.68988 13.2985C4.70595 13.2686 4.7316 13.2218 4.76695 13.1608C4.8377 13.0385 4.94692 12.8592 5.09541 12.6419C5.39312 12.2062 5.84436 11.624 6.45435 11.0431C7.67308 9.88241 9.49719 8.75 11.9996 8.75C14.502 8.75 16.3261 9.88241 17.5449 11.0431C18.1549 11.624 18.6061 12.2062 18.9038 12.6419C19.0523 12.8592 19.1615 13.0385 19.2323 13.1608C19.2676 13.2218 19.2933 13.2686 19.3093 13.2985C19.3174 13.3135 19.323 13.3242 19.3262 13.3305L19.3291 13.3359C19.3289 13.3357 19.3288 13.3354 19.9996 13C20.6704 12.6646 20.6703 12.6643 20.6701 12.664L20.6697 12.6632L20.6688 12.6614L20.6662 12.6563L20.6583 12.6408C20.6517 12.6282 20.6427 12.6108 20.631 12.5892C20.6078 12.5459 20.5744 12.4852 20.5306 12.4096C20.4432 12.2584 20.3141 12.0471 20.1423 11.7956C19.7994 11.2938 19.2819 10.626 18.5794 9.9569C17.1731 8.61759 14.9972 7.25 11.9996 7.25C9.00203 7.25 6.82614 8.61759 5.41987 9.9569C4.71736 10.626 4.19984 11.2938 3.85694 11.7956C3.68511 12.0471 3.55605 12.2584 3.4686 12.4096C3.42484 12.4852 3.39142 12.5459 3.36818 12.5892C3.35656 12.6108 3.34748 12.6282 3.34092 12.6408L3.33297 12.6563L3.33041 12.6614L3.32948 12.6632L3.32911 12.664C3.32894 12.6643 3.32879 12.6646 3.99961 13ZM11.9996 16C13.9326 16 15.4996 14.433 15.4996 12.5C15.4996 10.567 13.9326 9 11.9996 9C10.0666 9 8.49961 10.567 8.49961 12.5C8.49961 14.433 10.0666 16 11.9996 16Z" }) });

//# sourceMappingURL=seen.mjs.map


/***/ },

/***/ "./blocks/conditional-group/block.json"
/*!*********************************************!*\
  !*** ./blocks/conditional-group/block.json ***!
  \*********************************************/
(module) {

module.exports = /*#__PURE__*/JSON.parse('{"$schema":"https://schemas.wp.org/trunk/block.json","apiVersion":3,"name":"wbd-conditional-block/group","title":"Conditional Group","category":"layout","icon":"seen","description":"Group any blocks together and show or hide the whole group based on conditions — handy for wrapping several blocks, or blocks that don\'t have their own Conditional Visibility panel.","keywords":["conditional","visibility","show","hide","condition"],"textdomain":"wbd-conditional-block","supports":{"html":false,"align":["wide","full"],"anchor":true,"spacing":{"margin":true,"padding":true}},"attributes":{"cbConditions":{"type":"object","default":{"enabled":false,"logic":"all","conditions":[],"uid":""}},"tagName":{"type":"string","default":"div"}}}');

/***/ }

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	const __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		const cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		const module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		if (!(moduleId in __webpack_modules__)) {
/******/ 			delete __webpack_module_cache__[moduleId];
/******/ 			const e = new Error("Cannot find module '" + moduleId + "'");
/******/ 			e.code = 'MODULE_NOT_FOUND';
/******/ 			throw e;
/******/ 		}
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = (module) => {
/******/ 		const getter = module && module.__esModule ?
/******/ 			() => (module['default']) :
/******/ 			() => (module);
/******/ 		__webpack_require__.d(getter, { a: getter });
/******/ 		return getter;
/******/ 	};
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	// define getter/value functions for harmony exports
/******/ 	__webpack_require__.d = (exports, definition) => {
/******/ 		for(var key in definition) {
/******/ 			if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 				Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 			}
/******/ 		}
/******/ 	};
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	__webpack_require__.o = (obj, prop) => (Object.hasOwn(obj, prop));
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = (exports) => {
/******/ 		Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/ 	
/************************************************************************/
let __webpack_exports__ = {};
// This entry needs to be wrapped in an IIFE because it needs to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_hooks__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/hooks */ "@wordpress/hooks");
/* harmony import */ var _wordpress_hooks__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_hooks__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_compose__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/compose */ "@wordpress/compose");
/* harmony import */ var _wordpress_compose__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_compose__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/block-editor */ "@wordpress/block-editor");
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @wordpress/blocks */ "@wordpress/blocks");
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_wordpress_blocks__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _wordpress_icons__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @wordpress/icons */ "./node_modules/@wordpress/icons/build-module/library/seen.mjs");
/* harmony import */ var _components_conditional_panel__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./components/conditional-panel */ "./src/components/conditional-panel.js");
/* harmony import */ var _blocks_conditional_group_block_json__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../blocks/conditional-group/block.json */ "./blocks/conditional-group/block.json");
/* harmony import */ var _blocks_conditional_group_edit__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./blocks/conditional-group/edit */ "./src/blocks/conditional-group/edit.js");
/* harmony import */ var _blocks_conditional_group_save__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./blocks/conditional-group/save */ "./src/blocks/conditional-group/save.js");
/* harmony import */ var _editor_scss__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./editor.scss */ "./src/editor.scss");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__);
/**
 * WBD_Conditional_Block block editor integration.
 *
 * Adds a "Conditional Visibility" panel to the Inspector Controls of
 * EVERY block (not just a custom one) via the `editor.BlockEdit` filter,
 * and registers the dedicated "Conditional Group" container block for
 * wrapping multiple blocks under one rule set.
 */












const EXCLUDED_BLOCKS = ['core/freeform', 'core/legacy-widget', 'core/widget-area'];
const WBDCOBL_CONDITIONS_DEFAULT = {
  enabled: false,
  logic: 'all',
  conditions: [],
  uid: '',
  fallback: 'hide'
};

/**
 * Add the `cbConditions` attribute to every block's CLIENT-SIDE schema.
 *
 * This mirrors add_condition_attribute() in wbd-conditional-block.php: that
 * PHP filter registers the attribute on the *server* block type registry
 * (used by the REST API and PHP-side validation), but the block editor's
 * own registry is populated independently by each block's JS
 * registerBlockType() call. Without also declaring the attribute here,
 * WordPress's block serializer would silently drop `cbConditions` when
 * saving (getCommentAttributes() only persists attributes declared in
 * the block's registered schema), so both filters are required.
 *
 * @param {Object} settings Block settings.
 * @param {string} name     Block name.
 * @return {Object} Modified block settings.
 */
function addConditionsAttribute(settings, name) {
  if (EXCLUDED_BLOCKS.includes(name)) {
    return settings;
  }
  if (!settings.attributes) {
    return settings;
  }
  if (settings.attributes.cbConditions) {
    return settings;
  }
  settings.attributes = {
    ...settings.attributes,
    cbConditions: {
      type: 'object',
      default: WBDCOBL_CONDITIONS_DEFAULT
    }
  };
  return settings;
}
;(0,_wordpress_hooks__WEBPACK_IMPORTED_MODULE_0__.addFilter)('blocks.registerBlockType', 'wbd-conditional-block/add-attribute', addConditionsAttribute);

/**
 * HOC: inject the Conditional Visibility panel into every block's
 * Inspector Controls.
 */
const withConditionalControls = (0,_wordpress_compose__WEBPACK_IMPORTED_MODULE_1__.createHigherOrderComponent)(BlockEdit => {
  return props => {
    const {
      name,
      attributes,
      setAttributes,
      isSelected
    } = props;
    if (EXCLUDED_BLOCKS.includes(name)) {
      return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsx)(BlockEdit, {
        ...props
      });
    }
    const blockType = (0,_wordpress_blocks__WEBPACK_IMPORTED_MODULE_4__.getBlockType)(name);
    const supportsConditions = blockType && blockType.attributes && blockType.attributes.cbConditions;
    if (!supportsConditions) {
      return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsx)(BlockEdit, {
        ...props
      });
    }
    return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsxs)(_wordpress_element__WEBPACK_IMPORTED_MODULE_3__.Fragment, {
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsx)(BlockEdit, {
        ...props
      }), isSelected && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsx)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__.InspectorControls, {
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsx)(_components_conditional_panel__WEBPACK_IMPORTED_MODULE_6__["default"], {
          value: attributes.cbConditions,
          onChange: cbConditions => setAttributes({
            cbConditions
          })
        })
      })]
    });
  };
}, 'withConditionalControls');
(0,_wordpress_hooks__WEBPACK_IMPORTED_MODULE_0__.addFilter)('editor.BlockEdit', 'wbd-conditional-block/with-inspector-controls', withConditionalControls);

/**
 * HOC: add a visual "has conditions" indicator to the block in the
 * editor canvas, and an eye-off badge, so authors can spot at a glance
 * which blocks carry visibility rules while editing.
 */
const withConditionalIndicator = (0,_wordpress_compose__WEBPACK_IMPORTED_MODULE_1__.createHigherOrderComponent)(BlockListBlock => {
  return props => {
    const conditions = props.attributes && props.attributes.cbConditions;
    if (!conditions || !conditions.enabled) {
      return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsx)(BlockListBlock, {
        ...props
      });
    }
    return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsx)(BlockListBlock, {
      ...props,
      className: (props.className ? props.className + ' ' : '') + 'wbdcobl-has-conditions',
      children: props.children
    });
  };
}, 'withConditionalIndicator');
(0,_wordpress_hooks__WEBPACK_IMPORTED_MODULE_0__.addFilter)('editor.BlockListBlock', 'wbd-conditional-block/with-indicator', withConditionalIndicator);

/**
 * Register the "Conditional Group" block.
 */
(0,_wordpress_blocks__WEBPACK_IMPORTED_MODULE_4__.registerBlockType)(_blocks_conditional_group_block_json__WEBPACK_IMPORTED_MODULE_7__.name, {
  ..._blocks_conditional_group_block_json__WEBPACK_IMPORTED_MODULE_7__,
  icon: _wordpress_icons__WEBPACK_IMPORTED_MODULE_5__["default"],
  edit: _blocks_conditional_group_edit__WEBPACK_IMPORTED_MODULE_8__["default"],
  save: _blocks_conditional_group_save__WEBPACK_IMPORTED_MODULE_9__["default"]
});
})();

/******/ })()
;
//# sourceMappingURL=index.js.map