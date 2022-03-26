const containerShowBooks = document.querySelector(".myselection_container");
const btn_exchange= document.getElementById('request_Exchange');
const get_Id_ExBook= document.querySelector(".infoBook_container");
const message_susses= document.querySelector(".message-susses");
const btn_OK_exchange= document.querySelector("#request_Exchange_OK")

// variables globales libros para intercambio 
var BookUser;// libro que se ofrece 
var bookExchange=get_Id_ExBook.id; // libro de interes 



// captura libro de usuario para realizar el intercambio

 containerShowBooks.addEventListener("click",(e)=>{
    if(e.target.parentNode.id){
       BookUser=e.target.parentNode.id;
      let lastElement= e.target.parentElement;
      
      document.querySelectorAll(".conteinerBookUser").forEach(item=>item.classList.remove('select_book'))
       lastElement.classList.add('select_book');
       
    }});


// boton de solicitar intercambio
 
btn_exchange.addEventListener('click',()=>{
    let Exchange={};
    Exchange['book1']=bookExchange;
    Exchange['book2']=BookUser; 
   
    let JsonExchange= JSON.stringify(Exchange);
    SendJson(JsonExchange)

    message_susses.classList.add("active")
    btn_exchange.classList.add("invisible") //// pendiente arreglar 
    btn_OK_exchange.classList.remove("invisible")


})

// envia Json al server
const SendJson=(data)=>{
    const xhr= new XMLHttpRequest();
    xhr.open('POST', 'http://127.0.0.1:8000/newExchange');
    xhr.setRequestHeader('Content-Type','application/json');
    xhr.send(data);
   
    
    
}  



// trae los libros del usuario 
document.addEventListener("DOMContentLoaded", () => {
    const xhttp = new XMLHttpRequest();
    xhttp.open('GET', 'http://127.0.0.1:8000/booksOfUser', true);
    xhttp.send();

    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            let data = this.responseText;
            const Jdata = JSON.parse(data);
            buildDataScroll(Jdata);
        }


        else {
            console.log("error");
        }
    }
});



// crea la vista de los libros de usuario 
const buildDataScroll = (bookList) => {


    // const title = document.createElement('H5')
    // title.innerHTML = "Ofrecer un Libro";
    // containerShowBooks.appendChild(title)

    for (let item in bookList) {
        let book = bookList[item];

        const Cont = document.createElement('div');
        Cont.className = "conteinerBookUser";
        Cont.id = book['BookId'];
        


        /*----------------------------------------------------------*/
        const ImgBook = document.createElement('img');
        ImgBook.src = `http://127.0.0.1:8000/static/${book['img']}`;


        Cont.appendChild(ImgBook);

        /*----------------------------------------------------------*/

        const title = document.createElement('h3');
        title.innerHTML = book['title'];
        Cont.appendChild(title);


        /*----------------------------------------------------------*/
        const list = document.createElement('ul');

        const itmeList = document.createElement('li');
        const elementList = document.createElement('ul');
        itmeList.innerHTML = "Categoria";
        elementList.innerHTML = book['category'];
        itmeList.appendChild(elementList);

        const itmeList2 = document.createElement('li');
        const elementList2 = document.createElement('ul');
        itmeList2.innerHTML = "Autor";
        elementList2.innerHTML = book['author'];
        itmeList2.appendChild(elementList2);


        list.appendChild(itmeList)
        list.appendChild(itmeList2)
        Cont.appendChild(list);
        containerShowBooks.appendChild(Cont);


    }



}


