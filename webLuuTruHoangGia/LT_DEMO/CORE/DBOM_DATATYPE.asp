<%//--Database Object Model. Infos about all Objectmodel in Project. Editable by FSO-Manager

/*//====================================
	Important Properties (Which 'connect' DBOM to other Modules)
	- dtStr				ex: 'nvarchar(255)'		//datatype of field in DB.mdb
	- defaultVal		ex: '123'				//defaultValue of field (... menu_txt nvarchar(255) default 'catName'...)
	- fileRealte		ex: 1 or 0				//indicate that this field store file path & need to 'take care' in DBOM_MODIFY, DBOM_DELETE
	- needResize		ex: 1 or 0				//indicate that this field store ImagePath, & have MaxWidth, MaxHeight. When Upload Image to this field, we need resize if image is oversized
			+ maxW		ex: 1024				//-- maxWidth of image if needResize
			+ maxH		ex: 768					//-- maxHeight of image if needResize
	- needThumb			ex: 1 or 0				//indicate that this field store ImagePath, & need to create thumbnail. When Upload Image to this field, we need create a thumbnail for it
			+ thumbW	ex: 300					//-- thumbnail Width of image if needThumb
			+ thumbH	ex: 200					//-- thumbnail Height of image if needThumb

	- givenStr or givenField (optional)			//-- use for StressData Filling

	... to be continued ..

*/

//**** NOTE: ALL THE COMMENT NEXT TO DATATYPE FUNCTION NAME WILL BE DISPLAY IN DBOM_Manager like comment


//======= Native dataType Class (simple create common element)
function NativeDBOM(minLen, maxLen, regex, notNull, minVal, maxVal, castFunc, sep, unique_field){	//-- regex & sep can be array --- castFunc should return NaN if data is invalid (which is true to parseInt, parseFloat & new Date function)
	this.minLen=minLen; this.maxLen=maxLen; this.regex=regex; this.notNull=notNull; this.maxVal=maxVal; this.minVal=minVal; this.castFunc=castFunc; this.sep=sep; this.unique_field=unique_field; this.FControl='textbox'
	this.simpleCheck = function(x){

		//-- convert to string & check null
		if ((x==''||x=='undefined'||x=='null')){ this.nullCase=1; return notNull?false:([true].prop('val','')) };

		//-- check length
		if (!x.l().inRange(minLen,maxLen)){ return false }

		//-- castFunc & split & regex checking
		if (castFunc && isNaN(castFunc(x))){return false};
		if (sep){
			var isMatrix = sep.isArr();
			var DArr = x.split(isMatrix?sep[0]:sep); if (!DArr.l().inRange(minVal,maxVal)){return false;}
			for (var i=0;i<DArr.l();i++){if (regex){
				if (isMatrix){	//-- 2 dimensions array datatype
					DArr[i]=DArr[i].split(sep[1]); if (DArr[i]!=regex.l()){return false}	//-- assuming that regex must be an array
					for (var j=0;j<DArr[i].l();j++){ if (!regex[j].test(DArr[i][j])){return false} }
				}else{	//-- 1 dimension array datatype
					if (!regex.test(DArr[i])){return false}
				}
			}}
		}else if(regex && !regex.test(x)){ return false }
		else if((minVal && x<minVal) || (maxVal && x>maxVal)){ return false }

		//-- Unique check
		if (unique_field){
			var u = unique_field.split('.'); var SQL = "Select 1 from ["+u[0]+"] where ID<>"+(x.ID||0)+" and ["+u[1]+"]='"+x+"' ";
			if (DB_to_Val(SQL)==1){return false}
		}

		return [true].prop('val',x);
	}
	this.check=this.simpleCheck
}


//========================================================================
//====================Start define DBOM Data Type=========================
//========================================================================

var DBOM_DataType = {

//==================================== NUMBER TYPE
//---Long integer
int:function(minVal ,maxVal ,notNull){		//maxVal : 2^31-1 &nbsp; minVal: -2^31+1
	this.inherit=NativeDBOM; this.dtStr = 'int';
	this.inherit(1, 11, /^-?\d{1,10}$/, notNull, minVal||-Math.pow(2,31)+1, maxVal||Math.pow(2,31)-1, function(x){return parseInt(x)});
}

//----Float (Price, Rate...)
,float:function(minVal ,maxVal ,Precision ,notNull){	// Precision: eg: Precision=3, inputdata= 120.66666 <br> return <b>true</b> & output(val)= 120.667
	this.inherit=NativeDBOM; this.dtStr = 'double'; 
	this.inherit(1, 23, /^-?\d+(\.\d+)?$/, notNull, minVal||-1e16+1, maxVal||1e16-1, function(x){return parseFloat(x).toFixed(Precision||16)} );
}

//==================================== NORMAL TEXT TYPE
,text:function(minLen,maxLen){	//minlen is used for notnull , maxlen not over 255
	this.inherit=NativeDBOM; this.dtStr = 'nvarchar(255)'; this.inherit(minLen, min(maxLen||256,255), '', minLen); 
}

,longtext:function(minLen,maxLen){	//maxlen : 65536 characters
	this.inherit=NativeDBOM; this.dtStr = 'ntext'; this.inherit(minLen, min(maxLen||65537,65536), '', minLen); this.FControl='textarea'
}

,htmltext:function(minLen,maxLen,regex){	// too complicate at this time !
	this.inherit=NativeDBOM; this.dtStr = 'ntext'; this.inherit(minLen, min(maxLen||65537,65536), '', minLen); this.FControl='htmlbox'
}

//==================================== DATE TIME TYPE
,datetime:function(autoDate, minDate, maxDate, notNull){ // <b>- autoDate : (1 or 0) </b> "datetime default Now()" or not <br><br> <b>- Note:</b> minDate,maxDate in format : new Date("1/1/2001 1:1:1") or new Date()  or just only : "1/1/2001"
	this.inherit=NativeDBOM; this.dtStr = 'datetime'+ (autoDate?' default Now()':'');
	this.inherit(10,20, '', notNull, (minDate||'1/1/100').toDate(), (maxDate||'31/12/9999').toDate(), function(x){return new Date(x)} );
}


//==================================== SIMPLE REGEX TYPE

,email:function(unique_field, notNull){	//unique_field : "tbl_name.fieldName" <br> eg: "tbl_Member.Email" (note must have the quotes) <br> If specified, an existed email in "tbl_Member.Email" will be invalid to this DataType
	this.inherit=NativeDBOM; this.dtStr = 'nvarchar(255)'; 	var re = /^[A-Za-z0-9._-]+@([A-Za-z0-9-]+\.)+[A-Za-z]{2,4}$/i
	this.inherit(5, 255, re, notNull,'','','','',unique_field);
}

,url:function(notNull){	// check simple url. No unicode in url. <br> Although this kind of URL is not safe for HTML, but we"ll use JS to deal it
	this.inherit=NativeDBOM; this.dtStr = 'nvarchar(255)'; var re=/^(http(s)?\:\/\/[a-z0-9-]+\.[a-z0-9-]+)/i; this.inherit(10, 255, re, notNull); 
}

,user:function(minLen,maxLen,unique_field){	//unique_field : "tbl_name.fieldName" <br> eg: "tbl_Member.UserName" (note must have the quotes) <br> If specified, an existed UserName in "tbl_Member.UserName" will be invalid to this DataType. <br><br> Checked by regex : /^[a-z0-9_&.-]+$/i
	this.inherit=NativeDBOM; var re = /^[a-z0-9_&.-]+$/i; this.dtStr = 'nvarchar(255)';
	this.inherit(minLen, min(maxLen||256,255), re, 1,'','','','',unique_field);
}

,pass:function(minLen,maxLen){	// any character can appear in password field
	this.inherit=NativeDBOM; this.inherit(minLen, min(maxLen||256,255), '', 1); this.dtStr = 'nvarchar(255)'; this.FControl='passbox'
}

,freeregex:function(re,minLen,maxLen,notNull){ //--- check text against a regex given by parameter <b>re</b>
	this.inherit=NativeDBOM; this.inherit(minLen, min(maxLen||256,255), re, notNull); this.dtStr = 'nvarchar(255)';
}


//==================================== INSTR TYPE
//--note : the default separator is comma (,) and givenStr has the format : 1,2,4,6

,instr:function(givenStr ,givenField, notNull, allowZero){ //-- check if a value appears in a list of given values. eg : '1' is valid if givenStr="1,2,3,4,5",but 6 is not. <br> --- <b>givenField : </b> get the list of value from a field in DataBase <br> eg: "tbl_MENU.ID" <br> -- (Note the " ) <br><br> -- Note : allowZero=1 if field is in self-construct-Table.(eg: Root_Item in MENU), allowZero=0 when field is in derived table (eg: menu_id in Product)
	this.givenStr=givenStr||''; this.givenField=givenField||''; this.allowZero=allowZero;// Just for Stress_Data_Fill
	this.inherit=NativeDBOM; this.dtStr = 'nvarchar(255)'; if (givenStr){ var re=new RegExp('^'+givenStr.replace(/\D/g,'|')+'$') }
	this.inherit(1, 255, re || /^\d+$/ , notNull);
	this.check = function(x){
		if (x=='0' && allowZero && !this.givenStr){ return [true].prop('val','0') }	//--- Incase Self-construct Table (MENU), item the root-level has root_item = 0
		var y=this.simpleCheck(x); if (!y){return false}else if(this.nullCase){return [true].prop('val','')};

		if (givenField){ var u = givenField.split('.'); var SQL="Select 1 from ["+u[0]+"] where CStr(["+u[1]+"])='"+x+"' "; if (DB_to_Val(SQL)!=1){return false} } //---givenField has the format : tblName.FieldName
		return [true].prop('val',x)
	}
	this.FControl='selectbox'
}

//--- "Scattered_In" DataType ( '2,3' in '1,2,3,5,6,7' )
,scattered_instr:function(givenStr ,givenField, notNull){ //-- check if a set of value (eg: "1,3,5") appears <i>scattered</i> in a list of given values. eg : "1,3,5" is valid if givenStr="1,2,3,4,5",but "1,6" is not. <br> --- <i>Note:</i> "3,1,5" is also valid, but "3,1,5,3" is Not, cause each number can appear ONCE <br> --- <b>givenField : </b> get the list of value from a field in DataBase <br> eg: "tbl_MENU.ID" <br> -- (Note the " )
	this.inherit=NativeDBOM; this.dtStr = 'nvarchar(255)'; this.inherit(1, 255, /^(\d+,)*\d+$/ , notNull);
	this.givenStr=givenStr||''; this.givenField=givenField||''; // Just for Stress_Data_Fill
	this.check = function(x){
		var y=this.simpleCheck(x); if (!y){return false}else if(this.nullCase){return [true].prop('val','')};

		//---givenField has the format : tblName.FieldName
		if (!givenStr){ var u = givenField.split('.'); givenStr=DB_to_Arr1("Select ["+u[1]+"] from ["+u[0]+"] ").join('|'); }
		var re = new RegExp('^(('+givenStr.replace(/\D/g,'|')+'),)+$'); if (!re.test(x+',')){return false}; //-- check each number valid
		var M=x.split(','); var N=''; for (var i=0;i<M.l();i++){ if (M[i].inStr(N)){return false}else{N+=(N?',':'')+M[i]} } //-- check not repeat value

		return [true].prop('val',x)
	}
}


//==================================== STRUCT TYPE
//--- Matrix Type, a table of value
,matrix:function( regexArr, notNull, minRow, maxRow ){ //-- a table of value, ColumnSep = @-,   rowSep = @+ <br> -- @=Global.x('schar') <br> -- <i><b>regexArr</b></i> : array of regex to check each value in a row <br>-- eg : [/^\w+$/ , /^\d+$/ , /^\d+$/]
	this.inherit=NativeDBOM; this.dtStr = 'ntext'; var S = Global.x('schar');
	this.inherit(1, 65536, '', notNull, minRow||0, maxRow||1e9, '', [S+'+',S+'-']);
}


//--- this class is created be inherited
,filelist:function(fileNum,fileSize,notNull,extList){		//--- Prototype class of the file-dataType. <br> <i><b>fileSize:</b></i> Mb unit, eg 1.5 <br> <i><b>extList:</b></i> eg "jpg|bmp|gif|png|jpeg" 
	this.inherit=NativeDBOM; this.inherit(1, (fileNum==1?255:65536), '', notNull); this.dtStr = (fileNum==1)?'nvarchar(255)':'ntext';
	this.fileRelate=1; this.extList = extList; this.fileSize = fileSize
	this.check = function(x){
		var y=this.simpleCheck(x); if (!y){return false}else if(this.nullCase){return [true].prop('val','')};

		fileSize = min(expectFloat(fileSize,1e3)*1024*1024, Global.x('max_upload'));
		x=x.replace(/\r/g,'').replace(/\n+/g,'\n').replace(/\n$/,'').replace(/^\n/,'')			//--- reformat, remove all unecessary linebreak
		var T = Global.x('tem_upload_folder'); var U = Global.x('upload_folder');
		extList=extList||Global.x('uploadable_ext'); extList=extList.replace(/[^a-z0-9_]/gi,'|')

		var FArr = x.split("\n"); if(FArr>fileNum){return false};
		var re = new RegExp( '^(('+T+')|('+U+'))\/[a-z0-9_() ]{1,16}\.('+extList+')$', 'i' )
		for (var i=0;i<FArr.length;i++){
			if (!re.test(FArr[i])){return false}
			if (FArr[i].xindexOf(U)<0){ //--new file & need to copy to /Upload
				var fileinfo = RQS("TemFile_"+ getFileName(FArr[i]) );
				if(fileinfo==""){return false}
				if(parseInt(fileinfo.split(":")[1]) > fileSize){return false} //--check file size against uploaded-session (after upload any file, a session is created with format : ext:size)
			}
		}

		return [true].prop('val',x)
	}
	this.FControl='filebox'
}

}


//--- Inherit filelist Type ***
DBOM_DataType.imglist = function(fileNum, fileSize, notNull, thumbW , thumbH, maxW, maxH){ //--- incase specified thumbW or thumbH, we create a thumbnail for the uploaded image. <br><br> --- incase specify maxW or maxH, we resize the image to maxW or maxH, depend on the side-size specified <br><br> --- predefined extList : jpg|bmp|gif|png|jpeg
	this.inherit = DBOM_DataType.filelist; this.inherit(fileNum, fileSize, notNull , 'jpg|bmp|gif|png|jpeg');

	/** important **/
	this.maxW = maxW||0; this.maxH = maxH||0; this.thumbW = thumbW||0; this.thumbH = thumbH||0;
	if (this.maxW + this.maxH > 0){ this.needResize = 1 }
	if (this.thumbW*this.thumbH > 0){ this.needThumb = 1 }
	/** important **/
}

DBOM_DataType.flashlist = function(fileNum,fileSize, notNull){	// --- predefined extList : swf (only 1)
	this.inherit = DBOM_DataType.filelist; this.inherit(fileNum,notNull, 'swf');
}

DBOM_DataType.medialist = function(fileNum,fileSize, notNull){ // --- predefined extList : flv
	this.inherit = DBOM_DataType.filelist; this.inherit(fileNum,fileSize,notNull, 'mp3,wmv,wma,flv');
}

DBOM_DataType.doclist = function(fileNum,fileSize, notNull){ // --- predefined extList : "doc|docx|xls|xlsx|txt|txtx|rtf|rtfx| mdb|mdbx|ppt|pptx"
	this.inherit = DBOM_DataType.filelist; this.inherit(fileNum,fileSize,notNull, 'doc|docx|xls|xlsx|txt|txtx|rtf|rtfx|mdb|mdbx|ppt|pptx' );
}

DBOM_DataType.adslist = function(fileNum,fileSize, notNull){ // --- predefined extList : "jpg|bmp|gif|png|jpeg|swf"
	this.inherit = DBOM_DataType.filelist; this.inherit(fileNum,fileSize,notNull, 'jpg|bmp|gif|png|jpeg|swf');
}

%>







<%if (0){	//------DBOM DataType Checking & using method%>

<b>Check Matrix: </b><br />

<%var X = new DBOM_DataType.matrix([/^\w+$/,/^\d+$/],1,0,3)
var A = X.check('abcdef\u06de-123\u06de+abcdef\u06de-123\u06de+abcdef\u06de-123')%>
<%=A%><br />
<%R(A.val)%>
<hr />



<b>Check Doc List: </b><br />

<%var X = new DBOM_DataType.doclist( 4, 0.5, 1 )
var A = X.check('/FIONA_MODEL/uPlOaD/abc_1944.doc\n/FIONA_MODEL/uPlOaD/abc_1944.docx\n/FIONA_MODEL/uPlOaD/abc_1944.rtfx')%>
<%=A%><br />
<%R(A.val)%>
<hr />



<b>Check Media List: </b><br />

<%var X = new DBOM_DataType.medialist( 3 , 5.0 , 1 )
var A = X.check('/FIONA_MODEL/uPlOaD/abc_1944.flv\n/FIONA_MODEL/uPlOaD/abc_1944.flv\n/FIONA_MODEL/uPlOaD/abc_1944.flv')%>
<%=A%><br />
<%R(A.val)%>
<hr />



<b>Check FlashList: </b><br />

<%var X = new DBOM_DataType.flashlist( 3, 2.0 , 1 )
var A = X.check('/FIONA_MODEL/uPlOaD/abc_1944.swf\n/FIONA_MODEL/uPlOaD/abc_1944.swf\n/FIONA_MODEL/uPlOaD/abc_1944.swf')%>
<%=A%><br />
<%R(A.val)%>
<hr />



<b>Check ImgList: </b><br />

<%var X = new DBOM_DataType.imglist( 3, 1.5 , 1 )
var A = X.check('/FIONA_MODEL/uPlOaD/abc_1944.jpg\n/FIONA_MODEL/uPlOaD/abc_1944.bmp\n/FIONA_MODEL/uPlOaD/abc_1944.png')%>
<%=A%><br />
<%R(A.val)%>
<hr />



<b>Check Scattered inStr: </b><br />

<%var X = new DBOM_DataType.scattered_instr( '6,77,90,8' , 'tbl_MENU.ID' , 1 )
var A = X.check('77,8,6')%>
<%=A%><br />
<%R(A.val)%>
<hr />




<b>Check inStr: </b><br />

<%var X = new DBOM_DataType.instr( '' , 'tbl_Menu.ID', 1, '' )
var A = X.check('6')%>
<%=A%><br />
<%R(A.val)%>
<hr />




<b>Check FreeRegex: </b><br />

<%var X = new DBOM_DataType.freeregex(/-?\d+/, 6,15,0)
var A = X.check('')%>
<%=A%><br />
<%R(A.val)%>
<hr />




<b>Check Pass : </b><br />

<%var X = new DBOM_DataType.pass(6,15)
var A = X.check('#$ #$&%$& fsdf%')%>
<%=A%><br />
<%R(A.val)%>
<hr />




<b>Check Username : </b><br />

<%var X = new DBOM_DataType.user(6,15,'')
var A = X.check('tai.nangtre_123')%>
<%=A%><br />
<%R(A.val)%>
<hr />



<b>Check URL : </b><br />

<%var X = new DBOM_DataType.url()
var A = X.check('http://localhost.com')%>
<%=A%><br />
<%R(A.val)%>
<hr />


<b>Check Email : </b><br />

<%var X = new DBOM_DataType.email('tbl_Product.Name')
var A = X.check('visa@hochieu.vnx')%>
<%=A%><br />
<%R(A.val)%>
<hr />


<b>Check DateTime : </b><br />

<%var X = new DBOM_DataType.datetime(0,new Date())
var A = X.check( '25 Mar 2011 18:26:0' )%>
<%=A%><br />
<%R(A.val)%>
<hr />



<b>Check text : </b><br />

<%var X = new DBOM_DataType.text(0,355)
var A = X.check( '123456' )%>
<%=A%><br />
<%R(A.val)%>
<hr />



<b>Check Float : </b><br />

<%var X = new DBOM_DataType.float('','',3)
var A = X.check( -12345.2344 )%>
<%=A%><br />
<%R(A.val)%>
<hr />



<b>Check Int : </b><br />

<%var X = new DBOM_DataType.int()
var A = X.check( '-1000000000' )%>
<%=A%><br />
<%R(A.val)%>
<hr />


<%}%>


