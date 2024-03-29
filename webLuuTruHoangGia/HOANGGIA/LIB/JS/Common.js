//=================================================================================================
//=================Global variables================================================================
if (navigator.appName=='Netscape'){	var IE=false }else{var IE = true}	//browser detection



//=================================================================================================
//================Global function==================================================================


//--Ham` thay the' cho getElementById() -->  Get('...')
	function Get(id){	return document.getElementById(id)	}

//--Ham` thay the cho getElementsByTagName
	function GetTag(obj, tag_name){ return obj.getElementsByTagName(tag_name) }

//--Ham` lay' item selected cua 1 selectbox
	function Get_SelectBox(id){		var P = id.options?id:Get(id); return P.options[P.selectedIndex]	}

//--Ham` chuyen doi tu` mau` sac cua Firefox (RGB) sang he mau` Hex :
	function FFColor(color){ return '#' + new String(color.match( /\d+\D+\d+\D+\d+/i )).RGBtoHEX();	}
	//--Ham` convert mau` tu RGB to Hex
	Number.prototype.toHexFixed = function () {return isNaN (this) ? 'NaN' : (this < 16 ? '0' + this.toString(16) : this.toString(16))}
	String.prototype.RGBtoHEX = function () {return /(\d+)\D+(\d+)\D+(\d+)/.test (this) ? [Number (RegExp.$1).toHexFixed(), Number (RegExp.$2).toHexFixed(), Number (RegExp.$3).toHexFixed()].join ('') : NaN}

//--Ham` hoan' doi 2 HTML Node cho nhau:
	function swapNode(N1, N2){
		var nextSibling = N1.nextSibling;
		var parentNode = N1.parentNode;
		N2.parentNode.replaceChild(N1, N2);
		parentNode.insertBefore(N2, nextSibling); 
	}


//--Ham` lay vi tri & kich thuoc cua 1 phan` tu HTML bat ki`
	function getPageCoords (element) {
		var coords = { x: 0, y: 0 , w:0, h:0 };
		coords.w = element.offsetWidth;
		coords.h = element.offsetHeight;
		while (element) {
			coords.x += element.offsetLeft;
			coords.y += element.offsetTop;
			element = element.offsetParent;
		}		return coords;	}



//----Ham` phong' to 1 buc anh ra. Tham so' Obj dau` vao` chinh la buc anh do'
function Magnify(Obj , x, y){
	var P = getPageCoords( Obj )
	if (Obj.src){Obj=Obj.src};
	var Code = '<img src="'+Obj+'">'
	var hscroll = (document.all ? document.scrollTop : window.pageYOffset)
	EMsg( Code , x||P.x , y||P.y, '' )
}


//----------------------------------------------------
//---Ham` Avail_Pos, tinh toan vi tri thich hop cho cac Tips_Cell
//---Tham so' dau` vao` la` 3 Object : Bound_Obj , Anchor_Obj & Tips_Obj;
//---Ngoai` ra co' 2 tham so' do lech theo phuong XAdd & YAdd.
function Avail_Pos(Bound_Obj , Anchor_Obj, Tips_Obj , XAdd , YAdd){
	if (Tips_Obj.style.display=='none'){Tips_Obj.style.display=='inline'}
	var B = getPageCoords(Bound_Obj); var A = getPageCoords(Anchor_Obj); var T = getPageCoords(Tips_Obj);
//	if (!IE){ if (Anchor_Obj.nodeName=='SPAN'){ A.w = A.style.width; A.h =A.style.} }

	if (A.x-B.x < B.w/2){
		var XPos= A.x + 2*A.w + (XAdd || 0)
	}else{
		var XPos= A.x-T.w - (XAdd || 0)
	}

	if (A.y-B.y < B.h/2){
		var YPos= A.y + (YAdd || 0)
	}else{
		var YPos= A.y + A.h-T.h - (YAdd || 0)
	}

	//window.status = 'A='+A.x+':'+A.y+ ':' + A.w +':' + A.h + '///'+  'B='+B.x+':'+B.y+'///'+ 'T SIze = '+ T.w+':'+T.h + '////X:Y=' + XPos +':' + YPos
	return {x:XPos , y:YPos}
}


//====================================================
//--Mot ham` Prompt moi' giao dien dep. Chu y : Trong no co 1 Iframe de tranh hien tuong trong IE 5,6 , Cac Selectbox bi dua len dau` chen ngang vao
	function EMsg(Code , x, y , w){
		var D = Get('EMsg_Div'); var K = Get('EMsg_Bg_iFrame');
		if (!D){	var f = document.createElement('div'); f.style.zindex=98;
				f.innerHTML+=	'<div Id="EMsg_Div" style="background:#ffffff;position:absolute;border:1px solid #336699;z-index:99">\n'+
						'	<table border="0" id="table1" cellspacing="2" cellpadding="0">\n'+
						'		<tr><td width=100% bgcolor="#3366AA" align=right>	<a style="text-decoration:none" href="javascript:EMsg_Close()">\n'+
						'			<font color="#FFFFFF"><b>X</b></font></a>&nbsp;&nbsp;	</td>\n'+
						'		</tr><tr><td>\n'+
						'				<table width=100% cellpadding=3 cellspacing=3 border=0>\n'+
						'					<tr><td id="EMsg_Td">\n'+
						'						&nbsp;\n'+
						'					</td></tr>	</table></td> </tr>	</table> </div>'+
						'		<iframe width=0 height=0 frameborder=0 scrolling=0 style="border:0;position:absolute;background-color:#ffffff" id="EMsg_Bg_iFrame"></iframe>'

				document.body.appendChild(f)
				var D = Get('EMsg_Div'); var K = Get('EMsg_Bg_iFrame');		}
		var T = Get('EMsg_Td'); T.innerHTML = Code;
		if (!isNaN(x)){D.style.left=x; K.style.left=x};	if (!isNaN(y)){D.style.top=y; K.style.top=y};
		if (!isNaN(w)){D.style.width=w; GetTag(D,'table')[0].width=w;}; D.style.display='inline'; K.style.display='inline';
		K.style.width=D.offsetWidth; K.style.height=D.offsetHeight; }

	function EMsg_Close(){Get('EMsg_Div').style.display='none'; Get("EMsg_Bg_iFrame").style.display="none"}



//==================================================================================================================
//----Color picker Pro--De su dung ham` nay` can` chuan bi truoc 2 bien' :  EName_Passed_Value & EName_Waiting_Func.

	function Color_Cell_Over(obj){Get('Color_Picker_Preview_Cell').style.backgroundColor=obj.bgColor;}
	function Color_Picker_OnClick(obj){	Editor_Passed_Value=obj.bgColor;	Editor_Waiting_Func() ;		}

	function Color_Palette( x, y){		//---x,y - Gan' toa. do hien thi cua Color Palette // E_Func : Ham` thuc thi khi click chon 1 color.
		var E = Get('Color_Div');

		if (!E){	var f = document.createElement('div')
					f.innerHTML = '<div id="Color_Div" style="position:absolute;top:200;left:200;display:none;z-index:130;" '+
									'onclick="javascript:this.style.display=\'none\'"></div>\n'+
									'<style>.Color_Cell {width:10;height:13}</style>\n'
					document.body.appendChild(f)
					var E = Get('Color_Div');	}

		if (E.style.display!='inline'){
			if (E.innerHTML==''){
				var Tbl_Code = '<table border=1 cellpadding=0 cellspacing=0 style="border:1px solid #ffffff;border-collapse:collapse;">\n'

				//------Tao Bang 216 mau`
				var U = new Array('00','33','66','99','cc','ff'); var L=U.length;	Code = Tbl_Code;
				for (var i=0;i<L;i++){	for (var j=0;j<L;j++){	for (var k=0;k<L;k++){
					var iCount = i*L*L + j*L + k;	RCount = iCount%108;	TCount = iCount%36;		CCount = iCount%6
					var Cell_Code = '<td width=10 height=13 onmouseover="Color_Cell_Over(this)"  onclick="Color_Picker_OnClick(this)"	bgColor="#'+U[i]+U[j]+U[k]+'"></td>\n'
					Code += ((RCount==0)?'<tr>\n':'') + ((TCount==0)?('<td>\n'+Tbl_Code):'') + ((CCount==0)?'<tr>\n':'') + Cell_Code + ((CCount==5)?'</td>':'') + ((TCount==35)?'</table></td>':'') + ((RCount==107)?'</tr>':'')
				}	}	}	Code += '</table>';

				//------Tao 1 dai mau` GrayScale + Preview Cell
				var E_Code = Tbl_Code +'<tr>'; var U= new Array('00','44','66','88','99','aa','bb','cc','dd','ee','ff')
				for (var i=0;i<U.length;i++){	E_Code +='<td width=10 height=13 onmouseover="Color_Cell_Over(this)" onclick="Color_Picker_OnClick(this)"	bgColor="#'+U[i]+U[i]+U[i]+'"></td>\n'	}
				E_Code += '<td id="Color_Picker_Preview_Cell" width=82 style="border:1px solid #000000"></td></tr></table>'

				Code = Tbl_Code+'<tr><td>'+ Code +'</td></tr><tr><td>'+ E_Code +'</td></tr></table>';
				E.innerHTML = '<style>.Color_Cell {width:10;height:13;}</style>\n' + Code;	}

			E.style.width=500;		E.style.height=300;
			E.style.top = y;		E.style.left = x;		E.style.display='inline';	E.style.zIndex=99
		}else{	E.style.display='none'	}		}




