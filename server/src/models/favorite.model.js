import mongoose, { Schema } from "mongoose";

export default mongoose.model(
  "Favorite",
  mongoose.Schema(
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
      mediaType: {
        type: String,
        enum: ["tv", "movie"],
        required: true,
      },
      mediaId: {
        type: String,
        required: true,
        unique: true,
      },
      mediaTitle: {
        type: String,
        required: true,
      },
      mediaPoster: {
        type: String,
        required: true,
      },
      mediaRate: {
        type: Number,
        required: true,
      },
    },
    //model options
    {
      toJSON: {
        virtuals: true,
        transform: (_, obj) => {
          delete obj._id;
          return obj;
        },
      },
      toObject: {
        virtuals: true,
        transform: (_, obj) => {
          delete obj._id;
          return obj;
        },
      },
      versionKey: false,
      timestamps: true,
    }
  )
);
