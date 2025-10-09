import Image from 'next/image';

export default function Logo(props: { className?: string }) {
  return (
    <Image
      src="/nodeprotocol.png"
      alt="Node Protocol Logo"
      width={86}
      height={86}
      className={props.className}
    />
  );
}
