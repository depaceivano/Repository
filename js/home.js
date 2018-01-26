var main_layout = null;
var main_menu = null;

function doOnLoad()
{
 // Configurazione automatica dei content
	window.dhx.ajax.post("php/permission.php", "opt=home", function(r)
	 {
			var res       = window.dhx.s2j(r.xmlDoc.responseText);
			var resultset = res.resultset;

			if(resultset != null)
			{
				var permission = resultset[0].permission.substring(0,8);
			}


			main_layout = new dhtmlXLayoutObject(document.body, '1C');
			main_layout.setOffsets({
			    top: 5,
			    right: 5,
			    bottom: 5,
			    left: 5
				});

			var main = main_layout.cells('a');

			var tab = main_layout.cells('a').attachTabbar();
			main_layout.cells('a').hideHeader();

			switch (permission)
			{
				// Amministratore
			  case '11000000' :
												tab.addTab('tbCorrispondenza','<i class="fa fa-envelope"></i>&nbsp;&nbsp;Corrispondenza');
												var tbCorrispondenza = tab.cells('tbCorrispondenza');
												tbCorrispondenza.setActive();
												tbCorrispondenza.attachURL('corrispondenza.html');

												tab.addTab('tbGiornale','<i class="fa fa-newspaper-o"></i>&nbsp;&nbsp;Giornale dei lavori');
												var tbGiornale = tab.cells('tbGiornale');

												tab.addTab('tbAccettazione','<i class="fa fa-shopping-cart"></i>&nbsp;&nbsp;Accettazione materiali');
												var tbAccettazione = tab.cells('tbAccettazione');

			                break;

				// Gestione Anagrafiche
			  case '10100000' :
			                	break;

				// Solo Inserimento
			  case '10010000' :
												break;

				// Accesso alle corrispondenze
			  case '10001000' :
												tab.addTab('tbCorrispondenza','<i class="fa fa-envelope"></i>&nbsp;&nbsp;Corrispondenza');
												var tbCorrispondenza = tab.cells('tbCorrispondenza');
												tbCorrispondenza.setActive();
												tbCorrispondenza.attachURL('corrispondenza.html');

			                break;

				// Accesso al giornale lavori
			  case '10000100' :

												tab.addTab('tbGiornale','<i class="fa fa-newspaper-o"></i>&nbsp;&nbsp;Giornale dei lavori');
												var tbGiornale = tab.cells('tbGiornale');

			                break;

				// Accesso ad accettazione materiali
				case '10000010' :

												tab.addTab('tbAccettazione','<i class="fa fa-shopping-cart"></i>&nbsp;&nbsp;Accettazione materiali');
												var tbAccettazione = tab.cells('tbAccettazione');

											break;

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
