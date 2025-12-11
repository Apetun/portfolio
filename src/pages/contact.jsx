import React, { useEffect, useRef } from "react";
import { Helmet } from "react-helmet";

import NavBar from "../components/common/navBar";
import Footer from "../components/common/footer";

import Socials from "../components/about/socials";

import INFO from "../data/user";
import SEO from "../data/seo";
import VariableProximity from "../components/common/VariableProximity";

import "./styles/contact.css";
import BlurFade from "../components/common/blur-fade";
import Dither from "../components/common/Dither";

const Contact = () => {
	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);
	const titleRef = useRef(null);

	const currentSEO = SEO.find((item) => item.page === "contact");

	return (
		<React.Fragment>
			<Helmet>
				<title>{`Contact | ${INFO.main.title}`}</title>
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
				<NavBar active="contact" />
				<div className="content-wrapper">
						<div className="contact-container">
							<BlurFade duration={0.25} inView>
								<div className="page-card contact-card">
									<div className="title contact-title">
										<div ref={titleRef} style={{ position: "relative" }}>
											<VariableProximity
												label={"<Let's Get in Touch: Ways to Connect with Me/>"}
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
									</div>
									<div className="subtitle contact-subtitle">
										for your interest in getting in touch
										with me. I welcome your feedback, questions, and
										suggestions. If you have a specific question or
										comment, please feel free to email me directly
										at &nbsp;{""}
										<a href={`mailto:${INFO.main.email}`}>
											{INFO.main.email}
										</a>
										. I make an effort to respond to all messages
										within 24 hours, although it may take me longer
										during busy periods. Finally, if you prefer to
										connect on social media, you can find me on{" "}
										<a
											href={INFO.socials.linkedin}
											target="_blank"
											rel="noreferrer"
										>
											{"linkedin"}
										</a>
										. Thanks again for your interest, and I look
										forward to hearing from you!
									</div>
								</div>
							</BlurFade>
					</div>
					<BlurFade inView duration={0.25*3}> 
					<div className="socials-container">
						<div className="contact-socials">
							<Socials />
						</div>
					</div></BlurFade>
					<BlurFade inView duration={0.25}>
					<div className="page-footer">
						<Footer />
					</div>
					</BlurFade>
				</div>
			</div>
		</React.Fragment>
	);
};

export default Contact;
