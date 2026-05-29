// Valid: standard Tailwind scale values — no arbitrary values
export const Card = () => (
  <div className="w-4 h-8 p-2 m-4 text-red-500 bg-blue-200 rounded-lg">
    <p className="text-sm font-bold">Hello</p>
  </div>
);

// Valid: clsx with no arbitrary values
import { clsx } from "clsx";
export const Button = ({ active }) => (
  <button className={clsx("px-4 py-2 rounded-md", active && "bg-blue-500 text-white")} type="button">
    Click
  </button>
);

// Valid: CSS module key lookup — bracket is not a Tailwind arbitrary value
import styles from "./styles.module.css";
export const ModuleClass = () => <div className={styles["card"]}>content</div>;

// Valid: ternary without arbitrary values
export const Conditional = ({ primary }) => (
  <div className={primary ? "bg-blue-500 text-white" : "bg-gray-100 text-gray-900"}>conditional classes</div>
);

// Valid: Tailwind v4 data-attribute variant (arbitrary SELECTOR, not arbitrary VALUE)
export const DataVariant = () => (
  <div className="data-[state=active]:bg-blue-500 data-[disabled]:opacity-50">
    data attribute variants are not arbitrary values
  </div>
);
