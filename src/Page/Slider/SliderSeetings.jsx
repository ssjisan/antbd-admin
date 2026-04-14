import { useParams } from "react-router-dom";
import Settings from "../../Components/Slider/Settings/Settings";

export default function SliderSeetings() {
  const { id } = useParams();
  return <Settings id={id} />;
}
