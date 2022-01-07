import mongoose from 'mongoose'

const PostSchema = new mongoose.Schema({
   userId:{
       type: String,
       required: true
   },
   desc:{
       type: String,
       max:500
   },
   username:{
       type: String,
   },
   img:{
    type: String,
    required: true
    },
   likes:{
       type: Array,
       default:[]
   },
},

    { timestamps: true });

export default mongoose.model("Post",PostSchema)