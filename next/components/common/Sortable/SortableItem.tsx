import React, { FC } from "react";

import { CSS } from "@dnd-kit/utilities";
import { useSortable } from "@dnd-kit/sortable";

export type Item = {
  id: number;
  name: string;
};
type Props = {
  item: Item;
};

export const SortableItem: FC<Props> = ({ item }: Props) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: item.id });

  const style = {
    border: "1px solid rgba(255, 255, 255, 0.23)",
    padding: "0.5rem 1rem",
    marginBottom: "0.5rem",
    backgroundColor: "rgba(255, 255, 255, 0.09)",
    cursor: "move",
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      {item.name}
    </div>
  );
};
