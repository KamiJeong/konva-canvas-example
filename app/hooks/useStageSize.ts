import { useCallback, useState } from "react";

export const useStageSize = () => {
  const [stageSize, setStageSize] = useState({ width: 0, height: 0 });

  const containerRef = useCallback((node: HTMLDivElement | null) => {
    if (!node) return;

    const updateSize = () => {
      setStageSize({
        width: node.clientWidth,
        height: node.clientHeight,
      });
    };

    updateSize();

    const resizeObserver = new ResizeObserver(() => {
      updateSize();
    });

    resizeObserver.observe(node);

    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  return {
    containerRef,
    stageSize,
  };
};
