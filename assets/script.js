
  

(() => {
   
    let cible = document.getElementById("cookiesNumber")
    document.getElementById("clicker").addEventListener('click', (e)=>{ 
       alert(" + 1 cookie !!!!")
       console.log(event.type)
       const testi = cible.innerHTML = e.currentTarget.id

       console.log(testi)
       
      console.log(String.fromCharCode(74,101,32, 116, 39,97,105,109,101,32,71,97,98,121), ":D")

    });

})();