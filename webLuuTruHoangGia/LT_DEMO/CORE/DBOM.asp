<!--#include file=DBOM_DATATYPE.asp-->

<%//---this file contains all project data structure information
//----- note : by default, each table has 1 field named ID with datatype : int indentity(1,1)
//----- ID field is persistent & stay the same for all table.
//----- in this file we omit ID field

/*ALL DATA TYPE CLASS EXPLANATION
	.int(min,max,notnull)
	.float(min,max,precision,notnull)  -- precision : the number of digit after dot(.) (if there's more than precision number digit, not return false but silently convert to correct number of digit and return true)
	.text(min,max)
	.intro(min,max)
	.detail(min)
	.htmltext( .. too complicate at this time .. )
	.email(conflict_field, notnull)
	.url(notnull)
	.user(min,max,conflict_field)
	.pass(min,max)
	.freeregex(regex , min, max)
	.instr(givenStr ,givenField, notAllowNull)	--- givenStr :  1,2,3,4,6,8		givenField : MENU.ID
	.scattered_instr(givenStr ,givenField, notAllowNull)
	.matrix(rowReg , notnull)
	.fileList .flashlist .medialist .doclist (fileNum, notnull)
	.imglist(fileNum, fileSize, notNull, thumbW , thumbH, maxW, maxH)		//--- incase specify thumbW or thumbH, we create a thumbnail for the uploaded image. //--- incase specify maxW or maxH, we resize the image to maxW or maxH, depend on the side-size specified
*/


var DT = DBOM_DataType
var DBOM = {

//------Some note in Structure : 
// - Comment in double slash (//) format only, no /**/
// - No double slash in comment : WRONG :    // comment // abc
// - Keep   },   after 1 table
// - Each field, each table 1 line

//--^
	admin:{	//count visitors  
		my_user		:	new DT.text(null,null),	//
		my_pass		:	new DT.text(null,null),	//
		last_login		:	new DT.text(null,null),	//
		my_email		:	new DT.text(null,null)	//
	},

	intro:{	//  
		title		:	new DT.text(null,null),	//
		image		:	new DT.imglist(1,null,null,null,null,null,null),	//
		intro		:	new DT.longtext(0,255),	//
		detail		:	new DT.htmltext(null,null,null),	//
		e_detail	:	new DT.htmltext(null,null,null),	//
		intro_text	:	new DT.text(null,null),	//
		edit_page	:	new DT.text(null,null),	//
		nick		:	new DT.longtext(null,null),	//
		e_nick		:	new DT.longtext(null,null)	//
	},

	menu:{//
		relateNNto	:	'menu.root_item--product.cat_id',
		root_item	:	new DT.instr(null,'menu.id',1,1),	//
		menu_txt	:	new DT.text(1,null),	//
		e_menu_txt	:	new DT.text(null,null),	//
		menu_order	:	new DT.int(null,null,null),	//
		image		:	new DT.imglist(1,null,null,150,null,1000,400),	//
		vip			:	new DT.int(null,null,null),
		ads_link	:	new DT.text(null,null)	//
	},

	car:{//
		relateNNto	:	'car.root_item--product.car_id',
		root_item	:	new DT.instr(null,'car.id',1,1),	//
		menu_txt	:	new DT.text(1,null),	//
		menu_order	:	new DT.int(null,null,null),	//
		image		:	new DT.imglist(1,null,null,150,null,1000,400),	//
		vip			:	new DT.instr('0,1',null,null)
	},

	product:{	//  
		image		:	new DT.imglist(1,null,null,150,null,1000,1000),	//
		cat_id		:	new DT.instr(null,'menu.id',1),
		car_id		:	new DT.instr(null,'car.id',1),
		brand		:	new DT.text(null,null),	//
		name		:	new DT.text(3,null),	//
		e_name		:	new DT.text(null,null),	//
		price		:	new DT.int(null,null,null),	//
		e_price		:	new DT.int(null,null,null),	//
		proddetail	:	new DT.htmltext(3,null,null),	//
		e_detail	:	new DT.htmltext(null,null,null),	//
		add_time	:	new DT.datetime(1,null,null,null),	//
		viewed		:	new DT.int(null,null,null)	//
	},

	news:{	//  
		cat_id		:	new DT.text(null,null),	//
		module_name	:	new DT.text(null,null),	//
		vip			:	new DT.text(null,null),	//
		title		:	new DT.text(3,null),	//
		intro		:	new DT.longtext(3,255),	//
		detail		:	new DT.htmltext(3,null,null),	//
		image		:	new DT.imglist(1,null,null,150,null,600,600),	//
		add_time		:	new DT.datetime(1,null,null,null),	//
		viewed		:	new DT.int(null,null,null),	//
		source		:	new DT.text(null,null),	//
		piclist		:	new DT.longtext(null,null)	//
	},


	enews:{	//  
		cat_id		:	new DT.text(null,null),	//
		module_name	:	new DT.text(null,null),	//
		vip			:	new DT.text(null,null),	//
		title		:	new DT.text(3,null),	//
		intro		:	new DT.longtext(3,255),	//
		detail		:	new DT.htmltext(3,null,null),	//
		image		:	new DT.imglist(1,null,null,150,null,600,600),	//
		add_time		:	new DT.datetime(1,null,null,null),	//
		viewed		:	new DT.int(null,null,null),	//
		source		:	new DT.text(null,null),	//
		piclist		:	new DT.longtext(null,null)	//
	},


	nick:{	//  
		name		:	new DT.text(1,null),	//
		e_name		:	new DT.text(null,null),	//
		nick		:	new DT.text(1,null),	//
		nick_type	:	new DT.text(null,null)	//
	},

	contact_request:{	//  
		client_name	:	new DT.text(1,null),	//
		product_num	:	new DT.int(null,null,null),	//
		detail		:	new DT.htmltext(3,null,null),	//
		add_time	:	new DT.datetime(1,null,null,null)	//
	},

	prod_request:{	//  
		client_name	:	new DT.text(1,null),	//
		product_num	:	new DT.int(null,null,null),	//
		detail		:	new DT.htmltext(3,null,null),	//
		add_time	:	new DT.datetime(1,null,null,null)	//
	},

	cart_request:{	//  
		client_name	:	new DT.text(1,null),	//
		product_num	:	new DT.int(null,null,null),	//
		detail		:	new DT.htmltext(3,null,null),	//
		add_time	:	new DT.datetime(1,null,null,null)	//
	},

	visitor:{	//  
		visitor		:	new DT.int(null,null,null)	//
	}
//--$

	
}

DT=null



//-- Note : all the friendlyName must be lowerCase
var DBOM_friendlyName = {

	intro:{	//  
		title		:	'',
		image		:	'ảnh minh họa',
		detail		:	'nội dung',
		e_detail	:	'nội dung (English)',
		intro_text	:	'',
		intro		:	'giới thiệu',
		edit_page	:	'',
		nick		:	'nội dung',
		e_nick		:	'nội dung (English)'
	},

	menu:{//
		root_item	:	' ',	//
		menu_txt	:	'Tên danh mục',	//
		e_menu_txt	:	'Tên danh mục (English)',	//
		menu_order	:	'Thứ tự danh mục',	//
		image		:	'Ảnh quảng cáo',	//
		vip			:	'Danh mục nổi bật',	//
		ads_link	:	'Liên kết (link)'//
	},

	car:{//
		root_item	:	' ',	//
		menu_txt	:	'Tên xe',	//
		menu_order	:	'Thứ tự xe',	//
		image		:	'Logo hãng xe',	//
		vip			:	'Tình trạng hiển thị'	//
	},

	product:{	//  
		image		:	'Ảnh sản phẩm',	//
		cat_id		:	'Danh mục sp',
		car_id		:	'Phụ tùng xe',
		brand		:	'Hãng sản xuất',	//
		name		:	'Tên sản phẩm',	//
		e_name		:	'Tên sản phẩm (English)',	//
		price		:	'Giá bán (đơn vị nghìn đồng)',	//
		e_price		:	'Giá bán (đơn vị usd)',	//
		proddetail	:	'Thông tin chi tiết sp',	//
		e_detail	:	'Thông tin chi tiết sp (English)',	//
		add_time	:	'Ngày cập nhật',	//
		viewed		:	'Số lượt xem'
	},

	news:{	//  
		cat_id		:	'danh mục tin',
		module_name	:	'',
		vip			:	'là tin nổi bật',
		title		:	'tiêu đề',
		intro		:	'giới thiệu',
		detail		:	'nội dung',
		image		:	'ảnh minh họa',
		add_time	:	'',
		viewed		:	'',
		source		:	'nguồn tin',
		piclist		:	''
	},


	enews:{	//  
		cat_id		:	'danh mục tin',
		module_name	:	'',
		vip			:	'là tin nổi bật',
		title		:	'tiêu đề (english)',
		intro		:	'giới thiệu (english)',
		detail		:	'nội dung (english)',
		image		:	'ảnh minh họa (english)',
		add_time	:	'',
		viewed		:	'',
		source		:	'nguồn tin (english)',
		piclist		:	''
	},


	nick:{	//  
		name		:	'tên hỗ trợ',
		e_name		:	'tên hỗ trợ (English)',
		nick		:	'nick chat',
		nick_type	:	'loại nick'
	},

	visitor:{	//  
		visitor		:	''
	}

}
%>






