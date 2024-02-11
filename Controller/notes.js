const NotesModel = require('../Model/schema');

const validators = require('../Utilities/validator');

exports.getNotes = async (req, res) => {
    try {
        const notes = await NotesModel.find({}, { _id: 0, __v: 0});
        //The find method returns a promise, so await is used to wait for the promise to resolve. 
        //The second argument to find specifies that we don't want to include the _id and __v fields in the returned documents.

        if (notes.length > 0) {
            res.status(200).json({
                status: 'success',
                results: notes.length,
                data: {
                    notes,
                },
            });
        } else {
            res.status(400).json({
                status: 'success',
                data: {
                    message: 'No notes available in the repo',
                },
            });
        }
    } catch (error) {
        res.status(404).json({
            status: "fail",
            message: error,
        });
    }
};

exports.bookNotes = async (req, res) => {
    try {
        res.status(201).json({
            message: "New notes added for the POST request.",
            data: {
                notes: "Your requested notes is booked."
            }
        });
    } catch (error) {
        res.status(404).json({
            status: "fail",
            message: "error",
        });
    }
};

exports.notesDetails = async (req, res) => {
    try {
        res.send(`<h1>Hello ${req.body.name} your notes are registered.</h1>`)
    } catch (error) {
        res.status(404).json({
            status: "fail",
            message: error,
        });
    }
};

exports.newNotes = async (req, res) => {
    try {
        if (validators.validateName(req.body.name)) {
            const newNotes = await NotesModel.create(req.body);
            res.status(201).json({
                status: 'success',
                data: {
                    newNotes,
                },
            });
        } else {
            res.status(400).json({
                status: 'error',
                results: 'Enter valid name',
            });
        }
    } catch (error) {
        res.status(404).json({
            status: 'fail',
            message: error,
        });
    }
};

exports.invalid = async (req, res, next) => {
    let err = new Error();
    err.status = 404;
    err.message = "Invalid Route";
    next(err);
};