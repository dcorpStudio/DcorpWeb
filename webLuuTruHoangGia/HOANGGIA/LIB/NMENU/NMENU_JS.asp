<!--#Include file="Inc.asp"-->

<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<style>
	.Menu_UL {LIST-STYLE-TYPE: none;padding-left:30; margin-left:30; padding-top:3;padding-bottom:3; margin-top:3;margin-bottom:3}
	.Menu_LI {LIST-STYLE-TYPE: none;padding-top:2;padding-bottom:1; margin-top:2;margin-bottom:1}
	.Menu_Link {text-decoration:none; color:#000000; }
	.Menu_Link:hover{text-decoration:none; color:#cc0000}
	.Menu_Func {border:1px solid #336699;background-color:#ffffff; height:19}
	.Menu_All {text-decoration:none;font:15/16px tahoma;font-weight:bold;color:#000000}
</style>

<body onload="save_menu()">

<input type="hidden" id="Menu_Store">


<!------------------------------------------ACTION FORM----------------------------------------------------------->
	<form method=post id="menu_form" action="<%=Request.ServerVariables("SCRIPT_NAME")%>" onsubmit="update_menu()">
		<input type=hidden name="menu_command" id="menu_command">

		<div id="menu_input" style="position:absolute;display:none;z-index:99">
			<input name="menu_txt" id="menu_txt" style="height:20;width:150">
		</div>

		<input type=hidden name="ID_List" id="menu_id_list">
		<input type=hidden name="menu_parent" id="menu_parent">
	</form>


<!------------------------------------------MENU DIV & MENU EDIT BAR----------------------------------------------------------->
<div id="menu_edit_mask" style="opacity:0.5;filter:alpha(opacity=50);position:absolute;display:none;background-color:#ffffff;"></div>

<div id="menu_edit_bar" style="text-align:right;width:228;margin:0;padding:0;position:absolute;display:none;border:1px solid #336600;height:18;background-color:#ffffee;z-index:99">
		<a href="#menu_section" onclick="Menu_Up()" class="Menu_link">
				<img title="Lên" alt="Lên" border=0 src="<%=Global_Var("MENU_Editor_Path")%>/Menu_Editor/Up.gif"></a>&nbsp;

		<a href="#menu_section" onclick="Menu_Down()" class="Menu_link">
				<img title="Xuống" alt="Xuống" border=0 src="<%=Global_Var("MENU_Editor_Path")%>/Menu_Editor/Down.gif"></a>&nbsp;

		<%if (VBSession("Menu_Editor_Type") != "single"){%>
			<a href="#menu_section" onclick="Menu_Add()" class="Menu_link">
					<img title="Thêm" alt="Thêm" border=0 src="<%=Global_Var("MENU_Editor_Path")%>/Menu_Editor/Add.gif"></a>&nbsp;
		<%}%>

		<a href="#menu_section" onclick="Menu_Del()" class="Menu_link">
				<img title="Xóa" alt="Xóa" border=0 src="<%=Global_Var("MENU_Editor_Path")%>/Menu_Editor/Del.gif"></a>&nbsp;

		<input type=button onclick="update_menu();" class="Menu_Func" value="Update"><input type=button onclick="restore_menu();hide_edit_bar();" class="Menu_Func" value="Cancel">
</div>



<script>
	var Menu_Focus_Obj=null;

	//=====================================================================================================
	//------Restore_MENU
	function save_menu(){ Get('Menu_Store').value = Get('Edit_Menu_Div').innerHTML }
	function restore_menu(){ Get('Edit_Menu_Div').innerHTML = Get('Menu_Store').value; hide_edit_bar(); }

	//------switch_list : expand or collapse an item level : Param la` link Obj
	function menu_switch_list(obj){  var K = GetTag(obj.parentNode,'ul')[0];  hide_edit_bar();
		if (K){ if (K.style.display!='none'){K.style.display='none'}else{K.style.display='block'}  } }

	//------menu ready edit : Param la` link object
	function menu_ready_edit(Obj){
		eval('var Item_Val = Obj.'+ (IE?'innerText':'textContent') );
		show_edit_bar( Obj, Item_Val); Menu_Focus_Obj = Obj; }

	//---Show & hide edit_bar : Param la` link Obj
	function show_edit_bar(Obj,Input_Val){
		//---Hien thi button_bar
		var P = getPageCoords(Obj); var E = Get('menu_edit_bar');
		E.style.display ='inline'; E.style.top=P.y; E.style.left = P.x + 150;

		//---Hien thi Menu_Input
		var E = Get('menu_input'); E.style.display ='inline'; E.style.top=P.y; E.style.left = P.x;
		var D = GetTag(E , 'input')[0]; D.value = Input_Val ; D.focus();
		if (D.value==' '){D.value=''}

		//----hien thi mask
		var S = getPageCoords( Get('Edit_Menu_Div') );  var Q = Get('menu_edit_mask'); Q.style.display='inline';
		Q.style.top = S.y; Q.style.left = S.x; Q.style.width=S.w;  Q.style.height = S.h; }

	function hide_edit_bar(){Get('menu_edit_bar').style.display='none'
		Get('menu_edit_mask').style.display='none';
		Get('menu_input').style.display='none';
		Get('menu_command').value = ''; }


	//=====================================================================================================
	function Menu_Add(isAll){
		if (isAll==0){Menu_Focus_Obj=Get('0')}

<%if (Session("Menu_Editor_Limit") > 0){%>
		var P = Menu_Focus_Obj; var K = Get('Edit_Menu_Div') ; var i=0;
		while (P.parentNode && P.parentNode!=K){ P = P.parentNode; i+=1 }
		if (i/2 >= <%=Session("Menu_Editor_Limit")%>){ Menu_Focus_Obj = null; }
<%}%>

		if (Menu_Focus_Obj && Menu_Focus_Obj.innerHTML!='&nbsp;'){
			var K = Menu_Focus_Obj.parentNode;
			Get('menu_parent').value = Menu_Focus_Obj.id;
			Get('menu_command').value = 'insert';

			if (!GetTag(K,'ul')[0]){K.innerHTML+= '\n<ul class="Menu_UL"></ul>'}
			var Q = GetTag(K,'ul')[0]; var L = document.createElement('li'); L.className = 'Menu_Li'; L.style.height='25';
			L.innerHTML+= '<a href="#MenuABC" class="Menu_Link"></a><a href="#MenuABC" class="Menu_Link" id="A">&nbsp;</a>'
			Q.appendChild(L);  var N = GetTag(Q,'a');
			menu_ready_edit( N[N.length-1] );
		}
	}


	function swapHTML(A,B){ var T=A.innerHTML; A.innerHTML=B.innerHTML; B.innerHTML=T }

	//-----Menu Up
	function Menu_Up(){  var K = Menu_Focus_Obj.parentNode;
		var Q = K.parentNode.childNodes;
		for (var i=0;i<Q.length;i++){
			if (Q[i]==K && i>0){
				//---Neu la` firefox, tim` nextNode ma ko phai la textNode
				if (IE){     swapHTML(K, Q[i-1]);  menu_ready_edit( GetTag(Q[i-1],'a')[1] )    }
				else {
					for (var j=i-1;j>=0;j--){
						if (Q[j].nodeName=='LI'){
							swapHTML(K,Q[j]);  menu_ready_edit( GetTag(Q[j],'a')[1] )
							break; }
					}
				} break; }
		}
	}


	//-----Menu Down
	function Menu_Down(){  var K = Menu_Focus_Obj.parentNode;
		var Q = K.parentNode.childNodes;
		for (var i=0;i<Q.length;i++){
			if (Q[i]==K && i<Q.length-1){
				//---Neu la` firefox, tim` nextNode ma ko phai la textNode
				if (IE){     swapHTML(K, Q[i+1]);  menu_ready_edit( GetTag(Q[i+1],'a')[1] )    }
				else {
					for (var j=i+1;j<Q.length;j++){
						if (Q[j].nodeName=='LI'){
							swapHTML(K,Q[j]);  menu_ready_edit( GetTag(Q[j],'a')[1] )
							break; }
					}
				} break; }
		}
	}


	//=====================================================================================================
	function Menu_Del(){
		if (Menu_Focus_Obj.innerHTML!='&nbsp;'){
			if (confirm('Ban muon xoa danh muc nay va \ntoan bo cac san pham co trong danh muc ?')){
				Get('menu_command').value='Delete';
				Get('menu_parent').value = Menu_Focus_Obj.id;
				Get('menu_form').submit();
			}
		}
	}

	//----Menu ID List (ID Order || Menu Order )
	function Menu_ID_List(){var K = Menu_Focus_Obj.parentNode;
		var Q = K.parentNode.childNodes; var ID_List = ''
		if (Q){
			for (var i=0;i<Q.length;i++){
				if (Q[i].nodeName=='LI'){ ID_List+= GetTag(Q[i],'a')[1].id + ',' }
			}
		} return ID_List.substring(0,ID_List.length-1);  }


	//----Update Menu
	function update_menu(){
		if (Get('menu_txt').value.replace( /\s+/g , '') == ''){
			alert('Ten danh muc khong hop le!\nTen danh muc phai tu 1 den 255 ki tu.')
		}else{
			Get('menu_id_list').value = Menu_ID_List()
			if (Get('menu_command').value!='insert'){ Get('menu_command').value='update'; Get('menu_parent').value=Menu_Focus_Obj.id }
			//alert( 'menu_command :' + Get('menu_command').value +' \n ID_List(Order):'+ Get('menu_id_list').value + '\n menu_parent :' + Get('menu_parent').value )
			Get('menu_form').submit();
		}
	}
</script>



