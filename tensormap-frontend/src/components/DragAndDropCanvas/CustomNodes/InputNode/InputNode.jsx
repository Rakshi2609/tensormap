import PropTypes from "prop-types";
import { Handle, Position, useReactFlow } from "reactflow";
import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";

function InputNode({ data, id }) {
  const { deleteElements } = useReactFlow();

  const dims = [data.params["dim-1"], data.params["dim-2"], data.params["dim-3"]]
    .filter((d) => d !== "" && d !== undefined)
    .join(" × ");

  const onDelete = (e) => {
    e.stopPropagation();
    deleteElements({ nodes: [{ id }] });
  };

  return (
    <div className="group relative w-44 rounded-lg border bg-white shadow-sm transition-all hover:shadow-md">
      <div className="flex items-center justify-between rounded-t-lg bg-node-input px-3 py-1.5 text-white">
        <span className="text-xs font-bold uppercase tracking-wider">Input</span>
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
      <div className="px-3 py-2 text-xs text-muted-foreground">
        {dims ? `Dim: ${dims}` : "No dimensions set"}
      </div>
      <Handle type="source" position={Position.Right} isConnectable id={`${id}_out`} />
    </div>
  );
}

InputNode.propTypes = {
  data: PropTypes.shape({
    params: PropTypes.shape({
      "dim-1": PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      "dim-2": PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      "dim-3": PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    }).isRequired,
  }).isRequired,
  id: PropTypes.string.isRequired,
};

export default InputNode;
