import PropTypes from "prop-types";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { LAYER_REGISTRY } from "@/constants/LayerRegistry";

function NodePropertiesPanel({
  selectedNode,
  modelName,
  onModelNameChange,
  onSave,
  canSave,
  onNodeUpdate,
}) {
  if (!selectedNode) {
    return (
      <Card className="h-fit">
        <CardHeader>
          <CardTitle className="text-sm">Save Model</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="space-y-1">
            <Label>Model Name</Label>
            <Input
              placeholder="Enter model name"
              value={modelName}
              onChange={(e) => onModelNameChange(e.target.value)}
            />
          </div>
          <Button className="w-full" onClick={onSave} disabled={!canSave}>
            Validate &amp; Save
          </Button>
        </CardContent>
      </Card>
    );
  }

  const { type, data, id } = selectedNode;
  const params = data.params;
  const registryEntry = LAYER_REGISTRY[type];

  if (!registryEntry) {
    return (
      <Card className="h-fit">
        <CardHeader>
          <CardTitle className="text-sm text-destructive">Unknown Layer Type</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-xs text-muted-foreground">Type: {type}</p>
        </CardContent>
      </Card>
    );
  }

  const updateParam = (name, value) => {
    onNodeUpdate(id, { ...params, [name]: value });
  };

  const renderParamField = (key, field) => {
    const value = params[key];

    if (field.type === "number") {
      return (
        <div key={key} className="space-y-1">
          <Label>{field.label}</Label>
          <Input
            type="number"
            min={field.min}
            max={field.max}
            step={field.step}
            placeholder={field.placeholder || field.label}
            value={value}
            onChange={(e) => updateParam(key, Number(e.target.value))}
          />
        </div>
      );
    }

    if (field.type === "select") {
      return (
        <div key={key} className="space-y-1">
          <Label>{field.label}</Label>
          <Select value={value} onValueChange={(v) => updateParam(key, v)}>
            <SelectTrigger>
              <SelectValue placeholder={field.label} />
            </SelectTrigger>
            <SelectContent>
              {field.options.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      );
    }

    return null;
  };

  const paramKeys = Object.keys(registryEntry.params);

  return (
    <Card className="h-fit">
      <CardHeader>
        <CardTitle className="text-sm">{registryEntry.label} Layer</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {paramKeys.length > 0 ? (
          paramKeys.map((key) => renderParamField(key, registryEntry.params[key]))
        ) : (
          <p className="text-sm text-muted-foreground">No configurable parameters</p>
        )}
      </CardContent>
    </Card>
  );
}

NodePropertiesPanel.propTypes = {
  selectedNode: PropTypes.object,
  modelName: PropTypes.string.isRequired,
  onModelNameChange: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
  canSave: PropTypes.bool.isRequired,
  onNodeUpdate: PropTypes.func.isRequired,
};

export default NodePropertiesPanel;
