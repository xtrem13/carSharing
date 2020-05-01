function dayMatch(first, second){
	var first=first.split(",");
	var second=second.split(",");
	var max=Math.max(first.length, second.length);
	var score=0;
	for(var i=0;i<first.length;i++){
		score=(second.indexOf(first[i])>-1)?score+1:score;
	}
	console.log(score);
	return score==max;

}
module.exports=dayMatch;