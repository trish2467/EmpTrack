import mongoose from "mongoose";
import { Schema } from "mongoose";

const salarySchema = new Schema({
  employeeId: { type: Schema.Types.ObjectId, ref: 'Employee', required: true },
  basicSalary: { type: Number, required: true },
  allowances: { type: Number },
  deductions: { type: Number },
  netSalary: { type: Number },
  payDate: { type: Date, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

// Automatically update `updatedAt` on save
salarySchema.pre('save', function (next) {
  if (this.isModified()) {
    this.updatedAt = Date.now();
  }
  next();
});

const Salary = mongoose.model('Salary', salarySchema);

export default Salary;
