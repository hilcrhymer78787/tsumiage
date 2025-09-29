import { WorkState } from "@/data/types/work";
import CheckIcon from "@mui/icons-material/Check";
import RemoveIcon from "@mui/icons-material/Remove";
import { SvgIconProps } from "@mui/material";
import { ElementType } from "react";

const WORK_STATES: {
  value: WorkState;
  icon: ElementType;
  color: SvgIconProps["color"];
  opacity: number;
}[] = [
  { value: 0, icon: CheckIcon, color: "error", opacity: 1 },
  { value: 1, icon: CheckIcon, color: "primary", opacity: 1 },
  { value: 2, icon: RemoveIcon, color: "primary", opacity: 0.3 },
];

const WorkStateIcon = ({ state }: { state: WorkState }) => {
  const iconData = WORK_STATES.find((e) => e.value === state);
  if (!iconData) return <></>;
  return <iconData.icon color={iconData.color} sx={{ opacity: iconData.opacity }} />;
};

export default WorkStateIcon;
