import Routers from 'express'
import User from '../models/users.js';
import bcrypt from 'bcrypt'
const router=Routers.Router()
//update a user
router.put("/:id", async (req, res) => {
    if (req.body.userId == req.params.id || req.body.isAdmin) {
        if (req.body.password) {
            try {
                const salt = await bcrypt.genSalt(10);
                req.body.password = await bcrypt.hash(req.body.password, salt);

            } catch (e) {
                return res.status(500).json(e)
            }
        }

        try {
            const user = await User.findByIdAndUpdate(req.params.id, {
                $set: req.body
            });
            res.status(200).json("Successfully updated!")
        } catch (e) {
            res.status(500).json(e);
        }
    } else {
        return res.status(403).json("You can't update your account!")
    }
})

//Delete a user
router.delete("/:id", async (req, res) => {
    if (req.body.userId == req.params.id || req.body.isAdmin) {
        try {
            const user = await User.findByIdAndDelete(req.params.id);
            res.status(200).json("Successfully Deleted!")
        } catch (e) {
            res.status(500).json(e);
        }
    } else {
        return res.status(403).json("You can delete only your account!")
    }
})

//GET user
router.get("/:id", async (req, res) => {
    try {
        const user = await User.findById(req.params.id);

        //  destructuring neccessary data 
        const { updatedAt, password, ...others } = user._doc
        res.status(200).json(others)

    } catch (e) {
        res.status(500).json(e);
    }
})


//  follow a User
router.put("/:id/follow", async (req, res) => {
    if (req.body.userId !== req.params.id) {
        try {
            const user = await User.findById(req.body.userId);
            const curUser = await User.findById(req.params.id)
            if (user) {

                try {
                    if (!user.followers.includes(req.params.id) && !curUser.following.includes(req.body.userId)) {
                        await User.findByIdAndUpdate(req.params.id, {
                            $push: { following: req.body.userId }
                        });


                        await User.findByIdAndUpdate(req.body.userId, {
                            $push: { followers: req.params.id }
                        });

                        res.status(200).json("Followed successfully!");
                    } else {
                        res.status(403).json("Bad Request");
                    }


                } catch (e) {
                    res.status(500).json(e)
                }
            } else {
                res.status(403).json("User not found")
            }
        } catch (e) {
            res.status(500).json(e)
        }
    } else {
        res.status(403).json("You can't follow yourself")
    }
})
//  Unfollow a User
router.put("/:id/unfollow", async (req, res) => {
    if (req.body.userId !== req.params.id) {
        try {
            const user = await User.findById(req.body.userId);
            const curUser = await User.findById(req.params.id)
            if (user) {

                try {
                    if (user.followers.includes(req.params.id) && curUser.following.includes(req.body.userId)) {
                        await User.findByIdAndUpdate(req.params.id, {
                            $pull: { following: req.body.userId }
                        });


                        await User.findByIdAndUpdate(req.body.userId, {
                            $pull: { followers: req.params.id }
                        });

                        res.status(200).json("Unfollowed successfully!");
                    } else {
                        res.status(403).json("Bad Request");
                    }


                } catch (e) {
                    res.status(500).json(e)
                }
            } else {
                res.status(403).json("User not found")
            }
        } catch (e) {
            res.status(500).json(e)
        }
    } else {
        res.status(403).json("You can't unfollow yourself")
    }
})

export default router;