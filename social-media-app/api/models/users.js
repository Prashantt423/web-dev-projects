import mongoose from 'mongoose'

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        require: true,
        min: 3,
        max: 20,
        unique: true
    },
    email: {
        type: String,
        require: true,
        max: 50,
        unique: true,

    },
    password: {
        type: String,
        require: true,
        min: 6
    },
    profilePic: {
        type: String,
        default: ""
    },
    coverPic: {
        type: String,
        default: ""
    },
    followers: {
        type: Array,
        default: []

    },
    following: {
        type: Array,
        default: []

    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    desc:{
        type:String,
        max:50,
        default: ""
    },
    from:{
        type:String,
        max:50,
        default: ""
    },
    relationship:{
        type:Number,
        enum:[1,2,3],
        
    },
    posts:{
        type:Array,
        default:[]
    }
},

    { timestamps: true });

export default  mongoose.model("User", UserSchema)