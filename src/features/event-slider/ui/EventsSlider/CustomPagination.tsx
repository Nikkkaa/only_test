import React from 'react';
import { CustomPagination, PaginationBullet } from './Styled';

interface Props {
  total: number;
  activeIndex: number;
  onBulletClick: (index: number) => void;
}

export const CustomPaginationComponent: React.FC<Props> = ({
  total,
  activeIndex,
  onBulletClick,
}) => (
  <CustomPagination>
    {Array.from({ length: total }).map((_, index) => (
      <PaginationBullet
        key={index}
        $active={index === activeIndex}
        onClick={() => onBulletClick(index)}
      />
    ))}
  </CustomPagination>
);
