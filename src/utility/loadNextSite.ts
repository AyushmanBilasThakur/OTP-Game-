import realSites from "../realSites.json";
import randomNumberInRange from "./getRandomNumber";

const loadNextSite = () => {
  return realSites.sites[randomNumberInRange(0, realSites.sites.length)];
};

export default loadNextSite;
