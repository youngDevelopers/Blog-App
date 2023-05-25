import mongoose from "mongoose";

const Schema = mongoose.Schema;

const userSchema = new Schema( //Fields for the User Model
    {
        name: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String,
            required: true,
            minlength: 6
        },
        blogs: [{//list of blogs that are defined by that user 
            type: mongoose.Types.ObjectId,
            ref: "Blog",
            required: true,
        }]
    }
);

export default mongoose.model("User", userSchema);