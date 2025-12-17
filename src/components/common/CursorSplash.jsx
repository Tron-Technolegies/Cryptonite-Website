import { useEffect } from "react";
import "../common/CursorSplash.css";

const CursorSplash = () => {
  useEffect(() => {
    let lastTime = 0;

    const createTrail = (x, y) => {
      const trail = document.createElement("span");
      trail.className = "cursor-trail";
      trail.style.left = `${x}px`;
      trail.style.top = `${y}px`;

      document.body.appendChild(trail);

      setTimeout(() => {
        trail.remove();
      }, 450);
    };

    const throttleCreate = (x, y) => {
      const now = Date.now();
      if (now - lastTime < 40) return;
      lastTime = now;
      createTrail(x, y);
    };

    const handleMouseMove = (e) => {
      throttleCreate(e.clientX, e.clientY);
    };

    const handleTouchStart = (e) => {
      const touch = e.touches[0];
      if (!touch) return;
      throttleCreate(touch.clientX, touch.clientY);
    };

    const handleTouchMove = (e) => {
      const touch = e.touches[0];
      if (!touch) return;
      throttleCreate(touch.clientX, touch.clientY);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchmove", handleTouchMove, { passive: true });

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
    };
  }, []);

  return null;
};

export default CursorSplash;
