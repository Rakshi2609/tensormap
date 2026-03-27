import PropTypes from "prop-types";
import { Handle, Position, useReactFlow } from "reactflow";
import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";

function ConvNode({ data, id }) {
  const { deleteElements } = useReactFlow();
  const p = data.params;
  const parts = [
    p.filter ? `F: ${p.filter}` : null,
    p.kernelX && p.kernelY ? `K: ${p.kernelX}×${p.kernelY}` : null,
    p.strideX && p.strideY ? `S: ${p.strideX}×${p.strideY}` : null,
    p.padding ? `P: ${p.padding}` : null,
    p.activation && p.activation !== "none" ? `Act: ${p.activation}` : null,
  ]
    .filter(Boolean)
    .join(", ");

  const onDelete = (e) => {
    e.stopPropagation();
    deleteElements({ nodes: [{ id }] });
  };

  return (
    <div className="group relative w-44 rounded-lg border bg-white shadow-sm transition-all hover:shadow-md">
      <Handle type="target" position={Position.Left} isConnectable id={`${id}_in`} />
      <div className="flex items-center justify-between rounded-t-lg bg-node-conv px-3 py-1.5 text-white">
        <span className="text-xs font-bold uppercase tracking-wider">Conv2D</span>
        <Button
          variant="ghost"
          size="icon"
          className="h-5 w-5 rounded-md text-white/70 hover:bg-white/20 hover:text-white"
          onClick={onDelete}
          title="Delete node"
        >
          <Trash2 className="h-3 w-3" />
        </Button>
      </div>
      <div className="px-3 py-2 text-xs text-muted-foreground">{parts || "Not configured"}</div>
      <Handle type="source" position={Position.Right} isConnectable id={`${id}_out`} />
    </div>
  );
}

ConvNode.propTypes = {
  data: PropTypes.shape({
    params: PropTypes.shape({
      filter: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      padding: PropTypes.string,
      activation: PropTypes.string,
      kernelX: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      kernelY: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      strideX: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      strideY: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    }).isRequired,
  }).isRequired,
  id: PropTypes.string.isRequired,
};

export default ConvNode;
