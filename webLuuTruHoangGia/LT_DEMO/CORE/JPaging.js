function JPaging(maxPage,thisPage){
	maxPage = maxPage || 0; thisPage = parseInt(thisPage) || 1; if (!maxPage){ return '' }; if (thisPage >= maxPage){thisPage=maxPage};
	var link = ''; var focusNext = 2; //-- the number of page next to focus page
	if (2*focusNext+3 > maxPage){ for(var i=1;i<=maxPage;i++){ link+=','+i+',' }; }
	else if (thisPage < focusNext+3){ for(var i=1;i<=thisPage+focusNext;i++){ link+=','+i+',' }; link+='...,'+maxPage+','; }
	else if (thisPage > maxPage-focusNext-2){ link=',1,...'; for(var i=thisPage-focusNext;i<=maxPage;i++){ link+=','+i+',' }; }
	else { link = ',1,...'; for(var i=thisPage-focusNext;i<=thisPage+focusNext;i++){ link+=','+i+',' }; link+='...,'+maxPage+','; }

	link = link.replace(','+thisPage+',','<a class="paging_focus">'+thisPage+'</a>\n')
	.replace(/,(\d+),/g , '<a href="#x" class="paging_normal">$1</a>\n' )
	.replace(/\.\.\./g , '<a class="paging_sep">...</a>\n')

	return link
}