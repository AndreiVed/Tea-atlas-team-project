import { UserAvatar } from "@/components/UserAvatar";
import { useCursorEffect } from "@/hooks/useCursorEffect";
import { useFetchWithAuth } from "@/hooks/useFetchWithAuth";
import { useScroll } from "@/hooks/useScroll";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { FC, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./ProfilePage.module.scss";
import { DeleteAccount } from "./components/DeleteAccount/DeleteAccount";
import { ManageOption } from "./components/ManageOption";
import { PersonalDetail } from "./components/PersonalDetail";
import { handleFileSelect } from "./handlers";

export const ProfilePage: FC = () => {
  useScroll({ options: { top: 0, behavior: "instant" } });
  const { handleMouseEnter, handleMouseLeave } = useCursorEffect();
  const [showDeleteMsg, setShowDeleteMsg] = useState(false);
  const { userInfo } = useAppSelector((state) => state.profile);
  const { first_name, last_name, email } = userInfo;
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const fetchWithAuth = useFetchWithAuth();

  useEffect(() => {
    if (Object.values(userInfo).every((val) => !val)) {
      navigate("/");
    }
  }, [userInfo, navigate]);

  return (
    <section className={styles["profile"]}>
      <div className={styles["profile__info"]}>
        <div className={styles["profile__info-photo-wrap"]}>
          <label
            className={styles["profile__info-photo-label"]}
            htmlFor="avatarInput"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <input
              className={styles["profile__info-photo-input"]}
              type="file"
              id="avatarInput"
              onChange={(e) =>
                handleFileSelect(e, userInfo, dispatch, fetchWithAuth)
              }
            />
            <UserAvatar usedIn="profile" />
            <div className={styles["profile__info-photo-edit"]} />
          </label>
        </div>
        <h3 className={styles["profile__info-username"]}>
          {first_name + " " + last_name}
        </h3>
        <p className={styles["profile__info-email"]}>{email}</p>
      </div>
      <div className={styles["profile__personal-details"]}>
        <h4 className={styles["profile__personal-details-title"]}>
          Personal details
        </h4>
        <PersonalDetail
          detailType="name"
          detailTitle="Name"
          info={`${first_name} ${last_name}`}
        />
        <PersonalDetail
          detailType="email"
          detailTitle="Email address"
          info={email}
        />
        <PersonalDetail
          detailType="password"
          detailTitle="Password"
          info="*********"
        />
      </div>
      <div className={styles["profile__manage-account"]}>
        <h4 className={styles["profile__manage-account-title"]}>
          Manage account
        </h4>
        <ManageOption
          title="Delete account"
          description="Permanently delete your account"
          buttonText="Delete"
          setShowDeleteMsg={setShowDeleteMsg}
        />
      </div>

      {showDeleteMsg ? (
        <div className={styles["modal-overlay"]}>
          <DeleteAccount setShowDeleteMsg={setShowDeleteMsg} />
        </div>
      ) : null}
    </section>
  );
};
