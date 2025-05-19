import { userInfoDefaults } from "@/constants/formsInitials";
import { updateIsLoggedIn, updateUserInfo } from "@/features/profile/profileSlice";
import { clearTokens } from "@/handlers/clearTokens";
import { useCursorEffect } from "@/hooks/useCursorEffect";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import cn from "classnames";
import { Dispatch, FC, SetStateAction, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { UserAvatar } from "../../../UserAvatar";
import styles from "./ProfileModal.module.scss";

type Props = {
  setOpenProfileModal: Dispatch<SetStateAction<boolean>>;
};

export const ProfileModal: FC<Props> = ({ setOpenProfileModal }) => {
  const { handleMouseEnter, handleMouseLeave } = useCursorEffect();
  const modalRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { first_name, last_name } = useAppSelector(
    (state) => state.profile.userInfo
  );
  const username =
    first_name.length || last_name.length
      ? `${first_name} ${last_name}`
      : "user";

  const handleProfileClick = () => {
    navigate("/profile");
    setOpenProfileModal(false);
  };

  const handleLogout = () => {
    navigate("/");
    dispatch(updateIsLoggedIn(false));
    dispatch(updateUserInfo(userInfoDefaults));
    localStorage.removeItem("user");
    localStorage.removeItem("likedProducts");

    clearTokens();
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const { current } = modalRef;
      const { target } = event;

      if (current && !current.contains(target as Node)) {
        setOpenProfileModal(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => document.removeEventListener("mousedown", handleClickOutside);
  });

  return (
    <div className={styles["profile-modal"]} ref={modalRef}>
      <div className={styles["profile-modal__user-info"]}>
        <UserAvatar usedIn="modal" />
        <p className={cn(styles["profile-modal__username"], "additional-text")}>
          {username}
        </p>
      </div>
      <nav className={styles["profile-modal__nav"]}>
        <ul className={styles["profile-modal__list"]}>
          <li
            className={cn(
              styles["profile-modal__list-item"],
              styles["profile-modal__list-item--profile"],
              "main-text"
            )}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onClick={handleProfileClick}
          >
            Profile
          </li>
          <li className={styles["profile-modal__list-item--border"]}></li>
          <li
            className={cn(
              styles["profile-modal__list-item"],
              styles["profile-modal__list-item--logout"],
              "main-text"
            )}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onClick={handleLogout}
          >
            Log out
          </li>
        </ul>
      </nav>
    </div>
  );
};
