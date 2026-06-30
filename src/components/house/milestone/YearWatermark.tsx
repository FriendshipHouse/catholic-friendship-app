'use client';

import React from 'react';

interface YearWatermarkProps {
  year: string;
}

function YearWatermark({ year }: Readonly<YearWatermarkProps>) {
  return (
    <div className="pointer-events-none absolute right-0 top-6 z-0 font-bold xs:top-9 sm:top-0 text-[28pt] xs:text-[40pt] leading-none text-primary-30 sm:text-[80pt]">
      {year}
    </div>
  );
}

export default YearWatermark;
