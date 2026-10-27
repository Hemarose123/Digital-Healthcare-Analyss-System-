import { c as createLucideIcon, r as reactExports, j as jsxRuntimeExports, h as useComposedRefs, i as cn, m as motion, B as Button, e as Skeleton } from "./index-pQ9MGfeR.js";
import { B as Badge } from "./badge-gNmD_EnI.js";
import { a as useId, P as Primitive, c as composeEventHandlers, b as createContextScope, u as useControllableState, g as useCallbackRef } from "./index-CH17oBHD.js";
import { c as createCollection, u as useDirection } from "./index-B8fHxaj2.js";
import { P as Presence } from "./index-BzoAmXI9.js";
import { v as useHabitData, w as useSaveHabitData } from "./useBackend-CQZwdIO-.js";
import { T as TrendingUp } from "./trending-up-CRZQx78H.js";
import { D as Droplets } from "./droplets-DLw62bPf.js";
import { M as Moon } from "./moon-DnwATDtd.js";
import { F as Flame } from "./flame-zqz5Z4Qv.js";
import { l as generateCategoricalChart, K as Bar, n as formatAxisMap, R as ResponsiveContainer, T as Tooltip, o as ReferenceLine, E as Cell } from "./generateCategoricalChart-C3DVtk1M.js";
import { X as XAxis, Y as YAxis } from "./YAxis-BcFCfMJl.js";
import { C as CartesianGrid } from "./CartesianGrid-tZn-NWhG.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  [
    "path",
    {
      d: "M4 16v-2.38C4 11.5 2.97 10.5 3 8c.03-2.72 1.49-6 4.5-6C9.37 2 10 3.8 10 5.5c0 3.11-2 5.66-2 8.68V16a2 2 0 1 1-4 0Z",
      key: "1dudjm"
    }
  ],
  [
    "path",
    {
      d: "M20 20v-2.38c0-2.12 1.03-3.12 1-5.62-.03-2.72-1.49-6-4.5-6C14.63 6 14 7.8 14 9.5c0 3.11 2 5.66 2 8.68V20a2 2 0 1 0 4 0Z",
      key: "l2t8xc"
    }
  ],
  ["path", { d: "M16 17h4", key: "1dejxt" }],
  ["path", { d: "M4 13h4", key: "1bwh8b" }]
];
const Footprints = createLucideIcon("footprints", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M6 9H4.5a2.5 2.5 0 0 1 0-5H6", key: "17hqa7" }],
  ["path", { d: "M18 9h1.5a2.5 2.5 0 0 0 0-5H18", key: "lmptdp" }],
  ["path", { d: "M4 22h16", key: "57wxv0" }],
  ["path", { d: "M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22", key: "1nw9bq" }],
  ["path", { d: "M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22", key: "1np0yb" }],
  ["path", { d: "M18 2H6v7a6 6 0 0 0 12 0V2Z", key: "u46fv3" }]
];
const Trophy = createLucideIcon("trophy", __iconNode);
var BarChart = generateCategoricalChart({
  chartName: "BarChart",
  GraphicalChild: Bar,
  defaultTooltipEventType: "axis",
  validateTooltipEventTypes: ["axis", "item"],
  axisComponents: [{
    axisType: "xAxis",
    AxisComp: XAxis
  }, {
    axisType: "yAxis",
    AxisComp: YAxis
  }],
  formatAxisMap
});
var ENTRY_FOCUS = "rovingFocusGroup.onEntryFocus";
var EVENT_OPTIONS = { bubbles: false, cancelable: true };
var GROUP_NAME = "RovingFocusGroup";
var [Collection, useCollection, createCollectionScope] = createCollection(GROUP_NAME);
var [createRovingFocusGroupContext, createRovingFocusGroupScope] = createContextScope(
  GROUP_NAME,
  [createCollectionScope]
);
var [RovingFocusProvider, useRovingFocusContext] = createRovingFocusGroupContext(GROUP_NAME);
var RovingFocusGroup = reactExports.forwardRef(
  (props, forwardedRef) => {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Collection.Provider, { scope: props.__scopeRovingFocusGroup, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Collection.Slot, { scope: props.__scopeRovingFocusGroup, children: /* @__PURE__ */ jsxRuntimeExports.jsx(RovingFocusGroupImpl, { ...props, ref: forwardedRef }) }) });
  }
);
RovingFocusGroup.displayName = GROUP_NAME;
var RovingFocusGroupImpl = reactExports.forwardRef((props, forwardedRef) => {
  const {
    __scopeRovingFocusGroup,
    orientation,
    loop = false,
    dir,
    currentTabStopId: currentTabStopIdProp,
    defaultCurrentTabStopId,
    onCurrentTabStopIdChange,
    onEntryFocus,
    preventScrollOnEntryFocus = false,
    ...groupProps
  } = props;
  const ref = reactExports.useRef(null);
  const composedRefs = useComposedRefs(forwardedRef, ref);
  const direction = useDirection(dir);
  const [currentTabStopId, setCurrentTabStopId] = useControllableState({
    prop: currentTabStopIdProp,
    defaultProp: defaultCurrentTabStopId ?? null,
    onChange: onCurrentTabStopIdChange,
    caller: GROUP_NAME
  });
  const [isTabbingBackOut, setIsTabbingBackOut] = reactExports.useState(false);
  const handleEntryFocus = useCallbackRef(onEntryFocus);
  const getItems = useCollection(__scopeRovingFocusGroup);
  const isClickFocusRef = reactExports.useRef(false);
  const [focusableItemsCount, setFocusableItemsCount] = reactExports.useState(0);
  reactExports.useEffect(() => {
    const node = ref.current;
    if (node) {
      node.addEventListener(ENTRY_FOCUS, handleEntryFocus);
      return () => node.removeEventListener(ENTRY_FOCUS, handleEntryFocus);
    }
  }, [handleEntryFocus]);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    RovingFocusProvider,
    {
      scope: __scopeRovingFocusGroup,
      orientation,
      dir: direction,
      loop,
      currentTabStopId,
      onItemFocus: reactExports.useCallback(
        (tabStopId) => setCurrentTabStopId(tabStopId),
        [setCurrentTabStopId]
      ),
      onItemShiftTab: reactExports.useCallback(() => setIsTabbingBackOut(true), []),
      onFocusableItemAdd: reactExports.useCallback(
        () => setFocusableItemsCount((prevCount) => prevCount + 1),
        []
      ),
      onFocusableItemRemove: reactExports.useCallback(
        () => setFocusableItemsCount((prevCount) => prevCount - 1),
        []
      ),
      children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        Primitive.div,
        {
          tabIndex: isTabbingBackOut || focusableItemsCount === 0 ? -1 : 0,
          "data-orientation": orientation,
          ...groupProps,
          ref: composedRefs,
          style: { outline: "none", ...props.style },
          onMouseDown: composeEventHandlers(props.onMouseDown, () => {
            isClickFocusRef.current = true;
          }),
          onFocus: composeEventHandlers(props.onFocus, (event) => {
            const isKeyboardFocus = !isClickFocusRef.current;
            if (event.target === event.currentTarget && isKeyboardFocus && !isTabbingBackOut) {
              const entryFocusEvent = new CustomEvent(ENTRY_FOCUS, EVENT_OPTIONS);
              event.currentTarget.dispatchEvent(entryFocusEvent);
              if (!entryFocusEvent.defaultPrevented) {
                const items = getItems().filter((item) => item.focusable);
                const activeItem = items.find((item) => item.active);
                const currentItem = items.find((item) => item.id === currentTabStopId);
                const candidateItems = [activeItem, currentItem, ...items].filter(
                  Boolean
                );
                const candidateNodes = candidateItems.map((item) => item.ref.current);
                focusFirst(candidateNodes, preventScrollOnEntryFocus);
              }
            }
            isClickFocusRef.current = false;
          }),
          onBlur: composeEventHandlers(props.onBlur, () => setIsTabbingBackOut(false))
        }
      )
    }
  );
});
var ITEM_NAME = "RovingFocusGroupItem";
var RovingFocusGroupItem = reactExports.forwardRef(
  (props, forwardedRef) => {
    const {
      __scopeRovingFocusGroup,
      focusable = true,
      active = false,
      tabStopId,
      children,
      ...itemProps
    } = props;
    const autoId = useId();
    const id = tabStopId || autoId;
    const context = useRovingFocusContext(ITEM_NAME, __scopeRovingFocusGroup);
    const isCurrentTabStop = context.currentTabStopId === id;
    const getItems = useCollection(__scopeRovingFocusGroup);
    const { onFocusableItemAdd, onFocusableItemRemove, currentTabStopId } = context;
    reactExports.useEffect(() => {
      if (focusable) {
        onFocusableItemAdd();
        return () => onFocusableItemRemove();
      }
    }, [focusable, onFocusableItemAdd, onFocusableItemRemove]);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      Collection.ItemSlot,
      {
        scope: __scopeRovingFocusGroup,
        id,
        focusable,
        active,
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          Primitive.span,
          {
            tabIndex: isCurrentTabStop ? 0 : -1,
            "data-orientation": context.orientation,
            ...itemProps,
            ref: forwardedRef,
            onMouseDown: composeEventHandlers(props.onMouseDown, (event) => {
              if (!focusable) event.preventDefault();
              else context.onItemFocus(id);
            }),
            onFocus: composeEventHandlers(props.onFocus, () => context.onItemFocus(id)),
            onKeyDown: composeEventHandlers(props.onKeyDown, (event) => {
              if (event.key === "Tab" && event.shiftKey) {
                context.onItemShiftTab();
                return;
              }
              if (event.target !== event.currentTarget) return;
              const focusIntent = getFocusIntent(event, context.orientation, context.dir);
              if (focusIntent !== void 0) {
                if (event.metaKey || event.ctrlKey || event.altKey || event.shiftKey) return;
                event.preventDefault();
                const items = getItems().filter((item) => item.focusable);
                let candidateNodes = items.map((item) => item.ref.current);
                if (focusIntent === "last") candidateNodes.reverse();
                else if (focusIntent === "prev" || focusIntent === "next") {
                  if (focusIntent === "prev") candidateNodes.reverse();
                  const currentIndex = candidateNodes.indexOf(event.currentTarget);
                  candidateNodes = context.loop ? wrapArray(candidateNodes, currentIndex + 1) : candidateNodes.slice(currentIndex + 1);
                }
                setTimeout(() => focusFirst(candidateNodes));
              }
            }),
            children: typeof children === "function" ? children({ isCurrentTabStop, hasTabStop: currentTabStopId != null }) : children
          }
        )
      }
    );
  }
);
RovingFocusGroupItem.displayName = ITEM_NAME;
var MAP_KEY_TO_FOCUS_INTENT = {
  ArrowLeft: "prev",
  ArrowUp: "prev",
  ArrowRight: "next",
  ArrowDown: "next",
  PageUp: "first",
  Home: "first",
  PageDown: "last",
  End: "last"
};
function getDirectionAwareKey(key, dir) {
  if (dir !== "rtl") return key;
  return key === "ArrowLeft" ? "ArrowRight" : key === "ArrowRight" ? "ArrowLeft" : key;
}
function getFocusIntent(event, orientation, dir) {
  const key = getDirectionAwareKey(event.key, dir);
  if (orientation === "vertical" && ["ArrowLeft", "ArrowRight"].includes(key)) return void 0;
  if (orientation === "horizontal" && ["ArrowUp", "ArrowDown"].includes(key)) return void 0;
  return MAP_KEY_TO_FOCUS_INTENT[key];
}
function focusFirst(candidates, preventScroll = false) {
  const PREVIOUSLY_FOCUSED_ELEMENT = document.activeElement;
  for (const candidate of candidates) {
    if (candidate === PREVIOUSLY_FOCUSED_ELEMENT) return;
    candidate.focus({ preventScroll });
    if (document.activeElement !== PREVIOUSLY_FOCUSED_ELEMENT) return;
  }
}
function wrapArray(array, startIndex) {
  return array.map((_, index) => array[(startIndex + index) % array.length]);
}
var Root = RovingFocusGroup;
var Item = RovingFocusGroupItem;
var TABS_NAME = "Tabs";
var [createTabsContext] = createContextScope(TABS_NAME, [
  createRovingFocusGroupScope
]);
var useRovingFocusGroupScope = createRovingFocusGroupScope();
var [TabsProvider, useTabsContext] = createTabsContext(TABS_NAME);
var Tabs$1 = reactExports.forwardRef(
  (props, forwardedRef) => {
    const {
      __scopeTabs,
      value: valueProp,
      onValueChange,
      defaultValue,
      orientation = "horizontal",
      dir,
      activationMode = "automatic",
      ...tabsProps
    } = props;
    const direction = useDirection(dir);
    const [value, setValue] = useControllableState({
      prop: valueProp,
      onChange: onValueChange,
      defaultProp: defaultValue ?? "",
      caller: TABS_NAME
    });
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      TabsProvider,
      {
        scope: __scopeTabs,
        baseId: useId(),
        value,
        onValueChange: setValue,
        orientation,
        dir: direction,
        activationMode,
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          Primitive.div,
          {
            dir: direction,
            "data-orientation": orientation,
            ...tabsProps,
            ref: forwardedRef
          }
        )
      }
    );
  }
);
Tabs$1.displayName = TABS_NAME;
var TAB_LIST_NAME = "TabsList";
var TabsList$1 = reactExports.forwardRef(
  (props, forwardedRef) => {
    const { __scopeTabs, loop = true, ...listProps } = props;
    const context = useTabsContext(TAB_LIST_NAME, __scopeTabs);
    const rovingFocusGroupScope = useRovingFocusGroupScope(__scopeTabs);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      Root,
      {
        asChild: true,
        ...rovingFocusGroupScope,
        orientation: context.orientation,
        dir: context.dir,
        loop,
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          Primitive.div,
          {
            role: "tablist",
            "aria-orientation": context.orientation,
            ...listProps,
            ref: forwardedRef
          }
        )
      }
    );
  }
);
TabsList$1.displayName = TAB_LIST_NAME;
var TRIGGER_NAME = "TabsTrigger";
var TabsTrigger$1 = reactExports.forwardRef(
  (props, forwardedRef) => {
    const { __scopeTabs, value, disabled = false, ...triggerProps } = props;
    const context = useTabsContext(TRIGGER_NAME, __scopeTabs);
    const rovingFocusGroupScope = useRovingFocusGroupScope(__scopeTabs);
    const triggerId = makeTriggerId(context.baseId, value);
    const contentId = makeContentId(context.baseId, value);
    const isSelected = value === context.value;
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      Item,
      {
        asChild: true,
        ...rovingFocusGroupScope,
        focusable: !disabled,
        active: isSelected,
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          Primitive.button,
          {
            type: "button",
            role: "tab",
            "aria-selected": isSelected,
            "aria-controls": contentId,
            "data-state": isSelected ? "active" : "inactive",
            "data-disabled": disabled ? "" : void 0,
            disabled,
            id: triggerId,
            ...triggerProps,
            ref: forwardedRef,
            onMouseDown: composeEventHandlers(props.onMouseDown, (event) => {
              if (!disabled && event.button === 0 && event.ctrlKey === false) {
                context.onValueChange(value);
              } else {
                event.preventDefault();
              }
            }),
            onKeyDown: composeEventHandlers(props.onKeyDown, (event) => {
              if ([" ", "Enter"].includes(event.key)) context.onValueChange(value);
            }),
            onFocus: composeEventHandlers(props.onFocus, () => {
              const isAutomaticActivation = context.activationMode !== "manual";
              if (!isSelected && !disabled && isAutomaticActivation) {
                context.onValueChange(value);
              }
            })
          }
        )
      }
    );
  }
);
TabsTrigger$1.displayName = TRIGGER_NAME;
var CONTENT_NAME = "TabsContent";
var TabsContent$1 = reactExports.forwardRef(
  (props, forwardedRef) => {
    const { __scopeTabs, value, forceMount, children, ...contentProps } = props;
    const context = useTabsContext(CONTENT_NAME, __scopeTabs);
    const triggerId = makeTriggerId(context.baseId, value);
    const contentId = makeContentId(context.baseId, value);
    const isSelected = value === context.value;
    const isMountAnimationPreventedRef = reactExports.useRef(isSelected);
    reactExports.useEffect(() => {
      const rAF = requestAnimationFrame(() => isMountAnimationPreventedRef.current = false);
      return () => cancelAnimationFrame(rAF);
    }, []);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Presence, { present: forceMount || isSelected, children: ({ present }) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      Primitive.div,
      {
        "data-state": isSelected ? "active" : "inactive",
        "data-orientation": context.orientation,
        role: "tabpanel",
        "aria-labelledby": triggerId,
        hidden: !present,
        id: contentId,
        tabIndex: 0,
        ...contentProps,
        ref: forwardedRef,
        style: {
          ...props.style,
          animationDuration: isMountAnimationPreventedRef.current ? "0s" : void 0
        },
        children: present && children
      }
    ) });
  }
);
TabsContent$1.displayName = CONTENT_NAME;
function makeTriggerId(baseId, value) {
  return `${baseId}-trigger-${value}`;
}
function makeContentId(baseId, value) {
  return `${baseId}-content-${value}`;
}
var Root2 = Tabs$1;
var List = TabsList$1;
var Trigger = TabsTrigger$1;
var Content = TabsContent$1;
function Tabs({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Root2,
    {
      "data-slot": "tabs",
      className: cn("flex flex-col gap-2", className),
      ...props
    }
  );
}
function TabsList({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    List,
    {
      "data-slot": "tabs-list",
      className: cn(
        "bg-muted text-muted-foreground inline-flex h-9 w-fit items-center justify-center rounded-lg p-[3px]",
        className
      ),
      ...props
    }
  );
}
function TabsTrigger({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Trigger,
    {
      "data-slot": "tabs-trigger",
      className: cn(
        "data-[state=active]:bg-background dark:data-[state=active]:text-foreground focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:outline-ring dark:data-[state=active]:border-input dark:data-[state=active]:bg-input/30 text-foreground dark:text-muted-foreground inline-flex h-[calc(100%-1px)] flex-1 items-center justify-center gap-1.5 rounded-md border border-transparent px-2 py-1 text-sm font-medium whitespace-nowrap transition-[color,box-shadow] focus-visible:ring-[3px] focus-visible:outline-1 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:shadow-sm [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className
      ),
      ...props
    }
  );
}
function TabsContent({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Content,
    {
      "data-slot": "tabs-content",
      className: cn("flex-1 outline-none", className),
      ...props
    }
  );
}
const todayStr = () => (/* @__PURE__ */ new Date()).toISOString().split("T")[0] ?? "";
function progressColor(value, max) {
  const pct = value / max;
  if (pct >= 0.9) return "bg-emerald-500";
  if (pct >= 0.6) return "bg-teal-400";
  if (pct >= 0.3) return "bg-amber-400";
  return "bg-rose-400";
}
function sleepLabel(hours) {
  if (hours < 6) return { label: "Poor", color: "text-rose-500" };
  if (hours < 7) return { label: "Fair", color: "text-amber-500" };
  if (hours <= 9) return { label: "Good", color: "text-emerald-500" };
  return { label: "Oversleep", color: "text-amber-400" };
}
function stepsMilestone(steps) {
  if (steps >= 1e4) return "🏆 Daily goal achieved!";
  if (steps >= 7500) return "💪 Almost there, keep going!";
  if (steps >= 5e3) return "🚶 Halfway to your goal";
  if (steps >= 2500) return "👟 Good start, keep moving!";
  return "🎯 Start walking toward your goal";
}
function calcStreak(habits, metric) {
  const sorted = [...habits].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
  let streak = 0;
  for (const h of sorted) {
    const met = metric === "water" ? h.waterGlasses >= 6 : metric === "sleep" ? h.sleepHours >= 7 : h.steps >= 8e3;
    if (met) streak++;
    else break;
  }
  return streak;
}
function getDayLabel(dateStr) {
  return new Date(dateStr).toLocaleDateString("en", { weekday: "short" });
}
function ProgressBar({
  value,
  max,
  colorClass
}) {
  const pct = Math.min(100, value / max * 100);
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-full h-2.5 bg-muted rounded-full overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
    motion.div,
    {
      className: `h-full rounded-full ${colorClass}`,
      initial: { width: 0 },
      animate: { width: `${pct}%` },
      transition: { duration: 0.6, ease: "easeOut" }
    }
  ) });
}
function StreakBadge({
  count,
  label,
  color
}) {
  if (count === 0) return null;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: `flex items-center gap-1.5 px-3 py-1.5 rounded-full border ${color} text-xs font-medium`,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Flame, { size: 12, className: "text-orange-500" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
          count,
          " day",
          count !== 1 ? "s" : "",
          " ",
          label
        ] })
      ]
    }
  );
}
const HABIT_TIPS = [
  {
    icon: "💧",
    tip: "Drink a glass of water first thing in the morning to kickstart your metabolism."
  },
  {
    icon: "🌙",
    tip: "Set a consistent bedtime — even on weekends — to improve sleep quality."
  },
  {
    icon: "👟",
    tip: "Take the stairs and park farther away to add steps without extra effort."
  },
  {
    icon: "🧘",
    tip: "A 5-minute stretch after waking up improves circulation and mood."
  }
];
function WaterChart({ data }) {
  const chartData = data.map((h) => ({
    day: getDayLabel(h.date),
    value: h.waterGlasses
  }));
  return /* @__PURE__ */ jsxRuntimeExports.jsx(ResponsiveContainer, { width: "100%", height: 200, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(BarChart, { data: chartData, barSize: 20, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      CartesianGrid,
      {
        strokeDasharray: "3 3",
        stroke: "oklch(var(--border))",
        vertical: false
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      XAxis,
      {
        dataKey: "day",
        tick: { fontSize: 11 },
        axisLine: false,
        tickLine: false
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      YAxis,
      {
        tick: { fontSize: 11 },
        axisLine: false,
        tickLine: false,
        domain: [0, 10]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      Tooltip,
      {
        contentStyle: {
          background: "oklch(var(--card))",
          border: "1px solid oklch(var(--border))",
          borderRadius: "8px",
          fontSize: 12
        },
        formatter: (v) => [`${v} glasses`, "Water"]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      ReferenceLine,
      {
        y: 8,
        stroke: "#60A5FA",
        strokeDasharray: "4 2",
        strokeWidth: 1.5,
        label: { value: "Goal", fontSize: 10, fill: "#60A5FA" }
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Bar, { dataKey: "value", radius: [5, 5, 0, 0], children: chartData.map((entry) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      Cell,
      {
        fill: entry.value >= 8 ? "#34D399" : entry.value >= 6 ? "#60A5FA" : "#94A3B8"
      },
      `water-${entry.day}`
    )) })
  ] }) });
}
function SleepChart({ data }) {
  const chartData = data.map((h) => ({
    day: getDayLabel(h.date),
    value: h.sleepHours
  }));
  return /* @__PURE__ */ jsxRuntimeExports.jsx(ResponsiveContainer, { width: "100%", height: 200, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(BarChart, { data: chartData, barSize: 20, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      CartesianGrid,
      {
        strokeDasharray: "3 3",
        stroke: "oklch(var(--border))",
        vertical: false
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      XAxis,
      {
        dataKey: "day",
        tick: { fontSize: 11 },
        axisLine: false,
        tickLine: false
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      YAxis,
      {
        tick: { fontSize: 11 },
        axisLine: false,
        tickLine: false,
        domain: [0, 12]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      Tooltip,
      {
        contentStyle: {
          background: "oklch(var(--card))",
          border: "1px solid oklch(var(--border))",
          borderRadius: "8px",
          fontSize: 12
        },
        formatter: (v) => [`${v}h`, "Sleep"]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      ReferenceLine,
      {
        y: 7.5,
        stroke: "#818CF8",
        strokeDasharray: "4 2",
        strokeWidth: 1.5,
        label: { value: "Goal", fontSize: 10, fill: "#818CF8" }
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Bar, { dataKey: "value", radius: [5, 5, 0, 0], children: chartData.map((entry) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      Cell,
      {
        fill: entry.value >= 7 ? "#34D399" : entry.value >= 6 ? "#FBBF24" : "#F87171"
      },
      `sleep-${entry.day}`
    )) })
  ] }) });
}
function StepsChart({ data }) {
  const chartData = data.map((h) => ({
    day: getDayLabel(h.date),
    value: h.steps
  }));
  return /* @__PURE__ */ jsxRuntimeExports.jsx(ResponsiveContainer, { width: "100%", height: 200, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(BarChart, { data: chartData, barSize: 20, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      CartesianGrid,
      {
        strokeDasharray: "3 3",
        stroke: "oklch(var(--border))",
        vertical: false
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      XAxis,
      {
        dataKey: "day",
        tick: { fontSize: 11 },
        axisLine: false,
        tickLine: false
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(YAxis, { tick: { fontSize: 11 }, axisLine: false, tickLine: false }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      Tooltip,
      {
        contentStyle: {
          background: "oklch(var(--card))",
          border: "1px solid oklch(var(--border))",
          borderRadius: "8px",
          fontSize: 12
        },
        formatter: (v) => [`${v.toLocaleString()}`, "Steps"]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      ReferenceLine,
      {
        y: 1e4,
        stroke: "#4ADE80",
        strokeDasharray: "4 2",
        strokeWidth: 1.5,
        label: { value: "Goal", fontSize: 10, fill: "#4ADE80" }
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Bar, { dataKey: "value", radius: [5, 5, 0, 0], children: chartData.map((entry) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      Cell,
      {
        fill: entry.value >= 1e4 ? "#34D399" : entry.value >= 7500 ? "#4ADE80" : "#94A3B8"
      },
      `steps-${entry.day}`
    )) })
  ] }) });
}
function HabitsPage() {
  const { data: habits, isLoading } = useHabitData();
  const saveHabit = useSaveHabitData();
  const todayData = habits == null ? void 0 : habits.find((h) => h.date === todayStr());
  const [water, setWater] = reactExports.useState((todayData == null ? void 0 : todayData.waterGlasses) ?? 0);
  const [sleep, setSleep] = reactExports.useState((todayData == null ? void 0 : todayData.sleepHours) ?? 7);
  const [steps, setSteps] = reactExports.useState((todayData == null ? void 0 : todayData.steps) ?? 0);
  const [saved, setSaved] = reactExports.useState(false);
  reactExports.useEffect(() => {
    if (todayData) {
      setWater(todayData.waterGlasses);
      setSleep(todayData.sleepHours);
      setSteps(todayData.steps);
    }
  }, [todayData]);
  const handleSave = async () => {
    await saveHabit.mutateAsync({
      date: todayStr(),
      waterGlasses: water,
      sleepHours: sleep,
      steps
    });
    setSaved(true);
    setTimeout(() => setSaved(false), 3e3);
  };
  const weekData = reactExports.useMemo(
    () => [...habits ?? []].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()).slice(-7),
    [habits]
  );
  const streaks = reactExports.useMemo(
    () => ({
      water: calcStreak(habits ?? [], "water"),
      sleep: calcStreak(habits ?? [], "sleep"),
      steps: calcStreak(habits ?? [], "steps")
    }),
    [habits]
  );
  const { label: sleepQuality, color: sleepColor } = sleepLabel(sleep);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      "data-ocid": "habits.page",
      className: "p-4 sm:p-6 space-y-6 max-w-4xl mx-auto",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0",
              style: {
                background: "linear-gradient(135deg, oklch(0.72 0.18 145), oklch(0.65 0.2 170))"
              },
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingUp, { size: 20, className: "text-white" })
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-display font-bold gradient-text", children: "Habit Tracker" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Track your daily wellness habits" })
          ] })
        ] }),
        (streaks.water > 0 || streaks.sleep > 0 || streaks.steps > 0) && /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            initial: { opacity: 0, y: -8 },
            animate: { opacity: 1, y: 0 },
            className: "flex flex-wrap gap-2",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                StreakBadge,
                {
                  count: streaks.water,
                  label: "hydration streak",
                  color: "border-blue-200 text-blue-700 dark:border-blue-800 dark:text-blue-300"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                StreakBadge,
                {
                  count: streaks.sleep,
                  label: "sleep streak",
                  color: "border-indigo-200 text-indigo-700 dark:border-indigo-800 dark:text-indigo-300"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                StreakBadge,
                {
                  count: streaks.steps,
                  label: "steps streak",
                  color: "border-emerald-200 text-emerald-700 dark:border-emerald-800 dark:text-emerald-300"
                }
              )
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card rounded-2xl border border-border shadow-subtle p-6 space-y-7", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-semibold font-display", children: "Today's Habits" }),
            saved && /* @__PURE__ */ jsxRuntimeExports.jsxs(
              motion.span,
              {
                initial: { opacity: 0, scale: 0.8 },
                animate: { opacity: 1, scale: 1 },
                className: "text-xs font-medium text-emerald-600 dark:text-emerald-400 flex items-center gap-1",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Trophy, { size: 12 }),
                  " Saved!"
                ]
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-7 h-7 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Droplets,
                  {
                    size: 14,
                    className: "text-blue-600 dark:text-blue-400"
                  }
                ) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium text-sm", children: "Water Intake" }),
                water >= 6 && /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "text-xs bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300 border-0", children: "Well hydrated! 💧" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-sm font-semibold tabular-nums text-blue-600 dark:text-blue-400", children: [
                water,
                " / 8"
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              ProgressBar,
              {
                value: water,
                max: 8,
                colorClass: progressColor(water, 8)
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-1.5 flex-wrap", children: [1, 2, 3, 4, 5, 6, 7, 8].map((glass) => /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                "data-ocid": `habits.water_${glass}.toggle`,
                onClick: () => setWater(glass <= water ? glass - 1 : glass),
                className: `w-10 h-10 rounded-xl text-lg transition-smooth hover:scale-110 ${glass <= water ? "bg-blue-400 shadow-sm scale-105" : "bg-muted hover:bg-blue-100 dark:hover:bg-blue-900/30"}`,
                "aria-label": `${glass} glasses of water`,
                children: "💧"
              },
              `water-glass-${glass}`
            )) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-7 h-7 rounded-lg bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Moon,
                  {
                    size: 14,
                    className: "text-indigo-600 dark:text-indigo-400"
                  }
                ) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium text-sm", children: "Sleep Hours" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `text-xs font-medium ${sleepColor}`, children: sleepQuality })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-sm font-semibold tabular-nums text-indigo-600 dark:text-indigo-400", children: [
                sleep,
                "h"
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              ProgressBar,
              {
                value: sleep,
                max: 9,
                colorClass: sleep < 6 ? "bg-rose-400" : sleep < 7 ? "bg-amber-400" : "bg-emerald-500"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "input",
              {
                "data-ocid": "habits.sleep.input",
                type: "range",
                min: 0,
                max: 12,
                step: 0.5,
                value: sleep,
                onChange: (e) => setSleep(Number(e.target.value)),
                className: "w-full accent-indigo-500 cursor-pointer",
                "aria-label": "Sleep hours slider"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-xs text-muted-foreground", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "0h" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-indigo-500 font-medium", children: "Goal: 7–9h" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "12h" })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-7 h-7 rounded-lg bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Footprints,
                  {
                    size: 14,
                    className: "text-emerald-600 dark:text-emerald-400"
                  }
                ) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium text-sm", children: "Steps" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-sm font-semibold tabular-nums text-emerald-600 dark:text-emerald-400", children: [
                steps.toLocaleString(),
                " / 10,000"
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              ProgressBar,
              {
                value: steps,
                max: 1e4,
                colorClass: progressColor(steps, 1e4)
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: stepsMilestone(steps) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  onClick: () => setSteps((s) => Math.max(0, s - 500)),
                  className: "w-9 h-9 rounded-lg border border-border bg-muted hover:bg-muted/60 flex items-center justify-center text-lg font-bold transition-smooth",
                  "aria-label": "Decrease steps by 500",
                  children: "−"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "input",
                {
                  "data-ocid": "habits.steps.input",
                  type: "number",
                  value: steps,
                  onChange: (e) => setSteps(Math.max(0, Number.parseInt(e.target.value) || 0)),
                  min: 0,
                  max: 99999,
                  className: "flex-1 px-4 py-2.5 rounded-xl border border-input bg-background text-sm text-center font-medium focus:outline-none focus:ring-2 focus:ring-ring",
                  "aria-label": "Steps count"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  onClick: () => setSteps((s) => s + 500),
                  className: "w-9 h-9 rounded-lg border border-border bg-muted hover:bg-muted/60 flex items-center justify-center text-lg font-bold transition-smooth",
                  "aria-label": "Increase steps by 500",
                  children: "+"
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              "data-ocid": "habits.save.primary_button",
              className: "w-full border-0 text-white h-11",
              style: { background: "var(--gradient-primary)" },
              onClick: handleSave,
              disabled: saveHabit.isPending,
              children: saveHabit.isPending ? "Saving..." : "Save Today's Habits"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card rounded-2xl border border-border shadow-subtle p-6 space-y-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "font-semibold font-display flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingUp, { size: 16, className: "text-muted-foreground" }),
            "Weekly Overview"
          ] }),
          isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-52 w-full" }) : weekData.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              "data-ocid": "habits.chart.empty_state",
              className: "h-52 flex flex-col items-center justify-center text-sm text-muted-foreground gap-2",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingUp, { size: 32, className: "opacity-30" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Save today's habits to start your weekly chart" })
              ]
            }
          ) : /* @__PURE__ */ jsxRuntimeExports.jsxs(Tabs, { defaultValue: "water", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsList, { className: "mb-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(TabsTrigger, { "data-ocid": "habits.water_chart.tab", value: "water", children: "💧 Water" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(TabsTrigger, { "data-ocid": "habits.sleep_chart.tab", value: "sleep", children: "🌙 Sleep" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(TabsTrigger, { "data-ocid": "habits.steps_chart.tab", value: "steps", children: "👟 Steps" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsContent, { value: "water", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mb-2", children: "Daily glasses · Target: 8 glasses" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(WaterChart, { data: weekData })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsContent, { value: "sleep", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mb-2", children: "Sleep hours · Target: 7.5h · Green = good, Yellow = fair, Red = poor" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(SleepChart, { data: weekData })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsContent, { value: "steps", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mb-2", children: "Daily steps · Target: 10,000" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(StepsChart, { data: weekData })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card rounded-2xl border border-border shadow-subtle p-6 space-y-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "font-semibold font-display flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Trophy, { size: 16, className: "text-muted-foreground" }),
            "Healthy Habit Tips"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-3", children: HABIT_TIPS.map((tip) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "flex items-start gap-3 p-3 rounded-xl bg-muted/30 border border-border",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xl flex-shrink-0", children: tip.icon }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground leading-relaxed", children: tip.tip })
              ]
            },
            tip.tip
          )) })
        ] })
      ]
    }
  );
}
export {
  HabitsPage as default
};
