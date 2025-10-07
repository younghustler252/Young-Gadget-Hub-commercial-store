import { MdSmartphone, MdLaptopMac, MdWatch } from "react-icons/md";
import { FaHeadphones, FaGamepad, FaSpeakerDeck } from "react-icons/fa6";
import { HiMiniDevicePhoneMobile } from "react-icons/hi2";

export const categories = [
	{
		title: "Smartphones",
		slug: "smartphones",
		icon: MdSmartphone,
	},
	{
		title: "Laptops",
		slug: "laptops",
		icon: MdLaptopMac,
	},
	{
		title: "Smartwatches",
		slug: "smartwatches",
		icon: MdWatch,
	},
	{
		title: "Speakers",
		slug: "speakers",
		icon: FaSpeakerDeck,
	},
	{
		title: "Headsets",
		slug: "headsets",
		icon: FaHeadphones,
	},
	{
		title: "AirPods",
		slug: "airpods",
		icon: HiMiniDevicePhoneMobile,
	},
	{
		title: "Gaming",
		slug: "gaming",
		icon: FaGamepad,
	},
];

