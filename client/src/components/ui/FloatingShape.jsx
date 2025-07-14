import React, { useRef, useEffect } from "react";
import gsap from "gsap";

const FloatingShape = ({ icon: Icon, color, size, top, left, delay = 0 }) => {
  const shapeRef = useRef();

  useEffect(() => {
    const el = shapeRef.current;

    const tl = gsap.timeline({ repeat: -1, delay });

    tl.to(el, {
      y: "100%",
      x: "100%",
      rotate: 360,
      duration: 10,
      ease: "linear",
    }).to(el, {
      y: "0%",
      x: "0%",
      rotate: 0,
      duration: 10,
      ease: "linear",
    });

    return () => tl.kill(); // Clean up
  }, [delay]);

  return (
    <div ref={shapeRef} className="absolute" style={{ top, left }}>
      <Icon className={`${color} ${size} opacity-50 blur-lg`} strokeWidth={1} />
    </div>
  );
};

export default FloatingShape;
