import * as yup from "yup";
import { ClientFileFormData } from "../types/clientFileTypes";

// Assessment form validation schema
export const assessmentValidationSchema = yup.object({
  name: yup.string().required("Name is required").min(2, "Name must be at least 2 characters"),
  gender: yup.string().required("Gender is required").oneOf(["male", "female"], "Invalid gender"),
  dateOfBirth: yup.string().required("Date of birth is required"),
  weight: yup.string().required("Weight is required").test("is-number", "Weight must be a valid number", (value) => {
    if (!value) return false;
    const num = parseFloat(value);
    return !isNaN(num) && num > 0;
  }),
  height: yup.string().required("Height is required").test("is-number", "Height must be a valid number", (value) => {
    if (!value) return false;
    const num = parseFloat(value);
    return !isNaN(num) && num > 0;
  }),
  weightTypeSelection: yup.string().optional(),
  physicalActivity: yup.string().required("Physical activity level is required"),
  wardType: yup.string().required("Ward type is required"),
  stressFactor: yup.string().required("Stress factor is required"),
  feedingType: yup.string().required("Feeding type is required"),
});

// Biochemical form validation schema
export const biochemicalValidationSchema = yup.object({
  labResults: yup.array().of(
    yup.object({
      test_name: yup.string().required("Test name is required"),
      result: yup.string().required("Result is required"),
      reference_range: yup.string().nullable().optional(),
      interpretation: yup.string().nullable().optional(),
      file: yup.mixed().nullable().optional(),
      date: yup.string().required("Date is required"),
    })
  ),
});

// Medication form validation schema
export const medicationValidationSchema = yup.object({
  medications: yup.array().of(
    yup.object({
      name: yup.string().required("Medication name is required"),
      dosage: yup.string().required("Dosage is required"),
      notes: yup.string().optional(),
    })
  ),
});

// Meal plan form validation schema
export const mealPlanValidationSchema = yup.object({
  notes: yup.string().optional(),
});

// Complete client file validation schema
export const clientFileValidationSchema = yup.object({
  assessment: assessmentValidationSchema,
  biochemical: biochemicalValidationSchema,
  medication: medicationValidationSchema,
  mealPlan: mealPlanValidationSchema,
});

// Helper function to validate individual forms
export const validateForm = async (schema: yup.ObjectSchema<any>, data: any) => {
  try {
    await schema.validate(data, { abortEarly: false });
    return { isValid: true, errors: {} };
  } catch (error) {
    if (error instanceof yup.ValidationError) {
      const errors: Record<string, string> = {};
      error.inner.forEach((err) => {
        if (err.path) {
          errors[err.path] = err.message;
        }
      });
      return { isValid: false, errors };
    }
    return { isValid: false, errors: { general: "Validation failed" } };
  }
};

