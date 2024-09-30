import { Log, parseEventLogs, Address } from "viem";

type TokenAddress_Value = Record<Address, bigint>
type EOA_Address = Address

type TokenTransferMap = {
  from: Record<EOA_Address, TokenAddress_Value>,
  to: Record<EOA_Address, TokenAddress_Value>
}

type TransferLog = {
  from: Address,
  to: Address,
  value: bigint
}

export default function parseTokenTransferLogs(logs: Log[]) {
  const logsParsed = parseEventLogs({
    abi: [
      {
        type: 'event',
        name: 'Transfer',
        inputs: [
          {
            name: 'from',
            type: 'address',
            indexed: true,
            internalType: 'address',
          },
          {
            name: 'to',
            type: 'address',
            indexed: true,
            internalType: 'address',
          },
          {
            name: 'value',
            type: 'uint256',
            indexed: false,
            internalType: 'uint256',
          },
        ],
        anonymous: false,
      },
    ],
    logs,
    eventName: 'Transfer',
  });
  const result = {
    from: {}, to: {}
  } as TokenTransferMap
  logsParsed.forEach(log => {
    const arg = log.args as TransferLog
    if (!result.from[arg.from]) {
      result.from[arg.from] = {
        [log.address]: arg.value
      }
    } else {
      result.from[arg.from][log.address] = arg.value
    }

    if (!result.to[arg.to]) {
      result.to[arg.to] = {
        [log.address]: arg.value
      }
    } else {
      result.to[arg.to][log.address] = arg.value
    }
  })
  return result
}