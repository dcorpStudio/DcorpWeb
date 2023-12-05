<%//----Global configuration for website
var x = {
	//---function to get all value
	'x':function(a){
		var S = this[String(a).toLowerCase()]
		return (typeof(S)=='function')?S():S;
	}
}


//---The following part must keep still for editing by FSO
//--^
	x.db_type		=	0
	x.site_url		=	'http://'+ Request.ServerVariables("server_name")
	x.site_path		=	function(){var a=Request.ServerVariables("SCRIPT_NAME")+''; return a.substr( 0, a.indexOf('/',1) ) }
	x.conn_str		=	function(){
							var DB_Path = Server.Mappath( Global.x('site_path') ) + '/DB/DB.mdb'
							var F=FSO();if (!F.FileExists(DB_Path)){ DB_Path=DB_Path.replace(/([a-z1-9_]+)_(en|fr|ge)\//i,'$1/') } //-- if in EN part, use the DB Path of the main part
							return 'Provider=Microsoft.Jet.OLEDB.4.0; Data Source =' + DB_Path
						}
	x.max_upload		=	12*1024*1024
	x.upload_folder		=	x.x('site_path') + '/Upload'
	x.tem_upload_folder		=	x.x('site_path') + '/TemUpload'
	x.schar		=	'\u06de'
	x.img_max_w		=	1024
	x.img_max_h		=	1500
	x.uploadable_ext		=	'jpg,jpeg,gif,bmp,png,rar,zip,doc,docx,txt,txtx,ppt,pptx,flv,swf,xls,xlsx,mdb.mdbx,mp3'
	x.captcha_w		=	123
	x.captcha_h		=	23
	x.mail_sender		=	'mail@'+Request.ServerVariables("server_name")
	x.captcha_bgcolor		=	"#007B91"
	x.captcha_textcolor		=	"#ffffff"
	x.captcha_fontface		=	"Verdana"
	x.captcha_fontsize		=	13
	x.thumb_folder		=	x.x('site_path') + '/Upload/Thumb'
//--$


var Global = x; x=null;
%>


