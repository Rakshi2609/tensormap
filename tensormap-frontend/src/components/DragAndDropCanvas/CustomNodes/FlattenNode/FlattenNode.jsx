import PropTypes from "prop-types";
import { Handle, Position } from "reactflow";
import { LAYER_REGISTRY } from "@/constants/LayerRegistry";
import Tooltip from "@/components/ui/tooltip-simple";

const FlattenNode = ({ selected }) => {
  const registryEntry = LAYER_REGISTRY.customflatten;

  return (
    <Tooltip content={registryEntry.description}>
      <div
        className={`w-32 rounded-md border-2 bg-white px-2 py-3 shadow-md transition-all ${
          selected ? "border-primary ring-2 ring-primary/20" : "border-node-flatten"
        }`}
      >
        <Handle
          type="target"
          position={Position.Top}
          className="h-2 w-2 !bg-node-flatten"
        />
        <div className="mb-2 border-b pb-1 text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
          Flatten Layer
        </div>
        <p className="text-[10px] text-muted-foreground italic">
          No parameters
        </p>
        <Handle
          type="source"
          position={Position.Bottom}
          className="h-2 w-2 !bg-node-flatten"
        />
      </div>
    </Tooltip>
  );
};

FlattenNode.propTypes = {
  selected: PropTypes.bool,
};

export default FlattenNode;
