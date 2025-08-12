import { useEffect } from "react";

/**
 * Scrolls the window to the top on mount.
 * Optionally accepts a dependency array to re-trigger on updates.
 */
const useScrollTop = (deps: React.DependencyList = []) => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, deps);
};

export default useScrollTop;
