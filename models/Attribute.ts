import mongoose, { Model } from 'mongoose';

const AttributeSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true,
    unique: true 
  },
  options: [{ 
    type: String 
  }]
}, { timestamps: true });

const Attribute = (mongoose.models.Attribute || mongoose.model('Attribute', AttributeSchema)) as Model<any>;
export default Attribute;
