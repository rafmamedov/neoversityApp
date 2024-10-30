import { FC } from "react";
import { TouchableOpacity } from "react-native"
import LogoutIcon from "../../icons/LogoutIcon"

type Props = {
  onPress: () => void;
}

const LogoutButton: FC<Props> = ({ onPress }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <LogoutIcon />
    </TouchableOpacity>
  );
};

export default LogoutButton;