<%//---this file defines Action Function that support Server Action (SVA)


/* UPLOAD =========================================================================================================
Policy : all files uploaded are renamed to datetime-number whithout preservation of any part of original file name (EG: 201132113000.jpg)
File uploaded to folder : TemUpload (the path is get from Config File)
Function will check filesize against Request('max_size') or Global.x('Max_upload') and file Extension against Global.x('Uploadable_ext')
When Upload success, we create a new session : Session("TemFile_"+filename) = ext+':'+length */



function Upload(html_editor){	//-- if html_editor params specified, we know it's for htmlbox, upload directly to /Upload-Folder
	/*--- explanation 'bout this line of command :
	When client (IE,FF,Opera...) send multi-part/formdata to server, it expects server to receive all data (even if data is Gigabyting large)
	We cannot handle all the "over-allowed" size of data from all upload task. So, we refuse the 'Invalid-Upload-Packet'
	Unfortunately, CLient won't accept any kind of data refusing, they'll show the "Page cannot display - Page not found" to User
	We handle the Message to Client by HTML-Iframe-Javascript.
	The main task of server is to refuse Bad-Upload-Post */
	var Max_Size = parseFloat(RQQ("maxsize"));
	if ( isNaN(Max_Size) || Max_Size > Global.x('max_upload') || Max_Size <= 0){ Max_Size=Global.x('max_upload') }else{ Max_Size=Max_Size*1024*1024 }
R('success:'+Max_Size)
	if(Request.totalBytes == 0 || Request.totalBytes > Max_Size ){ return null }

	var  blob = Request.binaryRead( Request.totalBytes );
	var  recordSet  = Server.CreateObject( "ADODB.RecordSet" );
	recordSet.fields.append( "raw", 201, Request.totalBytes );		//' 201 = adLongVarChar
	recordSet.open(); recordSet.addNew();
	recordSet.fields(0).appendChunk( blob );

	var  str  = "" + recordSet.fields(0);
	var  eol      = "\r\n";
	var  blank    = "\r\n\r\n";
	var  marker  = str.substr( 0, str.indexOf( eol ) + eol.length );

	var  start    = str.indexOf( blank, marker.length ); start += blank.length;
	//' the last marker has a "--" at the end of it
	var  end      = str.length - (marker.length + 2); 
	var  length  = end - start;

	var  header  = str.slice( marker.length, start - blank.length ).split( eol );

	var  data  = Server.CreateObject("ADODB.Stream");
	data.open(); data.type = 1; data.position = 0;
	data.write( blob ); data.position = start;


	//--- ****************** get file name
	var key = "Content-Disposition" 
	key = key.toLowerCase();
	var  i;
	for( i=0; i<header.length; ++i ){
		line = header[i].split( ": " );  //' again, weak.
		if( key == line[0].toLowerCase() )
		var  params = line[1];
	}
	if( null == params ){	return null;  }

	var  kvs = params.split( "; " );  //' I know this is weak
	var  i;
	for( i=0; i<kvs.length; ++i ){
		kv = kvs[i].split( "=" );
		if( "filename" == kv[0].toLowerCase() ){
			var  filename  = kv[1].substr( 1, kv[1].length-2 );  //' remove the quotes
			var  slash      = filename.lastIndexOf( "\\" );  //' only IE eh.
			if( -1 != slash )
			filename = filename.substring( slash + 1, filename.length );
		}
	}

	//-- ******************** get file extension & generate a new file name
	var ext = filename.substring( filename.lastIndexOf('.')+1 , filename.length)
	if (!ext.inStr(Global.x('uploadable_ext'))){ return null }	//--- check extension
	var original_filename = filename; var x = new Date();
	filename = x.setSeconds(x.getSeconds()+1) + '.'+ ext


	//-- ******************** save the stream to file
	var stream = Server.CreateObject( "ADODB.Stream" );
	stream.open(); stream.type = 1; stream.position  = 0;
	stream.write( data.read( length ) );

	//--htmlbox editor image need the image to be uploaded directly to /Upload folder, instead of /Tem_Upload folder like other files (only admin can use this feature)
	var UploadFolder = Global.x(html_editor?'upload_folder':'tem_upload_folder')
	var File_Path = ABSPath( UploadFolder ) + "\\" + filename
	stream.saveToFile( File_Path , 2 );
	stream.close();

	Session("TemFile_"+filename) = ext+':'+length	 //-- write fileName-fileSize- fileExtension to Session

	//-- return the result to client
	return 'success:'+UploadFolder+'/'+filename+':'+original_filename
}


//---File Download 
function Download(File_Path){	//-- file path = absolute path like C:\abc\def.jpg
	var File_Name = getFileName(File_Path);
	Response.Buffer = true; Response.ContentType = "application/file"
	Response.AddHeader ("content-disposition","attachment; filename=" + File_Name )
	var FStream = new ActiveXObject("ADODB.Stream")
	FStream.Open();	FStream.Type = 1;
	FStream.LoadFromFile(File_Path)
	Response.BinaryWrite (FStream.Read())
}





//===========================================================================
//===========================================================================
//===========================================================================
//==========================================//Group of .NetComponent function
// lemma function to help connect asp-asp.net
// *** IMPORTANT NOTE: Always pass enogh parameter to NetComponent function *** //
function NetComponent(component,ParamStr,returnBinary){
	//Deal with security Code
	if (RQA("NetComponent_SecurityCode")==""){	//---if new 'Application' Gen a new security Code for .NetComponent and write the code to NetComponent_Trust.aspx
		var x=md5(Math.random().s()); x.toApp("NetComponent_SecurityCode");
		WriteToFile( ABSPath(Global.x("site_path")+"/CORE/NetComponent_Trust.aspx"), "<Script runat=server language=c#> string securityCode = \""+x+"\"; </Script>" )
	}

	//create xml obj & load aspx-component file
	var URL = Global.x('site_url') + Global.x('site_path')+'/CORE/NetComponent.aspx?t='+(new Date())+'&component='+
				component+'&securityCode='+RQA("NetComponent_SecurityCode")+'&'+ParamStr
	var xmlhttp = new ActiveXObject("Msxml2.XMLHTTP");
	xmlhttp.open("GET", URL , false); xmlhttp.send();
	return returnBinary?(xmlhttp.responseBody):(xmlhttp.responseText)
}





//---Email Sending (Try to send mail by 3 method : Cdosys,PersitsMail,ASP.Net Mail, if both 3 failed, save failed mail to DB)
//============================================================================================================================
//-- CDOSYS Mail (lemma function for tha main mail sending function)
function Send_Mail_CDOSYS(FromEmail, ToEmail, Title, Body){
	try{ var myMail=Server.CreateObject("CDO.Message"); var objConfig = Server.CreateObject("CDO.Configuration");
		objConfig.Fields("http://schemas.microsoft.com/cdo/configuration/sendusing") = 1; objConfig.Fields("http://schemas.microsoft.com/cdo/configuration/smtpserver") = "localhost"; objConfig.Fields("http://schemas.microsoft.com/cdo/configuration/smtpserverpickupdirectory") = "C:\\inetpub\\mailroot\\pickup";
		objConfig.Fields.Update();	myMail.Configuration = objConfig; myMail.Subject = Title; myMail.From = FromEmail; myMail.To = ToEmail; myMail.HTMLBody = Body;
		myMail.Send(); myMail=objConfig=null; return 'success';
	}catch(e){ return false }
}
//-- Persits Mail  (lemma function for tha main mail sending function)
function Send_Mail_Persits(FromEmail, ToEmail, Title, Body){
	try { var Mail = Server.CreateObject("Persits.MailSender"); Mail.Host = "localhost"; Mail.From = FromEmail; Mail.AddAddress(ToEmail); Mail.Subject = Title; Mail.isHTML = true; Mail.Body = Body;
		Mail.Send(); Mail=null; return 'success';
	}catch(e){ return false; }
}

//-- Main email sending function ========
function send_mail(from,to,subject,body){
	if (!(from && to && subject && body && valid_mail(from) && valid_mail(to))){ return false }
	var ParamStr = "from="+from+"&to="+to+"&subject="+Server.URLEncode(subject)+"&body="+Server.URLEncode(body)

	var x = String(NetComponent('send_mail', ParamStr ))	//-- try to send mail by asp.net
	if (x!='success'){ x = Send_Mail_Persits(from,to,subject,body) }else{ return true }	//-- try to send mail by Persits Mail
	if (x!='success'){ x = Send_Mail_CDOSYS(from,to,subject,body) }else{ return true }	//-- try to send mail by Cdosys

	//-- if all the mail method failed, save the unlucky mail to the DB
	if (x!='success'){	//-- failed to send mail, save email to dataBase
		var RS = new ActiveXObject("ADODB.RecordSet"); RS.Open("Select * from Failed_Mail", Conn_Obj(), 3,3);
		RS.AddNew(); RS.Fields("Mfrom")=from; RS.Fields("Mto")=to; RS.Fields("MSubject")=subject;  RS.Fields("MBody")=body; 
		RS.Update();RS.Close();RS=null
		return false
	}else{ return true }
}
//============================================================================================================================






//---Image Resize (NOTE: Cannot keep transparent (png,gif), or animation (gif) )
function image_resize(path,w,h,save_path,maxW,maxH){
	var ParamStr = "path="+path+"&w="+w+"&h="+h+"&save_path="+save_path+'&maxW='+maxW+'&maxH='+maxH
	return NetComponent('image_resize',ParamStr)
}


//---Captcha Generation
function Captcha(text,w,h){
	Response.Buffer = true; Response.ContentType = "image/gif";
	var ParamStr = 'captcha='+text+'&w='+(w||Global.x('captcha_w'))+'&h='+(h||Global.x('captcha_h'))+
					'&bgColor='+Global.x("captcha_bgcolor")+'&textcolor='+Global.x("captcha_textcolor")+
					'&fontFace='+Global.x("captcha_fontface")+'&fontSize='+Global.x("captcha_fontsize")
	var x=NetComponent('captcha',ParamStr,1)
	Response.BinaryWrite(x)
}



//********************************************************************************************************
//-- function to check the availability of .Net component & email. Including : Captcha, ImageResize, Email
//if (RQA("Captcha_OK")==""){ Check_NetComponent_Availability() }

function Check_NetComponent_Availability(){
	//-- check captcha
	var x=NetComponent('captcha',"w=10&h=10&captcha=a",1); var K = Server.CreateObject("ADODB.Stream"); K.Open();K.Type=1;
	try{ K.write(x); "true".toApp("Captcha_OK"); }catch(e){ Application("Captcha_OK")="false" }; K=x=null;

	//-- check image resize
	var x=NetComponent('image_resize',"w=10&h=10&path="+ABSPath(Global.x("site_path")+"/Core/Test_DotNet/x.jpg")+"&save_path="+ABSPath(Global.x("site_path")+"/Core/Test_DotNet/y.jpg")+"&maxW=0&maxH=0" );
	;((String(x)=="success")?"true":"false").toApp("ImageResize_OK")

	//-- check email
	var y = Global.x("mail_sender"); if (!valid_mail(y)){y="abc@xyz.com"};	//-- case localhost, mail'll be mail@localhost, an invalid mail.
	var x=send_mail(y,"test@yahoo.com","test send mail","Just a test")
	;(x?"true":"false").toApp("SendMail_OK")
}



%>




