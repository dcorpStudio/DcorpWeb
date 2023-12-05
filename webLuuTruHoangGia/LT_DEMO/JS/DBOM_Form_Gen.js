//--- GENERATE DBOM_FORM WITH DBOM INFO FROM SERVER (Including friendlyName & default_Control)

$.DBOMForm_Tem = '<tr><td style="width:100px;"></td><td><i class="formErr"></i></td></tr><tr><td><b>@intro/ : </b></td><td> @control/ </td></tr>\n'
$.DBOMForm_Tem1 = '<tr><td><b>@intro/ : </b></td></tr><tr><td><i class="formErr"></i></td></tr><tr><td> @control/ </td></tr>\n'

function DBOMForm_Gen(tblName,data,Tem,noTable,htmlboxHeight){
	var TBL = DBOM_TBL[tblName.toLowerCase()]; if (!TBL) return; Tem = Tem || $.DBOMForm_Tem;
	var FORM=[]; FORM.Field = { intro:0, control:1, control_obj:2 }; var i=0;
	for (var f in TBL){
		if (!TBL[f]){ continue }
		if (data.length){ var x=data[0][data.Field[f]]||'' }
		switch (TBL[f].FControl){
			case 'textbox':
			case 'textarea':
			case 'passbox':
			case 'htmlbox':
				var Control = FControl[TBL[f].FControl](f,x, htmlboxHeight||400); break;
			case 'selectbox':
				var intro_text = '-- Chọn '+TBL[f].friendlyName.toLowerCase()+' --'
				var Control = FControl[TBL[f].FControl]( f, x, TBL[f].instrDB, intro_text );
				break;
			case 'filebox':
				var Control = FControl[TBL[f].FControl]( f, x, (x||'').split('/').pop(), TBL[f].extList, TBL[f].fileSize )
				break;
		}

		FORM[i] = [ Capital(TBL[f].friendlyName), '<div style="display:none" title="'+f+'"></div>', Control]
		FORM[i].f = f; i++;
	}
	var X = noTable?$('<div>'+JRender(FORM, Tem)+'</div>') : $('<table>'+JRender(FORM, Tem)+'</table>');
	for (var i=0;i<FORM.length;i++){ X.find('div[title="'+FORM[i].f+'"]').replaceWith( FORM[i][2] ) }
	return X
}
