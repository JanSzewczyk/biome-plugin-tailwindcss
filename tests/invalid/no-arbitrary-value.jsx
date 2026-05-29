// Invalid: arbitrary value in class attribute
export const Bad1 = () => <div className="w-[42px] h-8 p-2">content</div>;

// Invalid: arbitrary color
export const Bad2 = () => <p className="text-[#bada55] font-bold">colored text</p>;

// Invalid: arbitrary value inside clsx
import { clsx } from "clsx";
export const Bad3 = ({ size }) => <div className={clsx("p-2", `h-[${size}px]`)}>dynamic</div>;
