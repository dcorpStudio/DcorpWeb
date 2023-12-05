
//-- limit the string length to a fixed integer (Used for news' title)
function limitText(x,limit,etcSign){
	return x.substring(0,limit) + ((x.length > limit)?(etcSign||'...'):'')
}


//-- full image path to thumb path
function toThumb(x){
	if(x){ var i=x.lastIndexOf('/'); return x.substring(0,i)+'/Thumb'+x.substring(i,1e4) }
	return '';
}

function JSVar(x){
	x = String(x).replace(/\\/g , '\\\\').replace(/\r/g , '').replace( /\n/g , "\\n" )
	return x.replace( /'/g , "\\'" ).replace( /\<\/(script)\>/gi , "<\/'+'$1>" )
}

function asTitle(x){ return x.replace(/"/g,"'"); }

function lineBreak(x){ return x.replace(/\n/g,'\n<br>') }

function VDate(x){ if (x==''){ return '' }; x=x.split(' ',1)[0].split('/'); return x[1]+'/'+x[0]+'/'+x[2] }

//--- function to make 1234567 --> 1,234,567
function Format_Price(x,default_text,suffix){
	if((/^\d+$/).test(x) && x!='0'){
		var S=''; x=String(x); for (var i=x.length;i>0;i--){ S = x.charAt(i-1) + ((x.length-i)%3==0?',':'') + S  }
		return S.substr(0,S.length-1) + (suffix||'')
	}else{ return default_text || '' }
}


//-- functioon to help building the product header text
//--- this function will get the cat info (ID, Menu_txt, root_item) out of the "DATA.menu" (M) with the id given (x)
function getCat(x,M){
	for(var i=0;i<M.length;i++){
		if(x==M[i][M.Field.id]){
			return {id:x, menu_txt:M[i][M.Field.menu_txt], root_item:M[i][M.Field.root_item]}
		}
	}
}



