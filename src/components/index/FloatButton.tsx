'use client';

import { Link } from '@/i18n/routing';

import IconDollar from '../icon/IconDollar';
import IconFB from '../icon/IconFB';

function FloatButton() {
  return (
    <div className="fixed gap-2 bottom-8 left-8 z-20 hidden flex-col justify-end sm:flex">
      <Link
        href={`/house/donate`}
        className="flex h-8 w-8 items-center justify-center rounded-2xl bg-primary shadow-lg hover:bg-primary-50"
      >
        <div className="h-6 w-auto text-white">
          <IconDollar />
        </div>
      </Link>
      <Link
        href="https://www.facebook.com/groups/113455488704730/?ref=share"
        className="flex h-8 w-8 items-end justify-center rounded-2xl bg-primary shadow-lg hover:bg-primary-50 overflow-hidden"
      >
        <div className="h-6 text-white">
          <IconFB />
        </div>
      </Link>
    </div>
  );
}

export default FloatButton;
