import { useEffect, useState } from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { Grip, Pencil, CirclePlay } from "lucide-react";
import { Badge, Button } from "react-bootstrap";

export const LessonList = ({ items = [], onReorder, onEdit }) => {
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

    onReorder?.(reorderedWithOrder);
  };

  if (!Array.isArray(items)) {
    return <div>Không có danh sách bài học.</div>;
  }

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Droppable droppableId="lesson-list">
        {(provided) => (
          <div ref={provided.innerRef} {...provided.droppableProps}>
            {items.map((mod, index) => (
              <Draggable
                key={String(mod.id)}
                draggableId={String(mod.id)}
                index={index}
              >
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    className="d-flex align-items-center border rounded mb-3 px-2 py-2"
                  >
                    {/* Drag handle */}
                    <div
                      {...provided.dragHandleProps}
                      className={`me-3 pe-2 border-end ${
                        mod.active ? "border-success" : "border-secondary"
                      }`}
                      style={{ cursor: "grab" }}
                    >
                      <Grip size={20} />
                    </div>

                    {/* Title and icon */}
                    <div className="d-flex align-items-center gap-2">
                      <CirclePlay size={18} />
                      <span>{mod.title}</span>
                    </div>

                    {/* Right side: status and edit */}
                    <div className="ms-auto d-flex align-items-center gap-2">
                      <Badge bg={mod.active ? "success" : "secondary"}>
                        {mod.active ? "Published" : "Draft"}
                      </Badge>
                      <Pencil
                        size={18}
                        style={{ cursor: "pointer", opacity: 0.8 }}
                        onClick={() => onEdit?.(mod.id)}
                        onMouseOver={(e) =>
                          (e.currentTarget.style.opacity = 1)
                        }
                        onMouseOut={(e) =>
                          (e.currentTarget.style.opacity = 0.8)
                        }
                      />
                    </div>
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
