<%if (!No_JS_File_In_Control){%>

<meta http-equiv="Content-Type" content="text/html; charset=utf-8">


<style>
	.Matrix_Count {color:#444; vertical-align:middle;}
	.Matrix_Del {vertical-align:middle;}
	.matrix_header td { vertical-align:middle; height:25px; }
	.matrix_header td {font-weight:bold; text-align:center;}

	.matrix_input {}
	.Matrix_Cell {padding:2px; height:25px; vertical-align:middle;}
</style>


<script>
	function Matrix_Del(Obj){
		if (confirm('Bạn chắc chắn muốn xóa?')){
			var P = Obj.parentNode.parentNode
			P.parentNode.removeChild(P,true)
		}
	}

	function Matrix_Add(Name){
		var K = Get('Matrix_New_'+Name)
		var P = GetTag(K , 'tr')[0]
		var Q = Get('Matrix_Table_'+Name);
		if (IE){Q=GetTag(Q,'tbody')[0]}
		Q.appendChild( P.cloneNode(true) ,false)
	}

	function Matrix_Get(Name){
		Name = Name.toLowerCase();	var P = Get('Matrix_Table_'+Name);
		var Q = GetTag(P, 'input'); var Code = ''
		for (var i=0;i<Q.length; i++){
			if (Q[i].type.toLowerCase()!='button'){
				Code += '\n' + Q[i].value
			}
		}
		return Code
	}
</script>

<%}%>

<%
//---------La` Control dung` de xu ly cac loai du~ lieu kieu nhu : Bang gia,  Cac cau hoi binh` chon ...
//------Data chi la` 1 Field trong DB, tuy nhien no chua' 1 String cau truc gom` nhieu` line. Moi~ line la` 1 element cua Matrix
//-----VD :   USA \n 20 \n China \n 08 \n Norway \n 126......
//------Hien tai, Control chi dap ung dc nhu cau` doi' voi' cac text box,
// ma` chua cho phep cac Cell cua table co the la` select box or chekcbox
// Ngoai ra, chi co the thay doi giao dien cua Control qua 1 so it cac thuoc tinh co ban. Chua ho tro Condition.


function Control_Matrix(Name, Data_Type , Data_Field, Max_val, Min_Val){
	//---Ke thua cac  thuoc tinh cua Input_Control
	var Tem_Obj = new Input_Control(Name, Data_Type , Data_Field, Max_val, Min_Val);
	for (var i in Tem_Obj){	this[i]=Tem_Obj[i]	}

	//---Default Properties
	this.Tbl_Inside_Tag = ''
	this.Default_Tbl_Tag = '\' cellpadding=0 cellspacing=0 border="1" width="\' +this.Width+ \'" style="border-collapse: collapse" bordercolor="#336699" \''
	this.Width=550
	this.Show_Count = 1		//--1/0  or  true/false ( display the row count (STT) or not )
	this.Show_Header = 1		//--1/0  or  true/false ( display the Header or not )

	//---Cac ham` JavaScript tro giup hoat dong trong FormCollection
	//--Ham` lay' value cua Control
	this.Get_Func =  'function(){\n'+
					'var Name = "'+Clean(this.Name)+'".toLowerCase();	var P = Get(\'Matrix_Table_\'+Name); \n'+
					'var Q = GetTag(P, "input"); var Code = ""; \n'+
					'for (var i=0;i<Q.length; i++){'+
					'if (Q[i].type.toLowerCase()!="button"){ \n'+
					'Code += \'\\'+'n\' + Q[i].value.replace(/\\'+'n/g,\'\') } \n } \n' + 'return Code.substring(1,Code.length); \n }'

	//--Ham` focus rieng
	this.Focus_Func = 'function(){window.location="#Matrix_'+Name+'"}'

	//--Attach function
	this.Attach_Func = 'function(){ var A = '+this.Get_Func+' \n Get("'+this.ID+'").value=A();}'



	this.Output = function (){
		//--Xu ly du lieu
		//var Data = this.Data?this.Data.replace( /^\n+/gi , '').replace( /\n+$/gi , ''):''
		//------ko xoa cac dau xuong don`g di, de phong` co item='' trong Data

		var Data = this.Data
		var Field_Arr = this.Field_Arr;	var Name = Clean(this.Name)
		var Tbl_Inside_Tag = (this.Tbl_Inside_Tag || eval(this.Default_Tbl_Tag) )

		for (var i=0; i<Field_Arr.length; i++){
			if (!Field_Arr[i].join){ Field_Arr[i] = Field_Arr[i].split(',') };
		}

		var Code =	'<a name="#Matrix_'+Name+'"></a>\n'
		//------------------Header
		Code += '<table ' +Tbl_Inside_Tag+ '>\n'
		if (this.Show_Header){
				Code += '	<tr class="matrix_header">\n'+		(this.Show_Count?'\t\t<td width=30>STT</td>\n':'')
				for (var i=0;i<Field_Arr.length;i++){
					if (Field_Arr[i]!='')
					Code += '\t\t<td style="width:' +Field_Arr[i][1]+ '">' +Field_Arr[i][2]+ '</td>\n'
				}
				Code +=	'		<td width="60">Delete</td>\n' +	'	</tr>\n</table>\n'
		}


		//------------------Matrix Body
		Code +=	'<table id="Matrix_Table_' +Name+ '" ' +Tbl_Inside_Tag+ '>\n'
		if (Data){
			var DB = Data.split('\n');
			var L = Field_Arr.length

			///---------Loop To Gen All Row
			for (var i=0;i<DB.length-1;i+=L){
				Code +=	'\t<tr>' +	(this.Show_Count?'\n\t\t<td width=30 align=center class="Matrix_Count">\n' +(i/L+1)+ '</td>\n':'')

				///--------Loop to Gen td & Input
				for (var j=0; j<Field_Arr.length;j++){
					if (Field_Arr[j]!=''){var Type='text'}else{Type='hidden'}
					var Input_Width = parseInt(Number(Field_Arr[j][1])*0.96)
					Code += '\t\t<td align="center" class="Matrix_Cell" style="width:' +Field_Arr[j][1]+ '">\n'+
							'\t\t<input type="'+Type+'" value="' +Convert(DB[i+j]).replace('\r','')+ '" style="width:' +Input_Width+ '"></td>\n'
				}

				Code +=	'\t\t<td align=center width=60 class="Matrix_Del"> <input type="button" value="Xóa" onclick="Matrix_Del(this)" ></td>\n'+
						'\t</tr>\n'
			}
		}
		Code += '\n</table>'


		//--------Footer
		Code +=	'	<table '+Tbl_Inside_Tag+'><tr>\n'+
				'		<td colspan="100" style="padding:10" align=center>\n'+
				'		<input type="button" value=" Reset " onclick="location.reload(true)"> &nbsp; '+
				'		<input type="button" value="Th&#234;m +" onclick="Matrix_Add(\''+Name+'\')"></td>\n'+
				'	</tr>\n'+
				'</table>\n' +
				'<input name="'+Name+'" type=hidden value="" ID="'+Name+'_ID">\n'


		//------Generate Code for new row
		var New_Row = '<table id="Matrix_New_'+Name+'" style="display:none">\n\t<tr> \n'+
						(this.Show_Count?'\n\t\t<td width=30 align=center>\n&nbsp;</td>\n':'')

		for (var i=0;i<Field_Arr.length; i++){
			if (Field_Arr[i]!=''){var Type='text'}else{Type='hidden'}
			New_Row +=	'\t\t<td align="center" class="Matrix_Cell" width=' +Field_Arr[i][1]+ '>\n'+
						'\t\t\t<input type="'+Type+'" onclick="Matrix_Add()" style="width:' +Field_Arr[i][1]+ '" value="' +Convert(Field_Arr[i][3] || '' , 0)+ '"></td>\n'
		}
		New_Row +=	'\t\t<td align=center width=60 class="Matrix_Del"> <input type="button" value="Xóa" onclick="Matrix_Del(this)" ></td>\n'+
				'	</tr>\n </table>'
		Code += New_Row

		return Code
	}
}
%>



