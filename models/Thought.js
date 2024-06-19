const { Schema, model } = require("mongoose");

const thoughtSchema = new Schema(
  {
    thoughtText: { type: String, required: true, maxlength: 280 },
    createdAt: { type: Date, default: Date.now },
    username: { type: String, required: true },
    reactions: [
      {
        type: new Schema(
          {
            reactionBody: { type: String, required: true, maxlength: 280 },
            username: { type: String, required: true },
            createdAt: { type: Date, default: Date.now },
          },
          { timestamps: true }
        ),
      },
    ],
  },
  { toJSON: { virtuals: true }, id: false }
);

thoughtSchema.virtual("reactionCount").get(function () {
  return this.reactions.length;
});

const Thought = model("Thought", thoughtSchema);
module.exports = Thought;
