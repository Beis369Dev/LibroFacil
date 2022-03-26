const S_authors= document.querySelector('.autores');
const S_category= document.querySelector('.category');
const S_conservation= document.querySelector('.conservation');
const Input_File= document.querySelector('#file');

//----------------------------------------------

document.addEventListener('DOMContentLoaded',getData());

function create_select(Opt_value,text_value,cap){
    const option= document.createElement('option');
    option.value=Opt_value;
    option.text=text_value;
    cap.appendChild(option); 
}

//.........................................................................

function getData(){
    get_author();
    get_category();
    get_conservation();
}


function get_author(){
    const xhttp=new XMLHttpRequest();
    xhttp.open('GET','http://127.0.0.1:8000/all_author',true);
    xhttp.send();

    xhttp.onreadystatechange=function(a){
        if(this.readyState==4 && this.status==200){
            let data= this.responseText;
            data= JSON.parse(data);
            for(let item of data){
                create_select(item.id , item.author,  S_authors)
            }
            
           
        }else{
            console.log("error ")
        }
    }
}

//.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.


function get_category(){
    const xhttp=new XMLHttpRequest();
    xhttp.open('GET','http://127.0.0.1:8000/category',true);
    xhttp.send();

    xhttp.onreadystatechange=function(){
        if(this.readyState==4 && this.status==200){
            let data= this.responseText;
            data= JSON.parse(data);
            for(let item of data){
                create_select(item.id , item.category, S_category)
            }
        }else{
            console.log("error ")
        }
    }
}



function get_conservation(){
    const xhttp=new XMLHttpRequest();
    xhttp.open('GET','http://127.0.0.1:8000/dataStatus',true);
    xhttp.send();

    xhttp.onreadystatechange=function(){
        if(this.readyState==4 && this.status==200){
            let data= this.responseText;
            data= JSON.parse(data);
            for(let item of data){
                create_select(item.id , item.status, S_conservation)
                
            }
        }else{
            console.log("error ")
        }
    }
}


// ------------------------------Pre-view image Book------------------------------

const tagImg=document.querySelector('#imgnewBook');
const containerAddBook= document.querySelector('.add_Img_Book')

Input_File.addEventListener('change',()=>{
    
    let img = Input_File.files[0];
    showImage(img)
})

const showImage=(imgfile)=>{

     let imgUrl=URL.createObjectURL(imgfile)
    let btnfile= document.querySelector('.add_Img_Book label')
    btnfile.classList.add('notVisible');
     tagImg.classList.remove('notVisible')
    tagImg.classList.add('active')
    tagImg.src=imgUrl
    let  tagI= document.createElement('i')
    tagI.className="fas fa-times fa-2x close"
    containerAddBook.append(tagI)
    
// close windoor pre-view book photo 
document.querySelector('.close').addEventListener('click',()=>{
    tagImg.classList.remove('active')
    tagImg.classList.add('notVisible')
    btnfile.classList.remove('notVisible')
    tagI.remove()
    
  
    
})
    

}


