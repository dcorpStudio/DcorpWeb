<!--#include file="Config/Config.asp"-->
<%Response.Buffer = true%>

<%
//----Xu ly URL, loc ra filename , sau do' ghep voi' Global_var("Upload_File_Path") de tao thanh URL chuan
URL = String(Request("URL"))
var File_Name = URL.substring( URL.lastIndexOf( '/' )+1 , URL.length )
URL = Global_Var("Upload_File_Path") + "/" + File_Name

//R(File_Name); br();
//R(URL);F()

File_Path = Server.Mappath(URL)
Response.ContentType = "application/file"
Response.AddHeader ("content-disposition","attachment; filename=" + File_Name )
var FStream = new ActiveXObject("ADODB.Stream")
FStream.Open()
FStream.Type = 1
FStream.LoadFromFile(File_Path)
Response.BinaryWrite (FStream.Read())
%>


