import { motion } from "framer-motion";
import { intro, mission, TechPhilo, vision } from "../Constants/About.const";

const About = () => {
	return (
		<div className="px-6 py-16 min-h-screen bg-gradient-to-br from-white via-indigo-50 to-purple-100 text-gray-800">
			<div className="max-w-6xl mx-auto space-y-16">
				{/* Heading */}
				<motion.h1
					className="text-4xl md:text-5xl font-bold text-center"
					initial={{ opacity: 0, y: -20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.5 }}
				>
					About Nova Nest
				</motion.h1>

				{/* Introduction */}
				<motion.p
					className="text-lg max-w-3xl mx-auto text-center leading-relaxed text-gray-600"
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ delay: 0.3 }}
				>
					{intro}
				</motion.p>

				{/* Mission & Vision */}
				<motion.div
					className="grid grid-cols-1 md:grid-cols-2 gap-12"
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ delay: 0.5 }}
				>
					<div className="space-y-6">
						<h2 className="text-2xl font-semibold">Our Mission</h2>
						{mission.map((mission) => {
							return (
								<p key={mission} className="text-gray-700">
									{mission}
								</p>
							);
						})}
					</div>

					<div className="space-y-6">
						<h2 className="text-2xl font-semibold">Our Vision</h2>
						{vision.map((vision) => {
							return (
								<p className="text-gray-700" key={vision}>
									{vision}
								</p>
							);
						})}
					</div>
				</motion.div>

				{/* Tech Philosophy */}
				<motion.div
					className="bg-white border border-gray-200 rounded-3xl shadow-lg p-8 md:p-12 space-y-6"
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ delay: 0.7 }}
				>
					<h2 className="text-2xl font-semibold text-center">
						Built for Speed & Scalability
					</h2>
					<p className="text-gray-700 text-center max-w-3xl mx-auto">
						{TechPhilo}
					</p>
				</motion.div>
			</div>
		</div>
	);
};

export default About;
