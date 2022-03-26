
document.addEventListener('DOMContentLoaded',get_books());
const Container= document.querySelector('.container');


// Container.addEventListener("click",(e)=>{
//     if(e.target.nodeName=='IMG'){
//         let select= e.target.id;}
//         let = resultado= Jdata.find(item=>item.bookId==select);
//         console.log(resultado);});
 
 
function get_books(){
    const xhttp=new XMLHttpRequest();
    xhttp.open('GET','http://127.0.0.1:8000/getBooks',true);
    xhttp.send();

    xhttp.onreadystatechange=function(){
        if(this.readyState==4 && this.status==200){
            let data= this.responseText;
           const Jdata= JSON.parse(data);
            

           showBooks(Jdata);

           Container.addEventListener("click",(e)=>{
            if(e.target.nodeName=='IMG'){
                const select= e.target.id;
                 const resultado= Jdata.find(item=>item.bookId==select);
                console.log(resultado);}});
          return Jdata 
          
          
        }
        else{
            console.log("error");
        }
    }

}



function showBooks(data){

   for(let book in data){
       let Obj=data[book];
       

       const card= document.createElement('div');
        card.classList.add('card');

       const imgBook= document.createElement('img');
       imgBook.setAttribute("id", Obj['bookId']);
       imgBook.src= `static/${Obj['img']}`;
       imgBook.classList.add("imgBook");

        const conTitle= document.createElement('div');
        conTitle.className="contTilte"
    //    conTitle.classList.add('title')
    //    const P=document.createElement('p');
    //    P.innerHTML=Obj['title'];
       const btn= document.createElement('a')
       btn.className="btn"
       btn.href=`/show_book_exchange/${Obj['bookId']}`;
       btn.innerHTML ="intercambiar"

       conTitle.appendChild(btn)
    //    conTitle.appendChild(P);
        card.appendChild(imgBook);
       card.appendChild(conTitle);
        Container.appendChild(card);
        
   }

}


    





