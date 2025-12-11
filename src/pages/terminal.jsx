import React, { useEffect, useRef, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";

import "./styles/terminal.css";

const introBox = [
  "+--------------------------------------+",
  "| Jeffin Joffy Portfolio Shell         |",
  "| type 'start' to boot                 |",
  '| then sudo get-user "Jeffin Joffy"    |',
  "+--------------------------------------+",
];

const bootLines = [
  "[ ok ] Mounting portfolio filesystem...",
  "[ ok ] Starting ssh-agent for jeffin.joffy...",
  "[ .. ] Loading AI/ML models: pantry_tracker.tflite, ocsr_transformer.pt...",
  "[ ok ] Registering ACM Summer School badge...",
  "[ ok ] Syncing github remote: github.com/Apetun...",
  "[ ok ] Starting service: perceiva-nav...",
];

const apetunAscii = [
  "  ###    ####    #####   #####   #   #   #   # ",
  " #   #   #   #   #         #     #   #   ##  # ",
  " #####   ####    ####      #     #   #   # # # ",
  " #   #   #       #         #     #   #   #  ## ",
  " #   #   #       #####     #     #####   #   # ",
];

const successLines = [
  "",
  "[ ok ] Portfolio shell booted.",
  ...apetunAscii,
  'hint: type `sudo get-user "Jeffin Joffy"` or `help`.',
];

const fortuneMessages = [
  "Ship it, then iterate.",
  "Debugging is where the real learning happens.",
  "Small, consistent projects beat giant unfinished ones.",
  "You are allowed to write ugly code first.",
  "Today's bug is tomorrow's portfolio story.",
];

const helpLines = [
  "Available commands:",
  "  start                           boot the portfolio shell",
  '  sudo get-user "Jeffin Joffy"    open main portfolio',
  "  ls                              list sections",
  "  whoami                          show current user",
  "  clear                           clear the screen",
  "",
  "Fun:",
  "  matrix                          mini matrix-style effect",
  "  fortune | quote                 random dev fortune",
  "  botsay <msg>                    little robot says your text",
  "  banner                          show APETUN banner",
  "  rainbow | lolcat                pretend rainbow output",
  "  game | guess                    tiny number-guess gag",
  "  sl                              tiny ASCII train",
  "  rm -rf /                        (disabled)",
  "  vim, nano                       (nice try)",
];

const lsLine = "home/  portfolio/  blog/";

const readyPlaceholders = ['sudo get-user "Jeffin Joffy"', "help"];

const COMMANDS = [
  "start",
  'sudo get-user "Jeffin Joffy"',
  "help",
  "ls",
  "whoami",
  "clear",
  "cls",
  "matrix",
  "fortune",
  "quote",
  "botsay",
  "banner",
  "rainbow",
  "lolcat",
  "game",
  "guess",
  "sl",
  "rm -rf /",
  "vim",
  "nano",
];

const Terminal = () => {
  const navigate = useNavigate();
  const logRef = useRef(null);
  const bootTimeoutsRef = useRef([]);

  const [lines, setLines] = useState([]);
  const [input, setInput] = useState("");
  const [phase, setPhase] = useState("idle"); // idle | booting | ready
  const [placeholderIndex, setPlaceholderIndex] = useState(0);

  const [history, setHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(null);
  const [suggestions, setSuggestions] = useState([]);

  // initial intro + "last login"
  useEffect(() => {
    const now = new Date();
    const timePart = now.toTimeString().split(" ")[0];
    const lastLogin = `Last login: ${now.toDateString()} ${timePart} from 127.0.0.1`;

    setLines([lastLogin, "", ...introBox]);

    return () => {
      // cleanup any pending boot timeouts
      bootTimeoutsRef.current.forEach((id) => clearTimeout(id));
      bootTimeoutsRef.current = [];
    };
  }, []);

  // auto-scroll
  useEffect(() => {
    if (logRef.current) {
      logRef.current.scrollTop = logRef.current.scrollHeight;
    }
  }, [lines]);

  // rotate placeholder hints when ready
  useEffect(() => {
    if (phase === "booting") return;

    if (phase === "idle") {
      setPlaceholderIndex(0);
      return;
    }

    if (readyPlaceholders.length <= 1) return;

    const intervalId = setInterval(() => {
      setPlaceholderIndex((prev) => (prev + 1) % readyPlaceholders.length);
    }, 3500);

    return () => clearInterval(intervalId);
  }, [phase]);

  const startBootSequence = useCallback(() => {
    if (phase === "booting") {
      setLines((prev) => [
        ...prev,
        "system: boot already in progress. hang tight.",
      ]);
      return;
    }

    if (phase === "ready") {
      setLines((prev) => [
        ...prev,
        "system: already booted. type `help` for commands.",
      ]);
      return;
    }

    setPhase("booting");
    setLines((prev) => [...prev, "", "[ .. ] Booting portfolio shell..."]);

    // clear any previous timeouts
    bootTimeoutsRef.current.forEach((id) => clearTimeout(id));
    bootTimeoutsRef.current = [];

    bootLines.forEach((line, index) => {
      const id = window.setTimeout(() => {
        setLines((prev) => [...prev, line]);

        if (index === bootLines.length - 1) {
          setLines((prev) => [...prev, "", ...successLines]);
          setPhase("ready");
        }
      }, (index + 1) * 380);

      bootTimeoutsRef.current.push(id);
    });
  }, [phase]);

  const runCommand = useCallback(
    (raw) => {
      const trimmed = raw.trim();
      if (!trimmed) return;

      const lower = trimmed.toLowerCase();

      // fun / easter-egg commands first
      if (lower === "rm -rf /" || lower.startsWith("rm -rf /")) {
        setLines((prev) => [
          ...prev,
          "[ !! ] operation blocked by portfolio-safe-mode.",
        ]);
        return;
      }

      if (lower === "vim" || lower === "nano") {
        setLines((prev) => [
          ...prev,
          "editor: not available. (try :q!)",
        ]);
        return;
      }

      // fun / aesthetic commands (require shell ready)
      const ensureReady = () => {
        if (phase !== "ready") {
          setLines((prev) => [
            ...prev,
            "system: shell not fully booted. run `start` first.",
          ]);
          return false;
        }
        return true;
      };

      if (lower === "matrix") {
        if (!ensureReady()) return;

        const rows = Array.from({ length: 8 }, () =>
          Array.from({ length: 32 }, () =>
            Math.random() > 0.5 ? "1" : "0"
          ).join("")
        );

        setLines((prev) => [
          ...prev,
          "[ .. ] entering mini matrix...",
          ...rows,
          "[ ok ] exiting matrix.",
        ]);
        return;
      }

      if (lower === "fortune" || lower === "quote") {
        if (!ensureReady()) return;

        const msg =
          fortuneMessages[Math.floor(Math.random() * fortuneMessages.length)];
        setLines((prev) => [...prev, `[ fortune ] ${msg}`]);
        return;
      }

      if (lower.startsWith("botsay")) {
        if (!ensureReady()) return;

        const msg =
          trimmed.replace(/^botsay\s*/i, "").trim() || "ship > perfect.";
        const top = " " + "_".repeat(msg.length + 2);
        const mid = `< ${msg} >`;
        const bottom = " " + "-".repeat(msg.length + 2);
        const robot = [
          "        \\",
          "         [o_o]",
          "         /| |\\",
          "          / \\",
        ];
        setLines((prev) => [...prev, top, mid, bottom, ...robot]);
        return;
      }

      if (lower === "banner") {
        if (!ensureReady()) return;

        setLines((prev) => [...prev, ...apetunAscii]);
        return;
      }

      if (lower === "rainbow" || lower === "lolcat") {
        if (!ensureReady()) return;

        const bar = "🌈".repeat(12);
        setLines((prev) => [
          ...prev,
          bar,
          "rainbow mode enabled (you'll have to imagine the ANSI colors).",
          bar,
        ]);
        return;
      }

      if (lower === "game" || lower === "guess") {
        if (!ensureReady()) return;

        const target = Math.floor(Math.random() * 5) + 1;
        setLines((prev) => [
          ...prev,
          "[ game ] I'm thinking of a number between 1 and 5.",
          `[ game ] It's ${target}. If you guessed ${target}, you win 🎉`,
        ]);
        return;
      }

      if (lower === "sl") {
        if (!ensureReady()) return;

        const train = [
          "      ====        ________                ___________ ",
          "  _D _|  |_______/        \\__I_I_____===__|_________| ",
          "   |(_)---  |   H\\________/ |   |        =|___ ___|   ",
          "   /     |  |   H  |  |     |   |         ||_| |_||   ",
          "  |      |  |   H  |__--------------------| [___] |   ",
          "  | ________|___H__/__|_____/[][]~\\_______|       |   ",
          "  |/ |   |-----------I_____I [][] []  D   |=======|__ ",
        ];
        setLines((prev) => [...prev, ...train]);
        return;
      }

      if (lower === "sudo") {
        setLines((prev) => [
          ...prev,
          'sudo: usage: sudo get-user "Jeffin Joffy"',
        ]);
        return;
      }

      // core commands
      if (lower === "start") {
        startBootSequence();
        return;
      }

      if (lower === "help") {
        setLines((prev) => [...prev, "", ...helpLines]);
        return;
      }

      if (lower === "ls") {
        setLines((prev) => [...prev, lsLine]);
        return;
      }

      if (lower === "whoami") {
        setLines((prev) => [
          ...prev,
          "jeffin.joffy  (AI/ML · CSE @ MIT Manipal · BS DS & Programming @ IITM)",
        ]);
        return;
      }

      if (lower === "clear" || lower === "cls") {
        setLines(["[ cleared ] screen cleared. type `help` for commands."]);
        return;
      }

      // sudo get-user variations
      if (
        lower.startsWith("sudo get-user") ||
        lower.startsWith("sudo get user")
      ) {
        const match = trimmed.match(
          /sudo\s+get[-\s]?user\s+["']?(.+?)["']?$/i
	        );
	        const name = (match && match[1]) || "";

	        if (name && /jeffin/i.test(name)) {
	          if (phase !== "ready") {
	            setLines((prev) => [
	              ...prev,
	              "system: shell not fully booted. run `start` first.",
	            ]);
	            return;
	          }

	          setLines((prev) => [...prev, '[ ok ] user "Jeffin Joffy" found.']);

	          const steps = [
	            "[ .. ] Opening portfolio...",
	            "[ .. ] Hydrating UI components...",
	            "[ .. ] Priming particles background...",
	            "[ ok ] Loading navbar + logo...",
	            "[ ok ] Redirecting to /portfolio/home/",
	          ];

	          steps.forEach((line, idx) => {
	            setTimeout(() => {
	              setLines((prev) => [...prev, line]);
	            }, 520 * (idx + 1));
	          });

	          setTimeout(
	            () => navigate("/portfolio/home/", { replace: true }),
	            520 * (steps.length + 1)
	          );
	        } else {
          setLines((prev) => [
            ...prev,
            `sudo: user "${name || "unknown"}" not found in portfolio.`,
          ]);
        }
        return;
      }

      // fallback error messages depending on phase
      if (phase === "idle") {
        setLines((prev) => [
          ...prev,
          `command not found: ${trimmed}`,
          'hint: type "start" to boot, or "help" for commands.',
        ]);
        return;
      }

      if (phase === "booting") {
        setLines((prev) => [
          ...prev,
          `system busy while booting (ignored): ${trimmed}`,
        ]);
        return;
      }

      // phase === "ready"
      setLines((prev) => [
        ...prev,
        `unknown command: ${trimmed}`,
        'hint: try "help" or sudo get-user "Jeffin Joffy".',
      ]);
    },
    [navigate, phase, startBootSequence]
  );

  const handleSubmit = useCallback(() => {
    const raw = input.trim();
    if (!raw) return;

    // echo command with prompt style
    setLines((prev) => [...prev, `jeff@portfolio:~$ ${raw}`]);
    setHistory((prev) => [...prev, raw]);
    setHistoryIndex(null);
    setSuggestions([]);

    setInput("");
    runCommand(raw);
  }, [input, runCommand]);

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      handleSubmit();
      return;
    }

    if (event.key === "Tab") {
      event.preventDefault();

      if (!COMMANDS.length) return;

      const current = input.trim();

      // If nothing typed, show all commands as suggestions
      if (!current) {
        setSuggestions(COMMANDS);
        return;
      }

      const matches = COMMANDS.filter((cmd) =>
        cmd.toLowerCase().startsWith(current.toLowerCase())
      );

      if (matches.length === 1) {
        setInput(matches[0]);
        setSuggestions([]);
      } else if (matches.length > 1) {
        setSuggestions(matches);
      } else {
        setSuggestions([]);
      }
      return;
    }

    if (event.key === "ArrowUp") {
      event.preventDefault();
      if (!history.length) return;

      setHistoryIndex((prev) => {
        const nextIndex =
          prev === null ? history.length - 1 : Math.max(prev - 1, 0);
        setInput(history[nextIndex] || "");
        return nextIndex;
      });
      return;
    }

    if (event.key === "ArrowDown") {
      event.preventDefault();
      if (!history.length) return;

      setHistoryIndex((prev) => {
        if (prev === null) return null;

        const nextIndex = prev + 1;
        if (nextIndex >= history.length) {
          setInput("");
          return null;
        }

        setInput(history[nextIndex] || "");
        return nextIndex;
      });
      return;
    }

    // any other key: hide suggestions if visible
    if (suggestions.length) {
      setSuggestions([]);
    }
  };

  const getPlaceholder = () => {
    if (phase === "booting") {
      return "booting portfolio shell...";
    }
    if (phase === "idle") {
      return "start";
    }
    return readyPlaceholders[placeholderIndex] || readyPlaceholders[0];
  };

  return (
    <div className="terminal-standalone">
      <div className="terminal-screen">
        <div className="terminal-frame">
          <div className="terminal-header">
            <div className="terminal-dots">
              <span className="dot red" />
              <span className="dot yellow" />
              <span className="dot green" />
            </div>

            <div className="terminal-header-center">
              <span className="terminal-title">Portfolio shell</span>
              <span className={`terminal-status terminal-status-${phase}`}>
                <span className="terminal-status-dot">●</span>
                {phase === "idle"
                  ? "idle"
                  : phase === "booting"
                  ? "booting..."
                  : "ready"}
              </span>
            </div>
          </div>

          <div className="terminal-body" ref={logRef}>
            {lines.map((line, idx) => (
              <div key={idx} className="terminal-line">
                {line}
              </div>
            ))}
          </div>

          <div className="terminal-input-row">
            <span className="terminal-prompt">
              jeff@portfolio:~$
              <span className="terminal-cursor" />
            </span>
            <input
              className="terminal-input"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={getPlaceholder()}
              disabled={phase === "booting"}
              autoFocus
            />
            <button
              className="terminal-btn"
              onClick={handleSubmit}
              disabled={phase === "booting"}
            >
              run
            </button>
          </div>

          {suggestions.length > 0 && (
            <div className="terminal-suggestions">
              {suggestions.map((cmd) => (
                <button
                  key={cmd}
                  type="button"
                  className="terminal-suggestion"
                  onClick={() => {
                    setInput(cmd);
                    setSuggestions([]);
                  }}
                >
                  {cmd}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Terminal;
