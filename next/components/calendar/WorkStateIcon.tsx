import CheckIcon from "@mui/icons-material/Check";
import RemoveIcon from "@mui/icons-material/Remove";
import { WorkState } from "@/data/work/useCreateWork";

type WorkStateIconProps = {
  state: WorkState;
};
const WorkStateIcon = ({ state }: WorkStateIconProps) => {
  if (state === 0) return <CheckIcon color="error" />;
  if (state === 1) return <CheckIcon color="primary" />;
  if (state === 2) return <RemoveIcon color="primary" />;
  return <></>;
};
export default WorkStateIcon;
