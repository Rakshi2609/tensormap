import PropTypes from "prop-types";
import { Handle, Position } from "reactflow";
import { LAYER_REGISTRY } from "@/constants/LayerRegistry";
import Tooltip from "@/components/ui/tooltip-simple";

const InputNode = ({ data, selected }) => {
  const { params } = data;
  const registryEntry = LAYER_REGISTRY.custominput;

  return (
    <Tooltip content={registryEntry.description}>
      <div
        className={`w-32 rounded-md border-2 bg-white px-2 py-3 shadow-md transition-all ${
          selected ? "border-primary ring-2 ring-primary/20" : "border-node-input"
        }`}
      >
        <div className="mb-2 border-b pb-1 text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
          Input Layer
        </div>
        <div className="flex flex-col gap-1 text-[10px]">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Shape:</span>
            <span className="font-mono font-medium">
              ({params["dim-1"]}, {params["dim-2"] || 0}, {params["dim-3"] || 0})
            </span>
          </div>
        </div>
        <Handle
          type="source"
          position={Position.Bottom}
          className="h-2 w-2 !bg-node-input"
        />
      </div>
    </Tooltip>
  );
};

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
