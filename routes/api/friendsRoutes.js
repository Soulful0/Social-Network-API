const router = require("express").Router();
const friendController = require("../../controllers/friendController");

// POST add a friend
router.post("/:userId/friends/:friendId", friendController.addFriend);

// DELETE a friend
router.delete("/:userId/friends/:friendId", friendController.removeFriend);

module.exports = router;
