exports.getAnalysisSchema = {
    code: {
        isString: {
            errorMessage: "Kod string bo'lishi kerak!"
        },
        notEmpty: {
            errorMessage: "Kod talab qilinadi!"
        } 
    }
}