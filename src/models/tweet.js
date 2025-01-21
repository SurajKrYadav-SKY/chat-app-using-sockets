const mongoose = require("mongoose");

const tweetSchema = new mongoose.Schema(
  {
    content: {
      type: String,
      required: true,
    },
    userEmail: {
      type: String,
    },
    comments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment",
      },
    ],
  },
  { timestamps: true }
);

//virtual concept

tweetSchema.virtual("contentWithEmail").get(function process() {
  return `${this.content} \nis created by : ${this.userEmail}`;
});

// using middleware

tweetSchema.pre("save", function (next) {
  console.log("Inside a hook");
  this.content = this.content + "....";
  next();
});

// after creating the schema (that will give the structure of the json document that we are going to have) and now will will create the model

const Tweet = mongoose.model("Tweet", tweetSchema);

// schema is just the blue print and model is the actual object that will connect to the database and fetch the data or create the data for us

module.exports = Tweet;
