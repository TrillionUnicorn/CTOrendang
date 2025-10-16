import { h as head, b as attr_style, c as ensure_array_like, d as attr_class, s as stringify, a as attr } from "../../chunks/index2.js";
import "clsx";
import { m as motion } from "../../chunks/motion.js";
import { U as escape_html } from "../../chunks/context.js";
function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let email = "";
    let name = "";
    let company = "";
    let isSubmitting = false;
    let scrollY = 0;
    const pricingTiers = [
      {
        name: "AI Starter",
        price: 99,
        originalPrice: 99,
        earlyBirdPrice: 49,
        description: "Perfect for pre-seed startups and solo founders",
        features: [
          "AI Technical Analysis",
          "Tech Stack Recommendations",
          "Hiring Guidance",
          "Monthly Reports",
          "Community Access"
        ],
        cta: "Start Free Trial",
        popular: false
      },
      {
        name: "CTO Connect",
        price: 299,
        originalPrice: 299,
        earlyBirdPrice: 149,
        description: "For seed stage startups with small technical teams",
        features: [
          "Everything in Starter",
          "4 Hours Monthly CTO Sessions",
          "Strategic Planning",
          "Team Building Guidance",
          "Crisis Support"
        ],
        cta: "Get Started",
        popular: true
      },
      {
        name: "CTO Partnership",
        price: 999,
        originalPrice: 999,
        earlyBirdPrice: 499,
        description: "For Series A+ with growing teams",
        features: [
          "Everything in Connect",
          "16 Hours Weekly CTO Sessions",
          "Hands-on Leadership",
          "Board Preparation",
          "Vendor Management"
        ],
        cta: "Contact Sales",
        popular: false
      }
    ];
    const stats = [
      { value: "200+", label: "Expert CTOs" },
      { value: "500+", label: "Startups Served" },
      { value: "94%", label: "Success Rate" },
      { value: "$50M", label: "Avg Portfolio Value" }
    ];
    const steps = [
      {
        number: 1,
        title: "Submit Your Project",
        description: "Tell us about your startup, technical needs, and goals. Our AI analyzes your requirements in minutes.",
        icon: "📝"
      },
      {
        number: 2,
        title: "Get AI Analysis + CTO Matches",
        description: "Receive instant technical assessment and get matched with 3-5 expert CTOs perfect for your needs.",
        icon: "🤖"
      },
      {
        number: 3,
        title: "Start Building",
        description: "Connect with your matched CTO, get strategic guidance, and build your product with confidence.",
        icon: "🚀"
      }
    ];
    head($$renderer2, ($$renderer3) => {
      $$renderer3.title(($$renderer4) => {
        $$renderer4.push(`<title>CTOrendang - AI + Human CTO Platform | World-Class Technical Leadership</title>`);
      });
      $$renderer3.push(`<meta name="description" content="Get the strategic guidance of a $300K+ CTO at a fraction of the cost. AI-powered technical analysis + vetted expert CTOs for startups."/>`);
    });
    $$renderer2.push(`<div class="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900"><section class="relative min-h-screen flex items-center justify-center overflow-hidden"><div class="absolute inset-0 opacity-20"${attr_style(`transform: translateY(${stringify(scrollY * 0.5)}px)`)}><div class="absolute top-20 left-10 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-float"></div> <div class="absolute top-40 right-10 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-float" style="animation-delay: 2s"></div> <div class="absolute -bottom-8 left-20 w-72 h-72 bg-indigo-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-float" style="animation-delay: 4s"></div></div> <div class="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 text-center">`);
    motion($$renderer2, {
      initial: { opacity: 0, y: 20 },
      animate: { opacity: 1, y: 0 },
      transition: { duration: 0.8 },
      children: ($$renderer3) => {
        $$renderer3.push(`<h1 class="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">The World's First<br/> <span class="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">AI + Human CTO</span> <br/>Marketplace</h1>`);
      },
      $$slots: { default: true }
    });
    $$renderer2.push(`<!----> `);
    motion($$renderer2, {
      initial: { opacity: 0, y: 20 },
      animate: { opacity: 1, y: 0 },
      transition: { duration: 0.8, delay: 0.2 },
      children: ($$renderer3) => {
        $$renderer3.push(`<p class="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto">Get the strategic guidance of a $300K+ CTO at a fraction of the cost. AI-powered
					technical analysis + vetted expert CTOs, starting at $99/month.</p>`);
      },
      $$slots: { default: true }
    });
    $$renderer2.push(`<!----> `);
    motion($$renderer2, {
      initial: { opacity: 0, y: 20 },
      animate: { opacity: 1, y: 0 },
      transition: { duration: 0.8, delay: 0.4 },
      children: ($$renderer3) => {
        $$renderer3.push(`<div class="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12"><a href="#waitlist" class="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg font-semibold text-lg hover:from-purple-700 hover:to-pink-700 transition-all transform hover:scale-105 shadow-lg">Join Waitlist - 50% Off</a> <a href="/product" class="px-8 py-4 bg-white/10 backdrop-blur-sm text-white rounded-lg font-semibold text-lg hover:bg-white/20 transition-all border border-white/20">Try AI Analysis Free</a></div>`);
      },
      $$slots: { default: true }
    });
    $$renderer2.push(`<!----> `);
    motion($$renderer2, {
      initial: { opacity: 0, y: 20 },
      animate: { opacity: 1, y: 0 },
      transition: { duration: 0.8, delay: 0.6 },
      children: ($$renderer3) => {
        $$renderer3.push(`<div class="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto"><!--[-->`);
        const each_array = ensure_array_like(stats);
        for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
          let stat = each_array[$$index];
          $$renderer3.push(`<div class="text-center"><div class="text-3xl md:text-4xl font-bold text-white mb-2">${escape_html(stat.value)}</div> <div class="text-gray-400 text-sm md:text-base">${escape_html(stat.label)}</div></div>`);
        }
        $$renderer3.push(`<!--]--></div>`);
      },
      $$slots: { default: true }
    });
    $$renderer2.push(`<!----></div> <div class="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce"><svg class="w-6 h-6 text-white/50" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path></svg></div></section> <section class="py-24 bg-slate-900"><div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"><div class="text-center mb-16"><h2 class="text-4xl md:text-5xl font-bold text-white mb-4">Why Choose CTOrendang?</h2> <p class="text-xl text-gray-400 max-w-3xl mx-auto">The only platform combining AI-powered analysis with vetted human expertise</p></div> <div class="grid md:grid-cols-3 gap-8"><div class="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 hover:border-purple-500/50 transition-all hover-lift"><div class="text-5xl mb-4">🤖</div> <h3 class="text-2xl font-bold text-white mb-4">AI-Powered Analysis</h3> <p class="text-gray-400 mb-4">Get instant technical assessment of your startup. Our AI analyzes 50+ factors including architecture, scalability, security, and tech stack fit.</p> <ul class="space-y-2 text-gray-300"><li class="flex items-start"><span class="text-green-400 mr-2">✓</span> <span>Instant results in 5 minutes</span></li> <li class="flex items-start"><span class="text-green-400 mr-2">✓</span> <span>50+ technical factors analyzed</span></li> <li class="flex items-start"><span class="text-green-400 mr-2">✓</span> <span>Actionable recommendations</span></li></ul></div> <div class="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 hover:border-purple-500/50 transition-all hover-lift"><div class="text-5xl mb-4">👨‍💼</div> <h3 class="text-2xl font-bold text-white mb-4">Vetted Expert CTOs</h3> <p class="text-gray-400 mb-4">Access 200+ expert CTOs with 10+ years experience. All vetted for technical excellence, startup success, and communication skills.</p> <ul class="space-y-2 text-gray-300"><li class="flex items-start"><span class="text-green-400 mr-2">✓</span> <span>200+ expert CTOs available</span></li> <li class="flex items-start"><span class="text-green-400 mr-2">✓</span> <span>Average 12+ years experience</span></li> <li class="flex items-start"><span class="text-green-400 mr-2">✓</span> <span>Proven startup success</span></li></ul></div> <div class="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 hover:border-purple-500/50 transition-all hover-lift"><div class="text-5xl mb-4">💰</div> <h3 class="text-2xl font-bold text-white mb-4">Affordable Pricing</h3> <p class="text-gray-400 mb-4">Get world-class CTO guidance at 90% less cost than hiring full-time. Flexible plans that scale with your startup.</p> <ul class="space-y-2 text-gray-300"><li class="flex items-start"><span class="text-green-400 mr-2">✓</span> <span>Starting at $99/month</span></li> <li class="flex items-start"><span class="text-green-400 mr-2">✓</span> <span>90% cheaper than full-time</span></li> <li class="flex items-start"><span class="text-green-400 mr-2">✓</span> <span>Cancel anytime, no lock-in</span></li></ul></div></div></div></section> <section class="py-24 bg-gradient-to-br from-purple-900/20 to-slate-900"><div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"><div class="text-center mb-16"><h2 class="text-4xl md:text-5xl font-bold text-white mb-4">How It Works</h2> <p class="text-xl text-gray-400 max-w-3xl mx-auto">Get matched with your perfect CTO in 3 simple steps</p></div> <div class="grid md:grid-cols-3 gap-12"><!--[-->`);
    const each_array_1 = ensure_array_like(steps);
    for (let i = 0, $$length = each_array_1.length; i < $$length; i++) {
      let step = each_array_1[i];
      $$renderer2.push(`<div class="relative">`);
      if (i < steps.length - 1) {
        $$renderer2.push("<!--[-->");
        $$renderer2.push(`<div class="hidden md:block absolute top-16 left-full w-full h-0.5 bg-gradient-to-r from-purple-500 to-transparent"></div>`);
      } else {
        $$renderer2.push("<!--[!-->");
      }
      $$renderer2.push(`<!--]--> <div class="text-center"><div class="inline-flex items-center justify-center w-32 h-32 rounded-full bg-gradient-to-br from-purple-600 to-pink-600 text-6xl mb-6 shadow-lg">${escape_html(step.icon)}</div> <div class="text-purple-400 font-bold text-lg mb-2">Step ${escape_html(step.number)}</div> <h3 class="text-2xl font-bold text-white mb-4">${escape_html(step.title)}</h3> <p class="text-gray-400">${escape_html(step.description)}</p></div></div>`);
    }
    $$renderer2.push(`<!--]--></div></div></section> <section class="py-24 bg-slate-900"><div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"><div class="text-center mb-16"><h2 class="text-4xl md:text-5xl font-bold text-white mb-4">Early Bird Pricing</h2> <p class="text-xl text-gray-400 max-w-3xl mx-auto">Lock in 50% off for the first 6 months. Limited time offer for early adopters.</p></div> <div class="grid md:grid-cols-3 gap-8"><!--[-->`);
    const each_array_2 = ensure_array_like(pricingTiers);
    for (let $$index_3 = 0, $$length = each_array_2.length; $$index_3 < $$length; $$index_3++) {
      let tier = each_array_2[$$index_3];
      $$renderer2.push(`<div${attr_class(`relative bg-white/5 backdrop-blur-sm rounded-2xl p-8 border ${stringify(tier.popular ? "border-purple-500 shadow-2xl shadow-purple-500/20" : "border-white/10")} hover-lift`)}>`);
      if (tier.popular) {
        $$renderer2.push("<!--[-->");
        $$renderer2.push(`<div class="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-1 rounded-full text-sm font-semibold">Most Popular</div>`);
      } else {
        $$renderer2.push("<!--[!-->");
      }
      $$renderer2.push(`<!--]--> <div class="text-center mb-8"><h3 class="text-2xl font-bold text-white mb-2">${escape_html(tier.name)}</h3> <p class="text-gray-400 text-sm mb-4">${escape_html(tier.description)}</p> <div class="mb-2"><span class="text-gray-500 line-through text-2xl">$${escape_html(tier.originalPrice)}</span></div> <div class="flex items-baseline justify-center"><span class="text-5xl font-bold text-white">$${escape_html(tier.earlyBirdPrice)}</span> <span class="text-gray-400 ml-2">/month</span></div> <div class="text-green-400 text-sm mt-2 font-semibold">Save $${escape_html(tier.originalPrice - tier.earlyBirdPrice)}/month</div></div> <ul class="space-y-4 mb-8"><!--[-->`);
      const each_array_3 = ensure_array_like(tier.features);
      for (let $$index_2 = 0, $$length2 = each_array_3.length; $$index_2 < $$length2; $$index_2++) {
        let feature = each_array_3[$$index_2];
        $$renderer2.push(`<li class="flex items-start text-gray-300"><svg class="w-5 h-5 text-green-400 mr-3 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg> <span>${escape_html(feature)}</span></li>`);
      }
      $$renderer2.push(`<!--]--></ul> <button${attr_class(`w-full py-3 px-6 rounded-lg font-semibold transition-all ${stringify(tier.popular ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:from-purple-700 hover:to-pink-700" : "bg-white/10 text-white hover:bg-white/20")} border border-white/20`)}>${escape_html(tier.cta)}</button></div>`);
    }
    $$renderer2.push(`<!--]--></div></div></section> <section class="py-24 bg-gradient-to-br from-purple-900/20 to-slate-900"><div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"><div class="grid md:grid-cols-2 gap-12 items-center"><div><h2 class="text-4xl md:text-5xl font-bold text-white mb-6">Our Mission</h2> <p class="text-xl text-gray-300 mb-6">To democratize access to world-class technical leadership by combining AI-powered analysis with a global network of expert CTOs.</p> <p class="text-gray-400 mb-6">We believe every startup deserves access to strategic technical guidance, regardless of budget. By leveraging AI and fractional CTO models, we're making it possible for founders to get the expertise they need to succeed.</p> <div class="space-y-4"><div class="flex items-start"><div class="text-purple-400 text-2xl mr-4">🎯</div> <div><h4 class="text-white font-semibold mb-1">Reduce Startup Failure</h4> <p class="text-gray-400 text-sm">Help founders avoid the 70% of failures caused by poor technical decisions</p></div></div> <div class="flex items-start"><div class="text-purple-400 text-2xl mr-4">🌍</div> <div><h4 class="text-white font-semibold mb-1">Global Access</h4> <p class="text-gray-400 text-sm">Connect founders worldwide with expert CTOs across all time zones</p></div></div> <div class="flex items-start"><div class="text-purple-400 text-2xl mr-4">💡</div> <div><h4 class="text-white font-semibold mb-1">AI-Powered Innovation</h4> <p class="text-gray-400 text-sm">Continuously improve our AI to provide better technical insights</p></div></div></div></div> <div><h2 class="text-4xl md:text-5xl font-bold text-white mb-6">Our Vision</h2> <p class="text-xl text-gray-300 mb-6">To become the global standard for technical leadership in startups, helping millions of founders build successful companies.</p> <div class="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10"><h4 class="text-white font-bold text-lg mb-4">By 2030, we aim to:</h4> <ul class="space-y-3 text-gray-300"><li class="flex items-start"><span class="text-green-400 mr-2">✓</span> <span>Serve 100,000+ startups globally</span></li> <li class="flex items-start"><span class="text-green-400 mr-2">✓</span> <span>Build a network of 10,000+ expert CTOs</span></li> <li class="flex items-start"><span class="text-green-400 mr-2">✓</span> <span>Reduce startup technical failure rate by 50%</span></li> <li class="flex items-start"><span class="text-green-400 mr-2">✓</span> <span>Create $100B+ in startup value</span></li></ul></div></div></div></div></section> <section id="waitlist" class="py-24 bg-slate-900"><div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8"><div class="bg-gradient-to-br from-purple-600 to-pink-600 rounded-3xl p-12 text-center shadow-2xl"><h2 class="text-4xl md:text-5xl font-bold text-white mb-4">Join the Waitlist</h2> <p class="text-xl text-white/90 mb-8">Be among the first 1,000 founders to get 50% off for 6 months</p> `);
    {
      $$renderer2.push("<!--[!-->");
      $$renderer2.push(`<form class="space-y-4"><div class="grid md:grid-cols-2 gap-4"><input type="text"${attr("value", name)} placeholder="Your Name" class="px-6 py-4 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/50"/> <input type="email"${attr("value", email)} required placeholder="Your Email *" class="px-6 py-4 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/50"/></div> <input type="text"${attr("value", company)} placeholder="Company Name (Optional)" class="w-full px-6 py-4 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/50"/> <button type="submit"${attr("disabled", isSubmitting, true)} class="w-full px-8 py-4 bg-white text-purple-600 rounded-lg font-bold text-lg hover:bg-gray-100 transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg">${escape_html("Join Waitlist - Get 50% Off")}</button> <p class="text-white/70 text-sm">🔒 We respect your privacy. Unsubscribe anytime.</p></form>`);
    }
    $$renderer2.push(`<!--]--></div></div></section> <footer class="bg-slate-950 py-12"><div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"><div class="grid md:grid-cols-4 gap-8 mb-8"><div><h3 class="text-white font-bold text-xl mb-4">CTOrendang</h3> <p class="text-gray-400 text-sm">AI + Human CTO Platform democratizing access to world-class technical leadership.</p></div> <div><h4 class="text-white font-semibold mb-4">Product</h4> <ul class="space-y-2 text-gray-400 text-sm"><li><a href="/product" class="hover:text-purple-400 transition-colors">AI Analysis</a></li> <li><a href="/product" class="hover:text-purple-400 transition-colors">CTO Marketplace</a></li> <li><a href="/pitch" class="hover:text-purple-400 transition-colors">Pitch Deck</a></li> <li><a href="#waitlist" class="hover:text-purple-400 transition-colors">Pricing</a></li></ul></div> <div><h4 class="text-white font-semibold mb-4">Company</h4> <ul class="space-y-2 text-gray-400 text-sm"><li><a href="/contact" class="hover:text-purple-400 transition-colors">Contact Us</a></li> <li><a href="/about" class="hover:text-purple-400 transition-colors">About</a></li> <li><a href="/careers" class="hover:text-purple-400 transition-colors">Careers</a></li> <li><a href="/blog" class="hover:text-purple-400 transition-colors">Blog</a></li></ul></div> <div><h4 class="text-white font-semibold mb-4">Legal</h4> <ul class="space-y-2 text-gray-400 text-sm"><li><a href="/privacy" class="hover:text-purple-400 transition-colors">Privacy Policy</a></li> <li><a href="/terms" class="hover:text-purple-400 transition-colors">Terms of Service</a></li> <li><a href="/cookies" class="hover:text-purple-400 transition-colors">Cookie Policy</a></li></ul></div></div> <div class="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center"><p class="text-gray-400 text-sm mb-4 md:mb-0">© 2024 CTOrendang. All rights reserved.</p> <div class="flex space-x-6"><a href="https://twitter.com/ctorendang" class="text-gray-400 hover:text-purple-400 transition-colors"><span class="sr-only">Twitter</span> <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"></path></svg></a> <a href="https://linkedin.com/company/ctorendang" class="text-gray-400 hover:text-purple-400 transition-colors"><span class="sr-only">LinkedIn</span> <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"></path></svg></a> <a href="https://github.com/HunterHo07" class="text-gray-400 hover:text-purple-400 transition-colors"><span class="sr-only">GitHub</span> <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path fill-rule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clip-rule="evenodd"></path></svg></a></div></div></div></footer></div>`);
  });
}
export {
  _page as default
};
