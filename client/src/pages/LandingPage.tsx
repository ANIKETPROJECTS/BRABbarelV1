import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence, useInView, useScroll, useTransform, useSpring, useMotionValue } from "framer-motion";
import {
  MapPin, Phone, Mail, Star, ChevronUp, ArrowRight, Leaf, Flame,
  Clock, Heart, Shield, Smile, ChevronLeft, ChevronRight,
  Send, CheckCircle, MessageCircle, X, Zap, Timer, Users,
  ShoppingBag, Bike, Utensils, ChefHat, Sparkles
} from "lucide-react";
import { SiFacebook, SiInstagram, SiYoutube, SiZomato, SiSwiggy, SiWhatsapp } from "react-icons/si";
import {
  GiFallingLeaf, GiChiliPepper, GiSpeedometer, GiBowlOfRice, GiTakeMyMoney, GiHeartWings,
  GiMeal, GiShoppingCart, GiChefToque, GiDeliveryDrone, GiStarMedal, GiHotMeal,
  GiRolledCloth, GiPositionMarker, GiClockwork, GiHeartPlus
} from "react-icons/gi";
import { FaLocationDot, FaEnvelope, FaBowlFood, FaFire, FaLeaf, FaBolt, FaFaceSmile, FaShieldHalved, FaHeart, FaTruckFast } from "react-icons/fa6";
import { Link } from "wouter";
import logoImage from "@assets/logo_(1)_1769147400424.png";
import menuVegImg from "@assets/WhatsApp_Image_2026-01-22_at_11.36.27_PM_1769147022848.jpeg";
import menuNonVegImg from "@assets/WhatsApp_Image_2026-01-22_at_11.36.28_PM_1769147032153.jpeg";

// ─── Real Business Constants ─────────────────────────────────────────
const BUSINESS = {
  phone: "7387744600",
  phoneDisplay: "+91 73877 44600",
  address: "Shop 8, Trishul Commercial Complex,\nOpp. Shiv Basav Nagar, Shiv Mandir Rd,\nAmbernath, Thane – 421501",
  addressShort: "Ambernath, Thane, Maharashtra",
  hours: "1:00 PM – 11:00 PM · Daily",
  instagram: "https://www.instagram.com/bomb_rolls_and_bowls/",
  instagramHandle: "@bomb_rolls_and_bowls",
  zomato: "https://www.zomato.com/mumbai/bomb-rolls-bowls-ambernath-thane/order",
  swiggy: "https://www.swiggy.com/restaurants/bomb-rolls-and-bowls-trishul-commercialcomplex-ambarnath-mumbai-917034",
  rating: "4.2",
  ratingCount: "324",
  whatsapp: "https://wa.me/917387744600",
  instagramFollowers: "1,213",
  instagramPosts: "199",
};

// ─── Typewriter Hook ────────────────────────────────────────────────
function useTypewriter(words: string[], speed = 90, deleteSpeed = 45, pauseTime = 2200) {
  const [displayed, setDisplayed] = useState("");
  const [wordIndex, setWordIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;
    const currentWord = words[wordIndex % words.length];
    const timeout = setTimeout(() => {
      if (!isDeleting) {
        const next = currentWord.slice(0, displayed.length + 1);
        setDisplayed(next);
        if (next === currentWord) {
          setIsPaused(true);
          setTimeout(() => { setIsPaused(false); setIsDeleting(true); }, pauseTime);
        }
      } else {
        const next = currentWord.slice(0, displayed.length - 1);
        setDisplayed(next);
        if (next === "") {
          setIsDeleting(false);
          setWordIndex(prev => prev + 1);
        }
      }
    }, isDeleting ? deleteSpeed : speed);
    return () => clearTimeout(timeout);
  }, [displayed, isDeleting, isPaused, wordIndex, words, speed, deleteSpeed, pauseTime]);

  return displayed;
}

// ─── Scroll Animation Wrappers ───────────────────────────────────────
function FadeUp({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60, filter: "blur(8px)" }}
      animate={isInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
      transition={{ duration: 0.75, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function FadeIn({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.88, filter: "blur(6px)" }}
      animate={isInView ? { opacity: 1, scale: 1, filter: "blur(0px)" } : {}}
      transition={{ duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ─── Scroll Progress Bar ─────────────────────────────────────────────
function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 300, damping: 30, restDelta: 0.001 });
  return (
    <motion.div
      style={{ scaleX }}
      className="scroll-progress-bar"
    />
  );
}

// ─── 3D Tilt Card ────────────────────────────────────────────────────
function TiltCard({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-0.5, 0.5], [10, -10]);
  const rotateY = useTransform(x, [-0.5, 0.5], [-10, 10]);
  const springRotX = useSpring(rotateX, { stiffness: 200, damping: 20 });
  const springRotY = useSpring(rotateY, { stiffness: 200, damping: 20 });

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  }, [x, y]);

  const handleMouseLeave = useCallback(() => {
    x.set(0); y.set(0);
  }, [x, y]);

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX: springRotX, rotateY: springRotY, transformPerspective: 900 }}
      className={`tilt-wrap ${className}`}
    >
      {children}
    </motion.div>
  );
}

// ─── Wave SVG Divider ────────────────────────────────────────────────
function WaveDivider({ flip = false, fill = "#fff" }: { flip?: boolean; fill?: string }) {
  return (
    <div className={`w-full overflow-hidden leading-none ${flip ? "rotate-180" : ""}`} style={{ height: 64 }}>
      <svg viewBox="0 0 1440 64" preserveAspectRatio="none" className="w-full h-full">
        <path d="M0,32 C240,64 480,0 720,32 C960,64 1200,0 1440,32 L1440,64 L0,64 Z" fill={fill} />
      </svg>
    </div>
  );
}

// ─── Floating Particles ──────────────────────────────────────────────
function FloatingParticles({ count = 18, color = "rgba(255,215,0,0.18)" }: { count?: number; color?: string }) {
  const particles = Array.from({ length: count }, (_, i) => ({
    id: i,
    size: Math.random() * 10 + 4,
    x: Math.random() * 100,
    delay: Math.random() * 5,
    duration: Math.random() * 5 + 5,
    drift: (Math.random() - 0.5) * 60,
  }));
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {particles.map(p => (
        <motion.div
          key={p.id}
          className="absolute rounded-full"
          style={{ width: p.size, height: p.size, left: `${p.x}%`, bottom: -20, background: color }}
          animate={{ y: [0, -160], x: [0, p.drift], opacity: [0, 0.9, 0], scale: [0.5, 1.3, 0.5] }}
          transition={{ duration: p.duration, delay: p.delay, repeat: Infinity, ease: "easeOut" }}
        />
      ))}
    </div>
  );
}

// ─── Floating Food Sticker ───────────────────────────────────────────
function FloatingSticker({ emoji, style, delay = 0, amplitude = 18 }: {
  emoji: string; style: React.CSSProperties; delay?: number; amplitude?: number;
}) {
  return (
    <motion.div
      className="absolute select-none pointer-events-none z-10 hidden md:block"
      style={style}
      animate={{ y: [0, -amplitude, 0], rotate: [-6, 6, -6], scale: [1, 1.08, 1] }}
      transition={{ duration: 3.5 + delay * 0.4, repeat: Infinity, delay, ease: "easeInOut" }}
    >
      {emoji}
    </motion.div>
  );
}

// ─── NAVBAR ─────────────────────────────────────────────────────────
function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const current = window.scrollY;
      if (current > lastScrollY.current && current > 90) {
        setHidden(true);
        setMobileOpen(false);
      } else {
        setHidden(false);
      }
      lastScrollY.current = current;
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const links = [
    { label: "Home", href: "#hero" },
    { label: "Why Us", href: "#why-us" },
    { label: "Menu", href: "#menu" },
    { label: "Testimonials", href: "#testimonials" },
    { label: "Contact", href: "#contact" },
  ];

  const scrollTo = (id: string) => {
    setMobileOpen(false);
    document.querySelector(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <motion.nav
      initial={{ y: -120, opacity: 0 }}
      animate={
        hidden
          ? { y: "-120%", opacity: 0, scale: 0.96, filter: "blur(4px)" }
          : { y: 0, opacity: 1, scale: 1, filter: "blur(0px)" }
      }
      transition={{ duration: 0.42, ease: [0.32, 0.72, 0, 1] }}
      className="fixed top-0 left-0 right-0 z-50"
      style={{
        background: "linear-gradient(135deg, #FFF8E6 0%, #FFF0F3 50%, #F0F8FF 100%)",
        borderBottom: "2px solid rgba(0,0,0,0.1)",
        boxShadow: "0 2px 20px rgba(0,0,0,0.08)",
      }}
    >
      {/* Top checkered stripe */}
      <div className="h-2 w-full bg-checkered opacity-40" />

      {/* Main header bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-2.5 flex items-center justify-between gap-4">

        {/* Logo + Brand */}
        <button
          onClick={() => scrollTo("#hero")}
          className="flex items-center gap-3 group flex-shrink-0"
          data-testid="button-logo-home"
        >
          <motion.img
            src={logoImage}
            alt="Bomb Rolls & Bowls"
            className="w-12 h-12 sm:w-14 sm:h-14 object-contain drop-shadow-[2px_2px_0px_rgba(0,0,0,0.3)]"
            whileHover={{ rotate: [-5, 5, -5, 0], scale: 1.05 }}
            transition={{ duration: 0.4 }}
          />
          <div className="text-left hidden sm:block">
            <div className="font-display text-lg leading-none text-black drop-shadow-[1px_1px_0px_rgba(0,0,0,0.2)]">
              BOMB ROLLS
            </div>
            <div className="font-display text-lg leading-none text-primary drop-shadow-[1px_1px_0px_rgba(0,0,0,0.2)]">
              & BOWLS
            </div>
            <div className="font-body text-[9px] text-black/40 tracking-widest uppercase mt-0.5">
              Ambernath · Thane
            </div>
          </div>
        </button>

        {/* Desktop nav links */}
        <div className="hidden lg:flex items-center gap-0.5 flex-1 justify-center">
          {links.map(l => (
            <motion.button
              key={l.label}
              onClick={() => scrollTo(l.href)}
              whileHover={{ y: -2, backgroundColor: "rgba(0,0,0,0.06)" }}
              whileTap={{ y: 1 }}
              className="font-display text-sm text-black/70 hover:text-primary px-4 py-2 rounded-xl transition-all"
            >
              {l.label}
            </motion.button>
          ))}
        </div>

        {/* Right side actions */}
        <div className="hidden md:flex items-center gap-3 flex-shrink-0">
          <motion.a
            href={`tel:+91${BUSINESS.phone}`}
            whileHover={{ y: -2, scale: 1.02 }}
            className="flex items-center gap-2 px-4 py-2 bg-black/5 hover:bg-black/10 text-black/80 font-body text-sm rounded-xl border border-black/10 transition-all"
          >
            <Phone className="w-4 h-4 text-primary" />
            <span className="hidden xl:block">{BUSINESS.phoneDisplay}</span>
            <span className="xl:hidden font-semibold">Call</span>
          </motion.a>
          <Link href="/menu">
            <motion.button
              whileHover={{ y: -2, boxShadow: "5px 5px 0px 0px black" }}
              whileTap={{ y: 2, boxShadow: "2px 2px 0px 0px black" }}
              className="px-5 py-2.5 bg-primary text-white font-display text-sm rounded-xl border-2 border-black shadow-pop-sm"
              data-testid="button-digital-menu"
            >
              Digital Menu →
            </motion.button>
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="lg:hidden flex flex-col gap-1.5 p-2 ml-auto"
          data-testid="button-mobile-menu"
        >
          {[0, 1, 2].map(i => (
            <motion.span
              key={i}
              className="block h-0.5 w-6 bg-black/70 rounded-full"
              animate={mobileOpen ? {
                rotate: i === 0 ? 45 : i === 2 ? -45 : 0,
                y: i === 0 ? 8 : i === 2 ? -8 : 0,
                opacity: i === 1 ? 0 : 1
              } : { rotate: 0, y: 0, opacity: 1 }}
            />
          ))}
        </button>
      </div>

      {/* Bottom accent stripe */}
      <div className="h-0.5 w-full bg-gradient-to-r from-primary via-secondary to-primary opacity-60" />

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0, y: -10 }}
            animate={{ height: "auto", opacity: 1, y: 0 }}
            exit={{ height: 0, opacity: 0, y: -10 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="lg:hidden overflow-hidden border-t border-black/10"
            style={{ background: "linear-gradient(135deg, #FFF8E6 0%, #FFF0F3 50%, #F0F8FF 100%)" }}
          >
            <div className="px-5 py-4 flex flex-col gap-1">
              {links.map((l, i) => (
                <motion.button
                  key={l.label}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  whileHover={{ x: 6 }}
                  onClick={() => scrollTo(l.href)}
                  className="font-display text-xl text-black/80 hover:text-primary text-left py-2.5 border-b border-black/6 transition-colors"
                >
                  {l.label}
                </motion.button>
              ))}
              <div className="pt-3 flex flex-col gap-3">
                <a
                  href={`tel:+91${BUSINESS.phone}`}
                  className="flex items-center gap-3 px-4 py-3 bg-black/5 text-black rounded-xl font-body border border-black/10"
                >
                  <Phone className="w-5 h-5 text-primary" /> {BUSINESS.phoneDisplay}
                </a>
                <Link href="/menu">
                  <button className="px-5 py-3 bg-primary text-white font-display text-base rounded-xl border-2 border-black shadow-pop-sm w-full">
                    Digital Menu →
                  </button>
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}

// ─── HERO SECTION ───────────────────────────────────────────────────
function HeroSection() {
  const typeText = useTypewriter([
    "Flavor Bombs",
    "Bomb Rolls",
    "Bomb Bowls",
    "Bomb Paninis",
    "Bomb Salads",
  ]);

  const { scrollY } = useScroll();
  const bgY = useTransform(scrollY, [0, 700], [0, 180]);

  const stickers = [
    { emoji: "🌯", style: { top: "18%", left: "8%", fontSize: "3.5rem" }, delay: 0 },
    { emoji: "🍜", style: { top: "25%", right: "9%", fontSize: "3rem" }, delay: 0.8 },
    { emoji: "🌶️", style: { bottom: "28%", left: "6%", fontSize: "2.8rem" }, delay: 1.4 },
    { emoji: "🫙", style: { top: "55%", right: "7%", fontSize: "2.5rem" }, delay: 0.4 },
    { emoji: "🧆", style: { bottom: "20%", right: "15%", fontSize: "3rem" }, delay: 1.0 },
    { emoji: "🥗", style: { top: "12%", left: "22%", fontSize: "2.2rem" }, delay: 1.8 },
    { emoji: "🍱", style: { top: "10%", right: "22%", fontSize: "2.4rem" }, delay: 0.6 },
    { emoji: "🧀", style: { bottom: "32%", left: "18%", fontSize: "2rem" }, delay: 2.0 },
  ];

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Ken Burns + Parallax background */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <motion.div
          className="absolute inset-0 w-full h-full bg-cover bg-center hero-ken-burns"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=1920&q=80')",
            y: bgY,
            scale: 1.15,
          }}
        />
      </div>

      {/* Floating particles over hero */}
      <FloatingParticles count={22} color="rgba(255,215,0,0.22)" />

      {/* Checkered borders */}
      <div className="absolute top-0 left-0 right-0 h-4 bg-checkered z-[3]" />
      <div className="absolute bottom-0 left-0 right-0 h-4 bg-checkered z-[3]" />

      {/* Floating stickers */}
      {stickers.map((s, i) => (
        <FloatingSticker key={i} emoji={s.emoji} style={s.style} delay={s.delay} />
      ))}

      {/* Content */}
      <div className="relative z-[2] text-center text-white px-4 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.4, rotate: -15 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 0.8, type: "spring", stiffness: 160, damping: 12 }}
          className="mb-8"
        >
          <motion.img
            src={logoImage}
            alt="Logo"
            className="w-28 h-28 md:w-40 md:h-40 object-contain mx-auto drop-shadow-2xl"
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.7, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="font-display text-5xl md:text-7xl lg:text-8xl font-bold mb-4 drop-shadow-[4px_4px_0px_rgba(0,0,0,1)] leading-tight"
        >
          We Serve
        </motion.h1>

        {/* Typewriter */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6, type: "spring", stiffness: 180 }}
          className="font-display text-4xl md:text-6xl lg:text-7xl font-bold text-secondary drop-shadow-[3px_3px_0px_rgba(0,0,0,1)] mb-6 min-h-[1.2em] neon-glow"
        >
          {typeText}
          <motion.span
            animate={{ opacity: [1, 0] }}
            transition={{ duration: 0.5, repeat: Infinity }}
            className="inline-block w-1 h-[0.85em] bg-secondary ml-1 align-middle"
          />
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20, filter: "blur(6px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ delay: 0.85, duration: 0.7 }}
          className="text-white/90 text-lg md:text-xl font-body max-w-xl mx-auto mb-10 leading-relaxed"
        >
          Where every bite is a{" "}
          <span className="text-secondary font-bold">flavor bomb</span>{" "}
          waiting to detonate! Rolls, Bowls, Salads & Paninis — crafted with
          the boldest spices.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.05 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <Link href="/menu">
            <motion.button
              whileHover={{ y: -4, scale: 1.05, boxShadow: "8px 8px 0px 0px black" }}
              whileTap={{ y: 2, scale: 0.97, boxShadow: "2px 2px 0px 0px black" }}
              className="px-6 sm:px-8 py-3 sm:py-4 bg-secondary text-black font-display text-lg sm:text-xl font-bold rounded-xl border-2 border-black shadow-pop glow-cta"
            >
              🍽️ Explore Menu
            </motion.button>
          </Link>
          <motion.button
            whileHover={{ y: -4, scale: 1.05, boxShadow: "8px 8px 0px 0px rgba(255,255,255,0.5)" }}
            whileTap={{ y: 2, scale: 0.97 }}
            onClick={() => document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" })}
            className="px-6 sm:px-8 py-3 sm:py-4 bg-white/15 backdrop-blur-sm text-white font-display text-lg sm:text-xl font-bold rounded-xl border-2 border-white/60 hover:bg-white/25 transition-all"
          >
            📍 Find Us
          </motion.button>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="mt-16 flex flex-col items-center gap-3 text-white/60 scroll-bounce"
        >
          <span className="text-xs font-body tracking-widest uppercase">Scroll Down</span>
          <motion.div
            className="w-6 h-10 rounded-full border-2 border-white/40 flex items-start justify-center pt-2"
          >
            <motion.div
              className="w-1.5 h-2.5 bg-white/60 rounded-full"
              animate={{ y: [0, 12, 0], opacity: [1, 0.3, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

// ─── STATS BAR ───────────────────────────────────────────────────────
function StatItem({ value, label, delay, GiIcon, SiIcon, iconColor }: {
  value: string; label: string; delay: number;
  GiIcon?: React.ElementType; SiIcon?: React.ElementType; iconColor: string;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const Icon = GiIcon ?? SiIcon;
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40, scale: 0.6 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ delay, duration: 0.6, type: "spring", stiffness: 200, damping: 15 }}
      className="text-center text-white relative"
    >
      <motion.div
        animate={isInView ? { rotateY: [0, 360] } : {}}
        transition={{ delay: delay + 0.3, duration: 0.7, ease: "easeOut" }}
        className="flex justify-center mb-1"
      >
        {Icon && <Icon className={`w-9 h-9 ${iconColor}`} />}
      </motion.div>
      <motion.div
        className="font-display text-4xl md:text-5xl font-bold text-secondary drop-shadow-[3px_3px_0px_rgba(0,0,0,1)]"
        animate={isInView ? { scale: [0.5, 1.2, 1] } : {}}
        transition={{ delay: delay + 0.1, duration: 0.5, ease: "backOut" }}
      >
        {value}
      </motion.div>
      <div className="font-body text-sm md:text-base text-white/80 mt-1 uppercase tracking-wider">{label}</div>
    </motion.div>
  );
}

function StatsBar() {
  const stats = [
    { value: "4.2★", label: "Google Rating",        Gi: GiStarMedal,   giColor: "text-yellow-300", delay: 0 },
    { value: "1,213", label: "Instagram Followers", Si: SiInstagram,   siColor: "text-pink-200",   delay: 0.12 },
    { value: "30+",   label: "Menu Items",           Gi: GiHotMeal,     giColor: "text-orange-200", delay: 0.24 },
    { value: "199",   label: "Posts & Reels",        Si: SiInstagram,   siColor: "text-purple-200", delay: 0.36 },
  ];

  return (
    <section className="bg-primary border-y-4 border-black py-10 overflow-hidden relative">
      <div className="absolute inset-y-0 right-0 w-40 bg-checkered opacity-10" />
      <div className="absolute inset-y-0 left-0 w-40 bg-checkered opacity-10" />
      <FloatingParticles count={12} color="rgba(0,0,0,0.12)" />
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 relative z-10">
        {stats.map((s) => (
          <StatItem key={s.label} value={s.value} label={s.label} delay={s.delay}
            GiIcon={"Gi" in s ? (s as any).Gi : undefined}
            SiIcon={"Si" in s ? (s as any).Si : undefined}
            iconColor={"giColor" in s ? (s as any).giColor : (s as any).siColor}
          />
        ))}
      </div>
    </section>
  );
}

// ─── WHY CHOOSE US ───────────────────────────────────────────────────
function WhyChooseUs() {
  const reasons = [
    {
      Gi: GiFallingLeaf,
      giColor: "text-green-600",
      bgColor: "bg-green-50",
      borderColor: "border-green-300",
      loopAnim: { rotate: [-10, 10] } as any,
      title: "Fresh Ingredients",
      desc: "Every roll, bowl and panini is made with the freshest, highest-quality ingredients sourced daily.",
      color: "bg-green-100 border-green-400",
    },
    {
      Gi: GiChiliPepper,
      giColor: "text-orange-600",
      bgColor: "bg-orange-50",
      borderColor: "border-orange-300",
      loopAnim: { y: [0, -5, 0] } as any,
      title: "Bold Flavors",
      desc: "From Chatpata to Haryali — every flavor profile is a handcrafted explosion of spices.",
      color: "bg-orange-100 border-orange-400",
    },
    {
      Gi: GiSpeedometer,
      giColor: "text-yellow-600",
      bgColor: "bg-yellow-50",
      borderColor: "border-yellow-300",
      loopAnim: { rotate: [-8, 8] } as any,
      title: "Quick Service",
      desc: "Made to order and served hot in minutes. Because hunger can't wait!",
      color: "bg-yellow-100 border-yellow-400",
    },
    {
      Gi: GiBowlOfRice,
      giColor: "text-emerald-600",
      bgColor: "bg-emerald-50",
      borderColor: "border-emerald-300",
      loopAnim: { y: [0, -4, 0] } as any,
      title: "Veg & Non-Veg",
      desc: "A rich variety of vegetarian and non-vegetarian options for every food lover.",
      color: "bg-emerald-100 border-emerald-400",
    },
    {
      Gi: GiTakeMyMoney,
      giColor: "text-blue-600",
      bgColor: "bg-blue-50",
      borderColor: "border-blue-300",
      loopAnim: { scale: [1, 1.08, 1] } as any,
      title: "Affordable Pricing",
      desc: "Starting from just ₹110 — delicious food doesn't have to be expensive.",
      color: "bg-blue-100 border-blue-400",
    },
    {
      Gi: GiHeartWings,
      giColor: "text-red-600",
      bgColor: "bg-red-50",
      borderColor: "border-red-300",
      loopAnim: { scale: [1, 1.12, 1] } as any,
      title: "Made with Love",
      desc: "Each dish is crafted with passion and served with a smile. You can taste the difference.",
      color: "bg-red-100 border-red-400",
    },
  ];

  return (
    <section id="why-us" className="py-12 md:py-20 bg-secondary relative overflow-hidden">
      {/* Decorative pattern */}
      <div className="absolute top-0 left-0 right-0 h-4 bg-checkered border-b-4 border-black" />
      <div className="absolute bottom-0 left-0 right-0 h-4 bg-checkered border-t-4 border-black" />
      <div className="absolute right-0 top-0 bottom-0 w-24 bg-checkered opacity-10" />

      <div className="max-w-7xl mx-auto px-4 pt-4 pb-4">
        <FadeUp className="text-center mb-8 md:mb-14">
          <div className="inline-block bg-primary text-white font-display text-sm px-4 py-1 rounded-full border-2 border-black shadow-pop-sm mb-4">
            ✦ Why We're Different ✦
          </div>
          <h2 className="font-display text-4xl md:text-6xl text-black drop-shadow-[3px_3px_0px_rgba(0,0,0,0.2)]">
            Why Choose Us?
          </h2>
          <p className="font-body text-black/70 mt-4 max-w-xl mx-auto text-lg">
            We don't just cook food. We craft <strong>flavor experiences</strong> that hit different every single time.
          </p>
        </FadeUp>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {reasons.map((r, i) => {
            const IconComp = r.Gi;
            return (
              <FadeIn key={r.title} delay={i * 0.09}>
                <TiltCard>
                  <motion.div
                    whileHover={{ y: -8, boxShadow: "8px 8px 0px 0px black" }}
                    className="rounded-2xl border-2 border-black p-6 shadow-pop bg-white cursor-default h-full card-shine"
                  >
                    <motion.div
                      className={`w-20 h-20 mb-5 rounded-2xl flex items-center justify-center border-2 ${r.borderColor} ${r.bgColor} shadow-sm`}
                      animate={r.loopAnim}
                      transition={{ repeat: Infinity, repeatType: "reverse", duration: 2.2, ease: "easeInOut" }}
                      whileHover={{ scale: 1.18, rotate: [0, -8, 8, 0], transition: { duration: 0.35 } }}
                    >
                      <IconComp className={`w-10 h-10 ${r.giColor}`} />
                    </motion.div>
                    <h3 className="font-display text-xl text-black mb-2">{r.title}</h3>
                    <p className="font-body text-sm text-gray-600 leading-relaxed">{r.desc}</p>
                  </motion.div>
                </TiltCard>
              </FadeIn>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ─── MENU SHOWCASE ───────────────────────────────────────────────────
type MenuItem = {
  id: number; name: string; category: string; desc: string; fullDesc: string;
  price: number; isVeg: boolean; img: string; bg: string;
  spiceLevel: number; prepTime: string; serves: number;
  highlights: string[]; ingredients: string[];
};

const featuredItems: MenuItem[] = [
  {
    id: 1,
    name: "Chatpata Roll (Paneer)",
    category: "Bomb Rolls 🌯",
    desc: "Spicy, tangy and vibrant — made with paneer and the best quality ingredients.",
    fullDesc: "Our all-time crowd favourite — fresh paneer tossed in our signature chatpata masala blend, wrapped in a soft handmade chapati with crisp onions, mint chutney and a tangy drizzle. The bold, zingy spice profile is balanced with cooling herbs for a perfect bite every single time.",
    price: 150,
    isVeg: true,
    img: "https://images.unsplash.com/photo-1626700051175-6818013e1d4f?w=800&q=80",
    bg: "bg-orange-50",
    spiceLevel: 3,
    prepTime: "8–10 min",
    serves: 1,
    highlights: ["🔥 Bestseller", "⚡ Quick Serve", "🌿 Fresh Daily"],
    ingredients: ["Fresh Paneer", "Chatpata Masala", "Onion", "Capsicum", "Coriander", "Mint Chutney", "Wheat Chapati"],
  },
  {
    id: 2,
    name: "Angara Roll (Chicken)",
    category: "Bomb Rolls 🌯",
    desc: "Explosion of spicy, tangy and vibrant flavours infused with warm spices.",
    fullDesc: "The Angara Roll is built for true spice lovers — tender chicken marinated overnight in fiery angara spices, char-grilled to smoky perfection and wrapped in a soft chapati with zesty sauces. Bold, smoky, intensely flavoured and utterly addictive.",
    price: 160,
    isVeg: false,
    img: "https://images.unsplash.com/photo-1565299507177-b0ac66763828?w=800&q=80",
    bg: "bg-red-50",
    spiceLevel: 5,
    prepTime: "10–12 min",
    serves: 1,
    highlights: ["🌶️ Very Spicy", "🔥 Non-Veg Special", "💣 Bomb Flavour"],
    ingredients: ["Chicken", "Angara Spice Mix", "Onion", "Green Chilli", "Lemon Juice", "Garlic Mayo", "Wheat Chapati"],
  },
  {
    id: 3,
    name: "Tikka Rice Bowl (Paneer)",
    category: "Bomb Bowls 🍜",
    desc: "Embark on a culinary rice bowl journey with tikka and aromatic basmati.",
    fullDesc: "A rich, aromatic rice bowl featuring succulent paneer tikka served over fragrant long-grain basmati rice, drenched in a luscious tikka sauce with fresh raita and pickled onions. A hearty meal that's as satisfying as it is flavourful.",
    price: 160,
    isVeg: true,
    img: "https://images.unsplash.com/photo-1596797038530-2c107229654b?w=800&q=80",
    bg: "bg-yellow-50",
    spiceLevel: 2,
    prepTime: "12–15 min",
    serves: 1,
    highlights: ["🍚 Super Filling", "🌿 Aromatic", "⭐ Top Rated"],
    ingredients: ["Paneer Tikka", "Basmati Rice", "Tikka Sauce", "Raita", "Pickled Onions", "Fresh Herbs", "Lemon"],
  },
  {
    id: 4,
    name: "Malai Tikka Panini (Chicken)",
    category: "Bomb Panini 🥪",
    desc: "Crunchy, cheesy and exploding with rich, creamy malai tikka flavour.",
    fullDesc: "A beautifully pressed panini packed with creamy malai chicken tikka, melted cheese and a garlic herb spread. Perfectly crunchy on the outside and indulgently creamy inside — this is comfort food elevated to an art form.",
    price: 190,
    isVeg: false,
    img: "https://images.unsplash.com/photo-1528736235302-52922df5c122?w=800&q=80",
    bg: "bg-amber-50",
    spiceLevel: 2,
    prepTime: "10–12 min",
    serves: 1,
    highlights: ["🧀 Extra Cheesy", "🔥 Grilled Fresh", "💛 Rich & Creamy"],
    ingredients: ["Chicken Malai Tikka", "Mozzarella Cheese", "Garlic Herb Spread", "Capsicum", "Onion", "Ciabatta Bread"],
  },
  {
    id: 5,
    name: "Haryali Salad (Paneer)",
    category: "Bomb Salads 🥗",
    desc: "Bursting with chilli and cooling flavour notes of mint and coriander.",
    fullDesc: "A vibrant, energising salad bursting with freshness — crisp garden vegetables tossed with marinated paneer, a zingy mint-coriander dressing and a hint of green chilli heat. Light, colourful and full of bold flavour.",
    price: 160,
    isVeg: true,
    img: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&q=80",
    bg: "bg-green-50",
    spiceLevel: 2,
    prepTime: "8–10 min",
    serves: 1,
    highlights: ["🥗 Healthy Choice", "🌿 Super Fresh", "💚 Light & Clean"],
    ingredients: ["Paneer", "Mixed Greens", "Cucumber", "Cherry Tomato", "Mint-Coriander Dressing", "Lemon", "Chilli Flakes"],
  },
  {
    id: 6,
    name: "Makhmali Roll (Chicken)",
    category: "Bomb Rolls 🌯",
    desc: "A blast of rich and creamy flavours with a harmonious balance of spices.",
    fullDesc: "The Makhmali Roll is the ultimate indulgence — tender chicken coated in a velvety makhmali cream sauce with warm aromatic spices, wrapped in a soft chapati. Silky, rich and deeply satisfying, this is the roll you will keep coming back for.",
    price: 170,
    isVeg: false,
    img: "https://images.unsplash.com/photo-1574484284002-952d92456975?w=800&q=80",
    bg: "bg-rose-50",
    spiceLevel: 2,
    prepTime: "10–12 min",
    serves: 1,
    highlights: ["💛 Rich & Creamy", "🥰 Comfort Food", "⭐ Premium Quality"],
    ingredients: ["Chicken", "Makhmali Cream Sauce", "Cashew Paste", "Aromatic Spices", "Onion", "Coriander", "Chapati"],
  },
];

// ─── MENU ITEM DETAIL MODAL ───────────────────────────────────────────
function MenuItemModal({ item, onClose }: { item: MenuItem | null; onClose: () => void }) {
  useEffect(() => {
    if (item) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [item]);

  return (
    <AnimatePresence>
      {item && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]"
          />

          {/* Drawer panel */}
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", stiffness: 320, damping: 32 }}
            className="fixed bottom-0 left-0 right-0 max-h-[92vh] overflow-y-auto bg-white rounded-t-3xl border-t-4 border-black z-[101] no-scrollbar"
          >
            {/* Drag handle */}
            <div className="sticky top-0 z-10 bg-white pt-3 pb-2 px-4 flex items-center justify-between border-b-2 border-black/10">
              <div className="mx-auto w-12 h-1.5 rounded-full bg-black/20 absolute left-1/2 -translate-x-1/2 top-2" />
              <div className="w-8" />
              <motion.button
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                onClick={onClose}
                className="ml-auto w-9 h-9 bg-black text-white rounded-full flex items-center justify-center border-2 border-black shadow-pop-sm"
              >
                <X className="w-4 h-4" />
              </motion.button>
            </div>

            {/* Hero image */}
            <div className="relative w-full h-64 overflow-hidden">
              <motion.img
                src={item.img}
                alt={item.name}
                className="w-full h-full object-cover"
                initial={{ scale: 1.1 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5 }}
              />
              {/* Price badge */}
              <motion.div
                initial={{ scale: 0, rotate: -10 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: 0.2, type: "spring" }}
                className="absolute top-4 right-4 bg-secondary text-black font-display font-bold text-2xl px-4 py-2 rounded-2xl border-3 border-black shadow-pop"
                style={{ border: "3px solid black" }}
              >
                ₹{item.price}
              </motion.div>
              {/* Veg/NonVeg badge */}
              <div className="absolute top-4 left-4">
                <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-bold border-2 border-black ${item.isVeg ? "bg-green-500 text-white" : "bg-primary text-white"}`}>
                  <span className="w-2.5 h-2.5 rounded-full bg-white inline-block" />
                  {item.isVeg ? "VEG" : "NON-VEG"}
                </span>
              </div>
              {/* Category */}
              <div className="absolute bottom-4 left-4">
                <span className="bg-black/70 text-white font-display text-sm px-3 py-1 rounded-full backdrop-blur-sm">
                  {item.category}
                </span>
              </div>
            </div>

            {/* Content */}
            <div className="p-5 pb-8">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="font-display text-3xl text-black mb-2"
              >
                {item.name}
              </motion.h2>

              {/* Highlights */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.15 }}
                className="flex flex-wrap gap-2 mb-4"
              >
                {item.highlights.map((h, i) => (
                  <motion.span
                    key={h}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2 + i * 0.06, type: "spring" }}
                    className="bg-secondary text-black font-body font-bold text-xs px-3 py-1 rounded-full border-2 border-black shadow-pop-sm"
                  >
                    {h}
                  </motion.span>
                ))}
              </motion.div>

              {/* Meta row */}
              <div className="flex gap-4 mb-5">
                <div className="flex items-center gap-1.5 bg-muted px-3 py-2 rounded-xl border-2 border-black/10">
                  <Timer className="w-4 h-4 text-primary" />
                  <span className="font-body text-sm font-semibold">{item.prepTime}</span>
                </div>
                <div className="flex items-center gap-1.5 bg-muted px-3 py-2 rounded-xl border-2 border-black/10">
                  <Users className="w-4 h-4 text-primary" />
                  <span className="font-body text-sm font-semibold">Serves {item.serves}</span>
                </div>
                <div className="flex items-center gap-1.5 bg-muted px-3 py-2 rounded-xl border-2 border-black/10">
                  <span className="font-body text-sm font-semibold">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <span key={i} className={i < item.spiceLevel ? "text-red-500" : "text-gray-300"}>🌶</span>
                    ))}
                  </span>
                </div>
              </div>

              {/* Full description */}
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="font-body text-gray-700 text-base leading-relaxed mb-5"
              >
                {item.fullDesc}
              </motion.p>

              {/* Ingredients */}
              <div className="mb-6">
                <div className="font-display text-lg text-black mb-3 flex items-center gap-2">
                  <ChefHat className="w-5 h-5 text-primary" /> Ingredients
                </div>
                <div className="flex flex-wrap gap-2">
                  {item.ingredients.map((ing, i) => (
                    <motion.span
                      key={ing}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.25 + i * 0.04 }}
                      className="bg-white border-2 border-black text-black font-body text-xs px-3 py-1 rounded-full shadow-pop-sm"
                    >
                      {ing}
                    </motion.span>
                  ))}
                </div>
              </div>

              {/* Order CTA */}
              <div className="border-t-2 border-black/10 pt-5">
                <div className="font-display text-lg text-black mb-3">Order Now</div>
                <div className="grid grid-cols-3 gap-3">
                  <motion.a
                    href={BUSINESS.zomato}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ y: -3, boxShadow: "4px 4px 0px 0px black" }}
                    whileTap={{ y: 1 }}
                    className="flex flex-col items-center gap-1 p-3 bg-red-500 text-white rounded-xl border-2 border-black shadow-pop-sm font-body font-bold text-sm"
                  >
                    <SiZomato className="text-xl" /> Zomato
                  </motion.a>
                  <motion.a
                    href={BUSINESS.swiggy}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ y: -3, boxShadow: "4px 4px 0px 0px black" }}
                    whileTap={{ y: 1 }}
                    className="flex flex-col items-center gap-1 p-3 bg-orange-500 text-white rounded-xl border-2 border-black shadow-pop-sm font-body font-bold text-sm"
                  >
                    <SiSwiggy className="text-xl" /> Swiggy
                  </motion.a>
                  <motion.a
                    href={BUSINESS.whatsapp}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ y: -3, boxShadow: "4px 4px 0px 0px black" }}
                    whileTap={{ y: 1 }}
                    className="flex flex-col items-center gap-1 p-3 bg-green-500 text-white rounded-xl border-2 border-black shadow-pop-sm font-body font-bold text-sm"
                  >
                    <SiWhatsapp className="text-xl" /> WhatsApp
                  </motion.a>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

function MenuShowcase() {
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);

  return (
    <>
      <section id="menu" className="py-12 md:py-20 bg-background relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4">
          <FadeUp className="text-center mb-8 md:mb-14">
            <div className="inline-block bg-secondary text-black font-display text-sm px-4 py-1 rounded-full border-2 border-black shadow-pop-sm mb-4">
              ✦ Signature Dishes ✦
            </div>
            <h2 className="font-display text-4xl md:text-6xl text-foreground drop-shadow-[3px_3px_0px_rgba(0,0,0,0.1)]">
              Our Bomb Menu
            </h2>
            <p className="font-body text-muted-foreground mt-4 max-w-xl mx-auto text-lg">
              Tap any dish to see the full details. Every item is made fresh, on order, with no compromises.
            </p>
          </FadeUp>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {featuredItems.map((item, i) => (
              <FadeIn key={item.name} delay={i * 0.08}>
                <TiltCard>
                  <motion.div
                    onClick={() => setSelectedItem(item)}
                    whileHover={{ y: -10, boxShadow: "8px 8px 0px 0px black" }}
                    className={`rounded-2xl border-2 border-black overflow-hidden shadow-pop group ${item.bg} card-shine h-full cursor-pointer`}
                  >
                    <div className="relative h-48 overflow-hidden">
                      <motion.img
                        src={item.img}
                        alt={item.name}
                        className="w-full h-full object-cover"
                        whileHover={{ scale: 1.12 }}
                        transition={{ duration: 0.5, ease: "easeOut" }}
                      />
                      <div className="absolute top-3 left-3">
                        <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-bold border-2 border-black ${item.isVeg ? "bg-green-400 text-white" : "bg-primary text-white"}`}>
                          <span className="w-2 h-2 rounded-full bg-white" />
                          {item.isVeg ? "VEG" : "NON-VEG"}
                        </span>
                      </div>
                      <div className="absolute top-3 right-3">
                        <span className="bg-secondary text-black font-display font-bold text-sm px-3 py-1 rounded-full border-2 border-black shadow-pop-sm">
                          ₹{item.price}
                        </span>
                      </div>
                      {/* Tap hint overlay */}
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center">
                        <motion.div
                          initial={{ opacity: 0, scale: 0.8 }}
                          whileHover={{ opacity: 1, scale: 1 }}
                          className="bg-white/90 text-black font-display text-sm px-4 py-2 rounded-xl border-2 border-black shadow-pop-sm opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          Tap to View Details →
                        </motion.div>
                      </div>
                    </div>
                    <div className="p-4">
                      <div className="text-xs font-body text-primary font-bold uppercase tracking-wider mb-1">{item.category}</div>
                      <h3 className="font-display text-lg text-black mb-1">{item.name}</h3>
                      <p className="font-body text-sm text-gray-600 line-clamp-2 leading-relaxed">{item.desc}</p>
                      <div className="mt-3 flex items-center justify-between">
                        <div className="flex gap-0.5">
                          {Array.from({ length: 5 }).map((_, idx) => (
                            <span key={idx} className={`text-xs ${idx < item.spiceLevel ? "text-red-500" : "text-gray-300"}`}>🌶</span>
                          ))}
                        </div>
                        <span className="text-xs font-body text-primary font-bold flex items-center gap-1">
                          <Timer className="w-3 h-3" /> {item.prepTime}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                </TiltCard>
              </FadeIn>
            ))}
          </div>

          <FadeUp className="text-center">
            <Link href="/menu">
              <motion.button
                whileHover={{ y: -3, boxShadow: "7px 7px 0px 0px black" }}
                whileTap={{ y: 2 }}
                className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-white font-display text-xl rounded-xl border-2 border-black shadow-pop glow-cta"
              >
                View Full Menu <ArrowRight className="w-5 h-5" />
              </motion.button>
            </Link>
          </FadeUp>
        </div>
      </section>

      <MenuItemModal item={selectedItem} onClose={() => setSelectedItem(null)} />
    </>
  );
}

// ─── HOW TO ORDER ─────────────────────────────────────────────────────
function HowToOrder() {
  const steps = [
    {
      step: "01",
      Gi: GiMeal,
      giColor: "text-blue-600",
      loopAnim: { y: [0, -5, 0] } as any,
      title: "Browse the Menu",
      desc: "Explore our wide range of Rolls, Bowls, Salads & Paninis right here, or on Zomato & Swiggy.",
      color: "bg-blue-100 border-blue-400",
      accent: "#3B82F6",
    },
    {
      step: "02",
      Gi: GiShoppingCart,
      giColor: "text-orange-600",
      loopAnim: { x: [0, 4, 0] } as any,
      title: "Place Your Order",
      desc: "Order online via Zomato or Swiggy for delivery, or walk in to Trishul Complex, Ambernath.",
      color: "bg-orange-100 border-orange-400",
      accent: "#F97316",
    },
    {
      step: "03",
      Gi: GiChefToque,
      giColor: "text-yellow-600",
      loopAnim: { rotate: [-5, 5] } as any,
      title: "Freshly Prepared",
      desc: "Every order is made fresh on demand — no pre-cooked shortcuts. Ready in 8–15 minutes.",
      color: "bg-yellow-100 border-yellow-400",
      accent: "#EAB308",
    },
    {
      step: "04",
      Gi: GiDeliveryDrone,
      giColor: "text-green-600",
      loopAnim: { y: [0, -4, 0], x: [0, 3, 0] } as any,
      title: "Delivered or Pick Up",
      desc: "Enjoy your Bomb meal delivered hot to your door, or pick it straight from our outlet!",
      color: "bg-green-100 border-green-400",
      accent: "#22C55E",
    },
  ];

  return (
    <section className="py-12 md:py-20 bg-background relative overflow-hidden">
      <div className="absolute right-0 top-0 bottom-0 w-20 bg-checkered opacity-[0.04]" />
      <div className="max-w-7xl mx-auto px-4">
        <FadeUp className="text-center mb-8 md:mb-14">
          <div className="inline-block bg-primary text-white font-display text-sm px-4 py-1 rounded-full border-2 border-black shadow-pop-sm mb-4">
            ✦ Simple As 1-2-3 ✦
          </div>
          <h2 className="font-display text-4xl md:text-6xl text-foreground drop-shadow-[3px_3px_0px_rgba(0,0,0,0.1)]">
            How To Order
          </h2>
          <p className="font-body text-muted-foreground mt-4 max-w-xl mx-auto text-lg">
            Getting your Bomb meal is quick and easy — pick your favourite, order and enjoy!
          </p>
        </FadeUp>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {/* Connecting line (desktop) */}
          <div className="hidden lg:block absolute top-12 left-[12.5%] right-[12.5%] h-0.5 bg-black/10 z-0" />

          {steps.map((s, i) => {
            const StepIcon = s.Gi;
            return (
            <FadeIn key={s.step} delay={i * 0.12}>
              <div className="relative z-10 text-center">
                {/* Step bubble */}
                <motion.div
                  animate={s.loopAnim}
                  transition={{ repeat: Infinity, repeatType: "reverse", duration: 2, ease: "easeInOut" }}
                  whileHover={{ scale: 1.1, rotate: [0, -5, 5, 0], transition: { duration: 0.3 } }}
                  className={`w-24 h-24 mx-auto rounded-2xl shadow-pop flex items-center justify-center mb-4 ${s.color} card-shine`}
                  style={{ border: "3px solid black" }}
                >
                  <StepIcon className={`w-12 h-12 ${s.giColor}`} />
                </motion.div>
                {/* Step number badge */}
                <div
                  className="absolute top-0 right-[calc(50%-48px+4px)] -translate-y-2 font-display text-xs text-white px-2 py-0.5 rounded-full border-2 border-black"
                  style={{ background: s.accent }}
                >
                  {s.step}
                </div>
                <h3 className="font-display text-xl text-black mb-2">{s.title}</h3>
                <p className="font-body text-sm text-gray-600 leading-relaxed max-w-xs mx-auto">{s.desc}</p>
              </div>
            </FadeIn>
            );
          })}
        </div>

        {/* CTA */}
        <FadeUp className="text-center mt-14">
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.a
              href={BUSINESS.zomato} target="_blank" rel="noopener noreferrer"
              whileHover={{ y: -3, boxShadow: "6px 6px 0px 0px black" }}
              whileTap={{ y: 1 }}
              className="inline-flex items-center gap-3 px-7 py-4 bg-red-500 text-white font-display text-lg rounded-xl border-2 border-black shadow-pop"
            >
              <SiZomato className="text-xl" /> Order on Zomato
            </motion.a>
            <motion.a
              href={BUSINESS.swiggy} target="_blank" rel="noopener noreferrer"
              whileHover={{ y: -3, boxShadow: "6px 6px 0px 0px black" }}
              whileTap={{ y: 1 }}
              className="inline-flex items-center gap-3 px-7 py-4 bg-orange-500 text-white font-display text-lg rounded-xl border-2 border-black shadow-pop"
            >
              <SiSwiggy className="text-xl" /> Order on Swiggy
            </motion.a>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}

// ─── OUR STORY SECTION ────────────────────────────────────────────────
function OurStory() {
  const facts = [
    { Gi: GiRolledCloth,    giColor: "text-primary",   label: "Started With", value: "A Love of Rolls" },
    { Gi: GiPositionMarker, giColor: "text-red-500",    label: "Based In",     value: "Ambernath, Thane" },
    { Gi: GiClockwork,      giColor: "text-yellow-600", label: "Open Daily",   value: "1 PM – 11 PM" },
    { Gi: GiHeartPlus,      giColor: "text-pink-500",   label: "Our Promise",  value: "Fresh Every Order" },
  ];

  return (
    <section className="py-12 md:py-20 bg-white relative overflow-hidden">
      <div className="absolute left-0 top-0 bottom-0 w-20 bg-checkered opacity-[0.04]" />
      <div className="absolute top-20 right-10 w-60 h-60 rounded-full bg-secondary/20 blur-3xl blob-morph" />
      <div className="absolute bottom-20 left-10 w-40 h-40 rounded-full bg-primary/10 blur-3xl blob-morph" />

      <div className="max-w-7xl mx-auto px-4 relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-center">
          {/* Text side */}
          <FadeUp>
            <div className="inline-block bg-secondary text-black font-display text-sm px-4 py-1 rounded-full border-2 border-black shadow-pop-sm mb-5">
              ✦ Our Story ✦
            </div>
            <h2 className="font-display text-4xl md:text-5xl text-black mb-6 drop-shadow-[3px_3px_0px_rgba(0,0,0,0.1)] leading-tight">
              Born from a Passion for<br />
              <span className="text-primary">Bold Flavours</span>
            </h2>
            <p className="font-body text-gray-700 text-lg leading-relaxed mb-5">
              Bomb Rolls & Bowls was born out of a simple idea — what if every meal could be an unforgettable flavour experience? We started in Ambernath with a small menu, big spices and an even bigger dream.
            </p>
            <p className="font-body text-gray-600 text-base leading-relaxed mb-8">
              Today we serve Rolls, Bowls, Salads and Paninis crafted fresh for every order. No shortcuts, no compromise — just clean ingredients, bold spices and a whole lot of heart in every bite.
            </p>
            <div className="flex flex-wrap gap-3">
              {["🌿 No Preservatives", "⚡ Made-to-Order", "❤️ Ambernath's Favourite", "🏆 4.2★ Rated"].map((tag, i) => (
                <motion.span
                  key={tag}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08, type: "spring" }}
                  className="bg-muted border-2 border-black text-black font-body font-semibold text-sm px-4 py-1.5 rounded-full shadow-pop-sm"
                >
                  {tag}
                </motion.span>
              ))}
            </div>
          </FadeUp>

          {/* Visual side */}
          <FadeIn delay={0.15}>
            <div className="grid grid-cols-2 gap-4">
              {facts.map((f, i) => (
                <motion.div
                  key={f.label}
                  whileHover={{ y: -6, boxShadow: "6px 6px 0px 0px black" }}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, type: "spring", stiffness: 200 }}
                  className="bg-muted rounded-2xl border-2 border-black p-6 shadow-pop text-center card-shine"
                >
                  <div className="flex justify-center mb-3">
                    {(() => { const FactIcon = f.Gi; return <FactIcon className={`w-9 h-9 ${f.giColor}`} />; })()}
                  </div>
                  <div className="font-display text-xs text-primary uppercase tracking-wider mb-1">{f.label}</div>
                  <div className="font-display text-lg text-black">{f.value}</div>
                </motion.div>
              ))}
              {/* Center logo */}
              <motion.div
                className="col-span-2 flex items-center justify-center py-4"
                animate={{ rotate: [0, 3, -3, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              >
                <img src={logoImage} alt="Bomb Rolls Logo" className="w-24 h-24 object-contain drop-shadow-xl" />
              </motion.div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}

// ─── ORDER ONLINE PLATFORMS ───────────────────────────────────────────
function OrderOnlineSection() {
  const platforms = [
    {
      name: "Zomato",
      tagline: "Fast delivery to your door",
      icon: <SiZomato className="text-4xl" />,
      bg: "bg-red-500",
      hoverBg: "hover:bg-red-600",
      badge: "4.2★ Rated",
      detail: "20–35 min delivery",
      url: BUSINESS.zomato,
    },
    {
      name: "Swiggy",
      tagline: "Quick & fresh to your home",
      icon: <SiSwiggy className="text-4xl" />,
      bg: "bg-orange-500",
      hoverBg: "hover:bg-orange-600",
      badge: "Top Rated",
      detail: "25–40 min delivery",
      url: BUSINESS.swiggy,
    },
    {
      name: "WhatsApp",
      tagline: "Direct personal order",
      icon: <SiWhatsapp className="w-10 h-10 text-4xl" />,
      bg: "bg-green-500",
      hoverBg: "hover:bg-green-600",
      badge: "Instant Reply",
      detail: "Bulk orders welcome",
      url: BUSINESS.whatsapp,
    },
    {
      name: "Call Directly",
      tagline: "Talk to us directly",
      icon: <Phone className="w-10 h-10" />,
      bg: "bg-blue-500",
      hoverBg: "hover:bg-blue-600",
      badge: "1–11 PM",
      detail: BUSINESS.phoneDisplay,
      url: `tel:+91${BUSINESS.phone}`,
    },
  ];

  return (
    <section className="py-12 md:py-20 bg-secondary relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-4 bg-checkered border-b-4 border-black" />
      <div className="absolute bottom-0 left-0 right-0 h-4 bg-checkered border-t-4 border-black" />
      <FloatingParticles count={16} color="rgba(0,0,0,0.08)" />

      <div className="max-w-7xl mx-auto px-4 pt-4 pb-4 relative z-10">
        <FadeUp className="text-center mb-8 md:mb-14">
          <div className="inline-block bg-primary text-white font-display text-sm px-4 py-1 rounded-full border-2 border-black shadow-pop-sm mb-4">
            ✦ Order Anytime ✦
          </div>
          <h2 className="font-display text-4xl md:text-6xl text-black drop-shadow-[3px_3px_0px_rgba(0,0,0,0.15)]">
            Order Online Now
          </h2>
          <p className="font-body text-black/70 mt-4 max-w-xl mx-auto text-lg">
            Choose your favourite platform — we're live on Zomato, Swiggy and WhatsApp. Fresh food, delivered fast.
          </p>
        </FadeUp>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {platforms.map((p, i) => (
            <FadeIn key={p.name} delay={i * 0.1}>
              <TiltCard>
                <motion.a
                  href={p.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ y: -10, boxShadow: "8px 8px 0px 0px black" }}
                  whileTap={{ y: 2, boxShadow: "2px 2px 0px 0px black" }}
                  className={`block ${p.bg} ${p.hoverBg} text-white rounded-2xl border-2 border-black shadow-pop p-6 text-center transition-colors card-shine`}
                >
                  <div className="w-16 h-16 mx-auto mb-4 bg-white/20 rounded-2xl border-2 border-white/30 flex items-center justify-center">
                    {p.icon}
                  </div>
                  <div className="font-display text-2xl mb-1">{p.name}</div>
                  <div className="font-body text-white/80 text-sm mb-4">{p.tagline}</div>
                  <div className="bg-black/20 rounded-xl px-4 py-2 border border-white/20 mb-3">
                    <div className="font-display text-lg">{p.badge}</div>
                    <div className="font-body text-xs text-white/70">{p.detail}</div>
                  </div>
                  <div className="flex items-center justify-center gap-2 font-display text-sm">
                    Order Now <ArrowRight className="w-4 h-4" />
                  </div>
                </motion.a>
              </TiltCard>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── TESTIMONIALS ────────────────────────────────────────────────────
const testimonials = [
  {
    name: "Priya Sharma",
    rating: 5,
    avatar: "https://api.dicebear.com/7.x/fun-emoji/svg?seed=priya",
    text: "Tried the Haryali Paneer Roll and OMG it was absolutely incredible! The mint-coriander combo hits like a flavor explosion. Best food in Ambernath — will definitely be back!",
    tag: "Haryali Roll",
  },
  {
    name: "Rohan Mehta",
    rating: 5,
    avatar: "https://api.dicebear.com/7.x/fun-emoji/svg?seed=rohan",
    text: "The Malai Tikka Panini is hands-down the best thing I've eaten in Thane this year. Crispy, cheesy, creamy — everything you could want! Bomb Rolls never disappoints.",
    tag: "Malai Tikka Panini",
  },
  {
    name: "Sneha Patil",
    rating: 5,
    avatar: "https://api.dicebear.com/7.x/fun-emoji/svg?seed=sneha",
    text: "So glad they have amazing veg options! The Makhmali Paneer Roll is literally restaurant-quality food at street food prices. My go-to spot in Ambernath!",
    tag: "Makhmali Roll",
  },
  {
    name: "Arjun Desai",
    rating: 5,
    avatar: "https://api.dicebear.com/7.x/fun-emoji/svg?seed=arjun",
    text: "Ordered from Zomato and it arrived hot and fresh. The Tikka Rice Bowl was so filling and delicious. Super quick delivery and the packaging was great too!",
    tag: "Tikka Rice Bowl",
  },
  {
    name: "Ananya Joshi",
    rating: 5,
    avatar: "https://api.dicebear.com/7.x/fun-emoji/svg?seed=ananya",
    text: "The Angara Chicken Roll is SPICY in the best possible way! Loved every single bite. The staff is super friendly at the Shiv Mandir Rd outlet. A true hidden gem!",
    tag: "Angara Roll",
  },
];

function Testimonials() {
  const [current, setCurrent] = useState(0);
  const [dir, setDir] = useState(1);

  const navigate = (next: number) => {
    setDir(next > current ? 1 : -1);
    setCurrent((next + testimonials.length) % testimonials.length);
  };

  return (
    <section id="testimonials" className="py-12 md:py-20 bg-primary relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-4 bg-checkered border-b-4 border-black" />
      <div className="absolute bottom-0 left-0 right-0 h-4 bg-checkered border-t-4 border-black" />
      <div className="absolute inset-0 bg-checkered opacity-[0.04]" />

      <div className="max-w-4xl mx-auto px-4 relative">
        <FadeUp className="text-center mb-8 md:mb-14">
          <div className="inline-block bg-secondary text-black font-display text-sm px-4 py-1 rounded-full border-2 border-black shadow-pop-sm mb-4">
            ✦ Happy Customers ✦
          </div>
          <h2 className="font-display text-4xl md:text-6xl text-white drop-shadow-[3px_3px_0px_rgba(0,0,0,0.4)]">
            What They Say
          </h2>
        </FadeUp>

        <div className="relative min-h-[400px] sm:min-h-[300px] flex items-center justify-center overflow-hidden">
          <AnimatePresence mode="wait" custom={dir}>
            <motion.div
              key={current}
              custom={dir}
              initial={{ x: dir * 400, opacity: 0, scale: 0.9 }}
              animate={{ x: 0, opacity: 1, scale: 1 }}
              exit={{ x: dir * -400, opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="w-full"
            >
              <div
                className="rounded-2xl border-2 border-white/20 p-5 sm:p-8 mx-auto max-w-2xl relative overflow-hidden"
                style={{
                  background: "rgba(255,255,255,0.12)",
                  backdropFilter: "blur(20px)",
                  WebkitBackdropFilter: "blur(20px)",
                  boxShadow: "0 8px 32px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.2)"
                }}
              >
                {/* Quote decoration */}
                <div className="absolute top-4 right-6 font-display text-8xl text-white/10 leading-none select-none">"</div>

                <div className="flex flex-wrap items-center gap-3 mb-4 sm:mb-5">
                  <motion.img
                    src={testimonials[current].avatar}
                    alt={testimonials[current].name}
                    className="w-16 h-16 rounded-full border-3 border-secondary bg-secondary"
                    style={{ border: "3px solid #FFD700" }}
                    initial={{ scale: 0, rotate: -20 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ delay: 0.15, type: "spring", stiffness: 300 }}
                  />
                  <div>
                    <div className="font-display text-xl text-white">{testimonials[current].name}</div>
                    <div className="flex gap-1 mt-1">
                      {Array.from({ length: testimonials[current].rating }).map((_, i) => (
                        <motion.div
                          key={i}
                          initial={{ scale: 0, rotate: -30 }}
                          animate={{ scale: 1, rotate: 0 }}
                          transition={{ delay: 0.2 + i * 0.07, type: "spring", stiffness: 400 }}
                        >
                          <Star className="w-4 h-4 fill-secondary text-secondary" />
                        </motion.div>
                      ))}
                    </div>
                  </div>
                  <div className="ml-auto">
                    <motion.span
                      className="bg-secondary text-black font-display text-xs px-3 py-1.5 rounded-full border-2 border-black shadow-pop-sm block"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.3, type: "spring" }}
                    >
                      {testimonials[current].tag}
                    </motion.span>
                  </div>
                </div>
                <motion.p
                  className="font-body text-white/90 text-lg leading-relaxed italic relative z-10"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  "{testimonials[current].text}"
                </motion.p>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-center gap-4 mt-10">
          <motion.button
            whileHover={{ scale: 1.15, y: -2 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => navigate(current - 1)}
            className="w-12 h-12 text-black rounded-full border-2 border-black shadow-pop flex items-center justify-center"
            style={{ background: "rgba(255,255,255,0.9)" }}
          >
            <ChevronLeft className="w-5 h-5" />
          </motion.button>
          <div className="flex gap-3">
            {testimonials.map((_, i) => (
              <motion.button
                key={i}
                onClick={() => navigate(i)}
                animate={{ scale: i === current ? 1.4 : 1, backgroundColor: i === current ? "#FFD700" : "rgba(255,255,255,0.35)" }}
                className="w-3 h-3 rounded-full border-2 border-white/40"
              />
            ))}
          </div>
          <motion.button
            whileHover={{ scale: 1.15, y: -2 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => navigate(current + 1)}
            className="w-12 h-12 text-black rounded-full border-2 border-black shadow-pop flex items-center justify-center"
            style={{ background: "rgba(255,255,255,0.9)" }}
          >
            <ChevronRight className="w-5 h-5" />
          </motion.button>
        </div>
      </div>
    </section>
  );
}

// ─── SOCIAL MEDIA SECTION ────────────────────────────────────────────
const socialPosts = [
  {
    id: 1,
    type: "reel",
    img: "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=500&q=80",
    caption: "🌯 Paneer Chatpata Roll — the fan favourite! Crispy, tangy, and absolutely bomb. 💣 #BombRolls #PaneerChatpata",
    likes: "2.4K",
    platform: "instagram",
  },
  {
    id: 2,
    type: "post",
    img: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=500&q=80",
    caption: "✨ You deserve a Healthy Treat! Our fresh salads and bowls are calling your name. #HealthyEating #BombBowls",
    likes: "1.8K",
    platform: "instagram",
  },
  {
    id: 3,
    type: "reel",
    img: "https://images.unsplash.com/photo-1529042410759-befb1204b468?w=500&q=80",
    caption: "🧀 Paneer Achari Panini dropping in hot! That pickle-spice kick is unreal 🔥 Come taste it yourself!",
    likes: "3.1K",
    platform: "instagram",
  },
  {
    id: 4,
    type: "post",
    img: "https://images.unsplash.com/photo-1596797038530-2c107229654b?w=500&q=80",
    caption: "🍜 Tikka Rice Bowl — the ultimate comfort food. Order now on Zomato or Swiggy! #BombBowls #Ambernath",
    likes: "1.2K",
    platform: "instagram",
  },
  {
    id: 5,
    type: "reel",
    img: "https://images.unsplash.com/photo-1574484284002-952d92456975?w=500&q=80",
    caption: "😤 Angara Roll challenge! Can you handle the heat? 🌶️🌶️🌶️ Tag a friend who thinks they can! #SpicyFood",
    likes: "4.2K",
    platform: "instagram",
  },
  {
    id: 6,
    type: "post",
    img: "https://images.unsplash.com/photo-1626700051175-6818013e1d4f?w=500&q=80",
    caption: "💛 Bomb Specials dropping every week! Check our Highlights for the latest offers 👆 @bomb_rolls_and_bowls",
    likes: "2.7K",
    platform: "instagram",
  },
];

function SocialMediaSection() {
  return (
    <section id="social" className="py-12 md:py-20 bg-muted relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4">
        <FadeUp className="text-center mb-8 md:mb-14">
          <div className="inline-block bg-primary text-white font-display text-sm px-4 py-1 rounded-full border-2 border-black shadow-pop-sm mb-4">
            ✦ Follow The Flavor ✦
          </div>
          <h2 className="font-display text-4xl md:text-6xl text-foreground drop-shadow-[3px_3px_0px_rgba(0,0,0,0.1)]">
            @bomb_rolls_and_bowls
          </h2>
          <p className="font-body text-muted-foreground mt-4 max-w-xl mx-auto text-lg">
            Follow us on Instagram — {BUSINESS.instagramFollowers} followers · {BUSINESS.instagramPosts} posts of rolls, bowls, reels & behind-the-scenes!
          </p>
          <div className="flex items-center justify-center gap-4 mt-6">
            {[
              { icon: <SiInstagram />, label: "Instagram", color: "bg-gradient-to-br from-pink-500 to-orange-500", href: BUSINESS.instagram },
              { icon: <SiFacebook />, label: "Facebook", color: "bg-blue-600", href: "#" },
              { icon: <SiYoutube />, label: "YouTube", color: "bg-red-600", href: "#" },
            ].map(s => (
              <motion.a
                key={s.label}
                href={s.href}
                whileHover={{ y: -3, boxShadow: "4px 4px 0px 0px black" }}
                whileTap={{ y: 1 }}
                className={`flex items-center gap-2 px-4 py-2 ${s.color} text-white font-body font-semibold text-sm rounded-xl border-2 border-black shadow-pop-sm`}
              >
                <span className="text-lg">{s.icon}</span>
                {s.label}
              </motion.a>
            ))}
          </div>
        </FadeUp>

        {/* Instagram grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {socialPosts.map((post, i) => (
            <FadeIn key={post.id} delay={i * 0.06}>
              <motion.a
                href={BUSINESS.instagram}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -6, boxShadow: "6px 6px 0px 0px black" }}
                className="group relative rounded-2xl border-2 border-black overflow-hidden shadow-pop cursor-pointer aspect-square block"
              >
                <img
                  src={post.img}
                  alt={`Post ${post.id}`}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                {/* Reel indicator */}
                {post.type === "reel" && (
                  <div className="absolute top-3 right-3 bg-black/70 text-white text-xs font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                    ▶ Reel
                  </div>
                )}
                {/* Hover overlay */}
                <motion.div
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  className="absolute inset-0 bg-black/70 flex flex-col items-center justify-center p-4 text-white text-center"
                >
                  <div className="text-2xl font-bold mb-1">❤️ {post.likes}</div>
                  <p className="text-xs font-body leading-snug line-clamp-3">{post.caption}</p>
                </motion.div>
                {/* Instagram corner icon */}
                <div className="absolute bottom-3 left-3">
                  <SiInstagram className="text-white/80 w-5 h-5 drop-shadow-md" />
                </div>
              </motion.a>
            </FadeIn>
          ))}
        </div>

        {/* Instagram Follow CTA Banner */}
        <FadeUp className="mt-12">
          <motion.a
            href={BUSINESS.instagram}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ y: -4, boxShadow: "8px 8px 0px 0px black" }}
            whileTap={{ y: 2 }}
            className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 sm:p-7 bg-gradient-to-r from-pink-500 via-purple-500 to-orange-500 rounded-2xl border-2 border-black shadow-pop cursor-pointer text-center sm:text-left"
            data-testid="link-instagram-follow"
          >
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-gradient-to-br from-pink-500 to-orange-500 rounded-2xl border-2 border-black flex items-center justify-center shadow-pop-sm">
                <SiInstagram className="text-white w-8 h-8" />
              </div>
              <div>
                <div className="font-display text-2xl text-white">Follow on Instagram</div>
                <div className="font-body text-white/80 text-sm mt-0.5">
                  {BUSINESS.instagramHandle} · {BUSINESS.instagramFollowers} followers · {BUSINESS.instagramPosts} posts
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className="font-body text-white/70 text-sm hidden sm:block">Daily reels, specials & behind-the-scenes</span>
              <div className="flex items-center gap-2 px-6 py-3 bg-white text-pink-600 font-bold rounded-xl border-2 border-black shadow-pop-sm font-body whitespace-nowrap">
                <SiInstagram className="text-lg" /> Follow Us
              </div>
            </div>
          </motion.a>
        </FadeUp>
      </div>
    </section>
  );
}

// ─── CONTACT SECTION ─────────────────────────────────────────────────
function ContactSection() {
  const [formState, setFormState] = useState({ name: "", phone: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
    setFormState({ name: "", phone: "", message: "" });
  };

  return (
    <section id="contact" className="py-12 md:py-20 bg-white relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-4 bg-checkered border-b-4 border-black" />
      <div className="absolute bottom-0 left-0 right-0 h-4 bg-checkered border-t-4 border-black" />
      <div className="absolute top-0 left-0 w-40 h-40 bg-secondary opacity-20 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-60 h-60 bg-primary opacity-10 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-4">
        <FadeUp className="text-center mb-8 md:mb-14">
          <div className="inline-block bg-secondary text-black font-display text-sm px-4 py-1 rounded-full border-2 border-black shadow-pop-sm mb-4">
            ✦ Get In Touch ✦
          </div>
          <h2 className="font-display text-4xl md:text-6xl text-foreground">
            Contact Us
          </h2>
          <p className="font-body text-muted-foreground mt-4 max-w-xl mx-auto text-lg">
            Have a question or want to place a bulk order? We'd love to hear from you!
          </p>
        </FadeUp>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-12 items-start">
          {/* Contact Info */}
          <FadeUp delay={0.1}>
            <div className="space-y-6">
              {[
                {
                  icon: <FaLocationDot className="w-6 h-6 text-primary" />,
                  label: "Find Us",
                  value: "Shop 8, Trishul Commercial Complex, Opp. Shiv Basav Nagar, Shiv Mandir Rd, Ambernath, Thane – 421501",
                  sub: "Open Daily · " + BUSINESS.hours,
                  href: "https://maps.google.com/?q=Bomb+Rolls+Bowls+Ambernath+Thane",
                },
                {
                  icon: <Phone className="w-6 h-6 text-primary" />,
                  label: "Call Us",
                  value: BUSINESS.phoneDisplay,
                  sub: "Available during business hours",
                  href: "tel:+917387744600",
                },
                {
                  icon: <SiWhatsapp className="w-6 h-6 text-green-500" />,
                  label: "WhatsApp Us",
                  value: BUSINESS.phoneDisplay,
                  sub: "Quick replies on WhatsApp",
                  href: BUSINESS.whatsapp,
                },
              ].map((item, i) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="flex items-start gap-4 p-5 bg-muted rounded-2xl border-2 border-black shadow-pop-sm hover:shadow-pop transition-shadow cursor-pointer"
                  onClick={() => item.href && window.open(item.href, "_blank")}
                >
                  <div className="w-12 h-12 bg-secondary rounded-xl border-2 border-black flex items-center justify-center flex-shrink-0 shadow-pop-sm">
                    {item.icon}
                  </div>
                  <div>
                    <div className="font-display text-sm text-primary uppercase tracking-wider">{item.label}</div>
                    <div className="font-body font-semibold text-foreground mt-0.5">{item.value}</div>
                    <div className="font-body text-xs text-muted-foreground mt-0.5">{item.sub}</div>
                  </div>
                </motion.div>
              ))}

              {/* Google Rating Badge */}
              <div className="flex items-center gap-3 p-4 bg-white rounded-2xl border-2 border-black shadow-pop-sm">
                <div className="text-3xl font-display font-bold text-foreground">{BUSINESS.rating}</div>
                <div>
                  <div className="flex gap-0.5">
                    {[1,2,3,4,5].map(i => (
                      <Star key={i} className={`w-4 h-4 ${i <= 4 ? "fill-secondary text-secondary" : "fill-secondary/40 text-secondary/40"}`} />
                    ))}
                  </div>
                  <div className="font-body text-xs text-muted-foreground mt-0.5">{BUSINESS.ratingCount}+ Google Reviews</div>
                </div>
                <div className="ml-auto">
                  <div className="w-10 h-10 bg-white rounded-full border-2 border-black flex items-center justify-center text-lg">⭐</div>
                </div>
              </div>

              {/* Zomato / Swiggy */}
              <div className="pt-1">
                <p className="font-display text-lg text-black mb-3">Order Online 🛵</p>
                <div className="flex flex-wrap gap-3">
                  <motion.a
                    href={BUSINESS.zomato}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ y: -3, boxShadow: "5px 5px 0px 0px black" }}
                    className="flex items-center gap-2 px-5 py-3 bg-red-500 text-white font-bold rounded-xl border-2 border-black shadow-pop-sm font-body"
                  >
                    <SiZomato className="text-xl" /> Zomato
                  </motion.a>
                  <motion.a
                    href={BUSINESS.swiggy}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ y: -3, boxShadow: "5px 5px 0px 0px black" }}
                    className="flex items-center gap-2 px-5 py-3 bg-orange-500 text-white font-bold rounded-xl border-2 border-black shadow-pop-sm font-body"
                  >
                    <SiSwiggy className="text-xl" /> Swiggy
                  </motion.a>
                  <motion.a
                    href={BUSINESS.whatsapp}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ y: -3, boxShadow: "5px 5px 0px 0px black" }}
                    className="flex items-center gap-2 px-5 py-3 bg-green-500 text-white font-bold rounded-xl border-2 border-black shadow-pop-sm font-body"
                  >
                    <SiWhatsapp className="text-xl" /> WhatsApp
                  </motion.a>
                </div>
              </div>
            </div>
          </FadeUp>

          {/* Contact Form */}
          <FadeUp delay={0.2}>
            <form
              onSubmit={handleSubmit}
              className="bg-muted rounded-2xl border-2 border-black shadow-pop p-5 sm:p-8 space-y-5"
            >
              <h3 className="font-display text-2xl text-black">Send a Message 💬</h3>

              <div>
                <label className="block font-body text-sm font-semibold text-foreground mb-1">Your Name</label>
                <input
                  type="text"
                  required
                  value={formState.name}
                  onChange={e => setFormState(s => ({ ...s, name: e.target.value }))}
                  placeholder="e.g. Priya Sharma"
                  className="w-full px-4 py-3 bg-white border-2 border-black rounded-xl font-body text-sm focus:outline-none focus:border-primary shadow-pop-sm"
                  data-testid="input-contact-name"
                />
              </div>

              <div>
                <label className="block font-body text-sm font-semibold text-foreground mb-1">Phone Number</label>
                <input
                  type="tel"
                  value={formState.phone}
                  onChange={e => setFormState(s => ({ ...s, phone: e.target.value }))}
                  placeholder="+91 98765 43210"
                  className="w-full px-4 py-3 bg-white border-2 border-black rounded-xl font-body text-sm focus:outline-none focus:border-primary shadow-pop-sm"
                  data-testid="input-contact-phone"
                />
              </div>

              <div>
                <label className="block font-body text-sm font-semibold text-foreground mb-1">Message</label>
                <textarea
                  required
                  rows={4}
                  value={formState.message}
                  onChange={e => setFormState(s => ({ ...s, message: e.target.value }))}
                  placeholder="Tell us what you'd like..."
                  className="w-full px-4 py-3 bg-white border-2 border-black rounded-xl font-body text-sm focus:outline-none focus:border-primary shadow-pop-sm resize-none"
                  data-testid="textarea-contact-message"
                />
              </div>

              <AnimatePresence mode="wait">
                {submitted ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="flex items-center gap-2 text-green-600 font-display text-lg"
                  >
                    <CheckCircle className="w-6 h-6" /> Message sent! We'll be in touch soon 🎉
                  </motion.div>
                ) : (
                  <motion.button
                    key="submit"
                    type="submit"
                    whileHover={{ y: -3, boxShadow: "6px 6px 0px 0px black" }}
                    whileTap={{ y: 2, boxShadow: "2px 2px 0px 0px black" }}
                    className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-primary text-white font-display text-lg rounded-xl border-2 border-black shadow-pop"
                    data-testid="button-contact-submit"
                  >
                    <Send className="w-5 h-5" /> Send Message
                  </motion.button>
                )}
              </AnimatePresence>
            </form>
          </FadeUp>
        </div>
      </div>
    </section>
  );
}

// ─── FOOTER ──────────────────────────────────────────────────────────
function Footer() {
  const navLinks = [
    { label: "Why Choose Us", href: "#why-us" },
    { label: "Menu", href: "#menu" },
    { label: "Testimonials", href: "#testimonials" },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <footer className="bg-foreground text-white border-t-4 border-black">
      <div className="h-4 bg-checkered border-b-4 border-black" />
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <img src={logoImage} alt="Logo" className="w-12 h-12 object-contain" />
              <div>
                <div className="font-display text-xl text-white">Bomb Rolls & Bowls</div>
                <div className="font-body text-xs text-white/50">Est. 2024 · Ambernath, Thane</div>
              </div>
            </div>
            <p className="font-body text-sm text-white/60 leading-relaxed max-w-xs">
              Where every bite is a flavor bomb waiting to detonate! Rolls, Bowls, Salads & Paninis crafted with the boldest spices, served with love from Ambernath, Thane.
            </p>
            <div className="flex gap-3 mt-5">
              {[
                { icon: <SiInstagram />, href: BUSINESS.instagram },
                { icon: <SiFacebook />, href: "#" },
                { icon: <SiYoutube />, href: "#" },
              ].map((s, i) => (
                <motion.a
                  key={i}
                  href={s.href}
                  whileHover={{ y: -3, scale: 1.1 }}
                  className="w-10 h-10 bg-white/10 hover:bg-secondary hover:text-black text-white rounded-xl border border-white/20 flex items-center justify-center text-lg transition-colors"
                >
                  {s.icon}
                </motion.a>
              ))}
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-display text-lg text-secondary mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {navLinks.map(l => (
                <li key={l.label}>
                  <button
                    onClick={() => document.querySelector(l.href)?.scrollIntoView({ behavior: "smooth" })}
                    className="font-body text-white/60 hover:text-secondary transition-colors text-sm hover:translate-x-1 inline-flex"
                  >
                    → {l.label}
                  </button>
                </li>
              ))}
              <li>
                <Link href="/menu" className="font-body text-white/60 hover:text-secondary transition-colors text-sm">
                  → Digital Menu
                </Link>
              </li>
            </ul>
          </div>

          {/* Hours + Order */}
          <div>
            <h4 className="font-display text-lg text-secondary mb-4">Order Now</h4>
            <div className="space-y-3">
              <div className="font-body text-sm text-white/60">
                <span className="text-white font-semibold">Hours:</span> {BUSINESS.hours}
              </div>
              <div className="font-body text-sm text-white/60">
                <span className="text-white font-semibold">📞</span> {BUSINESS.phoneDisplay}
              </div>
              <div className="flex flex-wrap gap-2">
                <a href={BUSINESS.zomato} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 px-3 py-2 bg-red-500 text-white font-bold text-xs rounded-lg border border-red-400 font-body">
                  <SiZomato /> Zomato
                </a>
                <a href={BUSINESS.swiggy} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 px-3 py-2 bg-orange-500 text-white font-bold text-xs rounded-lg border border-orange-400 font-body">
                  <SiSwiggy /> Swiggy
                </a>
                <a href={BUSINESS.instagram} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 px-3 py-2 bg-gradient-to-br from-pink-500 to-orange-500 text-white font-bold text-xs rounded-lg font-body">
                  <SiInstagram /> Instagram
                </a>
              </div>
              <p className="font-body text-xs text-white/40 mt-3">
                📍 Ambernath, Thane, Maharashtra
              </p>
            </div>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-3 text-white/40 text-xs font-body">
          <span>© 2024 Bomb Rolls & Bowls. All rights reserved. · Ambernath, Thane</span>
          <span>Made with 💣 in Ambernath · {BUSINESS.phoneDisplay}</span>
        </div>
      </div>
    </footer>
  );
}

// ─── MENU PHOTOS SECTION ──────────────────────────────────────────────
function MenuPhotosSection() {
  return (
    <section className="py-12 md:py-20 bg-white relative overflow-hidden">
      <div className="absolute inset-0 opacity-[0.03] bg-checkered" />
      <div className="max-w-7xl mx-auto px-4 relative">
        <FadeUp className="text-center mb-8 md:mb-14">
          <div className="inline-block bg-secondary text-black font-display text-sm px-4 py-1 rounded-full border-2 border-black shadow-pop-sm mb-4">
            ✦ Real Menu Cards ✦
          </div>
          <h2 className="font-display text-4xl md:text-6xl text-foreground drop-shadow-[3px_3px_0px_rgba(0,0,0,0.1)]">
            Our Full Menu
          </h2>
          <p className="font-body text-muted-foreground mt-4 max-w-xl mx-auto text-lg">
            Rolls, Bowls, Salads & Paninis — something for everyone. Veg & Non-Veg options available.
          </p>
        </FadeUp>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {[
            {
              img: menuVegImg,
              label: "🌿 Veg Menu",
              badge: "Pure Veg Options",
              badgeColor: "bg-green-500",
              desc: "Haryali Rolls, Makhmali Paneer, Veg Bowls, Paninis & more",
            },
            {
              img: menuNonVegImg,
              label: "🍗 Non-Veg Menu",
              badge: "Chicken & More",
              badgeColor: "bg-primary",
              desc: "Angara Chicken, Malai Tikka, Chicken Bowls & more",
            },
          ].map((item, i) => (
            <FadeUp key={i} delay={i * 0.15}>
              <motion.div
                whileHover={{ y: -6, boxShadow: "8px 8px 0px 0px black" }}
                className="rounded-2xl border-2 border-black shadow-pop overflow-hidden bg-muted group"
              >
                <div className="relative overflow-hidden">
                  <img
                    src={item.img}
                    alt={item.label}
                    className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute top-4 left-4">
                    <span className={`${item.badgeColor} text-white font-display text-xs px-3 py-1 rounded-full border-2 border-black shadow-pop-sm`}>
                      {item.badge}
                    </span>
                  </div>
                </div>
                <div className="p-5 flex items-center justify-between">
                  <div>
                    <div className="font-display text-xl text-foreground">{item.label}</div>
                    <div className="font-body text-sm text-muted-foreground mt-1">{item.desc}</div>
                  </div>
                  <motion.a
                    href="#menu"
                    onClick={e => { e.preventDefault(); document.querySelector("#menu")?.scrollIntoView({ behavior: "smooth" }); }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center gap-1 px-4 py-2 bg-secondary text-black font-bold text-sm rounded-xl border-2 border-black shadow-pop-sm font-body whitespace-nowrap"
                  >
                    View <ArrowRight className="w-3 h-3" />
                  </motion.a>
                </div>
              </motion.div>
            </FadeUp>
          ))}
        </div>

        {/* Order CTA */}
        <FadeUp className="text-center mt-10">
          <div className="inline-flex flex-wrap items-center justify-center gap-3">
            <motion.a
              href={BUSINESS.zomato}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ y: -3, boxShadow: "5px 5px 0px 0px black" }}
              className="flex items-center gap-2 px-6 py-3 bg-red-500 text-white font-bold rounded-xl border-2 border-black shadow-pop-sm font-body"
            >
              <SiZomato className="text-lg" /> Order on Zomato
            </motion.a>
            <motion.a
              href={BUSINESS.swiggy}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ y: -3, boxShadow: "5px 5px 0px 0px black" }}
              className="flex items-center gap-2 px-6 py-3 bg-orange-500 text-white font-bold rounded-xl border-2 border-black shadow-pop-sm font-body"
            >
              <SiSwiggy className="text-lg" /> Order on Swiggy
            </motion.a>
            <motion.a
              href={BUSINESS.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ y: -3, boxShadow: "5px 5px 0px 0px black" }}
              className="flex items-center gap-2 px-6 py-3 bg-green-600 text-white font-bold rounded-xl border-2 border-black shadow-pop-sm font-body"
            >
              <SiWhatsapp className="text-xl" /> WhatsApp Order
            </motion.a>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}


// ─── SCROLL TO TOP ────────────────────────────────────────────────────
function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.5, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.5, y: 20 }}
          whileHover={{ y: -4, boxShadow: "5px 5px 0px 0px black" }}
          whileTap={{ y: 2 }}
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-secondary text-black rounded-2xl border-2 border-black shadow-pop flex items-center justify-center"
          data-testid="button-scroll-top"
          aria-label="Scroll to top"
        >
          <ChevronUp className="w-6 h-6 font-bold" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}

// ─── MAIN PAGE ────────────────────────────────────────────────────────
export default function LandingPage() {
  return (
    <div className="min-h-screen">
      <ScrollProgress />
      <Navbar />
      <HeroSection />
      <StatsBar />

      {/* Red → Yellow */}
      <div className="bg-primary" style={{ marginBottom: "-1px" }}>
        <WaveDivider fill="#FFD700" />
      </div>
      <WhyChooseUs />

      {/* Yellow → White */}
      <div className="bg-secondary" style={{ marginBottom: "-1px" }}>
        <WaveDivider fill="#ffffff" />
      </div>
      <HowToOrder />

      {/* White → Yellow */}
      <div className="bg-white" style={{ marginBottom: "-1px" }}>
        <WaveDivider fill="#FFD700" />
      </div>
      <OrderOnlineSection />

      {/* Yellow → White */}
      <div className="bg-secondary" style={{ marginBottom: "-1px" }}>
        <WaveDivider fill="#ffffff" />
      </div>
      <MenuShowcase />

      {/* White → White (subtle) */}
      <div className="bg-white" style={{ marginBottom: "-1px" }}>
        <WaveDivider fill="#fafafa" />
      </div>
      <OurStory />

      {/* White → White */}
      <div className="bg-white" style={{ marginBottom: "-1px" }}>
        <WaveDivider fill="#ffffff" />
      </div>
      <MenuPhotosSection />

      {/* White → Red */}
      <div className="bg-white" style={{ marginBottom: "-1px" }}>
        <WaveDivider fill="#E63946" />
      </div>
      <Testimonials />

      {/* Red → Muted */}
      <div className="bg-primary" style={{ marginBottom: "-1px" }}>
        <WaveDivider fill="#f2efd9" />
      </div>
      <SocialMediaSection />
      <ContactSection />
      <Footer />
      <ScrollToTop />
    </div>
  );
}
