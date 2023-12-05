<script src="/BDs/JQuery.js"></script>
<script src="jquery.datePicker.js"></script>
<script src="Date.js"></script>
<link rel="stylesheet" href="datePicker.css" />

<div style="width:120px; height:24px; overflow:hidden;">
<input class="date_pick" style="width:120px; height:22px;"/>
</div>


<script>
$(function()
{
	$('.date_pick').datePicker({clickInput:true});
});
</script>

