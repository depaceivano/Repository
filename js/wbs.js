var main_layout = null;
var main_menu = null;
var gWBS = null;
var frmForm = null;
var wForm = null;
var dataSosp = new Array();
var dataSospIndex = 0;
var dataSelectArr = null;
var gDocument = null;

dhtmlXForm.prototype.getButton = function(name) {
   return this.doWithItem(name, "getButton");
};

dhtmlXForm.prototype.items.button.getButton = function(item) {
   return item;
};

function SBEmpty(data){ 
   return (data!=0);
}

function openNew(data, data2, idWBS){

	dataSelectArr = data;
	dataSospIndex = 0;
	
	wNew = new dhtmlXWindows();

	winNew = wNew.createWindow('winNew', 0, 0, 740, 550);
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

				dataSosp = new Array();
								
				for(var i=0; i<dataSospIndex+1; i++){
					if(wForm.getCalendar('30_'+i).getFormatedDate("%d/%m/%Y")!='' || wForm.getCalendar('31_'+i).getFormatedDate("%d/%m/%Y")!=''){
						dataSosp.push({'sosp' : wForm.getCalendar('30_'+i).getFormatedDate("%d/%m/%Y"), 'rip' : wForm.getCalendar('31_'+i).getFormatedDate("%d/%m/%Y")});
					}
				}

				dhtmlx.message({
				    type:"confirm",
				    text: "Sei sicuro di voler creare la WBS con codice : <b>"+wForm.getItemValue('15')+"</b> ?",
				    callback: function(id) {
				    	if(id){
				    		//SALVO --------------------------------------------------------------------------------------------------
				    		window.dhx.ajax.post("php/wbs.php", "opt=save&iduser="+top.userId+"&arrSospDate="+JSON.stringify(dataSosp)+"&idWBS="+idWBS+"&arr="+JSON.stringify(wForm.getFormData()), function(r) {
							    var res = window.dhx.s2j(r.xmlDoc.responseText); 	
							    gWBS.clearAll();
								gWBS.load("php/wbs.php?opt=tableWBS"); 
							    if(res == 1){
							    	dhtmlx.message({
							    		type : "myMessageOK",
							    		text : "WBS Salvata con successo"
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
					    }
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
		{type: "fieldset",  name: "set", label: "Anagrafica WBS", width:690, list:[
			{type: "block", blockOffset:0, width: 650, list:[
			    {type: "select", name:"1", label: "Oggetto", labelWidth:100, inputWidth:100, validate:"SBEmpty", options:[
			        {value: "0", text: ""}
			    ]},
		    	{type:"newcolumn"},
		    	{type: "input", name:"2", label: "Descrizione oggetto", value: "", offsetLeft: 10, labelWidth:170, inputWidth:230, disabled:true},
		    	{type:"newcolumn"},
		    	{type: "label", label: "<span onclick='editList(\"Oggetto\")'><i class='fa fa-list-ul'></i></span>", offsetLeft: 5, offsetTop: 7},
		    ]},
		    
		    {type: "block", blockOffset:0, width: 650, list:[
			    {type: "select", name:"3", label: "Attivita'", labelWidth:100, inputWidth:100, validate:"SBEmpty", options:[
			        {value: "0", text: ""}
			    ]},
		    	{type:"newcolumn"},
		    	{type: "input", name:"4", label: "Descrizione attivita'", value: "", offsetLeft: 10, labelWidth:170, inputWidth:230, disabled:true},
		    	{type:"newcolumn"},
		    	{type: "label", label: "<span onclick='editList(\"Attivita\")'><i class='fa fa-list-ul'></i></span>", offsetLeft: 5, offsetTop: 7},
		    ]},
		    
		    {type: "block", blockOffset:0, width: 650, list:[
			    {type: "select", name:"5", label: "Lotto", labelWidth:100, inputWidth:100, validate:"SBEmpty", options:[
			        {value: "0", text: ""}
			    ]},
		    	{type:"newcolumn"},
		    	{type: "input", name:"6", label: "Descrizione lotto", value: "", offsetLeft: 10, labelWidth:170, inputWidth:230, disabled:true},
		    	{type:"newcolumn"},
		    	{type: "label", label: "<span onclick='editList(\"Lotto\")'><i class='fa fa-list-ul'></i></span>", offsetLeft: 5, offsetTop: 7},
		    ]},
		    
		    {type: "block", blockOffset:0, width: 650, list:[
			    {type: "select", name:"7", label: "Tratta", labelWidth:100, inputWidth:100, validate:"SBEmpty", options:[
			        {value: "0", text: ""}
			    ]},
		    	{type:"newcolumn"},
		    	{type: "input", name:"8", label: "Descrizione tratta", value: "", offsetLeft: 10, labelWidth:170, inputWidth:230, disabled:true},
		    	{type:"newcolumn"},
		    	{type: "label", label: "<span onclick='editList(\"Tratta\")'><i class='fa fa-list-ul'></i></span>", offsetLeft: 5, offsetTop: 7},
		    ]},
		    
		    {type: "block", blockOffset:0, width: 650, list:[
			    {type: "select", name:"9", label: "Opera", labelWidth:100, inputWidth:100, validate:"SBEmpty", options:[
			        {value: "0", text: ""}
			    ]},
		    	{type:"newcolumn"},
		    	{type: "input", name:"10", label: "Descrizione opera", value: "", offsetLeft: 10, labelWidth:170, inputWidth:230, disabled:true},
		    	{type:"newcolumn"},
		    	{type: "label", label: "<span onclick='editList(\"Opera\")'><i class='fa fa-list-ul'></i></span>", offsetLeft: 5, offsetTop: 7},
		    ]},
		    
		    {type: "block", blockOffset:0, width: 650, list:[
			    {type: "input", name:"11", label: "Codice", value: "", offsetLeft: 0, labelWidth:100, inputWidth:100, maxLength:3},
		    	{type:"newcolumn"},
		    	{type: "input", name:"12", label: "Separatore", value: "", offsetLeft: 10, labelWidth:170, inputWidth:230, disabled:false},
		    ]},
		    
		    {type: "block", blockOffset:0, width: 650, list:[
			    {type: "select", name:"13", label: "Carreggiata/Fase", labelWidth:100, inputWidth:100, validate:"SBEmpty", options:[
			        {value: "0", text: ""}
			    ]},
		    	{type:"newcolumn"},
		    	{type: "input", name:"14", label: "Descrizione carreggiata/Fase", value: "", offsetLeft: 10, labelWidth:170, inputWidth:230, disabled:true},
		    	{type:"newcolumn"},
		    	{type: "label", label: "<span onclick='editList(\"Carreggiata\")'><i class='fa fa-list-ul'></i></span>", offsetLeft: 5, offsetTop: 7},
		    ]},
		    
		    {type: "block", blockOffset:0, width: 650, list:[
				{type: "input", name:"15", label: "<b>Codice WBS</b>", value: "", offsetLeft: 0, labelWidth:100, inputWidth:135, disabled:false},
		    	{type:"newcolumn"},
		    	{type: "input", name:"17", label: "Import code", value: "", offsetLeft: 75, labelWidth:70, inputWidth:100, disabled:true},
			]},
			
			{type: "input", name:"16", label: "Descrizione", value: "", offsetLeft: 0, labelWidth:100, inputWidth:530, disabled:false},
	    ]},
	    
	    {type: "block", blockOffset:0, width: 690, list:[
    		{type: "input", name:"18", label: "da PK", value: "", offsetLeft: 30, labelWidth:70, inputWidth:220, disabled:false},
	    	{type:"newcolumn"},
	    	{type: "input", name:"19", label: "a PK", value: "", offsetLeft: 30, labelWidth:70, inputWidth:220, disabled:false}
    	]},
    	
    	{type: "fieldset",  name: "temp", label: "Tempistiche", width:690, list:[
    		{type: "block", blockOffset:0, width: 650, list:[
	    		{type: "calendar", name: "20", label: "Data inizio prevista&nbsp;&nbsp;<i class='fa fa-calendar'></i>", labelWidth:150, inputWidth:155, enableTime: false, enableTodayButton: true, calendarPosition: "right", offsetLeft: 0, dateFormat:"%d-%m-%Y", serverDateFormat:"%d-%m-%Y"},
		    	{type:"newcolumn"},
		    	{type: "calendar", name: "21", label: "Data fine prevista&nbsp;&nbsp;<i class='fa fa-calendar'></i>", labelWidth:150, inputWidth:155, enableTime: false, enableTodayButton: true, calendarPosition: "right", offsetLeft: 20, dateFormat:"%d-%m-%Y", serverDateFormat:"%d-%m-%Y"},
	    	]},
    	
	    	{type: "block", blockOffset:0, width: 650, list:[
	    		{type: "calendar", name: "22", label: "Data inizio effettiva&nbsp;&nbsp;<i class='fa fa-calendar'></i>", labelWidth:150, inputWidth:155, enableTime: false, enableTodayButton: true, calendarPosition: "right", offsetLeft: 0, dateFormat:"%d-%m-%Y", serverDateFormat:"%d-%m-%Y"},
		    	{type:"newcolumn"},
		    	{type: "calendar", name: "23", label: "Data fine effettiva&nbsp;&nbsp;<i class='fa fa-calendar'></i>", labelWidth:150, inputWidth:155, enableTime: false, enableTodayButton: true, calendarPosition: "right", offsetLeft: 20, dateFormat:"%d-%m-%Y", serverDateFormat:"%d-%m-%Y"},
	    	]},

    	]},
    	
    	{type: "fieldset",  name: "cont", label: "Dati contabili", width:690, list:[
	    	{type: "block", blockOffset:0, width: 650, list:[
	    		{type: "input", name:"24", label: "Millesimi", value: "", offsetLeft: 0, labelWidth:70, inputWidth:230, disabled:false},
		    	{type:"newcolumn"},
		    	{type: "input", name:"25", label: "Importo", value: "", offsetLeft: 30, labelWidth:70, inputWidth:230, disabled:false}
	    	]},
    	]},
    	
    	{type: "block", blockOffset:0, width: 690, list:[
    		{type: "select", name:"26", label: "Direttore lavori", offsetLeft: 25, labelWidth:80, inputWidth:100, validate:"SBEmpty", options:[
		        {value: "0", text: ""}
		    ]},
	    	{type:"newcolumn"},
	    	{type: "select", name:"27", label: "Direttore tecnico", offsetLeft: 10, labelWidth:80, inputWidth:100, validate:"SBEmpty", options:[
		        {value: "0", text: ""}
		    ]},
	    	{type:"newcolumn"},
	    	{type: "select", name:"28", label: "Collaudatore statico", offsetLeft: 10, labelWidth:80, inputWidth:100, validate:"SBEmpty", options:[
		        {value: "0", text: ""}
		    ]},
	    	{type:"newcolumn"},
	    	{type:"checkbox", name:"29", label:"Sospeso", checked: false, offsetLeft: 10},
    	]},
    	
    	{type: "fieldset",  name: "sosp", label: "Sospensione lavori", width:690, list:[
    		
    		{type: "block", blockOffset:0, width: 650, list:[
	    		{type: "calendar", name: "30_"+dataSospIndex, label: "Data sospensione&nbsp;&nbsp;<i class='fa fa-calendar'></i>", labelWidth:150, inputWidth:155, enableTime: false, enableTodayButton: true, calendarPosition: "right", offsetLeft: 0, dateFormat:"%d-%m-%Y", serverDateFormat:"%d-%m-%Y"},
		    	{type:"newcolumn"},
		    	{type: "calendar", name: "31_"+dataSospIndex, label: "Data ripresa&nbsp;&nbsp;<i class='fa fa-calendar'></i>", labelWidth:130, inputWidth:155, enableTime: false, enableTodayButton: true, calendarPosition: "right", offsetLeft: 20, dateFormat:"%d-%m-%Y", serverDateFormat:"%d-%m-%Y"},
		    	{type:"newcolumn"},
		    	{type: "label", label: "<span onclick='insertNewDate(dataSospIndex)'><i class='fa fa-plus'></i></span>", offsetLeft: 5, offsetTop: 7},
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
		
	loadList('listOggetto', '1', data);
	loadList('listAttivita', '3', data);
	loadList('listLotto', '5', data);
	loadList('listTratta', '7', data);
	loadList('listOpera', '9', data);
	loadList('listCarreggiata', '13', data);
	loadListDir('listDL', '26', data);
	loadListDir('listDT', '27', data);
	loadListDir('listCS', '28', data);


	// POPOLATE DATA IN EDIT VIEW
	if(data!=null){
		wForm.setItemValue("11",data[0].codice);
		wForm.setItemValue("12",data[0].seperatore);
		wForm.setItemValue("16",data[0].descrizione);
		wForm.setItemValue("18",data[0].dapk);
		wForm.setItemValue("19",data[0].apk);
		wForm.setItemValue("20",data[0].initdataprev);
		wForm.setItemValue("21",data[0].enddataprev);
		wForm.setItemValue("22",data[0].initdatareal);
		wForm.setItemValue("23",data[0].enddatareal);
		wForm.setItemValue("24",data[0].millesimi);
		wForm.setItemValue("25",data[0].importo);
		if(data[0].sospeso=='t'){
			wForm.checkItem("29");
		}else{
			wForm.uncheckItem("29");
		}
	}
	if(data!=null){
		for(var i=0; i<data2.length; i++){
			if(i>0){
				insertNewDate(i-1);
			}
			wForm.setItemValue("30_"+i ,data2[i].initdata);
			wForm.setItemValue("31_"+i ,data2[i].enddata);
		}
	}
	
	
	wForm.attachEvent('onButtonClick', function(id){
		switch(id) {
			case "btnUpload":
				if(idWBS==null){
					dhtmlx.alert({
						title:"Error",
						type:"alert-error",
						width: "460px",
						text:"<div style='text-align:justify'>Attenzione!!<BR>Per poter caricare correttamente degli allegati e' necessario prima salvare la WBS.</div>"
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
				var downloadUrl = "php/download.php?opt=WBS&arrayDoc="+JSON.stringify(arrExportDoc);
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
							
							window.dhx.ajax.post("php/wbs.php", "opt=deleteDoc&arrayDoc="+JSON.stringify(arrExportDoc)+"&iduser="+top.userId, function(r) {
							    var res = window.dhx.s2j(r.xmlDoc.responseText); 	
							    if(res == 1){
							    	dhtmlx.message({
							    		type : "myMessageOK",
							    		text : "Documento eliminato con successo"
							    	});
						
									gDocument.clearAll();
									gDocument.load("php/wbs.php?opt=tableAttach&idWBS="+idWBS);
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
	
	wForm.attachEvent("onChange", function(name, value){
		completeForm(name, value);
	});	

	
	// GRIGLIA DOCUMENTI
	gDocument = new dhtmlXGridObject(wForm.getContainer("gDocument"));
	gDocument.setHeader(["id",'<i class="fa fa-check" aria-hidden="true"></i>',"Nome file","Data","Dimensione"]);
	gDocument.setImagePath("codebase/imgs/");
	gDocument.setColTypes("ro,ch,ro,ro,ro");
	gDocument.setColumnIds('id0,id1,id2,id3,id4');
	
	gDocument.setColSorting('str,str,str,str,str');
	gDocument.setInitWidths('10,50,220,140,200');
	gDocument.setColumnHidden(0,true);
	gDocument.enableSmartRendering(false);
	gDocument.enableMultiselect(false);
	
	gDocument.init();
	gDocument.load("php/wbs.php?opt=tableAttach&idWBS="+idWBS);

	
	
	winNew.setText(idWBS!=null?"WBS : "+gWBS.cells(gWBS.getSelectedRowId(),1).getValue():"Nuova WBS");
	winNew.setModal(1);

	winNew.centerOnScreen();
	//winNew.maximize();
	
}

function completeForm(name, value){
	if(name=='1' || name=='3' || name=='5' || name=='7' || name=='9' || name=='13' || name=='11' || name=='12'){
		if(name!='11' && name!='12'){
			var val = wForm.getSelect(name).options[wForm.getSelect(name).selectedIndex].innerHTML;
			val = val.split(' | ');
		    wForm.setItemValue(eval(name)+1, val[1]);
	    }
	    
	    var code = wForm.getItemValue('11');
	    if(code.length==2){
		    code = '0'+code;
	    }else if(code.length==1){
		    code = '00'+code;
	    }
	    
	    //Generate WBS code
	    
	    var oggetto = wForm.getSelect('1').options[wForm.getSelect('1').selectedIndex].innerHTML.split(' | ')[0];
	    var attivita = wForm.getSelect('3').options[wForm.getSelect('3').selectedIndex].innerHTML.split(' | ')[0];
	    var lotto = wForm.getSelect('9').options[wForm.getSelect('9').selectedIndex].innerHTML.split(' | ')[0];
	    var tratta = wForm.getSelect('5').options[wForm.getSelect('5').selectedIndex].innerHTML.split(' | ')[0];
	    var opera = wForm.getSelect('7').options[wForm.getSelect('7').selectedIndex].innerHTML.split(' | ')[0];
	    var separatore = wForm.getItemValue('12'); 
	    var carreggiata = wForm.getSelect('13').options[wForm.getSelect('13').selectedIndex].innerHTML.split(' | ')[0];
	    
	    var point1 = '';
	    var point2 = '';
	    
	    if(oggetto!='' && attivita!=''){
		    point1 = '.';
	    } 
	    if((attivita!='' || oggetto!='') && (lotto!='' || tratta!='' || opera!='' || separatore!='' || carreggiata!='' || code!='')){
		    point2 = '.';
	    }
	    
	    wForm.setItemValue('15', 
		    oggetto
		    + point1
		    + attivita
		    + point2 
		    + lotto 
		    + tratta 
		    + opera 
		    + code 
		    + separatore 
		    + carreggiata
		);
	    
	    //Generate Import code
	    wForm.setItemValue('17', 
	    	wForm.getSelect('9').options[wForm.getSelect('9').selectedIndex].innerHTML.split(' | ')[0] 
	    	+ wForm.getSelect('5').options[wForm.getSelect('5').selectedIndex].innerHTML.split(' | ')[0] 
	    	+ wForm.getSelect('7').options[wForm.getSelect('7').selectedIndex].innerHTML.split(' | ')[0] 
	    	+ code 
	    	+ wForm.getItemValue('12') 
	    	+ wForm.getSelect('13').options[wForm.getSelect('13').selectedIndex].innerHTML.split(' | ')[0]
	    );

    }
}

function insertNewDate(pos){
	
	var itemData = {type: "block", blockOffset:0, width: 650, list:[
			    		{type: "calendar", name: "30_"+(pos+1), label: "Data sospensione&nbsp;&nbsp;<i class='fa fa-calendar'></i>", labelWidth:150, inputWidth:155, enableTime: false, enableTodayButton: true, calendarPosition: "right", offsetLeft: 0, dateFormat:"%d-%m-%Y", serverDateFormat:"%d-%m-%Y"},
				    	{type:"newcolumn"},
				    	{type: "calendar", name: "31_"+(pos+1), label: "Data ripresa&nbsp;&nbsp;<i class='fa fa-calendar'></i>", labelWidth:130, inputWidth:155, enableTime: false, enableTodayButton: true, calendarPosition: "right", offsetLeft: 20, dateFormat:"%d-%m-%Y", serverDateFormat:"%d-%m-%Y"},
			    	]};
	
	wForm.addItem('sosp', itemData, pos+1, pos);

	dataSospIndex++;
}

function editList(opt){
	wEditList = new dhtmlXWindows();

	winEditList = wEditList.createWindow('winEditList', 0, 0, 600, 450);
	winEditList.attachStatusBar({
		text: "<span id='statusToolbarEdit'></span>",
	});
	winEditListToolbar = new dhtmlXToolbarObject({
		parent: "statusToolbarEdit",
		iconset: "awesome",
		items:[
		    {id: "btnSend", type: "button", text: "Salva", img: "fa fa-floppy-o", imgdis: "fa fa-floppy-o", disabled: true},
		    {id: "sep1", type: "separator" },
		    {id: "btnDel", type: "button", text: "Elimina", img: "fa fa-trash", imgdis: "fa fa-trash", disabled: true},
		    {id: "sep2", type: "separator" },
		    {id: "btnClear", type: "button", text: "Svuota", img: "fa fa-i-cursor", imgdis: "fa fa-i-cursor", disabled: false},
		    {id: "sep3", type: "separator" },
		    {id: "btnCancel", type: "button", text: "Chiudi", img: "fa fa-times"}
		]
	});
	winEditListToolbar.addSeparator('sp', 0);
	winEditListToolbar.addSpacer('sp');
	var objSend = winEditListToolbar.objPull[winEditListToolbar.idPrefix+"btnSend"].obj;
	objSend.style.backgroundColor = "#87e3ff";
	var objDel = winEditListToolbar.objPull[winEditListToolbar.idPrefix+"btnDel"].obj;
	objDel.style.backgroundColor = "#fd6c6c";

	
	var main_layout = new dhtmlXLayoutObject(winEditList, '2E');
	main_layout.setOffsets({
	    top: 0,
	    right: 0,
	    bottom: 0,
	    left: 0
	});

	main_layout.cells('a').hideHeader();
	main_layout.cells('a').fixSize(true, true);
	
		
		// GRIGLIA
		var gEditList = main_layout.cells('a').attachGrid();
	
		gEditList.setHeader(["id","Codice","Descrizione"]);
		gEditList.setColTypes("ro,ro,ro");
		gEditList.setColumnIds('id0,id1,id2');
		
		gEditList.setColSorting('str,str,str');
		gEditList.setInitWidths('50,100,450');
		gEditList.setColumnHidden(0,true);
		gEditList.enableSmartRendering(false);
		gEditList.enableMultiselect(false);
		
		gEditList.init();
		gEditList.load("php/wbs.php?opt=table"+opt);
		
		gEditList.attachEvent("onSelectStateChanged", function(id){
			if(gEditList.getSelectedRowId()!=null){
				winEditListToolbar.enableItem('btnSend');
				winEditListToolbar.enableItem('btnDel');
				frmCommands.setItemValue('code', gEditList.cells(gEditList.getSelectedRowId(),1).getValue());
				frmCommands.setItemValue('description', gEditList.cells(gEditList.getSelectedRowId(),2).getValue());
			}else{
				winEditListToolbar.disableItem('btnSend');
				winEditListToolbar.disableItem('btnDel');
			}
		});
		
		
		
	main_layout.cells('b').hideHeader();
	main_layout.cells('b').fixSize(true, true);
	main_layout.cells('b').setHeight(110);
	
		var strCmd = [
			{ type:"block", name:"blockTools", position:"label-right", list:[
				{ type:"input", name:"code", label:"Codice:", labelWidth:120, inputWidth:380, offsetLeft: "5", offsetTop: "10" },
				{ type:"input", name:"description", label:"Descrizione:", labelWidth:120, inputWidth:380, offsetLeft: "5" }
			]}
		];
		frmCommands = main_layout.cells('b').attachForm(strCmd);
		
		frmCommands.attachEvent('onKeyup', function(id){
			if(frmCommands.getItemValue('code')!=''){
				winEditListToolbar.enableItem('btnSend');
			}else{
				winEditListToolbar.disableItem('btnSend');
			}
		});


	winEditListToolbar.attachEvent('onClick', function(id){
		switch(id) {
			case "btnSend":
				var id = (gEditList.getSelectedRowId()==null?null:gEditList.cells(gEditList.getSelectedRowId(),0).getValue());
				
	    		window.dhx.ajax.post("php/wbs.php", "opt=save"+opt+"&iduser="+top.userId+"&id="+id+"&codice="+frmCommands.getItemValue('code')+"&descrizione="+frmCommands.getItemValue('description'), function(r) {
				    var res = window.dhx.s2j(r.xmlDoc.responseText); 	
				    gEditList.clearAll();
					gEditList.load("php/wbs.php?opt=table"+opt); 
				    if(res == 1){
				    	dhtmlx.message({
				    		type : "myMessageOK",
				    		text : "Salvataggio eseguito con successo"
				    	});
				    	frmCommands.setItemValue('code', '');
				    	frmCommands.setItemValue('description', '');
				    	loadList('listOggetto', '1', dataSelectArr);
						loadList('listAttivita', '3', dataSelectArr);
						loadList('listLotto', '5', dataSelectArr);
						loadList('listTratta', '7', dataSelectArr);
						loadList('listOpera', '9', dataSelectArr);
						loadList('listCarreggiata', '13', dataSelectArr);
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
			case "btnDel":
	    		dhtmlx.message({
				    type:"confirm",
				    text: "Sei sicuro di voler eliminare questo elemento?",
				    callback: function(id) {
				    	if(id){
				    		var id = gEditList.cells(gEditList.getSelectedRowId(),0).getValue();
				    	
				    		window.dhx.ajax.post("php/wbs.php", "opt=delete"+opt+"&id="+id+"&iduser="+top.userId, function(r) {
							    var res = window.dhx.s2j(r.xmlDoc.responseText); 	    
			    
							    if(res == 1){
							    	gEditList.clearAll();
							    	gEditList.load("php/wbs.php?opt=table"+opt); 
							    	loadList('listOggetto', '1', dataSelectArr);
									loadList('listAttivita', '3', dataSelectArr);
									loadList('listLotto', '5', dataSelectArr);
									loadList('listTratta', '7', dataSelectArr);
									loadList('listOpera', '9', dataSelectArr);
									loadList('listCarreggiata', '13', dataSelectArr);
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
			case "btnClear":
				gEditList.clearAll();
				gEditList.load("php/wbs.php?opt=table"+opt);
				frmCommands.setItemValue('code', '');
				frmCommands.setItemValue('description', '');
				winEditListToolbar.disableItem('btnSend');
				winEditListToolbar.disableItem('btnDel');
			break;
			case "btnCancel":
				if((wEditList != null) && (wEditList.unload)) {
					if((winEditList != null) && (winEditList.unload)) {
						winEditList.hide();
						winEditList.unload();
						winEditList = null;
					}
					wEditList.unload();
					wEditList = null;
				}
			break;
		}
	});


	winEditList.setText("Lista "+opt);
	winEditList.setModal(1);
	winEditList.centerOnScreen();
	
}

function loadList(opt, idSB, data){
	
	window.dhx.ajax.post("php/wbs.php", "opt="+opt, function(r) {
	    var res = window.dhx.s2j(r.xmlDoc.responseText); 	    
	    var resultset = res.resultset;
	    if(resultset != null){
	    	
	    	var i;
		    for(i = wForm.getSelect(idSB).options.length - 1 ; i >= 0 ; i--){
		        wForm.getSelect(idSB).remove(i);
		    }
	    	wForm.getSelect(idSB).options.add(new Option('', 0 ));
	    	
	    	for(var i=0; i<resultset.length; i++){
		    	wForm.getSelect(idSB).options.add(new Option(resultset[i].codice+' | '+resultset[i].descrizione, resultset[i].id));
	    	}
	    	
	    	if(data!=null){
		    	wForm.setItemValue("1",data[0].idprogetto);
		    	completeForm("1", null);
		    	wForm.setItemValue("3",data[0].idattivita);
		    	completeForm("3", null);
		    	wForm.setItemValue("5",data[0].idlotto);
		    	completeForm("5", null);
		    	wForm.setItemValue("7",data[0].idtratta);
		    	completeForm("7", null);
		    	wForm.setItemValue("9",data[0].idopera);
		    	completeForm("9", null);
		    	wForm.setItemValue("13",data[0].idcarreggiata);
		    	completeForm("13", null);
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

function loadListDir(opt, idSB, data){
	
	window.dhx.ajax.post("php/wbs.php", "opt="+opt, function(r) {
	    var res = window.dhx.s2j(r.xmlDoc.responseText); 	    
	    var resultset = res.resultset;
	    if(resultset != null){
	    	for(var i=0; i<resultset.length; i++){
		    	wForm.getSelect(idSB).options.add(new Option(resultset[i].cognome+' '+resultset[i].nome, resultset[i].id));
	    	}
	    	
	    	if(data!=null){
		    	wForm.setItemValue("26",data[0].direttorelavori);
		    	completeForm("26", null);
		    	wForm.setItemValue("27",data[0].direttoretecnico);
		    	completeForm("27", null);
		    	wForm.setItemValue("28",data[0].collaudatore);
		    	completeForm("28", null);
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

	wForm = a.attachVault({
	    autoStart: false,
	    buttonUpload: false
	});
	
	
	wForm.attachEvent("onUploadComplete",function(file, extra){
		
		if((wAddDoc != null) && (wAddDoc.unload)) {
			if((winAddDoc != null) && (winAddDoc.unload)) {
				winAddDoc.hide();
				winAddDoc.unload();
				winAddDoc = null;
			}
			wAddDoc.unload();
			wAddDoc = null;
		}
		
		var idWBS = (gWBS.getSelectedRowId()==null?null:gWBS.cells(gWBS.getSelectedRowId(),0).getValue());
		
		gDocument.clearAll();
		gDocument.load("php/wbs.php?opt=tableAttach&idWBS="+idWBS);

	});

	winAddDocToolbar.attachEvent('onClick', function(id){
		switch(id) {
			case "btnSend":
				var idWBS = gWBS.getSelectedRowId()==null?null:gWBS.cells(gWBS.getSelectedRowId(),0).getValue();
				var code = gWBS.getSelectedRowId()==null?null:gWBS.cells(gWBS.getSelectedRowId(),1).getValue();
				
				wForm.setURL("php/upload.php?opt=WBS&idWBS="+idWBS+"&iduser="+top.userId+"&code="+code);
				wForm.upload();
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
				
				var idWBS = gWBS.cells(gWBS.getSelectedRowId(),0).getValue();

				window.dhx.ajax.post("php/wbs.php", "opt=get&idWBS="+idWBS, function(r) {
				    var res = window.dhx.s2j(r.xmlDoc.responseText); 	    
				    var resultset = res['1'][0].resultset;
				    var resultsetDate = res['2'][0].resultset;
				    				    
				    if(resultset != null){
				    	openNew(resultset, resultsetDate, idWBS);
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
				    	
				    		var idWBS = gWBS.cells(gWBS.getSelectedRowId(),0).getValue();
				    	
				    		window.dhx.ajax.post("php/wbs.php", "opt=delete&idWBS="+idWBS+"&iduser="+top.userId, function(r) {
							    var res = window.dhx.s2j(r.xmlDoc.responseText); 	    
			    
							    if(res == 1){
							    	gWBS.clearAll();
							    	gWBS.load("php/wbs.php?opt=tableWBS"); 
								
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
	gWBS = main_layout.cells('a').attachGrid();

	gWBS.setHeader(["id","Codice WBS","Descrizione","Oggetto","Desc. Oggetto","Attivita'","Desc. Attivita'","Lotto","Desc. Lotto","Tratta","Desc. Tratta","Opera","Desc. Opera","Carreggiata","Desc. Carreggiata"]);
	gWBS.setColTypes("ro,ro,ro,ro,ro,ro,ro,ro,ro,ro,ro,ro,ro,ro,ro");
	gWBS.setColumnIds('id0,id1,id2,id3,id4,id5,id6,id7,id8,id9,id10,id11,id12,id13,id14');
	
	gWBS.setColSorting('str,str,str,str,str,str,str,str,str,str,str,str,str,str,str');
	gWBS.setInitWidths('50,200,400,100,300,100,200,100,200,100,200,100,200,110,200');
	gWBS.setColumnHidden(0,true);
	gWBS.enableSmartRendering(true);
	gWBS.enableMultiselect(false);
			gWBS.attachHeader(",#select_filter,#select_filter,#select_filter,#select_filter,#select_filter,#select_filter,#select_filter,#select_filter,#select_filter,#select_filter,#select_filter,#select_filter,#select_filter,#select_filter");
	
	gWBS.init();
	gWBS.load("php/wbs.php?opt=tableWBS");
	
	gWBS.attachEvent("onSelectStateChanged", function(id){
		if(gWBS.getSelectedRowId()!=null){
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