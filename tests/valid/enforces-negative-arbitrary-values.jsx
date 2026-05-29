// Valid: correct negative utility classes (no arbitrary values)
export const Good = () => (
  <div className="-translate-x-2 -translate-y-4 -rotate-45">
    no arbitrary values at all — just scale-based negative utilities
  </div>
);

// Valid: correct form for negative arbitrary values — property-[-value]
export const GoodForm = () => <div className="top-[-5px] left-[-10px]">correct negative arbitrary form</div>;

// Valid: multi-component class names with arbitrary values (not negative-prefix form)
export const GoodMultiPart = () => (
  <div className="border-t-[4px] border-l-[2px] p-4">
    multi-part utility names with arbitrary values — not the negative-prefix form
  </div>
);

// Valid: responsive variants with negative utilities
export const GoodResponsive = () => (
  <div className="md:-translate-x-4 lg:-rotate-12">responsive negative utilities without arbitrary values</div>
);
