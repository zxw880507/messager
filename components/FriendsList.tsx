import { useEffect } from "react";
import { Avatar } from "@mui/material";
import classNames from "classnames";
import { friendsState, getFriends } from "../store/features/friendsSlice";
import { useAppSelector, useAppDispatch } from "../store/hooks";
import styles from "./List.module.scss";

interface Props<T> {
  matches: T;
  id: string;
}

export default function FriendsList(props: Props<boolean>) {
  const { matches, id } = props;
  const liClass = classNames(styles.listItem, {
    [styles.dense]: matches,
  });
  const { friends, status } = useAppSelector(friendsState);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getFriends(id));
  }, [dispatch, id]);
  return (
    <ul className={styles.list}>
      {friends.map((el, index) => (
        <li
          key={index}
          className={liClass}
          // onClick={() => startChatById(el.id)}
        >
          <div>
            <Avatar
              variant="square"
              className={styles.avatar}
              src="/shit.jpg"
            />
          </div>
          <div className={styles.listText}>
            <span>{el.friend.email}</span>
          </div>
        </li>
      ))}
    </ul>
  );
}
