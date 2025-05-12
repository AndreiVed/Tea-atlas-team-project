import cn from "classnames";
import { FC } from "react";
import { updateEditingDetails } from "../../../../features/profile/profileSlice";
import { useCursorEffect } from "../../../../hooks/useCursorEffect";
import { useAppDispatch, useAppSelector } from "../../../../store/hooks";
import { DetailType } from "../../../../types/DetailType";
import { PersonalDetail as PersonalDetailType } from "../../../../types/PersonalDetail";
import { EditingPanel } from "../EditingPanel";
import styles from "./PersonalDetail.module.scss";

type Props = {
  detailType: DetailType;
  detailTitle: PersonalDetailType;
  info: string;
};

export const PersonalDetail: FC<Props> = ({
  detailType,
  detailTitle,
  info,
}) => {
  const { handleMouseEnter, handleMouseLeave } = useCursorEffect();
  const dispatch = useAppDispatch();
  const isEditing = useAppSelector(
    (state) => state.profile.editingDetails[detailType]
  );

  return (
    <>
      {isEditing ? (
        <EditingPanel forDetail={detailTitle} detailType={detailType} />
      ) : null}
      <div
        className={cn(styles["personal-detail"], {
          [styles["personal-detail--email"]]: detailType === "email",
          [styles["personal-detail--editing"]]: isEditing,
        })}
      >
        <div className={styles["personal-detail__info-wrap"]}>
          <p className={cn(styles["personal-detail__title"], "large-text")}>
            {detailTitle}
          </p>
          <p className={cn(styles["personal-detail__info"], "main-text")}>
            {info}
          </p>
        </div>
        <button
          className={cn(styles["personal-detail__edit"], "main-text")}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onClick={() =>
            dispatch(updateEditingDetails({ field: detailType, value: true }))
          }
        >
          Edit
        </button>
      </div>
    </>
  );
};
