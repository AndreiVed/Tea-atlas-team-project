import cn from "classnames";
import { FC, useEffect, useState } from "react";
import { GeneralButton } from "../../../../components/GeneralButton/GeneralButton";
import { isEmailCorrect } from "../../../../components/GeneralInput/handlers";
import { API_ENDPOINTS } from "../../../../endpoints";
import {
  updateEditingDetails,
  updateEditingForm,
  updateEditingPassword,
  updateUserInfo,
} from "../../../../features/profile/profileSlice";
import { fetchWithAuth } from "../../../../handlers/fetchWithToken";
import { useCursorEffect } from "../../../../hooks/useCursorEffect";
import { useAppDispatch, useAppSelector } from "../../../../store/hooks";
import { DetailType } from "../../../../types/DetailType";
import { EditingPassword } from "../../../../types/EditingPassword";
import { PersonalDetail } from "../../../../types/PersonalDetail";
import { UserInfo } from "../../../../types/UserInfo";
import styles from "./EditingPanel.module.scss";
import { EditingInput } from "./components/EditingInput";

type Props = {
  detailType: DetailType;
  forDetail: PersonalDetail;
};

export const EditingPanel: FC<Props> = ({ detailType, forDetail }) => {
  const { handleMouseEnter, handleMouseLeave } = useCursorEffect();
  const dispatch = useAppDispatch();
  const title = `Edit ${forDetail.toLowerCase()}`;
  const { editingForm, userInfo, editingPassword, token } = useAppSelector(
    (state) => state.profile
  );
  const { first_name, last_name, email } = editingForm;
  const { new_password1, new_password2 } = editingPassword;
  const [error, setError] = useState("");

  useEffect(() => {
    console.log(editingForm);
  }, [editingForm]);

  const addFormField = () => {
    switch (detailType) {
      case "name":
        return (
          <>
            <EditingInput
              title="First name"
              type="text"
              placeholder={userInfo.first_name || "Jenny"}
              name="first_name"
              value={editingForm.first_name}
            />
            <EditingInput
              title="Last name"
              type="text"
              placeholder={userInfo.last_name || "Wilson"}
              name="last_name"
              value={editingForm.last_name}
            />
          </>
        );
      case "email":
        return (
          <EditingInput
            title="Email address"
            type="email"
            placeholder={userInfo.email}
            value={editingForm.email}
            name="email"
          />
        );
      case "password":
        return (
          <>
            <EditingInput
              title="New password"
              type="password"
              placeholder="Enter password"
              name="new_password1"
              value={editingPassword.new_password1}
              showPasswordRequirements
            />
            <EditingInput
              title="Repeat password"
              type="password"
              placeholder="Repeat password"
              name="new_password2"
              value={editingPassword.new_password2}
            />
          </>
        );
    }
  };

  const parseTempUser = (): FormData => {
    const formData = new FormData();

    const fillFormData = (object: UserInfo | EditingPassword): void => {
      Object.entries(object).forEach(([key, value]) => {
        if (key === "avatar") return; // ignore avatar
        formData.append(key, value);
      });
    };

    switch (forDetail) {
      case "Name":
        fillFormData({ ...userInfo, first_name, last_name });
        break;
      case "Email address":
        fillFormData({ ...userInfo, email });
        break;
      case "Password":
        fillFormData({ new_password1, new_password2 });
    }

    return formData;
  };

  const cleanEditingState = () => {
    switch (forDetail) {
      case "Email address":
        dispatch(updateEditingForm({ ...editingForm, email: "" }));
        dispatch(updateEditingDetails({ field: "email", value: false }));
        break;
      case "Name":
        dispatch(
          updateEditingForm({ ...editingForm, first_name: "", last_name: "" })
        );
        dispatch(updateEditingDetails({ field: "name", value: false }));
        break;
      case "Password":
        dispatch(
          updateEditingPassword({ new_password1: "", new_password2: "" })
        );
        dispatch(updateEditingDetails({ field: "password", value: false }));
    }
  };

  const isDisabled = () => {
    switch (forDetail) {
      case "Email address":
        return !isEmailCorrect(email);
      case "Name":
        return !first_name.length && !last_name.length;
      case "Password":
        return !new_password1.length || new_password1 !== new_password2;
    }
  };

  const handleSubmit = () => {
    fetchWithAuth(API_ENDPOINTS.auth.changeUserData, {
      method: "PATCH",
      body: parseTempUser(),
    }, token)
      .then((data) => {
        dispatch(updateUserInfo(data as UserInfo));
        localStorage.removeItem("user");
        localStorage.setItem("user", JSON.stringify(data));
        cleanEditingState();
      })
      .catch((err) => {
        setError(err.message || 'Something went wrong');
      });
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
      <div
        className={styles["editing-panel__save-btn-wrap"]}
        onClick={() => handleSubmit()}
      >
        <GeneralButton type="primary" text="SAVE" isDisabled={isDisabled()} />
      </div>
      {error && (<p className="main-text">{error}</p>)}
    </div>
  );
};
