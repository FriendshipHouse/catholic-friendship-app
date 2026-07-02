'use client';

import { useState } from 'react';

import { Button } from 'antd';
import { useTranslations } from 'next-intl';
import Image from 'next/image';

import LineModal from '@/components/layout/LineModal';

import canaImage from '@/../public/general/img-cana.png';
import { Link } from '@/i18n/routing';

function Statement() {
  const t = useTranslations('statement');
  const [lineModalOpen, setLineModalOpen] = useState(false);

  return (
    <div className="flex flex-col justify-center gap-10 p-5">
      <div className="flex flex-col gap-4 items-center md:flex-row md:gap-10 md:items-center md:justify-around">
        <Image src={canaImage} alt="canaImage" loading="lazy" />

        <div className="flex flex-col gap-5">
          <div className="leading-7 whitespace-pre-wrap">{t('paragraph')}</div>

          <div>
            <div className="leading-7 whitespace-pre-wrap">{t('official_channels_title')}</div>
            <div className="flex gap-2 items-center">
              <div className="leading-7 whitespace-pre-wrap">{t('official_channels_website')}</div>
              <Link href="/">{t('official_channels_website_link')}</Link>
            </div>
            <div className="flex gap-2 items-center">
              <p>LINE ID: </p>
              <Button
                type="text"
                className="text-lg !p-0 hover:!bg-transparent !text-primary hover:!text-primary-40"
                onClick={() => setLineModalOpen(true)}
                aria-label="Show a model of Line ID"
              >
                lovecana2015
              </Button>
              <LineModal open={lineModalOpen} setOpen={setLineModalOpen} />
            </div>
            <div className="flex gap-2 items-center">
              <div className="leading-7 whitespace-pre-wrap">IG: </div>
              <Link href="https://www.instagram.com/miracle_in_cana/" target="_blank">
                miracle_in_cana / {t('official_channels_ig_link')}
              </Link>
            </div>
            <div className="flex gap-2 items-center">
              <div className="leading-7 whitespace-pre-wrap">Email: lovecana2015@gmail.com</div>
            </div>
          </div>

          <div className="leading-7 whitespace-pre-wrap">{t('reminder')}</div>
          <div className="leading-7 whitespace-pre-wrap">{t('fake_accounts_section_1')}</div>
          <div className="leading-7 whitespace-pre-wrap">{t('fake_accounts_section_2')}</div>
          <div className="leading-7 whitespace-pre-wrap">{t('warning_paragraph')}</div>
          <div className="leading-7 whitespace-pre-wrap font-semibold">{t('warning_bold')}</div>
          <div className="leading-7 whitespace-pre-wrap">{t('blessing')}</div>
          <div className="leading-7 whitespace-pre-wrap">{t('signature')}</div>
        </div>
      </div>
    </div>
  );
}

export default Statement;
