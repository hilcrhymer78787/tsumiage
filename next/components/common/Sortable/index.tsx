import {
  DndContext,
  DragEndEvent,
  KeyboardSensor,
  PointerSensor,
  closestCenter,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import React, { FC, useState } from "react";
import {
  SortableContext,
  arrayMove,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

import { SortableItem } from "@/components/common/Sortable/SortableItem";
import { Task } from "@/data/task/useReadTasks";

const style = {
  padding: "1rem",
};
type SortableProps = {
  initItems: Task[];
  onChange: (items: Task[]) => void;
};
const Sortable = ({ initItems, onChange }: SortableProps) => {
  const [items, setItems] = useState(initItems);
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over) {
      return;
    }

    if (active.id !== over.id) {
      const oldIndex = items.findIndex((v) => v.id === active.id);
      const newIndex = items.findIndex((v) => v.id === over.id);
      setItems(arrayMove(items, oldIndex, newIndex));
      onChange(arrayMove(items, oldIndex, newIndex));
    }
  };

  return (
    <>
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext items={items} strategy={verticalListSortingStrategy}>
          <ul style={style}>
            {items.map((item) => (
              <SortableItem key={item.id} item={item} />
            ))}
          </ul>
        </SortableContext>
      </DndContext>
      {process.env.NODE_ENV === "development" && (
        <pre>{JSON.stringify(items, null, 4)}</pre>
      )}
    </>
  );
};

export default Sortable;
