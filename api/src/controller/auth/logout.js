exports.logout = (req, res) => {
  try {
    res.clearCooies("authcookie");
    res.clearCooies("token");

    return res.redirect("/login");
  } catch (error) {
    console.log(error);
    if (error.message) {
      return res.status(400).send({
        error: error.message,
      });
    }
    return res.status(500).send({
      error: "Internal server error!",
    });
  }
};
