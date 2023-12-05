<!--#include file="CORE/x_inc.asp"-->

<%var x = RQ('t').fixQuote().L()
switch (x){
	case "doc_count":
		R( DB_to_Val("Select Count(ID) from PRODUCT where DanhMucBQ_ID in (Select ID from DanhMucBQ where FONT_ID="+ RQ('font').fixQuote() +")") )
		break;
	case "dmbq_name":
		R( DB_to_Val("Select Menu_Txt from DanhMucBQ where ID="+RQ("dmbq_id").fixQuote()) )
		break;
	case "dmbq_count":
		R( DB_to_Val("Select Count(ID) from Product where DanhMucBQ_ID="+RQ("dmbq_id").fixQuote()) )
		break;
	case "prod_edit":
		var Data = ['danhmucbq_id','hopso','hsso','hopso_extra','hsso_extra','f_date','nambq','soto','tenhs','ghichu'];
		var RS = RS_Obj( "Select * from PRODUCT ", Conn_Obj());
		RS.AddNew();
		for (var i=0;i<Data.length;i++){
			if(RQ(Data[i])!=''){
				RS.Fields(Data[i]) = RQ(Data[i])
			}
		}
		RS.Fields("Temporary") = 1
		RS.Update(); RS = null; R("true")
		break;
}
%>


