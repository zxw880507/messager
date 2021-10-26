import { ChatBubbleRounded, Group, AccountBox } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import { MouseEvent } from "react";
import { tab, tabOnSelect } from "../store/features/tabSlice";
import { useAppSelector, useAppDispatch } from "../store/hooks";

enum TabsKey {
  friends = "friends",
  conversation = "conversation",
  profile = "profile",
}

type Tab = keyof typeof TabsKey;

export default function Tabs(): JSX.Element {
  const tabSelected = useAppSelector(tab);
  const dispatch = useAppDispatch();
  const onSelect = (tab: Tab) => {
    dispatch(tabOnSelect(tab));
  };

  return (
    <>
      <IconButton onClick={() => onSelect("conversation")}>
        <ChatBubbleRounded />
      </IconButton>
      <IconButton onClick={() => onSelect("friends")}>
        <Group />
      </IconButton>
      <IconButton onClick={() => onSelect("profile")}>
        <AccountBox />
      </IconButton>
    </>
  );
}
