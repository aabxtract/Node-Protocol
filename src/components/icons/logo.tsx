import Image from 'next/image';

export default function Logo(props: { className?: string }) {
  return (
    <Image
      src="/nodeprotocol.png"
      alt="Node Protocol Logo"
      width={43}
      height={43}
      className={props.className}
    />
  );
}
