<%	//-----Cac ham` ASP ho~ tro Generate JavaScript dung trong trang.
	//----Ham` Generate JS Check form cho Control Collection

	function Control_JS_Code(FormName,Control_Arr, Err_Format, Addition_JS){
		var K=Control_Arr;
		var Code = '<scr'+'ipt language="javascript">\n'

		//-----Cac ham kiem tra du lieu co ban
		var DT = new Control_Data_Type
		for (var i in DT.A){	Code+= '\t var DT_'+i+'=' + DT.A[i][1] + '\n'	};	Code += '\n';

		//---Dinh nghia cac Array, cac Object truoc vong` lap
		Code += '\tvar '+FormName+'_Info = new Array(); var P='+FormName+'_Info;\n'+
				'\t//===========================================Cac thong tin goc\n'

		//__________________________________________________________________________________________________BIG LOOP
		for (var i=0;i<K.length;i++){	var C=K[i];	var Name = C.Name;	var Condition = C.Condition_Arr;
			//===========Thong tin co ban
			Code+=	'\n\tP['+i+']=new Array("'+C.Name+'" , "'+C.Data_Type+'" , '+C.Max_Val+' , '+C.Min_Val+');\n'

			//===========Condition_Arr & Err_Msg
			Code += '\n\tvar '+Name+'_Con = new Array; var Q = '+Name+'_Con;\n'
			if (Condition['All']){ Code += '\tQ["All"] = "'+Condition['All'].replace(/'/g , "\'" )+'"\n\n' }

			//====================Cac ham` kiem tra du~ lieu cua tung` Control
			Code += !K[i].Get_Func?'':('\tQ["Get"] = '+K[i].Get_Func+'\n')
			Code += !K[i].Focus_Func?'':('\tQ["Focus"] = ' +K[i].Focus_Func+ '\n')
			Code +=	!K[i].Attach_Func?'':('\tQ["Attach"] = ' +K[i].Attach_Func+ '\n')

			for (var j=0;j<Condition.length;j++){
				if (Condition[j]){
					Code+=	'\tvar '+Name+'_'+j+'_Func='+Condition[j][1]+'\n'+
							'\tQ.push(new Array('+Name+'_'+j+'_Func , "'+Condition[j][2].replace(/'/g , "\'")+'"));\n'
				}
			}
		}


		//--Ham` Big_Check_Form : Check toan` bo form
		Code +='\n\tfunction '+FormName+ '_Big_Check_Form(){ var Valid = true;\n'
		for (var i=0;i<K.length;i++){	if (K[i].Attach_Func){		//----Chay cac ham` Attach
				Code+='\n\t\t'+K[i].Name+'_Con["Attach"]();\n' } }

		for (var i=0;i<Addition_JS.Before.length;i++)
			Code+= '\t\tvar Attach_'+i+' = '+Addition_JS.Before[i]+'\n\t\tAttach_'+i+'()\n'

		Code+=	'\t\tvar P = '+FormName+'_Info;\n'
		Code+=	'\t\tfor (var i=0;i<P.length;i++){	var Name = P[i][0]; var Q = eval(Name+"_Con");\n'+
				'\t\t\t var CVal= Q["Get"]?Q["Get"]():Get(Name+"_ID").value\n'+
				'\t\t\tClear_Err(Name);\n'+
				'\t\t\tfor (j=0;j<Q.length;j++){\n'+
				'\t\t\t\t if (Q[j][0](CVal)===false){ Add_Err(Name , (Q["All"]||Q[j][1]) ); Valid = false; if (Q["All"]){break;}; };\n'+
				'\t\t\t}\n'+ '\t\t}'

				for (var i=0;i<Addition_JS.After.length;i++)
					Code+= '\n\t\t\tvar Attach_'+i+' = '+Addition_JS.After[i]+'\n\t\t\tAttach_'+i+'()\n'

		Code += '\n\treturn Valid}\n'

		Code += '\n\t//------Cac ham` thao tac Err_Span\n'+
				'\tvar Err_Format = "'+Err_Format.replace(/'/g , "\'")+'";\n'
		Code +=	'\tfunction Add_Err(Name , Msg){\n'+
				'\t\tGet(Name+"_Err_Span").innerHTML+= "<br>"+Err_Format.replace("xxx",Msg);\n'+
				'\t\tvar Q=eval(Name+"_Con"); if (Q["Focus"]){Q["Focus"]()}else{Get(Name+"_ID").focus()}; }\n'
		Code += '\tfunction Clear_Err(Name){ Get(Name+"_Err_Span").innerHTML="" };'

		return Code+'\n<'+'/script>'	}
%>





