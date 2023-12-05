//-- the template render

/*
Data = DB_to_Arr() result;
Tem = String with "place-holder" format :   intro : <b>@field_name/</b> 
Condition = 'if (@id/==1){ @Name/ = "***" }'
*/


function JRender(Data, Tem, Condition){
	if (Data.Count==0) return ''

	var f = function(x){x=x.toLowerCase(); var i=Data.F[x]; return isNaN(i)?x:i}

	//--Condition manipulation
	if (Condition){ Condition = Condition.replace(/@([a-z0-9_]+)\//gi, function(a,b){ return 'Data[Data.i][f("'+b+'")]' } ) }
	var result=''; var FLen=(Data[0]||[]).length; //field length - number of the field
	for (Data.i=0;Data.i<Data.length;Data.i++){
		if (Condition){ Data[Data.i].i=Data.i; eval(Condition) }
		result+= Tem.replace( /@([a-z0-9_]+)\//gi , function(a,b){ return Data[Data.i][f(b)] } )
	}

	Data.i=0; return result;
}


//alert( '<option value=@id/> @menu_txt/ </option>'.replace( /@([a-z0-9_]+)\//gi , function(a,b,c){ alert(b); return b } ) )

/* example of using it

var Data = DB_to_Arr("Select top 3 ID,TenHS from PRODUCT")
var Tem = ' id @ID/ = @Name/ @TenHS/ \n'
var Con = 'if (@id/==1){ @Name/ = "***" }'

R( '<textarea cols=50 rows=10>' + JRender(Data, Tem, Con) +'</textarea>' )

*/