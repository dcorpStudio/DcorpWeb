<%//this file defines some common method-prototype & lobby function for some DB resource like : database,session,request,cookie,application...

//===========================================
//----------String Function
function R(x){Response.Write(x);Response.Flush();}
Object.prototype.R = function(x){R( (x||'') + this + (x||'') )}

Object.prototype.prop = function(x,y){this[x]=y; return this;}		//---- easy way to plugin property
Object.prototype.s = function(){return String(this)}				//---- fastway to convert it to string
Object.prototype.l = function(){return this.length}					//---- count object to string len fast

String.prototype.xindexOf = function(x){return this.toLowerCase().indexOf(x.toLowerCase())}
String.prototype.xlastIndexOf = function(x){return this.toLowerCase().lastIndexOf(x.toLowerCase())}
String.prototype.xreplace = function(x,y){ return this.toLowerCase().replace( x.toLowerCase(), y ) }
Object.prototype.inRange = function(a,b){ return (this>=a && this<=b) }		//---fastly check if a number is in range from a to b
Object.prototype.inStr = function(x,sep){ sep=sep||','; return String(sep+x+sep).xindexOf(sep+String(this)+sep) >= 0 }		// check if this tring appears inside another string

String.prototype.U = function(){return this.toUpperCase()}
String.prototype.L = function(){return this.toLowerCase()}
String.prototype.fixQuote = function(){return this.replace(/'/g,"\\'")}

//---- Cast Null,Undefined,Empty value :
function castNull(x){ x=String(x); return (x!='undefined')?x:'' };
String.prototype.castNull = function(x){ return castNull(x) }

//-- number , max & min
var max = Math.max; var min = Math.min; var abs = Math.abs;


//===========================================
//----------Expect function
//-- convert all value to a positive integer number (including null)
function expectInt(x,defaultVal){ x=parseInt(x); if(isNaN(x)||x<=0){return defaultVal||0}; return x; }

//-- convert all value to a positive float number (including null)
function expectFloat(x,defaultVal){ x=parseFloat(x); if(isNaN(x)||x<=0){return defaultVal||0}; return x; }

//-- convert all value to valid dataTime (including null)
function expectDate(x,defaultVal){ x=new Date(x); if(isNaN(x)){return defaultVal||new Date('1/1/100')}; return x; }



//===========================================
//----Request (Response) data from(to) Other Resource
function RQ(x){return castNull(Request(x))};					String.prototype.RQ = function(){return RQ(this)}
function RQQ(x){return castNull(Request.QueryString(x))};		String.prototype.RQQ = function(){return RQQ(this)}
function RQF(x){return castNull(Request.Form(x))};				String.prototype.RQF = function(){return RQF(this)}
function RQC(x){return castNull(Request.Cookies(x))};			String.prototype.RQC = function(){return RQC(this)}
function RQS(x){return castNull(Session(x))};					String.prototype.RQS = function(){return RQS(this)}
function RQA(x){ return castNull(Application(x))};				String.prototype.RQA = function(){return RQA(this)}



//--wrie to Application & Session
String.prototype.toApp=function(f){ Application.Lock(); Application(f) = String(this); Application.UnLock(); }
String.prototype.toSess=function(f){ Session(f) = String(this)}


//--write cookie to client
function RCookie(name,val,time){
	var x = new Date(); x.setMinutes(x.getMinutes()+time); //cookie living time in minute unit
	Response.Cookies(name) = val;
	Response.Cookies(name).Expires = x.toStd(); //x.toStd().R('<b>');
}


function getIP(){
	var Client_IP = String(Request.ServerVariables("HTTP_X_FORWARDED_FOR"))
	if (!Client_IP || Client_IP=='' || Client_IP=='undefined'){ Client_IP = Request.ServerVariables("REMOTE_ADDR") }
	return new String(Client_IP)
}



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
Object.prototype.toDate = function(){ return new Date(this) }
function VDate(date,sep){var x=new Date(date || new Date());sep=sep||'/'; return x.getDate()+sep+(x.getMonth()+1)+sep+x.getYear()}   //----Date to response to client. dd/mm/yy
function VTime(date){var x=new Date(date || new Date()); return x.getDate()+'/'+(x.getMonth()+1)+'/'+x.getYear()+' '+x.getHours()+':'+x.getMinutes()+':'+x.getSeconds()}
Date.prototype.toVDate = function(){return VDate(this)};
Date.prototype.monthName = function(){return ['January','February','March','April','May','June','July','August','September','October','November','December'][this.getMonth()]}
Date.prototype.toStd = function(){var x=this;return x.getDate()+' '+x.monthName()+' '+x.getYear()+' '+x.getHours()+':'+x.getMinutes()+':'+x.getSeconds()}

//--Date add & subtract
Date.prototype.add = function(unit,amount){	var x={s:'Seconds',n:'Minutes',h:'Hours',d:'Date',m:'Month',y:'Year'}; x=this['set'+x[unit]](this['get'+x[unit]]()+amount); return new Date(x) }
Date.prototype.subtract = function(unit,amount){ return this.add(unit, -1*amount) }


//===========================================
//--- OBJECT METHOD
//----Loop through an Object
Object.prototype.each = function(F){for (var x in this){if(!''[x]){ F(x,this[x]) }}}
//----Loop through an Array
Array.prototype.loop = function(f){for(var i=0;i<this.length;i++){f(this,i)}; return this; } 	//example : 	['kaka','keke','kuku'].each(function(A,i){A[i]=A[i]+i}).join('---').R()


//--- Copy object. Try to prevent using this function as much as u can
Object.prototype.clone = function() {
	var newObj = (this instanceof Array) ? [] : {};
	for (i in this) {
	if (i == 'clone') continue;
	if (this[i] && typeof this[i] == "object") {
	  newObj[i] = this[i].clone();
	} else newObj[i] = this[i]
	} return newObj;
};

//-- detect object type : isFunc, isArr, isRegex
function isFunc(x){ if(!x){return 0}; return (x.constructor.s().indexOf('Function')+1)?1:0 };	Object.prototype.isFunc = function(){return isFunc(this)};
function isArr(x){ if(!x){return 0}; return (x.constructor.s().indexOf('Array')+1)?1:0 };		Object.prototype.isArr = function(){return isArr(this)};
function isRegex(x){ if(!x){return 0}; return (x.constructor.s().indexOf('RegExp')+1)?1:0 };	Object.prototype.isRegex = function(){return isRegex(this)};
function isStr(x){ if(!x){return 0}; return (x.constructor.s().indexOf('String')+1)?1:0 };		Object.prototype.isStr = function(){return isStr(this)};

//--- MD5 encryption function  //--- using :  var x = md5('test')
%><!--#include file=md5-min.asp--><%

//---check mail function
function valid_mail(x){ return (/^[A-Za-z0-9._-]+@([A-Za-z0-9-]+\.)+[A-Za-z]{2,4}$/).test(x) }



%>





