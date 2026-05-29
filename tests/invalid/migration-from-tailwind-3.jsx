// Invalid: Tailwind CSS v3 classes renamed or removed in v4

// Opacity utilities — removed in v4 (use color/opacity modifier syntax instead)
export const OpacityBad = () => (
  <div className="bg-opacity-50 text-opacity-75 border-opacity-100">
    v3 opacity utilities — use bg-black/50, text-white/75, border-gray-300/100 instead
  </div>
);

export const OpacityRingBad = () => (
  <div className="ring-opacity-50 divide-opacity-25 placeholder-opacity-75">more v3 opacity utilities</div>
);

// Renamed flex utilities (v3: flex-grow/flex-shrink, v4: grow/shrink)
export const FlexBad = () => (
  <div className="flex-grow flex-shrink-0 flex items-center">use grow and shrink-0 instead</div>
);

// Overflow ellipsis renamed (v3: overflow-ellipsis, v4: text-ellipsis)
export const EllipsisBad = () => (
  <p className="overflow-ellipsis overflow-hidden whitespace-nowrap">use text-ellipsis instead of overflow-ellipsis</p>
);

// Decoration utilities renamed (v3: decoration-*, v4: box-decoration-*)
export const DecorationBad = () => <span className="decoration-slice underline">use box-decoration-slice instead</span>;

export const DecorationCloneBad = () => (
  <span className="decoration-clone underline">use box-decoration-clone instead</span>
);

// outline-none renamed (v3: outline-none, v4: outline-hidden)
export const OutlineBad = () => (
  <button className="focus:outline-none px-4 py-2 rounded">use focus:outline-hidden instead</button>
);

// Shadow scale renames (v3→v4: shadow→shadow-sm, shadow-sm→shadow-xs)
export const ShadowBad = () => <div className="shadow p-4">standalone shadow renamed to shadow-sm in v4</div>;

export const ShadowSmBad = () => <div className="shadow-sm p-4">shadow-sm renamed to shadow-xs in v4</div>;

// Drop-shadow scale renames
export const DropShadowBad = () => <div className="drop-shadow p-4">drop-shadow renamed to drop-shadow-sm in v4</div>;

export const DropShadowSmBad = () => (
  <div className="drop-shadow-sm p-4">drop-shadow-sm renamed to drop-shadow-xs in v4</div>
);

// Blur scale renames (v3→v4: blur→blur-sm, blur-sm→blur-xs)
export const BlurBad = () => <div className="blur p-4">blur renamed to blur-sm in v4</div>;

export const BlurSmBad = () => <div className="blur-sm p-4">blur-sm renamed to blur-xs in v4</div>;

// Backdrop-blur scale renames
export const BackdropBlurBad = () => (
  <div className="backdrop-blur p-4">backdrop-blur renamed to backdrop-blur-sm in v4</div>
);

export const BackdropBlurSmBad = () => (
  <div className="backdrop-blur-sm p-4">backdrop-blur-sm renamed to backdrop-blur-xs in v4</div>
);

// Rounded scale renames (v3→v4: rounded→rounded-sm, rounded-sm→rounded-xs)
export const RoundedBad = () => <div className="rounded p-4">rounded renamed to rounded-sm in v4</div>;

export const RoundedSmBad = () => <div className="rounded-sm p-4">rounded-sm renamed to rounded-xs in v4</div>;
