function JPaging(maxPage,thisPage){
	thisPage = parseInt(thisPage) || parseInt((location.href.match( /[?&]page=(\d+)/i )||[])[1]) || 1;
	maxPage = maxPage || 0; if (!maxPage){ return '' }; if (thisPage >= maxPage){thisPage=maxPage};
	var link = ''; var focusNext = 2; //-- the number of page next to focus page

	if (2*focusNext+3 > maxPage){ for(var i=1;i<=maxPage;i++){ link+=','+i+',' }; }
	else if (thisPage < focusNext+3){ for(var i=1;i<=thisPage+focusNext;i++){ link+=','+i+',' }; link+='...,'+maxPage+','; }
	else if (thisPage > maxPage-focusNext-2){ link=',1,...'; for(var i=thisPage-focusNext;i<=maxPage;i++){ link+=','+i+',' }; }
	else { link = ',1,...'; for(var i=thisPage-focusNext;i<=thisPage+focusNext;i++){ link+=','+i+',' }; link+='...,'+maxPage+','; }

	link = link.replace(','+thisPage+',','<a class="paging_focus">'+thisPage+'</a>\n')
	.replace(/,(\d+),/g , '<a href="#x" class="paging_normal" onclick="Paging_Func($1)">$1</a>\n' )
	.replace(/\.\.\./g , '<a class="paging_sep">...</a>\n')

	return link
}

function Paging_Func(x){
	var u = location.href; var i=u.indexOf('?'); if(i<0){var sharp_sign=1; i=u.indexOf('#')}; if(i<0){i=u.length};
	var p=u.substring(0,i); var q=u.substring(i+(sharp_sign?0:1), u.length); var re = /(&?)(page=)(\d+)/i;
	if (re.test(q)){ q=q.replace(re,'$1$2'+x) }else{ q= 'page='+x+'&'+q }
	location.href = p+'?'+q
}