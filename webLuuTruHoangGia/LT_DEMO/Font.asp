<script>
function DBx(id){return DB_to_Arr("Select ID,Menu_Txt from DanhmucBQ where Font_ID="+id+" Order By ID DESC")}
$(function(){
	var DB = DB_to_Arr("Select ID,Menu_Txt from Font_MENU Order By ID DESC")
	var Condition = '@dmbq_list/ = JRender(DBx(@id/),$("#dmbq_tem").val())'
	$('#font_sep').after( JRender(DB, $('#font_tem').val(), Condition) )
})</script>




<div style="margin:50px; margin-top:30px;" id="xfont_div">
	<b style="color:#fff; font:14px tahoma; font-weight:bold;"> QUẢN LÝ CÁC PHÔNG LƯU TRỮ  </b>
	&nbsp; &nbsp; <b class="pseudo_but" onclick="add_font()"> [ Thêm phông ] </b> <div style="clear:both; height:20px;" id="font_sep"></div>

	<textarea id="font_tem" class="hide_"><div title="@id/"> <a href="#x">@menu_txt/</a><u onclick="add_dmbq(this)"> Thêm danh mục <strong>[ + ]</strong> </u> @dmbq_list/ </div></textarea>
	<textarea id="dmbq_tem" class="hide_"> <b title="@id/">@menu_txt/</b> </textarea>
</div>
<div id="float_input"><input /><b>OK</b><i>Xóa</i></div>


<style>
	#xfont_div div a{ display:block; color:#800; font-weight:bold; text-transform:uppercase; margin:10px; margin-right:0px; width:300px; 
						border:1px solid #ccc; background:#fff; padding:4px; float:left; }
	#xfont_div div u { display:block; float:left; padding:4px 10px 4px 10px; background:#eee; margin:10px; margin-left:0px; clear:right; border:1px solid #ccc;
						text-decoration:none; color:#090; cursor:pointer; }
	#xfont_div div b{ display:block; padding-left:50px; margin:15px 0px 15px 0px; clear:both; cursor:pointer; width:200px; }

	#float_input {position:absolute; z-index:100; display:none;}
	#float_input input { width:222px; height:25px; display:block; float:left; border:1px solid #ccc; vertical-align:middle; line-height:22px; background:#fec; padding-left:5px; }
	#float_input b { display:block; float:left; background:#eee; height:23px; line-height:23px; padding:0px 10px 0px 10px; border:1px solid #ccc; border-top:0px;  background:#090; color:#fff; cursor:pointer;}
	#float_input i { display:block; float:left; height:23px; text-align:center; line-height:23px; cursor:pointer; width:40px; border:1px solid #ccc; border-top:0px; background:#800; color:#fff; }
</style>


<script>
//***********************************************************************************
//****************************   FONT EDIT     **************************************
//***********************************************************************************

		var focusingObj=null; var floatInput_show=null; edit_type=''
		$(function(){
			//-- show edit bar
			$('#xfont_div a').live('click', function(){
				edit_type=0 //-- font
				var A = $('#float_input'); var X = $(this).offset(); focusingObj = $(this)
				A.show().css({ 'left':X.left, 'top':X.top }); $('input',A).val($(this).text()).focus();
			})

			//-- hide edit bar
			$('#float_input').hover(function(){floatInput_show=1}, function(){floatInput_show=0})
			$('html').click(function(){ if(!floatInput_show) $('#float_input').hide() })

			//-- update font / dmbq
			$('#float_input b').click(function(){
				var x = $(this).prev('input').val(); focusingObj.text(x); $('#float_input').hide()
				var id = edit_type?focusingObj.attr('title') : focusingObj.parent().attr('title');
				ExecSQL("Update "+ (edit_type?'DanhMucBQ':'Font_Menu')+ " set Menu_Txt='"+x+"' where ID="+id);
				if (edit_type){Load_DMBQ_List()}else{FONT_PICKER_GEN()}
			})

			//-- delete font / dmbq
			$('#float_input i').click(function(){
				if (confirm("Bạn chắc chắn muốn xóa "+ (edit_type?'danh mục':'phông')+ " này ?")){
					var id = edit_type?focusingObj.attr('title') : focusingObj.parent().attr('title');
					ExecSQL("Delete from "+ (edit_type?'DanhMucBQ':'Font_Menu')+ " where ID="+id)
					if (!edit_type){ FONT_PICKER_GEN(); focusingObj.parent().remove() }
					else{ Load_DMBQ_List(); focusingObj.remove(); }
					$('#float_input').hide();
				}
			})
		})


		function add_font(){
			ExecSQL("Insert Into FONT_MENU(Menu_Txt) Values ('Phông lưu trữ mới')");
			var DB = DB_to_Arr("Select top 1 ID,Menu_Txt from FONT_MENU Order By ID DESC");
			$('#font_sep').after(JRender(DB,$('#font_tem').val())); FONT_PICKER_GEN();
		}

//***********************************************************************************
//***********************************************************************************
//***********************************************************************************
</script>





<script>
//***********************************************************************************
//****************************   DMBQ EDIT     **************************************
//***********************************************************************************

		$(function(){
			//-- show edit bar
			$('#xfont_div div b').live('click', function(){
				edit_type=1 //-- dmbq
				var A = $('#float_input'); var X = $(this).offset(); focusingObj = $(this)
				A.show().css({ 'left':X.left+48 , 'top':X.top }); $('input',A).val($(this).text()).focus();
			})
		})

		function add_dmbq(obj){
			obj=$(obj); var X = obj.parents('div:first')
			ExecSQL("Insert Into DanhMucBQ(Font_ID,Menu_Txt) Values ("+X.attr('title')+", 'Danh mục bảo quản mới')");
			var DB = DB_to_Arr("Select top 1 ID,Menu_Txt from DanhMucBQ Order By ID DESC");
			obj.after(JRender(DB,$('#dmbq_tem').val())); Load_DMBQ_List();
		}

//***********************************************************************************
//***********************************************************************************
//***********************************************************************************
</script>


