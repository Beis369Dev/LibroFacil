import controller_Query as CQ 
import statistics




status=[]
category=[]
author=[] 


def save_preferences(user):
    data=CQ.get_alldata_book_user(user)
    for book in data:
        category.append(book['category'])
        author.append(book['author']) 
        status.append(book['status'])
    return category,author,status


#save_preferences(1)







gustos=["cuentos","biografias","aventura","biografias","novelas","biografias","inversiones","ciencia","novelas"]
gustos1=(1,2,3,4,5,5,5,5,2,1,6,8,6,7)
print (statistics.multimode(gustos))







#for b in values2:
 #   a=b.count('AVENTURA')
  #  if a > 0:
   #     print(a)