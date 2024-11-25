exports.getAnalysisSchema = {
    orderNumber: {
        isString: {
            errorMessage: "Kod string bo'lishi kerak!"
        },
        notEmpty: {
            errorMessage: "Kod talab qilinadi!"
        }
    },
    analysiscode: {
        isString: {
            errorMessage: "Kod string bo'lishi kerak!"
        },
        notEmpty: {
            errorMessage: "Kod talab qilinadi!"
        }
    }
}