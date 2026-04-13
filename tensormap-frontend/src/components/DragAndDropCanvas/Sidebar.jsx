import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LAYER_REGISTRY } from "@/constants/LayerRegistry";
import Tooltip from "@/components/ui/tooltip-simple";

function Sidebar() {
  const onDragStart = (event, nodeType) => {
    event.dataTransfer.setData("application/reactflow", nodeType);
    event.dataTransfer.effectAllowed = "move";
  };

  return (
    <Card className="h-full w-48 shrink-0">
      <CardHeader className="pb-3">
        <CardTitle className="text-sm">Layers</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        {Object.values(LAYER_REGISTRY).map((layer) => (
          <Tooltip key={layer.type} content={layer.description}>
            <div
              className={`cursor-grab rounded-md border border-l-4 ${layer.color} bg-white px-3 py-2 text-xs font-medium`}
              onDragStart={(e) => onDragStart(e, layer.type)}
              draggable
            >
              {layer.label}
            </div>
          </Tooltip>
        ))}
      </CardContent>
    </Card>
  );
}

export default Sidebar;
