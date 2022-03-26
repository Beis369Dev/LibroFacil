from datetime import datetime
from flask import Flask, render_template,jsonify,session
from flask import request
from flask_socketio import SocketIO,emit
from flask.helpers import url_for
from werkzeug.utils import redirect,secure_filename
import os
from flask import flash 






import controller_Query as DB

app= Flask(__name__)
app.config['UPLOAD_FOLDER'] = './static/imagenes'
app.config['UPLOAD_PHOTO_USER'] = './static/img/User_Photo'
app.config['SECRET_KEY'] = 'secret!'
socketio = SocketIO(app)



app.secret_key="Libro_facil/2021"



@app.route("/")
def home():
        if 'user' in session:
               data= DB.checkRequestExchangeBook(session['userId'],'SN_EX')
               N_Ex= len(data)
               if N_Ex ==0:
                       N_Ex=""
               return render_template('home.html',message=N_Ex,status_off="invisible")
        else:
                return render_template('home.html',status="invisible")



@app.route('/getBooks', methods=['GET'])
def getBooksHome():
        if 'user' in session:
                data= DB.showBooks(session['userId'])
                Jdata=jsonify(data)
                return Jdata
        else:
               data= DB.showBooksNotUser()
               Jdata=jsonify(data)
               return Jdata



        
#------------------------------------------------------------------------Query of  Books------------------------------------------------------
@app.route("/search_book", methods=['POST'])
def get_all_books_title():
        if request.method=='POST':
                title=request.form["Book_title"].upper()
                
                values= DB. get_books_title(title)
                valuesJson=jsonify(values)
                print(values)
                return render_template('results_books.html',data= values,status_off="invisible") 


@app.route("/status/<STATUS>", methods=['GET'])
def get_books_status(STATUS):
        STATUS=STATUS.upper()
        values= DB.get_all_books_conservation_status(STATUS)
        return jsonify(values) 

@app.route("/dataStatus", methods=['GET'])
def get_all_status():
        values= DB.get_All_status()
        return jsonify(values) 


@app.route("/category/<category>", methods=['GET'])
def getBooksCategory(category):
        category=category.upper()
        values=DB.get_all_books_category_DB(category)
        return jsonify(values)

@app.route("/category", methods=['GET'])
def getAllCategory():
        values=DB.get_Allcategory_books()
        return jsonify(values)

@app.route("/author/<author>", methods=['GET'])
def getBooksAuthor(author):
        author=author.upper()
        values=DB.get_all_books_author_DB(author)
        return jsonify(values)


@app.route("/all_author", methods=['GET'])
def getAuthor():
        values=DB.get_Allauthor()
        return jsonify(values)



@app.route("/booksOfUser", methods=['GET'])
def getBookOfUser():

        if 'user'in session:
                email=session['user']
                values=DB.get_alldata_book_user(email)
                return jsonify(values)



#.........................Delete Book.................................................................

@app.route("/deletBook/<id>/", methods=['DELETE'])
def deleteBookUser(id):
        # if 'user' in session:
                if DB.DeletBooksId(id) =="exito":
                # flash(success_message)
                        data="libro borrado"
                        return render_template('user_panel.html', status_off="invisible" )
                else:
                       
                        return " error", 301 

#--------------------------------------------------------------SAVE DATA OF BOOKS--------------------------------------------------


@app.route("/save_book", methods=['POST'])
def add_new_book():

       if 'user'in session: 
                #data= request.get_json()
                D_user=DB.get_data_User(session['user'])
                title=request.form['title'].upper()
                author=request.form['author']
                category=request.form['category']
                conservation=request.form['conservation']
                f = request.files['imagen']
                filename = secure_filename(f.filename)
                f.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))
                img= "imagenes/"+filename
                isbn=request.form['isbn']
                user=D_user['id']
                date=datetime.now()
                DB.Save_book(title,img,isbn,category,conservation,author,user,date)
                conservation=0
                return redirect(url_for("showInfoUser"))



@app.route("/addNewBook",methods=['GET']) 
def templateAddBook():
        if 'user' in session:


                return render_template("addBook.html",status_off="invisible")

        else: 
                return render_template("login_form.html")


@app.route("/new_cat" , methods=['POST'])
def new_cat():
        values= request.get_json()
        nameCat= values["category"].upper()
        DB.Insert_Cat(nameCat)
        return"save category"

@app.route("/save_state", methods=['POST'])
def save_stete():
        value=request.get_json()
        state=value['status'].upper()
        DB.Insert_Status(state)
        return "save state "

@app.route("/save_authors", methods=["POST"])
def Insert_author():
        Values= request.get_json()
        name= Values["name"].upper()
        lastName= Values["lastName"].upper()
        DB.Insert_author(name, lastName )

        return"Author Save"
#..................................................USER.................................................................
@app.route("/get_data_User", methods=["GET"])
def Data_User():
        if 'user' in session:
                email=session['user']
                data=DB.get_data_User(email)
                Jdata=jsonify(data) 

        return Jdata
#-----------------------------------------------Up Data User-------------------------------------------------------------------

@app.route("/FormUpdataUser", methods=["Get"])
def UpDataUserform():
        if 'user' in session:
                email=session['user']
                data=DB.get_data_User(email)
                

        return render_template("UpDataUser.html",SendData=data,status_off="invisible") 

@app.route("/UpDataUser", methods=["POST"])
def UpDataUser():
        if 'user' in session and request.method=='POST':
                idUser=session['userId']
                data=request.get_json()
                username=data["Name"].upper()
                lastname=data["lastName"].upper()
                phone=data['phone']
                address=data['address']                
                password=data['password']
                print(idUser)
                data=DB.UpDataUser(username,lastname,phone,address,password,idUser)

               
        return render_template("user_panel.html")


@app.route("/UploadPhotoUser",methods=['POST'])
def UpLoadPhoto():
        if 'user' in session and request.method == 'POST':
                userFile= request.files['photo']
                filename = session['user']+secure_filename(userFile.filename)
                userFile.save(os.path.join(app.config['UPLOAD_PHOTO_USER'], filename))
                img= "User_Photo/"+ filename
                DB.UpLoadPhoto(img,session['userId'])
                return redirect(url_for("showInfoUser"))
#----------------------------------------------------------Create  User---------------------------------------------------------------

@app.route("/createUser", methods=['GET'])
def CreateUser():
        return render_template('NewUser.html', status="invisible")

@app.route("/save_user", methods=["POST"])
def save_user():
        data=request.get_json()
        username=data["Name"].upper()
        lastname=data["lastName"].upper()
        email=data["email"]
        password=data["password"]
        phone= data["phone"]
        #imgUsuario=data["img"]
        #role_user=data["rol"]
        imgUsuario="User_Photo/defaul_profile_photo.jpg"
        role_user="user"
        address='default'
        dataDB=DB.checkEmail(email)
        if dataDB != "true":
                return"error- el ususario ya existe"
        
        else:
                DB.create_user(username,lastname,email,phone,address,password,imgUsuario,role_user)
                return render_template('message_The_newUser.html',status="invisible")




#--------------------------------user dashbord....................
@app.route("/user", methods=['GET'])
def showInfoUser():
        if 'user' in session:
                return render_template('user_panel.html', status_off="invisible" )
        else:
               return render_template("login_form.html")       



#.....................................Validation Email......................................................
@app.route('/validationEmail/<email>/', methods=['GET'])
def validation(email):
       value= DB.checkEmail(email)
       return value





#----------------------------Login de Usuario---------------------------------------------------------------------

@app.route("/login")
def showLogin():
        return render_template("login_form.html",status="invisible",status_off="invisible")


@app.route('/send_login', methods=['POST'])
def login():
    if request.method=='POST':
        email=request.form['email']
        password=request.form['password']
        data=DB.get_data_User(email)
        
        if data!= False and  data['password'] == password:
                session['user']=email
                session['rol']=data['rolUser']
                session['userId']=data['id'] 
                #chequer notificaciones 
                return redirect(url_for("home"))
         
        elif data !=False and  data["password"]!=password:
                E="active"
                
                return render_template("login_form.html",error_password=E )
        else: 
                E="active"
                return render_template("login_form.html",error_email_not_find=E )

      

@app.route("/loginout")
def loginout():
        session.clear()
        return redirect(url_for("home"))



#-----------------------------------------Book exchange ----------------------------------------

@app.route("/newExchange", methods=['POST'])
def NewExchange():
        data=request.get_json()
        book1=data['book1']
        book2=data['book2']
        date= datetime.now()
        D=DB.CheckEx(book1, book2)
        if D == True:
                DB.new_exchangeDB(book1,book2,date,"false")

        else:
                print("false")
        # success_message= "invisible"
        # flash(success_message)


     
        return "200"

#...................................Verificar Exchanges.....................

@app.route("/checkNotification/<mode>", methods=['GET'])
def checkNotification(mode):

        if 'user'in session:
                Data_Info= DB.checkRequestExchangeBook(session['userId'],mode)
                
                JsonData_Info=jsonify(Data_Info)
                return JsonData_Info
               
    #......................Confirmar Exchange.....................................            
@app.route("/exchangeConfirm/<exchangeId>/<book1>/<user1>/<book2>/<user2>",methods=['POST'])
def exchangeConfirm(exchangeId,book1,user1,book2,user2):
        #set the status of the book 
        DB.confirmExchangeBook(exchangeId)
        # change the owner of the book  
        DB.upDateUserBook(book1,user2)
        DB.upDateUserBook(book2,user1)
        # proporcionar datos de usuario
        return "ok"

#.........................Rechazar Exchange................................
@app.route("/toRefuse/<exchangeId>/",methods=['POST'])
def toRefuseConfirm(exchangeId):
        DB. toRefuseExchangeBook(exchangeId)
        
        return  { "data": "Usuario creado correctamente" }



@app.route("/show_book_exchange/<id>/", methods=['GET'])
def showBook(id):
        if 'user' in session:
                book=DB.get_all_books_id_DB(id)
        # sendBook=jsonify(book)
                return render_template("exchange.html",Book=book)
        else:
               return redirect(url_for("showLogin"))         

#..................... Show my request Exchange .......................................

@app.route("/my_request_exchange/<id>/", methods=['GET'])
def showMyRequestExchange(id):
        book=DB.Get_ExchangeBook(id)
        # sendExchange=jsonify(book) 
        
        
        return render_template('my_request_Ex.html',data=book,status_off="invisible")



        
#..................................... Show Exchanges............................
@app.route("/show_exchange/<id>/", methods=['GET'])
def showExchange(id):
        book=DB.Get_ExchangeBook(id)
        # sendExchange=jsonify(book) 
        
      
        return render_template('showExchange.html',data=book,status_off="invisible")



#............................DELETE EXCHANGE...................................

@app.route("/deleteExchange/<id>/", methods=['DELETE'])
def DeleteExchange(id):
        if 'user' in session:
                DB.Delete_Exchange_Id(id)
        return "Ok",201


#............................. Chat......................................

@app.route("/chat")
def chat():
        return render_template("chat.html",status_off="invisible")

def messageReceived(methods=['GET', 'POST']):
    print('message was received!!!')


@socketio.on('my event')
def handle_my_custom_event(json, methods=['GET', 'POST']):
#     print('received my event: ' + str(json))
        print(request.sid)
        
        socketio.emit('my response', json,  )
       


if __name__=="__main__":
         socketio.run(app , debug=True, port=8000 )
        # app.run(debug=True , port=8000)