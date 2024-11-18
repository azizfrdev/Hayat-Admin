exports.createServiceSchema = {
    name: {
        isString: {
            errorMessage: "Xizmat nomi string bo'lishi kerak!"
        },
        notEmpty: {
            errorMessage: "Xizmat nomi talab qilinadi!"
        }
    },
    title: {
        isString: {
            errorMessage: "Sarlavha string bo'lishi kerak!"
        },
        notEmpty: {
            errorMessage: "Sarlavha talab qilinadi!"
        }
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

exports.updateServiceSchema = {
    name: {
        isString: {
            errorMessage: "Xizmat nomi string bo'lishi kerak!"
        },
        notEmpty: {
            errorMessage: "Xizmat nomi talab qilinadi!"
        }
    },
    title: {
        isString: {
            errorMessage: "Sarlavha string bo'lishi kerak!"
        },
        notEmpty: {
            errorMessage: "Sarlavha talab qilinadi!"
        }
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