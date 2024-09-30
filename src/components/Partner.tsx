import { Image } from "@nextui-org/react";

export function Partner() {
  return (
    <div>
      <div className="bg-text-gradient text-[2.25rem] font-normal font-kronaOne bg-clip-text text-transparent leading-[3.13rem] ml-[34.75rem] mt-[7.25rem]">
        Partner
      </div>
      <div className="mt-[3rem] w-[82rem]">
        <div className="flex items-start w-full gap-8">
          <div className="w-[18.75rem] ">
            <Image src="/images/Immutable.svg" alt="Immutable" />
          </div>
          <div className="w-[18.75rem] ">
            <Image src="/images/polygon.svg" alt="Polygon" />
          </div>
          <div className="w-[18.75rem]">
            <Image src="/images/solana.svg" alt="Solana" />
          </div>
          <div className="w-[18.75rem]">
            <Image src="/images/polkadot.svg" alt="polkadot" />
          </div>
        </div>
        <div className="flex items-end w-full gap-8 mt-[-1.5rem]">
          <div className="w-[18.75rem]">
            <Image src="/images/BNB.svg" alt="BNB Chain" />
          </div>
          <div className="w-[18.75rem]">
            <Image src="/images/AIgorand.svg" alt="AIgorand" />
          </div>
          <div className="w-[18.75rem]">
            <Image src="/images/tezos.svg" alt="Tezos" />
          </div>
          <div className="w-[18.75rem]">
            <Image src="/images/klaytn.svg" alt="Klaytn" />
          </div>
        </div>
      </div>
    </div>
  );
}
