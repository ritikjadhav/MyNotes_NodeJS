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
            message: error.message,
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
            message: error.message,
        });
    }
};

exports.notesDetails = async (req, res) => {
    try {
        res.send(`<h1>Hello ${req.body.name} your notes are registered.</h1>`)
    } catch (error) {
        res.status(404).json({
            status: "fail",
            message: error.message,
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
            message: error.message,
        });
    }
};

exports.updateNotes = async (req, res) => {
    try {
        const notes = await NotesModel.findOneAndUpdate(
            { notesID: req.params.id },
            req.body,
            {
                new: true, //to return new doc back
                runValidators: true,
            }
        );
        if (notes != null) {
            res.status(200).json({
                status: 'success',
                data: {
                    notes,
                },
            });
        } else {
            res.status(400).json({
                status: 'success',
                data: {
                    message: `No notes available with ID ${req.params.id}`,
                },
            });
        }
    } catch (error) {
        res.status(404).json({
            status: 'fail',
            message: error.message,
        });
    }
}

exports.deleteNotes = async (req, res) => {
    try {
        const delNotes = await NotesModel.deleteOne({ notesID: req.params.id });
        if (delNotes.deletedCount === 0) {
            res.status(404).json({
                status: 'fail',
                data: {
                    message: 'No notes available for this ID',
                },
            });
        } else {
            res.status(200).json({
                status: 'success',
                data: {
                    message: `Notes with ${req.params.id} ID deleted`,
                },
            });
        }
    } catch (error) {
        res.status(404).json({
            status: 'fail',
            message: error.message,
        });
    }
}

//Setting cookies
exports.user1 = async (req, res) => {
    res.cookie("name", req.params.name);
    res.send('<p>Cookie set: </p> <a href="/user"> View here </a>');
}

//Reading cookies
exports.user2 = async (req, res) => {
    res.send(req.cookies.name);
}

exports.invalid = async (req, res, next) => {
    let err = new Error();
    err.status = 404;
    err.message = "Invalid Route";
    next(err);
};