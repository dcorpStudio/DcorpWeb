//----Global configuration for website
var x = {
	//---function to get all value
	'x':function(a){
		var S = this[String(a).toLowerCase()]
		return (typeof(S)=='function')?S():S;
	}
}


//---The following part must keep still for editing by FSO
//--^
	x.site_path		=	"/LT_DEMO"
//	x.db_path		=	x.x('site_path') + '\\DB'
	x.db_path		=	"C:\\Program Files\\DCORP_SOFT\\LUUTRU_F\\DB"
	x.conn_str		=	'PROVIDER=MICROSOFT.JET.OLEDB.4.0;DATA SOURCE=' +(x.x('db_path') + '\\DB.mdb')
	x.upload_folder	=	x.x('site_path') + '/Upload'
	x.schar			=	'\u06de'
//--$


var Global = x; x=null;