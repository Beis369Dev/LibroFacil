// ............................................Delete request Exchange .....................

$('#Btn_delete_Exchange').click(()=>{
    let idEx=$('#Btn_delete_Exchange').val()
    fetch(`http://127.0.0.1:8000/deleteExchange/${idEx}/ `,{method:'delete'})
    .then(response=>{
        if(response.status==201){
        
         $('.Message_Delete_Exchange').addClass('active')
        setTimeout(()=> $('.Message_Delete_Exchange').removeClass('active'),2000)
        setTimeout(()=>window.location.href = "http://127.0.0.1:8000/user",2000)
          
            
        }
    })
})