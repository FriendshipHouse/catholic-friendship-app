'use client';

import { useTranslations } from 'next-intl';

import MemberCard from '@/components/house/member/MemberCard';

import avatarCai from '@/../public/about/avatars/img-member-cai.png';
import avatarMa from '@/../public/about/avatars/img-member-ma.png';
import avatarQiu from '@/../public/about/avatars/img-member-qiu.png';
import avatarSu from '@/../public/about/avatars/img-member-su.png';
import avatarTang from '@/../public/about/avatars/img-member-tang.png';
import avatarWang from '@/../public/about/avatars/img-member-wang.png';

function Members() {
  const t = useTranslations('houseMember');
  const memberList = [
    { value: 'ma', position: 'positionPriest', avatarSrc: avatarMa },
    { value: 'tang', position: 'positionWorker', avatarSrc: avatarTang },
    { value: 'cai', position: 'positionWorker', avatarSrc: avatarCai },
    { value: 'su', position: 'positionWorker', avatarSrc: avatarSu },
    { value: 'qiu', position: 'positionWorker', avatarSrc: avatarQiu },
    { value: 'wang', position: 'positionWorker', avatarSrc: avatarWang },
  ];

  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
      {memberList.map(({ value, position, avatarSrc }) => (
        <MemberCard key={value} position={t(position)} name={t(value)} avatarSrc={avatarSrc} />
      ))}
    </div>
  );
}

export default Members;
