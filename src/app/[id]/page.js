import axios from "axios";
import React from "react";

export async function generateMetadata({ params }) {
  const x = await getData(params.id);
  return {
    title: `${x.id} - ${x.title}`,
    description: x.body,
  };
}

const getData = async (id) => {
  const res = await axios.get(
    `https://jsonplaceholder.typicode.com/posts/${id}`,
    {
      cache: "no-store",
    }
  );
  return res.data;
};

const PageID = async ({ params }) => {
  const x = await getData(params.id);

  return (
    <>
      <p>
        {x.id} - {x.title}
      </p>
      <p>{x.body}</p>
    </>
  );
};

export default PageID;
