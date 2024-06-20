const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    username: { type: String, unique: true, required: true, trim: true },
    email: {
      type: String,
      required: true,
      unique: true,
      validate: {
        validator: function (v) {
          return /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/.test(v);
        },
        message: (props) => `${props.value} is not a valid email address!`,
      },
    },
    thoughts: [
      {
        type: Schema.Types.ObjectId,
        ref: "Thought", // Ensure the reference matches the model name
      },
    ],
    friends: [
      {
        type: Schema.Types.ObjectId,
        ref: "User", // Ensure the reference matches the model name
      },
    ],
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);

userSchema.virtual("friendCount").get(function () {
  return this.friends.length;
});

const User = model("User", userSchema);

module.exports = User;
