//this file defines some common method-prototype & lobby function for some DB resource like : database,session,request,cookie,application...

//===========================================
//----------String Function
function R(x){document.write(x);}

//---- Cast Null,Undefined,Empty value :
function castNull(x){ x=String(x); return (x!='undefined')?x:'' }

//-- number , max & min
var max = Math.max; var min = Math.min; var abs = Math.abs;


//--- HTML Encode function for JavaScript
function htmlEncode (source, display, tabs) {
	var i, s, ch, peek, line, result, next, endline, push, spaces;
	next = function () { peek = source.charAt(i); i += 1; };
	endline = function () { line = line.join(''); if (display) { line = line.replace(/(^ )|( $)/g, '&nbsp;');} result.push(line); line = []; };
	push = function () { if (ch < ' ' || ch > '~') { line.push('&#' + ch.charCodeAt(0) + ';'); } else { line.push(ch);	} };

	tabs = (tabs >= 0) ? Math.floor(tabs) : 4;
	result = []; line = [];	i = 0; next();
	while (i <= source.length) { // less than or equal, because i is always one ahead
		ch = peek; next();
		// HTML special chars.
		switch (ch) {
		case '<': line.push('&lt;'); break;
		case '>': line.push('&gt;'); break;
		case '&': line.push('&amp;'); break;
		case '"': line.push('&quot;'); break;
		case "'": line.push('&#39;'); break;
		default:
			if (display) {
				switch (ch) {
					case '\r': if (peek === '\n') { next(); }; endline(); break;
					case '\n': endline(); break;
					case '\t': spaces = tabs - (line.length % tabs); for (s = 0; s < spaces; s += 1) { line.push(' '); }; break;
					default: push();
				}
			} else { push(); }
		}
	}
	endline(); result = result.join('<br />'); if (display) {	result = result.replace(/ {2}/g, ' &nbsp;'); }; return result;
};




//===========================================
//----------Expect function
//-- convert all value to a positive integer number (including null)
function expectInt(x,defaultVal){ x=parseInt(x); if(isNaN(x)||x<=0){return defaultVal||0}; return x; }

//-- convert all value to a positive float number (including null)
function expectFloat(x,defaultVal){ x=parseFloat(x); if(isNaN(x)||x<=0){return defaultVal||0}; return x; }

//-- convert all value to valid dataTime (including null)
function expectDate(x,defaultVal){ x=new Date(x); if(isNaN(x)){return defaultVal||new Date('1/1/100')}; return x; }



//===========================================
//------------DEAL WITH FILE SYSTEM OBJECT
//**** Important Note : file content mustn't have any Unicode character. Encode content before write to file
function FSO(){ return new ActiveXObject("Scripting.FileSystemObject") }
function ABSPath(x){ return Server.MapPath(x) } //-- get absolute Path of file, folder

function WriteToFile(path,content){
	var A = FSO(); A.CreateTextFile( path , true, true );
	var K = A.OpenTextFile( path,2 ); K.Write( content ); K.Close(); A=K=null
}

function ReadFromFile(path){  var A = FSO(); var K = A.OpenTextFile( path,1 ); var x=K.ReadAll();	K.Close(); A=K=null; return x; }

//--- Copy file, Move(cut) file, SAFE-Delete file
function CopyFile(src,dest){ FSO().CopyFile(src,dest,1) }
function MoveFile(src,dest){ if(!/\\$/.test(dest)){dest+='\\'}; FSO().MoveFile(src,dest) }		//-- ASP MoveFile function need destinationPath to be ended with '\'
function CutFile(src,dest){ if(!/\\$/.test(dest)){dest+='\\'}; FSO().MoveFile(src,dest) }		//-- the same to MoveFile
function DelFile(path){ var F=FSO();if (F.FileExists(path)){FSO().DeleteFile(path,1)} }			//--- Safe-Delete

//-- get fileName, file Extension
function getFileName(x){
	x = String(x); var sep = (x.indexOf('/')>=0)?'/':'\\'
	return x.substring(x.lastIndexOf(sep)+1, x.length)
}
function getFileExt(x){	x=String(x); return x.substring(x.lastIndexOf('.')+1, x.length) }



//===========================================
//--Date time function
function VDate(date,sep){var x=new Date(date);sep=sep||'/'; return x.getDate()+sep+(x.getMonth()+1)+sep+x.getYear()}   //----Date to response to client. dd/mm/yy
function VTime(date){var x=date || new Date(); return x.getDate()+'/'+(x.getMonth()+1)+'/'+x.getYear()+' '+x.getHours()+':'+x.getMinutes()+':'+x.getSeconds(); }

//-- detect object type : isFunc, isArr, isRegex
function isFunc(x){ if(!x){return 0}; return (x.constructor.s().indexOf('Function')+1)?1:0 };
function isArr(x){ if(!x){return 0}; return (x.constructor.s().indexOf('Array')+1)?1:0 };
function isRegex(x){ if(!x){return 0}; return (x.constructor.s().indexOf('RegExp')+1)?1:0 };


/*
 * A JavaScript implementation of the RSA Data Security, Inc. MD5 Message
 * Digest Algorithm, as defined in RFC 1321.
 * Version 2.2 Copyright (C) Paul Johnston 1999 - 2009
 * Other contributors: Greg Holt, Andrew Kepert, Ydnar, Lostinet
 * Distributed under the BSD License
 * See http://pajhome.org.uk/crypt/md5 for more info.
 */
var hexcase=0;function md5(a){return rstr2hex(rstr_md5(str2rstr_utf8(a)))}function hex_hmac_md5(a,b){return rstr2hex(rstr_hmac_md5(str2rstr_utf8(a),str2rstr_utf8(b)))}function md5_vm_test(){return hex_md5("abc").toLowerCase()=="900150983cd24fb0d6963f7d28e17f72"}function rstr_md5(a){return binl2rstr(binl_md5(rstr2binl(a),a.length*8))}function rstr_hmac_md5(c,f){var e=rstr2binl(c);if(e.length>16){e=binl_md5(e,c.length*8)}var a=Array(16),d=Array(16);for(var b=0;b<16;b++){a[b]=e[b]^909522486;d[b]=e[b]^1549556828}var g=binl_md5(a.concat(rstr2binl(f)),512+f.length*8);return binl2rstr(binl_md5(d.concat(g),512+128))}function rstr2hex(c){try{hexcase}catch(g){hexcase=0}var f=hexcase?"0123456789ABCDEF":"0123456789abcdef";var b="";var a;for(var d=0;d<c.length;d++){a=c.charCodeAt(d);b+=f.charAt((a>>>4)&15)+f.charAt(a&15)}return b}function str2rstr_utf8(c){var b="";var d=-1;var a,e;while(++d<c.length){a=c.charCodeAt(d);e=d+1<c.length?c.charCodeAt(d+1):0;if(55296<=a&&a<=56319&&56320<=e&&e<=57343){a=65536+((a&1023)<<10)+(e&1023);d++}if(a<=127){b+=String.fromCharCode(a)}else{if(a<=2047){b+=String.fromCharCode(192|((a>>>6)&31),128|(a&63))}else{if(a<=65535){b+=String.fromCharCode(224|((a>>>12)&15),128|((a>>>6)&63),128|(a&63))}else{if(a<=2097151){b+=String.fromCharCode(240|((a>>>18)&7),128|((a>>>12)&63),128|((a>>>6)&63),128|(a&63))}}}}}return b}function rstr2binl(b){var a=Array(b.length>>2);for(var c=0;c<a.length;c++){a[c]=0}for(var c=0;c<b.length*8;c+=8){a[c>>5]|=(b.charCodeAt(c/8)&255)<<(c%32)}return a}function binl2rstr(b){var a="";for(var c=0;c<b.length*32;c+=8){a+=String.fromCharCode((b[c>>5]>>>(c%32))&255)}return a}function binl_md5(p,k){p[k>>5]|=128<<((k)%32);p[(((k+64)>>>9)<<4)+14]=k;var o=1732584193;var n=-271733879;var m=-1732584194;var l=271733878;for(var g=0;g<p.length;g+=16){var j=o;var h=n;var f=m;var e=l;o=md5_ff(o,n,m,l,p[g+0],7,-680876936);l=md5_ff(l,o,n,m,p[g+1],12,-389564586);m=md5_ff(m,l,o,n,p[g+2],17,606105819);n=md5_ff(n,m,l,o,p[g+3],22,-1044525330);o=md5_ff(o,n,m,l,p[g+4],7,-176418897);l=md5_ff(l,o,n,m,p[g+5],12,1200080426);m=md5_ff(m,l,o,n,p[g+6],17,-1473231341);n=md5_ff(n,m,l,o,p[g+7],22,-45705983);o=md5_ff(o,n,m,l,p[g+8],7,1770035416);l=md5_ff(l,o,n,m,p[g+9],12,-1958414417);m=md5_ff(m,l,o,n,p[g+10],17,-42063);n=md5_ff(n,m,l,o,p[g+11],22,-1990404162);o=md5_ff(o,n,m,l,p[g+12],7,1804603682);l=md5_ff(l,o,n,m,p[g+13],12,-40341101);m=md5_ff(m,l,o,n,p[g+14],17,-1502002290);n=md5_ff(n,m,l,o,p[g+15],22,1236535329);o=md5_gg(o,n,m,l,p[g+1],5,-165796510);l=md5_gg(l,o,n,m,p[g+6],9,-1069501632);m=md5_gg(m,l,o,n,p[g+11],14,643717713);n=md5_gg(n,m,l,o,p[g+0],20,-373897302);o=md5_gg(o,n,m,l,p[g+5],5,-701558691);l=md5_gg(l,o,n,m,p[g+10],9,38016083);m=md5_gg(m,l,o,n,p[g+15],14,-660478335);n=md5_gg(n,m,l,o,p[g+4],20,-405537848);o=md5_gg(o,n,m,l,p[g+9],5,568446438);l=md5_gg(l,o,n,m,p[g+14],9,-1019803690);m=md5_gg(m,l,o,n,p[g+3],14,-187363961);n=md5_gg(n,m,l,o,p[g+8],20,1163531501);o=md5_gg(o,n,m,l,p[g+13],5,-1444681467);l=md5_gg(l,o,n,m,p[g+2],9,-51403784);m=md5_gg(m,l,o,n,p[g+7],14,1735328473);n=md5_gg(n,m,l,o,p[g+12],20,-1926607734);o=md5_hh(o,n,m,l,p[g+5],4,-378558);l=md5_hh(l,o,n,m,p[g+8],11,-2022574463);m=md5_hh(m,l,o,n,p[g+11],16,1839030562);n=md5_hh(n,m,l,o,p[g+14],23,-35309556);o=md5_hh(o,n,m,l,p[g+1],4,-1530992060);l=md5_hh(l,o,n,m,p[g+4],11,1272893353);m=md5_hh(m,l,o,n,p[g+7],16,-155497632);n=md5_hh(n,m,l,o,p[g+10],23,-1094730640);o=md5_hh(o,n,m,l,p[g+13],4,681279174);l=md5_hh(l,o,n,m,p[g+0],11,-358537222);m=md5_hh(m,l,o,n,p[g+3],16,-722521979);n=md5_hh(n,m,l,o,p[g+6],23,76029189);o=md5_hh(o,n,m,l,p[g+9],4,-640364487);l=md5_hh(l,o,n,m,p[g+12],11,-421815835);m=md5_hh(m,l,o,n,p[g+15],16,530742520);n=md5_hh(n,m,l,o,p[g+2],23,-995338651);o=md5_ii(o,n,m,l,p[g+0],6,-198630844);l=md5_ii(l,o,n,m,p[g+7],10,1126891415);m=md5_ii(m,l,o,n,p[g+14],15,-1416354905);n=md5_ii(n,m,l,o,p[g+5],21,-57434055);o=md5_ii(o,n,m,l,p[g+12],6,1700485571);l=md5_ii(l,o,n,m,p[g+3],10,-1894986606);m=md5_ii(m,l,o,n,p[g+10],15,-1051523);n=md5_ii(n,m,l,o,p[g+1],21,-2054922799);o=md5_ii(o,n,m,l,p[g+8],6,1873313359);l=md5_ii(l,o,n,m,p[g+15],10,-30611744);m=md5_ii(m,l,o,n,p[g+6],15,-1560198380);n=md5_ii(n,m,l,o,p[g+13],21,1309151649);o=md5_ii(o,n,m,l,p[g+4],6,-145523070);l=md5_ii(l,o,n,m,p[g+11],10,-1120210379);m=md5_ii(m,l,o,n,p[g+2],15,718787259);n=md5_ii(n,m,l,o,p[g+9],21,-343485551);o=safe_add(o,j);n=safe_add(n,h);m=safe_add(m,f);l=safe_add(l,e)}return Array(o,n,m,l)}function md5_cmn(h,e,d,c,g,f){return safe_add(bit_rol(safe_add(safe_add(e,h),safe_add(c,f)),g),d)}function md5_ff(g,f,k,j,e,i,h){return md5_cmn((f&k)|((~f)&j),g,f,e,i,h)}function md5_gg(g,f,k,j,e,i,h){return md5_cmn((f&j)|(k&(~j)),g,f,e,i,h)}function md5_hh(g,f,k,j,e,i,h){return md5_cmn(f^k^j,g,f,e,i,h)}function md5_ii(g,f,k,j,e,i,h){return md5_cmn(k^(f|(~j)),g,f,e,i,h)}function safe_add(a,d){var c=(a&65535)+(d&65535);var b=(a>>16)+(d>>16)+(c>>16);return(b<<16)|(c&65535)}function bit_rol(a,b){return(a<<b)|(a>>>(32-b))};


//---check mail function
function valid_mail(x){ return (/^[A-Za-z0-9._-]+@([A-Za-z0-9-]+\.)+[A-Za-z]{2,4}$/).test(x) }




//===========================================================================
//--- DATABASE FUNCTION
//===========================================================================

//----DB Connector
function Conn_Obj(Conn_Str){
	if (!Conn_Str){Conn_Str = Global.x("Conn_Str");}
	var K = new ActiveXObject("ADODB.Connection"); K.Open(Conn_Str); return K;
}

function ExecSQL(SQL){
	var C=Conn_Obj(); C.Execute(SQL); C.Close(); C=null;
}

function RS_Obj(SQL,Conn){
//SQL.R()
	var RS = new ActiveXObject("ADODB.RecordSet"); RS.Open(SQL,Conn,3,3); return RS;
}

//--Get single data
function DB_to_Val(SQL,Conn){
	var RS=RS_Obj(SQL, Conn=Conn||Conn_Obj() ); if (!RS.EOF){ var x=RS.fields(0).value; };
	RS.Close(); Conn.Close(); RS=Conn=null; return castNull(x);
}

//-- get 1 dimension array of data (JScript Array)
function DB_to_Arr1(SQL,Conn){	//--SQL.R()
	var colSep=Global.x('schar')+'-'; var rowSep=Global.x('schar')+'+';
	var RS=RS_Obj(SQL, Conn=Conn||Conn_Obj() );
	if (!RS.EOF){
		var x = RS.GetString(2,1e5, colSep, rowSep,''); x = x.substr(0, x.length-2);
		var sep = (x.indexOf(colSep)>=0)?colSep:rowSep;	x = x.split(sep);
	}
	RS.Close(); Conn.Close(); RS=Conn=null;	return x || [];
}



//--get 2 dimensions array of data (JScript Array)
function DB_to_Arr(SQL, pageSize, absPage, Conn){	//--SQL.R()
	var colSep=Global.x('schar')+'-'; var rowSep=Global.x('schar')+'+';
	var RS=RS_Obj(SQL, Conn=Conn||Conn_Obj() );
	var startPos =  ((absPage=expectInt(absPage,1)) - 1)*(pageSize=expectInt(pageSize,1e5))
	if (!RS.EOF){
		if (startPos < RS.RecordCount){RS.Move(startPos)}
		var x = RS.GetString(2, pageSize, colSep, rowSep,''); x = x.substr(0, x.length-2);
		x = String(x).split(rowSep); for(var i=0;i<x.length;i++){ x[i]=x[i].split(colSep) }
	}
	x=x||[]; x.i=0; x.F={}; x.FArr=[]; x.Count=RS.RecordCount; x.maxPage=Math.ceil(x.Count/pageSize); x.thisPage=absPage>x.maxPage?1:absPage;
	x.x=function(a){return x[this.i][this.F[a.toLowerCase()]]||''}
	for (var i=0;i<RS.Fields.Count;i++){ x.FArr[i]=RS.Fields(i).Name.toLowerCase(); x.F[x.FArr[i]]=i; }
	RS.Close(); Conn.Close(); RS=Conn=null; return x;
}


//-- update DB by a set of field & values
function DB_Update(TblName,Data,ID){
	try{
		var RS = RS_Obj( "Select * from ["+TblName+"]" + (ID?(" where ID="+ID):"") , Conn_Obj());  if (!ID){ RS.AddNew() }
		for (var i=0;i<Data.length;i++){ RS.Fields(Data[i][0]) = Data[i][1] }
		RS.Update(); RS = null; return 0
	}catch(e){
		return e.description
	}
}





