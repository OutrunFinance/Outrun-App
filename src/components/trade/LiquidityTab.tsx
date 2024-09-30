import { liquidityTableColumns } from "@/constants";
import {
  getKeyValue,
  Image,
  Input,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";
import PaginationCustom from "../PaginationCustom";

export default function LiquidityTab() {
  const searchHandler = (value: string) => {};
  const rows = [
    { id: "1", pool: "usdb/oreth" },
    { id: "2", pool: "usdb/oreth" },
    { id: "3", pool: "usdb/oreth" },
    { id: "4", pool: "usdb/oreth" },
  ];
  return (
    <div className="flex flex-col gap-y-12 items-center justify-center">
      <div className="bg-no-repeat bg-cover bg-[url('/images/liquidity-tab.png')] w-[82.47rem] h-[56.30rem]">
        <div className="w-full my-[1.69rem] mx-[2.06rem] flex justify-between">
          <Input
            placeholder="Search by Name, Symbol or Address"
            onValueChange={(value) => {
              searchHandler(value);
            }}
            classNames={{
              base: "rounded-[1.88rem] h-[2.5rem] text-white font-normal text-[0.88rem] leading-[1.25rem] font-verdana border-[0.03rem] border-[#504360] hover:bg-[#201937] bg-[#201937] w-[40.31rem]",
              input: "data-[hover=true]:bg-transparent group-data-[has-value=true]:text-wihte font-black",
              inputWrapper: "bg-transparent data-[hover=true]:bg-transparent group-data-[focus=true]:bg-transparent",
            }}
            startContent={<Image alt="search" src="/images/search.svg" />}
          />
        </div>
        <Table
          removeWrapper
          classNames={{
            th: "bg-transparent text-center border-b border-divider border-[#4A325D] border-opacity-[0.3]",
            tr: "border-divider border-[#4A325D] border-opacity-[0.3] outline-2",
            td: "text-center text-white",
          }}>
          <TableHeader columns={liquidityTableColumns}>
            {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
          </TableHeader>
          <TableBody items={rows} emptyContent={"No data"}>
            {(item) => (
              <TableRow key={item.id}>{(columnKey) => <TableCell>{getKeyValue(item, columnKey)}</TableCell>}</TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <PaginationCustom total={10} currentPage={1} pageSize={10} setCurrentPage={() => {}} />
    </div>
  );
}
