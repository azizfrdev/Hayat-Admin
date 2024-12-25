exports.createNewsSchema = {
    uz_title: { isString: { errorMessage: "Sarlavha string bo'lishi kerak!" }, notEmpty: { errorMessage: "Sarlavha talab qilinadi!" } },
    ru_title: { isString: { errorMessage: "Sarlavha string bo'lishi kerak!" }, notEmpty: { errorMessage: "Sarlavha talab qilinadi!" } },
    en_title: { isString: { errorMessage: "Sarlavha string bo'lishi kerak!" }, notEmpty: { errorMessage: "Sarlavha talab qilinadi!" } },

    uz_description: { isString: { errorMessage: "Tavsif string bo'lishi kerak!" }, notEmpty: { errorMessage: "Tavsif talab qilinadi!" }, isLength: { options: { min: 25, max: 250 }, errorMessage: "Tavsif kamida 25 ta belgidan iborat bo'lishi kerak!" }, },

    ru_description: { isString: { errorMessage: "Tavsif string bo'lishi kerak!" }, notEmpty: { errorMessage: "Tavsif talab qilinadi!" }, isLength: { options: { min: 25, max: 250 }, errorMessage: "Tavsif kamida 25 ta belgidan iborat bo'lishi kerak!" }, },

    en_description: { isString: { errorMessage: "Tavsif string bo'lishi kerak!" }, notEmpty: { errorMessage: "Tavsif talab qilinadi!" }, isLength: { options: { min: 25, max: 250 }, errorMessage: "Tavsif kamida 25 ta belgidan iborat bo'lishi kerak!" }, }
}

exports.updateNewsSchema = {
    uz_title: { isString: { errorMessage: "Sarlavha string bo'lishi kerak!" }, notEmpty: { errorMessage: "Sarlavha talab qilinadi!" } },
    ru_title: { isString: { errorMessage: "Sarlavha string bo'lishi kerak!" }, notEmpty: { errorMessage: "Sarlavha talab qilinadi!" } },
    en_title: { isString: { errorMessage: "Sarlavha string bo'lishi kerak!" }, notEmpty: { errorMessage: "Sarlavha talab qilinadi!" } },

    uz_description: { isString: { errorMessage: "Tavsif string bo'lishi kerak!" }, notEmpty: { errorMessage: "Tavsif talab qilinadi!" }, isLength: { options: { min: 25, max: 250 }, errorMessage: "Tavsif kamida 25 ta belgidan iborat bo'lishi kerak!" }, },

    ru_description: { isString: { errorMessage: "Tavsif string bo'lishi kerak!" }, notEmpty: { errorMessage: "Tavsif talab qilinadi!" }, isLength: { options: { min: 25, max: 250 }, errorMessage: "Tavsif kamida 25 ta belgidan iborat bo'lishi kerak!" }, },
    
    en_description: { isString: { errorMessage: "Tavsif string bo'lishi kerak!" }, notEmpty: { errorMessage: "Tavsif talab qilinadi!" }, isLength: { options: { min: 25, max: 250 }, errorMessage: "Tavsif kamida 25 ta belgidan iborat bo'lishi kerak!" }, }
}