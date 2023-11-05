import { PropsWithChildren } from "react";
import classNames from "classnames";
import styles from "./Button.module.css";

export interface ButtonProps {
  variant?: "primary" | "accent" | "success" | "danger";
  onClick?: () => void;
}

export function Button({
  children,
  variant,
  onClick,
}: PropsWithChildren<ButtonProps>) {
  return (
    <button className={classNames(variant, styles.button)} onClick={onClick}>
      {children}
    </button>
  );
}
