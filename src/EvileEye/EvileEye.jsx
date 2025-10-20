import React, { useContext, useState } from "react";
import { Heart, ShoppingBag, X } from "lucide-react";
import { CartContext } from "../CartContext";
import { FavoritesContext } from "../FavoritesProvider";
import { AuthContext } from "../AuthProvider";
import { useNavigate } from "react-router-dom";
import NavBar from "../NavBar/NavBar";


import { BsFacebook, BsInstagram, BsTwitter } from "react-icons/bs";
import Footerr from "../Footerr/Footerr";

// BabeShark images
const imagesPage1 = [
 { id: 36, name: "Sky Evile Eye", price: 130, oldPrice: 160, src: "/top pick photos/photo_11_2025-10-10_07-18-14.jpg" },
  { id: 37, name: "Blue Evile Eye", price: 130, oldPrice: 160, src: "/top pick photos/photo_12_2025-10-10_07-18-14.jpg" },
  { id: 38, name: "Pink Evile Eye", price: 130, oldPrice: 160, src: "/top pick photos/photo_13_2025-10-10_07-18-14.jpg" },
  { id: 39, name: "Black Evile Eye", price: 130, oldPrice: 160, src: "/top pick photos/photo_14_2025-10-10_07-18-14.jpg" },
  { id: 40, name: "Special Evile Eye", price: 130, oldPrice: 160, src: "/top pick photos/photo_15_2025-10-10_07-18-14.jpg" },
  { id: 41, name: "Special Evile Eye", price: 130, oldPrice: 160, src: "/top pick photos/photo_16_2025-10-10_07-18-14.jpg" },
 
];


// Phone Brands & Models
const phoneBrands = {
  "Apple":  [
    "iPhone 17 Pro Max",
    "iPhone 17 Air",
    "iPhone 17",
    "iPhone 17 Pro",
  "iPhone 11",
  "iPhone 11 Pro",
  "iPhone 11 Pro Max",
  "iPhone 12",
  "iPhone 12 Mini",
  "iPhone 12 Pro",
  "iPhone 12 Pro Max",
  "iPhone 13",
  "iPhone 13 Mini",
  "iPhone 13 Pro",
  "iPhone 13 Pro Max",
  "iPhone 14",
  "iPhone 14 Max",
  "iPhone 14 Plus",
  "iPhone 14 Pro",
  "iPhone 14 Pro Max",
  "iPhone 15",
  "iPhone 15 Plus",
  "iPhone 15 Pro",
  "iPhone 15 Pro Max",
  "iPhone 16",
  "iPhone 16 Plus",
  "iPhone 16 Pro",
  "iPhone 16 Pro Max",
  "iPhone 4",
  "iPhone 5",
  "iPhone 5 SE",
  "iPhone 6 / 6s",
  "iPhone 6 Plus / 6s Plus",
  "iPhone 7 / 8",
  "iPhone 7 Plus / 8 Plus",
  "iPhone SE 2020",
  "iPhone X / Xs",
  "iPhone XR",
  "iPhone XS Max"
],
  "Samsung": [ "Samsung M55",
  "Samsung A01",
  "Samsung A01 Core",
  "Samsung A02",
  "Samsung A02s",
  "Samsung A03",
  "Samsung A03 Core",
  "Samsung A03s",
  "Samsung A04",
  "Samsung A04e",
  "Samsung A04s",
  "Samsung A05",
  "Samsung A05s",
  "Samsung A06",
  "Samsung A10",
  "Samsung A10s",
  "Samsung A11",
  "Samsung A12",
  "Samsung A13 4G",
  "Samsung A13 5G",
  "Samsung A14",
  "Samsung A15 4G",
  "Samsung A15 5G",
  "Samsung A16",
  "Samsung A20",
  "Samsung A20s",
  "Samsung A21",
  "Samsung A21s",
  "Samsung A22 4G",
  "Samsung A22 5G",
  "Samsung A23 4G",
  "Samsung A23 5G",
  "Samsung A24",
  "Samsung A25",
  "Samsung A26",
  "Samsung A30",
  "Samsung A30s",
  "Samsung A31",
  "Samsung A32 4G",
  "Samsung A32 5G",
  "Samsung A33",
  "Samsung A34 4G",
  "Samsung A34 5G",
  "Samsung A35 (4G/5G)",
  "Samsung A36",
  "Samsung A40s",
  "Samsung A42",
  "Samsung A5",
  "Samsung A5 2016",
  "Samsung A5 2018",
  "Samsung A50",
  "Samsung A50s",
  "Samsung A51",
  "Samsung A52",
  "Samsung A52s",
  "Samsung A53",
  "Samsung A54",
  "Samsung A55 4G",
  "Samsung A55 5G",
  "Samsung A56",
  "Samsung A6 2018",
  "Samsung A6 Plus",
  "Samsung A7 2014",
  "Samsung A7 2016",
   "Samsung A7 2017",
  "Samsung A7 2018",
  "Samsung A70",
  "Samsung A71",
  "Samsung A72",
  "Samsung A73",
  "Samsung A8 2018",
  "Samsung A8 Plus",
  "Samsung A80",
  "Samsung A9 2018",
  "Samsung A90",
  "Samsung C9",
  "Samsung C9 Pro",
  "Samsung F23 5G",
  "Samsung Galaxy G530",
  "Samsung Grand 2 G7106",
  "Samsung Grand Prime",
  "Samsung J1",
  "Samsung J2 Prime",
  "Samsung J2 Pro (2018)",
  "Samsung J3 2018",
  "Samsung J3 Pro",
  "Samsung J4 2018",
  "Samsung J4 Core",
  "Samsung J4 Plus",
  "Samsung J4 Prime",
  "Samsung J5",
  "Samsung J5 Prime",
  "Samsung J6 2018",
  "Samsung J6 Plus",
  "Samsung J6 Prime",
  "Samsung J7",
  "Samsung J7 Core",
  "Samsung J7 Neo",
  "Samsung J7 Prime",
  "Samsung J7 Pro",
  "Samsung J8",
  "Samsung M10s",
  "Samsung M11",
  "Samsung M12",
  "Samsung M13 4G",
  "Samsung M13 5G",
  "Samsung M20",
  "Samsung M22",
  "Samsung M23",
  "Samsung M30s",
  "Samsung M31",
  "Samsung M31s",
  "Samsung M32",
  "Samsung M33",
  "Samsung M34",
  "Samsung M35",
  "Samsung M40s",
  "Samsung M51",
  "Samsung M52",
  "Samsung M53",
  "Samsung M54",
  "Samsung M62",
  "Samsung Note 10",
  "Samsung Note 10 Lite",
  "Samsung Note 10 Plus",
  "Samsung Note 10 Pro",
  "Samsung Note 2",
  "Samsung Note 20",
  "Samsung Note 20 Ultra",
   "Samsung Note 3",
  "Samsung Note 4",
  "Samsung Note 5",
  "Samsung Note 7",
  "Samsung Note 8",
  "Samsung Note 9",
  "Samsung S10 4G",
  "Samsung S10 5G",
  "Samsung S10 Lite",
  "Samsung S10 Plus",
  "Samsung S10E",
  "Samsung S11",
  "Samsung S11 Plus",
  "Samsung S20",
  "Samsung S20 FE",
  "Samsung S20 Plus",
  "Samsung S20 Ultra",
  "Samsung S21",
  "Samsung S21 FE",
  "Samsung S21 Plus",
  "Samsung S21 Ultra",
  "Samsung S22",
  "Samsung S22 Plus",
  "Samsung S22 Pro",
  "Samsung S22 Ultra",
  "Samsung S23",
  "Samsung S23 FE",
  "Samsung S23 Plus",
  "Samsung S23 Ultra",
  "Samsung S24",
  "Samsung S24 FE",
  "Samsung S24 Plus",
  "Samsung S24 Ultra",
  "Samsung S25",
  "Samsung S25 Ultra",
  "Samsung S3",
  "Samsung S30 Ultra",
  "Samsung S4",
  "Samsung S5",
  "Samsung S6",
  "Samsung S6 Edge",
  "Samsung S6 Edge Plus",
  "Samsung S6 Plus",
  "Samsung S7",
  "Samsung S7 Edge",
  "Samsung S8",
  "Samsung S8 Plus",
  "Samsung S9",
  "Samsung S9 Plus"
],
  "Nokia":[
  "Nokia 1",
  "Nokia 2",
  "Nokia 2.1",
  "Nokia 2.2",
  "Nokia 2.3",
  "Nokia 2.4",
  "Nokia 3",
  "Nokia 3.1",
  "Nokia 3.1 Plus",
  "Nokia 3.2",
  "Nokia 4.2",
  "Nokia 5",
  "Nokia 5.1 Plus",
  "Nokia 5.3",
  "Nokia 5.4",
  "Nokia 6",
  "Nokia 6.1",
  "Nokia 6.1 Plus",
  "Nokia 6.2",
  "Nokia 7 Plus",
  "Nokia 7.2",
  "Nokia 8",
  "Nokia 8.1",
  "Nokia 9",
  "Nokia C1",
  "Nokia C10",
  "Nokia C2",
  "Nokia C20",
  "Nokia C21",
  "Nokia C21 Plus",
  "Nokia G10",
  "Nokia G20",
  "Nokia G21",
  "Nokia X10",
  "Nokia X20",
  "Nokia X30"
],
  "Huawie" :["Honor 10",
    "Honor 10Lite",
    "Honor 100",
    "Honor 100",
    "Honor 10i",
    "Honor 10x lite",
    "Honor 20",
    "Honor 20pro",
    "Honor 200",
    "Honor 200lite",
    "Honor 200pro",
    "Honor 400",
    "Honor 400 pro",
    "Honor 50",
    "Honor 50 lite",
    "Honor 50 se",
    "Honor 70",
    "Honor 70 Lite",
    "Honor 7x",
    "Honor 8",
    "Honor 8a",
    "Honor 8s",
    "Honor 8x",
    "Honor 8x max",
    "Honor 9",
    "Honor 9 Lite",
    "Honor 90",
    "Honor 90 lite ",
     "Honor 90 Smart",
     "Honor 9a",
     "Honor 9x",
     "Honor 9x lite",
     "Honor 9x Pro",
     "Honor Magic 5 Lite",
     "Honor Magic 6 Lite",
     "Honor Play",
     "Honor View 20",
     "Honor X5",
     "Honor X5 Plus",
     "Honor X50",
     "Honor X50 5G",
      "Honor X5b",
      "Honor X5b Plus",
      "Honor X6",
      "Honor X60 Pro",
      "Honor X6a",
      "Honor X6b",
      "Honor X7",
      "Honor X7A",
      "Honor X7b",
      "Honor X7c",
      "Honor X8 4g",
      "Honor X8 5g",
      "Honor X8A",
      "Honor X8b",
      "Honor X8c",
      "Honor X9 ( 4G/5G )",
      "Honor X9A",
      "Honor X9b",
      "Honor X9C",
      "Honor X9C Smart",
      "Huawei Gr3 2017",
      "Huawei Gr5",
      "Huawei Gr5 2017",
      "Huawei Mate 10",
      "Huawei Mate 10 lite",
      "Huawei Mate 10 Pro",
      "Huawei Mate 20",
      "Huawei Mate 20 lite",
      "Huawei Mate 20 Pro",
      "Huawei Mate 30",
      "Huawei Mate 30 lite",
      "Huawei Mate 30 Pro",
      "Huawei Mate 40 Pro",
      "Huawei Mate 50 Pro",
      "Huawei Mate 7",
      "Huawei Mate 8",
       "Huawei Mate 9",
       "Huawei Nova 10",
       "Huawei Nova 10 Se",
       "Huawei Nova 11",
       "Huawei Nova 11 Se",
       "Huawei Nova 11i",
       "Huawei Nova 12",
       "Huawei Nova 12i",
       "Huawei Nova 12SE",
        "Huawei Nova 13",
        "Huawei Nova 13 Pro",
        "Huawei Nova 2 Plus",
         "Huawei Nova 3",
         "Huawei Nova 30",
         "Huawei Nova 3i",
         "Huawei Nova 4",
          "Huawei Nova 6 Se",
          "Huawei Nova 7",
          "Huawei Nova 7 Se",
          "Huawei Nova 7i",
          "Huawei Nova 8",
          "Huawei Nova 8 Se",
          "Huawei Nova 8i",
          "Huawei Nova 9",
          "Huawei Nova 9 Se",
          "Huawei nova lite",
          "Huawei Nova y61",
          "Huawei Nova Y70",
          "Huawei Nova Y70 Plus",
          "Huawei nova Y71",
          "Huawei Nova y90",
          "Huawei Nova y91",
          "Huawei P Smart",
          "Huawei P Smart 2021",
           "Huawei P Smart Plus",
            "Huawei P10",
            "Huawei P10 lite",
            "Huawei P10 Plus",
            "Huawei P20",
            "Huawei P20 lite",
             "Huawei P20 Plus",
             "Huawei P20 Pro",
             "Huawei P30",
             "Huawei P30 lite",
             "Huawei P30 Pro",
             "Huawei P40 lite",
              "Huawei P40 Pro",
              "Huawei P50",
              "Huawei P50 Pro",
              "Huawei P60",
              "Huawei P60 Pro",
              "Huawei p8",
              "Huawei p8 lite",
              "Huawei P9",
              "Huawei P9 lite",
              "Huawei P9 Plus",
              "Huawei y3 2017",
              "Huawei y5 2017",
              "Huawei y5 2018",
              "Huawei Y5 2019",
              "Huawei Y5 Prime 2018",
              "Huawei y5p",
              "Huawei y6",
              "Huawei y6 2019",
              "Huawei Y6 Prime 2018",
              "Huawei Y6 Prime 2019",
               "Huawei y6-2",
               "Huawei Y6P",
               "Huawei Y6S",
               "Huawei Y7 2018",
               "Huawei y7 2019",
               "Huawei Y7 Prime 2018",
               "Huawei Y7 Prime 2019",
               "Huawei Y7A",
               "Huawei Y7P",
               "Huawei Y8S",
                "Huawei Y8р",
                "Huawei Y9 2018",
                "Huawei Y9 2019",
                "Huawei Y9 Prime 2019",
                "Huawei Y9A",
                "Huawei Y9S",
  ],
  "Infinix":[
  "infinix Gt 20 Pro X6871",
  "infinix Hot 11 Play",
  "infinix Hot 12 Play X6816",
  "infinix Hot 12 Pro X668",
  "infinix Hot 12 X6817",
  "infinix Hot 12i X665",
  "infinix Hot 20 X6826",
  "infinix Hot 20i X6655",
  "infinix Hot 20s X6827",
  "infinix Hot 3 X553",
  "infinix Hot 30 Play X6835",
  "infinix Hot 30 X6831",
  "infinix Hot 30i X699",
  "infinix Hot 40 Pro",
  "infinix Hot 40 X6837",
  "infinix Hot 40i",
  "infinix Hot 5 X559",
  "infinix Hot 50 X6720",
  "infinix Hot 50i",
  "infinix Hot 6 Pro X608",
  "infinix Hot 6 X606",
  "infinix Hot 6x X623",
  "infinix Hot 7 Pro X625",
  "infinix Hot 7 X624",
  "infinix Hot 9 ( X655 ) ( X656 )",
  "infinix Hot S X521",
  "infinix Note 10 / X693",
  "infinix Note 10 Pro / X695",
  "infinix Note 11",
  "infinix Note 11 Pro",
  "infinix Note 11s",
  "infinix Note 12 G96",
  "infinix Note 12i",
  "infinix Note 3 X601",
  "infinix Note 30 4G",
  "infinix Note 30 5G",
  "infinix Note 30 Pro 4G",
  "infinix Note 40 4g",
  "infinix Note 4O Pro Plus X6851",
  "infinix S4 X626",
  "infinix Smart 2 Pro X5514",
  "infinix Smart 2Hd X609",
  "infinix Smart 6 Plus X6823C",
  "infinix Smart 6 X6511",
  "infinix Smart 7 X6515",
  "infinix Smart 7HD X6516",
  "infinix Smart 8",
  "infinix Smart 9 X6531",
  "Infinix Smart HD 2021",
  "infinix Smart X5010",
  "infinix X522 / Hot S2 Pro",
  "infinix X5515 / Smart 2",
  "infinix X557 / Hot 4",
   "infinix X571 / Note 4 Pro",
  "infinix X572 / Note 4",
  "infinix X604 / Note 5",
  "infinix X612 / Smart HD",
  "infinix X627 / Smart 3 Plus",
  "infinix X650 / Hot 8",
  "infinix X653 / Smart 4",
  "infinix X657 / Smart 5",
  "infinix X660 / S5 Pro",
  "infinix X662 / Hot 11",
  "infinix X663 / Note 11",
  "infinix X680 / Hot 9 Play",
  "infinix X6812 / Hot 11s",
  "infinix X682 / Hot 10",
  "infinix X688 / Hot 10 Play",
  "infinix X689 / Hot 10s",
  "infinix X690 / Note 7",
  "infinix X692 / Note 8",
  "infinix Zero 30 4g X673",
  "infinix Zero 4 + X602",
  "infinix Zero5 X603",
  "infinix Zero8 X687"
],
"Oppo":[ "Oppo Reno 9 5g", "One Plus 10 Pro",
  "One Plus 10R 5G",
  "One Plus 10T",
  "One Plus 11",
  "One Plus 12",
  "One Plus 12R",
  "One Plus 6T",
  "One Plus 7 Pro",
  "One Plus 7T",
  "One Plus 8",
  "One Plus 8 Pro",
  "One Plus 8t",
  "One Plus 9",
  "One Plus 9 Pro",
  "One Plus 9R",
  "One Plus 9RT",
  "One Plus NORD",
  "One Plus NORD 2 5G",
  "One Plus NORD 2T 5G",
  "One Plus nord n10 5g",
  "OnePlus 11R",
 "Oppo A 1 Pro 5 G",
  "Oppo A1",
  "Oppo A12",
  "Oppo A15",
  "Oppo A15s",
  "Oppo A16",
  "Oppo A16k",
  "Oppo A16s",
  "Oppo A17",
  "Oppo A17 k",
  "Oppo A18",
  "Oppo A1K",
  "Oppo A2 5g",
  "Oppo A3",
  "Oppo A3 Pro",
  "Oppo A31",
  "Oppo A32",
  "Oppo A36",
  "Oppo A37",
  "Oppo A38",
  "Oppo A3s",
  "Oppo A3X",
  "Oppo A40",
  "Oppo A5 2020",
  "Oppo a5 pro",
  "Oppo A52",
  "Oppo A53",
  "Oppo A54",
  "Oppo A54 4g",
  "Oppo A54 5g",
  "Oppo A54s",
  "Oppo A55 4g",
   "Oppo A55 5g",
  "Oppo A57 (2016)",
  "Oppo A57 (2022)",
  "Oppo A57s",
  "Oppo A58 4g",
  "Oppo A58 5g",
  "Oppo A59",
  "Oppo A5S",
  "Oppo A60",
  "Oppo A60 4g",
  "Oppo A7",
  "Oppo A71",
  "Oppo A72",
  "Oppo A73",
  "Oppo A74 4g",
  "Oppo A74 5g",
  "Oppo A76 4g",
  "Oppo A77",
  "Oppo A77s",
  "Oppo A78 4g",
  "Oppo A78 5g",
  "Oppo A79",
  "Oppo A8",
  "Oppo A80",
  "Oppo A83",
  "Oppo A9 2020",
  "Oppo A91",
  "Oppo A92",
  "Oppo A93 4g",
  "Oppo A93 5g",
  "Oppo A94 4g",
  "Oppo A95 4g",
  "Oppo A96 4g",
  "Oppo A96 5g",
  "Oppo A98 5g",
  "Oppo F 25 Pro 5 G",
  "Oppo F1",
  "Oppo F11",
  "Oppo F11 Pro",
  "Oppo F15",
  "Oppo F19 pro",
  "Oppo F3",
  "Oppo F5",
  "Oppo F7",
  "Oppo F7 youth",
  "Oppo F9",
  "Oppo Find X",
  "Oppo Find X2",
  "Oppo Find X2 Pro",
  "Oppo Find X3",
  "Oppo Find X3 Pro",
  "Oppo Find X5",
  "Oppo Find X5 Pro",
  "Oppo Find X6",
  "Oppo Find X6 Pro",
  "Oppo Find X8",
  "Oppo Find X8 Pro",
  "Oppo k9",
  "Oppo Reno",
  "Oppo Reno 10 5g",
  "Oppo Reno 10 Pro 5g",
  "Oppo Reno 10 Pro Plus",
  "Oppo Reno 11 5g",
  "Oppo Reno 11F",
  "Oppo Reno 12",
   "Oppo Reno 12 Pro",
  "Oppo Reno 12f",
  "Oppo Reno 13 4G",
  "Oppo Reno 13 5g",
  "Oppo Reno 13 Pro",
  "Oppo Reno 13f",
  "Oppo Reno 13f 4G /5G",
  "Oppo Reno 2",
  "Oppo Reno 2F",
  "Oppo Reno 2Z",
  "Oppo Reno 3 4G",
  "Oppo Reno 3 5g",
  "Oppo Reno 3 Pro",
  "Oppo Reno 4",
  "Oppo Reno 4 Pro",
  "Oppo Reno 5 4G",
  "Oppo Reno 5 5G",
  "Oppo Reno 5 Lite",
  "Oppo Reno 5 Pro",
  "Oppo Reno 6 4g",
  "Oppo Reno 6 5g",
  "Oppo Reno 6 Pro 5g",
  "Oppo Reno 6 Pro Plus",
  "Oppo Reno 6z",
  "Oppo Reno 7 4g",
  "Oppo Reno 7 5g",
  "Oppo Reno 7 lite",
  "Oppo Reno 7 Pro",
  "Oppo Reno 7Z",
  "Oppo Reno 8 4G",
  "Oppo Reno 8 5G",
  "Oppo Reno 8 lite",
  "Oppo Reno 8 Pro",
  "Oppo Reno 8 Pro Plus",
  "Oppo Reno 8t 4g",
  "Oppo Reno 8t 5g",
  "Oppo Reno 8z"
],
"Realme":[ "Realme 1",
  "Realme 1 pro 5g",
  "Realme 10 4g",
  "Realme 10 5g",
  "Realme 10 Pro Plus",
  "Realme 10 Pro Plus 5g",
  "Realme 11 4G",
  "Realme 11 5g",
  "Realme 11 Pro",
  "Realme 11 Pro Plus",
  "Realme 12 4g",
  "Realme 12 5g",
  "Realme 12 Plus",
  "Realme 12 Plus 5g",
  "Realme 12 Pro",
  "Realme 12 Pro Plus",
  "Realme 12x",
  "Realme 13 4G",
  "Realme 13 5g",
  "Realme 13 Pro",
  "Realme 13 Pro Plus",
  "Realme 14 Pro Plus",
  "Realme 2Pro",
  "Realme 3",
  "Realme 3 Pro",
  "Realme 5",
  "Realme 5 Pro",
  "Realme 6",
  "Realme 6 Pro",
  "Realme 6i",
  "Realme 6s",
  "Realme 7",
  "Realme 7 Pro",
  "Realme 7i",
  "Realme 8",
  "Realme 8 4g",
  "Realme 8 5g",
  "Realme 8 i",
  "Realme 8 Pro",
  "Realme 9 4g",
  "Realme 9 Pro",
  "Realme 9 Pro Plus",
  "Realme 9i",
  "Realme 9i 5g",
  "Realme C1",
  "Realme C11 2020",
  "Realme C11 2021",
  "Realme C12",
  "Realme C15",
  "Realme C17",
  "Realme C2",
  "Realme C20",
  "Realme C20a",
  "Realme C21",
  "Realme C21y",
  "Realme C25",
  "Realme C25 y",
  "Realme C3",
  "Realme C30",
  "Realme C30s",
  "Realme C31",
  "Realme C33",
  "Realme C35",
  "Realme C51",
   "Realme C53",
  "Realme C55",
  "Realme C61",
  "Realme C63",
  "Realme C65 4G",
  "Realme C65 5G",
  "Realme C67 4G",
  "Realme C67 5G",
  "Realme C75",
  "Realme GT",
  "Realme GT 5 Pro",
  "Realme GT 6T",
  "Realme GT 7 Pro",
  "Realme GT Master",
  "Realme GT Neo 6",
  "Realme GT Neo 6 SE",
  "Realme GT Neo 5",
  "Realme GT5",
  "Realme GT6",
  "Realme Narzo 50A",
  "Realme Narzo 50i",
  "Realme Note 50",
  "Realme Note 60",
  "Realme Note 60x",
  "Realme X2 Pro",
  "Realme XT",
  "Realme Y1"

],
"Techno":[  "Tecno Camon 18",
  "Tecno Camon 18P",
  "Tecno Spark 2 (KA7)",
  "Tecno Spark 20",
  "Tecno Spark Go 2023",
  "Tecno Spark Go 2024"],
  "Vivo":[
     "Vivo 20",
  "Vivo S1",
  "Vivo Y91i",
  "Vivo S10E",
  "Vivo S12",
  "Vivo S16",
  "Vivo S16 Pro",
  "Vivo S17",
  "Vivo S17 Pro",
  "Vivo S18 5G",
  "Vivo S18 Pro 5G",
  "Vivo S19 Pro 5G",
  "Vivo V19",
  "Vivo V20",
  "Vivo V20 SE",
  "Vivo V21",
  "Vivo V21e 4G",
  "Vivo V21e 5G",
  "Vivo V23",
  "Vivo V23e",
  "Vivo V25",
  "Vivo V25E",
  "Vivo V27",
  "Vivo V27 Pro",
  "Vivo V27e",
  "Vivo V29",
  "Vivo V29 Pro",
  "Vivo V29e",
  "Vivo V30 Lite (4G)",
  "Vivo V30 Lite 5G",
  "Vivo V30 Pro 5G",
  "Vivo V30E",
  "Vivo V40",
  "Vivo V40 Lite",
  "Vivo V50",
  "Vivo V50 Lite",
  "Vivo V50E",
  "Vivo Y02 4G",
  "Vivo Y02A",
  "Vivo Y02s",
  "Vivo Y02T",
  "Vivo Y03 4G",
  "Vivo Y04",
  "Vivo Y04 4G",
  "Vivo Y10",
  "Vivo Y11",
  "Vivo Y11s",
  "Vivo Y12",
  "Vivo Y12s",
  "Vivo Y15",
  "Vivo Y15A",
  "Vivo Y15s",
  "Vivo Y16",
  "Vivo Y17",
  "Vivo Y17s",
  "Vivo Y18",
  "Vivo Y19",
  "Vivo Y19S",
  "Vivo Y1s",
  "Vivo Y20",
  "Vivo Y20i",
  "Vivo Y20s",
  "Vivo Y21",
  "Vivo Y21A",
   "Vivo Y21s",
  "Vivo Y22",
  "Vivo Y22 / Y22s",
  "Vivo Y22s",
  "Vivo Y27 (4G)",
  "Vivo Y27 (4G)s",
  "Vivo Y28 (4G)",
  "Vivo Y29",
  "Vivo Y29s 5G",
  "Vivo Y30",
  "Vivo Y33",
  "Vivo Y33a",
  "Vivo Y33s",
  "Vivo Y35 (4G)",
  "Vivo Y36",
  "Vivo Y50",
  "Vivo Y51",
  "Vivo Y52",
  "Vivo Y53s",
  "Vivo Y53s 4G",
  "Vivo Y72",
  "Vivo Y73 4G",
  "Vivo Y75",
  "Vivo Y78 5G",
  "Vivo Y78 Plus 5G",
  "Vivo Y90",
  "Vivo Y91c"
  ],
  "Xiaomi":[
      "Xiaomi Mi 10",
  "Xiaomi Mi 10 Lite 5G",
  "Xiaomi Mi 10 Pro",
  "Xiaomi Poco X4 Pro",
  "Xiaomi Mi 10T",
  "Xiaomi Mi 10T Lite",
  "Xiaomi Mi 10T Pro",
  "Xiaomi Mi 11",
  "Xiaomi Mi 11 Lite",
  "Xiaomi Mi 11 Ultra",
  "Xiaomi Mi 11i",
  "Xiaomi Mi 11T",
  "Xiaomi Mi 11T Pro",
  "Xiaomi Mi 12",
  "Xiaomi Mi 12 Pro",
  "Xiaomi Mi 12S",
  "Xiaomi Mi 12T",
  "Xiaomi Mi 12T Pro",
  "Xiaomi Mi 12X",
  "Xiaomi Mi 13",
  "Xiaomi Mi 13 Lite",
  "Xiaomi Mi 13T",
  "Xiaomi Mi 13T Pro",
  "Xiaomi Mi 14",
  "Xiaomi Mi 14 Pro",
  "Xiaomi Mi 14 Ultra",
  "Xiaomi Mi 14T 5G",
  "Xiaomi Mi 14T Pro 5G",
  "Xiaomi Mi 4A",
  "Xiaomi Mi 5X",
  "Xiaomi Mi 6X",
  "Xiaomi Mi 8",
  "Xiaomi Mi 8 Lite",
  "Xiaomi Mi 9",
  "Xiaomi Mi 9 Lite",
  "Xiaomi Mi 9T",
  "Xiaomi Mi 9T Pro",
  "Xiaomi Mi A2",
  "Xiaomi Mi A3",
  "Xiaomi Mi A3 2024",
  "Xiaomi Mi Max",
  "Xiaomi Mi Max 2",
  "Xiaomi Mi Max 3",
  "Xiaomi Mi Note 10 Lite",
  "Xiaomi Mi Note 10 Pro",
  "Xiaomi Mi Note 4",
  "Xiaomi Mi Note 4X",
  "Xiaomi Mi Note 5A",
  "Xiaomi Mi Note 5A Prime",
  "Xiaomi Mi Note 5A Y1 Lite",
  "Xiaomi Mi Note 5 Pro",
  "Xiaomi Mi X3",
  "Xiaomi Poco C40",
  "Xiaomi Poco C55",
  "Xiaomi Poco C65",
  "Xiaomi Poco C75 4G",
  "Xiaomi Poco F1",
  "Xiaomi Poco F2 Pro",
  "Xiaomi Poco F3",
  "Xiaomi Poco F3 GT",
  "Xiaomi Poco F4",
  "Xiaomi Poco F4 GT",
  "Xiaomi Poco F5",
  "Xiaomi Poco F5 Pro",
  "Xiaomi Poco F6 5G",
  "Xiaomi Poco F6 Pro 5G",
  "Xiaomi Poco M3",
  "Xiaomi Poco M3 Pro 4G",
  "Xiaomi Poco M4 5G",
  "Xiaomi Poco M4 Pro",
  "Xiaomi Poco M5",
  "Xiaomi Poco M6 Pro 4G",
  "Xiaomi Poco X3",
  "Xiaomi Poco X3 NFC",
  "Xiaomi Poco X3 Pro",
  "Xiaomi Poco X3 GT",
  "Xiaomi Poco X4 GT",
   "Xiaomi Poco X5 5G",
  "Xiaomi Poco X5 Pro",
  "Xiaomi Poco X6",
  "Xiaomi Poco X6 Pro",
  "Xiaomi Poco X7 Pro",
  "Xiaomi Redmi 10 4G",
  "Xiaomi Redmi 10A",
  "Xiaomi Redmi 10C",
  "Xiaomi Redmi 11A",
  "Xiaomi Redmi 12 4G",
  "Xiaomi Redmi 12 5G",
  "Xiaomi Redmi 12C",
  "Xiaomi Redmi 13",
  "Xiaomi Redmi 13 5G",
  "Xiaomi Redmi 13C",
  "Xiaomi Redmi 14C",
  "Xiaomi Redmi 5",
  "Xiaomi Redmi 5 Plus",
  "Xiaomi Redmi 6",
  "Xiaomi Redmi 6A",
  "Xiaomi Redmi 7",
  "Xiaomi Redmi 7A",
  "Xiaomi Redmi 8",
  "Xiaomi Redmi 8A",
  "Xiaomi Redmi 9",
  "Xiaomi Redmi 9A",
  "Xiaomi Redmi 9C",
  "Xiaomi Redmi 9T",
  "Xiaomi Redmi A1",
  "Xiaomi Redmi A1 Plus",
  "Xiaomi Redmi A2 Plus",
  "Xiaomi Redmi A3",
  "Xiaomi Redmi A5",
  "Xiaomi Redmi K30 Pro",
  "Xiaomi Redmi K40 S",
  "Xiaomi Redmi K40S",
  "Xiaomi Redmi Note 10 4G",
  "Xiaomi Redmi Note 10 5G",
  "Xiaomi Redmi Note 10 Pro",
  "Xiaomi Redmi Note 10 Pro 4G",
  "Xiaomi Redmi Note 10 Pro 5G",
  "Xiaomi Redmi Note 10 Pro MAX",
  "Xiaomi Redmi Note 10S",
  "Xiaomi Redmi Note 11 4G",
  "Xiaomi Redmi Note 11 5G",
  "Xiaomi Redmi Note 11 Pro +",
  "Xiaomi Redmi Note 11 Pro 4G/5G",
  "Xiaomi Redmi Note 11S 4G",
  "Xiaomi Redmi Note 12 4G",
  "Xiaomi Redmi Note 12 5G",
  "Xiaomi Redmi Note 12 Pro 4G",
  "Xiaomi Redmi Note 12 Pro 5G",
  "Xiaomi Redmi Note 12 Pro Plus",
  "Xiaomi Redmi Note 12 Turbo",
  "Xiaomi Redmi Note 12R 5G",
  "Xiaomi Redmi Note 12S",
  "Xiaomi Redmi Note 13 4G",
  "Xiaomi Redmi Note 13 5G",
  "Xiaomi Redmi Note 13 Pro 4G",
  "Xiaomi Redmi Note 13 Pro 5G",
  "Xiaomi Redmi Note 13 Pro Plus",
  "Xiaomi Redmi Note 13 Pro Plus 5G",
  "Xiaomi Redmi Note 13R",
  "Xiaomi Redmi Note 14 4G",
  "Xiaomi Redmi Note 14 5G",
   "Xiaomi Redmi Note 14 Pro 5G",
  "Xiaomi Redmi Note 14 Pro Plus",
  "Xiaomi Redmi Note 4",
  "Xiaomi Redmi Note 5",
  "Xiaomi Redmi Note 5A",
  "Xiaomi Redmi Note 5A Y1 Lite",
  "Xiaomi Redmi Note 5 Pro",
  "Xiaomi Redmi Note 6 Pro",
  "Xiaomi Redmi Note 7",
  "Xiaomi Redmi Note 7 Pro",
  "Xiaomi Redmi Note 7S",
  "Xiaomi Redmi Note 8",
  "Xiaomi Redmi Note 8 Pro",
  "Xiaomi Redmi Note 9",
  "Xiaomi Redmi Note 9 Pro",
  "Xiaomi Redmi Note 9S",
  "Xiaomi Redmi Y3"
  ]
};

const EvileEye = () => {
  const { addToCart } = useContext(CartContext);
  const { addToFavorites } = useContext(FavoritesContext);
  // const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [currentPage, setCurrentPage] = useState(1);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
const [showBrandDropdown, setShowBrandDropdown] = useState(false);
const [showModelDropdown, setShowModelDropdown] = useState(false);
  const [selectedBrand, setSelectedBrand] = useState("");
  const [selectedPhoneType, setSelectedPhoneType] = useState("");
  const [quantity, setQuantity] = useState(1);

  const currentImages = currentPage === 1 ? imagesPage1 : imagesPage1;

  const handleAddToCartClick = (product) => {
    // if (!user) {
    //   alert("You must log in first to add products to the cart.");
    //   navigate("/login");
    //   return;
    // }
    setSelectedProduct(product);
    setDrawerOpen(true);
  };

  const handleConfirmOrder = () => {
    if (!selectedBrand) return alert("Please choose a brand.");
    if (!selectedPhoneType) return alert("Please choose your phone model.");



addToCart({
  id: selectedProduct.id,
  name: selectedProduct.name,
  price: selectedProduct.price,
  image: selectedProduct.src,
  phoneBrand: selectedBrand,   // ✅ لازم الاسم كده بالضبط
  phoneModel: selectedPhoneType, // ✅ لازم الاسم كده كمان
  quantity,
});


    // Reset drawer state
    setDrawerOpen(false);
    setSelectedProduct(null);
    setSelectedBrand("");
    setSelectedPhoneType("");
    setQuantity(1);
  };

  return (
 <div className="bg-gradient-to-br from-gray-100 via-gray-200 to-gray-300 min-h-screen text-gray-900 font-sans">
      <div className="mb-1">
        <NavBar />
      </div>
<div className="h-20"></div>
      <div className="max-w-6xl mx-auto p-6 mt-20">
        <h1 className="text-3xl font-bold mb-8 text-center text-gray-800">
         Evile Eye Cases
        </h1>
{/* Images Grid */}
<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
  {currentImages.map((product, idx) => (
    <div key={idx} className="relative border rounded-lg overflow-hidden shadow hover:shadow-lg transition cursor-pointer">
      <img
        src={product.src}
        alt={`evileeye ${idx + 1}`}
        className="w-full h-auto object-cover transition-transform duration-300 hover:scale-105"
    onClick={(e) => {
      e.stopPropagation();
      if (product.id >= 1 && product.id <= 11) {
        navigate(`/laptopsleeve/${product.id}`);
      } else if (product.id >= 12 && product.id <= 17) {
        navigate(`/funnybagdetails/${product.id}`);
      } else if (product.id >= 18 && product.id <= 25) {
        navigate(`/minibagdetails/${product.id}`);
      } else {
        navigate(`/phonedetails/${product.id}`);
      }
    }}      />

      {/* اسم وسعر المنتج */}
      <div className="p-2 text-center bg-white">
        <h3 className="text-sm font-semibold text-gray-800">{product.name}</h3>
        <p className="text-gray-600">{product.price} EGP</p>
      </div>

      <div className="absolute top-2 right-2 flex flex-col gap-2">
        <button
          onClick={() => handleAddToCartClick(product)}
          className="bg-white p-2 rounded-full shadow hover:bg-gray-100"
        >
          <ShoppingBag size={18} />
        </button>
        <button
          onClick={() => addToFavorites({id:product.id, name: product.name, image: product.src, price: product.price })}
          className="bg-white p-2 rounded-full shadow hover:bg-gray-100"
        >
          <Heart size={18} />
        </button>
      </div>
    </div>
  ))}
</div>

        {/* Drawer */}
       {drawerOpen && selectedProduct && (
  <div className="fixed inset-0 z-50 flex">
    {/* خلفية شفافة */}
    <div
      className="fixed inset-0 bg-black/50"
      onClick={() => setDrawerOpen(false)}
    ></div>

    {/* الدروير نفسه */}
    <div className="bg-white w-96 h-full p-6 shadow-2xl fixed right-0 top-0 flex flex-col  overflow-y-auto">
      <button
        onClick={() => setDrawerOpen(false)}
        className="absolute top-4 left-4 p-2 rounded-full hover:bg-gray-100"
      >
        <X className="w-6 h-6" />
      </button>

      {/* Product Info */}
      <div className="flex flex-col items-center text-center mb-6">
        <img
          src={selectedProduct.src}
          alt="BabeShark Case"
          className="w-40 h-40 object-contain mb-4"
        />
        <h3 className="text-lg font-semibold">{selectedProduct.name}</h3>
        <p className="text-gray-600">{selectedProduct.price} EGP</p>
      </div>

      <h2 className="text-xl font-bold mb-5 text-gray-800">
        Choose your phone model
      </h2>

      {/* ✅ Brand */}
   {/* ✅ Brand Dropdown */}
<div className="mb-5 relative">
  <label className="block text-sm font-semibold text-gray-600 mb-2">
    Brand
  </label>

  <div
    onClick={() => {
      setShowBrandDropdown(!showBrandDropdown);
      setShowModelDropdown(false);
    }}
    className="w-full border rounded-xl p-3 bg-gray-50 cursor-pointer flex justify-between items-center"
  >
    <span>{selectedBrand || "Choose your phone brand"}</span>
    <span className="text-gray-400">▼</span>
  </div>

  {showBrandDropdown && (
    <div className="absolute z-50 bg-white border rounded-xl mt-1 w-full max-h-48 overflow-y-auto shadow-lg">
      {Object.keys(phoneBrands).map((brand) => (
        <div
          key={brand}
          onClick={() => {
            setSelectedBrand(brand);
            setSelectedPhoneType("");
            setShowBrandDropdown(false);
          }}
          className="p-3 hover:bg-blue-100 cursor-pointer text-gray-700"
        >
          {brand}
        </div>
      ))}
    </div>
  )}
</div>

{/* ✅ Model Dropdown */}
{selectedBrand && (
  <div className="mb-5 relative">
    <label className="block text-sm font-semibold text-gray-600 mb-2">
      Model
    </label>

    <div
      onClick={() => {
        setShowModelDropdown(!showModelDropdown);
        setShowBrandDropdown(false);
      }}
      className="w-full border rounded-xl p-3 bg-gray-50 cursor-pointer flex justify-between items-center"
    >
      <span>{selectedPhoneType || "Choose phone model"}</span>
      <span className="text-gray-400">▼</span>
    </div>

    {showModelDropdown && (
      <div className="absolute z-50 bg-white border rounded-xl mt-1 w-full max-h-48 overflow-y-auto shadow-lg">
        {phoneBrands[selectedBrand].map((model) => (
          <div
            key={model}
            onClick={() => {
              setSelectedPhoneType(model);
              setShowModelDropdown(false);
            }}
            className="p-3 hover:bg-blue-100 cursor-pointer text-gray-700"
          >
            {model}
          </div>
        ))}
      </div>
    )}
  </div>
)}

      {/* ✅ Quantity */}
      <div className="mb-5">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Quantity
        </label>
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
            className="w-9 h-9 flex items-center justify-center rounded-full border border-gray-300 text-gray-600 hover:bg-gray-100 transition"
          >
            -
          </button>
          <input
            type="number"
            min="1"
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
            className="w-16 text-center border border-gray-300 rounded-lg py-2 focus:ring-2 outline-none"
          />
          <button
            type="button"
            onClick={() => setQuantity(quantity + 1)}
            className="w-9 h-9 flex items-center justify-center rounded-full border border-gray-300 text-gray-600 hover:bg-gray-100 transition"
          >
            +
          </button>
        </div>
      </div>

      {/* ✅ Confirm Button */}
{/* ✅ Confirm + Buy Now Buttons */}
<div className="mt-auto flex flex-col gap-3">
  {/* Add to Cart */}
  <button
    onClick={() => {
      if (!selectedBrand) return alert("Please choose a brand.");
      if (!selectedPhoneType) return alert("Please choose your phone model.");

      addToCart({
        name: selectedProduct.name,
        price: selectedProduct.price,
        image: selectedProduct.src,
        brand: selectedBrand,
        model: selectedPhoneType,
        quantity,
      });

      setDrawerOpen(false);
      setSelectedProduct(null);
      setSelectedBrand("");
      setSelectedPhoneType("");
      setQuantity(1);
    }}
    className="w-full bg-black text-white py-3 font-thin rounded-lg shadow-md hover:scale-[1.02] transition-all"
  >
  Confirm Add To Cart
  </button>

  {/* Buy Now */}
  <button
    onClick={() => {
      if (!selectedBrand) return alert("Please choose a brand.");
      if (!selectedPhoneType) return alert("Please choose your phone model.");
const buyNowProduct = {
  id: selectedProduct.id,
  name: selectedProduct.name,
  image: selectedProduct.src,
  price: selectedProduct.price,
  phoneBrand: selectedBrand,
  phoneModel: selectedPhoneType,
  quantity,
};

localStorage.setItem("checkout_item", JSON.stringify(buyNowProduct));
setDrawerOpen(false);
navigate("/checkout");


localStorage.setItem("checkout_item", JSON.stringify(buyNowProduct));
setDrawerOpen(false);
navigate("/checkout");


      localStorage.setItem("checkout_item", JSON.stringify(buyNowProduct));
      setDrawerOpen(false);
      navigate("/checkout");
    }}
    className="w-full bg-[#56cfe1] text-white font-thin py-3 rounded-lg shadow-md hover:bg-orange-600 hover:scale-[1.02] transition-all"
  >
    Buy It Now
  </button>
</div>
    </div>
  </div>
)}

      </div>
            <div><Footerr/></div>
      
    </div>
  );
}

export default EvileEye