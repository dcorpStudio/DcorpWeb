<%// Some helpful function to make HTML content in ASP-JScript-Variables & smart HTML Builder for 
// some particular task, such as : SEND_MAIL (build HTML-Mail-BODY for Contact-Mail :: Prod-Order-Mail :: Signup Confirmation Mail :: ForgotPass Mail  :: etc...)
// OR save Client-Order (Render OrderInfo to static-HTML-report, independent from DB)

String.prototype.HTML = function(br){ var x=Server.HTMLEncode(this); return (!br)?x:x.replace(/\n/g,'\n<br>'); }
String.prototype.HTMLUnicode = function(){ return this.replace( /([^\x00-\x7F])/g, function(a,b){return String(b).HTML()} ) }

String.prototype.plugVar = function(A){ return this.replace(/@(\w+)\//g, function(a,b){ return A[b] } ) }
//example : R( 'xxxasddas @title/ asdasddass @detail/ asdfdsafds  '.plugVar({title:'$$$$', detail:'#####' }) )

function CSS(x){
	var A=[
		[	/;\s+/g,	';'	],
		[	/:(\d+)/g,	':$1px'],
		[	/f:/g,		'font-size:'],
		[	/c:/g,		'color:'],
		[	/bg:/g,		'background:'],
		[	/h:/g,		'height:'],
		[	/w:/g,		'width:'],
		[	/b\~/g,		'font-weight:bold'],
		[	/u\~/g,		'text-decoration:underline'],
		[	/i\~/g,		'font-style:italic'],
		[	/b(R|L|T|B)?:/g,	'border$1:'],
		[	/p(R|L|T|B)?:/g,	'padding$1:'],
		[	/m(R|L|T|B)?:/g,	'margin$1:'],
		[	/(R|L|T|B):/g,	function(a,b){ return '-'+{T:'top',R:'right',B:'bottom',L:'left'}[b] +':' } ],
		[	/(:\d+px) #/g,	'$1 solid #']
	]
	for (var i=0;i<A.l();i++){ x=x.replace(A[i][0], A[i][1]) }; return 'font:12px Arial;'+x;
}
// CSS( 'b~;c:#800;bB:1 #ccc;w:100;h:200;' ).R('<hr>');

String.prototype.CSS = function(){
	return this.replace( / style="([^"]+)"/gi, function(a,b){ return ' style="'+CSS(b)+'"' } )
}


//-- generate a mail BODY from DataArray & Intro_Array (C)
Array.prototype.To_Mail_Table = function(C){
	var code = '<table style="width:600px;">'; var A=this;
	var rowTem = '<tr><td style="bB:1 #ccc;h:30;w:100;bg:#F9F7DD;p:8;">@title/</td><td style="bB:1 #ccc;p:10;">@detail/</td></tr>'.CSS()
	for(var i=0;i<A.l();i++){	code+=	rowTem.plugVar({ title:C[i].HTML(), detail:A[i].HTML(1)||'&nbsp;' })		};
	return code + '</table>'
}


//--- function to make 1234567 --> 1,234,567
function Format_Price(x,default_text,suffix){
	if((/^\d+$/).test(x) && x!='0'){
		var S=''; x=String(x); for (var i=x.length;i>0;i--){ S = x.charAt(i-1) + ((x.length-i)%3==0?',':'') + S  }
		return S.substr(0,S.length-1) + (suffix||'')
	}else{ return default_text || '' }
}


//-- render the JArray with template
function JRender(Data, Tem, Condition){
	if (!Data || Data.length==0) return ''
	var f = function(x){x=x.toLowerCase(); var i=Data.F[x]; return isNaN(i)?x:i}

	//--Condition manipulation
	if (Condition){ Condition = Condition.replace(/@([a-z0-9_]+)\//gi, function(a,b){ return 'Data[Data.i][f("'+b+'")]' } ) }
	var result=''; var FLen=(Data[0]||[]).length; //field length - number of the field
	for (Data.i=0;Data.i<Data.length;Data.i++){
		if (Condition){ Data[Data.i]['i']=Data.i; eval(Condition) };
		result+= Tem.replace( /@([a-z0-9_]+)\//gi , function(a,b){ return Data[Data.i][f(b)] } )
	}

	Data.i=0; return result;
}


%>


