<%

	///////////////////////////////////////////////////////////////Them prototype cho VBArray de tro thanh` 1 doi tuong chua du lieu hoan` hao
	/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

		//--------------------------Chi so' cua dong` du~ lieu hien tai.
		VBArray.prototype.i = 0

		//--------------------------Xuat 1 table ra man hinh de xem noi dung cua VBArray
		VBArray.prototype.toHTMLTable = function(){
											var X_Code = "<table border=1 style=\"border-collapse:collapse;\" borderColor=#000000 cellpadding=5 cellspacing=0>\n\
													\t<tr Style=\"background:#336699; color:#ffffff; font-weight:bold;\">\n\
													\t\t<td bgcolor=#336699 style=\"color:#ffffff\"> STT </td>\n"
											for (var i=0;i < this.Field_Arr.length;i++){
												X_Code += "\t\t<td height=30 align=center>"+this.Field_Arr[i]+"</td>\n"	}
											X_Code += "\t</tr>\n"

											for (var i=0; i<= this.ubound(2);i++){
												X_Code +="\t<tr>\n\t\t<td bgcolor=#eeeeee>" + i +  "</td>\n"
												for (var j=0;j<=this.ubound(1);j++){
													X_Code += "\t<td>" + Convert( this.getItem(j,i) ,1 ) + "</td>"	}
											} return X_Code + "</table>";  }

		//--------------------------Phuong thuc xuat du lieu, dua vao` ten Field & chi so' i
		//-----(Chu' y' : Field_Obj la` Object duoc tao. trong ham` DB_to_Arr()
		VBArray.prototype.RS = function(Field_Name , i_Count){
									if (i_Count==undefined){i_Count = this.i}
									var FieldX = this.Field_Obj[Field_Name.toLowerCase()];
									if (!isNaN(FieldX)){
										var A = this.getItem( FieldX , i_Count); return (A==null)?'':A }
									else{ return '' }
									}

		//--------------------------Phuong thuc phan trang du~ lieu.
		VBArray.prototype.thisPage = 1
		VBArray.prototype.pageSize = function(mySize){ 	if (mySize!=undefined){this.pgSize=mySize}	else
															{ if (this.pgSize==null){this.pgSize=this.ubound(2)+1};	return this.pgSize	}	 }
		VBArray.prototype.lastPage = function(){	var a=(this.ubound(2)+1)/this.pageSize(); var b=parseInt(a); return (a==b)? a:b+1	}
		VBArray.prototype.previousPage = function(){return (this.thisPage<2)? 1:this.thisPage-1;}
		VBArray.prototype.nextPage = function(){return (this.thisPage>=this.lastPage())? this.lastPage():this.thisPage+1;}

		//--------------------------Phuong thuc gan' so' trang vao` (kem` theo xu ly du lieu) 
		VBArray.prototype.getPage = function(myPage){ if (myPage==undefined){myPage = Request('page')};	myPage=parseInt(myPage);
									this.thisPage= (!isNaN(myPage) && myPage>0 && myPage<=this.lastPage())? myPage:1 }

		//----------------------StartPos & EndPos
		VBArray.prototype.startPos = function(){return (this.thisPage-1)*this.pageSize()}
		VBArray.prototype.endPos = function(){ var e=this.thisPage*this.pageSize()-1; return (e>this.ubound(2))? this.ubound(2):e }

		//-----------------------Chuyen 1 VBArray sang 1 Array
		VBArray.prototype.toNormalArray = function(){	var M=new Array;	for (var i=0;i<=this.ubound(2);i++){
												var N=new Array;	for (var j=0;j<=this.ubound(1);j++){N.push(this.getItem(j,i))};		M.push(N);		}
												return M	}
%>


