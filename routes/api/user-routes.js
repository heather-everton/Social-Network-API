const router = require('express').Router();
const {
    createUser,
    getAllUsers,
    getUserById,
    updateUser,
    deleteUser,
    addFriend,
    deleteFriend
} = require('../../controllers/user-controller');

router
    .route('/')
    .get(getAllUsers)
    .post(createUser);

router
    .route('/:id')
    .get(getUserById)
    .put(updateUser)
    .delete(deleteUser)

// Set up POST and DELETE at /api/users/:id/friends/:id
router
    .route("/:userId/friends/:friendId")
    .post(addFriend)
    .delete(deleteFriend);
module.exports = router;