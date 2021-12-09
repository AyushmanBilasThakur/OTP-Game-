import randomNumberInRange from "./getRandomNumber";

const getOTP = (digits = 4) => {
    let x = 0;
    if(digits > 6) digits = 6;
    while(digits > 0){
        x = x * 10 + randomNumberInRange(0,9);
        digits--;
    }
    return x;
}

export default getOTP;