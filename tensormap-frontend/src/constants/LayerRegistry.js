export const ACTIVATIONS = [
  { value: "none", label: "None" },
  { value: "relu", label: "ReLU" },
  { value: "sigmoid", label: "Sigmoid" },
  { value: "tanh", label: "Tanh" },
  { value: "softmax", label: "Softmax" },
  { value: "elu", label: "ELU" },
  { value: "selu", label: "SELU" },
];

export const CONV_PADDINGS = [
  { value: "valid", label: "Valid" },
  { value: "same", label: "Same" },
];

export const LAYER_REGISTRY = {
  custominput: {
    label: "Input",
    type: "custominput",
    color: "border-l-node-input",
    description: "Defines the input dimensions of the model. Required as the first layer.",
    params: {
      "dim-1": { label: "Dim 1", type: "number", default: 0, min: 0 },
      "dim-2": { label: "Dim 2", type: "number", default: 0, min: 0, optional: true },
      "dim-3": { label: "Dim 3", type: "number", default: 0, min: 0, optional: true },
    },
  },
  customdense: {
    label: "Dense",
    type: "customdense",
    color: "border-l-node-dense",
    description: "A fully connected layer where each neuron receives input from all neurons in the previous layer.",
    params: {
      units: { label: "Units", type: "number", default: 1, min: 1 },
      activation: { label: "Activation", type: "select", options: ACTIVATIONS, default: "relu" },
    },
  },
  customflatten: {
    label: "Flatten",
    type: "customflatten",
    color: "border-l-node-flatten",
    description: "Converts a multi-dimensional tensor into a 1D tensor (vector). Useful before Dense layers.",
    params: {},
  },
  customconv: {
    label: "Conv2D",
    type: "customconv",
    color: "border-l-node-conv",
    description: "2D Convolutional layer typically used for image feature extraction.",
    params: {
      filter: { label: "Filters", type: "number", default: 32, min: 1 },
      kernelX: { label: "Kernel X", type: "number", default: 3, min: 1 },
      kernelY: { label: "Kernel Y", type: "number", default: 3, min: 1 },
      strideX: { label: "Stride X", type: "number", default: 1, min: 1 },
      strideY: { label: "Stride Y", type: "number", default: 1, min: 1 },
      padding: { label: "Padding", type: "select", options: CONV_PADDINGS, default: "valid" },
      activation: { label: "Activation", type: "select", options: ACTIVATIONS, default: "relu" },
    },
  },
  customdropout: {
    label: "Dropout",
    type: "customdropout",
    color: "border-l-node-dropout",
    description: "Prevents overfitting by randomly setting a fraction of input units to 0 during training.",
    params: {
      rate: { label: "Rate (0-1)", type: "number", default: 0.5, min: 0, max: 1, step: 0.1 },
    },
  },
};
