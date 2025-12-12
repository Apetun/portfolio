import React, { useEffect, useRef } from "react";
import { Helmet } from "react-helmet";

import NavBar from "../components/common/navBar";
import Footer from "../components/common/footer";

import Article from "../components/articles/article";
import BlurFade from "../components/common/blur-fade";
import VariableProximity from "../components/common/VariableProximity";

import INFO from "../data/user";
import SEO from "../data/seo";
import myArticles from "../data/articles";
import Dither from "../components/common/Dither";

import "./styles/articles.css";

const Articles = () => {
	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

	const titleRef = useRef(null);
	const subtitleRef = useRef(null);

	const currentSEO = SEO.find((item) => item.page === "articles");
	const subtitleProximityProps = {
		containerRef: subtitleRef,
		className: "articles-subtitle-proximity",
		fromFontVariationSettings: "'wght' 650, 'opsz' 20",
		toFontVariationSettings: "'wght' 780, 'opsz' 22",
		fontFamily: "'Roboto Flex', 'Roboto', var(--secondary-font)",
		fontWeight: 750,
		radius: 140,
		falloff: "linear",
	};

	return (
		<React.Fragment>
			<Helmet>
				<title>{`Articles | ${INFO.main.title}`}</title>
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
				<NavBar active="articles" />
				<div className="content-wrapper">
						<div className="articles-main-container">
							<BlurFade inView duration={0.25}>
								<div className="page-card articles-card">
									<div className="title articles-title">
										<div ref={titleRef} style={{ position: "relative" }}>
											<VariableProximity
												label={INFO.articles.title}
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
									<div className="subtitle articles-subtitle" ref={subtitleRef}>
										<BlurFade inView duration={0.25 * 2}>
											<p>
												<VariableProximity
													{...subtitleProximityProps}
													label={INFO.articles.description}
												/>
											</p>
										</BlurFade>
									</div>
								</div>
							</BlurFade>
							<BlurFade inView duration={0.25 * 3}>
								<div className="articles-container">
									<div className="articles-wrapper">
										{myArticles.map((article, index) => (
										<div
											className="articles-article"
											key={(index + 1).toString()}
										>
											<Article
												key={(index + 1).toString()}
												date={article().date}
												title={article().title}
												description={
													article().description
												}
												link={"/portfolio/article/" + (index + 1)}
											/>
										</div>
									))}
								</div>
							</div>
						</BlurFade>
					</div>
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

export default Articles;
