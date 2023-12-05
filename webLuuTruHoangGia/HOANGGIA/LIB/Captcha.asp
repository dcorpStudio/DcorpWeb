<!--#include file="VB_Function.asp"-->
<%
Task=Request("Task")
Task = LCase(Task)
Task_List = ",email_price,download_price_list,mem_update_prod,add_rao,add_product,mem_renew,signup,"

if Instr(Task_List, ","&Task&",")>0 then
	Response.Write Captcha(4,Task)
end if%>


