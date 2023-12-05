<%


//===========================================================================
//--- UPGRADE ARRAY to JDB
//===========================================================================
Array.prototype.i=0; Array.prototype.F={};
Array.prototype.x=function(a){return this.length?( this[this.i][this.F[a.toLowerCase()]]||'' ):''};
Array.prototype.importField = function(f){
	if(isStr(f)){f=f.split(',')}; if (isArr(f)){
		for (var i=0;i<f.l();i++){this.F[f[i]]=i}
	}else{ this.F=f.clone()}/*object from another Arr*/
}



/*===========================================================================
=============================================================================
=================STANDARD JString Format=====================================
( suppose Global.x('schar') = '@' )


@= field0:0, field1:1, field2:2, ..., fieldN:N @= Count:100, maxPage:10, thisPage:3 @=
x11 @- x12 @- x13 @- x14 @+
x21 @- x22 @- x23 @- x24 @+
x31 @- x32 @- x33 @- x34 @+
x41 @- x42 @- x43 @- x44


x11, x12, .. x44 are all marix value
=================STANDARD JString Format=====================================
=============================================================================
===========================================================================*/

String.prototype.newJStr = function(){ //-- make a field_list like : "a:0,b:1,c:2" become a JString 
	var xSep=Global.x('schar')+'='; return this+ xSep+ 'Count:0,maxPage:0,thisPage:0'+ xSep
}




//===========================================================================
//--- DATABASE FUNCTION
//===========================================================================

//----DB Connector
function Conn_Obj(Conn_Str){
	if (!Conn_Str){Conn_Str = Global.x("Conn_Str");}
	var K = new ActiveXObject("ADODB.Connection"); K.Open(Conn_Str); return K;
}

function ExecSQL(SQL){	var C=Conn_Obj(); C.Execute(SQL); C.Close(); C=null; }

function RS_Obj(SQL,Conn){
	var RS = Server.CreateObject("ADODB.RecordSet"); if(SQL && Conn){
		try{ RS.Open(SQL,Conn,3,3) }catch(e){ SQL.R('<hr color="#cc0000">'); R(e.description) }
	}; return RS;
}

//--Get single data
function DB_to_Val(SQL,Conn){
	var RS=RS_Obj(SQL, Conn=Conn||Conn_Obj() ); if (!RS.EOF){ var x=RS.fields(0).value; };
	RS.Close(); Conn.Close(); RS=Conn=null; return castNull(x);
}


//-- function use DBOM to get fieldList from TableName & excluding_Field
function field_exclude(tblName,excField){
	var tbl = DBOM[tblName.L()]; if(!tbl){return}; var FieldArr=[]; excField = excField.L().replace(/\s+/g,'');
	for (var FieldName in tbl){if(!''[FieldName] && FieldName!='relateNNto' && !FieldName.inStr(excField) ){
		FieldArr.push(FieldName);
	}}; return '['+FieldArr.join('],[')+']';
}
//R(field_exclude('mem','add_time,last_login,my_user,my_pass'))


//-- Intermediate function, get data grid from DB in string form. Foundation to build the followings :  DB_to_Arr1, DB_to_Obj, DB_to_Arr, DB_to_JSDB
function DB_to_Str(SQL, pageSize, absPage, Conn){
	var s=Global.x('schar'); var colSep=s+'-'; var rowSep=s+'+'; var xSep=s+'=';
	var RS=RS_Obj(SQL, Conn=Conn||Conn_Obj() );	var startPos =  ((absPage=expectInt(absPage,1)) - 1)*(pageSize=expectInt(pageSize,1e5));
	if (!RS.EOF){
		if (startPos < RS.RecordCount){RS.Move(startPos)}
		var x = RS.GetString(2, pageSize, colSep, rowSep,''); x=x.substr(0, x.length-2);
	}
	x= new String(x||'');
	var F=''; for (var i=0;i<RS.Fields.Count;i++){ F+= RS.Fields(i).Name.toLowerCase()+ ':'+ i+ ',' }; F=F.replace(/,$/,'')
	var P='Count:'+ RS.RecordCount+ ',maxPage:'+ (Math.ceil(RS.RecordCount/pageSize))+ ',thisPage:'+ (absPage>x.maxPage?1:absPage)
	RS.Close(); Conn.Close(); RS=Conn=null; return F+ xSep+ P+ xSep+ x;
}


//-- get 1 dimension array of data (JScript Array)
function DB_to_Arr1(SQL,Conn){	//--SQL.R()
	var s=Global.x('schar'); var colSep=s+'-'; var rowSep=s+'+'; var xSep=s+'=';
	var x=DB_to_Str(SQL,1e5,1,Conn); x=x.split(xSep)[2]; var sep = (x.indexOf(colSep)>=0)?colSep:rowSep;
	return x==''?[]:(x.split(sep));
}


//--get 2 dimensions array of data (JScript Array)
function DB_to_Arr(SQL, pageSize, absPage, Conn){	//--SQL.R()
	return DB_to_Str(SQL, pageSize, absPage, Conn).toArr();
}




//===========================================================================
//--- Arr & String Conversion function (***)
//===========================================================================

////////////////////////////////////////
//-- lemma function
//== obj --> String
Object.prototype.flatten = function(sep,sep1){
	sep=sep||','; sep1=sep1||':';
	var x=''; for(var i in this){if(!''[i]){ x+=  i+sep1+this[i]+ sep }}
	return x.replace( new RegExp(sep+'$'),'' );
}
//== String --> obj
String.prototype.toObj = function(sep,sep1){
	sep=sep||','; sep1=sep1||':'; if(x=='') return {};
	var x=this.split(sep); var A={}; for(var i=0;i<x.l();i++){ var m=x[i].split(sep1); A[m[0]]=m[1] }
	return A;
}


////////////////////////////////////////
//-- Arr_to_Str
function Arr_to_Str(A){
	var s=Global.x('schar'); var colSep=s+'-'; var rowSep=s+'+'; var xSep=s+'=';
	var x=A.F.flatten(',',':') +xSep; x+= 'Count:'+(A.Count||0)+ ',maxPage:'+(A.maxPage||0)+ ',thisPage:'+(A.thisPage||0) + xSep
	for (var i=0; i<A.l();i++){ x+= A[i].join(colSep) + rowSep };
	return x.replace(new RegExp(s+'\\+$') , '')
}
Array.prototype.toStr = function(){ return Arr_to_Str(this) }


//-- Str_to_Arr
function Str_to_Arr(x){
	if (x==''){ return [] }
	var s=Global.x('schar'); var colSep=s+'-'; var rowSep=s+'+'; var xSep=s+'=';
	x=x.split(xSep); if(!x[2]){var A=[]}else{ var A=x[2].split(rowSep);	for (var i=0; i<A.l();i++){ A[i] = A[i].split(colSep)} };
	A.F=x[0].toObj(); var P=x[1].toObj(); A.Count=P.Count; A.maxPage=P.maxPage; A.thisPage=P.thisPage;
	return A;
}
String.prototype.toArr = function(){ return Str_to_Arr(this) }


////////////////////////////////////////
//-- JArr equiptment.

//-- check if a record exist in JArr by field value
Array.prototype.Exist = function(f,x){ //-- f=fieldName, x=value to compare
	var A=this; f = A.F[f]; if(!f){return -1}; for (var i=0;i<A.l();i++){ if (A[i][f]==x){ return i } }; return -1;
}

Array.prototype.Add = function(A,f,x){ if(f && this.Exist(f,x)>-1){return this}; this[this.length]=A; return this; }
Array.prototype.Del = function(f,x){ var i=this.Exist(f,x); if(i>-1){ this.splice(i,1) }; return this; }





////////////////////////////////////////
//-- JStr_to_JSArr 

//-- Lemma function to make data from DB like JavaScript variable, replace all singlequote, linebreak, <script> phrase & back slash \ character
function JS_Var(x){
	x = String(x).replace(/\\/g , '\\\\').replace(/\r/g , '').replace( /\n/g , "\\n" )
	return x.replace( /'/g , "\\'" ).replace( /\<\/(script)\>/gi , "<\/'+'$1>" )
}

String.prototype.toJSArr = function(packet,excField){
	var x=this; if (x==''){ x=''.newJStr(); };
	var s=Global.x('schar'); var colRe=new RegExp(s+'\\-','g'); var rowRe=new RegExp(s+'\\+','g'); packet=packet.L();
	var x=x.split(s+'='); var F=x[0]; var P=x[1].toObj(); var S=x[2];%>

	if (!DATA){var DATA={}}
	DATA.<%=packet%> = <%=S==''?'[]//':''%>[['<%=JS_Var(S).replace(colRe,"','").replace(rowRe,"'],\n\t['")%>']]
	DATA.<%=packet%>.Field = {<%=F.L()%>}; 
	DATA.<%=packet%>.F = DATA.<%=packet%>.Field 
	DATA.<%=packet%>.i=0; DATA.<%=packet%>.recordCount = <%=P.Count%>;
	DATA.<%=packet%>.maxPage = <%=P.maxPage%>; DATA.<%=packet%>.thisPage = <%=P.thisPage%>;
	DATA.<%=packet%>.x = function(a){ return DATA.<%=packet%>[ DATA.<%=packet%>.i][ DATA.<%=packet%>.Field[a] ] }

<%}

%>


