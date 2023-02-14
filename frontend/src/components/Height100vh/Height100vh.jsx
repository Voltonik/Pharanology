import React, { useRef, useEffect } from "react";
import { sectionHeight100vh } from "@/utils.js";

function Height100vh({ children, id, className }) {
  const container = useRef(null);
  useEffect(() => {
    sectionHeight100vh(container.current);
    document.addEventListener("resize", () => {
      sectionHeight100vh(container.current);
    });
  }, []);
  return (
    <div ref={container} id={id} className={className}>
      {children}
    </div>
  );
}

export default Height100vh;
