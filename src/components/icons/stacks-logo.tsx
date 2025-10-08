export default function StacksLogo(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <circle cx="12" cy="12" r="10" fill="hsl(var(--accent))" />
      <path
        d="M8 9.5L12 6l4 3.5"
        stroke="white"
        strokeWidth="2.5"
        strokeLinecap="square"
      />
      <path
        d="M8 14.5L12 18l4-3.5"
        stroke="white"
        strokeWidth="2.5"
        strokeLinecap="square"
      />
      <line
        x1="7"
        y1="12"
        x2="17"
        y2="12"
        stroke="white"
        strokeWidth="2.5"
        strokeLinecap="square"
      />
    </svg>
  );
}
