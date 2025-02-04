import LogoCana from '@/components/icon/LogoCana';
import LogoFS from '@/components/icon/LogoFS';

import { Link } from '@/i18n/routing';

function Logos() {
  return (
    <div className="flex items-center gap-4">
      <Link href="/" className="headerLink h-8 w-auto" aria-label="Go to index page">
        <LogoFS />
      </Link>
      <div className="h-4 rotate-12 border-l border-primary-70" />
      <Link
        href="https://www.lovecana.org.tw/index.php"
        target="_blank"
        className="headerLink h-8 w-auto"
        aria-label="Go out to love cana page"
      >
        <LogoCana />
      </Link>
    </div>
  );
}
export default Logos;
