#import sqlite3
#from sqlite3 import Error


##def Conexion():
 #   try:
  #    conexion= sqlite3.connect('LibroFacil.db')
   #     conexion.execute('PRAGMA foreing_Keys=ON')
    #    print('Conexion Exitosa')
     #   return conexion
    #except Error:
     #   print (Error)
#--------------------------------MySQL------------------------------------------
from flask.json import jsonify
from flask.sessions import NullSession
import pymysql
import json




def Conexion():
    DB= pymysql.connect(host='localhost',user='root',passwd='',database='librofacil')
    return DB

#app.secret_key='mysecretkey'




#----------------------------------Insert new categories, author and status  ------------------------------------------------------ 

def Insert_Cat(nameCat):
    db = Conexion()
    curs=db.cursor()
    query=f"""INSERT into BooksCategory (nombrecategoria)
     VALUES ('{nameCat}') """
    curs.execute(query)
    db.commit()
    db.close()
    return"exito"


def Insert_author(name, lastname ):
    db = Conexion()
    curs=db.cursor()
    query= f"""INSERT into Author (nombre,apellido) VALUES ('{name}','{lastname}') """
    curs.execute(query)
    db.commit()
    db.close()
    return"save author "


def Insert_Status(state ):
    db = Conexion()
    curs=db.cursor()
    query= f"""INSERT into state_of_conservation (estado) VALUES ('{state}') """
    curs.execute(query)
    db.commit()
    db.close()
    return"save"





#----------------------------------------------------------------CREATE  USER---------------------------------------------------------------

def create_user(username,lastname,email,phone,address,password,imgUsuario,role_user):
    db = Conexion()
    curs=db.cursor()
    query= f"""INSERT into users (username,lastname,email,phone,Address,password,imgUsuario,role_user) VALUES
('{username}','{lastname}','{email}','{phone}','{address}','{password}','{imgUsuario}','{role_user}'); """
    curs.execute(query)
    db.commit()
    db.close()
    return"exito"




def checkEmail(email):
    db=Conexion()
    curs=db.cursor()
    query=f"SELECT Count(*) FROM `users` WHERE email= '{email}';"
    curs.execute(query)
    data=curs.fetchone()
    
    if data[0] == 0:
        return "true"

    else:
        return "false"



#-----------------------------get data by user id ...................................................
def get_data_User(email):
    db = Conexion()
    curs=db.cursor()
    query= f""" Select * FROM users  WHERE email= '{email}' """
    curs.execute(query)
    User =curs.fetchall()
    db.close()
    content={}
    if User == ():
        return False

    else:    

        for dato in User:
         content= {"id":dato[0],"name":dato[1],"lastName":dato[2],
         "email":dato[3], "phone":dato[4],"address":dato[5],"password":dato[6],
         "imgUsuario":dato[7], "rolUser":dato[8]
       }
    
        
    return content

#----------------------------------Up Data User----------------------------------------------

def UpDataUser(username,lastname,phone,address,password,idUser):
    db = Conexion()
    curs=db.cursor()
    query= f"""UPDATE `users` SET `userName`='{username}',
    `lastName`='{lastname}',`phone`='{phone}',`Address`='{address}',`Password`='{password}' WHERE Id= {idUser} """
    curs.execute(query)
    db.commit()
    return "ok200"



def UpLoadPhoto(file,userId):
    db = Conexion()
    curs=db.cursor()
    query= f""" UPDATE `users` SET ImgUsuario='{file}' WHERE Id='{userId}' ; """
    curs.execute(query)
    db.commit()
    return"OK"


#---------------------------------- get all type of categories  and authors----------------------------------------------------------


def get_Allcategory_books():
    db = Conexion()
    curs=db.cursor()
    query= """SELECT *from  BooksCategory  """
    curs.execute(query)
    db.commit()
    category= curs.fetchall()
    db.close()
    data=[]
    content={}
    for cate in category:
        content={"id":cate[0],"category":cate[1]}
        data.append(content)
    return data

def get_All_status():
    db = Conexion()
    curs=db.cursor()
    query= """SELECT *from  state_of_conservation  """
    curs.execute(query)
    db.commit()
    category= curs.fetchall()
    db.close()
    data=[]
    content={}
    for s in category:
        content={"id":s[0],"status":s[1]}
        data.append(content)
    return data

#......................................get all authors.................................................
def get_Allauthor():
    db = Conexion()
    curs=db.cursor()
    query= """SELECT * from  Author  """
    curs.execute(query)
    db.commit()
    author= curs.fetchall()
    db.close()
    data=[]
    content={}
    for aut in author:
        content={"id":aut[0],"author":aut[1]}
        data.append(content)
    return data 


#-----------------------------------------------Add new book----------------------------------------------

def Save_book(title,img,isbn,category,conservation,author,user,date):
    db = Conexion()
    curs=db.cursor()
    query= f"""INSERT INTO books (title,img,isbn,category,conservation,author,users,date)
values ('{title}','{img}','{isbn}','{category}','{conservation}','{author}','{user}','{date}') """
    curs.execute(query)
    db.commit()
    db.close()
    return"exito"




#.................get book by id .....................................................

def get_all_books_id_DB(id):
    db = Conexion()
    curs=db.cursor()
    query=f""" SELECT B.bookId, B.title, BC.Id, BC.NombreCategoria, A.Id, A.nombre ,B.ISBN, SC.id, SC.Estado, B.img, U.id, U.userName 
    from Books B, Author A, state_of_conservation SC, BooksCategory BC , users U 
    WHERE A.Id=B.author and SC.id =B.conservation and B.bookid={id} and B.users = U.id and BC.Id=B.category;"""
    curs.execute(query)
    books=curs.fetchone()
    # content={}
    # for book  in books:
    #     content={ "BookId":book[0],
    #         "title": book[1],
    #         "categoryId": book[2],
    #         "category":book[3], 
    #         "authorId": book[4], "author":book[5],
    #         "ISBN":book[6],
    #         "statusId": book[7],
    #         "status":book[8],
    #         "img":book[9],
    #         "userId":book[10],
    #         "user":book[11]
    #         }
        
        
    return books
#----------------------------------UpDate Book-----------------------------

def upDateUserBook(idBook,idUser):

    db = Conexion()
    curs=db.cursor()
    query= f"""UPDATE `books` SET users={idUser} WHERE bookId ={idBook}; """
    try:
        curs.execute(query)
        db.commit()
        db.close()
    except :
        return "error"    







#......................Delete Books by id and check if they are in a exchange  ................................


def DeletBooksId(id):
    
    db = Conexion()
    curs=db.cursor()
    query= f"""DELETE FROM `books` WHERE bookId={id}; """
    queryE= f"""DELETE FROM `new_exchange` WHERE (Book1 = {id} or Book2 = {id}) and (status != 'false')"""
    try:
            curs.execute(queryE)
            db.commit()
            curs.execute(query)
            db.commit()
            db.close()
            return "exito"
            
    except:
        return "error"







#................................... get all  books by user email ........................................


def get_alldata_book_user(email):
    db = Conexion()
    curs=db.cursor()
    query= f"""SELECT B.bookId, B.title, BC.Id, BC.NombreCategoria, A.Id, A.nombre ,B.ISBN, SC.id, SC.Estado, B.img, U.id, U.userName , B.date 
    from Books B, Author A, state_of_conservation SC, BooksCategory BC , users U 
    WHERE A.Id=B.author and SC.id =B.conservation and BC.Id=B.category and U.email='{email}' and B.users = U.id; """
    curs.execute(query)
    books=curs.fetchall()
    db.close()
    data=[]
    content={}
    for book  in books:
        content={ "BookId":book[0],
            "title": book[1],
            "categoryId": book[2],
            "category":book[3], 
            "authorId": book[4], 
            "author":book[5],
            "ISBN":book[6],
            "statusId": book[7],
            "status":book[8],
            "img":book[9],
            "userId":book[10],
            "user":book[11],
            "date":book[12]
            }
        data.append(content)

    return data 

#------------------------ get all  books by title ......................................

def get_books_title(TITLE):
    db = Conexion()
    curs=db.cursor()
    query=f""" SELECT B.bookId, B.title, BC.Id, BC.NombreCategoria, A.Id, A.nombre ,B.ISBN, SC.id, SC.Estado, B.img, U.id, U.userName 
    from Books B, Author A, state_of_conservation SC, BooksCategory BC , users U 
    WHERE A.Id=B.author and B.title='{TITLE}' and SC.id =B.conservation and B.users = U.id and BC.Id=B.category;"""
    curs.execute(query)
    books=curs.fetchall()
    db.close()
    data=[]
    content={}
    for book  in books:
        content={ "BookId":book[0],
            "title": book[1],
            "categoryId": book[2],
            "category":book[3], 
            "authorId": book[4], "author":book[5],
            "ISBN":book[6],
            "statusId": book[7],
            "status":book[8],
            "img":book[9],
            "userId":book[10],
            "user":book[11]
            }
        data.append(content)
         

    return data

#.........................get books by category ...................................

def get_all_books_category_DB(category):
    db = Conexion()
    curs=db.cursor()
    query=f""" SELECT B.bookId, B.title, BC.Id, BC.NombreCategoria, A.Id, A.nombre ,B.ISBN, SC.id, SC.Estado, B.img, U.id, U.userName 
    from Books B, Author A, state_of_conservation SC, BooksCategory BC , users U 
    WHERE A.Id=B.author and SC.id =B.conservation and B.users = U.id and BC.NombreCategoria= '{category}' and BC.Id=B.category;"""
    curs.execute(query)
    books=curs.fetchall()
    db.close()
    data=[]
    content={}
    for book  in books:
        content={ "BookId":book[0],
            "title": book[1],
            "categoryId": book[2],
            "category":book[3], 
            "authorId": book[4], "author":book[5],
            "ISBN":book[6],
            "statusId": book[7],
            "status":book[8],
            "img":book[9],
            "userId":book[10],
            "user":book[11]
            }
        data.append(content)

    return data
        

    #--------------------get books by author ................................

def get_all_books_author_DB(author):
    db = Conexion()
    curs=db.cursor()
    query=f""" SELECT B.bookId, B.title, BC.Id, BC.NombreCategoria, A.Id, A.nombre ,B.ISBN, SC.id, SC.Estado, B.img, U.id, U.userName 
    from Books B, Author A, state_of_conservation SC, BooksCategory BC , users U 
    WHERE A.Id=B.author and SC.id =B.conservation and B.users = U.id and A.Nombre='{author}' and BC.Id=B.category;"""
    curs.execute(query)
    books=curs.fetchall()
    data=[]
    content={}
    for book  in books:
        content={ "BookId":book[0],
            "title": book[1],
            "categoryId": book[2],
            "category":book[3], 
            "authorId": book[4], "author":book[5],
            "ISBN":book[6],
            "statusId": book[7],
            "status":book[8],
            "img":book[9],
            "userId":book[10],
            "user":book[11]
            }
        data.append(content)
        
    return data 

#...................... get Books by status.................................

def get_all_books_conservation_status(STATUS):
    db = Conexion()
    curs=db.cursor()
    query=f""" SELECT B.bookId, B.title, BC.Id, BC.NombreCategoria, A.Id, A.nombre ,B.ISBN, SC.id, SC.Estado, B.img, U.id, U.userName 
    from Books B, Author A, state_of_conservation SC, BooksCategory BC , users U 
    WHERE A.Id=B.author and SC.Estado= '{STATUS}' and SC.id =B.conservation and B.users = U.id and BC.Id=B.category;"""
    curs.execute(query)
    books=curs.fetchall()
    db.close()
    data=[]
    content={}
    for book  in books:
        content={ "BookId":book[0],
            "title": book[1],
            "categoryId": book[2],
            "category":book[3], 
            "authorId": book[4], "author":book[5],
            "ISBN":book[6],
            "statusId": book[7],
            "status":book[8],
            "img":book[9],
            "userId":book[10],
            "user":book[11]
            }
        data.append(content)
        

    return data

#....................................... show 50 books ............................................................................

def showBooks(id):
    db = Conexion()
    curs=db.cursor()
    query=f""" SELECT B.bookId, B.title, BC.Id, BC.NombreCategoria, A.Id, A.nombre ,B.ISBN, SC.id, SC.Estado, B.img, U.id, U.userName, B.date 
    from Books B, Author A, state_of_conservation SC, BooksCategory BC , users U 
    WHERE A.Id=B.author and SC.id =B.conservation and B.users = U.id and BC.Id=B.category and B.users != {id}
    ORDER by date DESC LIMIT 50;"""
    curs.execute(query)
    books=curs.fetchall()
    db.close()
    data=[]
    content={}
    for book  in books:
        content={ "bookId":book[0],
            "title": book[1],
            "categoryId": book[2],
            "category":book[3], 
            "authorId": book[4], "author":book[5],
            "ISBN":book[6],
            "statusId": book[7],
            "status":book[8],
            "img":book[9],
            "userId":book[10],
            "user":book[11]
            }
        data.append(content)
    
    return data



def showBooksNotUser():
    db = Conexion()
    curs=db.cursor()
    query=f""" SELECT B.bookId, B.title, BC.Id, BC.NombreCategoria, A.Id, A.nombre ,B.ISBN, SC.id, SC.Estado, B.img, U.id, U.userName, B.date 
    from Books B, Author A, state_of_conservation SC, BooksCategory BC , users U 
    WHERE A.Id=B.author and SC.id =B.conservation and B.users = U.id and BC.Id=B.category 
    ORDER by date DESC LIMIT 50;"""
    curs.execute(query)
    books=curs.fetchall()
    db.close()
    data=[]
    content={}
    for book  in books:
        content={ "bookId":book[0],
            "title": book[1],
            "categoryId": book[2],
            "category":book[3], 
            "authorId": book[4], "author":book[5],
            "ISBN":book[6],
            "statusId": book[7],
            "status":book[8],
            "img":book[9],
            "userId":book[10],
            "user":book[11]
            }
        data.append(content)
    
    return data





#----------------------------------- save infromation of exchange--------------------------------------------------------------


def new_exchangeDB(book1,book2,Date_exchange,status):
    db = Conexion()
    curs=db.cursor()
    query=f"""INSERT INTO New_Exchange(book1,book2,date_exchange,status) 
values('{book1}','{book2}','{Date_exchange}','{status}') """
    curs.execute(query)
    db.commit()
    db.close()
    return"exito"

#........................check new Exchanges.......................................................
def checkRequestExchangeBook(id,mode):
    db = Conexion()
    curs=db.cursor()
    if mode== 'SN_EX':
        query=f""" SELECT E.Id, E.BooK1, E.BooK2,  E.status from new_exchange E, books B 
        WHERE E.Book1 =B.bookId and B.users= {id} and E.status = 'false' ;"""
        curs.execute(query)
    elif mode == 'MY_EX':
        query=f""" SELECT E.Id, E.BooK1, E.BooK2,  E.status from new_exchange E, books B 
        WHERE E.Book2 =B.bookId and B.users= {id} and E.status = 'false' ;"""
        curs.execute(query)

    Exchanges=curs.fetchall()
    db.close()
    contet={}
    data=[]
    if Exchanges !=():
            for D in Exchanges:
            
                contet={
                        "exchangeId":D[0], # id de intercabio
                        "bookId1": get_all_books_id_DB(D[1]), # libro del usuario que quieren 
                        "bookId2":get_all_books_id_DB(D[2]), # libro que ofrrecen 
                        "exchange":D[3] #estado de intercambio
                    }
                data.append(contet)
            
            return data
            
    else:
            return {} # En caso de no tener intercambios 




#.............................Check Exchange.................................

def CheckEx(book1, book2):
    db = Conexion()
    curs=db.cursor()
    query=f""" SELECT * FROM new_exchange E WHERE E.Book1={book1} and Book2={book2};"""
    curs.execute(query)
    Exchanges=curs.fetchall()
    db.commit()
    db.close()
    if Exchanges ==():
        return True
    else:
        return False
    
   
#encontrando intercambio -------------------------------------------

def confirmExchangeBook(exchangeId):
    db = Conexion()
    curs=db.cursor()

    
    query=f""" UPDATE  new_exchange E SET status= "confirm" WHERE E.Id= {exchangeId}"""
    curs.execute(query)
    db.commit()
    db.close()

    return

def toRefuseExchangeBook(exchangeId):
    db = Conexion()
    curs=db.cursor()
    query=f""" UPDATE  new_exchange E SET status= " to refuse"  WHERE E.Id= {exchangeId}"""
    curs.execute(query)
    db.commit()
    db.close()

    return



def Get_ExchangeBook(id):
    db = Conexion()
    curs=db.cursor()
    query=f""" SELECT  E.Id, E.BooK1, E.BooK2, E.Date_Exchange, 
    E.status from new_exchange E WHERE E.Id= {id};"""
    curs.execute(query)
    D=curs.fetchone()
    db.close()
    contet={
             "ExchangeId":D[0]  ,        
            "bookId1": get_all_books_id_DB(D[1]), # libro del usuario que quieren 
            "bookId2":get_all_books_id_DB(D[2]), # libro que ofrrecen 
            "exchangeDate":D[3], #estado de intercambio
            "exchangeStatus":D[4]
                    }
                
    print(contet)            
    return contet
    


def Delete_Exchange_Id(id):
     db = Conexion()
     curs=db.cursor()
     query=f""" DELETE FROM `new_exchange` WHERE Id={id} and status != 'confirm';"""
     curs.execute(query)
     db.commit()
     db.close()
     return "Ok"


   

