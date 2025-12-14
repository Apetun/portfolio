import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import "./styles/custom-cursor.css";

const DefaultCursorSVG: React.FC = () => {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width={50}
			height={54}
			viewBox="0 0 50 54"
			fill="none"
			style={{ scale: 0.5 }}
		>
			<g filter="url(#filter0_d_91_7928)">
				<path
					d="M42.6817 41.1495L27.5103 6.79925C26.7269 5.02557 24.2082 5.02558 23.3927 6.79925L7.59814 41.1495C6.75833 42.9759 8.52712 44.8902 10.4125 44.1954L24.3757 39.0496C24.8829 38.8627 25.4385 38.8627 25.9422 39.0496L39.8121 44.1954C41.6849 44.8902 43.4884 42.9759 42.6817 41.1495Z"
					fill="black"
				/>
				<path
					d="M43.7146 40.6933L28.5431 6.34306C27.3556 3.65428 23.5772 3.69516 22.3668 6.32755L6.57226 40.6778C5.3134 43.4156 7.97238 46.298 10.803 45.2549L24.7662 40.109C25.0221 40.0147 25.2999 40.0156 25.5494 40.1082L39.4193 45.254C42.2261 46.2953 44.9254 43.4347 43.7146 40.6933Z"
					stroke="white"
					strokeWidth={2.25825}
				/>
			</g>
			<defs>
				<filter
					id="filter0_d_91_7928"
					x={0.602397}
					y={0.952444}
					width={49.0584}
					height={52.428}
					filterUnits="userSpaceOnUse"
					colorInterpolationFilters="sRGB"
				>
					<feFlood floodOpacity={0} result="BackgroundImageFix" />
					<feColorMatrix
						in="SourceAlpha"
						type="matrix"
						values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
						result="hardAlpha"
					/>
					<feOffset dy={2.25825} />
					<feGaussianBlur stdDeviation={2.25825} />
					<feComposite in2="hardAlpha" operator="out" />
					<feColorMatrix
						type="matrix"
						values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.08 0"
					/>
					<feBlend
						mode="normal"
						in2="BackgroundImageFix"
						result="effect1_dropShadow_91_7928"
					/>
					<feBlend
						mode="normal"
						in="SourceGraphic"
						in2="effect1_dropShadow_91_7928"
						result="shape"
					/>
				</filter>
			</defs>
		</svg>
	);
};

const CustomCursor: React.FC = () => {
	const [position, setPosition] = useState({ x: 0, y: 0 });
	const [visible, setVisible] = useState(false);
	const [pressed, setPressed] = useState(false);
	const clickTimeoutRef = useRef<NodeJS.Timeout | null>(null);
	const pressFrameRef = useRef<number | null>(null);
	const CLICK_FEEDBACK_MS = 400;
	const clearClickTimeout = useCallback(() => {
		if (clickTimeoutRef.current) {
			clearTimeout(clickTimeoutRef.current);
			clickTimeoutRef.current = null;
		}
	}, []);
	const resetCursorState = useCallback(() => {
		setVisible(false);
		setPressed(false);
		clearClickTimeout();
		if (pressFrameRef.current) {
			cancelAnimationFrame(pressFrameRef.current);
			pressFrameRef.current = null;
		}
	}, [clearClickTimeout]);

	const isFinePointer = useMemo(() => {
		if (typeof window === "undefined" || typeof matchMedia === "undefined") {
			return false;
		}
		return matchMedia("(pointer: fine)").matches;
	}, []);

	useEffect(() => {
		if (!isFinePointer) return;

		document.body.classList.add("custom-cursor-mode");

		const handleEnterExternalSurface = (event: MouseEvent) => {
			const target = event.target;
			if (target instanceof Element && target.closest("object, iframe, embed, [data-disable-custom-cursor]")) {
				resetCursorState();
			}
		};

		const handleMove = (event: MouseEvent) => {
			setPosition({ x: event.clientX, y: event.clientY });
			setVisible(true);
		};

		const handleLeave = () => {
			resetCursorState();
		};

		const handleOutOfWindow = (event: MouseEvent) => {
			if (!event.relatedTarget) {
				resetCursorState();
			}
		};

		const handleVisibilityChange = () => {
			if (document.visibilityState !== "visible") {
				resetCursorState();
			}
		};

		window.addEventListener("mousemove", handleMove);
		window.addEventListener("mouseenter", handleMove);
		window.addEventListener("mouseleave", handleLeave);
		window.addEventListener("mouseout", handleOutOfWindow);
		document.addEventListener("mouseenter", handleEnterExternalSurface, true);
		document.addEventListener("visibilitychange", handleVisibilityChange);

		return () => {
			window.removeEventListener("mousemove", handleMove);
			window.removeEventListener("mouseenter", handleMove);
			window.removeEventListener("mouseleave", handleLeave);
			window.removeEventListener("mouseout", handleOutOfWindow);
			document.removeEventListener("mouseenter", handleEnterExternalSurface, true);
			document.removeEventListener("visibilitychange", handleVisibilityChange);
			document.body.classList.remove("custom-cursor-mode");
			clearClickTimeout();
			if (pressFrameRef.current) {
				cancelAnimationFrame(pressFrameRef.current);
			}
		};
	}, [isFinePointer, resetCursorState]);

	useEffect(() => {
		if (!isFinePointer) return;

		const handleDown = () => {
			clearClickTimeout();
			setPressed(false);
			if (pressFrameRef.current) {
				cancelAnimationFrame(pressFrameRef.current);
			}
			pressFrameRef.current = requestAnimationFrame(() => {
				setPressed(true);
				pressFrameRef.current = null;
			});
		};
		const handleUp = () => {
			// Let the animation finish on its own; nothing to do here.
		};
		const handleBlur = () => {
			resetCursorState();
		};

		window.addEventListener("mousedown", handleDown);
		window.addEventListener("mouseup", handleUp);
		window.addEventListener("blur", handleBlur);

		return () => {
			window.removeEventListener("mousedown", handleDown);
			window.removeEventListener("mouseup", handleUp);
			window.removeEventListener("blur", handleBlur);
		};
	}, [isFinePointer, resetCursorState]);

	useEffect(() => {
		if (!isFinePointer) return;
		if (!pressed) return;

		if (clickTimeoutRef.current) {
			clearTimeout(clickTimeoutRef.current);
		}

		clickTimeoutRef.current = setTimeout(() => {
			setPressed(false);
			clickTimeoutRef.current = null;
		}, CLICK_FEEDBACK_MS);

		return () => {
			if (clickTimeoutRef.current) {
				clearTimeout(clickTimeoutRef.current);
				clickTimeoutRef.current = null;
			}
		};
	}, [pressed, isFinePointer, CLICK_FEEDBACK_MS]);

	if (!isFinePointer) {
		return null;
	}

	return (
		<div
			className={`custom-cursor${visible ? "" : " is-hidden"}${pressed ? " is-pressed" : ""}`}
			style={{
				transform: `translate3d(${position.x}px, ${position.y}px, 0)`
			}}
		>
			<div className="custom-cursor__svg">
				<DefaultCursorSVG />
			</div>
		</div>
	);
};

export default CustomCursor;
