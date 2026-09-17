const tools = [
  {name:"ChatGPT", category:"Writing", icon:"✦", desc:"General-purpose AI for writing, brainstorming, analysis, coding and conversation.", badge:"Popular", url:"https://chatgpt.com"},
  {name:"Claude", category:"Writing", icon:"◈", desc:"An AI assistant designed for writing, analysis, reasoning and long-form work.", badge:"Featured", url:"https://claude.ai"},
  {name:"Perplexity", category:"Research", icon:"⌕", desc:"AI-powered search and research with web-backed answers and source discovery.", badge:"Popular", url:"https://www.perplexity.ai"},
  {name:"Midjourney", category:"Design", icon:"✺", desc:"Create distinctive images and visual concepts from natural-language prompts.", badge:"Featured", url:"https://www.midjourney.com"},
  {name:"Canva", category:"Design", icon:"◉", desc:"Design presentations, graphics and social content with AI-assisted creation.", badge:"Popular", url:"https://www.canva.com"},
  {name:"Cursor", category:"Coding", icon:"⌘", desc:"AI-first code editor with intelligent completion, editing and agent workflows.", badge:"Featured", url:"https://www.cursor.com"},
  {name:"GitHub Copilot", category:"Coding", icon:"◒", desc:"AI coding companion for suggestions, explanations and development workflows.", badge:"Popular", url:"https://github.com/features/copilot"},
  {name:"Runway", category:"Video", icon:"▶", desc:"Generative AI tools for creating and editing video and visual effects.", badge:"Featured", url:"https://runwayml.com"},
  {name:"ElevenLabs", category:"Audio", icon:"◌", desc:"AI voice generation and speech tools for creators, developers and teams.", badge:"Popular", url:"https://elevenlabs.io"},
  {name:"Notion AI", category:"Productivity", icon:"N", desc:"AI assistance for notes, docs, summaries and knowledge-work workflows.", badge:"", url:"https://www.notion.com/product/ai"},
  {name:"Gamma", category:"Productivity", icon:"G", desc:"Generate polished presentations and visual documents from simple prompts.", badge:"", url:"https://gamma.app"},
  {name:"Descript", category:"Video", icon:"D", desc:"Edit video and audio by editing text, with AI-powered media workflows.", badge:"", url:"https://www.descript.com"}
];

const categories = ["All", ...new Set(tools.map(t => t.category))];
let activeCategory = "All";
let query = "";

const grid = document.getElementById("toolGrid");
const filterBar = document.getElementById("filterBar");
const searchInput = document.getElementById("searchInput");
const sortSelect = document.getElementById("sortSelect");
const count = document.getElementById("resultCount");
const empty = document.getElementById("emptyState");

function renderFilters() {
  filterBar.innerHTML = categories.map(c =>
    `<button class="${c === activeCategory ? "active" : ""}" data-filter="${c}">${c}</button>`
  ).join("");
  filterBar.querySelectorAll("button").forEach(btn => {
    btn.addEventListener("click", () => {
      activeCategory = btn.dataset.filter;
      renderFilters();
      render();
    });
  });
}

function render() {
  let list = tools.filter(t => {
    const matchesCategory = activeCategory === "All" || t.category === activeCategory;
    const haystack = `${t.name} ${t.category} ${t.desc}`.toLowerCase();
    return matchesCategory && haystack.includes(query.toLowerCase());
  });

  if (sortSelect.value === "az") list.sort((a,b) => a.name.localeCompare(b.name));

  count.textContent = `${list.length} tool${list.length === 1 ? "" : "s"}`;
  empty.hidden = list.length !== 0;

  grid.innerHTML = list.map(t => `
    <article class="card">
      <div class="card-top">
        <div class="tool-icon">${t.icon}</div>
        ${t.badge ? `<span class="badge">${t.badge}</span>` : ""}
      </div>
      <h3>${t.name}</h3>
      <p>${t.desc}</p>
      <div class="card-bottom">
        <span class="category">${t.category}</span>
        <a class="visit" href="${t.url}" target="_blank" rel="noopener noreferrer">Visit ↗</a>
      </div>
    </article>
  `).join("");
}

function clearFilters() {
  query = "";
  activeCategory = "All";
  searchInput.value = "";
  renderFilters();
  render();
}

searchInput.addEventListener("input", e => {
  query = e.target.value.trim();
  render();
});

sortSelect.addEventListener("change", render);

document.querySelectorAll(".quick-links button").forEach(btn => {
  btn.addEventListener("click", () => {
    activeCategory = btn.dataset.category;
    renderFilters();
    render();
    document.querySelector("#tools").scrollIntoView({behavior:"smooth"});
  });
});

document.addEventListener("keydown", e => {
  if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
    e.preventDefault();
    searchInput.focus();
  }
});

renderFilters();
render();
