(function(){
  const grid = document.getElementById("wishGrid"); 
  if(!grid) return;
  
  function render(){
    if(typeof PRODUCTS === "undefined") return;
    const list = PRODUCTS.filter(p=>Wish.has(p.id));
    document.getElementById("wishEmpty").style.display = list.length?"none":"block";
    grid.innerHTML = list.map(productCardHTML).join("");
    bindCards(grid);
  }
  
  document.addEventListener("wish:update", render);
  
  // Ensure PRODUCTS is loaded before initial render
  if(document.readyState === "loading"){
    document.addEventListener("DOMContentLoaded", render);
  } else {
    render();
  }
})();
