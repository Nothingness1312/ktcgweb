'use client';

import { useState, useEffect, useRef } from 'react';

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedRole, setSelectedRole] = useState('All');

  // CTF Events Data
  const ctfEvents = [
    {
      name: 'PsychCTF 2026',
      date: 'Maret 2026',
      description: 'Event dari PsychCTF',
      status: 'Completed',
      link: 'https://ctftime.org/event/3166',
      linkText: 'View Event'
    },
    {
      name: 'FGTE0',
      date: 'Maret 2026',
      description: 'Event CTF dari FGTE',
      status: 'Completed',
      link: 'https://ctf.ariaf.my.id',
      linkText: 'View Event'
    },
    {
      name: 'RamadanCTF 2026',
      date: 'Maret 2026',
      description: 'Event dari vulnlab',
      status: 'Completed',
      link: 'https://lab.vulnbydefault.com/ramadan-ctf-2026',
      linkText: 'View Event'
    },
    {
      name: 'RamadanCTF 2026 (Indonesia)',
      date: 'Maret 2026',
      description: 'Event CTF selama bulan Ramadan',
      status: 'Completed',
      link: 'https://ctf.ocry.com/',
      linkText: 'View Event'
    },
    {
      name: 'TexSaw',
      date: 'Maret 2026',
      description: 'Event dari TexSaw',
      status: 'Completed',
      link: 'https://texsaw.org/',
      linkText: 'View Event'
    },
    {
      name: 'Nullcon Goa HackIM 2026 CTF',
      date: 'Februari 2026',
      description: 'Event dari Nullcon Goa HackIM',
      status: 'Completed',
      link: 'https://ctftime.org/event/3066',
      linkText: 'View Event'
    }
  ];

  // Filter CTF events - show only first 6 events
  const displayedEvents = ctfEvents.slice(0, 6);

  // Refs for sections
  const heroRef = useRef<HTMLElement>(null);
  const aboutRef = useRef<HTMLElement>(null);
  const achievementsRef = useRef<HTMLElement>(null);
  const teamRef = useRef<HTMLElement>(null);
  const joinRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate');
        }
      });
    }, observerOptions);

    // Observe all elements with animation classes
    const animatedElements = document.querySelectorAll('.fade-in-up, .fade-in-left, .fade-in-right, .scale-in');
    animatedElements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setMobileMenuOpen(false); // Close mobile menu after navigation
  };

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
              <button onClick={() => scrollToSection('about')} className="text-sm font-medium hover:text-primary transition">ABOUT</button>
              <button onClick={() => scrollToSection('achievements')} className="text-sm font-medium hover:text-primary transition">ACHIEVEMENTS</button>
              <button onClick={() => scrollToSection('team')} className="text-sm font-medium hover:text-primary transition">TEAM</button>
              <button onClick={() => scrollToSection('join')} className="text-sm font-medium hover:text-primary transition">JOIN</button>
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
              <button onClick={() => scrollToSection('about')} className="block text-sm font-medium hover:text-primary transition">ABOUT</button>
              <button onClick={() => scrollToSection('achievements')} className="block text-sm font-medium hover:text-primary transition">ACHIEVEMENTS</button>
              <button onClick={() => scrollToSection('team')} className="block text-sm font-medium hover:text-primary transition">TEAM</button>
              <button onClick={() => scrollToSection('join')} className="block text-sm font-medium hover:text-primary transition">JOIN</button>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-20 md:py-32 px-4 border-b border-border fade-in-up">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex items-start justify-center gap-6 mb-8 fade-in-up">
            <img src="/ktcg-logo.png" alt="KTCG" className="h-24 w-24 md:h-32 md:w-32 rounded-2xl object-cover border-2 border-primary/30 scale-in" />
            <div className="flex flex-col justify-center fade-in-right">
              <span className="inline-block px-3 py-1 mb-4 text-xs font-medium rounded-full bg-primary/10 text-primary w-fit fade-in-up">
                Selamat datang di KTCG Community
              </span>
              <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-balance text-left fade-in-up">
                Komunitas Cybersecurity untuk Semua
              </h1>
            </div>
          </div>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto fade-in-up">
            Komunitas hacking dan cybersecurity yang didedikasikan untuk enthusiast yang ingin mendalami dunia penetration testing dan ethical hacking.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center fade-in-up">
            <button onClick={() => scrollToSection('join')} className="button-primary">
              JOIN DISCORD
            </button>
            <button onClick={() => scrollToSection('about')} className="button-secondary">
              LEARN MORE
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 mt-16 pt-12 border-t border-border fade-in-up">
            <div className="fade-in-left">
              <div className="text-3xl font-bold text-primary">100+</div>
              <div className="text-sm text-muted-foreground">Active Members</div>
            </div>
            <div className="fade-in-up">
              <div className="text-3xl font-bold text-accent">2025</div>
              <div className="text-sm text-muted-foreground">Year Founded</div>
            </div>
            <div className="fade-in-right">
              <div className="text-3xl font-bold text-secondary">100%</div>
              <div className="text-sm text-muted-foreground">Community Driven</div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" ref={aboutRef} className="py-20 md:py-28 px-4 border-b border-border fade-in-up">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-8 fade-in-up">Tentang KTCG</h2>
          <div className="space-y-6 text-muted-foreground leading-relaxed fade-in-up">
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

      {/* Achievements Section */}
      <section id="achievements" ref={achievementsRef} className="py-20 md:py-28 px-4 border-b border-border bg-gradient-to-b from-background via-primary/5 to-background fade-in-up">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16 fade-in-up">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">CTF Achievements</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">Event CTF yang telah diikuti dan sedang berjalan oleh anggota KTCG Community (Berdasarkan data terbaru)</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayedEvents.map((event, i) => (
              <div
                key={i}
                className="card-hover group relative p-6 bg-gradient-to-br from-card via-card to-card/50 border border-border rounded-xl overflow-hidden fade-in-up"
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                {/* Gradient background effect */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-primary/20 via-secondary/10 to-accent/20" />

                {/* Content */}
                <div className="relative z-10">
                  <div className="flex items-start justify-between mb-4">
                    <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                      event.status === 'Completed'
                        ? 'bg-green-500/10 text-green-600 border border-green-500/20'
                        : event.status === 'Ongoing'
                        ? 'bg-blue-500/10 text-blue-600 border border-blue-500/20'
                        : 'bg-yellow-500/10 text-yellow-600 border border-yellow-500/20'
                    }`}>
                      {event.status}
                    </div>
                    <span className="text-sm text-muted-foreground">{event.date}</span>
                  </div>

                  <h3 className="text-xl font-bold text-primary group-hover:text-accent transition-colors duration-300 mb-2">
                    {event.name}
                  </h3>

                  <p className="text-sm text-muted-foreground group-hover:text-foreground transition-colors duration-300 mb-4">
                    {event.description}
                  </p>

                  <div className="flex items-center justify-between">
                    <a
                      href={event.link}
                      target={event.link !== '#' ? '_blank' : undefined}
                      rel={event.link !== '#' ? 'noopener noreferrer' : undefined}
                      className="text-xs text-primary hover:text-accent transition-colors duration-300 underline decoration-primary/30 hover:decoration-accent/50"
                    >
                      {event.linkText}
                    </a>
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors duration-300">
                      <svg className="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* Team Members Section */}
      <section id="team" ref={teamRef} className="py-20 md:py-28 px-4 border-b border-border bg-gradient-to-b from-background via-card/10 to-background fade-in-up">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16 fade-in-up">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">Anggota KTCG</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">Tim KTCG yang berdedikasi untuk kesempurnaan dalam dunia cybersecurity</p>
          </div>
          {/* Role Filter */}
          <div className="flex flex-wrap justify-center gap-2 mb-8 fade-in-up">
            {['All', 'Digital Forensics', 'Cryptography', 'Web Exploitation', 'Reverse Engineering', 'Binary Exploitation', 'OSINT'].map((role) => (
              <button
                key={role}
                onClick={() => setSelectedRole(role)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition ${
                  selectedRole === role
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-card text-muted-foreground hover:bg-card/80'
                }`}
              >
                {role}
              </button>
            ))}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 scale-in">
            {[
  { 
    name: 'kkarinzzz', 
    role: 'Digital Forensics',
    img: '/team/1.jpg'
  },
  { 
    name: 'Ren1Ko', 
    role: 'Cryptography',
    img: '/team/2.jpg'
  },
  { 
    name: 'Claritys', 
    role: 'Digital Forensics',
    img: '/team/3.jpg'
  },
  { 
    name: 'nandd3', 
    role: 'Web Exploitation',
    img: '/team/4.jpg'
  },
  { 
    name: 'chawaa', 
    role: 'Digital Forensics',
    img: '/team/5.jpg'
  },
  { 
    name: 'soon', 
    role: 'OSINT',
    img: '/team/6.jpg'
  },
  { 
    name: 'soon', 
    role: 'OSINT',
    img: '/team/7.jpg'
  },
  { 
    name: 'soon', 
    role: 'OSINT',
    img: '/team/8.jpg'
  },
].filter(member => selectedRole === 'All' || member.role === selectedRole).map((member, i) => (
              <div
                key={`${member.name}-${i}`}
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
      <section id="join" ref={joinRef} className="py-20 md:py-28 px-4 border-b border-border fade-in-up">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-8 fade-in-up">Join Our Discord</h2>
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
      <footer className="py-12 px-4 border-t border-border fade-in-up">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8 fade-in-up">
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
                <li><a href="#achievements" className="hover:text-foreground transition">Achievements</a></li>
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
