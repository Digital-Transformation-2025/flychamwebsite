import { useEffect, useRef, useState } from "react";
import { EnvelopeSimple, Printer } from "@phosphor-icons/react/dist/ssr";
import SectionTitle from "./SectionTitle";
import { useDispatch } from "react-redux";
import { printBookService } from "@/store/Services/manageBookingServices";

const FlightDetailsHeader = ({ isTraveleAgent, onSendEmail }) => {
    const dispatch = useDispatch();
    const [emailFocused, setEmailFocused] = useState(false);


    const [openEmailBox, setOpenEmailBox] = useState(false);
    const [email, setEmail] = useState("");

    const btnRef = useRef(null);
    const popRef = useRef(null);

    // Positioning state
    const [panelTop, setPanelTop] = useState(0);
    const [panelLeft, setPanelLeft] = useState(0);
    const [panelWidth, setPanelWidth] = useState(520);
    const [caretLeft, setCaretLeft] = useState(24);

    const isValidEmail = /\S+@\S+\.\S+/.test(email);

    const handleSend = (e) => {
        e?.preventDefault();
        if (!isValidEmail) return;
        onSendEmail?.(email);
        setOpenEmailBox(false);
    };

    const handlePrint = () => dispatch(printBookService());

    // ---- Positioning (desktop: left-align to button, mobile: full-width & centered)
    const computePosition = () => {
        if (!btnRef.current) return;

        const btnRect = btnRef.current.getBoundingClientRect();
        const vw = window.innerWidth;
        const margin = 16;           // safe viewport margin
        const maxWidth = 520;        // desktop max
        const SM = 640;              // Tailwind sm breakpoint

        // Width: mobile full (vw - 32), desktop capped
        const width =
            vw < SM ? Math.max(280, vw - margin * 2) : Math.min(vw - margin * 2, maxWidth);
        setPanelWidth(width);

        // Left: desktop -> align to button's left; mobile -> centered
        let left;
        if (vw >= SM) {
            left = Math.max(margin, Math.min(vw - margin - width, btnRect.left));
        } else {
            left = Math.max(margin, Math.min(vw - margin - width, (vw - width) / 2));
        }
        setPanelLeft(left);

        // Top: just below the Email control
        setPanelTop(btnRect.bottom + 10);

        // Caret: aim at the center of the Email button, clamped inside panel
        const caretHalf = 8; // (16px caret)
        const caretCenterX = btnRect.left + btnRect.width / 2;
        let caretX = caretCenterX - left - caretHalf;
        caretX = Math.max(6, Math.min(width - 16 - 6, caretX));
        setCaretLeft(caretX);
    };

    // Compute when opened + on resize/scroll (throttled with rAF)
    useEffect(() => {
        if (!openEmailBox) return;
        computePosition();

        let raf = 0;
        const schedule = () => {
            if (raf) return;
            raf = requestAnimationFrame(() => {
                raf = 0;
                computePosition();
            });
        };

        window.addEventListener("resize", schedule);
        window.addEventListener("scroll", schedule, true);
        window.addEventListener("orientationchange", schedule);

        return () => {
            window.removeEventListener("resize", schedule);
            window.removeEventListener("scroll", schedule, true);
            window.removeEventListener("orientationchange", schedule);
            if (raf) cancelAnimationFrame(raf);
        };
    }, [openEmailBox]);

    // Close on outside click + Esc (only while open)
    useEffect(() => {
        if (!openEmailBox) return;

        const onDocPointer = (ev) => {
            const target = ev.target;
            if (
                popRef.current &&
                !popRef.current.contains(target) &&
                btnRef.current &&
                !btnRef.current.contains(target)
            ) {
                setOpenEmailBox(false);
            }
        };
        const onKeyDown = (ev) => {
            if (ev.key === "Escape") setOpenEmailBox(false);
        };

        document.addEventListener("mousedown", onDocPointer);
        document.addEventListener("touchstart", onDocPointer, { passive: true });
        document.addEventListener("keydown", onKeyDown);
        return () => {
            document.removeEventListener("mousedown", onDocPointer);
            document.removeEventListener("touchstart", onDocPointer);
            document.removeEventListener("keydown", onKeyDown);
        };
    }, [openEmailBox]);

    return (
        <div className={`w-full py-2 mt-[30px] md:mt-8 mb-[40px] ${isTraveleAgent && "!mt-10"}`}>
            <div className="flex flex-wrap items-center justify-between md:justify-start gap-3">
                {/* Title */}
                <div className="flex items-center gap-3">
                    <SectionTitle>Flight details</SectionTitle>
                    <span className="hidden md:block h-6 w-px bg-black" />
                </div>

                {/* Actions */}
                <div className="flex items-center gap-3 text-sm">
                    <button
                        disabled
                        ref={btnRef}
                        type="button"
                        onClick={() => setOpenEmailBox((v) => !v)}
                        aria-expanded={openEmailBox}
                        aria-controls="email-popover"
                        // 3) Input focus handlers (add to the email <input>)
                        onFocus={() => setEmailFocused(true)}
                        onBlur={() => setEmailFocused(false)}
                        className={`flex items-center gap-1 transition px-2 py-1 rounded-sm underline !cursor-not-allowed
                      ${openEmailBox || emailFocused
                                ? 'bg-[#A6CFE0]/20 text-primary-1   '
                                : 'text-primary-500 hover:bg-[#A6CFE0]/20 hover:text-primary-1 hover:underline'}`}

                    >
                        <EnvelopeSimple size={20} weight="regular" />
                        Email
                    </button>

                    <span className="h-5 w-px bg-primary-1" />

                    <button

                        onClick={handlePrint}
                        disabled
                        className="!cursor-not-allowed flex items-center gap-1 text-primary-500"
                    >
                        <Printer size={20} weight="regular" />
                        Print
                    </button>
                </div>
            </div>

            {/* Popover (fixed to avoid clipping). Mobile: full width; Desktop: left-aligned to Email */}
            {openEmailBox && (
                <div
                    id="email-popover"
                    ref={popRef}
                    className=" fixed z-2  md:max-w-md"
                    style={{ top: panelTop, left: panelLeft, width: panelWidth }}
                >
                    <div className="        relative bg-50 border border-[#F5F5F4] rounded-xs p-3 w-full
      [filter:drop-shadow(0_8px_24px_rgba(0,0,0,0.12))_drop-shadow(0_2px_8px_rgba(0,0,0,0.08))]
">
                        {/* Caret under Email label */}
                        <span
                            className="  pointer-events-none absolute -top-2 w-4 h-4 bg-50 rotate-45
          border-l border-t border-r-0 border-b-0 border-[#F5F5F4]
 
                             "
                            style={{ left: caretLeft }}
                        />
                        <form
                            onSubmit={handleSend}
                            className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2"
                        >
                            <input
                                type="email"
                                autoFocus
                                inputMode="email"
                                autoComplete="email"
                                placeholder="name@example.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full sm:flex-1 h-11 sm:h-12 rounded-xs border-1 border-gray-300 px-4 text-[16px] sm:text-[18px] leading-none outline-none focus:border-primary-1 focus:ring-1 "
                            />
                            <button
                                type="submit"
                                disabled={!isValidEmail}
                                className="w-full sm:w-auto h-11 sm:h-12 px-10 rounded-sm bg-primary-1 text-white text-[16px] disabled:opacity-50 disabled:cursor-not-allowed hover:opacity-95 transition font-medium"
                            >
                                Send
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default FlightDetailsHeader;
