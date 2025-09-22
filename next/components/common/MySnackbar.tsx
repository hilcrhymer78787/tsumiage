import React from "react";
import { Alert, Button, Slide, SlideProps, Snackbar } from "@mui/material";
import { useSnackbar } from "@/data/common/useSnackbar";

const SlideTransition = (props: SlideProps) => {
  return <Slide {...props} direction="left" />;
};

const MySnackbar = () => {
  const { message, severity, setSnackbar, handleClose } = useSnackbar();
  return (
    <div>
      <Button onClick={() => setSnackbar("success")}>success</Button>
      <Button onClick={() => setSnackbar("error", "error")}>error</Button>

      <Snackbar
        open={!!message}
        autoHideDuration={3000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "top", horizontal: "right" }} // 位置調整
        TransitionComponent={SlideTransition} // アニメーション指定
      >
        <Alert onClose={handleClose} severity={severity} sx={{ width: "100%" }}>
          {message}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default MySnackbar;
