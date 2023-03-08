// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/utils/Address.sol";
import "hardhat/console.sol";



contract Marketplace is ReentrancyGuard {
  using Counters for Counters.Counter;
  Counters.Counter private _itemIdCounter; //start from 1??
  Counters.Counter private _itemSoldCounter;
  
  address payable public marketOwner;
  uint256 public listingFee = 1;
    
  struct MarketItem {
    uint itemId;
    address nftContract;
    uint256 tokenId;
    address payable seller;
    address payable buyer;
    uint256 price;
    bool sold;
  }
  
  mapping(uint256 => MarketItem) private idToMarketItem;
  
  event MarketItemCreated (
    uint indexed itemId,
    address indexed nftContract,
    uint256 indexed tokenId,
    address seller,
    address buyer,
    uint256 price,
    bool list
  );
  
  event MarketItemSold (
    uint indexed itemId,
    address buyer
    );

  constructor() { marketOwner = payable (msg.sender); }


  /* Updates the listing price of the contract */
  function updateListingFee(uint _listingFee) public payable {
    require(marketOwner == msg.sender, "Only marketplace owner can update listing price.");
    listingFee = _listingFee;
  }
  /**
   * @dev Returns the listing fee of the marketplace
   */
  function getListingFee() public view returns (uint256) {
    return listingFee;
  }

  /**
   * @dev create a MarketItem for NFT sale on the marketplace.
   * 
   * List an NFT.
   */

  function createMarketItem(
    address nftContract,
    uint256 tokenId,
    uint256 price
    ) public payable nonReentrant {
        require(price > 0, "Price must be greater than 0");
        require(IERC721(nftContract).getApproved(tokenId) == address(this), "NFT must be approved to market");
        // require(msg.value == listingFee, "Fee must be equal to listing fee");

        _itemIdCounter.increment();
        uint256 itemId = _itemIdCounter.current();

        idToMarketItem[itemId] =  MarketItem(
          itemId,
          nftContract,
          tokenId,
          payable(msg.sender),
          payable(address(0)),
          price,
          true
        );
        
        // The NFT transfer to marketplace smart contract
        // IERC721(nftContract).transferFrom(msg.sender, address(this), tokenId);
            
        emit MarketItemCreated(
          itemId,
          nftContract,
          tokenId,
          msg.sender,
          address(0),
          price,
          true
        );
    }

  function deleteMarketItem(uint256 itemId) public nonReentrant {
    require(itemId <= _itemIdCounter.current(), "item not exists");
    require(idToMarketItem[itemId].list == true, "item must be on market");
    
    MarketItem storage item = idToMarketItem[itemId];
    require(IERC721(item.nftContract).ownerOf(item.tokenId) == msg.sender, "must be the owner");
    require(IERC721(item.nftContract).getApproved(item.tokenId) == address(this), "NFT must be approved to market");
    
    item.list = false;

    emit MarketItemSold(
      itemId,
      address(0)
    );

  }

  function marketItemSale(
    uint256 itemId
    ) public payable nonReentrant {
      MarketItem storage item = idToMarketItem[itemId]; //should use storge!!!!
      address nftContract = item.nftContract;
      uint tokenId = item.tokenId;
      uint price = item.price;
      bool list = item.list;
      require(msg.value == price, "Please submit the asking price in order to complete the purchase");
      require(IERC721(nftContract).getApproved(tokenId) == address(this), "NFT must be approved to market");
      require(list == true, "This Sale has alredy finished");

      IERC721(nftContract).transferFrom(item.seller, msg.sender, tokenId);
      // payable(marketOwner).transfer(listingFee);
      item.seller.transfer(msg.value);
      item.buyer = payable(msg.sender);
      item.list = false;
      _itemSoldCounter.increment();

      emit MarketItemSold(
        itemId,
        msg.sender
      );
    }
  
  // 
  /** from other docs
   * @dev Returns all unsold market items
   * condition: 
   *  1) sold == false
   *  2) buyer = 0x0
   *  3) still have approve 
   */

  function fetchMarketItems() public view returns (MarketItem[] memory) {
    uint itemCount = _itemIdCounter.current();
    uint unsoldItemCount = _itemIdCounter.current() - _itemSoldCounter.current();
    uint currentIndex = 0;

    MarketItem[] memory items = new MarketItem[](unsoldItemCount);
    for (uint i = 0; i < itemCount; i++) {
      if (idToMarketItem[i + 1].list == true) {
        uint currentId = i + 1;
        MarketItem storage currentItem = idToMarketItem[currentId];
        items[currentIndex] = currentItem;
        currentIndex += 1;
      }
    }
    return items;
  }
  
  // function fetchMyListedItems() public view returns (MarketItem[] memory) {
  //   MarketItem[] storage allItems = fetchMarketItems();
  //   MarketItem[] storage myListedItems = new MarketItem[];
  //   uint currentIndex = 0;

  //   for (uint i = 0; i < long.allItems[], i++){
  //     if (idToMarketItem[i + 1].buyer == msg.sender){
  //       uint currentId = i + 1;
  //       MarketItem storage currentItem = idToMarketItem[currentId];
  //       myListedItems[currentIndex] = currentItem;
  //       currentIndex += 1;
  //     }
  //   }
  //   return myListedItems; 
  // }

}

/// Thanks for inspiration: https://github.com/dabit3/polygon-ethereum-nextjs-marketplace/