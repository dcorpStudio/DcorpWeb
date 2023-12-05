<!--#include file=CORE/x_inc.asp--> <%Response.ContentType="text/javascript"; Response.Charset="utf-8"%>

<%//========================================
//--- function to check parameters

String.prototype.Regex = function(){return Regex(this)}; Object.prototype.Regex = function(){return this}
String.prototype.toMatrix = function(sep1,sep2){return this.split(sep1).loop(function(A,i){A[i]=A[i].split(sep2)})}

//-----Common Operator
function Operator(x){
	return {
		'<'		:function(a,b){return a<parseFloat(b)},							//---value less than
		'<<'	:function(a,b){return a.length < parseFloat(b)}, 				//---length less than
		'<<<'	:function(a,b){return a.toDate() < b.toDate()}, 				//---date time less than
		'>'		:function(a,b){return a>parseFloat(b)},							//---value value greater than
		'>>'	:function(a,b){return a.length > parseFloat(b)}, 				//---length greater than
		'>>>'	:function(a,b){ return a.toDate() > b.toDate()}, 				//---date time greater than
		'match'	:function(a,b){ return b?(b.Regex().test(a)):false },			//---test value by regex
		'in'	:function(a,b){ return (','+b+',').indexOf(','+a+',') > -1 },	//---test if value a appears in list b. EG : b="1,3,5,7" & a =3 -->true
		'!='	:function(a,b){ return String(a) != String(b) }					//-- test if value is different from a certain value
	}[x.L()]
}

//-----Common regex pattern
function Regex(x){
	return {
		int 	: /^-?\d+$/,
		float	: /^-?\d+\.?\d+$/,
		email	: /^[A-Za-z0-9._-]+@([A-Za-z0-9-]+\.)+[A-Za-z]{2,4}$/i,
		date	: /^\d{2}\/\d{2}\/\d{4}$/
	}[x.L()];
}


String.prototype.CheckP = function(P){
	if (typeof(P)=='string'){ P=P.toMatrix('#','=') }
	if(P){for (var i=0;i<P.length;i++){
		if (typeof(P[i][0])!='function'){ P[i][0]=Operator(P[i][0]) }
		if(!P[i][0] || !P[i][0](this,P[i][1])){
			return (P[i][2]||'').prop('err', P[i][3]||'' )
		}
	}}
	return this.prop('err',0)
}


/****example of using data checking method
	var X = 'kak@aak.com'.CheckP([
		['match', 'email'.Regex() ,'anonymous@mail.com','wrong data type !'] ,
		['<<',20,'','max length exceeded !'] ,
		['>>',1,'','Min length reached !'],
		[function(a,b){return a.indexOf('kaka')} ,'','default_mail@yahoo.com','Email existed !']
	]);
	X.R('=');

	var Y = 'aka@yahoo.com'.CheckP('match=email#>>=20=anonymous@yahoo.com=Email phải trên 20 ký tự')
	'cat'.RQ().CheckP('match=date=01/01/1970#>>>=10/10/2010=10/10/2010').R().F(); '<hr>'.R();
	'num'.RQ().CheckP('match=int=1#>=0=1').R('//')
****/




//========================================
//---Function to generate Effective SQL
//---Including SQL Operation to make condition & SQL sorting (Order By)
function SQL_Operator(x){
	return {
		'>'		:function(a,b){return "Cint(["+a+"]) > "+b},				//-- compare int
		'<'		:function(a,b){return "Cint(["+a+"]) < "+b},				//-- compare int
		'='		:function(a,b){return "["+a+"]="+b},					//-- compare int
		'=='	:function(a,b){return "["+a+"]='"+b.fixQuote()+"'" },	//-- compare text
		'==='	:function(a,b){return "["+a+"]=#"+b.fixQuote()+"#"},	//-- compare datetime
		'in'	:function(a,b){return "CInt(["+a+"]) in ("+b+")" },			//-- in operator
		'like'	:function(a,b){ b=b.fixQuote(); return a.split(',').loop(function(A,i){ A[i]="["+A[i]+"] like '%"+b+"%' " }).join(' or ') }	//--like operator
	}[x.L()]
}

function ParamGen(A){
	if (A && A.length){
		var Con=''; for (var i=0;i<A.length;i++){
			if ( A[i].val.CheckP(A[i].checkRule).err===0 ){ Con+= ' and ('+ SQL_Operator(A[i].sqlOperator)(A[i].fieldName,A[i].val) +')' }
		}
	}; return Con?(' Where '+Con.replace(/^ and/,'')):''
}


function SortGen(A){
	if (A && A.length){
		var Sort=''; for (var i=0;i<A.length;i++){
			if (A[i][1]){ Sort+= ','+A[i][0]+' '+ (A[i][1]==1?'ASC':'DESC')  }
		}; return Sort?(' Order By '+Sort.replace(/^,/,'')):''
	}; return '';
}




//========================================
//---Function to make data from DB like JavaScript variable.
//---Replace all singlequote, linebreak, <script> phrase & back slash \ character
function JS_Var(x){
	x = String(x).replace(/\\/g , '\\\\').replace(/\r/g , '').replace( /\n/g , "\\n" )
	return x.replace( /'/g , "\\'" ).replace( /\<\/(script)\>/gi , "<\/'+'$1>" )
}


//----Function to Output the data
function Data_Out(Packet,SQL,pageSize,absPage,paramArr,sortArr){
	SQL = " Select * from (" + SQL +") "+ ParamGen(paramArr) + SortGen(sortArr)
	DB_to_Str(SQL,pageSize,absPage).toJSArr(Packet)
}



/***** Function Data_Out explanation
	Data_Out ( 'ModuleName', 'SQL', PageSize, AbsolutePage, PramArray , SortArray )
	ParamArray format :  [
							['field1' , 'operator1' , valuetoCompare1 , validationRule1 ],
							['field2' , 'operator2' , valuetoCompare2 , validationRule2 ],
							....
							['fieldN' , 'operatorN' , valuetoCompareN , validationRuleN ]
						 ]
	validationRule : view in DataCheck.asp file (must be string)
	operator : view function SQL_Operator
*****/









//============================================
//=====THIS PART PREPARES THE PARAMETER & SORTER AVAILABLE FOR EACH MODULE==========
//===========================================%>

<%var module = 'module'.RQ().L()
switch (module){


	/****----example of DataParam Preparation */
		//----Thread Packet
		case 'product':
			//--extra function to list all available cats from a root_item
			function genCatList(root_item){
				if (!root_item || root_item.CheckP('match=int#>=0').err!==0) return ''; var x = DB_to_Arr1('Select ID from DanhmucBQ where Cint(font_id)='+root_item); return (x.l()?x.join(','):'0') }

			var ProdParam = [
				//{fieldName:'cat_id',   sqlOperator:'=',  	val:'cat'.RQ(),						checkRule:'match=int#>=0'},
				{fieldName:'danhmucbq_id',   sqlOperator:'in',	val:genCatList('font'.RQ()),	checkRule:'>>=0'},		//-- sql condition to get all the prods from 1 grandfather category
				//{fieldName:'car_id',   sqlOperator:'=',  	val:'car'.RQ(),						checkRule:'match=int#>=0'},
				{fieldName:'danhmucbq_id',   sqlOperator:'=',	val:'dmbq_id'.RQ(),	checkRule:'>>=1'},		
				{fieldName:'tenhs,ghichu',   sqlOperator:'like',   val:'key'.RQ(), checkRule:'>>=0'},
				{fieldName:'hsso',  sqlOperator:'=',  val:'hsso'.RQ(),   checkRule:'match=int#>=0'},
				{fieldName:'hopso',  sqlOperator:'=',  val:'hopso'.RQ(),   checkRule:'match=int#>=0'},
				{fieldName:'hopso',  sqlOperator:'=',  val:'hopso'.RQ(),   checkRule:'match=int#>=0'},
				{fieldName:'f_date',  sqlOperator:'like',  val:'fdate'.RQ(),   checkRule:'>>0'},
				{fieldName:'nambq',  sqlOperator:'like',  val:'nambq'.RQ(),   checkRule:'match=int#>=0'},
				{fieldName:'soto',  sqlOperator:'like',  val:'soto'.RQ(),   checkRule:'match=int#>=0'}
			]
			var ProdSort = [ ['ID', RQ('id_sort')] ]
			Data_Out( module , "Select * from [Product_Full] Order By HSSO, Len(HSSO_Extra) , HSSO_Extra , HOPSO, HOPSO_Extra, ID ASC" , 30 , 'page'.RQ(), ProdParam, ProdSort )
			break;
	/**-----*/

}%>





<%//===================================
//--- run the callbackFunc (if exists)%>
if ($.dataLoadCallBack){ $.dataLoadCallBack(); $.dataLoadCallBack = null; }








