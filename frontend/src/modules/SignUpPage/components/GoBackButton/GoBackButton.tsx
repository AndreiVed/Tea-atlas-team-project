import cn from "classnames";
import { FC } from "react";
import { useNavigate } from "react-router-dom";
import { useCursorEffect } from "../../../../hooks/useCursorEffect";
import styles from "./GoBackButton.module.scss";

type Props = {
  to: string;
  cnModifier?: string;
};

export const GoBackButton: FC<Props> = ({ to, cnModifier }) => {
  const { handleMouseEnter, handleMouseLeave } = useCursorEffect();
  const navigate = useNavigate();
  const baseCn = "go-back-button";
  const cnWithModifier = cnModifier ? baseCn + `--${cnModifier}` : '';

  return (
    <button
      className={cn(styles[baseCn], {
        [styles[cnWithModifier]]: cnModifier,
      })}
      onClick={() => navigate(to)}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    />
  );
};
