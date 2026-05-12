/* ============ Aurevyn — global app ============ */
(function(){
  // Loader
  window.addEventListener("load",()=>{ setTimeout(()=>document.getElementById("loader")?.classList.add("hidden"), 350); });

  // Toast
  window.toast = function(msg){
    const t = document.getElementById("toast"); if(!t) return;
    t.textContent = msg; t.classList.add("show");
    clearTimeout(window._toastT); window._toastT = setTimeout(()=>t.classList.remove("show"),2200);
  };

  // Header scroll
  const header = document.getElementById("siteHeader");
  const onScroll = ()=>{
    if(window.scrollY>10) header?.classList.add("scrolled"); else header?.classList.remove("scrolled");
    const top = document.getElementById("scrollTop");
    if(window.scrollY>500) top?.classList.add("show"); else top?.classList.remove("show");
  };
  window.addEventListener("scroll", onScroll); onScroll();
  document.getElementById("scrollTop")?.addEventListener("click", ()=>window.scrollTo({top:0,behavior:"smooth"}));

  // Mobile nav
  const burger = document.getElementById("hamburger");
  const nav = document.getElementById("primaryNav");
  burger?.addEventListener("click", ()=>{ burger.classList.toggle("open"); nav.classList.toggle("open"); });

  // Search
  document.getElementById("searchToggle")?.addEventListener("click", Search.open);
  document.getElementById("searchClose")?.addEventListener("click", Search.close);
  document.getElementById("searchInput")?.addEventListener("input", e=>Search.query(e.target.value));

  // Cart drawer
  const drawer = document.getElementById("cartDrawer");
  const overlay = document.getElementById("overlay");
  function openDrawer(){ drawer?.classList.add("open"); overlay?.classList.add("open"); }
  function closeDrawer(){ drawer?.classList.remove("open"); overlay?.classList.remove("open"); }
  document.getElementById("cartToggle")?.addEventListener("click", openDrawer);
  document.getElementById("cartClose")?.addEventListener("click", closeDrawer);
  overlay?.addEventListener("click", ()=>{ closeDrawer(); closeModal(); });

  // Modal
  const modal = document.getElementById("quickModal");
  function openModal(){ modal?.classList.add("open"); overlay?.classList.add("open"); }
  function closeModal(){ modal?.classList.remove("open"); document.getElementById("successModal")?.classList.remove("open"); if(!drawer?.classList.contains("open")) overlay?.classList.remove("open"); }
  document.addEventListener("keydown", e=>{ if(e.key==="Escape"){ closeDrawer(); closeModal(); Search.close(); }});
  window.closeModal = closeModal;

  // Quick view
  window.openQuickView = function(id){
    const p = byId(id); if(!p) return;
    const gallery = p.gallery || [p.img];
    const wished = Wish.has(id);
    const hasSizes = Array.isArray(p.sizes) && p.sizes.length>0;
    const sizeBlock = hasSizes ? `
      <div class="size-select">
        <div class="size-label"><span>Select size</span><a href="#" class="size-guide" onclick="event.preventDefault();window.toast&&toast('Size guide coming soon')">Size guide</a></div>
        <div class="size-options" id="qvSizes">
          ${p.sizes.map((s,i)=>`<button type="button" class="size-opt${i===1?' active':''}" data-size="${s}">${s}</button>`).join("")}
        </div>
      </div>` : "";
    document.getElementById("quickContent").innerHTML = `
      <button class="icon-btn qv-close" onclick="closeModal()">✕</button>
      <div class="qv-grid">
        <div class="qv-img"><img id="qvMain" src="${gallery[0]}" alt="${p.name}"/></div>
        <div class="qv-info">
          ${p.tag?`<span class="tag">${p.tag}</span>`:""}
          <span class="pc-cat">${p.cat}</span>
          <h2 style="font-family:'Fraunces',serif;font-size:1.9rem;margin:0">${p.name}</h2>
          <div class="pc-rating">★ <b>${p.rating}</b> · ${p.reviews} reviews</div>
          <div style="display:flex;gap:10px;align-items:baseline">
            <span class="pc-price" style="font-size:1.6rem">${ZAR(p.price)}</span>
            ${p.old?`<span style="color:var(--muted);text-decoration:line-through">${ZAR(p.old)}</span>`:""}
          </div>
          <p style="color:var(--ink-2)">${p.desc}</p>
          ${sizeBlock}
          ${gallery.length>1?`<div class="qv-thumbs">${gallery.map((g,i)=>`<img data-i="${i}" class="${i===0?'active':''}" src="${g}" alt=""/>`).join("")}</div>`:""}
          <div style="display:flex;gap:10px;margin-top:6px">
            <button class="btn btn-primary" id="qvAdd">Add to cart · ${ZAR(p.price)}</button>
            <button class="btn btn-ghost" id="qvWish">${wished?"♥ Saved":"♡ Save"}</button>
          </div>
          <p class="muted small">Free shipping on orders over R 1 500 · 30-day returns</p>
        </div>
      </div>`;
    openModal();
    document.querySelectorAll(".qv-thumbs img").forEach(t=>t.onclick=()=>{
      document.getElementById("qvMain").src = t.src;
      document.querySelectorAll(".qv-thumbs img").forEach(x=>x.classList.remove("active"));
      t.classList.add("active");
    });
    let selectedSize = hasSizes ? (p.sizes[1] || p.sizes[0]) : null;
    if(hasSizes){
      document.querySelectorAll("#qvSizes .size-opt").forEach(b=>b.onclick=()=>{
        document.querySelectorAll("#qvSizes .size-opt").forEach(x=>x.classList.remove("active"));
        b.classList.add("active"); selectedSize = b.dataset.size;
      });
    }
    document.getElementById("qvAdd").onclick = ()=>{
      if(hasSizes && !selectedSize){ window.toast && toast("Please select a size"); return; }
      Cart.add(p.id, 1, selectedSize); closeModal();
    };
    document.getElementById("qvWish").onclick = ()=>{ Wish.toggle(id); openQuickView(id); renderProductCards(); };
  };

  // Product card
  window.productCardHTML = function(p){
    const wished = Wish.has(p.id);
    const hasSizes = Array.isArray(p.sizes) && p.sizes.length>0;
    return `<article class="product-card" data-id="${p.id}">
      <div class="pc-img">
        ${p.tag?`<span class="pc-tag ${p.tag==='Sale'?'gold':''}">${p.tag}</span>`:""}
        <div class="pc-actions">
          <button class="icon-btn pc-wish ${wished?'is-wished':''}" data-wish="${p.id}" aria-label="Wishlist">${wished?'♥':'♡'}</button>
          <button class="icon-btn" data-qv="${p.id}" aria-label="Quick view">👁</button>
        </div>
        <img src="${p.img}" alt="${p.name}" loading="lazy"/>
        <div class="pc-overlay"></div>
        <div class="pc-quick">${hasSizes?`<button data-qv="${p.id}">Select size</button>`:`<button data-add="${p.id}">Add to cart</button>`}</div>
      </div>
      <div class="pc-info">
        <span class="pc-cat">${p.cat}</span>
        <h3 class="pc-name">${p.name}</h3>
        <div class="pc-row">
          <span class="pc-price">${ZAR(p.price)} ${p.old?`<small style="color:var(--muted);text-decoration:line-through;font-weight:400;font-size:.85rem">${ZAR(p.old)}</small>`:""}</span>
          <span class="pc-rating">★ <b>${p.rating}</b></span>
        </div>
      </div>
    </article>`;
  };

  function bindCards(scope=document){
    scope.querySelectorAll("[data-add]").forEach(b=>b.onclick=e=>{e.stopPropagation();Cart.add(+b.dataset.add);});
    scope.querySelectorAll("[data-wish]").forEach(b=>b.onclick=e=>{e.stopPropagation();Wish.toggle(+b.dataset.wish);renderProductCards();});
    scope.querySelectorAll("[data-qv]").forEach(b=>b.onclick=e=>{e.stopPropagation();openQuickView(+b.dataset.qv);});
    scope.querySelectorAll(".product-card").forEach(c=>c.addEventListener("click",e=>{ if(e.target.closest("button")) return; openQuickView(+c.dataset.id); }));
  }
  window.bindCards = bindCards;

  function renderProductCards(){
    const featured = document.getElementById("featuredGrid");
    if(featured){ featured.innerHTML = PRODUCTS.slice(0,4).map(productCardHTML).join(""); bindCards(featured); }
    const trending = document.getElementById("trendingGrid");
    if(trending){ trending.innerHTML = PRODUCTS.slice(4,12).map(productCardHTML).join(""); bindCards(trending); }
  }
  window.renderProductCards = renderProductCards;
  renderProductCards();

  // Categories
  const catGrid = document.getElementById("catGrid");
  if(catGrid){
    catGrid.innerHTML = CATEGORIES.map(c=>`<a href="shop.html?cat=${encodeURIComponent(c.name)}" class="cat-card"><img src="${c.img}" alt="${c.name}"/><span>${c.name}</span></a>`).join("");
  }

  // Testimonials slider
  const ts = document.getElementById("testimonialSlider");
  if(ts){
    ts.classList.add("testimonial-grid");
    ts.innerHTML = TESTIMONIALS.map(t=>`<div class="testimonial reveal"><blockquote>"${t.q}"</blockquote><cite>— ${t.a}</cite></div>`).join("");
    const dots = document.getElementById("testimonialDots");
    if(dots) dots.style.display = "none";
  }

  // FAQ
  const faq = document.getElementById("faq");
  if(faq){
    faq.innerHTML = FAQS.map((f,i)=>`<div class="faq-item ${i===0?'open':''}"><button class="faq-q"><span>${f.q}</span><span>+</span></button><div class="faq-a"><p>${f.a}</p></div></div>`).join("");
    faq.querySelectorAll(".faq-q").forEach(q=>q.onclick=()=>q.parentElement.classList.toggle("open"));
  }

  // Newsletter
  const nf = document.getElementById("newsletterForm");
  nf?.addEventListener("submit", e=>{
    e.preventDefault();
    const v = document.getElementById("newsEmail").value.trim();
    if(!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(v)){ toast("Please enter a valid email"); return; }
    toast("Welcome to Aurevyn ✓"); nf.reset();
  });

  // Reveal on scroll
  const io = new IntersectionObserver((entries)=>entries.forEach(e=>{ if(e.isIntersecting){ e.target.classList.add("in"); io.unobserve(e.target); }}), {threshold:.12});
  document.querySelectorAll(".reveal").forEach(el=>io.observe(el));
  // also reveal product cards as they appear
  setTimeout(()=>document.querySelectorAll(".product-card,.cat-card").forEach((el,i)=>{ el.style.animation=`fadeUp .7s var(--t) ${i*40}ms both`; }),50);

  // Initial render of counts/cart
  Cart.updateCount(); Wish.updateCount(); Cart.render();
})();
