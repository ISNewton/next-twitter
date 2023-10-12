
export default function Button(params: any) {
  return <button
className={`w-full p-2  rounded-full font-bold border ${params.className}`}
    // className="w-full p-2  rounded-full font-bold border "
  {...params}></button>;
}
