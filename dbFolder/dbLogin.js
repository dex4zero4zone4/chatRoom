/*
* Evan Preisler - dex4zero4zone4
* NUI Galway chat room
* twitter @dex4zero4zone4
* 2014
*/
exports.userLogin = function(email, password, userTable, req, res){
	var userChecked;
	for(var i=0; i<userTable.length; i++){
		if(userTable[i].email==email){
			if(userTable[i].password==password){
				userChecked = i;
			}
		}
	}
	console.log("That guides us...")
	return userChecked;
};