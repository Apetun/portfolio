import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import ReactGA from "react-ga4";

import Homepage from "./pages/homepage";
import About from "./pages/about";
import Projects from "./pages/projects";
import Articles from "./pages/articles";
import ReadArticle from "./pages/readArticle";
import Contact from "./pages/contact";
import Notfound from "./pages/404";
import Resume from "./pages/resume";
import Terminal from "./pages/terminal";
import ClickSpark from "./components/common/ClickSpark";

import { TRACKING_ID } from "./data/tracking";
import "./app.css";




function App() {
	useEffect(() => {
		if (TRACKING_ID !== "") {
			ReactGA.initialize(TRACKING_ID);
		}
	}, []);

	return (
		<div className="App">
			<ClickSpark sparkColor="var(--link-color)">
				<Routes>
					<Route path="/portfolio/" element={<Terminal />} />
					<Route path="/portfolio/home" element={<Homepage />} />
					<Route path="/portfolio/about" element={<About />} />
					<Route path="/portfolio/projects" element={<Projects />} />
					<Route path="/portfolio/articles" element={<Articles />} />
					<Route path="/portfolio/article/:slug" element={<ReadArticle />} />
					<Route path="/portfolio/contact" element={<Contact />} />
					<Route path="/portfolio/resume" element={<Resume />} />
					<Route path="*" element={<Notfound />} />
				</Routes>
			</ClickSpark>
		</div>
	);
}

export default App;
