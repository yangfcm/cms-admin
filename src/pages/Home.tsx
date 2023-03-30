import { useParams } from "react-router-dom";

function Home() {
  const { address } = useParams();

  return <div> homepage {address}</div>;
}

export default Home;
