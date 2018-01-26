CREATE SCHEMA corrispondenze;

-------------------------------------------

-- tabela Centro Di Costo aziendale

CREATE SEQUENCE corrispondenze.seq_cdc;
CREATE TABLE corrispondenze.cdc(

	idCdc  			INTEGER NOT NULL PRIMARY KEY DEFAULT nextval('corrispondenze.seq_cdc'),
	codice			VARCHAR(24) NOT NULL,
	descrizione		VARCHAR (240),
	hidden			BOOLEAN default FALSE
);

-- tabela Linea Protocollo TO DO

CREATE SEQUENCE corrispondenze.seq_linee;
CREATE TABLE corrispondenze.linee(

	idLinea 			INTEGER NOT NULL PRIMARY KEY DEFAULT nextval('corrispondenze.seq_linee'),
	codice			VARCHAR(24) NOT NULL,
	descrizione		VARCHAR (240),
	hidden			BOOLEAN default FALSE
);

CREATE SEQUENCE corrispondenze.seq_gruppi;
CREATE TABLE corrispondenze.gruppi (

	idgruppo 			INTEGER NOT NULL PRIMARY KEY DEFAULT nextval('corrispondenze.seq_gruppi'),
	descrizione			VARCHAR(120) ,
	codice				VARCHAR(64),
	hidden			BOOLEAN default FALSE

);


CREATE SEQUENCE corrispondenze.seq_userGruppi;
CREATE TABLE corrispondenze.userGruppi (
	iduserGruppi 			INTEGER NOT NULL PRIMARY KEY DEFAULT nextval('corrispondenze.seq_userGruppi'),
	iduser					INTEGER,
	idgruppo				INTEGER,
	hidden			BOOLEAN default FALSE,
	
	CONSTRAINT user_iduser FOREIGN KEY(iduser)
		REFERENCES Common.users (iduser) MATCH SIMPLE
      ON UPDATE NO ACTION ON DELETE CASCADE,	
	CONSTRAINT user_idgruppo FOREIGN KEY(idgruppo)
		REFERENCES corrispondenze.gruppi (idgruppo) MATCH SIMPLE
      ON UPDATE NO ACTION ON DELETE CASCADE
);


CREATE SEQUENCE corrispondenze.seq_mezziInvio;
CREATE TABLE corrispondenze.mezziInvio (

	idmezzoInvio 		INTEGER NOT NULL PRIMARY KEY DEFAULT nextval('corrispondenze.seq_mezziInvio'),
	descrizione			VARCHAR(120) ,
	codice				VARCHAR(64),
	hidden				BOOLEAN default FALSE

);


CREATE SEQUENCE corrispondenze.seq_tipiDocumento;
CREATE TABLE corrispondenze.tipiDocumento (

	idtipoDocumento 	INTEGER NOT NULL PRIMARY KEY DEFAULT nextval('corrispondenze.seq_tipiDocumento'),
	descrizione			VARCHAR(120) ,
	codice				VARCHAR(64),
	hidden				BOOLEAN default FALSE

);

CREATE SEQUENCE corrispondenze.seq_ruoli;
CREATE TABLE corrispondenze.ruoli (

	idruolo 	INTEGER NOT NULL PRIMARY KEY DEFAULT nextval('corrispondenze.seq_ruoli'),
	descrizione			VARCHAR(120) ,
	codice				VARCHAR(64),
	hidden				BOOLEAN default FALSE

);


CREATE SEQUENCE corrispondenze.seq_ruoliCdc;
CREATE TABLE corrispondenze.ruoliCdc (
	idruoloCDC			INTEGER NOT NULL PRIMARY KEY DEFAULT nextval('corrispondenze.ruoliCdc'),
	idruolo				INTEGER,
	idCdc				INTEGER,
	hidden				BOOLEAN default FALSE,
	
	CONSTRAINT ruoli_idruolo FOREIGN KEY(idruolo)
		REFERENCES common.users (iduser) MATCH SIMPLE
      ON UPDATE NO ACTION ON DELETE CASCADE,	
	CONSTRAINT user_idCdc FOREIGN KEY(idCdc)
		REFERENCES corrispondenze.cdc (idCdc) MATCH SIMPLE
      ON UPDATE NO ACTION ON DELETE CASCADE
);

CREATE SEQUENCE corrispondenze.seq_protocollo ;
CREATE TABLE corrispondenze.protocolli(
	idprotocollo			INTEGER NOT NULL PRIMARY KEY DEFAULT nextval('corrispondenze.seq_protocollo'),
	idCdc					INTEGER,
	tipoProtcollo			VARCHAR(24),
	dataProtcollo			TIMESTAMP,
	idLinea					INTEGER,
	Numero					INTEGER,
	codProtocollo			VARCHAR(64),
	oggetto					TEXT,
	idGruppoCompetenza		INTEGER,
	idGruppoConoscenza		INTEGER,
	idmezzoInvio			INTEGER,
	idtipoDocumento			INTEGER,	-- funzione mittente
	idruoloMittente			INTEGER,  	-- funzione mittente
	idSocietaMittente		INTEGER,   	-- societa mittente
	idFirmatario			INTEGER,	
	protMittente			VARCHAR(64),
	dataProtMittente		TIMESTAMP,
	hidden				BOOLEAN default FALSE,
	
	
	CONSTRAINT prot_idCdc FOREIGN KEY(idCdc)
		REFERENCES corrispondenze.cdc (idCdc) MATCH SIMPLE
      ON UPDATE NO ACTION ON DELETE CASCADE,		
    CONSTRAINT prot_idLinea FOREIGN KEY(idLinea)
		REFERENCES corrispondenze.linee (idLinea) MATCH SIMPLE
      ON UPDATE NO ACTION ON DELETE CASCADE,
    CONSTRAINT prot_idGruppoCompetenza FOREIGN KEY(idGruppoCompetenza)
		REFERENCES corrispondenze.gruppi (idgruppo) MATCH SIMPLE
      ON UPDATE NO ACTION ON DELETE CASCADE,
    CONSTRAINT prot_idGruppoConoscenza FOREIGN KEY(idGruppoConoscenza)
		REFERENCES corrispondenze.gruppi (idgruppo) MATCH SIMPLE
      ON UPDATE NO ACTION ON DELETE CASCADE,
    CONSTRAINT prot_idmezzoInvio FOREIGN KEY(idmezzoInvio)
		REFERENCES corrispondenze.mezziInvio (idmezzoInvio) MATCH SIMPLE
      ON UPDATE NO ACTION ON DELETE CASCADE ,     
    CONSTRAINT prot_idtipoDocumento FOREIGN KEY(idtipoDocumento)
		REFERENCES corrispondenze.tipiDocumento (idtipoDocumento) MATCH SIMPLE
      ON UPDATE NO ACTION ON DELETE CASCADE , 
    CONSTRAINT prot_idruoloMittente FOREIGN KEY(idruoloMittente)
		REFERENCES corrispondenze.ruoli (idruolo) MATCH SIMPLE
      ON UPDATE NO ACTION ON DELETE CASCADE ,
    CONSTRAINT prot_idSocietaMittente FOREIGN KEY(idSocietaMittente)
		REFERENCES common.ditte (idDitta) MATCH SIMPLE
      ON UPDATE NO ACTION ON DELETE CASCADE ,
    CONSTRAINT prot_idFirmatario FOREIGN KEY(idFirmatario)
		REFERENCES common.users (iduser) MATCH SIMPLE
      ON UPDATE NO ACTION ON DELETE CASCADE      
);

ALTER TABLE corrispondenze.protocolli DROP CONSTRAINT prot_idGruppoCompetenza;
ALTER TABLE corrispondenze.protocolli DROP CONSTRAINT prot_idGruppoConoscenza;

ALTER TABLE corrispondenze.protocolli ADD  CONSTRAINT prot_idCompetenza FOREIGN KEY(idGruppoCompetenza)
		REFERENCES common.ditte (idditta) MATCH SIMPLE;
ALTER TABLE corrispondenze.protocolli ADD  CONSTRAINT prot_idConoscenza FOREIGN KEY(idGruppoConoscenza)
		REFERENCES common.ditte (idditta) MATCH SIMPLE;		

ALTER TABLE corrispondenze.protocolli DROP CONSTRAINT prot_idruoloMittente;

ALTER TABLE corrispondenze.protocolli ADD  CONSTRAINT prot_idruoloMittente FOREIGN KEY(idruoloMittente)
		REFERENCES common.ruoli (idRuolo) MATCH SIMPLE;		
		
CREATE SEQUENCE corrispondenze.seq_protocolloWBS;
CREATE TABLE corrispondenze.protocolloWBS(
	idprotocolloWBS			INTEGER NOT NULL PRIMARY KEY DEFAULT nextval('corrispondenze.seq_protocolloWBS'),
	idprotocollo			INTEGER,
	idwbs					INTEGER,
    CONSTRAINT prot_idprotocollo FOREIGN KEY(idprotocollo)
		REFERENCES corrispondenze.protocolli (idprotocollo) MATCH SIMPLE
      ON UPDATE NO ACTION ON DELETE CASCADE ,  	
	CONSTRAINT prot_idwbs FOREIGN KEY(idwbs)
		REFERENCES Common.wbss (idwbs) MATCH SIMPLE
      ON UPDATE NO ACTION ON DELETE CASCADE  
);
------------------------------------------- DESTINATARI -------------------------------------------     

CREATE SEQUENCE corrispondenze.seq_funzioni;
CREATE TABLE corrispondenze.funzioni (

	idfunzione 			INTEGER NOT NULL PRIMARY KEY DEFAULT nextval('corrispondenze.seq_funzioni'),
	descrizione			VARCHAR(120) ,
	codice				VARCHAR(64),
	hidden				BOOLEAN default FALSE

);


CREATE SEQUENCE corrispondenze.seq_destinatari;
CREATE TABLE corrispondenze.destinatari(
	iddestinatario			INTEGER NOT NULL PRIMARY KEY DEFAULT nextval('corrispondenze.seq_destinatari'),
	idprotocollo			INTEGER,
	idruolo					INTEGER,
	idfunzione				INTEGER,
	idDitta					INTEGER,
	idnominativo			INTEGER,
	perConoscenza			BOOLEAN,
	
    CONSTRAINT dest_idprotocollo FOREIGN KEY(idprotocollo)
		REFERENCES corrispondenze.protocolli (idprotocollo) MATCH SIMPLE
      ON UPDATE NO ACTION ON DELETE CASCADE , 
    CONSTRAINT dest_idruolo FOREIGN KEY(idruolo)
		REFERENCES common.ruoli (idruolo) MATCH SIMPLE    
	 ON UPDATE NO ACTION ON DELETE CASCADE ,  	
    CONSTRAINT dest_idfunzione FOREIGN KEY(idfunzione)
		REFERENCES common.Funzione (idfunzione) MATCH SIMPLE
      ON UPDATE NO ACTION ON DELETE CASCADE ,  
    CONSTRAINT dest_iidnominativo FOREIGN KEY(idnominativo)
		REFERENCES common.users (iduser) MATCH SIMPLE
	  ON UPDATE NO ACTION ON DELETE CASCADE ,	
    CONSTRAINT prot_idDitta FOREIGN KEY(idDitta)
		REFERENCES common.ditte (idDitta) MATCH SIMPLE
      ON UPDATE NO ACTION ON DELETE CASCADE 
);

		
CREATE SEQUENCE corrispondenze.seq_protocolliCollegati;
CREATE TABLE corrispondenze.protocolliCollegati(
	idprotocolliCollegati			INTEGER NOT NULL PRIMARY KEY DEFAULT nextval('corrispondenze.seq_destinatari'),
	idprotocolloPrincipale			INTEGER,
	idprotocolloCollegato			INTEGER,
	
    CONSTRAINT prot_idprotocolloPrincipale FOREIGN KEY(idprotocolloPrincipale)
		REFERENCES corrispondenze.protocolli (idprotocollo) MATCH SIMPLE
      ON UPDATE NO ACTION ON DELETE CASCADE ,  
    CONSTRAINT prot_idprotocolloCollegato FOREIGN KEY(idprotocolloCollegato)
		REFERENCES corrispondenze.protocolli (idprotocollo) MATCH SIMPLE
      ON UPDATE NO ACTION ON DELETE CASCADE 
);

------------------------------------------- CLASSIFICAZIONE -------------------------------------------

CREATE SEQUENCE corrispondenze.seq_argomenti;
CREATE TABLE corrispondenze.argomenti (

	idargomento 			INTEGER NOT NULL PRIMARY KEY DEFAULT nextval('corrispondenze.seq_argomenti'),
	descrizione			VARCHAR(120) ,
	codice				VARCHAR(64),
	hidden				BOOLEAN default FALSE

);

CREATE SEQUENCE corrispondenze.seq_tipologie;
CREATE TABLE corrispondenze.tipologie (

	idtipologia 			INTEGER NOT NULL PRIMARY KEY DEFAULT nextval('corrispondenze.seq_tipologie'),
	descrizione			VARCHAR(120) ,
	codice				VARCHAR(64),
	hidden				BOOLEAN default FALSE

);

CREATE SEQUENCE corrispondenze.seq_dossiers;
CREATE TABLE corrispondenze.dossiers (

	iddossier 			INTEGER NOT NULL PRIMARY KEY DEFAULT nextval('corrispondenze.seq_dossiers'),
	-- TO DO
	hidden				BOOLEAN default FALSE

);
ALTER TABLE corrispondenze.dossiers ADD COLUMN descrizione VARCHAR(120);
ALTER TABLE corrispondenze.dossiers ADD COLUMN codice VARCHAR(64);

CREATE SEQUENCE corrispondenze.seq_classificazioni;
CREATE TABLE corrispondenze.classificazioni(

	idclassificazione 	INTEGER NOT NULL PRIMARY KEY DEFAULT nextval('corrispondenze.seq_classificazioni'),
	idargomento			INTEGER,
	idtipologia			INTEGER,
	iddossier			INTEGER,
	
    CONSTRAINT class_idargomento FOREIGN KEY(idargomento)
		REFERENCES corrispondenze.argomenti (idargomento) MATCH SIMPLE
      ON UPDATE NO ACTION ON DELETE CASCADE ,	
    CONSTRAINT class_idtipologia FOREIGN KEY(idtipologia)
		REFERENCES corrispondenze.tipologie (idtipologia) MATCH SIMPLE
      ON UPDATE NO ACTION ON DELETE CASCADE ,	
    CONSTRAINT class_iddossier FOREIGN KEY(iddossier)
		REFERENCES corrispondenze.dossiers (iddossier) MATCH SIMPLE
      ON UPDATE NO ACTION ON DELETE CASCADE 
);

ALTER TABLE corrispondenze.classificazioni ADD COLUMN idprotocollo INTEGER;
ALTER TABLE corrispondenze.classificazioni ADD CONSTRAINT class_idprotocollo FOREIGN KEY(idprotocollo)
		REFERENCES corrispondenze.protocolli (idprotocollo) MATCH SIMPLE;	

INSERT INTO corrispondenze.argomenti (codice,descrizione) VALUES ('AR1','Argomento 1');
INSERT INTO corrispondenze.argomenti (codice,descrizione) VALUES ('AR2','Argomento 2');
INSERT INTO corrispondenze.argomenti (codice,descrizione) VALUES ('AR3','Argomento 3');

INSERT INTO corrispondenze.tipologie (codice,descrizione) VALUES ('TP1','Tipologia 1');
INSERT INTO corrispondenze.tipologie (codice,descrizione) VALUES ('TP2','Tipologia 2');
INSERT INTO corrispondenze.tipologie (codice,descrizione) VALUES ('TP3','Tipologia 3');



CREATE SEQUENCE corrispondenze.seq_tipoProtocollo;
CREATE TABLE corrispondenze.tipoProtocollo (

	idtipoprotocollo 	INTEGER NOT NULL PRIMARY KEY DEFAULT nextval('corrispondenze.seq_tipoProtocollo'),
	descrizione			VARCHAR(120) ,
	codice				VARCHAR(64),
	hidden				BOOLEAN default FALSE

);
 
INSERT INTO corrispondenze.tipoProtocollo  (codice,descrizione) VALUES ('Entrata','Entrata');
INSERT INTO corrispondenze.tipoProtocollo  (codice,descrizione) VALUES ('Uscita','Uscita');


 
INSERT INTO corrispondenze.mezziInvio  (codice,descrizione) VALUES ('Lettera','Lettera');
INSERT INTO corrispondenze.mezziInvio  (codice,descrizione) VALUES ('Raccomandata','Raccomandata');
INSERT INTO corrispondenze.mezziInvio  (codice,descrizione) VALUES ('Fax','Fax');
INSERT INTO corrispondenze.mezziInvio  (codice,descrizione) VALUES ('PEC','PEC');
INSERT INTO corrispondenze.mezziInvio  (codice,descrizione) VALUES ('eMail','eMail');


INSERT INTO corrispondenze.tipiDocumento  (codice,descrizione) VALUES ('PDF','PDF');
INSERT INTO corrispondenze.tipiDocumento  (codice,descrizione) VALUES ('WORD','WORD');


ALTER TABLE corrispondenze.protocolli ADD COLUMN 	daRiscontrare BOOLEAN;
ALTER TABLE corrispondenze.protocolli ADD COLUMN 	dataRiscontrare TIMESTAMP;

CREATE SEQUENCE corrispondenze.seq_tipoRiscontro;
CREATE TABLE corrispondenze.tipoRiscontro (

	idtipoRiscontro 			INTEGER NOT NULL PRIMARY KEY DEFAULT nextval('corrispondenze.seq_tipoRiscontro'),
	descrizione			VARCHAR(120) ,
	codice				VARCHAR(64),
	hidden				BOOLEAN default FALSE

);
INSERT INTO corrispondenze.tipoRiscontro  (codice,descrizione) VALUES ('Da riscontrare','Da riscontrare');
INSERT INTO corrispondenze.tipoRiscontro  (codice,descrizione) VALUES ('Riscontro totale','Riscontro totale');
INSERT INTO corrispondenze.tipoRiscontro  (codice,descrizione) VALUES ('Riscontro parziale','Riscontro parziale');        


ALTER TABLE corrispondenze.protocolli ADD COLUMN idtipoprotocollo INTEGER;
ALTER TABLE corrispondenze.protocolli ADD CONSTRAINT prot_idtipoprotocollo FOREIGN KEY(idtipoprotocollo)
		REFERENCES corrispondenze.tipoProtocollo (idtipoprotocollo) MATCH SIMPLE;	

ALTER TABLE corrispondenze.protocolli ADD COLUMN idtipoRiscontro INTEGER;
ALTER TABLE corrispondenze.protocolli ADD CONSTRAINT prot_idriscontrare FOREIGN KEY(idtipoRiscontro)
		REFERENCES corrispondenze.tipoRiscontro (idtipoRiscontro) MATCH SIMPLE;	

ALTER TABLE corrispondenze.protocolli ADD COLUMN idfunzionemittente INTEGER;
ALTER TABLE corrispondenze.protocolli ADD CONSTRAINT prot_idfunzionemittente FOREIGN KEY(idfunzionemittente)
		REFERENCES common.funzione (idfunzione) MATCH SIMPLE;			

		
CREATE SEQUENCE corrispondenze.seq_riscontri;
CREATE TABLE corrispondenze.riscontri(

	idriscontro		 	INTEGER NOT NULL PRIMARY KEY DEFAULT nextval('corrispondenze.seq_riscontri'),
	idprotocollo		INTEGER,
	idprotocolloRisc	INTEGER,
	hidden				BOOLEAN default false,
	
	
    CONSTRAINT risc_idprotocollo FOREIGN KEY(idprotocollo)
		REFERENCES corrispondenze.protocolli (idprotocollo) MATCH SIMPLE
      ON UPDATE NO ACTION ON DELETE CASCADE,
    CONSTRAINT risc_idprotocolloRisc FOREIGN KEY(idprotocolloRisc)
		REFERENCES corrispondenze.protocolli (idprotocollo) MATCH SIMPLE
      ON UPDATE NO ACTION ON DELETE CASCADE      
);
	
CREATE SEQUENCE corrispondenze.seq_distribuzione;
CREATE TABLE corrispondenze.distribuzione(

	iddistribuzione	 	INTEGER NOT NULL PRIMARY KEY DEFAULT nextval('corrispondenze.seq_distribuzione'),
	idprotocollo		INTEGER,
	iduser				INTEGER,
	competenza			BOOLEAN,
	conoscenza			BOOLEAN,
	hidden				BOOLEAN default false,
	
	
    CONSTRAINT dist_idprotocollo FOREIGN KEY(idprotocollo)
		REFERENCES corrispondenze.protocolli (idprotocollo) MATCH SIMPLE
      ON UPDATE NO ACTION ON DELETE CASCADE,
    CONSTRAINT dist_iiduser FOREIGN KEY(iduser)
		REFERENCES common.users (iduser) MATCH SIMPLE
      ON UPDATE NO ACTION ON DELETE CASCADE      
);
-- tabella allegati protocolli

CREATE SEQUENCE corrispondenze.seq_protocolliAttach;
CREATE TABLE corrispondenze.protocolliAttach(

	idprotocolloAttach  	INTEGER NOT NULL PRIMARY KEY DEFAULT nextval('corrispondenze.seq_protocolliAttach'),
	idprotocollo			INTEGER,
	path					TEXT,
	name					VARCHAR(120),
	data					TIMESTAMP DEFAULT NOW(),
	size					VARCHAR(64),
	principale				BOOLEAN,
	CONSTRAINT attach_idprotocollo FOREIGN KEY(idprotocollo)
		REFERENCES corrispondenze.protocolli (idprotocollo) MATCH SIMPLE
      ON UPDATE NO ACTION ON DELETE CASCADE     
	

);















