<!--#include file=inc.asp-->
<%
	//--------A hard Test of what Member Need to Delete :)

	//-----Check the Table Name. Table_Name can be 1 among : Product, Rao, Price_List_Download
	var Table_Name = String(VBRequest('Table_Name')).toLowerCase()
	if (Table_Name=='rao'){

		//-------Check the ID
		var ID = parseInt(String(Request('ID')))
		if (!isNaN(ID) && ID > 0){

			//----Check the MEM_ID & Data_Exist from the Table & ID selected
			var MEM_ID = parseInt( DB_to_Val('Select Mem_ID from '+Table_Name+' where ID=' + ID) )

			if ( !isNaN(MEM_ID) && MEM_ID!='' && parseInt(MEM_ID)==parseInt((Session('Mem_ID'))) ){

				//--------Execute the Delete Command
				var  Conn = Conn_Obj()
				Conn.Execute('Delete from '+Table_Name+' where ID=' + ID)
				Conn.Close()
				Conn = null

			}
		}
	}%>

<%Response.Redirect( VBSession('Mem_Page_After_Delete') )%>


