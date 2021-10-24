import style from "./Profile.module.scss";
import { Avatar, Paper } from "@mui/material";
export default function Profile() {
  return (
    <div className={style.grid}>
      <div className={style.gridItem}>
        <Paper
          elevation={3}
          sx={{
            width: "4em",
            height: "4em",
            borderRadius: "2em",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            background: "linear-gradient(#b993d6, #8ca6db)",
          }}
        >
          <Avatar
            sx={{
              width: "3em",
              height: "3em",
            }}
            alt="Jack Zhao"
            src="/broken-image.jpg"
          />
        </Paper>
      </div>
      <div className={style.gridItem}>username</div>
      <div className={style.gridItem}>bio</div>
    </div>
  );
}
