import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function App() {
  const [showProjects, setShowProjects] = useState(false);

  return (
    <div className="min-h-screen bg-[#F9FAFB] overflow-x-hidden selection:bg-purple-100 font-sans">
      
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
          <a href="#about" className="hover:text-[#2563EB] transition-all">About</a>
          <span className="hover:text-[#2563EB] cursor-pointer transition-all">Hardware</span>
          <span className="hover:text-[#2563EB] cursor-pointer transition-all">Network</span>
          
          <button className="bg-[#1F2937] text-white px-5 md:px-8 py-2 md:py-2.5 rounded-full hover:scale-105 hover:bg-black transition-all shadow-lg text-[9px] md:text-[10px]">
            PORTOFOLIO
          </button>
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
                gridTemplateColumns: window.innerWidth > 768 ? '1.2fr 0.8fr' : '1fr', 
                alignItems: 'center', 
                minHeight: '100vh', 
                padding: '0 10%', 
                gap: '40px' 
              }}
              className="relative pt-24"
            >
              <div className="z-10 text-left">
                <span className="inline-block px-4 py-1 rounded-full bg-purple-50 text-[#6D28D9] text-[10px] font-bold mb-6 tracking-[0.2em] uppercase border border-purple-100">
                  Tech Analyst Pringsewu
                </span>
                <h1 className="text-6xl md:text-[8rem] font-[1000] text-[#1F2937] leading-[0.85] tracking-tighter">
                  IT <br /> 
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#2563EB] via-[#6D28D9] to-indigo-600">SERVICES.</span>
                </h1>
                <p className="mt-8 text-lg text-[#1F2937]/60 max-w-md font-medium leading-relaxed">
                  Adalah pokoknya, kalo ada apa apa tentang keluhan gadget barangkali bisa konsultasi, btw untuk konsultasi free dong bisa hubungi kontak yang tersedia, atau kepoin pencapaian gue bisa liat project yang masih di kembangkan ini...🤭
                </p>
                
                <div className="flex flex-wrap gap-6 mt-10 justify-start items-center">
                  <div style={{ filter: 'url(#liquid-goo)' }} className="relative flex items-center">
                    <motion.button 
                      onClick={() => setShowProjects(true)}
                      whileHover={{ scale: 1.05 }}
                      className="bg-[#1F2937] text-white px-12 py-5 rounded-2xl font-bold relative z-10 cursor-pointer shadow-xl"
                    >
                      My Project Gwejh Loh Ya 😹
                    </motion.button>
                    <motion.div animate={{ x: [0, 30, 0], y: [0, -10, 0] }} transition={{ duration: 4, repeat: Infinity }} className="absolute w-10 h-10 bg-[#6D28D9] rounded-full -z-10" />
                  </div>
                </div>
              </div>

              <div className="flex justify-end items-center relative mt-12 md:mt-0">
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
                    <p className="text-[9px] font-black text-blue-600 tracking-[0.4em] uppercase mb-1">AdamWinatra</p>
                    <div className="flex items-center justify-center gap-3">
                      <div className="relative flex h-3 w-3">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500 shadow-[0_0_10px_#22c55e]"></span>
                      </div>
                      <h3 className="text-xl font-bold text-[#1F2937] tracking-tight">ONLINE ADMIN</h3>
                    </div>
                  </div>
                  <div className="w-full flex justify-between px-2 opacity-30 font-mono text-[8px] uppercase tracking-widest leading-none text-[#1F2937]">
                    <div>Core: D3-PRO <br /> Port: 5173</div>
                    <div className="text-right">Status: Stable <br /> Lat: 12ms</div>
                  </div>
                </motion.div>
              </div>
            </section>

            <section id="about" className="py-32 px-8 md:px-20 bg-white">
              <div className="max-w-4xl mx-auto">
                <h2 className="text-5xl font-black text-[#1F2937] mb-8 tracking-tighter italic">TENTANG DTECH HUB</h2>
                <p className="text-xl text-[#1F2937]/50 leading-relaxed font-medium">
                  DTECH HUB adalah usaha jasa yang bergerak di bidang perbaikan maintenance hardware gadget dan solusi device komputer. Usaha ini masih dalam perkembangan diperkenalkan dengan identitasnya pada 21 Oktober 2024. Pendirinya adalah Adam Winatra, seorang teknisi muda yang membangun usaha ini untuk menyediakan layanan teknis yang presisi, mulai dari servis smartphone hingga pengelolaan infrastruktur jaringan yang aman dan terstruktur.
                </p>
              </div>
            </section>

            <section className="py-20 px-8 md:px-20 bg-[#1F2937] text-white rounded-t-[50px]">
              <div className="flex flex-col md:flex-row justify-between items-center max-w-6xl mx-auto gap-8">
                <h2 className="text-4xl font-black tracking-tighter">Ready to fix your device?</h2>
                <button className="bg-gradient-to-r from-[#2563EB] to-[#6D28D9] hover:opacity-90 text-white px-10 py-4 rounded-2xl font-bold transition-all shadow-xl shadow-blue-900/20">
                  Contact via WhatsApp
                </button>
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
                { 
                  id: 1, 
                  icon: '🥇', 
                  title: 'PORSIKAM II LAMPUNG', 
                  desc: 'Juara 2 Lomba Desain Poster dalam Event Official PORSIKAM Muhammadiyah se-Provinsi Lampung Tahun 2025', 
                  img: '/src/assets/porsikam.jpeg' 
                },
                { 
                  id: 2, 
                  icon: '🥇', 
                  title: 'TOEIC CERTIFICATION', 
                  desc: 'Sertifikasi Internasional Bahasa Inggris TOEIC Terverifikasi Diselenggarakan oleh Direktorat SMK Tahun 2025', 
                  img: '/src/assets/toeic.jpeg' 
                },
                { 
                  id: 3, 
                  icon: '🥇', 
                  title: 'JUARA 2 DESAIN POSTER', 
                  desc: 'Penyerahan Medali Perak dan Sertifikat Juara 2 Membawa Nama Sekolah oleh Waka Kurikulum Tahun 2025', 
                  img: '/src/assets/upacara.jpeg' 
                },
                { 
                  id: 4, 
                  icon: '🥇', 
                  title: 'PELATIHAN DESAIN', 
                  desc: 'Pelatihan Desain Grafis yang Diselenggarakan oleh PR IPM Smk Muhammadiyah 1 Pringsewu Tahun 2023', 
                  img: '/src/assets/desain.jpeg' 
                },
                { 
                  id: 5, 
                  icon: '🥇', 
                  title: 'E|HE Certification', 
                  desc: 'Pencapaian Sertifikat Course Junior Cybersecurity yang Diselenggarakan oleh EC-Council Tahun 2024', 
                  img: '/src/assets/ehe.jpeg' 
                },
                { 
                  id: 6, 
                  icon: '📽', 
                  title: 'PROJECT LAST CEREMONY', 
                  desc: 'Membuka Project untuk Menawarkan Jasa Konten Cinematic Upacara Terakhir di Sekolah bersama Rekan Tim Tahun 2026', 
                  img: '/src/assets/foto.jpeg' 
                },
                { 
                  id: 7, 
                  icon: '🖥', 
                  title: 'PROJECT TECHNICIAN', 
                  desc: 'Membuka Project Usaha untuk Menawarkan Jasa Servis dan Maintenance Device Gadget Handphone, Komputer, atau Laptop dengan harga terjangkau tahun 2023', 
                  img: '/src/assets/servis.jpeg' 
                },
                { 
                  id: 8, 
                  icon: '🌐', 
                  title: 'PROJECT NETWORKING', 
                  desc: 'Implementasi Konfigurasi Data Server, MikroTik & Cisco optimisasi keamanan jaringan dan server monitoring.', 
                  img: '/src/assets/jaringan.jpeg' 
                },
                { 
                  id: 9, 
                  icon: '✨', 
                  title: 'MY CERTIFICATION', 
                  desc: 'Nothing...', 
                  img: '/src/assets/sertifikat.jpeg' 
                },
              ].map((project, idx) => (
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

      <div className="fixed top-0 right-0 -z-20 w-[500px] h-[500px] bg-purple-100/30 blur-[120px] rounded-full opacity-50"></div>
      <div className="fixed bottom-0 left-0 -z-20 w-[400px] h-[400px] bg-blue-100/20 blur-[100px] rounded-full opacity-50"></div>
    </div>
  );
}