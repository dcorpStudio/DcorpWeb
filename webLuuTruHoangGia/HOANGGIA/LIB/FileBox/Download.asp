<script language="jscript" runat="server">
Response.Buffer = true

var ID = parseInt(Request('ID'))
var File_Path = Session('Download_Slot_' + ID)
if (File_Path){
	File_Path = Server.Mappath(File_Path)
	var P = File_Path
	FileName = P.substring( P.lastIndexOf('\\')+1 , P.lastIndexOf('_') ) + P.substring( P.lastIndexOf('.') , P.length )

	Response.ContentType = "application/msword"
	Response.AddHeader("content-disposition","attachment; filename=" + FileName)
	var FStream = new ActiveXObject("ADODB.Stream")
		FStream.Open()
		FStream.Type = 1
		FStream.LoadFromFile(File_Path)
	Response.BinaryWrite(FStream.Read())
}
</script>