import React, { useRef, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";

import "./style/article.css";

const Article = (props) => {
	const { date, title, description, link } = props;

	const cardRef = useRef(null);
	const [tilt, setTilt] = useState({ rx: 0, ry: 0, tx: 0, ty: 0 });

	const handleMove = useCallback((e) => {
		const card = cardRef.current;
		if (!card) return;
		const rect = card.getBoundingClientRect();
		const x = e.clientX - rect.left;
		const y = e.clientY - rect.top;
		const pctX = (x / rect.width) * 2 - 1; // -1 .. 1
		const pctY = (y / rect.height) * 2 - 1; // -1 .. 1
		const rotateY = -pctX * 5;
		const rotateX = pctY * 5;
		const translateX = pctX * 4;
		const translateY = pctY * 4;
		setTilt({ rx: rotateX, ry: rotateY, tx: translateX, ty: translateY });
	}, []);

	const handleLeave = useCallback(() => {
		setTilt({ rx: 0, ry: 0, tx: 0, ty: 0 });
	}, []);

	return (
		<React.Fragment>
			<div className="article">
				<div
					className="article-card"
					ref={cardRef}
					onMouseMove={handleMove}
					onMouseLeave={handleLeave}
					style={{
						transform: `perspective(1000px) rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg) translateX(${tilt.tx}px) translateY(${tilt.ty}px)`,
						boxShadow: `0 12px 32px rgba(0, 0, 0, 0.12)`,
					}}
				>
					<div className="article-left-side">
						<div className="article-date">{date}</div>
					</div>

					<Link to={link}>
						<div className="article-right-side">
							<div className="article-title">{title}</div>
							<div className="article-description">{description}</div>
							<div className="article-link">
								Read Article{" "}
								<FontAwesomeIcon
									style={{ fontSize: "10px" }}
									icon={faChevronRight}
								/>
							</div>
						</div>
					</Link>
				</div>
			</div>
		</React.Fragment>
	);
};

export default Article;
