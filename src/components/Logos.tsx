import LogoCana from '@/components/icon/LogoCana';
import LogoFS from '@/components/icon/LogoFS';

import { Link } from '@/i18n/routing';

function Logos() {
  return (
    <div className="flex items-center gap-4">
      <Link href="/" className="headerLink h-8 w-auto">
        <LogoFS />
      </Link>
      <div className="h-4 rotate-12 border-l-2 border-primary-70"></div>
      <Link href="https://www.lovecana.org.tw/index.php" className="headerLink h-8 w-auto">
        <LogoCana />
      </Link>
    </div>
  );
}
export default Logos;
