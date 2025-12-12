import React, { useEffect, useState, useRef } from "react";
import { Helmet } from "react-helmet";

import NavBar from "../components/common/navBar";
import Footer from "../components/common/footer";
import Particles from "../components/common/particles";

import Socials from "../components/about/socials";
import BlurFade from "../components/common/blur-fade";
import VariableProximity from "../components/common/VariableProximity";

import INFO from "../data/user";
import SEO from "../data/seo";
import Dither from "../components/common/Dither";


import "./styles/about.css";

const About = () => {
	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

	const [accentColor, setAccentColor] = useState("#14b8a6");
	const titleRef = useRef(null);
	const subtitleRef = useRef(null);

	useEffect(() => {
		if (typeof window === "undefined") return;
		const rootStyles = getComputedStyle(document.documentElement);
		const linkColor = rootStyles.getPropertyValue("--link-color").trim();
		const secondaryColor = rootStyles.getPropertyValue("--secondary-color").trim();
		if (linkColor) {
			setAccentColor(linkColor);
		} else if (secondaryColor) {
			setAccentColor(secondaryColor);
		}
	}, []);

	const currentSEO = SEO.find((item) => item.page === "about");
	const subtitleProximityProps = {
		containerRef: subtitleRef,
		className: "about-subtitle-proximity",
		fromFontVariationSettings: "'wght' 650, 'opsz' 20",
		toFontVariationSettings: "'wght' 780, 'opsz' 22",
		fontFamily: "'Roboto Flex', 'Roboto', var(--secondary-font)",
		fontWeight: 750,
		radius: 140,
		falloff: "linear"
	};

	return (
		<React.Fragment>
			<Helmet>
				<title>{`About | ${INFO.main.title}`}</title>
				<meta name="description" content={currentSEO.description} />
				<meta
					name="keywords"
					content={currentSEO.keywords.join(", ")}
				/>
			</Helmet>

				<div className="page-content">
					 <Dither
						waveColor={[0.5, 1, 1]}
						disableAnimation={false}
						enableMouseInteraction={true}
						mouseRadius={0.2}
						colorNum={40}
						waveAmplitude={0.2}
						waveFrequency={20}
						waveSpeed={0.03}
					  />
					<NavBar active="about" />
					<div className="content-wrapper">
						<div className="about-container">
							<div className="about-main">
								<div className="about-right-column">
									<div className="about-card about-intro-card">
										<div className="title about-title">
											<BlurFade delay={0.25} inView>
												<div ref={titleRef} style={{ position: "relative" }}>
													<VariableProximity
														label={INFO.about.title}
														className="variable-proximity-demo"
														fromFontVariationSettings="'wght' 800, 'opsz' 24"
														toFontVariationSettings="'wght' 900, 'opsz' 24"
														fontFamily="'Roboto Flex', 'Roboto', var(--secondary-font)"
														fontWeight={900}
														containerRef={titleRef}
														radius={140}
														falloff="linear"
													/>
												</div>
											</BlurFade>
										</div>

										<div className="subtitle about-subtitle" ref={subtitleRef}>
											<BlurFade delay={0.25 * 2} inView>
												<p>
													<VariableProximity
														{...subtitleProximityProps}
														label={INFO.about.description}
													/>
												</p>
											</BlurFade>
										</div>
									</div>

									<div className="about-card about-skills-card">
										<div className="skill">
											<div className="skill-name">
												Programming
											</div>
											<div className="skill-bar">
												<div
													className="skill-per"
													style={{ maxWidth: "90%" }}
													per="90%"
												></div>
											</div>
										</div>

										<div className="skill">
											<div className="skill-name">WebDev</div>
											<div className="skill-bar">
												<div
													className="skill-per"
													style={{ maxWidth: "60%" }}
													per="60%"
												></div>
											</div>
										</div>
										<div className="skill">
											<div className="skill-name">AI/ML</div>
											<div className="skill-bar">
												<div
													className="skill-per"
													style={{ maxWidth: "80%" }}
													per="80%"
												></div>
											</div>
										</div>
										<div className="skill">
											<div className="skill-name">Research</div>
											<div className="skill-bar">
												<div
													className="skill-per"
													style={{ maxWidth: "70%" }}
													per="70%"
												></div>
											</div>
										</div>
									</div>
								</div>

								<div className="about-card about-left-side">
									<div className="about-image-container">
										<div className="about-image-wrapper">
											<BlurFade delay={0.25} inView yOffset={0}>
												<img
													src="/portfolio/about.jpg"
													alt="about portrait"
													className="about-image"
												/>
											</BlurFade>
										</div>
									</div>

									<BlurFade delay={0.25 * 3} inView>
										<div className="about-socials">
											<Socials />
										</div>
									</BlurFade>
								</div>
							</div>
						</div>
						<BlurFade delay={0.25} inView>
							<div className="page-footer">
								<Footer />
							</div>
					</BlurFade>
				</div>
			</div>
		</React.Fragment>
	);
};

export default About;
