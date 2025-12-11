import React, { useEffect, useRef } from "react";
import { Helmet } from "react-helmet";

import NavBar from "../components/common/navBar";
import Footer from "../components/common/footer";
import AllProjects from "../components/projects/allProjects";

import INFO from "../data/user";
import SEO from "../data/seo";
import Dither from "../components/common/Dither";
import VariableProximity from "../components/common/VariableProximity";

import "./styles/projects.css";
import BlurFade from "../components/common/blur-fade";

const Projects = () => {
	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

	const titleRef = useRef(null);

	const currentSEO = SEO.find((item) => item.page === "projects");

	return (
		<React.Fragment>
			<Helmet>
				<title>{`Projects | ${INFO.main.title}`}</title>
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
				<NavBar active="projects" />
				<div className="content-wrapper">
						<div className="projects-container">
							<BlurFade duration={0.25} inView>
								<div className="page-card projects-card">
									<div className="title projects-title">
										<div ref={titleRef} style={{ position: "relative" }}>
											<VariableProximity
												label="<Things I’ve made trying to put my dent in the universe./>"
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
									<div className="subtitle projects-subtitle">
										I've worked on a variety of projects over the
										years and I'm proud of the progress I've made.
										Many of these projects are open-source and
										available for others to explore and contribute
										to. If you're interested in any of the projects
										I've worked on, please feel free to check out
										the code and suggest any improvements or
										enhancements you might have in mind.
										Collaborating with others is a great way to
										learn and grow, and I'm always open to new ideas
										and feedback.
									</div>
								</div>
							</BlurFade>
							<BlurFade duration={0.25 * 3} inView>
							<div className="projects-list">
								<AllProjects />
							</div>
						</BlurFade>
					</div>
					<BlurFade duration={0.25 * 3} inView>
						<div className="page-footer">
							<Footer />
						</div>
					</BlurFade>
				</div>
			</div>
		</React.Fragment>
	);
};

export default Projects;
