import { Schema, model, models, type InferSchemaType } from "mongoose";

const workSchema = new Schema({
  title: { type: String, required: true, trim: true },
  description: { type: String, default: "" },
  imageUrl: { type: String, required: true },
  imagePublicId: { type: String, default: "" },
  category: { type: String, required: true, trim: true },
  year: { type: String, required: true },
  featured: { type: Boolean, default: false },
  showOnHome: { type: Boolean, default: false },
  published: { type: Boolean, default: true },
  displayOrder: { type: Number, default: 0 },
}, { timestamps: true });

export type WorkDocument = InferSchemaType<typeof workSchema>;
export const WorkModel = models.Work || model("Work", workSchema);
