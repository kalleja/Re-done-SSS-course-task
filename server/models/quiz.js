const mongoose = require("mongoose");
const ObjectID = require("mongodb").ObjectID;

const Schema = mongoose.Schema;
mongoose.promise = Promise;

const quizSchema = new Schema({
    name: {
        type: String,
        unique: true,
        required: true
    },
    maxUserCount: {
        type: Number,
        default: 1
    },
    user: {
        type: Array,
        default: []
    },
    questions: {
        type: Array,
        required: true
    }
});

const Quiz = mongoose.model("Quiz", quizSchema);

module.exports = Quiz;

module.exports.create = (params, callback) => new Quiz(params).save(callback);

module.exports.getAll = callback => Quiz.find(callback);

module.exports.getById = (quizId, callback) =>
    Quiz.findOne({ _id: new ObjectID(quizId) }, callback);

module.exports.getUser = (quizId, callback) =>
    Quiz.findOne({ _id: new ObjectID(quizId) }, callback);

module.exports.removeUser = (userId, callback) =>
    Quiz.findOneAndUpdate(
        { user: { $in: [String(userId)] } },
        {
            $pull: {
                user: String(userId)
            }
        },
        { new: true },
        callback
    );

module.exports.removeUser = (quizId, callback) =>
    Quiz.findOneAndUpdate(
        { _id: new ObjectID(quizId) },
        {
            $set: {
                user: []
            }
        },
        { new: true },
        callback
    );

module.exports.checkIfAnswerIsCorrect = (
    quizId,
    questionId,
    answerId,
    callback
) => {
    Quiz.findOne({ _id: new ObjectID(quizId) }, (err, quizData) => {
        if (err) {
            return callback(err);
        }

        return callback(
            err,
            quizData.questions[questionId]["answer_id"] === parseInt(answerId)
        );
    });
};

module.exports.addUser = (quizId, userId, callback) => {
    Quiz.findOne({ _id: new ObjectID(quizId) }, (err, result) => {
        if (err) {
            return callback(err);
        }

      
        Quiz.findOneAndUpdate(
            { _id: new ObjectID(quizId) },
            {
                $addToSet: {
                    user: userId
                }
            },
            { new: true },
            callback
        );
    });
};

module.exports.getIsInProgress = (quizId, callback) => {
    Quiz.findOne({ _id: new ObjectID(quizId) }, (err, result) => {
        if (err) {
            return callback(err, false);
        }

       
        return callback(err, true, result);
    });
};
