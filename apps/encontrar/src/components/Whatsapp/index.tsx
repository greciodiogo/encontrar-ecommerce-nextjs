import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const ChatBot = () => {
  return (
    <Link target="_blank" className="chatBot" href="https://api.whatsapp.com/send?phone=244935016838">
      <Image
        alt="whatsapp"
        height={150}
        width={150}
        src="/assets_ecommerce/svg/whatsapp-svgrepo-com-1.svg"
        sizes="30vw"
        priority
        className="avatar"
      />
    </Link>
  );
};

export default ChatBot;
