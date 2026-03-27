import * as React from "react";

const Tooltip = ({ children, content, delay = 300 }) => {
  const [show, setShow] = React.useState(false);
  const timeoutRef = React.useRef(null);

  const handleMouseEnter = () => {
    timeoutRef.current = setTimeout(() => {
      setShow(true);
    }, delay);
  };

  const handleMouseLeave = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setShow(false);
  };

  return (
    <div className="relative inline-block w-full" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      {children}
      {show && content && (
        <div className="absolute bottom-full left-1/2 z-50 mb-2 w-48 -translate-x-1/2 rounded-md bg-slate-900 px-3 py-2 text-xs text-white shadow-lg animate-in fade-in zoom-in duration-200">
          {content}
          <div className="absolute -bottom-1 left-1/2 -ml-1 h-2 w-2 rotate-45 bg-slate-900" />
        </div>
      )}
    </div>
  );
};

export default Tooltip;
