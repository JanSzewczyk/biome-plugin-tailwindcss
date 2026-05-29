// Invalid: wrong form — -property-[value] instead of property-[-value]
export const Bad = () => (
  <div className="-top-[5px] -left-[10px]">
    wrong negative arbitrary form
  </div>
);
