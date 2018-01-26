var main_layout = null;
var main_menu = null;
var gCorrispondenza = null;
var frmForm = null;
var insertForm = null;
var layout_insert = null;
var idSelectInsertData = null;
var wForm = null;
var gDocument = null;

dhtmlXForm.prototype.getButton = function(name) {
   return this.doWithItem(name, "getButton");
};

dhtmlXForm.prototype.items.button.getButton = function(item) {
   return item;
};

function openNew(data, idProt){

	if(data!=null){
		var formData = data['1'][0].resultset;
		var arrDest = data['2'][0].resultset;
		var arrWbs = data['3'][0].resultset;
		var arrClass = data['4'][0].resultset;
		var arrProt = data['5'][0].resultset;
		var arrDist = data['6'][0].resultset;
	}


	wNew = new dhtmlXWindows();

	winNew = wNew.createWindow('winNew', 0, 0, 740, 550);
	winNew.attachStatusBar({
		text: "<span id='statusToolbar'></span>",
	});
	winBtnToolbar = new dhtmlXToolbarObject({
		parent: "statusToolbar",
		iconset: "awesome",
		items:[
		    {id: "btnSend", type: "button", text: "Invia", img: "fa fa-paper-plane"},
		    {id: "sep1", type: "separator" },
		    {id: "btnSave", type: "button", text: "Salva", img: "fa fa-floppy-o"},
		    {id: "sep2", type: "separator" },
		    {id: "btnCancel", type: "button", text: "Chiudi", img: "fa fa-times"}
		]
	});
	winBtnToolbar.addSeparator('sp', 0);
	winBtnToolbar.addSpacer('sp');
	var obj = winBtnToolbar.objPull[winBtnToolbar.idPrefix+"btnSend"].obj;
	obj.style.backgroundColor = "#87e3ff";

	winBtnToolbar.attachEvent('onClick', function(id){
		switch(id) {
			case "btnSend":
				console.log('send mail');
			break;
			case "btnSave":

				// Modifica sui controlli dei campi
        if(wForm.getItemValue(5)==0)
        {
					dhtmlx.alert({
						title:"Error",
						type:"alert-error",
						width: "460px",
						text:"<div style='text-align:justify'>Attenzione!!<BR>Compilare il campo CDC.</div>"
					});
					return;
				}
        else if(wForm.getItemValue(15)==0)
        {
					dhtmlx.alert({
						title:"Error",
						type:"alert-error",
						width: "460px",
						text:"<div style='text-align:justify'>Attenzione!!<BR>Compilare il campo Tipo Protocollo.</div>"
					});
					return;
        }
        else if(wForm.getItemValue(25)==0)
          {
  					dhtmlx.alert({
  						title:"Error",
  						type:"alert-error",
  						width: "460px",
  						text:"<div style='text-align:justify'>Attenzione!!<BR>Compilare il campo Data Protocollo.</div>"
  					});
  					return;
          }
          else(wForm.getItemValue(20)==null)
          {
  					dhtmlx.alert({
  						title:"Error",
  						type:"alert-error",
  						width: "460px",
  						text:"<div style='text-align:justify'>Attenzione!!<BR>Compilare il campo Linea di Protocollo.</div>"
  					});
  					return;
          }
        // Fine Modifica sui controlli dei campi


				var jsonDest = new Array();
				var jsonWbs = new Array();
				var jsonClass = new Array();
				var jsonRisc = new Array();
				var jsonDist = new Array();
				var jsonDoc = new Array();

				if(gDestinatari.getAllRowIds("|").split('|')!=''){
					for(var i=0; i<gDestinatari.getAllRowIds("|").split('|').length; i++){
						jsonDest.push(gDestinatari.getRowData(gDestinatari.getAllRowIds("|").split('|')[i]));
					}
				}

				if(gWBS.getAllRowIds("|").split('|')!=''){
					for(var i=0; i<gWBS.getAllRowIds("|").split('|').length; i++){
						jsonWbs.push(gWBS.getRowData(gWBS.getAllRowIds("|").split('|')[i]));
					}
				}

				if(gClassificazione.getAllRowIds("|").split('|')!=''){
					for(var i=0; i<gClassificazione.getAllRowIds("|").split('|').length; i++){
						jsonClass.push(gClassificazione.getRowData(gClassificazione.getAllRowIds("|").split('|')[i]));
					}
				}

				if(gRiscontriDa.getAllRowIds("|").split('|')!=''){
					for(var i=0; i<gRiscontriDa.getAllRowIds("|").split('|').length; i++){
						jsonRisc.push(gRiscontriDa.getRowData(gRiscontriDa.getAllRowIds("|").split('|')[i]));
					}
				}

				if(gDistribuzione.getAllRowIds("|").split('|')!=''){
					for(var i=0; i<gDistribuzione.getAllRowIds("|").split('|').length; i++){
						jsonDist.push(gDistribuzione.getRowData(gDistribuzione.getAllRowIds("|").split('|')[i]));
					}
				}

				if(gDocument.getAllRowIds("|").split('|')!=''){
					for(var i=0; i<gDocument.getAllRowIds("|").split('|').length; i++){
						jsonDoc.push(gDocument.getRowData(gDocument.getAllRowIds("|").split('|')[i]));
					}
				}

				//SALVO --------------------------------------------------------------------------------------------------
	    		window.dhx.ajax.post("php/corrispondenze.php", "opt=save&iduser="+top.userId+"&id="+idProt+"&arr="+JSON.stringify(wForm.getFormData())
	    		+"&arrDest="+JSON.stringify(jsonDest)
	    		+"&arrWbs="+JSON.stringify(jsonWbs)
	    		+"&arrClass="+JSON.stringify(jsonClass)
	    		+"&arrRisc="+JSON.stringify(jsonRisc)
	    		+"&arrDist="+JSON.stringify(jsonDist)
	    		+"&arrDoc="+JSON.stringify(jsonDoc), function(r) {

				    var res = window.dhx.s2j(r.xmlDoc.responseText);
				    gCorrispondenza.clearAll();
					gCorrispondenza.load("php/corrispondenze.php?opt=tableCorrispondenze");
				    if(r.xmlDoc.responseText.toLowerCase().indexOf('successo') != -1){
				    	dhtmlx.alert({
							title:"Attenzione",
							type:"alert",
							width: "460px",
							text:"<div style='text-align:justify'>" + r.xmlDoc.responseText+"</div>"
						});
				    	if((wNew != null) && (wNew.unload)) {
							if((winNew != null) && (winNew.unload)) {
								winNew.hide();
								winNew.unload();
								winNew = null;
							}
							wNew.unload();
							wNew = null;
						}
				    }else{
				    	dhtmlx.alert({
							title:"Error",
							type:"alert-error",
							width: "460px",
							text:"<div style='text-align:justify'>" + r.xmlDoc.responseText+"</div>"
						});
				    }
			    });

			break;
			case "btnCancel":
				if((wNew != null) && (wNew.unload)) {
					if((winNew != null) && (winNew.unload)) {
						winNew.hide();
						winNew.unload();
						winNew = null;
					}
					wNew.unload();
					wNew = null;
				}
			break;
		}
	});


	var formStr = [
		{type: "fieldset",  name: "set", label: "Corrispondenza", width:690, list:[
			{type: "block", blockOffset:0, width: 650, list:[
				{type: "select", name:"5", label: "5 CDC", labelWidth:100, inputWidth:100, options:[{value: "0", text: ""}], required:true},
		    	{type:"newcolumn"},
		    	{type: "input", name:"10", label: "10 Descrizione commessa", value: "", offsetLeft: 10, labelWidth:100, inputWidth:100, disabled:true},
		    	{type:"newcolumn"},
		    	{type: "select", name:"15", label: "15 Tipo prot.", labelWidth:100, inputWidth:100, offsetLeft: 10, options:[{value: "0", text: ""}], required:true},
			]},

			{type: "block", blockOffset:0, width: 650, list:[
			    {type: "calendar", name: "20", label: "20 Data prot.&nbsp;<i class='fa fa-calendar'></i>", labelWidth:100, inputWidth:100, enableTime: false, enableTodayButton: true, calendarPosition: "right", offsetLeft: 0, dateFormat:"%d-%m-%Y", serverDateFormat:"%d-%m-%Y", required:true},
				{type:"newcolumn"},
		    	{type: "select", name:"25", label: "25 Linea protocollo", labelWidth:100, inputWidth:100, offsetLeft: 10, options:[{value: "0", text: ""}], required:true},
			    {type:"newcolumn"},
		    	{type: "input", name:"30", label: "30 Protocollo n.", value: "", offsetLeft: 10, labelWidth:100, inputWidth:100, disabled:true},
		    ]},

	    	{type: "block", blockOffset:0, width: 650, list:[
	    		{type: "input", name:"35", label: "35 Protocollo", value: "", labelWidth:100, inputWidth:200, disabled:true},
	    	]},

	    ]},

	    {type: "block", blockOffset:0, width: 670, list:[
    		{type: "input", name:"40", label: "40 Oggetto", value: "", offsetLeft: 25, labelWidth:100, inputWidth:100},
    		{type:"newcolumn"},
    		{type: "select", name:"45", label: "45 Per competenza", labelWidth:100, inputWidth:100, offsetLeft: 10, options:[
		        {value: "0", text: ""}
		    ]},
		    {type:"newcolumn"},
    		{type: "select", name:"50", label: "50 Per conoscenza", labelWidth:100, inputWidth:100, offsetLeft: 10, options:[
		        {value: "0", text: ""}
		    ]},
    	]},

    	{type: "block", blockOffset:0, width: 670, list:[
    		{type: "select", name:"55", label: "55 Mezzo invio", labelWidth:100, inputWidth:100, offsetLeft: 25, options:[
    			{value: "0", text: ""}
		    ]},
		    {type:"newcolumn"},
    		{type: "select", name:"60", label: "60 Tipo documento", labelWidth:100, inputWidth:100, offsetLeft: 10, options:[
		        {value: "0", text: ""}
		    ]},
    	]},

    	{type: "block", blockOffset:0, width: 670, list:[
    		{type: "select", name:"65", label: "65 Societa' mittente", labelWidth:100, inputWidth:100, offsetLeft: 25, options:[
		        {value: "0", text: ""}
		    ]},
		    {type:"newcolumn"},
    		{type: "select", name:"68", label: "68 Ruolo mittente", labelWidth:100, inputWidth:100, offsetLeft: 10, options:[
		        {value: "0", text: ""}
		    ]},
		    {type:"newcolumn"},
    		{type: "select", name:"70", label: "70 Funzione mittente", labelWidth:100, inputWidth:100, offsetLeft: 10, options:[
		        {value: "0", text: ""}
		    ]},

    	]},

    	{type: "block", blockOffset:0, width: 670, list:[
    		{type: "select", name:"75", label: "75 Firmatario", labelWidth:100, inputWidth:100, offsetLeft: 25, options:[
		        {value: "0", text: ""}
		    ]},
		    {type:"newcolumn"},
    		{type: "input", name:"80", label: "80 Protocollo mittente", value: "", labelWidth:100, inputWidth:100, offsetLeft: 10},
    		{type:"newcolumn"},
    		{type: "calendar", name: "85", label: "85 Data prot.&nbsp;<i class='fa fa-calendar'></i> mittente", labelWidth:100, inputWidth:100, enableTime: false, enableTodayButton: true, calendarPosition: "right", offsetLeft: 10, dateFormat:"%d-%m-%Y", serverDateFormat:"%d-%m-%Y"},
    	]},

    	{type: "fieldset",  name: "set1", label: "Destinatari", width:690, list:[
    		{type: "label", label: "Destinatari"},
		    {type:"container", name: "gDestinatari", inputWidth: 630, inputHeight: 133},
		    {type: "block", blockOffset:0, width: 640, list:[
			    {type: "button", name: "btnAddDest", value: "<i class='fa fa-plus'></i>&nbsp;&nbsp;Aggiungi destinatario", offsetLeft: 0, width: 312},
			    {type:"newcolumn"},
			    {type: "button", name: "btnDelDest", value: "<i class='fa fa-trash'></i>&nbsp;&nbsp;Elimina destinatario", offsetLeft: 0, width: 312},
			]},
		    {type: "label", label: "WBS"},
		    {type:"container", name: "gWBS", inputWidth: 630, inputHeight: 100},
		    {type: "block", blockOffset:0, width: 640, list:[
			    {type: "button", name: "btnAddWBS", value: "<i class='fa fa-plus'></i>&nbsp;&nbsp;Aggiungi WBS", offsetLeft: 0, width: 312},
			    {type:"newcolumn"},
			    {type: "button", name: "btnDelWBS", value: "<i class='fa fa-trash'></i>&nbsp;&nbsp;Elimina WBS", offsetLeft: 0, width: 312},
			]},

	    ]},

	    {type: "fieldset",  name: "set2", label: "Classificazione", width:690, list:[
		    {type:"container", name: "gClassificazione", inputWidth: 630, inputHeight: 100},
		    {type: "block", blockOffset:0, width: 640, list:[
			    {type: "button", name: "btnAddClassificazione", value: "<i class='fa fa-plus'></i>&nbsp;&nbsp;Aggiungi classificazione", offsetLeft: 0, width: 312},
			    {type:"newcolumn"},
			    {type: "button", name: "btnDelClassificazione", value: "<i class='fa fa-trash'></i>&nbsp;&nbsp;Elimina classificazione", offsetLeft: 0, width: 312},
			]},
	    ]},

	    {type: "fieldset",  name: "set3", label: "Riscontri", width:690, list:[
	    	{type: "label", label: "Protocolli da riscontrare"},
		    {type: "block", blockOffset:0, width: 640, list:[
			    {type: "select", name:"145", label: "145 Da riscontrare", labelWidth:100, inputWidth:100, offsetLeft: 0, options:[
			        {value: "1", text: "SI"},
			        {value: "2", text: "NO"}
			    ]},
			    {type:"newcolumn"},
			    {type: "calendar", name: "147", label: "147 Da&nbsp;&nbsp;<i class='fa fa-calendar'></i> riscontrare entro", labelWidth:100, inputWidth:100, enableTime: false, enableTodayButton: true, calendarPosition: "right", offsetLeft: 10, dateFormat:"%d-%m-%Y", serverDateFormat:"%d-%m-%Y"},
			    {type:"newcolumn"},
			    {type: "select", name:"150", label: "150 Stato riscontro", labelWidth:70, inputWidth:130, offsetLeft: 10, options:[
			        {value: "0", text: ""}
			    ]},
			]},
			{type: "label", label: "Prot riscontro (Riscontrato da)"},
			{type:"container", name: "gRiscontriDa", inputWidth: 630, inputHeight: 100},
			{type: "block", blockOffset:0, width: 640, list:[
			    {type: "button", name: "btnAddRiscontro", value: "<i class='fa fa-plus'></i>&nbsp;&nbsp;Aggiungi Prot. da riscontrare", offsetLeft: 0, width: 312},
			    {type:"newcolumn"},
			    {type: "button", name: "btnDelRiscontro", value: "<i class='fa fa-trash'></i>&nbsp;&nbsp;Elimina Prot. da riscontrare", offsetLeft: 0, width: 312},
			]},

	    ]},

	    {type: "fieldset",  name: "set4", label: "Distribuzione", width:690, list:[
		    {type:"container", name: "gDistribuzione", inputWidth: 630, inputHeight: 100},
		    {type: "block", blockOffset:0, width: 640, list:[
			    {type: "button", name: "btnAddDistribuzione", value: "<i class='fa fa-plus'></i>&nbsp;&nbsp;Aggiungi nominativo", offsetLeft: 0, width: 312},
			    {type:"newcolumn"},
			    {type: "button", name: "btnDelDistribuzione", value: "<i class='fa fa-trash'></i>&nbsp;&nbsp;Elimina nominativo", offsetLeft: 0, width: 312},
			]},
	    ]},

	    {type: "fieldset",  name: "doc", label: "Documenti allegati", width:690, list:[
		    {type:"container", name: "gDocument", inputWidth: 630, inputHeight: 200},
		    {type: "block", blockOffset:0, width: 640, list:[
			    {type: "button", name: "btnUpload", value: "<i class='fa fa-upload'></i>&nbsp;&nbsp;Aggiungi documento/i", offsetLeft: 0, width: 206},
			    {type:"newcolumn"},
			    {type: "button", name: "btnDelete", value: "<i class='fa fa-trash'></i>&nbsp;&nbsp;Elimina  documento/i", offsetLeft: 0, width: 206},
			    {type:"newcolumn"},
			    {type: "button", name: "btnDownload", value: "<i class='fa fa-download'></i>&nbsp;&nbsp;Scarica documento/i", offsetLeft: 0, width: 206},
			]},
	    ]},

    	{type: "label", label: ""},
	];

	wForm = winNew.attachForm(formStr);

	// Caricamento combo e select box dinamiche **********************************************
	loadList('listCDC', '5', formData);
	loadList('listLinee', '25', formData);
	loadList('listTipoprotocollo', '15', formData);
	loadList('listMezziinvio', '55', formData);
	loadList('listTipodocumento', '60', formData);
	loadList('listStatoriscontro', '150', formData);

	// POPOLATE DATA IN EDIT VIEW
	if(idProt!=null){
		wForm.setItemValue("35",formData[0].codprotocollo);
		wForm.setItemValue("20",formData[0].dataprotcollo);
		wForm.setItemValue("30",formData[0].numero);
		wForm.setItemValue("40",formData[0].oggetto);
		wForm.setItemValue("80",formData[0].protmittente);
		wForm.setItemValue("85",formData[0].dataprotmittente);
		wForm.setItemValue("147",formData[0].datariscontrare);
	}


	// Ditte
	window.dhx.ajax.post("php/ditte.php", "opt=listDitte", function(r) {
	    var res = window.dhx.s2j(r.xmlDoc.responseText);
	    var resultset = res.resultset;
	    if(resultset != null){

	    	var i;
		    for(i = wForm.getSelect('65').options.length - 1 ; i >= 0 ; i--){
		        wForm.getSelect('65').remove(i);
		    }
	    	wForm.getSelect('65').options.add(new Option('', 0 ));

	    	for(var i=0; i<resultset.length; i++){
		    	wForm.getSelect('65').options.add(new Option(resultset[i].ragionesociale, resultset[i].id));
		    	wForm.getSelect('45').options.add(new Option(resultset[i].ragionesociale, resultset[i].id));
		    	wForm.getSelect('50').options.add(new Option(resultset[i].ragionesociale, resultset[i].id));
	    	}

	    	if(formData!=null){
	    		wForm.setItemValue("65",formData[0].idsocietamittente);
	    	}

	    }else{
	    	dhtmlx.alert({
				title:"Error",
				type:"alert-error",
				width: "460px",
				text:"<div style='text-align:justify'>" + r.xmlDoc.responseText+"</div>"
			});
	    }
    });

    // Ruoli
	window.dhx.ajax.post("php/utenti.php", "opt=listRuoli", function(r) {
	    var res = window.dhx.s2j(r.xmlDoc.responseText);
	    var resultset = res.resultset;
	    if(resultset != null){

	    	var i;
		    for(i = wForm.getSelect('68').options.length - 1 ; i >= 0 ; i--){
		        wForm.getSelect('68').remove(i);
		    }
	    	wForm.getSelect('68').options.add(new Option('', 0 ));

	    	for(var i=0; i<resultset.length; i++){
		    	wForm.getSelect('68').options.add(new Option(resultset[i].description, resultset[i].id));
	    	}

	    	if(formData!=null){
	    		wForm.setItemValue("68",formData[0].idruolomittente);

	    		//load funzione
	    		loadFunzione(formData[0].idruolomittente);
	    	}

	    }else{
	    	dhtmlx.alert({
				title:"Error",
				type:"alert-error",
				width: "460px",
				text:"<div style='text-align:justify'>" + r.xmlDoc.responseText+"</div>"
			});
	    }
    });

	//****************************************************************************************

	function loadNominativo(idDitta, idRuolo, idFunzione){
		// Load Nominativo
		window.dhx.ajax.post("php/corrispondenze.php", "opt=getNominativo&idFunzione="+idFunzione+"&idRuolo="+idRuolo+"&idDitta="+idDitta, function(r) {
		    var res = window.dhx.s2j(r.xmlDoc.responseText);
		    var resultset = res.resultset;
		    if(resultset != null){

		    	var i;
			    for(i = wForm.getSelect('75').options.length - 1 ; i >= 0 ; i--){
			        wForm.getSelect('75').remove(i);
			    }

		    	for(var i=0; i<resultset.length; i++){
			    	wForm.getSelect('75').options.add(new Option(resultset[i].cognome+' '+resultset[i].nome, resultset[i].id));
		    	}

		    	if(resultset.length==0){
			    	wForm.getSelect('75').options.add(new Option('', 0));
		    	}

		    	if(formData!=null){
		    		wForm.setItemValue("75",formData[0].idfirmatario);
		    	}

		    }else{
		    	dhtmlx.alert({
					title:"Error",
					type:"alert-error",
					width: "460px",
					text:"<div style='text-align:justify'>" + r.xmlDoc.responseText+"</div>"
				});
		    }
	    });
	}

	//****************************************************************************************

	function loadFunzione(idRuolo){
		window.dhx.ajax.post("php/utenti.php", "opt=listFunzioni&idRuolo="+idRuolo, function(r) {
			    var res = window.dhx.s2j(r.xmlDoc.responseText);
			    var resultset = res.resultset;
			    if(resultset != null){

			    	if(resultset.length==0){
				    	// Load Nominativo
				    	loadNominativo(wForm.getItemValue('65'), wForm.getItemValue('68'), 0);
			    	}

			    	var i;
				    for(i = wForm.getSelect('70').options.length - 1 ; i >= 0 ; i--){
				        wForm.getSelect('70').remove(i);
				    }
			    	wForm.getSelect('70').options.add(new Option('', 0 ));

			    	for(var i=0; i<resultset.length; i++){
				    	wForm.getSelect('70').options.add(new Option(resultset[i].description, resultset[i].id));
			    	}

			    	if(formData!=null){
			    		wForm.setItemValue("70",formData[0].idfunzionemittente);

			    		// load mittente
			    		loadNominativo(wForm.getItemValue('65'), wForm.getItemValue('68'), formData[0].idfunzionemittente);
			    	}

			    }else{
			    	dhtmlx.alert({
						title:"Error",
						type:"alert-error",
						width: "460px",
						text:"<div style='text-align:justify'>" + r.xmlDoc.responseText+"</div>"
					});
			    }
		    });
	}

	wForm.attachEvent("onChange", function(name, value){
		if(name=='5'){
			wForm.setItemValue('10', wForm.getSelect('5').options[wForm.getSelect('5').selectedIndex].innerHTML.split(' | ')[1]);
		}
		if(name=='68'){
			// Load Funzione
			loadFunzione(value);
		}
		if(name=='70'){
			// Load Nominativo
			loadNominativo(wForm.getItemValue('65'), wForm.getItemValue('68'), value);
		}

		if(name=='5'||name=='15'||name=='30'||name=='25'){
			wForm.setItemValue('35', wForm.getSelect('5').options[wForm.getSelect('5').selectedIndex].innerHTML.split(' | ')[0]+(wForm.getItemValue('15')==1?'E':'U')+'-'+(wForm.getItemValue('30')!=''?wForm.getItemValue('30'):'???')+'-'+wForm.getSelect('25').options[wForm.getSelect('25').selectedIndex].innerHTML.split(' | ')[0]);
		}
	});

	wForm.attachEvent('onButtonClick', function(id){
		switch(id) {
			case "btnAddDest":
				var arr = gDestinatari.getAllRowIds("|").split('|');
				var lastId = arr.pop();
				if(lastId==''){lastId=0;}
				gDestinatari.addRow(eval(lastId)+1,["Seleziona...", "Seleziona...", "Seleziona...", "Seleziona...", false]);
				var destCombo = gDestinatari.cells(eval(lastId)+1,0).getCellCombo();
				var ruoloCombo = gDestinatari.cells(eval(lastId)+1,1).getCellCombo();
				var funzCombo = gDestinatari.cells(eval(lastId)+1,2).getCellCombo();
				var nomeCombo = gDestinatari.cells(eval(lastId)+1,3).getCellCombo();

				// Combo societa
				window.dhx.ajax.post("php/ditte.php", "opt=listDitte", function(r) {
				    var res = window.dhx.s2j(r.xmlDoc.responseText);
				    var resultset = res.resultset;

			    	for(var i=0; i<resultset.length; i++){
				    	destCombo.addOption([
						    [resultset[i].id,resultset[i].ragionesociale]
						]);
			    	}
			    });

			    // Combo ruolo
				window.dhx.ajax.post("php/utenti.php", "opt=listRuoli", function(r) {
				    var res = window.dhx.s2j(r.xmlDoc.responseText);
				    var resultset = res.resultset;

			    	for(var i=0; i<resultset.length; i++){
				    	ruoloCombo.addOption([
						    [resultset[i].id,resultset[i].description]
						]);
			    	}
			    });
			    ruoloCombo.attachEvent("onChange", function(value, text){
				    // Combo funzione
					window.dhx.ajax.post("php/utenti.php", "opt=listFunzioni&idRuolo="+value, function(r) {
					    var res = window.dhx.s2j(r.xmlDoc.responseText);
					    var resultset = res.resultset;
					    funzCombo.clearAll();
				    	for(var i=0; i<resultset.length; i++){
					    	funzCombo.addOption([
							    [resultset[i].id,resultset[i].description]
							]);
				    	}

				    	if(resultset.length==0){
					    	// Combo nominativo
							window.dhx.ajax.post("php/corrispondenze.php", "opt=getNominativo&idFunzione=0&idRuolo="+ruoloCombo.getSelectedValue()+"&idDitta="+destCombo.getSelectedValue(), function(r) {
							    var res = window.dhx.s2j(r.xmlDoc.responseText);
							    var resultset = res.resultset;
							    nomeCombo.clearAll();
						    	for(var i=0; i<resultset.length; i++){
							    	nomeCombo.addOption([
									    [resultset[i].id,resultset[i].cognome+' '+resultset[i].nome]
									]);
						    	}
						    });
				    	}

				    	//Combo nominativo
						funzCombo.attachEvent("onChange", function(value, text){
						    // Combo nominativo
							window.dhx.ajax.post("php/corrispondenze.php", "opt=getNominativo&idFunzione="+value+"&idRuolo="+ruoloCombo.getSelectedValue()+"&idDitta="+destCombo.getSelectedValue(), function(r) {
							    var res = window.dhx.s2j(r.xmlDoc.responseText);
							    var resultset = res.resultset;
							    nomeCombo.clearAll();
						    	for(var i=0; i<resultset.length; i++){
							    	nomeCombo.addOption([
									    [resultset[i].id,resultset[i].cognome+' '+resultset[i].nome]
									]);
						    	}
						    });

						});

				    });
				});


			break;
			case "btnDelDest":
				if(gDestinatari.getSelectedRowId()){
					gDestinatari.deleteRow(gDestinatari.getSelectedRowId());
				}
			break;
			case "btnAddWBS":
				var arr = gWBS.getAllRowIds("|").split('|');
				var lastId = arr.pop();
				if(lastId==''){lastId=0;}
				gWBS.addRow(eval(lastId)+1,["0", "Seleziona...", ""]);
				var wbsCombo = gWBS.cells(eval(lastId)+1,1).getCellCombo();

				window.dhx.ajax.post("php/wbs.php", "opt=listWBS", function(r) {
				    var res = window.dhx.s2j(r.xmlDoc.responseText);
				    var resultset = res.resultset;

			    	for(var i=0; i<resultset.length; i++){
				    	wbsCombo.addOption([
						    [resultset[i].id,resultset[i].codicewbs,resultset[i].descrizione]
						]);
			    	}
			    });

			    wbsCombo.attachEvent("onChange", function(value, text){
				    gWBS.cellById(eval(lastId)+1,0).setValue(value);
				    gWBS.cellById(eval(lastId)+1,2).setValue(wbsCombo.getOption(value).css);
				});
			break;
			case "btnDelWBS":
				if(gWBS.getSelectedRowId()){
					gWBS.deleteRow(gWBS.getSelectedRowId());
				}
			break;
			case "btnAddClassificazione":
				var arr = gClassificazione.getAllRowIds("|").split('|');
				var lastId = arr.pop();
				if(lastId==''){lastId=0;}
				gClassificazione.addRow(eval(lastId)+1,["Seleziona...", "Seleziona...", "Seleziona..."]);
				var argomentoCombo = gClassificazione.cells(eval(lastId)+1,0).getCellCombo();
				var tipologiaCombo = gClassificazione.cells(eval(lastId)+1,1).getCellCombo();
				var dossierCombo = gClassificazione.cells(eval(lastId)+1,2).getCellCombo();

				window.dhx.ajax.post("php/corrispondenze.php", "opt=listArgomento", function(r) {
				    var res = window.dhx.s2j(r.xmlDoc.responseText);
				    var resultset = res.resultset;

			    	for(var i=0; i<resultset.length; i++){
				    	argomentoCombo.addOption([
						    [resultset[i].id,resultset[i].codice,resultset[i].descrizione]
						]);
			    	}
			    });

			    window.dhx.ajax.post("php/corrispondenze.php", "opt=listTipologia", function(r) {
				    var res = window.dhx.s2j(r.xmlDoc.responseText);
				    var resultset = res.resultset;

			    	for(var i=0; i<resultset.length; i++){
				    	tipologiaCombo.addOption([
						    [resultset[i].id,resultset[i].codice,resultset[i].descrizione]
						]);
			    	}
			    });

				window.dhx.ajax.post("php/dossier.php", "opt=listDossier", function(r) {
				    var res = window.dhx.s2j(r.xmlDoc.responseText);
				    var resultset = res.resultset;

			    	for(var i=0; i<resultset.length; i++){
				    	dossierCombo.addOption([
						    [resultset[i].id,resultset[i].codice,resultset[i].descrizione]
						]);
			    	}
			    });

			break;
			case "btnDelClassificazione":
				if(gClassificazione.getSelectedRowId()){
					gClassificazione.deleteRow(gClassificazione.getSelectedRowId());
				}
			break;
			case "btnAddRiscontro":
				var arr = gRiscontriDa.getAllRowIds("|").split('|');
				var lastId = arr.pop();
				if(lastId==''){lastId=0;}
				gRiscontriDa.addRow(eval(lastId)+1,["Seleziona...", ""]);

				var riscCombo = gRiscontriDa.cells(eval(lastId)+1,0).getCellCombo();

				window.dhx.ajax.post("php/corrispondenze.php", "opt=listProtocolli", function(r) {
				    var res = window.dhx.s2j(r.xmlDoc.responseText);
				    var resultset = res.resultset;

			    	for(var i=0; i<resultset.length; i++){
				    	riscCombo.addOption([
						    [resultset[i].id,resultset[i].codprotocollo,resultset[i].descrizione]
						]);
			    	}
			    });

			    riscCombo.attachEvent("onChange", function(value, text){
				    gRiscontriDa.cellById(eval(lastId)+1,1).setValue(riscCombo.getOption(value).css);
				});

			break;
			case "btnDelRiscontro":
				if(gRiscontriDa.getSelectedRowId()){
					gRiscontriDa.deleteRow(gRiscontriDa.getSelectedRowId());
				}
			break;
			case "btnAddDistribuzione":
				var arr = gDistribuzione.getAllRowIds("|").split('|');
				var lastId = arr.pop();
				if(lastId==''){lastId=0;}
				gDistribuzione.addRow(eval(lastId)+1,["Seleziona...", "Inserisci...", true, true]);

				var distCombo = gDistribuzione.cells(eval(lastId)+1,0).getCellCombo();

				window.dhx.ajax.post("php/utenti.php", "opt=listUtenti", function(r) {
				    var res = window.dhx.s2j(r.xmlDoc.responseText);
				    var resultset = res.resultset;

			    	for(var i=0; i<resultset.length; i++){
				    	distCombo.addOption([
						    [resultset[i].id,resultset[i].cognome+' '+resultset[i].nome,resultset[i].mail]
						]);
			    	}
			    });

			    distCombo.attachEvent("onChange", function(value, text){
				    gDistribuzione.cellById(eval(lastId)+1,1).setValue(distCombo.getOption(value).css);
				});

			break;
			case "btnDelDistribuzione":
				if(gDistribuzione.getSelectedRowId()){
					gDistribuzione.deleteRow(gDistribuzione.getSelectedRowId());
				}
			break;

			case "btnUpload":
				if(idProt==null){
					dhtmlx.alert({
						title:"Error",
						type:"alert-error",
						width: "460px",
						text:"<div style='text-align:justify'>Attenzione!!<BR>Per poter caricare correttamente degli allegati e' necessario prima salvare il protocollo.</div>"
					});
				}else{
					openAddDoc();
				}
			break;
			case "btnDownload":
				var arrExportDoc = new Array();

				for(var i=0; i<gDocument.getCheckedRows(1).split(',').length; i++){
					arrExportDoc.push(gDocument.cells(gDocument.getCheckedRows(1).split(',')[i],0).getValue());
				}

				//download
				var downloadUrl = "php/download.php?opt=corrispondenze&arrayDoc="+JSON.stringify(arrExportDoc);
				var downloadFrame = document.createElement("iframe");
				downloadFrame.setAttribute('src',downloadUrl);
				downloadFrame.setAttribute('class',"hiddenframe");
				document.body.appendChild(downloadFrame);

			break;
			case "btnDelete":

				dhtmlx.message({
				    type:"confirm",
				    text: "Sei sicuro di voler eliminare questo elemento?",
				    callback: function(id) {
				    	if(id){
				    		// Delete doc -------------------------------------------------------------------------
					    	var arrExportDoc = new Array();

							for(var i=0; i<gDocument.getCheckedRows(1).split(',').length; i++){
								arrExportDoc.push(gDocument.cells(gDocument.getCheckedRows(1).split(',')[i],0).getValue());
							}

							window.dhx.ajax.post("php/corrispondenze.php", "opt=deleteDoc&arrayDoc="+JSON.stringify(arrExportDoc)+"&iduser="+top.userId, function(r) {
							    var res = window.dhx.s2j(r.xmlDoc.responseText);
							    if(res == 1){
							    	dhtmlx.message({
							    		type : "myMessageOK",
							    		text : "Documento eliminato con successo"
							    	});

									gDocument.clearAll();
									gDocument.load("php/corrispondenze.php?opt=tableAttach&idProtocollo="+idProt);
							    }else{
							    	dhtmlx.alert({
										title:"Error",
										type:"alert-error",
										width: "460px",
										text:"<div style='text-align:justify'>" + r.xmlDoc.responseText+"</div>"
									});
							    }
						    });
						    //-------------------------------------------------------------------------------------

					    }
				    }
				});




			break;
		}
	});

	// GRIGLIA DESTINATARI
	var gDestinatari = new dhtmlXGridObject(wForm.getContainer("gDestinatari"));
	gDestinatari.setHeader(["90 Societa'","98 Ruolo","95 Funzione","100 Nominativo","105 p.c."]);
	gDestinatari.setImagePath("codebase/imgs/");
	gDestinatari.setColTypes("combo,combo,combo,combo,ch");
	gDestinatari.setColumnIds('ditta,ruolo,funzione,utente,pc');

	gDestinatari.setColSorting('str,str,str,str,str');
	gDestinatari.setInitWidths('140,140,140,140,80');
	//gDestinatari.setColumnHidden(0,true);
	gDestinatari.enableSmartRendering(false);
	gDestinatari.enableMultiselect(false);

	gDestinatari.init();

	if(arrDest){

		var row = 1;
		for(var kk=0; kk<arrDest.length; kk++){
			gDestinatari.addRow(row," , , , , ,false");
			row++;
		}

		// Combo societa
		window.dhx.ajax.post("php/ditte.php", "opt=listDitte", function(r) {
		    var res = window.dhx.s2j(r.xmlDoc.responseText);
		    var resultset = res.resultset;
		    var row = 1;
		    for(var kk=0; kk<arrDest.length; kk++){
		    	for(var i=0; i<resultset.length; i++){
			    	gDestinatari.cells(row,0).getCellCombo().addOption([
					    [resultset[i].id,resultset[i].ragionesociale]
					]);
		    	}

		    	gDestinatari.cells(row,0).setValue(arrDest[kk].idditta);
		    	row++;
		    }

	    });


	    // Combo ruolo
		window.dhx.ajax.post("php/utenti.php", "opt=listRuoli", function(r) {
		    var res = window.dhx.s2j(r.xmlDoc.responseText);
		    var resultset = res.resultset;
		    var row = 1;
		    for(var kk=0; kk<arrDest.length; kk++){
		    	for(var i=0; i<resultset.length; i++){
			    	gDestinatari.cells(row,1).getCellCombo().addOption([
					    [resultset[i].id,resultset[i].description]
					]);
		    	}
		    	gDestinatari.cells(row,1).setValue(arrDest[kk].idruolo);

		    	//load funzione if exist ruolo
		    	window.dhx.ajax.post("php/utenti.php", "opt=listFunzioni&idRuolo="+arrDest[kk].idruolo, function(r) {
				    var res = window.dhx.s2j(r.xmlDoc.responseText);
				    var resultset = res.resultset;
				    var row = 1;
				    for(var kk=0; kk<arrDest.length; kk++){
					    gDestinatari.cells(row,2).getCellCombo().clearAll();
				    	for(var i=0; i<resultset.length; i++){
					    	gDestinatari.cells(row,2).getCellCombo().addOption([
							    [resultset[i].id,resultset[i].description]
							]);
				    	}
				    	gDestinatari.cells(row,2).setValue(arrDest[kk].idfunzione);

				    	row++;
				    }


			    });
		    	//----------------------------

		    	row++;
		    }
	    });

	    // Combo funzione
	    var row = 1;
		for(var kk=0; kk<arrDest.length; kk++){
		    gDestinatari.cells(row,1).getCellCombo().attachEvent("onChange", function(value, text){

				window.dhx.ajax.post("php/utenti.php", "opt=listFunzioni&idRuolo="+value, function(r) {
				    var res = window.dhx.s2j(r.xmlDoc.responseText);
				    var resultset = res.resultset;
				    var row = 1;
				    for(var kk=0; kk<arrDest.length; kk++){
					    gDestinatari.cells(row,2).getCellCombo().clearAll();
				    	for(var i=0; i<resultset.length; i++){
					    	gDestinatari.cells(row,2).getCellCombo().addOption([
							    [resultset[i].id,resultset[i].description]
							]);
				    	}
				    	row++;
				    }

			    	if(resultset.length==0){
				    	// Combo nominativo
						window.dhx.ajax.post("php/corrispondenze.php", "opt=getNominativo&idFunzione=0&idRuolo="+gDestinatari.cells(gDestinatari.getSelectedRowId(),1).getCellCombo().getSelectedValue()+"&idDitta="+gDestinatari.cells(gDestinatari.getSelectedRowId(),0).getCellCombo().getSelectedValue(), function(r) {
						    var res = window.dhx.s2j(r.xmlDoc.responseText);
						    var resultset = res.resultset;
						    var row = 1;
						    for(var kk=0; kk<arrDest.length; kk++){
						    	gDestinatari.cells(row,3).getCellCombo().clearAll();
						    	for(var i=0; i<resultset.length; i++){
							    	gDestinatari.cells(row,3).getCellCombo().addOption([
									    [resultset[i].id,resultset[i].cognome+' '+resultset[i].nome]
									]);
						    	}
						    	row++;
						    }
					    });
			    	}

			    	/*
			    	//Combo nominativo
					gDestinatari.cells(gDestinatari.getSelectedRowId(),2).getCellCombo().attachEvent("onChange", function(value, text){
					    // Combo nominativo
						window.dhx.ajax.post("php/corrispondenze.php", "opt=getNominativo&idFunzione="+value+"&idRuolo="+gDestinatari.cells(gDestinatari.getSelectedRowId(),1).getCellCombo().getSelectedValue()+"&idDitta="+gDestinatari.cells(gDestinatari.getSelectedRowId(),0).getCellCombo().getSelectedValue(), function(r) {
						    var res = window.dhx.s2j(r.xmlDoc.responseText);
						    var resultset = res.resultset;
						    var row = 1;
						    for(var kk=0; kk<arrDest.length; kk++){
						    	gDestinatari.cells(row,3).getCellCombo().clearAll();
						    	for(var i=0; i<resultset.length; i++){
							    	gDestinatari.cells(row,3).getCellCombo().addOption([
									    [resultset[i].id,resultset[i].cognome+' '+resultset[i].nome]
									]);
						    	}
						    	row++;
						    }
					    });

					});
					*/


			    });
			});

			row++;
		}

		// Combo nominativo
		window.dhx.ajax.post("php/utenti.php", "opt=listUtenti", function(r) {
		    var res = window.dhx.s2j(r.xmlDoc.responseText);
		    var resultset = res.resultset;
		    var row = 1;
		    for(var kk=0; kk<arrDest.length; kk++){
		    	gDestinatari.cells(row,3).getCellCombo().clearAll();
		    	for(var i=0; i<resultset.length; i++){
			    	gDestinatari.cells(row,3).getCellCombo().addOption([
					    [resultset[i].id,resultset[i].cognome+' '+resultset[i].nome]
					]);
		    	}
		    	gDestinatari.cells(row,3).setValue(arrDest[kk].idnominativo);
		    	row++;
		    }
	    });

	    // Per conoscenza
	    var row = 1;
    	for(var kk=0; kk<arrDest.length; kk++){
	    	gDestinatari.cells(row,4).setValue(arrDest[kk].perconoscenza=='t'?true:false);
	    	row++;
    	}

	}



	// GRIGLIA WBS
	var gWBS = new dhtmlXGridObject(wForm.getContainer("gWBS"));
	gWBS.setHeader(["id","110 WBS","115 Descrizione"]);
	gWBS.setImagePath("codebase/imgs/");
	gWBS.setColTypes("ro,combo,ro");
	gWBS.setColumnIds('id,codice,descrizione');

	gWBS.setColSorting('str,str,str');
	gWBS.setInitWidths('50,170,440');
	gWBS.setColumnHidden(0,true);
	gWBS.enableSmartRendering(false);
	gWBS.enableMultiselect(false);

	gWBS.init();

	if(arrWbs){

		var row = 1;
		for(var kk=0; kk<arrWbs.length; kk++){
			gWBS.addRow(arrWbs[kk].idwbs," , ");
			row++;
		}

		window.dhx.ajax.post("php/wbs.php", "opt=listWBS", function(r) {
		    var res = window.dhx.s2j(r.xmlDoc.responseText);
		    var resultset = res.resultset;
		    var row = 1;
		    for(var kk=0; kk<arrWbs.length; kk++){
		    	for(var i=0; i<resultset.length; i++){
			    	gWBS.cells(arrWbs[kk].idwbs,1).getCellCombo().addOption([
					    [resultset[i].id,resultset[i].codicewbs,resultset[i].descrizione]
					]);
		    	}

		    	gWBS.cells(arrWbs[kk].idwbs,0).setValue(arrWbs[kk].idwbs);
		    	gWBS.cells(arrWbs[kk].idwbs,1).setValue(arrWbs[kk].idwbs);
		    	gWBS.cells(arrWbs[kk].idwbs,2).setValue(gWBS.cells(arrWbs[kk].idwbs,1).getCellCombo().getOption(arrWbs[kk].idwbs).css);

		    	gWBS.cells(arrWbs[kk].idwbs,1).getCellCombo().attachEvent("onChange", function(value, text){
				    gWBS.cellById(gWBS.getSelectedRowId(),0).setValue(value);
				    gWBS.cellById(gWBS.getSelectedRowId(),2).setValue(gWBS.cells(gWBS.getSelectedRowId(),1).getCellCombo().getOption(value).css);
				});

		    	row++;
		    }

	    });


    }

	// GRIGLIA CLASSIFICAZIONE
	var gClassificazione = new dhtmlXGridObject(wForm.getContainer("gClassificazione"));
	gClassificazione.setHeader(["120 Argomento","125 Tipologia","130 Dossier"]);
	gClassificazione.setImagePath("codebase/imgs/");
	gClassificazione.setColTypes("combo,combo,combo");
	gClassificazione.setColumnIds('argomento,tipologia,dossier');

	gClassificazione.setColSorting('str,str,str');
	gClassificazione.setInitWidths('203,203,203');
	//gClassificazione.setColumnHidden(0,true);
	gClassificazione.enableSmartRendering(false);
	gClassificazione.enableMultiselect(false);

	gClassificazione.init();


	if(arrClass){

		var row = 1;
		for(var kk=0; kk<arrClass.length; kk++){
			gClassificazione.addRow(row," , , ");
			row++;
		}

		window.dhx.ajax.post("php/corrispondenze.php", "opt=listArgomento", function(r) {
		    var res = window.dhx.s2j(r.xmlDoc.responseText);
		    var resultset = res.resultset;
		    var row = 1;
		    for(var kk=0; kk<arrClass.length; kk++){
		    	for(var i=0; i<resultset.length; i++){
			    	gClassificazione.cells(row,0).getCellCombo().addOption([
					    [resultset[i].id,resultset[i].codice,resultset[i].descrizione]
					]);
		    	}
		    	gClassificazione.cells(row,0).setValue(arrClass[kk].idargomento);
		    	row++;
		    }
	    });

	    window.dhx.ajax.post("php/corrispondenze.php", "opt=listTipologia", function(r) {
		    var res = window.dhx.s2j(r.xmlDoc.responseText);
		    var resultset = res.resultset;
		    var row = 1;
		    for(var kk=0; kk<arrClass.length; kk++){
		    	for(var i=0; i<resultset.length; i++){
			    	gClassificazione.cells(row,1).getCellCombo().addOption([
					    [resultset[i].id,resultset[i].codice,resultset[i].descrizione]
					]);
		    	}
		    	gClassificazione.cells(row,1).setValue(arrClass[kk].idtipologia);
		    	row++;
		    }
	    });

		window.dhx.ajax.post("php/dossier.php", "opt=listDossier", function(r) {
		    var res = window.dhx.s2j(r.xmlDoc.responseText);
		    var resultset = res.resultset;
		    var row = 1;
		    for(var kk=0; kk<arrClass.length; kk++){
		    	for(var i=0; i<resultset.length; i++){
			    	gClassificazione.cells(row,2).getCellCombo().addOption([
					    [resultset[i].id,resultset[i].codice,resultset[i].descrizione]
					]);
		    	}
		    	gClassificazione.cells(row,2).setValue(arrClass[kk].iddossier);
		    	row++;
		    }
	    });


	}



	// GRIGLIA RISCONTRI DA
	var gRiscontriDa = new dhtmlXGridObject(wForm.getContainer("gRiscontriDa"));
	gRiscontriDa.setHeader(["155 Prot. riscontro","160 Stato riscontro"]);
	gRiscontriDa.setImagePath("codebase/imgs/");
	gRiscontriDa.setColTypes("combo,ro");
	gRiscontriDa.setColumnIds('protrisc,stato');

	gRiscontriDa.setColSorting('str,str');
	gRiscontriDa.setInitWidths('304,304');
	//gRiscontriDa.setColumnHidden(0,true);
	gRiscontriDa.enableSmartRendering(false);
	gRiscontriDa.enableMultiselect(false);

	gRiscontriDa.init();

	if(arrProt){

		var row = 1;
		for(var kk=0; kk<arrProt.length; kk++){
			gRiscontriDa.addRow(row," , , ");
			row++;
		}

		window.dhx.ajax.post("php/corrispondenze.php", "opt=listProtocolli", function(r) {
		    var res = window.dhx.s2j(r.xmlDoc.responseText);
		    var resultset = res.resultset;
		    var row = 1;
		    for(var kk=0; kk<arrProt.length; kk++){
		    	for(var i=0; i<resultset.length; i++){
			    	gRiscontriDa.cells(row,0).getCellCombo().addOption([
					    [resultset[i].id,resultset[i].codprotocollo,resultset[i].descrizione]
					]);
		    	}
		    	gRiscontriDa.cells(row,0).setValue(arrProt[kk].idprotocollorisc);
		    	gRiscontriDa.cells(row,1).setValue(gRiscontriDa.cells(row,0).getCellCombo().getOption(arrProt[kk].idprotocollorisc).css);

		    	gRiscontriDa.cells(row,0).getCellCombo().attachEvent("onChange", function(value, text){
				    gRiscontriDa.cells(gRiscontriDa.getSelectedRowId(),1).setValue(gRiscontriDa.cells(gRiscontriDa.getSelectedRowId(),0).getCellCombo().getOption(value).css);
				});

		    	row++;
		    }
	    });

	}


	// GRIGLIA DISTRIBUZIONE
	var gDistribuzione = new dhtmlXGridObject(wForm.getContainer("gDistribuzione"));
	gDistribuzione.setHeader(["165 Nominativo","167 Mail","170 competenza","175 conoscenza"]);
	gDistribuzione.setImagePath("codebase/imgs/");
	gDistribuzione.setColTypes("combo,ed,ch,ch");
	gDistribuzione.setColumnIds('utente,mail,comp,cono');

	gDistribuzione.setColSorting('str,str,str,str');
	gDistribuzione.setInitWidths('152,152,152,152');
	//gDistribuzione.setColumnHidden(0,true);
	gDistribuzione.enableSmartRendering(false);
	gDistribuzione.enableMultiselect(false);

	gDistribuzione.init();

	if(arrDist){

		var row = 1;
		for(var kk=0; kk<arrDist.length; kk++){
			gDistribuzione.addRow(row," , , false, false");
			row++;
		}

		window.dhx.ajax.post("php/utenti.php", "opt=listUtenti", function(r) {
		    var res = window.dhx.s2j(r.xmlDoc.responseText);
		    var resultset = res.resultset;
		    var row = 1;
		    for(var kk=0; kk<arrDist.length; kk++){
		    	for(var i=0; i<resultset.length; i++){
			    	gDistribuzione.cells(row,0).getCellCombo().addOption([
					    [resultset[i].id,resultset[i].cognome+' '+resultset[i].nome,resultset[i].mail]
					]);
		    	}
		    	gDistribuzione.cells(row,0).setValue(arrDist[kk].iduser);
		    	gDistribuzione.cells(row,1).setValue(gDistribuzione.cells(row,0).getCellCombo().getOption(arrDist[kk].iduser).css);

		    	gDistribuzione.cells(row,0).getCellCombo().attachEvent("onChange", function(value, text){
				    gDistribuzione.cells(gDistribuzione.getSelectedRowId(),1).setValue(gDistribuzione.cells(gDistribuzione.getSelectedRowId(),0).getCellCombo().getOption(value).css);
				});

		    	row++;
		    }
	    });

	    // Per conoscenza
	    var row = 1;
    	for(var kk=0; kk<arrDist.length; kk++){
	    	gDistribuzione.cells(row,2).setValue(arrDist[kk].competenza=='t'?true:false);
	    	gDistribuzione.cells(row,3).setValue(arrDist[kk].conoscenza=='t'?true:false);
	    	row++;
    	}

	}


	// GRIGLIA DOCUMENTI
	gDocument = new dhtmlXGridObject(wForm.getContainer("gDocument"));
	gDocument.setHeader(["id",'<i class="fa fa-check" aria-hidden="true"></i>',"Nome file","Data","Dimensione","Principale"]);
	gDocument.setImagePath("codebase/imgs/");
	gDocument.setColTypes("ro,ch,ro,ro,ro,ch");
	gDocument.setColumnIds('id,check,nome,data,dimensione,principale');

	gDocument.setColSorting('str,str,str,str,str,str');
	gDocument.setInitWidths('10,50,220,140,120,100');
	gDocument.setColumnHidden(0,true);
	gDocument.enableSmartRendering(false);
	gDocument.enableMultiselect(false);

	gDocument.init();
	gDocument.load("php/corrispondenze.php?opt=tableAttach&idProtocollo="+idProt);



	winNew.setText("Nuova corrispondenza");
	winNew.setModal(1);

	winNew.centerOnScreen();

}

function openAddDoc(){

	wAddDoc = new dhtmlXWindows();

	winAddDoc = wAddDoc.createWindow('winAddDoc', 0, 0, 720, 450);
	winAddDoc.attachStatusBar({
		text: "<span id='statusToolbarUpload'></span>",
	});
	winAddDocToolbar = new dhtmlXToolbarObject({
		parent: "statusToolbarUpload",
		iconset: "awesome",
		items:[
		    {id: "btnSend", type: "button", text: "Upload", img: "fa fa-floppy-o", imgdis: "fa fa-floppy-o", disabled: false},
		    {id: "sep1", type: "separator" },
		    {id: "btnCancel", type: "button", text: "Chiudi", img: "fa fa-times"}
		]
	});
	winAddDocToolbar.addSeparator('sp', 0);
	winAddDocToolbar.addSpacer('sp');
	var objSend = winAddDocToolbar.objPull[winAddDocToolbar.idPrefix+"btnSend"].obj;
	objSend.style.backgroundColor = "#87e3ff";

	var main_layout = winAddDoc.attachLayout("1C");

	main_layout.setOffsets({
	    top: 0,
	    right: 0,
	    bottom: 30,
	    left: 0
	});

	var a = main_layout.cells('a');
	main_layout.cells('a').hideHeader();
	main_layout.cells('a').fixSize(true, true);

	var wDocForm = a.attachVault({
	    autoStart: false,
	    buttonUpload: false
	});


	wDocForm.attachEvent("onUploadComplete",function(file, extra){

		if((wAddDoc != null) && (wAddDoc.unload)) {
			if((winAddDoc != null) && (winAddDoc.unload)) {
				winAddDoc.hide();
				winAddDoc.unload();
				winAddDoc = null;
			}
			wAddDoc.unload();
			wAddDoc = null;
		}

		var idProt = gCorrispondenza.getSelectedRowId()==null?null:gCorrispondenza.cells(gCorrispondenza.getSelectedRowId(),0).getValue();

		gDocument.clearAll();
		gDocument.load("php/corrispondenze.php?opt=tableAttach&idProtocollo="+idProt);

	});


	winAddDocToolbar.attachEvent('onClick', function(id){
		switch(id) {
			case "btnSend":
				var idProt = gCorrispondenza.getSelectedRowId()==null?null:gCorrispondenza.cells(gCorrispondenza.getSelectedRowId(),0).getValue();
				var code = gCorrispondenza.getSelectedRowId()==null?null:gCorrispondenza.cells(gCorrispondenza.getSelectedRowId(),1).getValue();

				wDocForm.setURL("php/upload.php?opt=protocollo&idProtocollo="+idProt+"&iduser="+top.userId+"&code="+code);
				wDocForm.upload();
			break;
			case "btnCancel":
				if((wAddDoc != null) && (wAddDoc.unload)) {
					if((winAddDoc != null) && (winAddDoc.unload)) {
						winAddDoc.hide();
						winAddDoc.unload();
						winAddDoc = null;
					}
					wAddDoc.unload();
					wAddDoc = null;
				}
			break;
		}
	});




	winAddDoc.setText('Upload new document');
	winAddDoc.setModal(1);

	winAddDoc.button('stick').hide();
	winAddDoc.button('park').hide();
	winAddDoc.button('minmax').hide();
	winAddDoc.centerOnScreen();

}

function loadList(opt, idSB, data){

	window.dhx.ajax.post("php/corrispondenze.php", "opt="+opt, function(r) {
	    var res = window.dhx.s2j(r.xmlDoc.responseText);
	    var resultset = res.resultset;
	    if(resultset != null){

	    	var i;
		    for(i = wForm.getSelect(idSB).options.length - 1 ; i >= 0 ; i--){
		        wForm.getSelect(idSB).remove(i);
		    }
	    	wForm.getSelect(idSB).options.add(new Option('', 0 ));

	    	for(var i=0; i<resultset.length; i++){
	    		if(idSB=='5' || idSB=='25'){
		    		wForm.getSelect(idSB).options.add(new Option(resultset[i].codice+' | '+resultset[i].descrizione, resultset[i].id));
	    		}else{
		    		wForm.getSelect(idSB).options.add(new Option(resultset[i].codice, resultset[i].id));
		    	}
	    	}

	    	if(data!=null){
	    		// Load data
	    		setTimeout(function() {
			    	wForm.setItemValue("5",data[0].idcdc);
			    	wForm.setItemValue('10', wForm.getSelect('5').options[wForm.getSelect('5').selectedIndex].innerHTML.split(' | ')[1]);
			    	wForm.setItemValue("15",data[0].idtipoprotocollo);
			    	wForm.setItemValue("25",data[0].idlinea);
			    	wForm.setItemValue("45",data[0].idgruppocompetenza);
			    	wForm.setItemValue("50",data[0].idgruppoconoscenza);
			    	wForm.setItemValue("55",data[0].idmezzoinvio);
			    	wForm.setItemValue("60",data[0].idtipodocumento);
			    	wForm.setItemValue("145",(data[0].dariscontrare=='t'?'1':'2'));
			    	wForm.setItemValue("150",data[0].idtiporiscontro);
		    	}, 600);
	    	}

	    }else{
	    	dhtmlx.alert({
				title:"Error",
				type:"alert-error",
				width: "460px",
				text:"<div style='text-align:justify'>" + r.xmlDoc.responseText+"</div>"
			});
	    }
    });

}

function doOnLoad() {

	main_layout = new dhtmlXLayoutObject(document.body, '2U');
	main_layout.setOffsets({
	    top: 15,
	    right: 15,
	    bottom: 15,
	    left: 15
	});

	var main = main_layout.cells('a');
	main_layout.cells('a').hideHeader();

	var myToolbar = main_layout.cells('a').attachToolbar({
		iconset: "awesome",
		items:[
		    {id: "btnNew", type: "button", text: "Nuova", img: "fa fa-plus-circle"},
		    {id: "sep1", type: "separator" },
		    {id: "btnEdit", type: "button", text: "Modifica", img: "fa fa-pencil-square-o", imgdis: "fa fa-pencil-square-o", disabled:true},
		    {id: "sep2", type: "separator" },
		    {id: "btnDelete", type: "button", text: "Elimina", img: "fa fa-trash", imgdis: "fa fa-trash", disabled:true}
		]
	});
	//myToolbar.addSpacer("btnDelete");

	myToolbar.attachEvent('onClick', function(id){
		switch(id) {
			case "btnNew":
				openNew(null, null);
			break;
			case "btnEdit":

				var idProt = gCorrispondenza.cells(gCorrispondenza.getSelectedRowId(),0).getValue();

				window.dhx.ajax.post("php/corrispondenze.php", "opt=get&idProt="+idProt, function(r) {
				    var res = window.dhx.s2j(r.xmlDoc.responseText);

				    if(res != null){
				    	openNew(res, idProt);
				    }else{
				    	dhtmlx.alert({
							title:"Error",
							type:"alert-error",
							width: "460px",
							text:"<div style='text-align:justify'>" + r.xmlDoc.responseText+"</div>"
						});
				    }
			    });

			break;
			case "btnDelete":
				dhtmlx.message({
				    type:"confirm",
				    text: "Sei sicuro di voler eliminare questo elemento?",
				    callback: function(id) {
				    	if(id){
				    		var id = (gCorrispondenza.getSelectedRowId()==null?null:gCorrispondenza.cells(gCorrispondenza.getSelectedRowId(),0).getValue());

				    		window.dhx.ajax.post("php/corrispondenze.php", "opt=delete&idProtocollo="+id+"&iduser="+top.userId, function(r) {
							    var res = window.dhx.s2j(r.xmlDoc.responseText);

							    if(res == 1){
							    	gCorrispondenza.clearAll();
							    	gCorrispondenza.load("php/corrispondenze.php?opt=tableCorrispondenze");

							    	dhtmlx.message({
							    		type : "myMessageOK",
							    		text : "Eliminato con successo!"
							    	});
							    }else{
							    	dhtmlx.alert({
										title:"Error",
										type:"alert-error",
										width: "460px",
										text:"<div style='text-align:justify'>" + r.xmlDoc.responseText+"</div>"
									});
							    }
						    });

					    }
				    }
				});
			break;
		}
	});


	// GRIGLIA
	gCorrispondenza = main_layout.cells('a').attachGrid();

	gCorrispondenza.setHeader(["id","Protocollo","CDC","Tipo prot. (E/U)","Linea Prot.","n.Prot.","Data","Oggetto","Mittente","Prot. Mittente","Data prot. mittente","Doc. allegato"]);
	gCorrispondenza.setColTypes("ro,ro,ro,ro,ro,ro,ro,ro,ro,ro,ro,ro");
	gCorrispondenza.setColumnIds('id0,id1,id2,id3,id4,id5,id6,id7,id8,id9,id10,id11');

	gCorrispondenza.setColSorting('str,str,str,str,str,str,str,str,str,str,str,str');
	gCorrispondenza.setInitWidths('20,300,150,200,200,200,300,400,400,400,200,200');
	gCorrispondenza.setColumnHidden(0,true);
	gCorrispondenza.enableSmartRendering(true);
	gCorrispondenza.enableMultiselect(true);

	gCorrispondenza.attachHeader("#select_filter,#select_filter,#select_filter,#select_filter,#select_filter,#select_filter,#select_filter,#select_filter,#select_filter,#select_filter,#select_filter");

	gCorrispondenza.init();
	gCorrispondenza.load("php/corrispondenze.php?opt=tableCorrispondenze");

	gCorrispondenza.attachEvent("onSelectStateChanged", function(id){
		if(gCorrispondenza.getSelectedRowId()!=null){
			myToolbar.enableItem('btnEdit');
			myToolbar.enableItem('btnDelete');
		}else{
			myToolbar.disableItem('btnEdit');
			myToolbar.disableItem('btnDelete');
		}
	});


	layout_insert = main_layout.cells('b');
	layout_insert.setText('<i class="fa fa-plus-square" aria-hidden="true"></i>&nbsp;&nbsp;Inserimento dati');
	layout_insert.collapse();


	// TAB INSERIMENTO DATI
	var formStr = [
    	{type: "fieldset", label: "Seleziona l'oggetto che vuoi editare", name: "block1", offsetLeft:10, offsetTop:10, list:[
    		{type: "select", name:"objSelect", label: "Oggetto", options:[
		        {value: "0", text: ""},
		        {value: "CDC", text: "CDC"},
		        {value: "Linee", text: "Linea protocollo"},
		    ]},
		    {type:"container", name: "gInsertData", inputHeight: 300},
		    {type: "block", blockOffset:0, width: 650, name:"blockField", list:[
		    	{type: "input", name:"code", label: "Codice", value: "", offsetLeft: 10, labelWidth:100},
		    	{type: "input", name:"descrizione", label: "Descrizione", value: "", offsetLeft: 10, labelWidth:100},
		    ]},
	    ]},
	    {type: "block", blockOffset:10, list:[
		    {type: "button", name: "btnSave", value: "<i class='fa fa-floppy-o'></i>&nbsp;&nbsp;Salva", offsetLeft: 0, disabled: true},
		    {type:"newcolumn"},
		    {type: "button", name: "btnDelete", value: "<i class='fa fa-trash'></i>&nbsp;&nbsp;Elimina", offsetLeft: 0, disabled: true},
		    {type:"newcolumn"},
		    {type: "button", name: "btnClean", value: "<i class='fa fa-i-cursor'></i>&nbsp;&nbsp;Svuota", offsetLeft: 0, disabled: false},
		]},
	];

	insertForm = layout_insert.attachForm(formStr);

	insertForm.attachEvent("onChange", function(name, value){
		if(name=="objSelect"){
			idSelectInsertData = value;
			if(value!=0){
				gInsertData.clearAll();
				gInsertData.load("php/corrispondenze.php?opt=table"+value);
				insertForm.enableItem("btnSave");
				insertForm.disableItem("btnDelete");
			}else{
				gInsertData.clearAll();
				insertForm.disableItem("btnSave");
				insertForm.disableItem("btnDelete");
			}
			insertForm.setItemValue('code', '');
			insertForm.setItemValue('descrizione', '');
		}
	});

	insertForm.attachEvent('onButtonClick', function(id){
		switch(id) {
			case "btnSave":
				var id = (gInsertData.getSelectedRowId()==null?null:gInsertData.cells(gInsertData.getSelectedRowId(),0).getValue());

				window.dhx.ajax.post("php/corrispondenze.php", "opt=save"+idSelectInsertData+"&iduser="+top.userId+"&id="+id+"&codice="+insertForm.getItemValue('code')+"&descrizione="+insertForm.getItemValue('descrizione'), function(r) {
				    var res = window.dhx.s2j(r.xmlDoc.responseText);
				    gInsertData.clearAll();
					gInsertData.load("php/corrispondenze.php?opt=table"+idSelectInsertData);
				    if(res == 1){
				    	dhtmlx.message({
				    		type : "myMessageOK",
				    		text : "Salvataggio eseguito con successo"
				    	});
				    	insertForm.setItemValue('code', '');
				    	insertForm.setItemValue('descrizione', '');
				    }else{
				    	dhtmlx.alert({
							title:"Error",
							type:"alert-error",
							width: "460px",
							text:"<div style='text-align:justify'>" + r.xmlDoc.responseText+"</div>"
						});
				    }
			    });
			break;
			case "btnDelete":
				dhtmlx.message({
				    type:"confirm",
				    text: "Sei sicuro di voler eliminare questo elemento?",
				    callback: function(id) {
				    	if(id){
				    		var id = (gInsertData.getSelectedRowId()==null?null:gInsertData.cells(gInsertData.getSelectedRowId(),0).getValue());

				    		window.dhx.ajax.post("php/corrispondenze.php", "opt=delete"+idSelectInsertData+"&id="+id+"&iduser="+top.userId, function(r) {
							    var res = window.dhx.s2j(r.xmlDoc.responseText);

							    if(res == 1){
							    	gInsertData.clearAll();
							    	gInsertData.load("php/corrispondenze.php?opt=table"+idSelectInsertData);
							    	insertForm.disableItem("btnDelete");
									insertForm.setItemValue('code', '');
									insertForm.setItemValue('descrizione', '');

							    	dhtmlx.message({
							    		type : "myMessageOK",
							    		text : "Eliminato con successo!"
							    	});
							    }else{
							    	dhtmlx.alert({
										title:"Error",
										type:"alert-error",
										width: "460px",
										text:"<div style='text-align:justify'>" + r.xmlDoc.responseText+"</div>"
									});
							    }
						    });

					    }
				    }
				});
			break;
			case "btnClean":
				gInsertData.clearAll();
				gInsertData.load("php/corrispondenze.php?opt=table"+idSelectInsertData);
				insertForm.setItemValue('code', '');
				insertForm.setItemValue('descrizione', '');
				insertForm.disableItem("btnDelete");
			break;
		}
	});

	// GRIGLIA DATI
	var gInsertData = new dhtmlXGridObject(insertForm.getContainer("gInsertData"));
	gInsertData.setHeader(["id","Codice","Descrizione"]);
	gInsertData.setImagePath("codebase/imgs/");
	gInsertData.setColTypes("ro,ro,ro");
	gInsertData.setColumnIds('id0,id1,id2');

	gInsertData.setColSorting('str,str,str');
	gInsertData.setInitWidths('10,150,420');
	gInsertData.setColumnHidden(0,true);
	gInsertData.enableSmartRendering(false);
	gInsertData.enableMultiselect(false);

	gInsertData.attachEvent("onSelectStateChanged", function(id){
		insertForm.enableItem("btnSave");
		insertForm.enableItem("btnDelete");
		insertForm.setItemValue('code', gInsertData.cells(gInsertData.getSelectedRowId(),1).getValue());
		insertForm.setItemValue('descrizione', gInsertData.cells(gInsertData.getSelectedRowId(),2).getValue());
	});

	gInsertData.init();

	main_layout.attachEvent("onPanelResizeFinish", function(){
		resizePanel()
    });

    main_layout.attachEvent("onExpand", function(){
    	resizePanel()
    });


}

function resizePanel(){
	insertForm.setItemWidth('block1', (layout_insert.getWidth()-40));
	insertForm.setItemWidth('gInsertData', (layout_insert.getWidth()-80));
	insertForm.setItemWidth('objSelect', (layout_insert.getWidth()-80));
	insertForm.setItemWidth('blockField', (layout_insert.getWidth()-80));

	insertForm.setItemWidth('code', (layout_insert.getWidth()-200));
	insertForm.setItemWidth('descrizione', (layout_insert.getWidth()-200));
}


/**
 * Unload
 * @returns
 */
function doOnUnload() {
	if(main_layout != null && main_layout.unload != null) {
		main_layout.unload();
		main_layout = null;
	}
}
/**
 * Resize event
 * @returns
 */
function doOnResize() {

}
/**
 * Rotate event
 */
window.addEventListener("orientationchange", function() {
	setTimeout(function(){
		doOnResize();
	}, 200);
});
