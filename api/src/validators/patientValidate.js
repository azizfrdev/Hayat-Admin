exports.createPatientSchema = {
    fullName: {
        isString: {
            errorMessage: "F.I.Sh  string bo'lishi kerak!"
        },
        notEmpty: {
            errorMessage: "F.I.Sh talab qilinadi!"
        }
    },
    age: {
        isString: {
            errorMessage: "Yosh string bo'lishi kerak!"
        },
        notEmpty: {
            errorMessage: "Yosh talab qilinadi!"
        }
    },
    email: {
        isEmail: {
            errorMessage: "Elektron pochta manzili yaroqsiz!",
        },
        notEmpty: {
            errorMessage: "Elektron pochta manzili talab qilinadi!"
        }
    },
    analysis: {
        isString: {
            errorMessage: "Tahlil natijasi string bo'lishi kerak!"
        },
        notEmpty: {
            errorMessage: "Tahlil natijasi talab qilinadi!"
        }
    }
}

exports.updatePateintSchema = {
    fullName: {
        isString: {
            errorMessage: "F.I.Sh  string bo'lishi kerak!"
        },
        notEmpty: {
            errorMessage: "F.I.Sh talab qilinadi!"
        }
    },
    age: {
        isString: {
            errorMessage: "Yosh string bo'lishi kerak!"
        },
        notEmpty: {
            errorMessage: "Yosh talab qilinadi!"
        }
    },
    email: {
        isEmail: {
            errorMessage: "Elektron pochta manzili yaroqsiz!",
        },
        notEmpty: {
            errorMessage: "Elektron pochta manzili talab qilinadi!"
        }
    },
    analysis: {
        isString: {
            errorMessage: "Tahlil natijasi string bo'lishi kerak!"
        },
        notEmpty: {
            errorMessage: "Tahlil natijasi talab qilinadi!"
        }
    }
}