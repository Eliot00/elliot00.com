import Link from 'next/link';
import React from 'react';

interface Props {
  slug: string,
  title: string,
}

const Copyright: React.FC<Props> = ({ slug, title }) => {
  const selfUrl = `https://elliot00.com/posts/${slug}`;
  return (

    <div className="bg-yellow-50 p-4 rounded flex items-start text-yellow-600 my-4 shadow-md mx-auto">
      <div className="text-lg">
        <svg xmlns="http://www.w3.org/2000/svg" className="fill-current w-5 pt-1" viewBox="0 0 24 24"><path d="M12 1l-12 22h24l-12-22zm-1 8h2v7h-2v-7zm1 11.25c-.69 0-1.25-.56-1.25-1.25s.56-1.25 1.25-1.25 1.25.56 1.25 1.25-.56 1.25-1.25 1.25z" /></svg>
      </div>
      <div className=" px-3">
        <div className="text-yellow-800 font-semibold tracking-wider">
          版权声明
        </div>
        <p className="pt-2 text-yellow-700">
          标题：<a href={selfUrl} className="link hover:underline">{title}</a>
          <br />
          作者：<Link href="/about"><a className="link hover:underline">Elliot (公子政)</a></Link>
          <br />
          链接：<a href={selfUrl} className="link hover:underline">{selfUrl}</a>
          <br />
          许可协议：<a href="https://creativecommons.org/licenses/by-nc-sa/4.0/" className="link hover:underline">署名-非商业性使用-相同方式共享 4.0 国际</a>
        </p>
      </div>
    </div>
  );
};

export default Copyright
