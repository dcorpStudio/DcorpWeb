<%
	///////////////////////////////////////////////////Object chuyen xu ly Query String & cac thong tin cua thisPage=========//
	///////////////////////////////////////////////////Giai quyet van de` truyen` lai. cac tham so' da co' , truyen` di truyen` lai cac tham so, hoac thay gia tri 1 tham so'` 
		function thisPage_URL(Page, URL){
			this.Page = Page|| Request.ServerVariables("URL")
			this.Param_Str = URL?( Clean(URL.split('?')[1]) ) : Clean(VBQuery())
			this.URL = URL || (this.Page + (this.Param_Str?('?'+this.Param_Str):''))
			var Q_Pos = this.URL.indexOf('?')
			this.Page = this.URL.substring(0, (Q_Pos<0)?this.URL.length:Q_Pos )

//R(this.Page + '<br>' + this.URL); br();


			this.A = new Object();
			var P_Arr = this.Param_Str.split('&');

			for (var i=0;i<P_Arr.length;i++){
				if (P_Arr[i]!='' && P_Arr[i].toString().indexOf('=')>=0)
					{ var T=P_Arr[i].split('=');	this.A[T[0]] = T[1];  }	}

			//-----Truyen` 1 chuoi~ Parameter co' dang.  'a=5&b=119&c=....' , nhung~ parameter trung` se duoc replace.  Tra ve` 1 link gom` URL & Param da thay the.
			this.Param = function(Param_Str){	var B = Param_Str.Clean().split('&')
								var P = new Object;
								for (var i in this.A){P[i]=this.A[i]}
								for (var i=0;i<B.length;i++){
									if (B[i]!=null && B[i].indexOf('=')>=0){
										var C=B[i].split('='); P[C[0]] = C[1];	}	}
								var re = '';
								for (var i in P){ re+= '&' + i +'='+P[i] }
								return this.Page+'?'+re.substring(1,re.length);	}

			//---Remove 1 parameter de add vao`cuoi' URL
			this.Remove = function(Param_Name){		var re = '';
							Param_Name = Param_Name.Clean();
							for (var i in this.A){ if (i!=Param_Name){re+= '&' + i +'='+this.A[i]} }
							return this.Page+'?'+re.substring(1,re.length)	}
		}


	////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	//  Tao 1 Object chuyen lo lieu cac kieu Paging. *Ki' tu Special_char mac dinh se la` ki tu $ ---

	function Paging_Obj(thisPage , lastPage){
		this.Link = new thisPage_URL;	this.lastPage=lastPage ;	this.thisPage = thisPage;

		//---- Cac tham so' co the co' cua Paging_Object
		this.Normal_Format = '<a href="$link/">$i/</a> &nbsp; \n '
		this.Focus_Format = ' <a href="$link/"><b>$i/</b></a> &nbsp; \n '
		this.First_List = 0	//--So' trang bat dau` tu 1 : 1 2 3.....
		this.Last_List = 0  //--So' trang cuoi' (...7 8 9)
		this.Before_Focus = 1	//----So' trang truoc trang focus
		this.After_Focus = 1	//---So' trang sau trang focus
		this.Sep = '...&nbsp; '		//-----Dau cham cham
		this.PrevPage = ' <a href="$link/">&lt;</a> '
		this.NextPage = ' <a href="$link/">&gt;</a> &nbsp; \n '
		this.FirstPage_Format = ' <a href="$link/">&lt;&lt;</a> &nbsp; \n '
		this.LastPage_Format = ' <a href="$link/">&gt;&gt;</a> &nbsp; \n '

		//---Ham` bo tro thu tuc Output , dung` de replace $link/ va` $i/  trong Code
		this.X_Code = function(code, X_link , i){
						if (X_link!=undefined) {code = code.replace( /\$link\//gi , X_link )}
						if (i!=undefined) {code = code.replace( /\$i\//gi , i )}
						return code	 }

		//----Thu tuc tao Output
		this.Output = function(){
							var page=this.thisPage; page=parseInt(new String(page));
							this.thisPage=(page!=null && page<=this.lastPage && page>0)? page:1
							var link = this.Link.Remove('page'); link+= ((link.indexOf('=')>-1)?'&':'') + 'page='
							var prev_page = (this.thisPage>1)? (this.thisPage-1):1
							var re = this.X_Code( this.FirstPage_Format , link+1 )
							re+= this.X_Code( this.PrevPage , link+prev_page )

							// -- Cac gioi han (Range)
							var range1_max = 1 + this.First_List
							var range2_min = this.thisPage - this.Before_Focus
							var range2_max = this.thisPage + this.After_Focus
							var range3_min = this.lastPage - this.Last_List

							for (var i=1;i<=this.lastPage;i++){
								if (i>range1_max && i <range2_min){ re+=this.Sep; i=range2_min}
								if (i>range2_max && i <range3_min){ re+=this.Sep; i=range3_min}

								eval_code = (this.thisPage==i)? 'Focus_Format' : 'Normal_Format'
								code = eval( 'this.X_Code( this.' + eval_code + ',link+i,i)' )
								if (i<=range1_max || (i>=range2_min && i<=range2_max) || i>=range3_min){
									re+= code;}
							}
							var next_page = (this.thisPage>=this.lastPage)? this.lastPage : (this.thisPage+1)
							re+= this.X_Code( this.NextPage, link+next_page )
							re+= this.X_Code( this.LastPage_Format ,  link + this.lastPage )
							return re;
					  }
	}

%>


