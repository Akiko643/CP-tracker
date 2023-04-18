import { useRef, useState, useEffect } from "react";

export default function AutoSizeTextarea({ minHeight = 1, value, setValue }) {
  const textAreaRef = useRef(null);

  function getStyle(el, styleProp) {
    if (el.currentStyle) var y = el.currentStyle[styleProp];
    else if (window.getComputedStyle)
      var y = document.defaultView
        .getComputedStyle(el, null)
        .getPropertyValue(styleProp);
    return Number(y.slice(0, y.length - 2));
  }

  useEffect(() => {
    if (textAreaRef.current) {
      // We need to reset the height momentarily to get the correct scrollHeight for the textarea
      textAreaRef.current.style.height = "0px";
      const scrollHeight = textAreaRef.current.scrollHeight;
      // We then set the height directly, outside of the render loop
      // Trying to set this with state or a textAreaRef.current will product an incorrect value.
      textAreaRef.current.style.height =
        Math.max(
          minHeight * getStyle(textAreaRef.current, "line-height"),
          scrollHeight
        ) + "px";
    }
  }, [textAreaRef.current, value]);
  return (
    <textarea
      className="bg-zinc-800 focus:border-none focus:shadow-none focus:outline-none appearance-none resize-none w-full rounded-sm text-white text-xl"
      ref={textAreaRef}
      value={value}
      rows={minHeight}
      onChange={(e) => {
        setValue(e.target.value);
      }}
    />
  );
}
