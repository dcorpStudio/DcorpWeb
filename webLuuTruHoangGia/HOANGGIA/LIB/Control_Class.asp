<%

	//////////////////////////////////////////Lop Control dung` de tao ra cac control cho website
	function Control_Tem(Code, S_Char, Default_Prop, Condition ){

		this.S_Char = S_Char

		//-----Ham` ho~ tro, dung` de bien' het' cac Prop_name trong 		#Prop_Name/  	thanh` LowerCase()
		this.LCase = function(myCode){	var re = '/(?:'+this.S_Char+')(\\\w+)(?:\\\/)/gi';
			return myCode.replace( eval(re)  ,  function($1){ return $1.toLowerCase() ;}  );	}

		//-----Ham` ho~ tro., dung` de bien' het cac 	#Prop_Name/	------->	this.P[prop_name]. Tham so' Mode : dung` cho 2 tr` hop. HTML  &  ASP code.
		this.Code_to_Eval = function(myCode, mode){
								myCode = HTML_to_ASP( myCode, mode )
								var x_quote = (mode == 0)? "'+" : ''
								if (mode !=0){ myCode = myCode.substring(1,myCode.length-1)	}
								return myCode.replace(	eval('/'+this.S_Char+'(\\\w+)\\\//g')  , x_quote+'this.P[\"$1\"]'+x_quote.Reverse() )
							}

		this.Code = this.LCase(Code)
		this.Default_Prop = this.LCase(Default_Prop);
		this.Condition = this.LCase(Condition);

		this.P = new Object() ; this.Field_list = new Object();
		this.Field = this.Code.match( eval('/(?:'+this.S_Char+')(\\\w+)(?:\\\/)/gi') )
		for (var i=0;i<this.Field.length;i++){
			var FN=this.Field[i].replace( eval('/('+this.S_Char+')|(\\\/)/gi') ,  '' )
			this.Field_list[ FN ] = '' }
		var P_Val = 0;	var P_Field = 1;	var P_Output = 2

		//-------Gan' gia tri cho Property theo 3 cach : gan' gia' tri co dinh (P_Val)   ,  gan'  du~ lieu cua 1 truong du lieu (P_Field)   &  Gan' du~ lieu tu` 1 Array. (P_Output)
		this.Set_P = function(Method, Prop_Name , My_Value, Con_Affect){
							Prop_Name = Prop_Name.Clean(); this.Field_list[Prop_Name]='' ;
							this.Field[Prop_Name+'_Condition_Affect'] = Con_Affect
							this.Field[Prop_Name+'_Method'] = eval(Method)
							this.Field[Prop_Name+'_Value'] = My_Value  }

		//------Them Condition vao` Condition goc.
		this.Add_Condition = function(Extra_Con , myS_Char){
								if (myS_Char!=undefined){	Extra_Con = Extra_Con.replace( eval('/'+myS_Char+'/gi') , this.S_Char ) }
								this.Condition += ';'+ this.LCase(Extra_Con)	 }

		//-------Xuat du lieu do*n
		this.Single_Output = function(){
								if (this.Data.constructor==VBArray){
									for (var i in this.Field_list){	this.P[i] = this.Data.RS(i)	}
									if (this.Default_Prop!=undefined){	eval(this.Code_to_Eval(this.Default_Prop,1))	}

									//--------execute n~ cai co phu thuoc condition 
									for (var i in this.Field_list){
										if (this.Field[i+'_Condition_Affect']!=0){
												switch (this.Field[i+'_Method']){
													case P_Val: this.P[i] = this.Field[i+'_Value'];break;
													case P_Field: this.P[i] = this.Data.RS( this.Field[i+'_Value'] );break;
													case P_Output: this.P[i] = this.Field[i+'_Value'][this.Data.i];break;	}
										}
									}

									if (this.Condition!=undefined){
//R(this.Code_to_Eval(this.Condition,1).C(2));F();
										eval(this.Code_to_Eval(this.Condition,1))

										//--------execute n~ cai ko phu thuoc condition 
										for (var i in this.Field_list){
											if (this.Field[i+'_Condition_Affect']==0){
												switch (this.Field[i+'_Method']){
													case P_Val: this.P[i] = this.Field[i+'_Value'];break;
													case P_Field: this.P[i] = this.Data.RS( this.Field[i+'_Value'] );break;
													case P_Output: this.P[i] = this.Field[i+'_Value'][this.Data.i];break;	}
											}
										}
									}
									return eval(this.Code_to_Eval(this.Code,0))
								}
							 }

		//-------------------Phuong thuc xuat du lieu. Neu' Method  la` undefined, thi` Response.Write truc tiep, neu' la` 1 thi` tra  ve 1 Array chua' tung` dong` DL mot.
		this.Output = function(method){
							var D = this.Data
							if (D){
								var j=0; //---tao bien' dem'

								if (method==1){	var Re = new Array();
									for (D.i=D.startPos();D.i<=D.endPos();D.i++){
										this.Set_P('P_Val' , 'i' , j); j+=1;
										if (D.i==D.endPos()){
											this.Set_P('P_Val' , 'EOF' , true)
										}
										Re.push( this.Single_Output() ) }
									return Re
								}else{
									for (D.i=D.startPos();D.i<=D.endPos();D.i++){
										this.Set_P('P_Val' , 'i' , j); j+=1;
										if (D.i==D.endPos()){
											this.Set_P('P_Val' , 'EOF' , true)
										}
										R( this.Single_Output()+'\n' ) } }
							}else{
								return new Array()
							}
					  }
	}

	//-------Cac ham` ho~ tro cho Control_Tem Class. Mode = 1 --> ko replace cac dau' nhay' doi.
	function HTML_to_ASP(Code, mode){
		Code = Code.replace( /\\/g , "\\\\" )
		if (mode != 1) {Code = Code.replace( /'/g , "\\'" )}
		Code = Code.replace( /\n/g , '\\\n' )
		return "'" + Code + "'"
	}

%>


