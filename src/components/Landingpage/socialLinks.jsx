import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";

const socialLinks = [
  { icon: <FaFacebook />, url: "https://facebook.com" },
  { icon: <FaTwitter />, url: "https://twitter.com" },
  { icon: <FaInstagram />, url: "https://instagram.com" },
  { icon: <FaLinkedin />, url: "https://linkedin.com" },
];

export default function SocialIcons() {
  return (
    <div className="flex gap-4">
      {socialLinks.map(({ icon, url }, i) => (
        <a
          key={i}
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-2xl hover:text-blue-500 transition"
        >
          {icon}
        </a>
      ))}
    </div>
  );
}
