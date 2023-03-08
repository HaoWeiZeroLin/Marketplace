// Define an array of NFT objects
const nfts = [
  {
    title: 'NFT 1',
    image: 'https://gateway.pinata.cloud/ipfs/QmQdkCTUVBUj3vMJrit5VnCE7gfExBVcceYMyR15coqXCP/1.jpeg',
  },
  {
    title: 'NFT 2',
    image: 'https://gateway.pinata.cloud/ipfs/QmQdkCTUVBUj3vMJrit5VnCE7gfExBVcceYMyR15coqXCP/2.jpeg',
  },
  {
    title: 'NFT 3',
    image: 'https://gateway.pinata.cloud/ipfs/QmQdkCTUVBUj3vMJrit5VnCE7gfExBVcceYMyR15coqXCP/3.jpeg',
  },
  {
    title: 'NFT 4',
    image: 'https://files.worldwildlife.org/wwfcmsprod/images/Arctic_Fox/story_full_width/328lvt66c3_shutterstock_103864847.jpg',
  },
  {
    title: 'NFT 5',
    image: 'https://gateway.pinata.cloud/ipfs/QmQdkCTUVBUj3vMJrit5VnCE7gfExBVcceYMyR15coqXCP/5.jpeg',
  },
  {
    title: 'NFT 6',
    image: 'https://gateway.pinata.cloud/ipfs/QmQdkCTUVBUj3vMJrit5VnCE7gfExBVcceYMyR15coqXCP/6.jpeg',
  },
];

const nftContainer = document.querySelector(".nft-container");
nfts.forEach(nft => {
  const nftBlock = document.createElement("div");
  nftBlock.classList.add("nft-block");
  
  const nftImage = document.createElement("img");
  nftImage.src = nft.image;
  nftBlock.appendChild(nftImage);
  
  const nftTitle = document.createElement("div");
  nftTitle.classList.add("nft-title");
  nftTitle.innerText = nft.title;
  nftBlock.appendChild(nftTitle);
  
  nftContainer.appendChild(nftBlock);
});

// // Create a function to generate the HTML for an NFT block
// function createNftBlock(nft) {
//   const container = document.createElement('div');
//   container.classList.add('nft-block');

//   const image = document.createElement('img');
//   image.src = nft.image;

//   const title = document.createElement('div');
//   title.classList.add('nft-title');
//   title.innerText = nft.title;

//   container.appendChild(image);
//   container.appendChild(title);

//   return container;
// }

// // Add each NFT block to the webpage
// const container = document.getElementById('nft-container');
// for (const nft of nfts) {
//   const block = createNftBlock(nft);
//   container.appendChild(block);
// }



// // Display the NFTs on the webpage
// function displayNfts() {
//   // Get a reference to the NFT container element
//   const container = document.getElementById('nft-container');

//   // Loop through each NFT and create a new HTML element to display it
//   for (let i = 0; i < nfts.length; i++) {
//     const nft = nfts[i];

//     // Create a new HTML element to display the NFT
//     const nftElement = document.createElement('div');
//     nftElement.classList.add('nft');

//     // Add an image element to display the NFT image
//     const imageElement = document.createElement('img');
//     imageElement.src = nft.image;
//     nftElement.appendChild(imageElement);

//     // Add a title element to display the NFT title
//     const titleElement = document.createElement('div');
//     titleElement.classList.add('nft-title');
//     titleElement.textContent = nft.title;
//     nftElement.appendChild(titleElement);

//     // Add the NFT element to the webpage
//     container.appendChild(nftElement);
//   }
// }

// // Call the displayNfts function when the page finishes loading
// window.addEventListener('load', displayNfts);


/*
const PINATA_API_KEY = "7bd1fe7361de0567451d";
const PINATA_SECRET_API_KEY = "79433316c1d2e7f2dd6d9869048b474648bb0ba45cbac69e89b9743a2aff4fde";
const btnUpload = document.getElementById('btnUpload');


btnUpload.addEventListener('click', async function(){


  // Create a FormData object to send the file data
  const formData = new FormData();
  formData.append("file", image);
  
  const response = await fetch("https://api.pinata.cloud/pinning/pinFileToIPFS", {
    method: "POST",
    headers: {
      "pinata_api_key": PINATA_API_KEY,
      "pinata_secret_api_key": PINATA_SECRET_API_KEY
    },
    body: formData
  });

  const result = await response.json();
  const imgHash = result.IpfsHash;
  
  // Display the IPFS hash on the page
  document.getElementById("imgHash").textContent += `${imgHash}`;

  // Upload title and note to IPFS
  const title = document.getElementById("title");
  const note = document.getElementById("note"); 

  const metadata = JSON.stringify({ tie: title.value, noe: note.value });
  const metadataBlob = new Blob([metadata], { type: "application/json" });
  const metadataFormData = new FormData();

  metadataFormData.append("file", metadataBlob, title.value + ".json");

  const metadataResponse = await fetch("https://api.pinata.cloud/pinning/pinFileToIPFS", {
    method: "POST",
    headers: {
      "pinata_api_key": PINATA_API_KEY,
      "pinata_secret_api_key": PINATA_SECRET_API_KEY
    },
    body: metadataFormData
  });

  const metadataResult = await metadataResponse.json();
  const metadataIpfsHash = metadataResult.IpfsHash;
  
  // Display the IPFS hash on the page
  document.getElementById("jsonHash").textContent += `${metadataIpfsHash}`;
});
*/

/* --------------------------- */

const btnConnect = document.getElementById('btnConnect');
const metamaskStatus = document.getElementById('metamaskStatus');

// Add a click event listener to the Connect button
btnConnect.addEventListener('click', async () =>{
  // Check whether Metamask is installed and enabled

  if (window.ethereum) {
    metamaskStatus.style.whiteSpace = "pre-wrap";
    metamaskStatus.innerHTML += 'Metamask is installed and enabled. \n';
    
    // Request permission to access the user's accounts
    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
    const account = accounts[0];

    // Log the user's account address to the text area
    metamaskStatus.textContent += `Connected to account: ${account}. \n`;
    
    window.ethereum.request({
      method: 'wallet_addEthereumChain',
      params: [
        {
          chainId: '0x5',
          chainName: 'Goerli',
          rpcUrls: ['https://goerli.infura.io/v3/10c15cfe3ed241eeac127f2c3acfefc9'],
          nativeCurrency: {
            name: 'GöETH',
            symbol: 'GöETH',
            decimals: 18,
          },
        },
      ],
    });


  } else {
    metamaskStatus.textContent += `Metamask is not installed or enabled.\n`;
    alert ('Metamask is not installed or enabled.\n');
  }
});


// /* --------------------------- */

// /* */
// // const { ethers } = require('ethers');
// // import { ethers } from "ethers";

// // const Web3 = require("web3.js");
// // import W3 from 'web3';
// // import Web3 from '../node_modules/web3';
// // import Web3 from "https://cdn.jsdelivr.net/npm/web3@1.3.5/dist/web3.min.js";
// // const web3 = new window.ethereum("https://goerli.infura.io/v3/10c15cfe3ed241eeac127f2c3acfefc9");


// const connectStatus = document.getElementById('connectStatus');
//to make /n work
// connectStatus.style.whiteSpace = "pre-wrap";

const contractAddress = "0x277ecfc14506c70e37335de452C7f55f0B759857";
/* const contractAbi = [
	{
		"inputs": [],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "owner",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "approved",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "Approval",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "owner",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "operator",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "bool",
				"name": "approved",
				"type": "bool"
			}
		],
		"name": "ApprovalForAll",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "previousOwner",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "newOwner",
				"type": "address"
			}
		],
		"name": "OwnershipTransferred",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "from",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "Transfer",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "approve",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "owner",
				"type": "address"
			}
		],
		"name": "balanceOf",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "baseExtension",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "baseURI",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "burn",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "getApproved",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "owner",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "operator",
				"type": "address"
			}
		],
		"name": "isApprovedForAll",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "mint",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "name",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "nextTokenId",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "owner",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "ownerOf",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "renounceOwnership",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "from",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "safeTransferFrom",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "from",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			},
			{
				"internalType": "bytes",
				"name": "data",
				"type": "bytes"
			}
		],
		"name": "safeTransferFrom",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "operator",
				"type": "address"
			},
			{
				"internalType": "bool",
				"name": "approved",
				"type": "bool"
			}
		],
		"name": "setApprovalForAll",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "bytes4",
				"name": "interfaceId",
				"type": "bytes4"
			}
		],
		"name": "supportsInterface",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "symbol",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "index",
				"type": "uint256"
			}
		],
		"name": "tokenByIndex",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "owner",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "index",
				"type": "uint256"
			}
		],
		"name": "tokenOfOwnerByIndex",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "tokenURI",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "totalSupply",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "from",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "transferFrom",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "newOwner",
				"type": "address"
			}
		],
		"name": "transferOwnership",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	}
];
// import { contractAbi } from './NWMAbi.js'; */

//Create a new provider using the user's Ethereum provider
// const provider = new ethers.providers.Web3Provider(window.ethereum);
// Create a new signer using the provider and the user's Ethereum account
// const signer = provider.getSigner();
// Initialize contract object
// const mintContract = new ethers.Contract(contractAddress, contractAbi, signer);
// connectStatus.textContent += `${contractAddress} \n`;
// connectStatus.textContent += "yo";
// const btnMint = document.getElementById('btnMint');

// btnMint.addEventListener('click', async () => {
//   try{
//     // Mint NFT
//     // const result = await mintContract.methods.mint().send({ from: account });
//     const transaction = await mintContract.mint();
//     // Wait for the transaction to be mined
//     const receipt = await transaction.wait();
//     const tokenId = receipt.events[0].args.tokenId.toNumber();
//     mintStatus.textContent += `Token Id: ${tokenId} \n`;
//     mintStatus.textContent += `Transaction Hash: ${receipt.transactionHash} \n`;
//     // Update the DB json
//     const gitHubToken = "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";
//     const gitHubUrl = 'https://api.github.com/repos/HaoWeiZeroLin/HaoWeiZeroLin.github.io/contents/DBjsons/DB' + tokenId + '.json';
    
//     // fetch gitHubUrl data and retrieve the content and sha
//     const response = await fetch(`${gitHubUrl}`);
//     const data = await response.json();
//     const oldJson =  JSON.parse(atob(data.content));
//     console.log("oldJson:", JSON.stringify(oldJson, null, 2));
//     const dataSha = data.sha;
//     console.log("SHA value:", dataSha);

//     // get user input, combine with old json content
//     const title = document.getElementById("title");
//     const note = document.getElementById("note"); 
//     const newData = { token: tokenId, title: title.value, note: note.value };
//     const merge = { ...newData, ...oldJson};
//     // Convert the JSON object to a string
//     const jsonString = JSON.stringify(merge, null, 2);

//     // put the new json back to the github 
//     fetch(`${gitHubUrl}`, {
//       method: "PUT",
//       headers: {
//         Authorization: `token ${gitHubToken}`,
//         'Content-Type': 'application/json'
//       },
//       body: JSON.stringify({
//         message: "Update DB"+ tokenId,
//         content: btoa(jsonString),
//         sha: dataSha
//       })
//     });

//     mintStatus.textContent += "DB" + tokenId + " is updated \n";

 
//   } catch (err) {
//     mintStatus.textContent = "Error: " + err.message;
//   }


// });


