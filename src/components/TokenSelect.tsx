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
import { ArrowLeft, Search } from "lucide-react";

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
          base: "w-full max-w-md bg-gray-900 border border-gray-800 rounded-lg",
          header: "border-b border-gray-800 p-4",
          closeButton: "hidden",
          body: "p-0",
        }}
      >
        <ModalContent>
          {() => (
            <>
              <ModalHeader>
                <Button
                  onPress={onClose}
                  className="bg-transparent p-0 min-w-0"
                  startContent={<ArrowLeft className="text-white" />}
                >
                  <span className="text-white ml-2">Back</span>
                </Button>
              </ModalHeader>
              <ModalBody>
                <div className="p-4">
                  {!hiddenSearchInput && (
                    <Input
                      value={searchValue}
                      placeholder="Search token name or paste address"
                      onValueChange={(value) => {
                        searchHandler(value);
                      }}
                      classNames={{
                        base: "bg-gray-800 border border-gray-700 rounded-xl",
                        input: "text-purple-300 placeholder:text-gray-500",
                      }}
                      startContent={<Search className="text-purple-400" />}
                    />
                  )}
                </div>
                <div className="px-4 pb-4">
                  <div className="flex justify-between text-purple-300 mb-2">
                    <span>Token</span>
                    <span>Balance</span>
                  </div>
                  <Listbox
                    items={list}
                    disabledKeys={[tokenDisable?.name as string]}
                    classNames={{
                      base: "p-0 gap-0",
                      list: "max-h-[400px] overflow-auto",
                    }}
                  >
                    {(item) => (
                      <ListboxItem
                        key={item.name as string}
                        onPress={() => handleSelect(item)}
                        className="p-2 hover:bg-purple-900/30 transition-colors duration-200"
                      >
                        <div className="flex justify-between items-center">
                          <div className="flex items-center">
                            <Image
                              alt="icon"
                              src="/images/select-token.svg"
                              className="w-8 h-8 mr-3 rounded-full"
                            />
                            <div className="flex flex-col items-start">
                              <span className="text-purple-300 text-base">{item.symbol}</span>
                              <span className="text-gray-400 text-sm">{item.name}</span>
                            </div>
                          </div>
                          <span className="text-purple-300">0</span>
                        </div>
                      </ListboxItem>
                    )}
                  </Listbox>
                </div>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
}