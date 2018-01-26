var main_layout = null;
var main_menu = null;
var gUser = null;
var arrPermission = null;

function openNew(data, idUser){

	var wNew = new dhtmlXWindows();

	var winNew = wNew.createWindow('winNew', 0, 0, 740, 550);
	winNew.attachStatusBar({
		text: "<span id='statusToolbar'></span>",
	});
	winBtnToolbar = new dhtmlXToolbarObject({
		parent: "statusToolbar",
		iconset: "awesome",
		items:[
		    {id: "btnSend", type: "button", text: "Salva", img: "fa fa-floppy-o"},
		    {id: "sep1", type: "separator" },
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

				arrPermission = new Array();
				arrPermission.push('1|'+wForm.getItemValue('1'));
				arrPermission.push('2|'+wForm.getItemValue('2'));
				arrPermission.push('3|'+wForm.getItemValue('3'));
				arrPermission.push('4|'+wForm.getItemValue('4'));
				arrPermission.push('5|'+wForm.getItemValue('5'));
				arrPermission.push('6|'+wForm.getItemValue('6'));
				arrPermission.push('7|'+wForm.getItemValue('7'));
				arrPermission.push('8|'+wForm.getItemValue('8'));


				if(wForm.validate()){
					if(wForm.getItemValue('psw')!=wForm.getItemValue('psw2')){
						dhtmlx.alert({
							title:"Error",
							type:"alert-error",
							width: "460px",
							text:"<div style='text-align:justify'>il campo \"controllo password\" non coincide con la password inserita.</div>"
						});
						return;
					}
					//SALVO --------------------------------------------------------------------------------------------------
		    		window.dhx.ajax.post("php/utenti.php", "opt=save&iduser="+top.userId+"&id="+idUser+"&arr="+JSON.stringify(wForm.getFormData())+"&arrPermission="+JSON.stringify(arrPermission), function(r) {
					    var res = window.dhx.s2j(r.xmlDoc.responseText);
					    gUser.clearAll();
						gUser.load("php/utenti.php?opt=tableUtenti");
					    if(res == 1){
					    	dhtmlx.message({
					    		type : "myMessageOK",
					    		text : "Utente salvato con successo"
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
				    //--------------------------------------------------------------------------------------------------------
			    }else{
				    dhtmlx.alert({
						title:"Error",
						type:"alert-error",
						width: "460px",
						text:"<div style='text-align:justify'>Riempire tutti i campi obbligatori prima di salvare</div>"
					});
			    }

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
		{type: "fieldset",  name: "field1", label: "Anagrafica Utente", width:690, list:[
			{type: "block", blockOffset:0, width: 650, list:[
		    	{type: "input", name:"cognome", label: "Cognome", value: (data!=null?data[0].cognome:''), offsetLeft: 0, labelWidth:80, inputWidth:220, disabled:false, required:true},
		    	{type:"newcolumn"},
		    	{type: "input", name:"nome", label: "Nome", value: (data!=null?data[0].nome:''), offsetLeft: 20, labelWidth:80, inputWidth:220, disabled:false, required:true},
		    ]},
		    {type: "block", blockOffset:1, width: 650, list:[
		    	{type: "input", name:"username", label: "Username", value: (data!=null?data[0].login:''), offsetLeft: 0, labelWidth:80, inputWidth:545, disabled:true},
		    ]},
		    {type: "block", blockOffset:2, width: 650, list:[
		    	{type: "input", name:"mail", label: "eMail", value: (data!=null?data[0].mail:''), offsetLeft: 0, labelWidth:80, inputWidth:220, disabled:false},
		    	{type:"newcolumn"},
		    	{type: "input", name:"tel", label: "Telefono", value: (data!=null?data[0].telefono:''), offsetLeft: 20, labelWidth:80, inputWidth:220, disabled:false},
		    ]},
		    {type: "block", blockOffset:3, width: 650, list:[
		    	{type: "password", name:"psw", label: "Password", value: "", offsetLeft: 0, labelWidth:80, inputWidth:220, disabled:false, required:(idUser!=null?false:true)},
		    	{type:"newcolumn"},
		    	{type: "password", name:"psw2", label: "Conferma password", value: "", offsetLeft: 20, labelWidth:80, inputWidth:220, disabled:false, required:(idUser!=null?false:true)},
		    ]},
	    ]},

	    {type: "fieldset",  name: "field2", label: "Societa'", width:692, list:[
			{type: "select", name:"societa", label: "Societa'", labelWidth:80, inputWidth:545, options:[
		        {value: "0", text: ""}
		    ]},
		    {type: "select", name:"ruolo", label: "Ruolo", labelWidth:80, inputWidth:545, disabled: true, options:[
		        {value: "0", text: ""}
		    ]},
		    {type: "select", name:"funzione", label: "Funzione", labelWidth:80, inputWidth:545, disabled: true, options:[
		        {value: "0", text: ""}
		    ]},
		    {type: "select", name:"lotto", label: "Lotto", labelWidth:80, inputWidth:200, disabled: false, options:[
		        {value: "0", text: ""}
		    ]},
		    {type: "select", name:"tratta", label: "Tratta", labelWidth:80, inputWidth:200, disabled: false, options:[
		        {value: "0", text: ""}
		    ]},
	    ]},

	    {type: "fieldset",  name: "field3", label: "Gestione permessi", width:690, list:[
	    	{type: "block", blockOffset:4, width: 650, list:[
		    	{type: "checkbox", name: "1", label: "Accesso portale", offsetLeft: 0, labelWidth:130, checked:(data!=null?(data[0].permission[0]==1?true:false):''), checked:true},
		    	{type:"newcolumn"},
		    	{type: "checkbox", name: "2", label: "Amministratore", offsetLeft: 80, labelWidth:130, checked:(data!=null?(data[0].permission[1]==1?true:false):'')},
		    	{type:"newcolumn"},
		    	{type: "checkbox", name: "3", label: "Gestione anagrafiche", offsetLeft: 80, labelWidth:130, checked:(data!=null?(data[0].permission[2]==1?true:false):'')},
		    ]},
		    {type: "block", blockOffset:5, width: 650, list:[

		    	{type: "checkbox", name: "4", label: "Solo inserimento", offsetLeft:0, labelWidth:130, checked:(data!=null?(data[0].permission[3]==1?true:false):'')},
		    	{type:"newcolumn"},
		    	{type: "checkbox", name: "5", label: "Corrispondenze", offsetLeft: 80, labelWidth:130, checked:(data!=null?(data[0].permission[4]==1?true:false):'')},
					{type:"newcolumn"},
					{type: "checkbox", name: "6", label: "Giornale lavori", offsetLeft: 80, labelWidth:130, checked:(data!=null?(data[0].permission[5]==1?true:false):'')},
		    ]},
		    {type: "block", blockOffset:5, width: 650, list:[
		    	{type: "checkbox", name: "7", label: "Accettazione materiali", offsetLeft: 0, labelWidth:130, checked:(data!=null?(data[0].permission[6]==1?true:false):'')},
		    ]},
	    ]},


    	{type: "label", label: ""},

	];

	wForm = winNew.attachForm(formStr);
	wForm.enableLiveValidation(true);

	wForm.attachEvent("onKeyup", function(inp, ev, name, value){
		if(name=='nome' || name=='cognome'){
			 wForm.setItemValue('username', wForm.getItemValue('cognome')+'.'+wForm.getItemValue('nome'));
		}
	});

	wForm.attachEvent("onChange", function(name, value){
		if(name=='societa' && value != '0'){
			wForm.enableItem('ruolo');
		}else if(name=='societa' && value == '0'){
			wForm.disableItem('ruolo');
		}

		if(name=='ruolo' && value != '0'){
			wForm.enableItem('funzione');

			// LOAD LIST FUNZIONE
			window.dhx.ajax.post("php/utenti.php", "opt=listFunzioni&idRuolo="+value, function(r) {
			    var res = window.dhx.s2j(r.xmlDoc.responseText);
			    var resultset = res.resultset;
			    if(resultset != null){

			    	var i;
				    for(i = wForm.getSelect('funzione').options.length - 1 ; i >= 0 ; i--){
				        wForm.getSelect('funzione').remove(i);
				    }
			    	wForm.getSelect('funzione').options.add(new Option('', 0 ));

			    	for(var i=0; i<resultset.length; i++){
				    	wForm.getSelect('funzione').options.add(new Option(resultset[i].description, resultset[i].id));
			    	}


			    	if(data!=null){
				    	wForm.setItemValue("funzione",data[0].idfunzione);
			    	}

			    	if(resultset.length==0){
				    	wForm.disableItem('funzione');
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

		}else if(name=='ruolo' && value == '0'){
			wForm.disableItem('funzione');
		}
	});

	// LOAD LIST SOCIETA'
	window.dhx.ajax.post("php/ditte.php", "opt=listDitte", function(r) {
	    var res = window.dhx.s2j(r.xmlDoc.responseText);
	    var resultset = res.resultset;
	    if(resultset != null){

	    	var i;
		    for(i = wForm.getSelect('societa').options.length - 1 ; i >= 0 ; i--){
		        wForm.getSelect('societa').remove(i);
		    }
	    	wForm.getSelect('societa').options.add(new Option('', 0 ));

	    	for(var i=0; i<resultset.length; i++){
		    	wForm.getSelect('societa').options.add(new Option(resultset[i].ragionesociale, resultset[i].id));
	    	}


	    	if(data!=null){
		    	wForm.setItemValue("societa",data[0].idditta);
		    	if(data[0].idditta!=''){
			    	wForm.enableItem('ruolo');
		    	}
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


    // LOAD LIST RUOLO
	window.dhx.ajax.post("php/utenti.php", "opt=listRuoli", function(r) {
	    var res = window.dhx.s2j(r.xmlDoc.responseText);
	    var resultset = res.resultset;
	    if(resultset != null){

	    	var i;
		    for(i = wForm.getSelect('ruolo').options.length - 1 ; i >= 0 ; i--){
		        wForm.getSelect('ruolo').remove(i);
		    }
	    	wForm.getSelect('ruolo').options.add(new Option('', 0 ));

	    	for(var i=0; i<resultset.length; i++){
		    	wForm.getSelect('ruolo').options.add(new Option(resultset[i].description, resultset[i].id));
	    	}


	    	if(data!=null){
		    	wForm.setItemValue("ruolo",data[0].idruolo);
		    	if(data[0].idruolo!=''){
			    	wForm.enableItem('ruolo');

			    	wForm.enableItem('funzione');

					// LOAD LIST FUNZIONE
					window.dhx.ajax.post("php/utenti.php", "opt=listFunzioni&idRuolo="+data[0].idruolo, function(r) {
					    var res = window.dhx.s2j(r.xmlDoc.responseText);
					    var resultset = res.resultset;
					    if(resultset != null){

					    	var i;
						    for(i = wForm.getSelect('funzione').options.length - 1 ; i >= 0 ; i--){
						        wForm.getSelect('funzione').remove(i);
						    }
					    	wForm.getSelect('funzione').options.add(new Option('', 0 ));

					    	for(var i=0; i<resultset.length; i++){
						    	wForm.getSelect('funzione').options.add(new Option(resultset[i].description, resultset[i].id));
					    	}


					    	if(data!=null){
						    	wForm.setItemValue("funzione",data[0].idfunzione);
					    	}

					    	if(resultset.length==0){
						    	wForm.disableItem('funzione');
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

    // LOAD LIST LOTTO
	window.dhx.ajax.post("php/wbs.php", "opt=listLotto", function(r) {
	    var res = window.dhx.s2j(r.xmlDoc.responseText);
	    var resultset = res.resultset;
	    if(resultset != null){

	    	var i;
		    for(i = wForm.getSelect('lotto').options.length - 1 ; i >= 0 ; i--){
		        wForm.getSelect('lotto').remove(i);
		    }
	    	wForm.getSelect('lotto').options.add(new Option('', 0 ));

	    	for(var i=0; i<resultset.length; i++){
		    	wForm.getSelect('lotto').options.add(new Option(resultset[i].descrizione, resultset[i].id));
	    	}


	    	if(data!=null){
		    	wForm.setItemValue("lotto",data[0].idlotto);
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

    // LOAD LIST TRATTA
	window.dhx.ajax.post("php/wbs.php", "opt=listTratta", function(r) {
	    var res = window.dhx.s2j(r.xmlDoc.responseText);
	    var resultset = res.resultset;
	    if(resultset != null){

	    	var i;
		    for(i = wForm.getSelect('tratta').options.length - 1 ; i >= 0 ; i--){
		        wForm.getSelect('tratta').remove(i);
		    }
	    	wForm.getSelect('tratta').options.add(new Option('', 0 ));

	    	for(var i=0; i<resultset.length; i++){
		    	wForm.getSelect('tratta').options.add(new Option(resultset[i].descrizione, resultset[i].id));
	    	}


	    	if(data!=null){
		    	wForm.setItemValue("tratta",data[0].idtratta);
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



	winNew.setText(idUser!=null?"Utente : "+gUser.cells(gUser.getSelectedRowId(),1).getValue()+" "+gUser.cells(gUser.getSelectedRowId(),2).getValue():"Nuovo utente");
	winNew.setModal(1);

	winNew.centerOnScreen();
	//winNew.maximize();

}

function doOnLoad() {

	main_layout = new dhtmlXLayoutObject(document.body, '1C');
	main_layout.setOffsets({
	    top: 0,
	    right: 0,
	    bottom: 0,
	    left: 0
	});

	var main = main_layout.cells('a');
	main_layout.cells('a').hideHeader();

	var myToolbar = main_layout.cells('a').attachToolbar({
		iconset: "awesome",
		items:[
		    {id: "btnNew", type: "button", text: "Nuovo", img: "fa fa-plus-circle"},
		    {id: "sep1", type: "separator" },
		    {id: "btnEdit", type: "button", text: "Modifica", img: "fa fa-pencil-square-o", imgdis: "fa fa-pencil-square-o", disabled:true},
		    {id: "sep2", type: "separator" },
		    {id: "btnDelete", type: "button", text: "Elimina", img: "fa fa-trash", imgdis: "fa fa-trash", disabled:true}
		]
	});

	myToolbar.attachEvent('onClick', function(id){
		switch(id) {
			case "btnNew":
				openNew(null, null, null);
			break;
			case "btnEdit":

				var idUser = gUser.cells(gUser.getSelectedRowId(),0).getValue();

				window.dhx.ajax.post("php/utenti.php", "opt=get&idUser="+idUser, function(r) {
				    var res = window.dhx.s2j(r.xmlDoc.responseText);
				    var resultset = res.resultset;

				    if(resultset != null){
				    	openNew(resultset, idUser);
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

				    		var idUser = gUser.cells(gUser.getSelectedRowId(),0).getValue();

				    		window.dhx.ajax.post("php/utenti.php", "opt=delete&id="+idUser+"&iduser="+top.userId, function(r) {
							    var res = window.dhx.s2j(r.xmlDoc.responseText);

							    if(res == 1){
							    	gUser.clearAll();
							    	gUser.load("php/utenti.php?opt=tableUtenti");

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


	// GRIGLIA WBS
	gUser = main_layout.cells('a').attachGrid();

	gUser.setHeader(["id","Cognome","Nome","Username","eMail","Ditta"]);
	gUser.setColTypes("ro,ro,ro,ro,ro,ro");
	gUser.setColumnIds('id0,id1,id2,id3,id4,id5');

	gUser.setColSorting('str,str,str,str,str,str');
	gUser.setInitWidths('50,300,300,300,200,200');
	gUser.setColumnHidden(0,true);
	gUser.enableSmartRendering(true);
	gUser.enableMultiselect(false);

	gUser.init();
	gUser.load("php/utenti.php?opt=tableUtenti");

	gUser.attachEvent("onSelectStateChanged", function(id){
		if(gUser.getSelectedRowId()!=null){
			myToolbar.enableItem('btnEdit');
			myToolbar.enableItem('btnDelete');
		}else{
			myToolbar.disableItem('btnEdit');
			myToolbar.disableItem('btnDelete');
		}
	});

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
