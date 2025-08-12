import { useEffect, useRef } from "react";

type EventHandler = (event: Event) => void;

/**
 * Attaches an event listener to a target (default is window).
 */
export default function useEventListener<K extends keyof WindowEventMap>(
  eventName: K,
  handler: EventHandler,
  element: Window | Document = window
): void {
  const savedHandler = useRef<EventHandler>();

  useEffect(() => {
    savedHandler.current = handler;
  }, [handler]);

  useEffect(() => {
    const isSupported = element && element.addEventListener;
    if (!isSupported) return;

    const eventListener = (event: Event) => {
      if (savedHandler.current) {
        savedHandler.current(event);
      }
    };

    element.addEventListener(eventName, eventListener);

    return () => {
      element.removeEventListener(eventName, eventListener);
    };
  }, [eventName, element]);
}
