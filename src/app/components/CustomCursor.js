import { useEffect, useRef } from "react";

export function CustomCursor() {
  const outerRef = useRef(null);
  const innerRef = useRef(null);

  useEffect(() => {
    const outer = outerRef.current;
    const inner = innerRef.current;
    if (!outer || !inner) return;

    let outerX = 0, outerY = 0;
    let mouseX = 0, mouseY = 0;
    let rafId;

    const lerp = (a, b, t) => a + (b - a) * t;

    const animate = () => {
      outerX = lerp(outerX, mouseX, 0.12);
      outerY = lerp(outerY, mouseY, 0.12);
      outer.style.left = outerX + "px";
      outer.style.top = outerY + "px";
      rafId = requestAnimationFrame(animate);
    };

    const onMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      inner.style.left = e.clientX + "px";
      inner.style.top = e.clientY + "px";
    };

    const onMouseEnterInteractive = () => {
      outer.classList.add("hovering");
      inner.classList.add("hovering");
    };
    const onMouseLeaveInteractive = () => {
      outer.classList.remove("hovering");
      inner.classList.remove("hovering");
    };

    const attachListeners = () => {
      document.querySelectorAll("a, button, input, textarea, [data-cursor-hover]").forEach((el) => {
        el.addEventListener("mouseenter", onMouseEnterInteractive);
        el.addEventListener("mouseleave", onMouseLeaveInteractive);
      });
    };

    window.addEventListener("mousemove", onMouseMove);
    rafId = requestAnimationFrame(animate);
    attachListeners();

    const observer = new MutationObserver(attachListeners);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      cancelAnimationFrame(rafId);
      observer.disconnect();
    };
  }, []);

  return (
    <>
      <div ref={outerRef} className="cursor-outer" />
      <div ref={innerRef} className="cursor-inner" />
    </>
  );
}
