import { changeCursorType } from "../features/cursor/cursorSlice";
import { useAppDispatch } from "../store/hooks";

export const useCursorEffect = () => {
  const dispatch = useAppDispatch();

  const handleMouseEnter = () => dispatch(changeCursorType("big"));
  const handleMouseLeave = () => dispatch(changeCursorType("small"));

  return { handleMouseEnter, handleMouseLeave };
};