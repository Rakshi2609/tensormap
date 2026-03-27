import PropTypes from "prop-types";
import { Handle, Position, useReactFlow } from "reactflow";
import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";

function DropoutNode({ data, id }) {
  const { deleteElements } = useReactFlow();
  const { rate } = data.params;

  const onDelete = (e) => {
    e.stopPropagation();
    deleteElements({ nodes: [{ id }] });
  };

  return (
    <div className="group relative w-44 rounded-lg border bg-white shadow-sm transition-all hover:shadow-md">
      <Handle type="target" position={Position.Left} isConnectable id={`${id}_in`} />
      <div className="flex items-center justify-between rounded-t-lg bg-node-dropout px-3 py-1.5 text-white">
        <span className="text-xs font-bold uppercase tracking-wider">Dropout</span>
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
        {rate !== "" && rate !== undefined ? `Rate: ${rate}` : "Not configured"}
      </div>
      <Handle type="source" position={Position.Right} isConnectable id={`${id}_out`} />
    </div>
  );
}

DropoutNode.propTypes = {
  data: PropTypes.shape({
    params: PropTypes.shape({
      rate: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    }).isRequired,
  }).isRequired,
  id: PropTypes.string.isRequired,
};

export default DropoutNode;
