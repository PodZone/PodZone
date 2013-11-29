// Displaytime function
function displayTime(time)
{
	seconds = parseInt(time);
	var date = new Date(seconds * 1000);
	var hh = date.getUTCHours();
	var mm = date.getUTCMinutes();
	var ss = date.getSeconds();

	if (hh > 12) {hh = hh - 12;}
	h = hh*60;
	mm = mm+h; 
	if (mm < 10) {mm = "0"+mm;}
	if (ss < 10) {ss = "0"+ss;}

	var t = mm+":"+ss;
	return(t);
}