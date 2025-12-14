import React, { useState, useEffect, useRef } from "react";
import { Helmet } from "react-helmet";
import { useNavigate } from "react-router-dom";

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
import { InteractiveHoverButton } from "../components/common/interactive-hover-button";

import INFO from "../data/user";
import SEO from "../data/seo";

import "./styles/homepage.css";

const Homepage = () => {
	const navigate = useNavigate();
	const [logoSize, setLogoSize] = useState(86);
	const [mergedNav, setMergedNav] = useState(false);
	const [navShouldStick, setNavShouldStick] = useState(true);
	const [navFade, setNavFade] = useState(1);
	const [navWave, setNavWave] = useState(false);
	const [mergeProgress, setMergeProgress] = useState(0);
	const mergeTargetRef = useRef(0);
	const mergeAnimRef = useRef(null);
	const prevMergedRef = useRef(false);
	const [accentColor, setAccentColor] = useState("#14b8a6");
	const titleRef = useRef(null);
	const subtitleRef = useRef(null);
	const navStopRef = useRef(null);
	const eyeTargetRef = useRef(null);
	const [pupilOffset, setPupilOffset] = useState({ x: 0, y: 0 });

	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

	useEffect(() => {
		if (mergedNav && !prevMergedRef.current) {
			setNavWave(true);
			const t = setTimeout(() => setNavWave(false), 700);
			return () => clearTimeout(t);
		}
		prevMergedRef.current = mergedNav;
	}, [mergedNav]);

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
			const scroll = Math.max(0, window.scrollY);
			const targetSize = 86 - Math.min(scroll, 220) * 0.22;
			const clamped = Math.max(48, targetSize);
			setLogoSize(clamped);
			setMergedNav(scroll > 120);
			const start = 0;
			const range = 220;
			mergeTargetRef.current = Math.min(Math.max((scroll - start) / range, 0), 1);
			if (!mergeAnimRef.current) {
				const animateMerge = () => {
					setMergeProgress((prev) => {
						const target = mergeTargetRef.current;
						const next = prev + (target - prev) * 0.14;
						const done = Math.abs(next - target) < 0.002;
						if (!done) {
							mergeAnimRef.current = requestAnimationFrame(animateMerge);
							return next;
						}
						mergeAnimRef.current = null;
						return target;
					});
				};
				mergeAnimRef.current = requestAnimationFrame(animateMerge);
			}

			const stopEl = navStopRef.current;
			if (stopEl) {
				const releaseThreshold = 140;
				const { top } = stopEl.getBoundingClientRect();
				setNavShouldStick(top > releaseThreshold);
				const fadeStart = 220;
				const fadeEnd = 80;
				const fade = Math.min(
					1,
					Math.max(0, (top - fadeEnd) / Math.max(1, fadeStart - fadeEnd))
				);
				setNavFade(fade);
			}
		};

		handleScroll();

		window.addEventListener("scroll", handleScroll, { passive: true });
		return () => {
			window.removeEventListener("scroll", handleScroll);
			if (mergeAnimRef.current) {
				cancelAnimationFrame(mergeAnimRef.current);
				mergeAnimRef.current = null;
			}
		};
	}, []);

	useEffect(() => {
		const handleMouseMove = (event) => {
			const container = eyeTargetRef.current?.getBoundingClientRect();
			if (!container) return;

			const centerX = container.left + container.width / 2;
			const centerY = container.top + container.height / 2;
			const dx = event.clientX - centerX;
			const dy = event.clientY - centerY;
			const maxOffset = 8;
			const clamp = (value) => Math.max(Math.min(value, maxOffset), -maxOffset);
			setPupilOffset({ x: clamp(dx / 60), y: clamp(dy / 191) });
		};

		const handleMouseLeaveWindow = (event) => {
			if (!event.relatedTarget) {
				setPupilOffset({ x: 0, y: 0 });
			}
		};

		window.addEventListener("mousemove", handleMouseMove);
		window.addEventListener("mouseout", handleMouseLeaveWindow);

		return () => {
			window.removeEventListener("mousemove", handleMouseMove);
			window.removeEventListener("mouseout", handleMouseLeaveWindow);
		};
	}, []);

	const currentSEO = SEO.find((item) => item.page === "home");
	const inlineLogoSize = Math.max(52, Math.round(logoSize * 0.8));
	const subtitleProximityProps = {
		containerRef: subtitleRef,
		className: "homepage-subtitle-proximity",
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

				<div className="content-wrapper">
					<div
						className={`home-top-row${navShouldStick ? " is-sticky" : ""}${mergedNav ? " is-merged" : ""}`}
						style={{ "--merge-progress": mergeProgress, "--nav-fade": navFade }}
					>
						<div
							className={`home-logo-standalone${mergedNav ? " is-merged" : ""}`}
							style={{ width: `${logoSize}px`, height: `${logoSize}px` }}
							aria-hidden={mergedNav}
						>
							<Logo width={logoSize} link={false} />
						</div>
						<div className={`home-nav-wrapper${mergedNav ? " merged" : ""}${navWave ? " wave" : ""}`}>
							{mergedNav && (
								<div
									className="home-nav-inline-logo"
									style={{
										width: `${inlineLogoSize}px`,
										height: `${inlineLogoSize}px`,
										"--inline-logo-size": `${inlineLogoSize}px`,
									}}
								>
									<Logo width={inlineLogoSize} link={false} />
								</div>
							)}
							<NavBar
								active="home"
								inline
								showLogo={false}
								navHeight={mergedNav ? 60 : undefined}
							/>
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

										<div className="subtitle homepage-subtitle" ref={subtitleRef}>
											<p>
												<VariableProximity
													{...subtitleProximityProps}
													label="Welcome to my Website! I am a passionate"
												/>{" "}
												<Highlighter action="highlight" color="#faf687ff"  animationDuration={1100}>
													<VariableProximity
														{...subtitleProximityProps}
														label="AI and ML"
													/>
												</Highlighter>{" "}
												<VariableProximity
													{...subtitleProximityProps}
													label="academic with a strong foundation in"
												/>{" "}
												<Highlighter action="underline" color="#01e0c6ff"  animationDuration={1200}>
													<VariableProximity
														{...subtitleProximityProps}
														label="Computer Science and Engineering"
													/>
												</Highlighter>
												<VariableProximity
													{...subtitleProximityProps}
													label="."
												/>{" "}
												<VariableProximity
													{...subtitleProximityProps}
													label="Currently, I am pursuing a degree in Computer Science & Engineering from"
												/>{" "}
												<Highlighter action="highlight" color="#faf687ff"  animationDuration={1300}>
													<VariableProximity
														{...subtitleProximityProps}
														label="Manipal Institute of Technology"
													/>
												</Highlighter>{" "}
												<VariableProximity
													{...subtitleProximityProps}
													label="and an online"
												/>{" "}
												<Highlighter action="underline" color="#01e0c6ff"  animationDuration={1400}>
													<VariableProximity
														{...subtitleProximityProps}
														label="BS degree in Data Science"
													/>
												</Highlighter>{" "}
												<VariableProximity
													{...subtitleProximityProps}
													label="and Programming from IIT Madras."
												/>
											</p>
										</div>
									</div>

									<div className="homepage-first-area-right-side">
										<div className="about-image-container">
											<div
												className="about-image-wrapper"
												style={{ position: "relative" }}
												ref={eyeTargetRef}
											>
												<BlurFade delay={0.25} inView yOffset={0}>
													<img
														src="/portfolio/homepage.jpg"
														alt="homepage portrait"
														className="about-image"
													/>
												</BlurFade>
												<div
													className="homepage-pupil"
													style={{
														left: "32%",
														top: "43.8%",
														transform: `translate(calc(-50% + ${pupilOffset.x}px), calc(-50% + ${pupilOffset.y}px))`
													}}
												/>
												<div
													className="homepage-pupil"
													style={{
														left: "48.7%",
														top: "44.1%",
														transform: `translate(calc(-50% + ${pupilOffset.x}px), calc(-50% + ${pupilOffset.y}px))`
													}}
												/>
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
									<InteractiveHoverButton
										className="resume-button"
										onClick={() => navigate("/portfolio/resume")}
									>
										Resume
									</InteractiveHoverButton>
								</div>
							</div>
						</BlurFade>
					</div>

					<div ref={navStopRef} className="nav-stop-sentinel" aria-hidden="true" />

					<div className="homepage-container">
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
