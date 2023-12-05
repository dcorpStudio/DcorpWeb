<%if (!No_JS_File_In_Control){%><head>
	<span id="Control_Calendar_Container"></span>
	<style> .link_hidden_here a {display:none;} </style>
<%}%>
<%
	//-----------------------------CALENDAR  CONTROL_____________________________________________________
	function Control_Calendar(Name, Data_Type , Data_Field, Max_val, Min_Val){
		//---Ke thua cac  thuoc tinh cua Input_Control
		var Tem_Obj = new Input_Control(Name, Data_Type , Data_Field, Max_val, Min_Val);
		for (var i in Tem_Obj){	this[i]=Tem_Obj[i]	}

		//---Output_function
		this.Output = function(){ if (this.Style===undefined){	this.Style = ' style="width:'+this.Width+'px; height:18px;" ' }
					return  '<div class="link_hidden_here" style="width:'+this.Width+'px;"><input type="' + (this.Type || 'text') + '" name="'+this.Name+'" ID="'+this.ID+'" '+this.Style+' '+this.Inside_Tag+
							' value="'+Convert(this.Data)+'"></div>\n'+
							'<'+'script type="text/javascript">\n'+
							'	$(function(){$("#'+Clean(this.Name)+'_ID").datePicker({clickInput:true});})'+
							'</'+'script>'
					}
	}
%>


