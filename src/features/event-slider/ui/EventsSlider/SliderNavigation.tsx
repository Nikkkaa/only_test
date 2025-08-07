import React from 'react';
import { Icon } from '@/shared/ui';
import { SwiperNavButton } from './Styled';

interface Props {
  className: string;
  position: 'left' | 'right';
  hidden?: boolean;
}

export const SliderNavigation: React.FC<Props> = ({ className, position, hidden }) => (
  <SwiperNavButton className={className} variant="navigation" position={position} $hidden={hidden}>
    <Icon name={position === 'left' ? 'arrow-left' : 'arrow-right'} />
  </SwiperNavButton>
);
