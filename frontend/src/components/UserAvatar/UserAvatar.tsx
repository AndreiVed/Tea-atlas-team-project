import { useAppSelector } from "@/store/hooks";
import cn from "classnames";
import { FC } from "react";
import styles from "./UserAvatar.module.scss";

type Props = {
  usedIn: "profile" | "modal";
};

export const UserAvatar: FC<Props> = ({ usedIn }) => {
  const { avatar } = useAppSelector((state) => state.profile.userInfo);

  return avatar ? (
    <img
      src={avatar}
      alt="User avatar"
      className={cn(styles["user-avatar"], [styles[`user-avatar--${usedIn}`]])}
    />
  ) : (
    <div
      className={cn(
        styles["user-avatar--empty"],
        styles[`user-avatar--empty--${usedIn}`]
      )}
    />
  );
};
