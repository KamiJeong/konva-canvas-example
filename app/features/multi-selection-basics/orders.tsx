import { ActionButton } from "~/components/action-button";
import { useShapesStore } from "./shapes-store";

export default function Orders() {
  const { selectedId, bringForwardShape, sendBackwardShape, bringToFrontShape, sendToBackShape } =
    useShapesStore();

  return (
    <div className="border-b border-slate-200 p-4">
      <h2 className="text-sm font-semibold text-slate-700">Orders</h2>
      <div className="mt-3 space-y-2">
        <ActionButton type="button" onClick={bringForwardShape} disabled={!selectedId}>
          Bring Forward
        </ActionButton>
        <ActionButton type="button" onClick={sendBackwardShape} disabled={!selectedId}>
          Send Backward
        </ActionButton>
        <ActionButton type="button" onClick={bringToFrontShape} disabled={!selectedId}>
          Bring To Front
        </ActionButton>
        <ActionButton type="button" onClick={sendToBackShape} disabled={!selectedId}>
          Send To Back
        </ActionButton>
      </div>
    </div>
  );
}
