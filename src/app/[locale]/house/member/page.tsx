'use client';

import MemberCard from '@/components/house/member/MemberCard';

import avatarCai from '@/../public/about/avatars/img-member-cai.png';
import avatarMa from '@/../public/about/avatars/img-member-ma.png';
import avatarQiu from '@/../public/about/avatars/img-member-qiu.png';
import avatarSu from '@/../public/about/avatars/img-member-su.png';
import avatarTang from '@/../public/about/avatars/img-member-tang.png';
import avatarWang from '@/../public/about/avatars/img-member-wang.png';


function Members() {
  const memberList = [
    { value: 'ma', position: '指導神師', name: '馬智明 神父', avatarSrc: avatarMa },
    { value: 'tang', position: '牧靈工作者', name: '唐曉倫 小姐', avatarSrc: avatarTang },
    { value: 'cai', position: '牧靈工作者', name: '蔡宜蓁 小姐', avatarSrc: avatarCai },
    { value: 'su', position: '牧靈工作者', name: '蘇美紗 小姐', avatarSrc: avatarSu },
    { value: 'qiu', position: '牧靈工作者', name: '邱加利 老師', avatarSrc: avatarQiu },
    { value: 'wang', position: '牧靈工作者', name: '王沛琪 小姐', avatarSrc: avatarWang },
  ];

  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
      {memberList.map(({ value, position, name, avatarSrc }) => (
        <MemberCard key={value} position={position} name={name} avatarSrc={avatarSrc} />
      ))}
    </div>
  );
}

export default Members;
