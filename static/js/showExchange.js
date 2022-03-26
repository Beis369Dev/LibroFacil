
const Btn_accept_Exchange= document.querySelector("#Btn_accept_Exchange");
const Btn_negative_Exchange= document.querySelector("#Btn_negative_Exchange");
const book1=document.querySelector(".BontBook1");
const book2=document.querySelector(".BontBook2");

const Btn_chat= document.querySelector(".btn_chat");
let status_Button = false;
 


// --------------------------- to Accept Exchange ...............................................................
Btn_accept_Exchange.addEventListener('click',()=> {
    console.log()
    if (status_Button== false ){
    const xhttp = new XMLHttpRequest();
        xhttp.open('POST', `http://127.0.0.1:8000/exchangeConfirm/${Btn_accept_Exchange.value}/${book1.dataset.idbook1}/${book1.dataset.useridbook1}/${book2.dataset.idbook2}/${book2.dataset.useridbook2}`);
        xhttp.send();
    
        let message_Exchange_accept= document.querySelector(".Message_1");
    message_Exchange_accept.classList.add("active");
    Btn_accept_Exchange.classList.add("invisible")
    Btn_negative_Exchange.classList.add("invisible")
    Btn_chat.classList.add("active");
    status_Button=true;
    

    }
    
})



//............................ Negative Exchange................................ 
Btn_negative_Exchange.addEventListener('click',()=> {
    if (status_Button == false )
    // const xhttp = new XMLHttpRequest();
    //         xhttp.open('POST', `http://127.0.0.1:8000/toRefuse/${Btn_negative_Exchange.value}/`);
    //         xhttp.send();

    //         if(xhttp.status=="200"){
    //             console.log("perfecto")
    //         }
    //         else{
    //             console.log(" la puta madre")
    //         }
    {
    let message_Exchange_negative= document.querySelector(".Message_2");
    message_Exchange_negative.classList.add("active");
    Btn_accept_Exchange.classList.add("invisible")
    Btn_negative_Exchange.classList.add("invisible")
    status_Button=true;
    setTimeout(()=>window.location.href = "http://127.0.0.1:8000/user",1500)
}
})


