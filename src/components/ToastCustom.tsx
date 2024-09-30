import { Image } from "@nextui-org/react";

export default function ToastCustom({
  content,
}: Readonly<{
  content: React.ReactNode;
}>) {
  return (
    <div className="flex items-center bg-notification text-white font-medium font-avenir text-[1.06rem] leading-[1.47rem] h-[3.47rem] rounded-[5.88rem] border-solid border-[0.06rem] border-[#7C5FAC] border-opacity-[0.5] pl-4 pr-12">
      <div className="bg-[#2F316A] w-[2.18rem] h-[2.18rem] flex justify-center items-center rounded-full mr-8">
        <Image alt="notification" src="/images/notification.svg" />
      </div>
      <div>{content}</div>
    </div>
  );
}
