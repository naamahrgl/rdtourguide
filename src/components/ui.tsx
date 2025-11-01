/* -------------------- Tailwind Design Tokens -------------------- */
export const TW = {
  colors: {
    bg: "bg-[#6B7C8F]",
    accent: "text-[#E8E9EB]",
    line: "bg-white/30",
    dot: "bg-white",
    
  },
  buttons: {
    base: "px-6 py-2 rounded-full font-semibold transition-all duration-200",
    primary: "bg-white/20 text-white hover:bg-white/40",
    secondary: "bg-white text-[#6B7C8F] hover:bg-[#E8E9EB]",
            roundbase: "p-2  items-center justify-center",
    round: "w-16 h-16 rounded-full  bg-[#f5eee7] items-center justify-center ",

  },
  titles: {
    sm: "text-xl font-semibold text-white",
    md: "text-3xl font-bold text-white",
    lg: "text-5xl font-extrabold text-white",
  },
  text: {
    base: "text-white/90",
    secondary: "text-white/70",
  },
  containers: {
    box: "p-6 rounded-lg shadow-lg bg-[#f5eee7]"}}

/* -------------------- Button -------------------- */
interface ButtonProps {
  text: string;
  href?: string;
  onClick?: () => void;
  variant?: "primary" | "secondary";
  className?: string;
}

export function Button({
  text,
  href,
  onClick,
  variant = "primary",
  className = "",
}: ButtonProps) {
  const style = `${TW.buttons.base} ${
    variant === "primary" ? TW.buttons.primary : TW.buttons.secondary
  } ${className}`;
  return href ? (
    <a href={href} className={style}>
      {text}
    </a>
  ) : (
    <button onClick={onClick} className={style}>
      {text}
    </button>
  );
}

/* -------------------- Title -------------------- */
interface TitleProps {
  text: string;
  size?: "sm" | "md" | "lg";
  className?: string;
}

export function Title({ text, size = "md", className = "" }: TitleProps) {
  return <h2 className={`${TW.titles[size]} ${className}`}>{text}</h2>;
}

/* -------------------- Box -------------------- */
interface BoxProps {
  children: any;
  className?: string;
}

export function Box({ children, className = '' }: BoxProps) {
  return <div className={`${TW.containers.box} ${className}`}>{children}</div>;
}

/* -------------------- RoundButton -------------------- */
interface RoundButtonProps {
  text: object;
  href?: string;
  onClick?: () => void;
  className?: string;
}

export function RoundButton({ text, href, onClick,  className = '' }: ButtonProps) {
  const style = `${TW.buttons.roundbase} ${TW.buttons.round} ${className}`;
  return href
    ? <a href={href} className={style}><img src={text} className=""  /></a>
    : <button onClick={onClick} className={style}>{text}</button>;
}

/* line+sction item*/


// ui.tsx
export const LINE_OFFSET = "12%"; // shared constant

export function Line({ lang = "he" }: { lang?: "he" | "en" }) {
  const isRtl = lang === "he";
  const side = isRtl ? "right" : "left";
  return (
    <div
      className={`absolute top-[10%] bottom-[10%] ${side}-[${LINE_OFFSET}] w-[8px] bg-white/40 z-0`}
    ></div>
  );
}


// SectionItem.tsx
interface SectionItemProps { title: string; text?: string; imageSrc?: string; imageAlt?: string; buttonText?: string; buttonHref?: string; lang?: "he" | "en"; reverse?: boolean; className?: string; }

export function SectionItem({
  title,
  imageSrc,
  imageAlt = "",
  buttonText,
  buttonHref,
  lang = "he",
}: SectionItemProps) {
  return (
    <section className="flex flex-col items-center justify-center gap-8 text-center py-16">
      {imageSrc && (
        <div className="relative w-64 h-64 md:w-96 md:h-96 rounded-full overflow-hidden shadow-lg">
          <img
            src={imageSrc}
            alt={imageAlt}
            className="object-cover w-full h-full rounded-full"
          />
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <Title text={title} size="md" className="drop-shadow-lg" />
            {buttonText && buttonHref && (
              <Button
                text={buttonText}
                href={buttonHref}
                variant="secondary"
                className="mt-3"
              />
            )}
          </div>
        </div>
      )}
    </section>
  );
}





/* -------------------- ContactForm -------------------- */
interface ContactFormProps {
  lang: "he" | "en";
}

export function ContactForm({ lang }: ContactFormProps) {
  const t = {
    he: {
      title: "צרו קשר",
      name: "שם מלא",
      email: "אימייל",
      phone: "טלפון",
      message: "הודעה",
      submit: "שליחה",
    },
    en: {
      title: "Contact Us",
      name: "Full Name",
      email: "Email",
      phone: "Phone",
      message: "Message",
      submit: "Send",
    },
  }[lang];

  return (
    <form
      method="POST"
      action="/api/contact"
      className="space-y-4 w-full max-w-md mx-auto text-center"
    >
      <Title text={t.title} size="md" className="mb-6" />

      <input
        type="text"
        name="name"
        placeholder={t.name}
        required
        className="w-full p-3 rounded-md bg-white/10 text-white placeholder-white/60"
      />

      <input
        type="email"
        name="email"
        placeholder={t.email}
        className="w-full p-3 rounded-md bg-white/10 text-white placeholder-white/60"
      />

      <input
        type="tel"
        name="phone"
        placeholder={t.phone}
        className="w-full p-3 rounded-md bg-white/10 text-white placeholder-white/60"
        dir={lang === "he" ? "rtl" : "ltr"}
      />

      <textarea
        name="message"
        placeholder={t.message}
        required
        className="w-full p-3 rounded-md bg-white/10 text-white placeholder-white/60 h-32"
      />

      <Button text={t.submit} variant="primary" className="w-full mt-2" />
    </form>
  );
}

