export default function BitcoinLogo(props: React.SVGProps<SVGSVGElement>) {
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
      <circle cx="12" cy="12" r="10" fill="hsl(var(--primary))" />
      <path
        d="M9.004 15.698h2.406c.49 0 .88-.133.88-.624c0-.491-.39-.624-.88-.624h-1.428V12.9h1.34c.49 0 .84-.134.84-.624c0-.491-.35-.624-.84-.624h-1.34v-1.1h1.428c.49 0 .88-.133.88-.624c0-.491-.39-.624-.88-.624H9.004v6.248zm1.534-5.024v1.1h1.183c.252 0 .594.04.594-.374c0-.333-.21-.374-.502-.374h-1.275zm0 2.224v1.1h1.41c.282 0 .633.04.633-.374c0-.333-.22-.374-.522-.374H10.538zM12 7.5v1.8M12 14.7v1.8M15 9.6h-2.438M15 12h-2.438"
        strokeWidth="1.5"
        stroke="#fff"
      />
    </svg>
  );
}
