<script language="JScript" runat=server>
	//session("login") = true
	if ( String(Session("admin")) != 'true'){
		response.redirect("login.asp")
	}
</script>
