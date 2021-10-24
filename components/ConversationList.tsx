import styles from "./List.module.scss";
import classNames from "classnames";
import { useEffect } from "react";
import { Avatar } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import {
  conversationState,
  getConversation,
} from "../store/features/conversationSlice";
import { chatState, onChat } from "../store/features/chatSlice";

interface Props<T> {
  matches: T;
  id: string;
}
export default function ConversationList(props: Props<boolean>) {
  const { matches, id } = props;
  const { isConversation, conversationId } = useAppSelector(chatState);
  const liClass = classNames(styles.listItem, {
    [styles.dense]: isConversation && matches,
  });

  const { conversation, status, error } = useAppSelector(conversationState);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getConversation(id));
  }, [dispatch, id]);

  const startChatById = (conversationId: string) => {
    dispatch(onChat(conversationId));
  };
  return (
    <ul className={styles.list}>
      {conversation.map((el, index) => (
        <li
          key={index}
          className={liClass}
          onClick={() => startChatById(el.id)}
        >
          <div>
            <Avatar
              variant="square"
              className={styles.avatar}
              src="/shit.jpg"
            />
          </div>
          <div className={styles.listText}>
            <span>{el.user.email}</span>
          </div>
        </li>
      ))}
    </ul>
  );
}
