'use client';

import { useEffect, useRef } from 'react';

import { Button } from 'antd';

type YearNavProps = {
  years: string[];
  activeYear: string;
  onSelect: (year: string) => void;
};

export default function YearNav({ years, activeYear, onSelect }: Readonly<YearNavProps>) {
  const activeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    activeRef.current?.scrollIntoView({ inline: 'center', block: 'nearest' });
  }, [activeYear]);

  return (
    <div className="overflow-x-auto">
      <div className="flex min-w-max px-4 py-2 sm:flex-wrap sm:justify-center sm:px-0">
        {years.map((year, index) => {
          const isActive = year === activeYear;
          const isLast = index === years.length - 1;

          return (
            <div className="flex items-center" key={year}>
              <Button
                type="link"
                ref={isActive ? activeRef : null}
                onClick={() => onSelect(year)}
                className={`
            text-xs !font-semibold transition-colors !p-1
            ${isActive ? '!text-primary-70' : '!text-primary-40 hover:!text-primary-50'}
          `}
              >
                {year}
              </Button>
              {!isLast && <div className="text-primary-40"> - </div>}
            </div>
          );
        })}
      </div>
    </div>
  );
}
