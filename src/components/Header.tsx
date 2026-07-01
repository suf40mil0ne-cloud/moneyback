export default function Header() {
  return (
    <header className="bg-white border-b border-gray-200">
      {/* Top utility bar */}
      <div className="bg-[#003a70] text-white text-xs py-1">
        <div className="max-w-[1200px] mx-auto px-4 flex justify-end gap-3">
          <span className="cursor-pointer hover:underline">닫기</span>
          <span className="cursor-pointer hover:underline">공직메일</span>
          <span className="cursor-pointer hover:underline">알림ON</span>
          <span className="cursor-pointer hover:underline">검색</span>
        </div>
      </div>

      {/* Main header */}
      <div className="max-w-[1200px] mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-[#003a70] rounded flex items-center justify-center">
              <span className="text-white text-xs font-bold">정</span>
            </div>
            <span className="text-[#003a70] font-bold text-xl">정책브리핑</span>
          </div>
        </div>

        {/* Navigation */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-gray-700">
          <span className="cursor-pointer hover:text-[#003a70]">뉴스</span>
          <span className="cursor-pointer hover:text-[#003a70] text-[#003a70] border-b-2 border-[#003a70] pb-1">브리핑</span>
          <span className="cursor-pointer hover:text-[#003a70]">정책자료</span>
          <span className="cursor-pointer hover:text-[#003a70]">구독&참여</span>
        </nav>
      </div>
    </header>
  );
}
