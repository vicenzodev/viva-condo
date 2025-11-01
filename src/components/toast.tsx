import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";

type ToastType = "info" | "success" | "error";
type Toast = {
    id: number;
    message: React.ReactNode;
    type?: ToastType;
    duration?: number; 
};

let idCounter = 1;
const subscribers: Array<(t: Toast) => void> = [];

function publishToast(t: Toast) {
    for (const s of subscribers) s(t);
}

export function showToast(
    message: React.ReactNode,
    options?: { type?: ToastType; duration?: number }
) {
    const t: Toast = {
        id: idCounter++,
        message,
        type: options?.type ?? "info",
        duration: options?.duration ?? 4000,
    };
    publishToast(t);
    return t.id;
}


export const ToastProvider: React.FC = () => {
    const [toasts, setToasts] = useState<Toast[]>([]);

    useEffect(() => {
        function onNewToast(t: Toast) {
            setToasts((prev) => [t, ...prev]);
            if (t.duration && t.duration > 0) {
                window.setTimeout(() => {
                    setToasts((prev) => prev.filter((x) => x.id !== t.id));
                }, t.duration);
            }
        }
        subscribers.push(onNewToast);
        return () => {
            const idx = subscribers.indexOf(onNewToast);
            if (idx >= 0) subscribers.splice(idx, 1);
        };
    }, []);

    const remove = (id: number) => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
    };

    if (typeof document === "undefined") return null;

    return createPortal(
        <div style={containerStyle}>
            {toasts.map((t) => (
                <div
                    key={t.id}
                    style={{ ...toastStyle, ...typeStyle[t.type ?? "info"] }}
                    onClick={() => remove(t.id)}
                    role="status"
                    aria-live="polite"
                >
                    <div style={{ marginRight: 8 }}>{iconForType(t.type)}</div>
                    <div style={{ flex: 1 }}>{t.message}</div>
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            remove(t.id);
                        }}
                        aria-label="Close toast"
                        style={closeBtnStyle}
                    >
                        ×
                    </button>
                </div>
            ))}
        </div>,
        document.body
    );
};

const containerStyle: React.CSSProperties = {
    position: "fixed",
    top: 16,
    right: 16,
    zIndex: 9999,
    display: "flex",
    flexDirection: "column",
    gap: 8,
    maxWidth: "min(360px, calc(100% - 32px))",
};

const toastStyle: React.CSSProperties = {
    display: "flex",
    alignItems: "center",
    padding: "10px 12px",
    borderRadius: 8,
    color: "#0b1220",
    boxShadow: "0 6px 18px rgba(16,24,40,0.12)",
    background: "white",
    cursor: "pointer",
    gap: 8,
};

const typeStyle: Record<ToastType, React.CSSProperties> = {
    info: { borderLeft: "4px solid #2563eb" },
    success: { borderLeft: "4px solid #16a34a" },
    error: { borderLeft: "4px solid #dc2626" },
};

const closeBtnStyle: React.CSSProperties = {
    border: "none",
    background: "transparent",
    cursor: "pointer",
    fontSize: 16,
    lineHeight: 1,
    padding: 4,
    color: "rgba(0,0,0,0.6)",
};

function iconForType(t?: ToastType) {
    const size = 16;
    if (t === "success")
        return (
            <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
                <path d="M20 6L9 17l-5-5" stroke="#16a34a" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
            </svg>
        );
    if (t === "error")
        return (
            <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
                <path d="M18 6L6 18M6 6l12 12" stroke="#dc2626" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
            </svg>
        );
    return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
            <path d="M12 8h.01M11 12h1v4h-1z" stroke="#2563eb" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
            <circle cx="12" cy="12" r="9" stroke="#2563eb" strokeWidth={2} />
        </svg>
    );
}

export default ToastProvider;
