import NextLink from 'next/link';
import { forwardRef } from 'react';

const LinkIntegration = forwardRef(function LinkIntegration(props, ref) {
  return <NextLink ref={ref} {...props} />;
});

export default LinkIntegration;