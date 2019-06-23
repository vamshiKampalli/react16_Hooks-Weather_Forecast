export const tempConversion = (unit = 'C', temp) => {
if(unit === 'F'){
    return Math.round((temp * 9/5) - 459.67);
}
return Math.round(temp - 273.15);
}