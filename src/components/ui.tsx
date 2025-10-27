// src/components/ui.tsx
/* -------------------- Tailwind Design Tokens -------------------- */
export const TW = {
  buttons: {
    base: "px-6 py-2 rounded font-semibold transition-colors duration-200",
        roundbase: "p-2  items-center justify-center",

    primary: "bg-[#6D8B74] text-white hover:bg-[#57715C]",
    secondary: "bg-gray-200 text-gray-800 hover:bg-gray-300",
    round: "w-16 h-16 rounded-full  bg-[#f5eee7] items-center justify-center ",
  },
  titles: {
    sm: "text-xl font-semibold",
    md: "text-2xl font-bold",
    lg: "text-4xl font-extrabold",
  },
  text: {
    base: "text-base text-gray-700",
    secondary: "text-sm text-gray-500",
  },
  containers: {
    box: "p-6 rounded-lg shadow-lg bg-[#f5eee7]",
contentBlock: "flex flex-col items-center my-12 bg-[#f5eee7]",
    card: "overflow-hidden rounded-lg shadow-lg bg-white flex flex-col",
    cardContent: "p-6 flex flex-col gap-4",
  },
  images: {
    default: "w-full rounded-lg shadow-lg",
  },
};

/* -------------------- Button -------------------- */
interface ButtonProps {
  text: string;
  href?: string;
  onClick?: () => void;
  variant?: 'primary' | 'secondary';
  className?: string;
}

export function Button({ text, href, onClick, variant = 'primary', className = '' }: ButtonProps) {
  const style = `${TW.buttons.base} ${variant === 'primary' ? TW.buttons.primary : TW.buttons.secondary} ${className}`;
  return href
    ? <a href={href} className={style}>{text}</a>
    : <button onClick={onClick} className={style}>{text}</button>;
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

/* -------------------- Title -------------------- */
interface TitleProps {
  text: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function Title({ text, size = 'md', className = '' }: TitleProps) {
  return <h2 className={`${TW.titles[size]} ${className}`}>{text}</h2>;
}

/* -------------------- Image -------------------- */
interface ImageProps {
  src: string;
  alt: string;
  className?: string;
}

export function Image({ src, alt, className = '' }: ImageProps) {
  return <img src={src} alt={alt} className={`${TW.images.default} ${className}`} />;
}

/* -------------------- Box -------------------- */
interface BoxProps {
  children: any;
  className?: string;
}

export function Box({ children, className = '' }: BoxProps) {
  return <div className={`${TW.containers.box} ${className}`}>{children}</div>;
}

/* -------------------- Card -------------------- */
interface CardProps {
  children: any;
  className?: string;
}

export function Card({ children, className = "" }: CardProps) {
  return <div className={`${TW.containers.card} ${className}`}>{children}</div>;
}

/* -------------------- CardContent -------------------- */
interface CardContentProps {
  children: any;
  className?: string;
}

export function CardContent({ children, className = "" }: CardContentProps) {
  return (
    <div className={`${TW.containers.cardContent} ${className}`}>{children}</div>
  );
}

/* -------------------- ContentBlock -------------------- */
interface ContentBlockProps {
  title: string;
  text: string;
  imageSrc?: string;
  imageAlt?: string;
  buttonText?: string;
  buttonHref?: string;
  reverse?: boolean;
  className?: string;
}

export function ContentBlock({
  title,
  text,
  imageSrc,
  imageAlt = "",
  buttonText,
  buttonHref,
  reverse = false,
  className = "",
}: ContentBlockProps) {
  const flexDirection = reverse ? "md:flex-row-reverse" : "md:flex-row";

  return (
    <div className={`${TW.containers.contentBlock}flex-col ${className}`}>
{imageSrc && (
  <div className="relative w-full md:w-1/2 h-64 md:h-96 flex-shrink-0 rounded-lg overflow-hidden">
    {/* Actual image */}
    <img
      src={imageSrc}
      alt={imageAlt}
      className="w-full h-full object-cover"
    />

    {/* Gradient fade to content background */}
    <div className="absolute bottom-0 left-0 right-0 h-1/2  to-[#f5eee7]" />

    {/* Title overlay, positioned ~2/3 down */}
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center px-4">
      <Title text={title} size="md" className="text-white drop-shadow-lg" />

    </div>
        <div className="absolute top-3/4 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center px-4">

       {buttonText && buttonHref && <Button 
        text={buttonText} 
        href={buttonHref}
         />}
         </div>
  </div>
)}




    </div>
  );
}

// בתוך src/components/ui.tsx

interface ContactFormProps {
  lang: 'he' | 'en';
}

export function ContactForm({  lang }: ContactFormProps) {
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
      action={`/api/contact`}
      className="space-y-4 w-full"
    >
      {/* שדה שפה נסתר */}
      <input type="hidden" name="lang" value={lang} />

      <input
        type="text"
        name="name"
        placeholder={t.name}
        required
        className="w-full p-3 border rounded-md"
      />

      <input
        type="email"
        name="email"
        placeholder={t.email}
        className="w-full p-3 border rounded-md"
      />

      <input
        type="tel"
        name="phone"
        placeholder={t.phone}
        className="w-full  p-3 border rounded-md"
        dir = {lang == 'he' ? 'rtl' : 'ltr'}
      />

      <textarea
        name="message"
        placeholder={t.message}
        required
        className="w-full p-3 border rounded-md h-32"
      />

      <button
        type="submit"
        className={`${TW.buttons.base} ${TW.buttons.primary} w-full`}
      >
        {t.submit}
      </button>
    </form>
  );
}


