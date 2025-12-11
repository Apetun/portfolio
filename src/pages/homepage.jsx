import React, { useState, useEffect, useRef } from "react";
import { Helmet } from "react-helmet";
import { Link } from 'react-router-dom';

import { faMailBulk } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faTwitter,
	faGithub,
	faInstagram,
	faLinkedin,
} from "@fortawesome/free-brands-svg-icons";

import Logo from "../components/common/logo";
import Footer from "../components/common/footer";
import NavBar from "../components/common/navBar";
import AllProjects from "../components/projects/allProjects";
import BlurFade from "../components/common/blur-fade";
import { Highlighter } from "../components/common/highlighter";
import Dither from "../components/common/Dither";
import DecryptedText from "../components/common/DecryptedText";
import VariableProximity from "../components/common/VariableProximity";

import INFO from "../data/user";
import SEO from "../data/seo";

import "./styles/homepage.css";

const Homepage = () => {
	const [stayLogo, setStayLogo] = useState(false);
	const [logoSize, setLogoSize] = useState(80);
	const [oldLogoSize, setOldLogoSize] = useState(80);
	const [accentColor, setAccentColor] = useState("#14b8a6");
	const titleRef = useRef(null);

	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

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

	useEffect(() => {
		const handleScroll = () => {
			let scroll = Math.round(window.scrollY, 2);

			let newLogoSize = 80 - (scroll * 4) / 10;

			if (newLogoSize < oldLogoSize) {
				if (newLogoSize > 40) {
					setLogoSize(newLogoSize);
					setOldLogoSize(newLogoSize);
					setStayLogo(false);
				} else {
					setStayLogo(true);
				}
			} else {
				setLogoSize(newLogoSize);
				setStayLogo(false);
			}
		};

		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, [logoSize, oldLogoSize]);

	const currentSEO = SEO.find((item) => item.page === "home");

	const logoStyle = {
		display: "flex",
		position: stayLogo ? "fixed" : "relative",
		top: stayLogo ? "3vh" : "auto",
		zIndex: 999,
		border: stayLogo ? "1px solid white" : "none",
		borderRadius: stayLogo ? "2%" : "none",
		boxShadow: stayLogo ? "0px 4px 10px rgba(0, 0, 0, 0.25)" : "none",
	};

	return (
		<React.Fragment>
			<Helmet>
				<title>{INFO.main.title}</title>
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
			
				<NavBar active="home" />
				<div className="content-wrapper">
					<div className="homepage-logo-container">
						<div style={logoStyle}>
							<Logo width={logoSize} link={false} />
						</div>
					</div>

					<div className="homepage-container">
						<BlurFade delay={0.25} inView>
							<div className="homepage-content-card">
								<div className="homepage-first-area">
									<div className="homepage-first-area-left-side">
										<div className="title homepage-title">
											<div ref={titleRef} style={{ position: "relative" }}>
												<VariableProximity
													label={INFO.homepage.title}
													className="variable-proximity-demo"
													fromFontVariationSettings="'wght' 800, 'opsz' 24"
													toFontVariationSettings="'wght' 900, 'opsz' 24"
													// Use the Roboto family feel while enabling variable axes
													fontFamily="'Roboto Flex', 'Roboto', var(--secondary-font)"
													fontWeight={900}
													containerRef={titleRef}
													radius={140}
													falloff="linear"
												/>
											</div>
										</div>

										<div className="subtitle homepage-subtitle">
											<p>
												Welcome to my Website! I am a passionate{" "}
												<Highlighter action="highlight" color="#faf687ff"  animationDuration={1100}>
													AI and ML 
												</Highlighter>{" "}
												academic with a strong foundation in{" "}
												<Highlighter action="underline" color="#01e0c6ff"  animationDuration={1200}>
													Computer Science and Engineering
												</Highlighter>
												. Currently, I am pursuing a degree in Computer Science & Engineering from{" "}
												<Highlighter action="highlight" color="#faf687ff"  animationDuration={1300}>
													Manipal Institute of Technology
												</Highlighter>{" "}
												  and an online{" "}
												<Highlighter action="underline" color="#01e0c6ff"  animationDuration={1400}>
													BS degree in Data Science
												</Highlighter>{" "}
												and Programming from IIT Madras.
											</p>
										</div>
									</div>

									<div className="homepage-first-area-right-side">
													<div className="about-image-container">
									<div className="about-image-wrapper">
										<BlurFade delay={0.25} inView>
												<img
													src="/portfolio/homepage.jpg"
													alt="homepage portrait"
													className="about-image"
												/>
										</BlurFade>
									</div>
								</div>

									</div>
								</div>
								<div className="homepage-socials">
									<div className="social-icons">
										<a
											href={INFO.socials.linkedin}
											target="_blank"
											rel="noreferrer"
										>
											<FontAwesomeIcon
												icon={faLinkedin}
												className="homepage-social-icon"
											/>
										</a>
										<a
											href={INFO.socials.twitter}
											target="_blank"
											rel="noreferrer"
										>
											<FontAwesomeIcon
												icon={faTwitter}
												className="homepage-social-icon"
											/>
										</a>
										<a
											href={INFO.socials.github}
											target="_blank"
											rel="noreferrer"
										>
											<FontAwesomeIcon
												icon={faGithub}
												className="homepage-social-icon"
											/>
										</a>
										<a
											href={INFO.socials.instagram}
											target="_blank"
											rel="noreferrer"
										>
											<FontAwesomeIcon
												icon={faInstagram}
												className="homepage-social-icon"
											/>
										</a>
										<a
											href={`mailto:${INFO.main.email}`}
											target="_blank"
											rel="noreferrer"
										>
											<FontAwesomeIcon
												icon={faMailBulk}
												className="homepage-social-icon"
											/>
										</a>
									</div>
									<Link
										to="/portfolio/resume"
										className="resume-button"
									>
										Resume
									</Link>
								</div>
							</div>
						</BlurFade>
						<BlurFade delay={0.25 * 4} inView>
							<div className="homepage-projects">
								<AllProjects />
							</div>
						</BlurFade>
						<BlurFade delay={0.25} inView>
							<div className="page-footer">
								<Footer />
							</div>
						</BlurFade>
					</div>
				</div>
			</div>
		</React.Fragment>
	);
};

export default Homepage;
