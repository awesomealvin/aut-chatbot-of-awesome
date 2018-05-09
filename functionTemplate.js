function paperName(req, res) {


    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db("chatbot");
        //enter search terms on this line
        dbo.collection("papers").find({_id: paperToSearch}).toArray(function (err, result) {
            if (err) throw err;
            console.log(result);

            if (result.length != 0) {

//ENTER LOGIC HERE!
// ENTER RETURN STATEMENT
            }
            else {
//ENTER FAILED LOGIC HERE
// ENTER RETURN STATEMENT

            }
            db.close();
        });
    });

}



/*

SAMPLE JSON RESPONSE

return res.json({
    'fulfillmentText': "No, " +paperToSearch +" is not a paper that the university offers."
});

*/