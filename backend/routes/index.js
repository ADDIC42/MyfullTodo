const { Router } = require("express");
const router = Router();

router.use("/todos", require("./todos.route"));
router.use("/users", require("./users.route"));

module.exports = router;
