import mongoose from 'mongoose';
import bcrypt from "bcrypt";


const SALT_ROUNDS = 8;
const usersSchema = new mongoose.Schema({
    username: {
        type: String,
        minLength: 3,
        maxLength: 20
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        minLength: 8,
        maxLength: 50,
        required: true
    },
    age: {
        type: Number,
        min: 18,
        max: 200
    },
    admin: {
        type: Boolean,
        default: false
    },
    department: {
        type: String,
        enum: ["IT", "UX", "DEV", "HR"]
    },
}, {
    timestamps: true,
    toJSON: {
        transform: function(doc, retDoc) {
            delete retDoc.password;//removes password from the json doc
            return retDoc;
        }
    }
});

usersSchema.index({email: 1});
usersSchema.index({username: 1});


usersSchema.pre("save", async function(next) {
    //if the password has not change continue
    if(!this.isModified("password")) return next();

    this.password = await bcrypt.hash(this.password, SALT_ROUNDS);
    return next();
})


//usersSchema.index({email: 1})  This allows to search more quickly in acsending order
export default mongoose.model('User', usersSchema);