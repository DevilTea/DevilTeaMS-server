
function enter(pi) {
	var returnMap = pi.getSavedLocation("GACHAPON_HOUSE");
	if (returnMap < 0) {
		returnMap = 100000000;
	}
	pi.clearSavedLocation("GACHAPON_HOUSE");
	pi.getPlayer().changeMap(returnMap, "GHousingIn00");
	return true;
}
