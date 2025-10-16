import { h as head, d as attr_class, c as ensure_array_like, a as attr, s as stringify } from './index2-Bat9PaVJ.js';
import 'clsx';
import { X as escape_html } from './context-_3h2dng2.js';

function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let projectDescription = "";
    let industry = "";
    let budget = "";
    const industries = [
      "Fintech",
      "HealthTech",
      "E-commerce",
      "SaaS",
      "AI/ML",
      "Blockchain",
      "EdTech",
      "PropTech",
      "Marketplace",
      "Social",
      "Gaming",
      "IoT"
    ];
    const budgetRanges = [
      "< $50K",
      "$50K - $100K",
      "$100K - $250K",
      "$250K - $500K",
      "$500K - $1M",
      "> $1M"
    ];
    head($$renderer2, ($$renderer3) => {
      $$renderer3.title(($$renderer4) => {
        $$renderer4.push(`<title>CTOrendang Product - AI Analysis &amp; CTO Marketplace</title>`);
      });
      $$renderer3.push(`<meta name="description" content="Get instant AI technical analysis and connect with expert CTOs. Try our AI-powered platform for free."/>`);
    });
    $$renderer2.push(`<div class="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900"><header class="bg-slate-950/50 backdrop-blur-sm border-b border-white/10 sticky top-0 z-50"><div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4"><div class="flex items-center justify-between"><a href="/" class="text-2xl font-bold text-white">CTOrendang</a> <nav class="flex items-center space-x-6"><a href="/" class="text-gray-300 hover:text-white transition-colors">Home</a> <a href="/pitch" class="text-gray-300 hover:text-white transition-colors">Pitch Deck</a> <a href="/contact" class="text-gray-300 hover:text-white transition-colors">Contact</a> <a href="/#waitlist" class="px-6 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg font-semibold hover:from-purple-700 hover:to-pink-700 transition-all">Join Waitlist</a></nav></div></div></header> <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12"><div class="flex space-x-4 mb-8"><button${attr_class(`px-6 py-3 rounded-lg font-semibold transition-all ${stringify(
      "bg-gradient-to-r from-purple-600 to-pink-600 text-white"
    )}`)}>🤖 AI Analysis</button> <button${attr_class(`px-6 py-3 rounded-lg font-semibold transition-all ${stringify("bg-white/5 text-gray-400 hover:bg-white/10")}`)}>👨‍💼 CTO Marketplace</button></div> `);
    {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<div class="grid lg:grid-cols-2 gap-8"><div class="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10"><h2 class="text-3xl font-bold text-white mb-6">Get AI Technical Analysis</h2> <p class="text-gray-400 mb-6">Describe your project and get instant technical assessment, tech stack recommendations,
						and matched CTOs.</p> <form class="space-y-6"><div><label for="project-description" class="block text-white font-semibold mb-2">Project Description *</label> <textarea id="project-description" required rows="6" placeholder="Describe your project idea, goals, and technical requirements..." class="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500">`);
      const $$body = escape_html(projectDescription);
      if ($$body) {
        $$renderer2.push(`${$$body}`);
      }
      $$renderer2.push(`</textarea></div> <div><label for="industry-select" class="block text-white font-semibold mb-2">Industry *</label> `);
      $$renderer2.select(
        {
          id: "industry-select",
          value: industry,
          required: true,
          class: "w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
        },
        ($$renderer3) => {
          $$renderer3.option({ value: "" }, ($$renderer4) => {
            $$renderer4.push(`Select industry...`);
          });
          $$renderer3.push(`<!--[-->`);
          const each_array = ensure_array_like(industries);
          for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
            let ind = each_array[$$index];
            $$renderer3.option({ value: ind }, ($$renderer4) => {
              $$renderer4.push(`${escape_html(ind)}`);
            });
          }
          $$renderer3.push(`<!--]-->`);
        }
      );
      $$renderer2.push(`</div> <div><label for="budget-select" class="block text-white font-semibold mb-2">Budget Range *</label> `);
      $$renderer2.select(
        {
          id: "budget-select",
          value: budget,
          required: true,
          class: "w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
        },
        ($$renderer3) => {
          $$renderer3.option({ value: "" }, ($$renderer4) => {
            $$renderer4.push(`Select budget...`);
          });
          $$renderer3.push(`<!--[-->`);
          const each_array_1 = ensure_array_like(budgetRanges);
          for (let $$index_1 = 0, $$length = each_array_1.length; $$index_1 < $$length; $$index_1++) {
            let range = each_array_1[$$index_1];
            $$renderer3.option({ value: range }, ($$renderer4) => {
              $$renderer4.push(`${escape_html(range)}`);
            });
          }
          $$renderer3.push(`<!--]-->`);
        }
      );
      $$renderer2.push(`</div> <button type="submit"${attr("disabled", !projectDescription, true)} class="w-full px-6 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg font-bold text-lg hover:from-purple-700 hover:to-pink-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg">${escape_html("Get Free Analysis")}</button></form></div> <div>`);
      {
        $$renderer2.push("<!--[!-->");
        {
          $$renderer2.push("<!--[!-->");
          $$renderer2.push(`<div class="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 flex flex-col items-center justify-center min-h-[500px]"><div class="text-6xl mb-4">🤖</div> <h3 class="text-2xl font-bold text-white mb-2">Ready to Analyze</h3> <p class="text-gray-400 text-center max-w-md">Fill in your project details on the left to get instant AI technical analysis and CTO
								recommendations.</p></div>`);
        }
        $$renderer2.push(`<!--]-->`);
      }
      $$renderer2.push(`<!--]--></div></div>`);
    }
    $$renderer2.push(`<!--]--></div> `);
    {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--></div>`);
  });
}

export { _page as default };
//# sourceMappingURL=_page.svelte-S_EWezo6.js.map
