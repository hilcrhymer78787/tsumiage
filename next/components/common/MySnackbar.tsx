import React from "react";
import { Alert, Button, Slide, SlideProps, Snackbar } from "@mui/material";
import { useSnackbar } from "@/data/common/useSnackbar";

const SlideTransition = (props: SlideProps) => {
  return <Slide {...props} direction="left" />;
};

const MySnackbar = () => {
  const { snackbars, setSnackbar, handleClose } = useSnackbar();

  return (
    <div>
      <Button onClick={() => setSnackbar("保存しました！", "success")}>
        success
      </Button>
      <Button onClick={() => setSnackbar("エラーが発生しました", "error")}>
        error
      </Button>

      {snackbars.map((snackbar, index) => (
        <Snackbar
          key={snackbar.id}
          open
          autoHideDuration={3000}
          onClose={(event, reason) => handleClose(snackbar.id, event, reason)}
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
          TransitionComponent={SlideTransition}
          sx={{ mt: `${index * 60}px` }} // 重ならないようにずらす
        >
          <Alert
            onClose={(event, reason) => handleClose(snackbar.id, event, reason)}
            severity={snackbar.severity}
            sx={{ width: "100%" }}
          >
            {snackbar.message}
          </Alert>
        </Snackbar>
      ))}
    </div>
  );
};

export default MySnackbar;
