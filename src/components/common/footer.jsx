import React from "react";
import { Link } from "react-router-dom";

import "./styles/footer.css";

const Footer = () => {
	return (
		<React.Fragment>
			<div className="footer">
				<div className="footer-links">
				<ul className="footer-nav-link-list">
					<li className="footer-nav-link-item">
						<Link to="/portfolio/home">Home</Link>
					</li>
						<li className="footer-nav-link-item">
							<Link to="/portfolio/about">About</Link>
						</li>
						<li className="footer-nav-link-item">
							<Link to="/portfolio/projects">Projects</Link>
						</li>
						<li className="footer-nav-link-item">
							<Link to="/portfolio/articles">Articles</Link>
						</li>
						<li className="footer-nav-link-item">
							<Link to="/portfolio/contact">Contact</Link>
						</li>
					</ul>
				</div>

				<div className="footer-credits">
					<div className="footer-credits-text">
						© 2024 Jeffin Joffy. All Rights Reserved.
					</div>
				</div>
			</div>
		</React.Fragment>
	);
};

export default Footer;
