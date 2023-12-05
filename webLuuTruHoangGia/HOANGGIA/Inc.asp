<!--#Include file="CONFIG/Config.asp"-->
<!--#include file="Lib/HOME_All.asp"-->

<%//----8 Huong nha
var Direction_Str = '1-Đông//2-Tây//3-Nam//4-Bắc//5-Đông Bắc//6-Tây Bắc//7-Đông Nam//8-Tây Nam'
var Direction_Arr = Direction_Str.split('//')
for (var i=0;i<Direction_Arr.length;i++){ Direction_Arr[i] = Direction_Arr[i].split('-') }
Direction_Arr[-1]=Array(0,'')

//-----Gia quang cao VIP - VIP_Price
var VIP_Price = Matrix_to_Arr(DB_to_Val("Select Detail from INTRO where title='VIP_Price' "),2)
%>


