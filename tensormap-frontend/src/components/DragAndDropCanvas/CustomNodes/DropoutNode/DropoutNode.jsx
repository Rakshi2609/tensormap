import PropTypes from "prop-types";
import { Handle, Position } from "reactflow";
import { LAYER_REGISTRY } from "@/constants/LayerRegistry";
import Tooltip from "@/components/ui/tooltip-simple";

const DropoutNode = ({ data, selected }) => {
  const { params } = data;
  const registryEntry = LAYER_REGISTRY.customdropout;

  return (
    <Tooltip content={registryEntry.description}>
      <div
        className={`w-32 rounded-md border-2 bg-white px-2 py-3 shadow-md transition-all ${
          selected ? "border-primary ring-2 ring-primary/20" : "border-node-dropout"
        }`}
      >
        <Handle
          type="target"
          position={Position.Top}
          className="h-2 w-2 !bg-node-dropout"
        />
        <div className="mb-2 border-b pb-1 text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
          Dropout
        </div>
        <div className="flex flex-col gap-1 text-[10px]">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Rate:</span>
            <span className="font-mono font-medium">{params.rate}</span>
          </div>
        </div>
        <Handle
          type="source"
          position={Position.Bottom}
          className="h-2 w-2 !bg-node-dropout"
        />
      </div>
    </Tooltip>
  );
};

DropoutNode.propTypes = {
  data: PropTypes.shape({
    params: PropTypes.shape({
      rate: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    }).isRequired,
  }).isRequired,
};

export default DropoutNode;
