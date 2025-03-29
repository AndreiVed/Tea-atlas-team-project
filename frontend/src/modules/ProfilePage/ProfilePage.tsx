import { FC, useState } from "react";
import { useCursorEffect } from "../../hooks/useCursorEffect";
import { useScroll } from "../../hooks/useScroll";
import styles from "./ProfilePage.module.scss";
import { DeleteAccount } from "./components/DeleteAccount/DeleteAccount";
import { ManageOption } from "./components/ManageOption";
import { PersonalDetail } from "./components/PersonalDetail";
import { handleFileSelect } from "./handlers";

export const ProfilePage: FC = () => {
  useScroll({ options: { top: 0, behavior: "instant" } });
  const { handleMouseEnter, handleMouseLeave } = useCursorEffect();
  const [showDeleteMsg, setShowDeleteMsg] = useState(false);
  const [userAvatarSrc, setUserAvatarSrc] = useState<string | null>(null);

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
              onChange={(e) => handleFileSelect(e, setUserAvatarSrc)}
            />
            <img
              className={styles["profile__info-photo"]}
              src={userAvatarSrc ? userAvatarSrc : "/user/images.jpg"}
              alt="Profile photo"
            />
            <div className={styles["profile__info-photo-edit"]} />
          </label>
        </div>
        <h3 className={styles["profile__info-username"]}>
          Volodymyr Zelenskyi
        </h3>
        <p className={styles["profile__info-email"]}>
          volodymyr-zelenskyi@loves-tea.com
        </p>
      </div>
      <div className={styles["profile__personal-details"]}>
        <h4 className={styles["profile__personal-details-title"]}>
          Personal details
        </h4>
        <PersonalDetail
          detailType="name"
          detailTitle="Name"
          info="Volodymyr Zelenskyi"
        />
        <PersonalDetail
          detailType="email"
          detailTitle="Email address"
          info="volodymyr-zelenskyi@loves-tea.com"
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
        <DeleteAccount setShowDeleteMsg={setShowDeleteMsg} />
      ) : null}
    </section>
  );
};
