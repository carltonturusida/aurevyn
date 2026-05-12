/* ============ Shop page ============ */
(function(){
  const grid = document.getElementById("shopGrid"); if(!grid) return;
  const params = new URLSearchParams(location.search);
  let state = { cat: params.get("cat") || "All", price: 30000, sort: "featured" };

  const cats = ["All", ...CATEGORIES.map(c=>c.name)];
  const filterEl = document.getElementById("catFilter");
  function counts(name){ return name==="All"?PRODUCTS.length:PRODUCTS.filter(p=>p.cat===name).length; }
  filterEl.innerHTML = cats.map(c=>`<li data-cat="${c}" class="${state.cat===c?'active':''}">${c}<span class="count">${counts(c)}</span></li>`).join("");
  filterEl.querySelectorAll("li").forEach(li=>li.onclick=()=>{ state.cat=li.dataset.cat; filterEl.querySelectorAll("li").forEach(x=>x.classList.toggle("active",x===li)); render(); });

  const range = document.getElementById("priceRange");
  const priceVal = document.getElementById("priceVal");
  range.oninput = ()=>{ state.price=+range.value; priceVal.textContent=ZAR(state.price); render(); };

  document.getElementById("sortSelect").onchange = e=>{ state.sort=e.target.value; render(); };
  document.getElementById("resetFilters").onclick = ()=>{ state={cat:"All",price:30000,sort:"featured"}; range.value=30000; priceVal.textContent=ZAR(30000); document.getElementById("sortSelect").value="featured"; filterEl.querySelectorAll("li").forEach(x=>x.classList.toggle("active",x.dataset.cat==="All")); render(); };

  function render(){
    let list = PRODUCTS.filter(p=> (state.cat==="All"||p.cat===state.cat) && p.price<=state.price);
    if(state.sort==="low") list.sort((a,b)=>a.price-b.price);
    else if(state.sort==="high") list.sort((a,b)=>b.price-a.price);
    else if(state.sort==="rating") list.sort((a,b)=>b.rating-a.rating);
    else if(state.sort==="new") list.sort((a,b)=>b.id-a.id);
    document.getElementById("resultsCount").textContent = `${list.length} product${list.length===1?'':'s'}`;
    grid.innerHTML = list.length ? list.map(productCardHTML).join("") : `<div class="empty-state" style="grid-column:1/-1"><h3>No products match</h3><p>Try resetting filters.</p></div>`;
    bindCards(grid);
    grid.querySelectorAll(".product-card").forEach((el,i)=>{ el.style.animation=`fadeUp .6s var(--t) ${i*40}ms both`; });
  }
  render();
})();
