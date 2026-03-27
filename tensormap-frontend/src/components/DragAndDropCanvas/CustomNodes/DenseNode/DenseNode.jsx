import PropTypes from "prop-types";
import { Handle, Position, useReactFlow } from "reactflow";
import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";

function DenseNode({ data, id }) {
  const { deleteElements } = useReactFlow();
  const { units, activation } = data.params;
  const summary = [units ? `Units: ${units}` : null, activation ? `Act: ${activation}` : null]
    .filter(Boolean)
    .join(", ");

  const onDelete = (e) => {
    e.stopPropagation();
    deleteElements({ nodes: [{ id }] });
  };

  return (
    <div className="group relative w-44 rounded-lg border bg-white shadow-sm transition-all hover:shadow-md">
      <Handle type="target" position={Position.Left} isConnectable id={`${id}_in`} />
      <div className="flex items-center justify-between rounded-t-lg bg-node-dense px-3 py-1.5 text-white">
        <span className="text-xs font-bold uppercase tracking-wider">Dense</span>
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
      <div className="px-3 py-2 text-xs text-muted-foreground">{summary || "Not configured"}</div>
      <Handle type="source" position={Position.Right} isConnectable id={`${id}_out`} />
    </div>
  );
}

DenseNode.propTypes = {
  data: PropTypes.shape({
    params: PropTypes.shape({
      units: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      activation: PropTypes.string,
    }).isRequired,
  }).isRequired,
  id: PropTypes.string.isRequired,
};

export default DenseNode;
