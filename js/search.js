/* ============ Search ============ */
const Search = {
  open(){ document.getElementById("searchBar").classList.add("open"); setTimeout(()=>document.getElementById("searchInput").focus(),200); },
  close(){ document.getElementById("searchBar").classList.remove("open"); document.getElementById("searchResults").innerHTML=""; document.getElementById("searchInput").value=""; },
  query(q){
    const res = document.getElementById("searchResults");
    if(!q.trim()){ res.innerHTML=""; return; }
    const t = q.toLowerCase();
    const list = PRODUCTS.filter(p => p.name.toLowerCase().includes(t) || p.cat.toLowerCase().includes(t)).slice(0,8);
    if(list.length===0){ res.innerHTML = `<div class="muted" style="padding:14px">No results for "${q}"</div>`; return; }
    res.innerHTML = list.map(p=>`<div class="search-result" data-id="${p.id}"><img src="${p.img}" alt=""/><div><h5>${p.name}</h5><span>${p.cat} · ${ZAR(p.price)}</span></div></div>`).join("");
    res.querySelectorAll(".search-result").forEach(el=>el.onclick=()=>{ openQuickView(+el.dataset.id); Search.close(); });
  }
};
