// Valid: already using size-* shorthand
export const AlreadyShorthand = () => <div className="size-4 p-2">icon wrapper</div>;

export const ShorthandFull = () => <div className="size-full flex items-center justify-center">full cover</div>;

export const ShorthandScreen = () => <div className="size-screen overflow-hidden">viewport</div>;

// Valid: different w/h values — size-* does not apply
export const DifferentValues = () => <div className="w-4 h-8 p-2">tall, narrow</div>;

export const DifferentNamed = () => <div className="w-full h-screen bg-gray-100">layout container</div>;

export const DifferentNumericLarge = () => <div className="w-64 h-32 bg-white">wide card</div>;

// Valid: only one dimension — nothing to shorten
export const WidthOnly = () => <div className="w-full p-4 bg-blue-500">full width banner</div>;

export const HeightOnly = () => <div className="h-screen overflow-hidden flex flex-col">page layout</div>;

export const WidthOnlyNumeric = () => <div className="w-4 p-2 m-1">width only</div>;

// Valid: min-w / max-w / min-h / max-h — size-* does not replace these
export const MinMax = () => <div className="min-w-full max-h-screen overflow-auto">constrained</div>;

export const MaxWidth = () => <div className="max-w-4xl min-h-0 mx-auto">centered container</div>;

// Valid: w/h inside longer utility names — not class tokens
export const ShadowAndOthers = () => <div className="shadow-md overflow-hidden whitespace-nowrap">no w/h classes</div>;
