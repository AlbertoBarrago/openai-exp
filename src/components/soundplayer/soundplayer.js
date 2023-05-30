import { Swap } from "react-daisyui";

const SoundPlayer = ({ args, handlePlayer }) => {
  return (
    <>
      <Swap onClick={handlePlayer} {...args} />
    </>
  );
};

export default SoundPlayer;
