exports.createStaffSchema = {
    fullName: {
        isString: {
            errorMessage: "Ism string bo'lishi kerak!"
        },
        notEmpty: {
            errorMessage: "Ism talab qilinadi!"
        }
    },
    position: {
        isString: {
            errorMessage: "Lavozim string bo'lishi kerak!"
        },
        notEmpty: {
            errorMessage: "Lavozim talab qilinadi!"
        },
    },
    description: {
        isString: {
            errorMessage: "Tavsif string bo'lishi kerak!"
        },
        notEmpty: {
            errorMessage: "Tavsif talab qilinadi!"
        },
        isLength: {
            options: { min: 25, max: 250 },
            errorMessage: "Tavsif kamida 25 ta belgidan iborat bo'lishi kerak!"
        },
    }
}

exports.updateStaffSchema = {
    fullName: {
        isString: {
            errorMessage: "Ism string bo'lishi kerak!"
        },
        notEmpty: {
            errorMessage: "Ism talab qilinadi!"
        }
    },
    position: {
        isString: {
            errorMessage: "Lavozim string bo'lishi kerak!"
        },
        notEmpty: {
            errorMessage: "Lavozim talab qilinadi!"
        },
    },
    description: {
        isString: {
            errorMessage: "Tavsif string bo'lishi kerak!"
        },
        notEmpty: {
            errorMessage: "Tavsif talab qilinadi!"
        },
        isLength: {
            options: { min: 25, max: 250 },
            errorMessage: "Tavsif kamida 25 ta belgidan iborat bo'lishi kerak!"
        },
    }
}