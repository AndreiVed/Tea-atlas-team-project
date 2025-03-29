import cn from "classnames";
import { FC } from "react";
import { Button } from "../../../../components/Button/Button";
import { FormField } from "../../../../components/FormField";
import { updateEditingDetails } from "../../../../features/profile/profileSlice";
import { useCursorEffect } from "../../../../hooks/useCursorEffect";
import { useAppDispatch, useAppSelector } from "../../../../store/hooks";
import { DetailType } from "../../../../types/DetailType";
import { PersonalDetail } from "../../../../types/PersonalDetail";
import styles from "./EditingPanel.module.scss";

type Props = {
  detailType: DetailType;
  forDetail: PersonalDetail;
};

export const EditingPanel: FC<Props> = ({ detailType, forDetail }) => {
  const { handleMouseEnter, handleMouseLeave } = useCursorEffect();
  const dispatch = useAppDispatch();
  const title = `Edit ${forDetail.toLowerCase()}`;
  const { name, lastName, email } = useAppSelector(
    (state) => state.profile.userInfo
  );

  const addFormField = () => {
    switch (detailType) {
      case "name":
        return (
          <>
            <FormField title="First name" type="text" placeholder={name} />
            <FormField title="Last name" type="text" placeholder={lastName} />
          </>
        );
      case "email":
        return (
          <FormField title="Email address" type="email" placeholder={email} />
        );
      case "password":
        return (
          <>
            <FormField
              title="New password"
              type="text"
              placeholder="Enter password"
            />
            <FormField
              title="Repeat password"
              type="text"
              placeholder="Repeat password"
            />
          </>
        );
    }
  };

  return (
    <div
      className={cn(styles["editing-panel"], {
        [styles["editing-panel--email"]]: detailType === "email",
      })}
    >
      <div className={styles["editing-panel__header"]}>
        <p className={cn(styles["editing-panel__title"], "large-text")}>
          {title}
        </p>
        <button
          className={cn(styles["editing-panel__cancel-btn"], "main-text")}
          onClick={() =>
            dispatch(updateEditingDetails({ field: detailType, value: false }))
          }
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          Cancel
        </button>
      </div>
      <div className={styles["editing-panel__inputs"]}>{addFormField()}</div>
      <div className={styles["editing-panel__save-btn-wrap"]}>
        <Button type="primary" text="save" />
      </div>
    </div>
  );
};
