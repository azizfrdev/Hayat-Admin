exports.createDoctorSchema = {
    fullName: {
        isString: {
            errorMessage: "Ism string bo'lishi kerak!"
        },
        notEmpty: {
            errorMessage: "Ism talab qilinadi!"
        }
    },
    username: {
        isString: {
            errorMessage: "Foydalanuvchi nomi string bo'lishi kerak!"
        },
        notEmpty: {
            errorMessage: "Foydalanuvchi talab qilinadi!"
        },
        trim: {
            errorMessage: "Foydalanuvchi nomining orasida ochiq joy bo'lishi mumkin emas!"
        }
    },
    password: {
        isString: {
            errorMessage: "Parol string bo'lishi kerak!"
        },
        isLength: {
            options: { min: 8 },
            errorMessage: "Parol kamida 8 ta belgidan iborat bo'lishi kerak!"
        },
        notEmpty: {
            errorMessage: "Parol talab qilinadi!"
        },
        trim: {
            errorMessage: "Parol orasida ochiq joy bo'lishi mumkin emas!"
        }
    },
    experience: {
        isString: {
            errorMessage: "Tajriba string bo'lishi kerak!"
        },
        notEmpty: {
            errorMessage: "Tajriba talab qilinadi!"
        },
    },
    position: {
        isString: {
            errorMessage: "Lavozim string bo'lishi kerak!"
        },
        notEmpty: {
            errorMessage: "Lavozim talab qilinadi!"
        },
    },
    category: {
        isString: {
            errorMessage: "Toifa string bo'lishi kerak!"
        },
        notEmpty: {
            errorMessage: "Toifa talab qilinadi!"
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
    },
    service: {
        notEmpty: {
            errorMessage: "Service talab qilinadi!"
        }
    },
}

exports.updateDoctorSchema = {
    fullName: {
        isString: {
            errorMessage: "Ism string bo'lishi kerak!"
        },
        notEmpty: {
            errorMessage: "Ism talab qilinadi!"
        }
    },
    username: {
        isString: {
            errorMessage: "Foydalanuvchi nomi string bo'lishi kerak!"
        },
        notEmpty: {
            errorMessage: "Foydalanuvchi talab qilinadi!"
        },
        trim: {
            errorMessage: "Foydalanuvchi nomining orasida ochiq joy bo'lishi mumkin emas!"
        }
    },
    password: {
        isString: {
            errorMessage: "Pareol string bo'lishi kerak!"
        },
        isLength: {
            options: { min: 8 },
            errorMessage: "Parol kamida 8 ta belgidan iborat bo'lishi kerak!"
        },
        notEmpty: {
            errorMessage: "Parol talab qilinadi!"
        },
        trim: {
            errorMessage: "Parol orasida ochiq joy bo'lishi mumkin emas!"
        }
    },
    experience: {
        isString: {
            errorMessage: "Tajriba string bo'lishi kerak!"
        },
        notEmpty: {
            errorMessage: "Tajriba talab qilinadi!"
        },
    },
    position: {
        isString: {
            errorMessage: "Lavozim string bo'lishi kerak!"
        },
        notEmpty: {
            errorMessage: "Lavozim talab qilinadi!"
        },
    },
    category: {
        isString: {
            errorMessage: "Toifa string bo'lishi kerak!"
        },
        notEmpty: {
            errorMessage: "Toifa talab qilinadi!"
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
    },
    service: {
        notEmpty: {
            errorMessage: "Service talab qilinadi!"
        }
    }
}