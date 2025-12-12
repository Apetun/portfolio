import React, { useMemo } from "react";
import { useLocation } from "react-router-dom";

import INFO from "../../data/user";
import NAV_ITEMS from "../../data/navItems";
import PillNav from "./PillNav";

import "./styles/navBar.css";

const PILL_NAV_ITEMS = NAV_ITEMS.map(({ label, href, ariaLabel }) => ({
	label,
	href,
	ariaLabel,
}));

const NavBar = (props) => {
	const {
		active,
		showLogo = false,
		inline = false,
		navHeight,
	} = props;
	const location = useLocation();

	const activeHref = useMemo(() => {
		if (active) {
			const fromProp = NAV_ITEMS.find((item) => item.id === active);
			if (fromProp) {
				return fromProp.href;
			}
		}

		if (location.pathname.startsWith("/portfolio/article/")) {
			return "/portfolio/articles";
		}

		const match = NAV_ITEMS.find((item) =>
			location.pathname.startsWith(item.href)
		);

		return match?.href;
	}, [active, location.pathname]);

	const navStyles = navHeight
		? {
				"--nav-h": `${navHeight}px`,
		  }
		: undefined;

	return (
		<div className={`pill-nav-shell${inline ? " inline-nav-shell" : ""}`}>
			<PillNav
				logo={INFO.main.logo}
				logoAlt={INFO.main.title}
				items={PILL_NAV_ITEMS}
				activeHref={activeHref}
				className="site-pill-nav"
				baseColor="#fff"
				pillColor="var(--quaternary-color)"
				pillTextColor="#000"
				hoveredPillTextColor="#fff"
				highlightColor="var(--link-color)"
				showLogo={showLogo}
				style={navStyles}
			/>
		</div>
	);
};

export default NavBar;
