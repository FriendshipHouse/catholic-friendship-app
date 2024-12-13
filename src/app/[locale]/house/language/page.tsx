'use client';

const content = {
  title: '【重要公告】',
  paragraph:
    '本語言中心已於2024年05月終止服務。\n若有教會內有學習中文之家教需求，敬請來信或來電洽詢，可轉介合適家教老師。',
  contact: '聯絡資訊：',
  info: '電話 :（02）2314-1833\nE-mail : friendho@ms61.hinet.net',
};

function Language() {
  return (
    <div className="flex flex-col gap-6 whitespace-pre-wrap leading-6">
      <div className="text-lg font-bold">{content.title}</div>
      <p>{content.paragraph}</p>
      <div className="flex flex-col gap-4">
        <div className="text-lg font-bold">{content.contact}</div>
        <p>{content.info}</p>
      </div>
    </div>
  );
}

export default Language;
