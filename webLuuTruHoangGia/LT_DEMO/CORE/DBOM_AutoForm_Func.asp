<%//---this file contains support function for DBOM_Form auto-generating.


//-- function to write Server DataType to Javascript
function ASP_to_JSVar(d){
	if (!d){return "''"}; var x=d.constructor.s();
	if(/Number|RegExp|Function/.test(x)){return d}
	if(/String|Date/.test(x)){return "'"+d+"'"}
	if(/Array/.test(x)){ var y='['; x.loop(function(i,a){y+=a+','}); y+=']'; return y}
}


//--- function to display all DBOM_Tbl fields' information with excluding_Field
function DBOM_Tbl_Info(tblName, exc_Field){
	tblName = tblName.L()%>
	if (!DBOM_TBL){ var DBOM_TBL={} }
	DBOM_TBL.<%=tblName%>={
		<%var TBL = DBOM[tblName]; if (!TBL){Response.End()}; exc_Field=exc_Field.replace(/\s+/g,'');
		var Prop_Arr = ['minLen','maxLen','regex','notNull','minVal','maxVal','castFunc','sep','unique_field','FControl', 'extList', 'fileSize']
		for (var x in TBL){if (!''[x] && x!='relateNNto' && (!exc_Field || !x.inStr(exc_Field))){
			var JDB=''

			//-- check the givenStr - givenField (INSTR type) to add additional information
			var givenStr=TBL[x].givenStr; if (givenStr){
				var A=givenStr.split(','); for(var i=0;i<A.length;i++){ A[i]='['+i+',\''+A[i]+'\']' }
				var JDB = '['+A.join(',')+']'
			}

			var givenField=TBL[x].givenField; if (givenField){
				var gTBL=givenField.split('.')[0];
				var A=DB_to_Arr('Select ID,menu_txt,root_item from ['+gTBL+'] order by root_item ASC, menu_Order ASC')
				for (var i=0;i<A.l();i++){ A[i]='['+A[i][0]+',\''+A[i][1]+'\','+A[i][2]+']' }
				var JDB = '['+A.join(',')+']'
			}
			%>
			<%=x%>:{<%for (var i=0;i<Prop_Arr.l();i++){ R(Prop_Arr[i]+':'+ASP_to_JSVar(TBL[x][Prop_Arr[i]])+',') }%>friendlyName:'<%=DBOM_friendlyName[tblName][x]%>',instrDB:<%=JDB||'null'%>},

		<%}}%>
		_:null
	}
<%}


%>




