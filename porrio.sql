CREATE TABLE apuesta(partido varchar(50), 
       quien_apuesta varchar(50) not null, 
       goles_local  int not null,
       goles_visitante  int not null);

CREATE TABLE partido( id varchar(50) not null primary key,
       equipo_local varchar(50) not null,
       equipo_visitante varchar(50) not null, 
       competicion varchar(20)  not null,
       year  int not null);
