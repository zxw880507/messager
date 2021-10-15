import { useState } from "react";
import Box from "@mui/material/Box";
import Alert from "@mui/material/Alert";
import IconButton from "@mui/material/IconButton";
import Collapse from "@mui/material/Collapse";
import CloseIcon from "@mui/icons-material/Close";
import { useAppSelector, useAppDispatch } from "../store/hooks";
import { authenState, resetError } from "../store/features/auth/authSlice";

export default function TransitionAlerts() {
  const { error } = useAppSelector(authenState);
  const dispatch = useAppDispatch();

  return (
    <Box
      sx={{
        width: "100%",
        "& .MuiCollapse-root": {
          width: "100%",
          "& .MuiPaper-root": {
            alignItems: "center",
          },
        },
      }}
    >
      <Collapse in={Boolean(error)}>
        <Alert
          severity="error"
          action={
            <IconButton
              aria-label="close"
              color="error"
              size="small"
              onClick={() => {
                dispatch(resetError());
              }}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
        >
          {error}
        </Alert>
      </Collapse>
    </Box>
  );
}
