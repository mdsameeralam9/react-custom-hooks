import { useEffect, useRef, useState } from "react";

/**
 * Tracks the user's online/offline status using native browser events.
 */
export default function useOnlineStatus(): boolean {
  const [online, setOnline] = useState<boolean>(navigator.onLine);

  const savedOnlineHandler = useRef<(event: Event) => void>();
  const savedOfflineHandler = useRef<(event: Event) => void>();

  useEffect(() => {
    savedOnlineHandler.current = () => setOnline(true);
    savedOfflineHandler.current = () => setOnline(false);
  }, []);

  useEffect(() => {
    const handleOnline = (event: Event) => {
      if (savedOnlineHandler.current) savedOnlineHandler.current(event);
    };

    const handleOffline = (event: Event) => {
      if (savedOfflineHandler.current) savedOfflineHandler.current(event);
    };

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  return online;
}
