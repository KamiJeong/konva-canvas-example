import { useState } from "react";
import { Circle, Layer, Rect, Stage, Text } from "react-konva";
import { useMounted } from "~/hooks/useMounted";

const SHAPES = [
  {
    id: "rect-1",
    type: "rect",
    x: 80,
    y: 80,
    width: 160,
    height: 100,
    fill: "#3b82f6",
  },
  {
    id: "circle-1",
    type: "circle",
    x: 380,
    y: 140,
    radius: 50,
    fill: "#10b981",
  },
  {
    id: "text-1",
    type: "text",
    x: 120,
    y: 250,
    text: "Hello Konva",
    fontSize: 28,
    fill: "#111827",
  },
];

export default function RenderAndSelectShapes() {
  const mounted = useMounted();
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const handleStageMouseDown = (e: any) => {
    // clicked on stage - clear selection
    if (e.target === e.target.getStage()) {
      setSelectedId(null);
    }
  };

  if (mounted) {
    return (
      <Stage
        width={window.innerWidth}
        height={window.innerHeight}
        onMouseDown={handleStageMouseDown}
      >
        <Layer>
          {SHAPES.map((shape) => {
            const isSelected = shape.id === selectedId;

            switch (shape.type) {
              case "rect":
                return (
                  <Rect
                    key={shape.id}
                    x={shape.x}
                    y={shape.y}
                    width={shape.width}
                    height={shape.height}
                    fill={shape.fill}
                    stroke={isSelected ? "#111827" : undefined}
                    strokeWidth={isSelected ? 4 : 0}
                    onClick={() => setSelectedId(shape.id)}
                  />
                );
              case "circle":
                return (
                  <Circle
                    key={shape.id}
                    x={shape.x}
                    y={shape.y}
                    radius={shape.radius}
                    fill={shape.fill}
                    stroke={isSelected ? "#111827" : undefined}
                    strokeWidth={isSelected ? 4 : 0}
                    onClick={() => setSelectedId(shape.id)}
                  />
                );
              case "text":
                return (
                  <Text
                    key={shape.id}
                    x={shape.x}
                    y={shape.y}
                    text={shape.text}
                    fontSize={shape.fontSize}
                    fill={shape.fill}
                    stroke={isSelected ? "#111827" : undefined}
                    strokeWidth={isSelected ? 4 : 0}
                    onClick={() => setSelectedId(shape.id)}
                  />
                );
              default:
                return null;
            }
          })}
        </Layer>
      </Stage>
    );
  }
  return <div>Loading...</div>;
}
