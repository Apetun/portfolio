import React, { useCallback, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLink } from "@fortawesome/free-solid-svg-icons";
import { MagicCard } from "../common/magic-card";

import "./styles/project.css";

const Project = (props) => {
    const { logo, title, description, linkText, link } = props;
    const linkRef = useRef(null);
    const containerRef = useRef(null);
    const [isNear, setIsNear] = useState(false);

    const handlePointerMove = useCallback((e) => {
        const container = containerRef.current;
        const linkEl = linkRef.current;
        if (!container || !linkEl) return;
        const lRect = linkEl.getBoundingClientRect();
        const mx = e.clientX;
        const my = e.clientY;
        const lx = lRect.left + lRect.width / 2;
        const ly = lRect.top + lRect.height / 2;
        const dx = mx - lx;
        const dy = my - ly;
        const dist = Math.hypot(dx, dy);
        setIsNear(dist < 140);
    }, []);

    const handlePointerLeave = useCallback(() => setIsNear(false), []);

    return (
        <MagicCard 
            className="project-magic-card"
            gradientSize={100}
        >
            <Link to={link}>
                <div className="project-container" ref={containerRef} onPointerMove={handlePointerMove} onPointerLeave={handlePointerLeave}>
                    <div className="project-logo">
                        <img src={logo} alt="logo" />
                    </div>
                    <div className="project-title">{title}</div>
                    <div className="project-description">{description}</div>
                    <div className={`project-link${isNear ? " near" : ""}`} ref={linkRef}>
                        <div className="project-link-icon">
                            <FontAwesomeIcon icon={faLink} />
                        </div>
                        <div className="project-link-text">{linkText}</div>
                    </div>
                </div>
            </Link>
        </MagicCard>
    );
};

export default Project;
