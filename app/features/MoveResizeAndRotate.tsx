import type Konva from "konva";
import { useEffect, useRef, useState } from "react";
import { Circle, Layer, Rect, Stage, Text, Transformer } from "react-konva";
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
    rotation: 0,
  },
  {
    id: "circle-1",
    type: "circle",
    x: 380,
    y: 140,
    radius: 50,
    fill: "#10b981",
    rotation: 0,
  },
  {
    id: "text-1",
    type: "text",
    x: 120,
    y: 250,
    text: "Hello Konva",
    fontSize: 28,
    fill: "#111827",
    rotation: 0,
  },
];

export default function MoveResizeAndRotate() {
  const mounted = useMounted();
  const [shapes, setShapes] = useState(SHAPES);
  const [selectedShape, setSelectedShape] = useState<{ id: string; type: string } | null>(null);
  const shapeRefs = useRef<Record<string, any>>({});
  const transformerRef = useRef<any>(null);

  const handleStageMouseDown = (e: any) => {
    // clicked on stage - clear selection
    if (e.target === e.target.getStage()) {
      setSelectedShape(null);
    }
  };

  const updateSelectedShape = (id: string, type: string) => {
    setSelectedShape({ id, type });
  };

  const updateShape = (id: string, updates: Record<string, unknown>) => {
    setShapes((prevShapes) =>
      prevShapes.map((shape) => (shape.id === id ? { ...shape, ...updates } : shape)),
    );
  };

  useEffect(() => {
    if (!selectedShape || !transformerRef.current) return;

    const selectedNode = shapeRefs.current[selectedShape.id];
    if (selectedNode) {
      transformerRef.current.nodes([selectedNode]);
      transformerRef.current.getLayer()?.batchDraw();
    }
  }, [selectedShape]);

  if (mounted) {
    return (
      <Stage
        width={window.innerWidth}
        height={window.innerHeight}
        onMouseDown={handleStageMouseDown}
      >
        <Layer>
          {shapes.map((shape) => {
            const isSelected = shape.id === selectedShape?.id;

            switch (shape.type) {
              case "rect":
                return (
                  <Rect
                    key={shape.id}
                    ref={(node) => {
                      if (node) {
                        shapeRefs.current[shape.id] = node;
                      }
                    }}
                    x={shape.x}
                    y={shape.y}
                    width={shape.width}
                    height={shape.height}
                    fill={shape.fill}
                    stroke={isSelected ? "#111827" : undefined}
                    strokeWidth={isSelected ? 4 : 0}
                    onClick={() => updateSelectedShape(shape.id, shape.type)}
                    onTap={() => updateSelectedShape(shape.id, shape.type)}
                    draggable
                    onDragEnd={(event) => {
                      updateShape(shape.id, {
                        x: event.target.x(),
                        y: event.target.y(),
                      });
                    }}
                    onTransformEnd={(event) => {
                      const node = event.target;

                      if (!node) return;

                      const scaleX = node.scaleX();
                      const scaleY = node.scaleY();

                      // we will reset it back
                      node.scaleX(1);
                      node.scaleY(1);

                      updateShape(shape.id, {
                        x: node.x(),
                        y: node.y(),
                        rotation: node.rotation(),
                        width: node.width() * scaleX,
                        heigh: node.height() * scaleY,
                      });
                    }}
                  />
                );
              case "circle":
                return (
                  <Circle
                    key={shape.id}
                    ref={(node) => {
                      if (node) {
                        shapeRefs.current[shape.id] = node;
                      }
                    }}
                    x={shape.x}
                    y={shape.y}
                    radius={shape.radius}
                    fill={shape.fill}
                    stroke={isSelected ? "#111827" : undefined}
                    strokeWidth={isSelected ? 4 : 0}
                    onClick={() => updateSelectedShape(shape.id, shape.type)}
                    onTap={() => updateSelectedShape(shape.id, shape.type)}
                    draggable
                    onTransformEnd={(event) => {
                      const node = event.target as Konva.Circle;
                      if (!node) return;

                      const scaleX = node.scaleX();
                      const scaleY = node.scaleY();
                      const nextRadius = Math.max(10, node.radius() * Math.max(scaleX, scaleY));

                      node.scaleX(1);
                      node.scaleY(1);

                      updateShape(shape.id, {
                        x: node.x(),
                        y: node.y(),
                        rotation: node.rotation(),
                        radius: nextRadius,
                      });
                    }}
                  />
                );
              case "text":
                return (
                  <Text
                    key={shape.id}
                    ref={(node) => {
                      if (node) {
                        shapeRefs.current[shape.id] = node;
                      }
                    }}
                    x={shape.x}
                    y={shape.y}
                    text={shape.text}
                    width={shape.width}
                    fontSize={shape.fontSize}
                    fill={shape.fill}
                    rotation={shape.rotation}
                    opacity={isSelected ? 0.6 : 1}
                    onClick={() => updateSelectedShape(shape.id, shape.type)}
                    onTap={() => updateSelectedShape(shape.id, shape.type)}
                    draggable
                    onDragEnd={(event) => {
                      updateShape(shape.id, {
                        x: event.target.x(),
                        y: event.target.y(),
                      });
                    }}
                    onTransform={(event) => {
                      const node = event.target as Konva.Text;
                      const nextWidth = Math.max(60, node.width() * node.scaleX());

                      node.setAttrs({
                        width: nextWidth,
                        scaleX: 1,
                        scaleY: 1,
                      });
                    }}
                    onTransformEnd={(event) => {
                      const node = event.target as Konva.Text;

                      updateShape(shape.id, {
                        x: node.x(),
                        y: node.y(),
                        width: node.width(),
                        rotation: node.rotation(),
                      });
                    }}
                  />
                );
              default:
                return null;
            }
          })}
          {selectedShape ? (
            <Transformer
              ref={transformerRef}
              flipEnabled={false}
              enabledAnchors={
                selectedShape.type === "text" ? ["middle-left", "middle-right"] : undefined
              }
            />
          ) : null}
        </Layer>
      </Stage>
    );
  }
  return <div>Loading...</div>;
}
