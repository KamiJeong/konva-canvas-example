import { ActionButton } from "~/components/action-button";
import { useShapesStore } from "./shapes-store";

export default function Tools() {
  const {
    selectedId,
    createRect,
    createCircle,
    createText,
    createImage,
    copySelected,
    deleteSelected,
  } = useShapesStore();

  const onClickAddImage = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (!file) return;

      const reader = new FileReader();
      reader.onload = () => {
        createImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    };
    input.click();
  };

  return (
    <div className="border-b border-slate-200 p-4">
      <h2 className="text-sm font-semibold text-slate-700">Tools</h2>
      <div className="mt-3 space-y-2">
        <ActionButton type="button" onClick={createRect}>
          Add Rect
        </ActionButton>
        <ActionButton type="button" onClick={createCircle}>
          Add Circle
        </ActionButton>
        <ActionButton type="button" onClick={createText}>
          Add Text
        </ActionButton>
        <ActionButton type="button" onClick={onClickAddImage}>
          Add Image
        </ActionButton>
        <ActionButton type="button" onClick={copySelected} disabled={!selectedId}>
          Copy
        </ActionButton>
        <ActionButton type="button" onClick={deleteSelected} disabled={!selectedId}>
          Delete
        </ActionButton>
      </div>
    </div>
  );
}
