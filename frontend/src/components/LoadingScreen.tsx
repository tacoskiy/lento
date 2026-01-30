export default function LoadingScreen() {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-gradient-to-br from-[#8A76E8] to-[#4C3B9E] text-white">
      {/* Background Circles - Purely decorative */}
      <div className="absolute inset-0 flex items-center justify-center overflow-hidden pointer-events-none opacity-30">
        <div className="absolute w-[600px] h-[600px] rounded-full border border-white/20"></div>
        <div className="absolute w-[500px] h-[500px] rounded-full border border-white/20"></div>
        <div className="absolute w-[400px] h-[400px] rounded-full border border-white/20"></div>
        <div className="absolute w-[300px] h-[300px] rounded-full border border-white/20"></div>
        <div className="absolute w-[700px] h-[700px] rounded-full border border-white/20"></div>
      </div>

      {/* Loading Animation - 3 Dots */}
      <div className="relative z-10 mb-16">
        <div className="relative w-24 h-24 animate-spin-slow">
           <div className="absolute top-0 left-1/2 -translate-x-1/2 w-6 h-6 bg-white rounded-full shadow-[0_0_10px_rgba(255,255,255,0.5)]"></div>
           <div className="absolute bottom-1 right-1 w-6 h-6 bg-white rounded-full shadow-[0_0_10px_rgba(255,255,255,0.5)]"></div>
           <div className="absolute bottom-1 left-1 w-6 h-6 bg-white rounded-full shadow-[0_0_10px_rgba(255,255,255,0.5)]"></div>
        </div>
      </div>

      {/* Text */}
      <div className="relative z-10 text-center space-y-2">
        <p className="font-bold text-lg tracking-wide">あなたにあった</p>
        <p className="font-bold text-lg tracking-wide">ニュースを選んでいます...</p>
      </div>

      <style jsx>{`
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 3s linear infinite;
        }
      `}</style>
    </div>
  );
}
