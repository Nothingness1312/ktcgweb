'use client';

import { useState } from 'react';

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Navigation */}
      <nav className="sticky top-0 z-40 border-b border-border bg-background/80 backdrop-blur">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-3">
              <img src="/ktcg-logo.png" alt="KTCG" className="h-14 w-14 rounded-lg object-cover border border-primary/20" />
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex gap-8">
              <a href="#about" className="text-sm font-medium hover:text-primary transition">ABOUT</a>
              <a href="#team" className="text-sm font-medium hover:text-primary transition">TEAM</a>
              <a href="#join" className="text-sm font-medium hover:text-primary transition">JOIN</a>
            </div>

            {/* Mobile Menu Button */}
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 hover:bg-card rounded-lg transition"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="md:hidden border-t border-border py-4 space-y-3">
              <a href="#about" className="block text-sm font-medium hover:text-primary transition">ABOUT</a>
              <a href="#team" className="block text-sm font-medium hover:text-primary transition">TEAM</a>
              <a href="#join" className="block text-sm font-medium hover:text-primary transition">JOIN</a>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-20 md:py-32 px-4 border-b border-border">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex items-start justify-center gap-6 mb-8">
            <img src="/ktcg-logo.png" alt="KTCG" className="h-24 w-24 md:h-32 md:w-32 rounded-2xl object-cover border-2 border-primary/30" />
            <div className="flex flex-col justify-center">
              <span className="inline-block px-3 py-1 mb-4 text-xs font-medium rounded-full bg-primary/10 text-primary w-fit">
                Selamat datang di KTCG Community
              </span>
              <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-balance text-left">
                Komunitas Cybersecurity untuk Semua
              </h1>
            </div>
          </div>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Komunitas hacking dan cybersecurity yang didedikasikan untuk enthusiast yang ingin mendalami dunia penetration testing dan ethical hacking.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="#join" className="button-primary">
              JOIN DISCORD
            </a>
            <a href="#about" className="button-secondary">
              LEARN MORE
            </a>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 mt-16 pt-12 border-t border-border">
            <div>
              <div className="text-3xl font-bold text-primary">100+</div>
              <div className="text-sm text-muted-foreground">Active Members</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-accent">2025</div>
              <div className="text-sm text-muted-foreground">Year Founded</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-secondary">100%</div>
              <div className="text-sm text-muted-foreground">Community Driven</div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 md:py-28 px-4 border-b border-border">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-8">Tentang KTCG</h2>
          <div className="space-y-6 text-muted-foreground leading-relaxed">
            <p>
              KTCG Community adalah komunitas hacking dan cybersecurity yang didedikasikan untuk para enthusiast yang ingin mendalami dunia penetration testing, hacking etis, dan cybersecurity. Kami percaya bahwa belajar cybersecurity harus menyenangkan, menantang, dan inklusif.
            </p>
            <p>
              Dengan motto <span className="text-foreground font-semibold">"Kata Ketua CTF Nya Gampang, Jadi Coba Aja Dulu"</span>, kami mengajak setiap orang untuk tidak takut mencoba, belajar dari kesalahan, dan terus berkembang dalam journey keamanan siber mereka.
            </p>
            <p>
              Komunitas kami fokus pada practical learning, knowledge sharing, dan mutual growth. Kami percaya bahwa cybersecurity adalah untuk semua orang, tidak peduli level keahlian mereka saat ini.
            </p>
          </div>
        </div>
      </section>

      {/* Team Members Section */}
      <section id="team" className="py-20 md:py-28 px-4 border-b border-border bg-gradient-to-b from-background via-card/10 to-background">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">Anggota KTCG</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">Tim KTCG yang berdedikasi untuk kesempurnaan dalam dunia cybersecurity</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
  { 
    name: 'kkarinzzz', 
    role: 'Digital Forensics',
    img: '/team/1.jpg'
  },
  { 
    name: 'Ren1Ko', 
    role: 'Cryptography | Linux Expert',
    img: '/team/2.jpg'
  },
  { 
    name: 'Soon', 
    role: 'Soon',
    img: '/team/3.jpg'
  },
  { 
    name: 'Soon', 
    role: 'Soon',
    img: '/team/4.jpg'
  },
  { 
    name: 'Soon', 
    role: 'Soon',
    img: '/team/5.jpg'
  },
  { 
    name: 'Soon', 
    role: 'Soon',
    img: '/team/6.jpg'
  },
].map((member, i) => (
              <div
                key={i}
                className="card-hover card-reveal group relative h-64 rounded-xl p-6 bg-gradient-to-br from-card via-card to-card/50 border border-border overflow-hidden"
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                {/* Gradient background effect */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-primary/20 via-secondary/10 to-accent/20" />
                
                {/* Content */}
                <div className="relative z-10 h-full flex flex-col justify-between">
                  <img src={member.img} alt={member.name} className="w-32 h-32 mb-4 group-hover:scale-110 transition-transform duration-300 rounded-lg object-cover" />
                  <div>
                    <h3 className="text-xl font-bold text-primary group-hover:text-accent transition-colors duration-300 mb-2">
                      {member.name}
                    </h3>
                    <p className="text-sm text-muted-foreground group-hover:text-foreground transition-colors duration-300">
                      {member.role}
                    </p>
                  </div>
                  
                  {/* Bottom accent line */}
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-secondary to-accent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Discord Join Section */}
      <section id="join" className="py-20 md:py-28 px-4 border-b border-border">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-8">Join Our Discord</h2>
          <a
            href="https://discord.gg/nH94vYstKA"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-3 button-primary"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 127 127">
              <path d="M107.7 19.7c-9.3-4.4-19.3-7.6-30-9.6-1.3 2.3-2.8 5.3-3.8 7.7-11.4-1.7-22.8-1.7-34 0-1-2.4-2.5-5.4-3.8-7.7-10.7 2-20.7 5.2-30 9.6C6.5 40.8 2.1 61.2 4.4 81.1c10.2 7.5 20.1 12.1 29.8 15.1 2.5-3.4 4.7-7 6.6-10.8-3.6-1.4-7.1-3.1-10.5-5.2 0.9-0.6 1.7-1.3 2.6-1.9 21.9 10 45.7 10 67.2 0 0.9 0.6 1.7 1.3 2.6 1.9-3.4 2.1-6.9 3.8-10.5 5.2 1.9 3.8 4.1 7.4 6.6 10.8 9.7-3 19.6-7.6 29.8-15.1 2.6-22.1-1.8-42.5-23.4-63.4zM42.8 65.9c-5.5 0-10.1-5.1-10.1-11.3 0-6.2 4.5-11.3 10.1-11.3 5.5 0 10.1 5.1 10.1 11.3 0 6.2-4.5 11.3-10.1 11.3zm41.9 0c-5.5 0-10.1-5.1-10.1-11.3 0-6.2 4.5-11.3 10.1-11.3 5.5 0 10.1 5.1 10.1 11.3 0 6.2-4.6 11.3-10.1 11.3z" />
            </svg>
            JOIN SERVER
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 border-t border-border">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <img src="/ktcg-logo.png" alt="KTCG" className="h-14 w-14 rounded-lg object-cover border border-primary/20" />
              </div>
              <p className="text-sm text-muted-foreground">Cybersecurity community for everyone</p>
            </div>
            <div>
              <h3 className="font-semibold mb-4 text-sm">NAVIGATION</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#about" className="hover:text-foreground transition">About</a></li>
                <li><a href="#team" className="hover:text-foreground transition">Team</a></li>
                <li><a href="#join" className="hover:text-foreground transition">Join Us</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4 text-sm">CONNECT</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="https://discord.gg/nH94vYstKA" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition">Discord</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4 text-sm">CONTACT</h3>
              <a href="https://ktcgweb.vercel.app" target="_blank" rel="noopener noreferrer" className="text-sm text-muted-foreground hover:text-foreground transition">ktcgweb.vercel.app</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
