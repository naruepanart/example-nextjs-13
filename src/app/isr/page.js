import PageComponent from "@/components/PageComponent";
import axios from "axios";
import React from "react";

export const metadata = {
	title: "ISR",
};

const fetchPostData = async () => {
	const url = `https://jsonplaceholder.typicode.com/posts`;
	const options = { next: { revalidate: 60 } };
	const response = await axios.get(url, options);
	return response.data;
};

const page = async () => {
	const data = await fetchPostData();
	return (
		<>
			<h1>ISR</h1>
			{data.map((data) => (
				<PageComponent key={data.id} posts={data} />
			))}
		</>
	);
};

export default page;
