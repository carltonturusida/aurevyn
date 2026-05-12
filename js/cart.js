/* ============ Cart ============ */
const Cart = {
  items: (function(){
    const raw = JSON.parse(localStorage.getItem("aurevyn_cart") || "[]");
    return raw.map(i => i.key ? i : ({ key: i.id + (i.size?`|${i.size}`:""), id: i.id, qty: i.qty, size: i.size||null }));
  })(),
  save(){ localStorage.setItem("aurevyn_cart", JSON.stringify(this.items)); this.render(); this.updateCount(); },
  add(id, qty=1, size=null){
    const key = id + (size?`|${size}`:"");
    const ex = this.items.find(i=>i.key===key);
    if(ex) ex.qty += qty; else this.items.push({key, id, qty, size});
    this.save();
    window.toast && toast(size ? `Added to cart · Size ${size}` : "Added to cart");
    this.bump();
  },
  remove(key){ this.items = this.items.filter(i=>i.key!==key); this.save(); },
  setQty(key, qty){
    const it = this.items.find(i=>i.key===key);
    if(!it) return;
    it.qty = Math.max(1, qty);
    this.save();
  },
  count(){ return this.items.reduce((s,i)=>s+i.qty,0); },
  subtotal(){ return this.items.reduce((s,i)=>{ const p=byId(i.id); return s + (p?p.price*i.qty:0); },0); },
  shipping(){ const sub=this.subtotal(); if(sub===0) return 0; return sub>=1500?0:75; },
  vat(){ return Math.round(this.subtotal()*0.15); },
  total(){ return this.subtotal()+this.shipping()+this.vat(); },
  updateCount(){
    document.querySelectorAll("#cartCount").forEach(el=>{ el.textContent = this.count(); el.style.display = this.count()?"inline-flex":"none"; });
  },
  bump(){
    const el = document.getElementById("cartCount");
    if(!el) return;
    el.classList.remove("pop"); void el.offsetWidth; el.classList.add("pop");
  },
  render(){
    const body = document.getElementById("cartBody");
    const foot = document.getElementById("cartFoot");
    if(!body||!foot) return;
    if(this.items.length===0){
      body.innerHTML = `<div class="cart-empty"><h4>Your cart is empty</h4><p>Add something beautiful to get started.</p><a class="btn btn-primary" href="shop.html">Shop now</a></div>`;
      foot.innerHTML = "";
      return;
    }
    body.innerHTML = this.items.map(i=>{
      const p = byId(i.id); if(!p) return "";
      return `<div class="cart-item">
        <img src="${p.img}" alt="${p.name}"/>
        <div>
          <h5>${p.name}</h5>
          <div class="ci-cat">${p.cat}${i.size?` · Size <b>${i.size}</b>`:""}</div>
          <div class="qty"><button data-q="-" data-key="${i.key}">−</button><span>${i.qty}</span><button data-q="+" data-key="${i.key}">+</button></div>
        </div>
        <div class="ci-side">
          <span class="ci-price">${ZAR(p.price*i.qty)}</span>
          <button class="ci-remove" data-rm="${i.key}">Remove</button>
        </div>
      </div>`;
    }).join("");
    foot.innerHTML = `
      <div class="row"><span>Subtotal</span><span>${ZAR(this.subtotal())}</span></div>
      <div class="row"><span>Shipping</span><span>${this.shipping()===0?"Free":ZAR(this.shipping())}</span></div>
      <div class="row"><span>VAT (15%)</span><span>${ZAR(this.vat())}</span></div>
      <div class="row total"><span>Total</span><span>${ZAR(this.total())}</span></div>
      <a class="btn btn-primary lg" href="checkout.html">Checkout</a>`;

    body.querySelectorAll("[data-q]").forEach(b=>b.onclick=()=>{
      const key=b.dataset.key; const it=this.items.find(i=>i.key===key);
      if(!it) return;
      if(b.dataset.q==="+") this.setQty(key,it.qty+1); else { if(it.qty===1){this.remove(key);} else this.setQty(key,it.qty-1); }
    });
    body.querySelectorAll("[data-rm]").forEach(b=>b.onclick=()=>this.remove(b.dataset.rm));
  }
};
