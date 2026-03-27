import PropTypes from "prop-types";
import { Handle, Position } from "reactflow";
import { LAYER_REGISTRY } from "@/constants/LayerRegistry";
import Tooltip from "@/components/ui/tooltip-simple";

const ConvNode = ({ data, selected }) => {
  const { params } = data;
  const registryEntry = LAYER_REGISTRY.customconv;

  return (
    <Tooltip content={registryEntry.description}>
      <div
        className={`w-32 rounded-md border-2 bg-white px-2 py-3 shadow-md transition-all ${
          selected ? "border-primary ring-2 ring-primary/20" : "border-node-conv"
        }`}
      >
        <Handle
          type="target"
          position={Position.Top}
          className="h-2 w-2 !bg-node-conv"
        />
        <div className="mb-2 border-b pb-1 text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
          Conv2D Layer
        </div>
        <div className="flex flex-col gap-1 text-[10px]">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Filters:</span>
            <span className="font-mono font-medium">{params.filter}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Kernel:</span>
            <span className="font-mono font-medium">
              {params.kernelX}x{params.kernelY}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Padding:</span>
            <span className="font-mono font-medium lowercase italic">
              {params.padding}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Act:</span>
            <span className="font-mono font-medium lowercase italic">
              {params.activation}
            </span>
          </div>
        </div>
        <Handle
          type="source"
          position={Position.Bottom}
          className="h-2 w-2 !bg-node-conv"
        />
      </div>
    </Tooltip>
  );
};

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
