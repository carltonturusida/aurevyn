(function(){
  const items = document.getElementById("coItems"); if(!items) return;
  function render(){
    if(Cart.items.length===0){
      items.innerHTML = `<div class="muted">Your cart is empty. <a href="shop.html" class="link">Continue shopping →</a></div>`;
    } else {
      items.innerHTML = Cart.items.map(i=>{ const p=byId(i.id); return `<div class="co-item"><img src="${p.img}" alt=""/><div><h5>${p.name}</h5><span>Qty ${i.qty}${i.size?` · Size ${i.size}`:""}</span></div><b>${ZAR(p.price*i.qty)}</b></div>`; }).join("");
    }
    coSub.textContent = ZAR(Cart.subtotal());
    coShip.textContent = Cart.shipping()===0 && Cart.subtotal()>0 ? "Free" : ZAR(Cart.shipping());
    coVat.textContent = ZAR(Cart.vat());
    coTotal.textContent = ZAR(Cart.total());
  }
  render();
  const f = document.getElementById("checkoutForm");
  f.addEventListener("submit", e=>{
    e.preventDefault();
    if(Cart.items.length===0){ toast("Your cart is empty"); return; }
    const required = ["coName","coEmail","coPhone","coAddress","coCity","coPostal"];
    for(const id of required){ if(!document.getElementById(id).value.trim()){ toast("Please complete all fields"); return; } }
    if(!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(coEmail.value)){ toast("Enter a valid email"); return; }
    Cart.items = []; Cart.save();
    document.getElementById("successModal").classList.add("open");
    document.getElementById("overlay").classList.add("open");
    render();
  });
})();
