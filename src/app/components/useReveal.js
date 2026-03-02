import { useEffect } from "react";

/** Attach Intersection Observer to all .reveal elements inside a container */
export function useReveal(dep) {
  useEffect(() => {
    const els = document.querySelectorAll(".reveal:not(.visible)");
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [dep]);
}
