import styles from "./Avatar.module.css";
import { ImgHTMLAttributes } from "react";

interface AvatarProps extends ImgHTMLAttributes<HTMLImageElement> {
  semBordas?: boolean
}

export function Avatar({ semBordas = false, ...props } : AvatarProps) {
  const classes = [styles.avatar];

  if (semBordas) {
    classes.push(styles.semBordas);
  }

  return (
    <div className={classes.join(" ")} >
      <img {...props} />
    </div>
  );
}
