import React from 'react';
import icons, { IconName } from '../const/icons';

export type IconProps = {
  name: IconName;
  onClick?: (e: React.MouseEvent) => void;
  className?: string;
  svgClass?: string;
  fillColor?: string;
  size?: number;
  viewBox?: string;
};
export const Icon: React.FC<IconProps> = ({
  name,
  onClick = e => undefined,
  className = '',
  size = 40,
  fillColor = 'black',
  svgClass = '',
  viewBox = '0 0 24 24'
}) => {
  return (
    <span onClick={onClick} className={className}>
      <svg
        className={svgClass}
        style={{ fill: fillColor }}
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        viewBox={viewBox}
      >
        <path d={icons[name]} />
      </svg>
    </span>
  );
};

export default Icon;
