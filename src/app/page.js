import axios from "axios";
import Link from "next/link";

const getData = async () => {
  const res = await axios.get(`https://jsonplaceholder.typicode.com/posts`, {
    cache: "no-store",
  });
  return res.data;
};

const HomePage = async () => {
  const posts = await getData();
  return (
    <>
      {posts?.map((x) => {
        return (
          <div key={x.id}>
            <Link href={`/${x.id}`}>
              {x.id} - {x.title}
            </Link>
          </div>
        );
      })}
    </>
  );
};

export default HomePage;
