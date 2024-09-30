import { currencySelectList, type CurrencySelectListType } from "@/contracts/currencys";
import { Ether, Token, type Currency } from "@/packages/core";
import { fetchTokenByAddress } from "@/utils/erc20";
import {
  Button,
  Image,
  Input,
  Listbox,
  ListboxItem,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/react";
import { useEffect, useMemo, useState } from "react";
import { isAddress } from "viem";
import { useChainId, usePublicClient } from "wagmi";

export default function TokenSelect({
  onSelect,
  isDisabled,
  token,
  tokenList,
  tokenDisable,
  hiddenSearchInput,
}: {
  onSelect: (token: Currency) => void;
  token?: Currency;
  isDisabled?: boolean;
  tokenList?: CurrencySelectListType;
  tokenDisable?: Currency;
  hiddenSearchInput?: boolean;
}) {
  const chainId = useChainId();
  const publicClient = usePublicClient();

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [searchValue, setSearchValue] = useState("");
  const [list, setList] = useState<(Ether | Token)[]>();

  const tokenListOnChain = useMemo(() => {
    return (tokenList || currencySelectList).map((i) =>
      i === Ether ? Ether.onChain(chainId) : (i as { [chainId: number]: Token })[chainId],
    );
  }, [chainId]);

  useEffect(() => {
    setList(tokenListOnChain);
  }, [tokenListOnChain]);
  function handleSelect(token: Currency) {
    onSelect(token);
    onClose();
  }

  async function searchHandler(value: string) {
    setSearchValue(value);
    value = value.trim().toLocaleLowerCase();
    if (!value) return setList(tokenListOnChain);
    if (isAddress(value)) {
      const { name, symbol, decimals } = await fetchTokenByAddress(value, publicClient!);
      const newToken = new Token(chainId, value, decimals, symbol, name);
      setList([newToken]);
    } else {
      setList(list!.filter((i) => i.symbol && ~i.symbol.toLocaleLowerCase().indexOf(value)));
    }
  }

  return (
    <div>
      <Button isDisabled={isDisabled} onPress={onOpen} className="bg-transparent text-white px-0">
        <div className="flex items-center h-[2rem]">
          <img alt="icon" src="/images/select-token.svg" className="w-[1.59rem] h-[1.55rem] mr-4" />
          <span className="text-[1.25rem] leading-7">{token ? token.symbol : "Select Token"}</span>
          <img alt="arrow down" src="/images/arrow_down.svg" className="ml-[1rem]" />
        </div>
      </Button>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpen}
        onClose={onClose}
        classNames={{
          base: "w-[33.88rem] h-[35.5rem] bg-modal border-[0.06rem] rounded-[1.25rem] border-card shadow-card",
          header: "bg-title text-[1.5rem] leading-[1.88rem] font-kronaOne text-transparent bg-clip-text",
          closeButton: "active:bg-transparent hover:bg-transparent text-white mt-[0.56rem] mr-[0.56rem]",
          body: " text-white",
          backdrop: "backdrop-blur backdrop-opacity-100 bg-transparent",
        }}>
        <ModalContent>
          {() => (
            <div>
              <ModalHeader>SELECT TOKEN</ModalHeader>
              <ModalBody>
                {!hiddenSearchInput ? (
                  <Input
                    value={searchValue}
                    placeholder="Search by Name, Symbol or Address"
                    onValueChange={(value) => {
                      searchHandler(value);
                    }}
                    classNames={{
                      base: "rounded-[1.88rem] h-[2.5rem] text-white font-normal text-[0.88rem] leading-[1.25rem] font-verdana border-[0.03rem] border-[#504360] hover:bg-[#201937] bg-[#201937]",
                      input: "data-[hover=true]:bg-transparent group-data-[has-value=true]:text-wihte font-black",
                      inputWrapper:
                        "bg-transparent data-[hover=true]:bg-transparent group-data-[focus=true]:bg-transparent",
                    }}
                    startContent={<Image alt="search" src="/images/search.svg" />}
                  />
                ) : null}

                <Listbox
                  items={list}
                  disabledKeys={[tokenDisable?.name as string]}
                  classNames={{
                    base: "w-[29rem] ml-[-1.7rem]",
                    list: "max-h-[26rem] overflow-scroll",
                  }}>
                  {(item) => (
                    <ListboxItem
                      onPress={() => handleSelect(item)}
                      key={item.name as string}
                      startContent={<Image alt="icon" src="/images/select-token.svg" className="w-8 h-[2rem] mr-2" />}
                      classNames={{
                        base: "w-[28rem] data-[hover=true]:bg-[#EC19FF] data-[hover=true]:bg-opacity-5 data-[hover=true]:text-white rounded-0 px-[2rem]",
                      }}>
                      <div className="flex justify-between items-center h-[3.44rem] ">
                        <div className="flex flex-col font-avenir font-medium">
                          <span className="text-[1.13rem] leading-[1.56rem]">{item.name}</span>
                          <span className="text-[#696283] text-[0.88rem] leading-5">{item.symbol}</span>
                        </div>
                      </div>
                    </ListboxItem>
                  )}
                </Listbox>
              </ModalBody>
            </div>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
}
