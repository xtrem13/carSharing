function meanTime(first, second){
	var first=first.split(":");
	var second=second.split(":");
	first=first[0]*60+(+first[1]);
	second=second[0]*60+(+second[1]);
	first=first+Math.abs(first-second)/2;
	return ""+Math.floor(first/60)+":"+Math.floor(first%60);	
}
module.exports=meanTime;