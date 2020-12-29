import React from 'react';
import PropTypes from 'prop-types';

const GitCoin = (props) => {
  const { color, size, stroke, ...otherProps } = props;
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width={size + 10}
      height={size + 10}
      viewBox='2 10 70 70'
      fill='none'
      stroke={color}
      strokeWidth={stroke}
      strokeLinecap='round'
      strokeLinejoin='round'
      {...otherProps}>
      <g>
        <path d='m44.5 41.3c0 2.7-.9 5.3-2.5 7.3l-4.6-3.4c.9-1.2 1.5-2.6 1.5-4.2 0-1.1-.3-2.2-.8-3.1l4.1-3.8c1.4 2.1 2.3 4.6 2.3 7.2z' />
        <path d='m45.6 56.3v3.7h-12.9v-.1c-10.4 0-18.9-8.4-18.9-18.8 0-7 3.8-13.1 9.5-16.3v6.7c0 .8.7 1.5 1.6 1.5s1.6-.7 1.6-1.5v-8.2c1.2-.4 2.5-.7 3.9-.9.7-.1 1.5-.1 2.3-.1h.9c4 .2 7.7 1.6 10.8 4.1l-9.3 8.6c-.9-.5-2-.7-3.1-.7-3.7 0-6.8 3-6.8 6.8 0 3.7 3 6.8 6.8 6.8.6 0 1.1-.1 1.7-.2l2.1 1.5z' />
        <path
          d='m48.5 41.3c0 3.6-1.2 6.9-3.3 9.7l-.8-.6-2.4-1.8c1.6-2.1 2.5-4.7 2.5-7.3s-.8-5.1-2.4-7.1l1.4-1.3 1.6-1.4c2.2 2.7 3.4 6.1 3.4 9.8z'
          fill='#0fce7c'
        />
        <circle cx='32' cy='41.1' r='2.7' fill='#fff' />
        <path d='m44.4 50.4-2.4-1.8-4.6-3.4c.9-1.2 1.5-2.6 1.5-4.2 0-1.1-.3-2.2-.8-3.1l4.1-3.8 1.4-1.3 1.6-1.4 4-3.7 1.3-1.3-1.5-1.5c-4.1-4.1-9.5-6.5-15.3-6.7v-3c0-.9-.7-1.6-1.6-1.6s-1.6.7-1.6 1.6v3.1c-1.3.1-2.6.4-3.9.7v-3.8c0-.9-.7-1.5-1.6-1.5s-1.6.7-1.6 1.5v5c-8 3.6-13.6 11.6-13.6 20.9 0 12.3 9.8 22.4 22 22.9h18.1v-9.7l-4.7-3.3zm-9.7-9.3c0 1.5-1.2 2.7-2.7 2.7s-2.7-1.2-2.7-2.7 1.2-2.7 2.7-2.7 2.7 1.2 2.7 2.7zm10.9 18.9h-12.9v-.1c-10.4 0-18.9-8.4-18.9-18.8 0-7 3.8-13.1 9.5-16.3v6.7c0 .8.7 1.5 1.6 1.5s1.6-.7 1.6-1.5v-8.2c1.2-.4 2.5-.7 3.9-.9.7-.1 1.5-.1 2.3-.1h.9c4 .2 7.7 1.6 10.8 4.1l-9.3 8.6c-.9-.5-2-.7-3.1-.7-3.7 0-6.8 3-6.8 6.8 0 3.7 3 6.8 6.8 6.8.6 0 1.1-.1 1.7-.2l2.1 1.5 9.9 7.2v3.6z' />
      </g>
    </svg>
  );
};

GitCoin.propTypes = {
  color: PropTypes.string,
  size: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

GitCoin.defaultProps = {
  color: 'currentColor',
  size: '24',
  stroke: '1',
};

export default GitCoin;
