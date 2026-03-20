import { useMounted } from "~/hooks/useMounted";
import Layers from "./layers";
import LeftPanel from "./left-panel";
import MainCanvasArea from "./main-canvas-area";
import Orders from "./orders";
import Properties from "./properties";
import RightPanel from "./right-panel";
import Tools from "./tools";

export default function MultiSelectionBasics() {
  const mounted = useMounted();

  if (mounted) {
    return (
      <div className="flex h-screen overflow-hidden bg-slate-100">
        {/*  Left Panel */}
        <LeftPanel>
          <Tools />
          <Layers />
        </LeftPanel>
        {/*  Main */}
        <MainCanvasArea />
        {/*  Right Panel */}
        <RightPanel>
          <Orders />
          <Properties />
        </RightPanel>
      </div>
    );
  }

  return <div>Loading...</div>;
}
