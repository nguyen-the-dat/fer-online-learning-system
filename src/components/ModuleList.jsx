import React from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { GripVertical } from "react-bootstrap-icons";
import { Button } from "react-bootstrap";

export const ModuleList = ({ items, onEdit, onReorder }) => {
  const handleDragEnd = (result) => {
    const { source, destination } = result;
    if (!destination) return;

    const reordered = [...items];
    const [removed] = reordered.splice(source.index, 1);
    reordered.splice(destination.index, 0, removed);

    const reorderedWithOrder = reordered.map((mod, index) => ({
      ...mod,
      order: index,
    }));

    onReorder(reorderedWithOrder);
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Droppable droppableId="module-list">
        {(provided) => (
          <div ref={provided.innerRef} {...provided.droppableProps}>
            {items.map((mod, index) => (
              <Draggable
                key={mod.id.toString()}
                draggableId={mod.id.toString()}
                index={index}
              >
                {(provided) => (
                  <div
                    className="border rounded p-2 bg-white d-flex justify-content-between align-items-center mb-2"
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                  >
                    <div className="d-flex align-items-center gap-2">
                      <span {...provided.dragHandleProps}>
                        <GripVertical />
                      </span>
                      <strong>{mod.title}</strong>
                    </div>
                    <Button size="sm" onClick={() => onEdit(mod.id)}>
                      Edit
                    </Button>
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};
