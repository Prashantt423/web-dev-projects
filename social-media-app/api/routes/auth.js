import  Routers from 'express'
import User from  '../models/users.js'
import  bcrypt from  'bcrypt'

const router= Routers.Router();
// REGISTER
router.post('/register', async (req, res) => {

    try {
        // Hashed password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);

        // New user and response
        const newUser =await new User({
            username: req.body.username,
            password: hashedPassword,
            email: req.body.email,
        })
        const user = await newUser.save();
        res.status(200).json(user)
    } catch (err) {
        console.log(err)
    }

    
});

//Login
router.post("/login",async (req,res)=>{
   try{
    const  user = await User.findOne({email:req.body.email});
    !user && res.status(404).json("User not found")
    const validPassword=await bcrypt.compare(req.body.password,user.password)
    !validPassword ? res.status(400).json("wrong password"): res.status(200).json(user)
} catch(e){
    res.status(500).json(e);
   }
})

export default router;