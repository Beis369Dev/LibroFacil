// let Input_File= document.querySelector("#New_photoUser");
// const containerDataUser = $(".conteinerDataUser");
//  const continer_N_Photo=  $(".contenedor");


$(document).on("click","#Add_newPhoto",()=>{
    $("#New_photoUser").click();
})

$(document).on("change","#New_photoUser",(e)=>{
    
    var Obj_Imag= e.target.files[0];
    const supportFiles= ["image/jpeg","image/png","image/gif"]
    createPreviw(Obj_Imag)
})


const createPreviw=(image)=>{
    $('.conteinerDataUser').addClass('notVisible')
    $('.UpData').addClass('active')
    let imgcont= URL.createObjectURL(image)
    const divCon= $('#contenedor');
  const imgElm=document.createElement('img');
  imgElm.className="img_Editd" 
  imgElm.src=imgcont;

divCon.append(imgElm)}

$('.close').on('click',()=>{
    $('.UpData').removeClass('active')
    $('.conteinerDataUser').removeClass('notVisible')
     $(".img_Editd").remove()
})


$('#formPhoto').on('submit',(e)=>{
    e.preventDefault();
    var f = $(this);
    var formData = new FormData(document.getElementById("formPhoto"));
    let data= $('#New_photoUser').files
    formData.append("photo", data);
    
    $.ajax({
        url: "/UploadPhotoUser",
        type: "post",
        dataType: "html",
        data: formData,
        cache: false,
        contentType: false,
 processData: false
    })
    
})