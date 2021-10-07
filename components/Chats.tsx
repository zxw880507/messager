import styles from "./Chats.module.scss";
import ArrowBackIosNewRoundedIcon from "@mui/icons-material/ArrowBackIosNewRounded";
import { IconButton, Avatar } from "@mui/material";
import classNames from "classnames";
import { Dispatch, SetStateAction } from "react";

interface Props<T> {
  matches: T;
  setIsConversation: Dispatch<SetStateAction<T>>;
}
export default function Chats(props: Props<boolean>) {
  const { matches, setIsConversation } = props;
  const titleClass = classNames(styles.chatTitle, {
    [styles.mobile]: !matches,
  });
  const textFieldClass = classNames(styles.textField, {
    [styles.mobile]: !matches,
  });
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.backButton}>
          <IconButton onClick={() => setIsConversation(false)}>
            <ArrowBackIosNewRoundedIcon />
          </IconButton>
        </div>
        <span className={titleClass}>ice eater</span>
      </div>
      <div className={styles.main}>
        <ul>
          {[...new Array(50)].map((el, index) => {
            const liClass = classNames(styles.chatItem, {
              [styles.right]: index % 2,
              [styles.dense]: !matches,
            });
            return (
              <li key={index} className={liClass}>
                <div>
                  <Avatar
                    variant="square"
                    className={styles.avatar}
                    src="/shit.jpg"
                  />
                </div>
                <div className={styles.chatDiv}>
                  <span className={styles.chatBox}>This is conversation</span>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
      <div className={textFieldClass}>
        <textarea
          className={styles["input-message"]}
          id="input-message"
          name="input-message"
          rows={1}
          cols={30}
          maxLength={255}
          minLength={1}
        />
      </div>
    </div>
  );
}
