import { useParams } from "react-router-dom";

function Home() {
  const { id } = useParams();

  return <div> homepage {id}</div>;
}

export default Home;
