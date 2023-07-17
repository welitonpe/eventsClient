import { useAtom } from "jotai";
import { Outlet } from "react-router-dom";
import { authenticated } from "../../atoms/app.atom";

const GuestOutlet = () => {
  const [loged] = useAtom(authenticated);

  return (
    <Outlet
      context={{
        loged,
      }}
    />
  );
};

export default GuestOutlet;
