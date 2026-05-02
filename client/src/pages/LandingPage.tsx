import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform, useInView } from "framer-motion";
import {
  MapPin, Phone, Mail, Star, ChevronUp, ArrowRight, Leaf, Flame,
  Clock, Award, Heart, Zap, Shield, Smile, ChevronLeft, ChevronRight,
  Instagram, Facebook, Youtube, Send, CheckCircle
} from "lucide-react";
import { SiFacebook, SiInstagram, SiYoutube, SiZomato, SiSwiggy } from "react-icons/si";
import { Link } from "wouter";
import logoImage from "@assets/logo_(1)_1769147400424.png";

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

// ─── Scroll Animation Wrapper ────────────────────────────────────────
function FadeUp({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function FadeIn({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.92 }}
      animate={isInView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.55, delay, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
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
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
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
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "bg-primary shadow-lg border-b-4 border-black" : "bg-transparent"}`}
    >
      {/* Checkered top stripe */}
      {scrolled && <div className="h-1 w-full bg-checkered-sm opacity-60 absolute top-0 left-0" />}
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <button onClick={() => scrollTo("#hero")} className="flex items-center gap-2 group">
          <motion.img
            src={logoImage}
            alt="Bomb Rolls & Bowls"
            className="w-10 h-10 object-contain"
            whileHover={{ rotate: [0, -8, 8, 0] }}
            transition={{ duration: 0.4 }}
          />
          <span className={`font-display font-bold text-lg tracking-wide drop-shadow-[2px_2px_0px_rgba(0,0,0,1)] transition-colors ${scrolled ? "text-white" : "text-white"}`}>
            BOMB ROLLS & BOWLS
          </span>
        </button>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-6">
          {links.map(l => (
            <button
              key={l.label}
              onClick={() => scrollTo(l.href)}
              className={`font-display text-sm font-semibold transition-all hover:scale-105 ${scrolled ? "text-white hover:text-secondary" : "text-white/90 hover:text-white"}`}
            >
              {l.label}
            </button>
          ))}
          <Link href="/menu">
            <motion.button
              whileHover={{ y: -2, boxShadow: "6px 6px 0px 0px black" }}
              whileTap={{ y: 2, boxShadow: "2px 2px 0px 0px black" }}
              className="px-5 py-2 bg-secondary text-black font-display font-bold text-sm rounded-xl border-2 border-black shadow-pop"
            >
              Digital Menu →
            </motion.button>
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden flex flex-col gap-1.5 p-2"
          data-testid="button-mobile-menu"
        >
          {[0, 1, 2].map(i => (
            <motion.span
              key={i}
              className="block h-0.5 w-6 bg-white rounded-full"
              animate={mobileOpen ? {
                rotate: i === 0 ? 45 : i === 2 ? -45 : 0,
                y: i === 0 ? 8 : i === 2 ? -8 : 0,
                opacity: i === 1 ? 0 : 1
              } : {}}
            />
          ))}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden bg-primary border-t-4 border-black overflow-hidden"
          >
            <div className="px-6 py-4 flex flex-col gap-4">
              {links.map(l => (
                <button
                  key={l.label}
                  onClick={() => scrollTo(l.href)}
                  className="font-display text-xl text-white text-left hover:text-secondary transition-colors"
                >
                  {l.label}
                </button>
              ))}
              <Link href="/menu">
                <button className="mt-2 px-5 py-3 bg-secondary text-black font-display font-bold rounded-xl border-2 border-black shadow-pop w-full">
                  Digital Menu →
                </button>
              </Link>
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
      {/* Ken Burns animated background */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div
          className="absolute inset-0 w-full h-full bg-cover bg-center hero-ken-burns"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=1920&q=80')" }}
        />
      </div>

      {/* Overlays */}
      <div className="absolute inset-0 bg-black/60 z-[1]" />
      <div className="absolute inset-0 bg-primary/30 z-[1]" />

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
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, type: "spring", stiffness: 180 }}
          className="mb-8"
        >
          <img src={logoImage} alt="Logo" className="w-28 h-28 md:w-36 md:h-36 object-contain mx-auto drop-shadow-2xl" />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="font-display text-5xl md:text-7xl lg:text-8xl font-bold mb-4 drop-shadow-[4px_4px_0px_rgba(0,0,0,1)] leading-tight"
        >
          We Serve
        </motion.h1>

        {/* Typewriter */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="font-display text-4xl md:text-6xl lg:text-7xl font-bold text-secondary drop-shadow-[3px_3px_0px_rgba(0,0,0,1)] mb-6 min-h-[1.2em]"
        >
          {typeText}
          <motion.span
            animate={{ opacity: [1, 0] }}
            transition={{ duration: 0.5, repeat: Infinity }}
            className="inline-block w-1 h-[0.85em] bg-secondary ml-1 align-middle"
          />
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
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
          transition={{ delay: 1.0 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <Link href="/menu">
            <motion.button
              whileHover={{ y: -3, boxShadow: "7px 7px 0px 0px black" }}
              whileTap={{ y: 2, boxShadow: "2px 2px 0px 0px black" }}
              className="px-8 py-4 bg-secondary text-black font-display text-xl font-bold rounded-xl border-2 border-black shadow-pop"
            >
              🍽️ Explore Menu
            </motion.button>
          </Link>
          <motion.button
            whileHover={{ y: -3, boxShadow: "7px 7px 0px 0px black" }}
            whileTap={{ y: 2, boxShadow: "2px 2px 0px 0px black" }}
            onClick={() => document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" })}
            className="px-8 py-4 bg-white/10 backdrop-blur-sm text-white font-display text-xl font-bold rounded-xl border-2 border-white/60 hover:bg-white/20 transition-all"
          >
            📍 Find Us
          </motion.button>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, y: [0, 10, 0] }}
          transition={{ delay: 1.4, y: { duration: 1.6, repeat: Infinity } }}
          className="mt-16 flex flex-col items-center gap-2 text-white/60"
        >
          <span className="text-xs font-body tracking-widest uppercase">Scroll Down</span>
          <div className="w-px h-10 bg-white/30 mx-auto" />
        </motion.div>
      </div>
    </section>
  );
}

// ─── STATS BAR ───────────────────────────────────────────────────────
function StatsBar() {
  const stats = [
    { value: "30+", label: "Menu Items" },
    { value: "4", label: "Food Categories" },
    { value: "100%", label: "Fresh Daily" },
    { value: "2024", label: "Established" },
  ];

  return (
    <section className="bg-primary border-y-4 border-black py-6 overflow-hidden relative">
      <div className="absolute inset-y-0 right-0 w-32 bg-checkered opacity-10" />
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-6">
        {stats.map((s, i) => (
          <FadeUp key={s.label} delay={i * 0.1}>
            <div className="text-center text-white">
              <div className="font-display text-4xl md:text-5xl font-bold text-secondary drop-shadow-[2px_2px_0px_rgba(0,0,0,1)]">
                {s.value}
              </div>
              <div className="font-body text-sm md:text-base text-white/80 mt-1 uppercase tracking-wider">
                {s.label}
              </div>
            </div>
          </FadeUp>
        ))}
      </div>
    </section>
  );
}

// ─── WHY CHOOSE US ───────────────────────────────────────────────────
function WhyChooseUs() {
  const reasons = [
    {
      icon: <Leaf className="w-8 h-8" />,
      emoji: "🌿",
      title: "Fresh Ingredients",
      desc: "Every roll, bowl and panini is made with the freshest, highest-quality ingredients sourced daily.",
      color: "bg-green-100 border-green-400",
    },
    {
      icon: <Flame className="w-8 h-8" />,
      emoji: "🌶️",
      title: "Bold Flavors",
      desc: "From Chatpata to Haryali — every flavor profile is a handcrafted explosion of spices.",
      color: "bg-orange-100 border-orange-400",
    },
    {
      icon: <Clock className="w-8 h-8" />,
      emoji: "⚡",
      title: "Quick Service",
      desc: "Made to order and served hot in minutes. Because hunger can't wait!",
      color: "bg-yellow-100 border-yellow-400",
    },
    {
      icon: <Shield className="w-8 h-8" />,
      emoji: "🥗",
      title: "Veg & Non-Veg",
      desc: "A rich variety of vegetarian and non-vegetarian options for every food lover.",
      color: "bg-emerald-100 border-emerald-400",
    },
    {
      icon: <Smile className="w-8 h-8" />,
      emoji: "😊",
      title: "Affordable Pricing",
      desc: "Starting from just ₹110 — delicious food doesn't have to be expensive.",
      color: "bg-blue-100 border-blue-400",
    },
    {
      icon: <Heart className="w-8 h-8" />,
      emoji: "❤️",
      title: "Made with Love",
      desc: "Each dish is crafted with passion and served with a smile. You can taste the difference.",
      color: "bg-red-100 border-red-400",
    },
  ];

  return (
    <section id="why-us" className="py-20 bg-secondary relative overflow-hidden">
      {/* Decorative pattern */}
      <div className="absolute top-0 left-0 right-0 h-4 bg-checkered border-b-4 border-black" />
      <div className="absolute bottom-0 left-0 right-0 h-4 bg-checkered border-t-4 border-black" />
      <div className="absolute right-0 top-0 bottom-0 w-24 bg-checkered opacity-10" />

      <div className="max-w-7xl mx-auto px-4 pt-4 pb-4">
        <FadeUp className="text-center mb-14">
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
          {reasons.map((r, i) => (
            <FadeIn key={r.title} delay={i * 0.08}>
              <motion.div
                whileHover={{ y: -6, boxShadow: "6px 6px 0px 0px black" }}
                className={`rounded-2xl border-2 border-black p-6 shadow-pop bg-white cursor-default transition-shadow`}
              >
                <div className="text-4xl mb-3">{r.emoji}</div>
                <h3 className="font-display text-xl text-black mb-2">{r.title}</h3>
                <p className="font-body text-sm text-gray-600 leading-relaxed">{r.desc}</p>
              </motion.div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── MENU SHOWCASE ───────────────────────────────────────────────────
const featuredItems = [
  {
    name: "Chatpata Roll (Paneer)",
    category: "Bomb Rolls 🌯",
    desc: "Spicy, tangy and vibrant — made with paneer and the best quality ingredients.",
    price: 150,
    isVeg: true,
    img: "https://images.unsplash.com/photo-1626700051175-6818013e1d4f?w=400&q=80",
    bg: "bg-orange-50",
  },
  {
    name: "Angara Roll (Chicken)",
    category: "Bomb Rolls 🌯",
    desc: "Explosion of spicy, tangy and vibrant flavours infused with warm spices.",
    price: 160,
    isVeg: false,
    img: "https://images.unsplash.com/photo-1565299507177-b0ac66763828?w=400&q=80",
    bg: "bg-red-50",
  },
  {
    name: "Tikka Rice Bowl (Paneer)",
    category: "Bomb Bowls 🍜",
    desc: "Embark on a culinary rice bowl journey with tikka and aromatic basmati.",
    price: 160,
    isVeg: true,
    img: "https://images.unsplash.com/photo-1596797038530-2c107229654b?w=400&q=80",
    bg: "bg-yellow-50",
  },
  {
    name: "Malai Tikka Panini (Chicken)",
    category: "Bomb Panini 🥪",
    desc: "Crunchy, cheesy and exploding with rich, creamy malai tikka flavour.",
    price: 190,
    isVeg: false,
    img: "https://images.unsplash.com/photo-1528736235302-52922df5c122?w=400&q=80",
    bg: "bg-amber-50",
  },
  {
    name: "Haryali Salad (Paneer)",
    category: "Bomb Salads 🥗",
    desc: "Bursting with chilli and cooling flavour notes of mint and coriander.",
    price: 160,
    isVeg: true,
    img: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&q=80",
    bg: "bg-green-50",
  },
  {
    name: "Makhmali Roll (Chicken)",
    category: "Bomb Rolls 🌯",
    desc: "A blast of rich and creamy flavours with a harmonious balance of spices.",
    price: 170,
    isVeg: false,
    img: "https://images.unsplash.com/photo-1574484284002-952d92456975?w=400&q=80",
    bg: "bg-rose-50",
  },
];

function MenuShowcase() {
  return (
    <section id="menu" className="py-20 bg-background relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4">
        <FadeUp className="text-center mb-14">
          <div className="inline-block bg-secondary text-black font-display text-sm px-4 py-1 rounded-full border-2 border-black shadow-pop-sm mb-4">
            ✦ Signature Dishes ✦
          </div>
          <h2 className="font-display text-4xl md:text-6xl text-foreground drop-shadow-[3px_3px_0px_rgba(0,0,0,0.1)]">
            Our Bomb Menu
          </h2>
          <p className="font-body text-muted-foreground mt-4 max-w-xl mx-auto text-lg">
            A taste of what makes us special. Every item is made fresh, on order, with no compromises.
          </p>
        </FadeUp>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {featuredItems.map((item, i) => (
            <FadeIn key={item.name} delay={i * 0.07}>
              <motion.div
                whileHover={{ y: -8, boxShadow: "6px 6px 0px 0px black" }}
                className={`rounded-2xl border-2 border-black overflow-hidden shadow-pop group ${item.bg}`}
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={item.img}
                    alt={item.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute top-3 left-3">
                    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-bold border-2 border-black ${item.isVeg ? "bg-green-400 text-white" : "bg-primary text-white"}`}>
                      <span className={`w-2 h-2 rounded-full ${item.isVeg ? "bg-white" : "bg-white"}`} />
                      {item.isVeg ? "VEG" : "NON-VEG"}
                    </span>
                  </div>
                  <div className="absolute top-3 right-3">
                    <span className="bg-secondary text-black font-display font-bold text-sm px-3 py-1 rounded-full border-2 border-black shadow-pop-sm">
                      ₹{item.price}
                    </span>
                  </div>
                </div>
                <div className="p-4">
                  <div className="text-xs font-body text-primary font-bold uppercase tracking-wider mb-1">{item.category}</div>
                  <h3 className="font-display text-lg text-black mb-1">{item.name}</h3>
                  <p className="font-body text-sm text-gray-600 line-clamp-2 leading-relaxed">{item.desc}</p>
                </div>
              </motion.div>
            </FadeIn>
          ))}
        </div>

        <FadeUp className="text-center">
          <Link href="/menu">
            <motion.button
              whileHover={{ y: -3, boxShadow: "7px 7px 0px 0px black" }}
              whileTap={{ y: 2 }}
              className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-white font-display text-xl rounded-xl border-2 border-black shadow-pop"
            >
              View Full Menu <ArrowRight className="w-5 h-5" />
            </motion.button>
          </Link>
        </FadeUp>
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
    text: "Tried the Haryali Paneer Roll and OMG it was absolutely incredible! The mint-coriander combo hits like a flavor explosion. Will definitely be coming back!",
    tag: "Haryali Roll",
  },
  {
    name: "Rohan Mehta",
    rating: 5,
    avatar: "https://api.dicebear.com/7.x/fun-emoji/svg?seed=rohan",
    text: "The Malai Tikka Panini is hands-down the best thing I've eaten in Pune this year. Crispy, cheesy, creamy — everything you could want!",
    tag: "Malai Tikka Panini",
  },
  {
    name: "Sneha Patil",
    rating: 5,
    avatar: "https://api.dicebear.com/7.x/fun-emoji/svg?seed=sneha",
    text: "So glad they have amazing veg options! The Makhmali Paneer Roll is literally restaurant-quality food at street food prices. Obsessed!",
    tag: "Makhmali Roll",
  },
  {
    name: "Arjun Desai",
    rating: 5,
    avatar: "https://api.dicebear.com/7.x/fun-emoji/svg?seed=arjun",
    text: "Ordered the Tikka Rice Bowl for lunch and it was so filling and delicious. Super quick service and the packaging was great too!",
    tag: "Tikka Rice Bowl",
  },
  {
    name: "Ananya Joshi",
    rating: 5,
    avatar: "https://api.dicebear.com/7.x/fun-emoji/svg?seed=ananya",
    text: "The Angara Chicken Roll is SPICY in the best possible way! Loved every single bite. The staff is super friendly too. Perfect spot!",
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
    <section id="testimonials" className="py-20 bg-primary relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-4 bg-checkered border-b-4 border-black" />
      <div className="absolute bottom-0 left-0 right-0 h-4 bg-checkered border-t-4 border-black" />
      <div className="absolute inset-0 bg-checkered opacity-[0.04]" />

      <div className="max-w-4xl mx-auto px-4 relative">
        <FadeUp className="text-center mb-14">
          <div className="inline-block bg-secondary text-black font-display text-sm px-4 py-1 rounded-full border-2 border-black shadow-pop-sm mb-4">
            ✦ Happy Customers ✦
          </div>
          <h2 className="font-display text-4xl md:text-6xl text-white drop-shadow-[3px_3px_0px_rgba(0,0,0,0.4)]">
            What They Say
          </h2>
        </FadeUp>

        <div className="relative min-h-[280px] flex items-center justify-center overflow-hidden">
          <AnimatePresence mode="wait" custom={dir}>
            <motion.div
              key={current}
              custom={dir}
              initial={{ x: dir * 300, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: dir * -300, opacity: 0 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="w-full"
            >
              <div className="bg-white rounded-2xl border-2 border-black shadow-pop p-8 mx-auto max-w-2xl">
                <div className="flex items-center gap-4 mb-4">
                  <img
                    src={testimonials[current].avatar}
                    alt={testimonials[current].name}
                    className="w-14 h-14 rounded-full border-2 border-black bg-secondary"
                  />
                  <div>
                    <div className="font-display text-lg text-black">{testimonials[current].name}</div>
                    <div className="flex gap-1">
                      {Array.from({ length: testimonials[current].rating }).map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-secondary text-secondary" />
                      ))}
                    </div>
                  </div>
                  <div className="ml-auto">
                    <span className="bg-secondary text-black font-display text-xs px-3 py-1 rounded-full border-2 border-black shadow-pop-sm">
                      {testimonials[current].tag}
                    </span>
                  </div>
                </div>
                <p className="font-body text-gray-700 text-lg leading-relaxed italic">
                  "{testimonials[current].text}"
                </p>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-center gap-4 mt-8">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => navigate(current - 1)}
            className="w-12 h-12 bg-white text-black rounded-full border-2 border-black shadow-pop flex items-center justify-center"
          >
            <ChevronLeft className="w-5 h-5" />
          </motion.button>
          <div className="flex gap-2">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => navigate(i)}
                className={`w-3 h-3 rounded-full border-2 border-black transition-all ${i === current ? "bg-secondary scale-125" : "bg-white/40"}`}
              />
            ))}
          </div>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => navigate(current + 1)}
            className="w-12 h-12 bg-white text-black rounded-full border-2 border-black shadow-pop flex items-center justify-center"
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
    caption: "🌯 When the Haryali Roll hits different! Fresh, spicy and absolutely bomb. 💣 #BombRolls",
    likes: "2.4K",
    platform: "instagram",
  },
  {
    id: 2,
    type: "post",
    img: "https://images.unsplash.com/photo-1596797038530-2c107229654b?w=500&q=80",
    caption: "🍜 Our Tikka Rice Bowls are the real deal. Order yours today! #BombBowls #FoodieIndia",
    likes: "1.8K",
    platform: "instagram",
  },
  {
    id: 3,
    type: "reel",
    img: "https://images.unsplash.com/photo-1529042410759-befb1204b468?w=500&q=80",
    caption: "🧀 The crunch of our Malai Tikka Panini is something else! Watch till end! 🔥",
    likes: "3.1K",
    platform: "instagram",
  },
  {
    id: 4,
    type: "post",
    img: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=500&q=80",
    caption: "🥗 Healthy doesn't mean boring. Our Bomb Salads are proof! #EatHealthy",
    likes: "1.2K",
    platform: "instagram",
  },
  {
    id: 5,
    type: "reel",
    img: "https://images.unsplash.com/photo-1574484284002-952d92456975?w=500&q=80",
    caption: "😤 Angara Roll challenge! Can you handle the heat? 🌶️🌶️🌶️ #SpicyFood",
    likes: "4.2K",
    platform: "instagram",
  },
  {
    id: 6,
    type: "post",
    img: "https://images.unsplash.com/photo-1626700051175-6818013e1d4f?w=500&q=80",
    caption: "💛 Every flavor is crafted with love. Come taste the Bomb difference! #BombRollsAndBowls",
    likes: "2.7K",
    platform: "instagram",
  },
];

function SocialMediaSection() {
  return (
    <section id="social" className="py-20 bg-muted relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4">
        <FadeUp className="text-center mb-14">
          <div className="inline-block bg-primary text-white font-display text-sm px-4 py-1 rounded-full border-2 border-black shadow-pop-sm mb-4">
            ✦ Follow The Flavor ✦
          </div>
          <h2 className="font-display text-4xl md:text-6xl text-foreground drop-shadow-[3px_3px_0px_rgba(0,0,0,0.1)]">
            @BombRollsAndBowls
          </h2>
          <p className="font-body text-muted-foreground mt-4 max-w-xl mx-auto text-lg">
            Follow us for daily food reels, behind-the-scenes, and exclusive deals!
          </p>
          <div className="flex items-center justify-center gap-4 mt-6">
            {[
              { icon: <SiInstagram />, label: "Instagram", color: "bg-gradient-to-br from-pink-500 to-orange-500", href: "#" },
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
              <motion.div
                whileHover={{ y: -6, boxShadow: "6px 6px 0px 0px black" }}
                className="group relative rounded-2xl border-2 border-black overflow-hidden shadow-pop cursor-pointer aspect-square"
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
              </motion.div>
            </FadeIn>
          ))}
        </div>
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
    <section id="contact" className="py-20 bg-white relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-4 bg-checkered border-b-4 border-black" />
      <div className="absolute bottom-0 left-0 right-0 h-4 bg-checkered border-t-4 border-black" />
      <div className="absolute top-0 left-0 w-40 h-40 bg-secondary opacity-20 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-60 h-60 bg-primary opacity-10 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-4">
        <FadeUp className="text-center mb-14">
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

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Contact Info */}
          <FadeUp delay={0.1}>
            <div className="space-y-6">
              {[
                {
                  icon: <MapPin className="w-6 h-6 text-primary" />,
                  label: "Find Us",
                  value: "Bomb Rolls & Bowls, Pune, Maharashtra",
                  sub: "Open daily · 11 AM – 10 PM",
                },
                {
                  icon: <Phone className="w-6 h-6 text-primary" />,
                  label: "Call Us",
                  value: "+91 98765 43210",
                  sub: "Mon–Sun · 10 AM – 9 PM",
                },
                {
                  icon: <Mail className="w-6 h-6 text-primary" />,
                  label: "Email Us",
                  value: "hello@bombrollsandbowls.com",
                  sub: "We reply within 24 hours",
                },
              ].map((item, i) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="flex items-start gap-4 p-5 bg-muted rounded-2xl border-2 border-black shadow-pop-sm"
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

              {/* Zomato / Swiggy */}
              <div className="pt-2">
                <p className="font-display text-lg text-black mb-3">Order Online 🛵</p>
                <div className="flex gap-3">
                  <motion.a
                    href="#"
                    whileHover={{ y: -3, boxShadow: "5px 5px 0px 0px black" }}
                    className="flex items-center gap-2 px-5 py-3 bg-red-500 text-white font-bold rounded-xl border-2 border-black shadow-pop-sm font-body"
                  >
                    <SiZomato className="text-xl" /> Zomato
                  </motion.a>
                  <motion.a
                    href="#"
                    whileHover={{ y: -3, boxShadow: "5px 5px 0px 0px black" }}
                    className="flex items-center gap-2 px-5 py-3 bg-orange-500 text-white font-bold rounded-xl border-2 border-black shadow-pop-sm font-body"
                  >
                    <SiSwiggy className="text-xl" /> Swiggy
                  </motion.a>
                </div>
              </div>
            </div>
          </FadeUp>

          {/* Contact Form */}
          <FadeUp delay={0.2}>
            <form
              onSubmit={handleSubmit}
              className="bg-muted rounded-2xl border-2 border-black shadow-pop p-8 space-y-5"
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
                <div className="font-body text-xs text-white/50">Est. 2024 · Pune, India</div>
              </div>
            </div>
            <p className="font-body text-sm text-white/60 leading-relaxed max-w-xs">
              Where every bite is a flavor bomb waiting to detonate! Crafted with the boldest spices, served with love.
            </p>
            <div className="flex gap-3 mt-5">
              {[
                { icon: <SiInstagram />, href: "#" },
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
                <span className="text-white font-semibold">Hours:</span> Mon–Sun · 11 AM – 10 PM
              </div>
              <div className="flex gap-2">
                <a href="#" className="flex items-center gap-1 px-3 py-2 bg-red-500 text-white font-bold text-xs rounded-lg border border-red-400 font-body">
                  <SiZomato /> Zomato
                </a>
                <a href="#" className="flex items-center gap-1 px-3 py-2 bg-orange-500 text-white font-bold text-xs rounded-lg border border-orange-400 font-body">
                  <SiSwiggy /> Swiggy
                </a>
              </div>
              <p className="font-body text-xs text-white/40 mt-3">
                📍 Pune, Maharashtra, India
              </p>
            </div>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-3 text-white/40 text-xs font-body">
          <span>© 2024 Bomb Rolls & Bowls. All rights reserved.</span>
          <span>Made with 💣 in Pune, India</span>
        </div>
      </div>
    </footer>
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
      <Navbar />
      <HeroSection />
      <StatsBar />
      <WhyChooseUs />
      <MenuShowcase />
      <Testimonials />
      <SocialMediaSection />
      <ContactSection />
      <Footer />
      <ScrollToTop />
    </div>
  );
}
