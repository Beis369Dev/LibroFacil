const containerPag = document.querySelector(".container_pag");
const containerShowBooks = document.querySelector(".library")
const containerExchangeBooks = document.querySelector(".exchanges")
const containerRequest= document.querySelector('.Request_Exchanges')
const containerDataUser = document.querySelector(".DataUser")
let infodata




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



// crea la vista de los libros de usuario ------------------------------------
const buildDataScroll = (bookList) => {
    console.log(bookList)

    bookList.length==0 ? $('.messageBookNotFound').addClass('active').removeClass('invisible'):
    $('.messageBookNotFound').addClass('inactive').removeClass('active');

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


        ContDeletTash= document.createElement('div')
        ContDeletTash.className="ContDelet"
        btnDelete= document.createElement('i')
        btnDelete.className="fas fa-trash"
        btnDelete.title="Eliminar"
        btnDelete.id = book['BookId'];
        ContDeletTash.appendChild(btnDelete)
        


        list.appendChild(itmeList)
        list.appendChild(itmeList2)
        Cont.appendChild(list);
        Cont.appendChild( ContDeletTash);
        containerShowBooks.appendChild(Cont);


    }



}

// muestra mensajes al usuario al borrar un libro .............................
containerShowBooks.addEventListener("click",(e)=>{

    if(e.target.className=="fas fa-trash"){
       
        
        let status;
        fetch(`http://127.0.0.1:8000/deletBook/${e.target.id}/`,{
  method: 'DELETE',})
  .then((response)=>{
    if (response.status== 301){
       
        $('.messageDeleteFalse').addClass('active');
        setTimeout(()=> $('.messageDeleteFalse').removeClass('active'),2000)
    }else{
        e.target.parentNode.parentNode.classList.add("invisible");
        $('.messageDeleteTrue').addClass('active');
        setTimeout(()=> $('.messageDeleteTrue').removeClass('active'),2000)
    }

  })
        
    
}


    
});




// traer los datos del usuario

document.addEventListener("DOMContentLoaded", () => {
    const xhttp = new XMLHttpRequest();
    xhttp.open('GET', 'http://127.0.0.1:8000/get_data_User', true);
    xhttp.send();

    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            let data = this.responseText;
            const Jdata = JSON.parse(data);
            buildDataUser(Jdata);
        }


        else {
            console.log("error");
        }
    }
});

/// crear vista de usuario 

const buildDataUser = (user) => { 

    // for (let item in userData) {
    //     let user = userData[item];

    const Cont = document.querySelector('.conteinerDataUser');
    Cont.id = user['id'];



    /*------------------IMG DEfault o del user----------------------------------------*/
    

    const ImgUser = document.querySelector('.imgUser');
  

        ImgUser.src = `http://127.0.0.1:8000/static/img/${user['imgUsuario']}`;
    
    
    
    

/*--------------------User Name ---------------------------*/

    const title = document.querySelector(".h2");
    title.innerHTML = user['name'] + " " + user['lastName'];
    

    /*----------------------------------------------------------*/
    const email = document.createElement('p');
    email.innerHTML = `<span class= "DataSpan">Correo: </span>${user['email']}`
    Cont.appendChild(email);

    /*----------------------------------------------------------*/
    const phone = document.createElement('p');
    phone.innerHTML = `<span class= "DataSpan"> Telefono: </span>${user['phone']}`
    Cont.appendChild(phone);
    /*----------------------------------------------------------*/
    const address = document.createElement('p');
    address.innerHTML = `<span class= "DataSpan"> Direccion: </span>${user['address']}`
    Cont.appendChild(address);

    /*..................................................*/

    // const btn_edit= document.createElement('a')
    // btn_edit.href=""http://127.0.0.1:8000/FormUpdataUser""
    //  const btn_edit_btn= document.createElement('button')


    containerDataUser.appendChild(Cont);

}


/*-----------trae los -Exchanges----------------------------------*/



document.addEventListener("DOMContentLoaded", () => {
    const xhttp = new XMLHttpRequest();
    xhttp.open('GET', 'http://127.0.0.1:8000/checkNotification/SN_EX', true);
    xhttp.send();

    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) { 
            let data = this.responseText;
            const Jdata = JSON.parse(data);
            infodata = Jdata;
           buildVistaExchanges(Jdata,containerExchangeBooks,'titleRequestEx',"Request");
                
        }
        else {
            console.log("error");
        }
    }
});



/*---------------------------Trae mis solicitudes---------------------------*/

document.addEventListener("DOMContentLoaded", () => {
    const xhttp = new XMLHttpRequest();
    xhttp.open('GET', 'http://127.0.0.1:8000/checkNotification/MY_EX', true);
    xhttp.send();

    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            let data = this.responseText;
            const Jdata = JSON.parse(data);
           
            buildVistaExchanges(Jdata,containerRequest,'titleMyRequest',"myRequest");
                console.log(Jdata)
        }
        else {
            console.log("error");
        }
}})


const buildVistaExchanges = (data,ContDiv,titleClass,modeView) => {

    let titleRequest= document.querySelector(`.${titleClass}`)
    data.length>0 ?
        titleRequest.innerHTML += ` <span class='N_notification'>${data.length} </span>`:
    
    
        titleRequest.innerHTML += ` <span class='N_notification'> 0 </span>`
    
    
    

    data.forEach((element) => {

        const Cont = document.createElement('div');
        Cont.setAttribute('id', element['exchangeId']);
        Cont.className = "conteinerExchanges";


        const ImgBook1 = document.createElement('img');
       
        ImgBook1.src = `http://127.0.0.1:8000/static/${element['bookId1'][9]}`;
        ImgBook1.className = "imgExchange";
        Cont.appendChild(ImgBook1);
        
        if(modeView=="myRequest"){
                
                const iconEx = document.createElement('i')
                const a_Link= document.createElement('a')
                a_Link.href=`http://127.0.0.1:8000//my_request_exchange/${ element['exchangeId']}/`
                iconEx.className = "fas fa-long-arrow-alt-left fa-5x notification";
                a_Link.appendChild(iconEx)
                Cont.appendChild(a_Link);
         }
            
        
         else if( modeView== "Request"){ 
                 const iconEx = document.createElement('i')
                const a_Link= document.createElement('a')
                a_Link.href=`http://127.0.0.1:8000/show_exchange/${ element['exchangeId']}/`
                iconEx.className = "fas fa-long-arrow-alt-left fa-5x notification";
                a_Link.appendChild(iconEx)
                Cont.appendChild(a_Link);
            
            }


        const ImgBook2 = document.createElement('img');
        ImgBook2.src = `http://127.0.0.1:8000/static/${element["bookId2"][9]}`;
        ImgBook2.className = "imgExchange";
        Cont.appendChild(ImgBook2);


        ContDiv.appendChild(Cont)

    });
}



/*-------------------------ShowExchange------------------------------*/

containerExchangeBooks.addEventListener("click", (e) => {
    if (e.target.parentNode.id) {
         let Exchange = e.target.parentNode.id;
        console.log(Exchange);
        

        const xhttp = new XMLHttpRequest();
        xhttp.open('GET', `http://127.0.0.1:8000/show_exchange/${Exchange}/`, true);
        xhttp.send();
    
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                let data = this.responseText;
                const Jdata = JSON.parse(data);
                console.log(Jdata)
                 
            }
            else {
                console.log("error");
            }
        }
        

           
    }
});


/*------------------------------Seleccionar Pestaña------------------------------------------*/

const Sol = document.querySelector('.solicitudes');
const Pet = document.querySelector('.peticiones');
let statusView={
    exchanges: false,
    request: false
    };

Sol.addEventListener('click',()=>{
    ActiveRequestExchange(statusView);
})
    
Pet.addEventListener('click',()=>{
    ActiveExchange(statusView);
})

const ActiveRequestExchange= (statusView)=>{
    $('.Request_Exchanges').removeClass('active')
    statusView['request']=false
    $('.exchanges').addClass('active');
    statusView['exchanges']=true
    $('.peticiones').css('background-color', 'transparent')
    $('.solicitudes').css('background-color', 'rgb(252, 95, 5')
}


const ActiveExchange= (statusView)=>{
    $('.exchanges').removeClass('active')
    statusView['exchanges']=false
    $('.Request_Exchanges').addClass('active');
    statusView['request']=true
    $('.solicitudes').css('background-color', 'transparent');
    $('.peticiones').css('background-color', 'rgb(252, 95, 5')
    
}
ActiveExchange(statusView);