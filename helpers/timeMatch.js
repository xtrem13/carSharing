function timeMatch(first, second){
	var first=first.split(":");
	var second=second.split(":");
	first=first[0]*60+(+first[1]);
	second=second[0]*60+(+second[1]);
	if(Math.abs(first-second)<30){
		return true;
	}else{
		
		return false;
	}
}
module.exports=timeMatch;