

//--- *** IMPORTANT NOTE : this method can be used only if DB is Order by root_Item ASC (root item first, child item next)

function JSelectBox( DB, intro_text, emptyType){
	var tab = '&nbsp; &nbsp;'; var subSign = '|_';
	var Tem='<option value="id">menu_txt</option>#id/'
	var S = '#0/'; DB.level = {}
	DB.x=function(f){ return DB[DB.i][DB.Field[f.toLowerCase()]] }

	for (DB.i=0;DB.i<DB.length;DB.i++){
		var root = DB.x('root_item'); var level = (root=="0")?1:(DB.level[root]+1); level=level||0; DB.level[DB.x('id')] = level
		var Menu_Txt = (new Array(level)).join(tab) + (level==1?'':subSign) + DB.x('Menu_Txt').replace(/^\s+/g,'')[level==1?'toUpperCase':'toString']()
		var root = '#'+DB.x('root_item')+'/';
		var optionTag = (level==1?'<option value="-1"> </option>':'') + Tem.replace(/id/g, DB.x('id')).replace('menu_txt',Menu_Txt)
		S=S.replace( root , optionTag + root )
	}
	return '<option value="'+ (emptyType?'':'0') +'">'+intro_text+'</option>' + S.replace(/#\d+\//g,'')
}
