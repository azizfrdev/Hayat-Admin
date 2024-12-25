exports.createStaffSchema = {
    uz_name: { isString: { errorMessage: "Ism string bo'lishi kerak!" }, notEmpty: { errorMessage: "Ism talab qilinadi!" } },
    ru_name: { isString: { errorMessage: "Ism string bo'lishi kerak!" }, notEmpty: { errorMessage: "Ism talab qilinadi!" } },
    en_name: { isString: { errorMessage: "Ism string bo'lishi kerak!" }, notEmpty: { errorMessage: "Ism talab qilinadi!" } },

    uz_position: { isString: { errorMessage: "Lavozim string bo'lishi kerak!" }, notEmpty: { errorMessage: "Lavozim talab qilinadi!" }, },
    ru_position: { isString: { errorMessage: "Lavozim string bo'lishi kerak!" }, notEmpty: { errorMessage: "Lavozim talab qilinadi!" }, },
    en_position: { isString: { errorMessage: "Lavozim string bo'lishi kerak!" }, notEmpty: { errorMessage: "Lavozim talab qilinadi!" }, },

    uz_description: { isString: { errorMessage: "Tavsif string bo'lishi kerak!" }, notEmpty: { errorMessage: "Tavsif talab qilinadi!" }, isLength: { options: { min: 25, max: 250 }, errorMessage: "Tavsif kamida 25 ta belgidan iborat bo'lishi kerak!" }, },

    ru_description: { isString: { errorMessage: "Tavsif string bo'lishi kerak!" }, notEmpty: { errorMessage: "Tavsif talab qilinadi!" }, isLength: { options: { min: 25, max: 250 }, errorMessage: "Tavsif kamida 25 ta belgidan iborat bo'lishi kerak!" }, },

    en_description: { isString: { errorMessage: "Tavsif string bo'lishi kerak!" }, notEmpty: { errorMessage: "Tavsif talab qilinadi!" }, isLength: { options: { min: 25, max: 250 }, errorMessage: "Tavsif kamida 25 ta belgidan iborat bo'lishi kerak!" }, }
}

exports.updateStaffSchema = {
    uz_name: { isString: { errorMessage: "Ism string bo'lishi kerak!" }, notEmpty: { errorMessage: "Ism talab qilinadi!" } },
    ru_name: { isString: { errorMessage: "Ism string bo'lishi kerak!" }, notEmpty: { errorMessage: "Ism talab qilinadi!" } },
    en_name: { isString: { errorMessage: "Ism string bo'lishi kerak!" }, notEmpty: { errorMessage: "Ism talab qilinadi!" } },

    uz_position: { isString: { errorMessage: "Lavozim string bo'lishi kerak!" }, notEmpty: { errorMessage: "Lavozim talab qilinadi!" }, },
    ru_position: { isString: { errorMessage: "Lavozim string bo'lishi kerak!" }, notEmpty: { errorMessage: "Lavozim talab qilinadi!" }, },
    en_position: { isString: { errorMessage: "Lavozim string bo'lishi kerak!" }, notEmpty: { errorMessage: "Lavozim talab qilinadi!" }, },

    uz_description: { isString: { errorMessage: "Tavsif string bo'lishi kerak!" }, notEmpty: { errorMessage: "Tavsif talab qilinadi!" }, isLength: { options: { min: 25, max: 250 }, errorMessage: "Tavsif kamida 25 ta belgidan iborat bo'lishi kerak!" }, },

    ru_description: { isString: { errorMessage: "Tavsif string bo'lishi kerak!" }, notEmpty: { errorMessage: "Tavsif talab qilinadi!" }, isLength: { options: { min: 25, max: 250 }, errorMessage: "Tavsif kamida 25 ta belgidan iborat bo'lishi kerak!" }, },

    en_description: { isString: { errorMessage: "Tavsif string bo'lishi kerak!" }, notEmpty: { errorMessage: "Tavsif talab qilinadi!" }, isLength: { options: { min: 25, max: 250 }, errorMessage: "Tavsif kamida 25 ta belgidan iborat bo'lishi kerak!" }, }
}