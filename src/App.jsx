import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function App() {
  const [showProjects, setShowProjects] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

  const [showNetworkModal, setShowNetworkModal] = useState(false);
  const [userIp, setUserIp] = useState('Fetching...');
  const [pingData, setPingData] = useState([]);
  const [isPinging, setIsPinging] = useState(false);
  const [speedTest, setSpeedTest] = useState({ download: 0, upload: 0, latency: 0, stage: 'idle' });
  const [serverTime, setServerTime] = useState('');

  const [showChatBot, setShowChatBot] = useState(false);
  const [chatMessages, setChatMessages] = useState([
    { id: 1, text: "Halo! Gue DTECH BOT. Ada yang bisa dibantu seputar keluhan gadget atau jaringan lu?", isBot: true }
  ]);
  const [inputChat, setInputChat] = useState('');

  // FITUR BARU: State pilihan mode layout (null = belum milih, disuruh milih dulu)
  const [layoutMode, setLayoutMode] = useState(null);

  useEffect(() => {
    if (showNetworkModal) {
      fetch('https://api.ipify.org?format=json')
        .then(res => res.json())
        .then(data => setUserIp(data.ip))
        .catch(() => setUserIp('192.168.1.1 (Demo/Error)'));
      runPingTest();
    }
  }, [showNetworkModal]);

  useEffect(() => {
    const timer = setInterval(() => {
      const timeString = new Date().toLocaleTimeString('id-ID', { timeZone: 'Asia/Jakarta' });
      setServerTime(timeString + ' WIB');
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const runPingTest = async () => {
    setIsPinging(true);
    setPingData([]);
    for (let count = 0; count < 4; count++) {
      const startTime = performance.now();
      try {
        await fetch('https://1.1.1.1/cdn-cgi/trace', { method: 'HEAD', mode: 'no-cors', cache: 'no-store' });
        const endTime = performance.now();
        const duration = Math.round(endTime - startTime);
        setPingData(prev => [...prev, `Reply from DTECH_SERVER: bytes=32 time=${duration}ms TTL=64`]);
      } catch (err) {
        setPingData(prev => [...prev, `Request timed out.`]);
      }
      await new Promise(resolve => setTimeout(resolve, 600));
    }
    setIsPinging(false);
  };

  const runSpeedTest = async () => {
    setSpeedTest({ download: 0, upload: 0, stage: 'testing_dl' });
    try {
      const dlStart = performance.now();
      const dlRes = await fetch('https://speed.cloudflare.com/__down?bytes=5000000', { cache: 'no-store' });
      if (!dlRes.ok) throw new Error();
      await dlRes.blob();
      const dlEnd = performance.now();
      const dlDuration = (dlEnd - dlStart) / 1000;
      const dlMbps = parseFloat(((5000000 * 8) / (dlDuration * 1000000)).toFixed(2));

      setSpeedTest(prev => ({ ...prev, download: dlMbps, stage: 'testing_ul' }));

      const ulData = new Blob([new Uint8Array(1500000)]);
      const ulStart = performance.now();
      await fetch('https://speed.cloudflare.com/__up', {
        method: 'POST',
        body: ulData,
        cache: 'no-store',
        mode: 'no-cors'
      });
      const ulEnd = performance.now();
      const ulDuration = (ulEnd - ulStart) / 1000;
      const ulMbps = parseFloat(((1500000 * 8) / (ulDuration * 1000000)).toFixed(2));

      setSpeedTest({ download: dlMbps, upload: ulMbps, stage: 'done' });
    } catch (error) {
      setSpeedTest({ download: 0, upload: 0, stage: 'idle' });
    }
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!inputChat.trim()) return;

    const userMsg = inputChat;
    setChatMessages(prev => [...prev, { id: Date.now(), text: userMsg, isBot: false }]);
    setInputChat('');

    setTimeout(() => {
      let botReply = "Waduh, maaf saya Asisten masih dalam tahap BETA jadi menjawab terbatas kamu bisa coba ketik kata kunci kayak 'servis', 'harga', 'lokasi'..." ;
      const msgLower = userMsg.toLowerCase();

      if (msgLower.includes('servis') || msgLower.includes('service') || msgLower.includes('rusak') || msgLower.includes('hp')) {
        botReply = "DTECH HUB melayani servis hardware (ganti LCD, baterai, ic, dll) and juga optimasi software PC/Laptop. Langsung klik tombol WhatsApp di bawah buat booking, gratis konsultasi! 🛠️";
      } else if (msgLower.includes('harga') || msgLower.includes('biaya') || msgLower.includes('berapa')) {
        botReply = "Biaya bervariasi tergantung kerusakan. Tapi tenang aja, pengerjaan di DTECH HUB dijamin transparan, presisi, dan ramah di kantong pelajar/mahasiswa! 💸";
      } else if (msgLower.includes('lokasi') || msgLower.includes('alamat') || msgLower.includes('dimana')) {
        botReply = "Markas utama DTECH HUB ada di Pringsewu, Lampung. Untuk info detail maps-nya, langsung chat via WhatsApp admin ya! 📍";
      } else if (msgLower.includes('halo') || msgLower.includes('p') || msgLower.includes('woi') || msgLower.includes('assalamualaikum')) {
        botReply = "Selamat Datang! Butuh bantuan atau ada yang lagi bermasalah? Sini curhatin ke gue! 😎";
      }

      setChatMessages(prev => [...prev, { id: Date.now() + 1, text: botReply, isBot: true }]);
    }, 800);
  };

  // Fungsi helper untuk menentukan grid kolom berdasarkan mode yang dipilih user
  const getGridStyle = () => {
    if (layoutMode === 'computer') {
      return { gridTemplateColumns: '1.2fr 0.8fr', padding: '0 10%', gap: '40px' };
    }
    if (layoutMode === 'tablet') {
      return { gridTemplateColumns: '1.1fr 0.9fr', padding: '0 5%', gap: '20px' };
    }
    if (layoutMode === 'phone') {
      return { gridTemplateColumns: '1fr', padding: '0 5%', gap: '30px' };
    }
    return { gridTemplateColumns: window.innerWidth > 768 ? '1.2fr 0.8fr' : '1fr', padding: '0 10%', gap: '40px' };
  };

  return (
    <div className="min-h-screen bg-[#F9FAFB] overflow-x-hidden selection:bg-purple-100 font-sans">
      
      {/* SCREEN SELECTOR (EFEK TRANSPARAN BLUR PREMIUM) */}
      <AnimatePresence>
        {!layoutMode && (
          <motion.div 
            initial={{ opacity: 1 }} 
            exit={{ opacity: 0 }} 
            className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-slate-900/60 backdrop-blur-xl text-white p-6"
          >
            <motion.h2 
              initial={{ y: -20 }} 
              animate={{ y: 0 }} 
              className="text-3xl md:text-4xl font-black tracking-tighter mb-2 text-center drop-shadow-md"
            >
              WELCOME TO <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#2563EB] to-[#6D28D9]">DTECH HUB</span>
            </motion.h2>
            <p className="text-gray-200 text-xs md:text-sm font-mono uppercase tracking-widest mb-10 text-center drop-shadow-sm">
              Silahkan pilih mode tampilan device untuk simulasi layout:
            </p>

            <div className="flex flex-col sm:flex-row gap-6 w-full max-w-3xl justify-center items-center">
              {/* Tombol HP */}
              <motion.button 
                whileHover={{ scale: 1.05 }} 
                whileTap={{ scale: 0.95 }}
                onClick={() => setLayoutMode('phone')}
                className="bg-slate-900/40 backdrop-blur-md border border-white/10 hover:border-blue-500 w-full sm:w-48 h-40 rounded-3xl flex flex-col items-center justify-center gap-3 transition-all group shadow-2xl"
              >
                <span className="text-4xl group-hover:animate-bounce">📱</span>
                <span className="font-bold tracking-wider text-sm">LAYOUT HP</span>
              </motion.button>

              {/* Tombol Tablet */}
              <motion.button 
                whileHover={{ scale: 1.05 }} 
                whileTap={{ scale: 0.95 }}
                onClick={() => setLayoutMode('tablet')}
                className="bg-slate-900/40 backdrop-blur-md border border-white/10 hover:border-purple-500 w-full sm:w-48 h-40 rounded-3xl flex flex-col items-center justify-center gap-3 transition-all group shadow-2xl"
              >
                <span className="text-4xl group-hover:animate-bounce">📟</span>
                <span className="font-bold tracking-wider text-sm">LAYOUT TABLET</span>
              </motion.button>

              {/* Tombol Komputer */}
              <motion.button 
                whileHover={{ scale: 1.05 }} 
                whileTap={{ scale: 0.95 }}
                onClick={() => setLayoutMode('computer')}
                className="bg-slate-900/40 backdrop-blur-md border border-white/10 hover:border-emerald-500 w-full sm:w-48 h-40 rounded-3xl flex flex-col items-center justify-center gap-3 transition-all group shadow-2xl"
              >
                <span className="text-4xl group-hover:animate-bounce">🖥️</span>
                <span className="font-bold tracking-wider text-sm">LAYOUT KOMPUTER</span>
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <svg className="hidden">
        <defs>
          <filter id="liquid-goo">
            <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
            <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7" result="goo" />
            <feBlend in="SourceGraphic" in2="goo" />
          </filter>
        </defs>
      </svg>

      <nav className="fixed top-0 w-full z-50 flex justify-between items-center px-6 md:px-20 py-6 backdrop-blur-xl bg-white/40 border-b border-white/40 shadow-sm transition-all duration-300">
        
        <div 
          className="text-xl md:text-2xl font-black tracking-tighter text-[#1F2937] cursor-pointer drop-shadow-sm hover:opacity-80 transition shrink-0" 
          onClick={() => setShowProjects(false)}
        >
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#2563EB] to-[#6D28D9]">DTECH </span>HUB SERVER
        </div>

        <div className="flex items-center gap-4 md:gap-8 font-bold text-[10px] md:text-[11px] uppercase tracking-widest text-[#1F2937]/70">
          
          {layoutMode && (
            <button 
              onClick={() => setLayoutMode(null)}
              className="text-[9px] bg-gray-200 text-gray-700 px-2 py-1 rounded-md hover:bg-gray-300 transition"
            >
              🔄 GANTI DEVICE ({layoutMode})
            </button>
          )}

          <a href="#about" className="hover:text-[#2563EB] transition-all">About</a>

          <button 
            onClick={() => setShowNetworkModal(true)}
            className="flex items-center gap-1 bg-blue-50 text-blue-600 px-3 py-1.5 rounded-full hover:bg-blue-100 transition-all border border-blue-200 normal-case font-bold"
          >
            <span className="animate-pulse">🌐</span> NETWORK TOOLS
          </button>

          <button 
            onClick={() => setShowChatBot(true)}
            className="flex items-center gap-1 bg-purple-50 text-purple-600 px-3 py-1.5 rounded-full hover:bg-purple-100 transition-all border border-purple-200 normal-case font-bold"
          >
            <span>🤖</span> DTECH BOT
          </button>
          
          <div className="relative">
            <button 
              onClick={() => setShowDropdown(!showDropdown)}
              onBlur={() => setTimeout(() => setShowDropdown(false), 200)}
              className="bg-[#1F2937] text-white px-5 md:px-8 py-2 md:py-2.5 rounded-full hover:scale-105 hover:bg-black transition-all shadow-lg text-[9px] md:text-[10px] flex items-center gap-1"
            >
              PORTOFOLIO
              <svg className={`w-3 h-3 transition-transform duration-200 ${showDropdown ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            <AnimatePresence>
              {showDropdown && (
                <motion.div 
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="absolute right-0 mt-2 w-40 bg-white/90 backdrop-blur-md border border-gray-100 rounded-2xl shadow-xl overflow-hidden z-50 py-1"
                >
                  <a 
                    href="https://youtube.com/@NgulikTekaje" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-3 text-[11px] text-gray-700 hover:bg-red-50 hover:text-red-600 font-bold transition-all normal-case"
                  >
                    <span>▶</span> YouTube
                  </a>

                  <a 
                    href="https://instagram.com/wntr_daw" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-3 text-[11px] text-gray-700 hover:bg-pink-50 hover:text-pink-600 font-bold transition-all border-b border-gray-50 normal-case"
                  >
                    <span>📸</span> Instagram
                  </a>

                  <a 
                    href="https://github.com/Dawredos" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-3 text-[11px] text-gray-700 hover:bg-purple-50 hover:text-purple-600 font-bold transition-all normal-case"
                  >
                    <span>💻</span> GitHub Web
                  </a>

                  <a 
                    href="https://www.linkedin.com/in/adam-winatra-b3984936b/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-3 text-[11px] text-gray-700 hover:bg-blue-50 hover:text-blue-600 font-bold transition-all border-b border-gray-50 normal-case"
                  >
                    <span>💼</span> LinkedIn Profile
                  </a>
                  
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </nav>

      <AnimatePresence mode="wait">
        {!showProjects ? (
          <motion.div 
            key="home-wrapper"
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0, filter: "blur(20px)" }}
          >
            <section 
              style={{ 
                display: 'grid', 
                alignItems: 'center', 
                minHeight: '100vh', 
                ...getGridStyle() 
              }}
              className="relative pt-24"
            >
              {/* Bagian Kiri: Teks */}
              <div className={`z-10 ${layoutMode === 'phone' ? 'text-center flex flex-col items-center' : 'text-left'}`}>
                <span className="inline-block px-4 py-1 rounded-full bg-purple-50 text-[#6D28D9] text-[10px] font-bold mb-6 tracking-[0.2em] uppercase border border-purple-100">
                  Tech Analyst Pringsewu
                </span>
                <h1 className={`${layoutMode === 'phone' ? 'text-4xl' : layoutMode === 'tablet' ? 'text-5xl' : 'text-6xl md:text-[8rem]'} font-[1000] text-[#1F2937] leading-[0.85] tracking-tighter`}>
                  IT {layoutMode === 'phone' ? ' ' : <br />} 
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#2563EB] via-[#6D28D9] to-indigo-600">SERVICES.</span>
                </h1>
                <p className="mt-8 text-lg text-[#1F2937]/60 max-w-md font-medium leading-relaxed">
                  Adalah pokoknya, kalo ada apa apa tentang keluhan gadget barangkali bisa konsultasi, btw untuk konsultasi free dong bisa hubungi kontak yang tersedia, atau kepoin pencapaian gue bisa liat project yang masih di kembangkan ini...🤭
                </p>
                
                <div className={`flex flex-wrap gap-6 mt-10 ${layoutMode === 'phone' ? 'justify-center' : 'justify-start'} items-center`}>
                  <div style={{ filter: 'url(#liquid-goo)' }} className="relative flex items-center">
                    <motion.button 
                      onClick={() => setShowProjects(true)}
                      whileHover={{ scale: 1.05 }}
                      className="bg-[#1F2937] text-white px-12 py-5 rounded-2xl font-bold relative z-10 cursor-pointer shadow-xl"
                    >
                      My Pencapaian Gwejh Loh Ya 😹
                    </motion.button>
                    <motion.div animate={{ x: [0, 30, 0], y: [0, -10, 0] }} transition={{ duration: 4, repeat: Infinity }} className="absolute w-10 h-10 bg-[#6D28D9] rounded-full -z-10" />
                  </div>
                </div>
              </div>

              {/* Bagian Kanan: Kartu Profil */}
              <div className={`flex ${layoutMode === 'phone' ? 'justify-center mt-6' : 'justify-end'} items-center relative mt-12 md:mt-0`}>
                <div className="absolute w-80 h-80 bg-purple-400/10 blur-[120px] rounded-full animate-pulse"></div>
                <motion.div 
                  animate={{ y: [0, +58, 0], rotateZ: [0, 8, -7, 0] }} 
                  transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }} 
                  className="relative w-80 h-[480px] backdrop-blur-2xl bg-white/40 border border-white/60 rounded-[50px] shadow-2xl flex flex-col items-center justify-between p-10 overflow-hidden"
                >
                  <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-white/20 to-transparent"></div>
                  <div className="relative z-10 w-full flex flex-col items-center">
                    <div className="w-full aspect-square bg-white/80 rounded-[35px] p-6 shadow-inner flex items-center justify-center border border-white/40 overflow-hidden">
                      <img src="/src/assets/logo-dtech.jpeg" alt="Logo" className="w-full h-auto object-contain" />
                    </div>
                  </div>
                  <div className="relative z-10 w-full bg-slate-900/5 py-4 px-6 rounded-3xl border border-white/20 text-center">
                    <p className="text-[9px] font-black text-blue-600 tracking-[0.4em] uppercase mb-1">Adam Winatra</p>
                    <div className="flex items-center justify-center gap-3">
                      <div className="relative flex h-3 w-3">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500 shadow-[0_0_10px_#22c55e]"></span>
                      </div>
                      <h3 className="text-xl font-bold text-[#1F2937] tracking-tight">ONLINE ADMIN</h3>
                    </div>
                  </div>
                  <div className="w-full flex justify-between px-2 opacity-30 font-mono text-[8px] uppercase tracking-widest leading-none text-[#1F2937]">
                    <div>CPU: Intel Core i5 vPro <br /> Port: 5173</div>
                    <div className="text-right">Status: Stable <br /> Lat: 12ms</div>
                  </div>
                </motion.div>
              </div>
            </section>

            <section id="about" className="py-32 px-8 md:px-20 bg-white">
              <div className="max-w-4xl mx-auto">
                <h2 className="text-5xl font-black text-[#1F2937] mb-8 tracking-tighter italic">TENTANG DTECH HUB</h2>
                <p className="text-xl text-[#1F2937]/50 leading-relaxed font-medium">
                  DTECH HUB adalah usaha jasa yang bergerak di bidang perbaikan maintenance hardware gadget and solusi device komputer. Usaha ini masih dalam perkembangan diperkenalkan dengan identitasnya pada 21 Oktober 2024. Pendirinya adalah Adam Winatra, seorang teknisi muda yang membangun usaha ini untuk menyediakan layanan teknis yang presisi, mulai dari servis smartphone hingga pengelolaan infrastruktur jaringan yang aman and terstruktur.
                </p>
              </div>
            </section>

            <section className="py-20 px-8 md:px-20 bg-[#1F2937] text-white rounded-t-[50px]">
              <div className="flex flex-col md:flex-row justify-between items-center max-w-6xl mx-auto gap-8">
                <h2 className="text-4xl font-black tracking-tighter">Silahkan yang ingin bertanya atau berkonsultasi..</h2>
                <a 
                  href="https://wa.me/6282179175960?text=Halo%20Min%20saya%20mau%20konsultasi%20dong..."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-gradient-to-r from-[#2563EB] to-[#6D28D9] hover:opacity-90 text-white px-10 py-4 rounded-2xl font-bold transition-all shadow-xl shadow-blue-900/20 text-center"
                >
                  Hubungi kami via WhatsApp
                </a>
              </div>
            </section>
          </motion.div>
        ) : (
          <motion.section 
            key="projects"
            initial={{ opacity: 0, scale: 0.9, filter: "blur(20px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0 }}
            className="relative min-h-screen flex flex-col items-center justify-center px-8 text-center pt-24"
          >
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10">
              <motion.div animate={{ scale: [1, 1.2, 1], rotate: [0, 180, 360], borderRadius: ["40% 60% 70% 30%", "60% 40% 30% 70%", "40% 60% 70% 30%"] }} transition={{ duration: 12, repeat: Infinity }} className="w-[600px] h-[600px] bg-purple-400/5 blur-3xl" />
            </div>

            <h1 className="text-7xl md:text-[100px] font-black text-[#1F2937] tracking-tighter mb-12 uppercase">
             <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#2563EB] to-[#6D28D9]">ADAM </span>
             WINATRA
            </h1>

            <div style={{ filter: 'url(#liquid-goo)' }} className="relative flex gap-8 mb-20">
              <motion.button onClick={() => setShowProjects(false)} className="bg-[#2563EB] text-white px-12 py-6 rounded-full font-bold text-lg shadow-xl cursor-pointer relative z-10">
                Kembali
              </motion.button>
              <motion.div animate={{ x: [0, 15, 0], y: [0, -15, 0] }} transition={{ duration: 3, repeat: Infinity }} className="w-12 h-12 bg-[#6D28D9] rounded-full" />
            </div>

            <div className="flex flex-col gap-20 max-w-6xl w-full pb-32">
              {[
                { id: 1, icon: '✨', title: 'LULUS COY 😹😭😭', desc: 'Bangga Menjadi Alumni SMKS Muhammadiyah 1 Pringsewu dengan Menerapkan Prinsip Nilai Moral dan Keagamaan serta Skill sesuai dengan Kompetensi yang dimiliki Tahun 2023-2026', img: '/src/assets/lulus.jpeg' },
                { id: 2, icon: '🥇', title: 'PORSIKAM II SE-LAMPUNG', desc: 'Juara 2 Lomba Desain Poster dalam Event Official PORSIKAM Muhammadiyah se-Provinsi Lampung Tahun 2025', img: '/src/assets/porsikam.jpeg' },
                { id: 3, icon: '🥇', title: 'ITC TOEIC CERTIFICATION', desc: 'Sertifikasi Internasional Bahasa Inggris TOEIC Terverifikasi Diselenggarakan oleh Direktorat SMK Tahun 2025', img: '/src/assets/toeic.jpeg' },
                { id: 4, icon: '🥇', title: 'JUARA 2 DESAIN POSTER', desc: 'Penyerahan Medali Perak dan Sertifikat Juara 2 Membawa Nama Sekolah oleh Waka Kurikulum Tahun 2025', img: '/src/assets/upacara.jpeg' },
                { id: 7, icon: '🥇', title: 'SCIENCE LABOLATORY CHALLENGE', desc: 'Lomba Challenge Sience saat di Madrasah Tsanawiyah Pringsewu Juara 3, Fotonya ini blur karena difoto dengan hp jadul Tahun 2020', img: '/src/assets/ipa.jpeg' },
                { id: 8, icon: '🥇', title: 'E|HE Certification', desc: 'Pencapaian Sertifikat Internasional Course Junior Cybersecurity yang Diselenggarakan oleh EC-Council Tahun 2024', img: '/src/assets/ehe.jpeg' },
                { id: 9, icon: '☪', title: 'ISRA MIʾRAJ 2025', desc: 'Kultum Singkat mengenai Materi Isra Miʾraj di SMK Muhammadiyah 1 Pringsewu Tahun 2025', img: '/src/assets/islam.jpeg' },
                { id: 10, icon: '🏔', title: 'TEKTOK 1662 MDPL', desc: 'Tektok MT.PESAWARAN Dengan Ketinggian 1662 Mdpl Minimal Sekali Seumur Hidup lah ya FOMO Tahun 2025 🤭', img: '/src/assets/muncak.jpeg' },
                { id: 11, icon: '📽', title: 'PROJECT LAST CEREMONY', desc: 'Membuka Project untuk Menawarkan Jasa Konten Cinematic Upacara Terakhir di Sekolah bersama Rekan Tim Tahun 2026', img: '/src/assets/foto.jpeg' },
                { id: 12, icon: '🖥', title: 'PROJECT TECHNICIAN', desc: 'Membuka Project Usaha untuk Menawarkan Jasa Servis dan Maintenance Device Gadget Handphone, Komputer, atau Laptop dengan harga terjangkau tahun 2023', img: '/src/assets/servis.jpeg' },
                { id: 13, icon: '🌐', title: 'PROJECT NETWORKING', desc: 'Implementasi Konfigurasi Data Server, MikroTik & Cisco optimisasi keamanan jaringan dan server monitoring.', img: '/src/assets/jaringan.jpeg' },
              ].map((project) => (
                <motion.div 
                  key={project.id}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  className="group relative w-full"
                >
                  <div className="relative w-full h-[500px] md:h-[650px] overflow-hidden rounded-[50px] shadow-2xl bg-slate-200">
                    <motion.img 
                      initial={{ scale: 1.2 }}
                      whileInView={{ scale: 1 }}
                      transition={{ duration: 1.5 }}
                      src={project.img} 
                      alt={project.title} 
                      className="w-full h-full object-cover"
                      onError={(e) => { e.target.src = "https://via.placeholder.com/1200x800?text=DTECH+HUB+BIG+PROJECT"; }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#1F2937] via-[#1F2937]/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-500" />
                    <div className="absolute bottom-0 left-0 p-10 md:p-16 text-left">
                      <div className="flex items-center gap-4 mb-4">
                        <span className="w-14 h-14 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center text-3xl border border-white/20">
                          {project.icon}
                        </span>
                        <h3 className="text-3xl md:text-5xl font-black text-white uppercase tracking-tighter">
                          {project.title}
                        </h3>
                      </div>
                      <p className="text-white/70 text-lg md:text-xl max-w-2xl font-medium leading-relaxed">
                        {project.desc}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.section>
        )}
      </AnimatePresence>

      <footer className="py-12 px-8 md:px-20 border-t border-gray-100 bg-white">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex flex-col items-center md:items-start">
            <div className="text-xl font-black tracking-tighter text-[#1F2937]">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#2563EB] to-[#6D28D9]">DTECH </span>HUB
            </div>
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.3em] mt-1">
              Gadget Analyst & Network Solution
            </p>
          </div>
          
          <div className="text-center md:text-right">
            <p className="text-sm font-medium text-[#1F2937]/60">
              © 2024 - {new Date().getFullYear()} <span className="text-[#1F2937] font-bold">DTECH HUB.</span> All Rights Reserved.
            </p>
            <p className="text-[10px] text-gray-400 font-mono mt-1 uppercase tracking-widest">
              Developed by Adam Winatra
            </p>
          </div>
        </div>
      </footer>

      {/* MODAL NETWORK CHECKER & CHATBOT TETAP SAMA */}
      <AnimatePresence>
        {showNetworkModal && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-md">
            <motion.div initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 20 }} className="bg-[#1F2937] border border-gray-700 w-full max-w-lg rounded-3xl p-6 shadow-2xl text-white font-mono relative overflow-hidden">
              <button onClick={() => setShowNetworkModal(false)} className="absolute top-4 right-4 text-gray-400 hover:text-white text-xl font-sans font-bold">✕</button>
              
              <h3 className="text-lg font-black text-blue-400 border-b border-gray-700 pb-3 flex items-center gap-2">
                <span></span> DTECH NETWORK CHECKER (BETA)
              </h3>

              <div className="space-y-5 mt-4 text-xs">
                <div className="bg-slate-800/60 p-3 rounded-xl border border-gray-700/50">
                  <span className="text-gray-400 block mb-1">🕒 WAKTU SERVER WIB :</span>
                  <span className="text-base text-emerald-400 font-bold">{serverTime || "Loading Clock..."}</span>
                </div>

                <div className="bg-slate-800/60 p-3 rounded-xl border border-gray-700/50">
                  <span className="text-gray-400 block mb-1">📡 IP ADDRESS PUBLIK KAMU :</span>
                  <span className="text-sm text-sky-400 font-bold tracking-wider">{userIp}</span>
                </div>

                <div className="bg-black/80 p-4 rounded-xl border border-gray-800 min-h-[110px] flex flex-col justify-between">
                  <div>
                    <div className="text-gray-500 mb-1">$ ping -c 4 dtech-hub.server</div>
                    {pingData.map((p, index) => (
                      <motion.div initial={{ opacity: 0, x: -5 }} animate={{ opacity: 1, x: 0 }} key={index} className="text-green-400 font-bold text-[11px]">{p}</motion.div>
                    ))}
                  </div>
                  <button onClick={runPingTest} disabled={isPinging} className="mt-2 self-end text-[10px] px-3 py-1 bg-gray-800 hover:bg-gray-700 disabled:opacity-50 text-blue-400 font-bold rounded border border-gray-700">
                    {isPinging ? 'Pinging...' : 'Re-Run Ping'}
                  </button>
                </div>

                <div className="bg-slate-800/60 p-3 rounded-xl border border-gray-700/50 flex flex-col gap-3">
                  <span className="text-gray-400 block">🚀 SPEEDTEST DTECH SERVER (BETA) :</span>
                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div className="bg-black/30 p-2 rounded-lg">
                      <div className="text-[10px] text-purple-400 font-bold">DOWNLOAD</div>
                      <div className="text-xl font-black text-white">{speedTest.download} <span className="text-[10px] font-normal text-gray-400">Mbps</span></div>
                    </div>
                    <div className="bg-black/30 p-2 rounded-lg">
                      <div className="text-[10px] text-orange-400 font-bold">UPLOAD</div>
                      <div className="text-xl font-black text-white">{speedTest.upload} <span className="text-[10px] font-normal text-gray-400">Mbps</span></div>
                    </div>
                  </div>
                  <button onClick={runSpeedTest} disabled={speedTest.stage.startsWith('testing')} className="w-full py-2 bg-blue-600 hover:bg-blue-500 font-bold text-white rounded-xl transition-all disabled:opacity-50">
                    {speedTest.stage === 'idle' && 'AI DTECH Mengukur Kecepatan Internetmu'}
                    {speedTest.stage === 'testing_dl' && 'Tes Download...'}
                    {speedTest.stage === 'testing_ul' && 'Tes Upload...'}
                    {speedTest.stage === 'done' && 'Tes Ulang'}
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showChatBot && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[100] flex items-end sm:items-center justify-end p-4 sm:p-10 pointer-events-none">
            <motion.div initial={{ y: 50, scale: 0.95 }} animate={{ y: 0, scale: 1 }} exit={{ y: 50, scale: 0.95 }} className="bg-white border border-gray-100 w-full max-w-sm h-[480px] rounded-3xl shadow-2xl flex flex-col overflow-hidden pointer-events-auto">
              <div className="bg-[#1F2937] p-4 text-white flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-purple-500 flex items-center justify-center text-sm">🤖</div>
                  <div>
                    <h4 className="text-xs font-black tracking-wide">DTECH BOT (BETA)</h4>
                    <span className="text-[9px] text-green-400 flex items-center gap-1 font-bold font-mono"><span className="w-1.5 h-1.5 rounded-full bg-green-400 inline-block animate-ping"></span>ONLINE CORE</span>
                  </div>
                </div>
                <button onClick={() => setShowChatBot(false)} className="text-gray-400 hover:text-white font-bold text-sm">✕</button>
              </div>

              <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50 text-xs">
                {chatMessages.map(msg => (
                  <div key={msg.id} className={`flex ${msg.isBot ? 'justify-start' : 'justify-end'}`}>
                    <div className={`max-w-[80%] p-3 rounded-2xl font-medium leading-relaxed shadow-sm ${msg.isBot ? 'bg-white text-gray-800 rounded-tl-none border border-gray-100' : 'bg-gradient-to-r from-[#2563EB] to-[#6D28D9] text-white rounded-tr-none'}`}>
                      {msg.text}
                    </div>
                  </div>
                ))}
              </div>

              <form onSubmit={handleSendMessage} className="p-3 border-t border-gray-100 flex gap-2 bg-white">
                <input 
                  type="text" value={inputChat} onChange={(e) => setInputChat(e.target.value)}
                  placeholder="Masukkan kata kunci..."
                  className="flex-1 border border-gray-200 rounded-xl px-4 py-2 text-xs focus:outline-none focus:border-purple-500"
                />
                <button type="submit" className="bg-[#1F2937] text-white px-4 py-2 rounded-xl font-bold">Kirim</button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}