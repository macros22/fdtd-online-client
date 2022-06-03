import { PProps } from './Tag.props';
import styles from './Tag.module.css';
import cn from 'clsx';

const Tag = ({
  size = 's',
  children,
  color = 'ghost',
  href,
  fullWidth = false,
  className,
  ...props
}: PProps): JSX.Element => {
  return (
    <div
      className={cn(styles.tag, className, {
        [styles.s]: size == 's',
        [styles.m]: size == 'm',
        [styles.l]: size == 'l',
        [styles.ghost]: color == 'ghost',
        [styles.success]: color == 'success',
        [styles.primary]: color == 'primary',
        [styles.fullWidth]: fullWidth == true,
      })}
      {...props}
    >
      {href ? <a href={href}>{children}</a> : <>{children}</>}
    </div>
  );
};

export default Tag;
