import theme from "@/plugins/theme";
import { useMediaQuery } from "@mui/material";
export const useMedia = () => {
  const isPc = useMediaQuery(theme.breakpoints.up("md"), { noSsr: true });
  return {
    isPc,
  };
};
