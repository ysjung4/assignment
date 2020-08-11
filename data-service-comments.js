
const mongoose = require('mongoose');
let Schema = mongoose.Schema;
mongoose.Promise = require("bluebird");



let commentSchema = new Schema({
    authorName: String,
    authorEmail: String,
    subject: String,
    commentText: String,
    postedDate: Date,
    replies: [{
        comment_id: String,
        authorName: String,
        authorEmail: String,
        commentText: String,
        repliedDate: Date
    }]
});

let Comment; 

var comment = mongoose.model("comments", commentSchema);
module.exports.getAllComments = function () {

    return new Promise(function (resolve, reject) {
        Comment.find()
            .sort({postedDate: 'asc'}) 
            .exec()
            .then((comments) => {
                resolve(comments);
            }).catch((err) => {
                reject(err);
            });
    });

};

module.exports.addComment = function (data) {
    return new Promise(function (resolve, reject) {
       
        data.postedDate = Date.now();
        var newComment = new Comment(data);
        
        newComment.save((err) => {
            
            if (err) {
                reject("There was an error saving the comment: " + err);
            } else {
                console.log(newComment._id);
                resolve(newComment._id);
            }
        });

    });
}

module.exports.addReply = function (data) {
    return new Promise(function (resolve, reject) {
        
       
        data.repliedDate = Date.now();

     
       
        Comment.update({ _id: data.comment_id},
        { $addToSet: { replies: data } },
        { multi: false })
        .exec()
        .then(() => {
            resolve();
        }).catch((err) => {
            reject(err);
        });
    });
}



module.exports.initialize = function () {

    return new Promise(function (resolve, reject) {

        let db = mongoose.createConnection("mongodb://<yeonseo>:<rustjqozbd56>@ds019746.mlab.com:19746/web322_a7");

        db.on('error', (err)=>{
            reject(err);
        });

        db.once('open', ()=>{
           Comment = db.model("comments", commentSchema);
           resolve();
        });
    });
};

