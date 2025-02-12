// "use client";

// import { Box, Text } from "@chakra-ui/react";
// import { Avatar, Name } from "@coinbase/onchainkit/identity";

// import { Toaster, toaster } from "@/components/chakra/ui/toaster";

// import {
//   ConnectWallet,
//   Wallet,
//   WalletDropdown,
//   WalletDropdownDisconnect,
// } from "@coinbase/onchainkit/wallet";

// const OnchainKitWallet = () => {
//   return (
//     <>
//       <Toaster />

//       <Box>
//         <Wallet>
//           <ConnectWallet
//             text="Connect"
//             onConnect={() => {
//               toaster.create({
//                 description: "Connected",
//                 duration: 3000,
//                 type: "success",
//               });
//             }}
//           >
//             <Avatar className="h-6 w-6" />
//             <Name />
//           </ConnectWallet>
//           <WalletDropdown>
//             <WalletDropdownDisconnect />
//           </WalletDropdown>
//         </Wallet>
//       </Box>
//     </>
//   );
// };

// export default OnchainKitWallet;
