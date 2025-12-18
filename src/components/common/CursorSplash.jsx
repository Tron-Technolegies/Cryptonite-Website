import { useEffect, useRef } from "react";

const CursorSplash = () => {
  const canvasRef = useRef(null);
  const flows = useRef([]);
  const lastPos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = document.createElement("canvas");
    canvasRef.current = canvas;
    document.body.appendChild(canvas);

    const ctx = canvas.getContext("2d");
    canvas.style.position = "fixed";
    canvas.style.inset = 0;
    canvas.style.pointerEvents = "none";
    canvas.style.zIndex = 9999;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    ctx.globalCompositeOperation = "lighter";

    const addFlow = (x, y) => {
      const dx = x - lastPos.current.x;
      const dy = y - lastPos.current.y;
      const speed = Math.min(Math.sqrt(dx * dx + dy * dy), 40);

      flows.current.push({
        x,
        y,
        dx,
        dy,
        length: speed * 3 + 60,
        width: 28,
        alpha: 0.35,
      });

      if (flows.current.length > 30) {
        flows.current.shift();
      }

      lastPos.current = { x, y };
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      flows.current.forEach((f) => {
        f.alpha *= 0.94;
        f.length *= 0.98;

        const angle = Math.atan2(f.dy, f.dx);

        ctx.save();
        ctx.translate(f.x, f.y);
        ctx.rotate(angle);

        const gradient = ctx.createLinearGradient(
          0,
          0,
          f.length,
          0
        );

        gradient.addColorStop(
          0,
          `rgba(0,195,54,${f.alpha})`
        );
        gradient.addColorStop(
          0.4,
          `rgba(0,195,54,${f.alpha * 0.7})`
        );
        gradient.addColorStop(
          1,
          "rgba(0,195,54,0)"
        );

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.ellipse(
          f.length / 2,
          0,
          f.length / 2,
          f.width,
          0,
          0,
          Math.PI * 2
        );
        ctx.fill();

        ctx.restore();
      });

      flows.current = flows.current.filter(
        (f) => f.alpha > 0.03 && f.length > 10
      );

      requestAnimationFrame(draw);
    };

    draw();

    const move = (e) => addFlow(e.clientX, e.clientY);
    const touchMove = (e) => {
      const t = e.touches[0];
      if (t) addFlow(t.clientX, t.clientY);
    };

    window.addEventListener("mousemove", move);
    window.addEventListener("touchmove", touchMove, {
      passive: true,
    });

    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("touchmove", touchMove);
      window.removeEventListener("resize", resize);
      canvas.remove();
    };
  }, []);

  return null;
};

export default CursorSplash;
