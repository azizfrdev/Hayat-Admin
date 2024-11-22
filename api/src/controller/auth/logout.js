exports.logout = (req, res) => {
  try {
    res.clearCookie("authcookie");

    return res.status(200).send({
      message: "Logout muvvaffaqiyatli amalga oshirildi!"
    })
  } catch (error) {
    console.log(error);
    if (error.message) {
      return res.status(400).send({
        error: error.message,
      });
    }
    return res.status(500).send({
      error: "Serverda xatolik!",
    });
  }
};
