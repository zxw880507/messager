import styles from "./Chats.module.scss";
import ArrowBackIosNewRoundedIcon from "@mui/icons-material/ArrowBackIosNewRounded";
import { IconButton, Avatar } from "@mui/material";
import classNames from "classnames";
import { useAppSelector, useAppDispatch } from "../store/hooks";
import { cancelChat, chatState } from "../store/features/chatSlice";

interface Props<T> {
  matches: T;
}
export default function Chats(props: Props<boolean>) {
  const { matches } = props;
  const { conversationId } = useAppSelector(chatState);
  const dispatch = useAppDispatch();
  const titleClass = classNames(styles.chatTitle, {
    [styles.mobile]: !matches,
  });
  const textFieldClass = classNames(styles.textField, {
    [styles.mobile]: !matches,
  });
  const backToList = () => {
    dispatch(cancelChat());
  };
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.backButton}>
          <IconButton onClick={() => backToList()}>
            <ArrowBackIosNewRoundedIcon />
          </IconButton>
        </div>
        <span className={titleClass}>{conversationId}</span>
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
