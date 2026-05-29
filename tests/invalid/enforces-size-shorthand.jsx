// Invalid: w-X and h-X with equal values — use size-X instead

// Basic numeric sizes
export const EqualNumeric4 = () => (
  <div className="w-4 h-4 p-2">use size-4</div>
);

export const EqualNumeric8 = () => (
  <div className="p-2 w-8 h-8 m-1 text-sm">use size-8</div>
);

export const EqualNumeric6Reversed = () => (
  <div className="h-6 w-6 rounded-full bg-gray-200">h before w — use size-6</div>
);

export const EqualNumeric16 = () => (
  <div className="w-16 h-16 overflow-hidden rounded-lg">use size-16</div>
);

// Named sizes
export const EqualFull = () => (
  <div className="w-full h-full flex items-center">use size-full</div>
);

export const EqualScreen = () => (
  <div className="w-screen h-screen bg-black">use size-screen</div>
);

export const EqualAuto = () => (
  <span className="w-auto h-auto inline-block">use size-auto</span>
);

// With other classes mixed in
export const MixedClasses = () => (
  <div className="flex items-center w-12 h-12 rounded-full border-2">use size-12</div>
);
