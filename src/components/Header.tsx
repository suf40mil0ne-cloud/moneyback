export default function Header() {
  function goHome() { window.location.href = '/'; }

  return (
    <header className="bg-white border-b border-gray-200">
      <div className="max-w-[1200px] mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2 cursor-pointer" onClick={goHome}>
          <img src="/logo.jpg" alt="정부부리핑" style={{ height: 36, width: 'auto' }} />
        </div>
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-gray-700">
          <span className="cursor-pointer hover:text-[#d41115]" onClick={goHome}>뉴스</span>
          <span className="cursor-pointer text-[#1d1d1d] border-b-2 border-[#1d1d1d] pb-1" onClick={goHome}>브리핑</span>
          <span className="cursor-pointer hover:text-[#d41115]" onClick={goHome}>정책자료</span>
          <span className="cursor-pointer hover:text-[#d41115]" onClick={goHome}>구독&amp;참여</span>
        </nav>
      </div>
    </header>
  );
}
