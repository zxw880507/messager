import { ChatBubbleRounded, Group, AccountBox } from "@mui/icons-material";
import { IconButton } from "@mui/material";

export default function Tabs(): JSX.Element {
  return (
    <>
      <IconButton>
        <ChatBubbleRounded />
      </IconButton>
      <IconButton>
        <Group />
      </IconButton>
      <IconButton>
        <AccountBox />
      </IconButton>
    </>
  );
}
