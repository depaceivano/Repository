
function doLogin()
 {

	/*
	dhtmlx.message({
	    type:"confirm",
	    text: "Continue?",
	    callback: function(id) {
	    	if(id){
		    	dhtmlx.message("Your data has been successfully saved!");
		    }
	    }
	});
	*/
 	window.dhx.ajax.cache = true;
	var usr = wForm.getItemValue("usr");
	var pwd = wForm.getItemValue("pwd");


	window.dhx.ajax.post("php/login.php", "opt=login&user="+usr+"&pwd="+pwd, function(r)
	 {
	    var res = window.dhx.s2j(r.xmlDoc.responseText);
	    var resultset = res.resultset;

	    if(resultset != null)
			{
	    	if(resultset.length!=0)
				{

          window.dhx.ajax.post("php/session.php", "iduser="+resultset[0].iduser+"&permission="+resultset[0].permission);
          
          document.location.href = "main.html?userId="+resultset[0].iduser+"&permission="+resultset[0].permission;
       }
			else
				{
		    	dhtmlx.alert(
						{
							title:"Errore",
							type:"alert-error",
							width: "460px",
							text:"<div style='text-align:justify'>Username o password errate<BR>Riprovare o contattare l'amministratore di sistema.</div>"
						});
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

}

function enableLogin()
 {
	// Enable login and licManager
	var usr = wForm.getItemValue("usr");
	var pwd = wForm.getItemValue("pwd");

	if(usr == "" || pwd == "")
  {
		wForm.disableItem("login");
	}
  else
  {
		wForm.enableItem("login");
	}

}


function doOnLoad()
{
	var winMain = new dhtmlXWindows();
	wMain = winMain.createWindow('wMain', 0, 0, 480, 330);
	winMain.window('wMain').denyResize();
	wMain.setText('Login');
	wMain.setModal(1);
	wMain.centerOnScreen();
	wMain.button('stick').hide();
	wMain.button('park').hide();
	wMain.button('minmax').hide();
	wMain.button('close').hide();

	var formStructure = [
		{type: "label", labelWidth: 300, labelHeight: 100, label: '<div style="float:left;"><img src="img/sipal.png" width="120"><BR><small>Version: 1.0.0.0</small><BR><small>Copyright<sup>&copy;</sup> 2017 <a style="text-decoration: none;" href="http://www.sipal.it" target="_blank">Sipal. S.p.A.</a> All rights reserved.</small></div><div style="float:left;"></div>'},
		{type: "settings", position: "label-left", labelWidth: 90, inputWidth: 300, offsetLeft: 20},
		{type: "input", name: "usr", label: "User name:", value: "", offsetTop: 10, required: true, maxLength: 64},
		{type: "password", name: "pwd", label: "Password:", value: "", required: true, maxLength: 64},
		{type: "button", name: "login", value: "Login", width: 300, offsetTop: 40, offsetLeft: 70, disabled: true},
	];
	wForm = wMain.attachForm(formStructure);

	wForm.attachEvent('onKeyUp', function(inp, ev, id, value)
  {
		var code = ev.key||ev.which;
		enableLogin();
		if((code == "Enter" || code == 13) && (id == "usr" || id == "pwd"))
    {
			if(wForm.isItemEnabled("login"))
       {
				     doLogin();
			 }
		}
	});

	wForm.attachEvent('onButtonClick', function(id){
		if(id=="login") {
			doLogin();
		}
	});


}
/**
 * Unload
 * @returns
 */
function doOnUnload() {
	if(wForm != null && wForm.unload != null) {
		wForm.unload();
		wForm = null;
	}
	if(wMain != null && wMain.unload != null) {
		wMain.unload();
		wMain = null;
	}
}
/**
 * Resize event
 * @returns
 */
function doOnResize() {
	if(wMain!=null) {
		wMain.centerOnScreen();
	}
}
/**
 * Rotate event
 */
window.addEventListener("orientationchange", function() {
	setTimeout(function(){
		doOnResize();
	}, 200);
});
