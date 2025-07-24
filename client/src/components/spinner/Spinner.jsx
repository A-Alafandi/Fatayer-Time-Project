import "../../main.css"
function Spinner({ size = "md", variant = "primary", label = "Loading…" }) {
    const sizePx = size === "large" ? 60 : size === "small" ? 24 : 38

    const getStrokeColor = () => {
        switch (variant) {
            case "primary":
                return "var(--accent-color)"
            case "secondary":
                return "var(--default-color)"
            case "danger":
                return "#dc3545"
            case "gray":
                return "color-mix(in srgb, var(--default-color), transparent 50%)"
            default:
                return "var(--accent-color)"
        }
    }

    return (
        <span className={`spinner spinner-${size}`} role="status" aria-live="polite">
      <svg className="spinner-svg" width={sizePx} height={sizePx} viewBox="0 0 38 38" fill="none">
        <circle
            className="spinner-circle"
            cx="19"
            cy="19"
            r="16"
            strokeWidth="4"
            stroke={getStrokeColor()}
            fill="none"
            strokeLinecap="round"
            strokeDasharray="80"
            strokeDashoffset="60"
        />
      </svg>
      <span className="sr-only">{label}</span>
    </span>
    )
}

export default Spinner