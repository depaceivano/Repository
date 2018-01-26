/************************* insert per test ****************************
INSERT INTO common.progetto (codice,descrizione) VALUES ('PV','Pedemontana Veneta');
INSERT INTO common.attivita (codice,descrizione) VALUES ('L','Lavori');
INSERT INTO common.lotto (codice,descrizione) VALUES ('1','Lotto 1');
INSERT INTO common.lotto (codice,descrizione) VALUES ('2','Lotto 2');
INSERT INTO common.lotto (codice,descrizione) VALUES ('3','Lotto 3');
INSERT INTO common.tratta (codice,descrizione) VALUES ('A','Tratta A');
INSERT INTO common.tratta (codice,descrizione) VALUES ('B','Tratta B');
INSERT INTO common.tratta (codice,descrizione) VALUES ('C','Tratta C');
INSERT INTO common.opera (codice,descrizione) VALUES ('CA','Cavalcavia');
INSERT INTO common.opera (codice,descrizione) VALUES ('CE','Casello di Esazione');
INSERT INTO common.opera (codice,descrizione) VALUES ('MU','Muro / Paratia');
INSERT INTO common.opera (codice,descrizione) VALUES ('MU','Muro / Paratia');
INSERT INTO common.codice (codice,separatore) VALUES ('0','-');
INSERT INTO common.carreggiata (codice,descrizione) VALUES ('0','');
INSERT INTO common.carreggiata (codice,descrizione) VALUES ('N','Nord');
INSERT INTO common.carreggiata (codice,descrizione) VALUES ('S','Sud');



INSERT INTO  common.Wbss (idProgetto,codiceWBS,descrizione) VALUES (1,'PV','PEDEMONTANA VENETA');
INSERT INTO  common.Wbss (idProgetto,idAttivita,codiceWBS,descrizione) VALUES (1,1,'PV.L','LAVORI');
INSERT INTO  common.Wbss (idProgetto,idAttivita,idLotto,idTratta,codiceWBS,descrizione) VALUES (1,1,1,1,'PV.L.1A','LAVORI - LOTTO 1 TRATTA A');
INSERT INTO common.Wbss (idProgetto,idAttivita,idLotto,idTratta,idOpera,idCarreggiata,codice,seperatore,codiceWBS,importcode,daPk,aPk	,descrizione) VALUES (1,1,1,1,1,1,'0','-','PV.L.CA	1A001-0','CA1A001-0','-4+009,23','-3+929,27','CAVALCAVIA 1 ROTATORIA S.R. 11 da PK -4+009,23 a PK -3+929,27');		

************************* insert per test *****************************/



CREATE SCHEMA Common;

-------------------------------------------------------------


CREATE SEQUENCE common.seq_users;
CREATE TABLE common.users (

	iduser 			INTEGER NOT NULL PRIMARY KEY DEFAULT nextval('common.seq_users'),
	nome			VARCHAR(36),
	cognome			VARCHAR(36),
	login			VARCHAR(36) NOT NULL,
	permission		VARCHAR(1024)  ,
	mail			VARCHAR(120),
	telefono		VARCHAR(32),
	passwd			VARCHAR(120) NOT NULL,
	
	creationtime	TIMESTAMP DEFAULT now(),
	hidden			BOOLEAN default FALSE,
	
	CONSTRAINT users_name_key UNIQUE (login)
);

INSERT INTO common.users (nome,cognome,login,permission,mail,telefono,passwd) VALUES ('root','root','root','11000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000OOOOOOOOOOOOOOOOO000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000',null,null,MD5('a'));


CREATE SEQUENCE common.seq_indirizzi;
CREATE TABLE common.indirizzi(
	idIndirizzo 				INTEGER NOT NULL PRIMARY KEY DEFAULT nextval('common.seq_indirizzi'),
	indirizzo					VARCHAR(120),
	city						VARCHAR(120),
	zipCode						VARCHAR(64),
	provincia					VARCHAR(10),
	mail						VARCHAR(120),
	telefono					VARCHAR(64),
	
	hidden			BOOLEAN default FALSE
);

CREATE SEQUENCE common.seq_ditte;
CREATE TABLE common.ditte (
	idDitta 				INTEGER NOT NULL PRIMARY KEY DEFAULT nextval('common.seq_ditte'),
	ragioneSociale			VARCHAR(120),
	piva					VARCHAR(120),
	codfiscale				VARCHAR(120),
	idAdress				INTEGER,
	antimafia				BOOLEAN default TRUE, 
	creationtime			TIMESTAMP DEFAULT now(),
	idcreationUser			INTEGER,
	hidden					BOOLEAN default FALSE,
	
	CONSTRAINT ditte_iduser FOREIGN KEY(idcreationUser)
		REFERENCES Common.users (iduser) MATCH SIMPLE
      ON UPDATE NO ACTION ON DELETE CASCADE     
	
);


----------------- tabelle per la costruzione del codice WBS -----------------
CREATE SEQUENCE Common.seq_progetto;
CREATE TABLE Common.progetto(
	idProgetto   	INTEGER NOT NULL PRIMARY KEY DEFAULT nextval('Common.seq_progetto'),
	codice		  	VARCHAR(12) 	NOT NULL,
	descrizione		VARCHAR(120),
	hidden			BOOLEAN default FALSE

);

CREATE SEQUENCE Common.seq_attivita;
CREATE TABLE Common.attivita(
	idAttivita   	INTEGER NOT NULL PRIMARY KEY DEFAULT nextval('Common.seq_attivita'),
	codice		  	VARCHAR(12)		NOT NULL,
	descrizione		VARCHAR(120),
	hidden			BOOLEAN default FALSE

);

CREATE SEQUENCE Common.seq_lotto;
CREATE TABLE Common.lotto(
	idLotto   	INTEGER NOT NULL PRIMARY KEY DEFAULT nextval('Common.seq_lotto'),
	codice		  	VARCHAR(12)		NOT NULL,
	descrizione		VARCHAR(120),
	hidden			BOOLEAN default FALSE

);

CREATE SEQUENCE Common.seq_tratta;
CREATE TABLE Common.tratta(
	idTratta   	INTEGER NOT NULL PRIMARY KEY DEFAULT nextval('Common.seq_tratta'),
	codice		  	VARCHAR(12)		NOT NULL,
	descrizione		VARCHAR(120),
	hidden			BOOLEAN default FALSE

);


CREATE SEQUENCE Common.seq_opera;
CREATE TABLE Common.opera(
	idOpera   	INTEGER NOT NULL PRIMARY KEY DEFAULT nextval('Common.seq_opera'),
	codice		  	VARCHAR(12)		NOT NULL,
	descrizione		VARCHAR(120),
	hidden			BOOLEAN default FALSE

);

CREATE SEQUENCE Common.seq_codice;
CREATE TABLE Common.codice(
	idCodice   	INTEGER NOT NULL PRIMARY KEY DEFAULT nextval('Common.seq_codice'),
	codice		  	VARCHAR(12)		NOT NULL,
	separatore		VARCHAR(1),
	hidden			BOOLEAN default FALSE

);

CREATE SEQUENCE Common.seq_carreggiata;
CREATE TABLE Common.carreggiata(
	idCarreggiata  INTEGER NOT NULL PRIMARY KEY DEFAULT nextval('Common.seq_carreggiata'),
	codice		  	VARCHAR(12)		NOT NULL,
	descrizione		VARCHAR(120),
	hidden			BOOLEAN default FALSE

);


CREATE SEQUENCE Common.seq_wbss;
CREATE TABLE Common.wbss(
	idWbs  					INTEGER NOT NULL PRIMARY KEY DEFAULT nextval('Common.seq_wbss'),
	idProgetto				INTEGER ,
	idAttivita				INTEGER,
	idLotto					INTEGER,
	idTratta				INTEGER,
	idOpera					INTEGER,
	idCarreggiata			INTEGER,
	codice		  			VARCHAR(12),
	seperatore		  		VARCHAR(2),
	codiceWBS		  		VARCHAR(24),
	importcode				VARCHAR(24),
	daPk					VARCHAR(24),
	aPk						VARCHAR(24),
	initDataPrev			TIMESTAMP,
	endDataPrev				TIMESTAMP,
	initDataReal			TIMESTAMP,
	endDataReal				TIMESTAMP,
	millesimi				FLOAT,
	importo					FLOAT,        
	DirettoreLavori			INTEGER, -- collegato ad users
	DirettoreTecnico		INTEGER, -- collegato ad users
	collaudatore			INTEGER, -- collegato ad users
	sospeso					BOOLEAN default false,
	descrizione				VARCHAR(120),
	hidden			BOOLEAN default FALSE,
	
	UNIQUE (codiceWBS, hidden),
	CONSTRAINT wbs_idProgetto FOREIGN KEY(idProgetto)
		REFERENCES Common.progetto (idProgetto) MATCH SIMPLE
      ON UPDATE NO ACTION ON DELETE CASCADE,	
	CONSTRAINT wbs_idAttivita FOREIGN KEY(idAttivita)
		REFERENCES Common.attivita (idAttivita) MATCH SIMPLE
      ON UPDATE NO ACTION ON DELETE CASCADE,	      
	CONSTRAINT wbs_idLotto FOREIGN KEY(idLotto)
		REFERENCES Common.lotto (idLotto) MATCH SIMPLE
      ON UPDATE NO ACTION ON DELETE CASCADE,	
	CONSTRAINT wbs_idTratta FOREIGN KEY(idTratta)
		REFERENCES Common.tratta (idTratta) MATCH SIMPLE
      ON UPDATE NO ACTION ON DELETE CASCADE,	    
	CONSTRAINT wbs_idOpera FOREIGN KEY(idOpera)
		REFERENCES Common.opera (idOpera) MATCH SIMPLE
      ON UPDATE NO ACTION ON DELETE CASCADE,	    
	CONSTRAINT wbs_idCarreggiata FOREIGN KEY(idCarreggiata)
		REFERENCES Common.carreggiata (idCarreggiata) MATCH SIMPLE
      ON UPDATE NO ACTION ON DELETE CASCADE      
);

-- Tabella per le date sospesione lavori della WBS
CREATE SEQUENCE Common.seq_sospesioneLavori;
CREATE TABLE Common.sospesioneLavori(
	idsospesioneLavori  	INTEGER NOT NULL PRIMARY KEY DEFAULT nextval('Common.seq_sospesioneLavori'),
	idwbs					INTEGER,
	initData				TIMESTAMP,
	endData					TIMESTAMP,
	hidden			BOOLEAN default FALSE,	
	
	CONSTRAINT sospensione_idwbs FOREIGN KEY(idwbs)
		REFERENCES Common.wbss (idwbs) MATCH SIMPLE
      ON UPDATE NO ACTION ON DELETE CASCADE     
	
	
);

-- tabella allegati WBS

CREATE SEQUENCE Common.seq_wbsAttach;
CREATE TABLE Common.wbsAttach(

	idWbsAttach  	INTEGER NOT NULL PRIMARY KEY DEFAULT nextval('Common.seq_wbsAttach'),
	idwbs			INTEGER,
	path			TEXT,
	name			VARCHAR(120),
	data			TIMESTAMP DEFAULT NOW(),
	size			VARCHAR(64),
	
	CONSTRAINT attach_idwbs FOREIGN KEY(idwbs)
		REFERENCES Common.wbss (idwbs) MATCH SIMPLE
      ON UPDATE NO ACTION ON DELETE CASCADE     
	

);

CREATE SEQUENCE seqLogs;

CREATE TABLE Logs(
  idLog        INTEGER NOT NULL PRIMARY KEY DEFAULT nextval('seqLogs'),  
  creationTime TIMESTAMP DEFAULT NOW(),
  idUser       INTEGER NOT NULL,
  sql          TEXT,
  Result       BOOLEAN DEFAULT FALSE,
  
  FOREIGN KEY (idUser) REFERENCES common.Users (idUser)
);

CREATE SEQUENCE common.seq_Ruoli;
CREATE TABLE common.Ruoli (
	idRuolo        INTEGER NOT NULL PRIMARY KEY DEFAULT nextval('common.seq_Ruoli'), 
	Description		VARCHAR(64)
);
ALTER TABLE common.Ruoli ADD COLUMN hidden BOOLEAN default false;
INSERT INTO common.Ruoli (Description) VALUES ('Direttore lavori');
INSERT INTO common.Ruoli (Description) VALUES ('Direttore operativo');
INSERT INTO common.Ruoli (Description) VALUES ('Ispettore di cantiere');
INSERT INTO common.Ruoli (Description) VALUES ('Direttore tecnico');

CREATE SEQUENCE common.seq_Funzioni;
CREATE TABLE common.Funzione (
	idFunzione      INTEGER NOT NULL PRIMARY KEY DEFAULT nextval(' common.seq_Funzioni'), 
	Description		VARCHAR(64),
	idRuolo			INTEGER,
	
	CONSTRAINT funzioni_idruolo FOREIGN KEY(idRuolo)
		REFERENCES common.Ruoli (idRuolo) MATCH SIMPLE
      ON UPDATE NO ACTION ON DELETE CASCADE 	
);
ALTER TABLE common.Funzione ADD COLUMN hidden BOOLEAN default false;
INSERT INTO common.Funzione (description,idRuolo) VALUES ('Controllore lavori',2);
INSERT INTO common.Funzione (description,idRuolo) VALUES ('Ambiente',2);
INSERT INTO common.Funzione (description,idRuolo) VALUES ('Qualità',2);
INSERT INTO common.Funzione (description,idRuolo) VALUES ('Ingegnerie',2);
INSERT INTO common.Funzione (description,idRuolo) VALUES ('Coordinamento',2);
INSERT INTO common.Funzione (description,idRuolo) VALUES ('Contabilità',2);
INSERT INTO common.Funzione (description,idRuolo) VALUES ('CSE',2);

INSERT INTO common.Funzione (description,idRuolo) VALUES ('Direzione lavori',3);
INSERT INTO common.Funzione (description,idRuolo) VALUES ('Sicurezza',3);

CREATE SEQUENCE common.seq_userInfo;
CREATE TABLE common.userInfo (
	idDitta 				INTEGER ,
	iduser					INTEGER ,
	idRuolo					INTEGER,
	idFunzione				INTEGER,
	creationtime			TIMESTAMP default now(),
	hidden					BOOLEAN default FALSE,
	
	CONSTRAINT userInfo_iduser FOREIGN KEY(iduser)
		REFERENCES Common.users (iduser) MATCH SIMPLE
      ON UPDATE NO ACTION ON DELETE CASCADE  ,   
	CONSTRAINT userInfo_idditta FOREIGN KEY(idDitta)
		REFERENCES Common.ditte (idDitta) MATCH SIMPLE
      ON UPDATE NO ACTION ON DELETE CASCADE  , 	
	CONSTRAINT userInfo_idruolo FOREIGN KEY(idRuolo)
		REFERENCES Common.Ruoli (idRuolo) MATCH SIMPLE
      ON UPDATE NO ACTION ON DELETE CASCADE  , 
	CONSTRAINT userInfo_idfunzione FOREIGN KEY(idFunzione)
		REFERENCES Common.Funzione (idFunzione) MATCH SIMPLE
      ON UPDATE NO ACTION ON DELETE CASCADE   
);

ALTER TABLE common.userInfo ADD COLUMN idlotto INTEGER;
ALTER TABLE common.userInfo ADD CONSTRAINT userInfo_idlotto FOREIGN KEY(idlotto)
		REFERENCES Common.lotto (idlotto) MATCH SIMPLE
      ON UPDATE NO ACTION ON DELETE CASCADE   ;

ALTER TABLE common.userInfo ADD COLUMN idtratta INTEGER;
ALTER TABLE common.userInfo ADD CONSTRAINT userInfo_idtratta FOREIGN KEY(idtratta)
		REFERENCES Common.tratta (idtratta) MATCH SIMPLE
      ON UPDATE NO ACTION ON DELETE CASCADE   ;      