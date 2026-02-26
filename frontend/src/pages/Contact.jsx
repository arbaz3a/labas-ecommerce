import React, { useState } from "react";

function Contact() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const validate = () => {
    let newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Please enter your name";
    if (!formData.email.trim()) newErrors.email = "Please enter your email";
    if (!formData.message.trim()) newErrors.message = "Please enter your message";
    return newErrors;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) { setErrors(validationErrors); return; }
    setSubmitted(true);
    setFormData({ name: "", email: "", message: "" });
    setErrors({});
  };

  return (
    <div className="page-wrapper py-16">
      <h1 className="text-2xl md:text-3xl font-semibold tracking-widest text-center mb-10 text-black">
        CONTACT US
      </h1>

      {submitted && (
        <div className="max-w-4xl mx-auto mb-6 bg-green-50 text-green-700 text-center py-3 rounded-md text-sm">
          Thanks for contacting us. We'll get back to you as soon as possible.
        </div>
      )}

      <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-10 bg-white p-8 rounded-xl border border-gray-100 shadow-sm">
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block mb-1 text-sm font-medium">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={`w-full rounded-md px-3 py-2 text-sm focus:outline-none border ${errors.name ? "border-red-500 focus:border-red-500" : "border-gray-300 focus:border-black"
                }`}
            />
            {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`w-full rounded-md px-3 py-2 text-sm focus:outline-none border ${errors.email ? "border-red-500 focus:border-red-500" : "border-gray-300 focus:border-black"
                }`}
            />
            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium">Message</label>
            <textarea
              name="message"
              rows="4"
              value={formData.message}
              onChange={handleChange}
              className={`w-full rounded-md px-3 py-2 text-sm focus:outline-none resize-none border ${errors.message ? "border-red-500 focus:border-red-500" : "border-gray-300 focus:border-black"
                }`}
            ></textarea>
            {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message}</p>}
          </div>

          <button type="submit" className="bg-black cursor-pointer text-white text-sm px-6 py-2 rounded-md hover:bg-gray-800 transition">
            Send
          </button>
        </form>

        <div className="flex flex-col justify-center space-y-5">
          <h2 className="text-xl font-medium">Let's Start a Conversation</h2>
          <p className="text-gray-600 text-sm leading-relaxed">
            Whether you have a question about your order, our products, or anything else, our team is here to help.
          </p>
          <p className="text-gray-600 text-sm leading-relaxed">
            Your feedback matters to us. Don't hesitate to reach out, we're always happy to connect.
          </p>
          <div className="pt-4 border-t">
            <p className="text-sm text-gray-600">
              Email: <span className="font-medium ml-1">contact@labas.pk</span>
            </p>
            <p className="text-xs text-gray-500 mt-1">Typically replies within 24 hours</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;
