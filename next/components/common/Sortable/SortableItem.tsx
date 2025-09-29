import { CSS } from "@dnd-kit/utilities";
import { useSortable } from "@dnd-kit/sortable";

export const SortableItem = ({
  item,
}: {
  item: {
    id: number;
    name: string;
  };
}) => {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: item.id });

  return (
    <div
      ref={setNodeRef}
      style={{
        border: "1px solid rgba(255, 255, 255, 0.23)",
        padding: "0.5rem 1rem",
        marginBottom: "0.5rem",
        backgroundColor: "rgba(255, 255, 255, 0.09)",
        cursor: "move",
        transform: CSS.Transform.toString(transform),
        transition,
      }}
      {...attributes}
      {...listeners}
    >
      {item.name}
    </div>
  );
};
