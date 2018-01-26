var main_layout = null;
var main_menu = null;
var gDossier = null;

function openNew(data, idDossier){

	var wNew = new dhtmlXWindows();

	var winNew = wNew.createWindow('winNew', 0, 0, 740, 220);
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
			
				//SALVO --------------------------------------------------------------------------------------------------
	    		window.dhx.ajax.post("php/dossier.php", "opt=save&iduser="+top.userId+"&id="+idDossier+"&arr="+JSON.stringify(wForm.getFormData()), function(r) {
				    var res = window.dhx.s2j(r.xmlDoc.responseText); 	
				    gDossier.clearAll();
					gDossier.load("php/dossier.php?opt=tableDossier");
				    if(res == 1){
				    	dhtmlx.message({
				    		type : "myMessageOK",
				    		text : "Dossier salvato con successo"
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
		{type: "fieldset",  name: "field1", label: "Anagrafica dossier", width:690, list:[
			{type: "block", blockOffset:0, width: 650, list:[
		    	{type: "input", name:"codice", label: "Codice", value: (data!=null?data[0].codice:''), offsetLeft: 0, labelWidth:80, inputWidth:220, disabled:false},
		    	{type: "input", name:"descrizione", label: "Descrizione", value: (data!=null?data[0].descrizione:''), offsetLeft: 0, labelWidth:80, inputWidth:560, disabled:false},
		    ]}
	    ]},

	];

	wForm = winNew.attachForm(formStr);
  
	
	winNew.setText(idDossier!=null?"Dossier : "+gDossier.cells(gDossier.getSelectedRowId(),1).getValue():"Nuovo dossier");
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
				
				var idDossier = gDossier.cells(gDossier.getSelectedRowId(),0).getValue();

				window.dhx.ajax.post("php/dossier.php", "opt=get&idDossier="+idDossier, function(r) {
				    var res = window.dhx.s2j(r.xmlDoc.responseText); 	    
				    var resultset = res.resultset;
				    				    
				    if(resultset != null){
				    	openNew(resultset, idDossier);
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
				    	
				    		var idDossier = gDossier.cells(gDossier.getSelectedRowId(),0).getValue();
				    	
				    		window.dhx.ajax.post("php/dossier.php", "opt=delete&id="+idDossier+"&iduser="+top.userId, function(r) {
							    var res = window.dhx.s2j(r.xmlDoc.responseText); 	    
			    
							    if(res == 1){
							    	gDossier.clearAll();
							    	gDossier.load("php/dossier.php?opt=tableDossier"); 
								
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
	
	
	// GRIGLIA DOSSIER
	gDossier = main_layout.cells('a').attachGrid();

	gDossier.setHeader(["id","Codice","Descrizione"]);
	gDossier.setColTypes("ro,ro,ro");
	gDossier.setColumnIds('id0,id1,id2');
	
	gDossier.setColSorting('str,str,str');
	gDossier.setInitWidths('50,300,300');
	gDossier.setColumnHidden(0,true);
	gDossier.enableSmartRendering(true);
	gDossier.enableMultiselect(false);
	
	gDossier.init();
	gDossier.load("php/dossier.php?opt=tableDossier");
	
	gDossier.attachEvent("onSelectStateChanged", function(id){
		if(gDossier.getSelectedRowId()!=null){
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