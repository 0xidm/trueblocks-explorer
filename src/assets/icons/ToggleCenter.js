import React from 'react';
import PropTypes from 'prop-types';

const ToggleCenter = (props) => {
  const {color, size, ...otherProps} = props;
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width={size}
      height={size}
      viewBox='0 0 24 24'
      fill='none'
      stroke={color}
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'
      {...otherProps}>
      <rect x='1' y='5' width='22' height='14' rx='7' ry='7' />
      <circle cx='12' cy='12' r='3' fill='blue' />
    </svg>
  );
};

ToggleCenter.propTypes = {
  color: PropTypes.string,
  size: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

ToggleCenter.defaultProps = {
  color: 'currentColor',
  size: '24',
};

export default ToggleCenter;
