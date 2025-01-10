exports.resultSchema = {
    orderNumber: { isString: { errorMessage: "Tartib raqami formati raqam bo'lishi kerak" }, notEmpty: { errorMessage: 'Tartib raqam talab qilinadi!' } },
    verificationCode: { isString: { errorMessage: "Tastiqilovchi kod string bolishi kerak"}, notEmpty: {errorMessage: 'Tastiqilovchi kod talab qilinadi!'}}
}