import { useState, useEffect, useCallback, useRef } from "react";

/** Returns { ref, width, height } that auto-update on container resize */
export function useResizeObserver<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);
  const [dims, setDims] = useState({ width: 0, height: 0 });

  const update = useCallback((el: T) => {
    const { width, height } = el.getBoundingClientRect();
    setDims({ width: Math.round(width), height: Math.round(height) });
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    update(el);
    const observer = new ResizeObserver(() => update(el));
    observer.observe(el);
    return () => observer.disconnect();
  }, [update]);

  return { ref, ...dims };
}
