import mongoose, { Schema, Document } from 'mongoose';

interface IApplication extends Document {
    title: string;
    text: string;
    user: string;
}

const ApplicationSchema: Schema = new Schema({
    title: { type: String, required: true },
    text: { type: String, required: true },
    user: { type: String, required: true },
});

const Application = mongoose.model<IApplication>('Application', ApplicationSchema);

export default Application;