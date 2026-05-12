/* ============ Wishlist ============ */
const Wish = {
  items: JSON.parse(localStorage.getItem("aurevyn_wish") || "[]"),
  save(){ localStorage.setItem("aurevyn_wish", JSON.stringify(this.items)); this.updateCount(); document.dispatchEvent(new Event("wish:update")); },
  toggle(id){
    if(this.items.includes(id)){ this.items = this.items.filter(i=>i!==id); window.toast&&toast("Removed from wishlist"); }
    else { this.items.push(id); window.toast&&toast("Saved to wishlist"); }
    this.save();
  },
  has(id){ return this.items.includes(id); },
  updateCount(){
    document.querySelectorAll("#wishCount").forEach(el=>{ el.textContent = this.items.length; el.style.display = this.items.length?"inline-flex":"none"; });
  }
};
