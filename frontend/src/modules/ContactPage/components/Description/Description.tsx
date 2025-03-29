import { FC } from "react";
import styles from './Description.module.scss';

export const Description: FC = () => (
  <p className={styles["description"]}>
    Have questions, feedback, or suggestions? Fill out the form below, and we’ll
    get back to you as soon as possible. Your thoughts help us improve
  </p>
);
