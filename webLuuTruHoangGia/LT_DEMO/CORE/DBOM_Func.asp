<%//---this file defines function for DBOM Data Modify. Including : DBOM_Insert - DBOM_Update - DBOM_Delete

//=======================================================================================================
//   DBOM Modify (no-ID = [Insert] , with ID = [Update]
//=======================================================================================================
/*  Process :
- [Update] : check data exist;
- Request Data from request.form, check data valid by DBOM_DataType.([Updtae]: get original data from file-relate-field - F.R.F). if true...
- Resize Image, Create Thumb for image (if needed)
- Move uploaded files from /TemUpload to /Upload (if has file-reated-field) - (file info get from Request.Form("File_related_field") , real file address get from Session("TemUpload")
- [Update] Delete unnecessary files (compare from F.R.F's original data & new Data)
- Insert/Update Data to real DB  */

function DBOM_MODIFY(tblName,ID, excField){	//-- excField = list of Field that won't be modified. format : "title, detail, add_time"

	var tbl = DBOM[tblName.toLowerCase()]; if(!tbl){ return false }; excField = (excField||'').L().replace(/\s+/g,'');
	ID=expectInt(ID,null); if (ID && !isNaN(ID) && ID > 0){ if (DB_to_Val("Select ID from ["+tblName+"] where ID="+ID)==""){ return false; }}	//-- check data exist if Update

	//-- check data & move file from /TemUpload to /Upload & replace FolderName in F.Data
	for (var FieldName in tbl){if(!''[FieldName] && FieldName!='relateNNto' && !FieldName.inStr(excField) ){
		//-- data checking
		var F = tbl[FieldName]; var xxx=new String(RQ(FieldName)); if(ID && F.unique_field){ xxx=xxx.prop('ID',ID) };
		var x = F.check(xxx);
		if (x===false){
			//FieldName.R('failed:');
			return false;
		}else{ F.Data = x.val }
	}}

	//-- move file - resize - create thumbnail
	for (var FieldName in tbl){if(!''[FieldName] && FieldName!='relateNNto' && !FieldName.inStr(excField) ){
		var F = tbl[FieldName]; if (F.fileRelate && F.Data){
			F.Data = DBOM_FileDealer(F);
			if (ID){ //--- if Update, delete unnecessary files
				var OrgImg = DB_to_Val("Select ["+FieldName+"] from ["+tblName+"] where ID="+ID).split("\n")
				if (OrgImg && OrgImg.length){
					for (var i=0;i<OrgImg.l();i++){
						if(F.Data.xindexOf(OrgImg[i])==-1){
							DelFile(ABSPath(OrgImg[i]));
							DelFile(ABSPath(OrgImg[i].xreplace( Global.x('upload_folder'), Global.x('thumb_folder') )));
						}
					}
				}
			}
		}
	}}

	//-- Insert to DB
	if (ID){ var IDCon = " where ID="+ID }; var Conn=Conn_Obj();
	var RS = Server.CreateObject("ADODB.RecordSet"); RS.Open("Select * from ["+tblName+"]"+(IDCon||'') , Conn , 3,3); if(!ID){ RS.AddNew() };
	for (var FieldName in tbl){if(!''[FieldName] && FieldName!='relateNNto' && !FieldName.inStr(excField)){
//R( tbl[FieldName].Data + '===' + FieldName +' <br>')
		if (tbl[FieldName].Data){ RS.Fields(FieldName) = tbl[FieldName].Data; }
	}}
	RS.Update(); RS.Close(); Conn.Close(); Conn=RS=null; return true;
}






function DBOM_DELETE(tblName,ID){
	var tbl = DBOM[tblName.toLowerCase()]; if(!tbl){ return false }
	if (!ID || isNaN(ID) || ID<=0 || DB_to_Val("Select ID from ["+tblName+"] where ID="+ID)==""){ return false }	//-- check data exist first

	//-- delete related file
	for (var FieldName in tbl){if(!''[FieldName] && FieldName!='relateNNto'){
		var F = tbl[FieldName]; if (F.fileRelate){
			var OrgImg = DB_to_Val("Select ["+FieldName+"] from ["+tblName+"] where ID="+ID).split("\n")
			if (OrgImg && OrgImg.length && OrgImg[0]!=''){
				for (var i=0;i<OrgImg.l();i++){
					DelFile(ABSPath(OrgImg[i]));
					DelFile(ABSPath(OrgImg[i].xreplace( Global.x('upload_folder'), Global.x('thumb_folder') )));
				}
			}
		}
	}}

	var Pending_Del = [];	//-- List of Pending Tbl-ID to delete

	//-- replace field in relateNNto list & delete empty category field
	//-- (***) THANKS TO THE BULLSHIT MSACCESS "REPLACE" FUNCTION is DEADLY UNVAILABLE , I MUST DO THIS BY A VERY STUPID WAY 
	//   (Using VBScript Left,Right,InStr function in SQL Instead)
	if (tbl['relateNNto']){ var RField = tbl['relateNNto'].split("--");
		for (var i=0;i<RField.l();i++){
			var IDR = ','+ID+','; var Cat = "["+RField[i].split('.')[1]+"]"; var tblNameR = RField[i].split('.')[0];
			var Param_i = "Instr(','&"+Cat+"&',','"+IDR+"')"; var Param_cat="(','&"+Cat+"&',')"; var Param_left = "Left("+Param_cat+", "+Param_i+"-1)"; var Param_right = "Right("+Param_cat+", len("+Param_cat+")-("+Param_i+"-1)-"+IDR.length+")";
			var SQL = "Update ["+tblNameR+"] Set "+Cat+" = (@left &','& @right) where "+Cat+" <> '"+ID+"' and (@i>0) ";
			SQL = SQL.replace(/@i/g , Param_i).replace(/@cat/g , Param_cat).replace(/@left/g , Param_left).replace(/@right/g , Param_right);
			var SQLu = "Update ["+tblNameR+"] Set "+Cat+"= Mid("+Cat+" , 2, len("+Cat+")-2) where "+Cat+" like ',%' "

			var Conn = Conn_Obj();

			//-- create List of child Table need to delete (but delete later, cause the complication of Recursive Structure
			//-- the SQL get all the deletable recordID, which has format 'ID' , not 'a,ID,b' or similar
			var SQLx = "Select ID From ["+tblNameR+"] Where "+Cat+"='"+ID+"' "
			var ChildID = DB_to_Arr1(SQLx); for (var j=0;j<ChildID.l();j++){
				Pending_Del.push([tblNameR , ChildID[j]]);
			}

			Conn.Execute(SQL); Conn.Close(); Conn.Open();	//-- (***) Close & Open Conn for the record to be updated
			Conn.Execute(SQLu);Conn. Close(); Conn = null;
		}
	}
	//-- Delte the Main Table's record
	var Conn = Conn_Obj(); Conn.Execute("DELETE From ["+tblName+"] where ID=" + ID); Conn.Close();

	//--report
	//R('-- Deleted <b>'+tblName+'-'+ID+'</b>, Going to delete: ['+ Pending_Del.join('],[') +'] <br>')

	//-- delete the pending deletion
	for (var i=0;i<Pending_Del.l();i++){
		DBOM_DELETE( Pending_Del[i][0], Pending_Del[i][1] )
	}
	return true;
}







//-- Deal with DBOM File-relate-field (Resize,Create Thumb, Move to /Upload)
function DBOM_FileDealer(F){
	var FArr = F.Data.split("\n");
	if (FArr && FArr.length){ var FS = FSO();
		for (var i=0;i<FArr.l();i++){
			if (FArr[i].xindexOf(Global.x('upload_folder'))<0){ //--if these file is new uploaded (& hasn't been moved to /upload folder)
				//-- resize or create thumb, if needed
				if (RQA("ImageResize_OK")=="true"){
					var path = ABSPath(FArr[i]); var thumb_path = ABSPath( Global.x('thumb_folder')+'/'+getFileName(FArr[i]) );
					if (F.needResize){ image_resize(path,0,0,path,(F.maxW||1000),(F.maxH||1000)) }
					if (F.needThumb){ image_resize(path,F.thumbW,F.thumbH,thumb_path,0,0) }
				}

				//--- Delete the Session("TemFile"+FileName) (cause everything is success, we don't need to check it again)
				Session("TemFile_" + getFileName(FArr[i]) ) = "";
				//-- move file to /upload folder
				FS.MoveFile( ABSPath(FArr[i]) , ABSPath(Global.x('upload_folder'))+"\\" )
				FArr[i] = FArr[i].xreplace(Global.x('tem_upload_folder') , Global.x('upload_folder') )
			}
		}; FS = null;
	}
	return FArr.join('\n')
}





%>




