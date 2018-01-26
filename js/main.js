var main_layout = null;
var main_menu   = null;
top.userId      = null;
top.permission  = null;

function processUser()
{
	var parameters = location.search.substring(1).split("&");

	var temp = parameters[0].split("=");
	top.userId = unescape(temp[1]);
	temp = parameters[1].split("=");
	top.permission = unescape(temp[1]);
}

function doOnLoad()
{
	window.dhx.ajax.post("php/permission.php", "opt=home", function(r)
	 {
			var res       = window.dhx.s2j(r.xmlDoc.responseText);
			var resultset = res.resultset;

			if(resultset != null)
			{
				var permission = resultset[0].permission.substring(0,8);
			}

	processUser();

	dhtmlXSideBar.prototype.templates.myview = "<div class='sidebar-item'><i class='#icon#'></i>&nbsp;&nbsp;"+"#text#</div>";

	main_layout = new dhtmlXLayoutObject(document.body, '1C');
	main_layout.setOffsets({
	    top: 0,
	    right: 0,
	    bottom: 0,
	    left: 0
	});

	var main = main_layout.cells('a');
	main.hideHeader();

	main_menu = main.attachSidebar(
	{
		template: "myview",
		width: '250',
		icons_path: 'img/',
		autohide: '1',
		header: '1'
	});
	main_menu.conf.animate_items = false;

	switch (permission)
	{
		// Amministratore
	  case '11000000' :
											main_menu.addItem({id: 'home',   text: 'Home',              icon: 'fa fa-home',     selected: true});
											main_menu.addItem({id: 'wbs',    text: 'Anagrafica WBS',    icon: 'fa fa-map',      selected: false});
											main_menu.addItem({id: 'ditte',  text: 'Anagrafica ditte',  icon: 'fa fa-users',    selected: false});
											main_menu.addItem({id: 'utenti', text: 'Anagrafica utenti', icon: 'fa fa-user',     selected: false});
											main_menu.addItem({id: 'dossier',text: 'Anagrafica dossier',icon: 'fa fa-book',     selected: false});
											// Nuova voce Logout
											main_menu.addItem({id: 'logout', text: 'Logout',            icon: 'fa fa-sign-out', selected: false});
											break;

		// Gestione Anagrafiche
	  case '10100000' :
											main_menu.addItem({id: 'home',   text: 'Home',              icon: 'fa fa-home',     selected: true});
											main_menu.addItem({id: 'wbs',    text: 'Anagrafica WBS',    icon: 'fa fa-map',      selected: false});
											main_menu.addItem({id: 'ditte',  text: 'Anagrafica ditte',  icon: 'fa fa-users',    selected: false});
											main_menu.addItem({id: 'utenti', text: 'Anagrafica utenti', icon: 'fa fa-user',     selected: false});
											main_menu.addItem({id: 'dossier',text: 'Anagrafica dossier',icon: 'fa fa-book',     selected: false});
											// Nuova voce Logout
											main_menu.addItem({id: 'logout', text: 'Logout',            icon: 'fa fa-sign-out', selected: false});
	                		break;

		// Solo Inserimento
	  case '10010000' :
											main_menu.addItem({id: 'home',   text: 'Home',              icon: 'fa fa-home',     selected: true});
											main_menu.addItem({id: 'wbs',    text: 'Anagrafica WBS',    icon: 'fa fa-map',      selected: false});
											main_menu.addItem({id: 'ditte',  text: 'Anagrafica ditte',  icon: 'fa fa-users',    selected: false});
											main_menu.addItem({id: 'utenti', text: 'Anagrafica utenti', icon: 'fa fa-user',     selected: false});
											main_menu.addItem({id: 'dossier',text: 'Anagrafica dossier',icon: 'fa fa-book',     selected: false});
											// Nuova voce Logout
											main_menu.addItem({id: 'logout', text: 'Logout',            icon: 'fa fa-sign-out', selected: false});
											break;

		// Accesso alle corrispondenze
	  case '10001000' :
											main_menu.addItem({id: 'home',   text: 'Home',              icon: 'fa fa-home',     selected: true});
											// Nuova voce Logout
											main_menu.addItem({id: 'logout', text: 'Logout',            icon: 'fa fa-sign-out', selected: false});
											break;

		// Accesso al giornale lavori
	  case '10000100' :

										main_menu.addItem({id: 'home',   text: 'Home',              icon: 'fa fa-home',     selected: true});
										// Nuova voce Logout
										main_menu.addItem({id: 'logout', text: 'Logout',            icon: 'fa fa-sign-out', selected: false});
										break;

		// Accesso ad accettazione materiali
		case '10000010' :

										main_menu.addItem({id: 'home',   text: 'Home',              icon: 'fa fa-home',     selected: true});
										// Nuova voce Logout
										main_menu.addItem({id: 'logout', text: 'Logout',            icon: 'fa fa-sign-out', selected: false});
										break;

	}

	var mnuProject = main_menu.cells('home');
	mnuProject.attachURL('home.html');

	main_menu.attachEvent("onSelect", function(id)
	{
		switch(id)
		{
			case "home":
				mnuProject.attachURL('home.html');
			break;
			case "wbs":
				main_menu.cells('wbs').attachURL('wbs.html');
			break;
			case "utenti":
				main_menu.cells('utenti').attachURL('utenti.html');
			break;
			case "ditte":
				main_menu.cells('ditte').attachURL('ditte.html');
			break;
			case "dossier":
				main_menu.cells('dossier').attachURL('dossier.html');
			break;
			// Nuovo Caso Logout
			case "logout":
				location.href = "index.html";
			break;
		}
	});


	/*
	var logs = main_layout.cells('b');
	logs.setText('<i class="fa fa-terminal"></i>&nbsp;&nbsp;Logs');
	logs.setCollapsedText('<i class="fa fa-terminal"></i>&nbsp;&nbsp;Logs');
	logs.setHeight('200');
	logs.collapse();


	var logTxt = [];
	top.formLog = logs.attachForm(logTxt);
	*/
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
