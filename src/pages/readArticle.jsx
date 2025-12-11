import React, { useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Helmet } from "react-helmet";
import styled from "styled-components";

import NavBar from "../components/common/navBar";
import Footer from "../components/common/footer";
import VariableProximity from "../components/common/VariableProximity";


import INFO from "../data/user";
import myArticles from "../data/articles";

import "./styles/readArticle.css";

let ArticleStyle = styled.div``;

const ReadArticle = () => {
	const navigate = useNavigate();
	let { slug } = useParams();
	const titleRef = useRef(null);

	const article = myArticles[slug - 1];

	useEffect(() => {
		window.scrollTo(0, 0);
	}, [article]);

	ArticleStyle = styled.div`
		${article().style}
	`;

	return (
		<React.Fragment>
			<Helmet>
				<title>{`${article().title} | ${INFO.main.title}`}</title>
				<meta name="description" content={article().description} />
				<meta name="keywords" content={article().keywords.join(", ")} />
			</Helmet>

			<div className="page-content">
				<NavBar />

				<div className="content-wrapper">


					<div className="read-article-container">
						<div className="read-article-back">
							<img
								src="../back-button.png"
								alt="back"
								className="read-article-back-button"
								onClick={() => navigate(-1)}
							/>
						</div>

						<div className="read-article-wrapper">
							<div className="read-article-date-container">
								<div className="read-article-date">
									{article().date}
								</div>
							</div>

							<div className="title read-article-title">
								<div ref={titleRef} style={{ position: "relative" }}>
									<VariableProximity
										label={article().title}
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

							<div className="read-article-body">
								<ArticleStyle>{article().body}</ArticleStyle>
							</div>
						</div>
					</div>
					<div className="page-footer">
						<Footer />
					</div>
				</div>
			</div>
		</React.Fragment>
	);
};

export default ReadArticle;
