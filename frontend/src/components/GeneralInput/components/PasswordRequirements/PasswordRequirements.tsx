import cn from "classnames";
<<<<<<< HEAD
import { FC, useEffect } from "react";
=======
import { FC } from "react";
>>>>>>> 9097e19ed81b64e0788f0c94f5cf1ce56aecfc09
import { PASSWORD_REQUIREMENTS } from "../../../../constants/passwordRequirements";
import { useAppSelector } from "../../../../store/hooks";
import styles from "./PasswordRequirements.module.scss";

type Props = {
  isPasswordReqsDefault: boolean;
  isBlured: boolean;
};

export const PasswordRequirements: FC<Props> = ({
  isPasswordReqsDefault,
  isBlured,
}) => {
<<<<<<< HEAD
  const { passwordRequirements } = useAppSelector(
    (state) => state.registration
  );

  useEffect(() => {
    console.log(passwordRequirements);
  }, [passwordRequirements]);
=======
  const { passwordRequirements } = useAppSelector((state) => state.password);
>>>>>>> 9097e19ed81b64e0788f0c94f5cf1ce56aecfc09

  return (
    <ul className={styles["password-requirements-list"]}>
      {PASSWORD_REQUIREMENTS.map((requirement) => {
        const { key, message } = requirement;
        const isRequirementValid = passwordRequirements[key];
        const isRequirementDefault = isPasswordReqsDefault && !isBlured;

        return (
          <li
            className={cn(styles["password-requirements-list__item"], {
              [styles["password-requirements-list__item--valid"]]:
                isRequirementValid,
              [styles["password-requirements-list__item--default"]]:
                isRequirementDefault,
            })}
            key={key}
          >
            <div
              className={cn(styles["password-requirements-list__item-icon"], {
                [styles["password-requirements-list__item-icon--valid"]]:
                  isRequirementValid,
                [styles["password-requirements-list__item-icon--default"]]:
                  isRequirementDefault,
              })}
            />
            {message}
          </li>
        );
      })}
    </ul>
  );
};
