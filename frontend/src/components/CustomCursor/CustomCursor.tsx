import { FC, useEffect, useState } from "react";
import { useAppSelector } from "../../store/hooks";
import { Cursor } from "../../types/Cursor";

export const CustomCursor: FC = () => {
  const cursorType = useAppSelector((state) => state.cursor.cursorType);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [showCursor, setShowCursor] = useState(true);

  const { x, y } = position;

  const defaultCursorPath = "/icons/cursor/cursor-small.svg";
  const hoverCursorPath = "/icons/cursor/cursor-big.svg";

  const cursor: Cursor = {
    img: cursorType === "small" ? defaultCursorPath : hoverCursorPath,
    size: cursorType === "small" ? 8 : 32,
  };

  const { img, size } = cursor;

  useEffect(() => {
    const handleMouseLeave = () => setShowCursor(false);
    const handleMouseEnter = () => setShowCursor(true);

    document.documentElement.addEventListener("mouseleave", handleMouseLeave);
    document.documentElement.addEventListener("mouseenter", handleMouseEnter);

    return () => {
      document.documentElement.removeEventListener(
        "mouseleave",
        handleMouseLeave
      );
      document.documentElement.removeEventListener(
        "mouseenter",
        handleMouseEnter
      );
    };
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    document.addEventListener("mousemove", handleMouseMove);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return showCursor ? (
    <div
      style={{
        position: "fixed",
        left: `${x}px`,
        top: `${y}px`,
        width: `${size}px`,
        height: `${size}px`,
        backgroundImage: `url(${img})`,
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundSize: "cover",
        pointerEvents: "none",
        transform: `translate(-50%, -50%) scale(${
          cursorType === "big" ? 1.1 : 1
        })`,
        transition:
          "transform .2s ease-in-out, width .2s ease-in-out, height .2s ease-in-out",
        zIndex: 9999,
      }}
    />
  ) : null;
};
