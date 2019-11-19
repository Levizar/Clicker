
  

(() => {
   
    let cible = document.getElementById("cookiesNumber")
    document.getElementById("clicker").addEventListener('click', (e)=>{ 
       alert(" + 1 cookie !!!!")
       console.log(event.type)
       cible.innerHTML = 1;

      
       
      

    });

})();