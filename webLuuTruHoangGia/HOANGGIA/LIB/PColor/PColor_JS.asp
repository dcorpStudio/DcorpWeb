<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<style>
	.PColor_X {border:1px solid; width:20px; height:20px;}
	.PColor_X_Focus {border:3px solid; width:30px; height:30px;}
	.PColor_Button {border:1px solid #336699;background-color:#ffffff;width:120;}
</style>

<script>
	var PColor_Focus = null; //---This is a div
	var Editor_Waiting_Func = null; var Editor_Passed_Value = null;

	function PColor_Change_Image(Name){	if (PColor_Focus){window.open ( '<%=Global_Var("PColor_Path")%>/insert_pic.asp?Name='+Name,'upload_image',
					'toolbar=0,location=0,status=1,menubar=0,scrollbars=0,width=400,height=200' ) } }

	function PColor_Change_Color(Name,Obj){
		if (PColor_Focus){
			Editor_Waiting_Func = function(){  if (PColor_Focus){
											//-----Remove Image inside Div
											var M = GetTag(PColor_Focus , 'img')
											if (M[0]){M[0].parentNode.removeChild(M[0], true)}
											PColor_Focus.style.backgroundColor=Editor_Passed_Value
										} }
			var P = getPageCoords(Obj);	Color_Palette( P.x , P.y + P.h )
		} }

	function PColor_Del(Name){	var P=PColor_Focus; if(P && confirm('Bạn muốn xóa màu này?')){ P.parentNode.parentNode.removeChild(P.parentNode) } }

	function PColor_Edit(Obj,Name){ PColor_Focus = Obj; Obj.id = Name+'_PColor_Selected';
		document.getElementById(Name+'_PColor_Image').src = Obj.getElementsByTagName('input')[0].value;
		var Q=Obj.parentNode.parentNode.parentNode.getElementsByTagName('div');
		for (var i=0;i<Q.length;i++){ if (Q[i]!=Obj){Q[i].className='PColor_X'; Q[i].id='PColor_'+i} }
		Obj.className='PColor_X_Focus'
	}

	function PColor_Add(Name){	var P = Get(Name + '_PColor_Div');
		var Code =	'<td width=30><div id="PColor_New_Color" class="Pcolor_X" style="background-color:#ffffff" onclick="PColor_Edit(this,\''+Name+'\')">'+
					'	<input type=hidden value="<%=Global_Var("PColor_Path")%>/PColor_Editor/NoImage.jpg">	</div></td>'
		P.innerHTML = P.innerHTML.replace( '<!'+'--Waiting--'+'>' , Code + '\n<'+'!--Waiting--'+'>\n' )
		PColor_Edit( Get('PColor_New_Color') , Name)
	}

	function Multi_Color(Name){
		var P = document.createElement('img')
		P.src = "<%=Global_Var("PColor_Path")%>/PColor_Editor/Multi-Color.jpg"
		P.style.width = '100%'; P.style.height = '100%'; P.title = "Nhiều màu"
		//----Clone Input & ReAppend
		var Q = GetTag(PColor_Focus , 'input')[0].cloneNode(true)
		PColor_Focus.innerHTML = ''
		PColor_Focus.appendChild(P,true)
		PColor_Focus.appendChild(Q,true)
		PColor_Focus.style.backgroundColor = '#123456'
	}


	function Natural_Color(Name){
		var P = document.createElement('img')
		P.src = "<%=Global_Var("PColor_Path")%>/PColor_Editor/Natural_Color.jpg"
		P.style.width = '100%'; P.style.height = '100%'; P.title = "Màu tự nhiên"
		//----Clone Input & ReAppend
		var Q = GetTag(PColor_Focus , 'input')[0].cloneNode(true)
		PColor_Focus.innerHTML = ''
		PColor_Focus.appendChild(P,true)
		PColor_Focus.appendChild(Q,true)
		PColor_Focus.style.backgroundColor = '#234567'
	}
</script>


