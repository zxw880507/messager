import styles from "./List.module.scss";
import classNames from "classnames";
import { useEffect } from "react";
import { Avatar, Typography } from "@mui/material";

interface Props<T> {
  isConversation: T;
  matches: T;
  id: string;
}
export default function List(props: Props<boolean>) {
  const { isConversation, matches, id } = props;

  const liClass = classNames(styles.listItem, {
    [styles.dense]: isConversation && matches,
  });

  return (
    <ul className={styles.list}>
      {/* template datalist */}
      {[...new Array(10)].map((el, index) => (
        <li key={index} className={liClass}>
          <div>
            <Avatar
              variant="square"
              className={styles.avatar}
              src="/shit.jpg"
            />
          </div>
          <div className={styles.listText}>
            <span>ice eater</span>
          </div>
        </li>
      ))}
    </ul>
  );
}
