<%@CODEPAGE="65001"%>
	<!--#include file="json2.asp"-->
	<script language=JScript runat=Server>
		function FSO() { return new ActiveXObject("Scripting.FileSystemObject") }
		function ABSPath(x) { return Server.MapPath(x) } //-- get absolute Path of file, folder
		function WriteToFile(path, content) {
			var A = FSO();
			var K = A.OpenTextFile(path, 2, true, -1);
			K.Write(content);
			K.Close();
			A = K = null
		}
		function ReadFromFile(path) {
			var F = FSO(); if (!F.FileExists(path)) { return ''; }
			var objStream = new ActiveXObject("ADODB.Stream"); objStream.CharSet = "utf-16"; objStream.Open()
			objStream.LoadFromFile(path); var strData = objStream.ReadText(); objStream.Close(); objStream = null;
			return strData;
		}

		//-- the path of our db
		var dbPath = ABSPath("softListJson.jdb");
	</script>


	<script language=JScript runat=Server>
		var mode = String(Request('mode'))

		switch (mode) {
			case 'jsAPI':
				function str2JS(x) { return x.replace(/\\/g, "\\\\'").replace(/\'/g, "\\'"); }
				try {
					var data = ReadFromFile(dbPath); Response.Write("serverUpdate_callback('" + str2JS(data) + "');");
				} catch (e) { break; }
				break;

			case 'updateSoftList':
				var d = String(Request('data'));
				d = d.replace(/(\_percent\_)/g, '%')
				d = decodeURIComponent(d);
				try {
					var newSoft = JSON.parse(d);
					var softArr = JSON.parse(ReadFromFile(dbPath) || '[]');
					softArr.push(newSoft);
					WriteToFile(dbPath, JSON.stringify(softArr));
					Response.Write("softSummit_CallBack();");
				} catch (e) {
					Response.Write(e.description + '\n' + e.lineNumber + '\n');
					Response.Write("input string = " + d);
					break;
				}
				break;

			default:
				var NORMAL_WEBFORM = true;
	</script>
	<!--#include file="softListForm.asp"-->
	<script language=JScript runat=Server>
				break;
		}
	</script>