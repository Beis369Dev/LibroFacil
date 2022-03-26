from datetime import datetime
import controller_Query  as DB

def newExchange(idBook1, idBook2):
    DB.new_exchangeDB(idBook1,idBook2,False)
    #sendMenssager(user,idBook)
    return"exito"





