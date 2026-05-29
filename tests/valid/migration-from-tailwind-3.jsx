// Valid: Tailwind v4 class names — no deprecated v3 utilities

// v4 replacements for renamed flex utilities
export const FlexV4 = () => (
  <div className="grow grow-0 shrink shrink-0 basis-0">
    v4 flex utilities
  </div>
);

// v4 replacements for renamed text/overflow utilities
export const TextV4 = () => (
  <p className="text-ellipsis overflow-hidden whitespace-nowrap">
    v4 text utilities
  </p>
);

// v4 replacements for renamed decoration utilities
export const DecorationV4 = () => (
  <span className="box-decoration-slice box-decoration-clone underline">
    v4 decoration utilities
  </span>
);

// v4 opacity modifier syntax (replaces bg-opacity-*, text-opacity-*, etc.)
export const OpacityV4 = () => (
  <div className="bg-black/50 text-white/75 border-gray-300/100 ring-blue-500/50 divide-red-400/25">
    v4 opacity modifiers
  </div>
);

// v4 outline utility
export const OutlineV4 = () => (
  <button className="focus:outline-hidden focus:outline-2 focus:outline-blue-500">
    v4 outline utilities
  </button>
);

// v4 shadow scale (new xs tier, shifted scale)
export const ShadowV4 = () => (
  <div className="shadow-xs shadow-md shadow-lg shadow-xl shadow-2xl shadow-none shadow-inner">
    v4 shadow utilities — md/lg/xl/2xl/none/inner are unchanged
  </div>
);

// v4 blur scale (new xs tier)
export const BlurV4 = () => (
  <div className="blur-xs blur-md blur-lg blur-xl blur-none">
    v4 blur utilities
  </div>
);

// v4 backdrop-blur scale
export const BackdropBlurV4 = () => (
  <div className="backdrop-blur-xs backdrop-blur-md backdrop-blur-lg backdrop-blur-none">
    v4 backdrop-blur utilities
  </div>
);

// v4 drop-shadow scale
export const DropShadowV4 = () => (
  <div className="drop-shadow-xs drop-shadow-md drop-shadow-lg drop-shadow-none">
    v4 drop-shadow utilities
  </div>
);

// v4 rounded scale (new xs tier)
export const RoundedV4 = () => (
  <div className="rounded-xs rounded-md rounded-lg rounded-xl rounded-2xl rounded-full rounded-none">
    v4 rounded utilities
  </div>
);
