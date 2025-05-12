import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const ChatBot = () => {
  return (
    <Link className="chatBot" href="https://api.whatsapp.com/send?phone=244934992090">
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
