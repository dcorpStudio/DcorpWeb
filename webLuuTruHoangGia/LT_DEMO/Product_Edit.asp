<!--#include file="CORE/x_inc.asp"-->

<div style="padding-left:100px;">


			<br><br /><br /><b style="font:16px Tahoma; color:#fff; font-weight:bold;" id="edit_status"></b>


				<style>
					.edit_table td { color:#333; padding:4px; margin:4px; padding-top:12px; vertical-align:top;}
					.edit_table td input, .edit_table td select, .edit_table td textarea { width:260px; height:20px; }
					.edit_input { width:260px; }
					.edit_intro_col1 { width:190px; text-align:right; }
					.edit_intro_col2 { width:120px; text-align:right;}

					.edit_table span {color:#c00; font-weight:bold;} /*error span*/
					#dmbq_id_ID {background:#fff; text-decoration:none;}
				</style>


			<form id="edit_form" xonsubmit="return false">
				<table style="width:800px;" class="edit_table">
					<tr>
						<td class="edit_intro_col1">Danh mục bảo quản</td>
						<td class="edit_input_td"> <span id="err_danhmucbq_id"></span> <u id="dmbq_combo_container"></u> </td>
						<td class="edit_intro_col2">Năm bảo quản</td>
						<td class="edit_input_td"><span id="err_nambq"></span><input id="nambq_ID"> </td>
					</tr>

					<script>
						<%DB_to_Str("Select ID,Menu_Txt from DanhMucBQ where font_id="+RQ("font").fixQuote()).toJSArr('dmbq_combo')%>
					</script>
					<script> $(function(){
						var DB = DATA.dmbq_combo
						$('#dmbq_combo_container').html( '<select id="danhmucbq_id_ID" name="danhmucbq_id" style="background:#fff; font-style:normal;"><option value="0">-- Chọn danh mục bảo quản --</option>'+
						JRender( DB, '<option value="@id/" > @menu_txt/ </option>' ) +"</select>" );
					}) </script>

					<tr>
						<td class="edit_intro_col1">Hộp số</td>
						<td class="edit_input_td"><span id="err_hopso"></span><input id="hopso_ID" name="hopso"></td>
						<td class="edit_intro_col2">Hộp số phụ <i>(a,b..)</i></td>
						<td class="edit_input_td"><span id="err_hopso_extra"></span><input id="hopso_extra_ID" name="hopso_extra"></td>
					</tr>
					<tr>
						<td class="edit_intro_col1">Hồ sơ số</td>
						<td class="edit_input_td"><span id="err_hsso"></span><input id="hsso_ID" name="hsso"></td>
						<td class="edit_intro_col2">HS số phụ <i>(a,b..)</i></td>
						<td class="edit_input_td"><span id="err_hsso_extra"></span><input id="hsso_extra_ID" name="hsso_extra"></td>
					</tr>
					<tr>
						<td class="edit_intro_col1"> Thời gian tài liệu </td>
						<td class="edit_input_td"><span id="err_f_date"></span><input id="f_date_ID" name="f_date"></td>
						<td class="edit_intro_col1"> Số tờ văn bản</td>
						<td class="edit_input_td"> <span id="err_soto"></span><input id="soto_ID" name="soto"></td>
					</tr>
					<tr>

						<td class="edit_intro_col1">Tên hồ sơ</td>
						<td class="edit_input_td"><span id="err_tenhs"></span><textarea id="tenhs_ID" name="tenhs" style="height:60px;"></textarea></td>
						<td class="edit_intro_col2">Ghi chú</td>
						<td class="edit_input_td"> <span id="err_ghichu"></span><textarea id="ghichu_ID" name="ghichu" style="height:60px;"></textarea></td>
					</tr>
					<tr><td valign="top" width="900" colspan="4"><hr color="#003366" size="1"></td></tr>
					<tr>
						<td valign="top" width="360" colspan="2"> <i style="color:#555; line-height:1.6;"><b>Lưu ý : </b>&nbsp; <br /> -Tên hồ sơ viết đúng chính tả và không viết tắt để tìm kiếm được chính xác <br /> - Hộp số phụ, hồ sơ số phụ chỉ được phép là các chữ cái 'a,b,c' </i> </td>
						<td valign="top" width="150">&nbsp;</td>
						<td valign="top" class="edit_input_td">

							<input type="submit" value="" style="width:0px; height:0px;" />
							<b class="pseudo_but" onclick="$('#edit_form').submit()">&nbsp; Lưu lại &nbsp;</b> <b class="pseudo_but" onclick="D.backpage();">Quay lại</b>

						</td>
					</tr>
				</table>
			</form>

</div>



<script>
var normal_255 = function(x){ if(String(x).length>=255){ return false }else{ return x } }
var normal_int = function(x){ x=parseInt(x); return (isNaN(x) || x<=0)?false:x }
var extra_check = function(x){ x=String(x).replace(/\s/g,''); if(x.length>254) return false; return (/^[a-z0-9]*$/g).test(x)?x:false }
var check_tenHS = function(x){ return (!x || x=='')?false:x }

var E = [
	['danhmucbq_id',	normal_int,		'Bạn chưa chọn danh mục bảo quản !'],
	['hopso',			normal_int,		'Hộp số không hợp lệ !'],
	['hsso',			normal_int,		'Hồ sơ số không hợp lệ !'],
	['hopso_extra',		extra_check,	'Số phụ không hợp lệ !'],
	['hsso_extra',		extra_check,	'Số phụ không hợp lệ !'],
	['f_date',			normal_255,		'Thời gian tài liệu không quá 255 ký tự!'],
	['nambq',			normal_255,		'Năm bảo quản không quá 255 ký tự!'],
	['soto',			normal_255,		'Số tờ không quá 255 ký tự!'],
	['tenhs',			check_tenHS,	'Tên hồ sơ không hợp lệ !'],
	['ghichu',			normal_255,		'Ghi chú không quá 255 ký tự']
];

$(function(){
	//-- if edit mode, fill the data
	if (D.EDIT_MODE=='update' && D.PROD_ID){
		$('#edit_status').text('Chỉnh sửa thông tin hồ sơ')
	}else{ $('#edit_status').text('Thêm mới thông tin hồ sơ') }

	//-- data checking
	$('#edit_form').submit(function(){


		//-- Data checking
		var valid_data = true; var Data=[]; for (var i=0;i<E.length;i++){
			var x=E[i][0]; var A=$('#'+x+'_ID').val();
			if (E[i][1](A)===false){ $('#err_'+x).html(E[i][2]); valid_data=false; }
			else{ $('#err_'+x).html(''); Data[i]=[x,A]; }
		}

		//-- Data Insert-Update
		if (valid_data){
			$("#submit_result").load( "content.asp?t=prod_edit&"+ $("#edit_form").serialize(), function(edit_result){
				if (edit_result=="true"){
					alert( ((D.EDIT_MODE=='update')?'Chỉnh sửa':'Thêm mới')+' thông tin hồ sơ thành công !' )
					D.load('Product_Edit.asp?font=<%=RQ('font')%>')
				}
				// alert(edit_result)
			})
		}
		return false;
	})
})

</script>



<div id="submit_result" style="display:none;"></div>