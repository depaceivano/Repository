function loader()
{

	wLoader = new dhtmlXWindows();
	winLoader = wLoader.createWindow('winLoader', 0, 0, 250, 60);
	winLoader.denyResize();
	winLoader.hideHeader();

		var formLoad =
		[
			{type:"label", name:"txt",    label:"Loading data...",               width: 22, offsetTop:0, offsetLeft:"10"  },
			{type:"label", name:"loader", label:"<img src='img/loaderBar.gif'>", width: 22, offsetTop:"0"  },
		];

		winLoader.attachForm(formLoad);


	winLoader.setText('Loading...');
	winLoader.setModal(1);

	winLoader.button('stick').hide();
	winLoader.button('park').hide();
	winLoader.button('minmax').hide();
	winLoader.centerOnScreen();

}

function unloader(){
	if((top.wLoader != null) && (top.wLoader.unload)) {
		if((top.winLoader != null) && (top.winLoader.unload)) {
			top.winLoader.hide();
			top.winLoader.unload();
			top.winLoader = null;
		}
		top.wLoader.unload();
		top.wLoader = null;
	}
}
