"use client";
import { ConnectButton } from "@rainbow-me/rainbowkit";

export function CustomConnectButton() {
	return (
		<ConnectButton.Custom>
			{({
				account,
				chain,
				openAccountModal,
				openChainModal,
				openConnectModal,
				mounted,
			}) => {
				const ready = mounted;
				const connected = ready && account && chain;

				return (
					<div
						{...(!ready && {
							"aria-hidden": true,
							style: {
								opacity: 0,
								pointerEvents: "none",
								userSelect: "none",
							},
						})}
					>
						{(() => {
							if (!connected) {
								return (
									<button
										onClick={openConnectModal}
										type="button"
										className="w-[14.19rem] h-[3.06rem] rounded-[1.88rem] bg-gradient-to-r from-purple-400 to-pink-600 text-white font-normal text-[1.5rem]"
									>
										Connect Wallet
									</button>
								);
							}

							if (chain.unsupported) {
								return (
									<button
										onClick={openChainModal}
										type="button"
										className="w-[14.19rem] h-[3.06rem] rounded-[1.88rem] bg-red-500 text-white font-normal text-[1.5rem]"
									>
										Wrong network
									</button>
								);
							}

							return (
								<div className="flex gap-3 items-center">
									<button
										onClick={openChainModal}
										className="flex items-center px-4 py-2 rounded-full bg-gray-800 text-white hover:bg-gray-700 transition-colors"
										type="button"
									>
										{chain.hasIcon && (
											<div
												className="w-5 h-5 rounded-full overflow-hidden mr-2"
												style={{ background: chain.iconBackground }}
											>
												{chain.iconUrl && (
													<img
														alt={chain.name ?? "Chain icon"}
														src={chain.iconUrl}
														className="w-5 h-5"
													/>
												)}
											</div>
										)}
										{chain.name}
									</button>

									<button
										onClick={openAccountModal}
										type="button"
										className="px-4 py-2 rounded-full bg-gray-800 text-white hover:bg-gray-700 transition-colors"
									>
										{account.displayName}
										{account.displayBalance
											? ` (${account.displayBalance})`
											: ""}
									</button>
								</div>
							);
						})()}
					</div>
				);
			}}
		</ConnectButton.Custom>
	);
}
