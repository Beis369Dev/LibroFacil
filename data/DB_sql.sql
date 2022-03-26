CREATE table Users ( Id INTeger PRIMARY KEY  AUTOINCREMENT ,
                      userName VARCHAR(80) NOT NULL,
                      lastName VARCHAR(80) NOT NULL,
                      email VARCHAR(255) NOT NULL,
                      phone VARCHAR(255),
                      address VARCHAR(50),
                      Password varchar (50) not NULL,
                      ImgUsuario varchar(255) , role_user varchar (50));
		    	


CREATE table BooksCategory ( Id integer PRIMARY KEY AUTOINCREMENT,
                               NombreCategoria Varchar (80));



CREATE table Author ( Id integer  PRIMARY KEY AUTOINCREMENT,
                    Nombre varchar (20) NOT NULL, 
                    Apellido varchar (20) NOT NULL);


CREATE table state_of_conservation ( Id integer  PRIMARY key AUTOINCREMENT,
                                 Estado Varchar (80));




CREATE table Books (bookId integer  PRIMARY key AUTOINCREMENT,
                    title varchar (255) Not NULL,
                    Img varchar (255) NOT NULL, ISBN int not NULL, 
                    category int not NULL,
                    conservation int not NULL,
                    author  int Not NULL , user int not NULL,
                     FOREIGN key (user) REFERENCES User(id), date DATETime,
                     FOREIGN key (conservation) REFERENCES state_of_conservation(Id),
                     FOREIGN key (category) REFERENCES BooksCategory(Id),
                     FOREIGN key (author) REFERENCES Author(Id));


CREATE table New_Exchange (Id integer  PRIMARY key AUTOINCREMENT,
                          
                         Book1 INT NOT NULL, 
                         Book2 INT NOT NULL,
                         Date_Exchange  DATETime,
                         status  bool,  
                         FOREIGN key (Book1) REFERENCES Books(bookId),
                         FOREIGN key (Book2) REFERENCES Books(bookId) );



