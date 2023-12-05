<%@Language="JScript"%>

<%
//-------------Config all Global variable , DB_Path ,  Image_Path, ..etc..
//-----Function to return every global variable. (Avoid to conflict with any "raw varibale")
//-----Note : All the variable name go after "case ..."  must be lowercased.

function Global_Var(Name){
	var Site_Path = "/LT_Demo"
	var Site_Url = 'http://luutruthanglong.com'

	switch (String(Name).toLowerCase()){
		case 'site_path' : return Site_Path; break;

		case 'site_url' : return Site_Url ; break;

		//--------email for Anonymous email (such as order mail) or confirm mail
		case 'default_email' : return 'mail@anninhso.net'; break;

		case "admin_email" : return "cameratheodoi@gmail.com"; break;
		//case "admin_cc_email" : return "DiaChiKhac@yahoo.com"; break;


		case "db_type" :
			return 0; break;	//----- 0 : MSAccess
			//return 1; break;	//----- 0 : MSSQL

		case "conn_str" :
			return 'PROVIDER=MICROSOFT.JET.OLEDB.4.0;DATA SOURCE=' +Server.Mappath(Site_Path + '/DB/DB.mdb'); break;			//--MSACCESS
			//return 'Provider=SQLOLEDB;Data Provider=SQLOLEDB;Server=FIONA;Database=AGIANG;Uid=sa;Pwd=123'; break;		//--MSSQL 2000
			//return 'Driver={SQL Native Client};Server=localhost;Database=DB_Name;Uid=User;Pwd=Pass;'; break;					//--MSSQL 2005

		case 'img_path' : return (Site_Path + '/Upload/Image'); break;
		case 'upload_file_path' : return (Site_Path + '/Upload/File'); break;

		case 'editor_img_path' : return (Site_Path + '/Lib/Editor');  break;
		case 'filebox_path' : return (Site_Path + '/Lib/FileBox'); break;

		case 'menu_editor_path' : return (Site_Path + '/Lib/NMENU');  break;
		case 'nimage_path' : return (Site_Path + '/Lib/NImage'); break;
		case 'pcolor_path' : return (Site_Path + '/Lib/PColor'); break;
		case 'calendar_path' : return (Site_Path + '/Lib/CALENDAR'); break;

		case 'link_for_mail' : return ( Site_Url + Site_Path ); break;

		case 'mem_price_limit' : return 5; break;
		case 'vip_price_limit' : return 10; break;
	}
}
%>




