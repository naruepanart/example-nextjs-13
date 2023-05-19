import axios from "axios";
import React from "react";

export async function generateMetadata({ params }) {
  return {
    title: "Page : " + params.id,
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
    <div>
      <h1>
        {x.id} - {x.title}
      </h1>
    </div>
  );
};

export default PageID;
