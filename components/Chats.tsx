import styles from "./Chats.module.scss";
import { ChangeEvent, useEffect, useState, useRef } from "react";
import ArrowBackIosNewRoundedIcon from "@mui/icons-material/ArrowBackIosNewRounded";
import KeyboardReturnSharpIcon from "@mui/icons-material/KeyboardReturnSharp";
import { IconButton, Avatar } from "@mui/material";
import classNames from "classnames";
import { useAppSelector, useAppDispatch } from "../store/hooks";
import { cancelChat, chatState } from "../store/features/chatSlice";
import {
  getMessages,
  sendMessage,
  receiveMessage,
  messagesState,
} from "../store/features/messagesSlice";
import { textOnChange, text } from "../store/features/textSlice";
import Pusher from "pusher-js";

interface Props<T> {
  matches: T;
  id: string;
}
export default function Chats(props: Props<boolean>) {
  const { matches, id } = props;
  const [socketId, setSocketId] = useState<string | null>(null);
  const { conversationId } = useAppSelector(chatState);
  const { messages } = useAppSelector(messagesState);
  const textValue = useAppSelector(text);
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
  const onchange = (e: ChangeEvent) => {
    dispatch(textOnChange(e.target.value));
  };
  useEffect(() => {
    dispatch(getMessages());
    Pusher.logToConsole = true;
    const pusher = new Pusher("7edcd9552c5cad7513f9", {
      cluster: "us3",
    });
    pusher.connection.bind("connected", () => {
      setSocketId(pusher.connection.socket_id);
    });
    const channel = pusher.subscribe("msg_channel");
    if (conversationId) {
      channel.bind(conversationId, function (data: any) {
        dispatch(receiveMessage(data.message))
          .unwrap()
          .then(() => scrollToBottom());
      });
    }
    return () => {
      pusher.disconnect();
    };
  }, [dispatch, conversationId]);

  const ref = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    const el = ref.current as HTMLElement;
    const scrollHeight = el.scrollHeight;
    const height = el.clientHeight;
    const maxScrollTop = scrollHeight - height;
    el.scrollTop = maxScrollTop > 0 ? maxScrollTop : 0;
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
      <div className={styles.main} ref={ref}>
        <ul>
          {messages.map((message, index) => {
            const liClass = classNames(styles.chatItem, {
              [styles.right]: message.sender.id === id,
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
                  <span className={styles.chatBox}>{message.text}</span>
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
          onChange={onchange}
          value={textValue}
        />
        <IconButton
          onClick={() =>
            dispatch(sendMessage(socketId))
              .unwrap()
              .then(() => scrollToBottom())
          }
        >
          <KeyboardReturnSharpIcon />
        </IconButton>
      </div>
    </div>
  );
}
