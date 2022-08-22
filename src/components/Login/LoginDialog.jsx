import React from "react";

import { Dialog } from "@mui/material";

import { Login } from "./";

export function LoginDialog({ loginDialogOpen, handleLoginDialogClose }) {
  return (
    <>
      <Dialog open={loginDialogOpen} onClose={handleLoginDialogClose}>
        <Login />
      </Dialog>
    </>
  );
}
