import { d as clsx, R as React2, g as getDefaultExportFromCjs, r as reactExports, j as jsxRuntimeExports, h as useComposedRefs, i as cn, m as motion, b as AnimatePresence, f as ue, a as useHealthStore, H as Heart, e as Skeleton, B as Button } from "./index-pQ9MGfeR.js";
import { B as Badge } from "./badge-gNmD_EnI.js";
import { u as useControllableState, a as useId, P as Primitive, c as composeEventHandlers, b as createContextScope, d as createSlot, e as createContext2 } from "./index-CH17oBHD.js";
import { P as Portal$1, h as hideOthers, R as ReactRemoveScroll, u as useFocusGuards, F as FocusScope, D as DismissableLayer } from "./index-ObNJZL0i.js";
import { P as Presence } from "./index-BzoAmXI9.js";
import { X } from "./x-D2fkv8yI.js";
import { f as useDietFavorites, g as useAddDietFavorite, h as useRemoveDietFavorite } from "./useBackend-CQZwdIO-.js";
import { C as Clock } from "./clock-CPHLWhlK.js";
import { f as filterProps, _ as _baseExtremum, p as _baseGt, q as _baseIteratee, r as _baseLt, g as isFunction, s as Text, t as polarToCartesian, L as Layer, v as getTickClassName, w as adaptEventsOfChild, x as Label, D as Dot, C as Curve, b as isNil, j as getValueByDataKey, S as Shape, A as Animate, y as get, a as interpolateNumber, d as isEqual, i as isNumber, e as LabelList, u as uniqueId, G as Global, z as mathSign, B as findAllByType, E as Cell, F as getMaxRadius, H as getPercentValue, I as warn, l as generateCategoricalChart, J as formatAxisMap, R as ResponsiveContainer, T as Tooltip } from "./generateCategoricalChart-C3DVtk1M.js";
import { F as Flame } from "./flame-zqz5Z4Qv.js";
var _excluded$1 = ["points", "className", "baseLinePoints", "connectNulls"];
function _extends$3() {
  _extends$3 = Object.assign ? Object.assign.bind() : function(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];
      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }
    return target;
  };
  return _extends$3.apply(this, arguments);
}
function _objectWithoutProperties$1(source, excluded) {
  if (source == null) return {};
  var target = _objectWithoutPropertiesLoose$1(source, excluded);
  var key, i;
  if (Object.getOwnPropertySymbols) {
    var sourceSymbolKeys = Object.getOwnPropertySymbols(source);
    for (i = 0; i < sourceSymbolKeys.length; i++) {
      key = sourceSymbolKeys[i];
      if (excluded.indexOf(key) >= 0) continue;
      if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
      target[key] = source[key];
    }
  }
  return target;
}
function _objectWithoutPropertiesLoose$1(source, excluded) {
  if (source == null) return {};
  var target = {};
  for (var key in source) {
    if (Object.prototype.hasOwnProperty.call(source, key)) {
      if (excluded.indexOf(key) >= 0) continue;
      target[key] = source[key];
    }
  }
  return target;
}
function _toConsumableArray(arr) {
  return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
}
function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}
function _iterableToArray(iter) {
  if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
}
function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) return _arrayLikeToArray(arr);
}
function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;
  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];
  return arr2;
}
var isValidatePoint = function isValidatePoint2(point) {
  return point && point.x === +point.x && point.y === +point.y;
};
var getParsedPoints = function getParsedPoints2() {
  var points = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : [];
  var segmentPoints = [[]];
  points.forEach(function(entry) {
    if (isValidatePoint(entry)) {
      segmentPoints[segmentPoints.length - 1].push(entry);
    } else if (segmentPoints[segmentPoints.length - 1].length > 0) {
      segmentPoints.push([]);
    }
  });
  if (isValidatePoint(points[0])) {
    segmentPoints[segmentPoints.length - 1].push(points[0]);
  }
  if (segmentPoints[segmentPoints.length - 1].length <= 0) {
    segmentPoints = segmentPoints.slice(0, -1);
  }
  return segmentPoints;
};
var getSinglePolygonPath = function getSinglePolygonPath2(points, connectNulls) {
  var segmentPoints = getParsedPoints(points);
  if (connectNulls) {
    segmentPoints = [segmentPoints.reduce(function(res, segPoints) {
      return [].concat(_toConsumableArray(res), _toConsumableArray(segPoints));
    }, [])];
  }
  var polygonPath = segmentPoints.map(function(segPoints) {
    return segPoints.reduce(function(path, point, index) {
      return "".concat(path).concat(index === 0 ? "M" : "L").concat(point.x, ",").concat(point.y);
    }, "");
  }).join("");
  return segmentPoints.length === 1 ? "".concat(polygonPath, "Z") : polygonPath;
};
var getRanglePath = function getRanglePath2(points, baseLinePoints, connectNulls) {
  var outerPath = getSinglePolygonPath(points, connectNulls);
  return "".concat(outerPath.slice(-1) === "Z" ? outerPath.slice(0, -1) : outerPath, "L").concat(getSinglePolygonPath(baseLinePoints.reverse(), connectNulls).slice(1));
};
var Polygon = function Polygon2(props) {
  var points = props.points, className = props.className, baseLinePoints = props.baseLinePoints, connectNulls = props.connectNulls, others = _objectWithoutProperties$1(props, _excluded$1);
  if (!points || !points.length) {
    return null;
  }
  var layerClass = clsx("recharts-polygon", className);
  if (baseLinePoints && baseLinePoints.length) {
    var hasStroke = others.stroke && others.stroke !== "none";
    var rangePath = getRanglePath(points, baseLinePoints, connectNulls);
    return /* @__PURE__ */ React2.createElement("g", {
      className: layerClass
    }, /* @__PURE__ */ React2.createElement("path", _extends$3({}, filterProps(others, true), {
      fill: rangePath.slice(-1) === "Z" ? others.fill : "none",
      stroke: "none",
      d: rangePath
    })), hasStroke ? /* @__PURE__ */ React2.createElement("path", _extends$3({}, filterProps(others, true), {
      fill: "none",
      d: getSinglePolygonPath(points, connectNulls)
    })) : null, hasStroke ? /* @__PURE__ */ React2.createElement("path", _extends$3({}, filterProps(others, true), {
      fill: "none",
      d: getSinglePolygonPath(baseLinePoints, connectNulls)
    })) : null);
  }
  var singlePath = getSinglePolygonPath(points, connectNulls);
  return /* @__PURE__ */ React2.createElement("path", _extends$3({}, filterProps(others, true), {
    fill: singlePath.slice(-1) === "Z" ? others.fill : "none",
    className: layerClass,
    d: singlePath
  }));
};
var baseExtremum$1 = _baseExtremum, baseGt = _baseGt, baseIteratee$1 = _baseIteratee;
function maxBy(array, iteratee) {
  return array && array.length ? baseExtremum$1(array, baseIteratee$1(iteratee), baseGt) : void 0;
}
var maxBy_1 = maxBy;
const maxBy$1 = /* @__PURE__ */ getDefaultExportFromCjs(maxBy_1);
var baseExtremum = _baseExtremum, baseIteratee = _baseIteratee, baseLt = _baseLt;
function minBy(array, iteratee) {
  return array && array.length ? baseExtremum(array, baseIteratee(iteratee), baseLt) : void 0;
}
var minBy_1 = minBy;
const minBy$1 = /* @__PURE__ */ getDefaultExportFromCjs(minBy_1);
var _excluded = ["cx", "cy", "angle", "ticks", "axisLine"], _excluded2 = ["ticks", "tick", "angle", "tickFormatter", "stroke"];
function _typeof$2(o) {
  "@babel/helpers - typeof";
  return _typeof$2 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o2) {
    return typeof o2;
  } : function(o2) {
    return o2 && "function" == typeof Symbol && o2.constructor === Symbol && o2 !== Symbol.prototype ? "symbol" : typeof o2;
  }, _typeof$2(o);
}
function _extends$2() {
  _extends$2 = Object.assign ? Object.assign.bind() : function(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];
      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }
    return target;
  };
  return _extends$2.apply(this, arguments);
}
function ownKeys$2(e, r) {
  var t = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(e);
    r && (o = o.filter(function(r2) {
      return Object.getOwnPropertyDescriptor(e, r2).enumerable;
    })), t.push.apply(t, o);
  }
  return t;
}
function _objectSpread$2(e) {
  for (var r = 1; r < arguments.length; r++) {
    var t = null != arguments[r] ? arguments[r] : {};
    r % 2 ? ownKeys$2(Object(t), true).forEach(function(r2) {
      _defineProperty$2(e, r2, t[r2]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$2(Object(t)).forEach(function(r2) {
      Object.defineProperty(e, r2, Object.getOwnPropertyDescriptor(t, r2));
    });
  }
  return e;
}
function _objectWithoutProperties(source, excluded) {
  if (source == null) return {};
  var target = _objectWithoutPropertiesLoose(source, excluded);
  var key, i;
  if (Object.getOwnPropertySymbols) {
    var sourceSymbolKeys = Object.getOwnPropertySymbols(source);
    for (i = 0; i < sourceSymbolKeys.length; i++) {
      key = sourceSymbolKeys[i];
      if (excluded.indexOf(key) >= 0) continue;
      if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
      target[key] = source[key];
    }
  }
  return target;
}
function _objectWithoutPropertiesLoose(source, excluded) {
  if (source == null) return {};
  var target = {};
  for (var key in source) {
    if (Object.prototype.hasOwnProperty.call(source, key)) {
      if (excluded.indexOf(key) >= 0) continue;
      target[key] = source[key];
    }
  }
  return target;
}
function _classCallCheck$2(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}
function _defineProperties$2(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, _toPropertyKey$2(descriptor.key), descriptor);
  }
}
function _createClass$2(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties$2(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties$2(Constructor, staticProps);
  Object.defineProperty(Constructor, "prototype", { writable: false });
  return Constructor;
}
function _callSuper$2(t, o, e) {
  return o = _getPrototypeOf$2(o), _possibleConstructorReturn$2(t, _isNativeReflectConstruct$2() ? Reflect.construct(o, e || [], _getPrototypeOf$2(t).constructor) : o.apply(t, e));
}
function _possibleConstructorReturn$2(self, call) {
  if (call && (_typeof$2(call) === "object" || typeof call === "function")) {
    return call;
  } else if (call !== void 0) {
    throw new TypeError("Derived constructors may only return object or undefined");
  }
  return _assertThisInitialized$2(self);
}
function _assertThisInitialized$2(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }
  return self;
}
function _isNativeReflectConstruct$2() {
  try {
    var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
    }));
  } catch (t2) {
  }
  return (_isNativeReflectConstruct$2 = function _isNativeReflectConstruct2() {
    return !!t;
  })();
}
function _getPrototypeOf$2(o) {
  _getPrototypeOf$2 = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf2(o2) {
    return o2.__proto__ || Object.getPrototypeOf(o2);
  };
  return _getPrototypeOf$2(o);
}
function _inherits$2(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }
  subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } });
  Object.defineProperty(subClass, "prototype", { writable: false });
  if (superClass) _setPrototypeOf$2(subClass, superClass);
}
function _setPrototypeOf$2(o, p) {
  _setPrototypeOf$2 = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf2(o2, p2) {
    o2.__proto__ = p2;
    return o2;
  };
  return _setPrototypeOf$2(o, p);
}
function _defineProperty$2(obj, key, value) {
  key = _toPropertyKey$2(key);
  if (key in obj) {
    Object.defineProperty(obj, key, { value, enumerable: true, configurable: true, writable: true });
  } else {
    obj[key] = value;
  }
  return obj;
}
function _toPropertyKey$2(t) {
  var i = _toPrimitive$2(t, "string");
  return "symbol" == _typeof$2(i) ? i : i + "";
}
function _toPrimitive$2(t, r) {
  if ("object" != _typeof$2(t) || !t) return t;
  var e = t[Symbol.toPrimitive];
  if (void 0 !== e) {
    var i = e.call(t, r);
    if ("object" != _typeof$2(i)) return i;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return ("string" === r ? String : Number)(t);
}
var PolarRadiusAxis = /* @__PURE__ */ function(_PureComponent) {
  function PolarRadiusAxis2() {
    _classCallCheck$2(this, PolarRadiusAxis2);
    return _callSuper$2(this, PolarRadiusAxis2, arguments);
  }
  _inherits$2(PolarRadiusAxis2, _PureComponent);
  return _createClass$2(PolarRadiusAxis2, [{
    key: "getTickValueCoord",
    value: (
      /**
       * Calculate the coordinate of tick
       * @param  {Number} coordinate The radius of tick
       * @return {Object} (x, y)
       */
      function getTickValueCoord(_ref) {
        var coordinate = _ref.coordinate;
        var _this$props = this.props, angle = _this$props.angle, cx = _this$props.cx, cy = _this$props.cy;
        return polarToCartesian(cx, cy, coordinate, angle);
      }
    )
  }, {
    key: "getTickTextAnchor",
    value: function getTickTextAnchor() {
      var orientation = this.props.orientation;
      var textAnchor;
      switch (orientation) {
        case "left":
          textAnchor = "end";
          break;
        case "right":
          textAnchor = "start";
          break;
        default:
          textAnchor = "middle";
          break;
      }
      return textAnchor;
    }
  }, {
    key: "getViewBox",
    value: function getViewBox() {
      var _this$props2 = this.props, cx = _this$props2.cx, cy = _this$props2.cy, angle = _this$props2.angle, ticks = _this$props2.ticks;
      var maxRadiusTick = maxBy$1(ticks, function(entry) {
        return entry.coordinate || 0;
      });
      var minRadiusTick = minBy$1(ticks, function(entry) {
        return entry.coordinate || 0;
      });
      return {
        cx,
        cy,
        startAngle: angle,
        endAngle: angle,
        innerRadius: minRadiusTick.coordinate || 0,
        outerRadius: maxRadiusTick.coordinate || 0
      };
    }
  }, {
    key: "renderAxisLine",
    value: function renderAxisLine() {
      var _this$props3 = this.props, cx = _this$props3.cx, cy = _this$props3.cy, angle = _this$props3.angle, ticks = _this$props3.ticks, axisLine = _this$props3.axisLine, others = _objectWithoutProperties(_this$props3, _excluded);
      var extent = ticks.reduce(function(result, entry) {
        return [Math.min(result[0], entry.coordinate), Math.max(result[1], entry.coordinate)];
      }, [Infinity, -Infinity]);
      var point0 = polarToCartesian(cx, cy, extent[0], angle);
      var point1 = polarToCartesian(cx, cy, extent[1], angle);
      var props = _objectSpread$2(_objectSpread$2(_objectSpread$2({}, filterProps(others, false)), {}, {
        fill: "none"
      }, filterProps(axisLine, false)), {}, {
        x1: point0.x,
        y1: point0.y,
        x2: point1.x,
        y2: point1.y
      });
      return /* @__PURE__ */ React2.createElement("line", _extends$2({
        className: "recharts-polar-radius-axis-line"
      }, props));
    }
  }, {
    key: "renderTicks",
    value: function renderTicks() {
      var _this = this;
      var _this$props4 = this.props, ticks = _this$props4.ticks, tick = _this$props4.tick, angle = _this$props4.angle, tickFormatter = _this$props4.tickFormatter, stroke = _this$props4.stroke, others = _objectWithoutProperties(_this$props4, _excluded2);
      var textAnchor = this.getTickTextAnchor();
      var axisProps = filterProps(others, false);
      var customTickProps = filterProps(tick, false);
      var items = ticks.map(function(entry, i) {
        var coord = _this.getTickValueCoord(entry);
        var tickProps = _objectSpread$2(_objectSpread$2(_objectSpread$2(_objectSpread$2({
          textAnchor,
          transform: "rotate(".concat(90 - angle, ", ").concat(coord.x, ", ").concat(coord.y, ")")
        }, axisProps), {}, {
          stroke: "none",
          fill: stroke
        }, customTickProps), {}, {
          index: i
        }, coord), {}, {
          payload: entry
        });
        return /* @__PURE__ */ React2.createElement(Layer, _extends$2({
          className: clsx("recharts-polar-radius-axis-tick", getTickClassName(tick)),
          key: "tick-".concat(entry.coordinate)
        }, adaptEventsOfChild(_this.props, entry, i)), PolarRadiusAxis2.renderTickItem(tick, tickProps, tickFormatter ? tickFormatter(entry.value, i) : entry.value));
      });
      return /* @__PURE__ */ React2.createElement(Layer, {
        className: "recharts-polar-radius-axis-ticks"
      }, items);
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props5 = this.props, ticks = _this$props5.ticks, axisLine = _this$props5.axisLine, tick = _this$props5.tick;
      if (!ticks || !ticks.length) {
        return null;
      }
      return /* @__PURE__ */ React2.createElement(Layer, {
        className: clsx("recharts-polar-radius-axis", this.props.className)
      }, axisLine && this.renderAxisLine(), tick && this.renderTicks(), Label.renderCallByParent(this.props, this.getViewBox()));
    }
  }], [{
    key: "renderTickItem",
    value: function renderTickItem(option, props, value) {
      var tickItem;
      if (/* @__PURE__ */ React2.isValidElement(option)) {
        tickItem = /* @__PURE__ */ React2.cloneElement(option, props);
      } else if (isFunction(option)) {
        tickItem = option(props);
      } else {
        tickItem = /* @__PURE__ */ React2.createElement(Text, _extends$2({}, props, {
          className: "recharts-polar-radius-axis-tick-value"
        }), value);
      }
      return tickItem;
    }
  }]);
}(reactExports.PureComponent);
_defineProperty$2(PolarRadiusAxis, "displayName", "PolarRadiusAxis");
_defineProperty$2(PolarRadiusAxis, "axisType", "radiusAxis");
_defineProperty$2(PolarRadiusAxis, "defaultProps", {
  type: "number",
  radiusAxisId: 0,
  cx: 0,
  cy: 0,
  angle: 0,
  orientation: "right",
  stroke: "#ccc",
  axisLine: true,
  tick: true,
  tickCount: 5,
  allowDataOverflow: false,
  scale: "auto",
  allowDuplicatedCategory: true
});
function _typeof$1(o) {
  "@babel/helpers - typeof";
  return _typeof$1 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o2) {
    return typeof o2;
  } : function(o2) {
    return o2 && "function" == typeof Symbol && o2.constructor === Symbol && o2 !== Symbol.prototype ? "symbol" : typeof o2;
  }, _typeof$1(o);
}
function _extends$1() {
  _extends$1 = Object.assign ? Object.assign.bind() : function(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];
      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }
    return target;
  };
  return _extends$1.apply(this, arguments);
}
function ownKeys$1(e, r) {
  var t = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(e);
    r && (o = o.filter(function(r2) {
      return Object.getOwnPropertyDescriptor(e, r2).enumerable;
    })), t.push.apply(t, o);
  }
  return t;
}
function _objectSpread$1(e) {
  for (var r = 1; r < arguments.length; r++) {
    var t = null != arguments[r] ? arguments[r] : {};
    r % 2 ? ownKeys$1(Object(t), true).forEach(function(r2) {
      _defineProperty$1(e, r2, t[r2]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$1(Object(t)).forEach(function(r2) {
      Object.defineProperty(e, r2, Object.getOwnPropertyDescriptor(t, r2));
    });
  }
  return e;
}
function _classCallCheck$1(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}
function _defineProperties$1(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, _toPropertyKey$1(descriptor.key), descriptor);
  }
}
function _createClass$1(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties$1(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties$1(Constructor, staticProps);
  Object.defineProperty(Constructor, "prototype", { writable: false });
  return Constructor;
}
function _callSuper$1(t, o, e) {
  return o = _getPrototypeOf$1(o), _possibleConstructorReturn$1(t, _isNativeReflectConstruct$1() ? Reflect.construct(o, e || [], _getPrototypeOf$1(t).constructor) : o.apply(t, e));
}
function _possibleConstructorReturn$1(self, call) {
  if (call && (_typeof$1(call) === "object" || typeof call === "function")) {
    return call;
  } else if (call !== void 0) {
    throw new TypeError("Derived constructors may only return object or undefined");
  }
  return _assertThisInitialized$1(self);
}
function _assertThisInitialized$1(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }
  return self;
}
function _isNativeReflectConstruct$1() {
  try {
    var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
    }));
  } catch (t2) {
  }
  return (_isNativeReflectConstruct$1 = function _isNativeReflectConstruct2() {
    return !!t;
  })();
}
function _getPrototypeOf$1(o) {
  _getPrototypeOf$1 = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf2(o2) {
    return o2.__proto__ || Object.getPrototypeOf(o2);
  };
  return _getPrototypeOf$1(o);
}
function _inherits$1(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }
  subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } });
  Object.defineProperty(subClass, "prototype", { writable: false });
  if (superClass) _setPrototypeOf$1(subClass, superClass);
}
function _setPrototypeOf$1(o, p) {
  _setPrototypeOf$1 = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf2(o2, p2) {
    o2.__proto__ = p2;
    return o2;
  };
  return _setPrototypeOf$1(o, p);
}
function _defineProperty$1(obj, key, value) {
  key = _toPropertyKey$1(key);
  if (key in obj) {
    Object.defineProperty(obj, key, { value, enumerable: true, configurable: true, writable: true });
  } else {
    obj[key] = value;
  }
  return obj;
}
function _toPropertyKey$1(t) {
  var i = _toPrimitive$1(t, "string");
  return "symbol" == _typeof$1(i) ? i : i + "";
}
function _toPrimitive$1(t, r) {
  if ("object" != _typeof$1(t) || !t) return t;
  var e = t[Symbol.toPrimitive];
  if (void 0 !== e) {
    var i = e.call(t, r);
    if ("object" != _typeof$1(i)) return i;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return ("string" === r ? String : Number)(t);
}
var RADIAN = Math.PI / 180;
var eps = 1e-5;
var PolarAngleAxis = /* @__PURE__ */ function(_PureComponent) {
  function PolarAngleAxis2() {
    _classCallCheck$1(this, PolarAngleAxis2);
    return _callSuper$1(this, PolarAngleAxis2, arguments);
  }
  _inherits$1(PolarAngleAxis2, _PureComponent);
  return _createClass$1(PolarAngleAxis2, [{
    key: "getTickLineCoord",
    value: (
      /**
       * Calculate the coordinate of line endpoint
       * @param  {Object} data The Data if ticks
       * @return {Object} (x0, y0): The start point of text,
       *                  (x1, y1): The end point close to text,
       *                  (x2, y2): The end point close to axis
       */
      function getTickLineCoord(data) {
        var _this$props = this.props, cx = _this$props.cx, cy = _this$props.cy, radius = _this$props.radius, orientation = _this$props.orientation, tickSize = _this$props.tickSize;
        var tickLineSize = tickSize || 8;
        var p1 = polarToCartesian(cx, cy, radius, data.coordinate);
        var p2 = polarToCartesian(cx, cy, radius + (orientation === "inner" ? -1 : 1) * tickLineSize, data.coordinate);
        return {
          x1: p1.x,
          y1: p1.y,
          x2: p2.x,
          y2: p2.y
        };
      }
    )
    /**
     * Get the text-anchor of each tick
     * @param  {Object} data Data of ticks
     * @return {String} text-anchor
     */
  }, {
    key: "getTickTextAnchor",
    value: function getTickTextAnchor(data) {
      var orientation = this.props.orientation;
      var cos = Math.cos(-data.coordinate * RADIAN);
      var textAnchor;
      if (cos > eps) {
        textAnchor = orientation === "outer" ? "start" : "end";
      } else if (cos < -eps) {
        textAnchor = orientation === "outer" ? "end" : "start";
      } else {
        textAnchor = "middle";
      }
      return textAnchor;
    }
  }, {
    key: "renderAxisLine",
    value: function renderAxisLine() {
      var _this$props2 = this.props, cx = _this$props2.cx, cy = _this$props2.cy, radius = _this$props2.radius, axisLine = _this$props2.axisLine, axisLineType = _this$props2.axisLineType;
      var props = _objectSpread$1(_objectSpread$1({}, filterProps(this.props, false)), {}, {
        fill: "none"
      }, filterProps(axisLine, false));
      if (axisLineType === "circle") {
        return /* @__PURE__ */ React2.createElement(Dot, _extends$1({
          className: "recharts-polar-angle-axis-line"
        }, props, {
          cx,
          cy,
          r: radius
        }));
      }
      var ticks = this.props.ticks;
      var points = ticks.map(function(entry) {
        return polarToCartesian(cx, cy, radius, entry.coordinate);
      });
      return /* @__PURE__ */ React2.createElement(Polygon, _extends$1({
        className: "recharts-polar-angle-axis-line"
      }, props, {
        points
      }));
    }
  }, {
    key: "renderTicks",
    value: function renderTicks() {
      var _this = this;
      var _this$props3 = this.props, ticks = _this$props3.ticks, tick = _this$props3.tick, tickLine = _this$props3.tickLine, tickFormatter = _this$props3.tickFormatter, stroke = _this$props3.stroke;
      var axisProps = filterProps(this.props, false);
      var customTickProps = filterProps(tick, false);
      var tickLineProps = _objectSpread$1(_objectSpread$1({}, axisProps), {}, {
        fill: "none"
      }, filterProps(tickLine, false));
      var items = ticks.map(function(entry, i) {
        var lineCoord = _this.getTickLineCoord(entry);
        var textAnchor = _this.getTickTextAnchor(entry);
        var tickProps = _objectSpread$1(_objectSpread$1(_objectSpread$1({
          textAnchor
        }, axisProps), {}, {
          stroke: "none",
          fill: stroke
        }, customTickProps), {}, {
          index: i,
          payload: entry,
          x: lineCoord.x2,
          y: lineCoord.y2
        });
        return /* @__PURE__ */ React2.createElement(Layer, _extends$1({
          className: clsx("recharts-polar-angle-axis-tick", getTickClassName(tick)),
          key: "tick-".concat(entry.coordinate)
        }, adaptEventsOfChild(_this.props, entry, i)), tickLine && /* @__PURE__ */ React2.createElement("line", _extends$1({
          className: "recharts-polar-angle-axis-tick-line"
        }, tickLineProps, lineCoord)), tick && PolarAngleAxis2.renderTickItem(tick, tickProps, tickFormatter ? tickFormatter(entry.value, i) : entry.value));
      });
      return /* @__PURE__ */ React2.createElement(Layer, {
        className: "recharts-polar-angle-axis-ticks"
      }, items);
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props4 = this.props, ticks = _this$props4.ticks, radius = _this$props4.radius, axisLine = _this$props4.axisLine;
      if (radius <= 0 || !ticks || !ticks.length) {
        return null;
      }
      return /* @__PURE__ */ React2.createElement(Layer, {
        className: clsx("recharts-polar-angle-axis", this.props.className)
      }, axisLine && this.renderAxisLine(), this.renderTicks());
    }
  }], [{
    key: "renderTickItem",
    value: function renderTickItem(option, props, value) {
      var tickItem;
      if (/* @__PURE__ */ React2.isValidElement(option)) {
        tickItem = /* @__PURE__ */ React2.cloneElement(option, props);
      } else if (isFunction(option)) {
        tickItem = option(props);
      } else {
        tickItem = /* @__PURE__ */ React2.createElement(Text, _extends$1({}, props, {
          className: "recharts-polar-angle-axis-tick-value"
        }), value);
      }
      return tickItem;
    }
  }]);
}(reactExports.PureComponent);
_defineProperty$1(PolarAngleAxis, "displayName", "PolarAngleAxis");
_defineProperty$1(PolarAngleAxis, "axisType", "angleAxis");
_defineProperty$1(PolarAngleAxis, "defaultProps", {
  type: "category",
  angleAxisId: 0,
  scale: "auto",
  cx: 0,
  cy: 0,
  orientation: "outer",
  axisLine: true,
  tickLine: true,
  tickSize: 8,
  tick: true,
  hide: false,
  allowDuplicatedCategory: true
});
var _Pie;
function _typeof(o) {
  "@babel/helpers - typeof";
  return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o2) {
    return typeof o2;
  } : function(o2) {
    return o2 && "function" == typeof Symbol && o2.constructor === Symbol && o2 !== Symbol.prototype ? "symbol" : typeof o2;
  }, _typeof(o);
}
function _extends() {
  _extends = Object.assign ? Object.assign.bind() : function(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];
      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }
    return target;
  };
  return _extends.apply(this, arguments);
}
function ownKeys(e, r) {
  var t = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(e);
    r && (o = o.filter(function(r2) {
      return Object.getOwnPropertyDescriptor(e, r2).enumerable;
    })), t.push.apply(t, o);
  }
  return t;
}
function _objectSpread(e) {
  for (var r = 1; r < arguments.length; r++) {
    var t = null != arguments[r] ? arguments[r] : {};
    r % 2 ? ownKeys(Object(t), true).forEach(function(r2) {
      _defineProperty(e, r2, t[r2]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function(r2) {
      Object.defineProperty(e, r2, Object.getOwnPropertyDescriptor(t, r2));
    });
  }
  return e;
}
function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}
function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor);
  }
}
function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  Object.defineProperty(Constructor, "prototype", { writable: false });
  return Constructor;
}
function _callSuper(t, o, e) {
  return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e));
}
function _possibleConstructorReturn(self, call) {
  if (call && (_typeof(call) === "object" || typeof call === "function")) {
    return call;
  } else if (call !== void 0) {
    throw new TypeError("Derived constructors may only return object or undefined");
  }
  return _assertThisInitialized(self);
}
function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }
  return self;
}
function _isNativeReflectConstruct() {
  try {
    var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
    }));
  } catch (t2) {
  }
  return (_isNativeReflectConstruct = function _isNativeReflectConstruct2() {
    return !!t;
  })();
}
function _getPrototypeOf(o) {
  _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf2(o2) {
    return o2.__proto__ || Object.getPrototypeOf(o2);
  };
  return _getPrototypeOf(o);
}
function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }
  subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } });
  Object.defineProperty(subClass, "prototype", { writable: false });
  if (superClass) _setPrototypeOf(subClass, superClass);
}
function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf2(o2, p2) {
    o2.__proto__ = p2;
    return o2;
  };
  return _setPrototypeOf(o, p);
}
function _defineProperty(obj, key, value) {
  key = _toPropertyKey(key);
  if (key in obj) {
    Object.defineProperty(obj, key, { value, enumerable: true, configurable: true, writable: true });
  } else {
    obj[key] = value;
  }
  return obj;
}
function _toPropertyKey(t) {
  var i = _toPrimitive(t, "string");
  return "symbol" == _typeof(i) ? i : i + "";
}
function _toPrimitive(t, r) {
  if ("object" != _typeof(t) || !t) return t;
  var e = t[Symbol.toPrimitive];
  if (void 0 !== e) {
    var i = e.call(t, r);
    if ("object" != _typeof(i)) return i;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return String(t);
}
var Pie = /* @__PURE__ */ function(_PureComponent) {
  function Pie2(props) {
    var _this;
    _classCallCheck(this, Pie2);
    _this = _callSuper(this, Pie2, [props]);
    _defineProperty(_this, "pieRef", null);
    _defineProperty(_this, "sectorRefs", []);
    _defineProperty(_this, "id", uniqueId("recharts-pie-"));
    _defineProperty(_this, "handleAnimationEnd", function() {
      var onAnimationEnd = _this.props.onAnimationEnd;
      _this.setState({
        isAnimationFinished: true
      });
      if (isFunction(onAnimationEnd)) {
        onAnimationEnd();
      }
    });
    _defineProperty(_this, "handleAnimationStart", function() {
      var onAnimationStart = _this.props.onAnimationStart;
      _this.setState({
        isAnimationFinished: false
      });
      if (isFunction(onAnimationStart)) {
        onAnimationStart();
      }
    });
    _this.state = {
      isAnimationFinished: !props.isAnimationActive,
      prevIsAnimationActive: props.isAnimationActive,
      prevAnimationId: props.animationId,
      sectorToFocus: 0
    };
    return _this;
  }
  _inherits(Pie2, _PureComponent);
  return _createClass(Pie2, [{
    key: "isActiveIndex",
    value: function isActiveIndex(i) {
      var activeIndex = this.props.activeIndex;
      if (Array.isArray(activeIndex)) {
        return activeIndex.indexOf(i) !== -1;
      }
      return i === activeIndex;
    }
  }, {
    key: "hasActiveIndex",
    value: function hasActiveIndex() {
      var activeIndex = this.props.activeIndex;
      return Array.isArray(activeIndex) ? activeIndex.length !== 0 : activeIndex || activeIndex === 0;
    }
  }, {
    key: "renderLabels",
    value: function renderLabels(sectors) {
      var isAnimationActive = this.props.isAnimationActive;
      if (isAnimationActive && !this.state.isAnimationFinished) {
        return null;
      }
      var _this$props = this.props, label = _this$props.label, labelLine = _this$props.labelLine, dataKey = _this$props.dataKey, valueKey = _this$props.valueKey;
      var pieProps = filterProps(this.props, false);
      var customLabelProps = filterProps(label, false);
      var customLabelLineProps = filterProps(labelLine, false);
      var offsetRadius = label && label.offsetRadius || 20;
      var labels = sectors.map(function(entry, i) {
        var midAngle = (entry.startAngle + entry.endAngle) / 2;
        var endPoint = polarToCartesian(entry.cx, entry.cy, entry.outerRadius + offsetRadius, midAngle);
        var labelProps = _objectSpread(_objectSpread(_objectSpread(_objectSpread({}, pieProps), entry), {}, {
          stroke: "none"
        }, customLabelProps), {}, {
          index: i,
          textAnchor: Pie2.getTextAnchor(endPoint.x, entry.cx)
        }, endPoint);
        var lineProps = _objectSpread(_objectSpread(_objectSpread(_objectSpread({}, pieProps), entry), {}, {
          fill: "none",
          stroke: entry.fill
        }, customLabelLineProps), {}, {
          index: i,
          points: [polarToCartesian(entry.cx, entry.cy, entry.outerRadius, midAngle), endPoint]
        });
        var realDataKey = dataKey;
        if (isNil(dataKey) && isNil(valueKey)) {
          realDataKey = "value";
        } else if (isNil(dataKey)) {
          realDataKey = valueKey;
        }
        return (
          // eslint-disable-next-line react/no-array-index-key
          /* @__PURE__ */ React2.createElement(Layer, {
            key: "label-".concat(entry.startAngle, "-").concat(entry.endAngle, "-").concat(entry.midAngle, "-").concat(i)
          }, labelLine && Pie2.renderLabelLineItem(labelLine, lineProps, "line"), Pie2.renderLabelItem(label, labelProps, getValueByDataKey(entry, realDataKey)))
        );
      });
      return /* @__PURE__ */ React2.createElement(Layer, {
        className: "recharts-pie-labels"
      }, labels);
    }
  }, {
    key: "renderSectorsStatically",
    value: function renderSectorsStatically(sectors) {
      var _this2 = this;
      var _this$props2 = this.props, activeShape = _this$props2.activeShape, blendStroke = _this$props2.blendStroke, inactiveShapeProp = _this$props2.inactiveShape;
      return sectors.map(function(entry, i) {
        if ((entry === null || entry === void 0 ? void 0 : entry.startAngle) === 0 && (entry === null || entry === void 0 ? void 0 : entry.endAngle) === 0 && sectors.length !== 1) return null;
        var isActive = _this2.isActiveIndex(i);
        var inactiveShape = inactiveShapeProp && _this2.hasActiveIndex() ? inactiveShapeProp : null;
        var sectorOptions = isActive ? activeShape : inactiveShape;
        var sectorProps = _objectSpread(_objectSpread({}, entry), {}, {
          stroke: blendStroke ? entry.fill : entry.stroke,
          tabIndex: -1
        });
        return /* @__PURE__ */ React2.createElement(Layer, _extends({
          ref: function ref(_ref) {
            if (_ref && !_this2.sectorRefs.includes(_ref)) {
              _this2.sectorRefs.push(_ref);
            }
          },
          tabIndex: -1,
          className: "recharts-pie-sector"
        }, adaptEventsOfChild(_this2.props, entry, i), {
          // eslint-disable-next-line react/no-array-index-key
          key: "sector-".concat(entry === null || entry === void 0 ? void 0 : entry.startAngle, "-").concat(entry === null || entry === void 0 ? void 0 : entry.endAngle, "-").concat(entry.midAngle, "-").concat(i)
        }), /* @__PURE__ */ React2.createElement(Shape, _extends({
          option: sectorOptions,
          isActive,
          shapeType: "sector"
        }, sectorProps)));
      });
    }
  }, {
    key: "renderSectorsWithAnimation",
    value: function renderSectorsWithAnimation() {
      var _this3 = this;
      var _this$props3 = this.props, sectors = _this$props3.sectors, isAnimationActive = _this$props3.isAnimationActive, animationBegin = _this$props3.animationBegin, animationDuration = _this$props3.animationDuration, animationEasing = _this$props3.animationEasing, animationId = _this$props3.animationId;
      var _this$state = this.state, prevSectors = _this$state.prevSectors, prevIsAnimationActive = _this$state.prevIsAnimationActive;
      return /* @__PURE__ */ React2.createElement(Animate, {
        begin: animationBegin,
        duration: animationDuration,
        isActive: isAnimationActive,
        easing: animationEasing,
        from: {
          t: 0
        },
        to: {
          t: 1
        },
        key: "pie-".concat(animationId, "-").concat(prevIsAnimationActive),
        onAnimationStart: this.handleAnimationStart,
        onAnimationEnd: this.handleAnimationEnd
      }, function(_ref2) {
        var t = _ref2.t;
        var stepData = [];
        var first = sectors && sectors[0];
        var curAngle = first.startAngle;
        sectors.forEach(function(entry, index) {
          var prev = prevSectors && prevSectors[index];
          var paddingAngle = index > 0 ? get(entry, "paddingAngle", 0) : 0;
          if (prev) {
            var angleIp = interpolateNumber(prev.endAngle - prev.startAngle, entry.endAngle - entry.startAngle);
            var latest = _objectSpread(_objectSpread({}, entry), {}, {
              startAngle: curAngle + paddingAngle,
              endAngle: curAngle + angleIp(t) + paddingAngle
            });
            stepData.push(latest);
            curAngle = latest.endAngle;
          } else {
            var endAngle = entry.endAngle, startAngle = entry.startAngle;
            var interpolatorAngle = interpolateNumber(0, endAngle - startAngle);
            var deltaAngle = interpolatorAngle(t);
            var _latest = _objectSpread(_objectSpread({}, entry), {}, {
              startAngle: curAngle + paddingAngle,
              endAngle: curAngle + deltaAngle + paddingAngle
            });
            stepData.push(_latest);
            curAngle = _latest.endAngle;
          }
        });
        return /* @__PURE__ */ React2.createElement(Layer, null, _this3.renderSectorsStatically(stepData));
      });
    }
  }, {
    key: "attachKeyboardHandlers",
    value: function attachKeyboardHandlers(pieRef) {
      var _this4 = this;
      pieRef.onkeydown = function(e) {
        if (!e.altKey) {
          switch (e.key) {
            case "ArrowLeft": {
              var next = ++_this4.state.sectorToFocus % _this4.sectorRefs.length;
              _this4.sectorRefs[next].focus();
              _this4.setState({
                sectorToFocus: next
              });
              break;
            }
            case "ArrowRight": {
              var _next = --_this4.state.sectorToFocus < 0 ? _this4.sectorRefs.length - 1 : _this4.state.sectorToFocus % _this4.sectorRefs.length;
              _this4.sectorRefs[_next].focus();
              _this4.setState({
                sectorToFocus: _next
              });
              break;
            }
            case "Escape": {
              _this4.sectorRefs[_this4.state.sectorToFocus].blur();
              _this4.setState({
                sectorToFocus: 0
              });
              break;
            }
          }
        }
      };
    }
  }, {
    key: "renderSectors",
    value: function renderSectors() {
      var _this$props4 = this.props, sectors = _this$props4.sectors, isAnimationActive = _this$props4.isAnimationActive;
      var prevSectors = this.state.prevSectors;
      if (isAnimationActive && sectors && sectors.length && (!prevSectors || !isEqual(prevSectors, sectors))) {
        return this.renderSectorsWithAnimation();
      }
      return this.renderSectorsStatically(sectors);
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      if (this.pieRef) {
        this.attachKeyboardHandlers(this.pieRef);
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this5 = this;
      var _this$props5 = this.props, hide = _this$props5.hide, sectors = _this$props5.sectors, className = _this$props5.className, label = _this$props5.label, cx = _this$props5.cx, cy = _this$props5.cy, innerRadius = _this$props5.innerRadius, outerRadius = _this$props5.outerRadius, isAnimationActive = _this$props5.isAnimationActive;
      var isAnimationFinished = this.state.isAnimationFinished;
      if (hide || !sectors || !sectors.length || !isNumber(cx) || !isNumber(cy) || !isNumber(innerRadius) || !isNumber(outerRadius)) {
        return null;
      }
      var layerClass = clsx("recharts-pie", className);
      return /* @__PURE__ */ React2.createElement(Layer, {
        tabIndex: this.props.rootTabIndex,
        className: layerClass,
        ref: function ref(_ref3) {
          _this5.pieRef = _ref3;
        }
      }, this.renderSectors(), label && this.renderLabels(sectors), Label.renderCallByParent(this.props, null, false), (!isAnimationActive || isAnimationFinished) && LabelList.renderCallByParent(this.props, sectors, false));
    }
  }], [{
    key: "getDerivedStateFromProps",
    value: function getDerivedStateFromProps(nextProps, prevState) {
      if (prevState.prevIsAnimationActive !== nextProps.isAnimationActive) {
        return {
          prevIsAnimationActive: nextProps.isAnimationActive,
          prevAnimationId: nextProps.animationId,
          curSectors: nextProps.sectors,
          prevSectors: [],
          isAnimationFinished: true
        };
      }
      if (nextProps.isAnimationActive && nextProps.animationId !== prevState.prevAnimationId) {
        return {
          prevAnimationId: nextProps.animationId,
          curSectors: nextProps.sectors,
          prevSectors: prevState.curSectors,
          isAnimationFinished: true
        };
      }
      if (nextProps.sectors !== prevState.curSectors) {
        return {
          curSectors: nextProps.sectors,
          isAnimationFinished: true
        };
      }
      return null;
    }
  }, {
    key: "getTextAnchor",
    value: function getTextAnchor(x, cx) {
      if (x > cx) {
        return "start";
      }
      if (x < cx) {
        return "end";
      }
      return "middle";
    }
  }, {
    key: "renderLabelLineItem",
    value: function renderLabelLineItem(option, props, key) {
      if (/* @__PURE__ */ React2.isValidElement(option)) {
        return /* @__PURE__ */ React2.cloneElement(option, props);
      }
      if (isFunction(option)) {
        return option(props);
      }
      var className = clsx("recharts-pie-label-line", typeof option !== "boolean" ? option.className : "");
      return /* @__PURE__ */ React2.createElement(Curve, _extends({}, props, {
        key,
        type: "linear",
        className
      }));
    }
  }, {
    key: "renderLabelItem",
    value: function renderLabelItem(option, props, value) {
      if (/* @__PURE__ */ React2.isValidElement(option)) {
        return /* @__PURE__ */ React2.cloneElement(option, props);
      }
      var label = value;
      if (isFunction(option)) {
        label = option(props);
        if (/* @__PURE__ */ React2.isValidElement(label)) {
          return label;
        }
      }
      var className = clsx("recharts-pie-label-text", typeof option !== "boolean" && !isFunction(option) ? option.className : "");
      return /* @__PURE__ */ React2.createElement(Text, _extends({}, props, {
        alignmentBaseline: "middle",
        className
      }), label);
    }
  }]);
}(reactExports.PureComponent);
_Pie = Pie;
_defineProperty(Pie, "displayName", "Pie");
_defineProperty(Pie, "defaultProps", {
  stroke: "#fff",
  fill: "#808080",
  legendType: "rect",
  cx: "50%",
  cy: "50%",
  startAngle: 0,
  endAngle: 360,
  innerRadius: 0,
  outerRadius: "80%",
  paddingAngle: 0,
  labelLine: true,
  hide: false,
  minAngle: 0,
  isAnimationActive: !Global.isSsr,
  animationBegin: 400,
  animationDuration: 1500,
  animationEasing: "ease",
  nameKey: "name",
  blendStroke: false,
  rootTabIndex: 0
});
_defineProperty(Pie, "parseDeltaAngle", function(startAngle, endAngle) {
  var sign = mathSign(endAngle - startAngle);
  var deltaAngle = Math.min(Math.abs(endAngle - startAngle), 360);
  return sign * deltaAngle;
});
_defineProperty(Pie, "getRealPieData", function(itemProps) {
  var data = itemProps.data, children = itemProps.children;
  var presentationProps = filterProps(itemProps, false);
  var cells = findAllByType(children, Cell);
  if (data && data.length) {
    return data.map(function(entry, index) {
      return _objectSpread(_objectSpread(_objectSpread({
        payload: entry
      }, presentationProps), entry), cells && cells[index] && cells[index].props);
    });
  }
  if (cells && cells.length) {
    return cells.map(function(cell) {
      return _objectSpread(_objectSpread({}, presentationProps), cell.props);
    });
  }
  return [];
});
_defineProperty(Pie, "parseCoordinateOfPie", function(itemProps, offset) {
  var top = offset.top, left = offset.left, width = offset.width, height = offset.height;
  var maxPieRadius = getMaxRadius(width, height);
  var cx = left + getPercentValue(itemProps.cx, width, width / 2);
  var cy = top + getPercentValue(itemProps.cy, height, height / 2);
  var innerRadius = getPercentValue(itemProps.innerRadius, maxPieRadius, 0);
  var outerRadius = getPercentValue(itemProps.outerRadius, maxPieRadius, maxPieRadius * 0.8);
  var maxRadius = itemProps.maxRadius || Math.sqrt(width * width + height * height) / 2;
  return {
    cx,
    cy,
    innerRadius,
    outerRadius,
    maxRadius
  };
});
_defineProperty(Pie, "getComposedData", function(_ref4) {
  var item = _ref4.item, offset = _ref4.offset;
  var itemProps = item.type.defaultProps !== void 0 ? _objectSpread(_objectSpread({}, item.type.defaultProps), item.props) : item.props;
  var pieData = _Pie.getRealPieData(itemProps);
  if (!pieData || !pieData.length) {
    return null;
  }
  var cornerRadius = itemProps.cornerRadius, startAngle = itemProps.startAngle, endAngle = itemProps.endAngle, paddingAngle = itemProps.paddingAngle, dataKey = itemProps.dataKey, nameKey = itemProps.nameKey, valueKey = itemProps.valueKey, tooltipType = itemProps.tooltipType;
  var minAngle = Math.abs(itemProps.minAngle);
  var coordinate = _Pie.parseCoordinateOfPie(itemProps, offset);
  var deltaAngle = _Pie.parseDeltaAngle(startAngle, endAngle);
  var absDeltaAngle = Math.abs(deltaAngle);
  var realDataKey = dataKey;
  if (isNil(dataKey) && isNil(valueKey)) {
    warn(false, 'Use "dataKey" to specify the value of pie,\n      the props "valueKey" will be deprecated in 1.1.0');
    realDataKey = "value";
  } else if (isNil(dataKey)) {
    warn(false, 'Use "dataKey" to specify the value of pie,\n      the props "valueKey" will be deprecated in 1.1.0');
    realDataKey = valueKey;
  }
  var notZeroItemCount = pieData.filter(function(entry) {
    return getValueByDataKey(entry, realDataKey, 0) !== 0;
  }).length;
  var totalPadingAngle = (absDeltaAngle >= 360 ? notZeroItemCount : notZeroItemCount - 1) * paddingAngle;
  var realTotalAngle = absDeltaAngle - notZeroItemCount * minAngle - totalPadingAngle;
  var sum = pieData.reduce(function(result, entry) {
    var val = getValueByDataKey(entry, realDataKey, 0);
    return result + (isNumber(val) ? val : 0);
  }, 0);
  var sectors;
  if (sum > 0) {
    var prev;
    sectors = pieData.map(function(entry, i) {
      var val = getValueByDataKey(entry, realDataKey, 0);
      var name = getValueByDataKey(entry, nameKey, i);
      var percent = (isNumber(val) ? val : 0) / sum;
      var tempStartAngle;
      if (i) {
        tempStartAngle = prev.endAngle + mathSign(deltaAngle) * paddingAngle * (val !== 0 ? 1 : 0);
      } else {
        tempStartAngle = startAngle;
      }
      var tempEndAngle = tempStartAngle + mathSign(deltaAngle) * ((val !== 0 ? minAngle : 0) + percent * realTotalAngle);
      var midAngle = (tempStartAngle + tempEndAngle) / 2;
      var middleRadius = (coordinate.innerRadius + coordinate.outerRadius) / 2;
      var tooltipPayload = [{
        name,
        value: val,
        payload: entry,
        dataKey: realDataKey,
        type: tooltipType
      }];
      var tooltipPosition = polarToCartesian(coordinate.cx, coordinate.cy, middleRadius, midAngle);
      prev = _objectSpread(_objectSpread(_objectSpread({
        percent,
        cornerRadius,
        name,
        tooltipPayload,
        midAngle,
        middleRadius,
        tooltipPosition
      }, entry), coordinate), {}, {
        value: getValueByDataKey(entry, realDataKey),
        startAngle: tempStartAngle,
        endAngle: tempEndAngle,
        payload: entry,
        paddingAngle: mathSign(deltaAngle) * paddingAngle
      });
      return prev;
    });
  }
  return _objectSpread(_objectSpread({}, coordinate), {}, {
    sectors,
    data: pieData
  });
});
var PieChart = generateCategoricalChart({
  chartName: "PieChart",
  GraphicalChild: Pie,
  validateTooltipEventTypes: ["item"],
  defaultTooltipEventType: "item",
  legendContent: "children",
  axisComponents: [{
    axisType: "angleAxis",
    AxisComp: PolarAngleAxis
  }, {
    axisType: "radiusAxis",
    AxisComp: PolarRadiusAxis
  }],
  formatAxisMap,
  defaultProps: {
    layout: "centric",
    startAngle: 0,
    endAngle: 360,
    cx: "50%",
    cy: "50%",
    innerRadius: 0,
    outerRadius: "80%"
  }
});
var DIALOG_NAME = "Dialog";
var [createDialogContext] = createContextScope(DIALOG_NAME);
var [DialogProvider, useDialogContext] = createDialogContext(DIALOG_NAME);
var Dialog$1 = (props) => {
  const {
    __scopeDialog,
    children,
    open: openProp,
    defaultOpen,
    onOpenChange,
    modal = true
  } = props;
  const triggerRef = reactExports.useRef(null);
  const contentRef = reactExports.useRef(null);
  const [open, setOpen] = useControllableState({
    prop: openProp,
    defaultProp: defaultOpen ?? false,
    onChange: onOpenChange,
    caller: DIALOG_NAME
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    DialogProvider,
    {
      scope: __scopeDialog,
      triggerRef,
      contentRef,
      contentId: useId(),
      titleId: useId(),
      descriptionId: useId(),
      open,
      onOpenChange: setOpen,
      onOpenToggle: reactExports.useCallback(() => setOpen((prevOpen) => !prevOpen), [setOpen]),
      modal,
      children
    }
  );
};
Dialog$1.displayName = DIALOG_NAME;
var TRIGGER_NAME = "DialogTrigger";
var DialogTrigger = reactExports.forwardRef(
  (props, forwardedRef) => {
    const { __scopeDialog, ...triggerProps } = props;
    const context = useDialogContext(TRIGGER_NAME, __scopeDialog);
    const composedTriggerRef = useComposedRefs(forwardedRef, context.triggerRef);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      Primitive.button,
      {
        type: "button",
        "aria-haspopup": "dialog",
        "aria-expanded": context.open,
        "aria-controls": context.contentId,
        "data-state": getState(context.open),
        ...triggerProps,
        ref: composedTriggerRef,
        onClick: composeEventHandlers(props.onClick, context.onOpenToggle)
      }
    );
  }
);
DialogTrigger.displayName = TRIGGER_NAME;
var PORTAL_NAME = "DialogPortal";
var [PortalProvider, usePortalContext] = createDialogContext(PORTAL_NAME, {
  forceMount: void 0
});
var DialogPortal$1 = (props) => {
  const { __scopeDialog, forceMount, children, container } = props;
  const context = useDialogContext(PORTAL_NAME, __scopeDialog);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(PortalProvider, { scope: __scopeDialog, forceMount, children: reactExports.Children.map(children, (child) => /* @__PURE__ */ jsxRuntimeExports.jsx(Presence, { present: forceMount || context.open, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Portal$1, { asChild: true, container, children: child }) })) });
};
DialogPortal$1.displayName = PORTAL_NAME;
var OVERLAY_NAME = "DialogOverlay";
var DialogOverlay$1 = reactExports.forwardRef(
  (props, forwardedRef) => {
    const portalContext = usePortalContext(OVERLAY_NAME, props.__scopeDialog);
    const { forceMount = portalContext.forceMount, ...overlayProps } = props;
    const context = useDialogContext(OVERLAY_NAME, props.__scopeDialog);
    return context.modal ? /* @__PURE__ */ jsxRuntimeExports.jsx(Presence, { present: forceMount || context.open, children: /* @__PURE__ */ jsxRuntimeExports.jsx(DialogOverlayImpl, { ...overlayProps, ref: forwardedRef }) }) : null;
  }
);
DialogOverlay$1.displayName = OVERLAY_NAME;
var Slot = createSlot("DialogOverlay.RemoveScroll");
var DialogOverlayImpl = reactExports.forwardRef(
  (props, forwardedRef) => {
    const { __scopeDialog, ...overlayProps } = props;
    const context = useDialogContext(OVERLAY_NAME, __scopeDialog);
    return (
      // Make sure `Content` is scrollable even when it doesn't live inside `RemoveScroll`
      // ie. when `Overlay` and `Content` are siblings
      /* @__PURE__ */ jsxRuntimeExports.jsx(ReactRemoveScroll, { as: Slot, allowPinchZoom: true, shards: [context.contentRef], children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        Primitive.div,
        {
          "data-state": getState(context.open),
          ...overlayProps,
          ref: forwardedRef,
          style: { pointerEvents: "auto", ...overlayProps.style }
        }
      ) })
    );
  }
);
var CONTENT_NAME = "DialogContent";
var DialogContent$1 = reactExports.forwardRef(
  (props, forwardedRef) => {
    const portalContext = usePortalContext(CONTENT_NAME, props.__scopeDialog);
    const { forceMount = portalContext.forceMount, ...contentProps } = props;
    const context = useDialogContext(CONTENT_NAME, props.__scopeDialog);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Presence, { present: forceMount || context.open, children: context.modal ? /* @__PURE__ */ jsxRuntimeExports.jsx(DialogContentModal, { ...contentProps, ref: forwardedRef }) : /* @__PURE__ */ jsxRuntimeExports.jsx(DialogContentNonModal, { ...contentProps, ref: forwardedRef }) });
  }
);
DialogContent$1.displayName = CONTENT_NAME;
var DialogContentModal = reactExports.forwardRef(
  (props, forwardedRef) => {
    const context = useDialogContext(CONTENT_NAME, props.__scopeDialog);
    const contentRef = reactExports.useRef(null);
    const composedRefs = useComposedRefs(forwardedRef, context.contentRef, contentRef);
    reactExports.useEffect(() => {
      const content = contentRef.current;
      if (content) return hideOthers(content);
    }, []);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      DialogContentImpl,
      {
        ...props,
        ref: composedRefs,
        trapFocus: context.open,
        disableOutsidePointerEvents: true,
        onCloseAutoFocus: composeEventHandlers(props.onCloseAutoFocus, (event) => {
          var _a;
          event.preventDefault();
          (_a = context.triggerRef.current) == null ? void 0 : _a.focus();
        }),
        onPointerDownOutside: composeEventHandlers(props.onPointerDownOutside, (event) => {
          const originalEvent = event.detail.originalEvent;
          const ctrlLeftClick = originalEvent.button === 0 && originalEvent.ctrlKey === true;
          const isRightClick = originalEvent.button === 2 || ctrlLeftClick;
          if (isRightClick) event.preventDefault();
        }),
        onFocusOutside: composeEventHandlers(
          props.onFocusOutside,
          (event) => event.preventDefault()
        )
      }
    );
  }
);
var DialogContentNonModal = reactExports.forwardRef(
  (props, forwardedRef) => {
    const context = useDialogContext(CONTENT_NAME, props.__scopeDialog);
    const hasInteractedOutsideRef = reactExports.useRef(false);
    const hasPointerDownOutsideRef = reactExports.useRef(false);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      DialogContentImpl,
      {
        ...props,
        ref: forwardedRef,
        trapFocus: false,
        disableOutsidePointerEvents: false,
        onCloseAutoFocus: (event) => {
          var _a, _b;
          (_a = props.onCloseAutoFocus) == null ? void 0 : _a.call(props, event);
          if (!event.defaultPrevented) {
            if (!hasInteractedOutsideRef.current) (_b = context.triggerRef.current) == null ? void 0 : _b.focus();
            event.preventDefault();
          }
          hasInteractedOutsideRef.current = false;
          hasPointerDownOutsideRef.current = false;
        },
        onInteractOutside: (event) => {
          var _a, _b;
          (_a = props.onInteractOutside) == null ? void 0 : _a.call(props, event);
          if (!event.defaultPrevented) {
            hasInteractedOutsideRef.current = true;
            if (event.detail.originalEvent.type === "pointerdown") {
              hasPointerDownOutsideRef.current = true;
            }
          }
          const target = event.target;
          const targetIsTrigger = (_b = context.triggerRef.current) == null ? void 0 : _b.contains(target);
          if (targetIsTrigger) event.preventDefault();
          if (event.detail.originalEvent.type === "focusin" && hasPointerDownOutsideRef.current) {
            event.preventDefault();
          }
        }
      }
    );
  }
);
var DialogContentImpl = reactExports.forwardRef(
  (props, forwardedRef) => {
    const { __scopeDialog, trapFocus, onOpenAutoFocus, onCloseAutoFocus, ...contentProps } = props;
    const context = useDialogContext(CONTENT_NAME, __scopeDialog);
    const contentRef = reactExports.useRef(null);
    const composedRefs = useComposedRefs(forwardedRef, contentRef);
    useFocusGuards();
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        FocusScope,
        {
          asChild: true,
          loop: true,
          trapped: trapFocus,
          onMountAutoFocus: onOpenAutoFocus,
          onUnmountAutoFocus: onCloseAutoFocus,
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            DismissableLayer,
            {
              role: "dialog",
              id: context.contentId,
              "aria-describedby": context.descriptionId,
              "aria-labelledby": context.titleId,
              "data-state": getState(context.open),
              ...contentProps,
              ref: composedRefs,
              onDismiss: () => context.onOpenChange(false)
            }
          )
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(TitleWarning, { titleId: context.titleId }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(DescriptionWarning, { contentRef, descriptionId: context.descriptionId })
      ] })
    ] });
  }
);
var TITLE_NAME = "DialogTitle";
var DialogTitle$1 = reactExports.forwardRef(
  (props, forwardedRef) => {
    const { __scopeDialog, ...titleProps } = props;
    const context = useDialogContext(TITLE_NAME, __scopeDialog);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Primitive.h2, { id: context.titleId, ...titleProps, ref: forwardedRef });
  }
);
DialogTitle$1.displayName = TITLE_NAME;
var DESCRIPTION_NAME = "DialogDescription";
var DialogDescription = reactExports.forwardRef(
  (props, forwardedRef) => {
    const { __scopeDialog, ...descriptionProps } = props;
    const context = useDialogContext(DESCRIPTION_NAME, __scopeDialog);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Primitive.p, { id: context.descriptionId, ...descriptionProps, ref: forwardedRef });
  }
);
DialogDescription.displayName = DESCRIPTION_NAME;
var CLOSE_NAME = "DialogClose";
var DialogClose = reactExports.forwardRef(
  (props, forwardedRef) => {
    const { __scopeDialog, ...closeProps } = props;
    const context = useDialogContext(CLOSE_NAME, __scopeDialog);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      Primitive.button,
      {
        type: "button",
        ...closeProps,
        ref: forwardedRef,
        onClick: composeEventHandlers(props.onClick, () => context.onOpenChange(false))
      }
    );
  }
);
DialogClose.displayName = CLOSE_NAME;
function getState(open) {
  return open ? "open" : "closed";
}
var TITLE_WARNING_NAME = "DialogTitleWarning";
var [WarningProvider, useWarningContext] = createContext2(TITLE_WARNING_NAME, {
  contentName: CONTENT_NAME,
  titleName: TITLE_NAME,
  docsSlug: "dialog"
});
var TitleWarning = ({ titleId }) => {
  const titleWarningContext = useWarningContext(TITLE_WARNING_NAME);
  const MESSAGE = `\`${titleWarningContext.contentName}\` requires a \`${titleWarningContext.titleName}\` for the component to be accessible for screen reader users.

If you want to hide the \`${titleWarningContext.titleName}\`, you can wrap it with our VisuallyHidden component.

For more information, see https://radix-ui.com/primitives/docs/components/${titleWarningContext.docsSlug}`;
  reactExports.useEffect(() => {
    if (titleId) {
      const hasTitle = document.getElementById(titleId);
      if (!hasTitle) console.error(MESSAGE);
    }
  }, [MESSAGE, titleId]);
  return null;
};
var DESCRIPTION_WARNING_NAME = "DialogDescriptionWarning";
var DescriptionWarning = ({ contentRef, descriptionId }) => {
  const descriptionWarningContext = useWarningContext(DESCRIPTION_WARNING_NAME);
  const MESSAGE = `Warning: Missing \`Description\` or \`aria-describedby={undefined}\` for {${descriptionWarningContext.contentName}}.`;
  reactExports.useEffect(() => {
    var _a;
    const describedById = (_a = contentRef.current) == null ? void 0 : _a.getAttribute("aria-describedby");
    if (descriptionId && describedById) {
      const hasDescription = document.getElementById(descriptionId);
      if (!hasDescription) console.warn(MESSAGE);
    }
  }, [MESSAGE, contentRef, descriptionId]);
  return null;
};
var Root = Dialog$1;
var Portal = DialogPortal$1;
var Overlay = DialogOverlay$1;
var Content = DialogContent$1;
var Title = DialogTitle$1;
var Close = DialogClose;
function Dialog({
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Root, { "data-slot": "dialog", ...props });
}
function DialogPortal({
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Portal, { "data-slot": "dialog-portal", ...props });
}
function DialogOverlay({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Overlay,
    {
      "data-slot": "dialog-overlay",
      className: cn(
        "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/50",
        className
      ),
      ...props
    }
  );
}
function DialogContent({
  className,
  children,
  showCloseButton = true,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogPortal, { "data-slot": "dialog-portal", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(DialogOverlay, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      Content,
      {
        "data-slot": "dialog-content",
        className: cn(
          "bg-background data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 fixed top-[50%] left-[50%] z-50 grid w-full max-w-[calc(100%-2rem)] translate-x-[-50%] translate-y-[-50%] gap-4 rounded-lg border p-6 shadow-lg duration-200 sm:max-w-lg",
          className
        ),
        ...props,
        children: [
          children,
          showCloseButton && /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Close,
            {
              "data-slot": "dialog-close",
              className: "ring-offset-background focus:ring-ring data-[state=open]:bg-accent data-[state=open]:text-muted-foreground absolute top-4 right-4 rounded-xs opacity-70 transition-opacity hover:opacity-100 focus:ring-2 focus:ring-offset-2 focus:outline-hidden disabled:pointer-events-none [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(X, {}),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "sr-only", children: "Close" })
              ]
            }
          )
        ]
      }
    )
  ] });
}
function DialogHeader({ className, ...props }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      "data-slot": "dialog-header",
      className: cn("flex flex-col gap-2 text-center sm:text-left", className),
      ...props
    }
  );
}
function DialogTitle({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Title,
    {
      "data-slot": "dialog-title",
      className: cn("text-lg leading-none font-semibold", className),
      ...props
    }
  );
}
function DietOverview() {
  const fileInputRef = reactExports.useRef(null);
  const [image, setImage] = reactExports.useState(null);
  const [isScanning, setIsScanning] = reactExports.useState(false);
  const [scanResult, setScanResult] = reactExports.useState(null);
  const handleImageUpload = (e) => {
    var _a;
    const file = (_a = e.target.files) == null ? void 0 : _a[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      setImage(reader.result);
      startAiScan();
    };
    reader.readAsDataURL(file);
  };
  const startAiScan = async () => {
    setIsScanning(true);
    setScanResult(null);
    await new Promise((r) => setTimeout(r, 2500));
    setScanResult({
      name: "Grilled Chicken & Veggie Bowl",
      confidence: 94,
      calories: 420,
      protein: 38,
      fat: 15,
      fiber: 8,
      carbs: 22
    });
    setIsScanning(false);
    ue.success("Meal analyzed successfully!", { icon: "✨" });
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("style", { children: `
        .glass-panel {
            background: rgba(255, 255, 255, 0.4);
            backdrop-filter: blur(24px);
            -webkit-backdrop-filter: blur(24px);
            border: 1px solid rgba(255, 255, 255, 0.3);
            box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.05);
        }
        .glass-card {
            background: rgba(255, 255, 255, 0.6);
            backdrop-filter: blur(16px);
            -webkit-backdrop-filter: blur(16px);
            border: 1px solid rgba(255, 255, 255, 0.4);
            box-shadow: 0 4px 16px 0 rgba(0, 0, 0, 0.03), inset 0 1px 1px rgba(255, 255, 255, 0.2);
        }
        .specular-highlight {
            border-top: 1px solid rgba(255, 255, 255, 0.6);
            border-left: 1px solid rgba(255, 255, 255, 0.6);
        }
        .progress-ring-circle {
            transition: stroke-dashoffset 0.35s;
            transform: rotate(-90deg);
            transform-origin: 50% 50%;
        }
      ` }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-12 gap-4 mb-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "col-span-12 lg:col-span-8 glass-panel rounded-3xl p-6 specular-highlight", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-start mb-8", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-2xl font-bold text-slate-800 mb-1", children: "Today's Nutrition Flow" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-slate-500", children: "Your metabolic rate is 8% higher than average today." })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "px-4 py-1.5 rounded-full bg-emerald-600 text-white text-xs font-bold shadow-lg shadow-emerald-600/20", children: "Active Analysis" }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 md:grid-cols-4 gap-8", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative w-28 h-28 mb-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "svg",
                {
                  className: "w-full h-full",
                  viewBox: "0 0 100 100",
                  role: "img",
                  "aria-label": "Calories progress",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("title", { children: "Calories progress" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "circle",
                      {
                        className: "text-emerald-100/30 stroke-current",
                        cx: "50",
                        cy: "50",
                        fill: "transparent",
                        r: "40",
                        strokeWidth: "8"
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "circle",
                      {
                        className: "text-emerald-600 stroke-current progress-ring-circle",
                        cx: "50",
                        cy: "50",
                        fill: "transparent",
                        r: "40",
                        strokeDasharray: "251.2",
                        strokeDashoffset: "62.8",
                        strokeLinecap: "round",
                        strokeWidth: "8"
                      }
                    )
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute inset-0 flex flex-col items-center justify-center", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xl font-bold leading-none text-slate-800", children: "1,840" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] font-bold text-slate-500 uppercase tracking-tighter", children: "Kcal" })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-semibold text-slate-700", children: "Calories" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative w-28 h-28 mb-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "svg",
                {
                  className: "w-full h-full",
                  viewBox: "0 0 100 100",
                  role: "img",
                  "aria-label": "Protein progress",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("title", { children: "Protein progress" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "circle",
                      {
                        className: "text-blue-100/30 stroke-current",
                        cx: "50",
                        cy: "50",
                        fill: "transparent",
                        r: "40",
                        strokeWidth: "8"
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "circle",
                      {
                        className: "text-blue-500 stroke-current progress-ring-circle",
                        cx: "50",
                        cy: "50",
                        fill: "transparent",
                        r: "40",
                        strokeDasharray: "251.2",
                        strokeDashoffset: "100.5",
                        strokeLinecap: "round",
                        strokeWidth: "8"
                      }
                    )
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute inset-0 flex flex-col items-center justify-center", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xl font-bold leading-none text-slate-800", children: "142g" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] font-bold text-slate-500 uppercase tracking-tighter", children: "Protein" })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-semibold text-slate-700", children: "Protein" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative w-28 h-28 mb-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "svg",
                {
                  className: "w-full h-full",
                  viewBox: "0 0 100 100",
                  role: "img",
                  "aria-label": "Carbs progress",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("title", { children: "Carbs progress" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "circle",
                      {
                        className: "text-amber-100/30 stroke-current",
                        cx: "50",
                        cy: "50",
                        fill: "transparent",
                        r: "40",
                        strokeWidth: "8"
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "circle",
                      {
                        className: "text-amber-500 stroke-current progress-ring-circle",
                        cx: "50",
                        cy: "50",
                        fill: "transparent",
                        r: "40",
                        strokeDasharray: "251.2",
                        strokeDashoffset: "150.7",
                        strokeLinecap: "round",
                        strokeWidth: "8"
                      }
                    )
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute inset-0 flex flex-col items-center justify-center", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xl font-bold leading-none text-slate-800", children: "185g" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] font-bold text-slate-500 uppercase tracking-tighter", children: "Carbs" })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-semibold text-slate-700", children: "Carbs" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative w-28 h-28 mb-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "svg",
                {
                  className: "w-full h-full",
                  viewBox: "0 0 100 100",
                  role: "img",
                  "aria-label": "Fats progress",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("title", { children: "Fats progress" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "circle",
                      {
                        className: "text-rose-100/30 stroke-current",
                        cx: "50",
                        cy: "50",
                        fill: "transparent",
                        r: "40",
                        strokeWidth: "8"
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "circle",
                      {
                        className: "text-rose-500 stroke-current progress-ring-circle",
                        cx: "50",
                        cy: "50",
                        fill: "transparent",
                        r: "40",
                        strokeDasharray: "251.2",
                        strokeDashoffset: "188.4",
                        strokeLinecap: "round",
                        strokeWidth: "8"
                      }
                    )
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute inset-0 flex flex-col items-center justify-center", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xl font-bold leading-none text-slate-800", children: "52g" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] font-bold text-slate-500 uppercase tracking-tighter", children: "Fats" })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-semibold text-slate-700", children: "Fats" })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "col-span-12 lg:col-span-4 glass-panel rounded-3xl p-6 specular-highlight overflow-hidden relative", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 blur-3xl -mr-16 -mt-16 rounded-full" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative z-10", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 mb-6", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 h-10 bg-emerald-600 rounded-full flex items-center justify-center shadow-lg shadow-emerald-600/20", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-white text-xl", children: "✨" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-xl font-bold text-slate-800", children: "AI Insights" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "glass-card rounded-2xl p-4 border border-emerald-500/20", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-slate-700 mb-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Tip:" }),
                " Increasing fiber intake by 5g during lunch can stabilize your energy levels for the afternoon workout."
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-emerald-700", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm", children: "📈" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-bold", children: "High Impact" })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "glass-card rounded-2xl p-4 border border-blue-500/20", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-slate-700 mb-2", children: "Detected slightly lower hydration levels. Aim for 500ml water in the next hour." }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-blue-600", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm", children: "💧" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-bold", children: "Hydration Alert" })
              ] })
            ] })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "col-span-12 lg:col-span-7 glass-panel rounded-3xl p-6 specular-highlight flex flex-col", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-center mb-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-xl font-bold text-slate-800", children: "Visual Food Analysis" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              type: "file",
              accept: "image/*",
              ref: fileInputRef,
              onChange: handleImageUpload,
              className: "hidden"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.button,
            {
              type: "button",
              whileHover: { scale: 1.05 },
              whileTap: { scale: 0.95 },
              onClick: () => {
                var _a;
                return (_a = fileInputRef.current) == null ? void 0 : _a.click();
              },
              className: "flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-50 hover:bg-emerald-100 transition-colors border border-emerald-200 text-sm font-bold text-emerald-700 shadow-sm",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-lg", children: "📸" }),
                " Scan Meal"
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6 flex-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl overflow-hidden shadow-xl aspect-square relative group bg-slate-100 flex items-center justify-center", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { mode: "wait", children: isScanning ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
              motion.div,
              {
                initial: { opacity: 0 },
                animate: { opacity: 1 },
                exit: { opacity: 0 },
                className: "absolute inset-0 flex flex-col items-center justify-center bg-slate-800/10 backdrop-blur-sm z-10",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-16 h-16 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin mb-4" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-bold text-slate-700 bg-white/80 px-4 py-1.5 rounded-full", children: "Analyzing Nutrients..." })
                ]
              },
              "scanning"
            ) : null }),
            image ? /* @__PURE__ */ jsxRuntimeExports.jsx(
              "img",
              {
                src: image,
                alt: "Scanned Meal",
                className: "w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              }
            ) : /* @__PURE__ */ jsxRuntimeExports.jsx(
              "img",
              {
                alt: "gourmet salmon bowl",
                className: "w-full h-full object-cover group-hover:scale-105 transition-transform duration-700",
                src: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute bottom-4 left-4 right-4 glass-card p-3 rounded-xl border border-white/40 z-20", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-bold text-slate-800 truncate", children: scanResult ? scanResult.name : "Lunch: Roasted Salmon Bowl" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-[11px] text-slate-600 font-medium", children: [
                "Confidence Score: ",
                scanResult ? scanResult.confidence : 98,
                "%"
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col justify-between", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "text-lg font-bold text-emerald-800", children: "Nutritional Breakdown" }),
                scanResult && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "bg-emerald-100 text-emerald-600 text-[10px] font-black px-2 py-0.5 rounded-md uppercase", children: "Live Info" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-center text-sm mb-1", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-slate-700 font-medium", children: "Calories" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-bold text-slate-800", children: [
                    scanResult ? scanResult.calories : 540,
                    " kcal"
                  ] })
                ] }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-center text-sm mb-1.5", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-slate-700", children: "Protein" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-bold text-slate-800", children: [
                      scanResult ? scanResult.protein : 32,
                      "g"
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-full bg-slate-200 rounded-full h-1.5 overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                    motion.div,
                    {
                      initial: { width: 0 },
                      animate: {
                        width: scanResult ? `${Math.min(100, scanResult.protein / 60 * 100)}%` : "85%"
                      },
                      className: "bg-blue-500 h-1.5 rounded-full"
                    }
                  ) })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-center text-sm mb-1.5", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-slate-700", children: "Fat" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-bold text-slate-800", children: [
                      scanResult ? scanResult.fat : 45,
                      "g"
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-full bg-slate-200 rounded-full h-1.5 overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                    motion.div,
                    {
                      initial: { width: 0 },
                      animate: {
                        width: scanResult ? `${Math.min(100, scanResult.fat / 80 * 100)}%` : "40%"
                      },
                      className: "bg-rose-400 h-1.5 rounded-full"
                    }
                  ) })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-center text-sm mb-1.5", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-slate-700", children: "Carbs" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-bold text-slate-800", children: [
                      scanResult ? scanResult.carbs : 24,
                      "g"
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-full bg-slate-200 rounded-full h-1.5 overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                    motion.div,
                    {
                      initial: { width: 0 },
                      animate: {
                        width: scanResult ? `${Math.min(100, scanResult.carbs / 300 * 100)}%` : "65%"
                      },
                      className: "bg-amber-400 h-1.5 rounded-full"
                    }
                  ) })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-center text-sm mb-1.5", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-slate-700", children: "Fiber" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-bold text-slate-800", children: [
                      scanResult ? scanResult.fiber : 12,
                      "g"
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-full bg-slate-200 rounded-full h-1.5 overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                    motion.div,
                    {
                      initial: { width: 0 },
                      animate: {
                        width: scanResult ? `${Math.min(100, scanResult.fiber / 30 * 100)}%` : "80%"
                      },
                      className: "bg-purple-500 h-1.5 rounded-full"
                    }
                  ) })
                ] })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-4 bg-emerald-50/50 rounded-2xl border border-emerald-100 mt-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-emerald-600 mt-0.5", children: "✅" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-emerald-900 leading-tight", children: scanResult ? "This meal is perfectly balanced and aligns with your weight loss goals!" : "Meal matches your 'Keto-Friendly' profile perfectly." })
            ] }) })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "col-span-12 lg:col-span-5 glass-panel rounded-3xl p-6 specular-highlight", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-8", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-xl font-bold text-slate-800", children: "Daily Schedule" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              className: "text-emerald-700 font-bold text-sm hover:underline",
              children: "View Calendar"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1 relative", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute left-4 top-2 bottom-2 w-0.5 bg-slate-200" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative pl-12 pb-6", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute left-2.5 top-1 w-3.5 h-3.5 bg-emerald-500 rounded-full border-2 border-white shadow-sm" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-start mb-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-bold text-slate-400 uppercase tracking-wider", children: "08:00 AM" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "px-2 py-0.5 bg-emerald-100 text-emerald-800 rounded text-[10px] font-bold", children: "COMPLETED" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "glass-card rounded-2xl p-4 flex gap-4 items-center", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "img",
                {
                  alt: "greek yogurt breakfast",
                  className: "w-12 h-12 rounded-xl object-cover",
                  src: "https://images.unsplash.com/photo-1488477181946-6428a0291777?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("h5", { className: "text-sm font-bold text-slate-800", children: "Greek Yogurt Power Bowl" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-slate-500", children: "High-protein breakfast boost" })
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative pl-12 pb-6", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute left-2.5 top-1 w-3.5 h-3.5 bg-emerald-500 rounded-full border-2 border-white shadow-sm ring-4 ring-emerald-500/10" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-start mb-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-bold text-slate-400 uppercase tracking-wider", children: "01:30 PM" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "px-2 py-0.5 bg-blue-100 text-blue-800 rounded text-[10px] font-bold", children: "CURRENT" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "glass-card rounded-2xl p-4 flex gap-4 items-center ring-2 ring-emerald-500/30", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "img",
                {
                  alt: "salmon poke bowl",
                  className: "w-12 h-12 rounded-xl object-cover",
                  src: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("h5", { className: "text-sm font-bold text-slate-800", children: "Seared Salmon & Quinoa" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-slate-500", children: "Omega-3 rich lean energy" })
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative pl-12", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute left-2.5 top-1 w-3.5 h-3.5 bg-slate-200 rounded-full border-2 border-white" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-start mb-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-bold text-slate-400 uppercase tracking-wider", children: "07:00 PM" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "px-2 py-0.5 bg-slate-100 text-slate-500 rounded text-[10px] font-bold", children: "UPCOMING" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "glass-card rounded-2xl p-4 flex gap-4 items-center opacity-70", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "img",
                {
                  alt: "grilled chicken dinner",
                  className: "w-12 h-12 rounded-xl object-cover",
                  src: "https://images.unsplash.com/photo-1532550907401-a500c9a57435?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("h5", { className: "text-sm font-bold text-slate-800", children: "Lemon Herb Grilled Chicken" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-slate-500", children: "Light evening recovery meal" })
              ] })
            ] })
          ] })
        ] })
      ] })
    ] })
  ] });
}
const MEALS = [
  // BREAKFAST
  {
    id: "b1",
    name: "Greek Yogurt Parfait with Berries",
    emoji: "🍓",
    mealType: "breakfast",
    cuisine: "Mediterranean",
    nutrition: { calories: 280, protein: 18, carbs: 34, fat: 6, fiber: 4 },
    tags: ["vegetarian", "high-protein", "quick"],
    prepTime: 5,
    goals: ["weight_loss", "nutrition", "mental_wellness"],
    recipe: {
      ingredients: [
        "1 cup Greek yogurt",
        "1/2 cup mixed berries",
        "2 tbsp granola",
        "1 tsp honey",
        "Mint leaves"
      ],
      steps: [
        "Add Greek yogurt to a bowl",
        "Layer with mixed berries",
        "Sprinkle granola on top",
        "Drizzle honey",
        "Garnish with mint"
      ]
    }
  },
  {
    id: "b2",
    name: "Oatmeal with Banana & Peanut Butter",
    emoji: "🥣",
    mealType: "breakfast",
    cuisine: "American",
    nutrition: { calories: 420, protein: 14, carbs: 68, fat: 10, fiber: 8 },
    tags: ["vegan", "high-protein", "energy"],
    prepTime: 10,
    goals: ["fitness", "nutrition"],
    recipe: {
      ingredients: [
        "1 cup rolled oats",
        "2 cups oat milk",
        "1 banana",
        "2 tbsp peanut butter",
        "1 tsp cinnamon"
      ],
      steps: [
        "Cook oats in milk over medium heat",
        "Stir in cinnamon",
        "Pour into bowl",
        "Slice banana on top",
        "Drizzle peanut butter"
      ]
    }
  },
  {
    id: "b3",
    name: "Avocado Toast with Poached Eggs",
    emoji: "🥑",
    mealType: "breakfast",
    cuisine: "Fusion",
    nutrition: { calories: 380, protein: 16, carbs: 30, fat: 22, fiber: 3 },
    tags: ["vegetarian", "high-protein"],
    prepTime: 15,
    goals: ["mental_wellness", "nutrition"],
    recipe: {
      ingredients: [
        "2 slices whole grain bread",
        "1 ripe avocado",
        "2 eggs",
        "Red chili flakes",
        "Lemon juice",
        "Sea salt"
      ],
      steps: [
        "Toast bread to golden brown",
        "Mash avocado with lemon juice and salt",
        "Poach eggs for 3-4 minutes",
        "Spread avocado on toast",
        "Top with eggs and chili flakes"
      ]
    }
  },
  {
    id: "b4",
    name: "Smoothie Bowl",
    emoji: "🫐",
    mealType: "breakfast",
    cuisine: "Tropical",
    nutrition: { calories: 320, protein: 8, carbs: 60, fat: 5, fiber: 7 },
    tags: ["vegan", "quick", "low-cal"],
    prepTime: 10,
    goals: ["weight_loss", "mental_wellness"],
    recipe: {
      ingredients: [
        "1 frozen banana",
        "1/2 cup frozen blueberries",
        "1/4 cup almond milk",
        "Toppings: granola, seeds, fresh fruit"
      ],
      steps: [
        "Blend frozen banana and blueberries with almond milk",
        "Pour into bowl — it should be thick",
        "Add toppings of your choice",
        "Eat immediately"
      ]
    }
  },
  // LUNCH
  {
    id: "l1",
    name: "Quinoa Power Bowl",
    emoji: "🥗",
    mealType: "lunch",
    cuisine: "Fusion",
    nutrition: { calories: 480, protein: 24, carbs: 62, fat: 14, fiber: 7 },
    tags: ["vegan", "high-protein"],
    prepTime: 25,
    goals: ["fitness", "nutrition"],
    recipe: {
      ingredients: [
        "1 cup cooked quinoa",
        "1/2 cup black beans",
        "1 cup roasted vegetables",
        "2 tbsp tahini dressing",
        "Avocado slices"
      ],
      steps: [
        "Cook quinoa as per instructions",
        "Roast vegetables at 200°C for 20 min",
        "Assemble bowl with quinoa base",
        "Add beans and vegetables",
        "Drizzle tahini and top with avocado"
      ]
    }
  },
  {
    id: "l2",
    name: "Grilled Chicken Salad",
    emoji: "🍗",
    mealType: "lunch",
    cuisine: "Mediterranean",
    nutrition: { calories: 340, protein: 38, carbs: 12, fat: 16, fiber: 3 },
    tags: ["high-protein", "low-cal"],
    prepTime: 20,
    goals: ["weight_loss", "fitness"],
    recipe: {
      ingredients: [
        "150g chicken breast",
        "Mixed greens",
        "Cherry tomatoes",
        "Cucumber",
        "Olive oil & lemon dressing"
      ],
      steps: [
        "Season and grill chicken for 6 min per side",
        "Slice and rest for 5 minutes",
        "Toss greens with dressing",
        "Add chicken, tomatoes, cucumber",
        "Serve immediately"
      ]
    }
  },
  {
    id: "l3",
    name: "Lentil Soup with Rye Bread",
    emoji: "🍲",
    mealType: "lunch",
    cuisine: "Middle Eastern",
    nutrition: { calories: 380, protein: 18, carbs: 55, fat: 8, fiber: 6 },
    tags: ["vegan", "quick"],
    prepTime: 30,
    goals: ["disease_prevention", "nutrition"],
    recipe: {
      ingredients: [
        "1 cup red lentils",
        "1 onion",
        "2 garlic cloves",
        "Cumin, turmeric",
        "Vegetable broth",
        "Spinach"
      ],
      steps: [
        "Sauté onion and garlic",
        "Add lentils and spices",
        "Pour in broth and simmer 20 min",
        "Add spinach at the end",
        "Serve with rye bread"
      ]
    }
  },
  {
    id: "l4",
    name: "Salmon Poke Bowl",
    emoji: "🐟",
    mealType: "lunch",
    cuisine: "Japanese",
    nutrition: { calories: 510, protein: 32, carbs: 48, fat: 18, fiber: 6 },
    tags: ["high-protein"],
    prepTime: 15,
    goals: ["mental_wellness", "fitness"],
    recipe: {
      ingredients: [
        "150g sushi-grade salmon",
        "Brown rice",
        "Edamame",
        "Avocado",
        "Soy sauce & sesame oil"
      ],
      steps: [
        "Cook brown rice",
        "Cube salmon and marinate in soy sauce",
        "Arrange rice in bowl",
        "Add salmon, edamame, avocado",
        "Drizzle with sesame oil"
      ]
    }
  },
  // DINNER
  {
    id: "d1",
    name: "Baked Salmon with Sweet Potato",
    emoji: "🐠",
    mealType: "dinner",
    cuisine: "American",
    nutrition: { calories: 520, protein: 38, carbs: 40, fat: 20, fiber: 5 },
    tags: ["high-protein"],
    prepTime: 35,
    goals: ["fitness", "mental_wellness"],
    recipe: {
      ingredients: [
        "200g salmon fillet",
        "1 medium sweet potato",
        "Broccoli florets",
        "Olive oil",
        "Garlic and lemon"
      ],
      steps: [
        "Preheat oven to 200°C",
        "Cube sweet potato and toss with oil",
        "Place salmon and vegetables on tray",
        "Bake for 20-25 minutes",
        "Squeeze lemon before serving"
      ]
    }
  },
  {
    id: "d2",
    name: "Chickpea Curry with Brown Rice",
    emoji: "🍛",
    mealType: "dinner",
    cuisine: "Indian",
    nutrition: { calories: 460, protein: 16, carbs: 72, fat: 12, fiber: 9 },
    tags: ["vegan", "vegetarian"],
    prepTime: 30,
    goals: ["disease_prevention", "weight_loss"],
    recipe: {
      ingredients: [
        "1 can chickpeas",
        "1 cup brown rice",
        "Coconut milk",
        "Tomatoes, onion, garlic",
        "Garam masala, turmeric, cumin"
      ],
      steps: [
        "Cook brown rice separately",
        "Sauté onion and garlic",
        "Add spices and tomatoes",
        "Add chickpeas and coconut milk",
        "Simmer 15 min and serve over rice"
      ]
    }
  },
  {
    id: "d3",
    name: "Stir-Fried Tofu & Vegetables",
    emoji: "🥦",
    mealType: "dinner",
    cuisine: "Asian",
    nutrition: { calories: 360, protein: 20, carbs: 32, fat: 16, fiber: 4 },
    tags: ["vegan", "high-protein", "quick", "low-cal"],
    prepTime: 20,
    goals: ["weight_loss", "nutrition"],
    recipe: {
      ingredients: [
        "200g firm tofu",
        "Mixed vegetables (bell pepper, broccoli, carrot)",
        "Soy sauce, ginger, garlic",
        "Sesame oil",
        "Brown rice or noodles"
      ],
      steps: [
        "Press and cube tofu, pan-fry until golden",
        "Stir-fry vegetables in sesame oil",
        "Add garlic, ginger, soy sauce",
        "Combine tofu and vegetables",
        "Serve over rice or noodles"
      ]
    }
  },
  {
    id: "d4",
    name: "Turkey Meatballs with Zucchini Noodles",
    emoji: "🍝",
    mealType: "dinner",
    cuisine: "Italian",
    nutrition: { calories: 430, protein: 42, carbs: 18, fat: 22, fiber: 3 },
    tags: ["high-protein", "low-cal"],
    prepTime: 30,
    goals: ["weight_loss", "fitness"],
    recipe: {
      ingredients: [
        "300g ground turkey",
        "2 zucchinis (spiralized)",
        "Marinara sauce",
        "Egg, breadcrumbs, herbs",
        "Parmesan"
      ],
      steps: [
        "Mix turkey with egg, breadcrumbs, herbs",
        "Roll into balls and bake 20 min",
        "Spiralize zucchinis",
        "Warm marinara sauce",
        "Serve meatballs over zucchini noodles"
      ]
    }
  },
  // SNACKS
  {
    id: "s1",
    name: "Almond Butter Energy Balls",
    emoji: "🌰",
    mealType: "snacks",
    cuisine: "American",
    nutrition: { calories: 180, protein: 6, carbs: 22, fat: 8, fiber: 3 },
    tags: ["vegan", "quick", "high-protein"],
    prepTime: 15,
    goals: ["fitness", "nutrition"],
    recipe: {
      ingredients: [
        "1 cup oats",
        "3 tbsp almond butter",
        "2 tbsp honey",
        "1/4 cup dark chocolate chips",
        "1 tbsp chia seeds"
      ],
      steps: [
        "Mix all ingredients in a bowl",
        "Refrigerate for 30 minutes",
        "Roll into 12 balls",
        "Store in fridge for up to 1 week"
      ]
    }
  },
  {
    id: "s2",
    name: "Hummus with Rainbow Veggies",
    emoji: "🥕",
    mealType: "snacks",
    cuisine: "Mediterranean",
    nutrition: { calories: 160, protein: 6, carbs: 18, fat: 8, fiber: 3 },
    tags: ["vegan", "vegetarian", "low-cal", "quick"],
    prepTime: 5,
    goals: ["weight_loss", "disease_prevention"],
    recipe: {
      ingredients: [
        "1/2 cup hummus",
        "Carrot sticks",
        "Cucumber slices",
        "Bell pepper strips",
        "Celery sticks"
      ],
      steps: [
        "Wash and cut vegetables",
        "Place hummus in center of plate",
        "Arrange vegetables around hummus",
        "Serve chilled"
      ]
    }
  },
  {
    id: "s3",
    name: "Mixed Nuts & Dark Chocolate",
    emoji: "🍫",
    mealType: "snacks",
    cuisine: "Universal",
    nutrition: { calories: 220, protein: 5, carbs: 16, fat: 16, fiber: 3 },
    tags: ["quick", "vegan"],
    prepTime: 2,
    goals: ["mental_wellness", "disease_prevention"],
    recipe: {
      ingredients: [
        "1/4 cup mixed nuts (almonds, walnuts, cashews)",
        "1 oz dark chocolate (70%+)",
        "Optional: dried cranberries"
      ],
      steps: [
        "Portion nuts into small bowl",
        "Break chocolate into pieces",
        "Mix together",
        "Enjoy mindfully"
      ]
    }
  },
  {
    id: "s4",
    name: "Green Smoothie",
    emoji: "🥬",
    mealType: "snacks",
    cuisine: "Wellness",
    nutrition: { calories: 140, protein: 4, carbs: 26, fat: 3, fiber: 3 },
    tags: ["vegan", "low-cal", "quick"],
    prepTime: 5,
    goals: ["weight_loss", "nutrition"],
    recipe: {
      ingredients: [
        "1 cup spinach",
        "1 banana",
        "1/2 cup cucumber",
        "1 cup coconut water",
        "Ginger slice"
      ],
      steps: [
        "Add all ingredients to blender",
        "Blend until smooth",
        "Pour over ice",
        "Drink immediately"
      ]
    }
  },
  // NEW PCOS & WEIGHT LOSS FOCUSED MEALS
  {
    id: "b5",
    name: "Spinach & Mushroom Omelet",
    emoji: "🍳",
    mealType: "breakfast",
    cuisine: "French",
    nutrition: { calories: 240, protein: 18, carbs: 4, fat: 16, fiber: 2 },
    tags: ["vegetarian", "high-protein", "low-cal"],
    prepTime: 12,
    goals: ["pcos", "weight_loss", "hormonal_health"],
    recipe: {
      ingredients: [
        "2 large eggs",
        "1 cup baby spinach",
        "1/2 cup sliced mushrooms",
        "1 tsp olive oil",
        "Salt & pepper"
      ],
      steps: [
        "Sauté mushrooms and spinach in olive oil",
        "Beat eggs and pour over vegetables",
        "Cook until set, fold and serve"
      ]
    }
  },
  {
    id: "b6",
    name: "Chia Seed Pudding with Almonds",
    emoji: "🍮",
    mealType: "breakfast",
    cuisine: "Modern",
    nutrition: { calories: 290, protein: 9, carbs: 22, fat: 18, fiber: 11 },
    tags: ["vegan", "quick", "low-cal"],
    prepTime: 5,
    goals: ["pcos", "hormonal_health", "nutrition"],
    recipe: {
      ingredients: [
        "3 tbsp chia seeds",
        "1 cup unsweetened almond milk",
        "1/2 tsp vanilla extract",
        "10 crushed almonds",
        "Berries for topping"
      ],
      steps: [
        "Mix chia seeds, milk, and vanilla",
        "Let sit overnight or for 4 hours",
        "Top with almonds and berries"
      ]
    }
  },
  {
    id: "l5",
    name: "Mediterranean Chickpea Salad",
    emoji: "🥗",
    mealType: "lunch",
    cuisine: "Mediterranean",
    nutrition: { calories: 340, protein: 12, carbs: 45, fat: 14, fiber: 12 },
    tags: ["vegan", "vegetarian", "quick"],
    prepTime: 10,
    goals: ["pcos", "weight_loss", "disease_prevention"],
    recipe: {
      ingredients: [
        "1 can chickpeas (rinsed)",
        "1 cucumber (diced)",
        "1 cup cherry tomatoes",
        "1/4 red onion",
        "Lemon-tahini dressing"
      ],
      steps: [
        "Combine all vegetables and chickpeas",
        "Toss with dressing",
        "Garnish with parsley"
      ]
    }
  },
  {
    id: "l6",
    name: "Grilled Salmon with Quinoa & Kale",
    emoji: "🍣",
    mealType: "lunch",
    cuisine: "Healthy",
    nutrition: { calories: 450, protein: 34, carbs: 28, fat: 22, fiber: 6 },
    tags: ["high-protein", "low-cal"],
    prepTime: 25,
    goals: ["pcos", "hormonal_health", "fitness"],
    recipe: {
      ingredients: [
        "150g Salmon fillet",
        "1/2 cup cooked quinoa",
        "2 cups massaged kale",
        "Lemon & garlic"
      ],
      steps: [
        "Grill salmon for 12 minutes",
        "Mix quinoa with kale",
        "Serve salmon over the grain bed"
      ]
    }
  },
  {
    id: "d5",
    name: "Lentil Dal with Steamed Cauliflower",
    emoji: "🥘",
    mealType: "dinner",
    cuisine: "Indian",
    nutrition: { calories: 310, protein: 18, carbs: 42, fat: 6, fiber: 14 },
    tags: ["vegan", "vegetarian", "low-cal"],
    prepTime: 30,
    goals: ["pcos", "weight_loss", "nutrition"],
    recipe: {
      ingredients: [
        "1 cup red lentils",
        "1 onion",
        "Ginger-garlic paste",
        "Turmeric, Cumin",
        "1 head cauliflower"
      ],
      steps: [
        "Cook lentils with spices until soft",
        "Steam cauliflower florets",
        "Serve dal over cauliflower 'rice' or florets"
      ]
    }
  },
  {
    id: "d6",
    name: "Lemon Herb Baked Cod",
    emoji: "🐟",
    mealType: "dinner",
    cuisine: "Coastal",
    nutrition: { calories: 280, protein: 32, carbs: 8, fat: 12, fiber: 4 },
    tags: ["high-protein", "low-cal", "quick"],
    prepTime: 20,
    goals: ["pcos", "weight_loss", "hormonal_health"],
    recipe: {
      ingredients: [
        "200g Cod fillet",
        "Bunch of asparagus",
        "Fresh dill & parsley",
        "Lemon slices",
        "Olive oil"
      ],
      steps: [
        "Place cod and asparagus on a baking sheet",
        "Season with herbs and lemon",
        "Bake at 200°C for 15 minutes"
      ]
    }
  },
  {
    id: "s5",
    name: "Apple Slices with Cinnamon & Nut Butter",
    emoji: "🍏",
    mealType: "snacks",
    cuisine: "Simple",
    nutrition: { calories: 190, protein: 4, carbs: 25, fat: 9, fiber: 5 },
    tags: ["vegan", "quick"],
    prepTime: 3,
    goals: ["pcos", "weight_loss"],
    recipe: {
      ingredients: [
        "1 medium apple",
        "1 tbsp almond butter",
        "Pinch of cinnamon"
      ],
      steps: [
        "Slice the apple",
        "Spread almond butter on slices",
        "Dust with cinnamon"
      ]
    }
  },
  {
    id: "s6",
    name: "Roasted Chickpeas (Spicy)",
    emoji: "🍿",
    mealType: "snacks",
    cuisine: "Modern",
    nutrition: { calories: 150, protein: 7, carbs: 20, fat: 5, fiber: 6 },
    tags: ["vegan", "high-protein"],
    prepTime: 30,
    goals: ["pcos", "weight_loss", "nutrition"],
    recipe: {
      ingredients: [
        "1 can chickpeas",
        "1 tsp olive oil",
        "Paprika, Cumin, Cayenne"
      ],
      steps: [
        "Dry chickpeas thoroughly",
        "Toss with oil and spices",
        "Roast at 200°C for 25 mins until crunchy"
      ]
    }
  },
  {
    id: "b7",
    name: "Quinoa Breakfast Bowl",
    emoji: "🥣",
    mealType: "breakfast",
    cuisine: "Modern",
    nutrition: { calories: 310, protein: 12, carbs: 48, fat: 8, fiber: 9 },
    tags: ["vegan", "high-protein"],
    prepTime: 20,
    goals: ["nutrition", "fitness"],
    recipe: {
      ingredients: [
        "1/2 cup quinoa",
        "1 cup almond milk",
        "Blueberries",
        "Walnuts",
        "Cinnamon"
      ],
      steps: [
        "Cook quinoa in almond milk",
        "Stir in cinnamon",
        "Top with blueberries and walnuts"
      ]
    }
  },
  {
    id: "b8",
    name: "Scrambled Tofu with Turmeric",
    emoji: "🍳",
    mealType: "breakfast",
    cuisine: "Asian-Fusion",
    nutrition: { calories: 220, protein: 16, carbs: 8, fat: 12, fiber: 4 },
    tags: ["vegan", "high-protein", "low-cal"],
    prepTime: 10,
    goals: ["pcos", "hormonal_health", "nutrition"],
    recipe: {
      ingredients: [
        "Firm tofu",
        "Turmeric",
        "Nutritional yeast",
        "Spinach",
        "Bell peppers"
      ],
      steps: [
        "Crumble tofu into a pan",
        "Add spices and chopped peppers",
        "Sauté until heated, add spinach at the end"
      ]
    }
  },
  {
    id: "b9",
    name: "Buckwheat Pancakes",
    emoji: "🥞",
    mealType: "breakfast",
    cuisine: "Traditional",
    nutrition: { calories: 280, protein: 8, carbs: 42, fat: 6, fiber: 7 },
    tags: ["vegetarian", "low-cal"],
    prepTime: 15,
    goals: ["nutrition", "weight_loss"],
    recipe: {
      ingredients: [
        "Buckwheat flour",
        "1 egg",
        "Almond milk",
        "Baking powder",
        "Berries"
      ],
      steps: [
        "Mix dry and wet ingredients",
        "Cook on a non-stick griddle",
        "Serve with fresh berries"
      ]
    }
  },
  {
    id: "b10",
    name: "Poached Eggs on Spinach",
    emoji: "🥚",
    mealType: "breakfast",
    cuisine: "European",
    nutrition: { calories: 190, protein: 14, carbs: 2, fat: 12, fiber: 3 },
    tags: ["vegetarian", "high-protein", "low-cal"],
    prepTime: 10,
    goals: ["weight_loss", "pcos"],
    recipe: {
      ingredients: ["2 Eggs", "2 cups Spinach", "Garlic", "Lemon"],
      steps: [
        "Poach eggs in simmering water",
        "Sauté spinach with garlic",
        "Place eggs over spinach, squeeze lemon"
      ]
    }
  },
  {
    id: "l7",
    name: "Turkey & Avocado Wrap",
    emoji: "🌯",
    mealType: "lunch",
    cuisine: "American",
    nutrition: { calories: 380, protein: 28, carbs: 32, fat: 18, fiber: 8 },
    tags: ["high-protein"],
    prepTime: 5,
    goals: ["fitness", "weight_loss"],
    recipe: {
      ingredients: [
        "Whole grain tortilla",
        "Turkey breast",
        "Avocado",
        "Sprouts",
        "Mustard"
      ],
      steps: [
        "Spread mustard on tortilla",
        "Layer turkey and avocado",
        "Add sprouts and wrap tightly"
      ]
    }
  },
  {
    id: "l8",
    name: "Black Bean & Corn Salad",
    emoji: "🥗",
    mealType: "lunch",
    cuisine: "Mexican",
    nutrition: { calories: 320, protein: 14, carbs: 45, fat: 10, fiber: 15 },
    tags: ["vegan", "vegetarian", "quick"],
    prepTime: 10,
    goals: ["nutrition", "disease_prevention"],
    recipe: {
      ingredients: [
        "Black beans",
        "Corn",
        "Red bell pepper",
        "Cilantro",
        "Lime-olive oil dressing"
      ],
      steps: [
        "Mix all ingredients in a bowl",
        "Toss with lime dressing",
        "Serve chilled"
      ]
    }
  },
  {
    id: "l9",
    name: "Grilled Shrimp Skewers",
    emoji: "🍤",
    mealType: "lunch",
    cuisine: "Coastal",
    nutrition: { calories: 260, protein: 32, carbs: 6, fat: 10, fiber: 2 },
    tags: ["high-protein", "low-cal", "quick"],
    prepTime: 15,
    goals: ["fitness", "pcos"],
    recipe: {
      ingredients: ["Shrimp", "Zucchini", "Cherry tomatoes", "Lemon", "Garlic"],
      steps: [
        "Thread shrimp and veggies onto skewers",
        "Grill for 3 mins per side",
        "Squeeze lemon over before serving"
      ]
    }
  },
  {
    id: "l10",
    name: "Miso Soup with Tofu",
    emoji: "🥣",
    mealType: "lunch",
    cuisine: "Japanese",
    nutrition: { calories: 150, protein: 10, carbs: 12, fat: 6, fiber: 3 },
    tags: ["vegan", "low-cal", "quick"],
    prepTime: 10,
    goals: ["nutrition", "mental_wellness"],
    recipe: {
      ingredients: [
        "Miso paste",
        "Tofu",
        "Seaweed",
        "Green onions",
        "Dashi or water"
      ],
      steps: [
        "Heat water and dissolve miso",
        "Add cubed tofu and seaweed",
        "Simmer for 2 mins, garnish with onions"
      ]
    }
  },
  {
    id: "d7",
    name: "Roasted Chicken with Root Veggies",
    emoji: "🍗",
    mealType: "dinner",
    cuisine: "Rustic",
    nutrition: { calories: 420, protein: 36, carbs: 28, fat: 16, fiber: 6 },
    tags: ["high-protein"],
    prepTime: 45,
    goals: ["fitness", "nutrition"],
    recipe: {
      ingredients: [
        "Chicken breast",
        "Carrots",
        "Parsnips",
        "Rosemary",
        "Olive oil"
      ],
      steps: [
        "Toss veggies with oil and herbs",
        "Place chicken and veggies on tray",
        "Roast at 200°C for 35 mins"
      ]
    }
  },
  {
    id: "d8",
    name: "Zucchini Lasagna",
    emoji: "🍝",
    mealType: "dinner",
    cuisine: "Italian",
    nutrition: { calories: 340, protein: 24, carbs: 14, fat: 22, fiber: 4 },
    tags: ["vegetarian", "low-cal"],
    prepTime: 40,
    goals: ["pcos", "weight_loss"],
    recipe: {
      ingredients: [
        "Zucchini slices",
        "Ricotta cheese",
        "Marinara sauce",
        "Mozzarella",
        "Spinach"
      ],
      steps: [
        "Layer zucchini 'noodles' with cheese and sauce",
        "Bake at 180°C for 30 mins",
        "Let rest before serving"
      ]
    }
  },
  {
    id: "d9",
    name: "Spaghetti Squash Marinara",
    emoji: "🍝",
    mealType: "dinner",
    cuisine: "Healthy-Italian",
    nutrition: { calories: 210, protein: 6, carbs: 32, fat: 8, fiber: 7 },
    tags: ["vegan", "vegetarian", "low-cal"],
    prepTime: 30,
    goals: ["weight_loss", "nutrition"],
    recipe: {
      ingredients: [
        "Spaghetti squash",
        "Tomato sauce",
        "Fresh basil",
        "Mushrooms"
      ],
      steps: [
        "Roast and scrape squash into strands",
        "Sauté mushrooms in sauce",
        "Toss squash with sauce and basil"
      ]
    }
  },
  {
    id: "d10",
    name: "Baked Trout with Herbs",
    emoji: "🐟",
    mealType: "dinner",
    cuisine: "Nordic",
    nutrition: { calories: 320, protein: 34, carbs: 4, fat: 18, fiber: 2 },
    tags: ["high-protein", "low-cal"],
    prepTime: 20,
    goals: ["hormonal_health", "fitness"],
    recipe: {
      ingredients: [
        "Trout fillet",
        "Fresh dill",
        "Lemon",
        "Garlic",
        "Asparagus"
      ],
      steps: [
        "Place trout and asparagus on parchment",
        "Add herbs and lemon",
        "Bake at 190°C for 15 mins"
      ]
    }
  },
  {
    id: "s7",
    name: "Greek Yogurt & Pumpkin Seeds",
    emoji: "🥣",
    mealType: "snacks",
    cuisine: "Simple",
    nutrition: { calories: 160, protein: 12, carbs: 8, fat: 8, fiber: 2 },
    tags: ["vegetarian", "high-protein", "quick"],
    prepTime: 2,
    goals: ["nutrition", "pcos"],
    recipe: {
      ingredients: ["Greek yogurt", "Pumpkin seeds", "Pinch of salt"],
      steps: ["Top yogurt with seeds", "Stir and enjoy"]
    }
  },
  {
    id: "s8",
    name: "Celery with Almond Butter",
    emoji: "🥬",
    mealType: "snacks",
    cuisine: "Classic",
    nutrition: { calories: 120, protein: 4, carbs: 6, fat: 10, fiber: 3 },
    tags: ["vegan", "low-cal", "quick"],
    prepTime: 3,
    goals: ["weight_loss", "nutrition"],
    recipe: {
      ingredients: ["Celery stalks", "Almond butter"],
      steps: [
        "Wash celery",
        "Spread almond butter in the hollow",
        "Eat immediately"
      ]
    }
  },
  {
    id: "s9",
    name: "Air-Popped Popcorn",
    emoji: "🍿",
    mealType: "snacks",
    cuisine: "Light",
    nutrition: { calories: 110, protein: 3, carbs: 18, fat: 2, fiber: 4 },
    tags: ["vegan", "low-cal", "quick"],
    prepTime: 5,
    goals: ["weight_loss", "nutrition"],
    recipe: {
      ingredients: ["Popcorn kernels", "Nutritional yeast", "Spices"],
      steps: [
        "Pop kernels using air popper",
        "Toss with nutritional yeast",
        "Add spices like chili or garlic"
      ]
    }
  },
  {
    id: "s10",
    name: "Frozen Grapes",
    emoji: "🍇",
    mealType: "snacks",
    cuisine: "Cold",
    nutrition: { calories: 70, protein: 1, carbs: 18, fat: 0, fiber: 1 },
    tags: ["vegan", "low-cal"],
    prepTime: 2,
    goals: ["weight_loss", "mental_wellness"],
    recipe: {
      ingredients: ["Red or green grapes"],
      steps: [
        "Wash and dry grapes",
        "Freeze for at least 4 hours",
        "Enjoy as a sweet, cold treat"
      ]
    }
  },
  {
    id: "b11",
    name: "Salmon & Asparagus Frittata",
    emoji: "🍳",
    mealType: "breakfast",
    cuisine: "Italian-Inspired",
    nutrition: { calories: 260, protein: 22, carbs: 6, fat: 16, fiber: 3 },
    tags: ["vegetarian", "high-protein", "low-cal"],
    prepTime: 20,
    goals: ["pcos", "hormonal_health", "nutrition"],
    recipe: {
      ingredients: [
        "3 eggs",
        "Smoked salmon pieces",
        "Asparagus tips",
        "Dill",
        "Red onion"
      ],
      steps: [
        "Whisk eggs with dill",
        "Sauté onions and asparagus",
        "Pour eggs over and bake or cook until firm",
        "Add salmon at the end"
      ]
    }
  },
  {
    id: "l11",
    name: "Lentil & Pomegranate Salad",
    emoji: "🥗",
    mealType: "lunch",
    cuisine: "Middle Eastern",
    nutrition: { calories: 310, protein: 14, carbs: 42, fat: 12, fiber: 11 },
    tags: ["vegan", "vegetarian"],
    prepTime: 15,
    goals: ["nutrition", "disease_prevention"],
    recipe: {
      ingredients: [
        "Cooked green lentils",
        "Pomegranate seeds",
        "Cucumber",
        "Mint",
        "Lemon-Olive oil dressing"
      ],
      steps: [
        "Combine all ingredients in a bowl",
        "Drizzle with dressing",
        "Garnish with extra mint"
      ]
    }
  },
  {
    id: "d11",
    name: "Quinoa Stuffed Peppers",
    emoji: "🫑",
    mealType: "dinner",
    cuisine: "Mediterranean",
    nutrition: { calories: 380, protein: 16, carbs: 48, fat: 14, fiber: 10 },
    tags: ["vegetarian", "high-protein"],
    prepTime: 45,
    goals: ["weight_loss", "nutrition"],
    recipe: {
      ingredients: [
        "Bell peppers",
        "Cooked quinoa",
        "Black beans",
        "Feta cheese",
        "Tomato sauce"
      ],
      steps: [
        "Mix quinoa, beans, and sauce",
        "Stuff into hollowed peppers",
        "Top with feta and bake at 190°C for 35 mins"
      ]
    }
  },
  {
    id: "s11",
    name: "Edamame with Sea Salt",
    emoji: "🫛",
    mealType: "snacks",
    cuisine: "Japanese",
    nutrition: { calories: 120, protein: 11, carbs: 9, fat: 5, fiber: 5 },
    tags: ["vegan", "high-protein", "quick"],
    prepTime: 5,
    goals: ["fitness", "pcos"],
    recipe: {
      ingredients: ["Edamame pods", "Flaky sea salt"],
      steps: [
        "Steam or boil edamame for 5 mins",
        "Drain and sprinkle with sea salt",
        "Serve warm"
      ]
    }
  },
  {
    id: "s12",
    name: "Cottage Cheese & Pineapple",
    emoji: "🥣",
    mealType: "snacks",
    cuisine: "Simple",
    nutrition: { calories: 140, protein: 14, carbs: 16, fat: 2, fiber: 1 },
    tags: ["vegetarian", "high-protein", "quick"],
    prepTime: 2,
    goals: ["fitness", "weight_loss"],
    recipe: {
      ingredients: ["Low-fat cottage cheese", "Pineapple chunks"],
      steps: [
        "Place cottage cheese in a bowl",
        "Top with fresh pineapple",
        "Enjoy immediately"
      ]
    }
  }
];
const TABS = [
  { key: "breakfast", label: "Breakfast", emoji: "🌅" },
  { key: "lunch", label: "Lunch", emoji: "☀️" },
  { key: "dinner", label: "Dinner", emoji: "🌙" },
  { key: "snacks", label: "Snacks", emoji: "🍎" }
];
const FILTER_TAGS = [
  { key: "vegetarian", label: "🥬 Vegetarian" },
  { key: "vegan", label: "🌱 Vegan" },
  { key: "high-protein", label: "💪 High-Protein" },
  { key: "low-cal", label: "⚡ Low-Cal" },
  { key: "quick", label: "⏱ Under 30 min" },
  { key: "pcos-friendly", label: "🌸 PCOS Friendly" }
];
const GOAL_LABELS = {
  weight_loss: "Weight Loss",
  mental_wellness: "Mental Wellness",
  fitness: "Fitness",
  nutrition: "Nutrition",
  disease_prevention: "Disease Prevention",
  pcos: "PCOS Management",
  hormonal_health: "Hormonal Balance"
};
const LIFESTYLE_LABELS = {
  sedentary: "Sedentary",
  active: "Active",
  athletic: "Athletic"
};
const MACRO_COLORS = ["#3b82f6", "#14b8a6", "#f59e0b", "#ef4444"];
function DietPage() {
  const { userProfile } = useHealthStore();
  const { data: favorites, isLoading: favsLoading } = useDietFavorites();
  const addFavorite = useAddDietFavorite();
  const removeFavorite = useRemoveDietFavorite();
  const [activeTab, setActiveTab] = reactExports.useState(
    "breakfast"
  );
  const [activeFilters, setActiveFilters] = reactExports.useState(/* @__PURE__ */ new Set());
  const [selectedMeal, setSelectedMeal] = reactExports.useState(null);
  const favoriteNames = new Set((favorites ?? []).map((f) => f.mealName));
  const toggleFilter = (tag) => {
    setActiveFilters((prev) => {
      const next = new Set(prev);
      if (next.has(tag)) next.delete(tag);
      else next.add(tag);
      return next;
    });
  };
  const toggleFavorite = (meal) => {
    const existing = (favorites ?? []).find((f) => f.mealName === meal.name);
    if (existing) {
      removeFavorite.mutate(existing.id);
      ue.success("Removed from favorites");
    } else {
      addFavorite.mutate({
        mealName: meal.name,
        calories: meal.nutrition.calories,
        category: meal.mealType
      });
      ue.success("Added to favorites ❤️");
    }
  };
  const displayedMeals = reactExports.useMemo(() => {
    if (activeTab === "favorites") return [];
    const tabMeals = MEALS.filter((m) => m.mealType === activeTab);
    if (activeFilters.size === 0) return tabMeals;
    return tabMeals.filter(
      (m) => [...activeFilters].every((f) => {
        if (f === "quick") return m.prepTime <= 30;
        if (f === "pcos-friendly") return m.goals.includes("pcos");
        return m.tags.includes(f);
      })
    );
  }, [activeTab, activeFilters]);
  const favoriteMeals = reactExports.useMemo(() => {
    if (activeTab !== "favorites") return [];
    const favNames = new Set((favorites ?? []).map((f) => f.mealName));
    return MEALS.filter((m) => favNames.has(m.name));
  }, [activeTab, favorites]);
  const mealsToRender = activeTab === "favorites" ? favoriteMeals : displayedMeals;
  const macroData = selectedMeal ? [
    { name: "Protein", value: selectedMeal.nutrition.protein },
    { name: "Carbs", value: selectedMeal.nutrition.carbs },
    { name: "Fat", value: selectedMeal.nutrition.fat },
    { name: "Fiber", value: selectedMeal.nutrition.fiber }
  ] : [];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      "data-ocid": "diet.page",
      className: "p-4 md:p-6 space-y-6 max-w-5xl mx-auto",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            initial: { opacity: 0, y: -16 },
            animate: { opacity: 1, y: 0 },
            className: "flex items-center gap-3",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-12 h-12 rounded-2xl bg-gradient-to-br from-green-400 to-teal-500 flex items-center justify-center shadow-subtle", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-2xl", children: "🥗" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl md:text-3xl font-display font-bold bg-gradient-to-r from-green-500 to-teal-500 bg-clip-text text-transparent", children: "Diet & Nutrition" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Personalized meal recommendations for your goals" })
              ] })
            ]
          }
        ),
        userProfile && /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            initial: { opacity: 0, y: 8 },
            animate: { opacity: 1, y: 0 },
            transition: { delay: 0.1 },
            className: "bg-gradient-to-r from-green-50 to-teal-50 dark:from-green-900/20 dark:to-teal-900/20 border border-green-200 dark:border-green-800 rounded-xl p-4 flex flex-wrap items-center gap-3",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-green-600 dark:text-green-400 font-semibold text-sm", children: "📊 Based on your profile:" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Badge,
                  {
                    variant: "secondary",
                    className: "bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 border-0",
                    children: LIFESTYLE_LABELS[userProfile.lifestyle]
                  }
                ),
                userProfile.goals.slice(0, 3).map((g) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Badge,
                  {
                    variant: "secondary",
                    className: "bg-teal-100 dark:bg-teal-900/30 text-teal-800 dark:text-teal-300 border-0",
                    children: GOAL_LABELS[g]
                  },
                  g
                ))
              ] })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(DietOverview, {}),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            initial: { opacity: 0 },
            animate: { opacity: 1 },
            transition: { delay: 0.15 },
            className: "flex flex-wrap gap-2",
            children: [
              FILTER_TAGS.map((f) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  "data-ocid": `diet.filter_${f.key}.toggle`,
                  onClick: () => toggleFilter(f.key),
                  className: `px-3 py-1.5 rounded-full text-xs font-medium transition-all border ${activeFilters.has(f.key) ? "gradient-primary text-white border-transparent shadow-subtle" : "border-border text-muted-foreground hover:border-primary/40 hover:text-foreground"}`,
                  children: f.label
                },
                f.key
              )),
              activeFilters.size > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "button",
                {
                  type: "button",
                  onClick: () => setActiveFilters(/* @__PURE__ */ new Set()),
                  className: "px-3 py-1.5 rounded-full text-xs font-medium text-muted-foreground border border-border hover:text-foreground flex items-center gap-1 transition-colors",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(X, { size: 10 }),
                    " Clear"
                  ]
                }
              )
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            "data-ocid": "diet.tabs",
            className: "flex gap-1 bg-muted/40 p-1 rounded-xl",
            children: [
              TABS.map((t) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "button",
                {
                  type: "button",
                  "data-ocid": `diet.${t.key}.tab`,
                  onClick: () => setActiveTab(t.key),
                  className: `flex-1 flex items-center justify-center gap-1.5 py-2 px-2 rounded-lg text-xs sm:text-sm font-medium transition-all ${activeTab === t.key ? "gradient-primary text-white shadow-subtle" : "text-muted-foreground hover:text-foreground"}`,
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "hidden sm:inline", children: t.emoji }),
                    t.label
                  ]
                },
                t.key
              )),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "button",
                {
                  type: "button",
                  "data-ocid": "diet.favorites.tab",
                  onClick: () => setActiveTab("favorites"),
                  className: `flex-1 flex items-center justify-center gap-1.5 py-2 px-2 rounded-lg text-xs sm:text-sm font-medium transition-all ${activeTab === "favorites" ? "gradient-primary text-white shadow-subtle" : "text-muted-foreground hover:text-foreground"}`,
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Heart, { size: 14 }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "hidden sm:inline", children: "Favorites" })
                  ]
                }
              )
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            initial: { opacity: 0, y: 8 },
            animate: { opacity: 1, y: 0 },
            className: "grid grid-cols-1 md:grid-cols-2 gap-4 mb-6",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-red-50/50 dark:bg-red-900/10 border border-red-100 dark:border-red-900/30 rounded-xl p-5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "text-red-600 dark:text-red-400 font-bold text-sm mb-3 flex items-center gap-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-lg", children: "🚫" }),
                  " Foods to Avoid for a Healthy Lifestyle"
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { className: "grid grid-cols-1 sm:grid-cols-2 gap-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "text-sm text-muted-foreground flex gap-2", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-red-400", children: "•" }),
                    " Refined carbs (white bread, white rice, pastries)"
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "text-sm text-muted-foreground flex gap-2", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-red-400", children: "•" }),
                    " Sugary snacks & sweetened beverages (soda, juice)"
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "text-sm text-muted-foreground flex gap-2", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-red-400", children: "•" }),
                    " Processed meats (sausages, deli meats)"
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "text-sm text-muted-foreground flex gap-2", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-red-400", children: "•" }),
                    " Deep-fried & highly processed fast foods"
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "text-sm text-muted-foreground flex gap-2", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-red-400", children: "•" }),
                    " High-glycemic index fruits (dried fruits, canned syrup)"
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "text-sm text-muted-foreground flex gap-2", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-red-400", children: "•" }),
                    " Dairy products (if insulin sensitive)"
                  ] })
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-emerald-50/50 dark:bg-emerald-900/10 border border-emerald-100 dark:border-emerald-900/30 rounded-xl p-5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "text-emerald-600 dark:text-emerald-400 font-bold text-sm mb-3 flex items-center gap-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-lg", children: "💡" }),
                  " Dietary Tips for You"
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { className: "space-y-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "text-sm text-muted-foreground flex gap-2", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-emerald-400", children: "✓" }),
                    " Increase fiber intake (vegetables, legumes)"
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "text-sm text-muted-foreground flex gap-2", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-emerald-400", children: "✓" }),
                    " Add lean protein to every meal to balance blood sugar"
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "text-sm text-muted-foreground flex gap-2", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-emerald-400", children: "✓" }),
                    " Include anti-inflammatory foods (turmeric, omega-3s)"
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "text-sm text-muted-foreground flex gap-2", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-emerald-400", children: "✓" }),
                    " Stay hydrated! Drink at least 2.5L of water daily"
                  ] })
                ] })
              ] })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { mode: "wait", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          motion.div,
          {
            initial: { opacity: 0, y: 8 },
            animate: { opacity: 1, y: 0 },
            exit: { opacity: 0, y: -8 },
            transition: { duration: 0.2 },
            children: activeTab === "favorites" && favsLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4", children: ["a", "b", "c"].map((k) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-48 rounded-2xl" }, k)) }) : mealsToRender.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                "data-ocid": "diet.meals.empty_state",
                className: "py-16 flex flex-col items-center gap-3 text-center",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-5xl opacity-30", children: activeTab === "favorites" ? "💔" : "🥗" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium text-muted-foreground", children: activeTab === "favorites" ? "No favorites yet — heart a meal to save it here!" : "No meals match your filters. Try removing some filters." }),
                  activeTab === "favorites" && /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Button,
                    {
                      variant: "outline",
                      size: "sm",
                      onClick: () => setActiveTab("breakfast"),
                      children: "Browse Meals"
                    }
                  )
                ]
              }
            ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4", children: mealsToRender.map((meal, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
              motion.div,
              {
                "data-ocid": `diet.meal.item.${i + 1}`,
                initial: { opacity: 0, y: 12 },
                animate: { opacity: 1, y: 0 },
                transition: { delay: i * 0.06 },
                className: "bg-card rounded-2xl border border-border shadow-subtle hover:shadow-elevated hover:-translate-y-1 transition-all group relative overflow-hidden",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-1 w-full bg-gradient-to-r from-green-400 to-teal-500 opacity-0 group-hover:opacity-100 transition-opacity" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-5 space-y-3", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-2", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2.5", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 h-10 rounded-xl bg-gradient-to-br from-green-100 to-teal-100 dark:from-green-900/30 dark:to-teal-900/30 flex items-center justify-center text-2xl flex-shrink-0", children: meal.emoji }),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-sm leading-tight", children: meal.name }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-1.5 mt-1", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                            Badge,
                            {
                              variant: "secondary",
                              className: "text-[10px] px-1.5 py-0 h-4",
                              children: meal.cuisine
                            }
                          ) })
                        ] })
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "button",
                        {
                          type: "button",
                          "data-ocid": `diet.favorite_${i + 1}.toggle`,
                          onClick: () => toggleFavorite(meal),
                          className: "flex-shrink-0 p-1.5 rounded-lg hover:bg-muted transition-colors",
                          "aria-label": favoriteNames.has(meal.name) ? "Remove from favorites" : "Add to favorites",
                          children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                            Heart,
                            {
                              size: 16,
                              className: `transition-colors ${favoriteNames.has(meal.name) ? "fill-red-500 text-red-500" : "text-muted-foreground hover:text-red-400"}`
                            }
                          )
                        }
                      )
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-5 gap-1 bg-muted/30 rounded-xl p-2", children: [
                      {
                        label: "Cal",
                        value: meal.nutrition.calories,
                        unit: ""
                      },
                      {
                        label: "Prot",
                        value: meal.nutrition.protein,
                        unit: "g"
                      },
                      {
                        label: "Carbs",
                        value: meal.nutrition.carbs,
                        unit: "g"
                      },
                      { label: "Fat", value: meal.nutrition.fat, unit: "g" },
                      {
                        label: "Fiber",
                        value: meal.nutrition.fiber,
                        unit: "g"
                      }
                    ].map((m) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs font-bold text-foreground", children: [
                        m.value,
                        m.unit
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-muted-foreground", children: m.label })
                    ] }, m.label)) }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-1", children: [
                      meal.tags.slice(0, 3).map((t) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "span",
                        {
                          className: "px-2 py-0.5 rounded-full bg-primary/10 text-primary text-[10px] font-medium",
                          children: t
                        },
                        t
                      )),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "px-2 py-0.5 rounded-full bg-muted text-muted-foreground text-[10px] font-medium flex items-center gap-1", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { size: 9 }),
                        meal.prepTime,
                        "m"
                      ] })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Button,
                      {
                        "data-ocid": `diet.view_recipe_${i + 1}.button`,
                        variant: "outline",
                        size: "sm",
                        className: "w-full text-xs h-8 border-primary/30 text-primary hover:bg-primary/5",
                        onClick: () => setSelectedMeal(meal),
                        children: "View Recipe 📖"
                      }
                    )
                  ] })
                ]
              },
              meal.id
            )) })
          },
          activeTab
        ) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Dialog,
          {
            open: !!selectedMeal,
            onOpenChange: (open) => !open && setSelectedMeal(null),
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              DialogContent,
              {
                "data-ocid": "diet.recipe.dialog",
                className: "max-w-xl max-h-[90vh] overflow-y-auto",
                children: selectedMeal && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogTitle, { className: "flex items-center gap-3 text-lg", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-3xl", children: selectedMeal.emoji }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: selectedMeal.name })
                  ] }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-5 mt-2", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-muted/30 rounded-xl p-4", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "text-xs font-semibold text-muted-foreground mb-3 uppercase tracking-wide", children: "Nutritional Breakdown" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(ResponsiveContainer, { width: 120, height: 120, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(PieChart, { children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            Pie,
                            {
                              data: macroData,
                              cx: "50%",
                              cy: "50%",
                              innerRadius: 32,
                              outerRadius: 52,
                              dataKey: "value",
                              paddingAngle: 2,
                              children: macroData.map((_entry, idx) => /* @__PURE__ */ jsxRuntimeExports.jsx(Cell, { fill: MACRO_COLORS[idx] }, _entry.name))
                            }
                          ),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            Tooltip,
                            {
                              contentStyle: { fontSize: 11, borderRadius: 8 },
                              formatter: (v) => [`${v}g`, ""]
                            }
                          )
                        ] }) }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 space-y-1.5", children: [
                          {
                            label: "Calories",
                            value: `${selectedMeal.nutrition.calories} kcal`,
                            color: MACRO_COLORS[0]
                          },
                          {
                            label: "Protein",
                            value: `${selectedMeal.nutrition.protein}g`,
                            color: MACRO_COLORS[0]
                          },
                          {
                            label: "Carbohydrates",
                            value: `${selectedMeal.nutrition.carbs}g`,
                            color: MACRO_COLORS[1]
                          },
                          {
                            label: "Fat",
                            value: `${selectedMeal.nutrition.fat}g`,
                            color: MACRO_COLORS[2]
                          },
                          {
                            label: "Fiber",
                            value: `${selectedMeal.nutrition.fiber}g`,
                            color: MACRO_COLORS[3]
                          }
                        ].map((m) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                          "div",
                          {
                            className: "flex justify-between text-xs",
                            children: [
                              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-muted-foreground flex items-center gap-1.5", children: [
                                /* @__PURE__ */ jsxRuntimeExports.jsx(
                                  "span",
                                  {
                                    className: "w-2 h-2 rounded-full inline-block flex-shrink-0",
                                    style: { background: m.color }
                                  }
                                ),
                                m.label
                              ] }),
                              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold", children: m.value })
                            ]
                          },
                          m.label
                        )) })
                      ] })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-2", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { variant: "secondary", className: "gap-1", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { size: 12 }),
                        " ",
                        selectedMeal.prepTime,
                        " min prep"
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { variant: "secondary", className: "gap-1", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(Flame, { size: 12 }),
                        " ",
                        selectedMeal.nutrition.calories,
                        " kcal"
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "secondary", children: selectedMeal.cuisine })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "font-semibold text-sm mb-2", children: "🛒 Ingredients" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "space-y-1.5", children: selectedMeal.recipe.ingredients.map((ing) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex items-center gap-2 text-sm", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-1.5 h-1.5 rounded-full bg-accent flex-shrink-0" }),
                        ing
                      ] }, ing)) })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "font-semibold text-sm mb-2", children: "👨‍🍳 Cooking Steps" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("ol", { className: "space-y-2.5", children: selectedMeal.recipe.steps.map((step, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex gap-3 text-sm", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-6 h-6 rounded-full gradient-primary text-white text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5", children: i + 1 }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: step })
                      ] }, step)) })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 pt-2", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        Button,
                        {
                          "data-ocid": "diet.recipe.close_button",
                          variant: "outline",
                          className: "flex-1",
                          onClick: () => setSelectedMeal(null),
                          children: "Close"
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs(
                        Button,
                        {
                          "data-ocid": "diet.recipe.favorite_button",
                          className: "flex-1 gradient-primary border-0 text-white gap-2",
                          onClick: () => {
                            toggleFavorite(selectedMeal);
                          },
                          children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx(
                              Heart,
                              {
                                size: 14,
                                className: favoriteNames.has(selectedMeal.name) ? "fill-white" : ""
                              }
                            ),
                            favoriteNames.has(selectedMeal.name) ? "Unfavorite" : "Save Favorite"
                          ]
                        }
                      )
                    ] })
                  ] })
                ] })
              }
            )
          }
        )
      ]
    }
  );
}
export {
  DietPage as default
};
