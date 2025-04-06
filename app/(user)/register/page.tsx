import dynamic from "next/dynamic";

const Register = dynamic(() => import("@/Components/Register/Register"), { ssr: false });
export default function Page() {
  return <Register />;
}