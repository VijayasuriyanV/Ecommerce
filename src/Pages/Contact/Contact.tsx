import { useRef } from "react";
import emailjs from "@emailjs/browser";
import { toast } from "react-toastify";
import {
	FaPhone,
	FaMapMarkerAlt,
	FaEnvelope,
	FaLinkedin,
	FaGithub,
	FaInstagram,
} from "react-icons/fa";

const Contact = () => {
	const formRef = useRef<HTMLFormElement>(null);

	const sendEmail = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (!formRef.current) return;

		emailjs
			.sendForm(
				import.meta.env.VITE_SERVICE_ID,
				import.meta.env.VITE_TEMPLATE_ID,
				formRef.current,
				import.meta.env.VITE_PUBLIC_KEY,
			)
			.then(() => {
				toast.success("Message sent successfully!");
				formRef.current?.reset();
			})
			.catch(() => {
				toast.error("Failed to send message. Try again later.");
			});
	};

	return (
		<div className="min-h-screen bg-gradient-to-br from-white via-indigo-50 to-purple-100 p-6 flex items-center">
			<div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 items-start pb-12">
				{/* Info Panel */}
				<div className="space-y-8">
					<h2 className="text-4xl font-bold text-gray-800">📬 Get in Touch</h2>
					<p className="text-gray-600 text-lg">
						We'd love to hear from you. Reach out with questions, feedback, or
						even just to say hello!
					</p>

					<div className="space-y-4 text-gray-700">
						<div className="flex items-center gap-3">
							<FaMapMarkerAlt className="text-purple-500" />
							<span>Bodinayakanur, Tamil Nadu, India</span>
						</div>
						<div className="flex items-center gap-3">
							<FaPhone className="text-purple-500" />
							<span>+91 98765 43210</span>
						</div>
						<div className="flex items-center gap-3">
							<FaEnvelope className="text-purple-500" />
							<span>contact@novanest.com</span>
						</div>
					</div>

					<div className="flex gap-5 mt-6 text-xl">
						<a
							href="https://linkedin.com"
							target="_blank"
							rel="noopener noreferrer"
							className="text-gray-700 hover:text-purple-600"
						>
							<FaLinkedin />
						</a>
						<a
							href="https://github.com"
							target="_blank"
							rel="noopener noreferrer"
							className="text-gray-700 hover:text-purple-600"
						>
							<FaGithub />
						</a>
						<a
							href="https://instagram.com"
							target="_blank"
							rel="noopener noreferrer"
							className="text-gray-700 hover:text-purple-600"
						>
							<FaInstagram />
						</a>
					</div>

					<p className="text-sm mt-4 text-gray-500">
						Looking for help? Check our{" "}
						<a href="/" className="text-purple-500 underline">
							FAQs
						</a>
					</p>
				</div>

				{/* Contact Form */}
				<div className="bg-white p-8 rounded-3xl shadow-lg border border-gray-100">
					<form ref={formRef} onSubmit={sendEmail} className="space-y-6">
						{/* IMPORTANT: Input name attributes must match template variables */}
						<input
							type="text"
							name="from_name"
							required
							placeholder="Your Name"
							className="w-full bg-gray-100 text-gray-700 px-4 py-4 rounded-xl border border-gray-300 focus:ring-2 focus:ring-purple-400 focus:outline-none"
						/>

						<input
							type="email"
							name="from_email"
							required
							placeholder="Your Email"
							className="w-full bg-gray-100 text-gray-700 px-4 py-4 rounded-xl border border-gray-300 focus:ring-2 focus:ring-purple-400 focus:outline-none"
						/>

						<textarea
							name="message"
							required
							placeholder="Your Message"
							className="w-full h-32 resize-none bg-gray-100 text-gray-700 px-4 py-4 rounded-xl border border-gray-300 focus:ring-2 focus:ring-purple-400 focus:outline-none"
						/>

						<button
							type="submit"
							className="w-full py-4 bg-purple-500 hover:bg-purple-600 text-white text-lg font-semibold rounded-full transition duration-300 shadow-md"
						>
							🚀 Send Message
						</button>
					</form>
				</div>
			</div>
		</div>
	);
};

export default Contact;
