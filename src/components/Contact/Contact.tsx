// Contact.tsx
/**
 * Contact form component with Formspree integration
 * Features:
 * - Form validation (required fields and email format)
 * - Real-time error handling and feedback
 * - Loading states during submission
 * - Success message after successful submission
 * - Responsive layout with controlled input widths
 * 
 * Layout customization:
 * - Name and email inputs: Use max-w-{size} classes below to adjust width
 *   Available sizes: max-w-xs (320px), max-w-sm (384px), max-w-md (448px), max-w-lg (512px)
 * - Message area: Takes full width of container
 * - Submit button: Fixed width with max-w-[200px]
 */

import React, { useState } from "react";
import { useForm } from "@formspree/react";
import { motion } from "framer-motion";
import { useReducedMotion } from "../../hooks/useReducedMotion";

// TypeScript interface for form field types
interface FormData {
  name: string;
  email: string;
  message: string;
}

// Animation Parameters - matches About and Projects sections
const ROTATION_ANGLE = 90;
const SLIDE_DISTANCE = 100;
const ANIMATION_DURATION = 1.8;
const EASE = [0.11, 0, 0.5, 0] as const;

const Contact: React.FC = () => {
  // Replace with your actual Formspree form ID after signing up at formspree.io
  // Initialize Formspree hook with your form ID
  const [formState, handleSubmit] = useForm("xanpeaqb");
  const prefersReducedMotion = useReducedMotion();

  // State for form field values
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    message: ""
  });

  // State for validation errors (partial because not all fields may have errors)
  const [errors, setErrors] = useState<Partial<FormData>>({});

  // Validate all form fields and return true if valid, false if there are errors
  const validateForm = (): boolean => {
    const newErrors: Partial<FormData> = {};
    // Check for empty name field
    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }
    // Check for empty email and valid email format
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }
    // Check for empty message
    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Return true if no errors
  };

  // Handle changes in form inputs and clear any existing errors
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    // Update form data
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error when user starts typing in a field that had an error
    if (errors[name as keyof FormData]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validateForm()) {
      await handleSubmit({
        name: formData.name,
        email: formData.email,
        message: formData.message
      });
    }
  };

  if (formState.succeeded) {
    return (
      <section id="contact" className="contact py-16 px-4 text-gray-100">
        <motion.div
          className="max-w-xl mx-auto text-center"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white drop-shadow-md">
            Thank You!
          </h2>
          <p className="text-gray-300 mb-8">
            Your message has been sent successfully. I'll get back to you soon.
          </p>
        </motion.div>
      </section>
    );
  }

  return (
    <section
      id="contact"
      className="contact py-20 px-4 text-gray-100"
    >
      <div className="max-w-2xl mx-auto" style={{ perspective: "2000px" }}>
        {/* Header */}
        <motion.div
          initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, x: SLIDE_DISTANCE, rotateY: ROTATION_ANGLE }}
          whileInView={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, x: 0, rotateY: 0 }}
          transition={prefersReducedMotion ? { duration: 0 } : { duration: ANIMATION_DURATION, ease: EASE }}
          viewport={{ once: true, margin: "0px" }}
          style={{ transformStyle: "preserve-3d" }}
          className="text-center mb-12 px-4"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white drop-shadow-md text-center">
            Contact Me
          </h2>
          <p className="text-gray-200 leading-relaxed">
            Feel free to reach out to discuss job opportunities, projects, or collaborations.
          </p>
        </motion.div>

        {/* Form Card */}
        <motion.div
          initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, x: SLIDE_DISTANCE, rotateY: ROTATION_ANGLE }}
          whileInView={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, x: 0, rotateY: 0 }}
          transition={prefersReducedMotion ? { duration: 0 } : { duration: ANIMATION_DURATION, ease: EASE, delay: 0.1 }}
          viewport={{ once: true, margin: "0px" }}
          style={{
            transformStyle: "preserve-3d",
            background: 'rgba(255, 255, 255, 0.1)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            boxShadow: '0 4px 16px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
            backdropFilter: 'blur(10px)',
            WebkitBackdropFilter: 'blur(10px)',
            position: 'relative',
            overflow: 'hidden'
          }}
          className="glass-card p-8 rounded-xl max-w-xl mx-auto"
        >
          <span className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-transparent opacity-50 pointer-events-none"></span>
          <form id="contact-form" onSubmit={onSubmit} className="flex flex-col gap-6 items-center relative z-10">
          {/* Name Input - max-w-md (448px) width, 0.75rem (gap-3) error spacing */}
          <div className="flex flex-col gap-3 w-full max-w-md">
            <label htmlFor="contact-name" className="text-sm font-medium text-gray-200">
              Name
            </label>
            <input
              id="contact-name"
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Your Name"
              className={
                "p-3 rounded-lg bg-gray-600 border border-gray-500 text-gray-100 focus:outline-none focus:ring-2 transition-all duration-200 " +
                (errors.name ? "ring-2 ring-red-400 focus:ring-red-400" : "focus:ring-[#32C4C4]")
              }
              aria-invalid={!!errors.name}
              aria-describedby={errors.name ? "name-error" : undefined}
            />
            {errors.name && (
              <span id="name-error" className="text-red-400 text-sm text-left" role="alert">{errors.name}</span>
            )}
          </div>

          {/* Email Input - max-w-md (448px) width, 0.75rem (gap-3) error spacing */}
          <div className="flex flex-col gap-3 w-full max-w-md">
            <label htmlFor="contact-email" className="text-sm font-medium text-gray-200">
              Email
            </label>
            <input
              id="contact-email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="your.email@example.com"
              className={
                "p-3 rounded-lg bg-gray-600 border border-gray-500 text-gray-100 focus:outline-none focus:ring-2 transition-all duration-200 " +
                (errors.email ? "ring-2 ring-red-400 focus:ring-red-400" : "focus:ring-[#32C4C4]")
              }
              aria-invalid={!!errors.email}
              aria-describedby={errors.email ? "email-error" : undefined}
            />
            {errors.email && (
              <span id="email-error" className="text-red-400 text-sm text-left" role="alert">{errors.email}</span>
            )}
          </div>

          {/* Message Textarea - full width, 0.75rem (gap-3) error spacing */}
          <div className="flex flex-col gap-3 w-full">
            <label htmlFor="contact-message" className="text-sm font-medium text-gray-200">
              Message
            </label>
            <textarea
              id="contact-message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Your message here..."
              className={
                "p-3 rounded-lg bg-gray-600 border border-gray-500 text-gray-100 focus:outline-none focus:ring-2 transition-all duration-200 " +
                (errors.message ? "ring-2 ring-red-400 focus:ring-red-400" : "focus:ring-[#32C4C4]")
              }
              rows={5}
              aria-invalid={!!errors.message}
              aria-describedby={errors.message ? "message-error" : undefined}
            />
            {errors.message && (
              <span id="message-error" className="text-red-400 text-sm text-left" role="alert">{errors.message}</span>
            )}
          </div>

          <motion.button
            type="submit"
            disabled={formState.submitting}
            whileHover={!formState.submitting && !prefersReducedMotion ? { scale: 1.05 } : {}}
            whileTap={!formState.submitting && !prefersReducedMotion ? { scale: 0.98 } : {}}
            className={
              "glass-button relative overflow-hidden text-white font-semibold py-3 px-8 rounded-full w-full max-w-[200px] " +
              (formState.submitting ? "opacity-75 cursor-not-allowed" : "")
            }
            style={{
              background: 'rgba(255, 255, 255, 0.1)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              boxShadow: '0 4px 16px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
              backdropFilter: 'blur(10px)',
              WebkitBackdropFilter: 'blur(10px)',
              transition: 'background 0.3s ease, box-shadow 0.3s ease'
            }}
            onMouseEnter={(e) => {
              if (!formState.submitting) {
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)';
                e.currentTarget.style.boxShadow = '0 8px 32px rgba(255, 255, 255, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.3)';
              }
            }}
            onMouseLeave={(e) => {
              if (!formState.submitting) {
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
                e.currentTarget.style.boxShadow = '0 4px 16px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.2)';
              }
            }}
          >
            <span className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-transparent opacity-50 pointer-events-none"></span>
            <span className="relative z-10">
              {formState.submitting ? "Sending..." : "Send Message"}
            </span>
          </motion.button>
        </form>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
