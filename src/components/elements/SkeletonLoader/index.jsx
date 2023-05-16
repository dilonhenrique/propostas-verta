import { AnimatePresence } from 'framer-motion';
import { Skeleton } from '@mui/material';

export default function SkeletonLoader({children, isLoading, ...otherProps}) {
  return (
    <AnimatePresence>
      {isLoading
        ? <Skeleton {...otherProps}>
            {children}
          </Skeleton>
        : <>{children}</>
      }
    </AnimatePresence>
  )
}
