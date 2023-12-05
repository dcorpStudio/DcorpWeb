<%

	////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	//  Tao 1 Table Object de chuyen sap xep cac SP thanh` Table. Cac thong so' can` truyen` la` :  Cols , Table Format, Array(Array 1 chieu` chua' output)
	////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

	function Data_Table(Data , Cols , Format){
		this.Data = Data; this.Cols = Cols; this.Format = Format

		///--------Default Format
		this.Width='100%'
		this.Tbl_Format=' border=1 borderColor="#336699" style="border-collapse:collapse" cellpadding=0 cellspacing=0 '
		this.Tr_Format=''
		this.Td_Format=' valign=top style="word-wrap:break-word;" '

		///------get rows number
		this.Rows = function(){  var a=this.Data.length/this.Cols; var b=parseInt(a);  return (a==b)? b:b+1  }

		///-------Export Ouput
		this.Output = function(){
			//------Xu ly Width cua Table
			if (this.Width!=null){
				if ((new String(this.Width)).indexOf('%')>0){var per='%'}else{var per='';}
				var W=parseInt(this.Width);	this.Td_Width = parseInt(W/this.Cols)+per
				this.Tbl_Format+= ' width="'+this.Width+'"'
				this.Td_Format += ' width="'+this.Td_Width+per+'"'}

			//------Thiet lap cac Tag
			this.Tbl_Tag = '<table '+this.Tbl_Format+'>'
			this.Tr_Tag = '\n\t<tr '+this.Tr_Format+' >'
			this.Td_Tag = '\n\t\t<td '+this.Td_Format+' >'
			this.TBody = ''

			for (var i=1;i<=this.Rows();i++){
				for (var j=1;j<=this.Cols;j++){
					var I = (i-1)*this.Cols + j-1
					if (I<this.Data.length){	this.TBody+= ((j==1)?this.Tr_Tag:'') + this.Td_Tag + '\'+this.Data[\''+ I + '\']+\'' + '\n\t\t</td>\n\t' + ((j==this.Cols)?'</tr>':'')	}
				}
			}
			var spacer = '<tr>'
			for (var i=0;i<this.Cols;i++){
				spacer+= '<td width="'+this.Td_Width+per+'"></td>'
			}spacer += '</tr>'

			return this.Tbl_Tag + eval(HTML_to_ASP( this.TBody ,1)) + spacer+ '\n</table>'
		}
	}

%>


