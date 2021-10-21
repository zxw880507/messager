import type { SxProps } from "@mui/system";
import { useRouter } from "next/router";
import { Container, Box, useMediaQuery } from "@mui/material";
import { useState, useEffect } from "react";
import Tabs from "../components/Tabs";
import List from "../components/List";
import Chats from "../components/Chats";
import NoMatch from "../components/NoMatch";
import { setLogout } from "../store/features/auth/authSlice";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import useAuth from "../lib/useAuth";
import { chatState } from "../store/features/chatSlice";

const MyMessage = () => {
  const matches = useMediaQuery("(min-width:600px)");
  const router = useRouter();
  const id = router.query.id as string;
  const dispatch = useAppDispatch();
  const { isConversation } = useAppSelector(chatState);
  const { auth, status } = useAuth();

  useEffect(() => {
    if (status === "failed") {
      router.push("/");
    }
  }, [status, router]);

  return (
    <Container
      maxWidth="lg"
      sx={{
        minWidth: 320,
        width: "100vw",
        height: "100vh",
        padding: 0,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: matches
          ? "linear-gradient(#b993d6, #8ca6db)"
          : "linear-gradient(#ece9e6, #ffffff)",
      }}
    >
      {auth && auth.id === id && (
        <>
          <button
            style={{ position: "absolute", top: 0, left: 0, zIndex: 9999 }}
            onClick={() => {
              dispatch(setLogout()).then(() => router.push("/"));
            }}
          >
            LOGOUT
          </button>
          <button
            style={{ position: "absolute", top: 0, right: 0, zIndex: 9999 }}
          >
            click me
          </button>
          <Box sx={matches ? sxMatches : sxNotMatches}>
            <div className="tabs">
              <Tabs />
            </div>
            {!(!matches && isConversation) && (
              <div className="list">
                <List matches={matches} id={id} />
              </div>
            )}
            {isConversation && (
              <div className="conversation">
                <Chats matches={matches} id={id} />
              </div>
            )}
          </Box>
        </>
      )}
      {status === "succeeded" && auth!.id !== id && (
        <NoMatch path={router.asPath} />
      )}
    </Container>
  );
};

export default MyMessage;

const sxMatches: SxProps = {
  width: "80%",
  height: "80%",
  display: "flex",
  flexDirection: "row",
  background: "linear-gradient(#ece9e6, #ffffff)",
  border: "1px outset rgba(255,255,255,.5)",
  boxShadow: "1px 1px 15px rgba(0,0,0,.5)",
  "& .tabs": {
    flex: 1,
    background: "linear-gradient(45deg, rgba(0,0,0, .8),rgba(0,0,0, .4))",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-evenly",
    alignItems: "center",
    "& .MuiIconButton-root": {
      width: "80%",
      "& .MuiSvgIcon-root": {
        width: "4rem",
        height: "4rem",
      },
    },
  },
  "& .list": {
    flex: 2,
  },
  "& .conversation": {
    flex: 3,
  },
};

const sxNotMatches: SxProps = {
  width: "100%",
  height: "100%",
  display: "flex",
  flexDirection: "column-reverse",
  "& .tabs": {
    flex: 1,
    background: "linear-gradient(45deg, rgba(0,0,0, .8),rgba(0,0,0, .4))",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    "& .MuiIconButton-root": {
      flex: 1,
      "& .MuiSvgIcon-root": { width: "4rem", height: "4rem" },
    },
  },
  "& .list": {
    flex: 8,
    overflow: "scroll",
  },
  "& .conversation": {
    flex: 8,
    overflow: "scroll",
  },
};
