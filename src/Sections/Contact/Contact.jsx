import { useState, useEffect, useRef } from "react";

const ORANGE = "#e8623a";
const ORANGE_DARK = "#e85c1f";
const ORANGE_GLOW = "rgba(255,107,43,0.35)";
const ORANGE_SOFT = "rgba(255,107,43,0.12)";
const BG = "#F2EFE9";
const CARD_BG = "#ffffff";
const DARK = "#1a1a1a";
const MUTED = "#999";
const BORDER = "#e0ddd7";

const CONTACT_ICON = { Email: "ti-mail", Phone: "ti-phone", Location: "ti-map-pin" };

const CARD_ACCENT = {
  Email:    { bg: "#fff5f0", icon: ORANGE,    border: "rgba(232,98,58,0.25)"  },
  Phone:    { bg: "#f0f7ff", icon: "#3b82f6", border: "rgba(59,130,246,0.25)" },
  Location: { bg: "#f0fdf4", icon: "#22c55e", border: "rgba(34,197,94,0.25)"  },
};

const SOCIAL_CONFIG = [
  { key: "gh", icon: "ti-brand-github",    label: "GitHub",    url: "https://github.com/DeveloperMujtaba22" },
  { key: "li", icon: "ti-brand-linkedin",  label: "LinkedIn",  url: "https://www.linkedin.com/in/mujtaba-rasheed-94302330b/" },
  { key: "ig", icon: "ti-brand-instagram", label: "Instagram", url: "https://www.instagram.com/mujtabarasheed/?next=" },
];

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [hoveredCard,   setHoveredCard]   = useState(null);
  const [hoveredSocial, setHoveredSocial] = useState(null);
  const [hoveredBtn,    setHoveredBtn]    = useState(false);
  const [focusedField,  setFocusedField]  = useState(null);

  const leftRef  = useRef(null);
  const rightRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('aos-visible');
          }
        });
      },
      { threshold: 0.15 }
    );
    if (leftRef.current)  observer.observe(leftRef.current);
    if (rightRef.current) observer.observe(rightRef.current);
    return () => observer.disconnect();
  }, []);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const handleSubmit = () => console.log("Form submitted:", form);

  const contacts = [
    { label: "Email",    value: "mujtabarasheed20@gmail.com" },
    { label: "Phone",    value: "+92 3265911975"             },
    { label: "Location", value: "Karachi, Pakistan"          },
  ];

  const inputStyle = (name) => ({
    background: focusedField === name ? "#ffffff" : "#EDEAE4",
    border: `1.5px solid ${focusedField === name ? ORANGE : "transparent"}`,
    borderRadius: 12,
    padding: "14px 16px",
    fontSize: 14,
    fontFamily: "'DM Sans', sans-serif",
    color: DARK,
    outline: "none",
    width: "100%",
    boxSizing: "border-box",
    transition: "border-color 0.2s, box-shadow 0.2s, background 0.2s",
    boxShadow: focusedField === name ? `0 0 0 3px ${ORANGE_SOFT}` : "none",
  });

  return (
    <>
      <link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:wght@400;500;600;700&display=swap" rel="stylesheet" />
      <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@tabler/icons-webfont@3.31.0/dist/tabler-icons.min.css" />

      <style>{`
        * { box-sizing: border-box; }

        @keyframes pulse {
          0%,100% { opacity:1; transform:scale(1); }
          50%      { opacity:.5; transform:scale(1.3); }
        }
        @keyframes floatBadge {
          0%,100% { transform: translateY(0); }
          50%      { transform: translateY(-6px); }
        }
        .bdot { animation: pulse 1.5s infinite; }
        .gdot { animation: pulse 1.5s infinite; }

        .contact-wrapper {
          max-width: 1900px;
          margin: 0 auto;
          padding: 140px 160px 80px;
          display: grid;
          grid-template-columns: 1fr 1.1fr;
          gap: 20px;
          align-items: start;
          font-family: 'DM Sans', sans-serif;
          background: ${BG};
          min-height: 100vh;
        }

        .contact-headline {
          font-family: 'above', sans-serif;
          font-size: 95px;
          font-weight: 800;
          line-height: 0.9;
          letter-spacing: 6px;
          margin: 0 0 6px;
          color: ${DARK};
        }

        .form-row {
          display: grid;
          grid-template-columns: 2fr 1fr;
          gap: 16px;
        }

        .response-badge {
          position: absolute;
          bottom: -20px;
          right: 24px;
          background: ${DARK};
          color: #fff;
          border-radius: 12px;
          padding: 10px 18px;
          animation: floatBadge 3s ease-in-out infinite;
        }

        /* ── Scroll animations ── */
        .aos-fade-left,
        .aos-fade-right {
          opacity: 0;
          transition: opacity 0.7s ease, transform 0.7s cubic-bezier(0.34, 1.56, 0.64, 1);
        }
        .aos-fade-left  { transform: translateX(-50px); }
        .aos-fade-right { transform: translateX(50px);  }
        .aos-fade-left.aos-visible,
        .aos-fade-right.aos-visible {
          opacity: 1;
          transform: translateX(0);
        }
        .aos-fade-right { transition-delay: 0.15s; }

        /* ── Tablet ── */
        @media (max-width: 900px) {
          .contact-wrapper {
            grid-template-columns: 1fr;
            padding: 100px 40px 100px;
            gap: 48px;
          }
          .contact-headline { font-size: 100px; }
        }

        /* ── Mobile ── */
        @media (max-width: 600px) {
          .contact-wrapper {
            padding: 80px 20px 80px;
            gap: 40px;
          }
          .contact-headline {
            font-size: 72px;
            letter-spacing: 3px;
          }
          .form-row { grid-template-columns: 1fr; }
          .form-card { padding: 24px 20px 40px !important; }
          .response-badge { bottom: -18px; right: 16px; padding: 8px 14px; }
        }

        @media (max-width: 380px) {
          .contact-headline { font-size: 48px; }
        }
      `}</style>

      <div className="contact-wrapper">

        {/* LEFT */}
        <div ref={leftRef} className="aos-fade-left" style={{ display: "flex", flexDirection: "column" }}>

          <h1 className="contact-headline">
            LET'S
            <span style={{ color: ORANGE, display: "block" }}>
              Contact
              <span style={{
                display: "inline-block", width: 20, height: 20,
                background: DARK, marginLeft: 6,
                verticalAlign: "bottom", marginBottom: 10,
              }} />
            </span>
          </h1>

          <p style={{ marginTop: 10, fontSize: 15, color: "#666", maxWidth: 380, lineHeight: 1.6, marginBottom: 17 }}>
            
          </p>

          {/* Contact Cards */}
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {contacts.map(({ label, value }) => {
              const hov    = hoveredCard === label;
              const accent = CARD_ACCENT[label];
              return (
                <div
                  key={label}
                  onMouseEnter={() => setHoveredCard(label)}
                  onMouseLeave={() => setHoveredCard(null)}
                  style={{
                    background: hov ? accent.bg : CARD_BG,
                    borderRadius: 16, padding: "16px 20px",
                    display: "flex", alignItems: "center", gap: 16,
                    border: `1px solid ${hov ? accent.border : BORDER}`,
                    transform: hov ? "translateX(6px)" : "translateX(0)",
                    boxShadow: hov ? "0 4px 20px rgba(0,0,0,0.08)" : "none",
                    transition: "transform 0.25s cubic-bezier(.34,1.56,.64,1), box-shadow 0.25s, border-color 0.25s, background 0.25s",
                    cursor: "default",
                  }}
                >
                  <div style={{
                    width: 42, height: 42, borderRadius: 12, flexShrink: 0,
                    background: hov ? accent.bg : "#EDEAE4",
                    border: `1px solid ${hov ? accent.border : "transparent"}`,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    transition: "background 0.25s, border-color 0.25s",
                  }}>
                    <i className={`ti ${CONTACT_ICON[label]}`}
                      style={{ fontSize: 20, color: hov ? accent.icon : "#888", transition: "color 0.25s" }}
                      aria-hidden="true" />
                  </div>
                  <div>
                    <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: "1.5px", textTransform: "uppercase", color: MUTED, marginBottom: 2 }}>{label}</div>
                    <div style={{ fontSize: 14, fontWeight: 500, color: DARK }}>{value}</div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Socials */}
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginTop: 32, flexWrap: "wrap" }}>
            <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: "2px", color: MUTED, textTransform: "uppercase" }}>
              Socials //
            </span>
            {SOCIAL_CONFIG.map(({ key, icon, label, url }) => {
              const hov = hoveredSocial === key;
              return (
                <a
                  key={key}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  onMouseEnter={() => setHoveredSocial(key)}
                  onMouseLeave={() => setHoveredSocial(null)}
                  style={{
                    width: 40, height: 40, borderRadius: "50%",
                    background: hov ? ORANGE : DARK,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    cursor: "pointer", textDecoration: "none",
                    transform: hov ? "translateY(-3px) scale(1.12)" : "translateY(0) scale(1)",
                    boxShadow: hov ? `0 6px 16px ${ORANGE_GLOW}` : "none",
                    transition: "background 0.2s, transform 0.25s cubic-bezier(.34,1.56,.64,1), box-shadow 0.25s",
                  }}
                >
                  <i className={`ti ${icon}`} style={{ fontSize: 18, color: "#fff" }} aria-hidden="true" />
                </a>
              );
            })}
          </div>
        </div>

        {/* RIGHT — Form Card */}
        <div
          ref={rightRef}
          className="form-card aos-fade-right"
          style={{
            background: CARD_BG, borderRadius: 24, padding: 30,
            border: `1px solid ${BORDER}`,
            boxShadow: "0 8px 40px rgba(0,0,0,0.06)",
            position: "relative",
            display: "flex", flexDirection: "column", gap: 24,
            marginBottom: 24,
          }}
        >
          <div className="form-row">
            {[
              { name: "name",  label: "Full Name",     placeholder: "Mujtaba Rasheed"   },
              { name: "email", label: "Email Address", placeholder: "hello@example.com" },
            ].map(({ name, label, placeholder }) => (
              <div key={name} style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                <label style={{ fontSize: 10, fontWeight: 700, letterSpacing: "1.5px", textTransform: "uppercase", color: MUTED }}>
                  {label}
                </label>
                <input
                  style={inputStyle(name)}
                  name={name}
                  placeholder={placeholder}
                  value={form[name]}
                  onChange={handleChange}
                  onFocus={() => setFocusedField(name)}
                  onBlur={() => setFocusedField(null)}
                />
              </div>
            ))}
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            <label style={{ fontSize: 10, fontWeight: 700, letterSpacing: "1.5px", textTransform: "uppercase", color: MUTED }}>Subject</label>
            <input
              style={inputStyle("subject")}
              name="subject"
              placeholder="How can I help you?"
              value={form.subject}
              onChange={handleChange}
              onFocus={() => setFocusedField("subject")}
              onBlur={() => setFocusedField(null)}
            />
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            <label style={{ fontSize: 10, fontWeight: 700, letterSpacing: "1.5px", textTransform: "uppercase", color: MUTED }}>Your Message</label>
            <textarea
              style={{ ...inputStyle("message"), height: 120, lineHeight: 1.6, resize: "none" }}
              name="message"
              placeholder="Describe your vision..."
              value={form.message}
              onChange={handleChange}
              onFocus={() => setFocusedField("message")}
              onBlur={() => setFocusedField(null)}
            />
          </div>

          <button
            onClick={handleSubmit}
            onMouseEnter={() => setHoveredBtn(true)}
            onMouseLeave={() => setHoveredBtn(false)}
            style={{
              width: "100%",
              background: hoveredBtn ? ORANGE_DARK : ORANGE,
              color: "#fff", border: "none", borderRadius: 14,
              padding: 18, fontSize: 13, fontWeight: 700,
              letterSpacing: "2px", textTransform: "uppercase",
              cursor: "pointer",
              display: "flex", alignItems: "center", justifyContent: "center", gap: 10,
              transform: hoveredBtn ? "translateY(-2px)" : "translateY(0)",
              boxShadow: hoveredBtn ? `0 8px 24px ${ORANGE_GLOW}` : "none",
              transition: "background 0.2s, transform 0.2s, box-shadow 0.2s",
              fontFamily: "'DM Sans', sans-serif",
            }}
          >
            <i className="ti ti-send" style={{ fontSize: 17 }} aria-hidden="true" />
            SEND
          </button>
        </div>
      </div>
    </>
  );
}