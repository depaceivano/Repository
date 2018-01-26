var main_layout = null;
var main_menu = null;
var gDitte = null;
var arrPermission = null;

function openNew(data, idDitta){

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
		switch(id)
		{
			case "btnSend":
				if(wForm.validate())
				{
					//SALVO --------------------------------------------------------------------------------------------------
		    		window.dhx.ajax.post("php/ditte.php", "opt=save&iduser="+top.userId+"&id="+idDitta+(data!=null?"&idindirizzo="+data[0].idindirizzo:'')+"&arr="+JSON.stringify(wForm.getFormData()), function(r)
						 {
					    var res = window.dhx.s2j(r.xmlDoc.responseText);
					    gDitte.clearAll();
							gDitte.load("php/ditte.php?opt=tableDitte");

					    if(res == 1)
							{

									dhtmlx.message(
									{
										type : "myMessageOK",
										text : "Ditta salvata con successo"
									});
									if((wNew != null) && (wNew.unload))
									{
										if((winNew != null) && (winNew.unload))
										{
											winNew.hide();
											winNew.unload();
											winNew = null;
										}
										wNew.unload();
										wNew = null;
									}

					    }
							else
							{
					    	dhtmlx.alert({
								title:"Error",
								type:"alert-error",
								width: "460px",
								text:"<div style='text-align:justify'>" + r.xmlDoc.responseText+"</div>"
								});
					    }
				    });
				    //--------------------------------------------------------------------------------------------------------
				}
				else
				{

					// Inizio Modifica Validate
					var nome = wForm.getItemValue("nome");
					var piva = wForm.getItemValue("piva");
					var cf   = wForm.getItemValue("codicefiscale");

					if(!NomeLength(nome))
					{
						dhtmlx.alert({
						title:"Error",
						type:"alert-error",
						width: "460px",
						text:"<div style='text-align:justify'>Il campo Nome é vuoto </div>"
						});
					}

					else if(!PivaLength(piva))
					{
						dhtmlx.alert({
						title:"Error",
						type:"alert-error",
						width: "460px",
						text:"<div style='text-align:justify'>Partita Iva errata o vuota</div>"
						});

					}

					else if(!CFLength(cf))
					{
						dhtmlx.alert({
						title:"Error",
						type:"alert-error",
						width: "460px",
						text:"<div style='text-align:justify'>Codice Fiscale errato</div>"
						});
					}
					else
					{
						dhtmlx.alert({
						title:"Error",
						type:"alert-error",
						width: "460px",
						text:"<div style='text-align:justify'>Campo eMail non valido</div>"
						});
					}
					// Fine Modifica Validate

			}
			break;

			case "btnCancel":
				if((wNew != null) && (wNew.unload))
				 {
					if((winNew != null) && (winNew.unload))
					 {
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
		{type: "fieldset",  name: "field1", label: "Anagrafica Ditta", width:690, list:[
			{type: "block", blockOffset:0, width: 650, list:[
		    	{type: "input", name:"nome", label: "Nome", validate:"NomeLength", value: (data!=null?data[0].ragionesociale:''), offsetLeft: 0, labelWidth:80, inputWidth:220, disabled:false, required:true},
		    	{type:"newcolumn"},
		    	{type: "input", name:"piva", label: "P.IVA", validate:"PivaLength", value: (data!=null?data[0].piva:''), offsetLeft: 20, labelWidth:80, inputWidth:220, disabled:false, required:true},
		    ]},
		    {type: "block", blockOffset:2, width: 650, list:[
		    	{type: "input", name:"codicefiscale", label: "Codice Fis.", validate:"^[a-zA-Z]{6}[0-9]{2}[abcdehlmprstABCDEHLMPRST]{1}[0-9]{2}([a-zA-Z]{1}[0-9]{3})[a-zA-Z]{1}$", value: (data!=null?data[0].codfiscale:''), offsetLeft: 0, labelWidth:80, inputWidth:220, disabled:false},
		    	{type:"newcolumn"},
		    	{type: "input", name:"mail", label: "eMail", validate:"ValidEmail", value: (data!=null?data[0].mail:''), offsetLeft: 20, labelWidth:80, inputWidth:220, disabled:false},
		    ]},
		    {type: "block", blockOffset:2, width: 650, list:[
		    	{type: "input", name:"tel", label: "Telefono", value: (data!=null?data[0].telefono:''), offsetLeft: 0, labelWidth:80, inputWidth:220, disabled:false},
		    ]},
	    ]},

	    {type: "fieldset",  name: "field2", label: "Sede legale", width:690, list:[
			{type: "block", blockOffset:0, width: 650, list:[
		    	{type: "input", name:"indirizzo", label: "Indirizzo", value: (data!=null?data[0].indirizzo:''), offsetLeft: 0, labelWidth:80, inputWidth:220, disabled:false},
		    	{type:"newcolumn"},
		    	{type: "input", name:"citta", label: "Citta'", value: (data!=null?data[0].city:''), offsetLeft: 20, labelWidth:80, inputWidth:220, disabled:false},
		    ]},
		    {type: "block", blockOffset:2, width: 650, list:[
		    	{type: "input", name:"cap", label: "CAP", value: (data!=null?data[0].zipcode:''), offsetLeft: 0, labelWidth:80, inputWidth:220, disabled:false},
		    	{type:"newcolumn"},
		    	{type: "input", name:"provincia", label: "Provincia", value: (data!=null?data[0].provincia:''), offsetLeft: 20, labelWidth:80, inputWidth:220, disabled:false},
		    ]},
	    ]},

    	{type: "label", label: ""},

	];

	wForm = winNew.attachForm(formStr);
	wForm.enableLiveValidation(true);


	winNew.setText(idDitta!=null?"Utente : "+gDitte.cells(gDitte.getSelectedRowId(),1).getValue()+" "+gDitte.cells(gDitte.getSelectedRowId(),2).getValue():"Nuova ditta");
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
		    {id: "btnNew", type: "button", text: "Nuova", img: "fa fa-plus-circle"},
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

				var idDitta = gDitte.cells(gDitte.getSelectedRowId(),0).getValue();

				window.dhx.ajax.post("php/ditte.php", "opt=get&idDitta="+idDitta, function(r) {
				    var res = window.dhx.s2j(r.xmlDoc.responseText);
				    var resultset = res.resultset;

				    if(resultset != null){
				    	openNew(resultset, idDitta);
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

				    		var idDitta = gDitte.cells(gDitte.getSelectedRowId(),0).getValue();

				    		window.dhx.ajax.post("php/ditte.php", "opt=delete&id="+idDitta+"&iduser="+top.userId, function(r) {
							    var res = window.dhx.s2j(r.xmlDoc.responseText);

							    if(res == 1){
							    	gDitte.clearAll();
							    	gDitte.load("php/ditte.php?opt=tableDitte");

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
	gDitte = main_layout.cells('a').attachGrid();

	gDitte.setHeader(["id","Ragione sociale","P.IVA","Codice fiscale","Indirizzo","Citta'","CAP","Provincia","eMail","Telefono"]);
	gDitte.setColTypes("ro,ro,ro,ro,ro,ro,ro,ro,ro,ro");
	gDitte.setColumnIds('id0,id1,id2,id3,id4,id5,id6,id7,id8,id9');

	gDitte.setColSorting('str,str,str,str,str,str,str,str,str,str');
	gDitte.setInitWidths('50,300,300,300,200,200,300,200,200,200');
	gDitte.setColumnHidden(0,true);
	gDitte.enableSmartRendering(true);
	gDitte.enableMultiselect(false);

	gDitte.init();
	gDitte.load("php/ditte.php?opt=tableDitte");

	gDitte.attachEvent("onSelectStateChanged", function(id){
		if(gDitte.getSelectedRowId()!=null){
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

// Funzioni di Validazione campi Nome, Piva, CF
function PivaLength(data)
{
	if(data.length == 11) {return true;}
	else {return false;}

}

function CFLength(data2)
{
	if((data2.length == 16) || (data2.length == 0)) {return true;}
	else {return false;}

}

function NomeLength(data3)
{
	if(data3.length != 0){return true;}
	else {return false;}

}
