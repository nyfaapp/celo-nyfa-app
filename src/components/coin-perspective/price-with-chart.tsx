"use client";

interface CoinPerspectiveProps {
  coinId: string;
  vs?: string; // optional, defaults to bitcoin
  fx?: string; // optional, defaults to USD
  theme?: "auto" | "light" | "dark"; // optional, defaults to auto
}

export default function PriceWithChart({
  coinId,
  vs = "bitcoin",
  fx = "USD",
  theme = "auto",
}: CoinPerspectiveProps) {
  const iframeUrl = `https://thecoinperspective.com/widgets/coin?c=${coinId}&vs=${vs}&fx=${fx}&stats=false&theme=${theme}`;

  return (
    <iframe
      src={iframeUrl}
      height="380"
      style={{
        border: "none",
        paddingLeft: "12px",
        paddingRight: "12px",
        width: "100%",

      }}
      allowTransparency={true}
      onLoad={(e) => {
        const iframe = e.target as HTMLIFrameElement;
        if (iframe.contentWindow) {
          iframe.style.height =
            iframe.contentWindow.document.body.scrollHeight + 20 + "px";
        }
        
      }}
    />
  );
}
