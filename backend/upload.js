const mongoose= require("mongoose");

const UploadDetailsSchema= new mongoose.Schema(
    {
        
        student_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'StudentInfo',
      
          },
        question:{
            type:String,
        },
        answer: {
            type:String,
            
        },
  
      
    },
    {
        collection:"UploadInfo",
    }
);

mongoose.model("UploadInfo" , UploadDetailsSchema);