import PropTypes from "prop-types";
import { Handle, Position } from "reactflow";
import { LAYER_REGISTRY } from "@/constants/LayerRegistry";
import Tooltip from "@/components/ui/tooltip-simple";

const DenseNode = ({ data, selected }) => {
  const { params } = data;
  const registryEntry = LAYER_REGISTRY.customdense;

  return (
    <Tooltip content={registryEntry.description}>
      <div
        className={`w-32 rounded-md border-2 bg-white px-2 py-3 shadow-md transition-all ${
          selected ? "border-primary ring-2 ring-primary/20" : "border-node-dense"
        }`}
      >
        <Handle
          type="target"
          position={Position.Top}
          className="h-2 w-2 !bg-node-dense"
        />
        <div className="mb-2 border-b pb-1 text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
          Dense Layer
        </div>
        <div className="flex flex-col gap-1 text-[10px]">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Units:</span>
            <span className="font-mono font-medium">{params.units}</span>
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
          className="h-2 w-2 !bg-node-dense"
        />
      </div>
    </Tooltip>
  );
};

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
