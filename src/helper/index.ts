import dayjs from "dayjs";
type Time = string | number;
export const formatTime = (v: Time, formatter:string):string=>{
  return  dayjs(v).format(formatter);
}
