import { useState } from "react";
import style from "./Profile.module.scss";
import { Avatar, Paper, Typography, IconButton } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import SaveIcon from "@mui/icons-material/Save";
import EditIcon from "@mui/icons-material/Edit";
import CustomInput from "./CustomInput";
import DateSelect from "./DatePicker";

export default function Profile() {
  const [editMode, setEditMode] = useState<boolean>(false);
  return (
    <div className={style.grid}>
      <div className={style.avatarBox}>
        <Paper
          elevation={3}
          sx={{
            width: "6.5em",
            height: "6.5em",
            borderRadius: "3.25em",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            background: "rgba(255,255,255, .6)",
          }}
        >
          <Avatar
            sx={{
              width: "2em",
              height: "2em",
              fontSize: "3em",
            }}
            alt="Jack Zhao"
            src="/broken-image.jpg"
          />
        </Paper>
      </div>
      <div className={style.profileInfo}>
        <div className={style.infoHeader}>
          <Typography variant="h5">Basic Information</Typography>
          {editMode ? (
            <LoadingButton
              sx={{
                padding: ".2em .6em",
                backgroundColor: "#8ca6db",
                "&:hover": {
                  backgroundColor: "#b993d6",
                },
              }}
              onClick={() => setEditMode(false)}
              // loading={loading}
              loadingPosition="start"
              startIcon={<SaveIcon />}
              variant="contained"
            >
              Save
            </LoadingButton>
          ) : (
            <IconButton
              sx={{ color: "#8ca6db", padding: ".1em" }}
              aria-label="upload picture"
              component="span"
              onClick={() => setEditMode(true)}
            >
              <EditIcon />
            </IconButton>
          )}
        </div>
        <Paper elevation={1} sx={{ width: "100%", height: "100%" }}>
          <ul>
            {/*  */}
            {editMode ? (
              <>
                <li>
                  <span>Nickname</span>
                  <CustomInput />
                </li>
                <li>
                  <span>First Name</span>
                  <CustomInput />
                </li>
                <li>
                  <span>Last Name</span>
                  <CustomInput />
                </li>
                <li>
                  <span>Date of Birth</span>
                  <DateSelect />
                </li>
                <li>
                  <span>Location</span>
                  <CustomInput />
                </li>
                <li>
                  <span>Bio</span>
                  <CustomInput />
                </li>
              </>
            ) : (
              <>
                <li>
                  <span>Nickname</span>
                  <span>Shit Dragon</span>
                </li>
                <li>
                  <span>First Name</span>
                  <span>Jack</span>
                </li>
                <li>
                  <span>Last Name</span>
                  <span>Zhao</span>
                </li>
                <li>
                  <span>Date of Birth</span>
                  <span>N/A</span>
                </li>
                <li>
                  <span>Location</span>
                  <span>Calgary</span>
                </li>
                <li>
                  <span>Bio</span>
                  <span>I love cancer lady</span>
                </li>
              </>
            )}
          </ul>
        </Paper>
      </div>
    </div>
  );
}
