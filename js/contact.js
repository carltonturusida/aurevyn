(function(){
  const f = document.getElementById("contactForm"); if(!f) return;
  f.addEventListener("submit", e=>{
    e.preventDefault();
    const n=cName.value.trim(), em=cEmail.value.trim(), s=cSubject.value.trim(), m=cMessage.value.trim();
    if(!n||!s||!m){ toast("Please fill all fields"); return; }
    if(!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(em)){ toast("Enter a valid email"); return; }
    toast("Message sent ✓ We'll reply within 24h"); f.reset();
  });
})();
